const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error("❌ ERROR: OPENROUTER_API_KEY environment variable is not set.");
  process.exit(1);
}

const targetSlug = process.argv.find(arg => arg.startsWith('--slug='))?.split('=')[1] || 'cheval-blanc-paris-paris';

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
  console.log(`\nSynthesizing Assessment for ${hotel.name} (${hotel.location.displayLocation})...`);

  // Gather all collected evidence for this hotel
  const collectedEvidence = {
    hotelName: hotel.name,
    location: hotel.location.displayLocation,
    rank: hotel.rank,
    dmwScore: hotel.scores?.totalScore || 92.5,
    dimensionScores: hotel.scores?.dimensions?.map(d => `${d.label}: ${d.score}/${d.maxScore}`) || [],
    insiderLore: hotel.insiderReport?.unGoogleableHistory || "Not specified",
    bestRoomAdvice: hotel.insiderReport?.theTrueBestRoom || "Not specified",
    operationalQuirks: hotel.insiderReport?.operationalQuirks || "Not specified",
    powerDynamics: hotel.insiderReport?.powerDynamics || "Not specified",
    indicativeRate: hotel.indicativeRate?.amount ? `$${hotel.indicativeRate.amount}/night` : "High premium tier",
    roomCount: hotel.propertyFacts?.roomCount || 72,
    propertyType: hotel.propertyFacts?.propertyType || "Luxury Maison"
  };

  const systemPrompt = `You are the Lead Hotel Analyst for DMW Finance Group. Your task is to synthesize collected hotel evidence into a high-level executive assessment.

THE ASSESSMENT PHILOSOPHY:
- Evidence is presented in other sections (Scorecard, Insider Report, Pricing).
- The Assessment SYNTHESIZES those inputs into two substantive paragraphs and a closing verdict line:
  * Paragraph 1 (Coherence Thesis): Explain how ownership, location, architecture, operating model, room count, and top scorecard metrics reinforce each other into a coherent proposition.
  * Paragraph 2 (Qualification & Rate Integrity): State the exact qualification (e.g. room category dependencies, standard room compromises vs suite scarcity), rate defensibility, and who the property is best suited for.
  * DMW Position: A discreet 1-line verdict string, e.g. "Strong recommendation, conditional on room category".

OUTPUT FORMAT: Strict JSON only:
{
  "paragraph1_coherence": "...",
  "paragraph2_qualification": "...",
  "dmwJudgement": "DMW Position string"
}`;

  const userPrompt = `Here is the collected evidence for ${hotel.name}:
${JSON.stringify(collectedEvidence, null, 2)}

Generate the 2-paragraph synthesized Assessment and DMW Position line based strictly on this collected evidence.`;

  const result = await queryAI(systemPrompt, userPrompt);
  return result;
}

async function run() {
  const filePath = path.join(__dirname, '../07-content/hotels.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const hotel = data.hotels.find(h => h.slug === targetSlug);
  if (!hotel) {
    console.error(`❌ Hotel with slug "${targetSlug}" not found in hotels.json`);
    process.exit(1);
  }

  const synthesis = await synthesizeAssessmentForHotel(hotel);

  console.log('\n======================================================');
  console.log('GENERATED SYNTHESIS ASSESSMENT FROM COLLECTED EVIDENCE:');
  console.log('======================================================');
  console.log('\n[PARAGRAPH 1: COHERENCE THESIS]');
  console.log(synthesis.paragraph1_coherence);
  console.log('\n[PARAGRAPH 2: QUALIFICATION & RATE INTEGRITY]');
  console.log(synthesis.paragraph2_qualification);
  console.log('\n[DMW POSITION VERDICT LINE]');
  console.log(synthesis.dmwJudgement);
  console.log('======================================================\n');

  // Update hotel record in hotels.json
  hotel.dmwOverview = synthesis.paragraph1_coherence;
  if (!hotel.analysis) hotel.analysis = {};
  hotel.analysis.revenueStrategy = synthesis.paragraph2_qualification;
  hotel.dmwJudgement = synthesis.dmwJudgement;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✅ Successfully updated ${hotel.name} in hotels.json with synthesized assessment!`);
}

run().catch(console.error);
