import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const footer = footerRef.current;

    if (!section || !left || !right || !footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: left,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        right,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: right,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        footer,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B0B0C] text-white py-[10vh] px-6"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          {/* Left Column - Contact Info */}
          <div ref={leftRef}>
            <h2 className="font-display text-[clamp(34px,3.6vw,56px)] font-bold leading-tight mb-4">
              Let's talk coffee.
            </h2>
            <p className="text-[clamp(14px,1.1vw,18px)] text-white/70 leading-relaxed mb-8 max-w-md">
              Questions about brewing, subscriptions, or wholesale? We reply
              within 24 hours.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:hello@brewandbound.co"
                className="flex items-center gap-3 text-white/80 hover:text-[#D7A04D] transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">hello@brewandbound.co</span>
              </a>
              <a
                href="tel:+15550142230"
                className="flex items-center gap-3 text-white/80 hover:text-[#D7A04D] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-sm">+1 (555) 014-2230</span>
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">
                  Roastery & HQ — 412 River Street, Portland, OR
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={rightRef}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs uppercase tracking-[0.08em] text-white/60 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D7A04D] transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs uppercase tracking-[0.08em] text-white/60 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D7A04D] transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs uppercase tracking-[0.08em] text-white/60 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D7A04D] transition-colors resize-none"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#D7A04D] text-white py-3 rounded-full font-medium hover:bg-[#B8863D] transition-colors"
              >
                Send message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Shipping
            </a>
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Returns
            </a>
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Terms
            </a>
          </div>
          <p className="text-sm text-white/40">
            © 2026 Brew & Bound. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
