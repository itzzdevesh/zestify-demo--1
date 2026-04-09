import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TwoCardSectionProps {
  zIndex: number;
}

export default function TwoCardSection({ zIndex }: TwoCardSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bottomHeadlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    const bottomHeadline = bottomHeadlineRef.current;

    if (!section || !leftCard || !rightCard || !bottomHeadline) return;

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
          leftCard,
          { x: '-50vw', rotate: -2, opacity: 0 },
          { x: 0, rotate: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          rightCard,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          bottomHeadline,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          leftCard,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          rightCard,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          bottomHeadline,
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, ease: 'power2.in' },
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
      {/* Left Card - Image */}
      <div
        ref={leftCardRef}
        className="absolute left-[7vw] top-[14vh] w-[38vw] h-[72vh] card-japandi overflow-hidden"
      >
        <img
          src="/value_latte_art.jpg"
          alt="Latte art"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Card - Text */}
      <div
        ref={rightCardRef}
        className="absolute left-[55vw] top-[14vh] w-[38vw] h-[72vh] card-japandi bg-white p-[clamp(22px,2.4vw,40px)] flex flex-col justify-center"
      >
        <h3 className="font-display text-[clamp(24px,2.2vw,36px)] font-bold leading-tight text-[#141414] mb-4">
          Roasted weekly.
          <br />
          Shipped fresh.
        </h3>
        <p className="text-[clamp(14px,1.1vw,18px)] text-[#6E6E6E] leading-relaxed mb-6">
          Choose whole bean or grind size. We'll handle the rest—tracking,
          timing, and a quick brew guide in every box.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#141414] hover:text-[#D7A04D] transition-colors group"
        >
          See roast schedule
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* Bottom Big Headline */}
      <h2
        ref={bottomHeadlineRef}
        className="absolute left-[7vw] bottom-[7vh] font-display text-[clamp(34px,3.6vw,56px)] font-bold leading-tight text-[#141414] w-[70vw]"
      >
        Experience the richness.
      </h2>
    </section>
  );
}
