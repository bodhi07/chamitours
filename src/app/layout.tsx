import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Preloader from "@/components/common/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChamiTours - Your Ultimate Sri Lanka Tour Guide",
  description: "Experience the beauty of Sri Lanka with ChamiTours. Personalized tour packages and local insights.",
};

import { ThemeProvider } from "@/components/common/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          <Preloader />
          <Navbar />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
