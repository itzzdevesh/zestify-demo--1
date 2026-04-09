import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Bean {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
}

const beans: Bean[] = [
  { id: 1, x: 8, y: 15, size: 32, rotation: 25, duration: 6, delay: 0 },
  { id: 2, x: 92, y: 25, size: 24, rotation: -15, duration: 8, delay: 1 },
  { id: 3, x: 15, y: 65, size: 28, rotation: 45, duration: 7, delay: 0.5 },
  { id: 4, x: 88, y: 75, size: 36, rotation: -30, duration: 5, delay: 2 },
  { id: 5, x: 5, y: 85, size: 20, rotation: 60, duration: 9, delay: 1.5 },
  { id: 6, x: 95, y: 50, size: 30, rotation: -45, duration: 6.5, delay: 0.8 },
  { id: 7, x: 25, y: 35, size: 22, rotation: 15, duration: 7.5, delay: 2.5 },
  { id: 8, x: 75, y: 90, size: 26, rotation: -60, duration: 5.5, delay: 1.2 },
  { id: 9, x: 45, y: 10, size: 18, rotation: 35, duration: 8.5, delay: 0.3 },
  { id: 10, x: 65, y: 45, size: 34, rotation: -20, duration: 6.8, delay: 1.8 },
];

export default function FloatingBeans() {
  const containerRef = useRef<HTMLDivElement>(null);
  const beansRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax scroll effect for beans
      beansRef.current.forEach((bean, index) => {
        if (!bean) return;
        
        gsap.to(bean, {
          y: `${-30 - (index % 3) * 20}%`,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5 + (index % 3) * 0.2,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
    >
      {beans.map((bean, index) => (
        <div
          key={bean.id}
          ref={(el) => { beansRef.current[index] = el; }}
          className="absolute floating-bean"
          style={{
            left: `${bean.x}%`,
            top: `${bean.y}%`,
            width: `${bean.size}px`,
            height: `${bean.size * 1.6}px`,
            animationDuration: `${bean.duration}s`,
            animationDelay: `${bean.delay}s`,
          }}
        >
          <svg
            viewBox="0 0 24 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            style={{ transform: `rotate(${bean.rotation}deg)` }}
          >
            <ellipse
              cx="12"
              cy="19"
              rx="10"
              ry="17"
              fill="#3D2914"
              fillOpacity="0.15"
            />
            <path
              d="M12 2C6.477 2 2 9.85 2 19s4.477 17 10 17 10-7.85 10-17S17.523 2 12 2z"
              fill="#3D2914"
              fillOpacity="0.12"
            />
            <path
              d="M12 6c-3.5 0-6 5.82-6 13s2.5 13 6 13 6-5.82 6-13S15.5 6 12 6z"
              fill="#3D2914"
              fillOpacity="0.08"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
