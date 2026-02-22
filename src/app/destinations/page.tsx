"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Destinations() {
    const regions = [
        { title: "ELLA", desc: "Mist-covered mountains & tea plantations", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800" },
        { title: "MIRISSA", desc: "Turquoise waters & whale watching", img: "https://images.unsplash.com/photo-1588665575322-d9527ec3c491?q=80&w=800" },
        { title: "SIGIRIYA", desc: "Ancient rock fortress & history", img: "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=800" },
        { title: "KANDY", desc: "Cultural capital & sacred temples", img: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800" },
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
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                        Top <span className="text-primary">Destinations</span>
                    </h1>
                    <p className="text-foreground/40 max-w-2xl text-lg">
                        Explore the most breathtaking locations across the island. From highland mist to coastal bliss.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {regions.map((region, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative h-[400px] rounded-[2.5rem] overflow-hidden group border border-foreground/5 shadow-xl"
                        >
                            <Image src={region.img} alt={region.title} fill className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-10 left-10 text-white">
                                <h3 className="text-3xl font-black mb-2 tracking-tighter">{region.title}</h3>
                                <p className="text-white/60 font-medium">{region.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
