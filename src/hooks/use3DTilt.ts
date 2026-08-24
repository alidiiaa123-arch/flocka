import { useEffect } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';

export function use3DTilt(ref: RefObject<HTMLElement | null>, maxRotation: number = 10, scaleAmount: number = 1.01) {
  useEffect(() => {
    const element = ref.current;
    
    // Only apply on fine pointers (desktop)
    if (!element || !window.matchMedia('(pointer: fine)').matches) return;

    // Use GSAP quickTo for highly performant updates
    const rotX = gsap.quickTo(element, "rotationX", { duration: 0.4, ease: "power3" });
    const rotY = gsap.quickTo(element, "rotationY", { duration: 0.4, ease: "power3" });
    const scale = gsap.quickTo(element, "scale", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      // Center of the element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Mouse position relative to center (-1 to 1)
      const moveX = (e.clientX - centerX) / (rect.width / 2);
      const moveY = (e.clientY - centerY) / (rect.height / 2);

      rotY(moveX * maxRotation);
      rotX(-moveY * maxRotation); // Negative because mouse down means rotate up
    };

    const handleMouseEnter = () => {
      scale(scaleAmount);
      // Give it perspective via GSAP rather than requiring CSS setup
      gsap.set(element, { transformPerspective: 1000 });
    };

    const handleMouseLeave = () => {
      rotX(0);
      rotY(0);
      scale(1);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, maxRotation, scaleAmount]);
}
