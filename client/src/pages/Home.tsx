import HeroSection from "@/components/HeroSection";
import GirlDollChapter from "@/components/GirlDollChapter";
import OurStory from "@/components/OurStory";
import PhotoGallery from "@/components/PhotoGallery";
import BirthdayCelebration from "@/components/BirthdayCelebration";
import FutureDreams from "@/components/FutureDreams";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <GirlDollChapter />
      <OurStory />
      <PhotoGallery />
      <BirthdayCelebration />
      <FutureDreams />
      <Footer />
    </div>
  );
}
