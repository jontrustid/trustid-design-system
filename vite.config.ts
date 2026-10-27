import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative base so a build can be served from any subpath — the versioned
  // site mounts each catalogue build at /<version>/ (see tools/build-versions.mjs).
  base: './',
  server: { port: 5176 },
  plugins: [react(), tailwindcss()],
});
