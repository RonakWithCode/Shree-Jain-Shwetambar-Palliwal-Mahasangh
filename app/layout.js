import localFont from "next/font/local";
import { Noto_Sans_Devanagari } from 'next/font/google';
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
        <div className="animate-fade-in">
          <Navbar />
          <main className="animate-slide-up delay-200">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
