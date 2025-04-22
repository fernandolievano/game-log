// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        class: 'dark'
      }
    }
  },
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/test-utils/module'],
  nitro: {
    routeRules: {
      '/api/**': { swr: false }
    }
  },
  runtimeConfig: {
    app: {
      domain: process.env.DOMAIN,
      env: process.env.NODE_ENV,
      steam_key: process.env.STEAM_KEY
    },
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY
    }
  },
  ssr: true,
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
