import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useAnimation, useInView } from "framer-motion";
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

// Define SVG patterns as constants to avoid quoting issues
const GRID_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const LIGHT_GRID_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const slides = [
  { 
    image: heroMain, 
    title: "Integrated Solutions",
    subtitle: "Sustainable Impact",
    gradient: "from-navy-dark/90 via-navy/70 to-navy-dark/90"
  },
  { 
    image: realEstateHero, 
    title: "Real Estate Excellence",
    subtitle: "Sustainable Communities",
    gradient: "from-emerald-900/80 via-emerald-800/60 to-emerald-900/80"
  },
  { 
    image: healthcareHero, 
    title: "Healthcare Advancement",
    subtitle: "Reliable Technology & Support",
    gradient: "from-blue-900/80 via-blue-800/60 to-blue-900/80"
  },
  { 
    image: technologyHero, 
    title: "Technology Solutions",
    subtitle: "Secure & Scalable Infrastructure",
    gradient: "from-purple-900/80 via-purple-800/60 to-purple-900/80"
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
    features: ["Master Planning", "Sustainable Design", "Community Development"]
  },
  {
    name: "Healthcare Advancement",
    icon: Stethoscope,
    image: healthcareHero,
    blurb: "Equipping healthcare facilities with reliable tools, technology and support.",
    link: "/services/healthcare",
    color: "from-blue-500 to-blue-700",
    features: ["Medical Equipment", "Facility Planning", "Technology Integration"]
  },
  {
    name: "Technology Solutions",
    icon: Cpu,
    image: technologyHero,
    blurb: "Designing secure, scalable digital infrastructure for modern organizations.",
    link: "/services/technology",
    color: "from-purple-500 to-purple-700",
    features: ["Cybersecurity", "Cloud Infrastructure", "Digital Transformation"]
  },
  {
    name: "Strategic Procurement",
    icon: Package,
    image: procurementHero,
    blurb: "Managing sourcing, logistics and supply chains with integrity and precision.",
    link: "/services/procurement",
    color: "from-amber-500 to-amber-700",
    features: ["Supply Chain Optimization", "Vendor Management", "Logistics"]
  },
];

const stats = [
  { value: 6, label: "Years of Excellence", icon: Star, suffix: "+" },
  { value: 4, label: "Core Business Sectors", icon: Hexagon },
  { value: 100, label: "Regulatory Compliance", icon: Shield, suffix: "%" },
  { value: 1, label: "Integrated Partner", icon: Globe, description: "Unified Strategy" },
];

const valueProps = [
  {
    title: "Integrated Approach",
    description: "Multiple sectors, one cohesive strategy for maximum impact",
    icon: Sparkles
  },
  {
    title: "Proven Results",
    description: "Track record of successful projects across diverse industries",
    icon: Target
  },
  {
    title: "Operational Excellence",
    description: "Streamlined processes that drive efficiency and value",
    icon: Zap
  },
  {
    title: "Strategic Partnership",
    description: "Long-term collaboration focused on your success",
    icon: Users
  }
];

function useCountOnView(targetNumber: number, inView: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
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
  container: { transition: { staggerChildren: 0.12 } },
  title: {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  },
  subtitle: {
    hidden: { y: 24, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7, delay: 0.1 } },
  },
  cta: {
    hidden: { y: 16, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    y: -8,
    transition: { duration: 0.3 }
  }
};

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Index: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000 }),
  ]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [testimonialRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000 }),
  ]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isHoveredService, setIsHoveredService] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const isStatsInView = useInView(statsRef, { threshold: 0.3, once: true });
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
    <div className="min-h-screen bg-background text-foreground antialiased overflow-hidden">
      <Header />

      {/* HERO SECTION */}
      <div className="relative">
        <div ref={emblaRef} className="h-[85vh] lg:h-[90vh] overflow-hidden">
          <div className="flex h-full">
            {slides.map((slide, i) => (
              <div key={i} className="flex-[0_0_100%] relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transform-gpu transition-transform duration-1000 scale-110"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeSlide 
                  ? "w-8 bg-gold" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={heroVariants.container}
          className="absolute inset-0 flex items-center"
        >
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-white/90 text-sm font-medium tracking-wider">
                  NIGERIA'S MULTI-SECTOR PARTNER
                </span>
              </div>

              <motion.h1
                variants={heroVariants.title}
                className="text-white font-heading leading-tight text-5xl md:text-7xl lg:text-8xl font-bold"
              >
                Integrated
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-accent to-gold-light">
                  Solutions
                </span>
              </motion.h1>

              <motion.p
                variants={heroVariants.subtitle}
                className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl font-light tracking-wide"
              >
                Pison-Gold delivers unified Real Estate, Healthcare, Technology 
                and Procurement strategies that drive sustainable development 
                and measurable national impact.
              </motion.p>

              <motion.div
                variants={heroVariants.cta}
                className="mt-10 flex flex-col sm:flex-row gap-4 items-start"
              >
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl shadow-gold/30 hover:shadow-gold/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-2xl border-2 border-gold/30 group-hover:border-gold/50 transition-colors" />
                </Link>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-medium text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  <span>Our Integrated Approach</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* VALUE PROPOSITION SECTION */}
      <section className="py-20 bg-gradient-to-b from-background to-navy-dark/5">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold mb-6">
              <Target className="w-4 h-4" />
              Why Choose Pison-Gold
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Beyond Traditional
              <br />
              <span className="text-gradient-gold">Consulting</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              We provide integrated solutions that connect sectors, optimize investments, 
              and deliver sustainable value through strategic partnership.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="group bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-border/50 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex flex-col items-start">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-gold-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{prop.title}</h3>
                    <p className="text-muted-foreground">{prop.description}</p>
                    <div className="mt-6 w-12 h-1 bg-gradient-to-r from-accent to-gold-dark rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section ref={statsRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-primary to-navy opacity-90" />
        <div 
          className="absolute inset-0"
          style={{ backgroundImage: GRID_PATTERN }}
        />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
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
                    <div className="relative w-16 h-16 bg-gradient-to-br from-accent to-gold-dark rounded-2xl flex items-center justify-center shadow-2xl">
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
      <section id="services" className="py-24 bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold mb-6">
              <Hexagon className="w-4 h-4" />
              Our Integrated Ecosystem
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Engineering
              <span className="text-gradient-gold"> Synergy</span>
              <br />
              Across Sectors
            </h2>
            <p className="text-xl text-muted-foreground">
              By aligning multiple sectors under one unified strategy, we help clients 
              achieve resilient outcomes, optimized investments, and long-term value.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.name}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={cardVariants}
                  custom={i}
                  whileHover="hover"
                  onHoverStart={() => setIsHoveredService(i)}
                  onHoverEnd={() => setIsHoveredService(null)}
                  className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${s.color} opacity-20`} />
                    
                    {/* Animated Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
                    </div>
                  </div>

                  <div className="p-8 relative">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl font-bold mb-2">
                          {s.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {s.blurb}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {s.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary/50 rounded-full text-sm"
                          >
                            <CheckCircle className="w-3 h-3 text-accent" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={s.link}
                      className="inline-flex items-center gap-2 text-accent font-semibold group/link"
                    >
                      <span>Explore Service</span>
                      <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      <div className="w-0 group-hover/link:w-full h-0.5 bg-gradient-to-r from-accent to-gold transition-all duration-300" />
                    </Link>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-navy-dark to-navy" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold mb-6">
              <Quote className="w-4 h-4" />
              Trusted Partnerships
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mb-6">
              Leaders Who
              <span className="text-gradient-gold"> Trust</span>
              <br />
              Our Expertise
            </h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              From private developers to public institutions, we partner with organizations 
              that demand reliability, transparency, and measurable impact.
            </p>
          </motion.div>

          <div ref={testimonialRef} className="overflow-hidden">
            <div className="flex gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_40%] p-4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-card/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/10 h-full"
                  >
                    <Quote className="w-12 h-12 text-gold/30 mb-6" />
                    
                    <blockquote className="text-foreground/90 text-lg italic mb-8 leading-relaxed">
                      "{(t as any).testimonial}"
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={resolveSrc((t as any).image)}
                          alt={(t as any).full_name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gold/30"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-gold to-accent rounded-full flex items-center justify-center">
                          <Quote className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-heading font-bold text-lg">
                          {(t as any).full_name}
                        </div>
                        <div className="text-muted-foreground">
                          {(t as any).position}
                          {(t as any).company && (
                            <span> • {(t as any).company}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial navigation dots */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.slice(0, 3).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/60 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-navy-dark/5 to-background" />
        <div 
          className="absolute inset-0"
          style={{ backgroundImage: LIGHT_GRID_PATTERN }}
        />
        
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent/10 to-gold/10 rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="font-semibold text-accent">Ready to Build What's Next?</span>
            </div>
            
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8">
              Partner with
              <span className="text-gradient-gold"> Pison-Gold</span>
            </h2>
            
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              For integrated solutions that drive growth, efficiency, and long-term value—across 
              sectors, from concept to completion.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-gold to-gold-dark text-navy-dark px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-gold/40 hover:shadow-gold/60 transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 rounded-2xl border-2 border-gold/40 group-hover:border-gold/60 transition-colors" />
              </Link>
              
              <Link
                to="/projects"
                className="group inline-flex items-center gap-4 border-2 border-border text-foreground px-10 py-5 rounded-2xl font-semibold text-lg hover:border-accent hover:bg-accent/5 transition-all duration-300"
              >
                <span>View Our Projects</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <p className="mt-10 text-muted-foreground text-sm">
              Typically respond within 24 hours • No obligation • Tailored solutions
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;