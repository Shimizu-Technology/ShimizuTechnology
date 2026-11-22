export type CaseStudySlug =
  | 'cornerstone-payroll'
  | 'hafaloha-orders'
  | 'marianas-open';

export interface CaseStudyCapability {
  title: string;
  detail: string;
}

export interface CaseStudyAudience {
  title: string;
  detail: string;
}

export interface CaseStudyData {
  slug: CaseStudySlug;
  path: string;
  title: string;
  subtitle: string;
  category: string;
  status: 'Live' | 'Seasonal';
  headline: string;
  summary: string;
  liveUrl: string;
  liveUrlLabel: string;
  tags: string[];
  proofItems: ReadonlyArray<{ value: string; label: string }>;
  challenge: {
    heading: string;
    lead: string;
    points: string[];
  };
  whatWeBuilt: {
    heading: string;
    lead: string;
    capabilities: CaseStudyCapability[];
  };
  result: {
    heading: string;
    lead: string;
    outcomes: string[];
    boundaryNote?: string;
  };
  quote?: {
    text: string;
    attribution: string;
    context: string;
  };
  whoThisIsFor: {
    heading: string;
    lead: string;
    audiences: CaseStudyAudience[];
  };
  cta: {
    kicker: string;
    heading: string;
    body: string;
    primaryLabel: string;
  };
}

export interface WorkflowStepItem {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  stageLabel: string;
  summary: string;
  actor: string;
  systemRole: string;
  handoff: string;
  diagramNote: string;
}

export const payrollWorkflowSteps: readonly WorkflowStepItem[] = [
  {
    id: 'clock-in',
    number: '01',
    shortTitle: 'Staff clock in',
    title: 'Field and office staff record shifts',
    stageLabel: 'Time & attendance capture',
    summary:
      'Employees clock in and out from a workplace kiosk or location-aware mobile clock-in. Breaks, work categories, and schedule context are captured directly against each shift instead of paper sheets.',
    actor: 'Field & office staff',
    systemRole: 'Workforce time app (e.g. AIRE Services)',
    handoff: 'Timestamped shifts, breaks & work categories',
    diagramNote: 'Punches captured',
  },
  {
    id: 'approve',
    number: '02',
    shortTitle: 'Manager approves exceptions',
    title: 'Supervisors resolve exceptions and lock the cutoff',
    stageLabel: 'Review & immutable cutoff',
    summary:
      'Managers review missed punches, overtime, leave, and adjustments in one queue. Once verified, they finalize an immutable cutoff batch so payroll works from approved hours.',
    actor: 'Operations manager',
    systemRole: 'Exception review & cutoff batch',
    handoff: 'Approved, immutable pay-period batch',
    diagramNote: 'Batch approved',
  },
  {
    id: 'calculate',
    number: '03',
    shortTitle: 'Payroll calculates & commits',
    title: 'Accounting staff run calculations and review totals',
    stageLabel: 'Structured pay run',
    summary:
      'Approved hours flow into hourly, salary, deduction, and Guam tax calculations. Payroll operators review every employee line and summary total before approving and committing the run.',
    actor: 'Accounting & payroll staff',
    systemRole: 'Payroll workspace (e.g. Cornerstone Payroll)',
    handoff: 'Committed pay run & tax summaries',
    diagramNote: 'Run committed',
  },
  {
    id: 'archive',
    number: '04',
    shortTitle: 'Checks & records archived',
    title: 'Payment documents prepared with traceable history',
    stageLabel: 'Checks, stubs & audit trail',
    summary:
      'Paper checks and earnings statements are prepared separately from issued and paid status. Filing reports, payment evidence, and audit history stay linked back to the source entries.',
    actor: 'Accounting & employer office',
    systemRole: 'Checks, reporting & audit archive',
    handoff: 'Check packages, pay stubs & retained records',
    diagramNote: 'Records archived',
  },
] as const;

export const caseStudies: Record<CaseStudySlug, CaseStudyData> = {
  'cornerstone-payroll': {
    slug: 'cornerstone-payroll',
    path: '/work/cornerstone-payroll/',
    title: 'Cornerstone Payroll',
    subtitle: 'Guam Payroll & Firm Operations',
    category: 'Business software',
    status: 'Live',
    headline: 'Making Guam payroll repeatable for the staff who run it.',
    summary:
      'A production payroll and firm-operations platform built with Cornerstone Accounting, bringing employee setup, Guam tax calculations, approvals, check preparation, and audit history into one clear sequence.',
    liveUrl: 'https://payroll.shimizu-technology.com',
    liveUrlLabel: 'Visit Cornerstone Payroll',
    tags: ['Guam Payroll', 'Firm Operations', 'React', 'Ruby on Rails'],
    proofItems: [
      { value: 'In production', label: 'Main payroll system at Cornerstone Accounting' },
      { value: 'Multi-employer', label: 'Company switching, roles & audit trail' },
      { value: 'Guam rules', label: 'Tax summaries, checks & filing preparation' },
    ],
    challenge: {
      heading: 'Generic payroll tools leave Guam accounting staff patching around the rules.',
      lead: 'Running payroll for multiple local employers means handling hourly and salary schedules, tips, deductions, contractor strategies, check runs, and Guam filing preparation—without losing track of what was reviewed or issued.',
      points: [
        'Accounting staff need a clear, repeatable sequence from intake through calculation, review, approval, and commitment rather than scattered spreadsheets.',
        'Preparing a check or a filing document is operationally different from issuing a payment or completing a filing—mixing those states creates costly reconciliation mistakes.',
        'Multi-employer firms need role controls, effective-dated pay rules, year-to-date tracking, and a dependable audit history across every client company.',
      ],
    },
    whatWeBuilt: {
      heading: 'One connected payroll workspace built around how operators work.',
      lead: 'Instead of trying to replace a full accounting suite, we focused the software on making complex Guam payroll clear, reviewable, and auditable from start to finish.',
      capabilities: [
        {
          title: 'Multi-employer setup & pay rules',
          detail:
            'Company switching, employee and pay setup, hourly and salary calculations, contractor strategies, tips, adjustments, deductions, retirement/loans, and effective-dated rules with YTD tracking.',
        },
        {
          title: 'Step-by-step pay run controls',
          detail:
            'Intake and imports move cleanly through calculate, review, approve, and commit checkpoints so staff can inspect totals and individual lines before locking a period.',
        },
        {
          title: 'Checks, pay stubs & replacements',
          detail:
            'Check printing with replacements and voids, earnings statements, and explicit separation between prepared documents and confirmed issued or paid status.',
        },
        {
          title: 'Tax summaries, roles & audit history',
          detail:
            'Guam tax summaries, filing preparation reports, role-based access controls, and durable activity logs that preserve who changed or approved each step.',
        },
      ],
    },
    result: {
      heading: 'A live production system used for regular Guam payroll.',
      lead: 'Cornerstone Accounting uses Cornerstone Payroll as its main payroll system instead of QuickBooks for payroll processing.',
      outcomes: [
        'Complex multi-employer payroll follows a consistent operator flow from hours intake through committed runs and archived reports.',
        'Staff review calculations and exception flags before committing pay runs or preparing check packages.',
        'Paired alongside operational workforce tools like AIRE Services—which handles live employee clock-in/clock-out and attendance approvals in Guam—the architecture demonstrates how separate daily tools can connect cleanly to payroll.',
      ],
      boundaryNote:
        'Scope note: Cornerstone Payroll is focused on payroll and firm payroll operations. It is intentionally separate from a full general ledger, AP/AR, bank reconciliation, or financial-statements platform.',
    },
    whoThisIsFor: {
      heading: 'Built for Guam accounting firms and operational teams.',
      lead: 'If your office runs multi-client payroll or loses hours re-keying time sheets between disconnected systems, we can map a practical next step.',
      audiences: [
        {
          title: 'Accounting & bookkeeping firms',
          detail:
            'Firms running regular payroll across multiple Guam employers that want clearer review checkpoints, check preparation, and audit history.',
        },
        {
          title: 'Field & shift-based employers',
          detail:
            'Service, hospitality, and operations teams that want employee time tracking and manager approvals to feed cleanly into payroll without manual re-entry.',
        },
        {
          title: 'Owners outgrowing spreadsheets',
          detail:
            'Teams whose existing off-the-shelf software forces awkward workarounds around local tax, approval, or reporting routines.',
        },
      ],
    },
    cta: {
      kicker: 'Talk about operations & payroll',
      heading: 'Want to connect your workflow or simplify payroll?',
      body: 'Start with a 20–30-minute conversation about how your team tracks time, approves work, or runs payroll today. If there is a useful next step, you receive a clear proposal before any work begins.',
      primaryLabel: 'Start a conversation',
    },
  },

  'hafaloha-orders': {
    slug: 'hafaloha-orders',
    path: '/work/hafaloha-orders/',
    title: 'Hafaloha Orders',
    subtitle: 'Online Ordering & Event Fulfillment',
    category: 'Commerce & fulfillment',
    status: 'Seasonal',
    headline: '850+ concert VIP orders fulfilled with zero event-day downtime.',
    summary:
      'A custom online ordering, retail, and event fulfillment platform built for Guam brand Hafaloha—connecting customer purchases directly to inventory, payments, shipping labels, and staff administration.',
    liveUrl: 'https://hafaloha-orders.com',
    liveUrlLabel: 'Visit Hafaloha Orders',
    tags: ['E-commerce', 'Event Fulfillment', 'EasyPost', 'React', 'Ruby on Rails'],
    proofItems: [
      { value: '850+', label: 'VIP orders processed for the June 2026 concert' },
      { value: '100%', label: 'Fulfillment completed' },
      { value: 'Zero', label: 'Event-day downtime' },
    ],
    challenge: {
      heading: 'High-volume concert VIP drops leave no margin for lost orders or slow checkouts.',
      lead: 'When hundreds of guests order ahead for a live concert or seasonal launch, customer checkout is only half the job. Staff still have to manage inventory, VIP access, shipping, pickup queues, and order status in real time.',
      points: [
        'Handle concentrated bursts of VIP concert ordering without checkout slowdowns or missed entries.',
        'Keep menu and merchandise inventory, payments, refunds, and staff administration synchronized in one place.',
        'Give staff clear fulfillment tools on event day so every customer order is tracked through completion.',
      ],
    },
    whatWeBuilt: {
      heading: 'Customer ordering tied directly to inventory, shipping, and staff operations.',
      lead: 'We built Hafaloha Orders as a dedicated ordering and fulfillment suite designed for both mobile guests and busy back-of-house operators.',
      capabilities: [
        {
          title: 'Mobile-first storefront & VIP ordering',
          detail:
            'Fast menu and merchandise browsing, cart and checkout, reservations, VIP access flows, and staff or house account support.',
        },
        {
          title: 'Payments, refunds & order tracking',
          detail:
            'Integrated payment handling, refund support, automated customer notifications, and real-time order status visibility.',
        },
        {
          title: 'EasyPost shipping & customs labels',
          detail:
            'Built-in EasyPost integration for shipping labels and customs documentation when orders ship beyond local pickup.',
        },
        {
          title: 'Staff admin dashboard & reporting',
          detail:
            'Operational views for tracking incoming orders, managing fulfillment, reviewing reports, and keeping event-day handoffs organized.',
        },
      ],
    },
    result: {
      heading: 'Proven under real event-day volume.',
      lead: 'Hafaloha ran its June 2026 concert VIP ordering and fulfillment on the platform without downtime or fulfillment gaps.',
      outcomes: [
        '850+ VIP orders processed cleanly through the custom ordering experience.',
        '100% fulfillment completed using the connected admin and tracking workflows.',
        'Zero event-day downtime during live concert operations.',
      ],
    },
    quote: {
      text: 'It was incredible seeing what was only a discussion of an idea come to life. The online ordering option is a valuable perk and adds to the VIP experience.',
      attribution: 'Hafaloha',
      context: 'Owner feedback after the concert launch',
    },
    whoThisIsFor: {
      heading: 'Built for local brands that run drops, pre-orders, or busy event days.',
      lead: 'When generic storefront templates fight your pickup schedule, VIP perks, or back-of-house workflow, custom ordering software pays off fast.',
      audiences: [
        {
          title: 'Restaurants & food brands',
          detail:
            'Guam food and beverage operators managing pre-orders, seasonal menus, catering, or event-day pickup windows.',
        },
        {
          title: 'Concert & festival organizers',
          detail:
            'Event teams offering VIP packages, merchandise pre-sales, or timed fulfillment where downtime hurts the guest experience.',
        },
        {
          title: 'Local retail & shipping teams',
          detail:
            'Businesses that need checkout connected cleanly to inventory counts, staff queues, notifications, and shipping labels.',
        },
      ],
    },
    cta: {
      kicker: 'Plan a dependable launch',
      heading: 'Need ordering or event fulfillment that holds up under load?',
      body: 'Tell us what you are launching or where manual order tracking slows your team down. We start with a 20–30-minute call and follow up with a clear, scoped proposal.',
      primaryLabel: 'Start a conversation',
    },
  },

  'marianas-open': {
    slug: 'marianas-open',
    path: '/work/marianas-open/',
    title: 'Marianas Open',
    subtitle: 'International BJJ Tournament Platform',
    category: 'Multilingual public platform',
    status: 'Live',
    headline: 'One multilingual platform for an international tournament series.',
    summary:
      'A live 7-language web platform and administrative workflow built for Marianas Open—helping competitors, academies, and fans across Guam and the Asia-Pacific region find events, rules, streams, and official rankings.',
    liveUrl: 'https://marianasopen.com',
    liveUrlLabel: 'Visit Marianas Open',
    tags: ['Multilingual', 'Events & Sports', 'Admin Tooling', 'React', 'Ruby on Rails'],
    proofItems: [
      { value: '7 languages', label: 'EN, JA, KO, FIL, ZH-CN, ZH-TW & PT live' },
      { value: 'Asia-Pacific', label: 'Guam, Japan, Korea, Philippines, Taiwan & Hong Kong' },
      { value: 'Live rankings', label: 'Filterable official ASJJF Marianas Pro standings' },
    ],
    challenge: {
      heading: 'Serving international competitors across seven languages and multiple countries.',
      lead: 'Marianas Open hosts championship and Pro Series events across Guam, Japan, South Korea, the Philippines, Taiwan, and Hong Kong. Competitors, coaches, and fans need accurate dates, rules, registration links, streams, and standings—without staff rebuilding pages by hand every season.',
      points: [
        'Athletes and academies travel from across the Pacific and need tournament details in their own language.',
        'Each season brings multiple venues, Gi and No-Gi registration paths, schedules, rules guides, and past-event archives.',
        'Behind the public site, organizers need repeatable admin tools for importing results, refreshing translations, managing galleries, and updating sponsors.',
      ],
    },
    whatWeBuilt: {
      heading: 'A fast public tournament experience backed by practical event operations.',
      lead: 'We paired a crisp, mobile-ready public site with administrative workflows built specifically for recurring international tournaments.',
      capabilities: [
        {
          title: '7-language public experience',
          detail:
            'Built-in language switching across English, Japanese, Korean, Filipino, Simplified Chinese, Traditional Chinese, and Portuguese, paired with admin translation refresh tools.',
        },
        {
          title: 'Multi-country event calendar & archive',
          detail:
            'Upcoming Pro Series calendar with venue details and Gi/No-Gi registration links, alongside structured past-event pages spanning multiple seasons.',
        },
        {
          title: 'Filterable ASJJF Marianas Pro rankings',
          detail:
            'Synced standings filterable by season, discipline (Gi and No-Gi), individual or team ranking, and division categories.',
        },
        {
          title: 'Organizer admin tooling',
          detail:
            'Reusable event setup, results preview and import, competition rules guides, live-stream watch links, gallery/media management, sponsors, and accommodation offers.',
        },
      ],
    },
    result: {
      heading: 'A live international hub built for repeat seasons.',
      lead: 'Marianas Open operates a single public platform for competitors, academies, sponsors, and fans across Guam and the wider Asia-Pacific tournament circuit.',
      outcomes: [
        'Public calendar and past-event archives cover multi-year tournament series across Guam, Japan, South Korea, the Philippines, Taiwan, and Hong Kong.',
        'Competitors and coaches can switch across 7 languages and filter official ASJJF Marianas Pro rankings from any desktop or phone.',
        'Organizers update recurring events, results, galleries, and sponsor information through dedicated admin workflows rather than static edits.',
      ],
      boundaryNote:
        'Development note: Integrated merchandise ordering and fulfillment for Marianas Open is currently in staging and preview development, separate from the live tournament site.',
    },
    whoThisIsFor: {
      heading: 'Built for organizations whose public website has to power real recurring operations.',
      lead: 'When your site needs to inform international audiences while giving your team clean tools to publish updates quickly, a custom platform beats brittle templates.',
      audiences: [
        {
          title: 'Tournament & event organizers',
          detail:
            'Sports leagues, annual conferences, and multi-stop series that publish recurring schedules, rules, sponsors, and results.',
        },
        {
          title: 'Tourism, hospitality & regional brands',
          detail:
            'Guam organizations serving visitors from Japan, Korea, Taiwan, the Philippines, and beyond that need dependable multilingual publishing.',
        },
        {
          title: 'Associations & community hubs',
          detail:
            'Teams tired of fighting static page builders whenever dates, venues, directories, or announcements change.',
        },
      ],
    },
    cta: {
      kicker: 'Talk about your platform',
      heading: 'Need a public site backed by cleaner team workflows?',
      body: 'Tell us what your audience needs to find and what your staff spends too long updating manually. We start with a short 20–30-minute conversation.',
      primaryLabel: 'Start a conversation',
    },
  },
};

export const caseStudyOrder: readonly CaseStudySlug[] = [
  'cornerstone-payroll',
  'hafaloha-orders',
  'marianas-open',
] as const;

export function resolveCaseStudySlug(pathname: string, datasetSlug?: string): CaseStudySlug {
  if (
    datasetSlug === 'cornerstone-payroll' ||
    datasetSlug === 'hafaloha-orders' ||
    datasetSlug === 'marianas-open'
  ) {
    return datasetSlug;
  }
  const normalized = pathname.replace(/\/+$/, '');
  if (normalized.endsWith('/hafaloha-orders')) return 'hafaloha-orders';
  if (normalized.endsWith('/marianas-open')) return 'marianas-open';
  return 'cornerstone-payroll';
}
