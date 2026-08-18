import React from 'react';
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import { Container } from '../components/shared';
import { getCollection, getIndexData } from '../data/api';
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

export const Home: React.FC = () => {
  const indexData = getIndexData();
  const globalCollection = getCollection('the-global-100');
  const globalHotels = globalCollection?.hotels ?? [];
  const previewHotels = globalHotels.slice(0, 5);
  const reportHotels = globalHotels.slice(0, 3);

  const notationItems = [
    { slug: 'the-global-100', label: 'Global 100 · No. 1' },
    { slug: 'the-london-50', label: 'London 50 · No. 1' },
    { slug: 'the-switzerland-50', label: 'Switzerland 50 · No. 1' },
    { slug: 'the-italian-and-swiss-lakes-35', label: 'Lakes 35 · No. 1' },
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
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{indexData.edition} Edition</span>
            <h1 className={styles.heroTitle}>{indexData.title}</h1>
            <p className={styles.heroSubtitle}>
              A global index of the hotels that best combine hospitality,
              brand, pricing power and enduring asset value.
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
                Browse all editions
              </a>
            </div>
          </div>
        </Container>

        <div className={styles.heroNotationBar}>
          <Container variant="wide">
            <div className={styles.notationGrid}>
              {notationItems.map((item) => (
                <div key={item.editionSlug} className={styles.notationItem}>
                  <Award
                    className={styles.notationIcon}
                    size={20}
                    strokeWidth={1.15}
                    aria-hidden="true"
                  />
                  <div className={styles.notationMeta}>
                    <span className={styles.notationEdition}>
                      {item.editionLabel}
                    </span>
                    <Link to={item.winnerUrl} className={styles.notationWinner}>
                      {item.winnerName}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
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

              <nav className={styles.collectionNav} aria-label="Hotel editions">
                <span className={styles.collectionLabel}>Explore editions</span>
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
              <span className={styles.darkEyebrow}>Coming soon · Ask DMW</span>
              <h2 id="ask-dmw-title">Build your own shortlist.</h2>
              <p>
                Describe the hotel, destination, price or experience you need.
                Ask DMW will build a ranked shortlist using the intelligence in
                our index.
              </p>
            </div>

            <div className={styles.askDemo} aria-label="Ask DMW preview">
              <div className={styles.promptPreview}>
                <span>Find the best-value highly ranked hotels in Zurich</span>
                <span className={styles.promptArrow} aria-hidden="true">→</span>
              </div>
              <div className={styles.promptExamples}>
                <span>London under $500</span>
                <span>Lakeside hotels for summer</span>
                <span>Paris for business travel</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.reportsSection}>
        <Container variant="wide">
          <header className={styles.reportsHeader}>
            <div>
              <span className={styles.sectionNumber}>02 — Intelligence</span>
              <h2 className={styles.sectionTitle}>Latest Hotel Reports</h2>
            </div>
            <Link to="/insights" className={styles.reportsAction}>
              View all insights <span aria-hidden="true">→</span>
            </Link>
          </header>

          <div className={styles.reportGrid}>
            <article className={`${styles.reportCard} ${styles.seasonalCard}`}>
              <Link
                to="/collections/the-italian-and-swiss-lakes-35"
                className={styles.reportLink}
              >
                <div className={styles.reportMedia}>
                  <img src="/assets/hero.png" alt="" />
                  <span className={styles.reportTag}>The Summer Edit</span>
                </div>
                <div className={styles.reportCopy}>
                  <span className={styles.reportMeta}>Riviera &amp; Lakes</span>
                  <h3>The hotels defining summer on the water</h3>
                  <span className={styles.readReport}>Explore the edit →</span>
                </div>
              </Link>
            </article>

            {reportHotels.map((hotel) => (
              <article key={hotel.id} className={styles.reportCard}>
                <Link to={hotel.profileUrl} className={styles.reportLink}>
                  <div className={styles.reportMedia}>
                    <img
                      src={hotel.primaryImage?.url || '/assets/placeholder-hero.jpg'}
                      alt={hotel.primaryImage?.alt || hotel.name}
                    />
                  </div>
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
    </main>
  );
};
