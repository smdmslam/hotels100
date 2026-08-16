import React from 'react';
import type { SpecialPackage } from '../../data/types';
import styles from './SpecialPackages.module.css';

interface SpecialPackagesProps {
  packages: SpecialPackage[];
}

export const SpecialPackages: React.FC<SpecialPackagesProps> = ({ packages }) => {
  if (!packages || packages.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Insider Offers</h3>
        <p className={styles.subtitle}>Exclusive packages and exceptional experiences curated for our network.</p>
      </div>

      <div className={styles.grid}>
        {packages.map(pkg => (
          <div key={pkg.id} className={styles.card}>
            {pkg.imageUrl && (
              <div className={styles.imageContainer}>
                <img src={pkg.imageUrl} alt={pkg.title} className={styles.image} />
              </div>
            )}
            <div className={styles.content}>
              <h4 className={styles.packageTitle}>{pkg.title}</h4>
              <p className={styles.packageDescription}>{pkg.description}</p>
              
              <div className={styles.metaRow}>
                {pkg.price && pkg.currency && (
                  <span className={styles.price}>
                    {pkg.currency} {pkg.price.toLocaleString()}
                  </span>
                )}
                {pkg.validity && (
                  <span className={styles.validity}>
                    Valid: {pkg.validity}
                  </span>
                )}
              </div>
              
              {pkg.linkUrl && (
                <a href={pkg.linkUrl} target="_blank" rel="noopener noreferrer" className={styles.actionButton}>
                  View Offer
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
