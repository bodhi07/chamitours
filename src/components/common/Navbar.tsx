"use client";

import Link from "next/link";
import { Globe, Menu, X, Moon, Sun, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { usePathname } from "next/navigation";
import BookingModal from "./BookingModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  
  // Hide Navbar on Admin pages
  if (pathname?.startsWith("/admin")) return null;

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.destinations"), href: "/destinations" },
    { label: t("nav.tours"), href: "/tours" },
    { label: t("nav.packages"), href: "/packages" },
    { label: t("nav.gallery"), href: "/gallery" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  return (
    <>
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "py-3 glass shadow-[var(--shadow-md)]" : "py-5 bg-transparent"}`}>
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
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-xs font-bold tracking-[0.15em] transition-colors py-2 group ${active ? "text-primary" : "text-foreground/55 hover:text-primary"}`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                );
              })}
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center space-x-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="hidden md:flex items-center space-x-1.5 bg-foreground/5 border border-foreground/8 px-3 py-1.5 rounded-full hover:bg-foreground/10 transition-colors cursor-pointer group"
              >
                <Globe className="w-3.5 h-3.5 text-primary group-hover:rotate-12 transition-transform" />
                <span className="text-[11px] font-bold tracking-widest text-foreground/80">{language.toUpperCase()}</span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-full bg-foreground/5 border border-foreground/8 text-foreground/70 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all"
              >
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              {/* Book Now CTA */}
              <button
                onClick={() => setBookingOpen(true)}
                className="hidden sm:flex items-center space-x-2 bg-secondary text-black px-6 py-3 rounded-full font-black text-[11px] tracking-[0.15em] transition-all hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(255,143,0,0.35)]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t("nav.bookNow")}</span>
              </button>

              {/* Mobile toggle */}
              <button
                className="lg:hidden text-foreground/70 p-2 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
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
              className="absolute top-full left-0 right-0 bg-[var(--surface)] border-t border-[var(--border-color)] py-10 flex flex-col items-center space-y-6 lg:hidden shadow-[var(--shadow-xl)]"
            >
              {navLinks.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-bold tracking-[0.28em] uppercase transition-colors ${active ? "text-primary" : "text-foreground/60 hover:text-primary"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 text-xs font-bold tracking-widest text-foreground/60"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === "en" ? "SWITCH TO DEUTSCH" : "AUF ENGLISCH WECHSELN"}</span>
                </button>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); setBookingOpen(true); }}
                  className="flex items-center space-x-2 bg-secondary text-black px-8 py-3.5 rounded-full font-black text-xs tracking-[0.18em] shadow-[0_4px_16px_rgba(255,143,0,0.35)] hover:scale-105 transition-transform"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t("nav.bookNow")}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
