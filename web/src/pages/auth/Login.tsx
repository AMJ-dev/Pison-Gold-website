import { useState, useEffect, startTransition } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Check, Sparkles, Star, Diamond, Shield, Hexagon } from "lucide-react";
import {http} from "@/lib/httpClient";
import { ApiResp } from "@/lib/types";
import heroMain from "@/assets/hero-main.jpg";
import { http_error } from "@/lib/functions";
import { comp_name } from "@/lib/constants";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		sessionStorage.removeItem("jwt");
		sessionStorage.removeItem("email");
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim() || !password.trim()) {
			toast.error("Please enter email and password");
			return;
		} 
		setIsLoading(true);
		try {
			const res = await http.post("/sign-in/", {email, password});
			const resp: ApiResp = res.data
			if(resp?.error === false && resp?.data){
				const jwt = resp?.code?.jwt;
				const email = resp?.code?.email;
	
			if (!jwt) {
				toast.error("Authentication token missing in response");
				return;
			}
			
			toast.success(String(resp?.data))
			if (rememberMe) sessionStorage.setItem('remember', 'true')
			else sessionStorage.removeItem('remember')
				sessionStorage.setItem('jwt', String(resp?.code?.jwt ?? ''))
				sessionStorage.setItem('email', String(resp?.code?.email ?? email.trim()))
				startTransition(() => navigate('/otp'))
				return;
			}
			toast.error(resp?.data || "Invalid credentials");
			
		} catch (err: any) {
			http_error(err)
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex">
			<div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 bg-background relative overflow-hidden">
				<div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
				<div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
				
				{/* Floating icons */}
				<Star className="absolute top-[15%] right-[20%] w-6 h-6 text-accent/20 animate-float" />
				<Diamond className="absolute bottom-[25%] left-[10%] w-8 h-8 text-primary/10 animate-float-slow" />
				<Hexagon className="absolute top-[40%] right-[8%] w-5 h-5 text-accent/15 animate-pulse-soft" />
				
				<div className="relative z-10 max-w-md mx-auto w-full">
				<Link to="/" className="flex items-center space-x-3 mb-12 group">
					<div className="w-12 h-12 bg-gradient-to-br from-accent to-gold-dark rounded-xl flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform duration-300">
					<span className="font-heading font-bold text-white text-lg">PG</span>
					</div>
					<span className="font-heading font-bold text-2xl text-foreground">{comp_name}</span>
				</Link>

				<div className="mb-10">
					<h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4 animate-fade-up">
					Welcome back
					</h1>
					<p className="text-muted-foreground text-lg animate-fade-up delay-100">
					Sign in to access your dashboard and manage your projects
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="animate-fade-up delay-200">
						<label className="block text-sm font-medium text-foreground mb-2">
							Email Address
						</label>
						<div className="relative group">
							<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								className="input-premium pl-12 shadow-sm focus:shadow-premium-sm"
								required
							/>
						</div>
					</div>

					<div className="animate-fade-up delay-300">
						<label className="block text-sm font-medium text-foreground mb-2">
							Password
						</label>
						<div className="relative group">
							<Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								className="input-premium pl-12 pr-12 shadow-sm focus:shadow-premium-sm"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
							>
								{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
							</button>
						</div>
					</div>

					<div className="flex items-center justify-between animate-fade-up delay-400">
						<label className="flex items-center space-x-3 cursor-pointer group">
							<div 
								onClick={() => setRememberMe(!rememberMe)}
								className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 shadow-sm ${
									rememberMe 
									? "bg-accent border-accent shadow-gold" 
									: "border-border group-hover:border-accent/50"
								}`}
							>
								{rememberMe && <Check className="w-3 h-3 text-white" />}
							</div>
							<span className="text-sm text-muted-foreground">Remember me</span>
						</label>
						<Link to="/forgot-password" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
							Forgot password?
						</Link>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full btn-gold flex items-center justify-center space-x-2 py-4 animate-fade-up delay-500 disabled:opacity-70 shadow-gold-lg hover:shadow-glow"
					>
						{isLoading ? (
							<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
						) : (
							<>
							<span>Sign In</span>
							<ArrowRight className="w-5 h-5" />
							</>
					)}
					</button>
				</form>

				<div className="divider-premium animate-fade-up delay-600">
					<span className="px-4 text-sm text-muted-foreground bg-background">or continue with</span>
				</div>

				</div>
			</div>
			<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
				<img 
					src={heroMain} 
					alt="Pison-Gold Projects" 
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-premium opacity-90" />
				
				<div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
					<div className="flex items-center space-x-2 text-white/70">
						<div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
							<Sparkles className="w-4 h-4 text-accent" />
						</div>
						<span className="text-sm font-medium">Enterprise Solutions</span>
					</div>

				<div className="absolute top-1/4 right-12 w-32 h-32 border border-white/10 rounded-full animate-spin-slow" />
				<div className="absolute top-1/3 right-24 w-20 h-20 border border-accent/30 rounded-full animate-float" />
				<div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />

				<div className="max-w-lg">
					<blockquote className="text-3xl xl:text-4xl font-heading font-bold text-white mb-6 leading-tight">
					"{comp_name} transformed our diagnostic capabilities. Their expertise exceeded every expectation."
					</blockquote>
					<div className="flex items-center space-x-4">
						<div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-gold-dark flex items-center justify-center text-white font-bold text-lg shadow-gold">
							AY
						</div>
						<div>
							<p className="text-white font-semibold">Dr. Amina Yusuf</p>
							<p className="text-white/60 text-sm">Hospital Administrator</p>
						</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	);
};

export default Login;