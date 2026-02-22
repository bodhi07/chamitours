"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, Grid, Rows } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Beaches", "Hill Country", "Wildlife", "Culture & Heritage", "Adventure & Nature"];

const photos = [
    /* ──── Beaches ──── */
    { src: "https://images.unsplash.com/photo-1588665575322-d9527ec3c491?q=80&w=900&auto=format", cat: "Beaches", title: "Mirissa Beach", loc: "Southern Coast", size: "wide" },
    { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=900&auto=format", cat: "Beaches", title: "Nilaveli Beach", loc: "Trincomalee", size: "normal" },
    { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=900&auto=format", cat: "Beaches", title: "Unawatuna Beach", loc: "Galle", size: "tall" },
    { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=900&auto=format", cat: "Beaches", title: "Arugam Bay Surf", loc: "Eastern Province", size: "wide" },
    /* ──── Hill Country ──── */
    { src: "https://images.unsplash.com/photo-1604182118621-6a84e6a0f8f6?q=80&w=900&auto=format", cat: "Hill Country", title: "Nine Arch Bridge", loc: "Ella", size: "wide" },
    { src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=900&auto=format", cat: "Hill Country", title: "Tea Plantation Vista", loc: "Nuwara Eliya", size: "tall" },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=900&auto=format", cat: "Hill Country", title: "Misty Highlands", loc: "Horton Plains", size: "normal" },
    { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=900&auto=format", cat: "Hill Country", title: "Kandy Lake View", loc: "Kandy", size: "normal" },
    /* ──── Wildlife ──── */
    { src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=900&auto=format", cat: "Wildlife", title: "Yala Leopard Safari", loc: "Yala National Park", size: "wide" },
    { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format", cat: "Wildlife", title: "Wild Elephant Herd", loc: "Udawalawe", size: "normal" },
    { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=900&auto=format", cat: "Wildlife", title: "Blue Whale — Indian Ocean", loc: "Mirissa", size: "tall" },
    { src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=900&auto=format", cat: "Wildlife", title: "Bundala Flamingos", loc: "Bundala", size: "normal" },
    /* ──── Culture & Heritage ──── */
    { src: "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=900&auto=format", cat: "Culture & Heritage", title: "Sigiriya Rock Fortress", loc: "Cultural Triangle", size: "tall" },
    { src: "https://images.unsplash.com/photo-1625396605063-27b85e1e8b58?q=80&w=900&auto=format", cat: "Culture & Heritage", title: "Galle Dutch Fort", loc: "Galle", size: "wide" },
    { src: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=900&auto=format", cat: "Culture & Heritage", title: "Dambulla Cave Temple", loc: "Cultural Triangle", size: "normal" },
    { src: "https://images.unsplash.com/photo-1586613835341-6f5cf4056c52?q=80&w=900&auto=format", cat: "Culture & Heritage", title: "Temple of Tooth Relic", loc: "Kandy", size: "normal" },
    /* ──── Adventure & Nature ──── */
    { src: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?q=80&w=900&auto=format", cat: "Adventure & Nature", title: "Surfing at Arugam Bay", loc: "East Coast", size: "normal" },
    { src: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?q=80&w=900&auto=format", cat: "Adventure & Nature", title: "Hambantota Port at Dawn", loc: "Hambantota", size: "wide" },
    { src: "https://images.unsplash.com/photo-1438012515651-0994da9c24dc?q=80&w=900&auto=format", cat: "Adventure & Nature", title: "Stilt Fishermen", loc: "Weligama", size: "tall" },
    { src: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=900&auto=format", cat: "Adventure & Nature", title: "Rainforest Waterfall", loc: "Sinharaja", size: "normal" },
];

export default function Gallery() {
    const [category, setCategory] = useState("All");
    const [lightbox, setLightbox] = useState<number | null>(null);
    const [layout, setLayout] = useState<"masonry" | "grid">("masonry");

    const filtered = category === "All" ? photos : photos.filter(p => p.cat === category);

    const prev = () => setLightbox(prev => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null);
    const next = () => setLightbox(prev => prev !== null ? (prev + 1) % filtered.length : null);

    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/97 backdrop-blur-xl flex items-center justify-center"
                        onClick={() => setLightbox(null)}
                    >
                        <button onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center">
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button onClick={e => { e.stopPropagation(); next(); }} className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center">
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                        <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center">
                            <X className="w-5 h-5 text-white" />
                        </button>
                        <motion.div
                            key={lightbox}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            className="relative max-w-5xl max-h-[80vh] w-full mx-16 rounded-2xl overflow-hidden shadow-2xl"
                            style={{ aspectRatio: "16/10" }}
                        >
                            <Image src={filtered[lightbox].src} alt={filtered[lightbox].title} fill className="object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-white font-black text-xl">{filtered[lightbox].title}</h3>
                                <p className="text-white/55 text-sm">{filtered[lightbox].loc}</p>
                            </div>
                        </motion.div>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 border border-white/10">
                            <span className="text-white/70 text-xs font-bold">{lightbox + 1} / {filtered.length}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Hero ── */}
            <section className="relative h-[48vh] min-h-[360px] flex items-end overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=1600&auto=format" alt="Sri Lanka Gallery" fill priority className="object-cover scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16">
                    <Link href="/" className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors mb-6 group text-xs font-bold tracking-widest">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> <span>BACK</span>
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-3">Sri Lanka Photo Gallery</h1>
                        <p className="text-white/55 max-w-xl">Real photos from Sri Lanka's most iconic destinations — beaches, temples, wildlife, and beyond.</p>
                    </motion.div>
                </div>
            </section>

            {/* ── Controls ── */}
            <section className="sticky top-20 z-30 bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--border-color)] py-4">
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center space-x-2 flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${category === cat
                                        ? "bg-secondary text-black shadow-[0_4px_12px_rgba(255,143,0,0.3)]"
                                        : "bg-background border border-[var(--border-color)] text-foreground/50 hover:border-secondary/40"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-foreground/35 text-xs font-bold mr-3">{filtered.length} photos</span>
                        <button onClick={() => setLayout("masonry")} className={`p-2 rounded-lg transition-colors ${layout === "masonry" ? "bg-secondary/15 text-secondary" : "text-foreground/30 hover:text-foreground"}`}>
                            <Rows className="w-4 h-4" />
                        </button>
                        <button onClick={() => setLayout("grid")} className={`p-2 rounded-lg transition-colors ${layout === "grid" ? "bg-secondary/15 text-secondary" : "text-foreground/30 hover:text-foreground"}`}>
                            <Grid className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Gallery Grid ── */}
            <section className="py-12 container mx-auto px-6 md:px-12">
                <div className={layout === "masonry" ? "columns-2 md:columns-3 lg:columns-4 gap-4" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
                    {filtered.map((photo, idx) => (
                        <motion.div
                            key={`${category}-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04 }}
                            onClick={() => setLightbox(idx)}
                            className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 ${layout === "masonry" ? "break-inside-avoid mb-4" : ""}`}
                        >
                            <div className={layout === "masonry"
                                ? (photo.size === "tall" ? "aspect-[2/3]" : photo.size === "wide" ? "aspect-[4/3]" : "aspect-square")
                                : "aspect-[4/3]"
                            }>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={photo.src}
                                        alt={photo.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                            <ZoomIn className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                        <p className="text-white font-black text-sm leading-tight">{photo.title}</p>
                                        <p className="text-white/60 text-[10px] font-bold">{photo.loc}</p>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-black/50 backdrop-blur-sm text-white text-[8px] font-black tracking-widest uppercase px-2 py-1 rounded-full border border-white/10">
                                            {photo.cat}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 bg-[var(--surface)] border-t border-[var(--border-color)]">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl font-black text-foreground tracking-tight mb-3">Ready to See This in Person?</h2>
                    <p className="text-foreground/45 mb-7">Book a tour and experience Sri Lanka's beauty firsthand.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/tours" className="inline-flex items-center space-x-2 bg-secondary text-black font-black text-xs tracking-widest uppercase px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(255,143,0,0.3)] hover:scale-105 transition-all">
                            <span>Explore Our Tours</span>
                        </Link>
                        <Link href="/contact" className="inline-flex items-center space-x-2 bg-foreground text-background font-black text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:scale-105 transition-all">
                            <span>Contact Us</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
