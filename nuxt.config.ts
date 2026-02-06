export default defineNuxtConfig({
  srcDir: 'app/',
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  // این مسیردهی رو اضافه/اصلاح کن تا مطمئن شی کار می‌کنه:
  css: [
    '~/assets/css/main.css',
  ]
})
