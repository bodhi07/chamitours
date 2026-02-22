"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Camera, Compass, Clock, Star, Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/common/BookingModal";
import { useLanguage } from "@/components/common/LanguageProvider";

const destinations = [
    {
        id: "ella",
        title: "ELLA",
        region: "Hill Country",
        tagline: "Nine Arch Bridge & misty mountain views",
        description:
            "Ella is Sri Lanka's most charming hill town, surrounded by dramatic misty mountains, emerald tea fields, and lush jungle. Famous for the iconic Nine Arch Bridge train crossing, Little Adam's Peak sunrise hike, and spectacular Ravana Falls.",
        img: "https://images.unsplash.com/photo-1604182118621-6a84e6a0f8f6?q=80&w=900&auto=format",
        bestSeason: "Dec – Mar",
        rating: 4.9,
        reviews: 1240,
        activities: ["Hiking", "Tea Tasting", "Train Rides", "Rock Climbing"],
        highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Ravana Falls", "Ella Rock"],
        duration: "2–3 Days",
        tag: "Most Popular",
        tagColor: "bg-secondary text-black",
    },
    {
        id: "sigiriya",
        title: "SIGIRIYA",
        region: "Cultural Triangle",
        tagline: "Ancient rock fortress & UNESCO Heritage",
        description:
            "Rising 200m dramatically from the jungle plains, Sigiriya — the Lion Rock — is a 5th-century royal palace. A UNESCO World Heritage Site with ancient frescoes, mirror wall, royal water gardens, and panoramic views over the jungle that stretch for miles.",
        img: "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=900&auto=format",
        bestSeason: "Mar – Sep",
        rating: 4.9,
        reviews: 2100,
        activities: ["Rock Climbing", "Archaeology", "Bird Watching", "Photography"],
        highlights: ["Lion Rock Fortress", "Frescoes Gallery", "Mirror Wall", "Water Gardens"],
        duration: "1–2 Days",
        tag: "UNESCO Site",
        tagColor: "bg-amber-600 text-white",
    },
    {
        id: "mirissa",
        title: "MIRISSA",
        region: "Southern Coast",
        tagline: "Turquoise waters & whale watching capital",
        description:
            "Mirissa's crescent beach and sapphire waters are world-famous for blue whale watching — one of Earth's greatest wildlife spectacles. The beach itself is a paradise of swaying palms, fresh seafood, and mesmerising sunsets.",
        img: "https://images.unsplash.com/photo-1588665575322-d9527ec3c491?q=80&w=900&auto=format",
        bestSeason: "Nov – Apr",
        rating: 4.8,
        reviews: 980,
        activities: ["Whale Watching", "Surfing", "Snorkeling", "Sunset Cruises"],
        highlights: ["Blue Whale Watching", "Parrot Rock", "Secret Beach", "Coconut Tree Hill"],
        duration: "2–3 Days",
        tag: "Whale Watching",
        tagColor: "bg-blue-500 text-white",
    },
    {
        id: "kandy",
        title: "KANDY",
        region: "Hill Country",
        tagline: "Cultural capital & Temple of the Sacred Tooth",
        description:
            "Kandy is Sri Lanka's cultural soul — home to the Temple of the Sacred Tooth Relic, the most revered Buddhist shrine on the island. Set around a serene lake backed by forest-covered hills, it blends spirituality, botanic beauty, and highland culture.",
        img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=900&auto=format",
        bestSeason: "Year-round",
        rating: 4.8,
        reviews: 1850,
        activities: ["Temple Visits", "Cultural Shows", "Botanical Gardens", "Lake Walks"],
        highlights: ["Temple of Tooth (UNESCO)", "Peradeniya Gardens", "Esala Perahera", "Kandy Lake"],
        duration: "1–2 Days",
        tag: "Cultural",
        tagColor: "bg-violet-600 text-white",
    },
    {
        id: "yala",
        title: "YALA",
        region: "Wildlife",
        tagline: "World's highest density of leopards",
        description:
            "Yala National Park holds the world's highest leopard density and is Sri Lanka's most celebrated wildlife reserve. Open jeep safaris reveal leopards, wild elephants, crocodiles, sloth bears, peacocks, and over 500 bird species.",
        img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=900&auto=format",
        bestSeason: "Feb – Jul",
        rating: 4.7,
        reviews: 1340,
        activities: ["Safari Jeep Tours", "Bird Watching", "Photography", "Camping"],
        highlights: ["Leopard Sightings", "Elephant Herds", "Crocodile Lake", "Sloth Bears"],
        duration: "1–2 Days",
        tag: "Wildlife",
        tagColor: "bg-emerald-600 text-white",
    },
    {
        id: "galle",
        title: "GALLE",
        region: "Southern Coast",
        tagline: "17th-century Dutch fort & ocean views",
        description:
            "Galle's UNESCO Dutch Fort is Sri Lanka's finest colonial monument — a living city within 3km of ancient rampart walls, cobblestone lanes, boutique shops, a lighthouse, and sweeping Indian Ocean views baked in 350 years of history.",
        img: "https://images.unsplash.com/photo-1625396605063-27b85e1e8b58?q=80&w=900&auto=format",
        bestSeason: "Nov – Apr",
        rating: 4.6,
        reviews: 890,
        activities: ["Fort Walks", "Diving", "Shopping", "Lighthouse Views"],
        highlights: ["Dutch Fort (UNESCO)", "Galle Lighthouse", "Old Town Streets", "Jungle Beach"],
        duration: "1–2 Days",
        tag: "Heritage",
        tagColor: "bg-rose-600 text-white",
    },
    {
        id: "dambulla",
        title: "DAMBULLA",
        region: "Cultural Triangle",
        tagline: "150+ Buddha statues in cave temples",
        description:
            "The Dambulla Cave Temple is Sri Lanka's largest and best-preserved cave temple complex — a UNESCO World Heritage Site with 5 caves enshrining 150+ gilded Buddhas and 2,100 sq.m of ancient murals dating to the 1st century BC.",
        img: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=900&auto=format",
        bestSeason: "Year-round",
        rating: 4.8,
        reviews: 1560,
        activities: ["Cave Temple Visit", "Meditation", "Art & History", "Photography"],
        highlights: ["5 Ancient Caves", "150+ Buddhas", "Ceiling Murals", "Golden Temple"],
        duration: "Half Day",
        tag: "UNESCO Site",
        tagColor: "bg-amber-600 text-white",
    },
    {
        id: "nuwara-eliya",
        title: "NUWARA ELIYA",
        region: "Hill Country",
        tagline: "Sri Lanka's tea capital at 1,868m altitude",
        description:
            "\"Little England\" — the cool highland city of Nuwara Eliya sits at 1,868m surrounded by the world's finest tea estates. Tour working tea factories, taste single-estate teas, and see the 870m cliff drop at World's End in Horton Plains.",
        img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=900&auto=format",
        bestSeason: "Jan – Apr",
        rating: 4.7,
        reviews: 780,
        activities: ["Tea Factory Tours", "Hiking", "Tea Tasting", "Colonial Architecture"],
        highlights: ["Tea Estate Tour", "World's End Cliff", "Gregory Lake", "Victoria Park"],
        duration: "1–2 Days",
        tag: "Tea Country",
        tagColor: "bg-teal-600 text-white",
    },
    {
        id: "trincomalee",
        title: "TRINCOMALEE",
        region: "East Coast",
        tagline: "Pristine beaches & coral reef snorkeling",
        description:
            "Trincomalee on the northeast coast has one of the world's finest natural harbours and some of Sri Lanka's most stunning, uncrowded beaches. Snorkel the live coral at Pigeon Island, visit the cliff-top Koneswaram Temple, and swim in blissfully warm turquoise water.",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=900&auto=format",
        bestSeason: "May – Sep",
        rating: 4.7,
        reviews: 560,
        activities: ["Snorkeling", "Beach", "Temple Visits", "Scuba Diving"],
        highlights: ["Pigeon Island Reef", "Nilaveli Beach", "Koneswaram Temple", "Hot Springs"],
        duration: "2–3 Days",
        tag: "Beach",
        tagColor: "bg-cyan-600 text-white",
    },
];

const regions = ["All", "Hill Country", "Southern Coast", "Cultural Triangle", "Wildlife", "East Coast"];

const fadeUp: Variants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

export default function Destinations() {
    const { t } = useLanguage();
    const [filter, setFilter] = useState("All");
    const [bookingOpen, setBookingOpen] = useState(false);

    const filtered = filter === "All" ? destinations : destinations.filter(d => d.region === filter);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

            {/* ── Hero Banner ── */}
            <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1625396605063-27b85e1e8b58?q=80&w=1600&auto=format"
                    alt="Sri Lanka destinations"
                    fill
                    priority
                    className="object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16">
                    <Link href="/" className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors mb-6 group text-xs font-bold tracking-widest">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>{t("common.back")}</span>
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="flex items-center space-x-2 mb-3">
                            <MapPin className="w-4 h-4 text-secondary" />
                            <span className="text-secondary text-[10px] font-black tracking-[0.3em] uppercase">Explore Sri Lanka</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none mb-4">
                            Top Destinations
                        </h1>
                        <p className="text-white/60 text-base max-w-xl leading-relaxed">
                            From ancient rock fortresses to pristine beaches — 9 of the most breathtaking places in Sri Lanka with real photos and expert local guidance.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Filter Bar ── */}
            <section className="sticky top-20 z-30 bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--border-color)] py-4">
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center space-x-2 flex-wrap gap-2">
                        {regions.map(r => (
                            <button
                                key={r}
                                onClick={() => setFilter(r)}
                                className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${filter === r
                                    ? "bg-secondary text-black shadow-[0_4px_16px_rgba(255,143,0,0.35)]"
                                    : "bg-background border border-[var(--border-color)] text-foreground/50 hover:border-secondary/40 hover:text-secondary"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    <span className="text-foreground/35 text-xs font-bold tracking-widest">{filtered.length} destinations</span>
                </div>
            </section>

            {/* ── Destination Cards ── */}
            <section className="py-20 container mx-auto px-6 md:px-12">
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filtered.map((dest, idx) => (
                        <motion.article
                            key={dest.id}
                            layout
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="group bg-[var(--surface)] border border-[var(--border-color)] rounded-[2rem] overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-60 overflow-hidden">
                                <Image
                                    src={dest.img}
                                    alt={dest.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                {/* Tag */}
                                <div className="absolute top-4 left-4">
                                    <span className={`${dest.tagColor} text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg`}>
                                        {dest.tag}
                                    </span>
                                </div>

                                {/* Rating */}
                                <div className="absolute top-4 right-4 flex items-center space-x-1.5 bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                                    <Star className="w-3 h-3 fill-secondary text-secondary" />
                                    <span className="text-white text-[10px] font-black">{dest.rating}</span>
                                </div>

                                {/* Region */}
                                <div className="absolute bottom-4 left-4 flex items-center space-x-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-white/70" />
                                    <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">{dest.region}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-7 flex flex-col flex-1">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tighter text-foreground leading-none">{dest.title}</h2>
                                        <p className="text-secondary text-sm font-bold mt-1">{dest.tagline}</p>
                                    </div>
                                </div>

                                <p className="text-foreground/55 text-sm leading-relaxed mb-5 line-clamp-3">{dest.description}</p>

                                {/* Meta row */}
                                <div className="grid grid-cols-3 gap-2 mb-5">
                                    {[
                                        { icon: Clock, label: dest.duration },
                                        { icon: Calendar, label: dest.bestSeason },
                                        { icon: Star, label: `${dest.reviews} reviews` },
                                    ].map(({ icon: Icon, label }, i) => (
                                        <div key={i} className="flex flex-col items-center bg-background rounded-xl p-2.5 border border-[var(--border-color)]">
                                            <Icon className="w-3.5 h-3.5 text-secondary mb-1" />
                                            <span className="text-[9px] text-foreground/50 font-bold text-center leading-tight">{label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Activities */}
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {dest.activities.map(act => (
                                        <span key={act} className="bg-secondary/10 text-secondary border border-secondary/20 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full">
                                            {act}
                                        </span>
                                    ))}
                                </div>

                                {/* Highlights */}
                                <div className="mb-6">
                                    <p className="text-[9px] font-black tracking-widest uppercase text-foreground/30 mb-2">Highlights</p>
                                    <ul className="space-y-1.5">
                                        {dest.highlights.map(h => (
                                            <li key={h} className="flex items-center space-x-2">
                                                <Compass className="w-3 h-3 text-secondary flex-shrink-0" />
                                                <span className="text-foreground/65 text-xs font-medium">{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-3 mt-auto">
                                    <button
                                        onClick={() => setBookingOpen(true)}
                                        className="flex-1 py-3 bg-secondary text-black font-black text-[10px] tracking-widest uppercase rounded-full shadow-[0_4px_16px_rgba(255,143,0,0.25)] hover:scale-105 transition-all"
                                    >
                                        Book Now
                                    </button>
                                    <button className="group/btn flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border-color)] hover:border-secondary/40 transition-colors">
                                        <ChevronRight className="w-4 h-4 text-foreground/40 group-hover/btn:text-secondary group-hover/btn:translate-x-0.5 transition-all" />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="py-20 bg-[var(--surface)] border-t border-[var(--border-color)]">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Camera className="w-10 h-10 text-secondary mx-auto mb-5" />
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                            Can't Decide? Let Us Plan For You.
                        </h2>
                        <p className="text-foreground/50 max-w-xl mx-auto mb-8 leading-relaxed">
                            Our expert local guides will craft the perfect itinerary based on your interests, budget, and travel dates.
                        </p>
                        <button
                            onClick={() => setBookingOpen(true)}
                            className="inline-flex items-center space-x-3 bg-secondary text-black font-black text-xs tracking-[0.2em] uppercase px-10 py-5 rounded-full shadow-[0_8px_32px_rgba(255,143,0,0.4)] hover:scale-105 transition-all"
                        >
                            <span>Get a Custom Itinerary</span>
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
