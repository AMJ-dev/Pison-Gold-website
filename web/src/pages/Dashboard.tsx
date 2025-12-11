import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  Users,
  MessageSquareQuote,
  ImageIcon,
  ArrowRight,
  Loader,
  Plus,
  TrendingUp,
  Edit,
  Calendar,
  ChevronRight,
  Star,
  ExternalLink,
  Home,
  Activity,
  Zap,
  RefreshCw,
  Sparkles,
  Target,
  Award,
  BarChart,
  Shield,
  Clock,
  CheckCircle,
  Eye,
  TrendingDown,
  Bell,
  Download,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { http } from "@/lib/httpClient";
import { toast } from "react-toastify";
import { resolveSrc, str_to_url } from "@/lib/functions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    teams: 0,
    testimonies: 0,
    gallery_images: 0,
  });

  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentTeams, setRecentTeams] = useState<any[]>([]);
  const [recentTestimonies, setRecentTestimonies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("month");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await http.get("/get-dashboard/");
      const data = res.data;
      
      if (data.error) {
        toast.error("Failed to load dashboard");
        return;
      }

      setStats(data.stats || {});
      setRecentProjects(data.recent_projects || []);
      setRecentTeams(data.recent_teams || []);
      setRecentTestimonies(data.recent_testimonies || []);
    } catch (error) {
      console.error("Dashboard error:", error);
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: "Active Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "orange",
      gradient: "from-orange-500 to-amber-500",
      bg: "bg-gradient-to-br from-orange-50 to-amber-50",
      border: "border-orange-100",
      trend: stats.projects > 0 ? "+12%" : "0%",
      trendIcon: stats.projects > 0 ? TrendingUp : TrendingDown,
      trendColor: stats.projects > 0 ? "text-emerald-600" : "text-red-600",
      link: "/projects/all",
      delay: 0.1
    },
    {
      name: "Team Members",
      value: stats.teams,
      icon: Users,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
      border: "border-blue-100",
      trend: stats.teams > 0 ? "+8%" : "0%",
      trendIcon: stats.teams > 0 ? TrendingUp : TrendingDown,
      trendColor: stats.teams > 0 ? "text-emerald-600" : "text-red-600",
      link: "/teams/all",
      delay: 0.2
    },
    {
      name: "Testimonials",
      value: stats.testimonies,
      icon: MessageSquareQuote,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
      border: "border-emerald-100",
      trend: stats.testimonies > 0 ? "+24%" : "0%",
      trendIcon: stats.testimonies > 0 ? TrendingUp : TrendingDown,
      trendColor: stats.testimonies > 0 ? "text-emerald-600" : "text-red-600",
      link: "/testimonies/all",
      delay: 0.3
    },
  ];

  const quickActions = [
    {
      title: "New Project",
      description: "Create project with gallery",
      icon: FolderKanban,
      color: "orange",
      gradient: "from-orange-500 to-amber-500",
      iconBg: "bg-orange-500",
      path: "/projects/add",
      delay: 0.1
    },
    {
      title: "Add Testimonial",
      description: "Collect client feedback",
      icon: MessageSquareQuote,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-500",
      path: "/testimonies/add",
      delay: 0.2
    },
    {
      title: "Add Team Member",
      description: "Expand your team",
      icon: Users,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500",
      path: "/teams/add",
      delay: 0.3
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex justify-center items-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 blur-2xl opacity-20 rounded-full" />
            <Loader className="w-16 h-16 text-amber-500 relative" />
          </motion.div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <div className="relative z-10 pt-28 pb-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-amber-100/30 to-orange-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-r from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 blur-lg opacity-20 rounded-2xl" />
                    <div className="relative p-3 rounded-2xl bg-white border border-gray-200 shadow-lg">
                      <Home className="w-7 h-7 text-amber-600" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                      Dashboard <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Overview</span>
                    </h1>
                    <p className="text-gray-600 mt-2">Welcome back! Your content is looking great.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm text-gray-600">All systems operational</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Updated just now</span>
                </div>
                <button 
                  onClick={loadDashboard}
                  className="group relative overflow-hidden px-5 py-3 rounded-xl bg-white border border-gray-200 hover:border-amber-300 transition-all shadow-sm hover:shadow-lg flex items-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <RefreshCw className="w-4 h-4 text-gray-600 group-hover:text-amber-600 transition-colors relative" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors relative">Refresh</span>
                </button>
              </div>
            </div>

          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay }}
                className="group"
              >
                <Link to={stat.link}>
                  <div className={`relative overflow-hidden rounded-2xl ${stat.bg} border ${stat.border} p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-500`}>
                    {/* Shine effect */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm`}>
                          <stat.trendIcon className={`w-3.5 h-3.5 ${stat.trendColor}`} />
                          <span className={`text-xs font-semibold ${stat.trendColor}`}>{stat.trend}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-end gap-2">
                          <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                          <span className="text-gray-500 text-sm mb-1">items</span>
                        </div>
                        <p className="text-gray-700 font-semibold text-lg">{stat.name}</p>
                      </div>

                      <div className="relative pt-5 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">View details</span>
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 group-hover:bg-gradient-to-r group-hover:from-amber-50 group-hover:to-orange-50 transition-all flex items-center justify-center">
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl bg-white border border-gray-200 shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Quick Actions</h3>
                    <p className="text-gray-500 text-sm">Common tasks to get started</p>
                  </div>
                  <Zap className="w-5 h-5 text-amber-500" />
                </div>

                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <Link key={action.title} to={action.path}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: action.delay }}
                        whileHover={{ x: 4 }}
                        className="group relative overflow-hidden flex items-center gap-4 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-white hover:to-gray-50 transition-all border border-gray-200 hover:border-amber-300 hover:shadow-md"
                      >
                        <div className="relative">
                          <div className={`p-3 rounded-xl ${action.iconBg} bg-gradient-to-br ${action.gradient} shadow-lg`}>
                            <action.icon className="w-5 h-5 text-white" />
                          </div>
                          <motion.div
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: action.delay }}
                          >
                            <Plus className="w-3 h-3 text-gray-700" />
                          </motion.div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-gray-900 transition-colors">
                            {action.title}
                          </h4>
                          <p className="text-gray-500 text-sm">{action.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Projects */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg">
                        <FolderKanban className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Recent Projects</h3>
                        <p className="text-gray-500 text-sm">Latest project developments</p>
                      </div>
                    </div>
                    <Link 
                      to="/projects/all" 
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      View all
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  {recentProjects.length === 0 ? (
                    <div className="text-center py-8">
                      <FolderKanban className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No projects yet</p>
                      <Link to="/projects/add" className="text-sm text-amber-600 hover:text-amber-700 mt-2 inline-block">
                        Create first project →
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recentProjects.slice(0, 4).map((project, index) => (
                        <Link 
                          key={project.id} 
                          to={`/projects/edit/${project.id}/${str_to_url(project.title)}`}
                          className="group"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative overflow-hidden rounded-xl bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 border border-gray-200 hover:border-amber-300 p-5 transition-all hover:shadow-md"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 flex items-center justify-center">
                                  <FolderKanban className="w-6 h-6 text-orange-600" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate mb-1">{project.title}</h4>
                                <p className="text-gray-500 text-sm line-clamp-2">
                                  {project.short_desc || "No description"}
                                </p>
                              </div>
                              <Edit className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Team Members */}
            <div className="rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Team Members</h3>
                      <p className="text-gray-500 text-sm">Latest team additions</p>
                    </div>
                  </div>
                  <Link 
                    to="/teams/all" 
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    View all
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {recentTeams.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No team members</p>
                    <Link to="/teams/add" className="text-sm text-blue-600 hover:text-blue-700 mt-2 inline-block">
                      Add first member →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentTeams.slice(0, 4).map((member, index) => (
                      <Link 
                        key={member.id} 
                        to={`/teams/edit/${member.id}/${str_to_url(member.full_name)}`}
                        className="group"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-white hover:to-gray-50 border border-gray-200 hover:border-blue-300 transition-all hover:shadow-sm"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 overflow-hidden shadow-sm">
                              {member.image ? (
                                <img 
                                  src={resolveSrc(member.image)} 
                                  alt={member.full_name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                                  <Users className="w-6 h-6 text-blue-600" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{member.full_name}</h4>
                            <p className="text-gray-500 text-sm truncate">{member.position || "No position"}</p>
                          </div>
                          <Edit className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Testimonials */}
            <div className="rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                      <MessageSquareQuote className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Client Testimonials</h3>
                      <p className="text-gray-500 text-sm">Latest client feedback</p>
                    </div>
                  </div>
                  <Link 
                    to="/testimonies/all" 
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    View all
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {recentTestimonies.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquareQuote className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No testimonials yet</p>
                    <Link to="/testimonies/add" className="text-sm text-emerald-600 hover:text-emerald-700 mt-2 inline-block">
                      Add first testimonial →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentTestimonies.slice(0, 4).map((testimonial, index) => (
                      <Link 
                        key={testimonial.id} 
                        to={`/testimonies/edit/${testimonial.id}/${str_to_url(testimonial.full_name)}`}
                        className="group"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative overflow-hidden rounded-xl bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 border border-gray-200 hover:border-emerald-300 p-5 transition-all hover:shadow-md"
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0">
                              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 overflow-hidden shadow-sm">
                                {testimonial.image ? (
                                  <img 
                                    src={resolveSrc(testimonial.image)} 
                                    alt={testimonial.full_name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                                    <Users className="w-7 h-7 text-emerald-600" />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">{testimonial.full_name}</h4>
                              <p className="text-gray-500 text-sm truncate">
                                {testimonial.position || testimonial.company || "Client"}
                              </p>
                              <div className="flex items-center gap-1 mt-2">
                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <blockquote className="text-gray-600 italic text-sm relative pl-4 border-l border-emerald-300 mb-4 line-clamp-3">
                            "{testimonial.testimonial?.slice(0, 100) || "Excellent service and outstanding results!"}..."
                          </blockquote>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="text-xs text-gray-500">Click to edit</div>
                            <Edit className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dashboard Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm">All systems operational • Last updated: Just now</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.projects + stats.teams + stats.testimonies}
                  </div>
                  <div className="text-gray-500 text-sm">Total Content Items</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:shadow-lg transition-shadow">
                  Export Report
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;