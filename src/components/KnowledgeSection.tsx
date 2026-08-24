import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function KnowledgeSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.knowledge-image', 
        { scale: 1.1, opacity: 0 }, 
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
          }
        }
      );
      gsap.fromTo('.knowledge-text', 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: 'power3.out',
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
      backgroundColor: 'var(--bg-card)',
    }}>
      <div className="content-max flex-split">
        
        {/* Visual Element */}
        <div className="flex-col" style={{ position: 'relative', minHeight: '500px' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '90%', height: '90%', borderRadius: 'var(--radius-card)', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }}>
            <img src={`${import.meta.env.BASE_URL}images/knowledge-avian.jpg`} alt="Avian Knowledge" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="knowledge-card mobile-stack" style={{ position: 'absolute', bottom: '5%', right: '0', width: '300px', maxWidth: '100%', backgroundColor: 'var(--bg-ivory)', borderRadius: 'var(--radius-card)', padding: '2rem', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>i</div>
              <div>
                <h4 style={{ margin: 0, color: 'var(--color-dark)', fontSize: '1rem', fontWeight: 600 }}>Avian Expert</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Verified Source</p>
              </div>
            </div>
            <p style={{ color: 'var(--color-dark)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
              "Calcium requirements spike during the first clutch. Ensure cuttlebone is readily available."
            </p>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-col">
          <h4 style={{ color: 'var(--color-green)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 600 }}>Knowledge Base</h4>
          <h2 className="h2-fluid" style={{ color: 'var(--color-dark)' }}>
            Expertise. <br/>
            <strong>Built-in.</strong>
          </h2>
          <p className="p-fluid" style={{ color: '#555', maxWidth: '440px' }}>
            Access a vetted library of avian care protocols, genetic calculators, and mutation charts. Never second-guess your husbandry practices again.
          </p>
          
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              'Comprehensive species mutation database.',
              'Veterinary-approved dietary guidelines.',
              'Automated inbreeding coefficient calculations.',
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: 'var(--color-green)', fontSize: '1.2rem', marginTop: '-2px' }}>✦</span>
                <span style={{ color: '#444', fontSize: '1.05rem', lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </section>
  );
}
