"use client";

import Link from "next/link";
import { Phone, Globe, Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["HOME", "DESTINATIONS", "PACKAGES", "GALLERY", "CONTACT"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "py-3 glass" : "py-5 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">

          {/* ── Logo ── */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-primary transition-all group-hover:scale-105">
              CHAMI
            </span>
            <span className="text-[0.6rem] md:text-[0.7rem] tracking-[0.5em] text-foreground/50 font-semibold mt-[-2px] group-hover:text-primary transition-colors uppercase">
              TOURS
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="relative text-[11px] font-bold tracking-[0.18em] text-foreground/60 hover:text-primary transition-colors py-2 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] rounded-full bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center space-x-3">
            {/* Language picker */}
            <div className="hidden md:flex items-center space-x-1.5 bg-foreground/5 border border-foreground/8 px-3 py-1.5 rounded-full hover:bg-foreground/10 transition-colors cursor-pointer group">
              <Globe className="w-3.5 h-3.5 text-primary group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-bold tracking-widest text-foreground/70">EN</span>
              <span className="text-[8px] text-foreground/30">▼</span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-foreground/5 border border-foreground/8 text-foreground/70 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
            >
              {theme === "light"
                ? <Moon className="w-4 h-4" />
                : <Sun className="w-4 h-4" />}
            </button>

            {/* CTA button */}
            <button className="hidden sm:flex items-center space-x-2 orange-gradient text-white px-5 py-2.5 rounded-full font-black text-[10px] tracking-[0.18em] transition-all transform hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(255,143,0,0.35)]">
              <Phone className="w-3.5 h-3.5" fill="currentColor" />
              <span>CALL US</span>
            </button>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-foreground/70 p-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute top-full left-0 right-0 bg-[var(--surface)] border-t border-[var(--border-color)] py-10 flex flex-col items-center space-y-7 lg:hidden shadow-[var(--shadow-xl)]"
          >
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="text-base font-bold tracking-[0.28em] text-foreground/70 hover:text-primary transition-colors uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <button className="flex items-center space-x-2 orange-gradient text-white px-8 py-3.5 rounded-full font-black text-xs tracking-[0.18em] shadow-[0_4px_16px_rgba(255,143,0,0.35)]">
              <Phone className="w-4 h-4 fill-current" />
              <span>CALL US</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
