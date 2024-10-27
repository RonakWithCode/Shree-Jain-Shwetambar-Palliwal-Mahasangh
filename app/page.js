import Image from "next/image";
import FloatingOptions from "../components/FloatingOptions";

export default function Home() {
  return (
    <div className="space-y-8 relative">
      {/* Your existing content here */}
      <FloatingOptions />
    </div>
  );
}
