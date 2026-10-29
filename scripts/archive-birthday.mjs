import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const editions = path.join(root, "client/public");
const manifestName = "edition.json";

function fingerprints(directory, prefix = "") {
  return Object.fromEntries(
    readdirSync(path.join(directory, prefix), { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name))
      .flatMap((entry) => {
        const relative = path.posix.join(prefix, entry.name);
        if (entry.isDirectory()) {
          return Object.entries(fingerprints(directory, relative));
        }
        if (relative === manifestName) return [];
        return [
          [
            relative,
            createHash("sha256")
              .update(readFileSync(path.join(directory, relative)))
              .digest("hex"),
          ],
        ];
      }),
  );
}

if (process.argv[2] === "--verify") {
  const years = readdirSync(editions).filter((entry) => /^\d{4}$/.test(entry));
  if (years.length === 0) throw new Error("No frozen birthday editions found.");

  for (const year of years) {
    const directory = path.join(editions, year);
    const manifest = JSON.parse(readFileSync(path.join(directory, manifestName), "utf8"));
    if (JSON.stringify(fingerprints(directory)) !== JSON.stringify(manifest.files)) {
      throw new Error(`The frozen ${year} edition has changed. Restore it from its recorded source commit.`);
    }
    console.log(`${year}: frozen edition is intact (${manifest.sourceCommit}).`);
  }
} else {
  const [, , year, revision] = process.argv;
  if (!/^\d{4}$/.test(year ?? "") || !revision) {
    throw new Error("Usage: npm run archive:birthday -- <year> <committed-revision>");
  }

  const destination = path.join(editions, year);
  if (existsSync(destination)) {
    throw new Error(`The ${year} edition already exists. Frozen editions must never be overwritten.`);
  }

  const sourceCommit = execFileSync("git", ["rev-parse", "--verify", `${revision}^{commit}`], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  const workspace = mkdtempSync(path.join(tmpdir(), `birthday-${year}-`));
  const originalWorkingDirectory = process.cwd();

  try {
    const source = path.join(workspace, "source");
    const output = path.join(workspace, "build");
    const tar = path.join(workspace, "source.tar");
    mkdirSync(source);
    execFileSync("git", ["archive", "--format=tar", `--output=${tar}`, sourceCommit], { cwd: root });
    execFileSync("tar", ["-xf", tar, "-C", source]);

    const sameLockfile = readFileSync(path.join(source, "package-lock.json"))
      .equals(readFileSync(path.join(root, "package-lock.json")));
    if (sameLockfile && existsSync(path.join(root, "node_modules/vite"))) {
      symlinkSync(path.join(root, "node_modules"), path.join(source, "node_modules"), "dir");
    } else {
      execFileSync("npm", ["ci", "--no-audit", "--no-fund"], { cwd: source, stdio: "inherit" });
    }

    process.chdir(source);
    process.env.NODE_ENV = "production";
    const { build, loadConfigFromFile, mergeConfig } = await import(
      pathToFileURL(path.join(source, "node_modules/vite/dist/node/index.js")).href
    );
    const loaded = await loadConfigFromFile(
      { command: "build", mode: "production" },
      path.join(source, "vite.config.ts"),
    );
    if (!loaded) throw new Error(`Could not load the ${year} edition's Vite configuration.`);

    await build(mergeConfig(loaded.config, {
      configFile: false,
      base: "./",
      publicDir: false,
      define: {
        // Only the deployment path changes; the committed application source stays untouched.
        "import.meta.env.BASE_URL": "window.__BIRTHDAY_ARCHIVE_BASE__",
      },
      plugins: [{
        name: "birthday-archive-location",
        transformIndexHtml() {
          return [{
            tag: "script",
            children: 'window.__BIRTHDAY_ARCHIVE_BASE__ = new URL(".", window.location.href).pathname.replace(/\\/$/, "");',
            injectTo: "head-prepend",
          }];
        },
      }],
      build: { outDir: output, emptyOutDir: true },
    }));

    const manifest = {
      year: Number(year),
      sourceCommit,
      files: fingerprints(output),
    };
    writeFileSync(path.join(output, manifestName), `${JSON.stringify(manifest, null, 2)}\n`);
    mkdirSync(editions, { recursive: true });
    cpSync(output, destination, { recursive: true, errorOnExist: true, force: false });
    console.log(`Preserved ${year} from ${sourceCommit} in client/public/${year}/.`);
  } finally {
    process.chdir(originalWorkingDirectory);
    rmSync(workspace, { recursive: true, force: true });
  }
}
