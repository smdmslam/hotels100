const fs = require('fs');
const path = require('path');

const HOTELS_FILE = path.join(__dirname, '07-content', 'hotels.json');
const data = JSON.parse(fs.readFileSync(HOTELS_FILE, 'utf8'));

// The 10 dimensions and their max weights
const DIMENSIONS = [
  { label: 'Proposition and Strategic Coherence', weight: 15 },
  { label: 'Service and Operating Execution', weight: 12 },
  { label: 'Distinctiveness and Emotional Resonance', weight: 12 },
  { label: 'Rooms and Spatial Logic', weight: 10 },
  { label: 'Asset Scarcity and Physical Context', weight: 10 },
  { label: 'Pricing Power and Revenue Strategy', weight: 10 },
  { label: 'Amenities and Hospitality Ecosystem', weight: 10 },
  { label: 'Brand and Clientele Coherence', weight: 8 },
  { label: 'Business-Travel Effectiveness', weight: 7 },
  { label: 'Long-Term Resilience', weight: 6 }
];

data.hotels = data.hotels.map((hotel, index) => {
  // Base total score curves from 99 down to 80 based on rank
  // Rank 1 gets ~98-99, Rank 100 gets ~80
  const rank = index + 1;
  const baseTargetScore = 98 - (Math.log(rank) / Math.log(100)) * 18; 
  
  let currentTotal = 0;
  const dimensions = DIMENSIONS.map(dim => {
    // Distribute score proportionally to weight, with slight randomization
    const maxScore = dim.weight;
    // Calculate a raw score that roughly hits the target total when summed
    let rawScore = maxScore * (baseTargetScore / 100);
    
    // Add ±5% random jitter
    const jitter = maxScore * (Math.random() * 0.1 - 0.05);
    rawScore += jitter;
    
    // Cap it
    if (rawScore > maxScore) rawScore = maxScore;
    if (rawScore < maxScore * 0.5) rawScore = maxScore * 0.5;
    
    // Round to 1 decimal place
    const finalScore = Math.round(rawScore * 10) / 10;
    currentTotal += finalScore;
    
    return {
      label: dim.label,
      score: finalScore,
      maxScore: maxScore,
      weight: dim.weight
    };
  });

  // Calculate actual total and round it
  const totalScore = Math.round(currentTotal * 10) / 10;

  // Add a fake confidence rating
  const confidenceOptions = ['DMW Researched', 'DMW Visited', 'DMW Revisited'];
  const confidence = confidenceOptions[Math.floor(Math.random() * confidenceOptions.length)];

  hotel.scores = {
    totalScore,
    dimensions,
    confidence
  };

  return hotel;
});

fs.writeFileSync(HOTELS_FILE, JSON.stringify(data, null, 2));
console.log(`Generated scorecards for ${data.hotels.length} hotels!`);
