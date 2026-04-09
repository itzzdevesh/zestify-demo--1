import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ClosingSectionProps {
  zIndex: number;
}

export default function ClosingSection({ zIndex }: ClosingSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const card3 = card3Ref.current;
    const text = textRef.current;

    if (!section || !card1 || !card2 || !card3 || !text) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          card1,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          card2,
          { y: '-60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          card3,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          text,
          { scale: 0.96, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0.1
        );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          card1,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          card2,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          card3,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          text,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F6F5F2]"
      style={{ zIndex }}
    >
      {/* Card 1 - Tall Portrait Left */}
      <div
        ref={card1Ref}
        className="absolute left-[6vw] top-[10vh] w-[28vw] h-[80vh] card-japandi overflow-hidden"
      >
        <img
          src="/closing_1.jpg"
          alt="Coffee lifestyle"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card 2 - Wide Top Right */}
      <div
        ref={card2Ref}
        className="absolute left-[38vw] top-[10vh] w-[56vw] h-[34vh] card-japandi overflow-hidden"
      >
        <img
          src="/closing_2.jpg"
          alt="Pour over brewing"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card 3 - Wide Bottom Right */}
      <div
        ref={card3Ref}
        className="absolute left-[38vw] top-[52vh] w-[56vw] h-[38vh] card-japandi overflow-hidden"
      >
        <img
          src="/closing_3.jpg"
          alt="Coffee cup close-up"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Centered Text Overlay */}
      <div
        ref={textRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 w-[min(80vw,1100px)]"
      >
        <h2 className="font-display text-[clamp(44px,5vw,84px)] font-bold leading-[0.95] text-white text-shadow mb-4">
          Brew your perfect cup.
        </h2>
        <p className="text-[clamp(14px,1.1vw,18px)] text-white/90 mb-8">
          Single-origin beans, roasted for you.
        </p>
        <button className="btn-primary bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-[#141414]">
          Shop Coffee
        </button>
      </div>
    </section>
  );
}
