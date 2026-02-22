"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 150);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Textured Logo Text */}
                        <motion.h1
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000')] bg-cover bg-center"
                            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
                        >
                            SURESH
                        </motion.h1>

                        <motion.h2
                            initial={{ letterSpacing: "0.2em", opacity: 0 }}
                            animate={{ letterSpacing: "1em", opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-2xl md:text-3xl text-white font-light mt-[-20px] ml-[1em]"
                        >
                            TOURS
                        </motion.h2>

                        {/* Loading Bar Container */}
                        <div className="w-64 h-[2px] bg-white/10 mt-16 relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_#00e5ff]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-[10px] tracking-[0.4em] text-primary/60 mt-4 uppercase font-medium"
                        >
                            Loading Experience
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
