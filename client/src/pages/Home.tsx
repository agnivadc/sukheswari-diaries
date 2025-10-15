import HeroSection from "@/components/HeroSection";
import OurStory from "@/components/OurStory";
import PhotoGallery from "@/components/PhotoGallery";
import BirthdayCelebration from "@/components/BirthdayCelebration";
import FutureDreams from "@/components/FutureDreams";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <OurStory />
      <PhotoGallery />
      <BirthdayCelebration />
      <FutureDreams />
      <Footer />
    </div>
  );
}
