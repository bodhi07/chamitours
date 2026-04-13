"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch("/api/blogs");
            const data = await res.json();
            setBlogs(data);
        };
        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="badge mb-4">✦ Travel Diaries</span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">Our Blog</h1>
                        <p className="text-foreground/40 max-w-2xl mx-auto text-base">Explore stories, guides, and tips from the heart of Sri Lanka.</p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {blogs.map((blog: any, idx: number) => (
                        <motion.div 
                            key={blog._id} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[var(--surface)] border border-[var(--border-color)] rounded-[2.5rem] overflow-hidden group hover:shadow-[var(--shadow-xl)] transition-all"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-5 left-5">
                                    <span className="badge bg-black/40 backdrop-blur-md border-white/10 text-white font-black">STORY</span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center space-x-4 text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em] mb-4">
                                    <div className="flex items-center space-x-1.5"><Calendar className="w-3 h-3" /> <span>{new Date(blog.createdAt).toLocaleDateString()}</span></div>
                                    <div className="flex items-center space-x-1.5"><User className="w-3 h-3" /> <span>{blog.author}</span></div>
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter mb-4 group-hover:text-primary transition-colors leading-tight uppercase">{blog.title}</h3>
                                <p className="text-foreground/50 text-sm mb-6 line-clamp-3 leading-relaxed">{blog.excerpt || blog.content.substring(0, 150) + "..."}</p>
                                <button className="flex items-center space-x-3 text-[10px] font-black tracking-[0.3em] uppercase group-hover:text-primary transition-colors">
                                    <span>Read Story</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {blogs.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                        <Newspaper className="w-12 h-12 text-white/10 mx-auto mb-4" />
                        <h3 className="text-white/20 font-black tracking-tighter uppercase text-xl">Stories are being written...</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
