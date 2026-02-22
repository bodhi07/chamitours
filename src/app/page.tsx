"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ArrowRight, Instagram, Twitter, Facebook, PlayCircle, Star, MessageSquare, Quote, Camera, MapPin, Phone as PhoneIcon, Mail } from "lucide-react";

export default function Home() {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
  ];

  const heroCards = [
    { url: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600", alt: "Coastal View", delay: 0.2 },
    { url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", alt: "Tropical Palm", delay: 0.4, border: "border-primary" },
    { url: "https://images.unsplash.com/photo-1588665575322-d9527ec3c491?q=80&w=600", alt: "White Temple", delay: 0.6 },
    { url: "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=600", alt: "Stupa", delay: 0.8 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000"
            alt="Sri Lanka Landscape"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay — adapts per theme via CSS class */}
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 z-10 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 pt-14">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-[2px] bg-secondary rounded-full" />
                <span className="text-secondary font-bold tracking-[0.3em] text-[10px] uppercase">ChamiTours Presents</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black leading-[0.88] mb-6 tracking-tighter">
                Start Your<br />
                <span className="text-foreground/15" style={{ WebkitTextStroke: "1.5px var(--foreground)" }}>Dream</span>{" "}
                Journey
              </h1>

              <p className="text-base md:text-lg text-foreground/55 mb-10 max-w-lg leading-relaxed font-medium">
                Discover the unseen beauty of Sri Lanka with our premium guided tours. Tailored experiences crafted just for you.
              </p>

              <div className="flex flex-wrap gap-5 items-center">
                <button className="btn-primary">
                  <span>EXPLORE NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.3em] text-foreground/60 group-hover:text-foreground transition-colors">WATCH VIDEO</span>
                </button>
              </div>

              {/* Stats row */}
              <div className="mt-14 flex flex-wrap gap-10">
                {[
                  { num: "2800+", label: "Happy Travelers" },
                  { num: "120+", label: "Tour Packages" },
                  { num: "4.9★", label: "Average Rating" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-3xl font-black text-foreground tracking-tighter">{s.num}</div>
                    <div className="text-[10px] text-foreground/40 font-bold tracking-widest uppercase mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content — Floating Cards */}
          <div className="lg:col-span-5 relative h-[500px] hidden md:block">
            <div className="flex space-x-3 items-center h-full">
              {heroCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.delay, duration: 0.8 }}
                  className={`relative w-28 h-[340px] rounded-2xl overflow-hidden border-2 transition-all duration-500 hover:w-60 hover:h-[390px] cursor-pointer group shadow-[var(--shadow-lg)] ${card.border || "border-foreground/10"}`}
                >
                  <Image src={card.url} alt={card.alt} fill className="object-cover transition-all duration-700 scale-110 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-5 left-5 right-5 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[9px] font-bold text-primary tracking-widest uppercase mb-0.5">{card.alt}</p>
                    <p className="text-xs font-bold text-white">Explore hidden beauty</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="absolute -bottom-8 right-0 flex items-center space-x-3">
              <button className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-foreground/5 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180 text-foreground/40" />
              </button>
              <button className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-foreground/5 transition-colors">
                <ArrowRight className="w-4 h-4 text-foreground/40" />
              </button>
              <div className="ml-6 text-3xl font-black text-foreground/10 tracking-tighter">01</div>
            </div>
          </div>
        </div>

        {/* Social bar */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-6 z-20">
          {socialLinks.map((s, i) => (
            <Link key={i} href={s.href} className="text-foreground/25 hover:text-primary transition-colors">
              <s.icon className="w-4 h-4" />
            </Link>
          ))}
          <div className="w-[1px] h-14 bg-foreground/10 mx-auto mt-2" />
        </div>
      </section>

      {/* ══════════════ PREMIUM ACTIVITIES ══════════════ */}
      <section className="py-28 bg-[var(--surface)] relative overflow-hidden">
        {/* Subtle decorative blob */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="badge mb-4">✦ Unforgettable Experiences</span>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none text-foreground">
                Discover Our <br />
                <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">Premium Activities</span>
              </h2>
              <p className="text-foreground/45 max-w-2xl mx-auto text-base leading-relaxed">
                Immerse yourself in the vivid spirit of Sri Lanka with our curated selection of thrilling adventures.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "AERIAL VIEW", title: "Paragliding", img: "https://images.unsplash.com/photo-1594495894542-a471467e45f1?q=80&w=800" },
              { label: "RELAXING", title: "Beach Sports", img: "https://images.unsplash.com/photo-1520110120385-ad291a19a801?q=80&w=800" },
              { label: "ADVENTURE", title: "Surfing", img: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800" },
              { label: "NATURE", title: "Mangroves", img: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=800" },
            ].map((act, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative h-[440px] rounded-[2rem] overflow-hidden shadow-[var(--shadow-lg)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-xl)]"
              >
                <Image src={act.img} alt={act.title} fill className="object-cover transition-all duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="badge bg-black/30 text-white border-white/20 backdrop-blur-md">{act.label}</span>
                </div>
                <div className="absolute bottom-7 left-7">
                  <h4 className="text-2xl font-black text-white tracking-tighter">{act.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CAPTURED MOMENTS ══════════════ */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Camera className="w-4 h-4 text-secondary" />
                <span className="badge">Our Travel Diaries</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase text-secondary">
                Captured Moments
              </h2>
              <p className="text-foreground/45 max-w-3xl mx-auto text-base leading-relaxed">
                From the misty mountains of Ella to the golden sandy beaches of Mirissa, every photograph tells a story of adventure, culture, and serenity.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800",
              "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800",
              "https://images.unsplash.com/photo-1588665575322-d9527ec3c491?q=80&w=800",
              "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=800",
            ].map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative h-[280px] rounded-2xl overflow-hidden group cursor-pointer shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all duration-500"
              >
                <Image src={img} alt={`Moment ${idx}`} fill className="object-cover transition-all duration-700 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-108" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="py-28 bg-[var(--surface)] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left — Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] overflow-hidden group aspect-[4/5] lg:aspect-auto lg:h-[660px] shadow-[var(--shadow-xl)]"
            >
              <Image
                src="https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=1200"
                alt="Stilt Fishermen"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 bg-white/90 dark:bg-black/70 backdrop-blur-xl border border-black/5 p-5 rounded-2xl flex items-center space-x-4 shadow-[var(--shadow-lg)]">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-black text-gray-800 leading-none mb-0.5 uppercase tracking-tight">100% Verified Reviews</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Real Travelers</p>
                </div>
              </div>
            </motion.div>

            {/* Right — Content */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="badge mb-4">✦ Testimonials</span>
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-[0.9] text-foreground uppercase">
                What Our <br />
                <span className="text-secondary">Guests</span> Say
              </h2>
              <p className="text-foreground/45 max-w-xl text-base mb-10 leading-relaxed">
                We take pride in creating unforgettable memories. Here is what travelers from around the world say about their journey with us.
              </p>

              <div className="flex space-x-5 overflow-x-auto no-scrollbar pb-8 -mx-3 px-3">
                {[
                  { name: "Dmitry Volkov", country: "Russia", date: "2 days ago", initial: "D", text: "Отличный сервис! Гид был очень вежливым. Рекомендую! Мы увидели много интересных мест!" },
                  { name: "Thomas Müller", country: "Germany", date: "1 week ago", initial: "T", text: "Der Fahrer war pünktlich und das Auto war sehr sauber. Eine perfekte Reise durch Sri Lanka!" },
                ].map((t, idx) => (
                  <div
                    key={idx}
                    className="min-w-[300px] md:min-w-[360px] bg-background border border-[var(--border-color)] rounded-[2rem] p-8 relative group shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all flex-shrink-0"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-secondary/15 border-2 border-secondary/25 flex items-center justify-center font-black text-secondary text-lg">
                          {t.initial}
                        </div>
                        <div>
                          <h4 className="font-black text-foreground tracking-tight leading-none">{t.name}</h4>
                          <p className="text-[9px] text-foreground/35 font-bold uppercase tracking-widest mt-0.5">{t.country} · {t.date}</p>
                        </div>
                      </div>
                      <Quote className="w-8 h-8 text-foreground/8 group-hover:text-secondary/20 transition-colors" />
                    </div>
                    <div className="flex space-x-1 mb-4">
                      {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />)}
                    </div>
                    <p className="text-foreground/65 text-sm leading-relaxed italic">"{t.text}"</p>
                  </div>
                ))}
              </div>

              <button className="mt-6 btn-primary">
                <MessageSquare className="w-4 h-4" />
                <span>WRITE A REVIEW</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="py-28 bg-background overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025] select-none pointer-events-none text-foreground">
          <h2 className="text-[18vw] font-black tracking-tighter leading-none">SRI LANKA</h2>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <span className="badge mb-4">✦ What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-foreground">Our Services</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: "EXPERT GUIDES", desc: "Friendly local guides", img: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=400" },
              { title: "HOTEL BOOKING", desc: "Best resorts & stays", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=400", active: true },
              { title: "24/7 SUPPORT", desc: "Anytime assistance", img: "https://images.unsplash.com/photo-1588665575322-d9527ec3c491?q=80&w=400" },
              { title: "SAFARI TOURS", desc: "Wildlife adventures", img: "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=400" },
            ].map((svc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative h-[480px] rounded-[1.75rem] overflow-hidden group cursor-pointer shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 ${svc.active ? "md:-translate-y-5" : ""}`}
              >
                <Image src={svc.img} alt={svc.title} fill className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute bottom-8 left-7 right-7">
                  <h4 className="text-xl font-black mb-1 tracking-tighter text-white">{svc.title}</h4>
                  <p className="text-white/55 text-[10px] font-bold tracking-widest uppercase">{svc.desc}</p>
                  <div className="w-10 h-[2px] bg-white/15 mt-5 relative overflow-hidden rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`absolute top-0 left-0 h-full rounded-full ${svc.active ? "bg-primary" : "bg-white/50"}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button className="inline-flex items-center space-x-3 group">
              <span className="text-[10px] font-black tracking-[0.4em] text-foreground/35 group-hover:text-foreground transition-colors uppercase">View All Services</span>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════ CAPTURED MOMENTS GALLERY ══════════════ */}
      <section className="relative py-28 bg-[var(--surface)] overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">

          {/* ─ Header ─ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-2 mb-5">
              <Camera className="w-4 h-4 text-secondary" />
              <span className="text-[10px] font-black tracking-[0.35em] text-secondary uppercase">Our Travel Diaries</span>
            </div>
            <h2 className="text-5xl md:text-[5.5rem] font-black tracking-tighter leading-none mb-6 text-secondary uppercase">
              Captured Moments
            </h2>
            <p className="text-foreground/45 max-w-2xl mx-auto text-base leading-relaxed">
              Explore the breathtaking beauty of Sri Lanka through our lens. From the misty mountains of Ella to the golden sandy beaches of Mirissa, every photograph tells a story of adventure, culture, and serenity.
            </p>
          </motion.div>

          {/* ─ Masonry-style gallery grid ─ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

            {/* Large feature card — spans 2 rows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative col-span-2 row-span-2 rounded-3xl overflow-hidden cursor-pointer shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] transition-all duration-500"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200"
                alt="Sri Lanka Landscape"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-black text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
                  ✦ Featured
                </span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-xs font-black text-white/60 uppercase tracking-widest mb-1">Highland Serenity</p>
                <h4 className="text-2xl font-black text-white tracking-tight leading-tight">Sri Lanka's Timeless Vistas</h4>
                <div className="flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-5 h-[1px] bg-secondary" />
                  <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase">ChamiTours</span>
                </div>
              </div>
            </motion.div>

            {/* 4 small portrait cards */}
            {[
              { img: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600", label: "Kandy Temple", tag: "Culture" },
              { img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600", label: "Ella Highlands", tag: "Adventure" },
              { img: "https://images.unsplash.com/photo-1588665575322-d9527ec3c491?q=80&w=600", label: "Mirissa Beach", tag: "Beach" },
              { img: "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=600", label: "Sigiriya Rock", tag: "History" },
            ].map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all duration-500"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={photo.img}
                  alt={photo.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Category tag */}
                <div className="absolute top-3 left-3">
                  <span className="bg-foreground/80 backdrop-blur-sm text-background text-[8px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full">
                    {photo.tag}
                  </span>
                </div>

                {/* Hover expand icon */}
                <motion.div
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </motion.div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                  <p className="text-white font-black text-sm tracking-tight leading-none mb-1">{photo.label}</p>
                  <div className="flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-3 h-[1.5px] bg-secondary rounded-full" />
                    <span className="text-white/50 text-[9px] font-bold tracking-widest uppercase">ChamiTours</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ─ CTA row ─ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14"
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center space-x-3 bg-secondary text-black font-black text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-[0_8px_24px_rgba(255,143,0,0.3)] hover:shadow-[0_12px_32px_rgba(255,143,0,0.4)] hover:scale-105 transition-all duration-300"
            >
              <Camera className="w-4 h-4" />
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-foreground/25 text-xs tracking-widest font-bold">150+ Photos from Sri Lanka</span>
          </motion.div>
        </div>
      </section>


      {/* ══════════════ PREMIUM FOOTER ══════════════ */}
      <footer className="relative overflow-hidden bg-[#0a0a0f] text-white">

        {/* ── Giant textured brand headline ── */}
        <div className="relative h-[240px] md:h-[320px] flex items-center justify-center overflow-hidden select-none">
          {/* Background landscape image that shows through text */}
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000"
            alt="Sri Lanka"
            fill
            className="object-cover object-center brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/80" />

          <motion.h2
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-[14vw] md:text-[12vw] font-black tracking-tighter leading-none text-transparent bg-clip-text"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitTextStroke: "1px rgba(255,255,255,0.12)",
            }}
          >
            CHAMI TOURS
          </motion.h2>
        </div>

        {/* ── Main footer content ── */}
        <div className="container mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Col 1 — Brand */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.0 }}
            >
              <Link href="/" className="inline-flex flex-col leading-none mb-5 group">
                <span className="text-2xl font-black tracking-tighter text-primary">CHAMI</span>
                <span className="text-[0.55rem] tracking-[0.5em] text-white/30 font-semibold uppercase">TOURS</span>
              </Link>
              <h4 className="text-xl font-black text-white mb-3 leading-snug">Explore Sri Lanka.</h4>
              <p className="text-white/40 text-sm leading-relaxed mb-7">
                We are not just a travel agency; we are your gateway to the hidden wonders of Sri Lanka. From the misty hills of Ella to the golden coasts of Mirissa, let us craft your perfect journey.
              </p>
              <div className="flex items-center space-x-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: PlayCircle, href: "#" },
                ].map(({ icon: Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Col 2 — Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h5 className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase mb-6">COMPANY</h5>
              <ul className="space-y-4">
                {["About Us", "Our Services", "Packages", "Gallery", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="group inline-flex items-center space-x-2 text-white/55 hover:text-white text-sm font-medium transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-primary transition-all duration-300" />
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Col 3 — Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h5 className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase mb-6">SUPPORT</h5>
              <ul className="space-y-4">
                {["FAQ", "Privacy Policy", "Terms & Conditions", "Booking Guide"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="group inline-flex items-center space-x-2 text-white/55 hover:text-white text-sm font-medium transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-secondary transition-all duration-300" />
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Col 4 — Get In Touch */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h5 className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase mb-6">GET IN TOUCH</h5>
              <ul className="space-y-5">
                <li className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-white/50 text-sm leading-relaxed">No. 123, Beach Road,<br />Mirissa, Sri Lanka.</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <a href="tel:+94771234567" className="text-white/50 text-sm hover:text-white transition-colors">+94 77 123 4567</a>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <a href="mailto:hello@chamitours.com" className="text-white/50 text-sm hover:text-white transition-colors">hello@chamitours.com</a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left mb-8"
          />

          {/* ── Bottom bar ── */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-bold"
            >
              © 2026 ChamiTours. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-6"
            >
              {["Privacy", "Terms", "Cookies"].map((l) => (
                <Link key={l} href="#" className="text-white/20 hover:text-white/60 text-[10px] tracking-widest uppercase font-bold transition-colors">{l}</Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Glowing bottom accent ── */}
        <div className="h-[2px] bg-gradient-to-r from-primary via-secondary to-primary opacity-40" />
      </footer>
    </div>
  );
}
