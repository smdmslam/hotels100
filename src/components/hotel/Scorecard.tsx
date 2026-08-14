import React from 'react';
import type { Scorecard as ScorecardType } from '../../data/types';
import { SectionHeader } from '../shared/SectionHeader';
import styles from './Scorecard.module.css';

interface ScorecardProps {
  scores: ScorecardType;
}

export const Scorecard: React.FC<ScorecardProps> = ({ scores }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <SectionHeader 
            title="DMW Assessment Scorecard" 
            subtitle="Calculated across 10 strategic and operational dimensions."
          />
        </div>
        <div className={styles.totalScore}>
          <span className={styles.totalValue}>{scores.totalScore.toFixed(1)}</span>
          <span className={styles.totalMax}>/ 100</span>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span className={styles.colName}>Dimension</span>
          <span className={styles.colWeight}>Weight</span>
          <span className={styles.colScore}>Score</span>
        </div>
        
        {scores.dimensions.map((dim, i) => (
          <div key={i} className={styles.row}>
            <div className={styles.colName}>
              {dim.label}
              <div className={styles.barContainer}>
                <div 
                  className={styles.barFill} 
                  style={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                />
              </div>
            </div>
            <div className={styles.colWeight}>{dim.weight} pts</div>
            <div className={styles.colScore}>
              <span className={styles.scoreValue}>{dim.score.toFixed(1)}</span>
              <span className={styles.scoreMax}>/ {dim.maxScore}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
