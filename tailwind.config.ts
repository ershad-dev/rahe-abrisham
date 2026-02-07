import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './nuxt.config.{js,ts}',
  ],

  theme: {
    extend: {
      colors: {
        'rahe-abrisham-primary': '#00A3A3',
        'rahe-abrisham-light': '#F0F8F8',
      }
    },
  },

  plugins: [],
}
