import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@scenes",
        replacement: fileURLToPath(new URL("./src/scenes", import.meta.url)),
      },
      {
        find: "@components",
        replacement: fileURLToPath(new URL("./src/components", import.meta.url)),
      },
      {
        find: "@state",
        replacement: fileURLToPath(new URL("./src/state", import.meta.url)),
      },
      {
        find: "@theme",
        replacement: fileURLToPath(new URL("./src/theme", import.meta.url)),
      },
      {
        find: "@assets",
        replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
    ],
  },
  server: {
    port: 3000,
  },
});
