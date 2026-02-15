<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr font-sans">
    
    <div :class="{'shake': isShaking}" class="w-full max-w-[700px] md:min-h-[440px] bg-white rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible">
      
      <div class="flex md:hidden w-full border-b border-gray-100 overflow-hidden rounded-t-2xl bg-gray-50/50">
        <NuxtLink 
          to="/register" 
          class="flex-1 py-4 flex flex-col items-center gap-1 transition-all duration-300 bg-white border-b-2 border-[#2b2bb5] text-[#2b2bb5]"
        >
          <img src="~/assets/images/sign.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ثبت نام</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/login" 
          class="flex-1 py-4 flex flex-col items-center gap-1 transition-all duration-300 text-gray-400 opacity-60"
        >
          <img src="~/assets/images/login.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ورود</span>
        </NuxtLink>
      </div>

      <div class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center gap-8">
        <div class="absolute left-[-2px] top-[115px] w-1 h-14 bg-[#2b2bb5] rounded-full transition-all duration-500"></div>
        
        <div class="flex flex-col items-center text-[#0a0a5e] font-bold scale-90 cursor-default">
          <img src="~/assets/images/sign.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ثبت نام</span>
        </div>
        
        <NuxtLink 
          to="/login" 
          class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition-all duration-300 group"
        >
          <img src="~/assets/images/login.png" class="w-6 h-6 mb-1 group-hover:-translate-y-1 transition-transform" />
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
            :type="field === 'password' ? 'password' : (field === 'email' ? 'email' : (field === 'phone' ? 'tel' : 'text'))"
            class="w-full h-12 rounded-full border border-gray-200 px-4 text-[14px] outline-none focus:border-[#0a0a5e] transition-all bg-[#ebebeb]/40 focus:bg-white placeholder:text-gray-300"
            :dir="(field === 'username') ? 'rtl' : 'ltr'"
            :placeholder="field === 'email' ? 'example@mail.com (اختیاری)' : (field === 'phone' ? '09123456789' : '')"
            @input="field === 'phone' ? handlePhoneInput($event) : null"
          />
        </div>

        <p v-if="error" class="text-red-500 text-[11px] text-center mb-1 font-bold animate-pulse">
          {{ error }}
        </p>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full h-12 bg-[#0b0b54] text-white text-base font-bold rounded-lg hover:bg-[#15158a] transition-all active:scale-95 mt-2 shadow-md disabled:opacity-70 flex items-center justify-center overflow-hidden"
        >
          <span v-if="!isLoading">تایید و ثبت نام</span>
          <div v-else class="flex items-center gap-2">
            <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span class="text-[12px]">در حال پردازش...</span>
          </div>
        </button>
      </form>
    </div>
  </div>
</template>




<script setup lang="ts">


import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'nuxt/app'



/**
 * ساختار فرم ثبت‌نام
 * فقط برای مدیریت استیت در سمت فرانت
 */
interface RegisterForm {
  username: string;
  phone: string;
  email: string;
  password: string;
}

// روتر برای هدایت به او تی پی
const router = useRouter()

// استیت اصلی فرم ثبت‌نام
const form = reactive<RegisterForm>({ 
  username: '', 
  phone: '', 
  email: '', 
  password: '' 
})

// پیام خطا
const error = ref<string>('')

// فعال‌سازی انیمیشن شیک هنگام خطا
const isShaking = ref<boolean>(false)

// وضعیت لودینگ دکمه ارسال
const isLoading = ref<boolean>(false)

// ترتیب فیلدها برای رندر داینامیک
const fieldNames: (keyof RegisterForm)[] = ['username', 'phone', 'email', 'password']

// لیبل فارسی هر فیلد
const fieldLabels: Record<keyof RegisterForm, string> = {
  username: 'نام کاربری',
  phone: 'شماره موبایل',
  email: 'ایمیل',
  password: 'رمز عبور'
}

// --- متدها ---

/**
 * مدیریت ورودی شماره تلفن
 * فقط عدد و حداکثر ۱۱ رقم
 */
const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  // حذف هر چیزی که عدد نیست
  let value = input.value.replace(/\D/g, '');
  // محدودیت ۱۱ رقم
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  form.phone = value;
};

/**
 * نمایش خطا به همراه انیمیشن شیک
 */
const triggerError = (msg: string) => {
  error.value = msg
  isShaking.value = true
  setTimeout(() => isShaking.value = false, 500)
}

/**
 * ارسال فرم ثبت‌نام
 * شامل اعتبارسنجی ساده و انتقال به او تی پی
 */
const submit = async () => {
  error.value = ''
  
  // بررسی پر بودن فیلدهای ضروری
  if (!form.username || !form.phone || !form.password) {
    triggerError('لطفاً تمامی فیلدها را پر کنید')
    return
  }

  // بررسی طول شماره موبایل
  if (form.phone.length < 11) {
    triggerError('شماره موبایل باید ۱۱ رقم باشد')
    return
  }

  isLoading.value = true
  
// ... داخل تابع submit در فایل ثبت‌نام
try {
  await new Promise(resolve => setTimeout(resolve, 1200))

  // ذخیره اطلاعات برای استفاده در صفحه OTP
  localStorage.setItem('pending_user_phone', form.phone)
  
  // این خط را حتماً اضافه کن تا نام واقعی کاربر ذخیره شود
  localStorage.setItem('pending_display_name', form.username) 
  
  await router.push('/otp')
}

catch (err) {
    // خطای عمومی (تستی)
    error.value = 'خطایی در ثبت‌نام رخ داد. دوباره تلاش کنید.'
  } finally {
    isLoading.value = false
  }
}
</script>



<style scoped>
/* انیمیشن ورود کارت */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* انیمیشن خطا */
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
</style>