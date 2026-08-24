import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PremiumSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.premium-badge', 
        { scale: 0.8, opacity: 0 }, 
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1, 
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-container" style={{
      backgroundColor: 'var(--color-green)',
      color: 'var(--bg-card)',
      textAlign: 'center',
    }}>
      {/* Very subtle ambient glow */}
      <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '600px', maxWidth: '100vw', height: '600px', backgroundColor: 'rgba(245, 235, 221, 0.03)', filter: 'blur(150px)', borderRadius: '50%', pointerEvents: 'none' }}></div>
      
      <div className="content-max">
        <div className="premium-badge" style={{ 
          display: 'inline-block', 
          padding: '0.6rem 2rem', 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          border: '1px solid rgba(255,255,255,0.2)', 
          borderRadius: '50px', 
          fontSize: '0.9rem', 
          letterSpacing: '0.15em', 
          textTransform: 'uppercase', 
          marginBottom: '3rem',
          color: 'var(--bg-card)',
          fontWeight: 600
        }}>
          Flocka Premium
        </div>
        
        <h2 className="premium-content h2-fluid" style={{ color: 'var(--bg-card)' }}>
          Elevate your <br/>
          <strong>Breeding Program.</strong>
        </h2>
        
        <p className="premium-content p-fluid" style={{ color: '#B4CCBF', maxWidth: '500px', marginInline: 'auto', marginBottom: '4rem' }}>
          Unlock advanced genetics tracking, limitless bird profiles, commercial reporting tools, and direct veterinary API integrations.
        </p>
        
        <div className="premium-content flex-split" style={{ gap: '1rem', justifyContent: 'center' }}>
          {['Unlimited Profiles', 'Advanced Genetics', 'Exportable Reports', 'Priority Support'].map(feature => (
            <div key={feature} style={{ padding: '1rem 2rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 'var(--radius-card)', fontSize: '1rem', color: '#fff', backdropFilter: 'blur(10px)' }}>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
