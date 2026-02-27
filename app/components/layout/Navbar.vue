<template>
  <header 
    class="fixed top-0 left-0 w-full z-[100] transition-all duration-300 shadow-sm border-b border-white/20"
    :class="[isSearchOpen ? 'h-[120px] md:h-[52px] bg-white' : 'h-[52px] bg-white/60 backdrop-blur-md']"
  >
    <div class="w-full flex items-center justify-between px-4 md:px-10 py-1 h-[52px]" dir="ltr">
      
      <div class="flex items-center gap-3">
        <NuxtLink 
          :to="isLoggedIn ? '/profile' : '/login'" 
          class="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-50 transition text-slate-700 shrink-0"
        >
          <span class="text-[13px] font-bold">
            {{ isLoggedIn ? 'پنل کاربری' : 'ورود / ثبت‌نام' }}
          </span>
          
          <div v-if="isLoggedIn" class="w-7 h-7 bg-[#0b0b54] text-white rounded-md overflow-hidden flex items-center justify-center text-[11px] font-bold font-sans border border-gray-100 shadow-sm">
            <img v-if="userAvatar" :src="userAvatar" class="w-full h-full object-cover" />
            <span v-else>{{ userInitials }}</span>
          </div>
          
          <img v-else src="~/assets/images/prof.png" alt="login" class="h-5 w-5 opacity-70">
        </NuxtLink>

        <div class="w-[1.5px] h-5 bg-[#ebebeb] hidden xs:block"></div>
      </div>

      <div class="flex items-center gap-3 flex-1 justify-end">
        <nav class="hidden lg:flex items-center">
          <ul class="flex flex-row items-center text-slate-800 font-medium text-[14px]" dir="rtl">
            <li class="px-3 hover:text-[#0b0b54] transition"><NuxtLink to="/">خانه</NuxtLink></li>
            <li class="px-3 border-r border-[#ebebeb] hover:text-[#0b0b54] transition"><NuxtLink to="/capital">تامین سرمایه</NuxtLink></li>
            <li class="px-3 border-r border-[#ebebeb] hover:text-[#0b0b54] transition"><NuxtLink to="/about">درباره ما</NuxtLink></li>
            <li class="px-3 border-r border-[#ebebeb] hover:text-[#0b0b54] transition"><NuxtLink to="/contact">ارتباط با ما</NuxtLink></li>
          </ul>
        </nav>

        <div class="flex items-center mr-2">
          <NuxtLink to="/">
            <img src="~/assets/images/landing-bg.jpg" alt="Logo" class="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border border-gray-200">
          </NuxtLink>
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
      <div v-if="isOpen" class="lg:hidden fixed inset-x-0 top-[52px] bg-white border-b border-gray-200 shadow-xl z-[100]" dir="rtl">
        <ul class="flex flex-col p-4 text-right text-slate-800 font-medium">
          <li><NuxtLink to="/" class="block p-3 hover:bg-gray-50 rounded-lg" @click="isOpen = false">خانه</NuxtLink></li>
          <li><NuxtLink to="/capital" class="block p-3 hover:bg-gray-50 rounded-lg" @click="isOpen = false">تامین سرمایه</NuxtLink></li>
          <li><NuxtLink to="/about" class="block p-3 hover:bg-gray-50 rounded-lg" @click="isOpen = false">درباره ما</NuxtLink></li>
          <li><NuxtLink to="/contact" class="block p-3 hover:bg-gray-50 rounded-lg" @click="isOpen = false">ارتباط با ما</NuxtLink></li>
          <li class="border-t border-gray-100 mt-2">
            <NuxtLink :to="isLoggedIn ? '/profile' : '/login'" class="block p-3 text-[#0b0b54] font-bold" @click="isOpen = false">
               {{ isLoggedIn ? 'مشاهده پنل کاربری' : 'ورود / ثبت‌نام' }}
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
const userAvatar = ref(null)
const route = useRoute()

const checkAuth = () => {
  if (process.client) {
    const authStatus = localStorage.getItem('isLoggedIn')
    const storedName = localStorage.getItem('display_name')
    const storedAvatar = localStorage.getItem('user_avatar')
    
    isLoggedIn.value = authStatus === 'true'
    userName.value = storedName || ''
    userAvatar.value = storedAvatar || null
  }
}

const userInitials = computed(() => {
  if (!userName.value) return "?";
  const parts = userName.value.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return userName.value.substring(0, 2).toUpperCase();
})

watch(() => route.fullPath, () => {
  checkAuth()
  isSearchOpen.value = false
  isOpen.value = false
})

onMounted(() => {
  checkAuth()
  if (process.client) {
    window.addEventListener('auth-change', checkAuth)
    window.addEventListener('storage', (e) => {
      if (['isLoggedIn', 'display_name', 'user_avatar'].includes(e.key)) {
        checkAuth()
      }
    })
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('auth-change', checkAuth)
    window.removeEventListener('storage', checkAuth)
  }
})
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

header {
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.font-sans {
  font-family: 'Inter', ui-sans-serif, system-ui;
}
</style>