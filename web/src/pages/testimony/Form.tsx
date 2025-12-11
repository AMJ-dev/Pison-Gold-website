import { useState, useEffect, useRef, startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { http } from "@/lib/httpClient";
import { toast } from "react-toastify";
import {
  Upload,
  MessageSquare,
  User2,
  Loader,
  Star,
  Award,
  Sparkles,
  Quote,
  Camera,
  ArrowLeft,
  CheckCircle,
  Building,
  ChevronRight,
  Eye
} from "lucide-react";
import { resolveSrc } from "@/lib/functions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ApiResp } from "@/lib/types";

interface Testimony {
  id?: number;
  full_name: string;
  position: string;
  testimonial: string;
  image: string | null;
  rating?: number;
  company?: string;
}

const Form = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<Testimony>({
    full_name: "",
    position: "",
    testimonial: "",
    image: null,
    rating: 5,
    company: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState(isEdit);
  const [activeSection, setActiveSection] = useState("basic");
  const [charCount, setCharCount] = useState({ testimonial: 0 });

  useEffect(() => {
    if (isEdit) fetchTestimony();
  }, []);

  useEffect(() => {
    setCharCount({ testimonial: data.testimonial.length });
  }, [data.testimonial]);

  const fetchTestimony = async () => {
    try {
      const res = await http.get(`/get-testimony/${id}/`);
      const resp: ApiResp = res.data;

      if (resp.error == false && resp.data) {
        setData(resp.data);
        setPreviewImg(resp.data.image ? resolveSrc(resp.data.image) : null);
      } else {
        toast.error(resp.data.data || "Failed to load testimony");
      }
    } catch {
      toast.error("Failed to connect to server");
    } finally {
      setLoadingItem(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) setPreviewImg(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.full_name.trim() || !data.position.trim() || !data.testimonial.trim()) {
      toast.error("All fields are required");
      return;
    }

    if (data.testimonial.length > 500) {
      toast.error("Message must be less than 500 characters");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();

      if (isEdit) form.append("id", String(id));

      form.append("full_name", data.full_name);
      form.append("position", data.position);
      form.append("testimonial", data.testimonial);
      form.append("rating", String(data.rating || 5));
      form.append("company", data.company || "");

      if (imageFile) form.append("image", imageFile);

      const endpoint = isEdit ? "/update-testimony/" : "/add-testimony/";
      const res = await http.post(endpoint, form);
      const resp: ApiResp = res.data;

      if (resp.error == false && resp.data) {
        toast.success(resp.data || "Testimony saved successfully");
        startTransition(() => navigate("/testimonies/all"));
        return;
      }
      toast.error(resp.data || "Failed to save testimony");
    } catch {
      toast.error("Request failed");
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: "basic", name: "Basic Info", icon: User2 },
    { id: "testimony", name: "Testimony", icon: MessageSquare },
    { id: "rating", name: "Rating", icon: Star },
  ];

  if (loadingItem) {
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
                    <Quote className="w-8 h-8 text-amber-600" />
                  </motion.div>
                  <div>
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-2">
                      {isEdit ? "Edit" : "Add"} <span className="text-gradient-amber">Testimony</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                      {isEdit ? "Update client feedback" : "Capture valuable client feedback"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => startTransition(() => navigate("/testimonies/all"))}
                  className="group flex items-center space-x-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 hover:border-amber-300 hover:text-amber-600 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Testimonies</span>
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
                          <label className="text-xl font-heading font-bold text-gray-900">Client Photo</label>
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
                                <span className="text-sm">Clear, high-quality image</span>
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
                          value={data.full_name}
                          onChange={(e) => setData({ ...data, full_name: e.target.value })}
                          className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-lg"
                          placeholder="Enter client's full name"
                          required
                        />
                      </div>

                      {/* Position & Company */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <label className="text-gray-700 font-medium">Position / Role</label>
                            <span className="text-amber-600 text-sm font-medium">Required</span>
                          </div>
                          <div className="relative">
                            <Award className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={data.position}
                              onChange={(e) => setData({ ...data, position: e.target.value })}
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                              placeholder="e.g., CEO, Director"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-4">Company</label>
                          <div className="relative">
                            <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={data.company}
                              onChange={(e) => setData({ ...data, company: e.target.value })}
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                              placeholder="Company name (optional)"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Testimony Section */}
                  {activeSection === "testimony" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-xl font-heading font-bold text-gray-900">Testimony Message</label>
                        <span className={`text-sm ${charCount.testimonial > 500 ? 'text-red-600' : 'text-gray-600'}`}>
                          {charCount.testimonial}/500
                        </span>
                      </div>
                      
                      <div className="relative">
                        <Quote className="absolute top-4 left-4 w-6 h-6 text-amber-400" />
                        <textarea
                          value={data.testimonial}
                          onChange={(e) => setData({ ...data, testimonial: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all min-h-[200px] resize-none"
                          placeholder="Write the client's testimonial here. Be authentic and specific about their experience..."
                          maxLength={500}
                          required
                        />
                      </div>

                      <div className="space-y-3 mt-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-amber-500" />
                          <span className="text-sm">Keep it authentic and genuine</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-amber-500" />
                          <span className="text-sm">Mention specific results or outcomes</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-amber-500" />
                          <span className="text-sm">Use the client's own words when possible</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rating Section */}
                  {activeSection === "rating" && (
                    <div className="space-y-6">
                      <div>
                        <label className="text-xl font-heading font-bold text-gray-900 mb-4">Client Rating</label>
                        <p className="text-gray-600 mb-6">How would the client rate their experience?</p>
                        
                        <div className="flex flex-col items-center space-y-8">
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.button
                                key={star}
                                type="button"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setData({ ...data, rating: star })}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`w-12 h-12 transition-all duration-300 ${
                                    star <= (data.rating || 5)
                                      ? "text-amber-500 fill-amber-500"
                                      : "text-gray-300 fill-gray-100"
                                  }`}
                                />
                              </motion.button>
                            ))}
                          </div>

                          <div className="text-center">
                            <motion.p
                              key={data.rating}
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              className="text-4xl font-heading font-bold text-gray-900"
                            >
                              {data.rating || 5}.0
                            </motion.p>
                            <p className="text-gray-600 mt-2">
                              {data.rating === 5 ? "Excellent" : 
                               data.rating === 4 ? "Very Good" : 
                               data.rating === 3 ? "Good" : 
                               data.rating === 2 ? "Fair" : "Poor"}
                            </p>
                          </div>

                          <div className="grid grid-cols-5 gap-2 w-full max-w-md">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setData({ ...data, rating: star })}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                  data.rating === star
                                    ? "bg-amber-500 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {star} Star{star !== 1 ? 's' : ''}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200">
                        <div className="flex items-center space-x-3">
                          <Sparkles className="w-5 h-5 text-amber-600" />
                          <p className="text-amber-700 text-sm">
                            Higher ratings help build trust and credibility with potential clients
                          </p>
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
                      {activeSection !== "rating" ? (
                        <button
                          type="button"
                          onClick={() => {
                            const currentIndex = sections.findIndex(s => s.id === activeSection);
                            setActiveSection(sections[currentIndex + 1]?.id || "rating");
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
                                {isEdit ? "Update Testimony" : "Add Testimony"}
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
                    {/* Client Info Preview */}
                    <div className="space-y-4">
                      {/* Profile Image */}
                      <div className="flex justify-center">
                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300 overflow-hidden shadow-lg">
                          {previewImg ? (
                            <img src={previewImg} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User2 className="w-16 h-16 text-amber-400" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Client Details */}
                      <div className="text-center space-y-2">
                        {data.full_name && (
                          <h4 className="text-xl font-heading font-bold text-gray-900">{data.full_name}</h4>
                        )}
                        
                        {data.position && (
                          <p className="text-amber-600 font-medium">{data.position}</p>
                        )}
                        
                        {data.company && (
                          <p className="text-gray-600 text-sm">{data.company}</p>
                        )}

                        {/* Rating */}
                        {data.rating && (
                          <div className="flex items-center justify-center space-x-1 pt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= data.rating!
                                    ? "text-amber-500 fill-amber-500"
                                    : "text-gray-300 fill-gray-100"
                                }`}
                              />
                            ))}
                            <span className="text-gray-600 text-sm ml-2">{data.rating}.0</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Testimony Preview */}
                    {data.testimonial && (
                      <div className="pt-4 border-t border-amber-200">
                        <div className="relative">
                          <Quote className="absolute -top-1 -left-1 w-6 h-6 text-amber-400/30" />
                          <blockquote className="text-gray-700 italic text-sm leading-relaxed">
                            "{data.testimonial.substring(0, 200)}{data.testimonial.length > 200 && '...'}"
                          </blockquote>
                        </div>
                        {data.testimonial.length > 200 && (
                          <p className="text-amber-600 text-xs mt-2 text-center">Testimony truncated in preview</p>
                        )}
                      </div>
                    )}

                    {/* Statistics */}
                    <div className="pt-4 border-t border-amber-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-xl bg-white border border-amber-200">
                          <div className="text-lg font-heading font-bold text-gray-900">
                            {data.rating || 5}
                          </div>
                          <div className="text-gray-600 text-xs">Rating</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-white border border-amber-200">
                          <div className="text-lg font-heading font-bold text-gray-900">
                            {data.testimonial.length || 0}
                          </div>
                          <div className="text-gray-600 text-xs">Characters</div>
                        </div>
                      </div>
                    </div>
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