import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Send, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { getCollection } from '../../data/api';
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
  const [userEmail, setUserEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const advisoryCollection = getCollection('the-global-100');
  const allHotels = advisoryCollection?.hotels ?? [];

  // Smart tokenized relevance query matcher across name, location, archetype, lens, amenities, and price
  const filteredHotels = query.trim()
    ? allHotels.map((hotel: HotelSummary) => {
        const q = query.toLowerCase();
        const tokens = q.split(/\s+/).filter(t => t.length > 2 && !['with', 'under', 'from', 'hotel', 'hotels', 'and', 'the', 'for'].includes(t));
        
        const searchableText = `${hotel.name} ${hotel.location.city} ${hotel.location.country} ${hotel.location.neighbourhood || ''} ${hotel.archetype || ''} ${hotel.strategicLens || ''} ${hotel.dmwJudgement || ''} ${(hotel.essentialAmenities || []).map(a => a.label).join(' ')}`.toLowerCase();

        let score = 0;
        tokens.forEach(token => {
          if (searchableText.includes(token)) score += 2;
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
      .slice(0, 3)
    : allHotels.slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;

    // Simulate sending email inquiry to s.moralesmed@gmail.com
    console.log(`Sending Ask DMW inquiry to s.moralesmed@gmail.com from ${userEmail} with prompt: "${query}"`);
    setSubmitted(true);
  };

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
              onChange={(e) => { setQuery(e.target.value); setSubmitted(false); }}
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
                  onClick={() => { setQuery(preset.prompt); setSubmitted(false); }}
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

          {/* Section 4: Human Advisory Desk Backup */}
          <div className={styles.advisoryFormCard}>
            <h4 className={styles.advisoryFormTitle}>
              <ShieldCheck size={16} style={{ display: 'inline', marginRight: 6, color: 'var(--color-antique-gold)' }} />
              Request Direct Concierge Booking Assistance
            </h4>
            <p className={styles.advisoryFormSubtitle}>
              Route your generated shortlist and dates directly to the DMW Advisory Desk (<code>s.moralesmed@gmail.com</code>).
            </p>

            {submitted ? (
              <div style={{ padding: '12px 16px', background: 'rgba(197, 160, 89, 0.15)', border: '1px solid var(--color-antique-gold)', color: 'var(--color-ink)', fontSize: '13px', fontWeight: 600 }}>
                ✓ Your inquiry has been routed to s.moralesmed@gmail.com. Our desk will contact you within 4 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.inputGroup}>
                <input
                  type="email"
                  required
                  className={styles.emailInput}
                  placeholder="Enter executive email address..."
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <button type="submit" className={styles.submitButton}>
                  <Send size={14} /> Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
