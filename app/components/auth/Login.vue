<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr font-sans">
    <div :class="{'shake': isShaking}" class="w-full max-w-[700px] md:h-[380px] mt-[50px] rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible text-right ">
      
      <div class="flex md:hidden w-full border-b border-gray-100 overflow-hidden rounded-t-2xl bg-gray-50/50">
        <NuxtLink to="/register" class="flex-1 py-4 flex flex-col items-center gap-1 transition-all duration-300 text-gray-400 opacity-60">
          <img src="~/assets/images/sign.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ثبت نام</span>
        </NuxtLink>
        <div class="flex-1 py-4 flex flex-col items-center gap-1 bg-white border-b-2 border-[#2b2bb5] text-[#2b2bb5]">
          <img src="~/assets/images/login.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ورود</span>
        </div>
      </div>

      <div class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center gap-8">
        <div class="absolute left-[-2px] top-[185px] w-1 h-14 bg-[#2b2bb5] rounded-full transition-all duration-300"></div>
        <NuxtLink to="/register" class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition">
          <img src="~/assets/images/sign.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ثبت نام</span>
        </NuxtLink>
        <div class="flex flex-col items-center text-[#0a0a5e] font-bold scale-90">
          <img src="~/assets/images/login.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ورود</span>
        </div>
      </div>

      <div class="hidden md:block w-[120px] my-[-15px] mx-3 bg-gradient-to-b from-[#031535] to-[#004282] rounded-[20px] shadow-lg overflow-hidden z-10">
        <img src="~/assets/images/plane.png" class="w-full h-full object-cover" />
      </div>

      <form @submit.prevent="handleLogin" class="flex-1 flex flex-col justify-center py-6 px-6 md:px-10 md:pr-2">
        <div class="mb-3 text-right">
          <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px]" style="text-shadow: 0.5px 0 0 #0a0a5e, -0.5px 0 0 #0a0a5e;">  ایمیل</label>
          <input 
            v-model="form.email" 
            type="email" 
            dir="ltr" 
            placeholder="example@mail.com" 
            class="w-full h-12 rounded-full border border-gray-200 px-4 text-[15px] outline-none focus:border-[#0a0a5e] bg-[#ebebeb]/40 transition-all"
          />
        </div>

        <div class="mb-3 text-right">
          <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px]" style="text-shadow: 0.5px 0 0 #0a0a5e, -0.5px 0 0 #0a0a5e;">رمز عبور</label >
          <div class="relative">
            <input 
              v-model="form.password" 
              :type="showPassword ? 'text' : 'password'" 
              dir="ltr" 
              placeholder="••••" 
              class="w-full h-12 rounded-full border border-gray-200 pl-12 pr-4 text-[15px] outline-none focus:border-[#0a0a5e] bg-[#ebebeb]/40  transition-all"
            />
            <button 
              type="button" 
              @click="showPassword = !showPassword"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a0a5e] transition-colors"
            >
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
               <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.413 8.242 7.291 4.5 12 4.5c4.686 0 8.573 3.742 9.964 7.178.07.242.07.485 0 .727C20.587 15.758 16.699 19.5 12 19.5c-4.687 0-8.574-3.742-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex justify-between items-center text-[10px] mb-3 px-2 text-right">
            <NuxtLink to="/forgetPassword" class="text-[#0a0a5e] hover:underline font-bold">
              فراموشی رمز عبور
            </NuxtLink>
          <label class="flex items-center gap-1.5 cursor-pointer text-[#0a0a5e] font-bold">
            <span>مرا به خاطر بسپار</span>
            <input type="checkbox" v-model="form.rememberMe" class="hidden peer">
            <div class="w-3.5 h-3.5 border-2 border-[#2b2bb5] rounded-[3px] relative peer-checked:bg-[#2b2bb5] after:content-['✔'] after:absolute after:text-white after:text-[8px] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:hidden peer-checked:after:block"></div>
          </label>
        </div>

        <p v-if="error" class="text-red-500 text-[11px] text-center mb-2 font-bold">{{ error }}</p>

        <button type="submit" :disabled="isLoading" class="w-full h-12 bg-[#0b0b54] text-white text-base font-bold rounded-lg hover:bg-[#15158a] transition-all active:scale-95 shadow-md flex items-center justify-center">
          <span v-if="!isLoading">ورود</span>
          <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

const error = ref('')
const isShaking = ref(false)
const isLoading = ref(false)
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const mockUsers = [
  { email: 'erd@gmail.com', password: '1234', username: 'ershad', phone: '09157962833' },
  { email: 'ali@gmail.com', password: '1111', username: 'علی', phone: '09123456789' }
]

onMounted(() => {
  if (process.client) {
    const savedEmail = localStorage.getItem('userEmail')
    if (savedEmail) {
      form.email = savedEmail
      form.rememberMe = true
    }
  }
})

const handleLogin = async () => {
  error.value = ''
  
  if (!form.email || !form.password) {
    error.value = 'لطفاً ایمیل و رمز را وارد کنید'
    triggerShake()
    return
  }

  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))

  // --- منطق جدید برای هماهنگی با فراموشی رمز ---
  const changedPasswords = JSON.parse(localStorage.getItem('mock_passwords') || '{}')
  
  const foundUser = mockUsers.find(u => {
    // اگر رمزی در localStorage تغییر کرده بود، آن را ملاک قرار بده، در غیر این صورت رمز پیش‌فرض
    const effectivePassword = changedPasswords[u.email] || u.password
    return u.email === form.email && effectivePassword === form.password
  })
  // ------------------------------------------

  if (foundUser) {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('display_name', foundUser.username)
    localStorage.setItem('user_email', foundUser.email)
    localStorage.setItem('user_phone', foundUser.phone)
    
    if (form.rememberMe) {
      localStorage.setItem('userEmail', form.email)
    } else {
      localStorage.removeItem('userEmail')
    }

    if (process.client) {
      window.dispatchEvent(new Event('auth-change'))
    }

    isLoading.value = false
    window.location.href = '/dashboard'
  } else {
    isLoading.value = false
    error.value = 'ایمیل یا رمز عبور اشتباه است'
    triggerShake()
  }
}

const triggerShake = () => {
  isShaking.value = true
  setTimeout(() => isShaking.value = false, 500)
}
</script>

<style scoped>
@keyframes fadeIn { 
  from { opacity: 0; transform: translateY(10px); } 
  to { opacity: 1; transform: translateY(0); } 
}
@keyframes shake { 
  10%, 90% { transform: translate3d(-1px, 0, 0); } 
  20%, 80% { transform: translate3d(2px, 0, 0); } 
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 
}
.shake { 
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; 
}
</style>