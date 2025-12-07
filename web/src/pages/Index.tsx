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

const slides = [heroMain, realEstateHero, healthcareHero, technologyHero];

const services = [
  {
    name: "Real Estate & Hospitality",
    icon: Building2,
    image: realEstateHero,
    blurb: "Crafting sustainable communities and premium living experiences.",
    link: "/services/real-estate",
  },
  {
    name: "Healthcare Advancement",
    icon: Stethoscope,
    image: healthcareHero,
    blurb: "Equipping healthcare facilities with reliable tools, technology and support.",
    link: "/services/healthcare",
  },
  {
    name: "Technology Solutions",
    icon: Cpu,
    image: technologyHero,
    blurb: "Designing secure, scalable digital infrastructure for modern organizations.",
    link: "/services/technology",
  },
  {
    name: "Strategic Procurement",
    icon: Package,
    image: procurementHero,
    blurb: "Managing sourcing, logistics and supply chains with integrity and precision.",
    link: "/services/procurement",
  },
];

const stats = [
  { value: 6, label: "Years of Excellence", icon: Star },
  { value: 4, label: "Core Business Sectors", icon: Hexagon },
  { value: 100, label: "Regulatory Compliance", icon: Shield },
  { value: 1, label: "Integrated Partner", icon: Globe },
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
    show: { y: 0, opacity: 1, transition: { duration: 0.7 } },
  },
  subtitle: {
    hidden: { y: 24, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7 } },
  },
  cta: {
    hidden: { y: 16, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.98 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

const Index: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);
  const [testimonialRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6500 }),
  ]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const isStatsInView = useInView(statsRef, { threshold: 0.45, once: true });
  const statValues = stats.map((s) => useCountOnView(s.value, isStatsInView));

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
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Header />

      {/* HERO */}
      <div className="relative">
        <div ref={emblaRef} className="h-[78vh] lg:h-[86vh] overflow-hidden">
          <div className="flex h-full">
            {slides.map((src, i) => (
              <div key={i} className="flex-[0_0_100%] relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transform-gpu transition-transform duration-700 scale-105"
                  style={{ backgroundImage: `url(${src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/85 via-navy-dark/65 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={heroVariants.container}
          className="absolute inset-0 flex items-center"
        >
          <div className="container-custom">
            <div className="max-w-3xl">
              <motion.h1
                variants={heroVariants.title}
                className="text-white font-heading leading-tight text-4xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-xl"
              >
                Integrated Solutions.
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-accent">
                  Sustainable Impact.
                </span>
              </motion.h1>

              <motion.p
                variants={heroVariants.subtitle}
                className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl"
              >
                Pison-Gold is a multi-sector partner delivering integrated Real
                Estate, Healthcare, Technology and Procurement solutions that
                drive sustainable development and measurable national impact.
              </motion.p>

              <motion.div
                variants={heroVariants.cta}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 btn-gold shadow-2xl px-6 py-3 rounded-2xl text-sm font-semibold"
                >
                  <span>Your Project, Our Expertise</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 btn-outline-light px-5 py-3 rounded-2xl text-sm font-medium"
                >
                  Why Choose Pison-Gold?
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="inline-flex items-center space-x-3 bg-white/10 text-white/90 px-4 py-2 rounded-full backdrop-blur">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm uppercase tracking-widest">
              Nigeria’s Multi-Sector Partner
            </span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <section ref={statsRef} className="py-20">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((s, idx) => {
              const Icon = s.icon;
              const value = statValues[idx];
              return (
                <motion.div
                  key={s.label}
                  variants={cardVariants}
                  className="bg-gradient-card/5 p-6 rounded-2xl border border-border/50 flex flex-col items-start"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent to-gold-dark rounded-xl shadow-gold mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-heading font-bold text-gradient-gold">
                    {value}
                    {s.label.includes("Years") ? "+" : s.label.includes("Regulatory") ? "%" : ""}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold mb-4">
              <Hexagon className="w-4 h-4" />
              Our Integrated Ecosystem of Services
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">
              We Don’t Just Manage Projects —
              <br /> We Engineer Synergy.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              By aligning multiple sectors under one strategy, we help clients
              achieve more resilient outcomes, optimized investments, and
              long-term value.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.name}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className="group relative rounded-2xl overflow-hidden border border-border/50 shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={s.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-navy-dark/30 to-transparent" />
                  </div>
                  <div className="p-6 bg-card/80 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent to-gold-dark shadow-gold">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-foreground text-lg">
                          {s.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {s.blurb}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link
                        to={s.link}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
                      >
                        Discover More
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-br from-primary via-navy to-navy-dark">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-3 text-white/80 max-w-2xl mx-auto">
              From private developers to public institutions, we partner with
              organizations that demand reliability, transparency, and
              long-term impact.
            </p>
          </div>

          <div ref={testimonialRef} className="overflow-hidden">
            <div className="flex gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] p-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-card p-6 rounded-2xl shadow-lg border border-border/50 h-full"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={resolveSrc((t as any).image)}
                        className="w-14 h-14 rounded-full object-cover shadow"
                      />
                      <div>
                        <div className="font-heading font-semibold">
                          {(t as any).full_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {(t as any).position}
                          {(t as any).company && (
                            <span> at {(t as any).company}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-foreground/80 italic">
                      “{(t as any).testimonial}”
                    </blockquote>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Ready to Build What’s Next?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Partner with Pison-Gold for integrated solutions that drive growth,
            efficiency, and long-term value—across sectors, from idea to
            execution.
          </p>
          <Link
            to="/contact"
            className="btn-gold inline-flex items-center gap-3 px-6 py-3 rounded-2xl shadow-lg"
          >
            Get a Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
