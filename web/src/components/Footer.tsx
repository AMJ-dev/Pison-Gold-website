import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { comp_address, comp_email, comp_name_long, comp_phone } from "../lib/constants";

const Footer = () => {
  const services = [
    { name: "Real Estate", path: "/services/real-estate" },
    { name: "Healthcare", path: "/services/healthcare" },
    { name: "Technology", path: "/services/technology" },
    { name: "Procurement", path: "/services/procurement" },
  ];

  return (
    <footer className="bg-navy-dark pt-20 pb-8 relative overflow-hidden">
      <div className="container-custom relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-gold-dark rounded-xl flex items-center justify-center shadow-gold">
                <span className="font-heading font-bold text-white text-lg">PG</span>
              </div>
              <span className="font-heading font-bold text-xl text-primary-foreground">
                {comp_name_long}
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {comp_name_long} – Your premier multi-sector partner for Real Estate, Healthcare, Technology, and Supply Chain solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Services", "Projects", "Team", "Compliance", "Contact", "Login"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.name}>
                  <Link
                    to={s.path}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-6">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span className="text-primary-foreground/70 text-sm">
                  {comp_address}
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <a
                  href={`tel:${comp_phone}`}
                  className="text-primary-foreground/70 hover:text-accent text-sm"
                >
                  {comp_phone}
                </a>
              </li>

              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <a
                  href={`mailto:${comp_email}`}
                  className="text-primary-foreground/70 hover:text-accent text-sm"
                >
                  {comp_email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <p className="text-center text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} {comp_name_long}.  
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
