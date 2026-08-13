const fs = require('fs');
const path = require('path');

const SOURCES_DIR = path.join(__dirname, 'src', 'data', 'sources');
const OUTPUT_FILE = path.join(__dirname, 'candidate-master.csv');

// Standardize names for deduplication (lowercase, remove punctuation)
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/^(the |hotel |hôtel |le |la |il |el )/i, '')
    .replace(/[^a-z0-9]/g, '');
}

async function buildUniverse() {
  const files = fs.readdirSync(SOURCES_DIR).filter(file => file.endsWith('.json'));
  
  const universe = new Map();
  let totalRawCount = 0;

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(SOURCES_DIR, file), 'utf8'));
    totalRawCount += data.length;

    for (const hotel of data) {
      const normName = normalizeName(hotel.name);
      
      if (universe.has(normName)) {
        // Merge sources if it exists
        const existing = universe.get(normName);
        if (!existing.source.includes(hotel.source)) {
          existing.source += `, ${hotel.source}`;
        }
      } else {
        universe.set(normName, hotel);
      }
    }
  }

  // Convert map to array and sort
  const deduplicatedHotels = Array.from(universe.values()).sort((a, b) => a.name.localeCompare(b.name));
  
  // Create CSV output
  let csvContent = 'Name,Location,Country,Brand,Sources,Rel_Score,Strat_Score,Asset_Score,Market_Score,Edit_Score\n';
  
  for (const hotel of deduplicatedHotels) {
    // Basic CSV escaping
    const name = `"${hotel.name.replace(/"/g, '""')}"`;
    const loc = `"${hotel.location.replace(/"/g, '""')}"`;
    const country = `"${hotel.country.replace(/"/g, '""')}"`;
    const brand = `"${hotel.brand.replace(/"/g, '""')}"`;
    const source = `"${hotel.source.replace(/"/g, '""')}"`;
    
    // The 5 empty fast-screen columns
    csvContent += `${name},${loc},${country},${brand},${source},,,,,\n`;
  }

  fs.writeFileSync(OUTPUT_FILE, csvContent);
  
  console.log(`Successfully built hotel universe!`);
  console.log(`Raw candidates: ${totalRawCount}`);
  console.log(`Deduplicated candidates: ${deduplicatedHotels.length}`);
  console.log(`Output saved to: ${OUTPUT_FILE}`);
}

buildUniverse();
