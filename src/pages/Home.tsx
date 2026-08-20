import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Sparkles, Globe } from 'lucide-react';
import { Container } from '../components/shared';
import { AskDmwDrawer } from '../components/shared/AskDmwDrawer';
import { getCollection, getIndexData, getAllHotels } from '../data/api';
import styles from './Home.module.css';

const PUBLIC_COLLECTIONS = [
  { title: 'The Global 100', slug: 'the-global-100' },
  { title: 'The UAE 50', slug: 'the-uae-50' },
  { title: 'The London 50', slug: 'the-london-50' },
  { title: 'The Switzerland 50', slug: 'the-switzerland-50' },
  { title: 'The New York 50', slug: 'the-new-york-50' },
  { title: 'The Paris 25', slug: 'the-paris-25' },
  { title: 'The Zurich 25', slug: 'the-zurich-25' },
  { title: 'The Accessible 50', slug: 'the-accessible-50' },
  { title: 'London Under $500', slug: 'the-london-accessible' },
  {
    title: 'The Italian & Swiss Lakes 35',
    slug: 'the-italian-and-swiss-lakes-35',
  },
];

const SAMPLE_PROMPTS_STRUCTURED = [
  { text: "Find the best-value highly ranked hotels in ", highlight: "Zurich", raw: "Find the best-value highly ranked hotels in Zurich" },
  { text: "Quiet ", highlight: "Mayfair suite under $600/night", suffix: " with Michelin dining", raw: "Quiet Mayfair suite under $600/night with Michelin dining" },
  { text: "St. Moritz ", highlight: "ski-in/ski-out hotel", suffix: " with outstanding spa", raw: "St. Moritz ski-in/ski-out hotel with outstanding spa" },
  { text: "Top Paris 1st Arrondissement ", highlight: "luxury hotel for business travel", raw: "Top Paris 1st Arrondissement luxury hotel for business travel" },
  { text: "Swiss Lakes sanctuary with ", highlight: "private lake access and gym", raw: "Swiss Lakes sanctuary with private lake access and gym" },
  { text: "Dubai beachfront resort with ", highlight: "private pool villas under $1,200", raw: "Dubai beachfront resort with private pool villas under $1,200" },
  { text: "London luxury hotel with 24h service and ", highlight: "quiet courtyard", raw: "London luxury hotel with 24h room service and quiet courtyard" },
  { text: "New York Midtown boutique hotel with ", highlight: "high acoustic insulation", raw: "New York Midtown boutique hotel with high acoustic insulation" },
  { text: "Best Geneva luxury hotel for ", highlight: "private family office meetings", raw: "Best Geneva luxury hotel for private family office meetings" },
  { text: "Lake Como grand hotel with ", highlight: "lowest off-peak seasonal rates", raw: "Lake Como grand hotel with lowest off-peak seasonal rates" },
  { text: "Paris palace hotel with ", highlight: "exceptional butler protocol", raw: "Paris palace hotel with exceptional concierge and butler protocol" },
  { text: "Top Zurich hotel near Bahnhofstrasse with ", highlight: "24h fitness center", raw: "Top Zurich hotel near Bahnhofstrasse with 24h fitness center" },
  { text: "Best luxury hotel in Kyoto with ", highlight: "traditional garden views", raw: "Best luxury hotel in Kyoto with traditional garden views" },
  { text: "Mayfair grand hotel with ", highlight: "private dining room for 8 guests", raw: "Mayfair grand hotel with private dining room for 8 guests" },
  { text: "London hotel under $500/night with ", highlight: "5-star amenities", raw: "London hotel under $500/night with 5-star amenities" },
  { text: "Swiss Alpine resort with ", highlight: "Michelin dining and infinity pool", raw: "Swiss Alpine resort with Michelin-starred dining and infinity pool" },
  { text: "Tokyo high-floor suite with ", highlight: "quiet acoustic rating", raw: "Tokyo high-floor suite with quiet acoustic rating and city view" },
  { text: "Miami Beach historic luxury hotel with ", highlight: "quiet private cabanas", raw: "Miami Beach historic luxury hotel with quiet private cabanas" },
  { text: "Best Milan luxury boutique hotel near ", highlight: "fashion district", raw: "Best Milan luxury boutique hotel near fashion district" },
  { text: "Zurich lakefront hotel with ", highlight: "private boat shuttle service", raw: "Zurich lakefront hotel with private boat shuttle service" }
];

export const Home: React.FC = () => {
  const [askDmwOpen, setAskDmwOpen] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [drawerQuery, setDrawerQuery] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const indexData = getIndexData();
  const totalHotelsCount = getAllHotels().length;
  const globalCollection = getCollection('the-global-100');
  const globalHotels = globalCollection?.hotels ?? [];
  const previewHotels = globalHotels.slice(0, 5);
  const reportHotels = globalHotels.slice(0, 3);

  // Cycle through sample prompts every 5.5s with smooth fade
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setPromptIndex((prev) => (prev + 1) % SAMPLE_PROMPTS_STRUCTURED.length);
        setIsFading(false);
      }, 250);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentPrompt = SAMPLE_PROMPTS_STRUCTURED[promptIndex];

  const handleLaunchSearch = (targetQuery?: string) => {
    const queryToUse = targetQuery || userQuery || currentPrompt.raw;
    setDrawerQuery(queryToUse);
    setAskDmwOpen(true);
  };

  const notationItems = [
    { slug: 'the-global-100', label: 'Global 100 · No. 1' },
    { slug: 'the-switzerland-50', label: 'Switzerland 50 · No. 1' },
    { slug: 'the-italian-and-swiss-lakes-35', label: 'Lakes 35 · No. 1' },
    { slug: 'the-new-york-50', label: 'New York 50 · No. 1' },
    { slug: 'the-uae-50', label: 'UAE 50 · No. 1' },
  ].map((item) => {
    const col = getCollection(item.slug);
    const winner = col?.hotels?.[0];
    return {
      editionSlug: item.slug,
      editionLabel: item.label,
      winnerName: winner?.name ?? 'Top Property',
      winnerUrl: winner?.profileUrl ?? `/collections/${item.slug}`,
    };
  });

  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroShade} aria-hidden="true" />
        <Container variant="wide" className={styles.heroInner}>
          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>{indexData.edition} EDITION · {totalHotelsCount} EVALUATED ASSETS</span>
              <h1 className={styles.heroTitle}>The Global Luxury Hotel Index</h1>
              <p className={styles.heroSubtitle}>
                Evaluating {totalHotelsCount} trophy hotel properties across 10 operational dimensions, pricing power, and enduring asset value — anchored by the flagship Global 100.
              </p>
              <div className={styles.heroActions}>
                <Link
                  to="/collections/the-global-100"
                  className={styles.primaryAction}
                >
                  Explore the Global 100
                  <span aria-hidden="true">↗</span>
                </Link>
                <a href="#collections" className={styles.secondaryAction}>
                  Browse regional lists
                </a>
              </div>

              <div className={styles.heroAiRow}>
                <button
                  type="button"
                  className={styles.askDmwHeroAction}
                  onClick={() => handleLaunchSearch()}
                >
                  <Sparkles size={16} style={{ color: 'var(--color-antique-gold)' }} />
                  <span>LUXURY HOTEL DECISION ENGINE</span>
                </button>
              </div>
            </div>

            <div className={styles.heroWinnersStack} aria-label="Edition leaders">
              {notationItems.map((item) => (
                <div key={item.editionSlug} className={styles.badgeItem}>
                  <Award
                    className={styles.badgeIcon}
                    size={22}
                    strokeWidth={1.15}
                    aria-hidden="true"
                  />
                  <div className={styles.badgeMeta}>
                    <span className={styles.badgeEdition}>
                      {item.editionLabel}
                    </span>
                    <Link to={item.winnerUrl} className={styles.badgeWinner}>
                      {item.winnerName}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.indexSection} id="collections">
        <Container variant="wide">
          <div className={styles.indexLayout}>
            <header className={styles.indexIntroduction}>
              <span className={styles.sectionNumber}>01 — The Index</span>
              <h2 className={styles.sectionTitle}>The Global 100</h2>
              <p className={styles.sectionLead}>
                One hundred hotels assessed through the combined lenses of
                hospitality, brand strength, pricing power and asset value.
              </p>

              <nav className={styles.collectionNav} aria-label="Hotel collections">
                <span className={styles.collectionLabel}>Explore regional &amp; thematic collections</span>
                <ul className={styles.collectionList}>
                  {PUBLIC_COLLECTIONS.map((collection) => (
                    <li key={collection.slug}>
                      <Link to={`/collections/${collection.slug}`}>
                        {collection.title}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </header>

            <div className={styles.rankingPreview}>
              <div className={styles.rankingHeader} aria-hidden="true">
                <span>Rank</span>
                <span>Hotel</span>
                <span>Location</span>
                <span>DMW</span>
              </div>

              <ol className={styles.rankingList}>
                {previewHotels.map((hotel) => (
                  <li key={hotel.id} className={styles.rankingRow}>
                    <span className={styles.rankNumber}>
                      {String(hotel.rank).padStart(2, '0')}
                    </span>
                    <Link to={hotel.profileUrl} className={styles.hotelName}>
                      {hotel.name}
                    </Link>
                    <span className={styles.hotelLocation}>
                      {hotel.location.displayLocation}
                    </span>
                    <span className={styles.hotelScore}>
                      {hotel.scores ? hotel.scores.totalScore.toFixed(1) : '—'}
                    </span>
                  </li>
                ))}
              </ol>

              <Link
                to="/collections/the-global-100"
                className={styles.indexAction}
              >
                View the complete Global 100
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.askSection} aria-labelledby="ask-dmw-title">
        <Container variant="wide">
          <div className={styles.askLayout}>
            <div className={styles.askIntroduction}>
              <span className={styles.darkEyebrow}>DMW HOTELS 100</span>
              <h2 id="ask-dmw-title">Luxury Hotel Decision Engine.</h2>
              <p>
                Describe your destination, suite needs, acoustic priorities, or budget below. Our decision engine queries 326 evaluated trophy assets to generate your exact property match.
              </p>

              <div className={styles.engineBadgesRow}>
                <span className={styles.engineBadgeFast}>
                  <Sparkles size={14} style={{ color: 'var(--color-antique-gold)' }} />
                  <strong>Hotel Search (AI)</strong>: Full-Site Intelligence
                </span>
                <span className={styles.engineBadgePro}>
                  <Globe size={14} style={{ color: '#38bdf8' }} />
                  <strong>Hotel Search (AI Plus)</strong>: Full-Site Search + Live Web Synthesis
                </span>
              </div>
            </div>

            <div className={styles.askDemo} aria-label="Ask DMW interactive intent search">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLaunchSearch();
                }}
                className={styles.askSearchForm}
              >
                <div
                  className={styles.askInputWrapper}
                  onClick={() => inputRef.current?.focus()}
                >
                  {userQuery ? (
                    <input
                      ref={inputRef}
                      type="text"
                      className={styles.askSearchInputActive}
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      placeholder="Describe your target hotel or travel preferences..."
                      aria-label="Describe your target hotel or travel preferences"
                    />
                  ) : (
                    <div className={`${styles.promptDisplayContainer} ${isFading ? styles.promptFading : ''}`}>
                      <span className={styles.quoteMark}>“</span>
                      <span className={styles.promptTextNormal}>{currentPrompt.text}</span>
                      <span className={styles.promptTextGold}>{currentPrompt.highlight}</span>
                      {currentPrompt.suffix && (
                        <span className={styles.promptTextNormal}>{currentPrompt.suffix}</span>
                      )}
                      <span className={styles.quoteMark}>”</span>

                      <input
                        ref={inputRef}
                        type="text"
                        className={styles.askSearchInputHidden}
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        aria-label="Describe your target hotel or travel preferences"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className={styles.askSubmitButton}
                    title="Execute AI Search & Build Shortlist"
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </form>

              <div className={styles.promptPresetPills}>
                <span className={styles.pillsLabel}>Sample Prompts:</span>
                {[
                  "Zurich business under $500",
                  "Mayfair Michelin dining",
                  "St. Moritz Ski & Spa",
                  "Paris Palace Suites",
                  "Lake Como Off-Peak"
                ].map((pillText) => (
                  <button
                    key={pillText}
                    type="button"
                    className={styles.presetPillButton}
                    onClick={() => handleLaunchSearch(pillText)}
                  >
                    {pillText} ↗
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.reportsSection}>
        <Container variant="wide">
          <header className={styles.sectionHeader}>
            <div className={styles.sectionHeaderTitle}>
              <span className={styles.darkEyebrow}>Strategic Publishing &amp; Briefings</span>
              <h2 className={styles.sectionTitle}>Monthly Intelligence &amp; Hotel Briefings</h2>
            </div>
            <Link to="/insights" className={styles.reportsAction}>
              View all insights <span aria-hidden="true">→</span>
            </Link>
          </header>

          <div className={styles.reportGrid}>
            <article className={`${styles.reportCard} ${styles.seasonalCard}`}>
              <Link
                to="/insights"
                className={styles.reportLink}
              >
                <div className={styles.reportMedia}>
                  <span className={styles.reportTag}>August 2026 Strategic Report</span>
                </div>
                <div className={styles.reportCopy}>
                  <span className={styles.reportMeta}>Macro Industry Briefing</span>
                  <h3>The Compression Pricing Surge: Why Event Demand Inflates Trophy ADRs by 85%</h3>
                  <span className={styles.readReport}>Read strategic briefing →</span>
                </div>
              </Link>
            </article>

            {reportHotels.map((hotel) => (
              <article key={hotel.id} className={styles.reportCard}>
                <Link to={hotel.profileUrl} className={styles.reportLink}>
                  {hotel.primaryImage?.url && (
                    <div className={styles.reportMedia}>
                      <img
                        src={hotel.primaryImage.url}
                        alt={hotel.primaryImage.alt || hotel.name}
                      />
                    </div>
                  )}
                  <div className={styles.reportCopy}>
                    <span className={styles.reportMeta}>
                      {hotel.location.displayLocation}
                    </span>
                    <h3>{hotel.name}</h3>
                    <span className={styles.readReport}>Read report →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <AskDmwDrawer isOpen={askDmwOpen} onClose={() => setAskDmwOpen(false)} initialQuery={drawerQuery} />
    </main>
  );
};
