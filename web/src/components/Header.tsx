import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Building2,
  Stethoscope,
  Cpu,
  Package,
  Shield,
  Home,
  Users,
  FileText,
  Phone,
  Sparkles,
  Briefcase,
  Award,
  UserCheck,
  Gem,
  Zap,
  Crown,
  Lock,
  Settings,
  LogOut,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import UserContext from "@/lib/userContext";
import { comp_name } from "@/lib/constants";

const Header = () => {
  const { auth, logout } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    };
  }, [mobileMenuOpen]);

  const adminRoutes = ["/dashboard", "/teams", "/projects", "/testimonies"];
  const isAdminPage = adminRoutes.some((r) => location.pathname.startsWith(r));

  const nav_links = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Sparkles },
    { name: "Services", path: "#services", isDropdown: true },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Team", path: "/team", icon: Users },
    { name: "Compliance", path: "/compliance", icon: Award },
    { name: "Contact", path: "/contact", icon: Phone }
  ];

  const services = [
    { 
      name: "Real Estate", 
      path: "/services/real-estate", 
      icon: Building2, 
      description: "Luxury property development",
      color: "from-amber-400/20 to-gold/10"
    },
    { 
      name: "Healthcare", 
      path: "/services/healthcare", 
      icon: Stethoscope, 
      description: "Advanced medical solutions",
      color: "from-emerald-400/20 to-teal-400/10"
    },
    { 
      name: "Technology", 
      path: "/services/technology", 
      icon: Cpu, 
      description: "Innovative tech infrastructure",
      color: "from-blue-400/20 to-indigo-400/10"
    },
    { 
      name: "Procurement", 
      path: "/services/procurement", 
      icon: Package, 
      description: "Strategic supply chain",
      color: "from-purple-400/20 to-pink-400/10"
    }
  ];

  const admin_links = [
    { name: "Dashboard", path: "/dashboard", icon: Settings },
    { name: "Projects", path: "/projects/all", icon: Briefcase },
    { name: "Testimonies", path: "/testimonies/all", icon: FileText },
    { name: "Team", path: "/teams/all", icon: UserCheck }
  ];

  const getNavStyle = () => {
    if (isAdminPage) {
      return "bg-navy-dark border-b border-gold/20 shadow-2xl";
    }
    return isScrolled
      ? "bg-white/95 backdrop-blur-2xl border-b border-gray-100 shadow-lg"
      : "bg-transparent";
  };

  const getTextColor = () => {
    if (isAdminPage) return "text-cream";
    return isScrolled ? "text-navy-dark" : "text-white";
  };

  const getMobileButtonStyle = () => {
    if (mobileMenuOpen) return "bg-gold text-white";
    if (isScrolled) return "bg-white text-navy-dark shadow-md";
    return "bg-white/20 backdrop-blur-sm text-white border border-white/30";
  };

  const toggleMobileServices = () => {
    setMobileServicesOpen(!mobileServicesOpen);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavStyle()}`}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
        
        <div className="relative">
          <div className="container-custom">
            <div className="flex items-center justify-between h-20 lg:h-24">
              <Link
                to="/"
                className="flex items-center group relative min-w-0 flex-shrink-0 mr-2"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-2 bg-gradient-gold rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative font-heading font-black text-white text-xl lg:text-2xl">PG</span>
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Crown className="w-2 h-2 text-gold" />
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <div className="flex flex-col leading-tight">
                      <span className={`font-heading font-bold text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight whitespace-nowrap ${getTextColor()} group-hover:text-gold transition-colors duration-300`}>
                        {comp_name}
                      </span>
                      <span className="hidden sm:block text-xs text-gold/70 font-medium mt-0.5">
                        Global Excellence
                      </span>
                    </div>
                    <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </Link>

              <div className="hidden lg:flex items-center space-x-1">
                {nav_links.map((link) =>
                  link.isDropdown ? (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown("services")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 group relative ${
                          openDropdown === "services" || location.pathname.startsWith("/services")
                            ? "text-gold bg-white shadow-md"
                            : `${getTextColor()} hover:text-gold hover:bg-white/10`
                        }`}
                      >
                        <Zap className="w-4 h-4" />
                        <span>Services</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                          openDropdown === "services" ? "rotate-180" : ""
                        }`} />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>

                      {openDropdown === "services" && (
                        <div className="absolute top-full left-0 pt-3 animate-fade-in">
                          <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-2xl min-w-[280px] overflow-hidden">
                            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-white to-cream/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                                  <Gem className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-heading font-bold text-navy-dark">Our Services</h3>
                                  <p className="text-xs text-gray-500">Premium solutions</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-2">
                              {services.map((service) => (
                                <Link
                                  key={service.name}
                                  to={service.path}
                                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50/50 transition-all duration-300"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                                      <service.icon className="w-5 h-5 text-navy-dark" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-navy-dark group-hover:text-gold transition-colors">
                                        {service.name}
                                      </h4>
                                      <p className="text-xs text-gray-500">{service.description}</p>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gold transform group-hover:translate-x-1 transition-all duration-300" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={({ isActive }) =>
                        `px-5 py-3 rounded-xl font-medium transition-all duration-300 relative group ${
                          isActive
                            ? "text-gold bg-white shadow-md"
                            : `${getTextColor()} hover:text-gold hover:bg-white/10`
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center space-x-2">
                            <link.icon className="w-4 h-4" />
                            <span>{link.name}</span>
                          </div>
                          {isActive && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px bg-gradient-to-r from-gold to-gold-light rounded-full" />
                          )}
                        </>
                      )}
                    </NavLink>
                  )
                )}

                {auth && (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown("admin")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 group ${
                          isActive || openDropdown === "admin"
                            ? "text-gold bg-white shadow-md"
                            : `${getTextColor()} hover:text-gold hover:bg-white/10`
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Shield className="w-4 h-4" />
                          <span>Admin</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                            openDropdown === "admin" ? "rotate-180" : ""
                          }`} />
                        </>
                      )}
                    </NavLink>

                    {openDropdown === "admin" && (
                      <div className="absolute top-full right-0 pt-3 animate-fade-in">
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-2xl min-w-[220px] overflow-hidden">
                          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-white to-cream/30">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                                <Lock className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <h3 className="font-heading font-bold text-navy-dark">Admin Panel</h3>
                                <p className="text-xs text-gray-500">Secure access</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            {admin_links.map((admin) => (
                              <Link
                                key={admin.name}
                                to={admin.path}
                                className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50/50 transition-all duration-300"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <admin.icon className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors" />
                                <span className="font-medium text-navy-dark group-hover:text-gold transition-colors">
                                  {admin.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="p-3 border-t border-gray-100">
                            <button
                              onClick={logout}
                              className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-gray-900 to-navy-dark text-white font-medium hover:shadow-md transition-all duration-300 group"
                            >
                              <span>Sign Out</span>
                              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${getMobileButtonStyle()}`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative">
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </div>
                {!mobileMenuOpen && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold animate-pulse" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-500 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
        style={{ top: '80px' }}
      >
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/95 backdrop-blur-2xl border-b border-gray-200 shadow-2xl overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="container-custom py-6 min-h-full">
              <div className="flex items-center justify-between mb-8 px-1">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                    <Gem className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl text-navy-dark">Menu</h2>
                    <p className="text-xs text-gray-500">Navigation</p>
                  </div>
                </div>
                <div className="text-xs text-gold font-medium px-3 py-1 rounded-full bg-gold/10">
                  Premium
                </div>
              </div>

              <div className="space-y-2 mb-8">
                {nav_links.map((link) =>
                  link.isDropdown ? (
                    <div key={link.name} className="space-y-3">
                      <button
                        onClick={toggleMobileServices}
                        className="w-full flex items-center justify-between space-x-3 p-4 rounded-xl bg-gradient-to-r from-white to-cream/30 border border-gray-100 hover:border-gold/30 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <Zap className="w-5 h-5 text-gold" />
                          <div className="text-left">
                            <h3 className="font-medium text-navy-dark">Services</h3>
                            <p className="text-xs text-gray-500">Our offerings</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-300 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`} />
                      </button>
                      
                      <div className={`space-y-2 overflow-hidden transition-all duration-300 ${
                        mobileServicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}>
                        {services.map((service) => (
                          <Link
                            key={service.name}
                            to={service.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="group flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gold/30 transition-all duration-300 ml-4"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                                <service.icon className="w-5 h-5 text-navy-dark" />
                              </div>
                              <div>
                                <h4 className="font-medium text-navy-dark">{service.name}</h4>
                                <p className="text-xs text-gray-500">{service.description}</p>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold transform group-hover:translate-x-1 transition-all duration-300" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 group ${
                          isActive
                            ? "bg-gradient-to-r from-white to-cream/50 border border-gold/30"
                            : "border border-gray-100 hover:border-gold/20"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isActive ? "bg-gradient-gold" : "bg-gray-50"
                          }`}>
                            <link.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                          </div>
                          <div className="flex-1">
                            <span className={`font-medium ${isActive ? "text-gold" : "text-navy-dark"}`}>
                              {link.name}
                            </span>
                            {isActive && (
                              <p className="text-xs text-gold mt-0.5">Active page</p>
                            )}
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isActive ? "text-gold" : "text-gray-300"} group-hover:translate-x-1 transition-transform duration-300`} />
                        </>
                      )}
                    </NavLink>
                  )
                )}

                {auth && (
                  <div className="pt-6 mt-6 border-t border-gray-200 space-y-4">
                    <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-navy-dark/5 to-navy/5">
                      <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-navy-dark">Admin Access</h3>
                        <p className="text-xs text-gray-500">Management panel</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {admin_links.map((admin) => (
                        <Link
                          key={admin.name}
                          to={admin.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-xl border border-gray-100 hover:border-gold/30 transition-all duration-300"
                        >
                          <admin.icon className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-navy-dark">{admin.name}</span>
                        </Link>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-gray-900 to-navy-dark text-white font-medium hover:shadow-md transition-all duration-300 mt-4"
                    >
                      <span>Sign Out</span>
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-xs text-gray-400">
                    © {new Date().getFullYear()} {comp_name}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gold" />
                  <div className="text-xs text-gold font-medium">
                    Premium Service
                  </div>
                </div>
              </div>

              <div className="h-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;