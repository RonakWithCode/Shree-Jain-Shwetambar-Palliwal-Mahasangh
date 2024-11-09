import localFont from "next/font/local";
import { Noto_Sans_Devanagari } from 'next/font/google';
import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedWrapper from '../components/AnimatedWrapper';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-hindi',
});

export const metadata = {
  title: "JAIN Community Website",
  description: "A website for the JAIN community featuring events, galleries, and community information",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSansDevanagari.variable} antialiased`}>
        <AnimatedWrapper>
          <div className="animate-fade-in min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow overflow-x-hidden animate-slide-up delay-200 
              pt-[100px] sm:pt-[100px] md:pt-[120px] lg:pt-[140px]"
            >
              {children}
            </main>
            <Footer />
          </div>
        </AnimatedWrapper>
      </body>
    </html>
  );
}
