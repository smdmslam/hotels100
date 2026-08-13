import React from 'react';
import * as LucideIcons from 'lucide-react';
import styles from './IconLabel.module.css';

interface IconLabelProps {
  iconName?: string | null;
  label: string;
  value?: string | null;
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export const IconLabel: React.FC<IconLabelProps> = ({ 
  iconName, 
  label, 
  value,
  className = '',
  layout = 'horizontal'
}) => {
  // Dynamically resolve the Lucide icon
  const IconComponent = iconName ? (LucideIcons as any)[iconName] : null;

  return (
    <div className={`${styles.container} ${styles[layout]} ${className}`}>
      {IconComponent && (
        <span className={styles.iconWrapper} aria-hidden="true">
          <IconComponent size={18} strokeWidth={1.5} />
        </span>
      )}
      <div className={styles.textWrapper}>
        <span className={styles.label}>{label}</span>
        {value && <span className={styles.value}>{value}</span>}
      </div>
    </div>
  );
};
