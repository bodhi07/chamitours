"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, CheckCircle2, Star, Users, Shield, ChevronDown, ChevronUp, Calendar, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import BookingModal from "@/components/common/BookingModal";

const packages = [
    {
        id: "coastal",
        title: "Coastal Escape",
        subtitle: "Sun, Sea & Serenity",
        duration: "3 Days / 2 Nights",
        price: "$299",
        priceNote: "per person",
        badge: "Best Value",
        badgeColor: "bg-blue-500",
        img: "/images/destinations/mirissa-beach.png",
        rating: 4.8,
        reviews: 312,
        groupSize: "2–12 people",
        locations: ["Mirissa", "Hikkaduwa", "Galle Fort"],
        features: [
            "Private A/C vehicle throughout",
            "Accommodation (Boutique Beach Hotel)",
            "Daily breakfast & one dinner",
            "Whale-watching boat trip",
            "Galle Fort guided walk",
            "24/7 local guide support",
        ],
        itinerary: [
            { day: 1, title: "Arrival & Galle Fort", desc: "Airport pickup → Galle Dutch Fort walk → sunset at Jungle Beach" },
            { day: 2, title: "Whale Watching at Mirissa", desc: "Early morning whale-watching → beach day → seafood dinner" },
            { day: 3, title: "Hikkaduwa & Departure", desc: "Coral reef snorkeling → transfer to airport" },
        ],
        color: "from-blue-500 to-cyan-500",
        popular: false,
    },
    {
        id: "mountain",
        title: "Mountain Retreat",
        subtitle: "Tea, Mist & Adventure",
        duration: "4 Days / 3 Nights",
        price: "$399",
        priceNote: "per person",
        badge: "Most Popular",
        badgeColor: "bg-secondary",
        img: "/images/hero/sigiriya-fortress-hero.png",
        rating: 4.9,
        reviews: 428,
        groupSize: "2–10 people",
        locations: ["Kandy", "Nuwara Eliya", "Ella"],
        features: [
            "Private A/C vehicle throughout",
            "3-night boutique accommodation",
            "All breakfasts included",
            "Scenic train ride (Kandy–Ella)",
            "Tea estate & factory tour",
            "Little Adam's Peak trek",
            "Nine Arch Bridge visit",
        ],
        itinerary: [
            { day: 1, title: "Kandy — Cultural Capital", desc: "Temple of the Tooth Relic → Peradeniya Botanical Gardens → cultural dance show" },
            { day: 2, title: "Train Journey to Ella", desc: "World's most scenic train ride through tea country → arrive Ella → Nine Arch Bridge sunset" },
            { day: 3, title: "Ella Highlights", desc: "Little Adam's Peak trek → Ravana Falls → local cooking class" },
            { day: 4, title: "Nuwara Eliya & Return", desc: "Tea estate visit → tasting session → transfer to Colombo" },
        ],
        color: "from-emerald-500 to-teal-500",
        popular: true,
    },
    {
        id: "heritage",
        title: "Heritage Grand Tour",
        subtitle: "Ancient Kingdoms & Culture",
        duration: "5 Days / 4 Nights",
        price: "$499",
        priceNote: "per person",
        badge: "Cultural",
        badgeColor: "bg-amber-600",
        img: "/images/destinations/sigiriya-rock-fortress.png",
        rating: 4.9,
        reviews: 265,
        groupSize: "2–8 people",
        locations: ["Sigiriya", "Dambulla", "Anuradhapura", "Polonnaruwa"],
        features: [
            "Private A/C vehicle throughout",
            "4-night accommodation (Heritage Hotels)",
            "All breakfasts & 2 dinners",
            "Sigiriya Rock Fortress entry & guide",
            "Dambulla Cave Temple",
            "Ancient city bicycle tour",
            "Sunset jeep safari at Minneriya",
        ],
        itinerary: [
            { day: 1, title: "Dambulla Caves", desc: "World-famous cave temples with 150+ Buddha statues → check-in Cultural Triangle hotel" },
            { day: 2, title: "Sigiriya Rock Fortress", desc: "Full day at UNESCO Lion Rock Fortress → ancient frescoes → water gardens" },
            { day: 3, title: "Minneriya Elephant Safari", desc: "Jeep safari to see the great elephant gathering → over 300 elephants!" },
            { day: 4, title: "Anuradhapura Ancient City", desc: "Bicycle tour through 2,000-year-old ruins → sacred Bodhi Tree" },
            { day: 5, title: "Polonnaruwa & Return", desc: "Medieval capital ruins → transfer to Colombo / Negombo" },
        ],
        color: "from-amber-500 to-orange-500",
        popular: false,
    },
    {
        id: "explorer",
        title: "Island Explorer",
        subtitle: "Best of Sri Lanka",
        duration: "7 Days / 6 Nights",
        price: "$699",
        priceNote: "per person",
        badge: "Best Experience",
        badgeColor: "bg-violet-600",
        img: "/images/destinations/ella-nine-arch.png",
        rating: 5.0,
        reviews: 189,
        groupSize: "2–8 people",
        locations: ["Colombo", "Sigiriya", "Kandy", "Ella", "Mirissa", "Galle"],
        features: [
            "Private A/C vehicle throughout",
            "6-night premium accommodation",
            "All breakfasts & 3 dinners",
            "Scenic train Kandy to Ella",
            "Whale watching at Mirissa",
            "Sigiriya Rock entry & guide",
            "Galle Fort heritage walk",
            "Yala national park jeep safari",
            "24/7 dedicated guide",
        ],
        itinerary: [
            { day: 1, title: "Colombo & Arrival", desc: "Airport pickup → Colombo city highlights → onward to Sigiriya" },
            { day: 2, title: "Sigiriya & Dambulla", desc: "Morning Sigiriya climb → Dambulla cave temple → elephants at Minneriya" },
            { day: 3, title: "Kandy & Culture", desc: "Temple of Tooth → Botanical Gardens → cultural show" },
            { day: 4, title: "Scenic Train to Ella", desc: "World's most beautiful train ride → Ella Rock trek" },
            { day: 5, title: "Yala Safari & Coast", desc: "Early morning jeep safari → drive to Mirissa beach" },
            { day: 6, title: "Whale Watching & Galle", desc: "Whale watching cruise → Galle Dutch Fort → sunset" },
            { day: 7, title: "Departure Day", desc: "Final beach morning → airport transfer" },
        ],
        color: "from-violet-500 to-purple-600",
        popular: false,
    },
];

const faqs = [
    { q: "What is included in the tour price?", a: "All our packages include private A/C transport, accommodation, daily breakfast, a dedicated local guide, and all entrance fees listed in the itinerary." },
    { q: "How many people can join a tour?", a: "Our tours are designed for small groups (2–12 people) to ensure a personalized experience. We also offer fully private custom tours." },
    { q: "Can I customize the itinerary?", a: "Absolutely! Every package can be customized to your interests, budget, and travel dates. Contact us or use our booking form to discuss your requirements." },
    { q: "What is the cancellation policy?", a: "Free cancellation up to 14 days before departure. 50% refund for cancellations 7–14 days before. Full forfeit within 7 days." },
    { q: "Do you offer airport pickup?", a: "Yes! All packages include airport pickup from Colombo Bandaranaike International Airport (CMB) and airport drop-off at the end of the tour." },
];

export default function Packages() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [expandedPkg, setExpandedPkg] = useState<string | null>(null);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [selectedPkg, setSelectedPkg] = useState("");

    const openBooking = (title: string) => { setSelectedPkg(title); setBookingOpen(true); };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preSelectedPackage={selectedPkg} />

            {/* ── Hero ── */}
            <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
                <Image src="/images/hero/misty-highlands.png" alt="Sri Lanka Tea Country" fill priority className="object-cover scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16">
                    <Link href="/" className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors mb-6 group text-xs font-bold tracking-widest">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> <span>BACK</span>
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center space-x-2 mb-3">
                            <MapPin className="w-4 h-4 text-secondary" />
                            <span className="text-secondary text-[10px] font-black tracking-[0.3em] uppercase">Tour Packages</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4">Our Packages</h1>
                        <p className="text-white/60 max-w-xl">Carefully crafted itineraries for every type of traveller — from budget adventurers to luxury seekers.</p>
                    </motion.div>
                </div>
            </section>

            {/* ── Trust Bar ── */}
            <section className="bg-[var(--surface)] border-b border-[var(--border-color)] py-6">
                <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: Shield, label: "Safe & Secure Booking" },
                        { icon: Users, label: "Small Group Tours" },
                        { icon: Star, label: "5-Star Rated Guides" },
                        { icon: Calendar, label: "Flexible Dates" },
                    ].map(({ icon: Icon, label }, i) => (
                        <div key={i} className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-secondary" />
                            </div>
                            <span className="text-foreground/70 text-xs font-bold">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Package Cards ── */}
            <section className="py-20 container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-8">
                    {packages.map((pkg, idx) => (
                        <motion.article
                            key={pkg.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className={`bg-[var(--surface)] border-2 ${pkg.popular ? "border-secondary shadow-[0_0_0_4px_rgba(255,143,0,0.08)]" : "border-[var(--border-color)]"} rounded-[2rem] overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 flex flex-col`}
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-60 z-10`} />
                                <Image src={pkg.img} alt={pkg.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                                {pkg.popular && (
                                    <div className="absolute top-4 right-4 z-20 bg-secondary text-black text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                                        ✦ {pkg.badge}
                                    </div>
                                )}
                                {!pkg.popular && (
                                    <div className={`absolute top-4 right-4 z-20 ${pkg.badgeColor} text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg`}>
                                        {pkg.badge}
                                    </div>
                                )}

                                <div className="absolute bottom-4 left-5 z-20">
                                    <h2 className="text-2xl font-black text-white tracking-tight">{pkg.title}</h2>
                                    <p className="text-white/70 text-sm">{pkg.subtitle}</p>
                                </div>

                                <div className="absolute bottom-4 right-5 z-20 text-right">
                                    <div className="text-3xl font-black text-white">{pkg.price}</div>
                                    <div className="text-white/60 text-[10px] font-bold">{pkg.priceNote}</div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-7 flex flex-col flex-1">
                                {/* Meta */}
                                <div className="flex flex-wrap gap-3 mb-5">
                                    {[
                                        { icon: Clock, val: pkg.duration },
                                        { icon: Users, val: pkg.groupSize },
                                        { icon: Star, val: `${pkg.rating} (${pkg.reviews})` },
                                    ].map(({ icon: Icon, val }, i) => (
                                        <div key={i} className="flex items-center space-x-1.5 bg-background rounded-full px-3.5 py-1.5 border border-[var(--border-color)]">
                                            <Icon className="w-3.5 h-3.5 text-secondary" />
                                            <span className="text-foreground/60 text-[10px] font-bold">{val}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Locations */}
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {pkg.locations.map(loc => (
                                        <span key={loc} className="flex items-center space-x-1 bg-secondary/8 text-secondary border border-secondary/15 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full">
                                            <MapPin className="w-2.5 h-2.5" /> <span>{loc}</span>
                                        </span>
                                    ))}
                                </div>

                                {/* Features */}
                                <ul className="space-y-2 mb-5">
                                    {pkg.features.slice(0, 4).map(f => (
                                        <li key={f} className="flex items-start space-x-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-foreground/65 text-xs leading-snug">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Expandable Itinerary */}
                                <button
                                    onClick={() => setExpandedPkg(expandedPkg === pkg.id ? null : pkg.id)}
                                    className="flex items-center justify-between w-full text-left mb-4 py-3.5 px-4 rounded-xl bg-background border border-[var(--border-color)] hover:border-secondary/30 transition-colors group"
                                >
                                    <span className="text-[10px] font-black tracking-widest uppercase text-foreground/50 group-hover:text-foreground transition-colors">View Day-by-Day Itinerary</span>
                                    {expandedPkg === pkg.id ? <ChevronUp className="w-4 h-4 text-secondary" /> : <ChevronDown className="w-4 h-4 text-foreground/30" />}
                                </button>

                                {expandedPkg === pkg.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mb-5 space-y-3"
                                    >
                                        {pkg.itinerary.map((day) => (
                                            <div key={day.day} className="flex space-x-4">
                                                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary text-[10px] font-black">
                                                    {day.day}
                                                </div>
                                                <div>
                                                    <p className="text-foreground font-black text-sm leading-none">{day.title}</p>
                                                    <p className="text-foreground/50 text-xs mt-1 leading-snug">{day.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* CTA */}
                                <div className="flex space-x-3 mt-auto">
                                    <button
                                        onClick={() => openBooking(`${pkg.title} (${pkg.duration}) — ${pkg.price}`)}
                                        className={`flex-1 py-4 font-black text-[10px] tracking-widest uppercase rounded-full transition-all hover:scale-105 ${pkg.popular
                                            ? "bg-secondary text-black shadow-[0_4px_20px_rgba(255,143,0,0.35)]"
                                            : "bg-foreground text-background hover:bg-secondary hover:text-black"
                                            }`}
                                    >
                                        Book This Package
                                    </button>
                                    <Link
                                        href="/contact"
                                        className="flex items-center justify-center px-5 rounded-full border border-[var(--border-color)] text-foreground/50 hover:border-secondary/40 hover:text-secondary transition-colors text-xs font-bold"
                                    >
                                        Enquire
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 bg-[var(--surface)] border-t border-[var(--border-color)]">
                <div className="container mx-auto px-6 md:px-12 max-w-3xl">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                        <h2 className="text-4xl font-black tracking-tighter text-foreground mb-3">Frequently Asked Questions</h2>
                        <p className="text-foreground/45">Everything you need to know before booking.</p>
                    </motion.div>
                    <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.07 }}
                                className="bg-background border border-[var(--border-color)] rounded-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left group"
                                >
                                    <span className="font-black text-foreground text-sm pr-4">{faq.q}</span>
                                    {expandedFaq === idx
                                        ? <ChevronUp className="w-4 h-4 text-secondary flex-shrink-0" />
                                        : <ChevronDown className="w-4 h-4 text-foreground/30 flex-shrink-0" />
                                    }
                                </button>
                                {expandedFaq === idx && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="px-6 pb-6"
                                    >
                                        <p className="text-foreground/55 text-sm leading-relaxed">{faq.a}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
