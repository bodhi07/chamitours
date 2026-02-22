"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft, Clock, MapPin, Star, Users, CheckCircle2,
    Ship, Building2, Sun, ChevronDown, ChevronUp, ArrowRight,
    Anchor, Camera
} from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/common/BookingModal";
import { useLanguage } from "@/components/common/LanguageProvider";

/* ─────────────────────────────────────────────
   DAY TOURS  — full-day excursions from a base
───────────────────────────────────────────── */
const dayTours = [
    {
        id: "sigiriya-day",
        title: "Sigiriya & Dambulla Day Tour",
        duration: "Full Day (10–11 hrs)",
        price: "$65",
        priceNote: "per person",
        rating: 4.9,
        reviews: 842,
        groupSize: "2–14",
        img: "https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=900&auto=format",
        tag: "Most Popular",
        tagColor: "bg-secondary text-black",
        pickup: "Colombo / Negombo / Kandy",
        includes: [
            "Private A/C vehicle & driver",
            "Sigiriya Rock Fortress entry ticket",
            "Dambulla Cave Temple entry",
            "English-speaking local guide",
            "Bottled water & snacks",
        ],
        highlights: ["Lion Rock UNESCO Fortress", "Ancient cave frescoes", "Water gardens", "Panoramic views"],
        description:
            "Visit Sri Lanka's most iconic landmark — the 5th-century rock fortress of Sigiriya rising 200m above the jungle. Then explore the Dambulla Cave Sri Lanka's largest and best-preserved cave temple complex, home to over 150 Buddha statues.",
    },
    {
        id: "ella-day",
        title: "Ella & Nine Arch Bridge Tour",
        duration: "Full Day (10–12 hrs)",
        price: "$70",
        priceNote: "per person",
        rating: 4.9,
        reviews: 620,
        groupSize: "2–10",
        img: "https://images.unsplash.com/photo-1604182118621-6a84e6a0f8f6?q=80&w=900&auto=format",
        tag: "Scenic",
        tagColor: "bg-emerald-600 text-white",
        pickup: "Colombo / Kandy / Nuwara Eliya",
        includes: [
            "Private A/C vehicle & driver",
            "Guide for Little Adam's Peak trek",
            "Nine Arch Bridge walk",
            "Ravana Falls visit",
            "Lunch at local restaurant",
        ],
        highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Ravana Falls", "Tea plantations"],
        description:
            "Discover the magic of Ella — a misty hill-country town surrounded by dramatically beautiful tea plantations. Walk across the famous Nine Arch Bridge, hike Little Adam's Peak for sunrise views, and visit Ravana Falls.",
    },
    {
        id: "kandy-day",
        title: "Kandy City & Temple of Tooth",
        duration: "Full Day (8–9 hrs)",
        price: "$55",
        priceNote: "per person",
        rating: 4.8,
        reviews: 912,
        groupSize: "2–16",
        img: "https://images.unsplash.com/photo-1586613835341-6f5cf4056c52?q=80&w=900&auto=format",
        tag: "Cultural",
        tagColor: "bg-violet-600 text-white",
        pickup: "Colombo / Negombo",
        includes: [
            "Private A/C vehicle & driver",
            "Temple of Tooth entry ticket",
            "Peradeniya Botanical Gardens entry",
            "Local guide",
            "Traditional Kandyan lunch",
        ],
        highlights: ["Temple of Tooth (UNESCO)", "Kandyan Lake", "Peradeniya Gardens", "Spice garden"],
        description:
            "Sri Lanka's cultural capital awaits — home to the revered Temple of the Sacred Tooth Relic, a UNESCO World Heritage Site. Stroll the serene Kandy Lake, explore the Royal Botanical Gardens, and experience the authentic culture of the hill country.",
    },
    {
        id: "yala-day",
        title: "Yala National Park Safari",
        duration: "Full Day (12–14 hrs)",
        price: "$85",
        priceNote: "per person",
        rating: 4.8,
        reviews: 534,
        groupSize: "2–6",
        img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=900&auto=format",
        tag: "Wildlife",
        tagColor: "bg-amber-600 text-white",
        pickup: "Colombo / Galle / Hambantota",
        includes: [
            "4WD jeep & expert tracker",
            "Park entry & jeep fees",
            "Morning & afternoon safari sessions",
            "Breakfast pack & lunch",
            "Binoculars provided",
        ],
        highlights: ["Leopard sightings", "Wild elephants", "Crocodiles & sloth bears", "200+ bird species"],
        description:
            "Yala National Park has the world's highest density of leopards. Join a dawn jeep safari into the park's dry zone and scrub jungle. Elephant herds, crocodiles, peacocks, and elusive sloth bears are regular sightings alongside the big cats.",
    },
    {
        id: "whale-day",
        title: "Mirissa Whale Watching",
        duration: "Half Day (5–6 hrs)",
        price: "$45",
        priceNote: "per person",
        rating: 4.7,
        reviews: 1120,
        groupSize: "2–20",
        img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=900&auto=format",
        tag: "Ocean",
        tagColor: "bg-blue-500 text-white",
        pickup: "Mirissa / Galle / Tangalle",
        includes: [
            "Boat trip (3–4 hrs offshore)",
            "Marine biologist guide",
            "Life vests & safety equipment",
            "Light breakfast on board",
            "Snorkeling stop (seasonal)",
        ],
        highlights: ["Blue whales", "Sperm whales", "Spinner dolphins", "Flying fish"],
        description:
            "Mirissa is one of the best places in the world to see blue whales — the largest creatures on Earth. Set out at 6:30am on a comfortable catamaran, guided by a marine biologist, into the Indian Ocean where sightings are near-daily.",
    },
    {
        id: "nuwara-day",
        title: "Nuwara Eliya Tea Country Tour",
        duration: "Full Day (9–10 hrs)",
        price: "$60",
        priceNote: "per person",
        rating: 4.8,
        reviews: 445,
        groupSize: "2–12",
        img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=900&auto=format",
        tag: "Scenic",
        tagColor: "bg-teal-600 text-white",
        pickup: "Colombo / Kandy / Ella",
        includes: [
            "Private A/C vehicle & driver",
            "Tea estate & factory guided tour",
            "Tea tasting session",
            "Horton Plains park entry",
            "Picnic lunch in the hills",
        ],
        highlights: ["Tea factory tour", "Tea tasting", "Horton Plains / World's End", "Gregory Lake"],
        description:
            "\"Little England\" — the cool highland city of Nuwara Eliya sits at 1,868m surrounded by rolling tea estates. Tour a working tea factory, taste single-estate teas, and visit the breathtaking Horton Plains national park where the cliff drops 870m at World's End.",
    },
    {
        id: "udawalawe-day",
        title: "Udawalawe Elephant Safari",
        duration: "Full Day (10–11 hrs)",
        price: "$75",
        priceNote: "per person",
        rating: 4.9,
        reviews: 388,
        groupSize: "2–8",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format",
        tag: "Elephants",
        tagColor: "bg-stone-600 text-white",
        pickup: "Colombo / Galle / Hambantota / Ella",
        includes: [
            "4WD jeep & wildlife guide",
            "Park entry & jeep fees",
            "Elephant Transit Home visit",
            "Lunch at local restaurant",
            "Bottled water",
        ],
        highlights: ["200+ wild elephants", "Elephant Transit Home", "Water buffalos", "Crocodiles"],
        description:
            "Udawalawe is the best place in Sri Lanka to see elephants in the wild — over 200 call the park home. Unlike Yala, sightings are virtually guaranteed. Also visit the elephant orphanage where rescued calves are fed and rehabilitated.",
    },
    {
        id: "trinco-day",
        title: "Trincomalee Beach & Fort Day Tour",
        duration: "Full Day (10–12 hrs)",
        price: "$65",
        priceNote: "per person",
        rating: 4.7,
        reviews: 276,
        groupSize: "2–12",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=900&auto=format",
        tag: "Beach",
        tagColor: "bg-cyan-600 text-white",
        pickup: "Colombo / Sigiriya / Polonnaruwa",
        includes: [
            "Private A/C vehicle & driver",
            "Fort Frederick & Koneswaram Temple",
            "Pigeon Island snorkeling",
            "Nilaveli Beach swim",
            "Fresh seafood lunch",
        ],
        highlights: ["Pigeon Island reef", "Koneswaram Hindu Temple", "Nilaveli Beach", "Fort Frederick"],
        description:
            "Trincomalee on the northeast coast has one of the finest natural harbours in the world and some of Sri Lanka's most beautiful and uncrowded beaches. Snorkel the live coral at Pigeon Island, visit the cliff-top Koneswaram Temple, and enjoy pristine Nilaveli Beach.",
    },
];

/* ─────────────────────────────────────────────
   CITY TOURS
───────────────────────────────────────────── */
const cityTours = [
    {
        id: "colombo-city",
        title: "Colombo City Highlights",
        duration: "Half Day (4–5 hrs)",
        price: "$35",
        priceNote: "per person",
        img: "https://images.unsplash.com/photo-1567473438-80e54879c06e?q=80&w=900&auto=format",
        highlights: [
            "Gangaramaya Temple (Buddhist)",
            "Independence Square & Arcade",
            "Pettah Floating Market",
            "Galle Face Green (ocean promenade)",
            "National Museum",
            "Old Dutch & British architecture",
        ],
        description:
            "Colombo is a vibrant, surprising city — colonial buildings sit beside glass towers, Buddhist temples neighbour Hindu kovils, and colourful markets overflow with spices. Our half-day tour covers the essential highlights with a local storyteller guide.",
        pickup: "Hotel pickup anywhere in Colombo",
        tag: "City",
        tagColor: "bg-indigo-600 text-white",
    },
    {
        id: "galle-city",
        title: "Galle Fort Heritage Walk",
        duration: "Half Day (3–4 hrs)",
        price: "$30",
        priceNote: "per person",
        img: "https://images.unsplash.com/photo-1625396605063-27b85e1e8b58?q=80&w=900&auto=format",
        highlights: [
            "Dutch Fort rampart walk",
            "Galle Lighthouse",
            "Old Dutch Reformed Church (1755)",
            "Boutique shops & cafés",
            "Maritime Museum",
            "Sunset views from the fort walls",
        ],
        description:
            "The Galle Dutch Fort is Sri Lanka's best-preserved colonial monument — a UNESCO World Heritage Site with 3km of rampart walls, cobblestone streets, boutique shops, and sweeping ocean views. Our walking tour brings 350 years of history to life.",
        pickup: "Galle / Unawatuna / Mirissa hotels",
        tag: "Heritage",
        tagColor: "bg-rose-600 text-white",
    },
    {
        id: "kandy-city",
        title: "Kandy Cultural City Walk",
        duration: "Half Day (4 hrs)",
        price: "$30",
        priceNote: "per person",
        img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=900&auto=format",
        highlights: [
            "Temple of the Sacred Tooth Relic",
            "Kandyan Arts Association performance",
            "Kandy Lake sunset walk",
            "Central Market & spice vendors",
            "Old Palace complex",
            "Gem Museum",
        ],
        description:
            "Kandy's compact city centre is extremely walkable. Our guided city stroll combines the sacred (Temple of Tooth, the most revered Buddhist shrine in Sri Lanka) with the cultural (traditional Kandyan drumming shows, gem dealers, silk weavers).",
        pickup: "Kandy hotel pickup",
        tag: "Culture",
        tagColor: "bg-violet-600 text-white",
    },
];

/* ─────────────────────────────────────────────
   HAMBANTOTA CRUISE SHIP TOURS
───────────────────────────────────────────── */
const cruiseTours = [
    {
        id: "cruise-yala",
        title: "Yala Leopard Safari",
        subtitle: "Hambantota → Yala National Park",
        duration: "6–7 hrs",
        distance: "~30 km from port",
        price: "$80",
        img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=900&auto=format",
        highlights: ["Leopard spotting", "Wild elephants", "Crocodiles", "500+ bird species"],
        shipReturn: "✔ Back at port before ship departure",
        description: "Yala is Sri Lanka's most famous wildlife reserve and only 30–40 minutes from Hambantota Port — perfect for cruise ship guests. A trained tracker guides your open jeep through the park's spectacular dry-zone ecosystem.",
        popular: true,
    },
    {
        id: "cruise-udawalawe",
        title: "Udawalawe Elephant Park",
        subtitle: "Hambantota → Udawalawe",
        duration: "5–6 hrs",
        distance: "~65 km from port",
        price: "$75",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format",
        highlights: ["200+ wild elephants", "Elephant orphanage feeding", "Birds & wildlife", "Scenic reservoir"],
        shipReturn: "✔ Back at port before ship departure",
        description: "Udawalawe National Park offers virtually guaranteed elephant sightings — herds of 50–100 elephants roam the open savannah. Also visit the Elephant Transit Home where orphan elephant calves are bottle-fed.",
        popular: false,
    },
    {
        id: "cruise-kataragama",
        title: "Kataragama Sacred Temple",
        subtitle: "Hambantota → Kataragama",
        duration: "4–5 hrs",
        distance: "~55 km from port",
        price: "$50",
        img: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=900&auto=format",
        highlights: ["Ancient Hindu-Buddhist shrine", "Menik Ganga river", "Peacocks roaming freely", "Unique Sri Lankan pilgrimage"],
        shipReturn: "✔ Back at port before ship departure",
        description: "Kataragama is one of Sri Lanka's most sacred sites — revered simultaneously by Hindus, Buddhists, and Muslims. Colourful shrines, sacred river bathing, and hundreds of freely roaming peacocks make this an unforgettable cultural experience.",
        popular: false,
    },
    {
        id: "cruise-mirissa",
        title: "Mirissa Beach & Whale Watching",
        subtitle: "Hambantota → Mirissa",
        duration: "6–7 hrs",
        distance: "~85 km from port",
        price: "$90",
        img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=900&auto=format",
        highlights: ["Blue whale encounters", "Spinner dolphin pods", "Mirissa crescent beach", "Fresh seafood lunch"],
        shipReturn: "✔ Timed to ship schedule",
        description: "Catch a whale-watching boat from Mirissa's harbour — one of the world's best spots for blue whale sightings — then relax on the stunning crescent beach. Lunch at a beachfront restaurant before returning to Hambantota Port.",
        popular: true,
    },
    {
        id: "cruise-weligama",
        title: "Weligama & Galle Fort",
        subtitle: "Hambantota → Weligama → Galle",
        duration: "7–8 hrs",
        distance: "Galle: ~100 km from port",
        price: "$70",
        img: "https://images.unsplash.com/photo-1625396605063-27b85e1e8b58?q=80&w=900&auto=format",
        highlights: ["Stilt fishermen photos", "Galle Dutch Fort", "Beach time", "Boutique shops"],
        shipReturn: "✔ Back at port before ship departure",
        description: "Stop at Weligama to photograph Sri Lanka's iconic stilt fishermen — perched on poles planted in the sea. Then explore the UNESCO-listed Galle Fort, walking the 17th-century Dutch ramparts with sweeping ocean views.",
        popular: false,
    },
    {
        id: "cruise-bundala",
        title: "Bundala Bird Sanctuary",
        subtitle: "Hambantota → Bundala Lagoon",
        duration: "3–4 hrs",
        distance: "~15 km from port",
        price: "$45",
        img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=900&auto=format",
        highlights: ["Flamingos & pelicans", "Crocodiles", "150+ bird species", "Peaceful lagoon safari"],
        shipReturn: "✔ Closest tour to port",
        description: "Just 15 minutes from Hambantota Port, Bundala is a UNESCO Biosphere Reserve and wetland sanctuary. Open-jeep lagoon safari through mangroves to spot Eurasian flamingos, pelicans, painted storks, and mugger crocodiles.",
        popular: false,
    },
];

const tabs = [
    { id: "day", label: "Day Tours", icon: Sun, count: dayTours.length },
    { id: "city", label: "City Tours", icon: Building2, count: cityTours.length },
    { id: "cruise", label: "Cruise Ship Tours", icon: Ship, count: cruiseTours.length },
];

export default function Tours() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<"day" | "city" | "cruise">("day");
    const [expanded, setExpanded] = useState<string | null>(null);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [selectedTour, setSelectedTour] = useState("");

    const tabs = [
        { id: "day", label: t("tours.dayTours"), icon: Sun, count: dayTours.length },
        { id: "city", label: t("tours.cityTours"), icon: Building2, count: cityTours.length },
        { id: "cruise", label: t("tours.cruiseTours"), icon: Ship, count: cruiseTours.length },
    ];

    const openBooking = (title: string) => {
        setSelectedTour(title);
        setBookingOpen(true);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preSelectedPackage={selectedTour} />

            {/* ── HERO ── */}
            <section className="relative h-[58vh] min-h-[440px] flex items-end overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1600&auto=format"
                    alt="Sri Lanka Tours"
                    fill priority
                    className="object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16">
                    <Link href="/" className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors mb-6 group text-xs font-bold tracking-widest">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>{t("common.back")}</span>
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="flex items-center space-x-2 mb-4">
                            <Camera className="w-4 h-4 text-secondary" />
                            <span className="text-secondary text-[10px] font-black tracking-[0.3em] uppercase">Sri Lanka Tours</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none mb-5">
                            Day Tours,<br />City Tours &<br /><span className="text-secondary">Cruise Excursions</span>
                        </h1>
                        <p className="text-white/60 text-base max-w-xl leading-relaxed">
                            Whether you have a single day, a city afternoon, or you're arriving by cruise ship at Hambantota — we have a perfect tour ready for you.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── CRUISE SHIP SPECIAL NOTICE ── */}
            <div className="bg-[#0a1628] text-white py-5 border-b border-blue-900/40">
                <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
                            <Anchor className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="font-black text-sm text-white">{t("tours.shipNotice")}</p>
                            <p className="text-white/50 text-xs">All cruise tours are timed to return before your ship departs. Book in advance — we meet you at the port gate!</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setActiveTab("cruise")}
                        className="flex-shrink-0 flex items-center space-x-2 bg-blue-500 text-white font-black text-[10px] tracking-widest uppercase px-6 py-3 rounded-full hover:bg-blue-400 transition-colors shadow-lg"
                    >
                        <Ship className="w-4 h-4" />
                        <span>{t("tours.shipNoticeBtn")}</span>
                    </button>
                </div>
            </div>

            {/* ── TAB NAV ── */}
            <section className="sticky top-20 z-30 bg-[var(--surface)]/95 backdrop-blur-xl border-b border-[var(--border-color)]">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex items-center overflow-x-auto no-scrollbar">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as "day" | "city" | "cruise")}
                                className={`flex items-center space-x-2 px-6 py-5 text-xs font-black tracking-widest uppercase border-b-2 whitespace-nowrap transition-all ${activeTab === tab.id
                                    ? "border-secondary text-secondary"
                                    : "border-transparent text-foreground/45 hover:text-foreground"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                                <span className={`rounded-full text-[9px] font-black px-2 py-0.5 ${activeTab === tab.id ? "bg-secondary text-black" : "bg-foreground/10 text-foreground/50"}`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TAB CONTENT ── */}
            <AnimatePresence mode="wait">

                {/* ════════ DAY TOURS ════════ */}
                {activeTab === "day" && (
                    <motion.section
                        key="day"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="py-16 container mx-auto px-6 md:px-12"
                    >
                        <div className="mb-10">
                            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground mb-3">Full Day Tours</h2>
                            <p className="text-foreground/50 max-w-2xl">
                                Explore Sri Lanka's most loved places in a single day. All tours include pickup from your hotel, a private vehicle, and an expert guide.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                            {dayTours.map((tour, idx) => (
                                <motion.div
                                    key={tour.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.07 }}
                                    className="bg-[var(--surface)] border border-[var(--border-color)] rounded-[2rem] overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 group"
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden">
                                        <Image src={tour.img} alt={tour.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <span className={`absolute top-4 left-4 ${tour.tagColor} text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg`}>
                                            {tour.tag}
                                        </span>
                                        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1.5 border border-white/10">
                                            <Star className="w-3 h-3 fill-secondary text-secondary" />
                                            <span className="text-white text-[10px] font-black">{tour.rating}</span>
                                            <span className="text-white/50 text-[9px]">({tour.reviews})</span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                                            <div className="flex items-center space-x-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                                                <Clock className="w-3 h-3 text-white/70" />
                                                <span className="text-white text-[10px] font-bold">{tour.duration}</span>
                                            </div>
                                            <div className="flex items-center space-x-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                                                <Users className="w-3 h-3 text-white/70" />
                                                <span className="text-white text-[10px] font-bold">{tour.groupSize}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-7">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl font-black text-foreground tracking-tight pr-4">{tour.title}</h3>
                                            <div className="text-right flex-shrink-0">
                                                <div className="text-2xl font-black text-secondary">{tour.price}</div>
                                                <div className="text-foreground/40 text-[9px] font-bold">{tour.priceNote}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-1.5 mb-3">
                                            <MapPin className="w-3.5 h-3.5 text-secondary" />
                                            <span className="text-foreground/50 text-xs font-medium">Pickup: {tour.pickup}</span>
                                        </div>

                                        <p className="text-foreground/55 text-sm leading-relaxed mb-4 line-clamp-2">{tour.description}</p>

                                        {/* Highlights */}
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {tour.highlights.map(h => (
                                                <span key={h} className="bg-secondary/8 text-secondary border border-secondary/15 text-[9px] font-black tracking-wider uppercase px-2 py-1 rounded-full">
                                                    {h}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Expandable includes */}
                                        <button
                                            onClick={() => setExpanded(expanded === tour.id ? null : tour.id)}
                                            className="flex items-center justify-between w-full text-left py-3 px-4 rounded-xl bg-background border border-[var(--border-color)] hover:border-secondary/30 transition-colors mb-4 group/btn"
                                        >
                                            <span className="text-[10px] font-black tracking-widest uppercase text-foreground/45 group-hover/btn:text-secondary transition-colors">
                                                What's included
                                            </span>
                                            {expanded === tour.id ? <ChevronUp className="w-4 h-4 text-secondary" /> : <ChevronDown className="w-4 h-4 text-foreground/30" />}
                                        </button>
                                        {expanded === tour.id && (
                                            <motion.ul
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="mb-4 space-y-2"
                                            >
                                                {tour.includes.map(item => (
                                                    <li key={item} className="flex items-center space-x-2.5">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                                        <span className="text-foreground/60 text-xs">{item}</span>
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}

                                        <button
                                            onClick={() => openBooking(`${tour.title} — ${tour.price}/person`)}
                                            className="w-full py-3.5 bg-secondary text-black font-black text-[10px] tracking-widest uppercase rounded-full hover:scale-[1.02] transition-all shadow-[0_4px_16px_rgba(255,143,0,0.25)]"
                                        >
                                            Book This Tour
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* ════════ CITY TOURS ════════ */}
                {activeTab === "city" && (
                    <motion.section
                        key="city"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="py-16 container mx-auto px-6 md:px-12"
                    >
                        <div className="mb-10">
                            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground mb-3">City Tours</h2>
                            <p className="text-foreground/50 max-w-2xl">
                                Half-day guided walks through Sri Lanka's most fascinating cities — perfect if you're in port for a day, have a few hours in between, or want a curated city experience.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {cityTours.map((tour, idx) => (
                                <motion.div
                                    key={tour.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-[var(--surface)] border border-[var(--border-color)] rounded-[2rem] overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 group flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <Image src={tour.img} alt={tour.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        <span className={`absolute top-4 left-4 ${tour.tagColor} text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full`}>
                                            {tour.tag}
                                        </span>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-white font-black text-lg leading-snug">{tour.title}</h3>
                                            <div className="flex items-center space-x-1.5 mt-1">
                                                <Clock className="w-3 h-3 text-white/60" />
                                                <span className="text-white/60 text-[10px] font-bold">{tour.duration}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-secondary" />
                                                <span className="text-foreground/50 text-xs font-medium">{tour.pickup}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-black text-secondary">{tour.price}</div>
                                                <div className="text-foreground/40 text-[9px]">{tour.priceNote}</div>
                                            </div>
                                        </div>

                                        <p className="text-foreground/55 text-sm leading-relaxed mb-5">{tour.description}</p>

                                        <ul className="space-y-2 mb-6">
                                            {tour.highlights.map(h => (
                                                <li key={h} className="flex items-center space-x-2.5">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                                    <span className="text-foreground/60 text-xs">{h}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={() => openBooking(`${tour.title} — ${tour.price}/person`)}
                                            className="mt-auto w-full py-3.5 bg-secondary text-black font-black text-[10px] tracking-widest uppercase rounded-full hover:scale-[1.02] transition-all shadow-[0_4px_16px_rgba(255,143,0,0.2)]"
                                        >
                                            Book This Tour
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* ════════ CRUISE SHIP TOURS ════════ */}
                {activeTab === "cruise" && (
                    <motion.section
                        key="cruise"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="py-16"
                    >
                        {/* Cruise hero intro */}
                        <div className="relative overflow-hidden bg-[#0a1628] py-16 mb-16">
                            <div className="absolute inset-0 opacity-20">
                                <Image
                                    src="https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?q=80&w=1600&auto=format"
                                    alt="Hambantota Port cruise ship"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative z-10 container mx-auto px-6 md:px-12">
                                <div className="max-w-3xl">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Anchor className="w-5 h-5 text-blue-400" />
                                        <span className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase">Hambantota International Port</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-5">
                                        Cruise Ship Shore<br />Excursions
                                    </h2>
                                    <p className="text-white/60 text-base leading-relaxed mb-6 max-w-2xl">
                                        Arriving in Sri Lanka by cruise ship at <strong className="text-white">Hambantota International Port</strong>? Our professionally timed shore excursions are designed specifically for cruise guests. We meet you at the port gate, handle everything, and have you back before your ship departs — guaranteed.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        {[
                                            { icon: Ship, text: "Meet at port gate" },
                                            { icon: Clock, text: "Timed to your ship schedule" },
                                            { icon: Users, text: "Private & small groups" },
                                            { icon: CheckCircle2, text: "Return guaranteed" },
                                        ].map(({ icon: Icon, text }, i) => (
                                            <div key={i} className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                                                <Icon className="w-3.5 h-3.5 text-blue-400" />
                                                <span className="text-white/70 text-xs font-bold">{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container mx-auto px-6 md:px-12">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {cruiseTours.map((tour, idx) => (
                                    <motion.div
                                        key={tour.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.08 }}
                                        className={`bg-[var(--surface)] border-2 ${tour.popular ? "border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.08)]" : "border-[var(--border-color)]"} rounded-[2rem] overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 group flex flex-col`}
                                    >
                                        <div className="relative h-52 overflow-hidden">
                                            <Image src={tour.img} alt={tour.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                            {tour.popular && (
                                                <div className="absolute top-4 right-4 bg-blue-500 text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                                                    ✦ Top Pick
                                                </div>
                                            )}
                                            {/* Distance badge */}
                                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 flex items-center space-x-1.5">
                                                <Anchor className="w-3 h-3 text-blue-400" />
                                                <span className="text-white text-[9px] font-black">{tour.distance}</span>
                                            </div>
                                            <div className="absolute bottom-4 left-4">
                                                <h3 className="text-white font-black text-xl leading-tight">{tour.title}</h3>
                                                <p className="text-white/60 text-xs mt-0.5">{tour.subtitle}</p>
                                            </div>
                                            <div className="absolute bottom-4 right-4 text-right">
                                                <div className="text-2xl font-black text-white">{tour.price}</div>
                                                <div className="text-white/50 text-[9px]">per person</div>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center space-x-1.5 mb-3">
                                                <Clock className="w-3.5 h-3.5 text-secondary" />
                                                <span className="text-foreground/60 text-xs font-bold">{tour.duration}</span>
                                            </div>

                                            <p className="text-foreground/55 text-sm leading-relaxed mb-4">{tour.description}</p>

                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {tour.highlights.map(h => (
                                                    <span key={h} className="bg-blue-500/8 text-blue-600 dark:text-blue-400 border border-blue-500/15 text-[9px] font-black tracking-wider uppercase px-2 py-1 rounded-full">
                                                        {h}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Ship return guarantee */}
                                            <div className="flex items-center space-x-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-4 py-3 mb-4">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                <span className="text-emerald-700 dark:text-emerald-400 text-xs font-black">{tour.shipReturn}</span>
                                            </div>

                                            <button
                                                onClick={() => openBooking(`[CRUISE] ${tour.title} — ${tour.price}/person`)}
                                                className="mt-auto w-full py-4 bg-blue-600 text-white font-black text-[10px] tracking-widest uppercase rounded-full hover:bg-blue-500 hover:scale-[1.02] transition-all shadow-[0_4px_16px_rgba(59,130,246,0.3)]"
                                            >
                                                Book Shore Excursion
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Ship timing note */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mt-16 bg-[#0a1628] border border-blue-900/40 rounded-3xl p-8 md:p-10"
                            >
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
                                        <Ship className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black text-white mb-2">How Cruise Tours Work</h3>
                                        <div className="grid md:grid-cols-4 gap-4 mt-4">
                                            {[
                                                { step: "1", title: "Book in Advance", desc: "Email or WhatsApp us your ship's port time and departure time." },
                                                { step: "2", title: "Port Gate Pickup", desc: "Your driver meets you at Hambantota Port Gate with a name sign." },
                                                { step: "3", title: "Explore Sri Lanka", desc: "Private vehicle, expert guide, stress-free experience." },
                                                { step: "4", title: "Back on Time", desc: "Returned to port gate at least 1 hour before ship departure." },
                                            ].map(({ step, title, desc }) => (
                                                <div key={step} className="flex space-x-3">
                                                    <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 text-xs font-black flex-shrink-0">
                                                        {step}
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-black text-sm">{title}</p>
                                                        <p className="text-white/45 text-xs mt-0.5 leading-snug">{desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <a
                                        href="https://wa.me/94771234567?text=Hello%20ChamiTours%2C%20I%20am%20arriving%20by%20cruise%20ship%20at%20Hambantota%20Port."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-2 bg-[#25D366] text-white font-black text-xs tracking-widest uppercase px-7 py-3.5 rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:scale-105 transition-transform"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                        <span>WhatsApp Us Your Ship Schedule</span>
                                    </a>
                                    <Link href="/contact" className="inline-flex items-center space-x-2 bg-white/10 text-white font-black text-xs tracking-widest uppercase px-7 py-3.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                                        <span>Email Enquiry</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}
