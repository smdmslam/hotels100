import React from 'react';
import { Link } from 'react-router-dom';
import type { HotelSummary, DimensionScore } from '../../data/types';
import { Badge } from '../shared/Badge';
import { MapPin, Building, ArrowRight, Tag } from 'lucide-react';
import styles from './RankedHotelItem.module.css';

interface RankedHotelItemProps {
  hotel: HotelSummary;
}

export const RankedHotelItem: React.FC<RankedHotelItemProps> = ({ hotel }) => {
  // Get top 3 dimensions to highlight
  let topDimensions: DimensionScore[] = [];
  if (hotel.scores?.dimensions) {
    // Sort by raw score or percentage of max score? Percentage makes more sense for highlighting strengths.
    topDimensions = [...hotel.scores.dimensions]
      .sort((a, b) => (b.score / b.maxScore) - (a.score / a.maxScore))
      .slice(0, 3);
  }

  return (
    <article className={styles.item}>
      <div className={styles.rankColumn}>
        <span className={styles.rankNumber}>{hotel.rank}</span>
      </div>
      
      <div className={styles.mainColumn}>
        <div className={styles.headerRow}>
          <h3 className={styles.name}>
            <Link to={hotel.profileUrl} className={styles.link}>
              {hotel.name}
            </Link>
          </h3>
          {hotel.featured && <Badge label="Featured Analysis" type="category" />}
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <MapPin size={14} />
            {hotel.location.displayLocation}
          </span>
          <span className={styles.metaItem}>
            <Building size={14} />
            {hotel.archetype}
          </span>
          {hotel.indicativeRate && (
            <span className={styles.metaItem}>
              <Tag size={14} />
              ~${hotel.indicativeRate.amount} / nt
            </span>
          )}
        </div>

        {hotel.dmwJudgement ? (
          <p className={styles.judgement}>{hotel.dmwJudgement}</p>
        ) : (
          <p className={styles.pending}>{hotel.assessmentPendingLabel}</p>
        )}

        <div className={styles.distinctions}>
          {hotel.distinctions.map((dist) => (
            <Badge key={dist} label={dist} type="distinction" />
          ))}
        </div>
      </div>

      {/* New Dimension Highlights Column */}
      <div className={styles.highlightsColumn}>
        {topDimensions.length > 0 && (
          <div className={styles.highlights}>
            <span className={styles.highlightsLabel}>Key Strengths</span>
            {topDimensions.map((dim, i) => (
              <div key={i} className={styles.highlightItem}>
                <span className={styles.highlightName}>{dim.label}</span>
                <div className={styles.highlightBar}>
                  <div 
                    className={styles.highlightFill} 
                    style={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Score Column */}
      <div className={styles.scoreColumn}>
        {hotel.scores ? (
          <div className={styles.scoreDisplay}>
            <span className={styles.scoreValue}>{hotel.scores.totalScore.toFixed(1)}</span>
            <span className={styles.scoreMax}>/ 100</span>
          </div>
        ) : (
          <span className={styles.noScore}>Pending</span>
        )}
      </div>

      <div className={styles.actionColumn}>
        <Link to={hotel.profileUrl} className={styles.actionLink} aria-label={`View profile for ${hotel.name}`}>
          <ArrowRight size={24} strokeWidth={1} />
        </Link>
      </div>
    </article>
  );
};
