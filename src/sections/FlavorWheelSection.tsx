import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FlavorWheelSectionProps {
  zIndex: number;
}

const outerLabels = ['Floral', 'Citrus', 'Berry', 'Chocolate', 'Nutty', 'Spice'];
const middleLabels = ['Tea-like', 'Fruity', 'Syrupy', 'Creamy', 'Smoky'];
const innerLabels = ['Delicate', 'Balanced', 'Intense'];

export default function FlavorWheelSection({ zIndex }: FlavorWheelSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<SVGSVGElement>(null);
  const middleRingRef = useRef<SVGSVGElement>(null);
  const innerRingRef = useRef<SVGSVGElement>(null);
  
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [ctaText, setCtaText] = useState('Shop by flavor');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const wheelContainer = wheelContainerRef.current;
    const outerRing = outerRingRef.current;
    const middleRing = middleRingRef.current;
    const innerRing = innerRingRef.current;

    if (!section || !headline || !wheelContainer || !outerRing || !middleRing || !innerRing) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          headline,
          { x: '-18vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          wheelContainer,
          { x: '18vw', scale: 0.92, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, ease: 'none' },
          0
        );

      // SETTLE (30% - 70%) - wheel rotates
      scrollTl
        .fromTo(
          outerRing,
          { rotation: 0 },
          { rotation: 25, ease: 'none' },
          0.3
        )
        .fromTo(
          middleRing,
          { rotation: 0 },
          { rotation: -18, ease: 'none' },
          0.3
        )
        .fromTo(
          innerRing,
          { rotation: 0 },
          { rotation: 10, ease: 'none' },
          0.3
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          headline,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          wheelContainer,
          { x: 0, scale: 1, opacity: 1 },
          { x: '10vw', scale: 0.96, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          outerRing,
          { rotation: 25 },
          { rotation: 55, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          middleRing,
          { rotation: -18 },
          { rotation: -40, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          innerRing,
          { rotation: 10 },
          { rotation: 28, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSegmentClick = (segment: string) => {
    setSelectedSegment(segment);
    setCtaText(`Shop ${segment} coffees`);
  };

  // Generate SVG paths for wheel segments
  const createSegmentPath = (innerR: number, outerR: number, startAngle: number, endAngle: number) => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = 150 + innerR * Math.cos(toRad(startAngle));
    const y1 = 150 + innerR * Math.sin(toRad(startAngle));
    const x2 = 150 + outerR * Math.cos(toRad(startAngle));
    const y2 = 150 + outerR * Math.sin(toRad(startAngle));
    const x3 = 150 + outerR * Math.cos(toRad(endAngle));
    const y3 = 150 + outerR * Math.sin(toRad(endAngle));
    const x4 = 150 + innerR * Math.cos(toRad(endAngle));
    const y4 = 150 + innerR * Math.sin(toRad(endAngle));
    
    return `M ${x1} ${y1} L ${x2} ${y2} A ${outerR} ${outerR} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 0 0 ${x1} ${y1}`;
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F6F5F2]"
      style={{ zIndex }}
    >
      {/* Left Headline Block */}
      <div
        ref={headlineRef}
        className="absolute left-[7vw] top-1/2 -translate-y-1/2 w-[34vw]"
      >
        <h2 className="font-display text-[clamp(34px,3.6vw,56px)] font-bold leading-tight text-[#141414] mb-4">
          Find your flavor.
        </h2>
        <p className="text-[clamp(14px,1.1vw,18px)] text-[#6E6E6E] leading-relaxed mb-8 max-w-md">
          Rotate the rings to match your mood—light & bright, bold & rich, or
          somewhere in between.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#141414] hover:text-[#D7A04D] transition-colors group"
        >
          {ctaText}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* Right Wheel */}
      <div
        ref={wheelContainerRef}
        className="absolute right-[7vw] top-1/2 -translate-y-1/2 w-[min(44vw,520px)] aspect-square"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.12)', borderRadius: '50%' }}
      >
        {/* Outer Ring */}
        <svg
          ref={outerRingRef}
          viewBox="0 0 300 300"
          className="absolute inset-0 w-full h-full"
          style={{ transformOrigin: 'center' }}
        >
          {outerLabels.map((label, i) => {
            const startAngle = i * 60 - 90;
            const endAngle = (i + 1) * 60 - 90;
            const path = createSegmentPath(100, 145, startAngle, endAngle);
            const isSelected = selectedSegment === label;
            
            return (
              <g key={label}>
                <path
                  d={path}
                  fill={isSelected ? '#D7A04D' : '#E8E4DC'}
                  stroke={isSelected ? '#D7A04D' : '#D4CFC4'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="wheel-segment"
                  onClick={() => handleSegmentClick(label)}
                />
                <text
                  x={150 + 122 * Math.cos(((startAngle + endAngle) / 2 * Math.PI) / 180)}
                  y={150 + 122 * Math.sin(((startAngle + endAngle) / 2 * Math.PI) / 180)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-mono text-[8px] uppercase tracking-wider fill-[#141414] pointer-events-none"
                  style={{ fontSize: '8px' }}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Middle Ring */}
        <svg
          ref={middleRingRef}
          viewBox="0 0 300 300"
          className="absolute inset-0 w-full h-full"
          style={{ transformOrigin: 'center' }}
        >
          {middleLabels.map((label, i) => {
            const startAngle = i * 72 - 90;
            const endAngle = (i + 1) * 72 - 90;
            const path = createSegmentPath(55, 95, startAngle, endAngle);
            const isSelected = selectedSegment === label;
            
            return (
              <g key={label}>
                <path
                  d={path}
                  fill={isSelected ? '#D7A04D' : '#F0EDE6'}
                  stroke={isSelected ? '#D7A04D' : '#DDD8CC'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="wheel-segment"
                  onClick={() => handleSegmentClick(label)}
                />
                <text
                  x={150 + 75 * Math.cos(((startAngle + endAngle) / 2 * Math.PI) / 180)}
                  y={150 + 75 * Math.sin(((startAngle + endAngle) / 2 * Math.PI) / 180)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-mono text-[7px] uppercase tracking-wider fill-[#141414] pointer-events-none"
                  style={{ fontSize: '7px' }}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Inner Ring */}
        <svg
          ref={innerRingRef}
          viewBox="0 0 300 300"
          className="absolute inset-0 w-full h-full"
          style={{ transformOrigin: 'center' }}
        >
          {innerLabels.map((label, i) => {
            const startAngle = i * 120 - 90;
            const endAngle = (i + 1) * 120 - 90;
            const path = createSegmentPath(15, 50, startAngle, endAngle);
            const isSelected = selectedSegment === label;
            
            return (
              <g key={label}>
                <path
                  d={path}
                  fill={isSelected ? '#D7A04D' : '#F6F5F2'}
                  stroke={isSelected ? '#D7A04D' : '#E5E1D8'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="wheel-segment"
                  onClick={() => handleSegmentClick(label)}
                />
                <text
                  x={150 + 32 * Math.cos(((startAngle + endAngle) / 2 * Math.PI) / 180)}
                  y={150 + 32 * Math.sin(((startAngle + endAngle) / 2 * Math.PI) / 180)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-mono text-[6px] uppercase tracking-wider fill-[#141414] pointer-events-none"
                  style={{ fontSize: '6px' }}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#D7A04D] rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">B</span>
        </div>
      </div>
    </section>
  );
}
