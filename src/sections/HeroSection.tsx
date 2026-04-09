import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Load animation (auto-play on mount)
      const loadTl = gsap.timeline();

      loadTl
        .fromTo(
          content.querySelectorAll('.animate-item'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 }
        );

      // Scroll animation (exit only)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.set(content.querySelectorAll('.animate-item'), {
              opacity: 1,
              y: 0,
            });
          },
        },
      });

      // Exit phase (70% - 100%)
      scrollTl
        .fromTo(
          content,
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
      className="section-pinned z-10"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/pour_glass.jpg"
      >
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-[min(80vw,900px)]"
      >
        <span className="animate-item font-mono text-xs uppercase tracking-[0.12em] text-white/70 mb-6 block">
          Specialty Coffee & Roastery
        </span>

        <h1 className="animate-item font-display text-[clamp(48px,6vw,96px)] font-bold leading-[0.95] tracking-tight text-white text-shadow mb-6">
          Coffee, made simple.
        </h1>

        <p className="animate-item text-[clamp(16px,1.2vw,20px)] text-white/90 leading-relaxed max-w-lg mx-auto mb-10">
          Single-origin beans, roasted weekly and shipped fresh.
        </p>

        <div className="animate-item flex items-center justify-center gap-6 flex-wrap">
          <button className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white text-white font-medium transition-all duration-300 hover:bg-white hover:text-[#141414]">
            Shop Coffee
          </button>
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#D7A04D] transition-colors group"
          >
            Start a Subscription
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
