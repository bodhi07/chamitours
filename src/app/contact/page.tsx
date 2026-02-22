"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";

export default function Contact() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20">
            <div className="container mx-auto px-6 md:px-12">
                <Link href="/" className="inline-flex items-center space-x-2 text-foreground/40 hover:text-primary transition-colors mb-8 group text-xs font-bold tracking-widest">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>BACK TO HOME</span>
                </Link>

                <div className="grid lg:grid-cols-2 gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-none">
                            Let's <span className="text-primary">Connect</span>
                        </h1>
                        <p className="text-foreground/40 max-w-md text-lg mb-12">
                            Ready to start your Sri Lankan adventure? Reach out to us for personalized tour planning and expert advice.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: Phone, title: "Call Us", content: "+94 12 345 6789" },
                                { icon: Mail, title: "Email Us", content: "hello@chamitours.com" },
                                { icon: MapPin, title: "Visit Us", content: "Galle Road, Colombo, Sri Lanka" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-6">
                                    <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center border border-foreground/10 text-primary">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-foreground/40 uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-xl font-bold">{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-card border border-foreground/5 rounded-[3rem] p-10 md:p-14 shadow-2xl"
                    >
                        <form className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-widest text-foreground/40 uppercase ml-2">Your Name</label>
                                    <input type="text" className="w-full bg-background border border-foreground/10 rounded-2xl px-6 py-4 focus:border-primary transition-colors outline-none font-bold text-foreground" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-widest text-foreground/40 uppercase ml-2">Email Address</label>
                                    <input type="email" className="w-full bg-background border border-foreground/10 rounded-2xl px-6 py-4 focus:border-primary transition-colors outline-none font-bold text-foreground" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-foreground/40 uppercase ml-2">Message</label>
                                <textarea className="w-full bg-background border border-foreground/10 rounded-2xl px-6 py-4 focus:border-primary transition-colors outline-none font-bold text-foreground h-40 resize-none" placeholder="Tell us about your dream trip..." />
                            </div>
                            <button className="w-full py-6 bg-primary text-black rounded-full font-black text-xs tracking-widest hover:orange-gradient hover:text-white transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center space-x-3">
                                <span>SEND MESSAGE</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
