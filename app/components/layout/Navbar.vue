<template>
  <header 
    class="fixed top-0 left-0 w-full z-[100] dir-rtl font-sans transition-all duration-300 shadow-sm border-b border-white/20"
    :class="[isSearchOpen ? 'h-[120px] md:h-[52px] bg-white' : 'h-[52px] bg-white/60 backdrop-blur-md']"
  >
    <div class="w-full flex items-center justify-between px-4 md:px-10 py-1 h-[52px]">
      
      <div class="flex items-center gap-3">
        <NuxtLink 
          :key="isLoggedIn"
          :to="isLoggedIn ? '/dashboard' : '/login'" 
          class="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-sm hover:bg-gray-50 transition text-slate-700 shrink-0"
        >
          <span class="text-sm font-bold">
            {{ isLoggedIn ? 'پنل کاربری' : 'ورود / ثبت‌نام' }}
          </span>
          <img v-if="!isLoggedIn" src="~/assets/images/prof.png" alt="login" class="h-5 w-5 opacity-70">
          <div v-else class="w-6 h-6 bg-[#0a0a5e] text-white rounded-md flex items-center justify-center text-[10px] font-bold pt-[2px]">
            {{ userInitial }}
          </div>
        </NuxtLink>

        <div class="w-[1.5px] h-5 bg-[#ebebeb] hidden xs:block"></div>

        <div class="flex items-center relative">
          <button @click="isSearchOpen = !isSearchOpen" class="p-1.5 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
            <img 
              v-if="!isSearchOpen" 
              src="~/assets/images/search.png" 
              alt="Search" 
              class="w-6 h-6 object-contain opacity-70"
            >
            <img 
              v-else 
              src="~/assets/images/x.webp" 
              alt="Close" 
              class="w-6 h-6 object-contain"
            >
          </button>

          <div 
            class="hidden md:flex items-center overflow-hidden transition-all duration-500 ease-in-out h-9"
            :class="[isSearchOpen ? 'max-w-[320px] opacity-100 mr-2' : 'max-w-0 opacity-0']"
          >
            <div class="relative flex items-center w-[300px]">
              <input 
                type="text" 
                placeholder="دنبال چی می گردی؟" 
                class="w-full h-8 bg-gray-100 border border-gray-200 rounded-lg pr-4 pl-12 text-xs outline-none focus:border-[#0a0a5e] transition-colors"
              >
              <button class="absolute left-1 bg-[#0a0a5e] text-white text-[10px] px-2 py-1 rounded-md hover:bg-blue-900 transition-colors">
                جستجو
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 flex-1 justify-end">
        <nav class="hidden lg:flex items-center">
          <ul class="flex flex-row-reverse items-center text-slate-800 font-medium text-[14px]">
            <li class="px-3 hover:text-teal-600 transition"><NuxtLink to="/">خانه</NuxtLink></li>
            <li class="px-3 border-r border-[#ebebeb] hover:text-teal-600 transition"><NuxtLink to="/capital">تامین سرمایه</NuxtLink></li>
            <li class="px-3 border-r border-[#ebebeb] hover:text-teal-600 transition"><NuxtLink to="/about">درباره ما</NuxtLink></li>
            <li class="px-3 border-r border-[#ebebeb] hover:text-teal-600 transition"><NuxtLink to="/contact">ارتباط با ما</NuxtLink></li>
          </ul>
        </nav>

        <div class="flex items-center mr-2">
          <img src="~/assets/images/landing-bg.jpg" alt="Logo" class="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border border-gray-200">
        </div>

        <button @click.stop="isOpen = !isOpen" class="lg:hidden p-2 text-slate-800 hover:bg-gray-100 rounded-md transition relative z-[110]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <transition name="search-slide">
      <div v-if="isSearchOpen" class="md:hidden px-4 pb-4 bg-white">
        <div class="w-full h-[1px] bg-[#ebebeb] mb-3"></div>
        <div class="flex gap-2">
          <input 
            type="text" 
            placeholder="دنبال چی می گردی؟" 
            class="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-[#0a0a5e]"
          >
          <button class="bg-[#0a0a5e] text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition-transform">
            جستجو
          </button>
        </div>
      </div>
    </transition>

    <transition name="fade-slide">
      <div v-if="isOpen" class="lg:hidden fixed inset-x-0 top-[52px] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl z-[100]">
        <ul class="flex flex-col p-4 text-right text-slate-800 font-medium">
          <li><NuxtLink to="/" class="block p-3 hover:bg-gray-50 rounded-lg" @click="isOpen = false">خانه</NuxtLink></li>
          <li><NuxtLink to="/capital" class="block p-3 hover:bg-gray-50 rounded-lg" @click="isOpen = false">تامین سرمایه</NuxtLink></li>
          <li><NuxtLink to="/about" class="block p-3 hover:bg-gray-50 rounded-lg" @click="isOpen = false">درباره ما</NuxtLink></li>
          <li><NuxtLink to="/contact" class="block p-3 hover:bg-gray-50 rounded-lg" @click="isOpen = false">ارتباط با ما</NuxtLink></li>
          <li class="border-t border-gray-100 mt-2">
            <NuxtLink :to="isLoggedIn ? '/dashboard' : '/login'" class="block p-3 text-blue-600 font-bold" @click="isOpen = false">
               {{ isLoggedIn ? 'پنل کاربری' : 'ورود / ثبت‌نام' }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRoute } from 'nuxt/app'

const isOpen = ref(false)
const isSearchOpen = ref(false)
const isLoggedIn = ref(false)
const userName = ref('')
const route = useRoute()

/** بررسی وضعیت احراز هویت */
const checkAuth = () => {
  if (process.client) {
    const auth = localStorage.getItem('is_auth')
    const name = localStorage.getItem('user_name')
    isLoggedIn.value = auth === 'true'
    userName.value = name || ''
  }
}

/** نام کاربر برای آواتار */
const userInitial = computed(() => userName.value ? userName.value.charAt(0).toUpperCase() : 'U')

/** نظارت بر تغییر مسیر برای ریست کردن وضعیت‌ها */
watch(() => route.fullPath, () => {
  checkAuth()
  isSearchOpen.value = false
  isOpen.value = false
})

onMounted(() => {
  checkAuth()
  window.addEventListener('auth-change', checkAuth)
  window.addEventListener('storage', checkAuth)
})

onBeforeUnmount(() => {
  window.removeEventListener('auth-change', checkAuth)
  window.removeEventListener('storage', checkAuth)
})
</script>

<style scoped>
/* انیمیشن باز شدن منو */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

/* انیمیشن کشویی سرچ موبایل */
.search-slide-enter-active, .search-slide-leave-active { transition: all 0.3s ease-out; }
.search-slide-enter-from, .search-slide-leave-to { opacity: 0; transform: translateY(-15px); }

/* ترنزیشن نرم برای تغییر ارتفاع هدر */
header {
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>