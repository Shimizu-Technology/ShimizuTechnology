import React from 'react';
import {
  Languages,
  Utensils,
  ShoppingCart,
  Plane,
  BookOpen,
  Brain,
  Smartphone,
  Globe2,
  Settings,
  Users,
  Code2,
  Zap,
  Rocket,
  FileText,
  Clock,
  Swords,
  HeartHandshake,
  Mic,
} from 'lucide-react';
import hafalohaImage from '../assets/hafaloha_hero.jpg';

// Types
export interface Project {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  imageStyle?: string;
  gradientBg?: string;
  link?: string;
  appStoreLink?: string;
  icon: React.ReactNode;
  accentColor: string;
  features: string[];
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isPaused?: boolean;
  isComingSoon?: string;
}

export interface InternalTool {
  title: string;
  description: string;
  link?: string;
  image?: string;
  icon: React.ReactNode;
  accentColor: string;
  features: string[];
  tags: string[];
  isComingSoon?: string;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

export interface WorkflowStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

//
// FEATURED PROJECTS DATA
//
export const projects: Project[] = [
  {
    title: "HafaGPT",
    subtitle: "Chamorro Language Learning",
    description: "AI-powered platform for learning Chamorro, the indigenous language of Guam. Combines modern AI with practical lessons, stories, and study tools.",
    image: "/images/HafaGPT-icon1.png",
    imageStyle: "object-contain bg-[#f5f0e6] p-6",
    link: "https://hafagpt.com",
    icon: <Languages className="w-5 h-5" />,
    accentColor: "bg-amber-500",
    features: [
      "AI tutor with 45,000+ knowledge chunks",
      "Interactive flashcards, quizzes, and stories",
      "Built for Guam's language learners"
    ],
    tags: ["AI/ML", "React", "FastAPI"],
    isFeatured: true
  },
  {
    title: "Hafa Code",
    subtitle: "Lightweight Coding Playground",
    description: "A simple Replit alternative for Code School of Guam, FD students, alumni, and anyone learning to code — fast, approachable, and distraction-free.",
    gradientBg: "from-sky-500 to-indigo-700",
    link: "https://hafa-code.netlify.app",
    icon: <Code2 className="w-5 h-5" />,
    accentColor: "bg-sky-600",
    features: [
      "Ruby, JavaScript, and HTML/CSS/JS in-browser",
      "Private local projects with optional cloud sync",
      "Share links and checkpoints for students"
    ],
    tags: ["Education", "TypeScript", "WASM"],
    isNew: true,
    isFeatured: true
  },
  {
    title: "Cornerstone Payroll",
    subtitle: "Guam Payroll Platform",
    description: "A Guam-specific payroll system built as a better local alternative to generic mainland payroll tools and QuickBooks workflows.",
    image: "/images/cornerstone-logo.jpeg",
    imageStyle: "object-contain bg-[#f5f0e6] p-6",
    link: "https://cornerstone-payroll.netlify.app",
    icon: <BookOpen className="w-5 h-5" />,
    accentColor: "bg-amber-700",
    features: [
      "Payroll runs, pay periods, and approvals",
      "Guam tax support and reporting workflows",
      "Check printing and employee records"
    ],
    tags: ["Payroll", "React", "Rails"],
    isNew: true,
    isFeatured: true
  },
  {
    title: "Golf for Wishes",
    subtitle: "Make-A-Wish Event Platform",
    description: "Registration and event management platform for Make-A-Wish Guam & CNMI, supporting charity events from signup through tournament day.",
    gradientBg: "from-sky-400 to-blue-700",
    link: "https://golfforwishes.com",
    icon: <HeartHandshake className="w-5 h-5" />,
    accentColor: "bg-blue-600",
    features: [
      "Team registration and payments",
      "Sponsor and raffle management",
      "Admin tools for event-day operations"
    ],
    tags: ["Events", "Stripe", "React"],
    isNew: true,
    isFeatured: true
  },
  {
    title: "Marianas Open",
    subtitle: "International BJJ Tournament Platform",
    description: "Official platform for the largest Brazilian Jiu-Jitsu tournament in Southeast Asia, serving competitors and fans across Guam, Korea, Japan, and beyond.",
    image: "/images/mo-logo-white.png",
    imageStyle: "object-contain bg-slate-900 p-6",
    link: "https://marianasopen.com",
    icon: <Swords className="w-5 h-5" />,
    accentColor: "bg-red-600",
    features: [
      "Multi-country event calendar and scheduling",
      "Competitor profiles and rankings",
      "Live stream integration and event results"
    ],
    tags: ["Sports", "React", "Rails"],
    isFeatured: true
  },
  {
    title: "AIRE Services",
    subtitle: "Live Operations Platform",
    description: "A production operations system for AIRE Services Guam, already used by employees for clock-in/clock-out and daily business workflows.",
    gradientBg: "from-cyan-500 to-slate-800",
    link: "https://aire-services-guam.netlify.app",
    icon: <Clock className="w-5 h-5" />,
    accentColor: "bg-cyan-700",
    features: [
      "Employee time clock and attendance",
      "Operations dashboards and approvals",
      "Payroll-oriented summaries and exports"
    ],
    tags: ["Operations", "React", "Rails"],
    isNew: true
  },
  {
    title: "Hafaloha Orders",
    subtitle: "Online Ordering & VIP",
    description: "Complete ordering, retail, and VIP platform for Hawaiian businesses, with concert VIP, merchandise, shipping, and admin workflows.",
    image: hafalohaImage,
    imageStyle: "object-cover",
    link: "https://hafaloha-orders.com",
    icon: <ShoppingCart className="w-5 h-5" />,
    accentColor: "bg-cyan-500",
    features: [
      "Online ordering and concert VIP fulfillment",
      "EasyPost shipping with labels and customs",
      "Real-time order tracking and admin dashboard"
    ],
    tags: ["E-commerce", "React", "Rails"],
    isFeatured: true
  },
  {
    title: "Cornerstone Accounting",
    subtitle: "Tax & Accounting Platform",
    description: "Full-service accounting platform with digital client intake, workflow management, operations checklists, and admin dashboards.",
    image: "/images/cornerstone-logo.jpeg",
    imageStyle: "object-contain bg-[#f5f0e6] p-6",
    link: "https://cornerstone-accounting.tax",
    icon: <BookOpen className="w-5 h-5" />,
    accentColor: "bg-amber-700",
    features: [
      "Digital client intake and document workflows",
      "Workflow, status, and operations dashboards",
      "Time tracking and recurring task systems"
    ],
    tags: ["Business", "React", "Rails"]
  },
  {
    title: "Three Squares Grill",
    subtitle: "Restaurant & Catering Ordering",
    description: "Modern ordering platform for Three Squares and B&G Pacific, designed for catering, dine-in/takeout, and repeat restaurant workflows.",
    gradientBg: "from-emerald-500 to-emerald-700",
    link: "https://three-squares-web.netlify.app",
    icon: <Utensils className="w-5 h-5" />,
    accentColor: "bg-emerald-600",
    features: [
      "Catering and bulk ordering flows",
      "Admin dashboard and order management",
      "Built for multi-location restaurant operations"
    ],
    tags: ["Restaurant", "React", "Rails"],
    isComingSoon: "Coming Soon"
  },
  {
    title: "GIAA Golf Tournament",
    subtitle: "Airport Authority Event",
    description: "Custom registration and admin dashboard for the annual Edward A.P. Muna II Memorial Golf Tournament, built for reuse year after year.",
    image: "/images/giaa-logo.png",
    imageStyle: "object-contain bg-gradient-to-b from-sky-50 to-blue-100 p-6",
    link: "https://giaa-tournament.com",
    icon: <Plane className="w-5 h-5" />,
    accentColor: "bg-blue-600",
    features: [
      "Online registration and payments",
      "Admin event dashboard",
      "Tournament day check-in workflows"
    ],
    tags: ["Events", "Stripe", "React"]
  },
  {
    title: "Hafa Recipes",
    subtitle: "AI Recipe Extraction",
    description: "iOS app and web presence using AI to turn cooking videos from TikTok, YouTube, and Instagram into organized recipes.",
    image: "/images/HafaRecipes-icon.png",
    imageStyle: "object-contain bg-slate-50 p-4",
    link: "https://hafa-recipes.com",
    appStoreLink: "https://apps.apple.com/us/app/recipe-extractor-gu/id6755892896",
    icon: <Utensils className="w-5 h-5" />,
    accentColor: "bg-orange-500",
    features: [
      "Video-to-recipe AI extraction",
      "Photo OCR for handwritten recipes",
      "Available on the iOS App Store"
    ],
    tags: ["iOS", "React Native", "AI/ML"]
  },
  {
    title: "Guahan Grocer",
    subtitle: "Grocery Delivery",
    description: "Guam's local grocery delivery platform connecting shoppers with stores across the island. Paused now, with a stronger relaunch path ahead.",
    image: "/images/Guahan-Grocer-Logo.png",
    imageStyle: "object-contain bg-[#f5f0e6] p-6",
    icon: <ShoppingCart className="w-5 h-5" />,
    accentColor: "bg-green-500",
    features: [
      "Multi-store grocery browsing",
      "Mobile customer and delivery workflows",
      "Built for Guam's local market"
    ],
    tags: ["Mobile", "React Native", "Rails"],
    isPaused: true
  }
];

export const projectGroups = [
  {
    title: "AI, Education & Local Culture",
    description: "Learning platforms, language tools, and student-friendly software built for Guam.",
    projects: projects.filter((project) => ["HafaGPT", "Hafa Code", "Hafa Recipes"].includes(project.title))
  },
  {
    title: "Business Operations",
    description: "Production systems that help local teams replace spreadsheets, paper workflows, and tools that were never designed for Guam.",
    projects: projects.filter((project) => ["Cornerstone Payroll", "AIRE Services", "Cornerstone Accounting"].includes(project.title))
  },
  {
    title: "Commerce & Ordering",
    description: "Ordering, retail, and marketplace-style applications for restaurants, stores, and local customers.",
    projects: projects.filter((project) => ["Hafaloha Orders", "Three Squares Grill", "Guahan Grocer"].includes(project.title))
  },
  {
    title: "Events & Sports",
    description: "Registration, operations, and live-event platforms for tournaments, charities, and major community events.",
    projects: projects.filter((project) => ["Golf for Wishes", "Marianas Open", "GIAA Golf Tournament"].includes(project.title))
  }
];


//
// INTERNAL TOOLS DATA
//
export const internalTools: InternalTool[] = [
  {
    title: "Invoice Maker",
    description: "AI-powered invoice generation. Describe what you need in plain English or paste timesheet screenshots — the AI extracts hours and creates professional invoices.",
    link: "https://invoice-maker-gu.netlify.app/chat",
    icon: <FileText className="w-5 h-5" />,
    accentColor: "bg-teal-500",
    features: [
      "Natural language invoice creation",
      "Vision AI extracts hours from screenshots",
      "Client templates and PDF generation"
    ],
    tags: ["AI/ML", "React", "FastAPI"]
  },
  {
    title: "Media Tools",
    description: "Video, audio, and PDF utilities for fast research workflows: transcripts, Whisper transcription, extraction, and AI summaries.",
    link: "https://media-tools-gu.netlify.app",
    icon: <FileText className="w-5 h-5" />,
    accentColor: "bg-rose-500",
    features: [
      "YouTube and Vimeo transcript extraction",
      "Whisper-powered audio transcription",
      "AI summaries for long-form media"
    ],
    tags: ["AI/ML", "Go", "React"]
  },
  {
    title: "Hafa Timezones",
    description: "Instantly convert times across multiple time zones and find overlapping business hours for meetings with teams around the world.",
    link: "https://hafa-timezones.com",
    icon: <Clock className="w-5 h-5" />,
    accentColor: "bg-purple-500",
    features: [
      "Multi-timezone conversion",
      "Meeting time finder",
      "Shareable URL state"
    ],
    tags: ["React", "TypeScript", "Luxon"]
  },
  {
    title: "Typr",
    description: "A local-first dictation app inspired by Superwhisper and Wispr Flow — fast voice-to-text for the way our team actually works.",
    image: "/images/typr-icon.png",
    icon: <Mic className="w-5 h-5" />,
    accentColor: "bg-slate-900",
    features: [
      "Local Whisper-powered dictation",
      "App-aware paste and replace workflows",
      "Built for developers and operators"
    ],
    tags: ["macOS", "Tauri", "Whisper"],
    isComingSoon: "Coming Soon"
  }
];

//
// SERVICES DATA
//
export const services: Service[] = [
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
export const techStack = [
  "React", "React Native", "TypeScript", "Ruby on Rails", "FastAPI",
  "Python", "PostgreSQL", "OpenAI", "Gemini", "Stripe",
  "Tailwind CSS", "EasyPost", "Pinecone"
];

//
// WORKFLOW STEPS
//
export const workflowSteps: WorkflowStep[] = [
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
