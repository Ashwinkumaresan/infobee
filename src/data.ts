import { EventItem, ProgramItem, GalleryImage, ResearchPaper } from './types';



export const eventsData: EventItem[] = [
  {
    id: 'evt-beecode',
    title: 'Research Paper Deep Dive & Scopus Publication',
    category: 'Research Paper',
    date: 'OCT 24, 2026',
    rawDate: '2026-10-24',
    description: 'An intensive research paper deep-dive session focusing on literature survey synthesis, methodology validation, IEEE/Springer manuscript formatting, and navigating Scopus & Web of Science journal peer reviews.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    type: 'upcoming',
    registrationOpen: true,
    venue: 'Central Research Lab & IT Auditorium, Dr. MCET',
    time: '09:30 AM - 04:30 PM',
    coordinator: 'Dr. R. Loganathan & Dr. S. Priya (Research Coordinators)',
    coordinatorEmail: 'research.it@drmcet.ac.in'
  },
  {
    id: 'evt-cyberfold',
    title: 'Research Paper Writing & IEEE Presentation',
    category: 'Research Paper',
    date: 'NOV 12, 2026',
    rawDate: '2026-11-12',
    description: 'Unfolding methodologies for technical research paper drafting, literature review, IEEE template formatting, LaTeX citation tools, and publishing in peer-reviewed Scopus journals.',
    type: 'upcoming',
    registrationOpen: true,
    venue: 'Research Seminar Hall, MCET Block B',
    time: '01:30 PM - 04:30 PM',
    coordinator: 'Dr. S. Priya (Research Coordinator)',
    coordinatorEmail: 'priya.s@drmcet.ac.in'
  },
  {
    id: 'evt-paper2026',
    title: 'National Level Research Paper Presentation 2026',
    category: 'Research Paper',
    date: 'DEC 15, 2026',
    rawDate: '2026-12-15',
    description: 'Present your original research findings in AI, Cloud Computing, Cybersecurity, and Data Science before eminent academic reviewers, industry scientists, and journal editors.',
    type: 'upcoming',
    registrationOpen: true,
    venue: 'Main Auditorium & Research Labs, MCET',
    time: '09:00 AM - 05:00 PM',
    coordinator: 'Dr. R. Loganathan & Dr. S. Priya',
    coordinatorEmail: 'research.it@drmcet.ac.in'
  },
  {
    id: 'evt-webdev3.0',
    title: 'NextGen Web: React & Tailwind v4',
    category: 'Workshop',
    date: 'DEC 01, 2026',
    rawDate: '2026-12-01',
    description: 'Learn modern single-page-app architecture with high-density designs, modern motion libraries, and Tailwind CSS v4.',
    type: 'upcoming',
    registrationOpen: true,
    venue: 'IT Lab 3, Block C',
    time: '09:30 AM - 01:00 PM',
    coordinator: 'Mr. A. Vignesh',
    coordinatorEmail: 'vignesh.a@drmcet.ac.in'
  },
  {
    id: 'evt-devops-sprint',
    title: 'DevOps & CI/CD Pipeline Sprint',
    category: 'Hackathon',
    date: 'SEP 15, 2024',
    rawDate: '2024-09-15',
    description: 'A practical, timed hackathon event to build, deploy, and monitor containerized apps using Docker and GitHub Actions under guidance.',
    type: 'past',
    registrationOpen: false,
    venue: 'Cloud Computing Lab, Block B',
    time: '08:00 AM - 08:00 PM',
    coordinator: 'Mrs. M. Kavitha',
    coordinatorEmail: 'kavitha.m@drmcet.ac.in'
  }
];

export const programsData: ProgramItem[] = [
  {
    id: 'prog-bootcamp',
    title: 'Coding Bootcamps',
    description: 'Intensive, project-based learning tracks focused on modern stacks like MERN, DevOps, and Machine Learning. Designed to bridge the gap between curriculum and industry.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    learnMoreText: 'Infobee Bootcamps are structured 6-week courses that occur outside college hours. They are led by experienced senior students and industry alumni. Students build 3 production-ready projects.',
    details: {
      duration: '6 Weeks (Saturdays & Evening Sessions)',
      modules: [
        'Web Stack Foundations (React, Node.js, Express)',
        'Database & API Design (REST, GraphQL, MongoDB)',
        'Cloud Deployments & Docker Containers',
        'Machine Learning Integration with Python'
      ],
      outcomes: [
        'Build and host a portfolio of 3 full-stack projects',
        'Receive specialized mentoring from Senior Engineers',
        'Earn an Infobee Bootcamp Graduate digital badge'
      ],
      pastInstructors: [
        'Siddharth Jayakumar (SDE at Zoho)',
        'Harish Ragavendar (Cloud Architect at TCS)',
        'Ananya Krish (ML Engineer at Cognizant)'
      ]
    }
  },
  {
    id: 'prog-symposium',
    title: 'Research Papers & Technical Symposiums',
    description: 'Annual flagship events featuring national research paper presentations, peer-reviewed journal publishing workshops, technical quizzes, and project expos that foster academic rigor.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    learnMoreText: 'Our National level Technical Symposium and Research Paper Conference is Dr. MCET IT Department’s crowning jewel. It attracts over 1200+ students and student-researchers across Southern India to pitch papers, compete, and publish in indexed proceedings.',
    details: {
      duration: '2 Days (Annual Flagship Event)',
      modules: [
        'Research Paper Presentation on Emerging Tech (AI, Quantum, IoT, Cloud)',
        'IEEE & Scopus Journal Paper Drafting & Literature Survey',
        'Adept Coder: Speed Debugging & Algorithm Benchmarking Arena',
        'Project Expo & Research Patent Pitching'
      ],
      outcomes: [
        'Publication opportunities in peer-reviewed IEEE & Scopus indexed journals',
        'Cash Prizes worth up to INR 1,50,000 for top research papers',
        'Direct research & internship referrals with industry partner labs',
        'Certificate of Research Excellence signed by college Principal'
      ],
      pastInstructors: [
        'Dr. P. Govindasamy (Director, MCET Research Cell)',
        'Dr. S. Priya (Editor, International Journal of IT)',
        'Karthik Sundar (Co-Founder, Pollachi Tech Hub)'
      ]
    }
  },
  {
    id: 'prog-talks',
    title: 'Industry Talks',
    description: 'Direct interaction with tech leaders from Fortune 500 companies, providing students with critical insights into career paths and emerging tech trends.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    learnMoreText: 'We host fortnightly webinars and fire-side chats with tech leaders, directors, and alumni working at Netflix, Amazon, Google, Microsoft, and Zoho to inspire careers.',
    details: {
      duration: 'Bi-weekly Sessions (2 Hours)',
      modules: [
        'Architecting for Scale (System Design Frameworks)',
        'Succeeding in Off-Campus Placements',
        'The Future of generative AI in SaaS and FinTech',
        'Pursuing Higher Education abroad vs. Indian Startup Hubs'
      ],
      outcomes: [
        'Interactive Q&A and 1-on-1 advice opportunities',
        'Resume review and LinkedIn optimization guidance',
        'Access to exclusive internship referrals'
      ],
      pastInstructors: [
        'Ramakrishnan Swaminathan (Principal Engineer, Amazon)',
        'Vijay Anand (Product Lead, Google)',
        'Deepika Sundararajan (Engineering Manager, Zoho)'
      ]
    }
  }
];

export const galleryData: GalleryImage[] = [
  {
    id: 'gal-1',
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    alt: 'Students Collaborating at Hackathon',
    caption: 'Student organizers coordinating a technical workshop briefing.',
    category: 'Workshop',
    date: 'Oct 2025'
  },
  {
    id: 'gal-2',
    src: 'https://images.unsplash.com/photo-1581092334651-ddf26d9aae9d?auto=format&fit=crop&w=800&q=80',
    alt: 'Electronics and Debugging',
    caption: 'Students getting hands-on with microcontrollers and breadboards.',
    category: 'Workshop',
    date: 'Nov 2025'
  },
  {
    id: 'gal-3',
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    alt: 'Research Paper Award Winners',
    caption: 'Triumphant research paper presentation winners holding their trophies at the annual IEEE Symposium.',
    category: 'Research Paper',
    date: 'Feb 2025'
  },
  {
    id: 'gal-4',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    alt: 'Research Paper Presentation Session',
    caption: 'Full-house seminar on Research Paper Drafting, IEEE Formatting, and Scopus Publications.',
    category: 'Research Paper',
    date: 'Mar 2025'
  },
  {
    id: 'gal-5',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    alt: 'Inspirational Research Panel',
    caption: 'Expert tech panelists debating about the Future of AI/ML Research Papers.',
    category: 'Research Paper',
    date: 'Feb 2025'
  },
  {
    id: 'gal-6',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    alt: 'Programming Sprint',
    caption: 'Intense 3-hour code golf competition organized by Infobee developers.',
    category: 'Hackathon',
    date: 'Sep 2025'
  }
];
