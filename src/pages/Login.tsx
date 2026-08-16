import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { Container, Button } from '../components/shared';
import styles from './Login.module.css';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'An error occurred during Google sign-in.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Container variant="standard">
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>DMW Hotels 100</h1>
            <p className={styles.subtitle}>{isLogin ? 'Sign in to access your Blackbook' : 'Create an account to start your Blackbook'}</p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button onClick={handleGoogleAuth} disabled={loading} className={styles.googleBtn}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className={styles.googleIcon} />
            Continue with Google
          </button>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <form onSubmit={handleEmailAuth} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>

            <Button variant="primary" type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className={styles.footer}>
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button className={styles.toggleBtn} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
