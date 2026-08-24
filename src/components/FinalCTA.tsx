import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(container.querySelectorAll('.final-content'),
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%'
          }
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{
      padding: '8rem 4vw',
      backgroundColor: 'var(--bg-ivory)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: '60vh'
    }}>
      <div className="content-max">
        <h2 className="h2-fluid final-content" style={{ color: 'var(--color-dark)', marginBottom: '1.5rem' }}>
          Ready to build your flock?
        </h2>
        <p className="p-fluid final-content" style={{ color: '#555', marginBottom: '3rem', maxWidth: '500px', marginInline: 'auto' }}>
          Join the community of breeders elevating their care standards.
        </p>
        
        <button 
          className="final-content" 
          onClick={() => navigate('/login')}
          style={{ 
          padding: '0 4rem',
          height: '64px', 
          backgroundColor: 'var(--color-green)', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '32px', 
          fontSize: '1.1rem', 
          fontWeight: 600, 
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(31, 77, 54, 0.2)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(31, 77, 54, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(31, 77, 54, 0.2)';
        }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
