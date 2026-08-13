import React from 'react';
import { Container, SectionHeader } from '../components/shared';
import styles from './Methodology.module.css';

export const About: React.FC = () => {
  return (
    <div className={styles.page}>
      <Container variant="reading">
        <div className={styles.masthead}>
          <h1 className={styles.title}>About DMW Finance Group</h1>
          <p className={styles.subtitle}>
            Strategic intelligence and advisory for the luxury hospitality sector.
          </p>
        </div>

        <section className={styles.section}>
          <SectionHeader title="Our Focus" />
          <div className={styles.prose}>
            <p>
              DMW Finance Group provides independent strategic analysis on the global luxury hotel market. 
              We look beyond basic hospitality metrics to evaluate the intersection of real estate, 
              brand equity, and operating excellence.
            </p>
          </div>
        </section>

      </Container>
    </div>
  );
};
