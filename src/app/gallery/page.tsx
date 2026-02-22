"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Gallery() {
    const photos = [
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800",
        "https://images.unsplash.com/photo-1588665575322-d9527ec3c491?q=80&w=800",
        "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=800",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000",
        "https://images.unsplash.com/photo-1594495894542-a471467e45f1?q=80&w=800",
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
                        Captured <span className="text-primary">Moments</span>
                    </h1>
                    <p className="text-foreground/40 max-w-2xl text-lg">
                        A glimpse into the magical experiences of our travelers in Sri Lanka.
                    </p>
                </motion.div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {photos.map((photo, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative rounded-3xl overflow-hidden group cursor-zoom-in border border-foreground/5 shadow-lg"
                        >
                            <Image
                                src={photo}
                                alt={`Gallery ${idx}`}
                                width={800}
                                height={600}
                                className="w-full grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
