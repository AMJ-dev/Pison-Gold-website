import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Diamond,
  Star,
  Target,
  Lightbulb,
  Rocket,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { http } from "@/lib/httpClient";
import { ApiResp } from "@/lib/types";
import { resolveSrc } from "@/lib/functions";
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);

  const fetchProject = async () => {
    try {
      const res = await http.get(`/get-project/${id}/`);
      const resp: ApiResp = res.data;
      console.log(resp);
      if (resp.error === false && resp.data) {
        setProject(resp.data[0]);
        return;
      }
      toast.error("Project not found");
    } catch (error) {
      toast.error("Failed to load project");
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading project…
      </div>
    );
  }

  const timeline = [
    {
      label: "The Challenge",
      content: project.challenges,
      icon: Target,
      color: "text-destructive",
    },
    {
      label: "Our Solution",
      content: project.solution,
      icon: Lightbulb,
      color: "text-accent",
    },
    {
      label: "The Impact",
      content: project.impact,
      icon: CheckCircle,
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ======================================================
          HERO SECTION
      ======================================================= */}
      <section className="relative h-[70vh] min-h-[550px] overflow-hidden">
        <img
          src={resolveSrc(project.cover_image)}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 via-navy-dark/65 to-background/95" />

        <Star className="absolute top-[18%] left-[12%] w-12 h-12 text-white/10 animate-float" />
        <Diamond className="absolute bottom-[20%] right-[14%] w-12 h-12 text-accent/20 animate-float-slow" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl animate-fade-up space-y-5">
              <span className="inline-flex items-center px-5 py-2 bg-white/10 backdrop-blur rounded-full text-accent text-sm">
                <Rocket className="w-4 h-4 mr-2" />
                Project Overview
              </span>

              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white drop-shadow-xl">
                {project.title}
              </h1>

              {project.short_desc && (
                <p className="text-lg text-white/85 max-w-xl leading-relaxed">
                  {project.short_desc}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          MAIN CONTENT + SIDEBAR
      ======================================================= */}
      <section className="py-20 container-custom grid lg:grid-cols-3 gap-12">

        {/* LEFT COLUMN - Main Content */}
        <div className="lg:col-span-2 space-y-20">
          {/* TIMELINE SECTION */}
          <div>
            <h2 className="font-heading text-4xl font-bold mb-10">Project Timeline</h2>

            <div className="relative border-l-2 border-border pl-8 space-y-16">
              {timeline.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                    id={step.label.split(" ").join("-").toLowerCase()}
                  >
                    <div className="absolute -left-[41px] w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 border border-border shadow">
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>

                    <h3 className="font-heading text-2xl font-semibold mb-3">
                      {step.label}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {step.content}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* GALLERY */}
          {project.gallery && project.gallery.length > 0 && (
            <div>
              <h2 className="font-heading text-4xl font-bold mb-10">Project Gallery</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {project.gallery.map((img: any, index: number) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-2xl shadow-premium-sm hover:shadow-premium-lg transition-all duration-500 ${
                      index === 0 ? "md:col-span-2 aspect-video" : "aspect-square"
                    }`}
                  >
                    <img
                      src={resolveSrc(img.image)}
                      alt="Gallery"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - Sticky Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-24 self-start bg-card border border-border/50 rounded-2xl p-8 shadow-lg">
          <h3 className="font-heading text-2xl font-bold mb-4">Project Summary</h3>

          <div className="text-muted-foreground space-y-3">
            <p><span className="font-semibold text-foreground">Project:</span> {project.title}</p>

            {project.sector && (
              <p>
                <span className="font-semibold text-foreground">Sector:</span>{" "}
                {project.sector}
              </p>
            )}

            <p>
              <span className="font-semibold text-foreground">Created:</span>{" "}
              {new Date(project.created_at).toLocaleDateString()}
            </p>
          </div>

          <hr className="border-border/40" />

          {/* Quick Navigation */}
          <nav className="space-y-3">
            {timeline.map((step) => (
              <a
                key={step.label}
                href={`#${step.label.split(" ").join("-").toLowerCase()}`}
                className="text-accent font-medium hover:underline block"
              >
                {step.label}
              </a>
            ))}

            {project.gallery?.length > 0 && (
              <a
                href="#gallery"
                className="text-accent font-medium hover:underline block"
              >
                Gallery
              </a>
            )}
          </nav>

          <Link
            to="/contact"
            className="btn-gold inline-flex items-center justify-center w-full mt-4 space-x-2"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </aside>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary relative overflow-hidden rounded-t-[60px]">
        <Star className="absolute top-24 left-[15%] w-12 h-12 text-accent/20 animate-float" />
        <Diamond className="absolute bottom-20 right-[15%] w-14 h-14 text-white/10 animate-float-slow" />

        <div className="container-custom text-center space-y-6">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Let’s Build Something Great Together
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Partner with Pison-Gold for integrated solutions that deliver measurable impact.
          </p>

          <Link
            to="/contact"
            className="btn-gold inline-flex items-center space-x-3 shadow-gold-lg px-8 py-4 rounded-2xl text-lg"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetails;
