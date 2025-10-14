import HeroSection from "@/components/HeroSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import MemoryCards from "@/components/MemoryCards";
import BirthdayCelebration from "@/components/BirthdayCelebration";
import FutureDreams from "@/components/FutureDreams";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <JourneyTimeline />
      <MemoryCards />
      <BirthdayCelebration />
      <FutureDreams />
      <Footer />
    </div>
  );
}
