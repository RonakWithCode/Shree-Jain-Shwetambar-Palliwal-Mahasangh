import HeroSection from "../components/HeroSection";
import FloatingOptions from "../components/FloatingOptions";
import { AnimatedWave, GradientWave } from '../components/Waves';
import VideoTextSection from "../components/VideoTextSection";
import NewsSection from "../components/NewsSection";
import InfoCard from "../components/InfoCard";
import ImportantLinks from "../components/ImportantLinks";
import Motivationline from "../components/Motivationline";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FloatingOptions />
      <AnimatedWave />
      <GradientWave rotate={true} />
      <VideoTextSection />
      
      <GradientWave rotate={true} />
      {/* <AnimatedWave /> */}
      {/* News and Info Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - News Section */}
          <div className="lg:col-span-2">
            <NewsSection />
          </div>
          
          {/* Right Column - Info Card and Important Links */}
          <div className="space-y-6">
            <InfoCard />
            <ImportantLinks />
          </div>
        </div>


      </div>

      <Motivationline />
    </div>
  );
}
