import { defineConfig } from "vite";
import { existsSync, readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    {
      name: "frozen-birthday-editions",
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const base = server.config.base.replace(/\/$/, "");
          const pathname = request.url?.split("?")[0];
          const match = pathname?.startsWith(`${base}/`)
            ? /^\/(\d{4})\/$/.exec(pathname.slice(base.length))
            : null;
          if (!match) return next();

          const index = path.resolve(import.meta.dirname, "client/public", match[1], "index.html");
          if (!existsSync(index)) return next();
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          response.end(readFileSync(index));
        });
      },
    },
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
