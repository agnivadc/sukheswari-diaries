import { useState } from "react";
import { Heart, Phone, Video, MessageSquare, Laugh, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface Memory {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  easterEgg?: string;
}

const memories: Memory[] = [
  {
    id: "first-call",
    icon: <Phone className="w-6 h-6" />,
    title: "Our First Call",
    description: "Nervous butterflies, awkward pauses, and the beginning of endless conversations.",
    easterEgg: "You had me at hello 💕",
  },
  {
    id: "first-meeting",
    icon: <Sparkles className="w-6 h-6" />,
    title: "First Time Meeting",
    description: "Finally seeing the face that made my heart skip a beat every single time.",
    easterEgg: "Better than I ever imagined ✨",
  },
  {
    id: "video-calls",
    icon: <Video className="w-6 h-6" />,
    title: "Midnight Video Calls",
    description: "Time zones couldn't stop us. Distance made our connection stronger.",
    easterEgg: "Worth every sleepless night 🌙",
  },
  {
    id: "funny-texts",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Random Texts",
    description: "Good morning messages, random memes, and 'I miss you' at 3 AM.",
    easterEgg: "Every notification was magic 📱",
  },
  {
    id: "ldr-laughs",
    icon: <Laugh className="w-6 h-6" />,
    title: "LDR Comedy",
    description: "Frozen screens, bad wifi, and laughing through it all together.",
    easterEgg: "We made distance look easy 😄",
  },
  {
    id: "favorite-moments",
    icon: <Heart className="w-6 h-6" />,
    title: "Favorite Moments",
    description: "Every second with you is my favorite. Past, present, and future.",
    easterEgg: "Forever isn't long enough 💖",
  },
];

export default function MemoryCards() {
  const [revealedEggs, setRevealedEggs] = useState<Set<string>>(new Set());

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
    <div className="py-20 px-6 bg-card" data-testid="memory-cards">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-card-foreground">
          Our Memories
        </h2>
        <p className="text-center text-muted-foreground mb-4 text-lg">
          Moments that made us, us
        </p>
        <p className="text-center text-sm text-accent-foreground mb-12">
          💡 Click the hearts to reveal secret messages
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, index) => (
            <Card
              key={memory.id}
              className="hover-elevate transition-all duration-300"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "scaleIn 0.5s ease-out forwards",
                opacity: 0,
              }}
              data-testid={`memory-card-${memory.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    {memory.icon}
                  </div>
                  {memory.easterEgg && (
                    <button
                      onClick={() => toggleEasterEgg(memory.id)}
                      className="ml-auto hover-elevate active-elevate-2 p-2 rounded-md transition-transform"
                      data-testid={`easter-egg-${memory.id}`}
                    >
                      <Heart
                        className={`w-6 h-6 transition-colors ${
                          revealedEggs.has(memory.id) ? "text-primary fill-primary" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  )}
                </div>

                <h3 className="text-xl font-serif font-bold text-card-foreground mb-2">
                  {memory.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {memory.description}
                </p>

                {memory.easterEgg && revealedEggs.has(memory.id) && (
                  <Badge
                    variant="outline"
                    className="w-full justify-center py-2 bg-primary/10 border-primary/20 text-primary animate-scaleIn"
                    data-testid={`easter-egg-message-${memory.id}`}
                  >
                    {memory.easterEgg}
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
