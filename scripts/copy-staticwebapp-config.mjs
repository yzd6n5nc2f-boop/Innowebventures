import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import process from "node:process";

const source = resolve("staticwebapp.config.json");
const destination = resolve("dist", "staticwebapp.config.json");

if (!existsSync(source)) {
  console.error(`Missing source config: ${source}`);
  process.exit(1);
}

mkdirSync(dirname(destination), { recursive: true });
copyFileSync(source, destination);
console.log(`Copied ${source} -> ${destination}`);
