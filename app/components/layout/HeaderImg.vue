<template>
  <section 
    v-if="isLandingPage" 
    class="relative w-full h-auto overflow-hidden bg-white group mt-[45px]"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    
    <div class="relative w-full h-auto">
      <img 
        :src="slides[currentSlide]" 
        alt="Silk Road Logistics Slider" 
        class="w-full h-auto shadow-lg block transition-opacity duration-700 ease-in-out"
      />
      
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none"></div>
    </div>

    <button 
      @click="prevSlide" 
      class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0a0a5e]/40 hover:bg-[#0a0a5e] text-white rounded-full items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-30 backdrop-blur-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>

    <button 
      @click="nextSlide" 
      class="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0a0a5e]/10 hover:bg-[#0a0a5e] text-white rounded-full items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-30 backdrop-blur-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>

    <div class="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0a0a5e]/10 backdrop-blur-md px-4 py-2 rounded-full z-40 border border-white/20">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        @click="currentSlide = index"
        class="h-2.5 rounded-full transition-all duration-500 cursor-pointer shadow-sm"
        :class="currentSlide === index ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'"
      ></div>
    </div>

    <div class="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-[#ebebeb] to-transparent"></div>
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
const timer = ref<NodeJS.Timeout | null>(null)
const slides = [bgLanding, bgAbout, bgContact]
const isLandingPage = computed(() => route.path === '/')

// منطق Swipe
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.targetTouches[0].clientX
}

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].clientX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 50 // حداقل مقدار جابجایی برای تشخیص کشیدن
  const diff = touchStartX.value - touchEndX.value

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // کشیدن به سمت چپ (عکس بعدی)
      nextSlide()
    } else {
      // کشیدن به سمت راست (عکس قبلی)
      prevSlide()
    }
    // ریست کردن تایمر خودکار بعد از جابجایی دستی
    resetTimer()
  }
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const resetTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = setInterval(nextSlide, 7000)
  }
}

onMounted(() => {
  if (process.client) {
    timer.value = setInterval(nextSlide, 7000)
  }
})

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value)
})
</script>