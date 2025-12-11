import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Stethoscope,
  Cpu,
  Package,
  Shield,
  FileCheck,
  Users,
  Landmark,
  CheckCircle2,
  BadgeCheck,
  FileText,
  Lock,
  Award,
  Globe,
  Zap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileSearch,
  ShieldCheck,
  ClipboardCheck,
  BookOpen,
  Target,
  Star,
  Diamond
} from "lucide-react";

import complianceHero from "@/assets/compliance-hero.jpg";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Compliance = () => {
  const [selectedCredential, setSelectedCredential] = useState<number | null>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // --------------------------
  // OFFICIAL SERVICES (unchanged)
  // --------------------------
  const services = [
    { name: "Real Estate", path: "/services/real-estate", icon: Building2 },
    { name: "Healthcare", path: "/services/healthcare", icon: Stethoscope },
    { name: "Technology", path: "/services/technology", icon: Cpu },
    { name: "Procurement", path: "/services/procurement", icon: Package },
  ];

  // --------------------------
  // FULLY UPDATED CREDENTIALS  
  // Matches your document exactly  
  // --------------------------
  const credentials = [
    {
      icon: Building2,
      title: "Corporate Integrity",
      description: "CAC Registration (RC 1604250)",
      details:
        "Pison-Gold is fully registered with the Corporate Affairs Commission of Nigeria (CAC), establishing our legal identity and reinforcing our commitment to transparency, legitimacy, and responsible governance.",
      color: "from-blue-500 to-indigo-600",
      bg: "bg-gradient-to-br from-blue-500/5 to-indigo-500/5",
      border: "border-blue-200"
    },
    {
      icon: FileCheck,
      title: "Financial Probity",
      description: "SCUML Certified & FIRS Tax Compliant",
      details:
        "We comply with the Special Control Unit Against Money Laundering (SCUML) and maintain up-to-date tax obligations with the Federal Inland Revenue Service (FIRS), ensuring financial responsibility at all operational levels.",
      color: "from-emerald-500 to-teal-600",
      bg: "bg-gradient-to-br from-emerald-500/5 to-teal-500/5",
      border: "border-emerald-200"
    },
    {
      icon: Users,
      title: "Workforce Protection",
      description: "PENCOM • NSITF • ITF Compliance",
      details:
        "As part of our social and statutory obligations, Pison-Gold adheres strictly to pension regulations (PENCOM), employee compensation insurance (NSITF), and workforce development contributions (ITF). This ensures employee safety, welfare, and continuous capacity building.",
      color: "from-amber-500 to-orange-600",
      bg: "bg-gradient-to-br from-amber-500/5 to-orange-500/5",
      border: "border-amber-200"
    },
    {
      icon: Landmark,
      title: "Government Recognition",
      description: "Verified Contractor – Bureau of Public Procurement (BPP)",
      details:
        "Pison-Gold is officially recognized by the Bureau of Public Procurement, authorizing our participation in federal contracting, procurement, and project execution across public-sector initiatives.",
      color: "from-purple-500 to-pink-600",
      bg: "bg-gradient-to-br from-purple-500/5 to-pink-500/5",
      border: "border-purple-200"
    },
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Client Protection",
      description:
        "Our compliance ensures that every engagement is conducted under legally recognized structures, protecting clients from operational or contractual risk.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "Regulatory oversight guarantees that every project—private or public—meets stringent standards of quality, safety, and professional excellence.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Target,
      title: "Risk Mitigation",
      description:
        "Working with a compliant partner reduces exposure to financial, operational, and legal risks, making Pison-Gold a safe, reliable choice.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Globe,
      title: "Market Access",
      description:
        "Our credentials open doors to government contracts and regulated sectors, expanding partnership opportunities across multiple industries.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Transparency",
      description:
        "Clear documentation and regular audits ensure complete visibility into our operations, building trust through openness.",
      color: "from-gray-600 to-gray-700"
    },
    {
      icon: Star,
      title: "Industry Leadership",
      description:
        "We set the standard for compliance excellence, demonstrating commitment to ethical business practices and industry best practices.",
      color: "from-gold to-amber-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      {/* PREMIUM HERO SECTION */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={complianceHero}
            alt="Compliance"
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Animated Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-gold/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-2xl"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-8"
              >
                <Shield className="w-5 h-5 text-gold animate-pulse" />
                <span className="text-white/90 font-medium text-sm tracking-wider">OUR CREDENTIALS</span>
                <div className="h-4 w-px bg-white/30" />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="text-white/80 text-sm">FULLY COMPLIANT</span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight"
              >
                <span className="block">COMPLIANCE</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
                  & CREDENTIALS
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/80 mb-8 leading-relaxed font-light"
              >
                The Foundation of Trust is Built on Transparency and Regulatory Excellence
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-8 mb-8"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">4</div>
                  <div className="text-white/60 text-sm tracking-wider uppercase">Core Credentials</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-white/60 text-sm tracking-wider uppercase">Compliance Rate</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">6+</div>
                  <div className="text-white/60 text-sm tracking-wider uppercase">Years Verified</div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-dark text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl shadow-gold/40 hover:shadow-gold/60 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Verify Our Credentials</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-white/60 text-sm tracking-wider">Scroll to explore</span>
                  <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-gold rounded-full mt-2" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full text-gold font-semibold mb-6"
            >
              <Shield className="w-4 h-4" />
              <span>Built on Integrity</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="font-heading text-4xl md:text-5xl font-bold mb-8"
            >
              Rock-Solid <span className="text-gradient-gold">Foundation</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-xl leading-relaxed"
            >
              Pison-Gold operates with unwavering commitment to legality, ethical governance,
              and responsible business conduct. Our credentials reflect a long-term dedication 
              to transparency, compliance, and nationally recognized corporate standards.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CREDENTIALS GRID - ENHANCED */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold/10 to-gold/5 backdrop-blur-xl rounded-2xl border border-gold/20 mb-8">
              <FileSearch className="w-5 h-5 text-gold" />
              <span className="text-gold font-medium tracking-wider">OFFICIAL CREDENTIALS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Verified <span className="text-gradient-gold">Compliance</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Our credentials are the cornerstone of our commitment to excellence and transparency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {credentials.map((credential, index) => {
              const Icon = credential.icon;
              const isSelected = selectedCredential === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedCredential(isSelected ? null : index)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative cursor-pointer"
                >
                  {/* Card background */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl border ${credential.border} shadow-lg group-hover:shadow-2xl transition-all duration-500`} />
                  
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 rounded-3xl ${credential.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Department accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r ${credential.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative p-8">
                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${credential.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                              {credential.title}
                            </h3>
                            <p className="text-gold font-medium mb-3">
                              {credential.description}
                            </p>
                          </div>
                          <button className="text-gray-400 hover:text-gold transition-colors">
                            {isSelected ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        {/* Expanding Details */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
                                <p className="text-gray-600 leading-relaxed">
                                  {credential.details}
                                </p>
                                
                                {/* Verification badge */}
                                <div className="flex items-center gap-2 mt-4">
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/5 text-green-700 rounded-full text-sm">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Verified & Active</span>
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Updated annually
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Verification badge when collapsed */}
                        {!isSelected && (
                          <div className="flex items-center gap-2 mt-4">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-500">Verified & Active</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Credential Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: CheckCircle2, label: "Annually Verified", color: "text-green-600" },
                { icon: FileText, label: "Full Documentation", color: "text-blue-600" },
                { icon: Shield, label: "Regulatory Compliance", color: "text-gold" },
                { icon: Zap, label: "Active Status", color: "text-emerald-600" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY COMPLIANCE MATTERS - ENHANCED */}
      <section className="py-24 bg-gradient-to-br from-navy-dark via-navy to-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-8">
              <Target className="w-5 h-5 text-gold" />
              <span className="text-white font-medium tracking-wider">THE VALUE OF COMPLIANCE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Our <span className="text-gradient-gold">Credentials</span> Matter
            </h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              Our commitment to compliance translates into tangible benefits for every partnership.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl hover:border-white/20 transition-all duration-500">
                    {/* Background gradient effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-8 h-8 text-gold" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                      <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PREMIUM CTA SECTION */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        <div className="container-custom text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold/10 to-gold/5 backdrop-blur-xl rounded-2xl border border-gold/20 mb-8">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-gold font-medium tracking-wider">PARTNER WITH CONFIDENCE</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Ready to Build <span className="text-gradient-gold">Together?</span>
            </h2>
            
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Our compliance is your guarantee of integrity—ensuring that every partnership
              is backed by transparency, accountability, and regulatory excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group relative px-10 py-4 bg-gradient-to-r from-gold to-gold-dark text-white rounded-2xl hover:shadow-2xl hover:shadow-gold/30 transition-all duration-500 font-medium inline-flex items-center gap-3"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-2xl border-2 border-gold/30 group-hover:border-gold/50 transition-colors duration-500" />
              </Link>
              
              <Link
                to="/services"
                className="group px-10 py-4 bg-white text-gray-800 rounded-2xl border-2 border-gray-300 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-500 font-medium inline-flex items-center gap-3"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            {/* Trust Indicator */}
            <div className="mt-12 pt-8 border-t border-gray-200/50">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <div className="text-gray-500 text-sm tracking-wider uppercase">OUR GUARANTEE:</div>
                <div className="flex items-center gap-4">
                  {[ShieldCheck, ClipboardCheck, FileCheck, Lock].map((Icon, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-600">
                      <Icon className="w-4 h-4 text-gold" />
                      <span className="text-sm">
                        {['Legal Compliance', 'Full Documentation', 'Annual Updates', 'Secure Operations'][idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Compliance;