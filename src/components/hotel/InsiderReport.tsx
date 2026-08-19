import React from 'react';
import type { InsiderReport as InsiderReportType } from '../../data/types';
import { Eye, Key, MapPin, Users, Building } from 'lucide-react';
import styles from './InsiderReport.module.css';

interface InsiderReportProps {
  report: InsiderReportType;
}

export const InsiderReport: React.FC<InsiderReportProps> = ({ report }) => {
  if (!report) return null;

  const renderSection = (itemData: any, defaultTitle: string, IconComponent: any) => {
    if (!itemData) return null;
    const title = typeof itemData === 'object' && itemData.title ? itemData.title : defaultTitle;
    const text = typeof itemData === 'object' && itemData.text ? itemData.text : typeof itemData === 'string' ? itemData : null;

    if (!text) return null;

    return (
      <div className={styles.item}>
        <div className={styles.itemHeader}>
          <IconComponent className={styles.icon} size={16} />
          <h4>{title}</h4>
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Eye className={styles.headerIcon} />
        <h3 className={styles.title}>The Insider Report</h3>
      </div>

      <div className={styles.grid}>
        {renderSection(report.unGoogleableHistory, "Secret Lore & Provenance", Key)}
        {renderSection(report.theTrueBestRoom, "The True Best Room to Book", MapPin)}
        {renderSection(report.operationalQuirks, "Unscripted Service & Quirks", Eye)}
        {renderSection(report.famousGuests, "Notable Clientele & Atmosphere", Users)}
        {renderSection(report.powerDynamics, "Ownership & Operator Alignment", Building)}
      </div>
    </div>
  );
};
