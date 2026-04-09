import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FullBleedSectionProps {
  id: string;
  image: string;
  label?: string;
  headline: string;
  body: string;
  cta?: string;
  zIndex: number;
}

export default function FullBleedSection({
  id,
  image,
  label,
  headline,
  body,
  cta,
  zIndex,
}: FullBleedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const text = textRef.current;

    if (!section || !bg || !text) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          bg,
          { scale: 1.08, opacity: 0.6 },
          { scale: 1, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          text,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          bg,
          { scale: 1, opacity: 1 },
          { scale: 1.05, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          text,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned"
      style={{ zIndex }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={image}
          alt={headline}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Text Block */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-6 max-w-[min(72vw,980px)]"
      >
        {label && (
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-white/80 mb-4 block">
            {label}
          </span>
        )}
        <h2 className="font-display text-[clamp(34px,3.6vw,56px)] font-bold leading-tight text-white text-shadow mb-6">
          {headline}
        </h2>
        <p className="text-[clamp(14px,1.1vw,18px)] text-white/90 leading-relaxed max-w-xl mx-auto mb-8">
          {body}
        </p>
        {cta && (
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#D7A04D] transition-colors group"
          >
            {cta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        )}
      </div>
    </section>
  );
}
