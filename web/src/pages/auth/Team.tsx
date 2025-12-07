import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Star,
  Sparkles,
  Diamond,
  Heart,
  Zap,
  ArrowRight,
  Mail,
  Linkedin,
  Facebook,
  Twitter,
  Briefcase,
  Award,
  Target,
  ChevronRight,
  MapPin,
  Phone,
  Globe,
  Clock,
  TrendingUp,
  Shield,
  Brain,
  Palette,
  Code,
  BarChart,
  Camera,
  Music,
  BookOpen,
  Coffee
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { http } from "@/lib/httpClient";
import { ApiResp } from "@/lib/types";
import { toast } from "react-toastify";
import { resolveSrc } from "@/lib/functions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import teamHero from "@/assets/team-hero.jpg";
import Preloader from "@/components/Preloader";

interface TeamMember {
  id: number;
  full_name: string;
  position: string;
  bio: string;
  image: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  email: string;
  phone: string;
  company?: string;
  department?: string;
  expertise?: string[];
  created_at: string;
}

// Color themes for different departments
const departmentThemes = {
  engineering: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: Code },
  design: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: Palette },
  marketing: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', icon: BarChart },
  leadership: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: Award },
  product: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: Brain },
  default: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', icon: Users }
};

const Team = () => {
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Group teams by department
  const teamsByDepartment = useMemo(() => {
    const groups: Record<string, TeamMember[]> = {};
    teams.forEach(team => {
      const dept = team.department || 'general';
      if (!groups[dept]) groups[dept] = [];
      groups[dept].push(team);
    });
    return groups;
  }, [teams]);

  const departments = Object.keys(teamsByDepartment);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const res = await http.get("/get-teams/");
        const resp: ApiResp = res.data;
        
        if (resp.error == false && resp.data) {
          const teamsData = Array.isArray(resp.data) ? resp.data : [];
          setTeams(teamsData);
          return;
        }
        toast.error(resp.data || "Failed to load teams");
        setError(resp.data || "Failed to load teams");
      } catch (error) {
        console.error("Fetch teams error:", error);
        toast.error("Connection error");
        setError("Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="pt-36 relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background with gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-amber-900/20" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-l from-gray-700/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Premium badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-8">
                <div className="flex items-center gap-2">
                  <Diamond className="w-5 h-5 text-amber-400" />
                  <span className="text-white/90 font-medium text-sm tracking-wider">MEET OUR TEAM</span>
                </div>
                <div className="h-4 w-px bg-white/30" />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-white/80 text-sm">EXCELLENCE IN ACTION</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tight">
                <span className="block">THE</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400">
                  MINDS
                </span>
                <span className="block">BEHIND THE MAGIC</span>
              </h1>

              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                A collective of visionaries, innovators, and craftsmen dedicated to transforming 
                complex challenges into elegant solutions.
              </p>

              {/* Stats ribbon */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{teams.length}</div>
                  <div className="text-white/60 text-sm tracking-wider">EXPERTS</div>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">15+</div>
                  <div className="text-white/60 text-sm tracking-wider">YEARS EXPERIENCE</div>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">50+</div>
                  <div className="text-white/60 text-sm tracking-wider">PROJECTS DELIVERED</div>
                </div>
              </div>

              {/* Team avatars preview */}
              <div className="flex justify-center -space-x-6 mb-12">
                {teams.slice(0, 5).map((team, index) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="w-20 h-20 rounded-full border-4 border-gray-900 overflow-hidden relative z-10">
                      <img 
                        src={resolveSrc(team.image)} 
                        alt={team.full_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/30 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                ))}
              </div>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6 text-white rotate-90" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments Filter */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">Specialization</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our team organized by expertise and functional areas
            </p>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-lg shadow-amber-600/20'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300 hover:text-amber-700'
              }`}
            >
              All Teams
            </button>
            {departments.map(dept => {
              const theme = departmentThemes[dept as keyof typeof departmentThemes] || departmentThemes.default;
              const Icon = theme.icon;
              return (
                <button
                  key={dept}
                  onClick={() => setActiveFilter(dept)}
                  className={`px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                    activeFilter === dept
                      ? `${theme.bg} ${theme.border} ${theme.text} border-2 shadow-lg`
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="capitalize">{dept}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{teamsByDepartment[dept].length}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Grid - Premium Layout */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          {error ? (
            <div className="text-center py-32">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Team</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 font-medium"
              >
                Refresh Page
              </button>
            </div>
          ) : teams.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Team Directory Empty</h3>
              <p className="text-gray-600">Our team profiles are being updated. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence>
                {teams
                  .filter(team => activeFilter === 'all' || team.department === activeFilter)
                  .map((team, index) => {
                    const theme = departmentThemes[team.department as keyof typeof departmentThemes] || departmentThemes.default;
                    return (
                      <motion.div
                        key={team.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05, type: "spring" }}
                        onMouseEnter={() => setHoveredCard(team.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="group relative"
                      >
                        {/* Card background with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl border border-gray-200 shadow-lg group-hover:shadow-2xl transition-all duration-500" />
                        
                        {/* Hover gradient overlay */}
                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${theme.bg.replace('50', '100')}/0 group-hover:opacity-100 opacity-0 transition-opacity duration-500`} />

                        <div className="relative p-6">
                          {/* Avatar with decorative ring */}
                          <div className="relative mb-6">
                            <div className="absolute -inset-4">
                              <div className="w-full h-full rounded-full bg-gradient-to-r from-amber-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl relative z-10">
                              <img
                                src={resolveSrc(team.image)}
                                alt={team.full_name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              {/* Online status indicator */}
                              <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{team.full_name}</h3>
                              <div className="flex items-center gap-2">
                                <div className={`px-3 py-1 rounded-lg ${theme.bg} ${theme.text} text-sm font-medium`}>
                                  {team.position}
                                </div>
                                {team.department && (
                                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                                    {team.department}
                                  </div>
                                )}
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                              {team.bio || "Dedicated professional committed to excellence and innovation."}
                            </p>

                            {/* Expertise tags */}
                            {team.expertise && team.expertise.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {team.expertise.slice(0, 3).map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Social links - Animated on hover */}
                            <div className="pt-4 border-t border-gray-100">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {team.email && (
                                    <a
                                      href={`mailto:${team.email}`}
                                      className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-amber-100 hover:text-amber-700 transition-all duration-300"
                                    >
                                      <Mail className="w-4 h-4" />
                                    </a>
                                  )}
                                  {team.linkedin && (
                                    <a
                                      href={team.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-blue-100 hover:text-blue-700 transition-all duration-300"
                                    >
                                      <Linkedin className="w-4 h-4" />
                                    </a>
                                  )}
                                </div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Values Section - Premium Showcase */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-amber-900/10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-6">
              <Shield className="w-5 h-5 text-amber-400" />
              <span className="text-white font-medium tracking-wider">OUR VALUES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Principles</span> That Drive Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "Innovation First",
                description: "We embrace cutting-edge solutions and continuous learning to stay ahead of the curve.",
                color: "from-blue-500/20 to-cyan-500/20"
              },
              {
                icon: Target,
                title: "Precision Execution",
                description: "Every detail matters. We deliver pixel-perfect solutions with measurable impact.",
                color: "from-emerald-500/20 to-green-500/20"
              },
              {
                icon: Users,
                title: "Collaborative Excellence",
                description: "Great minds working together create extraordinary results beyond individual capabilities.",
                color: "from-purple-500/20 to-pink-500/20"
              },
              {
                icon: Heart,
                title: "Passionate Craftsmanship",
                description: "We love what we do, and it shows in the quality and care of our work.",
                color: "from-amber-500/20 to-orange-500/20"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl hover:border-white/20 transition-all duration-500">
                  {/* Background gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <value.icon className="w-8 h-8 text-amber-400" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-white/70 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-32 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50/30" />
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Premium badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-600/10 to-amber-500/10 backdrop-blur-xl rounded-2xl border border-amber-200/50 mb-8">
              <Zap className="w-5 h-5 text-amber-600" />
              <span className="text-amber-700 font-medium tracking-wider">READY TO COLLABORATE</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">Something</span> Amazing
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join forces with our team of experts to transform your vision into reality. 
              We bring precision, passion, and proven results to every partnership.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="group relative px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 font-medium inline-flex items-center gap-3"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/30 group-hover:border-amber-400/50 transition-colors duration-500" />
              </Link>
              
              <Link 
                to="/careers" 
                className="px-10 py-4 bg-white text-gray-800 rounded-2xl border-2 border-gray-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-500 font-medium inline-flex items-center gap-3"
              >
                <Users className="w-5 h-5" />
                <span>Join Our Team</span>
              </Link>
            </div>
            
            {/* Trust indicator */}
            <div className="mt-12 pt-8 border-t border-gray-200/50">
              <p className="text-gray-500 text-sm tracking-wider uppercase mb-4">TRUSTED BY INDUSTRY LEADERS</p>
              <div className="flex flex-wrap justify-center gap-8 opacity-50">
                {[Briefcase, Globe, Award, Target, Shield].map((Icon, idx) => (
                  <Icon key={idx} className="w-8 h-8 text-gray-400" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;