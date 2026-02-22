"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Send, Clock, MessageCircle, CheckCircle, Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/common/LanguageProvider";

const contactInfo = [
    {
        icon: MapPin,
        title: "Visit Us",
        lines: ["No. 123, Beach Road,", "Mirissa, Sri Lanka 81550"],
        color: "bg-primary/10 text-primary border-primary/20",
    },
    {
        icon: Phone,
        title: "Call / WhatsApp",
        lines: ["+94 77 123 4567", "+94 77 765 4321"],
        color: "bg-secondary/10 text-secondary border-secondary/20",
        href: "https://wa.me/94771234567",
    },
    {
        icon: Mail,
        title: "Email Us",
        lines: ["hello@chamitours.com", "bookings@chamitours.com"],
        color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        href: "mailto:hello@chamitours.com",
    },
    {
        icon: Clock,
        title: "Office Hours",
        lines: ["Mon–Sat: 8:00am – 7:00pm", "Sun: 9:00am – 5:00pm"],
        color: "bg-violet-500/10 text-violet-600 border-violet-500/20",
    },
];

const socials = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
    {
        icon: () => (
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        href: "https://wa.me/94771234567",
        label: "WhatsApp",
        color: "hover:bg-[#25D366]",
    },
];

export default function Contact() {
    const { t } = useLanguage();
    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        setSent(true);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* ── Hero ── */}
            <section className="relative pt-36 pb-20 bg-[var(--surface)] overflow-hidden border-b border-[var(--border-color)]">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <Link href="/" className="inline-flex items-center space-x-2 text-foreground/40 hover:text-foreground transition-colors mb-8 group text-xs font-bold tracking-widest">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> <span>{t("common.back")}</span>
                    </Link>
                    <div className="max-w-3xl">
                        <div className="flex items-center space-x-2 mb-4">
                            <MessageCircle className="w-4 h-4 text-secondary" />
                            <span className="text-secondary text-[10px] font-black tracking-[0.3em] uppercase">{t("nav.contact")}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none mb-5">
                            Let's Plan Your<br /><span className="text-secondary">Sri Lanka Trip</span>
                        </h1>
                        <p className="text-foreground/50 text-lg leading-relaxed max-w-xl">
                            Have questions? Ready to book? Our team is here to help you craft the perfect journey. We typically respond within 2 hours.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Contact Grid ── */}
            <section className="py-20 container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-5 gap-12">

                    {/* Left: Info + Socials */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-black text-foreground tracking-tight">Contact Details</h2>

                        <div className="space-y-4">
                            {contactInfo.map((info, idx) => {
                                const Card = (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.08 }}
                                        className="flex items-start space-x-4 bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-5 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all group"
                                    >
                                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${info.color}`}>
                                            <info.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black tracking-widest uppercase text-foreground/30 mb-1">{info.title}</p>
                                            {info.lines.map(l => <p key={l} className="text-foreground/80 text-sm font-medium">{l}</p>)}
                                        </div>
                                    </motion.div>
                                );
                                return info.href
                                    ? <a key={idx} href={info.href} target="_blank" rel="noopener noreferrer">{Card}</a>
                                    : <div key={idx}>{Card}</div>;
                            })}
                        </div>

                        {/* Socials */}
                        <div>
                            <p className="text-[10px] font-black tracking-widest uppercase text-foreground/30 mb-4">Follow Us</p>
                            <div className="flex space-x-3">
                                {socials.map((s, i) => (
                                    <motion.a
                                        key={i}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        title={s.label}
                                        className={`w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-center text-foreground/50 ${s.color} hover:text-white hover:border-transparent transition-all`}
                                    >
                                        <s.icon className="w-4 h-4" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Map embed placeholder */}
                        <div className="relative rounded-2xl overflow-hidden border border-[var(--border-color)] h-48 bg-[var(--surface)] flex items-center justify-center">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.3!2d80.4590!3d5.9455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNTYnNDQuMCJOIDgwwrAyNyc0OC40IkU!5e0!3m2!1sen!2slk!4v1"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="ChamiTours Location"
                                className="opacity-80"
                            />
                            <div className="absolute inset-0 flex items-end justify-start p-4 pointer-events-none">
                                <div className="bg-background/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-[var(--border-color)]">
                                    <p className="text-foreground/70 text-[10px] font-black tracking-widest uppercase">Mirissa, Sri Lanka</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-[var(--surface)] border border-[var(--border-color)] rounded-[2rem] p-8 md:p-10 shadow-[var(--shadow-lg)]">
                            {sent ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-black text-foreground mb-3">Message Sent!</h3>
                                    <p className="text-foreground/50 mb-6">
                                        Thanks {form.name}! We'll reply to <span className="text-secondary font-bold">{form.email}</span> within 2 hours.
                                    </p>
                                    <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                                        className="bg-secondary text-black font-black text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:scale-105 transition-transform">
                                        Send Another
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-black text-foreground tracking-tight mb-2">Send Us a Message</h2>
                                    <p className="text-foreground/45 text-sm mb-8">We'd love to hear from you. Fill in the form and we'll get back to you shortly.</p>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-[10px] font-black tracking-widest uppercase text-foreground/40 mb-2 block">Full Name *</label>
                                                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                                    placeholder="John Smith"
                                                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground placeholder:text-foreground/25 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none text-sm font-medium transition" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black tracking-widest uppercase text-foreground/40 mb-2 block">Email *</label>
                                                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                                    placeholder="john@example.com"
                                                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground placeholder:text-foreground/25 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none text-sm font-medium transition" />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-[10px] font-black tracking-widest uppercase text-foreground/40 mb-2 block">Phone / WhatsApp</label>
                                                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                                                    placeholder="+1 234 567 8900"
                                                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground placeholder:text-foreground/25 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none text-sm font-medium transition" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black tracking-widest uppercase text-foreground/40 mb-2 block">Subject</label>
                                                <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                                                    placeholder="Tour inquiry / Booking question"
                                                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground placeholder:text-foreground/25 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none text-sm font-medium transition" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black tracking-widest uppercase text-foreground/40 mb-2 block">Message *</label>
                                            <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                                                placeholder="Tell us about your dream Sri Lanka experience — destinations, dates, group size, budget..."
                                                rows={6}
                                                className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground placeholder:text-foreground/25 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none text-sm font-medium transition resize-none" />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-5 bg-secondary text-black font-black text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_8px_24px_rgba(255,143,0,0.3)] hover:shadow-[0_12px_32px_rgba(255,143,0,0.4)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    <span>Send Message</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WhatsApp CTA Banner ── */}
            <section className="py-16 bg-[#0a0a0f]">
                <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Prefer WhatsApp?</h2>
                        <p className="text-white/45 mt-1 text-sm">Chat with us directly — fastest way to plan your trip!</p>
                    </div>
                    <motion.a
                        href="https://wa.me/94771234567?text=Hello%20ChamiTours!"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center space-x-3 bg-[#25D366] text-white font-black text-sm tracking-wide px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] transition-all"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span>Chat on WhatsApp</span>
                    </motion.a>
                </div>
            </section>
        </div>
    );
}
