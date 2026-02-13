<template>
  <section v-if="backgroundImage" class="relative w-full h-auto overflow-hidden bg-[#ebebeb]">
    <img 
      :src="backgroundImage" 
      alt="Silk Road Logistics" 
      class="w-full h-auto shadow-lg block"
    />

    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-full h-2"></div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import bgLanding from '~/assets/images/landing-bg.jpg'
import bgAbout from '~/assets/images/about-bg.png'
import bgContact from '~/assets/images/cantact-bg.png'
import bgCapital from '~/assets/images/landing-bg.jpg'

const route = useRoute()

const backgroundImage = computed(() => {
  const currentPath = route.path

  // . لیست صفحاتی که هدر نباید در آن‌ها نمایش داده شود
  const authPages = ['/login', '/register', '/otp','/dashboard','/capital','/auth' ]
  if (authPages.includes(currentPath)) {
    return null
  }
  

  // . انتخاب تصویر بر اساس مسیر
  switch (currentPath) {
    case '/about': 
      return bgAbout
    case '/contact': 
      return bgContact
    case '/capital': 
      return bgCapital
    default: 
      return bgLanding
  }
})
</script>