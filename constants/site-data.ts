// ─────────────────────────────────────────────────────────────────────────────
// TECHNOVA — SINGLE SOURCE OF TRUTH
// Every text string, label, link, and data object lives here.
// NO hardcoded strings are allowed in components.
// ─────────────────────────────────────────────────────────────────────────────

// ── Type Definitions ──────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface CompetitionEvent {
  id: string;
  title: string;
  description: string;
  teamSize: string;
  prizePool: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rules: string[];
  tags: string[];
}

export interface CompetitionCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
  events: CompetitionEvent[];
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  avatarUrl: string;
  linkedin?: string;
  github?: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface Theme {
  id: string;
  label: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  year: string;
  caption?: string;
}

// ── Meta ──────────────────────────────────────────────────────────────────────

// ── Hero Background Images ────────────────────────────────────────────────────
// Slideshow cycles through these in order. Add/remove/reorder freely.
// ── Org logos shown in hero presenter row ────────────────────────────────────
export const PRESENTER_LOGOS = [
  { src: '/logo-ieee.png',  alt: 'IEEE IoBM Student Branch' },
  { src: '/logo-ccsis.png', alt: 'College of Computer Science & Information Systems' },
  { src: '/logo-iobm.png',  alt: 'Institute of Business Management' },
] as const;

export const HERO_BG_IMAGES = [
  {
    src:            '/technova-25.jpg',
    alt:            'TechNova 2025 closing ceremony group photo',
    mobilePosition: 'center top',
  },
  {
    src:            '/iobm-2.webp',
    alt:            'IoBM students on campus',
    mobilePosition: 'center 30%',
  },
] as const;

export const META = {
  siteName: 'TechNova',
  siteNameShort: 'TechNova',
  tagline: 'Ignite. Innovate. Dominate.',
  description:
    'The premier university hackathon. 48 hours to build, compete, and redefine what is possible.',
  eventDate: '2026-03-15T09:00:00',
  eventEndDate: '2026-03-17T18:00:00',
  countdownTarget: '2026-06-01T09:00:00',
  university: 'IoBM',
  universityFull: 'Institute of Business Management',
  edition: '3rd Edition',
  year: '2026',
  logoPath: '/technova-logo.png',
} as const;

// ── Themes ────────────────────────────────────────────────────────────────────

export const THEMES: Theme[] = [
  {
    id: 'fusion-dark',
    label: 'Fusion Dark',
    description: 'Electric indigo — faculty palette',
  },
  {
    id: 'plasma-rift',
    label: 'Plasma Rift',
    description: 'Cyan neon on deep black',
  },
  {
    id: 'solar-flare',
    label: 'Nova Burst',
    description: 'Electric violet + deep purple',
  },
  {
    id: 'obsidian-pearl',
    label: 'Royal Void',
    description: 'Rich indigo-cobalt precision',
  },
  {
    id: 'arctic-signal',
    label: 'Arctic Signal',
    description: 'Cold silver-blue precision',
  },
];

export const DEFAULT_THEME = 'fusion-dark';

// ── Navbar ────────────────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: 'About',       href: '#about'      },
  { label: 'Prizes',      href: '#prize-pool' },
  { label: 'Gallery',     href: '#gallery'    },
  { label: 'Competitions',href: '#competitions'},
  { label: 'Sponsors',    href: '#sponsors'   },
  { label: 'Team',        href: '#team'       },
  { label: 'Venue',       href: '#location'   },
];

export const NAV_CTA: NavLink = {
  label: 'Register Now',
  href: '/register',
};

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HERO = {
  presentsText: 'PRESENTS',
  headline: META.siteName,
  subheadline: META.tagline,
  body: META.description,
  ctaPrimary: { label: 'Explore Competitions', href: '#competitions' },
  ctaSecondary: { label: 'Learn More', href: '#about' },
  countdownLabel: 'Registration Closes In',
  countdownTarget: META.countdownTarget,
  badge: META.edition, // kept for data, not shown in hero
  // Stats moved to About section — hero shows countdown only
} as const;

// ── About ─────────────────────────────────────────────────────────────────────

export const ABOUT = {
  eyebrow: 'What is TechNova?',
  heading: 'Where Code Meets Creativity',
  body: [
    "TechNova is IoBM's flagship annual hackathon — a 48-hour convergence of the brightest student minds from across Pakistan. It's not just a competition; it's a launchpad.",
    "Whether you're a seasoned developer, a UI/UX visionary, or a business strategist, TechNova has a stage for you. Compete, collaborate, and connect with industry leaders who are actively looking for the next generation of talent.",
    "Backed by the Institute of Business Management, TechNova represents IoBM's commitment to bridging academia with the real world of technology and innovation.",
  ],
  stats: [
    { value: '500+',  label: 'Participants'       },
    { value: '48hrs', label: 'Non-stop Innovation' },
    { value: '12+',   label: 'Competitions'        },
    { value: '20+',   label: 'Industry Mentors'    },
    { value: '15+',   label: 'Sponsoring Companies'},
    { value: '3rd',   label: 'Annual Edition'      },
  ] satisfies Stat[],
  highlights: [
    {
      icon: 'Zap',
      title: 'Real Challenges',
      body: 'Problems sourced directly from industry partners — no toy problems.',
    },
    {
      icon: 'Users',
      title: 'Expert Mentorship',
      body: 'Direct access to senior engineers and entrepreneurs throughout the event.',
    },
    {
      icon: 'Trophy',
      title: 'Meaningful Prizes',
      body: 'Cash awards, internship offers, and incubation opportunities.',
    },
    {
      icon: 'Globe',
      title: 'Network Effect',
      body: 'Build connections that outlast the 48 hours.',
    },
  ],
} as const;

// ── Gallery ───────────────────────────────────────────────────────────────────

export const GALLERY = {
  eyebrow: 'Relive The Energy',
  heading: 'Past TechNovas',
  subheading: 'Two editions. Hundreds of builders. Unforgettable moments.',
  // ─── ADD YOUR IMAGES HERE ───────────────────────────────────────────────────
  // Drop images into public/gallery/ then add entries below.
  // src format: '/gallery/your-image-name.jpg'
  // ────────────────────────────────────────────────────────────────────────────
  images: [
    {
      id: 'g-placeholder-1',
      src: '/technova-25.jpg',
      alt: "TechNova '25 — Closing Ceremony",
      year: "TechNova '25",
      caption: 'Closing Ceremony',
    },
    {
      id: 'g-placeholder-2',
      src: '',
      alt: 'TechNova 2024 — Hacking in progress',
      year: "TechNova '24",
      caption: 'The Build Phase',
    },
    {
      id: 'g-placeholder-3',
      src: '',
      alt: 'TechNova 2024 — Winners announced',
      year: "TechNova '24",
      caption: 'Champions Crowned',
    },
    {
      id: 'g-placeholder-4',
      src: '',
      alt: 'TechNova 2025 — Keynote speaker',
      year: "TechNova '25",
      caption: 'Keynote Address',
    },
    {
      id: 'g-placeholder-5',
      src: '',
      alt: 'TechNova 2025 — Team collaboration',
      year: "TechNova '25",
      caption: 'Teams at Work',
    },
    {
      id: 'g-placeholder-6',
      src: '',
      alt: 'TechNova 2025 — Prize ceremony',
      year: "TechNova '25",
      caption: 'Prize Ceremony',
    },
    {
      id: 'g-placeholder-7',
      src: '',
      alt: 'TechNova 2025 — Networking session',
      year: "TechNova '25",
      caption: 'Networking & Connect',
    },
    {
      id: 'g-placeholder-8',
      src: '',
      alt: 'TechNova 2025 — Demo day',
      year: "TechNova '25",
      caption: 'Demo Day',
    },
  ] satisfies GalleryImage[],
} as const;

// ── Prize Pool ───────────────────────────────────────────────────────────────

export const PRIZE_POOL = {
  eyebrow: 'Compete & Win',
  heading: 'Total Prize Pool',
  amount: 'Rs. 3,00,000+',
  subtext: 'Across all competitions and categories',
  note: 'Winners also receive internship referrals, mentorship sessions, and certificates of excellence.',
  highlight: [
    { label: 'Cash Prizes',          value: 'PKR 3,00,000+' },
    { label: 'Competitions',         value: '12+'           },
    { label: 'Winning Teams',        value: '20+'           },
  ],
} as const;

// ── Competitions ──────────────────────────────────────────────────────────────

export const COMPETITIONS = {
  eyebrow: 'Compete & Conquer',
  heading: 'Find Your Arena',
  subheading:
    'Six battlegrounds. One championship. Pick your discipline and go all in.',
  categories: [
    {
      id: 'coding',
      label: 'Coding',
      icon: 'Code2',
      description: 'Algorithmic challenges and full-stack development sprints.',
      events: [
        {
          id: 'coding-dsa',
          title: 'DSA Throwdown',
          description:
            'A high-intensity algorithmic problem-solving contest. Solve increasingly complex data structure and algorithm problems under strict time pressure.',
          teamSize: '1–2 members',
          prizePool: 'PKR 30,000',
          difficulty: 'Advanced',
          rules: [
            'Problems range from Easy to Expert difficulty',
            'Language: C++, Java, or Python only',
            'No external libraries beyond standard library',
            'Ranking by problems solved, then by time penalty',
          ],
          tags: ['Algorithms', 'Data Structures', 'Competitive'],
        },
        {
          id: 'coding-hackathon',
          title: '48-Hour Build Sprint',
          description:
            'The flagship event. Build a functional product from scratch in 48 hours. Judged on innovation, technical complexity, and live demo quality.',
          teamSize: '2–4 members',
          prizePool: 'PKR 60,000',
          difficulty: 'Intermediate',
          rules: [
            'Theme announced at event kickoff',
            'Must use at least one sponsor API or tool',
            'Final submission must include a 3-minute demo video',
            'Open stack — any language, framework, or platform',
          ],
          tags: ['Full-Stack', 'Product', 'Innovation'],
        },
      ],
    },
    {
      id: 'design',
      label: 'Design',
      icon: 'Figma',
      description: 'UI/UX challenges for the creatives who think in pixels.',
      events: [
        {
          id: 'design-ux',
          title: 'UX Design Sprint',
          description:
            'Given a real product brief from a sponsor company, design a complete user experience solution — from research and wireframes to a high-fidelity prototype.',
          teamSize: '1–3 members',
          prizePool: 'PKR 25,000',
          difficulty: 'Intermediate',
          rules: [
            'Must submit Figma prototype link',
            'Brief provided at event start',
            'Judged on usability, aesthetics, and presentation',
            'Maximum 5-minute presentation to judges',
          ],
          tags: ['Figma', 'UX Research', 'Prototyping'],
        },
        {
          id: 'design-poster',
          title: 'Visual Identity Challenge',
          description:
            'Design a complete brand identity system for a fictional tech startup — logo, color palette, typography, and a sample application UI.',
          teamSize: '1–2 members',
          prizePool: 'PKR 15,000',
          difficulty: 'Beginner',
          rules: [
            'All assets must be original — no stock resources',
            'Must submit source files + PDF presentation',
            'Brand brief provided 24 hours before deadline',
          ],
          tags: ['Branding', 'Identity', 'Illustration'],
        },
      ],
    },
    {
      id: 'pitch',
      label: 'Pitch',
      icon: 'TrendingUp',
      description: 'For the founders — validate your idea in front of real investors.',
      events: [
        {
          id: 'pitch-startup',
          title: 'Startup Pitch Battle',
          description:
            'Present your startup idea to a panel of active investors and industry veterans. Pitches evaluated on market opportunity, team, and execution plan.',
          teamSize: '1–4 members',
          prizePool: 'PKR 40,000 + Mentorship',
          difficulty: 'Advanced',
          rules: [
            '5-minute pitch + 3-minute Q&A',
            'Must submit a pitch deck 48 hours before event',
            'No working product required — concept stage is fine',
            'Business model canvas submission mandatory',
          ],
          tags: ['Entrepreneurship', 'Venture', 'Strategy'],
        },
        {
          id: 'pitch-social',
          title: 'Social Impact Challenge',
          description:
            'Propose a technology-driven solution to a pressing social or environmental challenge in Pakistan. Judged on feasibility, impact, and scalability.',
          teamSize: '2–5 members',
          prizePool: 'PKR 20,000 + Incubation',
          difficulty: 'Beginner',
          rules: [
            'Problem must be locally relevant to Pakistan',
            '7-minute presentation including demo or mockup',
            'Written proposal required for finalist selection',
          ],
          tags: ['Social Good', 'Impact', 'Innovation'],
        },
      ],
    },
  ] satisfies CompetitionCategory[],
} as const;

// ── Sponsors ──────────────────────────────────────────────────────────────────
// Flat list — no tiers. Drop real logo files into public/sponsors/
// and update logoUrl to e.g. '/sponsors/acme.png'

export const SPONSORS = {
  eyebrow: 'Backed By The Best',
  heading: 'Our Sponsors',
  subheading: 'Companies investing in the next generation of Pakistani tech talent.',
  cta: {
    heading: 'Become a Sponsor',
    body: 'Put your brand in front of 500+ high-achieving students, faculty, and industry professionals. Sponsorship packages available for all scales.',
    buttonLabel: 'Get Sponsorship Deck',
    buttonHref: '#',
  },
  sponsors: [
    { id: 'sp-1', name: 'Acme Technologies', logoUrl: '', websiteUrl: '#' },
    { id: 'sp-2', name: 'NexaCloud',          logoUrl: '', websiteUrl: '#' },
    { id: 'sp-3', name: 'Devforge',           logoUrl: '', websiteUrl: '#' },
    { id: 'sp-4', name: 'Stackline',          logoUrl: '', websiteUrl: '#' },
    { id: 'sp-5', name: 'Bitlabs',            logoUrl: '', websiteUrl: '#' },
    { id: 'sp-6', name: 'Codebridge',         logoUrl: '', websiteUrl: '#' },
    { id: 'sp-7', name: 'DataPulse',          logoUrl: '', websiteUrl: '#' },
    { id: 'sp-8', name: 'Webvault',           logoUrl: '', websiteUrl: '#' },
  ] satisfies Sponsor[],
} as const;

// ── Team ──────────────────────────────────────────────────────────────────────

export const TEAM = {
  eyebrow: 'The People Behind TechNova',
  heading: 'Meet the Team',
  subheading: 'Faculty advisors and student organizers who make it happen.',
  facultyHeading: 'Faculty Advisors',
  studentsHeading: 'Student Organizers',
  faculty: [
    {
      id: 'f-1',
      name: 'Dr. Fatima Malik',
      role: 'Event Patron & Dean',
      department: 'Dept. of Computer Science',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Fatima',
      linkedin: '#',
    },
    {
      id: 'f-2',
      name: 'Prof. Tariq Hassan',
      role: 'Faculty Advisor',
      department: 'Dept. of Software Engineering',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Tariq',
      linkedin: '#',
    },
    {
      id: 'f-3',
      name: 'Dr. Ayesha Siddiqui',
      role: 'Industry Liaison',
      department: 'Innovation & Research Center',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ayesha',
      linkedin: '#',
    },
  ] satisfies TeamMember[],
  students: [
    {
      id: 's-1',
      name: 'Omar Farooq',
      role: 'Lead Organizer',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Omar',
      linkedin: '#',
      github: '#',
    },
    {
      id: 's-2',
      name: 'Zara Ahmed',
      role: 'Head of Design',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Zara',
      linkedin: '#',
      github: '#',
    },
    {
      id: 's-3',
      name: 'Ali Raza',
      role: 'Head of Tech',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ali',
      linkedin: '#',
      github: '#',
    },
    {
      id: 's-4',
      name: 'Sara Khan',
      role: 'Head of Marketing',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sara',
      linkedin: '#',
    },
    {
      id: 's-5',
      name: 'Bilal Chaudhry',
      role: 'Sponsorship Lead',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Bilal',
      linkedin: '#',
    },
    {
      id: 's-6',
      name: 'Hina Javed',
      role: 'Logistics Lead',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Hina',
      linkedin: '#',
    },
  ] satisfies TeamMember[],
} as const;

// ── Location ──────────────────────────────────────────────────────────────────

export const LOCATION = {
  eyebrow: 'Mark Your Calendar',
  heading: 'Join Us at IoBM',
  venue: 'IoBM Auditorium & Computer Labs',
  address: 'Korangi Creek Road, Karachi, Sindh, Pakistan',
  date: 'March 15–17, 2026',
  time: 'Kickoff at 9:00 AM',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.8!2d67.1!3d24.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSW9CTQ!5e0!3m2!1sen!2spk!4v1',
  cta: {
    heading: 'Ready to Make History?',
    body: 'Registrations are limited to 500 participants. Secure your spot before the deadline.',
    buttonLabel: 'Register Now — Free',
    buttonHref: '/register',
    note: 'Registration is free for all IoBM students. External participants: PKR 500.',
  },
  details: [
    { icon: 'Calendar', label: 'Date',       value: 'March 15–17, 2026'   },
    { icon: 'Clock',    label: 'Start Time', value: '9:00 AM Sharp'        },
    { icon: 'MapPin',   label: 'Venue',      value: 'IoBM, Karachi'        },
    { icon: 'Users',    label: 'Capacity',   value: '500 Participants'     },
  ],
} as const;

// ── Footer ────────────────────────────────────────────────────────────────────

export const FOOTER = {
  tagline: 'Built by students. Powered by ambition.',
  copyright: `© ${META.year} TechNova — ${META.universityFull}. All rights reserved.`,
  links: [
    { label: 'Privacy Policy',  href: '#' },
    { label: 'Code of Conduct', href: '#' },
    { label: 'Contact Us',      href: '#' },
  ] satisfies FooterLink[],
  socials: [
    { platform: 'Instagram',  href: '#', icon: 'Instagram' },
    { platform: 'LinkedIn',   href: '#', icon: 'Linkedin'  },
    { platform: 'Twitter / X',href: '#', icon: 'Twitter'   },
    { platform: 'GitHub',     href: '#', icon: 'Github'    },
  ] satisfies SocialLink[],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD DATA
// All dashboard content lives here. Your teammate only edits THIS section.
// Never touch anything above this line.
// ─────────────────────────────────────────────────────────────────────────────

export interface Registration {
  id: string;
  name: string;
  email: string;
  team: string;
  competition: string;
  status: 'Confirmed' | 'Pending' | 'Waitlisted';
  registeredAt: string;
}

export interface CompetitionStat {
  id: string;
  category: string;
  registered: number;
  capacity: number;
  icon: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: 'All' | 'Participants' | 'Faculty' | 'Sponsors';
  sentAt: string;
  status: 'Sent' | 'Draft' | 'Scheduled';
}

export interface SponsorEntry {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  status: 'Confirmed' | 'In Discussion' | 'Pending Invoice';
  amount: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

// ── Dashboard Meta ─────────────────────────────────────────────────────────

export const DASHBOARD = {
  title: "TechNova — Admin Dashboard",
  welcomeMessage: "Welcome back, Organizer",
  eventName: META.siteName,

  // ── Overview Stats ────────────────────────────────────────────────────────
  overviewStats: [
    { id: 'os-1', value: '347',  label: 'Total Registrations', trend: '+12% this week',  trendUp: true,  icon: 'Users'     },
    { id: 'os-2', value: '6',    label: 'Competitions Open',   trend: '2 closing soon',  trendUp: false, icon: 'Trophy'    },
    { id: 'os-3', value: '8',    label: 'Sponsors Confirmed',  trend: '3 in discussion', trendUp: true,  icon: 'Handshake' },
    { id: 'os-4', value: '21',   label: 'Days Until Event',    trend: 'March 15, 2026',  trendUp: true,  icon: 'Calendar'  },
  ],

  // ── Registrations ─────────────────────────────────────────────────────────
  registrations: {
    heading: 'Recent Registrations',
    totalLabel: 'Total registered',
    total: 347,
    capacity: 500,
    entries: [
      { id: 'r-1', name: 'Ahmed Raza',      email: 'ahmed@iqra.edu.pk',   team: 'ByteForce',   competition: 'DSA Throwdown',       status: 'Confirmed',  registeredAt: '2026-02-28' },
      { id: 'r-2', name: 'Sara Malik',      email: 'sara@szabist.edu.pk', team: 'PixelPush',   competition: 'UX Design Sprint',    status: 'Confirmed',  registeredAt: '2026-02-27' },
      { id: 'r-3', name: 'Usman Tariq',     email: 'usman@iobm.edu.pk',   team: 'NullPtr',     competition: '48-Hour Build Sprint', status: 'Pending',    registeredAt: '2026-02-27' },
      { id: 'r-4', name: 'Hira Baig',       email: 'hira@nust.edu.pk',    team: 'LaunchPad',   competition: 'Startup Pitch Battle', status: 'Confirmed',  registeredAt: '2026-02-26' },
      { id: 'r-5', name: 'Bilal Siddiqui',  email: 'bilal@fast.edu.pk',   team: 'Kernel Panic','competition': 'DSA Throwdown',      status: 'Waitlisted', registeredAt: '2026-02-25' },
      { id: 'r-6', name: 'Zainab Ahmed',    email: 'zainab@iba.edu.pk',   team: 'SolveIt',     competition: 'Social Impact',       status: 'Confirmed',  registeredAt: '2026-02-24' },
    ] as Registration[],
  },

  // ── Competition Entries ───────────────────────────────────────────────────
  competitionStats: {
    heading: 'Competition Entries',
    subheading: 'Registrations per category vs. capacity',
    entries: [
      { id: 'cs-1', category: 'DSA Throwdown',        registered: 89,  capacity: 100, icon: 'Code2'      },
      { id: 'cs-2', category: '48-Hour Build Sprint',  registered: 72,  capacity: 80,  icon: 'Zap'        },
      { id: 'cs-3', category: 'UX Design Sprint',      registered: 54,  capacity: 60,  icon: 'Figma'      },
      { id: 'cs-4', category: 'Visual Identity',       registered: 38,  capacity: 50,  icon: 'Palette'    },
      { id: 'cs-5', category: 'Startup Pitch Battle',  registered: 61,  capacity: 80,  icon: 'TrendingUp' },
      { id: 'cs-6', category: 'Social Impact',         registered: 33,  capacity: 50,  icon: 'Globe'      },
    ] as CompetitionStat[],
  },

  // ── Analytics ─────────────────────────────────────────────────────────────
  analytics: {
    heading: 'Registration Trend',
    subheading: 'Daily sign-ups over the past 2 weeks',
    dailyData: [
      { label: 'Feb 15', value: 12  },
      { label: 'Feb 16', value: 18  },
      { label: 'Feb 17', value: 9   },
      { label: 'Feb 18', value: 24  },
      { label: 'Feb 19', value: 31  },
      { label: 'Feb 20', value: 28  },
      { label: 'Feb 21', value: 19  },
      { label: 'Feb 22', value: 42  },
      { label: 'Feb 23', value: 38  },
      { label: 'Feb 24', value: 27  },
      { label: 'Feb 25', value: 33  },
      { label: 'Feb 26', value: 51  },
      { label: 'Feb 27', value: 44  },
      { label: 'Feb 28', value: 36  },
    ] as ChartDataPoint[],
    universityData: [
      { label: 'IoBM',    value: 89  },
      { label: 'FAST',    value: 74  },
      { label: 'NUST',    value: 61  },
      { label: 'SZABIST', value: 48  },
      { label: 'IQRA',    value: 39  },
      { label: 'Others',  value: 36  },
    ] as ChartDataPoint[],
  },

  // ── Sponsors ──────────────────────────────────────────────────────────────
  sponsorManagement: {
    heading: 'Sponsor Pipeline',
    subheading: 'Track confirmed and prospective sponsors',
    entries: [
      { id: 'sm-1', name: 'Acme Technologies', contactName: 'Kamran Shah',   contactEmail: 'kamran@acme.com',    status: 'Confirmed',        amount: 'PKR 200,000' },
      { id: 'sm-2', name: 'NexaCloud',         contactName: 'Aisha Mirza',   contactEmail: 'aisha@nexacloud.io', status: 'Confirmed',        amount: 'PKR 150,000' },
      { id: 'sm-3', name: 'Devforge',          contactName: 'Tariq Mehmood', contactEmail: 'tariq@devforge.pk', status: 'In Discussion',    amount: 'PKR 100,000' },
      { id: 'sm-4', name: 'Stackline',         contactName: 'Omar Farhan',   contactEmail: 'omar@stackline.io', status: 'Pending Invoice',  amount: 'PKR 75,000'  },
      { id: 'sm-5', name: 'Bitlabs',           contactName: 'Sana Qureshi',  contactEmail: 'sana@bitlabs.pk',  status: 'In Discussion',    amount: 'PKR 50,000'  },
    ] as SponsorEntry[],
  },

  // ── Team Panel ────────────────────────────────────────────────────────────
  teamPanel: {
    heading: 'Organizing Team',
    subheading: 'Current task status per organizer',
    tasks: [
      { memberId: 's-1', memberName: 'Omar Farooq',    role: 'Lead Organizer',   task: 'Finalize event schedule',        taskStatus: 'In Progress' as const },
      { memberId: 's-2', memberName: 'Zara Ahmed',     role: 'Head of Design',   task: 'Deliver final banner assets',    taskStatus: 'Pending'     as const },
      { memberId: 's-3', memberName: 'Ali Raza',       role: 'Head of Tech',     task: 'Deploy registration form',       taskStatus: 'Done'        as const },
      { memberId: 's-4', memberName: 'Sara Khan',      role: 'Head of Marketing', task: 'Launch Instagram campaign',     taskStatus: 'In Progress' as const },
      { memberId: 's-5', memberName: 'Bilal Chaudhry', role: 'Sponsorship Lead', task: 'Follow up with 3 sponsors',      taskStatus: 'Pending'     as const },
      { memberId: 's-6', memberName: 'Hina Javed',     role: 'Logistics Lead',   task: 'Confirm venue AV setup',         taskStatus: 'Done'        as const },
    ],
  },

  // ── Announcements ─────────────────────────────────────────────────────────
  announcements: {
    heading: 'Announcements',
    subheading: 'Broadcast messages to participants, faculty, or sponsors',
    entries: [
      { id: 'an-1', title: 'Registration Now Open!',        body: 'TechNova registrations are officially open. Head to the website and secure your spot.',                     audience: 'All',          sentAt: '2026-02-20', status: 'Sent'      },
      { id: 'an-2', title: 'Sponsor Deck Available',        body: 'The official TechNova sponsorship deck is ready. Contact us to receive your copy.',                         audience: 'Sponsors',     sentAt: '2026-02-22', status: 'Sent'      },
      { id: 'an-3', title: 'DSA Practice Resources',        body: 'Brushing up for the DSA Throwdown? We\'ve compiled a resource list on our website.',                             audience: 'Participants', sentAt: '2026-02-25', status: 'Sent'      },
      { id: 'an-4', title: 'Faculty Briefing — March 1',    body: 'A briefing session for all faculty advisors is scheduled for March 1st at 3:00 PM in Room 204.',                 audience: 'Faculty',      sentAt: '2026-03-01', status: 'Scheduled' },
      { id: 'an-5', title: 'Final Reminder — 1 Week Left',  body: 'One week to go! Make sure your team is registered and all submissions are in order.',                            audience: 'All',          sentAt: '',           status: 'Draft'     },
    ] as Announcement[],
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRATION FORM DATA
// ─────────────────────────────────────────────────────────────────────────────

export const REGISTRATION = {
  pageTitle:    'Register for TechNova',
  pageSubtitle: 'Secure your spot. Limited to 500 participants.',

  // ── How did you hear about us options ──────────────────────────────────────
  referralOptions: [
    'Social Media (Instagram / Facebook)',
    'LinkedIn',
    'University Notice Board',
    'Friend / Classmate',
    'Faculty Member',
    'Previous TechNova Attendee',
    'Other',
  ],

  // ── Competition categories — populated when backend is ready ───────────────
  // To add categories: append strings to this array in site-data.ts
  competitionCategories: [
    // 'DSA Throwdown',
    // '48-Hour Build Sprint',
    // 'UX Design Sprint',
    // Add real categories here when backend is ready
  ] as string[],

  // ── Team size options ──────────────────────────────────────────────────────
  teamSizeOptions: ['1', '2', '3', '4', '5'],

  // ── Success modal ──────────────────────────────────────────────────────────
  successTitle:   'You\'re Registered!',
  successBody:    'Welcome to TechNova. We\'ve received your registration and will send a confirmation to your email shortly.',
  successCta:     'Back to Home',

  // ── Validation messages ────────────────────────────────────────────────────
  validation: {
    required:     'This field is required',
    emailInvalid: 'Please enter a valid email address',
    phoneInvalid: 'Please enter a valid phone number',
    cnicInvalid:  'Please enter a valid CNIC (e.g. 42101-1234567-1)',
  },
} as const;
