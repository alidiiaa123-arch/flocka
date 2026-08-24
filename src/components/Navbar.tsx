import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/flocka-logo.png';

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'Features', id: 'features' },
  { name: 'Knowledge', id: 'knowledge' },
  { name: 'Community', id: 'community' },
  { name: 'Premium', id: 'premium' },
  { name: 'About', id: 'about' }
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoverRect, setHoverRect] = useState<{ left: number, width: number, opacity: number }>({ left: 0, width: 0, opacity: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Highlight active section based on scroll
  useEffect(() => {
    // Only track scroll on the landing page
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      
      let current = 'home';
      for (const section of sections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        // If the section top is above the middle of the viewport
        if (rect.top <= window.innerHeight / 3) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = e.currentTarget.getBoundingClientRect();
    
    setHoverRect({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setHoverRect(prev => ({ ...prev, opacity: 0 }));
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      // Delay scrolling to allow page render
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Consistent visual styling regardless of scroll
  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1.2rem 4vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        pointerEvents: 'auto',
        backgroundColor: 'rgba(245, 235, 221, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(31, 77, 54, 0.08)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={logo} alt="Flocka Logo" style={{ height: '32px' }} />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="desktop-only" ref={navRef} style={{ display: 'flex', gap: '3.5rem', alignItems: 'center', position: 'relative' }} onMouseLeave={handleMouseLeave}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => scrollToSection(e, item.id)}
                onMouseEnter={handleMouseEnter}
                style={{
                  color: isActive ? '#1F4D36' : 'rgba(31, 77, 54, 0.65)',
                  textDecoration: 'none',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.95rem',
                  letterSpacing: '0.01em',
                  transition: 'color 0.2s ease, font-weight 0.2s ease',
                  padding: '0.5rem 0',
                  position: 'relative'
                }}
              >
                {item.name}
                {/* Active Indicator underneath text */}
                <span style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isActive ? '4px' : '0px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#1F4D36',
                  transition: 'width 0.3s ease',
                  opacity: hoverRect.opacity === 0 ? 1 : 0 // Hide dot when hovering
                }} />
              </a>
            );
          })}
          
          {/* Sliding Hover Indicator */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: hoverRect.left,
            width: hoverRect.width,
            height: '2px',
            backgroundColor: '#1F4D36',
            opacity: hoverRect.opacity,
            transition: 'all 0.3s cubic-bezier(0.2, 1, 0.2, 1)',
            pointerEvents: 'none',
            borderRadius: '2px'
          }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="desktop-only"
            onClick={() => navigate('/login')}
            style={{
              padding: '0 1.5rem',
              height: '42px',
              backgroundColor: '#1F4D36',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(31, 77, 54, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 77, 54, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(31, 77, 54, 0.15)';
            }}
          >
            Get Started
          </button>

          <button 
            className="mobile-only"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: '#1F4D36', cursor: 'pointer', display: 'none', padding: '0.5rem' }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          top: '72px',
          backgroundColor: 'rgba(245, 235, 221, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 4vw',
          animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => scrollToSection(e, item.id)}
                style={{
                  color: activeSection === item.id ? '#1F4D36' : 'rgba(31, 77, 54, 0.7)',
                  textDecoration: 'none',
                  fontWeight: activeSection === item.id ? 600 : 500,
                  fontSize: '1.5rem',
                  borderBottom: '1px solid rgba(31, 77, 54, 0.05)',
                  paddingBottom: '1rem'
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/login');
            }}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#1F4D36',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '1.1rem',
              cursor: 'pointer',
              marginBottom: '2rem'
            }}
          >
            Get Started
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
      `}</style>
    </>
  );
}
