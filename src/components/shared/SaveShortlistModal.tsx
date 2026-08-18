import React, { useState } from 'react';
import { X, Bookmark, Check } from 'lucide-react';
import styles from './SaveShortlistModal.module.css';

interface SaveShortlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName?: string;
}

export const SaveShortlistModal: React.FC<SaveShortlistModalProps> = ({ isOpen, onClose, hotelName }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    console.log(`Saved shortlist for ${hotelName || 'DMW Hotel'} to email: ${email}`);
    setSubmitted(true);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.modal} role="dialog" aria-label="Save to DMW Shortlist">
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>DMW Member Access</span>
            <h2 className={styles.title}>Save to Shortlist</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </header>

        <p className={styles.description}>
          Save {hotelName ? <strong>{hotelName}</strong> : 'this property'} to your private DMW Blackbook and receive priority rate alerts when prices drop.
        </p>

        {submitted ? (
          <div className={styles.successMessage}>
            <Check size={18} style={{ color: 'var(--color-antique-gold)', marginBottom: 4 }} />
            <p><strong>Saved to your DMW Blackbook!</strong></p>
            <p>A confirmation email has been dispatched to {email}. You will receive rate monitoring updates for this asset.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              required
              className={styles.input}
              placeholder="Enter your executive email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className={styles.submitButton}>
              Save Property <Bookmark size={14} style={{ marginLeft: 6 }} />
            </button>
          </form>
        )}
      </div>
    </>
  );
};
