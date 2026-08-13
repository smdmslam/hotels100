import React from 'react';
import { Container, SectionHeader, Button } from '../components/shared';
import { Link } from 'react-router-dom';
import styles from './Insights.module.css';

export const Insights: React.FC = () => {
  return (
    <div className={styles.page}>
      <Container variant="standard">
        <div className={styles.masthead}>
          <h1 className={styles.title}>Strategic Insights</h1>
          <p className={styles.subtitle}>
            Editorial analysis, field reports, and pricing intelligence from the DMW network.
          </p>
        </div>

        <section className={styles.section}>
          <SectionHeader title="Latest Analysis" />
          
          <div className={styles.grid}>
            <article className={styles.card}>
              <span className={styles.category}>Field Report & Analysis</span>
              <h2 className={styles.cardTitle}>Why St Martins Lane Works</h2>
              <p className={styles.cardExcerpt}>
                A masterclass in extracting maximum rate from a highly constrained building through sheer force of design and atmosphere.
              </p>
              <Link to="/hotels/st-martins-lane-london">
                <Button variant="text">Read Analysis</Button>
              </Link>
            </article>

            {/* Placeholder cards for prototype */}
            <article className={styles.card}>
              <span className={styles.category}>Methodology</span>
              <h2 className={styles.cardTitle}>The Boardroom Consensus</h2>
              <p className={styles.cardExcerpt}>
                Why we use La Liste and Forbes as counterweights to fashion-driven hotel rankings.
              </p>
              <Link to="/methodology">
                <Button variant="text">Read Methodology</Button>
              </Link>
            </article>
          </div>
        </section>
      </Container>
    </div>
  );
};
