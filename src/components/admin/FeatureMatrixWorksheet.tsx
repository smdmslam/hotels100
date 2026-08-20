import React, { useState, useEffect } from 'react';
import { Copy, Check, RotateCcw, Plus, Trash2 } from 'lucide-react';
import styles from './FeatureMatrixWorksheet.module.css';

export interface FeatureMatrixItem {
  id: string;
  name: string;
  category: 'Core Index' | 'Intelligence & AI' | 'Personalization & Search' | 'Commercial & Deals' | 'Publishing & Strategy';
  status: 'existing' | 'future';
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
    status: 'existing',
    description: 'Browse the Top 100 index rankings across 11 regional and thematic collections.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'basic-facts',
    name: 'Verified Property Facts & Essential Amenities',
    category: 'Core Index',
    status: 'existing',
    description: 'Standard facts, room count, check-in policies, and amenities matrix.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'scorecard-badges',
    name: '10-Dimension Scorecard Gauge Ratings (0-100)',
    category: 'Core Index',
    status: 'existing',
    description: 'Overall DMW Rating badge and top-level score display.',
    free: true, sub1: true, sub2: true, sub3: true
  },

  // Intelligence & AI
  {
    id: 'synthesized-assessment',
    name: 'Pure Synthesized DMW Hotel Assessment',
    category: 'Intelligence & AI',
    status: 'existing',
    description: '2-paragraph executive synthesis (Coherence Thesis + Rate Integrity Qualification) & DMW Position verdict.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'insider-report-full',
    name: 'Deep 5-Part Insider Intelligence Reports',
    category: 'Intelligence & AI',
    status: 'existing',
    description: 'UnGoogleable lore, unscripted service habits, famous clientele, and owner-operator power dynamics.',
    free: false, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'exact-room-numbers',
    name: 'Exact Best Room Numbers & Floor Tier Advice',
    category: 'Intelligence & AI',
    status: 'existing',
    description: 'Specific room numbers to book vs. avoid (quiet courtyard vs street noise orientation).',
    free: false, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'pro-ai-web-synthesis',
    name: 'Live Web Synthesis Engine (⚡ PRO AI WEB)',
    category: 'Intelligence & AI',
    status: 'existing',
    description: 'Perplexity sonar live web synthesis combining site dataset with real-time web facts.',
    free: false, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'unscripted-titles',
    name: 'Dynamic AI Editorial Section Headlines',
    category: 'Intelligence & AI',
    status: 'existing',
    description: 'Custom property-specific section titles to prevent revealing prompt template structures.',
    free: true, sub1: true, sub2: true, sub3: true
  },

  // Personalization & Search (Future Capabilities)
  {
    id: 'proximity-map-engine',
    name: 'Proximity & Custom Location Map Distance Engine',
    category: 'Personalization & Search',
    status: 'future',
    description: 'User enters a custom pin on a map to calculate AI distance & transit suitability.',
    free: false, sub1: false, sub2: true, sub3: true
  },
  {
    id: 'concierge-dual-profile',
    name: 'Concierge Dual Profile (Raw vs. AI-Refined Profile)',
    category: 'Personalization & Search',
    status: 'future',
    description: 'AI re-writes user profile into executive grade, with toggle for Profile Match vs. Neutral Search.',
    free: false, sub1: false, sub2: true, sub3: true
  },
  {
    id: 'personalized-slider-weights',
    name: 'Personalized Slider Weights & Custom Re-ranking',
    category: 'Personalization & Search',
    status: 'future',
    description: 'Adjust weights for 10 dimensions to re-rank the Global 100 for custom trip priorities.',
    free: false, sub1: false, sub2: true, sub3: true
  },
  {
    id: 'scorecard-ip-shielding',
    name: 'Scorecard Detail IP Shielding (Obfuscation)',
    category: 'Personalization & Search',
    status: 'future',
    description: 'Hide raw sub-metric breakdown data from free tier to prevent web scraping & copycats.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'ask-dmw-centered-hub',
    name: 'Interactive Ask DMW Centered Command Hub',
    category: 'Personalization & Search',
    status: 'future',
    description: 'Centered interactive modal for conversational intent search & shortlist generation.',
    free: true, sub1: true, sub2: true, sub3: true
  },

  // Commercial & Deals
  {
    id: 'indicative-rates-curves',
    name: 'Indicative Forward Rates & Seasonal Value Curves',
    category: 'Commercial & Deals',
    status: 'existing',
    description: 'Forward pricing curves, rate drop alerts, and off-peak Lowest 10% rate windows.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'hotel-deal-tracker',
    name: 'Luxury Hotel Deal & Tariff Drop Tracker',
    category: 'Commercial & Deals',
    status: 'future',
    description: 'Live alert engine monitoring sudden rate drops and luxury suite promotions across the index.',
    free: false, sub1: false, sub2: true, sub3: true
  },
  {
    id: 'hospitality-news-feed',
    name: 'Luxury Hospitality News & Brand Shift Tracker',
    category: 'Commercial & Deals',
    status: 'future',
    description: 'Live feed tracking GM shifts, major restorations, and luxury hotel brand acquisitions.',
    free: false, sub1: true, sub2: true, sub3: true
  },

  // Publishing & Strategy
  {
    id: 'mechanized-monthly-publishing',
    name: 'Mechanized Monthly AI Thematic Publishing Engine',
    category: 'Publishing & Strategy',
    status: 'existing',
    description: 'Monthly strategic macro reports generated using internal index data augmented by web search.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'linkedin-carousel-exporter',
    name: 'LinkedIn 5-Slide 1080x1350 PDF Exporter Desk',
    category: 'Publishing & Strategy',
    status: 'existing',
    description: '1-click PDF document exporter creating social media carousels for hotels & collections.',
    free: false, sub1: false, sub2: false, sub3: true
  },
  {
    id: 'ugc-social-storytelling',
    name: 'UGC Social Storytelling ("Research Girl" Tone)',
    category: 'Publishing & Strategy',
    status: 'future',
    description: 'Social-first editorial narratives highlighting hotel lore for viral engagement.',
    free: true, sub1: true, sub2: true, sub3: true
  },
  {
    id: 'exposed-strategy-faq',
    name: 'Exposed Business Strategy & FAQ Markdown Area',
    category: 'Publishing & Strategy',
    status: 'existing',
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
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'existing' | 'future'>('All');
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

  const toggleStatus = (id: string) => {
    setFeatures(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'existing' ? 'future' : 'existing' };
      }
      return item;
    }));
  };

  const handleUpdateName = (id: string, newName: string) => {
    setFeatures(prev => prev.map(item => item.id === id ? { ...item, name: newName } : item));
  };

  const handleUpdateDescription = (id: string, newDesc: string) => {
    setFeatures(prev => prev.map(item => item.id === id ? { ...item, description: newDesc } : item));
  };

  const handleAddCustomFeature = () => {
    const newId = `custom-feature-${Date.now()}`;
    const newItem: FeatureMatrixItem = {
      id: newId,
      name: 'New Custom Strategy Feature',
      category: selectedCategory !== 'All' ? (selectedCategory as any) : 'Intelligence & AI',
      status: 'future',
      description: 'Click to edit description, context, or business rationale...',
      free: false,
      sub1: true,
      sub2: true,
      sub3: true
    };
    setFeatures(prev => [newItem, ...prev]);
  };

  const handleDeleteFeature = (id: string) => {
    if (window.confirm('Delete this feature row from your matrix worksheet?')) {
      setFeatures(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all feature titles, descriptions, and tier allocations back to baseline strategy defaults?')) {
      setFeatures(DEFAULT_FEATURES);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleCopyToMarkdown = () => {
    let md = `# DMW Hotels 100 — Subscription Tier Feature Matrix Worksheet\n\n`;
    md += `| Feature Name | Status | Category | Free Tier | Pro ($49/mo) | Executive ($149/mo) | B2B Advisory ($499/mo) |\n`;
    md += `| :--- | :---: | :--- | :---: | :---: | :---: | :---: |\n`;

    features.forEach(f => {
      const freeMark = f.free ? '✓' : '—';
      const sub1Mark = f.sub1 ? '✓' : '—';
      const sub2Mark = f.sub2 ? '✓' : '—';
      const sub3Mark = f.sub3 ? '✓' : '—';
      const statusMark = f.status === 'existing' ? '🟢 Existing' : '🚀 Future';
      md += `| **${f.name}**<br>_${f.description}_ | ${statusMark} | ${f.category} | ${freeMark} | ${sub1Mark} | ${sub2Mark} | ${sub3Mark} |\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const categories = ['All', 'Core Index', 'Intelligence & AI', 'Personalization & Search', 'Commercial & Deals', 'Publishing & Strategy'];

  const filteredFeatures = features.filter(f => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || f.status === selectedStatus;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesStatus && matchesSearch;
  });

  const existingCount = features.filter(f => f.status === 'existing').length;
  const futureCount = features.filter(f => f.status === 'future').length;

  return (
    <div className={styles.container}>
      <header className={styles.worksheetHeader}>
        <div>
          <span className={styles.kicker}>Strategic Pricing &amp; Product Packaging</span>
          <h2>Subscription Feature Matrix Worksheet</h2>
          <p className={styles.subtitle}>
            Interactive strategy tool to assign, test, and map features to subscription tiers. Features are separated into 🟢 <strong>Existing (Live in App)</strong> and 🚀 <strong>Future (Candidate Roadmap)</strong>.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.secondaryBtn} onClick={handleAddCustomFeature}>
            <Plus size={15} /> Add Custom Feature
          </button>
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
          <span className={styles.filterLabel}>Status:</span>
          <button
            type="button"
            className={`${styles.filterChip} ${selectedStatus === 'All' ? styles.filterActive : ''}`}
            onClick={() => setSelectedStatus('All')}
          >
            All ({features.length})
          </button>
          <button
            type="button"
            className={`${styles.filterChip} ${selectedStatus === 'existing' ? styles.filterActive : ''}`}
            onClick={() => setSelectedStatus('existing')}
          >
            🟢 Existing Live ({existingCount})
          </button>
          <button
            type="button"
            className={`${styles.filterChip} ${selectedStatus === 'future' ? styles.filterActive : ''}`}
            onClick={() => setSelectedStatus('future')}
          >
            🚀 Future Roadmap ({futureCount})
          </button>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Category:</span>
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
              <th className={styles.featureCol}>Editable Feature &amp; Rationale</th>
              <th className={styles.statusCol}>Status</th>
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
              <th className={styles.actionCol}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeatures.map(item => (
              <tr key={item.id} className={styles.matrixRow}>
                <td className={styles.featureCell}>
                  <div className={styles.editableField}>
                    <input
                      type="text"
                      className={styles.editableNameInput}
                      value={item.name}
                      onChange={(e) => handleUpdateName(item.id, e.target.value)}
                      placeholder="Enter feature title..."
                    />
                  </div>
                  <div className={styles.editableField}>
                    <input
                      type="text"
                      className={styles.editableDescInput}
                      value={item.description}
                      onChange={(e) => handleUpdateDescription(item.id, e.target.value)}
                      placeholder="Enter feature description or rationale..."
                    />
                  </div>
                </td>
                <td className={styles.statusCell}>
                  <button
                    type="button"
                    className={`${styles.statusBadge} ${item.status === 'existing' ? styles.statusExisting : styles.statusFuture}`}
                    onClick={() => toggleStatus(item.id)}
                    title="Click to toggle between Existing Live and Future Roadmap"
                  >
                    {item.status === 'existing' ? '🟢 Existing' : '🚀 Future'}
                  </button>
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
                <td className={styles.actionCell}>
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteFeature(item.id)}
                    title="Delete Feature Row"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
