import React from 'react';
import type { InsiderReport as InsiderReportType } from '../../data/types';
import { Eye, Key, MapPin, Users, Building } from 'lucide-react';
import styles from './InsiderReport.module.css';

interface InsiderReportProps {
  report: InsiderReportType;
}

export const InsiderReport: React.FC<InsiderReportProps> = ({ report }) => {
  if (!report) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Eye className={styles.headerIcon} />
        <h3 className={styles.title}>The Insider Report</h3>
      </div>

      <div className={styles.grid}>
        {report.unGoogleableHistory && (
          <div className={styles.item}>
            <div className={styles.itemHeader}>
              <Key className={styles.icon} size={16} />
              <h4>Secret Lore</h4>
            </div>
            <p className={styles.text}>{report.unGoogleableHistory}</p>
          </div>
        )}

        {report.theTrueBestRoom && (
          <div className={styles.item}>
            <div className={styles.itemHeader}>
              <MapPin className={styles.icon} size={16} />
              <h4>The True Best Room</h4>
            </div>
            <p className={styles.text}>{report.theTrueBestRoom}</p>
          </div>
        )}

        {report.operationalQuirks && (
          <div className={styles.item}>
            <div className={styles.itemHeader}>
              <Eye className={styles.icon} size={16} />
              <h4>Operational Quirks</h4>
            </div>
            <p className={styles.text}>{report.operationalQuirks}</p>
          </div>
        )}

        {report.famousGuests && (
          <div className={styles.item}>
            <div className={styles.itemHeader}>
              <Users className={styles.icon} size={16} />
              <h4>Notable Clientele</h4>
            </div>
            <p className={styles.text}>{report.famousGuests}</p>
          </div>
        )}

        {report.powerDynamics && (
          <div className={styles.item}>
            <div className={styles.itemHeader}>
              <Building className={styles.icon} size={16} />
              <h4>Power Dynamics</h4>
            </div>
            <p className={styles.text}>{report.powerDynamics}</p>
          </div>
        )}
      </div>
    </div>
  );
};
