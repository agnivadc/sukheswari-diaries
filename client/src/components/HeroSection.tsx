import { useState } from "react";
import { Heart } from "lucide-react";

export default function HeroSection() {
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number }[]>([]);
  const [confettiId, setConfettiId] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newConfetti = Array.from({ length: 15 }, (_, i) => ({
      id: confettiId + i,
      x,
      y,
    }));

    setConfetti([...confetti, ...newConfetti]);
    setConfettiId(confettiId + 15);

    setTimeout(() => {
      setConfetti((prev) => prev.filter((c) => !newConfetti.find((nc) => nc.id === c.id)));
    }, 1000);
  };

  return (
    <div
      onClick={handleClick}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(135deg, hsl(var(--gradient-blush)) 0%, hsl(var(--gradient-lavender)) 50%, hsl(var(--gradient-blue)) 100%)",
      }}
      data-testid="hero-section"
    >
      {/* Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary/20 rounded-md animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-accent/30 animate-float-delayed" style={{ transform: "rotate(45deg)" }} />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border-2 border-secondary/20 rounded-full animate-float-slow" />
        <div className="absolute bottom-20 right-1/3 w-16 h-16 border-2 border-primary/25 animate-float" style={{ transform: "rotate(30deg)" }} />
        
        {/* Floating Hearts */}
        <Heart className="absolute top-1/4 left-1/4 w-8 h-8 text-primary/30 animate-float" />
        <Heart className="absolute top-1/3 right-1/4 w-6 h-6 text-accent/40 animate-float-delayed" />
        <Heart className="absolute bottom-1/3 left-1/3 w-10 h-10 text-secondary/30 animate-float-slow" />
      </div>

      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute pointer-events-none"
          style={{
            left: `${c.x}px`,
            top: `${c.y}px`,
            animation: `confettiFall 1s ease-out forwards`,
          }}
        >
          <Heart className="w-4 h-4 text-primary" />
        </div>
      ))}

      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 + 100}px) rotate(${Math.random() * 360}deg) scale(0);
            opacity: 0;
          }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4">
            Happy 28th Birthday,
          </h1>
          <h2 className="text-4xl md:text-6xl font-script text-primary mb-6">
            my love! ❤️
          </h2>
          <p className="text-2xl md:text-3xl font-serif text-foreground/80">
            From Bumble to Forever
          </p>
        </div>

        <div className="mt-12 flex gap-4 justify-center">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="w-3 h-3 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}
