import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Preloader from "@/components/common/Preloader";
import FloatingActions from "@/components/common/FloatingActions";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { LanguageProvider } from "@/components/common/LanguageProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChamiTours — Sri Lanka's Premier Tour Guide",
  description:
    "Discover Sri Lanka with ChamiTours. Explore stunning destinations, book personalized tour packages, and experience world-class hospitality. Ella, Mirissa, Sigiriya and beyond.",
  keywords: "Sri Lanka tours, ChamiTours, Ella, Mirissa, Sigiriya, Sri Lanka travel, tour packages",
  openGraph: {
    title: "ChamiTours — Sri Lanka's Premier Tour Guide",
    description: "Your gateway to the hidden wonders of Sri Lanka.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased font-sans`} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <Preloader />
            <Navbar />
            <main>{children}</main>
            <FloatingActions />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
