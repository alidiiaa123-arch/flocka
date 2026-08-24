import logo from '../assets/flocka-logo.png';

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-dark)', color: '#888', padding: '4rem var(--section-pad-x) 2rem' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', borderBottom: '1px solid #333', paddingBottom: '3rem', marginBottom: '2rem' }}>
        
        <div>
          <img src={logo} alt="Flocka" style={{ height: '32px', filter: 'brightness(0) invert(1) opacity(0.8)', marginBottom: '1rem' }} />
          <p style={{ maxWidth: '300px', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Smart Breeding. Better Care. The ultimate platform for avian enthusiasts.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          <div>
            <h5 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>Product</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <a href="#features" style={{ color: '#888', textDecoration: 'none' }}>Features</a>
              <a href="#premium" style={{ color: '#888', textDecoration: 'none' }}>Premium</a>
              <a href="#ai" style={{ color: '#888', textDecoration: 'none' }}>Flocka AI</a>
            </div>
          </div>
          <div>
            <h5 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>Company</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <a href="#about" style={{ color: '#888', textDecoration: 'none' }}>About Us</a>
              <a href="#contact" style={{ color: '#888', textDecoration: 'none' }}>Contact</a>
              <a href="#careers" style={{ color: '#888', textDecoration: 'none' }}>Careers</a>
            </div>
          </div>
        </div>

      </div>
      
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem' }}>
        <span>© 2026 Flocka. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#privacy" style={{ color: '#888', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#terms" style={{ color: '#888', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
