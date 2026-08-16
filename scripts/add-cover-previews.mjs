import fs from "node:fs";
import path from "node:path";

const directory = "content/works";

for (const name of fs.readdirSync(directory)) {
  if (!name.endsWith(".mdx")) continue;

  const file = path.join(directory, name);
  let source = fs.readFileSync(file, "utf8");

  if (source.includes("\ncoverPreview:")) continue;

  const match = source.match(/^cover: "([^"]+\.webp)"/m);
  if (!match) continue;

  const preview = match[1].replace(/\.webp$/, ".preview.webp");
  const previewPath = path.join("public", preview.slice(1));

  if (!fs.existsSync(previewPath)) continue;

  source = source.replace(
    match[0],
    `${match[0]}\ncoverPreview: "${preview}"`,
  );

  fs.writeFileSync(file, source, "utf8");
  console.log(`${name} -> ${preview}`);
}
