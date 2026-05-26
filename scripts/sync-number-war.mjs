import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const gameRoot = process.env.NUMBER_WAR_SOURCE || "/Users/tang/Documents/网页游戏";

const requiredPaths = [
  "play.html",
  "src/standalone.mjs",
  "src/styles.css",
  "src/gameLogic.mjs",
  "public/audio",
  "public/icons",
  "public/manifest.webmanifest",
];

for (const item of requiredPaths) {
  const source = path.join(gameRoot, item);
  if (!existsSync(source)) {
    throw new Error(`Missing Number War source file: ${source}`);
  }
}

const targets = [
  { root: path.join(siteRoot, "public/number-war"), production: true },
  { root: path.join(siteRoot, "preview/number-war"), production: false },
];

function ensureCleanDir(dir) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

function patchIndexHtml(html, production) {
  return html
    .replace(/href=["'][^"']*manifest\.webmanifest["']/g, `href="${production ? "/number-war/manifest.webmanifest" : "./manifest.webmanifest"}"`)
    .replace(/href=["'][^"']*src\/styles\.css["']/g, `href="${production ? "/number-war/src/styles.css" : "./src/styles.css"}"`)
    .replace(/src=["'][^"']*src\/standalone\.mjs["']/g, `src="${production ? "/number-war/src/standalone.mjs" : "./src/standalone.mjs"}"`);
}

function patchStandalone(source) {
  return source.replace(
    /function audioPath\(file\) \{\s*return [^}]+?\n\}/m,
    'function audioPath(file) {\n  return new URL("../audio/" + file, import.meta.url).href;\n}'
  );
}

function patchManifest(source) {
  const manifest = JSON.parse(source);
  manifest.start_url = "/number-war";
  manifest.icons = (manifest.icons || []).map((icon) => ({
    ...icon,
    src: "icons/icon.svg",
  }));
  return JSON.stringify(manifest, null, 2) + "\n";
}

for (const target of targets) {
  ensureCleanDir(target.root);

  mkdirSync(path.join(target.root, "src"), { recursive: true });
  cpSync(path.join(gameRoot, "src/styles.css"), path.join(target.root, "src/styles.css"));
  cpSync(path.join(gameRoot, "src/gameLogic.mjs"), path.join(target.root, "src/gameLogic.mjs"));

  const standalone = readFileSync(path.join(gameRoot, "src/standalone.mjs"), "utf8");
  writeFileSync(path.join(target.root, "src/standalone.mjs"), patchStandalone(standalone));

  cpSync(path.join(gameRoot, "public/audio"), path.join(target.root, "audio"), { recursive: true });
  cpSync(path.join(gameRoot, "public/icons"), path.join(target.root, "icons"), { recursive: true });

  const manifest = readFileSync(path.join(gameRoot, "public/manifest.webmanifest"), "utf8");
  writeFileSync(path.join(target.root, "manifest.webmanifest"), patchManifest(manifest));

  const html = readFileSync(path.join(gameRoot, "play.html"), "utf8");
  writeFileSync(path.join(target.root, "index.html"), patchIndexHtml(html, target.production));
}

console.log(`Number War synced from ${gameRoot}`);
