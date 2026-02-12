<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const error = ref('')
const isShaking = ref(false)
const isLoading = ref(false)

// ۱. بازیابی داده‌ها هنگام لود صفحه
onMounted(() => {
  const savedEmail = localStorage.getItem('userEmail')
  if (savedEmail) {
    form.email = savedEmail
    form.rememberMe = true
  }
})

const handleLogin = async () => {
  error.value = ''

  if (!form.email || !form.password) {
    error.value = 'لطفاً ایمیل و رمز عبور را وارد کنید'
    isShaking.value = true
    setTimeout(() => (isShaking.value = false), 500)
    return
  }

  isLoading.value = true

  try {
    // ۲. منطق اصلی "مرا به خاطر بسپار"
    if (form.rememberMe) {
      // اگر تیک خورده بود، ایمیل را ذخیره کن
      localStorage.setItem('userEmail', form.email)
    } else {
      // اگر تیک نداشت، اطلاعات قبلی را پاک کن
      localStorage.removeItem('userEmail')
    }

    // شبیه‌سازی درخواست به سرور
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('ورود موفقیت‌آمیز')
    router.push('/') 
  } catch (e) {
    error.value = 'خطایی در ورود رخ داد'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr font-sans">
    
    <div :class="{'shake': isShaking}" class="w-full max-w-[700px] md:h-[380px] bg-white rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible">
      
      <div class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center gap-8">
        <div class="absolute left-[-2px] top-[185px] w-1 h-14 bg-[#2b2bb5] rounded-full transition-all"></div>
        
        <NuxtLink to="/register" class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition">
          <img src="~/assets/images/plane.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ثبت نام</span>
        </NuxtLink>

        <div class="flex flex-col items-center text-[#0a0a5e] font-bold scale-90">
          <img src="~/assets/images/plane.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ورود</span>
        </div>
      </div>

      <div class="hidden md:block w-[120px] my-[-15px] mx-3 bg-gradient-to-b from-[#031535] to-[#004282] rounded-[20px] shadow-lg overflow-hidden z-10">
        <img src="~/assets/images/plane.png" class="w-full h-full object-cover" />
      </div>

      <form @submit.prevent="handleLogin" class="flex-1 flex flex-col justify-center py-6 px-6 md:px-10 md:pr-2">
        
        <div class="mb-3 text-right">
          <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px]">ایمیل</label>
          <input v-model="form.email" type="email" dir="ltr"
            class="w-full h-10 rounded-full border border-gray-200 px-4 text-[13px] outline-none focus:border-[#0a0a5e] bg-gray-50/30 transition-all" />
        </div>
        
        <div class="mb-3 text-right">
          <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px]">رمز عبور</label>
          <input v-model="form.password" type="password" dir="ltr"
            class="w-full h-10 rounded-full border border-gray-200 px-4 text-[13px] outline-none focus:border-[#0a0a5e] bg-gray-50/30 transition-all" />
        </div>

        <div class="flex justify-between items-center text-[10px] mb-3 px-2">
          <NuxtLink to="/forgot-password" class="text-[#0a0a5e] hover:underline">فراموشی رمز عبور</NuxtLink>
          
          <label class="flex items-center gap-1.5 cursor-pointer text-[#0a0a5e]">
            <span>مرا به خاطر بسپار</span>
            <input type="checkbox" v-model="form.rememberMe" class="hidden peer">
            <div class="w-3.5 h-3.5 border-2 border-[#2b2bb5] rounded-[3px] relative peer-checked:bg-[#2b2bb5] 
                        after:content-['✔'] after:absolute after:text-white after:text-[8px] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:hidden peer-checked:after:block">
            </div>
          </label>
        </div>

        <p v-if="error" class="text-red-500 text-[11px] text-center mb-1 font-bold">{{ error }}</p>

        <button type="submit" :disabled="isLoading" 
          class="w-full h-10 bg-[#0b0b54] text-white text-sm font-bold rounded-lg hover:bg-[#15158a] transition-all active:scale-95 shadow-md disabled:opacity-70">
          {{ isLoading ? 'در حال بررسی...' : 'ورود' }}
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