import localFont from "next/font/local";
import { Noto_Sans_Devanagari } from 'next/font/google';
import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedWrapper from '../components/AnimatedWrapper';
import { headers } from 'next/headers';

// Optimize font loading
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap', // Ensures text remains visible during font load
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
  preload: true,
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-hindi',
  display: 'swap',
  preload: true,
});

// Enhanced metadata for better SEO
export const metadata = {
  metadataBase: new URL('http://shwetambarpalliwalmahasangh.in'),
  title: {
    default: "श्री जैन श्वेतांबर पल्लीवाल महासंघ | Shwetambar Palliwal Mahasangh",
    template: "%s | श्री जैन श्वेतांबर पल्लीवाल महासंघ"
  },
  description: "श्री जैन श्वेतांबर पल्लीवाल महासंघ - A premier Jain community organization dedicated to preserving and promoting Jain values, culture, and traditions. Find latest news, events, galleries, and community information.",
  keywords: [
    "Shwetambar Palliwal Mahasangh",
    "Jain Community",
    "Palliwal Samaj",
    "Jain Events",
    "Jain News",
    "श्वेतांबर पल्लीवाल महासंघ",
    "जैन समाज",
    "पल्लीवाल समाज"
    ,    'जैन धर्म',
    'जैन मंदिर',
    'श्वेतांबर जैन',
    'पल्लीवाल समाज नेतृत्व',
    'जैन समाचार',
    'जैन त्योहार',
    'जैन समुदाय कार्यक्रम'
  ],
  authors: [{ name: "Shwetambar Palliwal Mahasangh" }],
  creator: "Shwetambar Palliwal Mahasangh",
  publisher: "Shwetambar Palliwal Mahasangh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "श्री जैन श्वेतांबर पल्लीवाल महासंघ | Official Website",
    description: "Official website of Shwetambar Palliwal Mahasangh - Connecting the Jain community through events, news, and cultural initiatives.",
    url: 'http://shwetambarpalliwalmahasangh.in',
    siteName: 'Shwetambar Palliwal Mahasangh',
    locale: 'hi_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image path
        width: 1200,
        height: 630,
        alt: 'Shwetambar Palliwal Mahasangh Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "श्री जैन श्वेतांबर पल्लीवाल महासंघ",
    description: "Official website of Shwetambar Palliwal Mahasangh",
    images: ['/twitter-image.jpg'], // Add your Twitter image path
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'm8pP88eQg3ms9b3OIrwTGLfYZpE3uTrm8PoasrmBq2g', // Add your Google verification code
  },
  alternates: {
    canonical: 'http://shwetambarpalliwalmahasangh.in',
    languages: {
      'hi-IN': 'http://shwetambarpalliwalmahasangh.in',
      'en-US': 'http://shwetambarpalliwalmahasangh.in/en',
    },
  },
};

export default function RootLayout({ children }) {
  const pathname = headers().get('x-pathname') || '';
  const isAdminPath = pathname.includes('/admin');

  return (
    <html 
      lang={isAdminPath ? "en" : "hi"}
      dir="ltr"
      suppressHydrationWarning={true}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansDevanagari.variable} antialiased`}
      >
        {isAdminPath ? (
          children
        ) : (
          <AnimatedWrapper>
            <div className="animate-fade-in min-h-screen flex flex-col">
              <Navbar />
              <main 
                className="flex-grow overflow-x-hidden animate-slide-up delay-200 
                  pt-[100px] sm:pt-[100px] md:pt-[120px] lg:pt-[140px]"
              >
                {children}
              </main>
              <Footer />
            </div>
          </AnimatedWrapper>
        )}
      </body>
    </html>
  );
}
