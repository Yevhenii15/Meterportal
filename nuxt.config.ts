export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

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
      { name: "Montserrat", provider: "google" }
    ]
  },

  runtimeConfig: {
    mongoUri: process.env.MONGO_URI,
  },
});
