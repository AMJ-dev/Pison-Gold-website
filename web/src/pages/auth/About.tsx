import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import {
  ChevronRight,
  ArrowRight,
  Target,
  Eye,
  Globe,
  Lightbulb,
  Shield,
  Award,
  Star,
  Diamond,
  Sparkles,
  Hexagon,
  Zap,
  Users,
  TrendingUp,
  Clock,
  Building2,
  Stethoscope,
  Cpu,
  Package,
  MapPin,
  Heart,
  CheckCircle,
  ArrowUpRight,
  BookOpen,
  Target as TargetIcon,
  Brain,
  Handshake,
  Rocket
} from "lucide-react";

import aboutHero from "@/assets/about-hero.jpg";
import teamHero from "@/assets/team-hero.jpg";
import constructionPlanning from "@/assets/construction-planning.jpg";
import heroMain from "@/assets/hero-main.jpg";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { comp_name } from "@/lib/constants";

const fadeInUp = {
  hidden: { y: 50, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const About = () => {
  const differentiators = [
    {
      icon: Globe,
      title: "Multi-Sector Mastery",
      description:
        "Our strength lies in seamlessly integrating Real Estate, Healthcare, Technology and Procurement to offer unified, high-impact solutions.",
      color: "from-blue-500 to-indigo-600",
      accent: "border-blue-200"
    },
    {
      icon: Brain,
      title: "Diaspora & Local Intelligence",
      description:
        "We blend global expertise from diaspora professionals with deep local market insight to deliver internationally aligned but locally optimized outcomes.",
      color: "from-emerald-500 to-teal-600",
      accent: "border-emerald-200"
    },
    {
      icon: Rocket,
      title: "Technology-Driven Delivery",
      description:
        "Our processes leverage digital tools, data systems, and innovation frameworks to ensure accuracy, transparency, and operational efficiency.",
      color: "from-purple-500 to-pink-600",
      accent: "border-purple-200"
    },
    {
      icon: Award,
      title: "A Culture of Delivery",
      description:
        "Excellence is not an aspiration—it is our standard. We pride ourselves on consistent execution, measurable results, and promises kept.",
      color: "from-amber-500 to-orange-600",
      accent: "border-amber-200"
    }
  ];

  const values = [
    { title: "Integrity", description: "Uncompromising ethical standards", icon: Shield },
    { title: "Excellence", description: "Consistent quality in all we do", icon: Star },
    { title: "Innovation", description: "Forward-thinking solutions", icon: Lightbulb },
    { title: "Partnership", description: "Collaborative approach", icon: Handshake },
    { title: "Impact", description: "Measurable, sustainable results", icon: TargetIcon },
    { title: "Accountability", description: "Ownership of outcomes", icon: CheckCircle }
  ];

  const stats = [
    { value: "2019", label: "Year Founded", icon: CalendarDays },
    { value: "50+", label: "Projects Completed", icon: CheckSquare },
    { value: "15+", label: "States Covered", icon: MapPin },
    { value: "100%", label: "Client Satisfaction", icon: Heart }
  ];

  const sectionRefs = {
    story: useRef(null),
    mission: useRef(null),
    differentiators: useRef(null),
    values: useRef(null)
  };

  const isStoryInView = useInView(sectionRefs.story, { once: true, margin: "-100px" });
  const isMissionInView = useInView(sectionRefs.mission, { once: true, margin: "-100px" });
  const isDiffInView = useInView(sectionRefs.differentiators, { once: true, margin: "-100px" });
  const isValuesInView = useInView(sectionRefs.values, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={aboutHero}
            alt={`About ${comp_name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Animated Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Star className="absolute top-[20%] right-[15%] w-8 h-8 text-gold/40 animate-float z-10" />
          <Diamond className="absolute bottom-[30%] left-[10%] w-10 h-10 text-white/20 animate-float-slow z-10" />
          <Sparkles className="absolute top-[40%] left-[20%] w-6 h-6 text-accent/30 animate-pulse" />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white text-sm mb-6 border border-white/20"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="font-medium tracking-wider">WHO WE ARE</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
              >
                Architects of
                <br />
                <span className="text-gradient-gold">Progress</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-white/90 leading-relaxed max-w-xl"
              >
                Driving sustainable development through multi-sector innovation and unified project execution that transforms communities and strengthens national progress.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="mt-10"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl shadow-gold/40 hover:shadow-gold/60 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Partner With Us</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
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

      {/* QUICK STATS */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-14 h-14 bg-gradient-to-br from-gold to-accent rounded-2xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-heading font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section ref={sectionRefs.story} className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-gold/5 to-accent/5 rounded-full blur-3xl" />
        <Hexagon className="absolute bottom-32 left-[5%] w-16 h-16 text-gray-300 animate-float-slow" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gold/10 rounded-full text-gold text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" />
                <span>Our Journey</span>
              </div>

              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">
                From Vision to
                <span className="text-gradient-gold"> National Impact</span>
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Founded in 2019, Pison-Gold emerged from a bold vision: to build a multi-sector company capable of advancing Nigeria's development through integrated, world-class project delivery.
                </p>

                <p>
                  What began as an ambitious idea has grown into a trusted partner in nation-building, combining innovation, expertise, and integrity to deliver solutions that create lasting value across multiple sectors.
                </p>

                <p>
                  Today, we stand at the intersection of tradition and innovation, blending deep local understanding with global best practices to drive sustainable development that transforms communities and strengthens national progress.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-10"
              >
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-3 text-gold font-semibold hover:text-gold-dark transition-colors"
                >
                  <span>Explore Our Projects</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-gold/20 to-accent/20 rounded-3xl blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={teamHero}
                  alt="Pison-Gold Team"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <div className="font-heading text-2xl font-bold">Our Team</div>
                      <div className="text-white/80">Experts across sectors</div>
                    </div>
                    <div className="bg-gradient-to-br from-gold to-accent p-4 rounded-2xl text-center">
                      <div className="font-heading text-3xl font-bold text-white">2019</div>
                      <div className="text-white/80 text-sm">Year Founded</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section ref={sectionRefs.mission} className="py-24 bg-gradient-to-br from-navy-dark via-navy to-navy-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/90 via-navy/80 to-navy-dark/90" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
              <Target className="w-4 h-4 text-gold" />
              <span>Our Purpose</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mb-6">
              Guiding Principles for
              <span className="text-gradient-gold"> Excellence</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-gold to-accent rounded-2xl flex justify-center items-center shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10 text-white" />
              </div>

              <h3 className="font-heading text-3xl font-bold text-white mb-6">Our Mission</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                To drive sustainable development by delivering integrated, world-class projects and services that transform communities and strengthen national progress across all our sectors of operation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex justify-center items-center shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-10 h-10 text-white" />
              </div>

              <h3 className="font-heading text-3xl font-bold text-white mb-6">Our Vision</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                To become Africa's most trusted and innovative multi-sector solutions partner, recognized for our ability to deliver transformative projects that create lasting economic and social value.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section ref={sectionRefs.differentiators} className="py-24 bg-white relative overflow-hidden">
        <Shield className="absolute top-32 left-[8%] w-12 h-12 text-gray-200 animate-float-slow" />
        <Sparkles className="absolute bottom-40 right-[12%] w-8 h-8 text-gold/20 animate-float" />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gold/10 rounded-full text-gold text-sm font-semibold mb-6">
              <Diamond className="w-4 h-4" />
              <span>What Sets Us Apart</span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Our
              <span className="text-gradient-gold"> Differentiators</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Discover the unique qualities that make Pison-Gold the preferred partner for integrated solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex justify-center items-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="font-heading text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className={`absolute inset-0 border-2 ${item.accent} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                  
                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section ref={sectionRefs.values} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gold/10 rounded-full text-gold text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              <span>Our Values</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Principles That Guide
              <span className="text-gradient-gold"> Our Work</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              These core values shape our culture, drive our decisions, and define our commitment to excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-white p-8 rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-gold/10 to-accent/10 rounded-xl flex justify-center items-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-24 bg-gradient-to-br from-navy-dark via-navy to-navy-dark relative overflow-hidden">
        <Star className="absolute top-20 left-[10%] w-8 h-8 text-gold/20 animate-float" />
        <Diamond className="absolute bottom-20 right-[15%] w-10 h-10 text-white/10 animate-float-slow" />

        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Our Work in Action</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-white font-bold mb-6">
              Building the Future,
              <span className="text-gradient-gold"> Today</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[heroMain, constructionPlanning, aboutHero, teamHero, heroMain, constructionPlanning].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`relative overflow-hidden rounded-2xl shadow-2xl ${
                  i === 0 || i === 4 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={img}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                
                {/* Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white font-heading text-lg font-bold">
                    Project {i + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="container-custom text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold/10 to-accent/10 rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="font-semibold text-gold">Ready to Build Together?</span>
            </div>
            
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8">
              Let's Create
              <span className="text-gradient-gold"> Impact</span>
            </h2>
            
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Partner with Pison-Gold and experience integrated solutions designed to create lasting value and national impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-gold to-gold-dark text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-gold/40 hover:shadow-gold/60 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <span>Contact Us Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-gold-dark to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-2xl border-2 border-gold/40 group-hover:border-gold/60 transition-colors" />
              </Link>
              
            </div>

            <p className="mt-10 text-gray-500 text-sm">
              <span className="inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold" />
                Expert Consultation • Tailored Solutions • Lasting Partnerships
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Icon components for stats
const CalendarDays = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CheckSquare = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default About;