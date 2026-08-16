import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sources = [
  "public/works/industrial-design/trigear-cover.webp",
  "public/works/industrial-design/roofsense-cover-v2.webp",
  "public/works/industrial-design/airoma-cover.webp",
  "public/works/industrial-design/shellter-cover.webp",
  "public/works/formocracy/formocracy-cover.webp",
  "public/works/meetpoint/meetpoint-home.webp",
  "public/works/yige-co-creation/yige-co-creation-cover-v2.webp",
  "public/works/future-todo-assistant/future-todo-assistant-cover-v5.webp",
  "public/works/ubr-homepage-design/ubr-homepage-design-cover.webp",
];

for (const relativePath of sources) {
  const sourcePath = path.join(root, relativePath);
  if (!fs.existsSync(sourcePath)) continue;

  const parsed = path.parse(sourcePath);
  const outputPath = path.join(parsed.dir, `${parsed.name}.preview.webp`);

  await sharp(sourcePath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ alphaQuality: 96, effort: 6, quality: 84, smartSubsample: true })
    .toFile(outputPath);

  const sourceSize = fs.statSync(sourcePath).size;
  const outputSize = fs.statSync(outputPath).size;

  console.log(
    `${relativePath}: ${(sourceSize / 1024).toFixed(0)}KB -> ${(
      outputSize / 1024
    ).toFixed(0)}KB`,
  );
}
