import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only initialize on desktop (fine pointer)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const outer = outerRef.current;
    if (!outer) return;

    setIsVisible(true);

    const xMoveOuter = gsap.quickTo(outer, "x", { duration: 0.6, ease: "power3" });
    const yMoveOuter = gsap.quickTo(outer, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Use centered offsets (32px width / 2 = 16)
      xMoveOuter(e.clientX - 16); 
      yMoveOuter(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering something interactive
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '1.5px solid rgba(31, 77, 54, 0.4)', // subtle green ring
          backgroundColor: isHovering ? 'rgba(31, 77, 54, 0.08)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease-out',
        }}
        className={isHovering ? 'cursor-hover-active' : ''}
      />
      <style>{`
        .cursor-hover-active {
          width: 50px !important;
          height: 50px !important;
          border-color: rgba(31, 77, 54, 0.1) !important;
          backdrop-filter: blur(2px);
          margin-top: -9px;
          margin-left: -9px;
        }
      `}</style>
    </>
  );
}
