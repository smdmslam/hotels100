import React from 'react';
import { Link } from 'react-router-dom';
import type { HotelSummary } from '../../data/types';
import { Badge } from '../shared/Badge';
import { MapPin, Building, ArrowRight } from 'lucide-react';
import styles from './RankedHotelItem.module.css';

interface RankedHotelItemProps {
  hotel: HotelSummary;
}

export const RankedHotelItem: React.FC<RankedHotelItemProps> = ({ hotel }) => {
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

      <div className={styles.actionColumn}>
        <Link to={hotel.profileUrl} className={styles.actionLink} aria-label={`View profile for ${hotel.name}`}>
          <ArrowRight size={24} strokeWidth={1} />
        </Link>
      </div>
    </article>
  );
};
