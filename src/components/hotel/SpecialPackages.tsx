import React from 'react';
import { Link } from 'react-router-dom';
import type { SpecialPackage } from '../../data/types';
import { Tag } from 'lucide-react';
import styles from './SpecialPackages.module.css';

interface SpecialPackagesProps {
  packages: SpecialPackage[];
}

export const SpecialPackages: React.FC<SpecialPackagesProps> = ({ packages }) => {
  if (!packages || packages.length === 0) return null;

  return (
    <div className={styles.banner}>
      <Link to="/offers" className={styles.link}>
        <Tag size={16} className={styles.icon} />
        <span>View DMW Insider Offers for this property</span>
      </Link>
    </div>
  );
};
