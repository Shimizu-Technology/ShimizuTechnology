import React, { useState, useEffect, useRef } from 'react';
import { usePostHog } from 'posthog-js/react';
import {
  Code2,
  Users,
  Mail,
  Phone,
  ChevronRight,
  ArrowRight,
  Clock,
  Settings,
  Rocket,
  Target,
  CalendarDays,
  UtensilsCrossed,
  Calculator,
  FileSpreadsheet,
  Menu as MenuIcon,
  X as CloseIcon,
  Eye,
  Info,
  SwitchCamera,
  Globe2,
  ShoppingBag,
  BarChart
} from 'lucide-react';

// 1. Import your local images
import shimizuLogo from './assets/ShimizuTechnologyLogo.jpg'; // For header
import hafalohaImage from './assets/hafaloha_hero.jpg';
import restaurantAImage from './assets/sunrise-diner-generic-image.png';
import restaurantBImage from './assets/cozy-coffee-shop-generic-image.png';
import orderSuiteImage from './assets/Shimizu-Order-Suite-img.png';
// Using require for PNG files with uppercase extensions to avoid Vite import issues

// Global Smooth Scrolling
document.documentElement.style.scrollBehavior = 'smooth';

//
// PROJECT DATA
//
const projects = [
  {
    title: "Hafaloha Online Ordering",
    description: "Complete online ordering and reservation platform with customer-facing and admin interfaces",
    image: hafalohaImage,
    link: "https://hafaloha-orders.com",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    features: [
      "Online food ordering system",
      "Table & event reservations",
      "Staff administration portal",
      "Real-time order tracking"
    ]
  },
  {
    title: "Dental Appointments",
    description: "Comprehensive dental practice management system with automated notifications",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    link: "https://dental-appt.netlify.app/",
    icon: <CalendarDays className="w-6 h-6" />,
    features: [
      "Online appointment scheduling",
      "Automated reminders",
      "Staff schedule management",
      "Patient portal"
    ]
  },
  {
    title: "Conveyor Sushi Bar",
    description: "Seat-based reservation system for a modern sushi restaurant",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
    link: "https://sushi-guam.netlify.app/",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    features: [
      "Interactive seat selection",
      "Walk-in management",
      "Real-time availability",
      "Custom seating layouts"
    ]
  },
  {
    title: "Digital Menu Platform",
    description: "QR code-enabled digital menus for restaurants",
    image: restaurantAImage, // Fallback image for the card if no specific site is selected
    icon: <MenuIcon className="w-6 h-6" />,
    features: [
      "Mobile-optimized menus",
      "QR code integration",
      "Easy menu updates",
      "Multiple restaurant support"
    ],
    sites: [
      {
        name: "Cozy Coffee Shop",
        link: "https://cozy-coffee-shop-guam.netlify.app/",
        image: restaurantBImage
      },
      {
        name: "Sunrise Diner",
        link: "https://sunrise-diner.netlify.app/",
        image: restaurantAImage
      }
    ]
  },
  {
    title: "Tax Calculator",
    description: "Automated payroll tax calculation system with document processing",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    link: "https://tax-calculator-frontend.netlify.app",
    icon: <Calculator className="w-6 h-6" />,
    features: [
      "Document upload system",
      "Automated calculations",
      "Employee record management",
      "Payroll period tracking"
    ]
  },
  {
    title: "Cornerstone Accounting",
    description: "Educational platform for QuickBooks training courses",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    link: "https://cornerstone-accounting.netlify.app",
    icon: <FileSpreadsheet className="w-6 h-6" />,
    features: [
      "Course registration",
      "Program information",
      "Student portal",
      "Training materials"
    ]
  }
];

//
// SERVICES DATA
//
const services = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Custom Software Development",
    description: "Tailored solutions for your unique business needs"
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Business Automation",
    description: "Streamline your operations with smart automation"
  },
  {
    icon: <Globe2 className="w-6 h-6" />,
    title: "Web Applications",
    description: "Modern, responsive web applications that scale"
  }
];

//
// Extended Services
//
const extendedServices = [
  {
    title: "AI & Machine Learning",
    description: "Leverage cutting-edge AI to gain insights and automate workflows."
  },
  {
    title: "Advanced Analytics",
    description: "Turn raw data into actionable intelligence for smarter decision-making."
  },
  {
    title: "Integration Services",
    description: "Seamlessly connect your existing platforms and databases."
  }
];

//
// WORKFLOW STEPS
//
const workflowSteps = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Discovery",
    description: "We start by understanding your needs"
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Mockup",
    description: "We create a quick prototype to finalize requirements"
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Development",
    description: "We build your solution with modern tech stacks"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Maintenance",
    description: "We offer ongoing support to keep everything running"
  }
];

// Define TypeScript interfaces for our data structures
interface ProjectSite {
  name: string;
  link: string;
  image: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
  icon: React.ReactNode;
  features: string[];
  sites?: ProjectSite[];
}

//
// PROJECT CARD COMPONENT
//
function ProjectCard({ project }: { project: Project }) {
  const posthog = usePostHog();
  const [showPreview, setShowPreview] = useState(false);
  const [currentSiteIndex, setCurrentSiteIndex] = useState(0);

  const currentSite = project.sites?.[currentSiteIndex] || {
    link: project.link || '',
    image: project.image
  };

  const displayedImage = currentSite.image || project.image;

  const toggleSite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.sites && project.sites.length > 0) {
      const nextIndex = (currentSiteIndex + 1) % project.sites.length;
      setCurrentSiteIndex(nextIndex);
      posthog.capture('project_site_toggled', { 
        project_title: project.title,
        site_name: project.sites[nextIndex].name
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        {showPreview ? (
          <div className="h-[300px] sm:h-[400px] w-full bg-gray-50">
            <iframe
              src={currentSite.link}
              title={project.title}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="relative h-40 sm:h-48 overflow-hidden">
            <img 
              src={displayedImage} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <div className="p-2 bg-blue-500 rounded-lg">
                  {project.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold leading-tight">
                  {project.sites && project.sites.length > 0
                    ? `${project.title} - ${project.sites[currentSiteIndex].name}` 
                    : project.title
                  }
                </h3>
              </div>
            </div>
          </div>
        )}
        
        {/* Preview & Switch Buttons */}
        <button
          onClick={() => {
            const newPreviewState = !showPreview;
            setShowPreview(newPreviewState);
            posthog.capture('project_preview_toggled', { 
              project_title: project.title,
              preview_state: newPreviewState ? 'shown' : 'hidden'
            });
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-300"
        >
          {showPreview ? <Info className="w-4 h-4 text-blue-500" /> : <Eye className="w-4 h-4 text-blue-500" />}
        </button>

        {project.sites && (
          <button
            onClick={toggleSite}
            className="absolute top-3 right-12 p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-300"
          >
            <SwitchCamera className="w-4 h-4 text-blue-500" />
          </button>
        )}
      </div>

      {!showPreview && (
        <div className="p-4 sm:p-6">
          <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{project.description}</p>
          <ul className="space-y-2">
            {project.features.map((feature: string, idx: number) => (
              <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <a
          href={currentSite.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            posthog.capture('project_link_clicked', { 
              project_title: project.title,
              site_name: project.sites ? project.sites[currentSiteIndex].name : project.title,
              url: currentSite.link
            });
          }}
          className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-300 text-sm sm:text-base"
        >
          Visit Site
          <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
}

//
// MAIN APP
//
function App() {
  const posthog = usePostHog();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // For mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track page view on component mount
  useEffect(() => {
    posthog.capture('page_viewed', { page: 'homepage' });
  }, [posthog]);

  // Detect scroll position to show/hide the "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
    posthog.capture('scrolled_to_top');
  };

  // Toggle mobile menu open/close
  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    posthog.capture('mobile_menu_toggled', { state: newState ? 'opened' : 'closed' });
  };

  /**
   * 1. We'll use a ref to track the mobile menu container.
   * 2. When user clicks anywhere outside that container (and it's open), we close it.
   */
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu if user clicks outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-white relative">
      {/* NAVBAR (Sticky with Box Shadow) */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-gray-900 via-[#1a1f2e] to-gray-900 text-white shadow-md shadow-gray-900/10">
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between relative">
          {/* Logo + Name */}
          <div
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
            onClick={scrollToTop}
          >
            <img
              src={shimizuLogo}
              alt="Shimizu Technology Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full"
            />
            <span className="text-lg sm:text-xl font-bold tracking-tight">
              Shimizu Technology
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-5 sm:space-x-8">
            <a
              href="#services"
              className="hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base"
            >
              Services
            </a>
            <a
              href="#projects"
              className="hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base"
            >
              Projects
            </a>
            <a
              href="#workflow"
              className="hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base"
            >
              Process
            </a>
            <a
              href="#about"
              className="hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-white/10 transition"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu + Overlay */}
        {mobileMenuOpen && (
          <>
            {/* Background overlay for a nicer effect */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

            <div
              ref={menuRef}
              className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-white/10 z-50 animate-slideInDown rounded-b-lg"
            >
              <div className="px-6 py-4 space-y-3 flex flex-col">
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-blue-300 transition-colors duration-300 text-base"
                >
                  Services
                </a>
                <a
                  href="#projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-blue-300 transition-colors duration-300 text-base"
                >
                  Projects
                </a>
                <a
                  href="#workflow"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-blue-300 transition-colors duration-300 text-base"
                >
                  Process
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-blue-300 transition-colors duration-300 text-base"
                >
                  About
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-blue-300 transition-colors duration-300 text-base"
                >
                  Contact
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      {/* HERO SECTION */}
      <header className="bg-gradient-to-br from-gray-900 via-[#1a1f2e] to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 leading-tight">
              Building Tomorrow's Solutions Today
            </h1>
            <h2 className="text-2xl sm:text-3xl text-gray-300 mb-4 sm:mb-6 leading-snug">
              Featuring <span className="text-blue-400">Shimizu Order Suite</span>: Modern Restaurant Technology Designed for Guam
            </h2>
            <p className="text-base sm:text-xl text-gray-400 mb-6 sm:mb-8 leading-relaxed">
              We build custom software for any business need, with specialized expertise in restaurant technology. Our Order Suite integrates seamlessly with your existing POS to boost sales, streamline service, and delight customers.
            </p>

            {/* Primary & Secondary CTAs with stronger hover animations */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="#demo-request"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
              >
                Request a Demo
                <ChevronRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
              >
                Discuss Your Project
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <section id="services" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-4">Our Services</h2>
          <p className="text-gray-600 text-center mb-10 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-lg">
            Empowering businesses with cutting-edge technology solutions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 mb-10 sm:mb-16">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group bg-white p-6 sm:p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:translate-y-[-8px] border border-gray-100"
              >
                <div className="text-blue-500 mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">{service.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Extended Services */}
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Extended Services</h3>
            <p className="text-gray-600 mb-6 sm:mb-10 text-sm sm:text-base">
              We also offer specialized solutions to help you stay ahead in the modern marketplace.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {extendedServices.map((item, i) => (
                <div 
                  key={i}
                  className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <h4 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHIMIZU ORDER SUITE */}
      <section id="order-suite" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-4">Shimizu Order Suite</h2>
          <p className="text-gray-600 text-center mb-10 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-lg">
            A powerful, flexible platform designed specifically for restaurants in Guam
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Modernize Your Restaurant Operations</h3>
              <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
                Shimizu Order Suite is a comprehensive platform that integrates seamlessly with your existing POS system to enhance your restaurant operations. From online ordering to table-side service and powerful analytics, our solution helps you boost sales, streamline service, and delight customers.
              </p>
              <a 
                href="#demo-request" 
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 shadow-lg">
              <img 
                src={orderSuiteImage} 
                alt="Shimizu Order Suite in action" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <Globe2 className="w-12 h-12 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Online Ordering</h4>
              <p className="text-gray-600 text-sm">Customer-friendly interface with easy menu management and real-time updates</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <UtensilsCrossed className="w-12 h-12 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Table-Side Ordering</h4>
              <p className="text-gray-600 text-sm">Reduce wait times and increase order accuracy with digital table-side ordering</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <Settings className="w-12 h-12 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">POS Augmentation</h4>
              <p className="text-gray-600 text-sm">Works with your current system and centralizes order management</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <Target className="w-12 h-12 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">VIP & Loyalty Tools</h4>
              <p className="text-gray-600 text-sm">Engage your best customers and drive repeat business with loyalty features</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <ShoppingBag className="w-12 h-12 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Merchandise Sales</h4>
              <p className="text-gray-600 text-sm">Integrated merchandise sales for new revenue streams with easy management</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <BarChart className="w-12 h-12 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Powerful Analytics</h4>
              <p className="text-gray-600 text-sm">Understand sales, customers, and performance with detailed reporting</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <Users className="w-12 h-12 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Staff Management</h4>
              <p className="text-gray-600 text-sm">Manage staff discounts, house accounts, and permissions easily</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <Clock className="w-12 h-12 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Quick Setup</h4>
              <p className="text-gray-600 text-sm">Standard 1-week setup time to get your restaurant online quickly</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* YOUR BRAND, YOUR PORTAL */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-4">Your Brand, Your Portal</h2>
            <p className="text-gray-600 text-center mb-10 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-lg">
              A seamless extension of your restaurant's identity
            </p>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
                We set up a fully customized and branded online ordering portal specifically for your restaurant, powered by the robust Shimizu Order Suite platform. Your customers get a seamless experience that reflects your identity.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-500 text-2xl font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Discovery</h4>
                  <p className="text-gray-600 text-sm">We learn about your brand and requirements</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-500 text-2xl font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Customization</h4>
                  <p className="text-gray-600 text-sm">We tailor the platform to match your brand identity</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-500 text-2xl font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Launch</h4>
                  <p className="text-gray-600 text-sm">Your branded portal goes live within one week</p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-700 font-semibold mb-4">Standard setup time: Just 1 week</p>
                <a 
                  href="#demo-request" 
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base"
                >
                  Request Your Custom Portal
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HAFALOHA CASE STUDY */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Proven Success Under Pressure</h2>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-blue-600">Hafaloha's Concert VIP Experience powered by Shimizu Order Suite</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-bold text-gray-700 mb-1">The Challenge:</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Manage 850 VIP's and their orders efficiently during a high-profile concert event while reducing lines for food and merchandise.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-700 mb-1">The Solution:</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Implemented Shimizu Order Suite with custom VIP codes, online ordering and payment, and order notifications.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-700 mb-1">The Results:</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Flawless execution with smooth operations and enhanced VIP experience. The system handled all orders seamlessly, even during peak demand.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 italic text-gray-700 text-sm sm:text-base mb-6">
                    "It was soooo incredible being able to see what was only a discussion of an idea, come to life. No doubt that the online ordering option is a valuable perk & adds to the VIP experience. I'm excited to sit with the team and you to discuss how we can make it better!!!"
                    <div className="mt-2 font-semibold text-gray-800 not-italic">— Hafaloha Owner</div>
                  </div>
                  
                  <a 
                    href="#demo-request" 
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base self-start"
                  >
                    See How It Works For You
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
                
                <div className="relative">
                  <img 
                    src="/images/mobile-hafaloha-orders.com.PNG"
                    alt="Mobile Hafaloha Orders Website" 
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center justify-center">
                    <div className="bg-white/90 rounded-lg p-4 m-6 shadow-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Key Metrics:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span>850+ VIP orders processed</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span>Zero system downtime</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span>100% order fulfillment rate</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span>Minimal wait times</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-4">Our Projects</h2>
          <p className="text-gray-600 text-center mb-10 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-lg">
            Real solutions we've built for real businesses
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-10 sm:mb-16">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          {/* Mid-Page CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Ready to streamline your operations?</h3>
            <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
              Let’s explore how Shimizu Technology can build the perfect solution for you.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base"
            >
              Let’s Talk
              <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* PROCESS / WORKFLOW */}
      <section id="workflow" className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-4">Our Process</h2>
          <p className="text-gray-600 text-center mb-10 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-lg">
            A streamlined approach to delivering excellence
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {workflowSteps.map((step, index) => (
              <div key={index} className="text-center group px-4">
                <div className="bg-white w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-8 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-gray-100">
                  <div className="text-blue-500">{step.icon}</div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SHIMIZU TECHNOLOGY */}
      <section id="why-us" className="py-16 sm:py-24 bg-white text-gray-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-4">Why Choose Shimizu Technology?</h2>
          <p className="text-gray-600 text-center mb-10 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-lg">
            Whether you need a restaurant platform or custom software, we deliver excellence
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Local Guam Expertise & Support</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                We're right here on Guam, providing responsive, dedicated support. When you need help, 
                you'll speak with someone who understands the local market and your specific needs.
              </p>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Flexibility & Customization</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Need a specific feature? We work with you to tailor our platforms to your unique workflow. 
                Our solutions adapt to your business, not the other way around.
              </p>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Partnership Approach</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                We're more than a vendor; we're your technology partner. We invest in understanding your 
                business goals and challenges to provide solutions that drive real results.
              </p>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Seamless Integration</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Our Order Suite is designed to complement your existing POS, not force a costly replacement. 
                We work with your current systems to enhance capabilities without disruption.
              </p>
            </div>
          </div>
          
          <div className="mt-12 sm:mt-16 text-center">
            <a 
              href="#demo-request" 
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base"
            >
              Experience the Difference
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT (FOUNDER & INTERNSHIP MENTION) */}
      <section id="about" className="py-16 sm:py-24 bg-white text-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-6">About Shimizu Technology</h2>
            <p className="text-base sm:text-xl text-gray-600 leading-relaxed">
              Founded by <span className="font-semibold">Leon Shimizu</span>, our mission is 
              to simplify workflows, automate tedious tasks, and empower organizations to 
              focus on what they do best. 
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-md">
              <div className="mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-bold">Small Team, Big Vision</h3>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                Shimizu Technology is a close-knit, rapidly growing software firm. Our 
                compact size means we can focus on building genuine relationships with 
                clients and delivering tailored solutions that align perfectly with their needs.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Whether you need an existing product customized or a 
                brand-new system built from the ground up, we’re ready to help bring your 
                vision to life—on time and on budget.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-md">
              <div className="mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-bold">Investing in Future Talent</h3>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                We proudly partner with the <span className="font-semibold">Code School of Guam</span> to provide 
                internship opportunities for graduates. This real-world experience bridges 
                the gap between education and industry, fostering the next generation of 
                software engineers right here in Guam.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-3">
                <a 
                  href="https://codeschoolofguam.com" 
                  className="underline text-blue-500 hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about the Code School of Guam
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CODE SCHOOL SECTION (OPTIONAL) */}
      <section className="py-16 sm:py-24 bg-[#1a1f2e] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-6">Launch Your Tech Career in Guam</h2>
            <p className="text-sm sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Join our partnership with the Code School of Guam and transform your passion for technology into a powerful career.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center mb-10 sm:mb-16">
            <div className="bg-[#232836] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-[#f26d3d] mr-3 sm:mr-4" />
                <h3 className="text-lg sm:text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                To provide high-quality, accessible coding education to the people of Guam and beyond, 
                ensuring graduates are prepared to enter the job market as software engineers. Through our 
                internship program, we empower individuals with real-world experience in the rapidly growing tech industry.
              </p>
            </div>
            
            <div className="bg-[#232836] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center mb-4 sm:mb-6">
                <Target className="w-6 sm:w-8 h-6 sm:h-8 text-[#f26d3d] mr-3 sm:mr-4" />
                <h3 className="text-lg sm:text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                We envision transforming Guam into a tech hub by equipping local residents with the skills 
                and real-world experience needed to succeed in the global software industry. Through our 
                partnership, we're building a pipeline of tech talent and contributing to the island's 
                economic growth and innovation.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex flex-col items-center">
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Begin your journey today. No prior experience required.</p>
              <a 
                href="https://codeschoolofguam.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#f26d3d] text-white rounded-lg hover:bg-[#e85d2d] transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg text-sm sm:text-base"
              >
                Apply Now
                <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO REQUEST FORM */}
      <section id="demo-request" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-4">Request a Free Demo</h2>
            <p className="text-gray-600 text-center mb-10 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-lg">
              See how Shimizu Order Suite can transform your restaurant operations
            </p>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-4">Interested in a personalized demo?</h3>
                <p className="text-gray-600 mb-6">
                  Email us at <a href="mailto:ShimizuTechnology@gmail.com" className="text-blue-500 font-semibold hover:underline">ShimizuTechnology@gmail.com</a> with the following information:
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg text-left max-w-lg mx-auto">
                  <ul className="space-y-3 text-gray-700">
                    <li><span className="font-medium">• Your name</span></li>
                    <li><span className="font-medium">• Restaurant name</span></li>
                    <li><span className="font-medium">• Contact information</span> (email and phone)</li>
                    <li><span className="font-medium">• Challenges you're hoping to solve</span></li>
                    <li><span className="font-medium">• Best time to contact you</span></li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center mb-8">
                <a 
                  href="mailto:ShimizuTechnology@gmail.com?subject=Order Suite Demo Request&body=Hello Shimizu Technology Team,%0A%0AI'm interested in a demo of the Shimizu Order Suite.%0A%0AName: %0ARestaurant: %0APhone: %0A%0AChallenges I'm hoping to solve:%0A%0ABest time to contact me:%0A%0AThank you!"
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base flex items-center"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us Now
                </a>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
                <p className="flex items-start">
                  <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>We'll respond to your demo request within 24 hours to schedule a personalized walkthrough of Shimizu Order Suite tailored to your restaurant's needs.</span>
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
                <p>Need a different type of solution? <a href="#contact" className="text-blue-500 hover:underline">Contact us</a> to discuss your custom project.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-4">Get In Touch</h2>
          <p className="text-gray-600 text-center mb-10 sm:mb-20 max-w-2xl mx-auto text-sm sm:text-lg">
            Let's discuss how we can help transform your business
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              <a 
                href="mailto:ShimizuTechnology@gmail.com"
                onClick={() => {
                  posthog.capture('contact_email_clicked', { 
                    method: 'email',
                    email: 'ShimizuTechnology@gmail.com'
                  });
                }}
                className="flex items-center p-6 sm:p-10 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-xl group"
              >
                <Mail className="w-6 sm:w-10 h-6 sm:h-10 text-blue-500 mr-4 sm:mr-8 transform transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h3 className="font-semibold mb-1 sm:mb-2 text-base sm:text-xl">Email Us</h3>
                  <p className="text-gray-600 text-sm sm:text-lg">ShimizuTechnology@gmail.com</p>
                </div>
              </a>
              <a 
                href="tel:+16714830219"
                onClick={() => {
                  posthog.capture('contact_phone_clicked', { 
                    method: 'phone',
                    phone: '+16714830219'
                  });
                }}
                className="flex items-center p-6 sm:p-10 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-xl group"
              >
                <Phone className="w-6 sm:w-10 h-6 sm:h-10 text-blue-500 mr-4 sm:mr-8 transform transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h3 className="font-semibold mb-1 sm:mb-2 text-base sm:text-xl">Call Us</h3>
                  <p className="text-gray-600 text-sm sm:text-lg">(671) 483-0219</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 z-50"
        >
          ↑
        </button>
      )}

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-gray-900 via-[#1a1f2e] to-gray-900 text-white py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src={shimizuLogo}
                alt="Shimizu Technology Logo"
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain rounded-full cursor-pointer"
                onClick={scrollToTop} // LOGO SCROLLS TO TOP
              />
              <span
                className="font-bold tracking-tight text-sm sm:text-base cursor-pointer"
                onClick={scrollToTop} // TEXT SCROLLS TO TOP
              >
                Shimizu Technology
              </span>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-right">
              © {new Date().getFullYear()} Shimizu Technology. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
