import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../components/shared';
import { getIndexData, getCollection } from '../data/api';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const [viewMode] = useState<'published' | 'internal'>('published');
  const indexData = getIndexData();
  const globalCollection = getCollection('the-global-100');
  const globalHotels = globalCollection?.hotels?.slice(0, 5) ?? [];
  const allCollections = (require('../../07-content/collections.json') as any).collections;
  const publishedCollections = allCollections.filter((c: any) => c.title && c.slug);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <Container variant="wide" className={styles.heroContent}>
          <span className={styles.editionMeta}>{indexData.edition} Edition</span>
          <h1 className={styles.heroTitle}>{indexData.title}</h1>
          <p className={styles.heroSubtitle}>A global index of the hotels that best combine hospitality, brand, pricing power and enduring asset value.</p>
          <div className={styles.heroCtas}>
            <Link to="/collections/the-global-100" className={styles.heroCtaPrimary}>
              <Button variant="dark-primary">Explore the Global 100</Button>
            </Link>
            <Link to="/editions" className={styles.heroCtaSecondary}>Browse all editions</Link>
          </div>
        </Container>
      </section>

      {/* Global 100 Preview */}
      <section className={styles.globalPreview}>
        <Container variant="wide">
          <h2 className={styles.sectionTitle}>The Global 100</h2>
          <p className={styles.sectionSubtitle}>Top luxury hotels worldwide, ranked by DMW methodology.</p>
          <div className={styles.globalRows}>
            {globalHotels.map(hotel => (
              <div key={hotel.id} className={styles.globalRow}>
                <span className={styles.globalRank}>#{hotel.rank}</span>
                <Link to={hotel.profileUrl} className={styles.globalName}>{hotel.name}</Link>
                <span className={styles.globalLocation}>{hotel.location.displayLocation}</span>
                {hotel.scores && <span className={styles.globalScore}>Score: {hotel.scores.totalScore}</span>}
              </div>
            ))}
          </div>
          <Link to="/collections/the-global-100" className={styles.viewAll}>View the complete Global 100 →</Link>
        </Container>
      </section>

      {/* Edition Navigation */}
      <section className={styles.editionNav}>
        <Container variant="wide">
          <h2 className={styles.sectionTitle}>Explore Collections</h2>
          <ul className={styles.editionGrid}>
            {publishedCollections.map((col: any) => (
              <li key={col.slug} className={styles.editionItem}>
                <Link to={`/collections/${col.slug}`}>{col.title}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Ask DMW Placeholder */}
      <section className={styles.askDmw}>
        <Container variant="wide">
          <h2 className={styles.sectionTitle}>Build your own hotel shortlist</h2>
          <p className={styles.askDescription}>Soon you’ll be able to ask DMW to generate custom lists from our index.</p>
          <input readOnly placeholder="Find the best‑value highly ranked hotels in Zurich" className={styles.askInput} />
          <div className={styles.examples}>
            <span>Example: "Best boutique hotels in Paris"</span>
            <span>Example: "High‑value resorts in the Caribbean"</span>
            <span>Example: "Hotels with strong business travel scores in Tokyo"</span>
          </div>
          <span className={styles.comingSoon}>Coming soon</span>
        </Container>
      </section>

      {/* Latest Reports */}
      <section className={styles.latestReports}>
        <Container variant="wide">
          <h2 className={styles.sectionTitle}>Latest Hotel Reports</h2>
          <div className={styles.reportGrid}>
            {globalHotels.slice(0, 4).map(hotel => (
              <article key={hotel.id} className={styles.reportCard}>
                <img src={hotel.primaryImage?.url || '/assets/placeholder-hero.jpg'} alt={hotel.primaryImage?.alt || hotel.name} className={styles.reportImage} />
                <div className={styles.reportInfo}>
                  <h3>{hotel.name}</h3>
                  <p>{hotel.location.displayLocation}</p>
                  <Link to={hotel.profileUrl}>Read report</Link>
                </div>
              </article>
            ))}
            {/* Seasonal feature card */}
            <article className={styles.reportCard}>
              <div className={styles.reportInfo}>
                <h3>The Summer Edit</h3>
                <p>Spotlight on Côte d’Azur & Italian/Swiss Lakes collections.</p>
                <Link to="/collections/the-summer-edit">Explore</Link>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
};

