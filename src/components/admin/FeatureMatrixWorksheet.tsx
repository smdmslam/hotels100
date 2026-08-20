import React, { useState, useEffect } from 'react';
import { Copy, Check, RotateCcw, Filter } from 'lucide-react';
import styles from './FeatureMatrixWorksheet.module.css';

export interface FeatureMatrixItem {
  id: string;
  name: string;
  category: 'Core Index' | 'Intelligence & AI' | 'Personalization & Search' | 'Commercial & Deals' | 'Publishing & Strategy';
  description: string;
  free: boolean;
  sub1: boolean; // Pro ($49/mo)
  sub2: boolean; // Executive ($149/mo)
  sub3: boolean; // B2B Advisory ($499/mo)
}

const DEFAULT_FEATURES: FeatureMatrixItem[] = [
  // Core Index
  {
    id: 'index-leaderboards',
    name: 'DMW 100 Leaderboards & Index Rankings',
    category: 'Core Index',
    description: 'Browse the Top 100 index rankings across 11 regional and thematic collections.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'basic-facts',
    name: 'Verified Property Facts & Essential Amenities',
    category: 'Core Index',
    description: 'Standard facts, room count, check-in policies, and amenities matrix.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'scorecard-badges',
    name: '10-Dimension Scorecard Gauge Ratings (0-100)',
    category: 'Core Index',
    description: 'Overall DMW Rating badge and top-level score display.',
    free: true, sub1: true, sub2: true, sub3: true
  },

  // Intelligence & AI
  {
    id: 'synthesized-assessment',
    name: 'Pure Synthesized DMW Hotel Assessment',
    category: 'Intelligence & AI',
    description: '2-paragraph executive synthesis (Coherence Thesis + Rate Integrity Qualification) & DMW Position verdict.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'insider-report-full',
    name: 'Deep 5-Part Insider Intelligence Reports',
    category: 'Intelligence & AI',
    description: 'UnGoogleable lore, unscripted service habits, famous clientele, and owner-operator power dynamics.',
    free: false, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'exact-room-numbers',
    name: 'Exact Best Room Numbers & Floor Tier Advice',
    category: 'Intelligence & AI',
    description: 'Specific room numbers to book vs. avoid (quiet courtyard vs street noise orientation).',
    free: false, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'pro-ai-web-synthesis',
    name: 'Live Web Synthesis Engine (⚡ PRO AI WEB)',
    category: 'Intelligence & AI',
    description: 'Perplexity sonar live web synthesis combining site dataset with real-time web facts.',
    free: false, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'unscripted-titles',
    name: 'Dynamic AI Editorial Section Headlines',
    category: 'Intelligence & AI',
    description: 'Custom property-specific section titles to prevent revealing prompt template structures.',
    free: true, sub1: true, sub2: true, sub3: true
  },

  // Personalization & Search
  {
    id: 'proximity-map-engine',
    name: 'Proximity & Custom Location Map Distance Engine',
    category: 'Personalization & Search',
    description: 'User enters a custom pin on a map to calculate AI distance & transit suitability.',
    free: false, sub1: false, sub2: true, sub3: true
  },
  {
    id: 'concierge-dual-profile',
    name: 'Concierge Dual Profile (Raw vs. AI-Refined Profile)',
    category: 'Personalization & Search',
    description: 'AI re-writes user profile into executive grade, with toggle for Profile Match vs. Neutral Search.',
    free: false, sub1: false, sub2: true, sub3: true
  },
  {
    id: 'personalized-slider-weights',
    name: 'Personalized Slider Weights & Custom Re-ranking',
    category: 'Personalization & Search',
    description: 'Adjust weights for 10 dimensions to re-rank the Global 100 for custom trip priorities.',
    free: false, sub1: false, sub2: true, sub3: true
  },
  {
    id: 'scorecard-ip-shielding',
    name: 'Scorecard Detail IP Shielding (Obfuscation)',
    category: 'Personalization & Search',
    description: 'Hide raw sub-metric breakdown data from free tier to prevent web scraping & copycats.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'ask-dmw-centered-hub',
    name: 'Interactive Ask DMW Centered Command Hub',
    category: 'Personalization & Search',
    description: 'Centered interactive modal for conversational intent search & shortlist generation.',
    free: true, sub1: true, sub2: true, sub3: true
  },

  // Commercial & Deals
  {
    id: 'indicative-rates-curves',
    name: 'Indicative Forward Rates & Seasonal Value Curves',
    category: 'Commercial & Deals',
    description: 'Forward pricing curves, rate drop alerts, and off-peak Lowest 10% rate windows.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'hotel-deal-tracker',
    name: 'Luxury Hotel Deal & Tariff Drop Tracker',
    category: 'Commercial & Deals',
    description: 'Live alert engine monitoring sudden rate drops and luxury suite promotions across the index.',
    free: false, sub1: false, sub2: true, sub3: true
  },
  {
    id: 'hospitality-news-feed',
    name: 'Luxury Hospitality News & Brand Shift Tracker',
    category: 'Commercial & Deals',
    description: 'Live feed tracking GM shifts, major restorations, and luxury hotel brand acquisitions.',
    free: false, sub1: true, sub2: true, sub3: true
  },

  // Publishing & Strategy
  {
    id: 'mechanized-monthly-publishing',
    name: 'Mechanized Monthly AI Thematic Publishing Engine',
    category: 'Publishing & Strategy',
    description: 'Monthly strategic macro reports generated using internal index data augmented by web search.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'linkedin-carousel-exporter',
    name: 'LinkedIn 5-Slide 1080x1350 PDF Exporter Desk',
    category: 'Publishing & Strategy',
    description: '1-click PDF document exporter creating social media carousels for hotels & collections.',
    free: false, sub1: false, sub2: false, sub3: true
  },
  {
    id: 'ugc-social-storytelling',
    name: 'UGC Social Storytelling ("Research Girl" Tone)',
    category: 'Publishing & Strategy',
    description: 'Social-first editorial narratives highlighting hotel lore for viral engagement.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'exposed-strategy-faq',
    name: 'Exposed Business Strategy & FAQ Markdown Area',
    category: 'Publishing & Strategy',
    description: 'Expose strategy markdown files (Enterprise Value, GTM, Buyer Logic) in a clean business plan hub.',
    free: true, sub1: true, sub2: true, sub3: true
  }
];

const STORAGE_KEY = 'dmw_subscription_feature_matrix_v1';

export const FeatureMatrixWorksheet: React.FC = () => {
  const [features, setFeatures] = useState<FeatureMatrixItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load feature matrix from localStorage:', e);
    }
    return DEFAULT_FEATURES;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(features));
    } catch (e) {
      console.error('Failed to save feature matrix to localStorage:', e);
    }
  }, [features]);

  const toggleTier = (id: string, tier: 'free' | 'sub1' | 'sub2' | 'sub3') => {
    setFeatures(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [tier]: !item[tier] };
      }
      return item;
    }));
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all feature tier allocations back to baseline strategy defaults?')) {
      setFeatures(DEFAULT_FEATURES);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleCopyToMarkdown = () => {
    let md = `# DMW Hotels 100 — Subscription Tier Feature Matrix Worksheet\n\n`;
    md += `| Feature Name | Category | Free Tier | Pro ($49/mo) | Executive ($149/mo) | B2B Advisory ($499/mo) |\n`;
    md += `| :--- | :--- | :---: | :---: | :---: | :---: |\n`;

    features.forEach(f => {
      const freeMark = f.free ? '✓' : '—';
      const sub1Mark = f.sub1 ? '✓' : '—';
      const sub2Mark = f.sub2 ? '✓' : '—';
      const sub3Mark = f.sub3 ? '✓' : '—';
      md += `| **${f.name}**<br>_${f.description}_ | ${f.category} | ${freeMark} | ${sub1Mark} | ${sub2Mark} | ${sub3Mark} |\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const categories = ['All', 'Core Index', 'Intelligence & AI', 'Personalization & Search', 'Commercial & Deals', 'Publishing & Strategy'];

  const filteredFeatures = features.filter(f => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <header className={styles.worksheetHeader}>
        <div>
          <span className={styles.kicker}>Strategic Pricing &amp; Product Packaging</span>
          <h2>Subscription Feature Matrix Worksheet</h2>
          <p className={styles.subtitle}>
            Interactive strategy tool to assign, test, and map features to subscription tiers (Free, Pro $49/mo, Executive $149/mo, B2B Advisory $499/mo).
          </p>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.secondaryBtn} onClick={handleResetToDefaults}>
            <RotateCcw size={15} /> Reset Defaults
          </button>
          <button type="button" className={styles.primaryBtn} onClick={handleCopyToMarkdown}>
            {copiedNotification ? <Check size={15} /> : <Copy size={15} />}
            {copiedNotification ? 'Copied Markdown!' : 'Export Matrix to Markdown'}
          </button>
        </div>
      </header>

      {/* Filter & Search Bar */}
      <div className={styles.toolbar}>
        <div className={styles.filterGroup}>
          <Filter size={15} className={styles.icon} />
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`${styles.filterChip} ${selectedCategory === cat ? styles.filterActive : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search features..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Feature Matrix Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.matrixTable}>
          <thead>
            <tr>
              <th className={styles.featureCol}>Feature &amp; Rationale</th>
              <th className={styles.catCol}>Category</th>
              <th className={styles.tierCol}>
                <div className={styles.tierHeader}>
                  <span>Free Tier</span>
                  <small>Public Index</small>
                </div>
              </th>
              <th className={styles.tierCol}>
                <div className={styles.tierHeader}>
                  <span>Sub 1 — Pro</span>
                  <small>$49 / month</small>
                </div>
              </th>
              <th className={styles.tierCol}>
                <div className={styles.tierHeader}>
                  <span>Sub 2 — Executive</span>
                  <small>$149 / month</small>
                </div>
              </th>
              <th className={styles.tierCol}>
                <div className={styles.tierHeader}>
                  <span>Sub 3 — Advisory</span>
                  <small>$499 / month</small>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFeatures.map(item => (
              <tr key={item.id} className={styles.matrixRow}>
                <td className={styles.featureCell}>
                  <strong>{item.name}</strong>
                  <p>{item.description}</p>
                </td>
                <td className={styles.catCell}>
                  <span className={styles.categoryBadge}>{item.category}</span>
                </td>
                <td className={styles.checkCell} onClick={() => toggleTier(item.id, 'free')}>
                  <div className={`${styles.checkbox} ${item.free ? styles.checkedFree : ''}`}>
                    {item.free && <Check size={14} />}
                  </div>
                </td>
                <td className={styles.checkCell} onClick={() => toggleTier(item.id, 'sub1')}>
                  <div className={`${styles.checkbox} ${item.sub1 ? styles.checkedSub1 : ''}`}>
                    {item.sub1 && <Check size={14} />}
                  </div>
                </td>
                <td className={styles.checkCell} onClick={() => toggleTier(item.id, 'sub2')}>
                  <div className={`${styles.checkbox} ${item.sub2 ? styles.checkedSub2 : ''}`}>
                    {item.sub2 && <Check size={14} />}
                  </div>
                </td>
                <td className={styles.checkCell} onClick={() => toggleTier(item.id, 'sub3')}>
                  <div className={`${styles.checkbox} ${item.sub3 ? styles.checkedSub3 : ''}`}>
                    {item.sub3 && <Check size={14} />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
