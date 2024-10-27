import HeroSection from "../components/HeroSection";
import FloatingOptions from "../components/FloatingOptions";
// import VideoSection from "../components/VideoSection"; // New component
import { SimpleWave, GradientWave, LayeredWave, AnimatedWave } from '../components/Waves';
import VideoTextSection from "@/components/VideoTextSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FloatingOptions />
      <AnimatedWave />
      <GradientWave rotate={true} />
      <VideoTextSection />
    </div>
  );
}
