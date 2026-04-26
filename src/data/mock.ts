import { Category, Comment, Creator, Plan, Video } from "@/types";

export const categories: Category[] = [
  "Job Search",
  "GitHub Review",
  "LinkedIn Optimization",
  "Portfolio Projects",
  "Interview Preparation",
  "React & Frontend",
  "Full-Stack Development",
  "Freelance Tips",
];

export const creators: Creator[] = [
  { id: "c1", name: "Lazar Bukejlovic", handle: "@lazar", avatar: "LB", bio: "Full-Stack Engineer & founder of DevPath Hub. Building practical career-growth tools for developers.", plan: "Growth", followers: 24800 },
  { id: "c2", name: "Maya Chen", handle: "@maya.codes", avatar: "MC", bio: "Senior Frontend Engineer. Helps juniors land their first React role.", plan: "Featured", followers: 18200 },
  { id: "c3", name: "Daniel Alvarez", handle: "@danielbuilds", avatar: "DA", bio: "Hiring manager turned content creator. Reviews real GitHub profiles.", plan: "Boosted", followers: 9100 },
  { id: "c4", name: "Priya Raman", handle: "@priya.dev", avatar: "PR", bio: "Full-stack dev coaching engineers through interview prep.", plan: "Featured", followers: 12500 },
  { id: "c5", name: "Tomáš Novák", handle: "@tomas", avatar: "TN", bio: "LinkedIn growth strategist for software engineers.", plan: "Free", followers: 4300 },
  { id: "c6", name: "Aria Okafor", handle: "@aria.codes", avatar: "AO", bio: "Freelance full-stack developer. Shares client and pricing strategy.", plan: "Boosted", followers: 7800 },
];

export const videos: Video[] = [
  { id: "v1", title: "How to Land a Junior React Role in 2026", creatorId: "c2", category: "Job Search", description: "A practical breakdown of the exact application strategy that gets junior React developers shortlisted in a saturated market.", outcomes: ["Build a focused application list", "Tailor your CV for ATS", "Avoid the 5 most common rejection reasons"], difficulty: "Beginner", goal: "Find a Job", views: 48210, duration: "18:42", thumbnail: "from-emerald-500/30 to-blue-500/20", videoUrl: "#", promoted: true, createdAt: "2025-11-12" },
  { id: "v2", title: "GitHub Profile Review: What Hiring Managers Actually Look At", creatorId: "c3", category: "GitHub Review", description: "Live review of three developer GitHub profiles with concrete improvements to pinned repos, READMEs, and contribution graphs.", outcomes: ["Structure pinned repositories", "Write READMEs that convert", "Show real engineering signal"], difficulty: "Intermediate", goal: "Improve Portfolio", views: 31050, duration: "24:10", thumbnail: "from-purple-500/30 to-pink-500/20", premium: true, createdAt: "2025-11-08" },
  { id: "v3", title: "LinkedIn Headline Formulas That Get Recruiters to DM You", creatorId: "c5", category: "LinkedIn Optimization", description: "Five tested headline structures for web developers, with examples for junior, mid, and senior roles.", outcomes: ["Pick the right headline format", "Optimize the About section", "Increase recruiter inbound"], difficulty: "Beginner", goal: "Find a Job", views: 22340, duration: "12:18", thumbnail: "from-blue-500/30 to-cyan-500/20", createdAt: "2025-11-04" },
  { id: "v4", title: "Building a Portfolio Project That Actually Gets You Hired", creatorId: "c2", category: "Portfolio Projects", description: "Why most portfolio projects fail and the structure of one that signals real engineering ability.", outcomes: ["Choose the right project scope", "Document trade-offs", "Deploy and present cleanly"], difficulty: "Intermediate", goal: "Improve Portfolio", views: 39870, duration: "21:05", thumbnail: "from-emerald-500/30 to-teal-500/20", promoted: true, createdAt: "2025-10-28" },
  { id: "v5", title: "System Design for Frontend Interviews", creatorId: "c4", category: "Interview Preparation", description: "Walkthrough of three frontend system design questions: news feed, autocomplete, and design system.", outcomes: ["Structure your answer", "Communicate trade-offs", "Handle follow-up questions"], difficulty: "Advanced", goal: "Prepare Interview", views: 27600, duration: "32:44", thumbnail: "from-indigo-500/30 to-purple-500/20", premium: true, createdAt: "2025-10-22" },
  { id: "v6", title: "Mastering React Server Components in Production", creatorId: "c2", category: "React & Frontend", description: "When to use RSC, when to avoid them, and how to migrate an existing app without breaking it.", outcomes: ["Understand the RSC model", "Pick the right boundary", "Ship without regressions"], difficulty: "Advanced", goal: "Learn Skill", views: 18900, duration: "28:30", thumbnail: "from-cyan-500/30 to-blue-500/20", createdAt: "2025-10-15" },
  { id: "v7", title: "Building a Full-Stack SaaS in 6 Hours", creatorId: "c1", category: "Full-Stack Development", description: "End-to-end build of a real SaaS product with auth, billing, and a clean dashboard. Watch the full walkthrough below — every architectural decision explained.", outcomes: ["Architect a small SaaS", "Wire auth and payments", "Ship a usable v1"], difficulty: "Intermediate", goal: "Learn Skill", views: 54200, duration: "1:02:18", thumbnail: "from-emerald-500/40 to-green-500/20", embedId: "XUkNR-JfHwo", promoted: true, premium: true, createdAt: "2025-10-10" },
  { id: "v8", title: "Freelance Pricing for Web Developers", creatorId: "c6", category: "Freelance Tips", description: "How to price projects, write proposals, and avoid scope creep as a freelance web developer.", outcomes: ["Set defensible rates", "Write proposals that close", "Protect your scope"], difficulty: "Intermediate", goal: "Find a Job", views: 14300, duration: "19:50", thumbnail: "from-orange-500/30 to-red-500/20", createdAt: "2025-10-04" },
  { id: "v9", title: "Behavioral Interview Answers Engineers Get Wrong", creatorId: "c4", category: "Interview Preparation", description: "Five behavioral questions and the answer structure that consistently lands offers.", outcomes: ["Use STAR effectively", "Avoid red-flag answers", "Show senior-level thinking"], difficulty: "Intermediate", goal: "Prepare Interview", views: 20450, duration: "16:22", thumbnail: "from-pink-500/30 to-rose-500/20", createdAt: "2025-09-29" },
  { id: "v10", title: "Auth Patterns Every Full-Stack Dev Should Know", creatorId: "c1", category: "Full-Stack Development", description: "Sessions, JWTs, refresh tokens, and when to use each. Concrete examples in Node and React.", outcomes: ["Pick the right auth model", "Avoid common security holes", "Implement refresh correctly"], difficulty: "Advanced", goal: "Learn Skill", views: 32800, duration: "26:11", thumbnail: "from-violet-500/30 to-fuchsia-500/20", premium: true, createdAt: "2025-09-21" },
  { id: "v11", title: "Resume Rewrite: From Bootcamp to Mid-Level", creatorId: "c3", category: "Job Search", description: "A real resume rewrite showing how to position bootcamp + side projects for a mid-level role.", outcomes: ["Reframe your experience", "Quantify impact", "Pass ATS reliably"], difficulty: "Beginner", goal: "Find a Job", views: 16700, duration: "14:08", thumbnail: "from-yellow-500/30 to-orange-500/20", createdAt: "2025-09-14" },
  { id: "v12", title: "Tailwind Architecture for Large Apps", creatorId: "c2", category: "React & Frontend", description: "Design tokens, semantic layers, and component variants that scale past 50k lines.", outcomes: ["Design a token system", "Avoid utility soup", "Keep velocity at scale"], difficulty: "Advanced", goal: "Learn Skill", views: 24100, duration: "22:55", thumbnail: "from-teal-500/30 to-emerald-500/20", createdAt: "2025-09-08" },
];

export const comments: Comment[] = [
  { id: "k1", videoId: "v1", author: "Jonas W.", avatar: "JW", text: "The ATS section alone was worth it. Got two callbacks this week.", createdAt: "2 days ago" },
  { id: "k2", videoId: "v1", author: "Sara M.", avatar: "SM", text: "Finally advice that isn't just 'grind LeetCode'. Thanks.", createdAt: "5 days ago" },
  { id: "k3", videoId: "v2", author: "Ahmed K.", avatar: "AK", text: "Restructured my pinned repos and recruiter messages doubled.", createdAt: "1 week ago" },
];

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free Creator",
    monthly: 0,
    annual: 0,
    tagline: "Start publishing",
    visibility: "Standard feed placement",
    promotedSlots: "0 promoted slots",
    analytics: "Basic view counts",
    creatorTools: "Upload + profile",
    features: [
      "Publish unlimited videos",
      "Standard creator profile",
      "Community comments",
      "Basic view counts",
    ],
  },
  {
    id: "boosted",
    name: "Boosted Video",
    monthly: 9,
    annual: 7,
    tagline: "Get seen faster",
    visibility: "Higher feed placement",
    promotedSlots: "1 promoted video",
    analytics: "Engagement + retention",
    creatorTools: "Upload + thumbnail tools",
    features: [
      "Higher placement in feed",
      "Promoted badge on videos",
      "Increased viewer exposure",
      "Engagement & retention analytics",
    ],
  },
  {
    id: "featured",
    name: "Featured Creator",
    monthly: 19,
    annual: 15,
    tagline: "Stand out",
    visibility: "Homepage featured slot",
    promotedSlots: "3 promoted videos",
    analytics: "Advanced analytics dashboard",
    creatorTools: "Upload + thumbnails + scheduling",
    features: [
      "Featured on homepage",
      "Priority placement in category",
      "Advanced analytics dashboard",
      "Early access to new creator tools",
    ],
    highlighted: true,
  },
  {
    id: "growth",
    name: "Growth Partner",
    monthly: 39,
    annual: 31,
    tagline: "Maximum visibility",
    visibility: "Top-of-feed + multi-category",
    promotedSlots: "Unlimited promoted videos",
    analytics: "Advanced + audience insights",
    creatorTools: "Full studio + dedicated review",
    features: [
      "Unlimited promoted videos",
      "Premium creator badge",
      "Dedicated monthly growth review",
      "All Featured Creator benefits",
    ],
  },
];

export const adminMetrics = {
  totalVideos: 1284,
  activeCreators: 312,
  premiumCreators: 87,
  totalViews: 4_820_000,
  monthlyGrowth: 23.4,
  conversionRate: 8.7,
  topCategories: [
    { name: "Interview Preparation", value: 28 },
    { name: "React & Frontend", value: 22 },
    { name: "Job Search", value: 18 },
    { name: "GitHub Review", value: 14 },
    { name: "LinkedIn Optimization", value: 10 },
    { name: "Other", value: 8 },
  ],
  engagement: [
    { month: "Jun", views: 220, engagement: 38 },
    { month: "Jul", views: 280, engagement: 42 },
    { month: "Aug", views: 360, engagement: 47 },
    { month: "Sep", views: 410, engagement: 51 },
    { month: "Oct", views: 520, engagement: 55 },
    { month: "Nov", views: 640, engagement: 61 },
  ],
};
