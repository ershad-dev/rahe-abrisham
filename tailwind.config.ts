import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './nuxt.config.{js,ts}',
  ],

  theme: {
    extend: {
      fontFamily: {
        // تنظیم فونت Inter به عنوان فونت sans پیش‌فرض
        //برای اعمال فونت ضروری هست
        sans: ['InterVariable', 'sans-serif'],
      },
      colors: {
        'rahe-abrisham-primary': '#00A3A3',
        'rahe-abrisham-light': '#F0F8F8',
        'ebebeb': '#ebebeb',
      }
    },
  },

  plugins: [],
}