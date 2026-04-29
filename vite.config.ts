import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("three") || id.includes("@react-three")) {
            return "three";
          }
          if (id.includes("ScrollTrigger")) {
            return "gsap-st";
          }
          if (id.includes("lenis")) {
            return "lenis";
          }
          if (id.includes("gsap")) {
            return "gsap";
          }
          if (id.includes("react-dom") || id.includes("react/jsx")) {
            return "react";
          }
          if (id.includes("@tanstack/react-router") || id.includes("@tanstack/router")) {
            return "router";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
