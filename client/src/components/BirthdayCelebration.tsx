import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface Balloon {
  id: number;
  x: number;
  color: string;
  delay: number;
}

export default function BirthdayCelebration() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    const colors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"];
    const newBalloons = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + i * 11,
      color: colors[i % colors.length],
      delay: i * 0.2,
    }));
    setBalloons(newBalloons);

    setTimeout(() => setConfettiActive(true), 500);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-card to-background"
      onMouseMove={handleMouseMove}
      data-testid="birthday-celebration"
    >
      {/* Confetti Background */}
      {confettiActive && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                backgroundColor: ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"][i % 3],
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Cursor Following Hearts */}
      <div
        className="absolute pointer-events-none transition-all duration-300"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      >
        <Heart className="w-6 h-6 text-primary/50 animate-pulse" />
      </div>

      {/* Balloons */}
      <div className="absolute top-0 left-0 right-0 h-64 pointer-events-none">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="absolute bottom-0"
            style={{
              left: `${balloon.x}%`,
              animation: `float-slow 4s ease-in-out infinite`,
              animationDelay: `${balloon.delay}s`,
            }}
          >
            <div className="relative">
              <div
                className="w-12 h-16 rounded-full"
                style={{
                  backgroundColor: balloon.color,
                  boxShadow: `0 10px 20px ${balloon.color}40`,
                }}
              />
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-20 bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="text-7xl md:text-9xl font-bold text-primary animate-heartbeat">
              28
            </span>
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-script text-primary mb-6 animate-fadeIn">
          Happy Birthday!
        </h2>

        <p className="text-xl md:text-2xl text-foreground mb-4 font-serif">
          From Dublin to Jorhat,
        </p>
        <p className="text-xl md:text-2xl text-foreground font-serif">
          with all my love ❤️
        </p>

        <div className="mt-12 flex justify-center gap-3">
          <Heart className="w-8 h-8 text-primary fill-primary animate-heartbeat" />
          <Heart className="w-8 h-8 text-secondary fill-secondary animate-heartbeat" style={{ animationDelay: "0.2s" }} />
          <Heart className="w-8 h-8 text-accent fill-accent animate-heartbeat" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}
