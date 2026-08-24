import { useState } from 'react';
import { Link } from 'react-router-dom';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    // Mock delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 500, color: 'var(--color-dark)', marginBottom: '0.5rem' }}>Reset Password.</h1>
      <p style={{ color: '#555', marginBottom: '2.5rem', fontSize: '1rem' }}>Enter your email address and we'll send you a link to reset your password.</p>

      {error && (
        <div style={{ backgroundColor: 'rgba(255, 60, 60, 0.1)', color: '#d32f2f', padding: '0.8rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid rgba(255, 60, 60, 0.2)' }}>
          {error}
        </div>
      )}

      {isSuccess && (
        <div style={{ backgroundColor: 'rgba(31, 77, 54, 0.1)', color: 'var(--color-dark)', padding: '0.8rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid rgba(31, 77, 54, 0.2)' }}>
          If an account exists for {email}, a password reset link will be sent shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '0.5rem' }}>Email</label>
          <input 
            id="email"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(31,77,54,0.15)', backgroundColor: '#fff', fontSize: '1rem', color: 'var(--color-dark)', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-dark)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(31,77,54,0.1)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(31,77,54,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading || isSuccess}
          style={{
            marginTop: '0.5rem', width: '100%', padding: '0.85rem', borderRadius: '12px', backgroundColor: 'var(--color-dark)', color: '#fff', fontSize: '1rem', fontWeight: 600, border: 'none', cursor: (isLoading || isSuccess) ? 'not-allowed' : 'pointer', opacity: (isLoading || isSuccess) ? 0.8 : 1, transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={e => { if(!isLoading && !isSuccess) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 77, 54, 0.2)'; } }}
          onMouseLeave={e => { if(!isLoading && !isSuccess) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; } }}
        >
          {isLoading ? 'Sending link...' : 'Send Reset Link'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <Link to="/login" style={{ color: 'var(--color-dark)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>Back to Sign In</Link>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
