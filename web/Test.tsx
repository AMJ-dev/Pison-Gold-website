import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Star,
  Sparkles,
  Diamond,
  Heart,
  Zap,
  ArrowRight,
  Twitter,
  Linkedin,
  Mail,
  Facebook,
  Trophy,
  Award,
  Target,
  Shield,
  Globe,
  Briefcase,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { resolveSrc } from "@/lib/functions";
import { http } from "@/lib/httpClient";
import { ApiResp } from "@/lib/types";
import { toast } from "react-toastify";

import teamHero from "@/assets/team-hero.jpg";

interface TeamMember {
  id: number;
  full_name: string;
  position: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

const Team = () => {
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const res = await http.get("/get-teams/");
        const resp: ApiResp = res.data;

        if (resp.error === false && Array.isArray(resp.data)) {
          setTeams(resp.data);
        } else {
          toast.error("Error fetching team members");
        }
      } catch {
        toast.error("Failed to fetch team members");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative h-[75vh] min-h-[600px] overflow-hidden">
        {/* Background with layered effects */}
        <div className="absolute inset-0">
          <img 
            src={teamHero} 
            alt="Our Team" 
            className="w-full h-full object-cover scale-105 animate-ken-burns" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/90 to-navy/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-dark/95" />
        </div>

        {/* Animated decorative elements */}
        <Users className="absolute top-[25%] right-[15%] w-12 h-12 text-accent/30 animate-float z-10" />
        <Star className="absolute bottom-[35%] left-[12%] w-10 h-10 text-white/15 animate-float-slow z-10" />
        <Heart className="absolute top-[45%] left-[22%] w-8 h-8 text-accent/25 animate-pulse z-10" />
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-gradient-gold rounded-full blur-3xl opacity-15 animate-pulse" />
        <div className="absolute bottom-40 right-1/3 w-96 h-96 bg-gradient-glow rounded-full blur-3xl opacity-10 animate-pulse" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl animate-fade-up">
              <div className="inline-flex items-center space-x-2 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-accent text-sm font-medium mb-6 shadow-glow">
                <Users className="w-5 h-5" />
                <span className="font-semibold tracking-wider">MEET OUR TEAM</span>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mt-4 mb-8 leading-[0.9]">
                The Driving Force
                <br />
                <span className="bg-gradient-gold bg-clip-text text-transparent">
                  Behind Our Impact
                </span>
              </h1>

              <p className="text-xl text-primary-foreground/90 max-w-2xl leading-relaxed">
                Our leadership team brings together decades of diverse experience, united by a shared vision for transformative growth.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/70 text-sm font-medium tracking-wider">EXPLORE TEAM</span>
            <div className="w-6 h-10 border border-gold/40 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-4 bg-gradient-to-b from-gold to-gold/50 rounded-full mt-2 animate-scroll" />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Members Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 left-[5%] w-[300px] h-[300px] bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-float-delayed" />
        <Sparkles className="absolute top-32 right-[15%] w-10 h-10 text-accent/20 animate-float" />
        <Diamond className="absolute bottom-40 left-[12%] w-12 h-12 text-primary/15 animate-float-slow" />

        <div className="container-custom relative">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gold/10 border border-gold/20 rounded-full text-sm font-semibold text-gold-dark mb-6">
              <Trophy className="w-4 h-4" />
              <span className="tracking-wider">EXECUTIVE LEADERSHIP</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Meet Our <span className="bg-gradient-to-r from-gold to-accent bg-clip-text text-transparent">Visionaries</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Each leader brings unique expertise and unwavering commitment to excellence
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold/10 rounded-2xl border border-gold/20">
                <div className="w-5 h-5 bg-gradient-gold rounded-full animate-pulse" />
                <span className="text-gold-dark font-semibold text-lg">Loading Team Members...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-32">
              {teams.map((member, index) => (
                <div
                  key={member.id}
                  className="group relative animate-fade-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Background glow */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-gold/5 via-transparent to-accent/5 rounded-4xl opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700" />
                  
                  <div className="relative grid lg:grid-cols-2 gap-16 items-center">
                    {/* IMAGE */}
                    <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className="relative group/img">
                        {/* Outer glow */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-gold/30 to-accent/30 rounded-3xl blur-2xl opacity-0 group-hover/img:opacity-70 transition-opacity duration-500" />
                        
                        {/* Image container */}
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                          <img
                            src={resolveSrc(member.image)}
                            alt={member.full_name}
                            className="w-full h-auto aspect-square object-cover transition-transform duration-700 group-hover/img:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                        </div>
                        
                        {/* Social links */}
                        <div className="absolute -bottom-6 -right-6 bg-gradient-gold p-4 rounded-2xl shadow-2xl shadow-gold/40 flex gap-3 animate-float">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                              title="LinkedIn"
                            >
                              <Linkedin className="w-5 h-5 text-white" />
                            </a>
                          )}
                          {member.twitter && (
                            <a
                              href={member.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                              title="Twitter"
                            >
                              <Twitter className="w-5 h-5 text-white" />
                            </a>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                              title="Email"
                            >
                              <Mail className="w-5 h-5 text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* TEXT CONTENT */}
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      {/* Position badge */}
                      <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-gold/10 border border-gold/30 rounded-full mb-6 group-hover:border-gold/50 transition-all duration-300">
                        <Zap className="w-4 h-4 text-gold" />
                        <span className="text-gold-dark font-bold text-sm uppercase tracking-wider">
                          {member.position}
                        </span>
                      </div>
                      
                      {/* Name */}
                      <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gold group-hover:to-accent group-hover:bg-clip-text transition-all duration-500">
                        {member.full_name}
                      </h2>
                      
                      {/* Bio */}
                      <div className="prose prose-lg max-w-none">
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8 border-l-4 border-gold/20 pl-6 py-2">
                          {member.bio}
                        </p>
                        
                        {/* Contact info */}
                        {(member.email || member.phone) && (
                          <div className="space-y-4 pt-8 border-t border-gray-200/50">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                              Contact Information
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-sm font-medium text-primary hover:bg-primary/10 transition-colors hover:scale-105"
                                >
                                  <Mail className="w-4 h-4" />
                                  {member.email}
                                </a>
                              )}
                              {member.phone && (
                                <a
                                  href={`tel:${member.phone}`}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent/5 rounded-full text-sm font-medium text-accent hover:bg-accent/10 transition-colors hover:scale-105"
                                >
                                  <span className="text-base">📱</span>
                                  {member.phone}
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Culture Section */}
      <section className="section-padding bg-gradient-to-b from-cream to-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl animate-float-slow" />
        <Zap className="absolute top-20 left-[15%] w-10 h-10 text-accent/25 animate-pulse" />
        <Heart className="absolute bottom-32 right-[20%] w-12 h-12 text-primary/15 animate-float" />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-pattern" />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-semibold mb-6 shadow-sm">
                <Heart className="w-5 h-5" />
                <span className="tracking-wider">OUR CULTURE</span>
              </div>

              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-8 leading-tight">
                United by Purpose,
                <br />
                <span className="bg-gradient-to-r from-gold to-accent bg-clip-text text-transparent">
                  Driven by Excellence
                </span>
              </h2>

              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  At Pison-Gold, our team is our greatest asset. We foster a culture of collaboration, innovation,
                  and continuous learning. Every team member shares a commitment to delivering exceptional results and
                  making a positive impact in every project.
                </p>

                <p className="text-muted-foreground leading-relaxed text-lg">
                  Our diverse backgrounds and expertise allow us to approach challenges from multiple perspectives,
                  ensuring comprehensive and innovative solutions for our clients.
                </p>
              </div>

              {/* Core Values */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-white">
                  <Shield className="w-5 h-5 text-gold" />
                  <span className="font-semibold text-sm">Integrity</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-white">
                  <Award className="w-5 h-5 text-gold" />
                  <span className="font-semibold text-sm">Excellence</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-white">
                  <Target className="w-5 h-5 text-gold" />
                  <span className="font-semibold text-sm">Focus</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-white">
                  <Globe className="w-5 h-5 text-gold" />
                  <span className="font-semibold text-sm">Innovation</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-up delay-200">
              <div className="absolute -inset-6 bg-gradient-to-br from-accent/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl shadow-premium-lg border border-white/10">
                <img src={teamHero} alt="Team Culture" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Enhanced Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-card backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10 animate-float">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-heading text-3xl font-bold text-foreground">50+</p>
                    <p className="text-muted-foreground text-sm font-medium">Dedicated Professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="section-padding bg-gradient-to-br from-navy-dark via-navy to-navy-light relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5" />
          <Star className="absolute top-20 left-[10%] w-10 h-10 text-accent/25 animate-float" />
          <Diamond className="absolute bottom-20 right-[15%] w-12 h-12 text-white/10 animate-float-slow" />
        </div>

        <div className="container-custom text-center relative">
          <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-semibold mb-8 shadow-glow">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="tracking-wider">JOIN OUR JOURNEY</span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-8 leading-tight">
            Build the Future
            <br />
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              With Us
            </span>
          </h2>

          <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Want to work with a team that's shaping Nigeria's future? Get in touch to explore opportunities.
          </p>

          <Link 
            to="/contact" 
            className="group relative overflow-hidden inline-flex items-center space-x-3 px-10 py-5 bg-gradient-gold text-navy-dark rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-gold/40 transition-all duration-500 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;