import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const targets = [
  "public/works",
  "public/photography",
  "public/brand/profile",
  "public/brand/ip/hero-sequence",
];
const extra = ["public/brand/ip/sinan-logo-transparent.png"];
const files = [];

function walk(directory) {
  if (!fs.existsSync(directory)) return;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(filePath);
      continue;
    }

    if (/\.(png|jpe?g)$/i.test(entry.name)) {
      files.push(filePath);
    }
  }
}

function profileFor(relativePath) {
  if (relativePath.endsWith("sinan-logo-transparent.png")) {
    return { maxWidth: 256, quality: 95 };
  }

  return { maxWidth: Number.POSITIVE_INFINITY, quality: 92 };
}

for (const target of targets) {
  walk(path.join(root, target));
}

for (const file of extra) {
  const filePath = path.join(root, file);
  if (fs.existsSync(filePath)) files.push(filePath);
}

let before = 0;
let after = 0;
let count = 0;

for (const file of [...new Set(files)]) {
  const relativePath = path.relative(root, file).replace(/\\/g, "/");
  const outputPath = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const sourceSize = fs.statSync(file).size;
  const { maxWidth, quality } = profileFor(relativePath);
  const metadata = await sharp(file).metadata();

  let image = sharp(file, { animated: false }).rotate();

  if (Number.isFinite(maxWidth) && metadata.width && metadata.width > maxWidth) {
    image = image.resize({ width: maxWidth, withoutEnlargement: true });
  }

  await image
    .webp({ alphaQuality: 98, quality, smartSubsample: true, effort: 6 })
    .toFile(outputPath);

  const outputSize = fs.statSync(outputPath).size;
  before += sourceSize;
  after += outputSize;
  count += 1;

  console.log(
    `${(sourceSize / 1048576).toFixed(2)}MB -> ${(outputSize / 1048576).toFixed(
      2,
    )}MB  ${path.relative(root, outputPath).replace(/\\/g, "/")}`,
  );
}

console.log(
  `Converted ${count} files: ${(before / 1048576).toFixed(2)}MB -> ${(
    after / 1048576
  ).toFixed(2)}MB`,
);
