import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  Zap
} from "lucide-react";

import aboutHero from "@/assets/about-hero.jpg";
import teamHero from "@/assets/team-hero.jpg";
import constructionPlanning from "@/assets/construction-planning.jpg";
import heroMain from "@/assets/hero-main.jpg";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { comp_name } from "@/lib/constants";

const About = () => {
  const differentiators = [
    {
      icon: Globe,
      title: "Multi-Sector Mastery",
      description:
        "Our strength lies in seamlessly integrating Real Estate, Healthcare, Technology and Procurement to offer unified, high-impact solutions."
    },
    {
      icon: Lightbulb,
      title: "Diaspora & Local Intelligence",
      description:
        "We blend global expertise from diaspora professionals with deep local market insight to deliver internationally aligned but locally optimized outcomes."
    },
    {
      icon: Shield,
      title: "Technology-Driven Delivery",
      description:
        "Our processes leverage digital tools, data systems, and innovation frameworks to ensure accuracy, transparency, and operational efficiency."
    },
    {
      icon: Award,
      title: "A Culture of Delivery",
      description:
        "Excellence is not an aspiration—it is our standard. We pride ourselves on consistent execution, measurable results, and promises kept."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Star className="absolute top-[20%] right-[15%] w-8 h-8 text-accent/30 animate-float z-10" />
        <Diamond className="absolute bottom-[30%] left-[10%] w-10 h-10 text-white/10 animate-float-slow z-10" />

        <img
          src={aboutHero}
          alt={`About ${comp_name}`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/70 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="max-w-2xl animate-fade-up">
              <span className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/20 rounded-full text-accent text-sm mb-4 shadow-lg backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span>About Us</span>
              </span>

              <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary-foreground mt-4 mb-6">
                We Are Architects of Progress
              </h1>

              <p className="text-lg text-primary-foreground/80">
                Driving sustainable development through multi-sector innovation and unified project execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-20 right-[10%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
        <Hexagon className="absolute bottom-32 left-[5%] w-12 h-12 text-primary/10 animate-float" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-semibold mb-4">
                <Star className="w-4 h-4" />
                <span>Our Story</span>
              </span>

              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">
                From Vision to National Impact
              </h2>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2019, Pison-Gold emerged from a bold vision: to build a multi-sector company capable of advancing Nigeria’s development through integrated, world-class project delivery.
                </p>

                <p>
                  Over the years, we have grown into a trusted partner committed to shaping Africa’s future—combining innovation, expertise, and integrity to deliver solutions that create lasting value.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-transparent rounded-3xl blur-2xl" />

              <img
                src={teamHero}
                alt="Pison-Gold Team"
                className="rounded-2xl shadow-premium-lg relative"
              />

              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-accent to-gold-dark p-6 rounded-2xl shadow-gold-lg hidden md:block animate-float">
                <p className="font-heading text-3xl font-bold text-white">2019</p>
                <p className="text-white/80 text-sm">Year Founded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <Zap className="absolute top-20 right-[20%] w-8 h-8 text-accent/20 animate-pulse-soft" />

        <div className="container-custom relative grid md:grid-cols-2 gap-12">
          <div className="bg-card rounded-2xl p-10 border border-border/50 shadow-premium-lg hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-gold-dark rounded-xl flex justify-center items-center shadow-gold mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>

            <h3 className="font-heading text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To drive sustainable development by delivering integrated, world-class projects and services that transform communities and strengthen national progress.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-10 border border-border/50 shadow-premium-lg hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-navy-light rounded-xl flex justify-center items-center shadow-lg mb-6">
              <Eye className="w-8 h-8 text-primary-foreground" />
            </div>

            <h3 className="font-heading text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become Africa’s most trusted and innovative multi-sector solutions partner.
            </p>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="section-padding bg-background relative overflow-hidden">
        <Shield className="absolute top-32 left-[8%] w-10 h-10 text-primary/10 animate-float-slow" />
        <Sparkles className="absolute bottom-40 right-[12%] w-8 h-8 text-accent/15 animate-float" />

        <div className="container-custom relative">
          <div className="text-center mb-16">
            <span className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent text-sm rounded-full font-semibold">
              <Diamond className="w-4 h-4" />
              <span>Our Differentiators</span>
            </span>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
              What Makes Pison-Gold Different?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((item, i) => (
              <div
                key={i}
                className="flex items-start space-x-6 p-6 bg-card rounded-2xl border border-border/50 shadow-premium-sm hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-gold-light/10 rounded-xl flex justify-center items-center">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>

                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <Star className="absolute top-20 left-[10%] w-8 h-8 text-accent/10 animate-float" />
        <Diamond className="absolute bottom-20 right-[15%] w-10 h-10 text-white/5 animate-float-slow" />

        <div className="container-custom grid md:grid-cols-3 gap-6 relative">
          <div className="md:col-span-2 aspect-video overflow-hidden rounded-2xl shadow-premium-lg">
            <img
              src={heroMain}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="aspect-video overflow-hidden rounded-2xl shadow-premium">
            <img
              src={constructionPlanning}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="aspect-video overflow-hidden rounded-2xl shadow-premium">
            <img
              src={aboutHero}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="md:col-span-2 aspect-video overflow-hidden rounded-2xl shadow-premium-lg">
            <img
              src={teamHero}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background relative text-center">
        <Sparkles className="absolute top-20 right-[20%] w-8 h-8 text-accent/20 animate-float" />

        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
          Let’s Build the Future Together
        </h2>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Partner with Pison-Gold and experience integrated solutions designed to create lasting value and national impact.
        </p>

        <Link to="/contact" className="btn-gold inline-flex items-center space-x-2 shadow-gold-lg">
          <span>Contact Us Today</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default About;
