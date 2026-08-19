const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error("❌ ERROR: OPENROUTER_API_KEY environment variable is not set.");
  process.exit(1);
}

const args = process.argv.slice(2);
const targetSlug = args.find(arg => arg.startsWith('--slug='))?.split('=')[1];
const isTop100 = args.includes('--top100');
const isAll = args.includes('--all');
const limitArg = args.find(arg => arg.startsWith('--limit='))?.split('=')[1];
const limit = limitArg ? parseInt(limitArg, 10) : null;

async function queryAI(systemPrompt, userPrompt) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://hotels100.dmw.finance",
      "X-Title": "DMW Hotels 100 Synthesizer",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "perplexity/sonar",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2,
      max_tokens: 1200
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const responseData = await response.json();
  let content = responseData.choices[0].message.content;
  content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(content);
}

async function synthesizeAssessmentForHotel(hotel) {
  const collectedEvidence = {
    hotelName: hotel.name,
    location: hotel.location.displayLocation,
    rank: hotel.rank,
    dmwScore: hotel.scores?.totalScore || 92.5,
    dimensionScores: hotel.scores?.dimensions?.map(d => `${d.label}: ${d.score}/${d.maxScore}`) || [],
    insiderLore: typeof hotel.insiderReport?.unGoogleableHistory === 'object' ? hotel.insiderReport.unGoogleableHistory.text : hotel.insiderReport?.unGoogleableHistory || "Not specified",
    bestRoomAdvice: typeof hotel.insiderReport?.theTrueBestRoom === 'object' ? hotel.insiderReport.theTrueBestRoom.text : hotel.insiderReport?.theTrueBestRoom || "Not specified",
    operationalQuirks: typeof hotel.insiderReport?.operationalQuirks === 'object' ? hotel.insiderReport.operationalQuirks.text : hotel.insiderReport?.operationalQuirks || "Not specified",
    powerDynamics: typeof hotel.insiderReport?.powerDynamics === 'object' ? hotel.insiderReport.powerDynamics.text : hotel.insiderReport?.powerDynamics || "Not specified",
    indicativeRate: hotel.indicativeRate?.amount ? `$${hotel.indicativeRate.amount}/night` : "High premium tier",
    roomCount: hotel.propertyFacts?.roomCount || 100,
    propertyType: hotel.propertyFacts?.propertyType || "Luxury Hotel"
  };

  const systemPrompt = `You are the Lead Hotel Analyst for DMW Finance Group — The World's 100 Most Exceptional Hotels. Your task is to synthesize collected hotel evidence into a high-level executive assessment.

THE ASSESSMENT PHILOSOPHY:
- Evidence is presented in other sections (Scorecard, Insider Report, Pricing).
- The Assessment SYNTHESIZES those inputs into two substantive paragraphs and a closing verdict line:
  * Paragraph 1 (Coherence Thesis): Explain how ownership, location, architecture, operating model, room count, and top scorecard metrics reinforce each other into a coherent proposition.
  * Paragraph 2 (Qualification & Rate Integrity): State the exact qualification (e.g. room category dependencies, standard room compromises vs suite scarcity), rate defensibility, and who the property is best suited for.
  * DMW Position: A discreet 1-line verdict string, e.g. "Strong recommendation, conditional on room category" or "Exceptional recommendation for complete ecosystem stays".

OUTPUT FORMAT: Strict JSON only:
{
  "paragraph1_coherence": "...",
  "paragraph2_qualification": "...",
  "dmwJudgement": "DMW Position string"
}`;

  const userPrompt = `Here is the collected evidence for ${hotel.name}:
${JSON.stringify(collectedEvidence, null, 2)}

Generate the 2-paragraph synthesized Assessment and DMW Position line based strictly on this collected evidence.`;

  return await queryAI(systemPrompt, userPrompt);
}

// Pool worker for capped parallel processing (2 max concurrent workers)
async function processPool(items, maxConcurrent, fn) {
  let index = 0;
  const results = [];
  
  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i, items.length);
    }
  }

  const workers = Array.from({ length: Math.min(maxConcurrent, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

async function run() {
  const filePath = path.join(__dirname, '../07-content/hotels.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  let targetHotels = data.hotels;

  if (targetSlug) {
    targetHotels = targetHotels.filter(h => h.slug === targetSlug);
  } else if (isTop100) {
    targetHotels = targetHotels.filter(h => h.rank && h.rank <= 100);
  }

  if (limit && limit > 0) {
    targetHotels = targetHotels.slice(0, limit);
  }

  console.log(`🚀 Starting DMW Assessment Synthesis for ${targetHotels.length} hotels (Max 2 concurrent workers)...`);

  let successCount = 0;
  let failCount = 0;

  await processPool(targetHotels, 2, async (hotel, idx, total) => {
    try {
      console.log(`[${idx + 1}/${total}] Synthesizing assessment for ${hotel.name} (${hotel.location.displayLocation})...`);
      const synthesis = await synthesizeAssessmentForHotel(hotel);

      hotel.dmwOverview = synthesis.paragraph1_coherence;
      if (!hotel.analysis) hotel.analysis = {};
      hotel.analysis.revenueStrategy = synthesis.paragraph2_qualification;
      hotel.dmwJudgement = synthesis.dmwJudgement;

      successCount++;
      console.log(`  ✅ Successfully synthesized ${hotel.name}`);
    } catch (err) {
      failCount++;
      console.error(`  ⚠️ Failed to synthesize ${hotel.name}: ${err.message}`);
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`\n🎉 Synthesis completed! ${successCount} updated, ${failCount} failed.`);
}

run().catch(console.error);
