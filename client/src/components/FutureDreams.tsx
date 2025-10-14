import { useEffect, useRef, useState } from "react";
import { Plane, Home, Camera, MapPin, Heart } from "lucide-react";

interface Dream {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const dreams: Dream[] = [
  {
    id: "travel",
    icon: <Plane className="w-6 h-6" />,
    title: "Adventures Together",
    description: "Exploring the world, hand in hand",
  },
  {
    id: "home",
    icon: <Home className="w-6 h-6" />,
    title: "Our Home",
    description: "A place that's ours, filled with love",
  },
  {
    id: "memories",
    icon: <Camera className="w-6 h-6" />,
    title: "Making Memories",
    description: "Every day a new story to tell",
  },
  {
    id: "places",
    icon: <MapPin className="w-6 h-6" />,
    title: "New Places",
    description: "Creating magic wherever we go",
  },
];

export default function FutureDreams() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-foreground">
          Our Future
        </h2>
        <p className="text-center text-foreground/80 mb-12 text-lg">
          Dreams we'll make come true
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {dreams.map((dream, index) => (
            <div
              key={dream.id}
              className="bg-background/80 backdrop-blur-sm rounded-md p-6 hover-elevate active-elevate-2 transition-all"
              style={{
                animation: "slideUp 0.6s ease-out forwards",
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
              data-testid={`dream-card-${dream.id}`}
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                {dream.icon}
              </div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                {dream.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dream.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-2xl md:text-3xl font-script text-foreground mb-4">
            Someday soon, no countdowns —
          </p>
          <p className="text-2xl md:text-3xl font-script text-foreground">
            just us, together.
          </p>
          <Heart className="w-12 h-12 text-primary fill-primary mx-auto mt-8 animate-heartbeat" />
        </div>
      </div>
    </div>
  );
}
