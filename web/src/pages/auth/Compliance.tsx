import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Stethoscope,
  Cpu,
  Package,
  Shield,
  FileCheck,
  Users,
  Landmark,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";

import complianceHero from "@/assets/compliance-hero.jpg";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Compliance = () => {
  const [selectedCredential, setSelectedCredential] = useState<number | null>(null);

  // --------------------------
  // OFFICIAL SERVICES (unchanged)
  // --------------------------
  const services = [
    { name: "Real Estate", path: "/services/real-estate", icon: Building2 },
    { name: "Healthcare", path: "/services/healthcare", icon: Stethoscope },
    { name: "Technology", path: "/services/technology", icon: Cpu },
    { name: "Procurement", path: "/services/procurement", icon: Package },
  ];

  // --------------------------
  // FULLY UPDATED CREDENTIALS  
  // Matches your document exactly  
  // --------------------------
  const credentials = [
    {
      icon: Building2,
      title: "Corporate Integrity",
      description: "CAC Registration (RC 1604250)",
      details:
        "Pison-Gold is fully registered with the Corporate Affairs Commission of Nigeria (CAC), establishing our legal identity and reinforcing our commitment to transparency, legitimacy, and responsible governance.",
    },
    {
      icon: FileCheck,
      title: "Financial Probity",
      description: "SCUML Certified & FIRS Tax Compliant",
      details:
        "We comply with the Special Control Unit Against Money Laundering (SCUML) and maintain up-to-date tax obligations with the Federal Inland Revenue Service (FIRS), ensuring financial responsibility at all operational levels.",
    },
    {
      icon: Users,
      title: "Workforce Protection",
      description: "PENCOM • NSITF • ITF Compliance",
      details:
        "As part of our social and statutory obligations, Pison-Gold adheres strictly to pension regulations (PENCOM), employee compensation insurance (NSITF), and workforce development contributions (ITF). This ensures employee safety, welfare, and continuous capacity building.",
    },
    {
      icon: Landmark,
      title: "Government Recognition",
      description: "Verified Contractor – Bureau of Public Procurement (BPP)",
      details:
        "Pison-Gold is officially recognized by the Bureau of Public Procurement, authorizing our participation in federal contracting, procurement, and project execution across public-sector initiatives.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px]">
        <img
          src={complianceHero}
          alt="Compliance"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/70 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="max-w-2xl animate-fade-up">
              <span className="text-accent font-medium tracking-wider uppercase text-sm">
                Our Commitment
              </span>

              <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary-foreground mt-4 mb-6">
                Compliance & Credentials
              </h1>

              <p className="text-lg text-primary-foreground/80">
                The Foundation of Trust is Transparency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="section-padding bg-background">
        <div className="container-custom text-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Shield className="w-10 h-10 text-accent" />
          </div>

          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Built on a Rock-Solid Foundation
          </h2>

          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Pison-Gold operates with unwavering commitment to legality, ethical governance,
            and responsible business conduct.  
            <br />
            Our credentials reflect a long-term dedication to transparency, compliance,
            and nationally recognized corporate standards.
          </p>
        </div>
      </section>

      {/* CREDENTIALS GRID */}
      <section className="section-padding bg-secondary">
        <div className="container-custom grid md:grid-cols-2 gap-8">
          {credentials.map((credential, index) => (
            <div
              key={index}
              className="group bg-card p-8 rounded-sm shadow-md border border-border cursor-pointer"
              onClick={() =>
                setSelectedCredential(selectedCredential === index ? null : index)
              }
            >
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-accent/10 rounded-sm flex items-center justify-center">
                  <credential.icon className="w-8 h-8 text-accent" />
                </div>

                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold mb-2">
                    {credential.title}
                  </h3>

                  <p className="text-accent font-medium mb-3">
                    {credential.description}
                  </p>

                  {/* EXPANDING DETAILS */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      selectedCredential === index
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed pt-2 border-t border-border">
                      {credential.details}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 mt-4 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Verified & Active</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY COMPLIANCE MATTERS */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-12">
            Why Our Compliance Matters
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Client Protection",
                description:
                  "Our compliance ensures that every engagement is conducted under legally recognized structures, protecting clients from operational or contractual risk.",
              },
              {
                title: "Quality Assurance",
                description:
                  "Regulatory oversight guarantees that every project—private or public—meets stringent standards of quality, safety, and professional excellence.",
              },
              {
                title: "Risk Mitigation",
                description:
                  "Working with a compliant partner reduces exposure to financial, operational, and legal risks, making Pison-Gold a safe, reliable choice.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <BadgeCheck className="w-8 h-8 text-accent-foreground" />
                </div>

                <h3 className="font-heading text-xl font-semibold text-primary-foreground mb-3">
                  {item.title}
                </h3>

                <p className="text-primary-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
          Partner with Confidence
        </h2>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Our compliance is your guarantee of integrity—ensuring that every partnership
          is backed by transparency, accountability, and regulatory excellence.
        </p>

        <Link to="/contact" className="btn-gold inline-flex items-center space-x-2">
          <span>Get in Touch</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Compliance;
