"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";
import { useState } from "react";

import { usePathname } from "next/navigation";

export default function FloatingActions() {
    const pathname = usePathname();
    
    // Hide FloatingActions on Admin pages
    if (pathname?.startsWith("/admin")) return null;
    const [open, setOpen] = useState(false);

    const actions = [
        {
            label: "WhatsApp",
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            href: "https://wa.me/94771234567?text=Hello%20ChamiTours%2C%20I%20am%20interested%20in%20a%20tour!",
            bg: "bg-[#25D366]",
            shadow: "shadow-[0_4px_20px_rgba(37,211,102,0.5)]",
        },
        {
            label: "Call Us",
            icon: <Phone className="w-5 h-5" />,
            href: "tel:+94771234567",
            bg: "bg-primary",
            shadow: "shadow-[0_4px_20px_rgba(0,200,224,0.4)]",
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
            <AnimatePresence>
                {open &&
                    actions.map((action, idx) => (
                        <motion.a
                            key={idx}
                            href={action.href}
                            target={action.label === "WhatsApp" ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.5, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.5, x: 20 }}
                            transition={{ delay: idx * 0.07 }}
                            className={`flex items-center space-x-3 ${action.bg} text-white px-5 py-3 rounded-full font-bold text-sm ${action.shadow} hover:scale-105 transition-transform`}
                        >
                            {action.icon}
                            <span className="text-xs font-black tracking-wide">{action.label}</span>
                        </motion.a>
                    ))}
            </AnimatePresence>

            {/* Main toggle button */}
            <motion.button
                onClick={() => setOpen(!open)}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-secondary text-black flex items-center justify-center shadow-[0_4px_24px_rgba(255,143,0,0.5)] hover:scale-110 transition-transform"
            >
                <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                </motion.div>
            </motion.button>
        </div>
    );
}
