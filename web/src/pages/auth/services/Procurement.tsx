import { Link } from "react-router-dom";
import {
  Package,
  Boxes,
  Car,
  Sofa,
  Utensils,
  ArrowRight
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import procurementHero from "@/assets/procurement-hero.jpg";

const Procurement = () => {
  const offerings = [
    {
      icon: Package,
      title: "Unified Procurement Platform",
      description:
        "A streamlined, end-to-end procurement gateway that consolidates sourcing across engineering materials, industrial equipment, IT systems, vehicles, and bulk commodities—ensuring consistency, compliance, and timely delivery.",
    },
    {
      icon: Boxes,
      title: "Industrial & IT Supply",
      description:
        "We procure and supply heavy-duty machinery, well-heads, fabrication tools, servers, networking infrastructure, and mission-critical IT components from globally trusted manufacturers.",
    },
    {
      icon: Car,
      title: "Automotive Services",
      description:
        "Procurement and importation of vehicles, spare parts, fleet leasing, and mobility solutions tailored to commercial, private, and government operations.",
    },
    {
      icon: Sofa,
      title: "Furnishing & Décor",
      description:
        "Complete interior furnishing for offices, homes, hospitality spaces, and institutional environments—combining durability with functional design.",
    },
    {
      icon: Utensils,
      title: "Food & Consumables",
      description:
        "Bulk sourcing and distribution of high-quality consumables, beverages, and catering supplies for corporate, hospitality, and public-sector institutions.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px]">
        <img
          src={procurementHero}
          alt="Strategic Procurement"
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
                Strategic Procurement & Supply Chain
              </h1>

              <p className="text-xl text-primary-foreground/80 mb-4">
                Where Strategic Sourcing Meets Reliable Delivery
              </p>

              <p className="text-lg text-primary-foreground/70">
                Empowering organizations with transparent, efficient, and scalable procurement solutions built for real-world performance.
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
                The Critical Link in Your Supply Chain
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Procurement is the engine behind operational success. We bridge the gap between your organizational needs and reliable global suppliers, ensuring that every item—from heavy machinery to everyday consumables—arrives on time and to specification.
              </p>

              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-sm">
                <p className="text-foreground italic font-medium">
                  “Your operations are only as strong as your supply chain. We make that chain unbreakable.”
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-4">
              <img
                src={procurementHero}
                alt="Procurement"
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
              Specialized Supply Divisions
            </span>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-4">
              Our Procurement Services
            </h2>

            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Built on global networks, transparent processes, and strict quality assurance, our procurement divisions deliver reliability at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Supply Chain Optimization */}
      <section className="section-padding bg-background">
        <div className="container-custom">

          <div className="bg-primary rounded-sm p-10 md:p-16">

            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Supply Chain Optimization
              </h2>

              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Using our logistics network, digital procurement systems, and real-time tracking, we ensure transparency, traceability, and just-in-time delivery. Our optimization models reduce downtime, improve accuracy, and keep your operations running without interruption.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center">

          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Streamline Your Supply Chain
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Let Pison-Gold strengthen your procurement process with reliability, efficiency, and global reach.
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

export default Procurement;
