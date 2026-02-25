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
  Target,
  Clock,
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
  icon: React.ReactNode;
  accentColor: string;
  features: string[];
  tags: string[];
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
    description: "AI-powered platform for learning Chamorro, the indigenous language of Guam. Combines modern AI with traditional learning methods.",
    image: "/images/HafaGPT-icon1.png",
    imageStyle: "object-contain bg-[#f5f0e6] p-6",
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
    title: "Hafa Recipes",
    subtitle: "AI Recipe Extraction",
    description: "Mobile app using AI to transform cooking videos from TikTok, YouTube, and Instagram into organized recipes.",
    image: "/images/HafaRecipes-icon.png",
    imageStyle: "object-contain bg-slate-50 p-4",
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
    description: "Complete ordering, retail, and VIP platform for Hawaiian businesses. Features online ordering, concert VIP (850+ orders), retail merchandise with EasyPost shipping labels, customs forms, and real-time tracking.",
    image: hafalohaImage,
    imageStyle: "object-cover",
    link: "https://hafaloha-orders.com",
    icon: <ShoppingCart className="w-5 h-5" />,
    accentColor: "bg-cyan-500",
    features: [
      "Online ordering & concert VIP (850+ orders)",
      "EasyPost shipping with label printing & customs",
      "Real-time order tracking & admin dashboard"
    ],
    tags: ["E-commerce", "React", "Rails"],
    isFeatured: true
  },
  {
    title: "Three Squares Grill",
    subtitle: "Multi-Location Restaurant",
    description: "Full ordering system for a multi-location restaurant. Online ordering, POS terminal integration, admin dashboard, and wholesale management for B&G Pacific.",
    gradientBg: "from-emerald-500 to-emerald-700",
    icon: <Utensils className="w-5 h-5" />,
    accentColor: "bg-emerald-600",
    features: [
      "Multi-location online ordering",
      "POS terminal integration",
      "Wholesale & admin management"
    ],
    tags: ["E-commerce", "React", "Rails"],
    isNew: true,
    isComingSoon: "Coming March 2026"
  },
  {
    title: "Campaign Tracker",
    subtitle: "Election Management Platform",
    description: "Supporter tracking, quota management, and election day operations platform. Real-time dashboards for campaign teams with data import, auto-vetting, and war room views.",
    gradientBg: "from-indigo-500 to-indigo-700",
    icon: <Target className="w-5 h-5" />,
    accentColor: "bg-indigo-600",
    features: [
      "Supporter tracking & quota management",
      "Auto-vetting with voter roll matching",
      "Election day war room dashboard"
    ],
    tags: ["Data Platform", "React", "Rails"],
    isNew: true,
    link: "https://joshtina.support"
  },
  {
    title: "GIAA Golf Tournament",
    subtitle: "Airport Authority Event",
    description: "Custom registration and admin dashboard for the annual Edward A.P. Muna II Memorial Golf Tournament. Built for reuse year after year.",
    image: "/images/giaa-logo.png",
    imageStyle: "object-contain bg-gradient-to-b from-sky-50 to-blue-100 p-6",
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
    description: "Guam's local grocery delivery platform connecting shoppers with stores. Features multi-store browsing, real-time delivery tracking, and shopper management.",
    image: "/images/Guahan-Grocer-Logo.png",
    imageStyle: "object-contain bg-[#f5f0e6] p-6",
    appStoreLink: "https://apps.apple.com/us/app/guahan-grocer/id6749652653",
    icon: <ShoppingCart className="w-5 h-5" />,
    accentColor: "bg-green-500",
    features: [
      "Multi-store grocery browsing",
      "Real-time delivery tracking",
      "Shopper & driver management"
    ],
    tags: ["Mobile", "React Native", "Rails"],
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
  },
  {
    title: "Media Tools",
    description: "YouTube transcript extraction and AI-powered video summaries. Paste a URL, get a full transcript and AI summary instantly.",
    icon: <FileText className="w-5 h-5" />,
    accentColor: "bg-rose-500",
    features: [
      "YouTube transcript extraction",
      "AI-powered video summaries",
      "Coming soon to App Store"
    ],
    tags: ["AI/ML", "Go", "React"]
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
