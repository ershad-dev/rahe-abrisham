<script setup>
const route = useRoute()

const backgroundImage = computed(() => {
  const path = route.path

  // ۱. لیست صفحاتی که هدر نباید در آن‌ها باشد (لاگین و ثبت‌نام)
  const hideHeaderRoutes = ['/login', '/register', '/otp', '/signup', '/auth']
  if (hideHeaderRoutes.includes(path)) {
    return null
  }

  // ۲. مدیریت سایر مسیرها
  // نکته: استفاده از مسیر مستقیم به جای Import برای پایداری بیشتر
  switch (path) {
    case '/about': 
      return '/_nuxt/assets/images/about-bg.png' 
    case '/contact': 
      return '/_nuxt/assets/images/cantact-bg.png'
    case '/capital': 
      return '/_nuxt/assets/images/landing-bg.jpg'
    default: 
      return '/_nuxt/assets/images/landing-bg.jpg'
  }
})
</script>

<template>
  <section v-if="backgroundImage" class="relative w-full h-auto overflow-hidden bg-[#ebebeb]">
    <img 
      :src="backgroundImage" 
      alt="Logistics" 
      class="w-full h-auto shadow-lg block"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none"></div>
  </section>
</template>