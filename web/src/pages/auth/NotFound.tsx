import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Ghost, Sparkles, Triangle, Diamond } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-6">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/60 via-navy/40 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/10 blur-3xl rounded-full" />

      {/* Floating Shapes */}
      <Diamond className="absolute top-[20%] left-[15%] w-10 h-10 text-accent/20 animate-float" />
      <Sparkles className="absolute bottom-[25%] right-[12%] w-8 h-8 text-gold-light/30 animate-pulse-soft" />
      <Triangle className="absolute top-[55%] right-[20%] w-8 h-8 text-primary/15 animate-float-slow" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl"
      >

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mb-10"
        >
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-accent to-gold-dark rounded-3xl flex items-center justify-center shadow-gold-lg">
            <Ghost className="w-24 h-24 text-white opacity-90" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-7xl md:text-8xl font-bold text-foreground"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-2xl md:text-3xl font-semibold text-foreground/80"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-muted-foreground text-lg mx-auto max-w-lg"
        >
          The page you're looking for doesn't exist, was moved, or is temporarily unavailable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10"
        >
          <Link
            to="/"
            className="btn-gold inline-flex items-center space-x-2 px-8 py-4 text-lg shadow-gold-lg hover:shadow-glow transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back Home</span>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default NotFound;
