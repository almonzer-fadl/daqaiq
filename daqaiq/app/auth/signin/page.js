'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './signin.module.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Determine which domain we're on
  const getDomain = () => {
    const host = window.location.host;
    if (host.startsWith('supplier.')) {
      return 'supplier';
    } else if (host.startsWith('admin.')) {
      return 'admin';
    }
    return 'customer';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const domain = getDomain();
      const authEndpoint = domain === 'supplier' 
        ? '/api/supplier-auth'
        : domain === 'admin'
        ? '/api/admin-auth'
        : '/api/customer-auth';

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: domain === 'supplier' 
          ? '/supplier'
          : domain === 'admin'
          ? '/admin'
          : '/',
      });

      if (result?.error) {
        setError('Invalid email or password');
        return;
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    const domain = getDomain();
    return domain === 'supplier' 
      ? 'Supplier Login'
      : domain === 'admin'
      ? 'Admin Login'
      : 'Customer Login';
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{getTitle()}</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="Enter your email"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className={styles.submitButton}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 