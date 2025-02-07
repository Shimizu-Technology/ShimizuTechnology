import React, { useState } from 'react';
import { 
  Globe2, 
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
  Menu,
  Eye,
  Info,
  SwitchCamera
} from 'lucide-react';

// 1. Import your local images
import hafalohaImage from './assets/hafaloha_hero.jpg';
import kingsImage from './assets/kings-guam.jpeg';
import shirleysImage from './assets/shirleys-coffee-shop.jpg';

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
    icon: <Menu className="w-6 h-6" />,
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
    icon: <Globe2 className="w-6 h-6" />,
    title: "Web Applications",
    description: "Modern, responsive web applications that scale"
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Business Automation",
    description: "Streamline your operations with smart automation"
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

  // If multiple sites exist, pick the site data based on currentSiteIndex
  const currentSite = project.sites?.[currentSiteIndex] || {
    link: project.link,
    image: project.image
  };

  // Decide which image to display based on the current site or the project fallback
  const displayedImage = currentSite.image || project.image;

  const toggleSite = (e) => {
    e.stopPropagation();
    if (project.sites) {
      setCurrentSiteIndex((prev) => (prev + 1) % project.sites.length);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        {/* Preview (iFrame) or Image */}
        {showPreview ? (
          <div className="h-[400px] w-full bg-gray-50">
            <iframe
              src={currentSite.link}
              title={project.title}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={displayedImage} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-500 rounded-lg">
                  {project.icon}
                </div>
                <h3 className="text-xl font-semibold">
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
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-300"
        >
          {showPreview ? <Info className="w-5 h-5 text-blue-500" /> : <Eye className="w-5 h-5 text-blue-500" />}
        </button>

        {project.sites && (
          <button
            onClick={toggleSite}
            className="absolute top-4 right-16 p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-300"
          >
            <SwitchCamera className="w-5 h-5 text-blue-500" />
          </button>
        )}
      </div>

      {/* Description & Features */}
      {!showPreview && (
        <div className="p-6">
          <p className="text-gray-600 mb-4">{project.description}</p>
          <ul className="space-y-2">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Visit Link */}
      <div className="px-6 pb-6">
        <a
          href={currentSite.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-300"
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
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER / HERO */}
      <header className="bg-gradient-to-br from-gray-900 via-[#1a1f2e] to-gray-900 text-white">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Globe2 className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold tracking-tight">Shimizu Technology</span>
            </div>
            {/* Navigation */}
            <div className="hidden md:flex space-x-10">
              <a href="#services" className="hover:text-blue-400 transition-colors duration-300">Services</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors duration-300">Projects</a>
              <a href="#workflow" className="hover:text-blue-400 transition-colors duration-300">Process</a>
              <a href="#about" className="hover:text-blue-400 transition-colors duration-300">About</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors duration-300">Contact</a>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-28">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Building Tomorrow's Solutions Today
            </h1>
            <h2 className="text-3xl text-gray-300 mb-8">
              Empowering businesses with streamlined software and automation
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              From restaurant reservations to payroll systems, we craft custom solutions 
              that make your operations seamless—so you can focus on what you do best.
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              Get Started
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <section id="services" className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-gray-600 text-center mb-20 max-w-2xl mx-auto text-lg">
            Empowering businesses with cutting-edge technology solutions
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:translate-y-[-8px] border border-gray-100"
              >
                <div className="text-blue-500 mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Our Projects</h2>
          <p className="text-gray-600 text-center mb-20 max-w-2xl mx-auto text-lg">
            Real solutions we've built for real businesses
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / WORKFLOW */}
      <section id="workflow" className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Our Process</h2>
          <p className="text-gray-600 text-center mb-20 max-w-2xl mx-auto text-lg">
            A streamlined approach to delivering excellence
          </p>
          <div className="grid md:grid-cols-4 gap-12">
            {workflowSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white w-24 h-24 mx-auto rounded-2xl flex items-center justify-center shadow-lg mb-8 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-gray-100">
                  <div className="text-blue-500">{step.icon}</div>
                </div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT (FOUNDER & INTERNSHIP MENTION) */}
      <section id="about" className="py-24 bg-white text-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">About Shimizu Technology</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Founded by <span className="font-semibold">Leon Shimizu</span>, our mission is 
              to simplify workflows, automate tedious tasks, and empower organizations to 
              focus on what they do best. 
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
              <div className="mb-4">
                <h3 className="text-2xl font-bold">Small Team, Big Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Shimizu Technology is a close-knit, rapidly growing software firm. Our 
                compact size means we can focus on building genuine relationships with 
                clients and delivering tailored solutions that align perfectly with their needs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you need an existing product customized or a 
                brand-new system built from the ground up, we’re ready to help bring your 
                vision to life—on time and on budget.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
              <div className="mb-4">
                <h3 className="text-2xl font-bold">Investing in Future Talent</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We proudly partner with the <span className="font-semibold">Code School of Guam</span> to provide 
                internship opportunities for graduates. This real-world experience bridges 
                the gap between education and industry, fostering the next generation of 
                software engineers right here in Guam.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
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
      <section className="py-24 bg-[#1a1f2e] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Launch Your Tech Career in Guam</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our partnership with the Code School of Guam and transform your passion for technology into a powerful career.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-[#232836] p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <Rocket className="w-8 h-8 text-[#f26d3d] mr-4" />
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To provide high-quality, accessible coding education to the people of Guam and beyond, 
                ensuring graduates are prepared to enter the job market as software engineers. Through our 
                internship program, we empower individuals with real-world experience in the rapidly growing tech industry.
              </p>
            </div>
            
            <div className="bg-[#232836] p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-[#f26d3d] mr-4" />
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We envision transforming Guam into a tech hub by equipping local residents with the skills 
                and real-world experience needed to succeed in the global software industry. Through our 
                partnership, we're building a pipeline of tech talent and contributing to the island's 
                economic growth and innovation.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex flex-col items-center">
              <p className="text-gray-400 mb-6">Begin your journey today. No prior experience required.</p>
              <a 
                href="https://codeschoolofguam.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-[#f26d3d] text-white rounded-lg hover:bg-[#e85d2d] transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Get In Touch</h2>
          <p className="text-gray-600 text-center mb-20 max-w-2xl mx-auto text-lg">
            Let's discuss how we can help transform your business
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
              <a 
                href="mailto:ShimizuTechnology@gmail.com"
                className="flex items-center p-10 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-xl group"
              >
                <Mail className="w-10 h-10 text-blue-500 mr-8 transform transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h3 className="font-semibold mb-2 text-xl">Email Us</h3>
                  <p className="text-gray-600 text-lg">ShimizuTechnology@gmail.com</p>
                </div>
              </a>
              <a 
                href="tel:+16714830219"
                className="flex items-center p-10 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-xl group"
              >
                <Phone className="w-10 h-10 text-blue-500 mr-8 transform transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h3 className="font-semibold mb-2 text-xl">Call Us</h3>
                  <p className="text-gray-600 text-lg">(671) 483-0219</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-gray-900 via-[#1a1f2e] to-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <Globe2 className="w-6 h-6 text-blue-500" />
              <span className="font-bold tracking-tight">Shimizu Technology</span>
            </div>
            <div className="text-gray-400 text-sm text-center md:text-right">
              © {new Date().getFullYear()} Shimizu Technology. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
