import { promises as fs } from "node:fs";
import path from "node:path";
import {
  contentDirectory,
  listMdxFiles,
  parseFrontmatter,
  readMdxFile,
  readNumber,
  readString,
} from "./frontmatter";
import type { ProfileDocument } from "./types";

const PROFILE_DIRECTORY = contentDirectory("profile");

function parseProfileDocument(fileName: string, source: string): ProfileDocument {
  const { data, body } = parseFrontmatter(source);

  return {
    slug: path.basename(fileName, ".mdx"),
    title: readString(data, "title", fileName),
    summary: readString(data, "summary", fileName),
    order: readNumber(data, "order", fileName),
    body,
  };
}

export async function getAllProfileDocuments() {
  const fileNames = await listMdxFiles(PROFILE_DIRECTORY);
  const documents = await Promise.all(
    fileNames.map(async (fileName) => {
      const source = await fs.readFile(path.join(PROFILE_DIRECTORY, fileName), "utf8");
      return parseProfileDocument(fileName, source);
    }),
  );

  return documents.sort((a, b) => a.order - b.order);
}

export async function getProfileDocumentBySlug(slug: string) {
  const source = await readMdxFile(PROFILE_DIRECTORY, slug);
  return source ? parseProfileDocument(`${slug}.mdx`, source) : null;
}
