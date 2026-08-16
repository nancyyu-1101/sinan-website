import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const directories = ["app", "components", "content", "data", "lib"];
const extensions = new Set([".ts", ".tsx", ".mdx"]);
const files = [];

function walk(directory) {
  if (!fs.existsSync(directory)) return;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(filePath);
      continue;
    }

    if (extensions.has(path.extname(entry.name))) {
      files.push(filePath);
    }
  }
}

for (const directory of directories) {
  walk(path.join(root, directory));
}

let updatedReferences = 0;

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const next = source.replace(
    /\/(?:brand|works|photography)\/[^"'\]\)\s]+?\.(?:png|jpe?g)/gi,
    (match) => {
      const webpPath = match.replace(/\.(?:png|jpe?g)$/i, ".webp");
      const publicPath = path.join(root, "public", webpPath.slice(1));

      if (!fs.existsSync(publicPath)) return match;

      updatedReferences += 1;
      return webpPath;
    },
  );

  if (next !== source) {
    fs.writeFileSync(file, next);
    console.log(path.relative(root, file).replace(/\\/g, "/"));
  }
}

console.log(`Updated refs: ${updatedReferences}`);
