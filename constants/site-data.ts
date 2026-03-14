// ─────────────────────────────────────────────────────────────────────────────
// TECHNOVA '26 — SINGLE SOURCE OF TRUTH
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

export const META = {
  siteName: "TechNova '26",
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
    label: 'Solar Flare',
    description: 'Magenta fire on obsidian',
  },
  {
    id: 'obsidian-pearl',
    label: 'Obsidian Pearl',
    description: 'Warm gold on pure black',
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
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Competitions', href: '#competitions' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Team', href: '#team' },
  { label: 'Venue', href: '#location' },
];

export const NAV_CTA: NavLink = {
  label: 'Register Now',
  href: '#location',
};

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HERO = {
  eyebrow: `${META.universityFull} Presents`,
  headline: META.siteName,
  subheadline: META.tagline,
  body: META.description,
  ctaPrimary: { label: 'Explore Competitions', href: '#competitions' },
  ctaSecondary: { label: 'Learn More', href: '#about' },
  countdownLabel: 'Registration Closes In',
  countdownTarget: META.countdownTarget,
  badge: META.edition,
  stats: [
    { value: '500+', label: 'Participants' },
    { value: '48hrs', label: 'Of Hacking' },
    { value: 'PKR 2L+', label: 'Prize Pool' },
    { value: '12+', label: 'Competitions' },
  ] satisfies Stat[],
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
    { value: '3rd', label: 'Annual Edition' },
    { value: '20+', label: 'Industry Mentors' },
    { value: '15+', label: 'Sponsoring Companies' },
    { value: '48hrs', label: 'Non-stop Innovation' },
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
      src: '',
      alt: 'TechNova 2024 — Opening Ceremony',
      year: "TechNova '24",
      caption: 'Opening Ceremony',
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
    buttonHref: '#',
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
  copyright: `© ${META.year} ${META.siteName} — ${META.universityFull}. All rights reserved.`,
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
