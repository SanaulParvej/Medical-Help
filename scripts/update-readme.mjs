import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const README_PATH = path.join(ROOT, "README.md");

const START_MARKER = "<!-- AUTO-GENERATED:START -->";
const END_MARKER = "<!-- AUTO-GENERATED:END -->";

const IGNORE_DIRS = new Set([
    ".git",
    "node_modules",
    "dist",
    "build",
    ".vite",
    ".idea",
    ".vscode",
    "coverage",
]);

function safeReadJson(relativePath) {
    const fullPath = path.join(ROOT, relativePath);
    if (!fs.existsSync(fullPath)) {
        return null;
    }

    try {
        return JSON.parse(fs.readFileSync(fullPath, "utf8"));
    } catch {
        return null;
    }
}

function formatMapAsList(obj) {
    if (!obj || Object.keys(obj).length === 0) {
        return ["- None"];
    }

    return Object.entries(obj)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, version]) => `- ${name}: ${version}`);
}

function buildTree(startPath, displayName, maxDepth = 4, maxItemsPerFolder = 40) {
    const lines = [displayName];

    function walk(currentPath, prefix, depth) {
        if (depth >= maxDepth) {
            return;
        }

        let entries = fs
            .readdirSync(currentPath, { withFileTypes: true })
            .filter((entry) => !IGNORE_DIRS.has(entry.name));

        entries.sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;
            return a.name.localeCompare(b.name);
        });

        if (entries.length > maxItemsPerFolder) {
            entries = entries.slice(0, maxItemsPerFolder);
        }

        entries.forEach((entry, index) => {
            const isLast = index === entries.length - 1;
            const connector = isLast ? "└── " : "├── ";
            const nextPrefix = `${prefix}${isLast ? "    " : "│   "}`;
            const suffix = entry.isDirectory() ? "/" : "";

            lines.push(`${prefix}${connector}${entry.name}${suffix}`);

            if (entry.isDirectory()) {
                walk(path.join(currentPath, entry.name), nextPrefix, depth + 1);
            }
        });
    }

    walk(startPath, "", 0);
    return lines;
}

function extractEndpoints(serverFilePath) {
    if (!fs.existsSync(serverFilePath)) {
        return [];
    }

    const content = fs.readFileSync(serverFilePath, "utf8");
    const regex = /app\.(get|post|put|patch|delete)\(\s*['"`]([^'"`]+)['"`]/g;
    const seen = new Set();
    const endpoints = [];

    for (const match of content.matchAll(regex)) {
        const method = match[1].toUpperCase();
        const route = match[2];
        const key = `${method} ${route}`;

        if (!seen.has(key)) {
            seen.add(key);
            endpoints.push(`- ${method} ${route}`);
        }
    }

    return endpoints;
}

function buildGeneratedSection() {
    const clientPkg = safeReadJson(path.join("medical-help-client", "package.json"));
    const serverPkg = safeReadJson(path.join("medical-help-server", "package.json"));

    const tree = buildTree(ROOT, "Medical-Help/", 4, 50);
    const endpoints = extractEndpoints(path.join(ROOT, "medical-help-server", "index.js"));

    const now = new Date();
    const updatedAt = now.toISOString().replace("T", " ").replace(".000Z", " UTC");

    const parts = [
        START_MARKER,
        "## Auto-Generated Project Snapshot",
        "",
        `Last updated: ${updatedAt}`,
        "",
        "### Project Structure",
        "",
        "```text",
        ...tree,
        "```",
        "",
        "### NPM Scripts",
        "",
        "#### Client (medical-help-client)",
        ...formatMapAsList(clientPkg?.scripts),
        "",
        "#### Server (medical-help-server)",
        ...formatMapAsList(serverPkg?.scripts),
        "",
        "### Key Dependencies",
        "",
        "#### Client Dependencies",
        ...formatMapAsList(clientPkg?.dependencies),
        "",
        "#### Server Dependencies",
        ...formatMapAsList(serverPkg?.dependencies),
        "",
        "### API Endpoints (from server code)",
        ...(endpoints.length ? endpoints : ["- None detected"]),
        END_MARKER,
        "",
    ];

    return parts.join("\n");
}

function buildReadmeTemplate(generatedSection) {
    const template = [
        "# Medical Help",
        "",
        "A full-stack healthcare web application with a React frontend and an Express + MongoDB backend.",
        "",
        "## Quick Start",
        "",
        "### 1) Run backend server",
        "",
        "```bash",
        "cd medical-help-server",
        "npm install",
        "npm run dev",
        "```",
        "",
        "Server runs on: `http://localhost:4000`",
        "",
        "### 2) Run frontend client",
        "",
        "Open a new terminal:",
        "",
        "```bash",
        "cd medical-help-client",
        "npm install",
        "npm run dev",
        "```",
        "",
        "Client runs on Vite default port (usually `http://localhost:5173`).",
        "",
        "## README Automation",
        "",
        "This README is generated from your current codebase to avoid manual rewrite every day.",
        "",
        "One-time Git hook setup:",
        "",
        "```bash",
        "git config core.hooksPath .githooks",
        "```",
        "",
        "Run this command to refresh:",
        "",
        "```bash",
        "node scripts/update-readme.mjs",
        "```",
        "",
        generatedSection.trimEnd(),
        "",
        "## License",
        "",
        "ISC (see package settings).",
        "",
    ];

    return template.join("\n");
}

function updateReadme() {
    const generated = buildGeneratedSection();
    const rebuilt = buildReadmeTemplate(generated);
    fs.writeFileSync(README_PATH, rebuilt.trimEnd() + "\n", "utf8");

    console.log("README.md updated successfully.");
}

updateReadme();