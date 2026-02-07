<template>
  <header class="fixed top-0 left-0 w-full z-50 dir-rtl">
    <div class="w-full flex items-center justify-between bg-white/60 backdrop-blur-md px-4 md:px-8 py-2 shadow-sm border-b border-white/20">
      
      <div class="flex items-center">
        <button @click="isOpen = !isOpen" class="lg:hidden p-2 ml-2 text-slate-800 hover:bg-gray-100 rounded-md transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="ml-4 flex items-center">
          <img 
            src="assets/images/bg.jpg" 
" 
            alt="Logo" 
            class="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
          >
        </div>
        
        <ul class="hidden lg:flex items-center text-slate-800 font-medium text-sm">
          <li class="px-3 border-l border-gray-400/30 hover:text-blue-700 transition"><NuxtLink to="/">خانه</NuxtLink></li>
          <li class="px-3 border-l border-gray-400/30 hover:text-blue-700 transition"><NuxtLink to="/capital">تامین سرمایه</NuxtLink></li>
          <li class="px-3 border-l border-gray-400/30 hover:text-blue-700 transition"><NuxtLink to="/about">درباره ما</NuxtLink></li>
          <li class="px-3 border-l border-gray-400/30 hover:text-blue-700 transition"><NuxtLink to="/contact">ارتباط با ما</NuxtLink></li>
          <li class="px-3 hover:text-blue-700 transition"><NuxtLink to="/order">ثبت سفارش کالا</NuxtLink></li>
        </ul>
      </div>

      <div class="flex items-center bg-white rounded-full overflow-hidden shadow-inner w-48 sm:w-64 md:w-80">
        <input 
          type="text" 
          placeholder="جستجو" 
          class="w-full bg-transparent border-none py-1 px-4 text-right text-sm outline-none placeholder-gray-400"
        >
        <button class="bg-gradient-to-r from-[#AAA4A4] to-[#D23729] p-2 px-4 text-white hover:opacity-90 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      
    </div>

    <transition name="fade-slide">
      <div v-if="isOpen" class="lg:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl">
        <ul class="flex flex-col p-2 text-right text-slate-800 font-medium">
          <li><NuxtLink to="/" class="block p-4 hover:bg-gray-50 rounded-lg" @click="isOpen = false">خانه</NuxtLink></li>
          <li><NuxtLink to="/capital" class="block p-4 hover:bg-gray-50 rounded-lg" @click="isOpen = false">تامین سرمایه</NuxtLink></li>
          <li><NuxtLink to="/about" class="block p-4 hover:bg-gray-50 rounded-lg" @click="isOpen = false">درباره ما</NuxtLink></li>
          <li><NuxtLink to="/contact" class="block p-4 hover:bg-gray-50 rounded-lg" @click="isOpen = false">ارتباط با ما</NuxtLink></li>
          <li><NuxtLink to="/order" class="block p-4 hover:bg-gray-50 rounded-lg font-bold text-blue-600" @click="isOpen = false">ثبت سفارش کالا</NuxtLink></li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<style scoped>
.dir-rtl {
  direction: rtl;
}

/* انیمیشن برای منوی همبرگری */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>