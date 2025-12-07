import { useState, useEffect, useRef, startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { http } from "@/lib/httpClient";
import { toast } from "react-toastify";
import {
  Loader,
  Upload,
  User2,
  Users,
  FileText,
  Facebook,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle,
  Eye,
  Camera,
  Link,
  ChevronRight
} from "lucide-react";
import { resolveSrc } from "@/lib/functions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ApiResp } from "@/lib/types";

interface TeamMember {
  id?: number;
  full_name: string;
  position: string;
  bio: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  image: string | null;
  email?: string;
  phone?: string;
  created_at?: string;
}

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = Boolean(id);

  const [team, setTeam] = useState<TeamMember>({
    full_name: "",
    position: "",
    bio: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    image: null,
    email: "",
    phone: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingTeam, setLoadingTeam] = useState(isEdit);
  const [activeSection, setActiveSection] = useState("basic");
  const [charCount, setCharCount] = useState({ bio: 0 });

  useEffect(() => {
    if (isEdit) fetchTeam();
  }, []);

  useEffect(() => {
    setCharCount({ bio: team.bio.length });
  }, [team.bio]);

  const fetchTeam = async () => {
    try {
      const res = await http.get(`/get-team/${id}/`);
      const resp: ApiResp = res.data;
      if (resp.error == false && resp.data) {
        setTeam(resp.data);
        setPreviewImg(resp.data.image ? resolveSrc(resp.data.image) : null);
        return;
      }
      toast.error(resp.data || "Failed to load member");
    } catch {
      toast.error("Server error");
    } finally {
      setLoadingTeam(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) setPreviewImg(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!team.full_name.trim() || !team.position.trim()) {
      toast.error("Name and position are required");
      return;
    }

    if (team.bio.length > 500) {
      toast.error("Bio must be less than 500 characters");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      if (isEdit) form.append("id", String(id));
      form.append("full_name", team.full_name);
      form.append("position", team.position);
      form.append("bio", team.bio);
      form.append("facebook", team.facebook);
      form.append("linkedin", team.linkedin);
      form.append("twitter", team.twitter);
      form.append("email", team.email || "");
      form.append("phone", team.phone || "");

      if (imageFile) form.append("image", imageFile);

      const endpoint = isEdit ? "/update-team/" : "/add-team/";
      const res = await http.post(endpoint, form);

      if (!res.data.error) {
        toast.success(res.data.data || "Team member saved successfully");
        startTransition(() => navigate("/teams/all"));
      } else {
        toast.error(res.data.data);
      }
    } catch {
      toast.error("Failed to save team member");
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: "basic", name: "Basic Info", icon: User2 },
    { id: "social", name: "Social Links", icon: Link },
    { id: "bio", name: "Bio", icon: FileText },
  ];

  if (loadingTeam) {
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
                      {isEdit ? "Edit" : "Add"} <span className="text-gradient-amber">Team Member</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                      {isEdit ? "Update team member details" : "Add a new member to your team"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => startTransition(() => navigate("/teams/all"))}
                  className="group flex items-center space-x-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 hover:border-amber-300 hover:text-amber-600 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Team</span>
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all whitespace-nowrap ${
                    activeSection === section.id
                      ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:border-amber-300"
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span>{section.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Main Content Area - Side by Side */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Form */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:w-2/3"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Info Section */}
                  {activeSection === "basic" && (
                    <>
                      {/* Profile Image */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                          <label className="text-xl font-heading font-bold text-gray-900">Profile Image</label>
                          <span className="text-gray-600 text-sm">Recommended: 400×400px</span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                          <div 
                            className="relative w-48 h-48 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-dashed border-amber-300 overflow-hidden group cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            {previewImg ? (
                              <>
                                <img src={previewImg} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <Camera className="w-8 h-8 text-white" />
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center">
                                <User2 className="w-16 h-16 text-amber-400 mb-4" />
                                <p className="text-amber-600 font-medium">Upload Photo</p>
                                <p className="text-amber-400 text-sm mt-1">Click to select</p>
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            <label className="cursor-pointer">
                              <div className="px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium flex items-center space-x-3 hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg">
                                <Upload className="w-5 h-5" />
                                <span>{previewImg ? 'Change Photo' : 'Upload Photo'}</span>
                              </div>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload}
                              />
                            </label>
                            
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <CheckCircle className="w-4 h-4 text-amber-500" />
                                <span className="text-sm">Professional headshot recommended</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <CheckCircle className="w-4 h-4 text-amber-500" />
                                <span className="text-sm">High resolution for best quality</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Full Name */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="text-xl font-heading font-bold text-gray-900">Full Name</label>
                          <span className="text-amber-600 text-sm font-medium">Required</span>
                        </div>
                        <input
                          type="text"
                          value={team.full_name}
                          onChange={(e) => setTeam({ ...team, full_name: e.target.value })}
                          className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-lg"
                          placeholder="Enter full name"
                          required
                        />
                      </div>

                      {/* Position */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="text-xl font-heading font-bold text-gray-900">Position</label>
                          <span className="text-amber-600 text-sm font-medium">Required</span>
                        </div>
                        <input
                          type="text"
                          value={team.position}
                          onChange={(e) => setTeam({ ...team, position: e.target.value })}
                          className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-lg"
                          placeholder="e.g., Senior Software Engineer"
                          required
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              value={team.email}
                              onChange={(e) => setTeam({ ...team, email: e.target.value })}
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                              placeholder="member@example.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="tel"
                              value={team.phone}
                              onChange={(e) => setTeam({ ...team, phone: e.target.value })}
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                              placeholder="+234 800 000 0000"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Social Links Section */}
                  {activeSection === "social" && (
                    <>
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                              <Facebook className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <label className="block text-gray-700 font-medium">Facebook Profile</label>
                              <input
                                type="url"
                                value={team.facebook}
                                onChange={(e) => setTeam({ ...team, facebook: e.target.value })}
                                className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                placeholder="https://facebook.com/username"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                              <Linkedin className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <label className="block text-gray-700 font-medium">LinkedIn Profile</label>
                              <input
                                type="url"
                                value={team.linkedin}
                                onChange={(e) => setTeam({ ...team, linkedin: e.target.value })}
                                className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                placeholder="https://linkedin.com/in/username"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center">
                              <Twitter className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <label className="block text-gray-700 font-medium">Twitter Profile</label>
                              <input
                                type="url"
                                value={team.twitter}
                                onChange={(e) => setTeam({ ...team, twitter: e.target.value })}
                                className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                                placeholder="https://twitter.com/username"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                          <div className="flex items-center space-x-3">
                            <Globe className="w-5 h-5 text-amber-600" />
                            <p className="text-amber-700 text-sm">
                              Social links will be displayed on the team member's profile
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Bio Section */}
                  {activeSection === "bio" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-xl font-heading font-bold text-gray-900">Professional Bio</label>
                        <span className={`text-sm ${charCount.bio > 500 ? 'text-red-600' : 'text-gray-600'}`}>
                          {charCount.bio}/500
                        </span>
                      </div>
                      <textarea
                        value={team.bio}
                        onChange={(e) => setTeam({ ...team, bio: e.target.value })}
                        className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all min-h-[200px]"
                        placeholder="Write a brief professional bio highlighting experience, achievements, and qualifications..."
                        maxLength={500}
                      />
                      <div className="space-y-3 mt-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-amber-500" />
                          <span className="text-sm">Keep it concise and professional</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-amber-500" />
                          <span className="text-sm">Highlight key achievements and expertise</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-amber-500" />
                          <span className="text-sm">Include years of experience if relevant</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation and Submit */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      {activeSection !== "basic" && (
                        <button
                          type="button"
                          onClick={() => {
                            const currentIndex = sections.findIndex(s => s.id === activeSection);
                            setActiveSection(sections[currentIndex - 1]?.id || "basic");
                          }}
                          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 hover:border-amber-300 hover:text-amber-600 transition-all"
                        >
                          <ArrowLeft className="w-5 h-5" />
                          <span>Previous</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      {activeSection !== "bio" ? (
                        <button
                          type="button"
                          onClick={() => {
                            const currentIndex = sections.findIndex(s => s.id === activeSection);
                            setActiveSection(sections[currentIndex + 1]?.id || "bio");
                          }}
                          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg"
                        >
                          <span>Continue</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={loading}
                          className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-white font-semibold text-lg inline-flex items-center justify-center space-x-3 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-500 disabled:opacity-50"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-500 transition-all duration-500" />
                          {loading ? (
                            <Loader className="w-6 h-6 animate-spin relative" />
                          ) : (
                            <>
                              <span className="relative">
                                {isEdit ? "Update Member" : "Add Member"}
                              </span>
                              <CheckCircle className="w-6 h-6 relative" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Right Column - Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/3"
            >
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center space-x-3 mb-6">
                    <Eye className="w-6 h-6 text-amber-600" />
                    <h3 className="text-2xl font-heading font-bold text-gray-900">Live Preview</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Profile Image Preview */}
                    <div className="flex justify-center">
                      <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300 overflow-hidden shadow-lg">
                        {previewImg ? (
                          <img src={previewImg} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User2 className="w-16 h-16 text-amber-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details Preview */}
                    <div className="space-y-4">
                      {team.full_name && (
                        <div>
                          <h4 className="text-2xl font-heading font-bold text-gray-900 text-center">{team.full_name}</h4>
                        </div>
                      )}
                      
                      {team.position && (
                        <div className="text-center">
                          <p className="text-amber-600 font-medium text-lg">{team.position}</p>
                        </div>
                      )}

                      <div className="space-y-3 pt-4 border-t border-amber-200">
                        {team.email && (
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <span className="text-gray-600 text-sm break-all">{team.email}</span>
                          </div>
                        )}
                        
                        {team.phone && (
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{team.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Social Links Preview */}
                      {(team.facebook || team.linkedin || team.twitter) && (
                        <div className="pt-4 border-t border-amber-200">
                          <p className="text-gray-700 font-medium mb-2 text-sm">Social Links:</p>
                          <div className="flex items-center space-x-3">
                            {team.facebook && (
                              <a href={team.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
                                <Facebook className="w-5 h-5 text-blue-600" />
                              </a>
                            )}
                            {team.linkedin && (
                              <a href={team.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Linkedin className="w-5 h-5 text-white" />
                              </a>
                            )}
                            {team.twitter && (
                              <a href={team.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center hover:bg-sky-600 transition-colors">
                                <Twitter className="w-5 h-5 text-white" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bio Preview */}
                    {team.bio && (
                      <div className="pt-6 border-t border-amber-200">
                        <p className="text-gray-700 text-sm leading-relaxed">{team.bio.substring(0, 200)}{team.bio.length > 200 && '...'}</p>
                        {team.bio.length > 200 && (
                          <p className="text-amber-600 text-xs mt-2">Bio truncated in preview</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Form;