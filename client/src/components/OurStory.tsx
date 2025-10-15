import { useState, useEffect, useRef } from "react";
import { MessageCircle, Plane, Building, Home, Heart, Phone, Video, MessageSquare, Laugh, Sparkles, MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface StoryItem {
  id: string;
  type: "milestone" | "memory";
  icon: React.ReactNode;
  title: string;
  description: string;
  location?: string;
  coordinates?: string;
  easterEgg?: string;
}

const storyItems: StoryItem[] = [
  {
    id: "bumble",
    type: "milestone",
    icon: <MessageCircle className="w-7 h-7" />,
    title: "Thanks to Bumble",
    description: "How lucky we are to have found each other in the digital age. A simple algorithm brought two souls together across continents.",
    location: "The Beginning",
  },
  {
    id: "meta-connection",
    type: "milestone",
    icon: <Video className="w-7 h-7" />,
    title: "Thanks to Meta Apps",
    description: "WhatsApp calls, Instagram stories, Facebook messages - technology made our long-distance relationship possible when nothing else could.",
    location: "Dublin ↔ Jorhat",
    coordinates: "~6,800 km apart",
  },
  {
    id: "first-chance",
    type: "milestone",
    icon: <Heart className="w-7 h-7" />,
    title: "Thanks for Not Breaking the Deal",
    description: "At the first instance, we could have walked away. Thank you for taking that leap of faith and seeing what we could become.",
    location: "The Turning Point",
  },
  {
    id: "lucky-find",
    type: "milestone",
    icon: <Sparkles className="w-7 h-7" />,
    title: "How Lucky We Are",
    description: "To find someone who understands, who laughs at the same things, who makes distance feel like nothing - that's rare and beautiful.",
    location: "Here & Now",
  },
];

export default function OurStory() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [revealedEggs, setRevealedEggs] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll("[data-story-item]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const toggleEasterEgg = (id: string) => {
    setRevealedEggs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="relative py-20 px-6 bg-background" data-testid="our-story">
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Technical Header */}
        <div className="mb-12 text-center">
          <div className="inline-block border border-border rounded-md px-4 py-1 mb-4">
            <span className="text-xs font-mono text-muted-foreground">PROJECT: CONNECTION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
            Gratitude Wall
          </h2>
          <p className="text-muted-foreground text-lg mb-2">
            Gratitude for the chance encounters that shaped us
          </p>
        </div>

        {/* Architectural Illustration - 4 Cities */}
        <div className="mb-12 relative">
          <div className="flex justify-center gap-4 items-end opacity-20">
            {/* Dublin Skyline */}
            <div className="text-center">
              <svg width="80" height="60" viewBox="0 0 80 60" className="mx-auto mb-2">
                <rect x="8" y="30" width="12" height="30" fill="currentColor" className="text-primary" />
                <rect x="24" y="22" width="15" height="38" fill="currentColor" className="text-primary" />
                <rect x="43" y="26" width="13" height="34" fill="currentColor" className="text-primary" />
                <rect x="60" y="32" width="10" height="28" fill="currentColor" className="text-primary" />
              </svg>
              <span className="text-xs font-mono text-muted-foreground">Dublin</span>
            </div>

            {/* Connection Line */}
            <div className="flex-1 border-t-2 border-dashed border-primary/30 mb-6" />

            {/* Siliguri Skyline */}
            <div className="text-center">
              <svg width="80" height="60" viewBox="0 0 80 60" className="mx-auto mb-2">
                <rect x="12" y="35" width="10" height="25" fill="currentColor" className="text-accent" />
                <rect x="26" y="32" width="14" height="28" fill="currentColor" className="text-accent" />
                <rect x="44" y="28" width="16" height="32" fill="currentColor" className="text-accent" />
                <rect x="64" y="36" width="9" height="24" fill="currentColor" className="text-accent" />
              </svg>
              <span className="text-xs font-mono text-muted-foreground">Siliguri</span>
            </div>

            {/* Connection Line */}
            <div className="flex-1 border-t-2 border-dashed border-primary/30 mb-6" />

            {/* Guwahati Skyline */}
            <div className="text-center">
              <svg width="80" height="60" viewBox="0 0 80 60" className="mx-auto mb-2">
                <rect x="10" y="33" width="11" height="27" fill="currentColor" className="text-primary" />
                <rect x="25" y="26" width="15" height="34" fill="currentColor" className="text-primary" />
                <rect x="44" y="30" width="13" height="30" fill="currentColor" className="text-primary" />
                <rect x="61" y="35" width="10" height="25" fill="currentColor" className="text-primary" />
              </svg>
              <span className="text-xs font-mono text-muted-foreground">Guwahati</span>
            </div>

            {/* Connection Line */}
            <div className="flex-1 border-t-2 border-dashed border-primary/30 mb-6" />

            {/* Jorhat Skyline */}
            <div className="text-center">
              <svg width="80" height="60" viewBox="0 0 80 60" className="mx-auto mb-2">
                <rect x="11" y="34" width="10" height="26" fill="currentColor" className="text-accent" />
                <rect x="25" y="30" width="14" height="30" fill="currentColor" className="text-accent" />
                <rect x="43" y="28" width="16" height="32" fill="currentColor" className="text-accent" />
                <rect x="63" y="36" width="9" height="24" fill="currentColor" className="text-accent" />
              </svg>
              <span className="text-xs font-mono text-muted-foreground">Jorhat</span>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {storyItems.map((item, index) => (
            <div
              key={item.id}
              id={item.id}
              data-story-item
              className={`transition-all duration-700 ${
                visibleItems.has(item.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <Card 
                className="h-full border-l-4 border-l-primary hover-elevate transition-all"
                data-testid={`card-${item.id}`}
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                    {item.title}
                  </h3>

                  {item.location && (
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {item.location}
                      </span>
                    </div>
                  )}

                  {item.coordinates && (
                    <div className="text-xs font-mono text-muted-foreground mb-3 bg-muted/50 px-2 py-1 rounded">
                      {item.coordinates}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Technical Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-block border border-border rounded-md px-6 py-3 bg-card/50">
            <p className="text-xs font-mono text-muted-foreground">
              DISTANCE: ~6,800 KM • TIME ZONES: GMT+0 / GMT+5:30 • CONNECTION: ESTABLISHED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
