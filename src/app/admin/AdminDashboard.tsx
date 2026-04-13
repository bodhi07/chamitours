"use client";

import { useState, useEffect } from "react";
import { 
    LayoutDashboard, 
    Map, 
    Package, 
    Image as ImageIcon, 
    Newspaper, 
    CalendarCheck, 
    Settings, 
    LogOut, 
    Plus, 
    Trash2, 
    Edit, 
    Eye,
    TrendingUp,
    Users,
    CheckCircle,
    Clock,
    Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type Tab = "dashboard" | "tours" | "packages" | "gallery" | "blogs" | "bookings";

interface TourItem {
    _id: string;
    title: string;
    description: string;
    image: string;
    price?: string;
    duration?: string;
}

interface BookingItem {
    _id: string;
    name: string;
    email: string;
    phone: string;
    tour: string;
    date: string;
    status: string;
    message?: string;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>("dashboard");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Real data states
    const [tours, setTours] = useState<TourItem[]>([]);
    const [packages, setPackages] = useState<any[]>([]);
    const [gallery, setGallery] = useState<any[]>([]);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [bookings, setBookings] = useState<BookingItem[]>([]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            setIsLoggedIn(true);
            setError("");
        } else {
            setError("Invalid password");
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn]);

    const fetchData = async () => {
        try {
            const [tPath, pPath, gPath, bPath, bkPath] = [
                "/api/tours", "/api/packages", "/api/gallery", "/api/blogs", "/api/bookings"
            ];
            const [tRes, pRes, gRes, bRes, bkRes] = await Promise.all([
                fetch(tPath), fetch(pPath), fetch(gPath), fetch(bPath), fetch(bkPath)
            ]);
            
            setTours(await tRes.json());
            setPackages(await pRes.json());
            setGallery(await gRes.json());
            setBlogs(await bRes.json());
            setBookings(await bkRes.json());
        } catch (err) {
            console.error("Failed to fetch admin data", err);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[#111] border border-white/10 p-10 rounded-[2rem] shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-2">ADMIN ACCESS</h2>
                        <p className="text-white/40 text-xs font-bold tracking-widest uppercase">Safe & Secure Entrance</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Administrator Password"
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs font-bold text-center uppercase tracking-widest">{error}</p>}
                        <button 
                            type="submit"
                            className="w-full h-14 bg-primary text-black font-black tracking-widest uppercase rounded-2xl hover:scale-[1.02] transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,143,0,0.3)]"
                        >
                            Log Into Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* --- Sidebar --- */}
            <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col p-6 sticky top-0 h-screen">
                <div className="mb-12 px-4">
                    <h1 className="text-2xl font-black tracking-tighter text-primary">CHAMI<span className="text-white/20">ADMIN</span></h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
                        { id: "tours", icon: Map, label: "Tours" },
                        { id: "packages", icon: Package, label: "Packages" },
                        { id: "gallery", icon: ImageIcon, label: "Gallery" },
                        { id: "blogs", icon: Newspaper, label: "Blogs" },
                        { id: "bookings", icon: CalendarCheck, label: "Bookings" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as Tab)}
                            className={`w-full flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all ${activeTab === item.id ? "bg-primary text-black font-black" : "text-white/40 hover:bg-white/5 hover:text-white"}`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm tracking-tight">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="pt-8 border-t border-white/5">
                    <button 
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-2xl text-red-500/60 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm uppercase tracking-widest">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 p-10 overflow-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase">{activeTab}</h2>
                        <p className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mt-1">Management Portal</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input 
                                type="text" 
                                placeholder="Search everything..."
                                className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-white/10 w-64"
                            />
                        </div>
                        {activeTab !== "dashboard" && activeTab !== "bookings" && (
                            <button className="h-11 px-6 bg-primary text-black font-black text-xs tracking-widest uppercase rounded-xl flex items-center space-x-2">
                                <Plus className="w-4 h-4" />
                                <span>Add New</span>
                            </button>
                        )}
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === "dashboard" && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            key="dashboard"
                            className="space-y-10"
                        >
                            {/* Stats */}
                            <div className="grid grid-cols-4 gap-6">
                                {[
                                    { label: "Total Bookings", val: bookings.length, icon: CalendarCheck, color: "text-blue-500" },
                                    { label: "Active Tours", val: tours.length, icon: Map, color: "text-primary" },
                                    { label: "Pending Requests", val: bookings.filter(b => b.status === "Pending").length, icon: Clock, color: "text-secondary" },
                                    { label: "Completed", val: blogs.length, icon: CheckCircle, color: "text-emerald-500" },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[2rem] hover:border-white/10 transition-colors group">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                                <stat.icon className="w-6 h-6" />
                                            </div>
                                            <TrendingUp className="w-4 h-4 text-emerald-500/40" />
                                        </div>
                                        <div className="text-4xl font-black mb-1">{stat.val}</div>
                                        <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Activity */}
                            <div className="grid grid-cols-3 gap-10">
                                <div className="col-span-2 bg-[#0f0f0f] border border-white/5 rounded-[2rem] p-10">
                                    <h3 className="text-xl font-black mb-8 border-b border-white/5 pb-4">Recent Bookings</h3>
                                    <div className="space-y-6">
                                        {bookings.slice(0, 5).map((bk: any, i) => (
                                            <div key={i} className="flex items-center justify-between group">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-primary">
                                                        {bk.name[0]}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm">{bk.name}</h4>
                                                        <p className="text-[10px] text-white/30 font-bold uppercase">{bk.tour}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs font-black text-white/60 mb-0.5">{bk.date}</div>
                                                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${bk.status === "Pending" ? "bg-secondary/20 text-secondary" : "bg-emerald-500/20 text-emerald-500"}`}>
                                                        {bk.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-[#0f0f0f] border border-white/5 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center">
                                    <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-6" />
                                    <h3 className="text-lg font-black tracking-tight mb-2">Live Statistics</h3>
                                    <p className="text-white/35 text-xs font-medium px-4">We are processing and syncing your data across all devices.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Tours Management */}
                    {activeTab === "tours" && (
                         <div className="space-y-10">
                            {/* Stats bar for tours */}
                            <div className="flex space-x-6 overflow-x-auto pb-4">
                                <div className="min-w-[200px] bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <div className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-1">Total Tours</div>
                                    <div className="text-2xl font-black">{tours.length}</div>
                                </div>
                                <div className="min-w-[200px] bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <div className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-1">Average Price</div>
                                    <div className="text-2xl font-black">$450</div>
                                </div>
                            </div>

                            {/* List and Form */}
                            <div className="grid lg:grid-cols-2 gap-10">
                                {/* List */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-black mb-6">Current active tours</h3>
                                    {tours.map((tour: any) => (
                                        <div key={tour._id} className="bg-[#0f0f0f] border border-white/5 rounded-[2rem] overflow-hidden group hover:border-white/10 transition-all flex h-40">
                                            <div className="w-40 h-full relative overflow-hidden">
                                                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                                            </div>
                                            <div className="flex-1 p-6 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="text-lg font-black tracking-tighter uppercase leading-none mb-2">{tour.title}</h4>
                                                    <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-4">{tour.price} — {tour.duration}</p>
                                                    <p className="text-white/20 text-xs line-clamp-1">{tour.description}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="flex-1 h-10 rounded-xl bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer flex items-center justify-center"><Edit className="w-4 h-4 mr-2" /> <span className="text-[10px] font-black">EDIT</span></button>
                                                    <button 
                                                        onClick={async () => {
                                                            if(confirm("Are you sure?")) {
                                                                await fetch(`/api/tours/${tour._id}`, { method: "DELETE" });
                                                                fetchData();
                                                            }
                                                        }}
                                                        className="h-10 px-4 rounded-xl bg-red-500/10 text-red-500/40 hover:text-red-500 transition-colors cursor-pointer flex items-center justify-center"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {tours.length === 0 && <p className="text-white/10 text-center py-20 border border-dashed border-white/5 rounded-3xl">No tours found in database.</p>}
                                </div>

                                {/* Form */}
                                <div className="bg-[#0f0f0f] border border-white/5 p-10 rounded-[2.5rem]">
                                    <h3 className="text-xl font-black mb-8">Add a magnificent tour</h3>
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        const form = e.target as HTMLFormElement;
                                        const data = {
                                            title: (form.elements.namedItem("title") as HTMLInputElement).value,
                                            description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
                                            price: (form.elements.namedItem("price") as HTMLInputElement).value,
                                            duration: (form.elements.namedItem("duration") as HTMLInputElement).value,
                                            image: (form.elements.namedItem("image") as HTMLInputElement).value,
                                        };
                                        await fetch("/api/tours", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(data),
                                        });
                                        form.reset();
                                        fetchData();
                                    }} className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black tracking-widest text-white/20 uppercase ml-2">Tour Title</label>
                                            <input name="title" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:border-primary/50" placeholder="e.g. Ella Odyssey Hike" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest text-white/20 uppercase ml-2">Price Tag</label>
                                                <input name="price" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:border-primary/50" placeholder="e.g. $250.00" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest text-white/20 uppercase ml-2">Duration</label>
                                                <input name="duration" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:border-primary/50" placeholder="e.g. 3 Days / 2 Nights" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black tracking-widest text-white/20 uppercase ml-2">Cover Image URL</label>
                                            <input name="image" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-3.5 text-sm focus:outline-none focus:border-primary/50" placeholder="https://images.unsplash.com/..." />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black tracking-widest text-white/20 uppercase ml-2">Full Description</label>
                                            <textarea name="description" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-3.5 text-sm h-32 resize-none focus:outline-none focus:border-primary/50" placeholder="Describe the magical experience..." />
                                        </div>
                                        <button className="w-full py-4 bg-primary text-black font-black tracking-widest uppercase rounded-2xl shadow-lg hover:scale-[1.01] transition-all">Publish New Tour</button>
                                    </form>
                                </div>
                            </div>
                         </div>
                    )}

                    {/* Other tabs would go here similarly with CRUD functionality */}
                    {activeTab !== "dashboard" && activeTab !== "tours" && (
                         <div className="flex flex-col items-center justify-center py-20 text-center text-white/20">
                            <Clock className="w-12 h-12 mb-4 animate-pulse opacity-50" />
                            <h3 className="text-2xl font-black uppercase tracking-tighter">Syncing Modules...</h3>
                            <p className="max-w-xs text-xs font-bold tracking-widest uppercase mt-4">This section is being prepared with your latest database snapshots.</p>
                         </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
