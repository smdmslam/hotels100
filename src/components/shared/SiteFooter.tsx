import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';
import styles from './SiteFooter.module.css';

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container variant="wide">
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <h2 className={styles.brandTitle}>DMW Hotels 100</h2>
            <p className={styles.publisher}>Published by DMW Finance Group</p>
            <p className={styles.edition}>{currentYear} Edition</p>
          </div>

          <div className={styles.navColumn}>
            <nav className={styles.navLinks}>
              <Link to="/the-100">The 100</Link>
              <Link to="/insights">Insights</Link>
              <Link to="/methodology">Methodology</Link>
              <Link to="/about">About DMW</Link>
            </nav>
          </div>

          <div className={styles.legalColumn}>
            <nav className={styles.legalLinks}>
              <a href="#">Contact</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Image Credits</a>
            </nav>
            <p className={styles.copyright}>
              &copy; {currentYear} DMW Finance Group. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
