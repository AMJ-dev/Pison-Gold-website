import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { http } from "@/lib/httpClient";
import { toast } from "react-toastify";
import {
  Plus,
  Trash2,
  Pencil,
  Loader,
  Image as ImageIcon,
  FolderKanban,
  Eye,
  Calendar,
  ArrowRight,
  Search,
  Filter,
  MoreVertical,
  Download,
  Copy,
  AlertCircle,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { resolveSrc, str_to_url } from "@/lib/functions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ApiResp } from "@/lib/types";

interface Project {
  id: number;
  title: string;
  cover_image: string | null;
  short_desc?: string;
  created_at?: string;
}

const List = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const categories = [
    { id: "all", name: "All Projects", count: projects.length },
    { id: "real-estate", name: "Real Estate", count: Math.floor(projects.length * 0.4) },
    { id: "healthcare", name: "Healthcare", count: Math.floor(projects.length * 0.3) },
    { id: "technology", name: "Technology", count: Math.floor(projects.length * 0.2) },
    { id: "procurement", name: "Procurement", count: Math.floor(projects.length * 0.1) },
  ];

  const loadProjects = async () => {
    try {
      const res = await http.get("/get-projects/");
      const resp:ApiResp = res.data;
      if (resp.error==false && resp.data) {
        setProjects(resp.data || []);
        return;
      } 
      toast.error(resp.data);
    } catch (err) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const deleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

    setDeleting(id);

    try {
      const form = new FormData();
      form.append("id", String(id));

      const res = await http.post("/delete-project/", form);

      if (!res.data.error) {
        toast.success("Project deleted successfully");
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to delete project");
    } finally {
      setDeleting(null);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (project.short_desc && project.short_desc.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all";
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex justify-center items-center">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 blur-xl opacity-20 rounded-full" />
          <Loader className="w-16 h-16 text-amber-500 relative" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <Header />
      
      <div className="relative z-10 pt-32 pb-20">
        <div className="container-custom">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300 flex items-center justify-center shadow-sm"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <FolderKanban className="w-8 h-8 text-amber-600" />
                  </motion.div>
                  <div>
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-2">
                      Project <span className="text-gradient-amber">Gallery</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                      Manage and organize all your project portfolios
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/projects/add"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-5 text-white font-semibold text-lg inline-flex items-center justify-center space-x-3 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-500 transition-all duration-500" />
                <Plus className="w-6 h-6 relative" />
                <span className="relative">Add New Project</span>
                <motion.div
                  className="relative"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Projects</p>
                    <h3 className="text-3xl font-heading font-bold text-gray-900">{projects.length}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active</p>
                    <h3 className="text-3xl font-heading font-bold text-gray-900">{Math.floor(projects.length * 0.7)}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">This Month</p>
                    <h3 className="text-3xl font-heading font-bold text-gray-900">{Math.floor(projects.length * 0.1)}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Filtered</p>
                    <h3 className="text-3xl font-heading font-bold text-gray-900">{filteredProjects.length}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Filter className="w-6 h-6 text-violet-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Search and Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="relative flex-1 max-w-2xl">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search projects by title or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all shadow-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                          selectedCategory === category.id
                            ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                            : "bg-white text-gray-700 border-gray-300 hover:border-amber-300"
                        }`}
                      >
                        {category.name} ({category.count})
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence>
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <AlertCircle className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">
                  No Projects Found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  {searchQuery
                    ? `No projects match your search for "${searchQuery}"`
                    : "Get started by adding your first project"}
                </p>
                <Link
                  to="/projects/add"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Project</span>
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {/* Cover Image */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      {project.cover_image ? (
                        <>
                          <img
                            src={resolveSrc(project.cover_image)}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-gray-400 mb-4" />
                          <p className="text-gray-500 text-sm">No Image</p>
                        </div>
                      )}
                      
                      {/* Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700">
                        Project
                      </div>                      
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="font-heading font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                          {project.title}
                        </h3>
                        {project.short_desc && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {project.short_desc}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          <Link
                            to={`/projects/edit/${project.id}/${str_to_url(project.title)}`}
                            className="group/edit relative flex items-center space-x-2 text-amber-600 hover:text-amber-700"
                          >
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                              className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center group-hover/edit:bg-amber-200 transition-colors"
                            >
                              <Pencil className="w-5 h-5" />
                            </motion.div>
                            <span className="font-medium">Edit</span>
                          </Link>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => deleteProject(project.id)}
                            disabled={deleting === project.id}
                            className="group/delete relative flex items-center space-x-2 text-red-600 hover:text-red-700 disabled:opacity-50"
                          >
                            {deleting === project.id ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center"
                              >
                                <Loader className="w-5 h-5" />
                              </motion.div>
                            ) : (
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center group-hover/delete:bg-red-200 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </motion.div>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Hover Border */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileHover={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Pagination/Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredProjects.length}</span> of{" "}
                  <span className="font-semibold text-gray-900">{projects.length}</span> projects
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:border-amber-300 hover:text-amber-600 transition-colors">
                  <Download className="w-5 h-5 inline-block mr-2" />
                  Export Data
                </button>
                
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium"
                >
                  <span>Back to Dashboard</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default List;