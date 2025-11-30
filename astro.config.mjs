import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import fs from 'node:fs';
import path from 'node:path';

// Custom Integration for Local Admin Tool
const adminToolIntegration = {
  name: 'apex-admin-tool',
  hooks: {
    'astro:config:setup': ({ injectScript, command }) => {
      // Only inject in local development mode
      if (command === 'dev') {
        try {
          const scriptPath = path.resolve('./admin-tool/admin-overlay.js');
          const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
          injectScript('page', scriptContent);
          console.log('✅ Injected Admin Tool Overlay');
        } catch (e) {
          console.error('Failed to inject admin tool:', e);
        }
      }
    }
  }
};

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://apexhotelfurniture.com', // 部署后可修改
  integrations: [
    tailwind(),
    sitemap(),
    adminToolIntegration
  ],
});
