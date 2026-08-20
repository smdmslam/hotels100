import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAiDecision } from '../../context/AiDecisionContext';
import { auth } from '../../lib/firebase';
import { Container } from './Container';
import { AskDmwDrawer } from './AskDmwDrawer';
import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
  variant?: 'light' | 'dark' | 'overlay';
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ variant = 'light' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDrawerOpen, openDrawer, closeDrawer, state } = useAiDecision();
  const location = useLocation();
  const { user } = useAuth();

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
    { label: 'Insights', path: '/insights' },
    { label: 'Methodology', path: '/methodology' },
    ...(user ? [{ label: 'Admin Desk', path: '/admin' }] : []),
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
            {user ? (
              <button 
                className={styles.iconButton} 
                title="Sign Out"
                onClick={() => auth.signOut()}
              >
                <User size={20} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
              </button>
            ) : (
              <Link to="/login" className={styles.iconButton} title="Sign In">
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}
            <button 
              className={styles.iconButton} 
              aria-label="Ask DMW Search"
              title={state.hasActiveSearch ? `Active AI Search: "${state.activeQuery}"` : "Luxury Hotel Decision Engine"}
              onClick={() => openDrawer()}
              style={{ position: 'relative' }}
            >
              <Search size={20} strokeWidth={1.5} />
              {state.hasActiveSearch && (
                <span 
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'var(--color-antique-gold)',
                    boxShadow: '0 0 8px var(--color-antique-gold)'
                  }} 
                  title="Active AI Search Results Available"
                />
              )}
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

      <AskDmwDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </header>
  );
};
