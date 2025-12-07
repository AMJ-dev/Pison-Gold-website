import { useState, useRef, useEffect, useContext, startTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Shield,
  CheckCircle,
  Mail,
  Star,
  Diamond,
  Sparkles,
  Lock
} from "lucide-react";
import { toast } from "react-toastify";
import { http } from "@/lib/httpClient";
import { ApiResp } from "@/lib/types";
import { http_error } from "@/lib/functions";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";
import { useLocationInfo } from "@/hooks/useLocationInfo";
import userContext from "@/lib/userContext";
import heroMain from "@/assets/hero-main.jpg";

const OTP = () => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  const { login } = context;
  const deviceInfo = useDeviceInfo();
  const { locationInfo } = useLocationInfo();

  const [jwt, setJwt] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const JWT = sessionStorage.getItem("jwt");
    const Email = sessionStorage.getItem("email");
    if (!JWT || !Email) {
      startTransition(() => navigate("/login"));
      return;
    }
    setJwt(JWT);
    setEmail(Email);
  }, []);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (!canResend && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) setCanResend(true);
  }, [countdown, canResend]);

  const formatDeviceInfo = () =>
    `${deviceInfo.browser} on ${deviceInfo.os} (${deviceInfo.deviceType})`;

  const formatLocationInfo = () =>
    locationInfo
      ? `${locationInfo.city}, ${locationInfo.region}, ${locationInfo.country}`
      : "Location not available";

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const arr = [...otp];
    arr[i] = val.slice(-1);
    setOtp(arr);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;
    const arr = [...otp];
    pasted.split("").forEach((c, i) => {
      arr[i] = c;
    });
    setOtp(arr);
    inputRefs.current[Math.min(pasted.length - 1, 5)]?.focus();
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter all 6 digits");
      return;
    }

    setIsLoading(true);
    try {
      const emailSession = sessionStorage.getItem("email");
      if (!emailSession) {
        toast.error("Session expired");
        navigate("/login");
        return;
      }

      const res = await http.post("/verify-otp/", {
        email: emailSession,
        otp: code,
        jwt,
        device_info: formatDeviceInfo(),
        location_info: formatLocationInfo()
      });

      const resp: ApiResp = res.data;
      if (resp.error) {
        toast.error(resp.data || "Invalid code");
        return;
      }

      toast.success("Identity verified!");
      login({ token: resp.code?.jwt, remember: true });

      const page = sessionStorage.getItem("redirect") || `/dashboard`;
      sessionStorage.removeItem("redirect");

      setTimeout(() => (location.href = page), 1000);
    } catch (err) {
      http_error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setIsLoading(true);
    try {
      const res = await http.post("/resend-otp/", { jwt });
      const resp: ApiResp = res.data;

      if (!resp.error) {
        toast.success("New code sent");
        setCountdown(30);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        return;
      }

      toast.error(resp.data || "Failed to resend");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to resend");
    } finally {
      setIsLoading(false);
    }
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 px-8 sm:px-16 lg:px-20 py-14 bg-background relative overflow-hidden flex items-center">
        <div className="absolute top-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <Shield className="absolute top-[20%] right-[14%] w-8 h-8 text-accent/10 animate-float" />
        <Lock className="absolute bottom-[30%] left-[10%] w-6 h-6 text-primary/10 animate-float-slow" />

        <div className="relative z-10 w-full max-w-md mx-auto">
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-14"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to login</span>
          </Link>

          <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-accent to-gold-dark rounded-xl flex items-center justify-center shadow-gold">
              <Shield className="w-7 h-7 text-white" />
            </div>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">Verify your email</h1>
          <p className="text-muted-foreground text-lg mb-10">
            We've sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>
          </p>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between gap-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    className={`otp-input w-full aspect-square text-3xl ${
                      otp[i]
                        ? "border-accent bg-accent/5 ring-2 ring-accent/20 shadow-gold"
                        : "border-border hover:border-accent/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isComplete || isLoading}
              className="w-full btn-gold py-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Verify Email</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="text-center">
              {!canResend ? (
                <p className="text-muted-foreground text-sm">
                  Resend available in <span className="text-accent font-semibold">{countdown}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="inline-flex items-center gap-2 text-accent font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Resend code
                </button>
              )}
            </div>
          </div>

          <div className="mt-12 p-4 bg-muted/50 rounded-xl border border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">Check your spam folder</p>
                <p className="text-xs text-muted-foreground">
                  If you don't see the email, check spam or junk folders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={heroMain} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />

        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div className="flex items-center gap-2 text-white/70">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm font-medium">Secure Verification</span>
          </div>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="relative">
              <div className="absolute inset-0 w-48 h-48 border border-white/10 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 w-40 h-40 border border-white/20 rounded-full animate-pulse-soft" />
              <div className="absolute inset-8 w-32 h-32 border border-white/30 rounded-full animate-float" />

              <Star className="absolute -top-4 -right-4 w-6 h-6 text-accent/40 animate-float" />
              <Diamond className="absolute -bottom-2 -left-6 w-5 h-5 text-white/20 animate-float-slow" />
              <Sparkles className="absolute top-1/2 -right-8 w-4 h-4 text-accent/30 animate-pulse-soft" />

              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-accent to-gold-dark rounded-2xl flex items-center justify-center shadow-gold-lg">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <h2 className="text-white font-heading text-2xl font-bold mt-8 text-center">
              Your security is our priority
            </h2>
            <p className="text-white/60 text-center mt-2 max-w-xs">
              Two-factor authentication protects your account by verifying your identity.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { value: "256-bit", label: "Encryption" },
              { value: "24/7", label: "Monitoring" },
              { value: "100%", label: "Secure" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <p className="text-2xl font-heading font-bold text-accent">{stat.value}</p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
