"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "de";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define nested translations
const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navbar
        "nav.home": "HOME",
        "nav.about": "ABOUT",
        "nav.destinations": "DESTINATIONS",
        "nav.tours": "TOURS",
        "nav.packages": "PACKAGES",
        "nav.gallery": "GALLERY",
        "nav.contact": "CONTACT",
        "nav.bookNow": "BOOK NOW",

        // Hero
        "hero.subtitle": "CHAMITOURS PRESENTS",
        "hero.title": "Start Your",
        "hero.titleAccent": "Dream",
        "hero.titleEnd": "Journey",
        "hero.desc": "Discover the unseen beauty of Sri Lanka with our premium guided tours. Tailored experiences crafted just for you.",
        "hero.cta": "EXPLORE NOW",
        "hero.video": "WATCH VIDEO",
        "hero.stats.travelers": "Happy Travelers",
        "hero.stats.packages": "Tour Packages",
        "hero.stats.rating": "Average Rating",

        // Common
        "common.en": "English",
        "common.de": "Deutsch",
        "common.learnMore": "Learn More",
        "common.viewAll": "View All",
        "common.loading": "Loading...",
        "common.back": "BACK",

        // About
        "about.title": "About ChamiTours",
        "about.story": "Our Story",
        "about.desc": "Born out of a deep love for Sri Lanka, we've been helping travellers from across the globe discover the island's magic for over 12 years.",
        "about.whoTitle": "More Than a Tour Operator",

        // Tours
        "tours.title": "Our Tours",
        "tours.dayTours": "Day Tours",
        "tours.cityTours": "City Tours",
        "tours.cruiseTours": "Hambantota Cruise Ship Tours",
        "tours.shipNotice": "Are you arriving on a cruise ship at Hambantota Port?",
        "tours.shipNoticeBtn": "Check Our Shore Excursions",

        // Destinations
        "dest.title": "Popular Destinations",
        "dest.subtitle": "Explore the heart of Sri Lanka",
    },
    de: {
        // Navbar
        "nav.home": "STARTSEITE",
        "nav.about": "ÜBER UNS",
        "nav.destinations": "ZIELE",
        "nav.tours": "TOUREN",
        "nav.packages": "PAKETE",
        "nav.gallery": "GALERIE",
        "nav.contact": "KONTAKT",
        "nav.bookNow": "JETZT BUCHEN",

        // Hero
        "hero.subtitle": "CHAMITOURS PRÄSENTIERT",
        "hero.title": "Beginnen Sie Ihre",
        "hero.titleAccent": "Traum-",
        "hero.titleEnd": "Reise",
        "hero.desc": "Entdecken Sie die ungesehene Schönheit Sri Lankas mit unseren erstklassigen geführten Touren. Maßgeschneiderte Erlebnisse, speziell für Sie kreiert.",
        "hero.cta": "JETZT ENTDECKEN",
        "hero.video": "VIDEO ANSEHEN",
        "hero.stats.travelers": "Zufriedene Reisende",
        "hero.stats.packages": "Tour-Pakete",
        "hero.stats.rating": "Durchschnittsbewertung",

        // Common
        "common.en": "Englisch",
        "common.de": "Deutsch",
        "common.learnMore": "Mehr erfahren",
        "common.viewAll": "Alle ansehen",
        "common.loading": "Wird geladen...",
        "common.back": "ZURÜCK",

        // About
        "about.title": "Über ChamiTours",
        "about.story": "Unsere Geschichte",
        "about.desc": "Aus einer tiefen Liebe zu Sri Lanka heraus helfen wir seit über 12 Jahren Reisenden aus der ganzen Welt, die Magie der Insel zu entdecken.",
        "about.whoTitle": "Mehr als ein Reiseveranstalter",

        // Tours
        "tours.title": "Unsere Touren",
        "tours.dayTours": "Tagestouren",
        "tours.cityTours": "Stadtrundfahrten",
        "tours.cruiseTours": "Hambantota Kreuzfahrttouren",
        "tours.shipNotice": "Kommen Sie mit einem Kreuzfahrtschiff im Hafen von Hambantota an?",
        "tours.shipNoticeBtn": "Unsere Landausflüge prüfen",

        // Destinations
        "dest.title": "Beliebte Ziele",
        "dest.subtitle": "Erkunden Sie das Herz von Sri Lanka",
    }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    // Load from locale storage if possible
    useEffect(() => {
        const saved = localStorage.getItem("chami_lang") as Language;
        if (saved && (saved === "en" || saved === "de")) {
            setLanguage(saved);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("chami_lang", lang);
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
