import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, SectionHeader } from '../components/shared';
import { getIndexData } from '../data/api';
import { ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const [viewMode, setViewMode] = useState<'published' | 'internal'>('published');
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
            <div className={styles.tabToggle} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setViewMode('published')} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: '0.5rem 1rem', 
                  cursor: 'pointer',
                  borderBottom: viewMode === 'published' ? '2px solid var(--accent)' : '2px solid transparent',
                  color: viewMode === 'published' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'Inter',
                  fontSize: '0.875rem'
                }}
              >
                Published Editions
              </button>
              <button 
                onClick={() => setViewMode('internal')} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: '0.5rem 1rem', 
                  cursor: 'pointer',
                  borderBottom: viewMode === 'internal' ? '2px solid var(--accent)' : '2px solid transparent',
                  color: viewMode === 'internal' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'Inter',
                  fontSize: '0.875rem'
                }}
              >
                Internal Research
              </button>
            </div>

            <div className={styles.heroActions}>
              {viewMode === 'published' ? (
                <>
                  <Link to="/collections/the-global-100" className={styles.buttonLink}>
                    <Button variant="dark-primary">The Global 100</Button>
                  </Link>
                  <Link to="/collections/the-london-50" className={styles.buttonLink}>
                    <Button variant="dark-secondary">The London 50</Button>
                  </Link>
                  <Link to="/collections/the-new-york-50" className={styles.buttonLink}>
                    <Button variant="dark-secondary">The New York 50</Button>
                  </Link>
                  <Link to="/collections/the-zurich-25" className={styles.buttonLink}>
                    <Button variant="dark-secondary">The Zurich 25</Button>
                  </Link>
                  <Link to="/collections/the-accessible-50" className={styles.buttonLink}>
                    <Button variant="dark-secondary">The Accessible 50</Button>
                  </Link>
                  <Link to="/collections/the-london-accessible" className={styles.buttonLink}>
                    <Button variant="dark-secondary">The London Accessible (Under $500)</Button>
                  </Link>
                  <Link to="/collections/the-paris-25" className={styles.buttonLink}>
                    <Button variant="dark-secondary">The Paris 25</Button>
                  </Link>
                  <Link to="/collections/the-italian-and-swiss-lakes-35" className={styles.buttonLink}>
                    <Button variant="dark-secondary">The Italian & Swiss Lakes 35</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/collections/the-monaco-and-eastern-riviera-30" className={styles.buttonLink}>
                    <Button variant="dark-primary">Monaco & Eastern Riviera 30</Button>
                  </Link>
                </>
              )}
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
