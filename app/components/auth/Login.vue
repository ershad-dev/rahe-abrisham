<!-- 
  ⚠️ فایل تستی –   شبیه‌سازی فلو ورود کاربر
  این کامپوننت در مرحله پروداکشن باید با احراز هویت واقعی سرور جایگزین شود.
-->

<script setup lang="ts">
/**
 * صفحه ورود (Login Page)
 * در حال حاضر نقش دمو دارد: لاگین با داده‌های ساختگی (mockUsers)،
 * ارسال ایمیل به مرحله OTP، و ذخیره بخشی از اطلاعات در لوکال استوریج فقط برای تست.
 */

import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'nuxt/app'

// --- ابزارهای مسیر‌یابی برای انتقال بین صفحات (مثلاً otp/register)
const router = useRouter()


// --- تعریف ساختار داده فرم 
interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

// --- ری اکتیو استیت برای فرم ورودی کاربر
const form = reactive<LoginForm>({
  email: '',
  password: '',
  rememberMe: false
})

// --- کنترل‌های عمومی وضعیت صفحه
const error = ref<string>('')      // پیام خطا
const isShaking = ref<boolean>(false) // حالت انیمیشن خطا
const isLoading = ref<boolean>(false) // حالت لودینگ هنگام لاگین

// --- کاربران تستی (Mock) فقط برای شبیه‌سازی فلو
const mockUsers = [
  { email: 'erd@gmail.com', password: '1234' },
  { email: 'ali@gmail.com', password: '1111' },
  { email: 'mahdi@gmail.com', password: '2222' },
  { email: 'mobina@gmail.com', password: '3333' }
]

// --- در اولین بار، ایمیل ذخیره شده در لوکال استوریج بازیابی می‌شود (برای ری ممبر می)
onMounted(() => {
  const savedEmail = localStorage.getItem('userEmail')
  if (savedEmail) {
    form.email = savedEmail
    form.rememberMe = true
  }
})

// --- توابع انیمیشن خطا هنگام لاگین ناموفق
const triggerErrorAnimation = () => {
  isShaking.value = true
  setTimeout(() => (isShaking.value = false), 500)
}

/**
 * تابع اصلی ورود کاربر
 * ۱. اعتبارسنجی اولیه فیلدها
 * ۲. شبیه‌سازی تأخیر شبکه (setTimeout)
 * ۳. بررسی کاربر در mockUsers
 * ۴. هدایت به صفحه OTP در صورت موفقیت
 */
const handleLogin = async () => {
  error.value = ''

  // --- بررسی اولیه: ایمیل و رمز باید پر باشند
  if (!form.email || !form.password) {
    error.value = 'لطفاً ایمیل و رمز عبور را وارد کنید'
    triggerErrorAnimation()
    return
  }

  // --- شروع لودینگ
  isLoading.value = true

  try {
    // --- تأخیر مصنوعی برای شبیه‌سازی درخواست به سرور
    await new Promise(resolve => setTimeout(resolve, 1000))

    // --- بررسی کاربر در لیست تستی
    const foundUser = mockUsers.find(
      u => u.email === form.email.trim().toLowerCase() && u.password === form.password
    )

    if (foundUser) {
      // ذخیره اطلاعات برای مرحله او تی پی
      localStorage.setItem('pending_user_email', foundUser.email)

      // --- در صورت فعال بودن (ری ممبر می)، ایمیل ذخیره شود
      if (form.rememberMe) {
        localStorage.setItem('userEmail', form.email.trim())
      } else {
        localStorage.removeItem('userEmail')
      }

      // --- هدایت به صفحه OTP
      router.push('/otp')
    } else {
      // --- درصورت لاگین ناموفق
      error.value = 'ایمیل یا رمز عبور اشتباه است'
      triggerErrorAnimation()
    }
  } catch (err) {
    // --- درصورت بروز خطای پیش‌بینی‌نشده
    error.value = 'خطایی در سیستم رخ داده است'
    triggerErrorAnimation()
  } finally {
    // --- در انتها حالت لودینگ خاموش شود
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr font-sans"
  >
    <!-- محفظه اصلی فرم  -->
    <div
      :class="{'shake': isShaking}"
      class="w-full max-w-[700px] md:h-[380px] bg-white rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible text-right"
    >
      <!-- تب‌های بالا مخصوص موبایل -->
      <div class="flex md:hidden w-full border-b border-gray-100 overflow-hidden rounded-t-2xl bg-gray-50/50">
        <!-- تب ثبت‌نام -->
        <NuxtLink
          to="/register"
          class="flex-1 py-4 flex flex-col items-center gap-1 transition-all duration-300 text-gray-400 opacity-60"
        >
          <img src="~/assets/images/sign.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ثبت نام</span>
        </NuxtLink>

        <!-- تب فعال ورود -->
        <div
          class="flex-1 py-4 flex flex-col items-center gap-1 bg-white border-b-2 border-[#2b2bb5] text-[#2b2bb5]"
        >
          <img src="~/assets/images/login.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ورود</span>
        </div>
      </div>

      <!-- منوی کناری دسکتاپ -->
      <div
        class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center gap-8"
      >
        <div
          class="absolute left-[-2px] top-[185px] w-1 h-14 bg-[#2b2bb5] rounded-full transition-all duration-300"
        ></div>
        <NuxtLink
          to="/register"
          class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition"
        >
          <img src="~/assets/images/sign.png" class="w-6 h-6 mb-1" alt="ثبت نام" />
          <span class="text-[11px]">ثبت نام</span>
        </NuxtLink>
        <div class="flex flex-col items-center text-[#0a0a5e] font-bold scale-90">
          <img src="~/assets/images/login.png" class="w-6 h-6 mb-1" alt="ورود" />
          <span class="text-[11px]">ورود</span>
        </div>
      </div>

      <!-- تصویر  بین منو و فرم -->
      <div class="hidden md:block w-[120px] my-[-15px] mx-3 bg-gradient-to-b from-[#031535] to-[#004282] rounded-[20px] shadow-lg overflow-hidden z-10">
        <img src="~/assets/images/plane.png" class="w-full h-full object-cover" />
      </div>

      <!-- فرم ورود -->
      <form @submit.prevent="handleLogin" class="flex-1 flex flex-col justify-center py-6 px-6 md:px-10 md:pr-2">
        <!-- فیلد ایمیل -->
        <div class="mb-3">
          <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px]">ایمیل</label>
          <input
            v-model="form.email"
            type="email"
            dir="ltr"
            placeholder="example@mail.com"
            class="w-full h-10 rounded-full border border-gray-200 px-4 text-[13px] outline-none focus:border-[#0a0a5e] bg-[#ebebeb]/40 focus:bg-white transition-all placeholder:text-gray-300"
          />
        </div>

        <!-- فیلد رمز عبور -->
        <div class="mb-3">
          <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px]">رمز عبور</label>
          <input
            v-model="form.password"
            type="password"
            dir="ltr"
            placeholder="••••"
            class="w-full h-10 rounded-full border border-gray-200 px-4 text-[13px] outline-none focus:border-[#0a0a5e] bg-[#ebebeb]/40 focus:bg-white transition-all placeholder:text-gray-300"
          />
        </div>

        <!-- فراموشی رمز و گزینه "مرا به خاطر بسپار" -->
        <div class="flex justify-between items-center text-[10px] mb-3 px-2">
          <NuxtLink to="/forgot-password" class="text-[#0a0a5e] hover:underline">فراموشی رمز عبور</NuxtLink>

          <label class="flex items-center gap-1.5 cursor-pointer text-[#0a0a5e]">
            <span>مرا به خاطر بسپار</span>
            <input type="checkbox" v-model="form.rememberMe" class="hidden peer">
            <div class="w-3.5 h-3.5 border-2 border-[#2b2bb5] rounded-[3px] relative peer-checked:bg-[#2b2bb5] after:content-['✔'] after:absolute after:text-white after:text-[8px] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:hidden peer-checked:after:block"></div>
          </label>
        </div>

        <!-- نمایش پیام خطا درصورت وجود -->
        <p v-if="error" class="text-red-500 text-[11px] text-center mb-2 font-bold">
          {{ error }}
        </p>

        <!-- دکمه ورود -->
        <button 
          type="submit" 
          :disabled="isLoading" 
          class="w-full h-10 bg-[#0b0b54] text-white text-sm font-bold rounded-lg hover:bg-[#15158a] transition-all active:scale-95 shadow-md disabled:opacity-70 flex items-center justify-center"
        >
          <span v-if="!isLoading">ورود</span>
          <!-- لودینگ اسپینر هنگام فشار دادن دکمه -->
          <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* --- انیمیشن (فید این) برای نمایش ملایم فرم --- */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- انیمیشن شیک برای نمایش خطا --- */
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
