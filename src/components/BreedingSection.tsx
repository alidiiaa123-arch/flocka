import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BreedingSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: pinRef.current,
          scrub: 1,
        }
      });
      
      // Step 1: Pair enters
      tl.fromTo('.breed-step-1', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' })
        .to('.breed-step-1', { opacity: 0, y: -40, duration: 1, ease: 'power4.inOut' }, "+=1");
        
      // Step 2: Eggs
      tl.fromTo('.breed-step-2', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, ease: 'power4.out' })
        .to('.breed-step-2', { opacity: 0, scale: 1.05, duration: 1, ease: 'power4.inOut' }, "+=1");
        
      // Step 3: Hatching
      tl.fromTo('.breed-step-3', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' })
        .to('.breed-step-3', { opacity: 0, y: -40, duration: 1, ease: 'power4.inOut' }, "+=1");
        
      // Step 4: Records
      tl.fromTo('.breed-step-4', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, ease: 'power4.out' })
        .to('.breed-step-4', { opacity: 1, duration: 1 }, "+=1");
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const cardStyle = {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'left' as const,
    padding: '4rem'
  };

  return (
    <section ref={containerRef} style={{ height: '500vh', backgroundColor: 'var(--bg-ivory)', position: 'relative' }}>
      
      <svg 
        className="botanical-art"
        width="300" height="400" viewBox="0 0 300 400" 
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          opacity: 0.1,
          pointerEvents: 'none',
          fill: 'none',
          stroke: 'var(--color-green)',
          strokeWidth: 2,
          strokeLinecap: 'round',
          zIndex: 1
        }}
      >
        <path d="M50,400 Q150,250 280,50 M150,250 Q250,200 280,100 M100,300 Q180,320 220,250" />
      </svg>
      <style>{`
        @keyframes drift {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .botanical-art {
          animation: drift 10s ease-in-out infinite;
        }
      `}</style>

      {/* Background imagery - fixed relative to the pin container */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', pointerEvents: 'none', overflow: 'hidden' }}>
        <img src={`${import.meta.env.BASE_URL}images/editorial-budgie.jpg`} alt="Budgie" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1, filter: 'blur(2px) sepia(0.2) hue-rotate(-10deg)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg-ivory) 30%, transparent 100%)' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--bg-ivory) 0%, transparent 20%, transparent 80%, var(--bg-ivory) 100%)' }}></div>
      </div>

      <div ref={pinRef} className="section-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', gap: '4rem' }}>
        
        <div style={{ textAlign: 'center', zIndex: 20 }}>
          <h2 className="h2-fluid" style={{ color: 'var(--color-dark)', margin: 0 }}>
            Master the <strong>Lineage.</strong>
          </h2>
        </div>

        <div ref={cardRef} style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '640px', 
          minHeight: '450px', 
          backgroundColor: 'var(--bg-card)', 
          borderRadius: 'var(--radius-card)', 
          boxShadow: '0 40px 100px rgba(31, 77, 54, 0.08)',
          border: '1px solid rgba(31, 77, 54, 0.05)',
          overflow: 'hidden',
          zIndex: 10
        }}>
          
          {/* Step 1: Pair */}
          <div className="breed-step-1" style={{...cardStyle, opacity: 0}}>
            <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--color-green)', marginBottom: '1rem', fontWeight: 300, margin: '0 0 1rem 0' }}>The Perfect Pair</h3>
            <p style={{ color: '#666', fontSize: 'var(--text-body-lg)', lineHeight: 1.6, maxWidth: '400px', margin: 0 }}>Match birds intelligently based on genetics, health, and history.</p>
            
            <div style={{ marginTop: '2rem', width: '100%', backgroundColor: '#fff', borderRadius: '16px', padding: '1rem', border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
               <div style={{ display: 'flex', flexShrink: 0 }}>
                 <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#F0ECE1', border: '2px solid #fff', zIndex: 2 }}></div>
                 <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-light-green)', border: '2px solid #fff', marginLeft: '-16px', zIndex: 1 }}></div>
               </div>
               <div style={{ minWidth: 0 }}>
                 <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-green)' }}>Sunny & Cloud</h4>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                   <span style={{ backgroundColor: 'var(--color-light-green)', color: 'var(--color-green)', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px' }}>ACTIVE</span>
                   <span style={{ fontSize: '0.85rem', color: '#888' }}>Pair PR-04</span>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Step 2: Eggs */}
          <div className="breed-step-2" style={{...cardStyle, opacity: 0}}>
            <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--color-green)', marginBottom: '1rem', fontWeight: 300, margin: '0 0 1rem 0' }}>The Clutch</h3>
            <p style={{ color: '#666', fontSize: 'var(--text-body-lg)', lineHeight: 1.6, maxWidth: '400px', margin: 0 }}>Monitor fertility, lay dates, and expected hatch days perfectly.</p>
            
            <div style={{ marginTop: '2rem', width: '100%', backgroundColor: '#fff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-green)' }}>Clutch #42</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>Laid: Oct 12, 2023</p>
                </div>
                <div style={{ backgroundColor: 'var(--color-light-green)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--color-green)', fontWeight: 600 }}>
                  3 Days to hatch
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ width: '40px', height: '56px', borderRadius: '20px 20px 50% 50%', backgroundColor: 'var(--color-light-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 600 }}>E1</div>
                <div style={{ width: '40px', height: '56px', borderRadius: '20px 20px 50% 50%', backgroundColor: 'var(--color-light-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 600 }}>E2</div>
                <div style={{ width: '40px', height: '56px', borderRadius: '20px 20px 50% 50%', backgroundColor: '#F0F0F0', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: '#aaa', fontWeight: 600 }}>E3</div>
              </div>
            </div>
          </div>
          
          {/* Step 3: Hatching & Lineage */}
          <div className="breed-step-3" style={{...cardStyle, opacity: 0}}>
            <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--color-green)', marginBottom: '1rem', fontWeight: 300, margin: '0 0 1rem 0' }}>Legacy Records</h3>
            <p style={{ color: '#666', fontSize: 'var(--text-body-lg)', lineHeight: 1.6, maxWidth: '400px', margin: 0 }}>A complete, unalterable history of the lineage and pedigree.</p>
            
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{ padding: '0.8rem 1.5rem', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', maxWidth: '100%' }}>
                 <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F0ECE1', flexShrink: 0 }}></div>
                 <div style={{ minWidth: 0 }}>
                   <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-green)' }}>Apollo</h4>
                   <p style={{ margin: 0, fontSize: '0.75rem', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>BN-0012 • Male</p>
                 </div>
              </div>
              <div style={{ width: '1px', height: '16px', backgroundColor: '#ddd' }}></div>
              <div style={{ width: '120px', height: '1px', backgroundColor: '#ddd', maxWidth: '80%' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '120px', maxWidth: '80%' }}>
                <div style={{ width: '1px', height: '16px', backgroundColor: '#ddd' }}></div>
                <div style={{ width: '1px', height: '16px', backgroundColor: '#ddd' }}></div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ padding: '0.6rem', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', minWidth: '90px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                     <span style={{ fontSize: '0.8rem', color: '#888' }}>♀</span>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>Luna</span>
                   </div>
                   <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>BN-0045</p>
                </div>
                <div style={{ padding: '0.6rem', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px', minWidth: '90px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                     <span style={{ fontSize: '0.8rem', color: '#888' }}>♂</span>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>Mars</span>
                   </div>
                   <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>BN-0046</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 4: Outro */}
          <div className="breed-step-4" style={{...cardStyle, opacity: 0}}>
            <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--color-green)', marginBottom: '1rem', fontWeight: 300, margin: '0 0 1rem 0' }}>Total Confidence</h3>
            <p style={{ color: '#666', fontSize: 'var(--text-body-lg)', lineHeight: 1.6, maxWidth: '400px' }}>Every generation, beautifully documented. Make breeding decisions backed by complete data.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
