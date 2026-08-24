import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AISection() {
  const containerRef = useRef<HTMLElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chatRef.current,
          start: 'top 70%',
        }
      });
      
      tl.fromTo('.chat-msg-1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.chat-msg-2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "+=0.3")
        .fromTo('.chat-msg-3', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "+=0.6");
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-container" style={{
      backgroundColor: 'var(--bg-ivory)',
    }}>
      <div className="content-max flex-split">
        
        <div className="flex-col">
          <h2 className="h2-fluid" style={{ color: 'var(--color-dark)' }}>
            Meet <br/>
            <strong>Flocka AI.</strong>
          </h2>
          <p className="p-fluid" style={{ color: '#4a5951', maxWidth: '440px' }}>
            An intelligent assistant trained on deep avian knowledge. Ask questions, diagnose symptoms, and receive tailored advice instantly, seamlessly integrated into your breeding workflow.
          </p>
        </div>
        
        <div ref={chatRef} className="flex-col mobile-stack" style={{
          backgroundColor: 'var(--bg-card)',
          padding: 'clamp(2rem, 5vw, 4rem)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid rgba(31, 77, 54, 0.05)',
          textAlign: 'left',
          boxShadow: '0 40px 100px rgba(31, 77, 54, 0.05)',
          maxWidth: '100%'
        }}>
          
          <div className="chat-msg-1" style={{ marginBottom: '2rem' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 700 }}>Flocka AI</span>
            <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-dark)', lineHeight: 1.6 }}>
              Hi! How can I help you with your birds today?
            </p>
          </div>
          
          <div className="chat-msg-2" style={{ marginBottom: '2rem', paddingLeft: '1.5rem', borderLeft: '3px solid var(--color-light-green)' }}>
             <span style={{ display: 'block', fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>You</span>
             <p style={{ margin: 0, fontSize: '1.1rem', color: '#555', lineHeight: 1.6 }}>
              My bird is sneezing and has watery eyes. What should I do?
            </p>
          </div>
          
          <div className="chat-msg-3">
            <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 700 }}>Flocka AI</span>
            <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-dark)', lineHeight: 1.6 }}>
              It might be a sign of respiratory infection. Ensure good ventilation, isolate the bird to prevent spread, and consult a vet immediately. Would you like me to add a care reminder to your schedule?
            </p>
            <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-green)', color: '#fff', borderRadius: 'var(--radius-btn)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
              + Add Reminder
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
