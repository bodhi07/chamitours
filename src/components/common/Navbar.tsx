"use client";

import Link from "next/link";
import { Phone, Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "py-4 glass shadow-2xl" : "py-6 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-primary">SURESH</span>
            <span className="text-[0.6rem] md:text-[0.7rem] tracking-[0.5em] text-white font-light mt-[-2px] group-hover:text-primary transition-colors">TOURS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {["HOME", "DESTINATIONS", "PACKAGES", "GALLERY", "CONTACT"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                className="text-xs font-bold tracking-[0.2em] text-white/80 hover:text-primary transition-colors py-2 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer group">
              <Globe className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-bold tracking-widest text-white">EN</span>
              <span className="text-[8px] text-white/40">▼</span>
            </div>

            <button className="hidden sm:flex items-center space-x-3 bg-primary hover:orange-gradient text-black px-6 py-3 rounded-full font-black text-[10px] tracking-[0.2em] transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              <Phone className="w-4 h-4" fill="currentColor" />
              <span>CALL US</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-t border-white/10 py-10 flex flex-col items-center space-y-8 lg:hidden shadow-3xl"
          >
            {["HOME", "DESTINATIONS", "PACKAGES", "GALLERY", "CONTACT"].map((item) => (
              <Link
                key={item}
                href="/"
                className="text-lg font-bold tracking-[0.3em] text-white hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <button className="flex items-center space-x-3 bg-primary text-black px-8 py-4 rounded-full font-black text-xs tracking-[0.2em]">
              <Phone className="w-5 h-5 fill-current" />
              <span>CALL US</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
