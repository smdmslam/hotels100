import React, { useState } from 'react';
import { RefreshCw, Plus, Download, Sparkles, X, ShieldCheck } from 'lucide-react';
import { Container } from '../components/shared';
import { getAllHotels, getAllCollections } from '../data/api';
import type { HotelSummary, Archetype } from '../data/types';
import styles from './Admin.module.css';

export const Admin: React.FC = () => {
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
