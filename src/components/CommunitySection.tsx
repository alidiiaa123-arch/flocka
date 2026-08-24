import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { use3DTilt } from '../hooks/use3DTilt';

gsap.registerPlugin(ScrollTrigger);

export function CommunitySection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  use3DTilt(cardRef, 8); // 8 degrees max tilt

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.comm-layer-1', {
        y: -50,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
      gsap.to('.comm-layer-2', {
        y: -100,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
      gsap.to('.comm-layer-3', {
        y: -150,
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-container" style={{
      backgroundColor: 'var(--bg-ivory)',
    }}>
      <div className="content-max" style={{ textAlign: 'center' }}>
        <h2 className="h2-fluid" style={{ color: 'var(--color-dark)' }}>
          Global <br/>
          <strong>Community.</strong>
        </h2>
        <p className="p-fluid" style={{ color: '#555', maxWidth: '440px', marginInline: 'auto' }}>
          Connect with a trusted network of breeders. Buy, sell, and share knowledge with peers who match your dedication to avian care.
        </p>
      </div>

      <div className="content-max" style={{ position: 'relative', minHeight: '600px', marginTop: 'var(--gap-lg)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        
        <div className="comm-layer-1 mobile-stack" style={{ position: 'absolute', top: '100px', left: '0', width: '300px', maxWidth: '100%', height: '350px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: 'var(--radius-card)', boxShadow: '0 40px 100px rgba(0,0,0,0.04)', border: '1px solid rgba(255,255,255,0.5)', padding: '2rem', zIndex: 1 }}>
          <div style={{ width: '100%', height: '160px', backgroundColor: 'var(--color-light-green)', borderRadius: '12px', marginBottom: '1.5rem' }}></div>
          <div style={{ width: '70%', height: '14px', backgroundColor: '#e0e5e2', borderRadius: '4px', marginBottom: '0.8rem' }}></div>
          <div style={{ width: '40%', height: '12px', backgroundColor: '#eee', borderRadius: '4px' }}></div>
        </div>
        
        <div className="comm-layer-2 mobile-stack" style={{ position: 'absolute', top: '180px', right: '0', width: '320px', maxWidth: '100%', height: '240px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: 'var(--radius-card)', boxShadow: '0 40px 100px rgba(0,0,0,0.06)', border: '1px solid rgba(255,255,255,0.8)', padding: '2rem', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
             <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#d4cbb8', flexShrink: 0 }}></div>
             <div style={{ minWidth: 0 }}>
               <div style={{ width: '100px', height: '14px', backgroundColor: '#e0e5e2', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
               <div style={{ width: '60px', height: '12px', backgroundColor: '#eee', borderRadius: '4px' }}></div>
             </div>
          </div>
          <div style={{ width: '100%', height: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '0.8rem' }}></div>
          <div style={{ width: '90%', height: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}></div>
        </div>
        
        <div ref={cardRef} className="comm-layer-3 mobile-stack interactive" style={{ position: 'relative', width: '400px', maxWidth: '100%', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-card)', boxShadow: '0 60px 120px rgba(0,0,0,0.08)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', zIndex: 10, marginInline: 'auto', willChange: 'transform' }}>
          <div style={{ width: '100%', height: '240px', backgroundColor: 'var(--color-green)', borderRadius: '16px', marginBottom: '2rem' }}></div>
          <h4 style={{ fontSize: '1.4rem', color: 'var(--color-dark)', marginBottom: '0.8rem', fontWeight: 600 }}>Premium Seed Mix</h4>
          <p style={{ color: '#888', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.5 }}>High-quality nutrition tailored for active breeding pairs.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontWeight: 500, color: 'var(--color-dark)', fontSize: '1.2rem' }}>$24.00</span>
            <div style={{ padding: '0.8rem 1.5rem', backgroundColor: '#f4f2ee', color: 'var(--color-dark)', border: 'none', borderRadius: 'var(--radius-btn)', fontSize: '0.9rem', fontWeight: 600 }}>Add to Cart</div>
          </div>
        </div>
      </div>
    </section>
  );
}
