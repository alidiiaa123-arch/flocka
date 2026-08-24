import { Outlet, Link } from 'react-router-dom';
import logo from '../../assets/flocka-logo.png';

export function AuthLayout() {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-ivory)',
      fontFamily: 'var(--font-primary)'
    }}>
      {/* LEFT SIDE: Brand Visual (Hidden on small mobile, compact on tablet/mobile if possible, full on desktop) */}
      <div className="auth-visual" style={{
        flex: '1',
        position: 'relative',
        backgroundColor: 'var(--color-dark)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Logo overlay */}
        <div style={{
          position: 'absolute',
          top: 'clamp(2rem, 4vw, 3rem)',
          left: 'clamp(2rem, 4vw, 3rem)',
          zIndex: 10,
        }}>
          <Link to="/" style={{ display: 'inline-block', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <img src={logo} alt="Flocka" style={{ height: '32px', filter: 'brightness(0) invert(1)' }} />
          </Link>
        </div>

        <img 
          src={`${import.meta.env.BASE_URL}images/auth_visual.jpg`} 
          alt="Flocka Care Environment" 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.85
          }}
        />
        
        {/* Subtle gradient overlay to ensure logo pops */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(31,77,54,0.4) 0%, transparent 30%, rgba(31,77,54,0.6) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* RIGHT SIDE: Auth Form */}
      <div className="auth-form-container" style={{
        flex: '1',
        maxWidth: '640px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(3rem, 6vw, 6rem)',
        position: 'relative',
        backgroundColor: 'var(--bg-ivory)'
      }}>
        {/* Mobile-only Logo */}
        <div className="mobile-only-logo" style={{ marginBottom: '3rem', display: 'none' }}>
          <Link to="/">
            <img src={logo} alt="Flocka" style={{ height: '32px' }} />
          </Link>
        </div>

        <Outlet />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .auth-visual {
            display: none !important;
          }
          .auth-form-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 2rem !important;
          }
          .mobile-only-logo {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
