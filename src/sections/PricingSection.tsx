import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    description: '1 bag / month',
    price: '$18',
    detail: 'Great for weekend brewing',
    features: ['1 x 12oz bag', 'Free shipping', 'Brew guide included'],
  },
  {
    name: 'Daily',
    description: '2 bags / month',
    price: '$32',
    detail: 'Best value for households',
    features: ['2 x 12oz bags', 'Free shipping', 'Brew guide included', 'Early access to new roasts'],
    popular: true,
  },
  {
    name: 'Pro',
    description: '4 bags / month',
    price: '$58',
    detail: 'For small teams & cafés',
    features: ['4 x 12oz bags', 'Free shipping', 'Brew guide included', 'Early access', 'Wholesale pricing'],
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Cards animation with stagger
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6F5F2] py-[10vh] px-6"
    >
      {/* Header */}
      <div ref={headerRef} className="text-center max-w-[720px] mx-auto mb-[6vh]">
        <h2 className="font-display text-[clamp(34px,3.6vw,56px)] font-bold leading-tight text-[#141414] mb-4">
          Subscriptions
        </h2>
        <p className="text-[clamp(14px,1.1vw,18px)] text-[#6E6E6E] leading-relaxed">
          Save up to 20%. Pause or cancel anytime.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            ref={(el) => { cardsRef.current[index] = el; }}
            className={`card-japandi bg-white p-7 flex flex-col ${
              plan.popular ? 'ring-2 ring-[#D7A04D]' : ''
            }`}
          >
            {plan.popular && (
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#D7A04D] mb-3">
                Most Popular
              </span>
            )}
            <h3 className="font-display text-xl font-semibold text-[#141414] mb-1">
              {plan.name}
            </h3>
            <p className="text-sm text-[#6E6E6E] mb-4">{plan.description}</p>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="font-display text-4xl font-bold text-[#141414]">
                {plan.price}
              </span>
              <span className="text-sm text-[#6E6E6E]">/mo</span>
            </div>
            <p className="text-sm text-[#6E6E6E] mb-6">{plan.detail}</p>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-[#D7A04D] flex-shrink-0" />
                  <span className="text-[#141414]">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                plan.popular
                  ? 'bg-[#D7A04D] text-white hover:bg-[#B8863D]'
                  : 'border-2 border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-white'
              }`}
            >
              Choose plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
