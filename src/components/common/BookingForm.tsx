"use client";

import { useState } from "react";
import { X, Send, Phone, User, Mail, Calendar, MessageSquare, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingFormProps {
    isOpen: boolean;
    onClose: () => void;
    tourTitle?: string;
}

export default function BookingForm({ isOpen, onClose, tourTitle }: BookingFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        tour: tourTitle || "",
        date: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Save to Database
            await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            // 2. Format WhatsApp Message
            const whatsappNumber = "0761193338";
            const message = `*NEW BOOKING REQUEST*%0A%0A` +
                `*Name:* ${formData.name}%0A` +
                `*Email:* ${formData.email}%0A` +
                `*Phone:* ${formData.phone}%0A` +
                `*Tour:* ${formData.tour}%0A` +
                `*Date:* ${formData.date}%0A` +
                `*Message:* ${formData.message}`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

            // 3. Open WhatsApp
            window.open(whatsappUrl, "_blank");
            
            // 4. Close and Clear
            onClose();
            setFormData({ name: "", email: "", phone: "", tour: "", date: "", message: "" });
        } catch (error) {
            console.error("Booking failed", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-background border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-6 right-6 z-10">
                            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <X className="w-5 h-5 text-white/40" />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-5 h-full">
                            <div className="md:col-span-2 bg-[#0a0a0a] p-10 flex flex-col justify-between border-r border-white/5">
                                <div>
                                    <span className="badge mb-4">✦ Booking Request</span>
                                    <h2 className="text-3xl font-black tracking-tighter uppercase leading-tight mb-4 text-primary">Start Your <br />Adventure</h2>
                                    <p className="text-white/40 text-xs font-medium leading-relaxed">Fill out the details and we'll connect with you on WhatsApp immediately.</p>
                                </div>
                                <div className="space-y-4 pt-10">
                                    <div className="flex items-center space-x-3 text-white/30 italic">
                                        <Phone className="w-4 h-4" />
                                        <span className="text-[10px] font-bold tracking-widest">+94 76 119 3338</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-white/30 italic">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-[10px] font-bold tracking-widest">hello@chamitours.com</span>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="md:col-span-3 p-10 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest text-white/20 uppercase ml-2">Your Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary/30 transition-all" placeholder="John Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest text-white/20 uppercase ml-2">Phone No</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                            <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary/30 transition-all" placeholder="+94..." />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-widest text-white/20 uppercase ml-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary/30 transition-all" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest text-white/20 uppercase ml-2">Tour Select</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                            <input required value={formData.tour} onChange={e => setFormData({...formData, tour: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary/30 transition-all" placeholder="Ella Odyssey..." />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest text-white/20 uppercase ml-2">Travel Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                            <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary/30 transition-all text-white/40" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-widest text-white/20 uppercase ml-2">Additional Note</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-white/20" />
                                        <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary/30 transition-all h-24 resize-none" placeholder="Anything else you want us to know?" />
                                    </div>
                                </div>

                                <button 
                                    disabled={isSubmitting}
                                    type="submit" 
                                    className="w-full py-4 bg-primary text-black font-black tracking-widest uppercase rounded-2xl shadow-[0_8px_32px_rgba(255,143,0,0.3)] hover:scale-[1.01] transition-transform active:scale-95 flex items-center justify-center space-x-3 disabled:opacity-50"
                                >
                                    <span>{isSubmitting ? "Processing..." : "Confirm Booking via WhatsApp"}</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
