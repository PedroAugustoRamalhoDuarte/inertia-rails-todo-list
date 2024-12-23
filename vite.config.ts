import { defineConfig } from 'vite'
import ViteRails from 'vite-plugin-rails'
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    ViteRails(),
    tailwindcss(),
  ],
})
