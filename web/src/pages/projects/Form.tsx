import { useState, useEffect, useRef, startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { http } from "@/lib/httpClient";
import { toast } from "react-toastify";
import {
  Loader,
  Upload,
  Image as ImageIcon,
  Trash2,
  Camera,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Globe,
  Target,
  Zap,
  BarChart,
  ChevronRight,
  X,
  Eye,
  FolderKanban,
  FileText,
  Calendar,
  Users,
  Clock,
  MapPin,
  Plus,
  DollarSign,
  Building2,
  CalendarDays,
  Target as TargetIcon,
  TrendingUp,
  Briefcase,
  Layers,
  Timer
} from "lucide-react";
import { resolveSrc } from "@/lib/functions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ApiResp } from "@/lib/types";

interface GalleryItem {
  id: number;
  image: string;
}

interface Project {
  id?: number;
  title: string;
  short_desc: string;
  long_desc: string;
  challenges: string;
  solution: string;
  impact: string;
  cover_image: string | null;
  gallery: GalleryItem[];
  duration: string;
  budget: string;
  team_size: string;
  location: string;
  key_results: string[];
  sector: string;
}

const Form = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<Project>({
    title: "",
    short_desc: "",
    long_desc: "",
    challenges: "",
    solution: "",
    impact: "",
    cover_image: null,
    gallery: [],
    duration: "",
    budget: "",
    team_size: "",
    location: "",
    key_results: [""],
    sector: ""
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [previewGallery, setPreviewGallery] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProject, setLoadingProject] = useState(isEdit);
  const [deleteConfirm, setDeleteConfirm] = useState<null | number>(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [charCount, setCharCount] = useState({
    short_desc: 0,
    long_desc: 0,
    challenges: 0,
    solution: 0,
    impact: 0,
  });

  const sectors = [
    "Real Estate & Hospitality",
    "Healthcare Advancement",
    "Technology Solutions",
    "Strategic Procurement",
    "Infrastructure",
    "Consulting",
    "Others"
  ];

  const durations = [
    "1-3 Months",
    "3-6 Months",
    "6-12 Months",
    "1-2 Years",
    "2+ Years"
  ];

  const teamSizes = [
    "1-5 Experts",
    "5-10 Experts",
    "10-20 Experts",
    "20-50 Experts",
    "50+ Experts"
  ];

  useEffect(() => {
    if (isEdit) fetchProject();
  }, []);

  useEffect(() => {
    setCharCount({
      short_desc: data.short_desc.length,
      long_desc: data.long_desc.length,
      challenges: data.challenges.length,
      solution: data.solution.length,
      impact: data.impact.length,
    });
  }, [data]);

  const fetchProject = async () => {
    try {
      const res = await http.get(`/get-project/${id}/`);
      const resp: ApiResp = res.data;
      if (resp.error == false && resp.data && Array.isArray(resp.data) && resp.data.length > 0) {
        const projectData = resp.data[0];
        setData({
          id: projectData.id,
          title: projectData.title || "",
          short_desc: projectData.short_desc || "",
          long_desc: projectData.long_desc || "",
          challenges: projectData.challenges || "",
          solution: projectData.solution || "",
          impact: projectData.impact || "",
          cover_image: projectData.cover_image || null,
          gallery: projectData.gallery || [],
          duration: projectData.duration || "",
          budget: projectData.budget || "",
          team_size: projectData.team_size || "",
          location: projectData.location || "",
          key_results: projectData.key_results ? projectData.key_results.split(',').map(r => r.trim()) : [""],
          sector: projectData.sector || ""
        });
        setPreviewCover(projectData.cover_image ? resolveSrc(projectData.cover_image) : null);
        return;
      } 
      toast.error(resp.data || "Failed to load project");
    } catch {
      toast.error("Server error loading project");
    } finally {
      setLoadingProject(false);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCoverFile(file);
    if (file) setPreviewCover(URL.createObjectURL(file));
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (galleryFiles.length + files.length > 10) {
      toast.error("Maximum 10 gallery images allowed");
      return;
    }
    setGalleryFiles((prev) => [...prev, ...files]);
    setPreviewGallery((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const addKeyResult = () => {
    if (data.key_results.length >= 10) {
      toast.error("Maximum 10 key results allowed");
      return;
    }
    setData(prev => ({
      ...prev,
      key_results: [...prev.key_results, ""]
    }));
  };

  const updateKeyResult = (index: number, value: string) => {
    setData(prev => ({
      ...prev,
      key_results: prev.key_results.map((kr, i) => i === index ? value : kr)
    }));
  };

  const removeKeyResult = (index: number) => {
    if (data.key_results.length <= 1) {
      toast.error("At least one key result is required");
      return;
    }
    setData(prev => ({
      ...prev,
      key_results: prev.key_results.filter((_, i) => i !== index)
    }));
  };

  const deleteGalleryImage = async (imgId: number) => {
    try {
      const form = new FormData();
      form.append("id", String(imgId));

      const res = await http.post("/delete-project-image/", form);
      const resp: ApiResp = res.data;
      if (resp.error == false && resp.data) {
        toast.success("Image removed successfully");
        setData((prev) => ({...prev, gallery: prev.gallery.filter((g) => g.id !== imgId)}));
        return;
      } 
      toast.error(resp.data || "Failed to delete image");
    } catch {
      toast.error("Failed to delete image");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewGallery(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.title.trim() || !data.short_desc.trim()) {
      toast.error("Title and short description are required");
      return;
    }

    if (data.short_desc.length > 200) {
      toast.error("Short description must be less than 200 characters");
      return;
    }

    // Validate key results
    const validKeyResults = data.key_results.filter(kr => kr.trim().length > 0);
    if (validKeyResults.length === 0) {
      toast.error("At least one key result is required");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();

      if (isEdit) form.append("id", String(id));

      form.append("title", data.title);
      form.append("short_desc", data.short_desc);
      form.append("long_desc", data.long_desc);
      form.append("challenges", data.challenges);
      form.append("solution", data.solution);
      form.append("impact", data.impact);
      form.append("duration", data.duration);
      form.append("budget", data.budget);
      form.append("team_size", data.team_size);
      form.append("location", data.location);
      form.append("key_results", data.key_results.filter(kr => kr.trim().length > 0).join(','));
      form.append("sector", data.sector);

      if (coverFile) form.append("cover_image", coverFile);

      galleryFiles.forEach((file) => form.append("gallery[]", file));

      const endpoint = isEdit ? "/update-project/" : "/add-project/";

      const res = await http.post(endpoint, form);      
      const resp: ApiResp = res.data;
      if (resp.error == false && resp.data) {
        toast.success(`Project ${isEdit ? 'updated' : 'created'} successfully`);
        startTransition(() => navigate("/projects/all"));
        return;
      } 
      toast.error(resp.data);
    } catch {
      toast.error("Error saving project");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "basic", name: "Basic Info", icon: FileText },
    { id: "details", name: "Project Details", icon: FolderKanban },
    { id: "metrics", name: "Metrics", icon: BarChart },
    { id: "challenges", name: "Challenges", icon: Target },
    { id: "solution", name: "Solution", icon: Zap },
    { id: "impact", name: "Impact", icon: TrendingUp },
    { id: "gallery", name: "Gallery", icon: Camera },
  ];

  if (loadingProject) {
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
            className="mb-10"
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
                      {isEdit ? "Edit" : "Create"} <span className="text-gradient-amber">Project</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                      {isEdit ? "Update your project details" : "Add a new project to your portfolio"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => startTransition(() => navigate("/projects/all"))}
                  className="group flex items-center space-x-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 hover:border-amber-300 hover:text-amber-600 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Projects</span>
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:border-amber-300"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Main Content Area - Side by Side */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Form */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:w-2/3"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Info Tab */}
                  {activeTab === "basic" && (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="text-xl font-heading font-bold text-gray-900">Project Title</label>
                          <span className="text-amber-600 text-sm font-medium">Required</span>
                        </div>
                        <input
                          type="text"
                          value={data.title}
                          onChange={(e) => setData({ ...data, title: e.target.value })}
                          className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-lg"
                          placeholder="Enter project title"
                          required
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="text-xl font-heading font-bold text-gray-900">Short Description</label>
                          <span className={`text-sm ${charCount.short_desc > 200 ? 'text-red-600' : 'text-gray-600'}`}>
                            {charCount.short_desc}/200
                          </span>
                        </div>
                        <textarea
                          value={data.short_desc}
                          onChange={(e) => setData({ ...data, short_desc: e.target.value })}
                          className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all min-h-[120px]"
                          placeholder="Brief overview of the project"
                          maxLength={200}
                          required
                        />
                        <p className="text-gray-500 text-sm mt-2">
                          This will be shown in project listings and previews
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="text-xl font-heading font-bold text-gray-900">Cover Image</label>
                          <span className="text-gray-600 text-sm">Recommended: 1200×800px</span>
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-center gap-6">
                            <div className="relative w-48 h-48 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-dashed border-amber-300 overflow-hidden group cursor-pointer"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              {previewCover ? (
                                <>
                                  <img src={previewCover} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Camera className="w-8 h-8 text-white" />
                                  </div>
                                </>
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                  <Camera className="w-12 h-12 text-amber-400 mb-4" />
                                  <p className="text-amber-600 font-medium">Upload Cover</p>
                                  <p className="text-amber-400 text-sm mt-1">Click to select</p>
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="cursor-pointer">
                                <div className="px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium flex items-center space-x-3 hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg">
                                  <Upload className="w-5 h-5" />
                                  <span>{previewCover ? 'Change Cover' : 'Upload Cover'}</span>
                                </div>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  hidden
                                  onChange={handleCoverUpload}
                                />
                              </label>
                              <p className="text-gray-600 text-sm mt-3">
                                This image will be used as the main thumbnail for your project
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Project Details Tab */}
                  {activeTab === "details" && (
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="text-xl font-heading font-bold text-gray-900">Full Description</label>
                          <span className="text-gray-600 text-sm">{charCount.long_desc} characters</span>
                        </div>
                        <textarea
                          value={data.long_desc}
                          onChange={(e) => setData({ ...data, long_desc: e.target.value })}
                          className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all min-h-[200px]"
                          placeholder="Detailed description of the project"
                        />
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-amber-500" />
                            <span className="text-sm">Provide comprehensive details</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-amber-500" />
                            <span className="text-sm">Include key achievements</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-xl font-heading font-bold text-gray-900 mb-4 block">Sector</label>
                        <select
                          value={data.sector}
                          onChange={(e) => setData({ ...data, sector: e.target.value })}
                          className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                        >
                          <option value="">Select a sector</option>
                          {sectors.map(sector => (
                            <option key={sector} value={sector}>{sector}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xl font-heading font-bold text-gray-900 mb-4 block">Location</label>
                        <div className="flex items-center">
                          <MapPin className="w-6 h-6 text-amber-500 ml-4 mr-2 -translate-x-2 absolute" />
                          <input
                            type="text"
                            value={data.location}
                            onChange={(e) => setData({ ...data, location: e.target.value })}
                            className="w-full pl-12 pr-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                            placeholder="e.g., Lagos, Nigeria"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Metrics Tab */}
                  {activeTab === "metrics" && (
                    <div className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-xl font-heading font-bold text-gray-900 mb-4 block">Project Duration</label>
                          <select
                            value={data.duration}
                            onChange={(e) => setData({ ...data, duration: e.target.value })}
                            className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                          >
                            <option value="">Select duration</option>
                            {durations.map(duration => (
                              <option key={duration} value={duration}>{duration}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-xl font-heading font-bold text-gray-900 mb-4 block">Team Size</label>
                          <select
                            value={data.team_size}
                            onChange={(e) => setData({ ...data, team_size: e.target.value })}
                            className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                          >
                            <option value="">Select team size</option>
                            {teamSizes.map(size => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xl font-heading font-bold text-gray-900 mb-4 block">Project Budget</label>
                        <div className="flex items-center">
                          <DollarSign className="w-6 h-6 text-amber-500 ml-4 mr-2 -translate-x-2 absolute" />
                          <input
                            type="text"
                            value={data.budget}
                            onChange={(e) => setData({ ...data, budget: e.target.value })}
                            className="w-full pl-12 pr-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                            placeholder="e.g., $500,000 or Confidential"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="text-xl font-heading font-bold text-gray-900">Key Results</label>
                          <button
                            type="button"
                            onClick={addKeyResult}
                            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium hover:from-amber-600 hover:to-amber-500 transition-all"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Result</span>
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {data.key_results.map((result, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <CheckCircle className="w-5 h-5 text-green-500 ml-4 mr-2 -translate-x-2 absolute" />
                                  <input
                                    type="text"
                                    value={result}
                                    onChange={(e) => updateKeyResult(index, e.target.value)}
                                    className="w-full pl-12 pr-6 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                                    placeholder={`Key result #${index + 1} (e.g., Increased efficiency by 40%)`}
                                  />
                                </div>
                              </div>
                              {data.key_results.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeKeyResult(index)}
                                  className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-gray-500 text-sm mt-4">
                          {data.key_results.length}/10 key results added
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Challenges Tab */}
                  {activeTab === "challenges" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-xl font-heading font-bold text-gray-900">Challenges Faced</label>
                        <span className="text-gray-600 text-sm">{charCount.challenges} characters</span>
                      </div>
                      <textarea
                        value={data.challenges}
                        onChange={(e) => setData({ ...data, challenges: e.target.value })}
                        className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all min-h-[200px]"
                        placeholder="Describe the main challenges encountered during the project"
                      />
                      <div className="flex items-center space-x-2 mt-4 text-gray-600">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-sm">Be specific about technical, logistical, or resource challenges</span>
                      </div>
                    </div>
                  )}

                  {/* Solution Tab */}
                  {activeTab === "solution" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-xl font-heading font-bold text-gray-900">Solution Implemented</label>
                        <span className="text-gray-600 text-sm">{charCount.solution} characters</span>
                      </div>
                      <textarea
                        value={data.solution}
                        onChange={(e) => setData({ ...data, solution: e.target.value })}
                        className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all min-h-[200px]"
                        placeholder="Explain the solutions and strategies used to overcome challenges"
                      />
                      <div className="flex items-center space-x-2 mt-4 text-gray-600">
                        <Zap className="w-5 h-5 text-amber-500" />
                        <span className="text-sm">Highlight innovative approaches and technologies used</span>
                      </div>
                    </div>
                  )}

                  {/* Impact Tab */}
                  {activeTab === "impact" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-xl font-heading font-bold text-gray-900">Impact & Results</label>
                        <span className="text-gray-600 text-sm">{charCount.impact} characters</span>
                      </div>
                      <textarea
                        value={data.impact}
                        onChange={(e) => setData({ ...data, impact: e.target.value })}
                        className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all min-h-[200px]"
                        placeholder="Describe the measurable impact and outcomes of the project"
                      />
                      <div className="flex items-center space-x-2 mt-4 text-gray-600">
                        <TrendingUp className="w-5 h-5 text-amber-500" />
                        <span className="text-sm">Include metrics, statistics, and tangible results</span>
                      </div>
                    </div>
                  )}

                  {/* Gallery Tab */}
                  {activeTab === "gallery" && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <label className="text-xl font-heading font-bold text-gray-900">Project Gallery</label>
                          <p className="text-gray-600 mt-1">Upload multiple images to showcase your project</p>
                        </div>
                        <span className="text-gray-600 text-sm">Max 10 images</span>
                      </div>

                      {/* Upload Button */}
                      <label className="cursor-pointer block mb-8">
                        <div className="px-8 py-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium flex items-center justify-center space-x-3 hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg">
                          <Upload className="w-6 h-6" />
                          <span>Add Gallery Images</span>
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <input
                          ref={galleryInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          hidden
                          onChange={handleGalleryUpload}
                        />
                      </label>

                      {/* Gallery Preview */}
                      {(data.gallery.length > 0 || previewGallery.length > 0) && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-heading font-bold text-gray-900">Gallery Preview</h3>
                          
                          {/* Existing Images */}
                          {isEdit && data.gallery.length > 0 && (
                            <div>
                              <h4 className="text-gray-700 mb-4">Existing Images</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {data.gallery.map((img) => (
                                  <div key={img.id} className="relative group">
                                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                                      <img
                                        src={resolveSrc(img.image)}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                      />
                                    </div>
                                    
                                    <button
                                      type="button"
                                      onClick={() => setDeleteConfirm(img.id)}
                                      className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* New Uploads */}
                          {previewGallery.length > 0 && (
                            <div>
                              <h4 className="text-gray-700 mb-4">New Uploads</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {previewGallery.map((src, i) => (
                                  <div key={i} className="relative group">
                                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-amber-200 shadow-sm">
                                      <img
                                        src={src}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                      />
                                    </div>
                                    
                                    <button
                                      type="button"
                                      onClick={() => removeGalleryFile(i)}
                                      className="absolute top-2 right-2 p-2 rounded-full bg-amber-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                    
                                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-amber-500 text-white text-xs font-medium">
                                      New
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <p className="text-gray-500 text-sm">
                            Total images: {data.gallery.length + previewGallery.length}/10
                          </p>
                        </div>
                      )}

                      {data.gallery.length === 0 && previewGallery.length === 0 && (
                        <div className="text-center py-16 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-dashed border-amber-300">
                          <Camera className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                          <p className="text-gray-600 mb-4">No gallery images added yet</p>
                          <p className="text-gray-500 text-sm">
                            Upload images to showcase different aspects of your project
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation and Submit */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      {activeTab !== "basic" && (
                        <button
                          type="button"
                          onClick={() => {
                            const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                            setActiveTab(tabs[currentIndex - 1]?.id || "basic");
                          }}
                          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 hover:border-amber-300 hover:text-amber-600 transition-all"
                        >
                          <ArrowLeft className="w-5 h-5" />
                          <span>Previous</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      {activeTab !== "gallery" ? (
                        <button
                          type="button"
                          onClick={() => {
                            const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                            setActiveTab(tabs[currentIndex + 1]?.id || "gallery");
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
                                {isEdit ? "Update Project" : "Create Project"}
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
                    {/* Cover Image Preview */}
                    <div className="space-y-4">
                      <div className="aspect-video rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300 overflow-hidden shadow-lg">
                        {previewCover ? (
                          <img src={previewCover} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Camera className="w-16 h-16 text-amber-400" />
                          </div>
                        )}
                      </div>

                      {/* Project Details */}
                      <div className="space-y-4">
                        {data.title && (
                          <h4 className="text-xl font-heading font-bold text-gray-900">{data.title}</h4>
                        )}
                        
                        {data.short_desc && (
                          <p className="text-gray-600 text-sm leading-relaxed">{data.short_desc}</p>
                        )}

                        {/* Project Metrics */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          {data.duration && (
                            <div className="flex items-center space-x-2 text-sm text-gray-700">
                              <Clock className="w-4 h-4 text-amber-600" />
                              <span>{data.duration}</span>
                            </div>
                          )}
                          {data.team_size && (
                            <div className="flex items-center space-x-2 text-sm text-gray-700">
                              <Users className="w-4 h-4 text-amber-600" />
                              <span>{data.team_size}</span>
                            </div>
                          )}
                          {data.location && (
                            <div className="flex items-center space-x-2 text-sm text-gray-700">
                              <MapPin className="w-4 h-4 text-amber-600" />
                              <span>{data.location}</span>
                            </div>
                          )}
                          {data.sector && (
                            <div className="flex items-center space-x-2 text-sm text-gray-700">
                              <Building2 className="w-4 h-4 text-amber-600" />
                              <span>{data.sector}</span>
                            </div>
                          )}
                        </div>

                        {/* Key Results Preview */}
                        {data.key_results.filter(kr => kr.trim()).length > 0 && (
                          <div className="pt-4 border-t border-amber-200">
                            <div className="flex items-center space-x-2 mb-3">
                              <TargetIcon className="w-5 h-5 text-amber-600" />
                              <h5 className="font-heading font-bold text-gray-900 text-sm">Key Results</h5>
                            </div>
                            <div className="space-y-2">
                              {data.key_results.slice(0, 3).map((result, index) => (
                                result.trim() && (
                                  <div key={index} className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                      {result.substring(0, 60)}{result.length > 60 && '...'}
                                    </p>
                                  </div>
                                )
                              ))}
                              {data.key_results.filter(kr => kr.trim()).length > 3 && (
                                <p className="text-amber-600 text-xs">
                                  +{data.key_results.filter(kr => kr.trim()).length - 3} more results
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Status Indicators */}
                        <div className="grid grid-cols-2 gap-3 pt-4">
                          <div className="text-center p-3 rounded-xl bg-white border border-amber-200">
                            <div className="text-lg font-heading font-bold text-gray-900">
                              {data.gallery.length + previewGallery.length}
                            </div>
                            <div className="text-gray-600 text-xs">Gallery Images</div>
                          </div>
                          <div className="text-center p-3 rounded-xl bg-white border border-amber-200">
                            <div className="text-lg font-heading font-bold text-gray-900">
                              {data.key_results.filter(kr => kr.trim()).length}
                            </div>
                            <div className="text-gray-600 text-xs">Key Results</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Previews */}
                    <div className="space-y-4">
                      {/* Challenges Preview */}
                      {data.challenges && (
                        <div className="pt-4 border-t border-amber-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="w-5 h-5 text-amber-600" />
                            <h5 className="font-heading font-bold text-gray-900 text-sm">Challenges</h5>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {data.challenges.substring(0, 100)}{data.challenges.length > 100 && '...'}
                          </p>
                        </div>
                      )}

                      {/* Solution Preview */}
                      {data.solution && (
                        <div className="pt-4 border-t border-amber-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Zap className="w-5 h-5 text-amber-600" />
                            <h5 className="font-heading font-bold text-gray-900 text-sm">Solution</h5>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {data.solution.substring(0, 100)}{data.solution.length > 100 && '...'}
                          </p>
                        </div>
                      )}

                      {/* Impact Preview */}
                      {data.impact && (
                        <div className="pt-4 border-t border-amber-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-amber-600" />
                            <h5 className="font-heading font-bold text-gray-900 text-sm">Impact</h5>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {data.impact.substring(0, 100)}{data.impact.length > 100 && '...'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
                  <h4 className="font-heading font-bold text-gray-900 mb-4">Form Progress</h4>
                  <div className="space-y-3">
                    {tabs.map((tab) => (
                      <div key={tab.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${activeTab === tab.id ? 'bg-amber-500' : 
                            getTabStatus(tab.id, data) ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={`text-sm ${activeTab === tab.id ? 'text-amber-600 font-medium' : 
                            getTabStatus(tab.id, data) ? 'text-gray-700' : 'text-gray-500'}`}>
                            {tab.name}
                          </span>
                        </div>
                        {getTabStatus(tab.id, data) && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">Delete Image?</h3>
                <p className="text-gray-600">
                  This action cannot be undone. The image will be permanently removed from the project gallery.
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteGalleryImage(deleteConfirm)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-500 transition-all"
                >
                  Delete Image
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

// Helper function to check if a tab has content
const getTabStatus = (tabId: string, data: Project): boolean => {
  switch (tabId) {
    case "basic":
      return data.title.trim().length > 0 && data.short_desc.trim().length > 0;
    case "details":
      return data.long_desc.trim().length > 0 || data.sector.trim().length > 0 || data.location.trim().length > 0;
    case "metrics":
      return data.duration.trim().length > 0 || data.team_size.trim().length > 0 || 
             data.budget.trim().length > 0 || data.key_results.some(kr => kr.trim().length > 0);
    case "challenges":
      return data.challenges.trim().length > 0;
    case "solution":
      return data.solution.trim().length > 0;
    case "impact":
      return data.impact.trim().length > 0;
    case "gallery":
      return data.gallery.length > 0;
    default:
      return false;
  }
};

export default Form;