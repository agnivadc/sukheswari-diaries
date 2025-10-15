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
    title: "Where It All Began",
    description: "A simple swipe right that changed everything. Who knew a dating app could lead to forever?",
    location: "Bumble",
  },
  {
    id: "first-call",
    type: "memory",
    icon: <Phone className="w-6 h-6" />,
    title: "Our First Call",
    description: "Nervous butterflies, awkward pauses, and the beginning of endless conversations.",
    easterEgg: "You had me at hello 💕",
  },
  {
    id: "dublin",
    type: "milestone",
    icon: <Building className="w-7 h-7" />,
    title: "Dublin Dreams",
    description: "Cobblestone streets, Georgian architecture, late-night talks, and falling deeper with every moment together.",
    location: "Dublin, Ireland",
    coordinates: "53.3498° N, 6.2603° W",
  },
  {
    id: "first-meeting",
    type: "memory",
    icon: <Sparkles className="w-6 h-6" />,
    title: "First Time Meeting",
    description: "Finally seeing the face that made my heart skip a beat every single time.",
    easterEgg: "Better than I ever imagined ✨",
  },
  {
    id: "video-calls",
    type: "memory",
    icon: <Video className="w-6 h-6" />,
    title: "Midnight Video Calls",
    description: "Time zones couldn't stop us. Distance made our connection stronger.",
    easterEgg: "Worth every sleepless night 🌙",
  },
  {
    id: "guwahati",
    type: "milestone",
    icon: <Plane className="w-7 h-7" />,
    title: "Guwahati Memories",
    description: "Distance couldn't dim our connection. Every video call, every text, brought us closer across continents.",
    location: "Guwahati, India",
    coordinates: "26.1445° N, 91.7362° E",
  },
  {
    id: "funny-texts",
    type: "memory",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Random Texts",
    description: "Good morning messages, random memes, and 'I miss you' at 3 AM.",
    easterEgg: "Every notification was magic 📱",
  },
  {
    id: "jorhat",
    type: "milestone",
    icon: <Home className="w-7 h-7" />,
    title: "Jorhat Moments",
    description: "Creating new memories in the heart of Assam, building our story, one beautiful chapter at a time.",
    location: "Jorhat, India",
    coordinates: "26.7509° N, 94.2037° E",
  },
  {
    id: "ldr-laughs",
    type: "memory",
    icon: <Laugh className="w-6 h-6" />,
    title: "LDR Comedy",
    description: "Frozen screens, bad wifi, and laughing through it all together.",
    easterEgg: "We made distance look easy 😄",
  },
  {
    id: "future",
    type: "milestone",
    icon: <Heart className="w-7 h-7" />,
    title: "Our Forever",
    description: "No more goodbyes at airports. Just endless tomorrows, together.",
    location: "The Future",
  },
  {
    id: "favorite-moments",
    type: "memory",
    icon: <Heart className="w-6 h-6" />,
    title: "Favorite Moments",
    description: "Every second with you is my favorite. Past, present, and future.",
    easterEgg: "Forever isn't long enough 💖",
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
            <span className="text-xs font-mono text-muted-foreground">PROJECT: LOVE STORY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
            Our Journey & Memories
          </h2>
          <p className="text-muted-foreground text-lg mb-2">
            From strangers to soulmates — mapped across continents
          </p>
          <p className="text-sm text-accent-foreground">
            💡 Click hearts on memory cards to reveal hidden messages
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                transitionDelay: `${index * 0.05}s`,
              }}
            >
              {item.type === "milestone" ? (
                <Card 
                  className="h-full border-l-4 border-l-primary hover-elevate transition-all"
                  data-testid={`milestone-${item.id}`}
                >
                  <CardContent className="p-6">
                    {/* Technical Label */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Badge variant="outline" className="text-xs font-mono mb-1">
                          MILESTONE
                        </Badge>
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
              ) : (
                <Card 
                  className="h-full border-l-4 border-l-accent hover-elevate transition-all"
                  data-testid={`memory-${item.id}`}
                >
                  <CardContent className="p-6">
                    {/* Memory Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Badge variant="outline" className="text-xs font-mono mb-1 border-accent/30">
                          MEMORY
                        </Badge>
                      </div>
                      {item.easterEgg && (
                        <button
                          onClick={() => toggleEasterEgg(item.id)}
                          className="flex-shrink-0 hover-elevate active-elevate-2 p-1 rounded-md transition-transform"
                          data-testid={`easter-egg-${item.id}`}
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors ${
                              revealedEggs.has(item.id)
                                ? "text-primary fill-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {item.easterEgg && revealedEggs.has(item.id) && (
                      <Badge
                        variant="outline"
                        className="w-full justify-center py-2 bg-primary/10 border-primary/20 text-primary animate-scaleIn"
                        data-testid={`easter-egg-message-${item.id}`}
                      >
                        {item.easterEgg}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>

        {/* Technical Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-block border border-border rounded-md px-6 py-3 bg-card/50">
            <p className="text-xs font-mono text-muted-foreground">
              DISTANCE: ~6,800 KM • TIME ZONES: GMT+0 / GMT+5:30 • STATUS: ∞ CONNECTED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
