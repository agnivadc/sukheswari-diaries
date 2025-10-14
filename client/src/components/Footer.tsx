import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-card" data-testid="footer">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-card-foreground">
          <span>Built with love</span>
          <Heart className="w-4 h-4 text-primary fill-primary animate-heartbeat" />
          <span>from Dublin to Jorhat 💞</span>
        </div>
      </div>
    </footer>
  );
}
