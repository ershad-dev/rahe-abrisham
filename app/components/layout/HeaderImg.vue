<template>
  <section 
    v-if="isLandingPage" 
    class="relative w-full h-auto overflow-hidden bg-white group mt-[70px] px-5 md:px-10"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div class="relative w-full h-auto md:h-[400px] overflow-hidden rounded-[15px] shadow-sm aspect-[16/7] md:aspect-auto grid overflow-hidden">
      <img 
        v-for="(slide, index) in slides"
        :key="index"
        :src="slide" 
        :class="[
          'w-full h-full object-cover block col-start-1 row-start-1 transition-all duration-1000 ease-in-out',
          currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
        ]"
        alt="Silk Road Logistics Slider" 
      />
      
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none z-20"></div>
    </div>

    <button 
      @click="prevSlide" 
      class="hidden md:flex absolute left-14 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0a0a5e]/60 hover:bg-[#0a0a5e] text-white rounded-full items-center justify-center transition-all z-30 backdrop-blur-sm shadow-lg active:scale-90"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>

    <button 
      @click="nextSlide" 
      class="hidden md:flex absolute right-14 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0a0a5e]/60 hover:bg-[#0a0a5e] text-white rounded-full items-center justify-center transition-all z-30 backdrop-blur-sm shadow-lg active:scale-90"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>

    <div class="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:gap-2 bg-[#0a0a5e]/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full z-40 border border-white/20">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        @click="goToSlide(index)"
        class="rounded-full transition-all duration-500 cursor-pointer shadow-sm"
        :class="[
          currentSlide === index ? 'w-6 md:w-8 bg-white' : 'w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-white/40 hover:bg-white/60',
          'h-1.5 md:h-2.5'
        ]"
      ></div>
    </div>


  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import bgLanding from '~/assets/images/landing-bg.jpg'
import bgAbout from '~/assets/images/about-bg.png'
import bgContact from '~/assets/images/cantact-bg.png'

const route = useRoute()
const currentSlide = ref(0)
const timer = ref<any>(null)
const slides = [bgLanding, bgAbout, bgContact]
const isLandingPage = computed(() => route.path === '/')

const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e: TouchEvent) => { touchStartX.value = e.targetTouches[0].clientX }
const handleTouchEnd = (e: TouchEvent) => { touchEndX.value = e.changedTouches[0].clientX; handleSwipe() }

const handleSwipe = () => {
  const diff = touchStartX.value - touchEndX.value
  if (Math.abs(diff) > 50) {
    diff > 0 ? nextSlide() : prevSlide()
  }
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
  resetTimer()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
  resetTimer()
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetTimer()
}

const resetTimer = () => {
  if (timer.value) clearInterval(timer.value)
  timer.value = setInterval(nextSlide, 7000)
}

onMounted(() => { if (process.client) resetTimer() })
onUnmounted(() => { if (timer.value) clearInterval(timer.value) })
</script>

<style scoped>
/* سیستم گرید برای روی هم انداختن تصاویر بدون Absolute */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.grid > img {
  grid-area: 1 / 1 / 2 / 2;
  will-change: opacity; /* بهینه‌سازی کارت گرافیک برای نرمی حرکت */
}
</style>