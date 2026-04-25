import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'icons/*.png'],
      manifest: {
        name: 'A História do Milo',
        short_name: 'Livro do Milo',
        description: 'Livro de colorir digital com o ursinho Milo — uma iniciativa do Instituto Fise e Dr. Francesco Blumetti.',
        theme_color: '#FFF4DE',
        background_color: '#FFF4DE',
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/',
        lang: 'pt-BR',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Cache all assets for offline use
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,mp3}'],
        // Exclude the 1024px icon — only needed for the App Store, not the PWA
        globIgnores: ['**/icons/icon-1024.png'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'gstatic-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: parseInt(process.env.PORT) || 5173,
  },
  preview: {
    host: true,
    port: parseInt(process.env.PORT) || 4173,
  },
});
