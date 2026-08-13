import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  label: string;
  type?: 'evidence' | 'distinction' | 'category' | 'edition' | 'field-report';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  label, 
  type = 'distinction', 
  icon,
  className = '' 
}) => {
  return (
    <span className={`${styles.badge} ${styles[type]} ${className}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </span>
  );
};
