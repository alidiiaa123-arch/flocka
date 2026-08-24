import { useEffect, useRef } from 'react';

export function LensSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rafId: number;
    let isDesktop = window.matchMedia('(pointer: fine)').matches;
    
    // Physics states for smooth interpolation
    let currentX = card.offsetWidth / 2;
    let currentY = card.offsetHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let isHovering = false;

    // Center lens initially
    const setInitialPos = () => {
      const rect = card.getBoundingClientRect();
      currentX = rect.width / 2;
      currentY = rect.height / 2;
      targetX = currentX;
      targetY = currentY;
      card.style.setProperty('--lens-x', `${currentX}px`);
      card.style.setProperty('--lens-y', `${currentY}px`);
    };
    
    // Lerp function for physical damping
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      if (isDesktop && isHovering) {
        // Smoothly interpolate current position toward target position
        currentX = lerp(currentX, targetX, 0.08); // 0.08 provides beautiful subtle inertia
        currentY = lerp(currentY, targetY, 0.08);
        
        card.style.setProperty('--lens-x', `${currentX}px`);
        card.style.setProperty('--lens-y', `${currentY}px`);
      }
      rafId = requestAnimationFrame(animate);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      isHovering = true;
      const rect = card.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      // Optional: don't reset to center, just let it rest where the user left it.
      isHovering = false;
    };

    const handleScroll = () => {
      if (isDesktop) return; // Only for mobile/touch
      
      const rect = card.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      const totalDistance = viewHeight + rect.height;
      const traveled = viewHeight - rect.top;
      let progress = traveled / totalDistance;
      
      progress = Math.max(0, Math.min(1, progress));
      
      // Move from 10% to 90% across the card smoothly on scroll
      const x = rect.width * (0.1 + progress * 0.8);
      const y = rect.height * (0.1 + progress * 0.8);

      card.style.setProperty('--lens-x', `${x}px`);
      card.style.setProperty('--lens-y', `${y}px`);
    };

    setTimeout(setInitialPos, 100);
    window.addEventListener('resize', () => {
      isDesktop = window.matchMedia('(pointer: fine)').matches;
      setInitialPos();
    });

    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Start animation loop
    animate();

    return () => {
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section style={{
      backgroundColor: 'var(--bg-ivory)',
      position: 'relative',
      padding: 'var(--section-pad-y) 4vw',
      overflow: 'hidden'
    }}>
      {/* Editorial Intro */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
        <h2 className="h2-fluid" style={{ color: 'var(--color-dark)', marginBottom: '1rem' }}>
          See the difference <br/>
          <strong>care makes.</strong>
        </h2>
        <p className="p-fluid" style={{ color: '#555', maxWidth: '500px', marginInline: 'auto' }}>
          Flocka turns everyday observations into a clearer picture of your flock.
        </p>
      </div>

      {/* Large Premium Card */}
      <div 
        ref={cardRef}
        style={{
          position: 'relative',
          width: 'min(86vw, 1400px)', // Requested sizing
          margin: '0 auto',
          aspectRatio: '16 / 9', // Cinematic wide ratio
          backgroundColor: '#1a1a1a',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
          // Default lens position (center) and responsive size
          '--lens-x': '50%',
          '--lens-y': '50%',
          '--lens-size': 'clamp(150px, 18vw, 240px)',
          touchAction: 'pan-y' // Allow vertical scroll but capture horizontal
        } as React.CSSProperties}
      >
        {/* Layer 1: BASE IMAGE (Empty Nest) */}
        <img 
          src={`${import.meta.env.BASE_URL}images/budgie_nest_empty.jpg`} 
          alt="Empty Budgie Nest" 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 2: AFTER IMAGE (Thriving Nest) with Clip Path */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            clipPath: 'circle(var(--lens-size) at var(--lens-x) var(--lens-y))',
            pointerEvents: 'none',
            willChange: 'clip-path' // Optimization for smooth masking
          }}
        >
          <img 
          src={`${import.meta.env.BASE_URL}images/budgie_nest_active.jpg`} 
            alt="Thriving Budgie Nest" 
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Layer 3: Premium Lens Visual Border */}
        {/* Very thin warm-white border, soft atmospheric glow, subtle inner shadow */}
        <div style={{
          position: 'absolute',
          top: 'calc(var(--lens-y) - var(--lens-size))',
          left: 'calc(var(--lens-x) - var(--lens-size))',
          width: 'calc(var(--lens-size) * 2)',
          height: 'calc(var(--lens-size) * 2)',
          borderRadius: '50%',
          border: '1px solid rgba(255, 245, 230, 0.4)', // Warm-white thin border
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.15), 0 8px 30px rgba(0,0,0,0.2), 0 0 40px rgba(255, 240, 210, 0.1)', // Atmospheric shadow and glow
          backdropFilter: 'brightness(1.02) contrast(1.05)', // Extremely subtle glass highlight
          pointerEvents: 'none',
          willChange: 'top, left'
        }} />

        {/* Layer 4: Data Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
            pointerEvents: 'none', // Critical: Let pointer pass through to the card
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(1rem, 3vw, 3rem)',
            alignItems: 'flex-start'
          }}
        >
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '0.2rem', fontWeight: 600 }}>Breeding Pair</span>
            <div style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)', color: '#fff', fontWeight: 500 }}>Rio <span style={{color:'var(--color-light-green)'}}>×</span> Sunny</div>
          </div>
          
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '0.2rem', fontWeight: 600 }}>Species</span>
            <div style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)', color: '#fff', fontWeight: 400 }}>Budgerigar</div>
          </div>
          
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '0.2rem', fontWeight: 600 }}>Clutch</span>
            <div style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)', color: '#fff', fontWeight: 600 }}>4 Eggs</div>
          </div>
          
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '0.2rem', fontWeight: 600 }}>Hatch Status</span>
            <div style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)', color: 'var(--color-light-green)', fontWeight: 600 }}>2 Chicks</div>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '0.2rem', fontWeight: 600 }}>Health</span>
            <div style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)', color: '#fff', fontWeight: 400 }}>Healthy</div>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '0.2rem', fontWeight: 600 }}>Next Check</span>
            <div style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)', color: '#fff', fontWeight: 400 }}>Tomorrow</div>
          </div>
        </div>

      </div>
    </section>
  );
}
