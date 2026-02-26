"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, Users, Heart, Globe, Star, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/common/BookingModal";
import { useLanguage } from "@/components/common/LanguageProvider";

const stats = [
    { value: "2,800+", label: "Happy Travelers" },
    { value: "12+", label: "Years of Experience" },
    { value: "50+", label: "Expert Local Guides" },
    { value: "4.9★", label: "Average Rating" },
];

const values = [
    { icon: Heart, title: "Passion for Sri Lanka", desc: "Born and raised here, we genuinely love sharing our island's hidden beauty with the world." },
    { icon: Globe, title: "Sustainable Tourism", desc: "We work with local communities, eco-friendly hotels, and conservation efforts to protect Sri Lanka." },
    { icon: Users, title: "Small Groups Only", desc: "Max 12 guests per tour — so you get personal attention, not a crowded bus experience." },
    { icon: Award, title: "Award-Winning Service", desc: "Recognized by TripAdvisor as a 'Travellers' Choice' operator for 5 consecutive years." },
];

const team = [
    { name: "Chami Perera", role: "Founder & Head Guide", img: "/images/team/team-real-3.jpg", exp: "15 yrs" },
    { name: "Dilshan Fernando", role: "Wildlife Specialist", img: "/images/team/team-real-4.jpg", exp: "10 yrs" },
    { name: "Nadeeka Silva", role: "Cultural Heritage Guide", img: "/images/team/team-real-1.jpg", exp: "8 yrs" },
    { name: "Ruwan Jayawardena", role: "Adventure Guide", img: "/images/team/team-real-2.jpg", exp: "12 yrs" },
];

export default function About() {
    const { t } = useLanguage();
    const [bookingOpen, setBookingOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

            {/* ── Hero ── */}
            <section className="relative h-[60vh] min-h-[460px] flex items-end overflow-hidden">
                <Image src="/images/hero/sigiriya-fortress-hero.png" alt="Nine Arch Bridge Ella" fill priority className="object-cover scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                <div className="relative z-10 container mx-auto px-6 md:px-12 pb-20">
                    <Link href="/" className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors mb-6 group text-xs font-bold tracking-widest">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> <span>{t("common.back")}</span>
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="text-secondary text-[10px] font-black tracking-[0.3em] uppercase block mb-3">{t("about.story")}</span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none mb-5">
                            {t("about.title").split(" ")[0]}<br />{t("about.title").split(" ").slice(1).join(" ")}
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                            {t("about.desc")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="bg-[var(--surface)] border-b border-[var(--border-color)] py-8">
                <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-secondary mb-1">{s.value}</div>
                            <div className="text-foreground/45 text-xs font-bold tracking-widest uppercase">{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Story ── */}
            <section className="py-24 container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <span className="text-secondary text-[10px] font-black tracking-[0.3em] uppercase block mb-4">Who We Are</span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6 leading-tight">
                            More Than a<br />Tour Operator
                        </h2>
                        <div className="space-y-5 text-foreground/60 leading-relaxed">
                            <p>ChamiTours was founded in 2012 by Chami Perera, a passionate local guide who wanted to share the real Sri Lanka — not just the tourist hotspots, but the hidden waterfalls, the family-run tea estates, the village cooking, and the genuine warmth of the island's people.</p>
                            <p>What started as a one-person operation has grown into a team of 50+ specialist guides, vehicle drivers, and travel coordinators — all born and raised in Sri Lanka, all deeply committed to showing you the best of what the island has to offer.</p>
                            <p>We keep our group sizes small (maximum 12 guests) because we believe travel should be personal. Your guide should know your name, understand your interests, and be able to change the plan on the fly to show you something extraordinary.</p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {["TripAdvisor Choice 2024", "SLTDA Licensed", "Eco-Friendly Certified"].map(badge => (
                                <div key={badge} className="flex items-center space-x-2 bg-[var(--surface)] border border-[var(--border-color)] rounded-full px-4 py-2">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-foreground/70 text-xs font-bold">{badge}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[var(--shadow-xl)]">
                            <Image src="/images/tours/stilt-fishermen.png" alt="Stilt Fishermen Sri Lanka" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                        {/* Floating review card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-6 -left-6 bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-5 shadow-[var(--shadow-xl)] max-w-[200px]"
                        >
                            <div className="flex space-x-1 mb-2">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />)}
                            </div>
                            <p className="text-foreground/60 text-xs leading-relaxed italic">"The best travel experience of my life. Absolutely magical."</p>
                            <p className="text-foreground font-black text-xs mt-2">— Sarah M., USA</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── Values ── */}
            <section className="py-20 bg-[var(--surface)] border-t border-[var(--border-color)]">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                        <h2 className="text-4xl font-black tracking-tighter text-foreground mb-3">Our Core Values</h2>
                        <p className="text-foreground/45 max-w-xl mx-auto">Everything we do is guided by these principles.</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="bg-background border border-[var(--border-color)] rounded-2xl p-7 hover:shadow-[var(--shadow-lg)] transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                                    <v.icon className="w-5 h-5 text-secondary" />
                                </div>
                                <h3 className="font-black text-foreground mb-2">{v.title}</h3>
                                <p className="text-foreground/50 text-sm leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <section className="py-20 container mx-auto px-6 md:px-12">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                    <h2 className="text-4xl font-black tracking-tighter text-foreground mb-3">Meet Your Guides</h2>
                    <p className="text-foreground/45 max-w-xl mx-auto">Our team of passionate, experienced local guides are the heart of ChamiTours.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="group bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:shadow-[var(--shadow-lg)] transition-all">
                            <div className="relative h-64 overflow-hidden">
                                <Image src={member.img} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-3 right-3 bg-secondary text-black text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full">
                                    {member.exp} exp.
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-black text-foreground">{member.name}</h3>
                                <p className="text-secondary text-xs font-bold mt-1">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 bg-secondary">
                <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-4xl font-black text-black tracking-tighter mb-2">Ready to Explore Sri Lanka?</h2>
                        <p className="text-black/60 text-lg">Join 2,800+ happy travelers. Book your dream tour today.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => setBookingOpen(true)}
                            className="inline-flex items-center space-x-3 bg-black text-white font-black text-xs tracking-[0.2em] uppercase px-10 py-5 rounded-full hover:scale-105 transition-all shadow-xl">
                            <span>Book Now</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <Link href="/contact"
                            className="inline-flex items-center space-x-3 bg-white/20 text-black font-black text-xs tracking-[0.2em] uppercase px-8 py-5 rounded-full hover:bg-white/30 transition-all">
                            <span>Contact Us</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
