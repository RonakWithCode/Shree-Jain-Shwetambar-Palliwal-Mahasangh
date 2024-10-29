import HeroSection from "../components/HeroSection";
import FloatingOptions from "../components/FloatingOptions";
import { AnimatedWave, GradientWave } from '../components/Waves';
import VideoTextSection from "../components/VideoTextSection";
import NewsSection from "../components/NewsSection";
import InfoCard from "../components/InfoCard";
import ImportantLinks from "../components/ImportantLinks";
import Motivationline from "../components/Motivationline";
import HomeMagazineSection from "../components/Magazine/HomeMagazineSection";
import CommunityLeaders from '../components/CommunityLeaders';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
      <HeroSection />
      <FloatingOptions />
      <AnimatedWave />
      <GradientWave className="bg-orange-50" rotate={true} />
      
      {/* Video Text Section with decorative elements */}
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-5"></div>
        <VideoTextSection />
      </div>
      
      <GradientWave rotate={true} />

      {/* News and Info Section with improved layout */}
      <section className="relative py-16">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-white to-orange-50/30"></div>
        
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-hindi bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent inline-block">
              समाचार और जानकारी
            </h2>
            <div className="flex items-center justify-center mt-4">
              <span className="w-16 h-0.5 bg-orange-300"></span>
              <span className="w-3 h-3 mx-2 rounded-full bg-orange-400"></span>
              <span className="w-16 h-0.5 bg-orange-300"></span>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Left Column - News Section */}
            <div className="lg:col-span-2 transform hover:scale-[1.01] transition-transform duration-300">
              <NewsSection />
            </div>
            
            {/* Right Column */}
            <div className="space-y-8">
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <InfoCard />
              </div>
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <ImportantLinks />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-orange-400">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-40 translate-x-1/3 translate-y-1/3 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-orange-400">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
        </div>
      </section>

      <Motivationline />
      <HomeMagazineSection />
      <CommunityLeaders />
    </div>
  );
}
