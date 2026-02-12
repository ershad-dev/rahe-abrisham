<script setup lang="ts">
/**
 * @component Register
 * @description مدیریت ثبت‌نام و انتقال هوشمند به مرحله تایید هویت (OTP)
 */

import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'nuxt/app'

// --- تعاریف و رابط‌ها ---
interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

const router = useRouter()
const route = useRoute()

const form = reactive<RegisterForm>({ 
  username: '', 
  email: '', 
  password: '' 
})

const error = ref<string>('')
const isShaking = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const fieldNames: (keyof RegisterForm)[] = ['username', 'email', 'password']
const fieldLabels: Record<keyof RegisterForm, string> = {
  username: 'نام کاربری',
  email: 'ایمیل',
  password: 'رمز عبور'
}

// --- متدها ---

const triggerError = (msg: string) => {
  error.value = msg
  isShaking.value = true
  setTimeout(() => isShaking.value = false, 500)
}

const submit = async () => {
  error.value = ''
  
  // بررسی پر بودن فیلدها
  const isFormInvalid = fieldNames.some(key => !form[key])
  if (isFormInvalid) {
    triggerError('لطفاً تمامی فیلدها را پر کنید')
    return
  }

  // بررسی فرمت ایمیل ساده
  if (!form.email.includes('@')) {
    triggerError('لطفاً یک ایمیل معتبر وارد کنید')
    return
  }

  isLoading.value = true
  
  try {
    // شبیه‌سازی انتظار برای پاسخ سرور
    await new Promise(resolve => setTimeout(resolve, 1200))

    // ذخیره ایمیل کاربر جدید برای استفاده در OTP و داشبورد
    localStorage.setItem('pending_user_email', form.email.toLowerCase())
    
    // انتقال به صفحه تایید کد
    await router.push('/otp')
  } catch (err) {
    error.value = 'خطایی در ثبت‌نام رخ داد. دوباره تلاش کنید.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr font-sans">
    
    <div :class="{'shake': isShaking}" class="w-full max-w-[700px] md:h-[380px] bg-white rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible">
      
      <div class="flex md:hidden w-full border-b border-gray-100 overflow-hidden rounded-t-2xl bg-gray-50/50">
        <NuxtLink 
          to="/register" 
          class="flex-1 py-4 flex flex-col items-center gap-1 transition-all duration-300 bg-white border-b-2 border-[#2b2bb5] text-[#2b2bb5]"
        >
          <img src="~/assets/images/plane.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ثبت نام</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/login" 
          class="flex-1 py-4 flex flex-col items-center gap-1 transition-all duration-300 text-gray-400 opacity-60"
        >
          <img src="~/assets/images/plane.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ورود</span>
        </NuxtLink>
      </div>

      <div class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center gap-8">
        <div class="absolute left-[-2px] top-[115px] w-1 h-14 bg-[#2b2bb5] rounded-full transition-all duration-500"></div>
        
        <div class="flex flex-col items-center text-[#0a0a5e] font-bold scale-90 cursor-default">
          <img src="~/assets/images/plane.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ثبت نام</span>
        </div>
        
        <NuxtLink 
          to="/login" 
          class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition-all duration-300 group"
        >
          <img src="~/assets/images/plane.png" class="w-6 h-6 mb-1 group-hover:-translate-y-1 transition-transform" />
          <span class="text-[11px] font-medium">ورود</span>
        </NuxtLink>
      </div>

      <div class="hidden md:block w-[120px] my-[-15px] mx-3 bg-gradient-to-b from-[#031535] to-[#004282] rounded-[20px] shadow-lg overflow-hidden z-10">
        <img src="~/assets/images/plane.png" class="w-full h-full object-cover shadow-inner" />
      </div>

      <form @submit.prevent="submit" class="flex-1 flex flex-col justify-center py-6 px-6 md:px-10 md:pr-2">
        <div v-for="field in fieldNames" :key="field" class="mb-3">
          <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px] text-right">
            {{ fieldLabels[field] }}
          </label>
          <input 
            v-model="form[field]" 
            :type="field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'"
            class="w-full h-10 rounded-full border border-gray-200 px-4 text-[13px] outline-none focus:border-[#0a0a5e] transition-all bg-[#ebebeb]/40 focus:bg-white placeholder:text-gray-300"
            :dir="field !== 'username' ? 'ltr' : 'rtl'"
            :placeholder="field === 'email' ? 'example@mail.com' : ''"
          />
        </div>

        <p v-if="error" class="text-red-500 text-[11px] text-center mb-1 font-bold animate-pulse">{{ error }}</p>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full h-10 bg-[#0b0b54] text-white text-sm font-bold rounded-lg hover:bg-[#15158a] transition-all active:scale-95 mt-2 shadow-md disabled:opacity-70 flex items-center justify-center overflow-hidden"
        >
          <span v-if="!isLoading">تایید و ثبت نام</span>
          <div v-else class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span class="text-[12px]">در حال پردازش...</span>
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
.shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
</style>