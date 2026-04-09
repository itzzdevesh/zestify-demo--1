import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? 'bg-[#F6F5F2]/90 backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-lg font-semibold tracking-tight text-[#141414]"
        >
          Brew & Bound
        </a>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-sm font-medium text-[#141414] hover:text-[#D7A04D] transition-colors"
          >
            Shop
          </a>
          <a
            href="#"
            className="text-sm font-medium text-[#141414] hover:text-[#D7A04D] transition-colors"
          >
            Subscriptions
          </a>
          <a
            href="#"
            className="text-sm font-medium text-[#141414] hover:text-[#D7A04D] transition-colors"
          >
            Brew Guides
          </a>
          <a
            href="#"
            className="text-sm font-medium text-[#141414] hover:text-[#D7A04D] transition-colors"
          >
            About
          </a>
        </div>

        {/* Cart */}
        <button className="flex items-center gap-2 text-sm font-medium text-[#141414] hover:text-[#D7A04D] transition-colors">
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">Cart (0)</span>
        </button>
      </div>
    </nav>
  );
}
