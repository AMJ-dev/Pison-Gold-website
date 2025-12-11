import { Link } from "react-router-dom";
import { ArrowRight, Server, Code, Shield, Headphones } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import technologyHero from "@/assets/technology-hero.jpg";
import projectIt from "@/assets/project-it.jpg";

const Technology = () => {
  const offerings = [
    {
      icon: Server,
      title: "IT Infrastructure & Cloud Solutions",
      description:
        "We design, deploy, and manage scalable digital infrastructure—from enterprise networks to cloud architectures—built for resilience, security, and long-term expansion.",
    },
    {
      icon: Code,
      title: "Custom Software Development",
      description:
        "Tailored applications and automation solutions that enhance efficiency, unlock new opportunities, and optimize business processes across sectors.",
    },
    {
      icon: Shield,
      title: "Unified Communications & Cybersecurity",
      description:
        "Integrated communication systems and multi-layered cybersecurity frameworks that protect your data, people, and operations in an evolving digital landscape.",
    },
    {
      icon: Headphones,
      title: "IT Consulting & Managed Support",
      description:
        "Strategic guidance and ongoing managed services that ensure your technology investments remain aligned with your mission and future growth.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Global Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px]">
        <img
          src={technologyHero}
          alt="Technology Solutions"
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
                Technology Solutions
              </h1>

              <p className="text-xl text-primary-foreground/80 mb-4">
                Empowering the Digital Backbone of Modern Enterprises
              </p>

              <p className="text-lg text-primary-foreground/70">
                We build secure, scalable, and intelligent systems that help businesses thrive in a connected world.
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
                Technology That Drives Transformation
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Today’s organizations rely on strong digital foundations. We help you build and secure these foundations—ensuring your systems are not just functional, but intelligently aligned with your strategic vision.
              </p>

              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-sm">
                <p className="text-foreground italic font-medium">
                  “We don’t just implement technology—we architect digital growth engines.”
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <img
                src={projectIt}
                alt="IT Infrastructure"
                className="rounded-sm shadow-lg w-full aspect-video object-cover"
              />
              <img
                src={technologyHero}
                alt="Technology"
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
              Our Technology Services
            </h2>

            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              From infrastructure to innovation, we deliver end-to-end technology solutions built for reliability, scale, and future readiness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {offerings.map((offering, index) => (
              <div key={index} className="bg-card rounded-sm p-8 shadow-md card-hover">
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
            Ready to Transform Your IT?
          </h2>

          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Partner with Pison-Gold to build a technology ecosystem that accelerates innovation and drives measurable results.
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

export default Technology;
