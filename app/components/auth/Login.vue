<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr font-sans">
    <div :class="{'shake': isShaking}" class="w-full max-w-[700px] md:h-[380px] bg-white rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible text-right">
      
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
        <div class="mb-3">
          <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px]">شماره موبایل</label>
          <input 
            v-model="form.phone" 
            type="tel" 
            dir="ltr" 
            placeholder="09123456789" 
            class="w-full h-12 rounded-full border border-gray-200 px-4 text-[15px] outline-none focus:border-[#0a0a5e] bg-[#ebebeb]/40 focus:bg-white transition-all"
            @input="handlePhoneInput"
          />
        </div>

        <div class="mb-3">
          <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px]">رمز عبور</label>
          <input 
            v-model="form.password" 
            type="password" 
            dir="ltr" 
            placeholder="••••" 
            class="w-full h-12 rounded-full border border-gray-200 px-4 text-[15px] outline-none focus:border-[#0a0a5e] bg-[#ebebeb]/40 focus:bg-white transition-all"
          />
        </div>

        <div class="flex justify-between items-center text-[10px] mb-3 px-2">
          <NuxtLink to="/forgot-password" class="text-[#0a0a5e] hover:underline">فراموشی رمز عبور</NuxtLink>
          <label class="flex items-center gap-1.5 cursor-pointer text-[#0a0a5e]">
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
import { useRouter } from 'nuxt/app'

const router = useRouter()
const error = ref('')
const isShaking = ref(false)
const isLoading = ref(false)

// استیت فرم
const form = reactive({
  phone: '',
  password: '',
  rememberMe: false
})

/**
 * لیست کاربران تستی درخواستی شما
 */
const mockUsers = [
  { phone: '09157962833', password: '1234', username: 'erd' },
  { phone: '0912456789', password: '1111', username: 'ali' }
]

onMounted(() => {
  const savedPhone = localStorage.getItem('userPhone')
  if (savedPhone) {
    form.phone = savedPhone
    form.rememberMe = true
  }
})

// فیلتر کردن ورودی موبایل (فقط عدد و ۱۱ رقم)
const handlePhoneInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  let val = target.value.replace(/\D/g, '');
  if (val.length > 11) val = val.slice(0, 11);
  form.phone = val;
}

const handleLogin = async () => {
  error.value = ''
  
  if (!form.phone || !form.password) {
    error.value = 'لطفاً شماره موبایل و رمز را وارد کنید'
    isShaking.value = true; setTimeout(() => isShaking.value = false, 500);
    return
  }

  isLoading.value = true
  
  // شبیه‌سازی درخواست به سرور
  setTimeout(() => {
    isLoading.value = false
    
    // پیدا کردن کاربر در لیست تستی
    const foundUser = mockUsers.find(u => u.phone === form.phone && u.password === form.password)

    if (foundUser) {
      // ذخیره اطلاعات برای عبور از گارد صفحه OTP
      localStorage.setItem('pending_user_phone', foundUser.phone)
      localStorage.setItem('pending_display_name', foundUser.username)
      
      if (form.rememberMe) {
        localStorage.setItem('userPhone', form.phone)
      } else {
        localStorage.removeItem('userPhone')
      }
      
      // هدایت به صفحه تایید کد
      router.push('/otp')
    } else {
      error.value = 'شماره موبایل یا رمز عبور اشتباه است'
      isShaking.value = true
      setTimeout(() => isShaking.value = false, 500)
    }
  }, 1000)
}
</script>

<style scoped>
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes shake { 
  10%, 90% { transform: translate3d(-1px, 0, 0); } 
  20%, 80% { transform: translate3d(2px, 0, 0); } 
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 
}
.shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
</style>