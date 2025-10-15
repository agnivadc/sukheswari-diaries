import HeroSection from "@/components/HeroSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import PhotoGallery from "@/components/PhotoGallery";
import MemoryCards from "@/components/MemoryCards";
import BirthdayCelebration from "@/components/BirthdayCelebration";
import FutureDreams from "@/components/FutureDreams";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <JourneyTimeline />
      <PhotoGallery />
      <MemoryCards />
      <BirthdayCelebration />
      <FutureDreams />
      <Footer />
    </div>
  );
}
