import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  X,
  Building2,
  Stethoscope,
  Cpu,
  Package,
  Shield
} from "lucide-react";

import UserContext from "@/lib/userContext";
import { comp_name } from "@/lib/constants";

const Header = () => {
  const { auth, logout } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const adminRoutes = [
    "/dashboard",
    "/teams",
    "/projects",
    "/testimonies"
  ];

  const isAdminPage = adminRoutes.some((r) =>
    location.pathname.startsWith(r)
  );

  const nav_links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "#services", isDropdown: true },
    { name: "Projects", path: "/projects" },
    { name: "Team", path: "/team" },
    { name: "Compliance", path: "/compliance" },
    { name: "Contact", path: "/contact" }
  ];

  const services = [
    { name: "Real Estate", path: "/services/real-estate", icon: Building2 },
    { name: "Healthcare", path: "/services/healthcare", icon: Stethoscope },
    { name: "Technology", path: "/services/technology", icon: Cpu },
    { name: "Procurement", path: "/services/procurement", icon: Package }
  ];

  const admin_links = [
    { name: "Dashboard", path: "/dashboard", icon: Shield },
    { name: "Projects", path: "/projects/all", icon: Building2 },
    { name: "Testimonies", path: "/testimonies/all", icon: Stethoscope },
    { name: "Team", path: "/teams/all", icon: Cpu }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isAdminPage
          ? "bg-[#0A1A2F] shadow-lg border-b border-border/40"
          : isScrolled
          ? "bg-card/95 backdrop-blur-xl shadow-premium-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-accent to-gold-dark rounded-xl flex items-center justify-center shadow-gold">
              <span className="font-heading font-bold text-white text-lg">PG</span>
            </div>
            <span
              className={`font-heading font-bold text-xl ${
                isAdminPage
                  ? "text-white"
                  : isScrolled
                  ? "text-foreground"
                  : "text-white"
              }`}
            >
              {comp_name}
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {nav_links.map((link) =>
              link.isDropdown ? (
                <div key={link.name} className="relative group px-4">
                  <button
                    className={`flex items-center space-x-1 py-2 font-medium ${
                      isAdminPage
                        ? "text-white/90 hover:text-white"
                        : isScrolled
                        ? "text-foreground/70 hover:text-foreground"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:rotate-90" />
                  </button>

                  <div className="absolute pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 py-3 min-w-[220px] shadow-premium-lg">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          to={service.path}
                          className="flex items-center space-x-3 px-5 py-3.5 hover:bg-accent/10 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <service.icon className="w-5 h-5 text-accent" />
                          </div>
                          <span className="text-foreground font-medium">{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 font-medium ${
                    isAdminPage
                      ? "text-white/80 hover:text-white"
                      : isScrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}

            {auth && (
              <div className="relative group px-4">
                <button
                  className={`flex items-center space-x-1 py-2 font-medium ${
                    isAdminPage
                      ? "text-white/80 hover:text-white"
                      : isScrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <span>Admin</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:rotate-90" />
                </button>

                <div className="absolute pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 py-3 min-w-[220px] shadow-premium-lg">
                    {admin_links.map((admin) => (
                      <Link
                        key={admin.name}
                        to={admin.path}
                        className="flex items-center space-x-3 px-5 py-3.5 hover:bg-accent/10 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                          <admin.icon className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-foreground font-medium">{admin.name}</span>
                      </Link>
                    ))}

                    <button
                      onClick={logout}
                      className="w-full text-left flex items-center space-x-3 px-5 py-3.5 hover:bg-destructive/30 transition-colors"
                    >
                      <span className="text-destructive font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl"
          >
            {mobileMenuOpen ? (
              <X className={isAdminPage ? "text-white" : isScrolled ? "text-foreground" : "text-white"} />
            ) : (
              <Menu className={isAdminPage ? "text-white" : isScrolled ? "text-foreground" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className={`lg:hidden ${
            isAdminPage
              ? "bg-[#0A1A2F] text-white"
              : "bg-card/95 backdrop-blur-xl border-t border-border/50"
          } shadow-premium`}
        >
          <div className="container-custom py-6 space-y-4">
            {nav_links.map((link) =>
              link.isDropdown ? (
                <div key={link.name}>
                  <span className="text-muted-foreground text-sm font-semibold uppercase">
                    {link.name}
                  </span>
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      to={service.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 py-3 hover:text-accent"
                    >
                      <service.icon className="w-5 h-5 text-accent" />
                      <span>{service.name}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 hover:text-accent font-medium"
                >
                  {link.name}
                </Link>
              )
            )}

            {auth && (
              <div className="pt-4 border-t border-border space-y-2">
                <span className="text-muted-foreground text-sm font-semibold uppercase">
                  Admin
                </span>

                {admin_links.map((admin) => (
                  <Link
                    key={admin.name}
                    to={admin.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 py-3 hover:text-accent"
                  >
                    <admin.icon className="w-5 h-5 text-accent" />
                    <span>{admin.name}</span>
                  </Link>
                ))}

                <button
                  onClick={logout}
                  className="block w-full text-left py-3 text-destructive font-medium"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
