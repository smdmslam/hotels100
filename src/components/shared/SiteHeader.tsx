import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Container } from './Container';
import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
  variant?: 'light' | 'dark' | 'overlay';
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ variant = 'light' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const navItems = [
    { label: 'The Global 100', path: '/collections/the-global-100' },
    { label: 'The Europe 50', path: '/collections/the-europe-50' },
    { label: 'The Accessible 50', path: '/collections/the-accessible-50' },
    { label: 'Insights', path: '/insights' },
    { label: 'Methodology', path: '/methodology' },
  ];

  return (
    <header className={`${styles.header} ${styles[variant]}`}>
      <Container variant="wide">
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            DMW Hotels 100
          </Link>

          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`${styles.navLink} ${location.pathname.startsWith(item.path) ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <button className={styles.iconButton} aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button 
              className={`${styles.iconButton} ${styles.mobileMenuToggle}`} 
              aria-label="Menu"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <Link to="/" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
              Home
            </Link>
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`${styles.mobileNavLink} ${location.pathname.startsWith(item.path) ? styles.active : ''}`}
                onClick={toggleMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
