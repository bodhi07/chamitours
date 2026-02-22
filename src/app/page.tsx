"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ArrowRight, Instagram, Twitter, Facebook } from "lucide-react";

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
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000"
            alt="Sri Lanka Landscape"
            fill
            className="object-cover opacity-50 grayscale-[20%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 z-10 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 pt-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-[1px] bg-secondary" />
                <span className="text-secondary font-bold tracking-[0.3em] text-[10px] uppercase">Suresh Tours Presents</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
                Start Your <br />
                <span className="text-white/20" style={{ WebkitTextStroke: "1px white" }}>Dream</span> Journey
              </h1>
              <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl leading-relaxed">
                Discover the unseen beauty of Sri Lanka with our premium guided tours. Tailored experiences just for you.
              </p>

              <div className="flex flex-wrap gap-6 items-center">
                <button className="orange-gradient text-white px-10 py-5 rounded-full font-black text-xs tracking-[0.2em] flex items-center space-x-3 shadow-[0_10px_30px_rgba(255,143,0,0.3)] transition-all transform hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,143,0,0.4)]">
                  <span>EXPLORE NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Play className="w-5 h-5 fill-current ml-1" />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.3em]">WATCH VIDEO</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="lg:col-span-5 relative h-[500px] hidden md:block">
            <div className="flex space-x-4 items-center h-full">
              {heroCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.delay, duration: 0.8 }}
                  className={`relative w-28 h-[350px] rounded-2xl overflow-hidden border-2 transition-all duration-500 hover:w-64 hover:h-[400px] cursor-pointer group ${card.border || "border-white/10"}`}
                >
                  <Image
                    src={card.url}
                    alt={card.alt}
                    fill
                    className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">{card.alt}</p>
                    <p className="text-sm font-bold truncate">Explore the hidden beauty</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Slider Navigation Controls (Visual only) */}
            <div className="absolute -bottom-10 right-0 flex items-center space-x-4">
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-30">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5">
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="ml-8 text-4xl font-black text-white/10 tracking-tighter">01</div>
            </div>
          </div>
        </div>

        {/* Social Vertical Bar */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-8 z-20">
          {socialLinks.map((social, idx) => (
            <Link key={idx} href={social.href} className="text-white/30 hover:text-primary transition-colors">
              <social.icon className="w-5 h-5" />
            </Link>
          ))}
          <div className="w-[1px] h-20 bg-white/10 mx-auto mt-4" />
        </div>
      </section>

      {/* Trending Tours Section */}
      <section className="py-24 bg-black relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-secondary font-bold tracking-[0.4em] text-[10px] uppercase mb-4">Best of 2026</h3>
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">TRENDING TOURS</h2>

              {/* Filter Tabs */}
              <div className="flex justify-center mb-12">
                <div className="bg-white/5 p-1.5 rounded-full flex border border-white/10">
                  <button className="orange-gradient text-white px-8 py-3 rounded-full font-bold text-[10px] tracking-widest shadow-lg">
                    INDIVIDUAL / COUPLE
                  </button>
                  <button className="text-white/40 px-8 py-3 rounded-full font-bold text-[10px] tracking-widest hover:text-white transition-colors">
                    FAMILY / GROUP
                  </button>
                </div>
              </div>

              <p className="text-white/40 max-w-2xl mx-auto text-sm leading-relaxed">
                Discover our most sought-after travel experiences, handpicked for 2026. Whether you are looking for a romantic private getaway or a fun-filled group adventure, these packages offer the perfect blend of luxury, culture, and excitement.
              </p>
            </motion.div>
          </div>

          {/* Tour Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Yala & Ella Adventure", type: "WILDLIFE", duration: "1 DAY TOUR", img: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800", location: "Yala National Park • Ella Rock" },
              { title: "Ella & Udawalawe", type: "NATURE", duration: "1 DAY TOUR", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800", location: "Udawalawe • Ravana Falls" },
              { title: "Southern Magic", type: "BEACH", duration: "2 DAYS TOUR", img: "https://images.unsplash.com/photo-1588665575322-d9527ec3c491?q=80&w=800", location: "Galle • Mirissa • Hikaduwa" },
              { title: "Sigiriya & Dambulla", type: "HISTORY", duration: "1 DAY TOUR", img: "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=800", location: "Sigiriya Rock • Cave Temple" },
            ].map((tour, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500"
              >
                <Image src={tour.img} alt={tour.title} fill className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className="bg-white/10 backdrop-blur-md border border-white/20 text-[8px] font-black tracking-widest text-white px-3 py-1.5 rounded-full uppercase">
                    {tour.duration}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 rounded-full orange-gradient flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <p className="text-secondary font-bold tracking-widest text-[8px] uppercase mb-1">{tour.type}</p>
                  <h4 className="text-2xl font-black mb-2 leading-tight">{tour.title}</h4>
                  <div className="flex items-center space-x-2 text-white/40 mb-6">
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-3 h-3 text-primary">
                      <svg fill="currentColor" viewBox="0 0 256 256"><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,196.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.25,144.53,209,128,222Z"></path></svg>
                    </motion.div>
                    <span className="text-[10px] tracking-widest truncate">{tour.location}</span>
                  </div>
                  <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black tracking-[0.3em] group-hover:bg-primary group-hover:text-black transition-all flex items-center justify-center space-x-3">
                    <span>DETAILS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Big Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 opacity-[0.03] select-none pointer-events-none">
          <h2 className="text-[25vw] font-black tracking-tighter leading-none">SERVICES</h2>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: "EXPERT GUIDES", desc: "Friendly local guides", img: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=400" },
              { title: "HOTEL BOOKING", desc: "Best resorts & stays", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=400", active: true },
              { title: "24/7 SUPPORT", desc: "Anytime assistance", img: "https://images.unsplash.com/photo-1588665575322-d9527ec3c491?q=80&w=400" },
              { title: "SAFARI TOURS", desc: "Wildlife adventures", img: "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=400" },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative h-[500px] rounded-[2rem] overflow-hidden group cursor-pointer ${service.active ? 'md:translate-y-[-20px]' : ''}`}
              >
                <Image src={service.img} alt={service.title} fill className="object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-10 left-8 right-8">
                  <h4 className="text-2xl font-black mb-2 tracking-tighter leading-none text-white">{service.title}</h4>
                  <p className="text-white/40 text-xs font-bold tracking-widest">{service.desc}</p>

                  {/* Progress Line */}
                  <div className="w-12 h-[2px] bg-white/10 mt-6 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`absolute top-0 left-0 h-full ${service.active ? 'bg-primary' : 'bg-white/40'}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="inline-flex items-center space-x-4 group">
              <span className="text-[10px] font-black tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">VIEW ALL SERVICES</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer / Final Spacing */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-white/20 text-[10px] tracking-[0.5em] uppercase font-bold">© 2026 Suresh Tours. All rights reserved.</p>
      </footer>
    </div>
  );
}
