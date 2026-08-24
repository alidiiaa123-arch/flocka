import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { use3DTilt } from '../hooks/use3DTilt';

gsap.registerPlugin(ScrollTrigger);

export function BirdManagementSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  use3DTilt(cardRef, 5); // Max 5 degrees rotation for subtlety

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle parallax on the background image
      gsap.to('.bird-bg-parallax', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // UI cards cascading in
      gsap.fromTo('.profile-ui-element', 
        { y: 80, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.15, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.profile-ui-container',
            start: 'top 75%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="management" ref={containerRef} className="section-container" style={{
      backgroundColor: 'var(--bg-ivory)',
    }}>
      {/* Background Image Parallax */}
      <div style={{ position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%', zIndex: 0, overflow: 'hidden' }}>
        <img className="bird-bg-parallax" src={`${import.meta.env.BASE_URL}images/editorial-budgie.jpg`} alt="Budgerigar" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, filter: 'sepia(0.2) hue-rotate(-10deg)' }} />
      </div>

      <div className="content-max flex-split">
        
        <div className="flex-col">
          <h4 style={{ color: 'var(--color-green)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 600 }}>Bird Profiles</h4>
          <h2 className="h2-fluid" style={{ color: 'var(--color-dark)' }}>
            Know every detail. <br/>
            <strong>Instantly.</strong>
          </h2>
          <p className="p-fluid" style={{ color: '#4a5951', maxWidth: '440px' }}>
            Flocka acts as the central intelligence for your aviary. From exact hatch dates and species mutations to live weight tracking and complete health history.
          </p>
        </div>

        <div ref={cardRef} className="profile-ui-container flex-col" style={{ position: 'relative', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* Main Profile Card */}
          <div className="profile-ui-element mobile-stack" style={{
            position: 'absolute',
            top: '50px',
            right: '20px',
            width: '380px',
            maxWidth: '100%',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-card)',
            boxShadow: '0 40px 100px rgba(31, 77, 54, 0.08)',
            border: '1px solid rgba(31, 77, 54, 0.05)',
            overflow: 'hidden',
            zIndex: 10
          }}>
            <div style={{ width: '100%', height: '220px', backgroundColor: 'var(--bg-ivory)', position: 'relative', overflow: 'hidden' }}>
              {/* Drifting Feather Background Element */}
              <svg 
                className="drifting-feather"
                width="100" height="150" viewBox="0 0 100 150" 
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '10%',
                  opacity: 0.15,
                  pointerEvents: 'none',
                  fill: 'none',
                  stroke: 'var(--color-green)',
                  strokeWidth: 1.5,
                  strokeLinecap: 'round'
                }}
              >
                <path d="M50,140 Q40,100 50,20 Q60,10 50,5 Q40,10 50,20 M50,100 Q70,90 80,70 M50,80 Q30,70 20,50 M50,60 Q65,50 70,30" />
              </svg>
              <style>{`
                @keyframes slowDrift {
                  0% { transform: translate(0, 0) rotate(0deg); }
                  33% { transform: translate(20px, -30px) rotate(5deg); }
                  66% { transform: translate(-10px, -15px) rotate(-3deg); }
                  100% { transform: translate(0, 0) rotate(0deg); }
                }
                .drifting-feather {
                  animation: slowDrift 20s ease-in-out infinite;
                }
              `}</style>
              <img src={`${import.meta.env.BASE_URL}images/editorial-budgie.jpg`} alt="Sunny" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               <div style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', backgroundColor: 'var(--bg-card)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-green)', fontWeight: 'bold' }}>♂</div>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-green)', margin: '0 0 0.2rem 0' }}>Sunny</h3>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>Cockatiel • Lutino</p>
                </div>
                <div style={{ backgroundColor: '#F0ECE1', padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 500 }}>BN-0001</div>
              </div>
              
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem', display: 'flex', gap: '2rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555', fontSize: '0.9rem' }}>
                   <span style={{ fontSize: '1.2rem' }}>🎂</span> 2 Yrs 3 Mos
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555', fontSize: '0.9rem' }}>
                   <span style={{ fontSize: '1.2rem' }}>⚖️</span> 92g
                 </div>
              </div>
            </div>
          </div>

          {/* Action Item Overlay */}
          <div className="profile-ui-element mobile-stack" style={{
            position: 'absolute',
            bottom: '40px',
            left: '0',
            width: '320px',
            maxWidth: '100%',
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(31, 77, 54, 0.1)',
            border: '1px solid rgba(31, 77, 54, 0.05)',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 20
          }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#F9F0D8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>💊</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Vitamin Supplement</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Sunny • 9:00 AM</p>
            </div>
            <div style={{ width: '28px', height: '28px', border: '1px solid #ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', flexShrink: 0 }}>✓</div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
