import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutFlocka() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-text', 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} style={{
      padding: '20rem 8vw', // Massive whitespace
      backgroundColor: '#f8f6f2',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '4rem'
    }}>
      <div style={{ flex: '1 1 500px' }}>
        <h2 className="about-text" style={{ 
          fontSize: 'clamp(3rem, 6vw, 6rem)', 
          color: '#1a1a1a', 
          fontWeight: 300, // Elegant thin weight
          lineHeight: 1.05, 
          letterSpacing: '-0.03em',
          margin: 0
        }}>
          Elevating <br />
          <span style={{ fontWeight: 800 }}>Avian Care.</span>
        </h2>
      </div>
      
      <div style={{ flex: '1 1 400px', paddingTop: '1rem' }}>
        <p className="about-text" style={{ 
          fontSize: '1.25rem', 
          color: '#4a4a4a', 
          lineHeight: 1.8,
          maxWidth: '420px',
          fontWeight: 400
        }}>
          Flocka is your complete companion for managing, tracking, and elevating the care of your birds.
          From daily health records to intricate breeding lineages, everything you need is gracefully
          organized in one intelligent ecosystem.
        </p>
      </div>
    </section>
  );
}
