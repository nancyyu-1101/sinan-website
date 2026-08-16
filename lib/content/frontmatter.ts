import { promises as fs } from "node:fs";
import path from "node:path";

export type FrontmatterValue = string | number | boolean | string[] | null;
export type Frontmatter = Record<string, FrontmatterValue>;

const CONTENT_ROOT = path.join(process.cwd(), "content");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseScalar(rawValue: string): FrontmatterValue {
  const value = rawValue.trim();

  if (value === "") return "";
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;

  if (value.startsWith("[") && value.endsWith("]")) {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) {
      throw new Error(`Only string arrays are supported in frontmatter: ${value}`);
    }

    return parsed;
  }

  if (value.startsWith('"') && value.endsWith('"')) {
    const parsed: unknown = JSON.parse(value);

    if (typeof parsed !== "string") {
      throw new Error(`Expected a quoted string in frontmatter: ${value}`);
    }

    return parsed;
  }

  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }

  if (/^-?\d+(?:\.\d+)?$/.test(value)) {
    return Number(value);
  }

  return value;
}

export function parseFrontmatter(source: string) {
  const normalized = source.replace(/^\uFEFF/, "");
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("MDX content must begin with a frontmatter block.");
  }

  const data: Frontmatter = {};

  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf(":");
    if (separator === -1) {
      throw new Error(`Invalid frontmatter line: ${line}`);
    }

    const key = trimmed.slice(0, separator).trim();
    const rawValue = trimmed.slice(separator + 1);
    data[key] = parseScalar(rawValue);
  }

  return { data, body: match[2].trim() };
}

export function contentDirectory(section: "works" | "photography" | "profile") {
  return path.join(CONTENT_ROOT, section);
}

export async function listMdxFiles(directory: string) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort();
}

export async function readMdxFile(directory: string, slug: string) {
  if (!SLUG_PATTERN.test(slug)) return null;

  try {
    return await fs.readFile(path.join(directory, `${slug}.mdx`), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export function readString(data: Frontmatter, key: string, fileName: string) {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fileName}: frontmatter field "${key}" must be a string.`);
  }
  return value;
}

export function readOptionalString(data: Frontmatter, key: string) {
  const value = data[key];
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") {
    throw new Error(`Frontmatter field "${key}" must be a string when provided.`);
  }
  return value;
}

export function readNumber(data: Frontmatter, key: string, fileName: string) {
  const value = data[key];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${fileName}: frontmatter field "${key}" must be a number.`);
  }
  return value;
}

export function readStringArray(data: Frontmatter, key: string, fileName: string) {
  const value = data[key];
  if (!Array.isArray(value)) {
    throw new Error(`${fileName}: frontmatter field "${key}" must be a string array.`);
  }
  return value;
}

export function readOptionalStringArray(data: Frontmatter, key: string) {
  const value = data[key];
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value)) {
    throw new Error(`Frontmatter field "${key}" must be a string array when provided.`);
  }
  return value;
}
