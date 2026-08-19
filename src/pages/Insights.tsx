import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/shared';
import { getAllHotels } from '../data/api';
import styles from './Insights.module.css';

export const Insights: React.FC = () => {
  const allHotels = getAllHotels();
  const connaught = allHotels.find(h => h.slug === 'the-connaught');
  const beauRivage = allHotels.find(h => h.slug === 'beau-rivage-palace-lausanne');
  const amanNy = allHotels.find(h => h.slug === 'aman-new-york');

  return (
    <main className={styles.page}>
      <Container variant="wide">
        <header className={styles.masthead}>
          <span className={styles.eyebrow}>DMW Publishing &amp; Intelligence Engine</span>
          <h1 className={styles.title}>Strategic Insights &amp; Briefings</h1>
          <p className={styles.subtitle}>
            Monthly macro industry reports, curated regional collection briefings, and high-asymmetry trophy asset Insider Reports.
          </p>
        </header>

        {/* Track 1: Monthly Strategic Macro Report */}
        <section className={styles.featuredSection}>
          <article className={styles.featuredCard}>
            <span className={styles.featuredCategory}>August 2026 Monthly Strategic Macro Briefing</span>
            <h2 className={styles.featuredTitle}>
              The Compression Pricing Surge: Why Event Demand Inflates Trophy ADRs by 85%
            </h2>
            <p className={styles.featuredExcerpt}>
              A top-down analysis combining DMW’s 310-hotel pricing curve dataset with Perplexity macro market intelligence. Explores why tier-1 luxury flagships in London, Paris, and Milan command massive rate inelasticity during compressed event windows (Fashion Week, Frieze, Formula 1), and how smart buyers exploit the off-peak value sweet spots.
            </p>

            <div className={styles.macroPoints}>
              <div className={styles.macroPoint}>
                <span className={styles.macroPointLabel}>Average Compression Spike</span>
                <span className={styles.macroPointValue}>+85.4% ADR Premium</span>
              </div>
              <div className={styles.macroPoint}>
                <span className={styles.macroPointLabel}>Highest Rate Resilience</span>
                <span className={styles.macroPointValue}>Mayfair &amp; Paris 1st Arr.</span>
              </div>
              <div className={styles.macroPoint}>
                <span className={styles.macroPointLabel}>Value Sweet Window</span>
                <span className={styles.macroPointValue}>Late Oct &amp; Mid-Nov</span>
              </div>
            </div>
          </article>
        </section>

        {/* Track 2: Curated Collection Briefings */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Curated Collection Summary Briefings</h2>
          <div className={styles.grid}>
            <article className={styles.card}>
              <span className={styles.cardCategory}>Summer 2026 Edition</span>
              <h3 className={styles.cardTitle}>The Italian &amp; Swiss Lakes 35</h3>
              <p className={styles.cardExcerpt}>
                A yield and asset assessment of trophy lakeside sanctuaries across Lake Como, Lake Léman, Lake Lugano, and Lake Maggiore.
              </p>
              <Link to="/collections/the-italian-and-swiss-lakes-35" style={{ color: 'var(--color-antique-gold)', fontWeight: 600, textDecoration: 'none', fontSize: '13px' }}>
                Explore Collection Briefing →
              </Link>
            </article>

            <article className={styles.card}>
              <span className={styles.cardCategory}>Accessible Luxury Briefing</span>
              <h3 className={styles.cardTitle}>London Under $500 Yield Analysis</h3>
              <p className={styles.cardExcerpt}>
                Extracting maximum proposition coherence and business utility from high-performing London assets under $500/night.
              </p>
              <Link to="/collections/the-london-accessible" style={{ color: 'var(--color-antique-gold)', fontWeight: 600, textDecoration: 'none', fontSize: '13px' }}>
                Explore Collection Briefing →
              </Link>
            </article>

            <article className={styles.card}>
              <span className={styles.cardCategory}>Flagship Benchmark</span>
              <h3 className={styles.cardTitle}>The Global 100 Edition 2026</h3>
              <p className={styles.cardExcerpt}>
                The global benchmark indexing the 100 trophy hotel assets that best combine hospitality execution, brand, and pricing power.
              </p>
              <Link to="/collections/the-global-100" style={{ color: 'var(--color-antique-gold)', fontWeight: 600, textDecoration: 'none', fontSize: '13px' }}>
                Explore Collection Briefing →
              </Link>
            </article>
          </div>
        </section>

        {/* Track 3: Trophy Asset Insider Spotlights */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Trophy Asset Insider Spotlights</h2>
          <div className={styles.grid}>
            {connaught && (
              <article className={styles.card}>
                <span className={styles.cardCategory}>Global Rank No. 1 • Score 98.6</span>
                <h3 className={styles.cardTitle}>{connaught.name}</h3>
                <p className={styles.cardExcerpt}>
                  {connaught.insiderReport?.theTrueBestRoom || connaught.dmwJudgement}
                </p>
                <Link to={connaught.profileUrl} style={{ color: 'var(--color-antique-gold)', fontWeight: 600, textDecoration: 'none', fontSize: '13px' }}>
                  Read Insider Spotlight →
                </Link>
              </article>
            )}

            {beauRivage && (
              <article className={styles.card}>
                <span className={styles.cardCategory}>Switzerland Rank No. 1 • Score 96.8</span>
                <h3 className={styles.cardTitle}>{beauRivage.name}</h3>
                <p className={styles.cardExcerpt}>
                  {beauRivage.insiderReport?.theTrueBestRoom || beauRivage.dmwJudgement}
                </p>
                <Link to={beauRivage.profileUrl} style={{ color: 'var(--color-antique-gold)', fontWeight: 600, textDecoration: 'none', fontSize: '13px' }}>
                  Read Insider Spotlight →
                </Link>
              </article>
            )}

            {amanNy && (
              <article className={styles.card}>
                <span className={styles.cardCategory}>New York Flagship • Score 95.4</span>
                <h3 className={styles.cardTitle}>{amanNy.name}</h3>
                <p className={styles.cardExcerpt}>
                  {amanNy.insiderReport?.theTrueBestRoom || amanNy.dmwJudgement}
                </p>
                <Link to={amanNy.profileUrl} style={{ color: 'var(--color-antique-gold)', fontWeight: 600, textDecoration: 'none', fontSize: '13px' }}>
                  Read Insider Spotlight →
                </Link>
              </article>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
};
