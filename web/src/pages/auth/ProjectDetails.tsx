import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Calendar,
  MapPin,
  Target,
  Lightbulb,
  BarChart3,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Building2,
  Clock,
  DollarSign,
  Sparkles,
  Shield,
  Globe,
  Zap,
  Cpu,
  BarChart,
  Users as TeamIcon,
  TrendingUp
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { http } from "@/lib/httpClient";
import { ApiResp } from "@/lib/types";
import { resolveSrc } from "@/lib/functions";
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [similarProjects, setSimilarProjects] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await http.get(`/get-project/${id}/`);
      const resp: ApiResp = res.data;
      if (resp.error === false && resp.data) {
        setProject(resp.data.project);
        setSimilarProjects(resp.data.similar_projects || []);
        setStats(resp.data.stats || {
          total_projects: 0,
          sectors_covered: 0,
          completed_projects: "0",
          locations_covered: 0
        });
      } else {
        toast.error("Project not found");
        navigate("/projects");
      }
    } catch (error) {
      toast.error("Failed to load project");
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setLightboxIndex(index);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!project?.gallery) return;
    const newIndex = direction === "next" 
      ? (lightboxIndex + 1) % project.gallery.length
      : (lightboxIndex - 1 + project.gallery.length) % project.gallery.length;
    setLightboxIndex(newIndex);
    setSelectedImage(resolveSrc(project.gallery[newIndex].image));
  };

  const sectorIcons = {
    'Real Estate & Hospitality': Building2,
    'Healthcare Advancement': Shield,
    'Technology Solutions': Cpu,
    'Strategic Procurement': BarChart,
    'Education Technology & Infrastructure': Cpu,
    'Infrastructure': Building2,
    'Consulting': Users
  };

  const statsData = [
    { label: "Timeline", value: project?.duration || "6-12 Months", icon: Clock, color: "text-blue-500" },
    { label: "Budget", value: project?.budget || "Confidential", icon: DollarSign, color: "text-emerald-500" },
    { label: "Team Size", value: project?.team_size || "25+ Experts", icon: TeamIcon, color: "text-purple-500" },
    { label: "Success Rate", value: "100%", icon: Award, color: "text-gold" },
  ];

  // Extract key results from comma-separated string
  const keyResults = project?.key_results 
    ? project.key_results.split(',').map((r: string) => r.trim()).filter((r: string) => r.length > 0)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-lg">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) return null;

  const SectorIcon = sectorIcons[project.sector] || Building2;

  // Format the long description with line breaks
  const formattedLongDesc = project.long_desc?.replace(/\r\n\r\n/g, '</p><p class="mb-4">').replace(/\r\n/g, '<br />') || '';

  // Format challenges with better structure
  const formatChallenges = (text: string) => {
    return text.split(/\r\n\r\n/).map((section, index) => {
      const lines = section.split(/\r\n/);
      return (
        <div key={index} className="mb-6">
          {lines.map((line, lineIndex) => {
            if (lineIndex === 0 && line.match(/^\d+\./)) {
              return <h4 key={lineIndex} className="font-bold text-lg mb-2 text-foreground">{line}</h4>;
            } else if (line.includes(':')) {
              const [title, ...content] = line.split(':');
              return (
                <div key={lineIndex} className="ml-4 mb-2">
                  <span className="font-semibold text-foreground">{title.trim()}:</span>
                  <span className="text-muted-foreground">{content.join(':').trim()}</span>
                </div>
              );
            }
            return <p key={lineIndex} className="ml-4 text-muted-foreground mb-1">{line}</p>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section with Parallax - Background Only */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background with gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.85), rgba(10, 25, 47, 0.92)), url(${resolveSrc(project.cover_image)})`,
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-accent/10 to-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-navy/20 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Content - Only back button */}
        <div className="absolute inset-0 flex items-start">
          <div className="container-custom pt-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Back button */}
              <button
                onClick={() => navigate("/projects")}
                className="group inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Projects</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-background to-navy-dark/5">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-border/50 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl ${stat.color.replace('text-', 'bg-')}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-heading font-bold mb-2">{stat.value}</div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-20">
              {/* Project Overview Section - OPTION 2 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-10">
                {/* Project badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/20 mb-8">
                  <SectorIcon className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent uppercase tracking-wider">
                    {project.sector || "Featured Project"}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  {project.title}
                </h1>

                {/* Short description */}
                {project.short_desc && (
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                    {project.short_desc}
                  </p>
                )}

                {/* Project metadata */}
                <div className="flex flex-wrap gap-6 mb-8">
                  {project.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      <span>{project.location}</span>
                    </div>
                  )}
                  {project.created_at && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-5 h-5" />
                      <span>{new Date(project.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <a href="#timeline" className="group inline-flex items-center gap-3 bg-gradient-to-r from-accent to-gold-dark text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    <span>Explore Journey</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link to="/contact" className="group inline-flex items-center gap-3 border-2 border-accent/30 text-accent px-6 py-3 rounded-xl font-medium hover:bg-accent/5 transition-all duration-300">
                    <span>Start Similar Project</span>
                    <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Project Story */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-2 h-12 bg-gradient-to-b from-accent to-gold rounded-full" />
                  <div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold">The Story</h2>
                    <p className="text-muted-foreground mt-2">How we transformed vision into reality</p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
                  {formattedLongDesc ? (
                    <div dangerouslySetInnerHTML={{ __html: formattedLongDesc }} />
                  ) : (
                    <>
                      <p>
                        This project represents a significant achievement in {project.sector?.toLowerCase() || "our portfolio"}, 
                        combining innovative solutions with strategic execution to deliver exceptional results.
                      </p>
                      <p>
                        Through careful planning and expert implementation, we were able to overcome 
                        complex challenges and deliver a solution that not only meets but exceeds 
                        expectations, setting a new standard for excellence in the industry.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Timeline Section */}
              <div id="timeline">
                <h2 className="font-heading text-4xl font-bold mb-10">Project Journey</h2>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-gold to-accent" />
                  
                  <div className="space-y-12 pl-16">
                    {[
                      {
                        icon: Target,
                        title: "The Challenge",
                        content: project.challenges ? formatChallenges(project.challenges) : "Identifying key obstacles and defining project scope for optimal outcomes.",
                        color: "bg-red-500/10 border-red-500/20 text-red-600"
                      },
                      {
                        icon: Lightbulb,
                        title: "Our Solution",
                        content: project.solution ? formatChallenges(project.solution) : "Developing innovative approaches and implementing strategic solutions.",
                        color: "bg-blue-500/10 border-blue-500/20 text-blue-600"
                      },
                      {
                        icon: BarChart3,
                        title: "Implementation",
                        content: "Executing the plan with precision, adapting to challenges, and ensuring quality at every stage.",
                        color: "bg-purple-500/10 border-purple-500/20 text-purple-600"
                      },
                      {
                        icon: TrendingUp,
                        title: "The Impact",
                        content: project.impact ? formatChallenges(project.impact) : "Delivering measurable results and creating lasting value for stakeholders.",
                        color: "bg-green-500/10 border-green-500/20 text-green-600"
                      }
                    ].map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <motion.div
                          key={step.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="relative group"
                        >
                          {/* Timeline dot */}
                          <div className="absolute -left-[58px] w-12 h-12 rounded-full flex items-center justify-center bg-background border-4 border-accent shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-accent" />
                          </div>
                          
                          <div className={`p-8 rounded-3xl border ${step.color} backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                            <h3 className="font-heading text-2xl font-bold mb-4 flex items-center gap-3">
                              {step.title}
                              <div className="text-sm font-normal px-3 py-1 rounded-full bg-white/10">
                                Step {index + 1}
                              </div>
                            </h3>
                            <div className="text-muted-foreground leading-relaxed">
                              {step.content}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Key Results */}
              {keyResults.length > 0 && (
                <div>
                  <h2 className="font-heading text-4xl font-bold mb-10">Key Results</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {keyResults.map((result: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-4 p-6 bg-card/50 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-foreground/90">{result}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div id="gallery">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="font-heading text-4xl font-bold">Project Gallery</h2>
                      <p className="text-muted-foreground mt-2">Visual journey through the project</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {project.gallery.length} images
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {project.gallery.map((img: any, index: number) => (
                      <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                          index === 0 ? "md:col-span-2 md:row-span-2" : "aspect-square"
                        }`}
                        onClick={() => handleImageClick(resolveSrc(img.image), index)}
                      >
                        <img
                          src={resolveSrc(img.image)}
                          alt={`Project gallery ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full">
                            <Maximize2 className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sticky Sidebar */}
            <aside className="lg:sticky lg:top-24 self-start space-y-8">
              {/* Project Summary Card */}
              <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-xl">
                <h3 className="font-heading text-2xl font-bold mb-6">Quick Info</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Project Name</div>
                    <div className="font-semibold text-lg">{project.title}</div>
                  </div>
                  
                  {project.sector && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Sector</div>
                      <div className="flex items-center gap-2">
                        <SectorIcon className="w-4 h-4 text-accent" />
                        <span className="font-medium">{project.sector}</span>
                      </div>
                    </div>
                  )}

                  {project.location && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Location</div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="font-medium">{project.location}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-medium">Completed</span>
                    </div>
                  </div>

                  <hr className="border-border/40" />

                  {/* Quick Navigation */}
                  <nav className="space-y-3">
                    <div className="text-sm text-muted-foreground mb-2">Quick Navigation</div>
                    {['The Story', 'Project Journey', 'Key Results', 'Gallery'].map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between text-foreground/80 hover:text-accent transition-colors group"
                      >
                        <span>{item}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all" />
                      </a>
                    ))}
                  </nav>
                </div>

                <Link
                  to="/contact"
                  className="group mt-8 w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-gold-dark text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Similar Projects */}
              {similarProjects.length > 0 && (
                <div className="bg-card/50 border border-border/50 rounded-3xl p-8">
                  <h3 className="font-heading text-xl font-bold mb-6">Related Projects</h3>
                  <div className="space-y-4">
                    {similarProjects.map((similar) => {
                      const SimilarIcon = sectorIcons[similar.sector] || Building2;
                      return (
                        <Link
                          key={similar.id}
                          to={`/projects/${similar.id}`}
                          className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors"
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-gold/10 rounded-xl flex items-center justify-center">
                            {similar.cover_image ? (
                              <img
                                src={resolveSrc(similar.cover_image)}
                                alt={similar.title}
                                className="w-full h-full rounded-xl object-cover"
                              />
                            ) : (
                              <SimilarIcon className="w-6 h-6 text-accent" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium group-hover:text-accent transition-colors line-clamp-2">
                              {similar.title}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              View details →
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Portfolio Stats */}
              {stats && (
                <div className="bg-card/50 border border-border/50 rounded-3xl p-8">
                  <h3 className="font-heading text-xl font-bold mb-6">Portfolio Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Projects</span>
                      <span className="text-lg font-bold text-accent">{stats.total_projects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Sectors Covered</span>
                      <span className="text-lg font-bold text-accent">{stats.sectors_covered}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Locations</span>
                      <span className="text-lg font-bold text-accent">{stats.locations_covered}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="text-lg font-bold text-green-500">100%</span>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-navy-dark via-primary to-navy">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.2),transparent_50%)]" />
        
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-white font-medium">Ready to Build Your Vision?</span>
            </div>
            
            <h2 className="font-heading text-5xl md:text-6xl text-white font-bold">
              Let's Create Something
              <span className="text-gradient-gold"> Extraordinary</span>
            </h2>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Partner with Pison-Gold to transform your vision into reality with 
              integrated solutions that deliver measurable impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 bg-gradient-to-r from-gold to-gold-dark text-navy-dark px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-gold/40 hover:shadow-gold/60 transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link
                to="/projects"
                className="group inline-flex items-center gap-4 border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <span>View All Projects</span>
                <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Project gallery"
                className="w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                {lightboxIndex + 1} / {project.gallery.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProjectDetails;