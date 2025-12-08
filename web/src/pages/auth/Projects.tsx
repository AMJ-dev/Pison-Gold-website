import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Filter,
  Calendar,
  MapPin,
  Users,
  Clock,
  Building2,
  Eye,
  Target,
  BarChart3,
  Zap,
  CheckCircle,
  Search,
  X,
  Grid,
  List,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { resolveSrc, str_to_url } from "@/lib/functions";
import { http } from "@/lib/httpClient";
import { ApiResp } from "@/lib/types";
import { toast } from "react-toastify";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Project {
  id: number;
  title: string;
  short_desc: string;
  long_desc: string;
  challenges: string;
  solution: string;
  impact: string;
  cover_image: string;
  duration?: string;
  team_size?: string;
  location?: string;
  sector?: string;
  budget?: string;
  key_results?: string;
  created_at: string;
  gallery?: Array<{ id: number; image: string }>;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [showAllSectors, setShowAllSectors] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  // Extract unique sectors
  const sectors = useMemo(() => {
    const allSectors = ['all', ...new Set(projects.map(p => p.sector).filter(Boolean))];
    return allSectors.filter(sector => sector !== undefined);
  }, [projects]);

  // Calculate project stats
  const projectStats = useMemo(() => {
    const completed = projects.filter(p => p.duration?.includes('Completed')).length;
    const ongoing = projects.filter(p => p.duration?.includes('Ongoing')).length;
    const totalLocations = new Set(projects.map(p => p.location).filter(Boolean)).size;
    
    return { completed, ongoing, totalLocations };
  }, [projects]);

  // Debounced search function
  const debouncedSetSearchQuery = useCallback((value: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await http.get("/get-projects/");
      const resp: ApiResp = res.data;

      if (resp.error === false && Array.isArray(resp.data)) {
        setProjects(resp.data);
      } else {
        setError("Failed to load projects");
        toast.error("Error fetching projects");
      }
    } catch {
      setError("Network error. Please check your connection.");
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    
    // Cleanup debounce timeout
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Initialize from URL params
  useEffect(() => {
    const sector = searchParams.get('sector');
    const search = searchParams.get('search');
    
    if (sector) setActiveFilter(sector);
    if (search) {
      setSearchQuery(search);
      if (searchInputRef.current) {
        searchInputRef.current.value = search;
      }
    }
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeFilter !== 'all') params.set('sector', activeFilter);
    if (searchQuery) params.set('search', searchQuery);
    setSearchParams(params);
  }, [activeFilter, searchQuery, setSearchParams]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(p => p.sector === activeFilter);
    }
    
    if (selectedSectors.length > 0) {
      filtered = filtered.filter(p => p.sector && selectedSectors.includes(p.sector));
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.short_desc.toLowerCase().includes(query) ||
        p.sector?.toLowerCase().includes(query) ||
        p.location?.toLowerCase().includes(query) ||
        p.key_results?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [projects, activeFilter, selectedSectors, searchQuery]);

  // Toggle sector selection
  const toggleSector = useCallback((sector: string) => {
    if (sector === 'all') {
      setSelectedSectors([]);
      setActiveFilter('all');
    } else {
      setSelectedSectors(prev => 
        prev.includes(sector) 
          ? prev.filter(s => s !== sector)
          : [...prev, sector]
      );
      setActiveFilter(sector);
    }
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setActiveFilter('all');
    setSelectedSectors([]);
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    setSearchParams({});
  }, [setSearchParams]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const getSectorIcon = (sector?: string) => {
    switch(sector) {
      case 'Real Estate & Hospitality': return Building2;
      case 'Healthcare Advancement': return CheckCircle;
      case 'Technology Solutions': return Zap;
      case 'Strategic Procurement': return BarChart3;
      default: return Target;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card/50 border border-border rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-custom pt-32 pb-20">
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-card rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Unable to Load Projects</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              {error}
            </p>
            <button
              onClick={fetchProjects}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark rounded-xl hover:shadow-gold transition-all duration-300 font-semibold"
            >
              <Sparkles className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy/10 via-transparent to-gold/5" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-navy/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Portfolio Showcase</span>
              <div className="h-4 w-px bg-white/30" />
              <span>{projects.length} Projects</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Impactful Projects
              <span className="block text-gradient-gold relative">
                That Transform
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover how we deliver measurable results across {sectors.length - 1} sectors, 
              turning complex challenges into sustainable success stories.
            </p>
            
            {/* Enhanced Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{projects.length}</div>
                <div className="text-sm text-muted-foreground font-medium">Total Projects</div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{sectors.length - 1}</div>
                <div className="text-sm text-muted-foreground font-medium">Industries</div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{projectStats.totalLocations}</div>
                <div className="text-sm text-muted-foreground font-medium">Locations</div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Success Rate</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Filter Bar */}
      <section className="sticky top-0 z-50 py-4 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search projects by title, sector, location..."
                  defaultValue={searchQuery}
                  onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-24 py-3.5 bg-card/50 border border-border/50 rounded-2xl focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all placeholder:text-muted-foreground/70 backdrop-blur-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        if (searchInputRef.current) {
                          searchInputRef.current.value = "";
                        }
                      }}
                      className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <div className="h-6 w-px bg-border/50" />
                  <span className="text-xs text-muted-foreground px-2">
                    {searchQuery ? 'Searching...' : `${filteredProjects.length} results`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-gold to-gold-dark text-white shadow-gold' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-gold to-gold-dark text-white shadow-gold' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Clear All Filters */}
              {(activeFilter !== 'all' || selectedSectors.length > 0 || searchQuery) && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2.5 bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-gold/50 rounded-xl transition-all text-sm font-medium flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Sector Filters */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter by Sector:</span>
              {selectedSectors.length > 0 && (
                <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                  {selectedSectors.length} selected
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {sectors.slice(0, showAllSectors ? sectors.length : 5).map((sector) => {
                const isActive = activeFilter === sector || selectedSectors.includes(sector);
                const Icon = getSectorIcon(sector === 'all' ? undefined : sector);
                
                return (
                  <motion.button
                    key={sector}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleSector(sector)}
                    className={`px-4 py-2.5 rounded-xl border transition-all duration-300 text-sm font-medium flex items-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-gold to-gold-dark text-white border-gold shadow-gold'
                        : 'bg-card/50 text-foreground border-border/50 hover:border-gold/50 backdrop-blur-sm'
                    }`}
                  >
                    {sector !== 'all' && <Icon className="w-4 h-4" />}
                    <span>{sector === 'all' ? 'All Sectors' : sector}</span>
                  </motion.button>
                );
              })}
              
              {sectors.length > 5 && (
                <button
                  onClick={() => setShowAllSectors(!showAllSectors)}
                  className="px-4 py-2.5 bg-card/50 backdrop-blur-sm border border-border/50 text-foreground rounded-xl hover:border-gold/50 transition-all text-sm font-medium"
                >
                  {showAllSectors ? 'Show Less' : `+${sectors.length - 5} More`}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Display Section */}
      <section className="py-16">
        <div className="container-custom">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">
                {activeFilter === 'all' ? 'All Projects' : `${activeFilter} Projects`}
              </h2>
              <p className="text-muted-foreground">
                Showing <span className="font-bold text-foreground">{filteredProjects.length}</span> of{" "}
                <span className="font-bold text-foreground">{projects.length}</span> projects
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <span className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-card/50' : ''}`}>
                Grid view
              </span>
              <span className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-card/50' : ''}`}>
                List view
              </span>
            </div>
          </div>

          {/* No Results State */}
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-card/50 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border/50">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">No projects found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                {searchQuery 
                  ? `No projects match "${searchQuery}". Try a different search term.`
                  : activeFilter !== 'all'
                  ? `No projects in ${activeFilter}. Try another sector.`
                  : 'No projects available at the moment.'}
              </p>
              {(searchQuery || activeFilter !== 'all') && (
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-navy-dark rounded-xl hover:shadow-gold transition-all duration-300 font-semibold"
                >
                  <X className="w-5 h-5" />
                  Clear filters
                </button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Projects Grid/List */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={viewMode === 'grid' 
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
                }
              >
                <AnimatePresence>
                  {filteredProjects.map((project, index) => {
                    const slug = str_to_url(project.title);
                    const isHovered = hoveredProject === project.id;
                    const Icon = getSectorIcon(project.sector);

                    return viewMode === 'grid' ? (
                      // Enhanced Grid View Card
                      <motion.div
                        key={project.id}
                        layout
                        layoutId={`project-${project.id}`}
                        variants={itemVariants}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                        whileHover={{ y: -8 }}
                        className="group relative"
                      >
                        <Link
                          to={`/project/${project.id}/${slug}`}
                          className="block"
                        >
                          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-gold/30 transition-all duration-500 h-full flex flex-col">
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                              <motion.div
                                animate={{ scale: isHovered ? 1.05 : 1 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                              >
                                <img
                                  src={resolveSrc(project.cover_image)}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                              
                              {/* Sector Badge */}
                              {project.sector && (
                                <motion.div 
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  className="absolute top-4 left-4"
                                >
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                                    <Icon className="w-3 h-3 text-gold" />
                                    <span className="text-xs font-semibold text-foreground">
                                      {project.sector.split(' ')[0]}
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                              
                              {/* Hover Overlay */}
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0 }}
                                className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-transparent"
                              />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                              {/* Title */}
                              <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                                {project.title}
                              </h3>

                              {/* Description */}
                              <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
                                {project.short_desc}
                              </p>

                              {/* Metadata */}
                              <div className="space-y-3 mb-6">
                                {project.duration && (
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{project.duration}</span>
                                  </div>
                                )}
                                {project.location && (
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{project.location}</span>
                                  </div>
                                )}
                              </div>

                              {/* CTA */}
                              <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                                <span className="text-gold text-sm font-medium flex items-center gap-2">
                                  <Eye className="w-4 h-4" />
                                  View Case Study
                                </span>
                                <motion.div
                                  animate={{ x: isHovered ? 4 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold/20 transition-colors"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ) : (
                      // Enhanced List View Card
                      <motion.div
                        key={project.id}
                        layout
                        layoutId={`project-list-${project.id}`}
                        variants={itemVariants}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                        whileHover={{ x: 4 }}
                        className="group"
                      >
                        <Link
                          to={`/project/${project.id}/${slug}`}
                          className="block"
                        >
                          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gold/30 transition-all duration-500">
                            <div className="flex flex-col md:flex-row">
                              {/* Image */}
                              <div className="md:w-1/3 lg:w-1/4">
                                <div className="relative h-48 md:h-full overflow-hidden">
                                  <motion.div
                                    animate={{ scale: isHovered ? 1.05 : 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                  >
                                    <img
                                      src={resolveSrc(project.cover_image)}
                                      alt={project.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </motion.div>
                                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent md:bg-gradient-to-r md:from-black/30" />
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 p-6">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                  <div className="flex-1">
                                    {/* Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                                      <div className="flex-1">
                                        {/* Sector Badge */}
                                        {project.sector && (
                                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 text-gold rounded-full mb-3">
                                            <Icon className="w-3 h-3" />
                                            <span className="text-xs font-semibold">{project.sector}</span>
                                          </div>
                                        )}
                                        
                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                                          {project.title}
                                        </h3>
                                      </div>
                                      
                                      {/* Desktop CTA */}
                                      <div className="hidden lg:block">
                                        <motion.div
                                          animate={{ x: isHovered ? 4 : 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold/20 transition-colors"
                                        >
                                          <ArrowRight className="w-5 h-5" />
                                        </motion.div>
                                      </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-muted-foreground mb-6 line-clamp-2">
                                      {project.short_desc}
                                    </p>

                                    {/* Metadata */}
                                    <div className="flex flex-wrap gap-4 mb-6">
                                      {project.duration && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                          <Clock className="w-4 h-4" />
                                          <span>{project.duration}</span>
                                        </div>
                                      )}
                                      {project.location && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                          <MapPin className="w-4 h-4" />
                                          <span>{project.location}</span>
                                        </div>
                                      )}
                                      {project.team_size && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                          <Users className="w-4 h-4" />
                                          <span>{project.team_size}</span>
                                        </div>
                                      )}
                                      {project.created_at && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                          <Calendar className="w-4 h-4" />
                                          <span>{new Date(project.created_at).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'short' 
                                          })}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Mobile CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-border/50 lg:hidden">
                                  <span className="text-gold text-sm font-medium flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    View Case Study
                                  </span>
                                  <motion.div
                                    animate={{ x: isHovered ? 4 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center"
                                  >
                                    <ArrowRight className="w-4 h-4" />
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* Load More */}
              {/* {filteredProjects.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-16"
                >
                  <button className="group inline-flex items-center gap-3 px-8 py-4 bg-card/50 backdrop-blur-sm border-2 border-border text-foreground rounded-2xl hover:border-gold hover:text-gold transition-all duration-300 font-semibold text-lg">
                    <span>Load More Projects</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )} */}
            </>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy/10 via-transparent to-gold/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-gold/5 to-transparent rounded-full blur-3xl" />
        
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-gold/20 to-gold/10 backdrop-blur-sm border border-gold/30 text-gold rounded-full font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Ready to Start Your Project?</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
              Let's Build Something
              <span className="block text-gradient-gold">
                Remarkable Together
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind? Let's discuss how we can transform your vision 
              into measurable success with our proven approach.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gold via-gold to-gold-dark text-navy-dark rounded-xl hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 font-semibold text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative">Start Your Project</span>
                <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/services" 
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-card/50 backdrop-blur-sm border-2 border-border text-foreground rounded-xl hover:border-gold hover:text-gold transition-all duration-300 font-semibold text-lg"
              >
                <span>Explore Services</span>
                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground mt-8">
              Average response time: <span className="font-semibold text-gold">2 hours</span>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;