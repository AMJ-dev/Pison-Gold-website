import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Building2,
  Stethoscope,
  Cpu,
  Package,
  Send,
  Linkedin,
  Star,
  Sparkles,
  Diamond,
  MessageCircle,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";

import contactHero from "@/assets/contact-hero.jpg";
import aboutHero from "@/assets/about-hero.jpg";

// ✅ Import shared components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { comp_address, comp_email, comp_phone } from "@/lib/constants";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({
      fullName: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ✅ Replaced Navigation with Global Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <MessageCircle className="absolute top-[25%] right-[15%] w-10 h-10 text-accent/20 animate-float z-10" />
        <Star className="absolute bottom-[30%] left-[10%] w-8 h-8 text-white/10 animate-float-slow z-10" />

        <img src={contactHero} alt="Contact Us" className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/70 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="max-w-2xl animate-fade-up">
              <span className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full text-accent text-sm font-medium mb-4 shadow-lg">
                <MessageCircle className="w-4 h-4" />
                <span>Contact Us</span>
              </span>

              <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary-foreground mt-4 mb-6">
                Let's Start Something Extraordinary
              </h1>

              <p className="text-lg text-primary-foreground/80">
                Your project is unique. Let's craft a solution together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-20 right-[5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        <Sparkles className="absolute bottom-32 left-[8%] w-8 h-8 text-accent/15 animate-float" />
        <Diamond className="absolute top-40 left-[15%] w-10 h-10 text-primary/10 animate-float-slow" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Headquarters", content: comp_address },
                  { icon: Phone, title: "Phone", content: comp_phone, href: `tel:+${comp_phone}` },
                  { icon: Mail, title: "Email", content: comp_email, href: `mailto:${comp_email}` },
                  { icon: Linkedin, title: "LinkedIn", content: "Pison-Gold Projects", href: "#" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-6 p-4 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-premium-sm transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-gold-light/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                      <item.icon className="w-7 h-7 text-accent" />
                    </div>

                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        {item.title}
                      </h4>

                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground hover:text-accent transition-colors">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Photo */}
              <div className="mt-10 rounded-2xl overflow-hidden shadow-premium-lg">
                <img src={aboutHero} alt="Pison-Gold Office" className="w-full h-64 object-cover" />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 md:p-10 shadow-premium-lg border border-border/50">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="input-field"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 xxx xxx xxxx"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service of Interest</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select a service</option>
                    <option value="real-estate">Real Estate & Hospitality</option>
                    <option value="healthcare">Healthcare Advancement</option>
                    <option value="technology">Technology Solutions</option>
                    <option value="procurement">Strategic Procurement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message/Project Brief *</label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="input-field resize-none"
                  />
                </div>

                <button type="submit" className="btn-gold w-full flex items-center justify-center space-x-2 shadow-gold-lg">
                  <span>Submit My Inquiry</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-muted">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18..."
          width="100%"
          height="100%"
          loading="lazy"
          style={{ border: 0 }}
          title="Pison-Gold Location"
        />
      </section>

      {/* ✅ Replaced Footer with Global Footer */}
      <Footer />

    </div>
  );
};

export default Contact;
