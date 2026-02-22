"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Packages() {
    const packages = [
        {
            title: "Coastal Escape",
            duration: "3 Days / 2 Nights",
            price: "From $299",
            features: ["Private Villa", "Whale Watching", "Beach BBQ"],
            color: "from-blue-500/10 to-cyan-500/10"
        },
        {
            title: "Mountain Retreat",
            duration: "4 Days / 3 Nights",
            price: "From $399",
            features: ["Train Journey", "Tea Plantation Tour", "Hiking"],
            color: "from-emerald-500/10 to-teal-500/10"
        },
        {
            title: "Heritage Tour",
            duration: "5 Days / 4 Nights",
            price: "From $499",
            features: ["Temple Tours", "Elephant Safari", "Cooking Class"],
            color: "from-amber-500/10 to-orange-500/10"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20">
            <div className="container mx-auto px-6 md:px-12">
                <Link href="/" className="inline-flex items-center space-x-2 text-foreground/40 hover:text-primary transition-colors mb-8 group text-xs font-bold tracking-widest">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>BACK TO HOME</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase leading-none">
                        Tailored <span className="text-primary">Packages</span>
                    </h1>
                    <p className="text-foreground/40 max-w-2xl text-lg">
                        Choose the perfect journey that fits your schedule and desires. All packages are fully customizable.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {packages.map((pkg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-gradient-to-br ${pkg.color} border border-foreground/5 rounded-[3rem] p-10 flex flex-col h-full hover:border-primary/30 transition-all duration-500 shadow-xl`}
                        >
                            <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">{pkg.title}</h3>
                            <div className="flex items-center space-x-2 text-foreground/60 mb-8 text-sm font-bold">
                                <Clock className="w-4 h-4 text-primary" />
                                <span>{pkg.duration}</span>
                            </div>

                            <ul className="space-y-4 mb-12 flex-grow">
                                {pkg.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center space-x-3 text-foreground/70">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        <span className="font-medium tracking-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8 border-t border-foreground/5">
                                <div className="text-sm text-foreground/40 mb-1 font-bold">STARTING AT</div>
                                <div className="text-4xl font-black text-foreground mb-8">{pkg.price}</div>
                                <button className="w-full py-5 bg-foreground text-background rounded-full font-black text-xs tracking-widest hover:bg-primary hover:text-white transition-colors">
                                    BOOK NOW
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
