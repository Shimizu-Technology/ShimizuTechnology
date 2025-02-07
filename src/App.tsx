import React, { useState, useEffect, useRef } from 'react';
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
  Globe2
} from 'lucide-react';

// 1. Import your local images
import shimizuLogo from './assets/ShimizuTechnologyLogo.jpg'; // For header
import hafalohaImage from './assets/hafaloha_hero.jpg';
import kingsImage from './assets/kings-guam.jpeg';
import shirleysImage from './assets/shirleys-coffee-shop.jpg';

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
    link: "https://hafaloha.netlify.app/ordering",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    features: [
      "Online food ordering system",
      "Table & event reservations",
      "Staff administration portal",
      "Real-time order tracking"
    ]
  },
  {
    title: "Isa Dental Appointments",
    description: "Comprehensive dental practice management system with automated notifications",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    link: "https://isa-dental-appt.netlify.app",
    icon: <CalendarDays className="w-6 h-6" />,
    features: [
      "Online appointment scheduling",
      "Automated reminders",
      "Staff schedule management",
      "Patient portal"
    ]
  },
  {
    title: "Rotary Sushi Reservations",
    description: "Seat-based reservation system for a modern sushi restaurant",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
    link: "https://rotary-sushi.netlify.app",
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
    description: "QR code-enabled digital menus for Kings and Shirleys restaurants",
    image: kingsImage, // Fallback image for the card if no specific site is selected
    icon: <MenuIcon className="w-6 h-6" />,
    features: [
      "Mobile-optimized menus",
      "QR code integration",
      "Easy menu updates",
      "Multiple restaurant support"
    ],
    sites: [
      {
        name: "Kings",
        link: "https://kings-guam.netlify.app",
        image: kingsImage
      },
      {
        name: "Shirleys",
        link: "https://shirleys.netlify.app",
        image: shirleysImage
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

//
// PROJECT CARD COMPONENT
//
function ProjectCard({ project }) {
  const [showPreview, setShowPreview] = useState(false);
  const [currentSiteIndex, setCurrentSiteIndex] = useState(0);

  const currentSite = project.sites?.[currentSiteIndex] || {
    link: project.link,
    image: project.image
  };

  const displayedImage = currentSite.image || project.image;

  const toggleSite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.sites) {
      setCurrentSiteIndex((prev) => (prev + 1) % project.sites.length);
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
                  {project.sites 
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
          onClick={() => setShowPreview(!showPreview)}
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
            {project.features.map((feature, idx) => (
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
  const [showBackToTop, setShowBackToTop] = useState(false);

  // For mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  };

  // Toggle mobile menu open/close
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
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
              Empowering businesses with streamlined software and automation
            </h2>
            <p className="text-base sm:text-xl text-gray-400 mb-6 sm:mb-8 leading-relaxed">
              From restaurant reservations to payroll systems, we craft custom solutions
              that make your operations seamless—so you can focus on what you do best.
            </p>

            {/* Primary & Secondary CTAs with stronger hover animations */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="#contact"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
              >
                Get Started
                <ChevronRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
              >
                Schedule a Call
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

      {/* WHY WORK WITH US */}
      <section id="why-us" className="py-16 sm:py-24 bg-white text-gray-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-4">Why Work With Us?</h2>
          <p className="text-gray-600 text-center mb-10 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-lg">
            Discover the benefits of partnering with a dedicated, agile team.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Personalized Approach</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                We treat every client like a long-term partner, taking the time to understand 
                your unique challenges and crafting tailored solutions.
              </p>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Future-Ready Solutions</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Our modern tech stack and focus on emerging technologies ensure your business 
                stays ahead of the curve.
              </p>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Community & Growth</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                By partnering with the Code School of Guam, we help grow local tech talent, 
                ensuring a vibrant future for Guam’s tech ecosystem.
              </p>
            </div>
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
