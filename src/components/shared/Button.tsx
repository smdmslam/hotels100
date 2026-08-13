import React from 'react';
import styles from './Button.module.css';
import { ExternalLink } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'icon-only' | 'dark-primary' | 'dark-secondary';
  external?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  external, 
  icon,
  className = '',
  ...props 
}) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} {...props}>
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      {children}
      {external && <ExternalLink size={16} className={styles.externalIcon} />}
    </button>
  );
};
