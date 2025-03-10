// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },

    runtimeConfig: {
        public: {
            socketPort: 3001,
            url: 'http://localhost',
        },
    },

    css: ['~/assets/css/main.css'],
    modules: ['@vueuse/nuxt', '@pinia/nuxt'],
});