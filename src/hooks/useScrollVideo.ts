import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollVideoProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef: RefObject<HTMLElement | null>;
}

export function useScrollVideo({ videoRef, containerRef }: UseScrollVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    let tl: gsap.core.Timeline | null = null;

    const setupScrollTrigger = () => {
      // Ensure we have a valid duration
      if (!video.duration || Number.isNaN(video.duration)) return;

      setIsLoaded(true);

      // We use a dummy object to tween a value, then apply it to video.currentTime onUpdate
      // This is often smoother than tweening video.currentTime directly due to how GSAP handles custom properties
      const playhead = { frame: 0 };
      
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1, // A tiny bit of smoothing (scrub) to prevent jitter, but essentially direct mapping
        }
      });

      tl.to(playhead, {
        frame: video.duration,
        ease: 'none',
        onUpdate: () => {
          if (video) {
            // Update the actual video time
            video.currentTime = playhead.frame;
          }
        }
      });
    };

    // Sometimes video metadata is already loaded before the effect runs
    if (video.readyState >= 1) { // HAVE_METADATA or higher
      setupScrollTrigger();
    } else {
      video.addEventListener('loadedmetadata', setupScrollTrigger);
    }

    return () => {
      video.removeEventListener('loadedmetadata', setupScrollTrigger);
      if (tl) tl.kill();
      const triggers = ScrollTrigger.getAll() as any[];
      triggers.forEach((t: any) => {
        if (t.vars.trigger === container) t.kill();
      });
    };
  }, [videoRef, containerRef, prefersReducedMotion]);

  return { isLoaded };
}
