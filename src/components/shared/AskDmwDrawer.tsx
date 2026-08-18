import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { getAllHotels } from '../../data/api';
import type { HotelSummary } from '../../data/types';
import styles from './AskDmwDrawer.module.css';

interface AskDmwDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const PRESET_PROMPTS = [
  { label: '💼 Zurich Business under $500', prompt: 'Zurich business trip for 3 nights, quiet room, proper gym, under $500' },
  { label: '🎩 Mayfair Butler Suites', prompt: 'London Mayfair suites with private butler service and quiet aspect' },
  { label: '🏔️ Swiss Lakes & Léman Sanctuary', prompt: 'Swiss Lakes & Léman luxury resort sanctuary with lakefront views' },
  { label: '🌴 Dubai Beach & High-ADR', prompt: 'Dubai high-ADR luxury resort with private beach and quiet pool' },
  { label: '🇫🇷 Paris Palace & Michelin Dining', prompt: 'Paris luxury palace hotel with Michelin dining and central location' },
];

export const AskDmwDrawer: React.FC<AskDmwDrawerProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery || 'Zurich business trip for 3 nights, quiet room, proper gym, under $500');

  if (!isOpen) return null;

  const allHotels = getAllHotels();

  // Smart location-strict & price-strict AI relevance query matcher across all 310+ hotels
  const filteredHotels = query.trim()
    ? (() => {
        const q = query.toLowerCase();
        const tokens = q.split(/\s+/).filter(t => t.length > 2 && !['with', 'under', 'from', 'hotel', 'hotels', 'and', 'the', 'for', 'trip', 'nights', 'room'].includes(t));

        // Location constraint keywords
        const locationKeywords = ['zurich', 'london', 'paris', 'dubai', 'switzerland', 'lakes', 'léman', 'leman', 'new york', 'bangkok', 'tokyo', 'geneva', 'ascona', 'lausanne', 'vevey', 'montreux'];
        const specifiedLocations = locationKeywords.filter(loc => q.includes(loc));

        return allHotels.map((hotel: HotelSummary) => {
          let score = 0;
          const searchableText = `${hotel.name} ${hotel.location.city} ${hotel.location.country} ${hotel.location.neighbourhood || ''} ${hotel.archetype || ''} ${hotel.strategicLens || ''} ${hotel.dmwJudgement || ''} ${(hotel.essentialAmenities || []).map(a => a.label).join(' ')}`.toLowerCase();

          // Strict location enforcement if query specifies a city/country/region
          if (specifiedLocations.length > 0) {
            const matchesLocation = specifiedLocations.some(loc => 
              hotel.location.city.toLowerCase().includes(loc) || 
              hotel.location.country.toLowerCase().includes(loc) ||
              (hotel.location.displayLocation && hotel.location.displayLocation.toLowerCase().includes(loc)) ||
              (loc === 'lakes' || loc === 'léman' || loc === 'leman' ? (hotel.location.city.toLowerCase().includes('ascona') || hotel.location.city.toLowerCase().includes('lausanne') || hotel.location.city.toLowerCase().includes('vevey') || hotel.location.city.toLowerCase().includes('montreux') || hotel.location.city.toLowerCase().includes('geneva') || hotel.location.country.toLowerCase().includes('switzerland')) : false)
            );
            if (!matchesLocation) return { hotel, score: -1, priceMatch: false };
          }

          tokens.forEach(token => {
            if (searchableText.includes(token)) score += 3;
          });

          // Price filter handling
          let priceMatch = true;
          if (q.includes('under 500') || q.includes('under $500') || q.includes('under €500')) {
            priceMatch = !!(hotel.indicativeRate && hotel.indicativeRate.amount <= 500);
          } else if (q.includes('under 1000') || q.includes('under $1000') || q.includes('under €1000')) {
            priceMatch = !!(hotel.indicativeRate && hotel.indicativeRate.amount <= 1000);
          }

          return { hotel, score, priceMatch };
        })
        .filter(item => item.score > 0 && item.priceMatch)
        .sort((a, b) => b.score - a.score || a.hotel.rank - b.hotel.rank)
        .map(item => item.hotel)
        .slice(0, 3);
      })()
    : allHotels.slice(0, 3);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <aside className={styles.drawer} aria-label="Ask DMW AI Advisory Engine Drawer">
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.badge}>
              <Sparkles size={13} />
              DMW AI Advisory Engine
            </span>
            <h2 className={styles.title}>ASK DMW AI — DECISION DESK</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close drawer">
            <X size={18} />
          </button>
        </header>

        <div className={styles.content}>
          {/* Section 1: Executive Preface (What is this, what does it do?) */}
          <div className={styles.prefaceCard}>
            <h3 className={styles.prefaceTitle}>
              <Compass size={18} style={{ color: 'var(--color-antique-gold)' }} />
              What is the DMW AI Advisory Engine?
            </h3>
            <p className={styles.prefaceText}>
              Describe your specific trip requirements in plain language (location, budget limits, quiet work environment, serious gym, butler service, or neighborhood). Our decision engine evaluates 310 trophy assets across 10 DMW dimensions to instantly build your tailored 3-property shortlist.
            </p>
          </div>

          {/* Section 2: Unified Hero AI Prompt Input */}
          <div className={styles.promptBox}>
            <div className={styles.sectionLabel}>
              <span>Enter Trip Requirements (AI Prompt)</span>
              <span style={{ fontSize: '10px', color: 'var(--color-antique-gold)' }}>AI Matched</span>
            </div>
            <textarea
              className={styles.promptTextarea}
              placeholder='e.g., "Zurich business trip for 3 nights, quiet room, proper gym, under $500"'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className={styles.presetsLabel} style={{ marginTop: 12 }}>
              Click Preset Scenario to Test:
            </div>
            <div className={styles.presets}>
              {PRESET_PROMPTS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  className={styles.presetChip}
                  onClick={() => setQuery(preset.prompt)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: AI Matched Shortlist (3 Tailored Properties) */}
          <div className={styles.sectionLabel}>
            <span>Recommended AI Shortlist ({filteredHotels.length} matched)</span>
            <span style={{ fontSize: '10px', color: 'var(--color-stone)' }}>Ranked by DMW Coherence</span>
          </div>

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
                    <strong>DMW Assessment:</strong> {hotel.dmwJudgement || `${hotel.archetype} asset delivering high proposition coherence for business and leisure.`}
                  </p>
                </Link>
              ))
            ) : (
              <p style={{ fontSize: '0.9rem', color: 'var(--color-stone)' }}>
                No direct matches found for "{query}". Try adjusting keywords (e.g. Zurich, London, Paris, quiet, gym, under $500).
              </p>
            )}
          </div>

          {/* Section 4: Direct Concierge Desk (Coming Soon) */}
          <div className={styles.advisoryFormCard}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <h4 className={styles.advisoryFormTitle} style={{ margin: 0 }}>
                <ShieldCheck size={16} style={{ display: 'inline', marginRight: 6, color: 'var(--color-antique-gold)' }} />
                DMW Personal Concierge Desk
              </h4>
              <span style={{ padding: '3px 8px', border: '1px solid var(--color-antique-gold)', background: 'rgba(197, 160, 89, 0.15)', color: 'var(--color-antique-gold)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Coming Soon
              </span>
            </div>
            <p className={styles.advisoryFormSubtitle} style={{ marginBottom: 0 }}>
              Direct human concierge booking and VIP amenity routing will be available exclusively to DMW Blackbook Pro Members in V2. For immediate reservations, use direct hotel links on individual property scorecards.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
