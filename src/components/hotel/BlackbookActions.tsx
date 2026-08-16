import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Tag as TagIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import styles from './BlackbookActions.module.css';

interface BlackbookActionsProps {
  hotelId: string;
}

export const BlackbookActions: React.FC<BlackbookActionsProps> = ({ hotelId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSaved, setIsSaved] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const availableTags = ['Client Trip', 'To Visit', 'Favorites', 'Winter Selection', 'Summer Selection'];

  useEffect(() => {
    if (!user) {
      setIsSaved(false);
      setTags([]);
      setLoading(false);
      return;
    }

    const fetchBlackbookData = async () => {
      try {
        const docRef = doc(db, `users/${user.uid}/blackbook`, hotelId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setIsSaved(data.saved || false);
          setTags(data.tags || []);
        }
      } catch (e) {
        console.error("Error fetching blackbook data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBlackbookData();
  }, [hotelId, user]);

  const requireAuth = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return false;
    }
    return true;
  };

  const saveToCloud = async (saved: boolean, newTags: string[]) => {
    if (!user) return;
    try {
      const docRef = doc(db, `users/${user.uid}/blackbook`, hotelId);
      await setDoc(docRef, { saved, tags: newTags, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.error("Error saving to blackbook:", e);
    }
  };

  const toggleSave = () => {
    if (!requireAuth()) return;
    const newState = !isSaved;
    setIsSaved(newState);
    saveToCloud(newState, tags);
  };

  const toggleTag = (tag: string) => {
    if (!requireAuth()) return;
    const newTags = tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag];
    setTags(newTags);
    saveToCloud(isSaved, newTags);
  };

  if (loading) return null;

  return (
    <div className={styles.container}>
      <button 
        className={`${styles.saveButton} ${isSaved ? styles.saved : ''}`}
        onClick={toggleSave}
      >
        {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        <span>{isSaved ? 'In Blackbook' : 'Save to Blackbook'}</span>
      </button>

      <div className={styles.tagWrapper}>
        <button 
          className={styles.tagButton}
          onClick={() => {
            if (requireAuth()) setIsTagMenuOpen(!isTagMenuOpen);
          }}
        >
          <TagIcon size={18} />
          <span>Tags {tags.length > 0 && `(${tags.length})`}</span>
        </button>

        {isTagMenuOpen && (
          <div className={styles.tagMenu}>
            <div className={styles.tagMenuHeader}>Apply Tags</div>
            {availableTags.map(tag => (
              <label key={tag} className={styles.tagOption}>
                <input 
                  type="checkbox" 
                  checked={tags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {tags.length > 0 && (
        <div className={styles.activeTags}>
          {tags.map(tag => (
            <span key={tag} className={styles.tagBadge}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};
