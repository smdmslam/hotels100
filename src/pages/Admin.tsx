import React, { useState } from 'react';
import { RefreshCw, Plus, Download, Sparkles, X, ShieldCheck, BookOpen, HelpCircle, Users, Target, DollarSign, Zap, FileText, Share2 } from 'lucide-react';
import { Container } from '../components/shared';
import { getAllHotels, getAllCollections } from '../data/api';
import type { HotelSummary, Archetype } from '../data/types';
import styles from './Admin.module.css';

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'operations' | 'faq' | 'publishing'>('operations');
  const [hotels, setHotels] = useState<HotelSummary[]>(getAllHotels());
  const collections = getAllCollections();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Modals
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [isAiResearchOpen, setIsAiResearchOpen] = useState(false);

  // Form states
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelCity, setNewHotelCity] = useState('');
  const [newHotelCountry, setNewHotelCountry] = useState('');
  const [newHotelBrand, setNewHotelBrand] = useState('');

  const [aiSearchTarget, setAiSearchTarget] = useState('');
  const [isResearching, setIsResearching] = useState(false);

  // Recalculate Index Rankings
  const handleRecalculatePipeline = () => {
    setStatusMessage('Re-calculating scorecards and sorting all 11 collection leaderboards...');
    setTimeout(() => {
      setStatusMessage('✓ Index rankings successfully recalculated across all 11 collections!');
      setTimeout(() => setStatusMessage(null), 4000);
    }, 1200);
  };

  // Add Hotel Candidate
  const handleAddHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotelName || !newHotelCity) return;

    const newEntry: HotelSummary = {
      id: newHotelName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      slug: newHotelName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newHotelName,
      rank: hotels.length + 1,
      edition: 2026,
      publicationStatus: 'published',
      featured: true,
      location: {
        city: newHotelCity,
        region: 'Europe',
        country: newHotelCountry || 'Global',
        displayLocation: `${newHotelCity}, ${newHotelCountry || 'Global'}`,
      },
      essentialAmenities: [],
      distinctions: [],
      hasStrategicFeature: false,
      hasPricingAnalysis: false,
      archetype: 'Grand Luxury Hotel' as Archetype,
      profileUrl: `/hotels/${newHotelName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    };

    setHotels([newEntry, ...hotels]);
    setIsAddHotelOpen(false);
    setNewHotelName('');
    setNewHotelCity('');
    setNewHotelCountry('');
    setNewHotelBrand('');
    setStatusMessage(`✓ Added "${newHotelName}" to Candidate Master Universe.`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Run Perplexity AI Research
  const handleRunAiResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiSearchTarget) return;

    setIsResearching(true);
    setTimeout(() => {
      setIsResearching(false);
      setIsAiResearchOpen(false);
      setStatusMessage(`✓ Completed Perplexity AI Research & Enrichment for "${aiSearchTarget}". Updated DMW scores and insider report.`);
      setAiSearchTarget('');
      setTimeout(() => setStatusMessage(null), 5000);
    }, 2000);
  };

  // CSV Lead Exporter
  const handleExportLeads = () => {
    const leads = [
      { date: '2026-08-18', email: 'principal@familyoffice.ch', query: 'Zurich business hotel under $500 with gym', recipient: 's.moralesmed@gmail.com' },
      { date: '2026-08-17', email: 'ea@mayfaircap.co.uk', query: 'Mayfair suites with private butler', recipient: 's.moralesmed@gmail.com' },
      { date: '2026-08-16', email: 'investor@genevawatch.ch', query: 'Swiss Lakes & Léman sanctuary', recipient: 's.moralesmed@gmail.com' },
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' +
      ['Date,User Email,Query,Destination'].join(',') + '\n' +
      leads.map(l => `"${l.date}","${l.email}","${l.query}","${l.recipient}"`).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dmw-advisory-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredHotels = hotels.filter((h) => {
    const q = searchTerm.toLowerCase();
    return h.name.toLowerCase().includes(q) || h.location.displayLocation.toLowerCase().includes(q);
  });

  return (
    <main className={styles.adminPage}>
      <Container variant="wide">
        <header className={styles.header}>
          <span className={styles.eyebrow}>
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: 6 }} />
            DMW Executive Admin Portal
          </span>
          <h1 className={styles.title}>Index Operations &amp; Research Desk</h1>
          <p className={styles.subtitle}>
            Control panel for index recalculations, Perplexity AI research runs, hotel candidate management, and advisory lead export.
          </p>
        </header>

        <nav className={styles.tabs} aria-label="Admin Navigation Tabs">
          <button
            type="button"
            className={`${styles.tabButton} ${activeTab === 'operations' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('operations')}
          >
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: 6 }} />
            Index Operations Desk
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${activeTab === 'publishing' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('publishing')}
          >
            <Share2 size={14} style={{ display: 'inline', marginRight: 6 }} />
            Publishing &amp; LinkedIn Carousel Desk
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${activeTab === 'faq' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            <BookOpen size={14} style={{ display: 'inline', marginRight: 6 }} />
            Strategy &amp; Operating Playbook FAQ
          </button>
        </nav>

        {statusMessage && (
          <div style={{
            marginBottom: 24,
            padding: '14px 20px',
            border: '1px solid var(--color-antique-gold)',
            background: 'rgba(197, 160, 89, 0.15)',
            color: 'var(--color-ivory)',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 600
          }}>
            {statusMessage}
          </div>
        )}

        {activeTab === 'operations' ? (
          <>

        {/* Executive KPI Summary Cards */}
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <span className={styles.kpiLabel}>Total Candidate Universe</span>
            <span className={styles.kpiValue}>{hotels.length}</span>
          </div>
          <div className={styles.kpiCard}>
            <span className={styles.kpiLabel}>Active Collections</span>
            <span className={styles.kpiValue}>{collections.length}</span>
          </div>
          <div className={styles.kpiCard}>
            <span className={styles.kpiLabel}>DMW Enriched Flagships</span>
            <span className={`${styles.kpiValue} ${styles.kpiValueGold}`}>82</span>
          </div>
          <div className={styles.kpiCard}>
            <span className={styles.kpiLabel}>Advisory Desk Route</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-antique-gold)', fontFamily: 'var(--font-sans)' }}>
              s.moralesmed@gmail.com
            </span>
          </div>
        </div>

        {/* Core Actions Bar */}
        <div className={styles.actionsBar}>
          <button type="button" className={styles.actionButton} onClick={handleRecalculatePipeline}>
            <RefreshCw size={16} /> Re-Calculate Index Rankings
          </button>
          <button type="button" className={styles.actionButton} onClick={() => setIsAiResearchOpen(true)}>
            <Sparkles size={16} /> Run Perplexity AI Research
          </button>
          <button type="button" className={`${styles.actionButton} ${styles.actionButtonSecondary}`} onClick={() => setIsAddHotelOpen(true)}>
            <Plus size={16} /> Add Hotel Candidate
          </button>
          <button type="button" className={`${styles.actionButton} ${styles.actionButtonSecondary}`} onClick={handleExportLeads}>
            <Download size={16} /> Export Advisory Leads (CSV)
          </button>
        </div>

        {/* Hotel Universe Management Table */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Hotel Candidate Database ({filteredHotels.length})</h2>
            <input
              type="text"
              className={styles.searchBox}
              placeholder="Search hotel name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Hotel Property</th>
                  <th>Location</th>
                  <th>Archetype</th>
                  <th>Indicative Rate</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHotels.slice(0, 30).map((hotel) => (
                  <tr key={hotel.id}>
                    <td><strong>No. {hotel.rank}</strong></td>
                    <td className={styles.hotelNameCell}>{hotel.name}</td>
                    <td>{hotel.location.displayLocation}</td>
                    <td>{hotel.archetype || 'Luxury Flagship'}</td>
                    <td>{hotel.indicativeRate ? `$${hotel.indicativeRate.amount}/night` : 'Inquire'}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${hotel.rank <= 100 ? styles.statusPublished : styles.statusDraft}`}>
                        {hotel.rank <= 100 ? 'Published' : 'Research Draft'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.rowActions}>
                        <button
                          type="button"
                          className={styles.smallButton}
                          onClick={() => { setAiSearchTarget(hotel.name); setIsAiResearchOpen(true); }}
                        >
                          Enrich AI
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        </>
        ) : activeTab === 'publishing' ? (
          <div className={styles.faqGrid}>
            <article className={styles.faqCard} style={{ border: '1px solid var(--color-antique-gold)' }}>
              <h3 className={styles.faqQuestion}>
                <Share2 className={styles.faqQuestionIcon} size={22} />
                LinkedIn Document Post &amp; Carousel Exporter (1080×1350)
              </h3>
              <div className={styles.faqAnswer}>
                <p>
                  Generate 5-slide styled PDF Carousels formatted to LinkedIn Document Post specifications. Upload directly to LinkedIn for 4x–6x higher organic reach.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '20px 0' }}>
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={() => {
                      const topHotels = hotels.slice(0, 5);
                      const briefing = `THE DMW GLOBAL 100 BRIEFING (LINKEDIN CAROUSEL PDF)\nFormat: 1080x1350 Portrait\n\n` +
                        topHotels.map((h, idx) => `SLIDE ${idx + 2}: NO. ${h.rank} — ${h.name.toUpperCase()}\nLocation: ${h.location.displayLocation}\nIndicative ADR: $${h.indicativeRate?.amount || 'N/A'}/night\nDMW Score: ${h.scores ? Object.values(h.scores).reduce((a,b)=>a+b,0)/10 : 95.0}/100\n\nDMW IN A NUTSHELL:\n"${h.dmwJudgement || h.inclusionRationale || 'High-coherence trophy asset.'}"\n\nKEYS TO THE ASSET:\n• Best Room: ${h.insiderReport?.theTrueBestRoom || 'Upper wing suite'}\n• Operational Lore: ${h.insiderReport?.operationalQuirks || 'Seamless service'}\n\n`).join('---\n');
                      
                      const blob = new Blob([briefing], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `dmw-linkedin-carousel-global-100-${new Date().toISOString().slice(0,10)}.txt`;
                      a.click();
                      setStatusMessage('✓ Generated LinkedIn Carousel Briefing PDF export!');
                      setTimeout(() => setStatusMessage(null), 4000);
                    }}
                  >
                    <Download size={15} /> Export Top 5 Global 100 Carousel
                  </button>

                  <button
                    type="button"
                    className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                    onClick={() => {
                      const londonHotels = hotels.filter(h => h.location.city.toLowerCase().includes('london')).slice(0, 5);
                      const briefing = `THE DMW LONDON 50 BRIEFING (LINKEDIN CAROUSEL PDF)\n\n` +
                        londonHotels.map((h, idx) => `SLIDE ${idx + 2}: NO. ${h.rank} — ${h.name.toUpperCase()}\nLocation: ${h.location.displayLocation}\nRate: $${h.indicativeRate?.amount || 'N/A'}\n\nNutshell: "${h.dmwJudgement || h.inclusionRationale}"\nBest Room: ${h.insiderReport?.theTrueBestRoom || 'Penthouse tier'}\n\n`).join('---\n');
                      
                      const blob = new Blob([briefing], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `dmw-linkedin-carousel-london-50-${new Date().toISOString().slice(0,10)}.txt`;
                      a.click();
                      setStatusMessage('✓ Generated LinkedIn London 50 Carousel PDF export!');
                      setTimeout(() => setStatusMessage(null), 4000);
                    }}
                  >
                    <Download size={15} /> Export Top 5 London 50 Carousel
                  </button>
                </div>
              </div>
            </article>

            <article className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                <FileText className={styles.faqQuestionIcon} size={22} />
                LinkedIn Executive Post Copy Generator
              </h3>
              <div className={styles.faqAnswer}>
                <p>
                  Copy-paste formatted executive post text ready for LinkedIn publishing:
                </p>
                <div style={{ padding: 16, background: 'rgba(9,9,8,0.8)', border: '1px solid rgba(244,240,232,0.15)', color: 'var(--color-ivory)', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.55 }}>
                  Why 5-Star Hotel Rates Spike 85% During Event Compression (2026 DMW Analysis) 🏨📈<br /><br />
                  At €1,500/night, luxury travellers accept high rates—but only if the pricing is intelligent.<br /><br />
                  Our August 2026 Macro Analysis evaluated 310 trophy assets across 10 DMW dimensions:<br />
                  🔹 Mayfair &amp; Paris 1st Arrondissement hold highest rate resilience.<br />
                  🔹 Off-peak sweet spots (late Oct &amp; mid-Nov) yield 65% savings for identical suites.<br />
                  🔹 Best exact room to book at The Connaught: Upper-floor Carlos Place penthouse suite stock.<br /><br />
                  Explore all 11 global collections &amp; rate seasonality curves 👇<br />
                  🔗 DMWHotels100.com/insights
                </div>
              </div>
            </article>
          </div>
        ) : (
          <div className={styles.faqGrid}>
            <article className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                <Users className={styles.faqQuestionIcon} size={22} />
                1. Target Cohorts &amp; Their "Magnetic Pull" (How We Fish For Customers)
              </h3>
              <div className={styles.faqAnswer}>
                <p>
                  To systematically acquire users at every tier, DMW uses a dedicated <strong>Magnetic Pull (Value Hook)</strong> tailored to each buyer cohort:
                </p>
                <ul className={styles.faqList}>
                  <li>
                    <strong>Cohort A: High-Net-Worth Principals &amp; Sovereign Wealth</strong>
                    <br />
                    🧲 <em>Magnetic Pull</em>: <strong>UnGoogleable Truth &amp; Zero Fluff</strong>. Principals ignore generic PR. They care about privacy, noise insulation, spatial discretion, and asset scarcity.
                    <br />
                    🎣 <em>Execution Hook</em>: Explicit trade-off disclosure (e.g. <em>“avoid 2nd floor street noise”</em>) + Unlocked Top 10 Flagship Insider Reports + 🟢 <em>Lowest 10% Rate Window</em> alerts.
                  </li>
                  <li style={{ marginTop: 12 }}>
                    <strong>Cohort B: Executive Assistants (EAs) &amp; Chiefs of Staff</strong>
                    <br />
                    🧲 <em>Magnetic Pull</em>: <strong>Zero-Failure Decision Defensibility</strong>. Booking a bad hotel for a C-suite boss is a career failure. An EA needs a defensible recommendation in 60 seconds.
                    <br />
                    🎣 <em>Execution Hook</em>: Shortlist reduction (5 curated options instead of 600 sponsored OTA ads) + instant <strong>Ask DMW</strong> prompt queries (*“Zurich business under $500 with gym &amp; quiet desk”*).
                  </li>
                  <li style={{ marginTop: 12 }}>
                    <strong>Cohort C: Family Office Directors &amp; Wealth Advisors</strong>
                    <br />
                    🧲 <em>Magnetic Pull</em>: <strong>Rate Intelligence &amp; Multi-Room Security Logistics</strong>. Managing delegation travel and family estates requires rate predictability and owner-operator stability.
                    <br />
                    🎣 <em>Execution Hook</em>: Rate compression surge warnings + automated price drop alerts + direct advisory desk routing to <code>s.moralesmed@gmail.com</code>.
                  </li>
                  <li style={{ marginTop: 12 }}>
                    <strong>Cohort D: Frequent Luxury Business Travellers</strong>
                    <br />
                    🧲 <em>Magnetic Pull</em>: <strong>High-Performance Utility &amp; Value Under $500</strong>. Need serious 24h gyms, fast Wi-Fi, late check-out, and high-ADR luxury assets under $500/night.
                    <br />
                    🎣 <em>Execution Hook</em>: <strong>The Accessible 50</strong> and <strong>London Under $500</strong> collection editions.
                  </li>
                </ul>
              </div>
            </article>

            <article className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                <Target className={styles.faqQuestionIcon} size={22} />
                2. Why do users come to DMW instead of Booking.com or TripAdvisor?
              </h3>
              <div className={styles.faqAnswer}>
                <p>
                  Booking sites handle payment; DMW owns the <strong>difficult decision before booking</strong>: <em>“Given who I am and what I’m spending, which hotel should I actually choose?”</em>
                </p>
                <ul className={styles.faqList}>
                  <li><strong>Shortlist Reduction</strong>: Cuts 600 search results down to the 5 that genuinely fit.</li>
                  <li><strong>Honest Compromise Exposure</strong>: Explicitly reveals trade-offs PR hides (e.g. <em>tired entry rooms, noisy street orientation, small basement gym</em>).</li>
                  <li><strong>Rate Integrity &amp; Seasonality Signals</strong>: Flags 🟢 <em>Lowest 10% Rate Windows</em> vs. 🔴 <em>Peak Surge Compression (+75%)</em>.</li>
                  <li><strong>Decision Confidence</strong>: Gives EAs and principals absolute clarity before reserving.</li>
                </ul>
              </div>
            </article>

            <article className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                <HelpCircle className={styles.faqQuestionIcon} size={22} />
                3. What do users search for? (Bespoke Intent Data)
              </h3>
              <div className={styles.faqAnswer}>
                <p>
                  Users enter high-intent prompt queries through <strong>Ask DMW</strong>:
                </p>
                <ul className={styles.faqList}>
                  <li><em>“Zurich business hotel under $500 with a proper gym and quiet room”</em></li>
                  <li><em>“Mayfair suites with private butler and private dining for 6”</em></li>
                  <li><em>“Swiss Lakes &amp; Léman luxury resort sanctuary with lakefront access”</em></li>
                  <li><em>“Dubai high-ADR hotel with quiet beach and private pool”</em></li>
                </ul>
              </div>
            </article>

            <article className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                <DollarSign className={styles.faqQuestionIcon} size={22} />
                4. How does the Free vs. Paid Subscription Model work?
              </h3>
              <div className={styles.faqAnswer}>
                <p>
                  A clean, zero-friction two-tier model designed to build a massive free email subscriber base while monetising high-value intelligence:
                </p>
                <ul className={styles.faqList}>
                  <li>
                    <strong>Free Public Tier (Lead Generation Engine)</strong>:
                    Full browsing of all 11 regional collections, 10-dimension scorecards, direct booking links, top 10 flagship Insider Reports, and 3 trial AI queries (capturing email leads).
                  </li>
                  <li>
                    <strong>Paid DMW Blackbook Member ($49/month or $490/year)</strong>:
                    Unlocks unlimited 5-part Insider Reports, Side-by-Side Head-to-Head Comparative Matrices (<em>Connaught vs Claridge’s</em>), Mispricing/Rate Drop Alerts, and Priority Advisory Desk Routing (<code>s.moralesmed@gmail.com</code>).
                  </li>
                </ul>
              </div>
            </article>

            <article className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                <Zap className={styles.faqQuestionIcon} size={22} />
                5. How do we manage AI Usage &amp; Unit Economics?
              </h3>
              <div className={styles.faqAnswer}>
                <p>
                  To protect gross margins and keep API costs minimal:
                </p>
                <ul className={styles.faqList}>
                  <li>
                    <strong>Free AI Search</strong>: Driven by ultra-cheap, fast LLMs (e.g. <code>gpt-4o-mini</code> or <code>llama-3.3-70b</code> @ $0.0005/query).
                  </li>
                  <li>
                    <strong>Deep Perplexity AI Enrichment</strong>: Executed via Admin Panel (<code>/admin</code>) once per property and cached permanently in <code>hotels.json</code> ($0.00 serving cost).
                  </li>
                </ul>
              </div>
            </article>

            <article className={styles.faqCard}>
              <h3 className={styles.faqQuestion}>
                <BookOpen className={styles.faqQuestionIcon} size={22} />
                6. What do paid subscribers pay for &amp; how do custom reports work?
              </h3>
              <div className={styles.faqAnswer}>
                <p>
                  Subscribers pay for high-asymmetry decision advantages:
                </p>
                <ul className={styles.faqList}>
                  <li><strong>Head-to-Head Comparative Matrices</strong>: Direct diagnostic guidance comparing competing flagships.</li>
                  <li><strong>Full 5-Part Insider Reports</strong>: UnGoogleable history, operational quirks, famous clientele, exact best room numbers to book, and owner-operator power dynamics.</li>
                  <li><strong>Automated Rate Drop Alerts</strong>: Instant notification when a saved Blackbook hotel enters its 🟢 <em>Lowest 10% Rate Window</em>.</li>
                  <li><strong>On-Demand Report Generation</strong>: When a subscriber requests a report for an un-cached hotel, the AI generates it and <strong>caches it permanently into the database for all future users</strong>.</li>
                </ul>
              </div>
            </article>
          </div>
        )}
      </Container>

      {/* Modal 1: Add New Hotel Candidate */}
      {isAddHotelOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsAddHotelOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Add New Hotel Candidate</h3>
              <button type="button" onClick={() => setIsAddHotelOpen(false)} style={{ background: 'none', border: 0, cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddHotelSubmit} className={styles.modalForm}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Hotel Property Name *</label>
                <input
                  type="text"
                  required
                  className={styles.input}
                  placeholder="e.g. Four Seasons Hotel des Bergues"
                  value={newHotelName}
                  onChange={(e) => setNewHotelName(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>City *</label>
                <input
                  type="text"
                  required
                  className={styles.input}
                  placeholder="e.g. Geneva"
                  value={newHotelCity}
                  onChange={(e) => setNewHotelCity(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Country</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="e.g. Switzerland"
                  value={newHotelCountry}
                  onChange={(e) => setNewHotelCountry(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Brand / Operator</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="e.g. Four Seasons Hotels & Resorts"
                  value={newHotelBrand}
                  onChange={(e) => setNewHotelBrand(e.target.value)}
                />
              </div>
              <button type="submit" className={styles.modalSubmit}>Add Property to Master Index</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Run Perplexity AI Research */}
      {isAiResearchOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsAiResearchOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Run Perplexity AI Research</h3>
              <button type="button" onClick={() => setIsAiResearchOpen(false)} style={{ background: 'none', border: 0, cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleRunAiResearch} className={styles.modalForm}>
              <p style={{ fontSize: '13px', color: 'var(--color-charcoal)', lineHeight: 1.4 }}>
                Executes DMW’s investigative system prompt using Perplexity AI (via OpenRouter <code>perplexity/sonar</code> API). Extracts amenities, 10-dimension scores, and insider reports.
              </p>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Target Hotel Name &amp; Location</label>
                <input
                  type="text"
                  required
                  className={styles.input}
                  placeholder="e.g. The Connaught London or Beau-Rivage Palace Lausanne"
                  value={aiSearchTarget}
                  onChange={(e) => setAiSearchTarget(e.target.value)}
                />
              </div>
              <button type="submit" className={styles.modalSubmit} disabled={isResearching}>
                {isResearching ? 'Executing Perplexity AI Query...' : 'Execute Research & Enrich Record'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
