import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HealthSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.health-card', 
        { x: 100, opacity: 0 }, 
        { 
          x: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-container" style={{
      backgroundColor: 'var(--color-green)',
      color: 'var(--bg-ivory)',
    }}>
      <div className="content-max flex-split">
        <div className="flex-col">
          <h2 className="h2-fluid" style={{ color: 'var(--bg-card)' }}>
            Vigilant Care. <br/>
            <strong>Healthy Flocks.</strong>
          </h2>
          <p className="p-fluid" style={{ color: '#B4CCBF', maxWidth: '440px' }}>
            Keep track of all health needs, from routine vitamins to specific medications. Flocka ensures you never miss a dose and have complete veterinary history at your fingertips.
          </p>
        </div>
        
        <div className="flex-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', alignItems: 'flex-start' }}>
          
          {/* Confirm Log Deletion / Modal UI from Design System */}
          <div className="health-card mobile-stack" style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-card)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: 'var(--color-dark)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.2)',
            transform: 'translateX(20px)',
            zIndex: 10,
            maxWidth: '100%',
            alignSelf: 'flex-start'
          }}>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 1rem 0', color: 'var(--color-green)' }}>Routine Health Check</h4>
            <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.6, margin: '0 0 2rem 0' }}>
              Log observation for Apollo. Check weight, feather condition, and respiratory sounds.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ padding: '0.8rem 1.5rem', border: 'none', backgroundColor: '#F0ECE1', color: 'var(--color-green)', borderRadius: 'var(--radius-btn)', fontWeight: 600 }}>Skip</div>
              <div style={{ padding: '0.8rem 1.5rem', border: 'none', backgroundColor: 'var(--color-green)', color: '#fff', borderRadius: 'var(--radius-btn)', fontWeight: 600 }}>Log Observation</div>
            </div>
          </div>

          {/* Transient Feedback component */}
          <div className="health-card mobile-stack" style={{
            backgroundColor: '#2b2b2b',
            color: '#fff',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            transform: 'translateX(60px)',
            maxWidth: '100%',
            alignSelf: 'flex-end',
            zIndex: 20,
            marginTop: '-1.5rem'
          }}>
            <div style={{ width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2b2b2b', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0 }}>✓</div>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.4 }}>Health record saved successfully.</span>
          </div>

        </div>
      </div>
    </section>
  );
}
