import { MessageCircle, Plane, Building, Home, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Milestone {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  location?: string;
}

const milestones: Milestone[] = [
  {
    id: "bumble",
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Where It All Began",
    description: "A simple swipe right that changed everything. Who knew a dating app could lead to forever?",
    location: "Bumble",
  },
  {
    id: "dublin",
    icon: <Plane className="w-8 h-8" />,
    title: "Dublin Dreams",
    description: "Cobblestone streets, late-night talks, and falling deeper with every moment together.",
    location: "Dublin",
  },
  {
    id: "guwahati",
    icon: <Building className="w-8 h-8" />,
    title: "Guwahati Memories",
    description: "Distance couldn't dim our connection. Every video call, every text, brought us closer.",
    location: "Guwahati",
  },
  {
    id: "jorhat",
    icon: <Home className="w-8 h-8" />,
    title: "Jorhat Moments",
    description: "Creating new memories, building our story, one beautiful chapter at a time.",
    location: "Jorhat",
  },
  {
    id: "future",
    icon: <Heart className="w-8 h-8" />,
    title: "Our Forever",
    description: "No more goodbyes at airports. Just endless tomorrows, together.",
    location: "The Future",
  },
];

export default function JourneyTimeline() {
  const [visibleMilestones, setVisibleMilestones] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleMilestones((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll("[data-milestone]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="py-20 px-6 bg-background" data-testid="journey-timeline">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-foreground">
          Our Journey
        </h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          From strangers to soulmates
        </p>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                id={milestone.id}
                data-milestone
                className={`relative transition-all duration-700 ${
                  visibleMilestones.has(milestone.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    {milestone.location && (
                      <p className="text-sm text-primary font-medium mb-3">
                        {milestone.location}
                      </p>
                    )}
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary border-4 border-background">
                      {milestone.icon}
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
