import HeroSection from "../components/HeroSection";
import FloatingOptions from "../components/FloatingOptions";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <FloatingOptions />
      {/* Add other sections of your homepage here */}
    </div>
  );
}
