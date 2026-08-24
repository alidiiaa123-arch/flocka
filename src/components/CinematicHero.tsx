import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

export function CinematicHero() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Keep refs for mutable variables avoiding re-renders
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    // Preload frames incrementally
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      // Pad with leading zeros to match frame_0001.jpg
      const paddedIndex = String(i).padStart(4, '0');
      
      // Use Vite's BASE_URL to correctly resolve the path when hosted on GitHub Pages
      const baseUrl = import.meta.env.BASE_URL;
      const cleanBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
      img.src = `${cleanBase}hero/frames/frame_${paddedIndex}.jpg`;
      
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        
        // Draw the first frame as soon as it loads to give instant visual feedback
        if (i === 1 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) drawFrame(0, img);
        }
      };
      
      images.push(img);
    }
    
    imagesRef.current = images;
  }, []);

  // Handle resizing and drawing with high-DPI support
  const drawFrame = (frameIndex: number, forceImage?: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = forceImage || imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Handle devicePixelRatio for sharp cinematic rendering
    const dpr = window.devicePixelRatio || 1;
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    
    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    
    // Normalize coordinate system to use css pixels
    ctx.scale(dpr, dpr);

    // Intelligent cover strategy (preserve aspect ratio, no distortion)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    
    let drawWidth = cw;
    let drawHeight = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image (e.g. ultra-wide screen)
      drawHeight = cw / imgRatio;
      offsetY = (ch - drawHeight) / 2;
    } else {
      // Canvas is taller than image (e.g. mobile)
      drawWidth = ch * imgRatio;
      offsetX = (cw - drawWidth) / 2;
    }

    // Clear canvas before drawing
    ctx.clearRect(0, 0, cw, ch);
    // Dark background for any padded edges
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cw, ch);
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    currentFrameRef.current = frameIndex;
  };

  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    // Trigger initial resize to set correct dimensions
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Setup ScrollTrigger for cinematic timeline AND UI reveal
  useEffect(() => {
    const container = containerRef.current;
    const pinTarget = pinRef.current;
    if (!container || !pinTarget || loadedCount < TOTAL_FRAMES * 0.1) return; // Wait until at least 10% loaded

    const ctx = gsap.context(() => {
      // Master Pin for the entire 600vh experience
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=500%', // 300vh for video + 200vh for UI reveal
        pin: pinTarget,
        pinSpacing: true,
      });

      // PHASE 1: Cinematic Sequence (First 300vh)
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=300%',
        onUpdate: (self) => {
          // Exact frame mapping (LOCKED logic)
          const frameIndex = Math.round(self.progress * (TOTAL_FRAMES - 1));
          
          if (frameIndex !== currentFrameRef.current) {
            requestAnimationFrame(() => {
              drawFrame(frameIndex);
            });
          }
        }
      });

      // PHASE 2: Hero Content Reveal (Next 200vh)
      const tl = gsap.timeline();
      tl.to('.hero-overlay', { backgroundColor: 'rgba(10, 15, 12, 0.65)', duration: 1 }, 0)
        .to('.hero-ui-left', { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0)
        .to('.hero-ui-right', { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0);

      ScrollTrigger.create({
        trigger: container,
        start: 'top top-=300%', // Begin exactly after video finishes
        end: '+=200%', // 200vh scroll duration for the reveal
        animation: tl,
        scrub: true,
      });

    }, containerRef);

    return () => ctx.revert();
  }, [loadedCount]);

  return (
    <>
      {/* 600vh total scroll distance: 100vh initial + 300vh scrub + 200vh reveal */}
      <section ref={containerRef} style={{ height: '600vh', backgroundColor: '#000', position: 'relative' }}>
        
        {/* Pinned Canvas Container */}
        <div ref={pinRef} style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
          
          <canvas 
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
          
          {/* Subtle overlay for Phase 2 readability */}
          <div className="hero-overlay" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 15, 12, 0)', pointerEvents: 'none' }} />
          
          {/* Phase 2 Hero Content Reveal */}
          <div className="content-max" style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            padding: '0 var(--section-pad-x)',
            zIndex: 5,
            pointerEvents: 'none'
          }}>
            <div className="flex-split" style={{ width: '100%' }}>
              
              {/* LEFT SIDE: Primary Message */}
              <div className="hero-ui-left" style={{ flex: '1 1 500px', opacity: 0, transform: 'translateX(-80px)', pointerEvents: 'auto' }}>
                <h1 style={{ fontSize: 'var(--text-h1)', color: '#fff', fontWeight: 800, lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
                  Smart Breeding.<br/>
                  <span style={{ fontWeight: 400, color: 'var(--color-light-green)' }}>Better Care.</span>
                </h1>
              </div>
              
              {/* RIGHT SIDE: Supporting Content & CTA */}
              <div className="hero-ui-right" style={{ flex: '1 1 400px', opacity: 0, transform: 'translateX(80px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pointerEvents: 'auto' }}>
                <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-light-green)', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '440px' }}>
                  The ultimate platform for bird breeders to track, manage, and care for their flocks with precision.
                </p>
                  <button 
                    onClick={() => navigate('/login')}
                    style={{ 
                    padding: '0 2.5rem', 
                    height: '48px',
                    backgroundColor: 'var(--color-green)', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    fontWeight: 500,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(31, 77, 54, 0.2)',
                    transition: 'all 0.2s ease',
                    pointerEvents: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 77, 54, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(31, 77, 54, 0.2)';
                  }}
                  >
                    Get Started
                  </button>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
