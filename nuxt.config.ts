// وارد کردن تابع تعریف پیکربندی برای فعال شدن قابلیت‌های هوشمند ویرایشگر
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // تعیین پوشه 'app' به عنوان محل قرارگیری کدهای اصلی برنامه (Pages, Components, etc.)
  srcDir: 'app/',

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    '~/assets/css/main.css',
  ],

  // تنظیمات مربوط به ابزارهای توسعه ناکست
  devtools: { enabled: true }
})