import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Cpu,
  Package,
  Stethoscope,
  Star,
  Shield,
  Hexagon,
  Globe,
  ChevronRight,
  Sparkles,
  Target,
  Zap,
  Users,
  CheckCircle,
  Quote,
  Award,
  Clock,
  Heart,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight
} from "lucide-react";
import { http } from "@/lib/httpClient";
import { ApiResp } from "@/lib/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import heroMain from "@/assets/hero-main.jpg";
import realEstateHero from "@/assets/real-estate-hero.jpg";
import healthcareHero from "@/assets/healthcare-hero.jpg";
import technologyHero from "@/assets/technology-hero.jpg";
import procurementHero from "@/assets/procurement-hero.jpg";
import { resolveSrc } from "@/lib/functions";

// Define SVG patterns
const GRID_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const LIGHT_GRID_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const slides = [
  { 
    image: heroMain, 
    title: "Integrated Solutions",
    subtitle: "Sustainable Impact",
    description: "Unified strategies across multiple sectors",
    gradient: "from-navy-dark/90 via-navy/70 to-navy-dark/90",
    cta: "Explore Our Approach",
    color: "gold"
  },
  { 
    image: realEstateHero, 
    title: "Real Estate Excellence",
    subtitle: "Sustainable Communities",
    description: "Crafting premium living experiences",
    gradient: "from-emerald-900/80 via-emerald-800/60 to-emerald-900/80",
    cta: "View Projects",
    color: "emerald"
  },
  { 
    image: healthcareHero, 
    title: "Healthcare Advancement",
    subtitle: "Reliable Technology & Support",
    description: "Advanced medical solutions",
    gradient: "from-blue-900/80 via-blue-800/60 to-blue-900/80",
    cta: "Learn More",
    color: "blue"
  },
  { 
    image: technologyHero, 
    title: "Technology Solutions",
    subtitle: "Secure & Scalable Infrastructure",
    description: "Digital transformation experts",
    gradient: "from-purple-900/80 via-purple-800/60 to-purple-900/80",
    cta: "Discover Solutions",
    color: "purple"
  },
];

const services = [
  {
    name: "Real Estate & Hospitality",
    icon: Building2,
    image: realEstateHero,
    blurb: "Crafting sustainable communities and premium living experiences.",
    link: "/services/real-estate",
    color: "from-emerald-500 to-emerald-700",
    bgColor: "bg-gradient-to-br from-emerald-400/10 to-emerald-600/5",
    borderColor: "border-emerald-200",
    features: ["Master Planning", "Sustainable Design", "Community Development", "Project Management"]
  },
  {
    name: "Healthcare Advancement",
    icon: Stethoscope,
    image: healthcareHero,
    blurb: "Equipping healthcare facilities with reliable tools, technology and support.",
    link: "/services/healthcare",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-gradient-to-br from-blue-400/10 to-blue-600/5",
    borderColor: "border-blue-200",
    features: ["Medical Equipment", "Facility Planning", "Technology Integration", "Training"]
  },
  {
    name: "Technology Solutions",
    icon: Cpu,
    image: technologyHero,
    blurb: "Designing secure, scalable digital infrastructure for modern organizations.",
    link: "/services/technology",
    color: "from-purple-500 to-purple-700",
    bgColor: "bg-gradient-to-br from-purple-400/10 to-purple-600/5",
    borderColor: "border-purple-200",
    features: ["Cybersecurity", "Cloud Infrastructure", "Digital Transformation", "IT Consulting"]
  },
  {
    name: "Strategic Procurement",
    icon: Package,
    image: procurementHero,
    blurb: "Managing sourcing, logistics and supply chains with integrity and precision.",
    link: "/services/procurement",
    color: "from-amber-500 to-amber-700",
    bgColor: "bg-gradient-to-br from-amber-400/10 to-amber-600/5",
    borderColor: "border-amber-200",
    features: ["Supply Chain Optimization", "Vendor Management", "Logistics", "Cost Analysis"]
  },
];

const stats = [
  { value: 6, label: "Years of Excellence", icon: Star, suffix: "+", description: "Industry experience" },
  { value: 4, label: "Core Sectors", icon: Hexagon, description: "Integrated solutions" },
  { value: 50, label: "Projects Completed", icon: Award, suffix: "+", description: "Successful delivery" },
  { value: 100, label: "Client Satisfaction", icon: Heart, suffix: "%", description: "Happy clients" },
  { value: 15, label: "States Covered", icon: MapPin, suffix: "+", description: "Nationwide presence" },
  { value: 24, label: "Hour Response", icon: Clock, description: "Support time" },
];

const valueProps = [
  {
    title: "Integrated Approach",
    description: "Multiple sectors, one cohesive strategy for maximum impact",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Proven Results",
    description: "Track record of successful projects across diverse industries",
    icon: Target,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Operational Excellence",
    description: "Streamlined processes that drive efficiency and value",
    icon: Zap,
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Strategic Partnership",
    description: "Long-term collaboration focused on your success",
    icon: Users,
    color: "from-amber-500 to-orange-500"
  }
];

const partners = [
  { name: "Ministry of Health", logo: "🏛️" },
  { name: "Lagos State Govt", logo: "🌆" },
  { name: "First Bank", logo: "🏦" },
  { name: "MTN Nigeria", logo: "📱" },
  { name: "Dangote Group", logo: "🏭" },
  { name: "Shell Nigeria", logo: "🛢️" },
];

function useCountOnView(targetNumber: number, inView: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.floor((targetNumber / (duration / 16)) || 1));
    const id = setInterval(() => {
      start += step;
      if (start >= targetNumber) {
        setValue(targetNumber);
        clearInterval(id);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [inView, targetNumber]);
  return value;
}

const heroVariants = {
  container: { transition: { staggerChildren: 0.15 } },
  title: {
    hidden: { y: 60, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  },
  subtitle: {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.1 } },
  },
  description: {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } },
  },
  cta: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.3 } },
  },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

const fadeInUp = {
  hidden: { y: 50, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const Index: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 50 }, [
    Autoplay({ delay: 7000, stopOnInteraction: false }),
  ]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isHoveredService, setIsHoveredService] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const isStatsInView = useInView(statsRef, { threshold: 0.2, once: true });
  const statValues = stats.map((s) => useCountOnView(s.value, isStatsInView));

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => setActiveSlide(emblaApi.selectedScrollSnap());
      emblaApi.on('select', onSelect);
      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi]);

  useEffect(() => {
    if (isStatsInView) controls.start("show");
  }, [controls, isStatsInView]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await http.get("/get-testimonies/");
        const resp: ApiResp = res.data;
        if (resp.error === false && resp.data) setTestimonials(resp.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 antialiased overflow-hidden">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] overflow-hidden">
        <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
          <div className="flex h-full">
            {slides.map((slide, i) => (
              <div key={i} className="relative flex-[0_0_100%] min-w-0">
                {/* Background Image with Parallax */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                  animate={{
                    scale: i === activeSlide ? 1.1 : 1,
                  }}
                  transition={{ duration: 20 }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`relative w-12 h-1.5 rounded-full transition-all duration-500 ${
                i === activeSlide 
                  ? "bg-gold scale-110" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
            >
              {i === activeSlide && (
                <motion.div
                  className="absolute inset-0 bg-gold rounded-full"
                  layoutId="activeSlide"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl"
              >
                <motion.div
                  variants={heroVariants.container}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div
                    variants={heroVariants.title}
                    className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-8 border border-white/20"
                  >
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-white/90 text-sm font-medium tracking-wider uppercase">
                      Excellence in Action
                    </span>
                  </motion.div>

                  <motion.h1
                    variants={heroVariants.title}
                    className="text-white font-heading leading-tight text-5xl md:text-7xl lg:text-8xl font-black"
                  >
                    {slides[activeSlide].title}
                  </motion.h1>

                  <motion.div
                    variants={heroVariants.subtitle}
                    className="mt-6"
                  >
                    <div className="text-2xl md:text-3xl text-white/90 font-light tracking-wide">
                      {slides[activeSlide].subtitle}
                    </div>
                    <div className="mt-3 text-white/70 text-lg">
                      {slides[activeSlide].description}
                    </div>
                  </motion.div>

                  <motion.div
                    variants={heroVariants.cta}
                    className="mt-12 flex flex-col sm:flex-row gap-4 items-start"
                  >
                    <Link
                      to="/contact"
                      className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl shadow-gold/40 hover:shadow-gold/60 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                    >
                      <span>Start Your Project</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 rounded-2xl border-2 border-gold/30 group-hover:border-gold/50 transition-colors" />
                    </Link>
                    
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-4">
              Trusted By Industry Leaders
            </h3>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Partnering with organizations that share our commitment to excellence
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col items-center"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <div className="text-gray-600 text-sm font-medium group-hover:text-gray-900 transition-colors">
                  {partner.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full text-gold font-semibold mb-6">
              <Target className="w-4 h-4" />
              Our Value Proposition
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Why Choose
              <span className="text-gradient-gold"> Pison-Gold</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We combine deep sector expertise with integrated solutions to deliver 
              measurable results and sustainable value.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, i) => {
              const Icon = prop.icon;
              return (
                <motion.div
                  key={prop.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  custom={i}
                  whileHover="hover"
                  className="group relative bg-white p-8 rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prop.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{prop.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{prop.description}</p>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${prop.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section ref={statsRef} className="py-24 relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-dark">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{ backgroundImage: GRID_PATTERN }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/80 via-navy/60 to-navy-dark/80" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {stats.map((s, idx) => {
              const Icon = s.icon;
              const value = statValues[idx];
              return (
                <motion.div
                  key={s.label}
                  variants={cardVariants}
                  className="text-center group"
                >
                  <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-gold to-accent rounded-2xl flex items-center justify-center shadow-2xl">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-5xl font-heading font-bold text-white mb-2">
                    {value}
                    <span className="text-gold">{s.suffix || ""}</span>
                  </div>
                  <div className="text-white/90 font-semibold text-lg mb-1">
                    {s.label}
                  </div>
                  {s.description && (
                    <div className="text-white/60 text-sm">{s.description}</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gold/10 rounded-full text-gold font-semibold mb-6">
              <Hexagon className="w-4 h-4" />
              Our Services
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Integrated
              <span className="text-gradient-gold"> Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive services designed to meet your unique needs across 
              multiple sectors with precision and excellence.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((s, i) => {
              const Icon = s.icon;
              const isHovered = isHoveredService === i;
              return (
                <motion.div
                  key={s.name}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={cardVariants}
                  custom={i}
                  whileHover="hover"
                  onHoverStart={() => setIsHoveredService(i)}
                  onHoverEnd={() => setIsHoveredService(null)}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover"
                      animate={{ scale: isHovered ? 1.1 : 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className={`absolute inset-0 ${s.bgColor}`} />
                    
                    {/* Service Icon */}
                    <div className={`absolute top-6 left-6 w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-2xl`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="font-heading text-2xl font-bold mb-4">
                      {s.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {s.blurb}
                    </p>

                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {s.features.map((feature, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4 text-gold" />
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={s.link}
                      className="group/link inline-flex items-center gap-3 text-gold font-semibold hover:text-gold-dark transition-colors"
                    >
                      <span>Explore Service</span>
                      <ArrowUpRight className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Hover Border Effect */}
                  <div className={`absolute inset-0 border-2 ${s.borderColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-900 via-navy-dark to-gray-900">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: GRID_PATTERN }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-navy-dark/80 to-gray-900/90" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gold/20 backdrop-blur-sm rounded-full text-gold font-semibold mb-6">
              <Quote className="w-4 h-4" />
              Client Testimonials
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mb-6">
              What Our
              <span className="text-gradient-gold"> Clients</span>
              Say
            </h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
              Discover why industry leaders trust us with their most important projects.
            </p>
          </motion.div>

          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  custom={i}
                  whileHover="hover"
                  className="group bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 hover:border-gold/30 transition-all duration-500"
                >
                  <Quote className="w-12 h-12 text-gold/30 mb-6" />
                  
                  <blockquote className="text-white/90 text-lg italic mb-8 leading-relaxed">
                    "{(t as any).testimonial}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={resolveSrc((t as any).image)}
                        alt={(t as any).full_name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden w-12 h-12 rounded-full bg-gradient-to-br from-gold to-accent flex items-center justify-center text-white font-bold text-lg">
                        {(t as any).full_name?.charAt(0) || "C"}
                      </div>
                    </div>
                    <div>
                      <div className="font-heading font-bold text-white">
                        {(t as any).full_name}
                      </div>
                      <div className="text-white/60">
                        {(t as any).position}
                      </div>
                      {(t as any).company && (
                        <div className="text-gold text-sm font-medium">
                          {(t as any).company}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Quote className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">Loading testimonials...</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: LIGHT_GRID_PATTERN }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90" />
        </div>
        
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold/10 to-accent/10 rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="font-semibold text-gold">Ready to Transform Your Business?</span>
            </div>
            
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8">
              Let's Build
              <span className="text-gradient-gold"> Together</span>
            </h2>
            
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Partner with us for integrated solutions that drive growth, efficiency, 
              and sustainable value across all sectors.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-gold to-gold-dark text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-gold/40 hover:shadow-gold/60 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-gold-dark to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-2xl border-2 border-gold/40 group-hover:border-gold/60 transition-colors" />
              </Link>
              
              <Link
                to="/projects"
                className="group inline-flex items-center gap-4 border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-2xl font-semibold text-lg hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300"
              >
                <span>View Our Work</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>

            <p className="mt-10 text-gray-500 text-sm">
              <span className="inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold" />
                Free Consultation • No Obligation • Tailored Solutions
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* QUICK CONTACT BANNER */}
      <section className="py-12 bg-gradient-to-r from-navy-dark via-navy to-navy-dark">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-white/80">Contact us today for a free consultation</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:+2341234567890" 
                className="inline-flex items-center gap-3 bg-white text-navy-dark px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call Us</span>
              </a>
              <a 
                href="mailto:info@pison-gold.com" 
                className="inline-flex items-center gap-3 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;