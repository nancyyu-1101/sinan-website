import { promises as fs } from "node:fs";
import path from "node:path";
import {
  contentDirectory,
  listMdxFiles,
  parseFrontmatter,
  readMdxFile,
  readNumber,
  readOptionalString,
  readOptionalStringArray,
  readString,
  readStringArray,
} from "./frontmatter";
import {
  WORK_CATEGORIES,
  type WorkCategory,
  type WorkDocument,
  type WorkStatus,
} from "./types";

const WORKS_DIRECTORY = contentDirectory("works");
const WORK_STATUSES: WorkStatus[] = ["published", "placeholder", "draft"];

function parseWork(fileName: string, source: string): WorkDocument {
  const { data, body } = parseFrontmatter(source);
  const category = readString(data, "category", fileName);
  const status = readOptionalString(data, "status") ?? "published";

  if (!WORK_CATEGORIES.includes(category as WorkCategory)) {
    throw new Error(
      `${fileName}: category must be "industrial-design" or "vibecoding".`,
    );
  }

  if (!WORK_STATUSES.includes(status as WorkStatus)) {
    throw new Error(`${fileName}: unsupported work status "${status}".`);
  }

  const title = readString(data, "title", fileName);

  return {
    slug: path.basename(fileName, ".mdx"),
    title,
    subtitle: readOptionalString(data, "subtitle"),
    year: readString(data, "year", fileName),
    category: category as WorkCategory,
    cover: readString(data, "cover", fileName),
    coverAlt: readOptionalString(data, "coverAlt") ?? title + " 项目封面",
    tags: readStringArray(data, "tags", fileName),
    summary: readString(data, "summary", fileName),
    order: readNumber(data, "order", fileName),
    status: status as WorkStatus,
    displayType: readOptionalString(data, "displayType"),
    gallery: readOptionalStringArray(data, "gallery"),
    galleryCaptions: readOptionalStringArray(data, "galleryCaptions"),
    processImages: readOptionalStringArray(data, "processImages"),
    processImageAlts: readOptionalStringArray(data, "processImageAlts"),
    role: readOptionalString(data, "role"),
    timeline: readOptionalString(data, "timeline"),
    duration: readOptionalString(data, "duration"),
    team: readOptionalString(data, "team"),
    externalUrl: readOptionalString(data, "externalUrl"),
    externalLabel: readOptionalString(data, "externalLabel"),
    githubUrl: readOptionalString(data, "githubUrl"),
    githubLabel: readOptionalString(data, "githubLabel"),
    videoUrl: readOptionalString(data, "videoUrl"),
    body,
  };
}

export async function getAllWorks(options?: { includeDrafts?: boolean }) {
  const fileNames = await listMdxFiles(WORKS_DIRECTORY);
  const works = await Promise.all(
    fileNames.map(async (fileName) => {
      const source = await fs.readFile(path.join(WORKS_DIRECTORY, fileName), "utf8");
      return parseWork(fileName, source);
    }),
  );

  return works
    .filter((work) => options?.includeDrafts || work.status !== "draft")
    .sort(
      (a, b) =>
        a.order - b.order ||
        b.year.localeCompare(a.year) ||
        a.title.localeCompare(b.title, "zh-CN"),
    );
}

export async function getWorksByCategory() {
  const works = await getAllWorks();

  return WORK_CATEGORIES.reduce<Record<WorkCategory, WorkDocument[]>>(
    (groups, category) => {
      groups[category] = works.filter((work) => work.category === category);
      return groups;
    },
    { "industrial-design": [], vibecoding: [] },
  );
}

export async function getWorkBySlug(slug: string) {
  const source = await readMdxFile(WORKS_DIRECTORY, slug);
  return source ? parseWork(`${slug}.mdx`, source) : null;
}

export async function getWorkSlugs() {
  const works = await getAllWorks();
  return works
    .filter((work) => work.status === "published")
    .map((work) => work.slug);
}
