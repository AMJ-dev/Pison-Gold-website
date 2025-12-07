import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { http } from "@/lib/httpClient";
import { ApiResp } from "@/lib/types";
import { toast } from "react-toastify";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Star,
  MessageSquare,
  Search,
  Filter,
  Quote,
  Award,
  TrendingUp,
  Shield,
  Eye,
  Copy,
  Calendar,
  ChevronRight,
  Sparkles,
  ExternalLink,
  UserCheck,
  ThumbsUp,
  BadgeCheck,
  MoreVertical
} from "lucide-react";
import { resolveSrc, str_to_url } from "@/lib/functions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const List = () => {
  const [testimonies, setTestimonies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedTestimony, setSelectedTestimony] = useState<number | null>(null);

  const ratings = [
    { id: "all", name: "All Ratings", count: testimonies.length },
    { id: "5", name: "★★★★★", count: testimonies.filter(t => t.rating === 5).length },
    { id: "4", name: "★★★★☆", count: testimonies.filter(t => t.rating === 4).length },
    { id: "3", name: "★★★☆☆", count: testimonies.filter(t => t.rating === 3).length },
  ];

  const loadTestimonies = async () => {
    try {
      setLoading(true);
      const res = await http.get("/get-testimonies/");
      const resp: ApiResp = res.data;
      if (!resp.error) {
        setTestimonies(resp.data || []);
        return;
      } 
      toast.error("Failed to load testimonies");      
    } catch (error) {
      toast.error("Unable to fetch testimonies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonies();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimony? This action cannot be undone.")) return;

    try {
      setDeletingId(id);

      const res = await http.post("/delete-testimony/", {id});
      const resp: ApiResp = res.data;

      if (!resp.error) {
        toast.success("Testimony deleted successfully");
        setTestimonies((prev) => prev.filter((t) => t.id !== id));
      } else {
        toast.error(resp.data || "Failed to delete");
      }
    } catch {
      toast.error("Error deleting testimony");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTestimonies = testimonies.filter(testimony => {
    const matchesSearch = testimony.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimony.testimonial.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (testimony.company && testimony.company.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRating = selectedRating === "all" || testimony.rating === parseInt(selectedRating);
    
    return matchesSearch && matchesRating;
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
          <Loader2 className="w-16 h-16 text-amber-500 relative" />
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
                    <Quote className="w-8 h-8 text-amber-600" />
                  </motion.div>
                  <div>
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-2">
                      Client <span className="text-gradient-amber">Testimonies</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                      Showcasing trust and success through client feedback
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/testimonies/add"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-5 text-white font-semibold text-lg inline-flex items-center justify-center space-x-3 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-500 transition-all duration-500" />
                <Plus className="w-6 h-6 relative" />
                <span className="relative">Add New Testimony</span>
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
                    <p className="text-gray-600 text-sm">Total Testimonies</p>
                    <h3 className="text-3xl font-heading font-bold text-gray-900">{testimonies.length}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-amber-600" />
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
                    <p className="text-gray-600 text-sm">Average Rating</p>
                    <h3 className="text-3xl font-heading font-bold text-gray-900">
                      {(testimonies.reduce((acc, t) => acc + (t.rating || 5), 0) / testimonies.length || 0).toFixed(1)}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-amber-600" />
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
                    <p className="text-gray-600 text-sm">5 Star Reviews</p>
                    <h3 className="text-3xl font-heading font-bold text-gray-900">
                      {testimonies.filter(t => t.rating === 5).length}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
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
                    <p className="text-gray-600 text-sm">This Month</p>
                    <h3 className="text-3xl font-heading font-bold text-gray-900">
                      {Math.floor(testimonies.length * 0.2)}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
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
                      placeholder="Search testimonies by name, company, or content..."
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
                  <div className="flex items-center space-x-2 flex-wrap gap-2">
                    {ratings.map((rating) => (
                      <motion.button
                        key={rating.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedRating(rating.id)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                          selectedRating === rating.id
                            ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                            : "bg-white text-gray-700 border-gray-300 hover:border-amber-300"
                        }`}
                      >
                        {rating.name} ({rating.count})
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Testimonies Grid */}
          <AnimatePresence>
            {filteredTestimonies.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <MessageSquare className="w-16 h-16 text-amber-400" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">
                  No Testimonies Found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  {searchQuery
                    ? `No testimonies match your search for "${searchQuery}"`
                    : "Get started by adding your first client testimony"}
                </p>
                <Link
                  to="/testimonies/add"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Testimony</span>
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredTestimonies.map((testimony, index) => (
                  <motion.div
                    key={testimony.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {/* Background Quote Icon */}
                    <div className="absolute top-6 right-6 opacity-10">
                      <Quote className="w-16 h-16 text-gray-400" />
                    </div>

                    {/* Verified Badge */}
                    <motion.div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium flex items-center space-x-1 backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                    >
                      <BadgeCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </motion.div>

                    {/* Content */}
                    <div className="p-8">
                      {/* Client Info */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="relative">
                          <motion.div
                            className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md"
                            whileHover={{ scale: 1.1 }}
                          >
                            <img
                              src={resolveSrc(testimony.image) || "https://via.placeholder.com/80"}
                              alt={testimony.full_name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <motion.div
                            className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          >
                            <UserCheck className="w-3 h-3 text-white" />
                          </motion.div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-heading font-bold text-gray-900 text-lg mb-1">
                            {testimony.full_name}
                          </h3>
                          <p className="text-amber-600 font-medium text-sm">{testimony.title || "Client"}</p>
                          {testimony.company && (
                            <p className="text-gray-500 text-sm">{testimony.company}</p>
                          )}
                        </div>
                      </div>

                      {/* Testimony Text */}
                      <div className="mb-6">
                        <blockquote className="text-gray-700 italic relative pl-6 border-l-2 border-amber-300">
                          "{testimony.testimonial.length > 150 ? testimony.testimonial.substring(0, 150) + "..." : testimony.testimonial}"
                        </blockquote>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-1">
                          {[...Array(testimony.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                          ))}
                          <span className="text-gray-600 text-sm ml-2">{testimony.rating || 5}.0</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-gray-400">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-xs">Helpful</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center space-x-3">
                          <Link
                            to={`/testimonies/edit/${testimony.id}/${str_to_url(testimony.full_name)}`}
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
                            onClick={() => handleDelete(testimony.id)}
                            disabled={deletingId === testimony.id}
                            className="group/delete relative flex items-center space-x-2 text-red-600 hover:text-red-700 disabled:opacity-50"
                          >
                            {deletingId === testimony.id ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center"
                              >
                                <Loader2 className="w-5 h-5" />
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

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredTestimonies.length}</span> of{" "}
                  <span className="font-semibold text-gray-900">{testimonies.length}</span> testimonies
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Total satisfaction score: {((testimonies.reduce((acc, t) => acc + (t.rating || 5), 0) / testimonies.length) * 20 || 0).toFixed(1)}%
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
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

// response from api 

// {
//     "error": false,
//     "data": [
//         {
//             "id": 1,
//             "full_name": "Sam Ibe",
//             "position": "CEO",
//             "bio": "A visionary leader with over 12 years of experience in multi-sector project execution across Real Estate, Technology Infrastructure, Healthcare Equipment Deployment, and Procurement Solutions.",
//             "image": "uploads\/801277c0e6_2025_12_06_00_11_16_ew_1127a.webp",
//             "facebook": "",
//             "linkedin": "",
//             "twitter": "",
//             "created_at": "2025-12-06 00:11:16"
//         }
//     ]
// }