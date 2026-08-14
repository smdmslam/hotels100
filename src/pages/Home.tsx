import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, SectionHeader } from '../components/shared';
import { getIndexData } from '../data/api';
import { ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const indexData = getIndexData();

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Container variant="wide">
          <div className={styles.heroContent}>
            <span className={styles.editionMeta}>{indexData.edition} Edition</span>
            <h1 className={styles.heroTitle}>{indexData.title}</h1>
            <p className={styles.heroSubtitle}>
              A global index of the hotels that best combine hospitality, brand, pricing power and enduring asset value.
            </p>
            <div className={styles.heroActions}>
              <Link to="/collections/the-global-100" className={styles.buttonLink}>
                <Button variant="dark-primary">The Global 100</Button>
              </Link>
              <Link to="/collections/the-europe-50" className={styles.buttonLink}>
                <Button variant="dark-secondary">The Europe 50</Button>
              </Link>
              <Link to="/collections/the-accessible-50" className={styles.buttonLink}>
                <Button variant="dark-secondary">The Accessible 50</Button>
              </Link>
            </div>
            
            <div className={styles.prototypeNotice}>
              <p>{indexData.prototypeNotice}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Insight Section */}
      <section className={styles.section}>
        <Container variant="standard">
          <SectionHeader 
            title="Strategic Insights" 
            action={
              <Link to="/insights" className={styles.viewAll}>
                View all insights <ArrowRight size={16} />
              </Link>
            } 
          />
          
          <div className={styles.featuredInsight}>
            <div className={styles.insightContent}>
              <span className={styles.insightCategory}>Hotel Strategy</span>
              <h3 className={styles.insightTitle}>Why St Martins Lane Works</h3>
              <p className={styles.insightExcerpt}>
                A masterclass in extracting maximum rate from a highly constrained building through sheer force of design and atmosphere. How a 1999 concept remains a template for modern lifestyle hospitality.
              </p>
              <Link to="/hotels/st-martins-lane-london">
                <Button variant="primary">Read the Analysis</Button>
              </Link>
            </div>
            <div className={styles.insightImagePlaceholder}>
              {/* Image placeholder to emulate visual spec */}
              <span>Visual Demo Placeholder</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
