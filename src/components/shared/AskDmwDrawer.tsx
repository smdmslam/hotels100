import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Check, Send } from 'lucide-react';
import { getCollection } from '../../data/api';
import type { Amenity, HotelSummary } from '../../data/types';
import styles from './AskDmwDrawer.module.css';

interface AskDmwDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const PRESET_QUERIES = [
  'Zurich business hotel under $500 with gym',
  'Mayfair suites with private butler service',
  'Swiss Lakes & Léman luxury resort sanctuary',
  'Best high-ADR hotel in Dubai with beach',
  'Paris palace hotel with Michelin dining',
];

export const AskDmwDrawer: React.FC<AskDmwDrawerProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [userEmail, setUserEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const advisoryCollection = getCollection('the-global-100');
  const allHotels = advisoryCollection?.hotels ?? [];

  // Simple dynamic decision query matcher across city, name, amenities, archetype, and rates
  const filteredHotels = query.trim()
    ? allHotels.filter((hotel: HotelSummary) => {
        const q = query.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(q);
        const matchesCity = hotel.location.city.toLowerCase().includes(q);
        const matchesCountry = hotel.location.country.toLowerCase().includes(q);
        const matchesArchetype = (hotel.archetype || '').toLowerCase().includes(q);
        const matchesLens = (hotel.strategicLens || '').toLowerCase().includes(q);

        const amenityPool = [
          ...(hotel.essentialAmenities || []),
          ...(('amenities' in hotel && Array.isArray((hotel as HotelSummary & { amenities?: Amenity[] }).amenities))
            ? ((hotel as HotelSummary & { amenities?: Amenity[] }).amenities || [])
            : []),
        ];
        const matchesAmenity = amenityPool.some((a) => a.label.toLowerCase().includes(q));

        // Check price terms (e.g. under 500)
        let matchesPrice = true;
        if (q.includes('under 500') || q.includes('under $500') || q.includes('under €500')) {
          matchesPrice = !!(hotel.indicativeRate && hotel.indicativeRate.amount <= 500);
        }

        return (matchesName || matchesCity || matchesCountry || matchesArchetype || matchesLens || matchesAmenity) && matchesPrice;
      }).slice(0, 5)
    : allHotels.slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;

    // Simulate sending email inquiry to s.moralesmed@gmail.com
    console.log(`Sending Ask DMW inquiry to s.moralesmed@gmail.com from ${userEmail} with query: "${query}"`);
    setSubmitted(true);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <aside className={styles.drawer} aria-label="Ask DMW Advisory Drawer">
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.badge}>DMW Advisory Engine</span>
            <h2 className={styles.title}>Ask DMW</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close drawer">
            <X size={18} />
          </button>
        </header>

        <div className={styles.content}>
          <span className={styles.sectionLabel}>Bespoke Travel Intent Prompts</span>
          <div className={styles.presets}>
            {PRESET_QUERIES.map((preset) => (
              <button
                key={preset}
                type="button"
                className={styles.presetChip}
                onClick={() => { setQuery(preset); setSubmitted(false); }}
              >
                {preset}
              </button>
            ))}
          </div>

          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="e.g. Zurich business hotel under $500 with gym..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSubmitted(false); }}
            />
          </div>

          <span className={styles.sectionLabel}>
            {query.trim() ? `Recommended Shortlist (${filteredHotels.length} matched)` : 'Top Indexed Flagships'}
          </span>

          <div className={styles.resultsList}>
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel: HotelSummary) => (
                <Link
                  key={hotel.id}
                  to={hotel.profileUrl}
                  className={styles.resultCard}
                  onClick={onClose}
                >
                  <div className={styles.resultHeader}>
                    <span className={styles.resultName}>{hotel.name}</span>
                    <span className={styles.resultRank}>No. {hotel.rank}</span>
                  </div>
                  <span className={styles.resultLocation}>
                    {hotel.location.displayLocation} • {hotel.indicativeRate ? `$${hotel.indicativeRate.amount}/night` : 'Inquire for rate'}
                  </span>
                  <p className={styles.resultRationale}>
                    {hotel.dmwJudgement || `${hotel.archetype} asset delivering high proposition coherence.`}
                  </p>
                </Link>
              ))
            ) : (
              <p style={{ fontSize: '0.9rem', color: 'var(--color-stone)' }}>
                No direct matches found for "{query}". Try searching by city (e.g. Zurich, London, Paris, Geneva) or amenity.
              </p>
            )}
          </div>

          <div className={styles.emailSection}>
            <span className={styles.sectionLabel}>Save Shortlist or Inquire with DMW Desk</span>

            {submitted ? (
              <div className={styles.successMessage}>
                <Check size={18} style={{ color: 'var(--color-antique-gold)', marginBottom: 4 }} />
                <p><strong>Shortlist Inquiry Sent!</strong></p>
                <p>Your request has been routed to DMW Advisory (s.moralesmed@gmail.com). A senior travel strategist will follow up shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.emailForm}>
                <input
                  type="email"
                  required
                  className={styles.emailInput}
                  placeholder="Enter your email (e.g. principal@familyoffice.com)"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <button type="submit" className={styles.submitButton}>
                  Send Query to DMW Advisory <Send size={14} style={{ marginLeft: 6 }} />
                </button>
              </form>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
