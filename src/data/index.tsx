import React from 'react';
import {
  Languages,
  Utensils,
  ShoppingCart,
  Plane,
  BookOpen,
  Brain,
  GraduationCap,
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
  ShieldCheck,
  Ticket,
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
  isFeatured?: boolean;
  selectedOrder?: number;
  isComingSoon?: string;
  status?: "Live" | "Live pilot" | "Live demo" | "Seasonal" | "In development" | "Private deployment" | "Paused";
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
    image: "/images/hafagpt-icon.webp",
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
    isFeatured: true,
    status: "Live"
  },
  {
    title: "Hafa Code",
    subtitle: "Lightweight Coding Playground",
    description: "A simple Replit alternative for Code School of Guam, FD students, alumni, and anyone learning to code — fast, approachable, and distraction-free.",
    image: "/images/hafa-code-logo.png",
    imageStyle: "object-contain bg-[#f8efe0] p-6",
    link: "https://hafa-code.netlify.app",
    icon: <Code2 className="w-5 h-5" />,
    accentColor: "bg-sky-600",
    features: [
      "Ruby, JavaScript, and HTML/CSS/JS in-browser",
      "Private local projects with optional cloud sync",
      "Share links and checkpoints for students"
    ],
    tags: ["Education", "TypeScript", "WASM"],
    isFeatured: true,
    status: "Live"
  },
  {
    title: "CSG Learning Hub",
    subtitle: "Code School Learning Platform",
    description: "The private learning platform behind Code School of Guam: prework, class content, workshops, recordings, grading, progress tracking, and cohort management.",
    image: "/images/csg-logo.png",
    imageStyle: "object-contain bg-slate-950 p-8",
    link: "https://learn.codeschoolofguam.com",
    icon: <GraduationCap className="w-5 h-5" />,
    accentColor: "bg-red-600",
    features: [
      "Lessons, exercises, recordings, and workshops",
      "Student progress and instructor workflows",
      "Real production platform powering the school"
    ],
    tags: ["Education", "React", "Rails"],
    isFeatured: true,
    selectedOrder: 2,
    status: "Live"
  },
  {
    title: "Cornerstone Payroll",
    subtitle: "Live Guam Payroll & Firm Operations",
    description: "A production payroll and firm-operations system used by Cornerstone Accounting, translating Guam tax and filing rules into dependable calculations and audited workflows.",
    image: "/images/cornerstone-payroll-cp.svg",
    imageStyle: "object-contain bg-blue-50 p-8",
    link: "https://cornerstone-payroll.netlify.app",
    icon: <BookOpen className="w-5 h-5" />,
    accentColor: "bg-amber-700",
    features: [
      "Guam payroll calculations, adjustments, approvals, and commits",
      "Check printing, pay stubs, tax summaries, and filing support",
      "Company switching, role controls, and audit history"
    ],
    tags: ["Payroll", "React", "Rails"],
    isFeatured: true,
    selectedOrder: 1,
    status: "Live"
  },
  {
    title: "Civic Engagement & Campaign Operations",
    subtitle: "Private Organizational Operations",
    description: "A family of separately deployed, role-based outreach and field-operations systems used by political organizations in Guam — presented without party or candidate branding.",
    gradientBg: "from-slate-900 via-indigo-950 to-blue-950",
    icon: <ShieldCheck className="w-5 h-5" />,
    accentColor: "bg-indigo-700",
    features: [
      "Contact, household, and public voter-file workflows",
      "Governed outreach, assignments, follow-up, and reporting",
      "Role-based access, audit trails, and election-day operations"
    ],
    tags: ["Civic Tech", "Operations", "Rails", "React"],
    isFeatured: true,
    selectedOrder: 3,
    status: "Private deployment"
  },
  {
    title: "Golf for Wishes",
    subtitle: "Make-A-Wish Event Platform",
    description: "Registration and event management platform for Make-A-Wish Guam & CNMI, supporting charity events from signup through tournament day.",
    image: "/images/make-a-wish-logo-blue.png",
    imageStyle: "object-contain bg-[#0057b8]",
    link: "https://golfforwishes.com",
    icon: <HeartHandshake className="w-5 h-5" />,
    accentColor: "bg-blue-600",
    features: [
      "Team registration and payments",
      "Sponsor and raffle management",
      "Admin tools for event-day operations"
    ],
    tags: ["Events", "Stripe", "React"],
    isFeatured: true,
    status: "Seasonal"
  },
  {
    title: "Marianas Open",
    subtitle: "International BJJ Tournament Platform",
    description: "Live multilingual platform for the Marianas Open, serving competitors and fans across Guam, Korea, Japan, and beyond with 3,000+ monthly visitors.",
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
    isFeatured: true,
    selectedOrder: 4,
    status: "Live"
  },
  {
    title: "AIRE Services",
    subtitle: "Live Operations Platform",
    description: "A production operations system for AIRE Services Guam, already used by employees for clock-in/clock-out and daily business workflows.",
    image: "/images/aire-logo.png",
    imageStyle: "object-contain bg-slate-50 p-8",
    link: "https://aire-services-guam.netlify.app",
    icon: <Clock className="w-5 h-5" />,
    accentColor: "bg-cyan-700",
    features: [
      "Employee time clock and attendance",
      "Operations dashboards and approvals",
      "Payroll-oriented summaries and exports"
    ],
    tags: ["Operations", "React", "Rails"],
    status: "Live"
  },
  {
    title: "Hafaloha Orders",
    subtitle: "Online Ordering & VIP",
    description: "Active ordering, retail, and VIP platform for Hawaiian businesses, still used for concert sales and fulfillment — including Hafaloha's June 2026 event.",
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
    isFeatured: true,
    status: "Live"
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
    tags: ["Business", "React", "Rails"],
    status: "Live"
  },
  {
    title: "Three Squares Grill",
    subtitle: "Restaurant & Catering Ordering",
    description: "Modern ordering platform for Three Squares and B&G Pacific, designed for catering, dine-in/takeout, and repeat restaurant workflows.",
    image: "/images/three-squares-grill.svg",
    imageStyle: "object-contain bg-slate-50 p-8",
    link: "https://three-squares-web.netlify.app",
    icon: <Utensils className="w-5 h-5" />,
    accentColor: "bg-emerald-600",
    features: [
      "Catering and bulk ordering flows",
      "Admin dashboard and order management",
      "Built for multi-location restaurant operations"
    ],
    tags: ["Restaurant", "React", "Rails"],
    status: "In development"
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
    tags: ["Events", "Stripe", "React"],
    status: "Seasonal"
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
    tags: ["iOS", "React Native", "AI/ML"],
    status: "Live"
  },
  {
    title: "Household CFO",
    subtitle: "AI Financial Workspace",
    description: "A live financial workspace preparing for its first guided cohort, combining household setup, planning tools, deterministic calculations, and an AI assistant.",
    gradientBg: "from-emerald-700 via-teal-700 to-slate-900",
    link: "https://householdcfomethod.com",
    icon: <Brain className="w-5 h-5" />,
    accentColor: "bg-emerald-700",
    features: [
      "Authenticated participant and cohort workspaces",
      "Deterministic budget, wealth, runway, and decision tools",
      "AI guidance grounded in each household's saved context"
    ],
    tags: ["FinTech", "AI/ML", "React"],
    isFeatured: true,
    status: "Live pilot"
  },
  {
    title: "Hafa Homes",
    subtitle: "Guam Property Platform",
    description: "A live Guam-first real-estate proof of concept used by its partners to demonstrate the product to investors and brokerages.",
    gradientBg: "from-emerald-800 via-green-800 to-slate-950",
    link: "https://hafahomes.com",
    icon: <Globe2 className="w-5 h-5" />,
    accentColor: "bg-emerald-800",
    features: [
      "Property and neighborhood discovery",
      "Investor- and brokerage-ready live product demo",
      "Designed around Guam's housing market"
    ],
    tags: ["Real Estate", "React", "Rails"],
    status: "Live demo"
  },
  {
    title: "TraceBuddy",
    subtitle: "Camera-Assisted Drawing Practice",
    description: "A live mobile-friendly drawing tool created from a real family need, now used by its intended first user to trace references onto paper with a device camera.",
    gradientBg: "from-amber-100 via-orange-100 to-stone-200",
    link: "https://tracebuddy-gu.netlify.app",
    icon: <Smartphone className="w-5 h-5" />,
    accentColor: "bg-orange-600",
    features: [
      "Live camera reference overlays",
      "Touch-friendly alignment controls",
      "Works without accounts or complex setup"
    ],
    tags: ["Creative", "Mobile Web", "React"],
    status: "Live"
  },
  {
    title: "JMI Dispatch",
    subtitle: "Field Service Scheduling",
    description: "A dispatch and scheduling workspace for field-service teams, designed to make daily assignments, recurring work, and operational visibility easier.",
    gradientBg: "from-blue-900 via-indigo-900 to-slate-950",
    link: "https://jmi-dispatch.netlify.app",
    icon: <Settings className="w-5 h-5" />,
    accentColor: "bg-indigo-700",
    features: [
      "Dispatcher-friendly schedule planning",
      "Recurring and preventive work tracking",
      "Role-based operational dashboards"
    ],
    tags: ["Operations", "React", "Rails"],
    status: "In development"
  },
  {
    title: "FD Alumni Hub",
    subtitle: "Alumni Tournament & Community Hub",
    description: "A central alumni basketball hub for schedules, standings, watch and ticket links, news, sponsors, and future community engagement workflows.",
    gradientBg: "from-red-950 via-rose-950 to-slate-950",
    icon: <GraduationCap className="w-5 h-5" />,
    accentColor: "bg-red-800",
    features: [
      "Schedule, standings, news, and sponsor content",
      "Partner ticketing, streaming, and coverage links",
      "Expandable alumni and community foundation"
    ],
    tags: ["Alumni", "Community", "React", "Rails"],
    status: "In development"
  },
  {
    title: "HafaPass",
    subtitle: "Guam Hospitality Ticketing",
    description: "A Guam-first event and hospitality ticketing platform for event creation, online sales, QR tickets, and attendee check-in.",
    gradientBg: "from-violet-800 via-purple-900 to-slate-950",
    icon: <Ticket className="w-5 h-5" />,
    accentColor: "bg-violet-700",
    features: [
      "Event setup and online ticket sales",
      "QR ticket generation and mobile check-in",
      "Venue, organizer, payment, and admin workflows"
    ],
    tags: ["Ticketing", "Payments", "React", "Rails"],
    status: "In development"
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
    status: "Paused"
  }
];

export const projectGroups = [
  {
    title: "AI, Education & Local Culture",
    description: "Learning platforms, language tools, and student-friendly software built for Guam.",
    projects: projects.filter((project) => ["HafaGPT", "Hafa Code", "CSG Learning Hub", "Hafa Recipes", "TraceBuddy"].includes(project.title))
  },
  {
    title: "Business Operations & Finance",
    description: "Production systems that help local teams replace spreadsheets, paper workflows, and tools that were never designed for Guam.",
    projects: projects.filter((project) => ["Cornerstone Payroll", "AIRE Services", "Cornerstone Accounting", "Household CFO", "JMI Dispatch"].includes(project.title))
  },
  {
    title: "Commerce, Payments & Ordering",
    description: "Ordering, retail, marketplace, and financial-decision applications for businesses, partners, and local customers.",
    projects: projects.filter((project) => ["Hafaloha Orders", "Three Squares Grill", "Guahan Grocer", "Hafa Homes"].includes(project.title))
  },
  {
    title: "Civic, Membership & Community Systems",
    description: "Role-aware engagement, ticketing, alumni, and community platforms with clear operational boundaries.",
    projects: projects.filter((project) => ["Civic Engagement & Campaign Operations", "FD Alumni Hub", "HafaPass"].includes(project.title))
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
