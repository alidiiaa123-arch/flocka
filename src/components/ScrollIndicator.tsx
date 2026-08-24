import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ScrollIndicator.css';

export function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fade out immediately as soon as scrolling starts
    const handleScroll = () => {
      if (window.scrollY > 20) {
        gsap.to(container, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // In case the user refreshes already scrolled down
    if (window.scrollY > 20) {
      gsap.set(container, { opacity: 0 });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-indicator-container" ref={containerRef}>
      <span className="scroll-text">Scroll to Explore</span>
      <div className="scroll-line-container">
        <div className="scroll-line"></div>
      </div>
    </div>
  );
}
