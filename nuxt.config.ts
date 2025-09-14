export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false, // no frontend rendering, just API
  nitro: {
    preset: "node-server", // run API as Node server
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],

  fonts: {
    families: [
      {
        name: "Montserrat",
        provider: "google",
        weights: [400, 500, 600, 700, 800, 900],
      },
    ],
  },

  runtimeConfig: {
    mongoUri: process.env.MONGO_URI,
    public: {
      apiBaseUrl: process.env.VITE_API_BASE_URL || "",
    },
  },
});
