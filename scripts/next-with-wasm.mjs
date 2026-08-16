import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");
const nextCommand = process.argv[2];

process.env.NEXT_TEST_WASM_DIR = join(
  projectRoot,
  "node_modules",
  "@next",
  "swc-wasm-nodejs",
);
process.env.LOCALAPPDATA ??= join(projectRoot, ".localappdata");
process.env.NEXT_DIST_DIR ??= nextCommand === "dev" ? ".next-dev" : ".next";

const nextBin = join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextBin, ...process.argv.slice(2)], {
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
