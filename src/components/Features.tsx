import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: 'Connect',
    description: 'Build meaningful connections with people who share your interests.'
  },
  {
    title: 'Discover',
    description: 'Discover communities, experiences, and conversations that matter to you.'
  },
  {
    title: 'Communities',
    description: 'Find your place in communities built around shared interests.'
  },
  {
    title: 'Profiles',
    description: 'Create a profile that represents who you are and what you care about.'
  },
  {
    title: 'Interaction',
    description: 'Share, react, communicate, and participate naturally.'
  },
  {
    title: 'Personalization',
    description: 'Make Flocka feel like your own space.'
  }
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return;
      
      gsap.fromTo(
        cardsRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="features-section" id="features">
      <div className="features-header">
        <h2 className="section-title">Core Features</h2>
      </div>
      
      <div className="features-grid" ref={cardsRef}>
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="feature-card">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
