export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type ContentGoal = "Find a Job" | "Improve Portfolio" | "Prepare Interview" | "Learn Skill";
export type Category =
  | "Job Search"
  | "GitHub Review"
  | "LinkedIn Optimization"
  | "Portfolio Projects"
  | "Interview Preparation"
  | "React & Frontend"
  | "Full-Stack Development"
  | "Freelance Tips";

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  plan: "Free" | "Boosted" | "Featured" | "Growth";
  followers: number;
}

export interface Video {
  id: string;
  title: string;
  creatorId: string;
  category: Category;
  description: string;
  outcomes: string[];
  difficulty: Difficulty;
  goal: ContentGoal;
  views: number;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  embedId?: string;
  promoted?: boolean;
  premium?: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  videoId: string;
  author: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  monthly: number;
  annual: number; // per month when billed annually
  tagline: string;
  features: string[];
  visibility: string;
  promotedSlots: string;
  analytics: string;
  creatorTools: string;
  highlighted?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "viewer" | "creator";
  plan?: "Free" | "Boosted" | "Featured" | "Growth";
  sessionHash?: string;
  demo?: boolean;
}

export interface StoredAccount {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "viewer" | "creator";
}
