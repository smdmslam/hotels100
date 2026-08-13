import React from 'react';
import { Container, SectionHeader } from '../components/shared';
import styles from './Methodology.module.css';

export const Methodology: React.FC = () => {
  return (
    <div className={styles.page}>
      <Container variant="reading">
        <div className={styles.masthead}>
          <h1 className={styles.title}>The Methodology</h1>
          <p className={styles.subtitle}>
            How DMW Finance Group evaluates, scores, and ranks the world's most exceptional hotels.
          </p>
        </div>

        <div className={styles.notice}>
          <p>
            <strong>Note:</strong> The ranking displayed in this prototype is a design and methodology demonstration. 
            Final positions will be established following the completion of the DMW Hotels 100 research and review process.
          </p>
        </div>

        <section className={styles.section}>
          <SectionHeader title="The Thesis" />
          <div className={styles.prose}>
            <p>
              The DMW Hotels 100 is not a popularity contest, a booking algorithm, or a crowdsourced review platform. 
              It is an editorial index and hospitality-intelligence publication that evaluates hotels on their 
              strategic clarity, operational execution, and enduring asset value.
            </p>
            <p>
              We believe that true luxury hospitality is the intersection of a singular vision, flawless execution, 
              and commercial pricing power. Our methodology seeks to identify properties that master this intersection.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeader title="The 10-Dimension Scorecard" />
          <div className={styles.prose}>
            <p>Every candidate property is evaluated against ten weighted dimensions:</p>
            <ul className={styles.dimensionList}>
              <li>
                <strong>Proposition and Strategic Coherence (15%)</strong>
                <span>Does the hotel have a clear, non-generic reason to exist? Does it deliver on its core promise?</span>
              </li>
              <li>
                <strong>Service and Operating Execution (12%)</strong>
                <span>Consistency, anticipation, and emotional intelligence of the staff.</span>
              </li>
              <li>
                <strong>Distinctiveness and Emotional Resonance (12%)</strong>
                <span>The intangible atmosphere and memory-making capability of the property.</span>
              </li>
              <li>
                <strong>Rooms and Spatial Logic (10%)</strong>
                <span>Functional design, materiality, lighting, and layout of private spaces.</span>
              </li>
              <li>
                <strong>Asset Scarcity and Physical Context (10%)</strong>
                <span>The irreplicability of the building, location, or landscape.</span>
              </li>
              <li>
                <strong>Pricing Power and Revenue Strategy (10%)</strong>
                <span>The property's ability to command and justify premium rates within its competitive set.</span>
              </li>
              <li>
                <strong>Amenities and Hospitality Ecosystem (10%)</strong>
                <span>The quality and strategic value of F&B, wellness, and public spaces.</span>
              </li>
              <li>
                <strong>Brand and Clientele Coherence (8%)</strong>
                <span>How well the hotel curates and aligns with its target audience.</span>
              </li>
              <li>
                <strong>Business-Travel Effectiveness (7%)</strong>
                <span>Frictionless support for the working traveler (where applicable).</span>
              </li>
              <li>
                <strong>Long-Term Resilience (6%)</strong>
                <span>The asset's ability to withstand trend cycles and maintain relevance.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeader title="The Evidence Status" />
          <div className={styles.prose}>
            <p>
              Transparency is critical. We do not claim to have slept in every room of every hotel. 
              Instead, we clearly label the evidence basis for our evaluation:
            </p>
            <ul className={styles.evidenceList}>
              <li><strong>DMW Revisited:</strong> Recent, multiple, or extended personal assessments by DMW.</li>
              <li><strong>DMW Visited:</strong> A personal assessment by DMW, supported by desk research.</li>
              <li><strong>DMW Researched:</strong> Evaluated based on extensive market data, pricing intelligence, and verified third-party signals.</li>
            </ul>
          </div>
        </section>

      </Container>
    </div>
  );
};
