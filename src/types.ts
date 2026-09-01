export type EventType = 'upcoming' | 'past';

export interface EventItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Workshop' | 'Seminar' | 'Research Paper';
  date: string;
  rawDate: string; // ISO date for sorting
  description: string;
  image?: string;
  type: EventType;
  registrationOpen: boolean;
  venue?: string;
  time?: string;
  coordinator?: string;
  coordinatorEmail?: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  image: string;
  learnMoreText: string;
  details: {
    duration: string;
    modules: string[];
    outcomes: string[];
    pastInstructors: string[];
  };
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: 'Symposium' | 'Hackathon' | 'Workshop' | 'Session' | 'Research Paper' | 'All';
  date: string;
}

export interface ResearchAuthor {
  name: string;
  email?: string;
  description: string;
  type: 'Student' | 'Faculty';
  profile_id?: number | string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: ResearchAuthor[];
  author_type: 'Faculty' | 'Student';
  journal: string;
  publisher?: string;
  year: number;
  domain: string;
  citations: number;
  featured?: boolean;
  is_dark_featured?: boolean;
  abstract: string;
  doi?: string;
  pdf_url?: string;
  keywords: string[];
}

export interface PaperSubmission {
  id: string;
  title: string;
  primaryAuthor: string;
  authorEmail: string;
  authorType: 'Faculty' | 'Student';
  domain: string;
  journal: string;
  abstract: string;
  fileUrl?: string;
  timestamp: string;
  status: 'under_review' | 'accepted' | 'published';
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface JoinRequest {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
  interestArea: string;
  reason: string;
  membershipId: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}
