import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Star, 
  Diamond, 
  Sparkles, 
  Rocket, 
  Award, 
  TrendingUp,
  Globe,
  Calendar,
  Target,
  Users,
  Zap,
  ChevronRight,
  Filter,
  X,
  Eye,
  BarChart3,
  Shield,
  Lightbulb,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { resolveSrc, str_to_url } from "@/lib/functions";
import { http } from "@/lib/httpClient";
import { ApiResp } from "@/lib/types";
import { toast } from "react-toastify";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import projectsHero from "@/assets/projects-hero.jpg";

// ----------------------------------------

interface Project {
  id: number;
  title: string;
  description: string;
  challenges: string;
  solution: string;
  impact: string;
  cover_image: string;
  category?: string;
  duration?: string;
  client?: string;
  location?: string;
  status?: 'completed' | 'ongoing' | 'upcoming';
  technologies?: string[];
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await http.get("/get-projects/");
      const resp: ApiResp = res.data;

      if (resp.error === false && Array.isArray(resp.data)) {
        setProjects(resp.data);
      } else {
        toast.error("Error fetching projects");
      }
    } catch {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];
    return cats.filter(cat => cat !== undefined);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [projects, activeFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full mx-auto"
            />
            <Sparkles className="w-8 h-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-6 text-foreground/60 font-medium">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ======================================================
          PREMIUM HERO SECTION
      =======================================================*/}
      <section className="relative min-h-[85vh] overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-background" />
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-r from-accent/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* Background Image with Parallax Effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={projectsHero}
            alt="Projects"
            className="w-full h-full object-cover opacity-20"
          />
        </motion.div>

        {/* Animated Elements */}
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 right-1/4"
        >
          <Rocket className="w-16 h-16 text-accent/20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/3 left-1/4"
        >
          <Diamond className="w-12 h-12 text-white/10" />
        </motion.div>

        <div className="container-custom relative h-full min-h-[85vh] flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-8">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-white/90 font-medium text-sm tracking-wider">PORTFOLIO</span>
              </div>
              <div className="h-4 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-white/80 text-sm">AWARD-WINNING WORK</span>
              </div>
            </div>

            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-[0.9] tracking-tight">
              <span className="block">IMPACT</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent">
                THROUGH
              </span>
              <span className="block">INNOVATION</span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed font-light">
              Where visionary ideas meet precision execution. Explore our portfolio of 
              transformative projects that redefine industries and create lasting value.
            </p>

            {/* Stats Ribbon */}
            <div className="flex flex-wrap gap-8 mb-12">
              <div className="text-white">
                <div className="text-3xl font-bold mb-1">{projects.length}+</div>
                <div className="text-white/60 text-sm tracking-wider">PROJECTS DELIVERED</div>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="text-white">
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-white/60 text-sm tracking-wider">CLIENT SATISFACTION</div>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="text-white">
                <div className="text-3xl font-bold mb-1">15+</div>
                <div className="text-white/60 text-sm tracking-wider">INDUSTRIES SERVED</div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-white rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          FILTER BAR - PREMIUM
      =======================================================*/}
      <section className="sticky top-0 z-40 py-6 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                <span className="text-accent">{filteredProjects.length}</span> Projects
                {activeFilter !== 'all' && (
                  <span className="text-foreground/60 ml-2">in {activeFilter}</span>
                )}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-foreground/60">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = activeFilter === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`px-4 py-2 rounded-xl border transition-all duration-300 text-sm font-medium ${
                        isActive
                          ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
                          : 'bg-card text-foreground/70 border-border hover:border-accent/50 hover:text-accent'
                      }`}
                    >
                      {category === 'all' ? 'All Projects' : category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          PROJECTS GRID - PREMIUM CARDS
      =======================================================*/}
      <section className="relative py-24 bg-background">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[5%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          {projects.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-24 h-24 bg-gradient-to-br from-border to-border/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-12 h-12 text-foreground/40" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">No Projects Available</h3>
              <p className="text-foreground/60 max-w-md mx-auto">
                Our portfolio is being updated with new case studies. Check back soon.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredProjects.map((project) => {
                  const slug = str_to_url(project.title);
                  const isHovered = hoveredProject === project.id;

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      variants={itemVariants}
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      className="group relative"
                    >
                      {/* Card Container */}
                      <Link
                        to={`/project/${project.id}/${slug}`}
                        className="block relative z-10"
                      >
                        {/* Background with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-background rounded-3xl border border-border/40 shadow-xl group-hover:shadow-2xl transition-all duration-500" />
                        
                        {/* Hover gradient overlay */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Content Container */}
                        <div className="relative p-6">
                          {/* Image Container */}
                          <div className="relative mb-6 overflow-hidden rounded-2xl">
                            <div className="relative h-56 overflow-hidden">
                              <img
                                src={resolveSrc(project.cover_image)}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                              
                              {/* Status Badge */}
                              {project.status && (
                                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                                  project.status === 'completed'
                                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30'
                                    : project.status === 'ongoing'
                                    ? 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
                                    : 'bg-amber-500/20 text-amber-200 border border-amber-500/30'
                                }`}>
                                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Category & Metadata */}
                          <div className="flex items-center justify-between mb-4">
                            {project.category && (
                              <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                                {project.category}
                              </span>
                            )}
                            {project.duration && (
                              <div className="flex items-center gap-1 text-foreground/50 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>{project.duration}</span>
                              </div>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-3">
                            {project.description || project.solution || "A transformative project delivering exceptional results."}
                          </p>

                          {/* Challenge & Solution Highlights */}
                          <div className="space-y-3 mb-6">
                            {project.challenges && (
                              <div className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                <p className="text-foreground/60 text-sm line-clamp-2">
                                  <span className="font-medium text-foreground">Challenge: </span>
                                  {project.challenges.length > 80 ? project.challenges.slice(0, 80) + "…" : project.challenges}
                                </p>
                              </div>
                            )}
                            {project.solution && (
                              <div className="flex items-start gap-2">
                                <Shield className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                <p className="text-foreground/60 text-sm line-clamp-2">
                                  <span className="font-medium text-foreground">Solution: </span>
                                  {project.solution.length > 80 ? project.solution.slice(0, 80) + "…" : project.solution}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Technologies */}
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.technologies.slice(0, 3).map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 bg-border/50 text-foreground/70 rounded-lg text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="px-2.5 py-1 bg-border/50 text-foreground/50 rounded-lg text-xs">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Footer with CTA */}
                          <div className="flex items-center justify-between pt-6 border-t border-border/30">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent-light flex items-center justify-center">
                                <Eye className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-accent font-medium text-sm">
                                View Case Study
                              </span>
                            </div>
                            <motion.div
                              animate={{ x: isHovered ? 5 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"
                            >
                              <ArrowRight className="w-5 h-5 text-accent" />
                            </motion.div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* View All Projects CTA */}
          {activeFilter !== 'all' && (
            <div className="text-center mt-16">
              <button
                onClick={() => setActiveFilter('all')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-accent text-accent rounded-xl hover:bg-accent hover:text-white transition-all duration-300 font-medium"
              >
                <X className="w-4 h-4" />
                Clear Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          PREMIUM STATS SECTION
      =======================================================*/}
      <section className="py-24 bg-gradient-to-br from-navy via-navy-dark to-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-6">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-white font-medium tracking-wider">IMPACT METRICS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Results That <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">Speak</span> Volumes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "98%", label: "Client Retention Rate", color: "from-blue-500/20 to-cyan-500/20" },
              { icon: Zap, value: "150%", label: "Average ROI", color: "from-emerald-500/20 to-green-500/20" },
              { icon: Globe, value: "25+", label: "Countries Reached", color: "from-purple-500/20 to-pink-500/20" },
              { icon: Award, value: "50+", label: "Industry Awards", color: "from-amber-500/20 to-orange-500/20" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl hover:border-accent/30 transition-all duration-500">
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <stat.icon className="w-8 h-8 text-accent" />
                    </div>
                    
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <p className="text-white/70 text-sm">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          PREMIUM CTA SECTION
      =======================================================*/}
      <section className="relative py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Premium CTA Badge */}
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent/20 to-accent-light/20 backdrop-blur-xl rounded-3xl border border-accent/30 mb-10">
              <Rocket className="w-6 h-6 text-accent" />
              <span className="text-accent font-bold text-lg tracking-wider">YOUR VISION, OUR EXPERTISE</span>
            </div>
            
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-8">
              Ready to Write <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">Your</span> Success Story?
            </h2>
            
            <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your vision into measurable impact. Partner with us to create solutions 
              that not only meet expectations but redefine what's possible in your industry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/contact" 
                className="group relative px-12 py-5 bg-gradient-to-r from-accent to-accent-light text-white rounded-2xl hover:shadow-2xl hover:shadow-accent/30 transition-all duration-500 font-bold text-lg inline-flex items-center gap-4"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-2xl border-2 border-accent/30 group-hover:border-accent/50 transition-colors duration-500" />
              </Link>
              
              <Link 
                to="/services" 
                className="px-12 py-5 bg-white text-foreground rounded-2xl border-2 border-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-500 font-bold text-lg inline-flex items-center gap-4"
              >
                <BarChart3 className="w-6 h-6" />
                <span>Explore Services</span>
              </Link>
            </div>
            
            {/* Trust Indicator */}
            <div className="mt-16 pt-8 border-t border-border/30">
              <p className="text-foreground/50 text-sm tracking-wider uppercase mb-6">TRUSTED BY GLOBAL INNOVATORS</p>
              <div className="flex flex-wrap justify-center gap-12 opacity-40">
                {[Globe, Shield, Award, Target, Star, Diamond].map((Icon, idx) => (
                  <Icon key={idx} className="w-10 h-10 text-foreground/30" />
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

export default Projects;