import { useEffect, useRef, useState } from "react";
import { Plane, Home, Camera, MapPin, Heart, Building2, Compass, Palette, Coffee } from "lucide-react";

interface Dream {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const dreams: Dream[] = [
  {
    id: "home-design",
    icon: <Building2 className="w-6 h-6" />,
    title: "Designing Our Home",
    description: "Sketching our dream space together, room by room",
  },
  {
    id: "city-adventures",
    icon: <Compass className="w-6 h-6" />,
    title: "Exploring Architecture",
    description: "Wandering cities, admiring buildings, and finding inspiration",
  },
  {
    id: "creative-projects",
    icon: <Palette className="w-6 h-6" />,
    title: "Creative Collaborations",
    description: "Your vision, our love story - built together",
  },
  {
    id: "cafe-planning",
    icon: <Coffee className="w-6 h-6" />,
    title: "Cozy Coffee Mornings",
    description: "Planning our future over endless cups of coffee",
  },
  {
    id: "travel",
    icon: <Plane className="w-6 h-6" />,
    title: "Urban Adventures",
    description: "From Dublin's Georgian doors to Guwahati's charm",
  },
  {
    id: "forever-home",
    icon: <Home className="w-6 h-6" />,
    title: "Our Forever Place",
    description: "Where every detail tells our story",
  },
  {
    id: "memories",
    icon: <Camera className="w-6 h-6" />,
    title: "Capturing Moments",
    description: "Building a portfolio of us",
  },
  {
    id: "places",
    icon: <MapPin className="w-6 h-6" />,
    title: "New Discoveries",
    description: "Every street, every city - together",
  },
];

export default function FutureDreams() {
  const [scrollY, setScrollY] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Countdown to November 14, 2025
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-11-14T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, window.innerHeight - rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--gradient-lavender)) 0%, hsl(var(--gradient-blue)) 50%, hsl(var(--gradient-blush)) 100%)",
      }}
      data-testid="future-dreams"
    >
      {/* Parallax Skyline Layers */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        {/* Layer 3 - Back */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,200 L0,100 L100,100 L100,80 L150,80 L150,90 L200,90 L200,70 L250,70 L250,100 L1200,100 L1200,200 Z"
              fill="currentColor"
              className="text-foreground/10"
            />
          </svg>
        </div>

        {/* Layer 2 - Middle */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,200 L0,120 L80,120 L80,90 L130,90 L130,100 L180,100 L180,85 L230,85 L230,95 L280,95 L280,120 L1200,120 L1200,200 Z"
              fill="currentColor"
              className="text-foreground/20"
            />
          </svg>
        </div>

        {/* Layer 1 - Front */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-40"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,200 L0,140 L70,140 L70,110 L120,110 L120,120 L170,120 L170,105 L220,105 L220,115 L270,115 L270,140 L1200,140 L1200,200 Z"
              fill="currentColor"
              className="text-foreground/30"
            />
          </svg>
        </div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/30 rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <p className="text-2xl md:text-3xl font-script text-foreground mb-6">
          Landing in India Permanently
        </p>
        <p className="text-lg md:text-xl text-foreground/80 mb-8">
          November 14th — Fulfilling the promise, taking the first step of togetherness
        </p>

        {/* Countdown */}
        <div className="flex justify-center gap-4 md:gap-8 mb-8" data-testid="countdown">
          <div className="text-center">
            <div className="bg-background/20 backdrop-blur-sm border border-foreground/20 rounded-md px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]">
              <div className="text-3xl md:text-5xl font-bold text-foreground" data-testid="countdown-days">
                {timeLeft.days}
              </div>
              <div className="text-xs md:text-sm text-foreground/70 font-mono mt-1">DAYS</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-background/20 backdrop-blur-sm border border-foreground/20 rounded-md px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]">
              <div className="text-3xl md:text-5xl font-bold text-foreground" data-testid="countdown-hours">
                {timeLeft.hours}
              </div>
              <div className="text-xs md:text-sm text-foreground/70 font-mono mt-1">HOURS</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-background/20 backdrop-blur-sm border border-foreground/20 rounded-md px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]">
              <div className="text-3xl md:text-5xl font-bold text-foreground" data-testid="countdown-minutes">
                {timeLeft.minutes}
              </div>
              <div className="text-xs md:text-sm text-foreground/70 font-mono mt-1">MINS</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-background/20 backdrop-blur-sm border border-foreground/20 rounded-md px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]">
              <div className="text-3xl md:text-5xl font-bold text-foreground" data-testid="countdown-seconds">
                {timeLeft.seconds}
              </div>
              <div className="text-xs md:text-sm text-foreground/70 font-mono mt-1">SECS</div>
            </div>
          </div>
        </div>

        <Heart className="w-12 h-12 text-primary fill-primary mx-auto animate-heartbeat" />
      </div>
    </div>
  );
}
