import type { PhotographyLocationId } from "@/data/photography-locations";

export const WORK_CATEGORIES = ["industrial-design", "vibecoding"] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];
export type WorkStatus = "published" | "placeholder" | "draft";

export type WorkDocument = {
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  category: WorkCategory;
  cover: string;
  coverAlt: string;
  tags: string[];
  summary: string;
  order: number;
  status: WorkStatus;
  displayType?: string;
  gallery?: string[];
  galleryCaptions?: string[];
  processImages?: string[];
  processImageAlts?: string[];
  role?: string;
  timeline?: string;
  duration?: string;
  team?: string;
  externalUrl?: string;
  externalLabel?: string;
  githubUrl?: string;
  githubLabel?: string;
  videoUrl?: string;
  body: string;
};

export type PhotographyStatus = "published" | "placeholder" | "draft";

export type PhotographyImage = {
  slug: string;
  title: string;
  year: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  order: number;
  status: PhotographyStatus;
  locationId?: PhotographyLocationId;
  location?: string;
  caption?: string;
  body: string;
};

export type ProfileDocument = {
  slug: string;
  title: string;
  summary: string;
  order: number;
  body: string;
};
