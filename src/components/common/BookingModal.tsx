"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, Calendar, MapPin, Users, ChevronDown, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    preSelectedPackage?: string;
}

export default function BookingModal({ isOpen, onClose, preSelectedPackage }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        package: preSelectedPackage || "",
        date: "",
        travelers: "2",
        message: "",
    });

    const packages = [
        "Coastal Escape (3D/2N) — From $299",
        "Mountain Retreat (4D/3N) — From $399",
        "Heritage Tour (5D/4N) — From $499",
        "Island Explorer (7D/6N) — From $699",
        "Custom Package",
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            // 1. Save to Database
            await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    tour: formData.package,
                    date: formData.date,
                    message: `Travelers: ${formData.travelers}. ${formData.message}`,
                }),
            });

            // 2. Format WhatsApp Message
            const whatsappNumber = "0761193338";
            const message = `*NEW BOOKING REQUEST*%0A%0A` +
                `*Name:* ${formData.name}%0A` +
                `*Email:* ${formData.email}%0A` +
                `*Phone:* ${formData.phone}%0A` +
                `*Pick-up Package:* ${formData.package}%0A` +
                `*Date:* ${formData.date}%0A` +
                `*Travelers:* ${formData.travelers}%0A` +
                `*Message:* ${formData.message}`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

            // 3. Set Success UI
            setSubmitted(true);

            // 4. Open WhatsApp
            window.open(whatsappUrl, "_blank");
        } catch (error) {
            console.error("Booking error", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[201] flex items-center justify-center p-4"
                    >
                        <div className="bg-[var(--surface)] border border-[var(--border-color)] rounded-[2rem] w-full max-w-lg shadow-[var(--shadow-xl)] overflow-hidden max-h-[90vh] overflow-y-auto">

                            {/* Header */}
                            <div className="relative bg-gradient-to-br from-secondary to-orange-600 p-8 text-white">
                                <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="text-[10px] font-black tracking-[0.3em] uppercase opacity-70 mb-2">ChamiTours</div>
                                <h2 className="text-2xl font-black tracking-tight leading-tight">Book Your Dream Tour</h2>
                                <p className="text-white/70 text-sm mt-1">Fill in the form and we'll get back to you within 2 hours.</p>

                                {/* Steps */}
                                {!submitted && (
                                    <div className="flex items-center space-x-2 mt-5">
                                        {[1, 2].map((s) => (
                                            <div key={s} className="flex items-center space-x-2">
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= s ? "bg-white text-orange-600" : "bg-white/20 text-white"}`}>
                                                    {s}
                                                </div>
                                                {s < 2 && <div className={`w-10 h-[2px] rounded-full transition-all ${step > s ? "bg-white" : "bg-white/20"}`} />}
                                            </div>
                                        ))}
                                        <span className="text-white/60 text-xs ml-2">{step === 1 ? "Your Details" : "Trip Info"}</span>
                                    </div>
                                )}
                            </div>

                            {/* Body */}
                            <div className="p-8">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-6"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                                            <CheckCircle className="w-8 h-8 text-emerald-500" />
                                        </div>
                                        <h3 className="text-xl font-black text-foreground mb-2">Booking Request Sent!</h3>
                                        <p className="text-foreground/50 text-sm mb-6">Thank you, {formData.name}! Our team will contact you at {formData.email} within 2 hours.</p>
                                        <button onClick={onClose} className="bg-secondary text-black font-black text-xs tracking-widest uppercase px-8 py-3.5 rounded-full hover:scale-105 transition-transform">
                                            Close
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <AnimatePresence mode="wait">
                                            {step === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="space-y-4"
                                                >
                                                    {/* Name */}
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="Full Name"
                                                            value={formData.name}
                                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground placeholder:text-foreground/30 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition text-sm font-medium"
                                                        />
                                                    </div>
                                                    {/* Email */}
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                                                        <input
                                                            required
                                                            type="email"
                                                            placeholder="Email Address"
                                                            value={formData.email}
                                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground placeholder:text-foreground/30 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition text-sm font-medium"
                                                        />
                                                    </div>
                                                    {/* Phone */}
                                                    <div className="relative">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                                                        <input
                                                            required
                                                            type="tel"
                                                            placeholder="Phone / WhatsApp Number"
                                                            value={formData.phone}
                                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground placeholder:text-foreground/30 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition text-sm font-medium"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => formData.name && formData.email && formData.phone && setStep(2)}
                                                        className="w-full py-4 bg-secondary text-black font-black text-xs tracking-widest uppercase rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,143,0,0.3)]"
                                                    >
                                                        Continue →
                                                    </button>
                                                </motion.div>
                                            )}

                                            {step === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    className="space-y-4"
                                                >
                                                    {/* Package */}
                                                    <div className="relative">
                                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                                                        <select
                                                            required
                                                            value={formData.package}
                                                            onChange={e => setFormData({ ...formData, package: e.target.value })}
                                                            className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground focus:border-secondary outline-none transition text-sm font-medium appearance-none"
                                                        >
                                                            <option value="">Select a Package</option>
                                                            {packages.map(p => <option key={p} value={p}>{p}</option>)}
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 pointer-events-none" />
                                                    </div>
                                                    {/* Date */}
                                                    <div className="relative">
                                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                                                        <input
                                                            required
                                                            type="date"
                                                            value={formData.date}
                                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground focus:border-secondary outline-none transition text-sm font-medium"
                                                        />
                                                    </div>
                                                    {/* Travelers */}
                                                    <div className="relative">
                                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                                                        <select
                                                            value={formData.travelers}
                                                            onChange={e => setFormData({ ...formData, travelers: e.target.value })}
                                                            className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground focus:border-secondary outline-none transition text-sm font-medium appearance-none"
                                                        >
                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} Traveler{n > 1 ? 's' : ''}</option>)}
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 pointer-events-none" />
                                                    </div>
                                                    {/* Message */}
                                                    <textarea
                                                        placeholder="Special requests or questions..."
                                                        value={formData.message}
                                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                        rows={3}
                                                        className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-color)] bg-background text-foreground placeholder:text-foreground/30 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition text-sm font-medium resize-none"
                                                    />
                                                    <div className="flex space-x-3">
                                                        <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 border border-[var(--border-color)] text-foreground/60 font-black text-xs tracking-widest uppercase rounded-full hover:border-foreground/30 transition-colors">
                                                            ← Back
                                                        </button>
                                                        <button type="submit" className="flex-[2] py-4 bg-secondary text-black font-black text-xs tracking-widest uppercase rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,143,0,0.3)] flex items-center justify-center space-x-2">
                                                            <Send className="w-4 h-4" />
                                                            <span>Send Request</span>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
