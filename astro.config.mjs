import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yiantechglobal.com',
  output: 'static',
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
