<template>
  <div class="min-h-screen pt-16 bg-[#f4f7fa] inte-font" dir="rtl">
    <header class="bg-white border-b  border-[#ebebeb] h-16 flex items-center justify-between px-6  top-0 left-0 w-full z-50 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#0a0a5e] rounded-full flex items-center justify-center text-white font-bold shadow-lg uppercase transition-transform hover:scale-105">
          {{ userInitial }}
        </div>
        <div>
          <h2 class="text-[#0a0a5e] font-bold text-sm leading-none">{{ userName }}</h2>
          <span class="text-[10px] text-green-500 font-medium flex items-center gap-1">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            آنلاین
          </span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button @click="showLogoutConfirm = true" class="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors group">
          <span class="text-xs font-bold hidden sm:inline">خروج</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>

    <div class="flex pt-4">
      <aside class="hidden md:flex w-64 bg-white border-l border-[#ebebeb] flex-col p-6 h-[calc(100vh-64px)] sticky top-16 justify-between">
        <nav class="space-y-2">
          <div class="p-3 bg-[#0a0a5e] text-white rounded-xl text-sm font-bold flex items-center gap-3 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            پیشخوان
          </div>
          <div v-for="item in ['رزروها', 'تراکنش‌ها', 'تنظیمات']" :key="item" 
               class="p-3 text-gray-400 hover:bg-[#ebebeb]/40 hover:text-[#0a0a5e] rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-3 text-right">
            <div class="w-1.5 h-1.5 rounded-full bg-[#ebebeb]"></div>
            {{ item }}
          </div>
        </nav>

        <button @click="showLogoutConfirm = true" class="mt-auto p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl text-sm font-bold transition-all flex items-center gap-3 border border-transparent hover:border-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          خروج از حساب
        </button>
      </aside>

      <main class="flex-1 p-6 md:p-10">
        <div class="max-w-5xl mx-auto">
          <div class="bg-gradient-to-l from-[#0a0a5e] to-[#2b2bb5] rounded-[30px] p-8 text-white relative overflow-hidden shadow-xl mb-8 animate-[fadeIn_0.5s_ease-out] text-right">
            <div class="relative z-10">
              <h1 class="text-2xl md:text-3xl font-bold mb-2">خوش آمدید، {{ userName }} عزیز</h1>
              
              <div class="flex flex-wrap gap-4 mt-4">
                <div class="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="text-xs font-medium opacity-90">{{ userEmail }}</span>
                </div>
                
                <div class="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span class="text-xs font-medium opacity-90 tracking-widest" dir="ltr">{{ userPhone }}</span>
                </div>
              </div>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-[-20px] bottom-[-20px] w-48 opacity-10 -rotate-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
            <div v-for="(label, index) in ['سفرهای من', 'اعتبار کیف پول', 'پیام‌ها']" :key="index"
                 class="bg-white p-6 rounded-2xl border border-[#ebebeb] shadow-sm hover:shadow-md transition-shadow group">
              <div class="flex justify-between items-start mb-4">
                <div class="w-10 h-10 bg-[#f4f7fa] rounded-lg flex items-center justify-center group-hover:bg-[#0a0a5e]/10 transition-colors">
                  <div class="w-5 h-5 bg-[#0a0a5e] rounded-sm"></div>
                </div>
                <span class="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full" dir="ltr">+ ۱۲٪</span>
              </div>
              <h3 class="text-gray-400 text-xs font-bold mb-1">{{ label }}</h3>
              <p class="text-[#0a0a5e] text-xl font-extrabold">۰</p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <Transition name="fade">
      <div v-if="showLogoutConfirm" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div @click="showLogoutConfirm = false" class="absolute inset-0 bg-[#031535]/30 backdrop-blur-sm"></div>
        <div class="relative bg-white w-full max-w-[340px] rounded-[24px] p-6 shadow-2xl text-center border border-[#ebebeb] animate-[fadeIn_0.2s_ease-out]">
          <h3 class="text-[#0a0a5e] font-bold text-lg mb-2">خروج از حساب</h3>
          <p class="text-gray-400 text-sm mb-6">آیا برای خروج مطمئن هستید؟</p>
          <div class="flex gap-3">
            <button @click="confirmLogout" class="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold text-xs hover:bg-red-600 transition-all">خروج</button>
            <button @click="showLogoutConfirm = false" class="flex-1 py-3 bg-[#f4f7fa] text-[#0a0a5e] rounded-xl font-bold text-xs border border-[#ebebeb]">انصراف</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted} from 'vue'
import { useRouter } from 'nuxt/app'

const router = useRouter()
const userName = ref('')
const userEmail = ref('')
const userPhone = ref('')
const showLogoutConfirm = ref(false)

const userInitial = computed(() => {
  return userName.value ? userName.value.charAt(0) : 'ک'
})

onMounted(() => {
  if (process.client) {
    // خواندن اطلاعات از LocalStorage
    userName.value = localStorage.getItem('display_name') || 'کاربر'
    userEmail.value = localStorage.getItem('user_email') || 'ثبت نشده'
    userPhone.value = localStorage.getItem('user_phone') || 'ثبت نشده'
    
    // تایید وضعیت ورود
    if (localStorage.getItem('isLoggedIn') !== 'true') { 
      router.push('/login') 
    }
  }
})

const confirmLogout = () => {
  // پاکسازی کامل تمام کلیدها
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('display_name')
  localStorage.removeItem('user_email')
  localStorage.removeItem('user_phone')
  
  if (process.client) { 
    window.dispatchEvent(new Event('auth-change')) 
  }
  showLogoutConfirm.value = false
  router.push('/login')
}
</script>