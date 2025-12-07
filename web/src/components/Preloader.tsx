import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { comp_name } from "@/lib/constants";

const Preloader = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-navy-dark transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center space-y-6 animate-fade-up">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-2xl animate-pulse" />
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-gold-dark flex items-center justify-center shadow-gold animate-logo-bounce">
            <span className="font-heading font-bold text-white text-3xl tracking-wide">
              {comp_name}
            </span>
          </div>
          <Sparkles className="absolute -top-4 -right-4 w-7 h-7 text-gold-light animate-spin-slow" />
        </div>
        <p className="text-primary-foreground/70 text-sm tracking-wide animate-pulse">
          Loading experience...
        </p>
      </div>
    </div>
  );
};

export default Preloader;
