import { Link } from "react-router-dom";
import {
  Home,
  Lightbulb,
  Building,
  Landmark,
  ArrowRight
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import realEstateHero from "@/assets/real-estate-hero.jpg";
import projectHousing from "@/assets/project-housing.jpg";
import heroMain from "@/assets/hero-main.jpg";
import constructionPlanning from "@/assets/construction-planning.jpg";

const RealEstate = () => {
  const offerings = [
    {
      icon: Home,
      title: "Master-Planned Communities",
      description:
        "We design and develop integrated residential and mixed-use communities built around sustainability, livability, and long-term economic value.",
    },
    {
      icon: Lightbulb,
      title: "Smart & Sustainable Homes",
      description:
        "We deliver future-ready homes powered by innovative technology, renewable systems, and intelligent space planning for comfort and efficiency.",
    },
    {
      icon: Building,
      title: "Commercial & Hospitality Projects",
      description:
        "From office complexes to hotels and recreational facilities, we build commercial environments that attract business, elevate experiences, and create lasting destinations.",
    },
    {
      icon: Landmark,
      title: "End-to-End Property Development",
      description:
        "Our services cover land acquisition, site & services, infrastructure development, landscaping, and seamless sales and property handover.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px]">
        <img
          src={realEstateHero}
          alt="Real Estate & Hospitality"
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
                Real Estate & Hospitality
              </h1>

              <p className="text-xl text-primary-foreground/80 mb-4">
                Creating Landmarks. Shaping Sustainable Communities.
              </p>

              <p className="text-lg text-primary-foreground/70">
                Building environments where people live better, businesses thrive, and communities grow.
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
                We Build Spaces That Inspire, Connect, and Endure
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                At Pison-Gold, real estate is more than construction—it's about transforming land into opportunity. We create integrated developments that blend functionality, beauty, and sustainability to deliver long-lasting socio-economic value.
              </p>

              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-sm">
                <p className="text-foreground italic font-medium">
                  “From vacant land to vibrant communities—we craft the spaces where progress begins.”
                </p>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src={projectHousing}
                alt="Housing Project"
                className="rounded-sm shadow-lg col-span-2 aspect-video object-cover"
              />

              <img
                src={heroMain}
                alt="Construction"
                className="rounded-sm shadow-lg aspect-square object-cover"
              />

              <img
                src={constructionPlanning}
                alt="Planning"
                className="rounded-sm shadow-lg aspect-square object-cover"
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
              Our Real Estate Services
            </h2>

            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Comprehensive real estate solutions built around quality, innovation, and sustainable development.
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

      {/* Gallery Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom">

          <div className="grid md:grid-cols-3 gap-6">

            <div className="md:col-span-2 aspect-video overflow-hidden rounded-sm">
              <img
                src={realEstateHero}
                alt="Real Estate"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="aspect-video md:aspect-auto overflow-hidden rounded-sm">
              <img
                src={projectHousing}
                alt="Housing"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-custom text-center">

          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Build Your Dream Property?
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Let's collaborate to transform your vision into a thriving, sustainable development.
          </p>

          <Link to="/contact" className="btn-gold inline-flex items-center space-x-2">
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealEstate;
