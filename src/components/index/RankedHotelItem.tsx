import React from 'react';
import { Link, useParams } from 'react-router-dom';
import type { DimensionScore, HotelSummary } from '../../data/types';
import styles from './RankedHotelItem.module.css';

interface RankedHotelItemProps { hotel: HotelSummary; }

export const RankedHotelItem: React.FC<RankedHotelItemProps> = ({ hotel }) => {
  const { slug } = useParams<{ slug: string }>();
  let topDimensions: DimensionScore[] = [];

  if (hotel.scores?.dimensions) {
    topDimensions = [...hotel.scores.dimensions]
      .sort((a, b) => b.score / b.maxScore - a.score / a.maxScore)
      .slice(0, 3);
  }

  return (
    <article className={styles.item}>
      <div className={styles.rankBlock} aria-label={`Rank ${hotel.rank}`}>
        <span className={styles.rankLabel}>Rank</span>
        <span className={styles.rankNumber}>{String(hotel.rank).padStart(2, '0')}</span>
      </div>

      <div className={styles.identity}>
        <h2 className={styles.name}>
          <Link to={hotel.profileUrl} state={{ collectionSlug: slug }}>{hotel.name}</Link>
        </h2>
        <div className={styles.meta}>
          <span>{hotel.location.displayLocation}</span>
          <span>{hotel.archetype}</span>
          {hotel.indicativeRate && <span>~${hotel.indicativeRate.amount} / night</span>}
        </div>
        {hotel.strategicLens && <p className={styles.lens}>{hotel.strategicLens}</p>}
        {hotel.dmwJudgement && <p className={styles.judgement}>{hotel.dmwJudgement}</p>}
      </div>

      <div className={styles.strengths}>
        <span className={styles.columnLabel}>Key strengths</span>
        {topDimensions.length > 0 ? topDimensions.map((dimension) => {
          const percentage = Math.round((dimension.score / dimension.maxScore) * 100);
          return (
            <div className={styles.gauge} key={dimension.label}>
              <div className={styles.gaugeHeader}>
                <span>{dimension.label}</span>
                <span>{percentage}%</span>
              </div>
              <div className={styles.gaugeTrack} aria-label={`${dimension.label}: ${percentage}%`}>
                <div className={styles.gaugeFill} style={{ width: `${percentage}%` }} />
              </div>
            </div>
          );
        }) : <span className={styles.pending}>Assessment in preparation</span>}
      </div>

      <div className={styles.scoreAndAction}>
        {hotel.scores && (
          <div className={styles.score}>
            <span className={styles.scoreLabel}>DMW score</span>
            <div><strong>{hotel.scores.totalScore.toFixed(1)}</strong><span>/100</span></div>
          </div>
        )}
        <Link to={hotel.profileUrl} state={{ collectionSlug: slug }} className={styles.profileLink}>
          View profile <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
};
