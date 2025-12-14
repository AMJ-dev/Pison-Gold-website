import { useState, useEffect, startTransition } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Star,
  Diamond,
  Hexagon,
} from "lucide-react";
import { http } from "@/lib/httpClient";
import { ApiResp } from "@/lib/types";
import heroMain from "@/assets/hero-main.jpg";
import { http_error } from "@/lib/functions";
import { comp_name } from "@/lib/constants";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { link1, link2 } = useParams();

    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (link1 && link2) {
            setIsLoading(true);
            try {
                (async() => {
                    const res = await http.post('/check-link/', { link1, link2 });
                    const resp: ApiResp = res.data;
                    if (resp?.error === false && resp?.data) return;
                    toast.error(resp?.data || "Invalid or expired reset link");
                    startTransition(() => navigate("/forgot-password"));
                })()
            } catch (error) {
                http_error(error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [link1, link2]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || !cpassword) {
        toast.error("Please fill in all fields");
        return;
        }

        if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
        }

        if (password !== cpassword) {
        toast.error("Passwords do not match");
        return;
        }

        setIsLoading(true);
        try {
        const res = await http.post("/reset-password/", {
            link1,
            link2,
            password,
            cpassword,
            where:"reset-link" 
        });

        const resp: ApiResp = res.data;

        if (resp?.error === false) {
            toast.success(String(resp?.data || "Password reset successful"));
            startTransition(() => navigate("/login"));
            return;
        }

            toast.error(String(resp?.data || "Failed to reset password"));
        } catch (err: any) {
            http_error(err);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="min-h-screen flex">
      {/* ================= LEFT ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 bg-background relative overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        {/* Floating icons */}
        <Star className="absolute top-[15%] right-[20%] w-6 h-6 text-accent/20 animate-float" />
        <Diamond className="absolute bottom-[25%] left-[10%] w-8 h-8 text-primary/10 animate-float-slow" />
        <Hexagon className="absolute top-[40%] right-[8%] w-5 h-5 text-accent/15 animate-pulse-soft" />

        <div className="relative z-10 max-w-md mx-auto w-full">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3 mb-12 group">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-gold-dark rounded-xl flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
              <span className="font-heading font-bold text-white text-lg">PG</span>
            </div>
            <span className="font-heading font-bold text-2xl text-foreground">
              {comp_name}
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4 animate-fade-up">
              Reset your password
            </h1>
            <p className="text-muted-foreground text-lg animate-fade-up delay-100">
              Choose a strong password you haven’t used before.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New password */}
            <div className="animate-fade-up delay-200">
              <label className="block text-sm font-medium text-foreground mb-2">
                New Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="input-premium pl-12 pr-12 shadow-sm focus:shadow-premium-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="animate-fade-up delay-300">
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="input-premium pl-12 shadow-sm focus:shadow-premium-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-gold flex items-center justify-center space-x-2 py-4 animate-fade-up delay-400 disabled:opacity-70 shadow-gold-lg hover:shadow-glow"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Reset Password</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-10 text-center animate-fade-up delay-500">
            <Link
              to="/login"
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={heroMain}
          alt="Secure Access"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-premium opacity-90" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
          <div className="flex items-center space-x-2 text-white/70">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm font-medium">Account Security</span>
          </div>

          <blockquote className="text-3xl xl:text-4xl font-heading font-bold text-white leading-tight max-w-lg">
            “Strong passwords protect everything you’ve built.”
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
