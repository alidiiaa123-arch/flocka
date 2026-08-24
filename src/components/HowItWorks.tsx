import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Find people, interests, and communities that resonate with you.'
  },
  {
    num: '02',
    title: 'Connect',
    desc: 'Start meaningful conversations and build relationships.'
  },
  {
    num: '03',
    title: 'Belong',
    desc: 'Become part of a flock that feels like yours.'
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!stepsRef.current) return;
      
      const elements = stepsRef.current.children;
      
      Array.from(elements).forEach((el) => {
        gsap.fromTo(
          el,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="how-section">
      <div className="how-container">
        <h2 className="section-title">How It Works</h2>
        
        <div className="steps-container" ref={stepsRef}>
          {STEPS.map((step, idx) => (
            <div key={idx} className="step-item">
              <div className="step-number">{step.num}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
