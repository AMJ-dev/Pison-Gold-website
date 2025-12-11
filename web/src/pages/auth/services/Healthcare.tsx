import { Link } from "react-router-dom";
import {
  Activity,
  HeartPulse,
  Users,
  Wallet,
  ArrowRight,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import healthcareHero from "@/assets/healthcare-hero.jpg";
import projectHospital from "@/assets/project-hospital.jpg";

const Healthcare = () => {
  const offerings = [
    {
      icon: Activity,
      title: "Medical Equipment & Technology Supply",
      description:
        "We provide dependable, high-grade diagnostic, therapeutic, and life-support equipment—sourced from global manufacturers and backed by installation, training, and after-sales support.",
    },
    {
      icon: HeartPulse,
      title: "Healthcare Operations & Management Consulting",
      description:
        "From workflow optimization to regulatory compliance, we help hospitals strengthen efficiency, improve patient outcomes, and align with national healthcare standards.",
    },
    {
      icon: Users,
      title: "Public Health & Community Outreach Programs",
      description:
        "We design community-focused health initiatives that expand access to preventive care and essential medical services, especially in underserved environments.",
    },
    {
      icon: Wallet,
      title: "Healthcare Project & Financing Advisory",
      description:
        "We assist organizations in structuring viable, sustainable healthcare projects—bridging the gap between funding, infrastructure, and long-term operational planning.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px]">
        <img
          src={healthcareHero}
          alt="Healthcare Advancement"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/70 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="max-w-2xl animate-fade-up">

              <span className="text-accent font-medium tracking-wider uppercase text-sm">
                Our Services
              </span>

              <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary-foreground mt-4 mb-6">
                Healthcare Advancement
              </h1>

              <p className="text-xl text-primary-foreground/85 mb-4">
                Strengthening Healthcare Systems for Better Outcomes
              </p>

              <p className="text-lg text-primary-foreground/70">
                We empower hospitals, clinics, and public health institutions with
                modern tools, expert guidance, and sustainable solutions—building stronger,
                more efficient healthcare systems nationwide.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
                A Trusted Partner for Healthcare Providers
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Our approach integrates equipment supply, operational expertise, and
                community-based programming to help institutions deliver safer, faster,
                and more reliable care. Whether upgrading a facility or designing a new
                healthcare program, we bring the precision, compliance, and innovation
                required for lasting impact.
              </p>

              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-sm">
                <p className="text-foreground italic font-medium">
                  “Healthcare thrives where expertise, infrastructure, and compassion intersect.”
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <img
                src={projectHospital}
                alt="Hospital Equipment"
                className="rounded-sm shadow-lg w-full aspect-video object-cover"
              />

              <img
                src={healthcareHero}
                alt="Healthcare"
                className="rounded-sm shadow-lg w-full aspect-video object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">

          <div className="text-center mb-16">
            <span className="text-accent font-medium tracking-wider uppercase text-sm">
              What We Offer
            </span>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-4">
              Comprehensive Healthcare Solutions
            </h2>

            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Our services are designed to strengthen healthcare delivery from end to end,
              ensuring quality, safety, and accessibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className="bg-card rounded-sm p-8 shadow-md card-hover"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-sm flex items-center justify-center mb-6">
                  <offering.icon className="w-8 h-8 text-accent" />
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                  {offering.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {offering.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">

          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Transform Your Healthcare Facility
          </h2>

          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Let’s work together to strengthen your operations and deliver better
            care to the communities you serve.
          </p>

          <Link to="/contact" className="btn-gold inline-flex items-center space-x-2">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Healthcare;
