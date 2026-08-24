import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function EcosystemSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.eco-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
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

  const features = [
    { title: 'Bird Management', desc: 'Detailed profiles and histories.' },
    { title: 'Breeding', desc: 'Lineages, pairs, and clutches.' },
    { title: 'Health & Care', desc: 'Vitamins, medications, reminders.' },
    { title: 'Knowledge', desc: 'Expert articles and care guides.' },
    { title: 'Flocka AI', desc: 'Instant answers for your flock.' },
    { title: 'Marketplace', desc: 'Connect with other breeders.' },
  ];

  return (
    <section id="features" ref={containerRef} style={{
      padding: '15rem 8vw',
      backgroundColor: '#fff',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8rem', flexWrap: 'wrap', gap: '2rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            color: '#1a1a1a', 
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            The Complete <br/>
            <span style={{ fontWeight: 800 }}>Ecosystem.</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '300px', margin: 0, paddingBottom: '0.5rem' }}>
            Everything about your flock, seamlessly connected in one place.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2px', // Thin borders via background color gap
          backgroundColor: '#eee',
          border: '1px solid #eee'
        }}>
          {features.map((f, i) => (
            <div key={i} className="eco-card" style={{
              padding: '4rem 3rem',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '280px',
              transition: 'background-color 0.4s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#faf9f7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
            }}
            >
              <h3 style={{ fontSize: '1.5rem', color: '#1a1a1a', margin: 0, fontWeight: 600 }}>{f.title}</h3>
              <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem', margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
