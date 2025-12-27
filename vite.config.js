import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),

    // ✅ PWA Plugin
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",

      // 👇 Assets already in public/
      includeAssets: [
        "android-launchericon-48-48.png",
        "android-launchericon-72-72.png",
        "android-launchericon-96-96.png",
        "android-launchericon-144-144.png",
        "android-launchericon-192-192.png",
        "android-launchericon-512-512.png"
      ],

      manifest: {
        name: "Zugaly - Fresh Groceries & Farm Produce Delivery",
        short_name: "Zugaly",
        description:
          "Zugaly delivers farm-fresh vegetables, fruits, dairy, and groceries straight from farms to your doorstep.",
        theme_color: "#16a34a",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/?source=pwa",
        scope: "/",
        orientation: "portrait",
        lang: "en",

        icons: [
          {
            src: "/android-launchericon-48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "/android-launchericon-72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "/android-launchericon-96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "/android-launchericon-144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/android-launchericon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/android-launchericon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
      },

      // ✅ Service Worker / Cache Rules
      workbox: {
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/api\.edooqate\.in\/api\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              }
            }
          }
        ]
      }
    }),
  ],

  // ✅ Alias Support
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
