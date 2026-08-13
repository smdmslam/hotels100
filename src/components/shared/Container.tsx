import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  variant?: 'wide' | 'standard' | 'reading' | 'full';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  variant = 'standard',
  className = ''
}) => {
  return (
    <div className={`${styles.container} ${styles[variant]} ${className}`}>
      {children}
    </div>
  );
};
