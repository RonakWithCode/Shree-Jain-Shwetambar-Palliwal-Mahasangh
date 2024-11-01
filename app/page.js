import dynamic from 'next/dynamic';
import { Suspense, lazy } from 'react';

// Static imports for critical components
import NewsUpdate from '../components/NewsUpdate';
import HeroSection from '../components/HeroSection';
import { AnimatedWave, GradientWave } from '../components/Waves';

// Dynamic imports for non-critical components
const FloatingOptions = dynamic(() => import('../components/FloatingOptions'), {
  loading: () => <div className="h-20" />,
  ssr: false
});

const VideoTextSection = dynamic(() => import('../components/VideoTextSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 rounded-lg" />
});

const NewsSection = dynamic(() => import('../components/NewsSection'));
const InfoCard = dynamic(() => import('../components/InfoCard'));
const ImportantLinks = dynamic(() => import('../components/ImportantLinks'));
const Motivationline = dynamic(() => import('../components/Motivationline'));
const HomeMagazineSection = dynamic(() => import('../components/Magazine/HomeMagazineSection'));
const CommunityLeaders = dynamic(() => import('../components/CommunityLeaders'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-32 animate-pulse bg-gray-100 rounded-lg" />
);

// Decorative SVG components
const CircleDecoration = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="40" className="fill-current" />
  </svg>
);

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white via-orange-50/30 to-white overflow-x-hidden">
      {/* News Update Section */}
      <section className="relative z-10 max-w-full">
        <Suspense fallback={<LoadingFallback />}>
          <NewsUpdate />
        </Suspense>
      </section>

      {/* Hero Section */}
      <section className="relative z-10 mt-4 max-w-full">
        <HeroSection />
      </section>
      
      {/* Floating Options and Waves */}
      <div className="max-w-full">
        <Suspense fallback={<LoadingFallback />}>
          <FloatingOptions />
        </Suspense>
        <AnimatedWave />
        <GradientWave className="bg-orange-50" rotate={true} />
      </div>
      
      {/* Video Section */}
      <section className="relative max-w-full">
        <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-5" 
          aria-hidden="true" />
        <Suspense fallback={<LoadingFallback />}>
          <VideoTextSection />
        </Suspense>
      </section>
      
      <div className="max-w-full">
        <GradientWave className="bg-orange-50/50" rotate={true} />
      </div>

      {/* News and Information Section */}
      <section className="relative py-8 sm:py-12 lg:py-16 max-w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-white to-orange-50/30" 
          aria-hidden="true" />
        
        <div className="container mx-auto px-4">
          <header className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-hindi 
              bg-gradient-to-r from-orange-600 to-red-500 
              bg-clip-text text-transparent inline-block">
              समाचार और जानकारी
            </h2>
            <div className="flex items-center justify-center mt-4">
              <span className="w-12 sm:w-16 h-0.5 bg-orange-300" />
              <span className="w-2 sm:w-3 h-2 sm:h-3 mx-2 rounded-full bg-orange-400" />
              <span className="w-12 sm:w-16 h-0.5 bg-orange-300" />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative">
            <div className="lg:col-span-2">
              <Suspense fallback={<LoadingFallback />}>
                <NewsSection />
              </Suspense>
            </div>
            
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <Suspense fallback={<LoadingFallback />}>
                <InfoCard />
              </Suspense>
              <Suspense fallback={<LoadingFallback />}>
                <ImportantLinks />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <CircleDecoration className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 
          -translate-x-1/2 -translate-y-1/2 text-orange-400 opacity-10" />
        <CircleDecoration className="absolute bottom-0 right-0 w-32 sm:w-40 h-32 sm:h-40 
          translate-x-1/3 translate-y-1/3 text-orange-400 opacity-10" />
      </section>

      {/* Bottom Sections */}
      <div className="max-w-full space-y-8 sm:space-y-12">
        <Suspense fallback={<LoadingFallback />}>
          <Motivationline />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <HomeMagazineSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <CommunityLeaders />
        </Suspense>
      </div>
    </div>
  );
}
