import { useEffect, useRef, useState } from "react";

export default function GirlDollChapter() {
  const [visibleParagraphs, setVisibleParagraphs] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-paragraph") || "0");
            setVisibleParagraphs((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.3 }
    );

    const paragraphs = sectionRef.current?.querySelectorAll("[data-paragraph]");
    paragraphs?.forEach((p) => observer.observe(p));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, hsl(var(--gradient-blush)) 0%, hsl(20 40% 96%) 100%)",
      }}
      data-testid="girl-doll-chapter"
    >
      {/* Watercolor Sketchpad Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {/* Faint Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Dublin Skyline Sketch - Left */}
        <div className="absolute left-10 top-1/4 opacity-30">
          <svg width="200" height="120" viewBox="0 0 200 120">
            <rect x="20" y="60" width="25" height="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
            <rect x="50" y="45" width="30" height="75" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
            <rect x="85" y="50" width="28" height="70" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
            <rect x="118" y="65" width="25" height="55" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
            <line x1="0" y1="120" x2="200" y2="120" stroke="currentColor" strokeWidth="1" className="text-primary" />
          </svg>
        </div>

        {/* Jorhat Skyline Sketch - Right */}
        <div className="absolute right-10 bottom-1/4 opacity-30">
          <svg width="200" height="120" viewBox="0 0 200 120">
            <rect x="25" y="65" width="22" height="55" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
            <rect x="52" y="55" width="28" height="65" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
            <rect x="85" y="48" width="32" height="72" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
            <rect x="122" y="60" width="26" height="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
            <line x1="0" y1="120" x2="200" y2="120" stroke="currentColor" strokeWidth="1" className="text-accent" />
          </svg>
        </div>
      </div>

      {/* Floating Architectural Line Art */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-20 left-1/4 w-32 h-32 border border-primary/20 rounded-full animate-float" />
        <div className="absolute bottom-32 right-1/4 w-24 h-24 border border-accent/20 rounded-full animate-float-delayed" />
        
        {/* Drafting Lines */}
        <div className="absolute top-1/3 right-20 w-40 h-px bg-primary/20 animate-float-slow" style={{ transform: "rotate(45deg)" }} />
        <div className="absolute bottom-1/3 left-20 w-48 h-px bg-accent/20 animate-float-delayed" style={{ transform: "rotate(-45deg)" }} />
        
        {/* Grid Squares */}
        <div className="absolute top-40 right-1/3 w-16 h-16 border border-primary/20 animate-float" style={{ transform: "rotate(15deg)" }} />
        <div className="absolute bottom-40 left-1/3 w-20 h-20 border border-accent/20 animate-float-slow" style={{ transform: "rotate(-20deg)" }} />
      </div>

      {/* Golden Light Rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-1/3 h-full opacity-10 animate-pulse"
          style={{
            background: "linear-gradient(to bottom, hsl(45 100% 70% / 0.4) 0%, transparent 50%)",
            transform: "skewX(-10deg)",
            animationDuration: "4s",
          }}
        />
        <div
          className="absolute top-0 right-1/4 w-1/3 h-full opacity-10 animate-pulse"
          style={{
            background: "linear-gradient(to bottom, hsl(35 100% 65% / 0.3) 0%, transparent 60%)",
            transform: "skewX(10deg)",
            animationDuration: "5s",
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Main Card */}
      <div className="relative z-10 max-w-3xl w-full">
        {/* Glassmorphism Card */}
        <div className="bg-background/80 backdrop-blur-xl rounded-lg p-8 md:p-12 shadow-2xl border border-primary/20">
          {/* Header */}
          <div className="text-center mb-8 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
              The Girl Doll Chapter
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-primary/30" />
              <span className="text-xl text-muted-foreground">28</span>
              <div className="w-12 h-px bg-primary/30" />
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p
              data-paragraph="0"
              className={`text-lg md:text-xl transition-all duration-700 ${
                visibleParagraphs.has(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Hey girl doll,
            </p>

            <p
              data-paragraph="1"
              className={`transition-all duration-700 delay-100 ${
                visibleParagraphs.has(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Happy 28th, my favorite human. You've somehow managed to make even pixels and time zones feel warm.
            </p>

            <p
              data-paragraph="2"
              className={`transition-all duration-700 delay-200 ${
                visibleParagraphs.has(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              I still remember that first Bumble chat — how I thought I was just swiping right, but turns out I was sketching the first line of something I'd want to keep forever.
            </p>

            <p
              data-paragraph="3"
              className={`transition-all duration-700 delay-300 ${
                visibleParagraphs.has(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              You've got this mix of calm and chaos that only an architect could pull off — spreadsheets and skylines, sketches and soft hearts. You make cities feel like home, and you make me want to build a life worth sharing walls with you in.
            </p>

            <p
              data-paragraph="4"
              className={`transition-all duration-700 delay-500 ${
                visibleParagraphs.has(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              I hope 28 brings you the same joy you've quietly given me — steady, thoughtful, and a little bit magic.
            </p>
          </div>

          {/* Signature */}
          <div
            className={`mt-12 text-right transition-all duration-700 delay-700 ${
              visibleParagraphs.has(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-sm md:text-base font-script text-muted-foreground italic">
              From Dublin, with all my love — A.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
