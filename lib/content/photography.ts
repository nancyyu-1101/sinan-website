import { promises as fs } from "node:fs";
import path from "node:path";

import { isPhotographyLocationId } from "@/data/photography-locations";

import {
  contentDirectory,
  listMdxFiles,
  parseFrontmatter,
  readNumber,
  readOptionalString,
  readString,
} from "./frontmatter";
import type { PhotographyImage, PhotographyStatus } from "./types";

const PHOTOGRAPHY_DIRECTORY = contentDirectory("photography");
const PHOTOGRAPHY_STATUSES: PhotographyStatus[] = [
  "published",
  "placeholder",
  "draft",
];

function parsePhotographyImage(fileName: string, source: string): PhotographyImage {
  const { data, body } = parseFrontmatter(source);
  const status = readOptionalString(data, "status") ?? "published";
  const locationId = readOptionalString(data, "locationId");

  if (locationId && !isPhotographyLocationId(locationId)) {
    throw new Error(
      `${fileName}: unsupported photography location "${locationId}".`,
    );
  }

  if (!PHOTOGRAPHY_STATUSES.includes(status as PhotographyStatus)) {
    throw new Error(`${fileName}: unsupported photography status "${status}".`);
  }

  return {
    slug: path.basename(fileName, ".mdx"),
    title: readString(data, "title", fileName),
    year: readString(data, "year", fileName),
    src: readString(data, "src", fileName),
    alt: readString(data, "alt", fileName),
    width: readNumber(data, "width", fileName),
    height: readNumber(data, "height", fileName),
    order: readNumber(data, "order", fileName),
    status: status as PhotographyStatus,
    locationId: locationId && isPhotographyLocationId(locationId) ? locationId : undefined,
    location: readOptionalString(data, "location"),
    caption: readOptionalString(data, "caption"),
    body,
  };
}

export async function getPhotographyImages(options?: { includeDrafts?: boolean }) {
  const fileNames = await listMdxFiles(PHOTOGRAPHY_DIRECTORY);
  const images = await Promise.all(
    fileNames.map(async (fileName) => {
      const source = await fs.readFile(
        path.join(PHOTOGRAPHY_DIRECTORY, fileName),
        "utf8",
      );
      return parsePhotographyImage(fileName, source);
    }),
  );

  return images
    .filter((image) => options?.includeDrafts || image.status !== "draft")
    .sort((a, b) => a.order - b.order || b.year.localeCompare(a.year));
}
