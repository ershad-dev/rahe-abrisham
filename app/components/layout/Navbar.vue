<template>
  <header class="fixed top-0 left-0 w-full z-[100] dir-rtl font-sans">
    <div class="w-full flex items-center justify-between bg-white/60 backdrop-blur-md px-4 md:px-10 py-1 shadow-sm border-b border-white/20">
      
      <div class="flex items-center">
        <NuxtLink 
          :key="isLoggedIn"
          :to="isLoggedIn ? '/dashboard' : '/login'" 
          class="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-sm hover:bg-gray-50 transition text-slate-700"
        >
          <span class="text-sm font-bold">
            {{ isLoggedIn ? 'پنل کاربری' : 'ورود / ثبت‌نام' }}
          </span>
          <img 
            v-if="!isLoggedIn" 
            src="~/assets/images/prof.png" 
            alt="login"  
            class="h-5 w-5 opacity-70"
          >
          <div v-else class="w-6 h-6 bg-[#0a0a5e] text-white rounded-md flex items-center justify-center text-[10px] font-bold">
            {{ userInitial }}
          </div>
        </NuxtLink>
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
const isLoggedIn = ref(false)
const userName = ref('')
const route = useRoute()

const checkAuth = () => {
  if (process.client) {
    const auth = localStorage.getItem('is_auth')
    const name = localStorage.getItem('user_name')
    isLoggedIn.value = auth === 'true'
    userName.value = name || ''
  }
}

const userInitial = computed(() => userName.value ? userName.value.charAt(0).toUpperCase() : 'U')

// گوش دادن به تغییرات مسیر
watch(() => route.fullPath, () => checkAuth())

onMounted(() => {
  checkAuth()
  // گوش دادن به رویداد خروج دستی از صفحات دیگر
  window.addEventListener('auth-change', checkAuth)
  window.addEventListener('storage', checkAuth)
})

onBeforeUnmount(() => {
  window.removeEventListener('auth-change', checkAuth)
  window.removeEventListener('storage', checkAuth)
})
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>