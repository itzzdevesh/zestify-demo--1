import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import FullBleedSection from './sections/FullBleedSection';
import TwoCardSection from './sections/TwoCardSection';
import FlavorWheelSection from './sections/FlavorWheelSection';
import PricingSection from './sections/PricingSection';
import ClosingSection from './sections/ClosingSection';
import ContactSection from './sections/ContactSection';
import FloatingBeans from './sections/FloatingBeans';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Floating coffee beans parallax */}
      <FloatingBeans />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection />
        
        {/* Section 2: Brewed to perfection */}
        <FullBleedSection
          id="section-2"
          image="/pour_glass.jpg"
          label="SINGLE-ORIGIN"
          headline="Brewed to perfection."
          body="We roast in small batches and ship within 48 hours so your cup tastes like the farm, not the warehouse."
          zIndex={20}
        />
        
        {/* Section 3: Taste the difference */}
        <FullBleedSection
          id="section-3"
          image="/hands_cup.jpg"
          headline="Taste the difference."
          body="Ethically sourced, carefully roasted, and sealed to keep the aromatics locked in."
          cta="Read our sourcing story"
          zIndex={30}
        />
        
        {/* Section 4: Savor the moment */}
        <FullBleedSection
          id="section-4"
          image="/cup_on_table.jpg"
          headline="Savor the moment."
          body="A clean, balanced cup with notes of caramel, citrus, and dark chocolate."
          zIndex={40}
        />
        
        {/* Section 5: Two Card Value */}
        <TwoCardSection zIndex={50} />
        
        {/* Section 6: Crafted with care */}
        <FullBleedSection
          id="section-6"
          image="/roaster_action.jpg"
          headline="Crafted with care."
          body="Small-batch profiling for consistency. Every bag is dated, labeled, and quality-checked."
          zIndex={60}
        />
        
        {/* Section 7: Aromatic bliss */}
        <FullBleedSection
          id="section-7"
          image="/steam_cup.jpg"
          headline="Aromatic bliss."
          body="Brew it slow. Sip it slower. We'll send tips to help you dial in your method."
          cta="Browse brew guides"
          zIndex={70}
        />
        
        {/* Section 8: From bean to cup */}
        <FullBleedSection
          id="section-8"
          image="/beans_macro.jpg"
          headline="From bean to cup."
          body="Traceable farms. Seasonal harvests. Transparent pricing for growers and drinkers."
          cta="View current origins"
          zIndex={80}
        />
        
        {/* Section 9: Flavor Wheel */}
        <FlavorWheelSection zIndex={90} />
        
        {/* Section 10: Pricing */}
        <PricingSection />
        
        {/* Section 11: Closing Collage */}
        <ClosingSection zIndex={100} />
        
        {/* Section 12: Contact */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
