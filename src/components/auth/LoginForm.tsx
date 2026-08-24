import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Mock authentication delay
    setTimeout(() => {
      setIsLoading(false);
      // Simulate real auth routing to dashboard
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 500, color: 'var(--color-dark)', marginBottom: '0.5rem' }}>Welcome back.</h1>
      <p style={{ color: '#555', marginBottom: '2.5rem', fontSize: '1rem' }}>Sign in to your Flocka account.</p>

      {error && (
        <div style={{ backgroundColor: 'rgba(255, 60, 60, 0.1)', color: '#d32f2f', padding: '0.8rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid rgba(255, 60, 60, 0.2)' }}>
          {error}
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

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label htmlFor="password" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-dark)' }}>Password</label>
            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--color-dark)', textDecoration: 'none', opacity: 0.8 }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}>Forgot password?</Link>
          </div>
          <div style={{ position: 'relative' }}>
            <input 
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '0.8rem 3rem 0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(31,77,54,0.15)', backgroundColor: '#fff', fontSize: '1rem', color: 'var(--color-dark)', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-dark)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(31,77,54,0.1)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(31,77,54,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: '4px', display: 'flex'
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            marginTop: '0.5rem', width: '100%', padding: '0.85rem', borderRadius: '12px', backgroundColor: 'var(--color-dark)', color: '#fff', fontSize: '1rem', fontWeight: 600, border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.8 : 1, transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={e => { if(!isLoading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 77, 54, 0.2)'; } }}
          onMouseLeave={e => { if(!isLoading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; } }}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', margin: '2.5rem 0', color: '#999', fontSize: '0.85rem' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(31,77,54,0.1)' }}></div>
        <span style={{ padding: '0 1rem' }}>or continue with</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(31,77,54,0.1)' }}></div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', backgroundColor: '#fff', border: '1px solid rgba(31,77,54,0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ height: '24px' }} />
        </button>
        <button style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', backgroundColor: '#fff', border: '1px solid rgba(31,77,54,0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}>
          <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" style={{ height: '24px' }} />
        </button>
      </div>

      <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.9rem', color: '#555' }}>
        Don't have an account? <Link to="/signup" style={{ color: 'var(--color-dark)', fontWeight: 600, textDecoration: 'none' }}>Sign Up</Link>
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
