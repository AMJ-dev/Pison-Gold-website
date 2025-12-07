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
  User2,
  Users,
  Star,
  Award,
  Zap,
  Search,
  Filter,
  ExternalLink,
  Facebook,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Phone,
  ChevronRight,
  Sparkles,
  Building,
  Target,
  Calendar,
  MoreVertical,
  Copy,
  Eye
} from "lucide-react";
import { resolveSrc, str_to_url } from "@/lib/functions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ApiResp } from "@/lib/types";
import { Team } from "@/lib/types";

const List = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadTeams = async () => {
    try {
      const res = await http.get("/get-teams/");      
      const resp:ApiResp = res.data
      if (resp.error == false && resp.data) {
        setTeams(resp.data || []);
        return;
      }
      toast.error(resp.data || "Failed to load team members");
    } catch (err) {
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const deleteTeam = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team member? This action cannot be undone.")) return;

    setDeleting(id);

    try {
      const form = new FormData();
      form.append("id", String(id));

      const res = await http.post("/delete-team/", form);

      const resp:ApiResp = res.data
      if (resp.error == false && resp.data) {
        toast.success("Team member deleted successfully");
        setTeams((prev) => prev.filter((t) => t.id !== id));
        return;
      }
      toast.error(resp.data || "Failed to delete team member");
    } catch (err) {
      toast.error("Failed to delete team member");
    } finally {
      setDeleting(null);
    }
  };

  const filteredTeams = teams.filter(member => {
    const matchesSearch = member.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || member.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
                    <Users className="w-8 h-8 text-amber-600" />
                  </motion.div>
                  <div>
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-2">
                      Team <span className="text-gradient-amber">Members</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                      Meet the brilliant minds behind our success and innovation
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/teams/add"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-5 text-white font-semibold text-lg inline-flex items-center justify-center space-x-3 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-500 transition-all duration-500" />
                <Plus className="w-6 h-6 relative" />
                <span className="relative">Add New Member</span>
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
                    <p className="text-gray-600 text-sm">Total Members</p>
                    <h3 className="text-3xl font-heading font-bold text-gray-900">{teams.length}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </motion.div>

              {/* <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Leadership</p>
                    <h3 className="text-3xl font-heading font-bold text-gray-900">
                      {teams.filter(t => t.position?.toLowerCase().includes('director') || t.position?.toLowerCase().includes('lead')).length}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </motion.div> */}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active</p>
                    <h3 className="text-3xl font-heading font-bold text-gray-900">{teams.length}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-amber-600" />
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
                      placeholder="Search team members by name, position..."
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
              </div>
            </motion.div>
          </motion.div>

          {/* Team Members Grid */}
          <AnimatePresence>
            {filteredTeams.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <Users className="w-16 h-16 text-amber-400" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">
                  No Team Members Found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  {searchQuery
                    ? `No team members match your search for "${searchQuery}"`
                    : "Get started by adding your first team member"}
                </p>
                <Link
                  to="/teams/add"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Member</span>
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredTeams.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="aspect-square relative overflow-hidden">
                        {member.image ? (
                          <>
                            <img
                              src={resolveSrc(member.image)}
                              alt={member.full_name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex flex-col items-center justify-center">
                            <User2 className="w-20 h-20 text-amber-400" />
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <motion.div
                          className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 flex items-center space-x-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="w-2 h-2 bg-amber-500 rounded-full" />
                          <span>Active</span>
                        </motion.div>
                        
                      </div>
                      
                      {/* Social Icons Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <AnimatePresence>
                          {member.linkedin && (
                            <motion.a
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              href={member.linkedin}
                              target="_blank"
                              className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-700 transition-colors shadow-lg"
                            >
                              <Linkedin className="w-5 h-5" />
                            </motion.a>
                          )}
                          {member.twitter && (
                            <motion.a
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1 }}
                              href={member.twitter}
                              target="_blank"
                              className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors shadow-lg"
                            >
                              <Twitter className="w-5 h-5" />
                            </motion.a>
                          )}
                          {member.facebook && (
                            <motion.a
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                              href={member.facebook}
                              target="_blank"
                              className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center hover:bg-amber-800 transition-colors shadow-lg"
                            >
                              <Facebook className="w-5 h-5" />
                            </motion.a>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-heading font-bold text-gray-900 text-xl mb-1">
                              {member.full_name}
                            </h3>
                            <p className="text-amber-600 font-medium">{member.position}</p>
                          </div>
                          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                        </div>
                                                
                        {member.joined_date && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500 text-sm">Joined {member.joined_date}</span>
                          </div>
                        )}
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 mb-6">
                        {member.email && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm truncate">{member.email}</span>
                          </div>
                        )}
                        {member.phone && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">{member.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3">
                          <Link
                            to={`/teams/edit/${member.id}/${str_to_url(member.full_name)}`}
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
                            onClick={() => deleteTeam(member.id)}
                            disabled={deleting === member.id}
                            className="group/delete relative flex items-center space-x-2 text-red-600 hover:text-red-700 disabled:opacity-50"
                          >
                            {deleting === member.id ? (
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
                  Showing <span className="font-semibold text-gray-900">{filteredTeams.length}</span> of{" "}
                  <span className="font-semibold text-gray-900">{teams.length}</span> team members
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  All team members are verified and active
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