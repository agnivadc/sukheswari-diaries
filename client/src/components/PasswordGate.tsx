import { useState } from "react";
import { Heart, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface PasswordGateProps {
  onAuthenticated: () => void;
}

export default function PasswordGate({ onAuthenticated }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase() === "pinky") {
      sessionStorage.setItem("authenticated", "true");
      onAuthenticated();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: "linear-gradient(135deg, hsl(var(--gradient-blush)) 0%, hsl(var(--gradient-lavender)) 50%, hsl(var(--gradient-blue)) 100%)",
      }}
    >
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-1/4 left-1/4 w-8 h-8 text-primary/20 animate-float" />
        <Heart className="absolute top-1/3 right-1/4 w-6 h-6 text-accent/30 animate-float-delayed" />
        <Heart className="absolute bottom-1/3 left-1/3 w-10 h-10 text-secondary/20 animate-float-slow" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-background/90 backdrop-blur-xl rounded-lg p-8 shadow-2xl border border-primary/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              Private Access
            </h1>
            <p className="text-muted-foreground">
              Enter the secret word to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={shake ? "animate-shake" : ""}>
              <Input
                type="password"
                placeholder="Secret word..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`text-center text-lg ${error ? "border-destructive" : ""}`}
                autoFocus
                data-testid="password-input"
              />
              {error && (
                <p className="text-destructive text-sm text-center mt-2" data-testid="error-message">
                  Incorrect password. Try again!
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              data-testid="submit-password"
            >
              <Heart className="w-4 h-4 mr-2" />
              Unlock
            </Button>
          </form>

          {/* Decorative elements */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-border" />
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <div className="w-12 h-px bg-border" />
          </div>
        </div>
      </div>
    </div>
  );
}
