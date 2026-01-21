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
  Menu as MenuIcon,
  X as CloseIcon,
  Globe2,
  Brain,
  Smartphone,
  ShoppingCart,
  Plane,
  BookOpen,
  Utensils,
  Languages,
  GraduationCap,
  ExternalLink,
  CheckCircle,
  Star,
  Zap,
  Quote,
  FileText,
  Wrench,
} from 'lucide-react';

// Import your local images
import shimizuLogo from './assets/ShimizuTechnologyLogo.jpg';
import hafalohaImage from './assets/hafaloha_hero.jpg';

// Global Smooth Scrolling
document.documentElement.style.scrollBehavior = 'smooth';

//
// FEATURED PROJECTS DATA
//
const projects = [
  {
    title: "HåfaGPT",
    subtitle: "Chamorro Language Learning",
    description: "AI-powered platform for learning Chamorro, the indigenous language of Guam. Combines modern AI with traditional learning methods.",
    image: "/images/HafaGPT-icon1.png",
    imageStyle: "object-contain bg-[#f5f0e6] p-6", // Light cream background to match icon
    link: "https://hafagpt.com",
    icon: <Languages className="w-5 h-5" />,
    accentColor: "bg-amber-500",
    features: [
      "AI Tutor with 45,000+ knowledge chunks",
      "Interactive flashcards & quizzes",
      "24 bilingual stories"
    ],
    tags: ["AI/ML", "React", "FastAPI"],
    isNew: true,
    isFeatured: true
  },
  {
    title: "Håfa Recipes",
    subtitle: "AI Recipe Extraction",
    description: "Mobile app using AI to transform cooking videos from TikTok, YouTube, and Instagram into organized recipes.",
    image: "/images/HafaRecipes-icon.png",
    imageStyle: "object-contain bg-gray-50 p-4", // Clean white background
    link: "https://hafa-recipes.com",
    appStoreLink: "https://apps.apple.com/us/app/recipe-extractor-gu/id6755892896",
    icon: <Utensils className="w-5 h-5" />,
    accentColor: "bg-orange-500",
    features: [
      "Video-to-recipe AI extraction",
      "Photo OCR for handwritten recipes",
      "AI Recipe Chat with GPT-4o"
    ],
    tags: ["iOS", "React Native", "AI/ML"],
    isNew: true,
    isFeatured: true
  },
  {
    title: "Hafaloha Orders",
    subtitle: "Online Ordering & VIP",
    description: "Complete ordering and VIP platform. Expanding to handle retail merchandise and wholesale ordering.",
    image: hafalohaImage,
    imageStyle: "object-cover",
    link: "https://hafaloha-orders.com",
    icon: <ShoppingCart className="w-5 h-5" />,
    accentColor: "bg-cyan-500",
    features: [
      "Online food ordering system",
      "Concert VIP (850+ orders)",
      "Retail & wholesale expansion"
    ],
    tags: ["E-commerce", "React", "Rails"],
    isFeatured: true
  },
  {
    title: "GIAA Golf Tournament",
    subtitle: "Airport Authority Event",
    description: "Custom registration and admin dashboard for the annual Edward A.P. Muna II Memorial Golf Tournament. Built for reuse year after year.",
    image: "/images/giaa-logo.png",
    imageStyle: "object-contain bg-gradient-to-b from-sky-50 to-blue-100 p-6", // Light blue gradient for visibility
    link: "https://giaa-tournament.com",
    icon: <Plane className="w-5 h-5" />,
    accentColor: "bg-blue-600",
    features: [
      "Online registration & payments",
      "Admin event dashboard",
      "Tournament day check-in"
    ],
    tags: ["Events", "Stripe", "React"],
    isNew: true
  },
  {
    title: "Guahan Grocer",
    subtitle: "Grocery Delivery",
    description: "Guam's local grocery delivery platform connecting shoppers with stores. Currently on pause.",
    image: "/images/Guahan-Grocer-Logo.png",
    imageStyle: "object-contain bg-[#f5f0e6] p-6", // Cream background to match logo
    appStoreLink: "https://apps.apple.com/us/app/guahan-grocer/id6749652653",
    icon: <ShoppingCart className="w-5 h-5" />,
    accentColor: "bg-green-500",
    features: [
      "Multi-store grocery browsing",
      "Real-time delivery tracking",
      "Shopper & driver management"
    ],
    tags: ["Mobile", "React Native", "Rails"],
    isPaused: true
  },
  {
    title: "Cornerstone Accounting",
    subtitle: "Tax & Accounting Platform",
    description: "Full-service accounting platform with digital client intake, workflow management, and admin dashboard. Transformed their paper-based process into a streamlined digital system.",
    image: "/images/cornerstone-logo.jpeg",
    imageStyle: "object-contain bg-[#f5f0e6]",
    link: "https://cornerstone-accounting.tax",
    icon: <BookOpen className="w-5 h-5" />,
    accentColor: "bg-amber-700",
    features: [
      "8-step digital intake form",
      "Workflow & status dashboard",
      "Employee time tracking"
    ],
    tags: ["Business Platform", "React", "Rails"],
    isNew: true
  }
];

//
// INTERNAL TOOLS DATA - Tools we built for ourselves
//
const internalTools = [
  {
    title: "Invoice Maker",
    description: "AI-powered invoice generation. Describe what you need in plain English or paste timesheet screenshots — the AI extracts hours and creates professional invoices.",
    link: "https://invoice-maker-gu.netlify.app/chat",
    icon: <FileText className="w-5 h-5" />,
    accentColor: "bg-teal-500",
    features: [
      "Natural language invoice creation",
      "Vision AI extracts hours from screenshots",
      "Client templates & PDF generation"
    ],
    tags: ["AI/ML", "React", "FastAPI"]
  },
  {
    title: "Hafa Timezones",
    description: "Instantly convert times across multiple timezones. Find overlapping business hours for scheduling meetings with teams around the world.",
    link: "https://hafa-timezones.com",
    icon: <Clock className="w-5 h-5" />,
    accentColor: "bg-purple-500",
    features: [
      "Multi-timezone conversion",
      "Meeting time finder",
      "Shareable URL state"
    ],
    tags: ["React", "TypeScript", "Luxon"]
  }
];

//
// SERVICES DATA
//
const services = [
  {
    icon: <Brain className="w-7 h-7" />,
    title: "AI & Machine Learning",
    description: "Build intelligent applications with RAG systems, chatbots, and custom AI solutions. We've deployed production AI with Whisper, GPT-4o, Gemini, and more.",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: <Smartphone className="w-7 h-7" />,
    title: "Mobile App Development",
    description: "Cross-platform iOS and Android apps using React Native. From concept to App Store deployment with ongoing maintenance.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: <Globe2 className="w-7 h-7" />,
    title: "Web Applications",
    description: "Modern, responsive web applications built with React, TypeScript, and Ruby on Rails. Scalable architecture that grows with your business.",
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    icon: <Settings className="w-7 h-7" />,
    title: "Business Automation",
    description: "Streamline operations with custom automation tools, integrations, and workflow optimization. Save time and reduce errors.",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600"
  }
];

//
// TECH STACK
//
const techStack = [
  "React", "React Native", "TypeScript", "Ruby on Rails", "FastAPI", 
  "Python", "PostgreSQL", "OpenAI", "Gemini", "Stripe"
];

//
// WORKFLOW STEPS
//
const workflowSteps = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Discovery",
    description: "We dive deep into your business needs, challenges, and goals to craft the perfect solution."
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Design & Prototype",
    description: "We create interactive prototypes so you can see and feel your product before we build it."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Agile Development",
    description: "We build in sprints with regular check-ins, so you're always in the loop on progress."
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Launch & Support",
    description: "We deploy your solution and provide ongoing support to keep everything running smoothly."
  }
];

//
// PROJECT CARD COMPONENT - Fixed height with uniform layout
//
interface ProjectCardProps {
  project: typeof projects[0];
}

function ProjectCard({ project }: ProjectCardProps) {
  const posthog = usePostHog();

  return (
    <div 
      className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full ${project.isPaused ? 'opacity-75' : ''}`}
    >
      {/* Image Header - Fixed height */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full h-full ${project.imageStyle || 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
        />
        {/* Only add overlay for photos, not for icon/logo images */}
        {project.imageStyle?.includes('object-cover') && !project.imageStyle?.includes('object-contain') && (
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
        )}
        
        {/* Status badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          {project.isNew && (
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded shadow-sm">
              NEW
            </span>
          )}
          {project.isFeatured && (
            <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-semibold rounded flex items-center gap-1 shadow-sm">
              <Star className="w-3 h-3" /> FEATURED
            </span>
          )}
          {project.isPaused && (
            <span className="px-2 py-0.5 bg-gray-500 text-white text-xs font-semibold rounded shadow-sm">
              PAUSED
            </span>
          )}
        </div>
      </div>

      {/* Content - Flex grow to fill space */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title row */}
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1.5 ${project.accentColor} rounded-md text-white flex-shrink-0`}>
            {project.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-gray-900 truncate">{project.title}</h3>
            <p className="text-gray-500 text-xs truncate">{project.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          {project.description}
        </p>
        
        {/* Features - Fixed height area */}
        <ul className="space-y-1.5 mb-3 flex-grow">
          {project.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-600">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Tags - Fixed position from bottom */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions - Always at bottom */}
        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-100">
          {project.link && !project.isPaused && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                posthog.capture('project_link_clicked', { 
                  project_title: project.title,
                  url: project.link
                });
              }}
              className={`inline-flex items-center px-3 py-1.5 ${project.accentColor} text-white rounded-md hover:opacity-90 transition-all text-sm font-medium`}
            >
              Visit Site
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          )}
          {project.appStoreLink && (
            <a
              href={project.appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                posthog.capture('app_store_clicked', { 
                  project_title: project.title
                });
              }}
              className="inline-flex items-center px-3 py-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all text-sm font-medium"
            >
              <Smartphone className="w-3 h-3 mr-1" />
              App Store
            </a>
          )}
          {project.isPaused && !project.appStoreLink && (
            <span className="text-sm text-gray-400 italic">Currently on hold</span>
          )}
        </div>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  // Track page view on component mount
  useEffect(() => {
    posthog.capture('page_viewed', { page: 'homepage' });
  }, [posthog]);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      
      // Track active section
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (sectionTop <= scrollPosition && sectionBottom > scrollPosition) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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

  const navItems = [
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#process", label: "Process" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-gray-900 text-white">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={scrollToTop}
            >
              <img
                src={shimizuLogo}
                alt="Shimizu Technology Logo"
                className="h-9 w-9 object-contain rounded-full"
              />
              <span className="text-lg font-bold">
                Shimizu Technology
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://codeschoolofguam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-sm font-medium transition-colors"
              >
                Code School
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <CloseIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileMenuOpen(false)} />
            <div
              ref={menuRef}
              className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-white/10 z-50"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                      activeSection === item.href.slice(1)
                        ? "bg-white/10 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="https://codeschoolofguam.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 bg-red-500 rounded-md text-base font-medium text-white text-center mt-2"
                >
                  Code School of Guam
                </a>
              </div>
            </div>
          </>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="bg-gray-900 text-white relative overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Building AI-Powered Solutions in Guam
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transforming Ideas
              <br />
              <span className="text-blue-400">Into Reality</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              We build custom software, AI applications, and mobile apps that solve real problems for businesses in Guam and beyond.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-10">
              <div>
                <div className="text-3xl font-bold text-white">10+</div>
                <div className="text-sm text-gray-400">Active Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">5</div>
                <div className="text-sm text-gray-400">AI Apps Deployed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">3</div>
                <div className="text-sm text-gray-400">Apps on App Store</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Start Your Project
                <ChevronRight className="ml-1 w-4 h-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-medium transition-colors"
              >
                View Our Work
                <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-medium mb-2">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From AI-powered applications to mobile apps, we build technology that makes a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-xl ${service.iconBg} ${service.iconColor} mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mt-12 text-center">
            <p className="text-sm font-medium text-gray-500 mb-4">Technologies We Use</p>
            <div className="flex flex-wrap justify-center gap-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section id="projects" className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Subtle decorative blobs */}
        <div className="absolute top-20 -left-32 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 -right-32 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-medium mb-2">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real solutions we've built for real businesses in Guam and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          {/* INTERNAL TOOLS SECTION */}
          <div className="mt-20 pt-16 border-t border-gray-200">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-4">
                <Wrench className="w-4 h-4" />
                Built for Us
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Tools We Build for Ourselves
              </h3>
              <p className="text-gray-600 max-w-xl mx-auto">
                When we have a problem, we solve it with code. These internal tools help us work smarter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {internalTools.map((tool, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 ${tool.accentColor} rounded-lg text-white`}>
                      {tool.icon}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">{tool.title}</h4>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-4">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags & Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-3 py-1.5 ${tool.accentColor} text-white rounded-md hover:opacity-90 transition-all text-sm font-medium`}
                    >
                      Try It
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HAFALOHA TESTIMONIAL - Compact version */}
      <section className="py-16 md:py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Subtle glow behind metrics */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Proven Success Under Pressure
            </h2>
            <p className="text-blue-400 font-medium">
              Hafaloha's Concert VIP Experience
            </p>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-blue-400">850+</div>
              <div className="text-sm text-gray-400 mt-1">VIP Orders</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-green-400">100%</div>
              <div className="text-sm text-gray-400 mt-1">Fulfillment</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">Zero</div>
              <div className="text-sm text-gray-400 mt-1">Downtime</div>
            </div>
          </div>

          {/* Quote */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-10 h-10 text-blue-500/30" />
              <blockquote className="text-center text-lg md:text-xl text-gray-300 leading-relaxed pl-6">
                "It was soooo incredible being able to see what was only a discussion of an idea, come to life. No doubt that the online ordering option is a valuable perk & adds to the VIP experience. I'm excited to sit with the team and you to discuss how we can make it better!!!"
              </blockquote>
            </div>
            <p className="text-center mt-4 text-gray-400">
              — <span className="text-white font-medium">Hafaloha Owner</span>
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Let's Build Your Solution
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* GIAA TESTIMONIAL */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-4">
              <Plane className="w-4 h-4" />
              Guam International Airport Authority
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Digital Transformation Success
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            <Quote className="w-10 h-10 text-blue-400/40 mb-4" />
            
            <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
              "Transitioning to a digital system is a <span className="text-white font-semibold">significant milestone</span> for us, and we are incredibly impressed with how smoothly the rollout went. Your technical expertise and attention to detail ensured that the process is <span className="text-white font-semibold">user-friendly for our registrants and efficient for our team</span>. We already see the benefits of the streamlined workflow. Thank you for the excellent work!"
            </blockquote>

            {/* Source */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Guam International Airport Authority</p>
                  <p className="text-sm text-gray-400">Golf Tournament Registration System</p>
                </div>
              </div>
              
              {/* Project link */}
              <a
                href="https://giaa-tournament.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                View Project
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>

          {/* Additional praise - the follow-up message */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 italic">
              "Check in process was awesome!" <span className="text-gray-500">— Follow-up message after tournament day</span>
            </p>
          </div>
        </div>
      </section>

      {/* UOG AI WORKSHOP */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              AI Training & Workshops
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Empowering Organizations with AI
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beyond building software, we help teams understand and leverage AI effectively.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/uog-intro-to-ai.jpeg" 
                alt="UOG Intro to AI Workshop attendees"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  UOG
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">University of Guam</h3>
                  <p className="text-sm text-gray-500">Office of the Senior Vice President & Provost</p>
                </div>
              </div>

              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Intro to AI Workshop
              </h4>
              <p className="text-gray-600 mb-4">
                A two-day seminar (July 9-10, 2025) introducing UOG staff to AI fundamentals — what it is, how to use it effectively, and what to watch out for.
              </p>

              {/* Topics covered */}
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>What is AI & how does ChatGPT work</span>
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Practical use cases: brainstorming, analysis, proofreading</span>
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Risks & limitations: hallucinations, security, privacy</span>
                </li>
              </ul>

              {/* Quote */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <Quote className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-gray-700 italic mb-2">
                  "The staff are raving about the training! Thanks again for a wonderful seminar."
                </p>
                <p className="text-sm text-gray-500">
                  — Office of the Senior Vice President & Provost, UOG
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-medium mb-2">How We Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven approach that delivers results, on time and on budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="text-sm text-blue-600 font-medium mb-1">Step {index + 1}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px'}} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left content */}
            <div>
              <p className="text-blue-600 font-medium mb-2">About Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Proudly Building in <span className="text-blue-600">Guam</span>
              </h2>
              
              {/* Founder intro with photo */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <img 
                  src="/images/NationalsPic2.jpg" 
                  alt="Leon Shimizu" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/30"
                />
                <div>
                  <p className="font-bold text-gray-900 text-lg">Leon Shimizu</p>
                  <p className="text-sm text-blue-600 font-medium">Founder</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                I started Shimizu Technology because I saw a problem: <strong>employers want engineers with experience, but new engineers can't get experience if no one gives them a chance.</strong> As the founder of the <a href="https://codeschoolofguam.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">Code School of Guam</a>, I wanted to ensure every graduate had access to real-world projects — so I started building software for local businesses.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Along the way, I discovered something: <strong>I genuinely love building custom software.</strong> There's something incredibly rewarding about seeing ideas come to life and helping businesses solve real problems with technology.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                What started as a way to give students real-world experience has grown into a full-fledged software firm. Today, we specialize in AI-powered applications, mobile apps, and custom web solutions — and we genuinely enjoy every project we take on.
              </p>

              {/* Code School Connection */}
              <div className="bg-red-500 rounded-xl p-5 text-white">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Code School of Guam Partnership</h3>
                    <p className="text-white/90 text-sm mb-3">
                      We provide internship opportunities for Code School graduates, giving them the real-world experience employers want to see. Our team includes talented junior developers from our program.
                    </p>
                    <a
                      href="https://codeschoolofguam.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium hover:underline"
                    >
                      Learn more about Code School
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right content - Values */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Local Expertise</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  We understand the Guam market and provide responsive, dedicated support. When you need help, you'll work with someone who knows your specific needs.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">AI-First Approach</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  We leverage cutting-edge AI models like GPT-4o, Gemini, and Whisper to build intelligent applications that solve real problems.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">End-to-End Delivery</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  From concept to App Store deployment, we handle everything. Design, development, deployment, and ongoing support — all under one roof.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <p className="text-blue-400 font-medium mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Ready to start your project? Reach out and let's discuss how we can help.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
            <a
              href="mailto:ShimizuTechnology@gmail.com"
              onClick={() => {
                posthog.capture('contact_email_clicked');
              }}
              className="flex items-center gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <div className="p-3 bg-blue-500 rounded-xl flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Email Us</div>
                <div className="text-gray-400 text-sm break-all">ShimizuTechnology@gmail.com</div>
              </div>
            </a>

            <a
              href="tel:+16714830219"
              onClick={() => {
                posthog.capture('contact_phone_clicked');
              }}
              className="flex items-center gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <div className="p-3 bg-green-500 rounded-xl flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Call Us</div>
                <div className="text-gray-400 text-sm">(671) 483-0219</div>
              </div>
            </a>
          </div>

          {/* Additional CTA */}
          <p className="text-gray-400 text-sm mb-4">
            Looking to learn coding? Check out our partner program:
          </p>
          <a
            href="https://codeschoolofguam.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Visit Code School of Guam
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <img
                src={shimizuLogo}
                alt="Shimizu Technology Logo"
                className="h-9 w-9 object-contain rounded-full cursor-pointer"
                onClick={scrollToTop}
              />
              <div>
                <span className="font-semibold block">Shimizu Technology</span>
                <span className="text-sm text-gray-400">Building the future in Guam</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a>
              <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>

            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Shimizu Technology
            </div>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all z-50"
          aria-label="Back to top"
        >
          <ArrowRight className="w-5 h-5 -rotate-90" />
        </button>
      )}
    </div>
  );
}

export default App;
