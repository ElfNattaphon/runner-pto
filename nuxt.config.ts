export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['@/assets/css/tailwind.css'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
    public: { appName: process.env.NUXT_PUBLIC_APP_NAME || 'RunPlanner Pro' }
  },
  nitro: { preset: 'node-server', compatibilityDate: '2025-08-22' },
  typescript: { strict: true, typeCheck: true },
  app: {
    head: {
      title: 'RunPlanner Pro',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  }
})
