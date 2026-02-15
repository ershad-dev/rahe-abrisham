<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr font-sans">
    <div :class="{'shake': isShaking}" class="w-full max-w-[700px] md:h-[380px] bg-white rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible">
      <div class="flex md:hidden w-full border-b border-gray-100 overflow-hidden rounded-t-2xl bg-gray-50/50">
        <div class="flex-1 py-4 flex flex-col items-center gap-1 bg-white border-b-2 border-[#2b2bb5] text-[#2b2bb5]">
          <img src="~/assets/images/sign.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">تایید کد</span>
        </div>
        <NuxtLink to="/login" class="flex-1 py-4 flex flex-col items-center gap-1 text-gray-400 opacity-60">
          <img src="~/assets/images/login.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">برگشت</span>
        </NuxtLink>
      </div>

      <div class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center gap-8">
        <div class="absolute left-[-2px] top-[115px] w-1 h-14 bg-[#2b2bb5] rounded-full transition-all"></div>
        <div class="flex flex-col items-center text-[#0a0a5e] font-bold scale-90">
          <img src="~/assets/images/sign.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ثبت نام</span>
        </div>
        <NuxtLink to="/login" class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition">
          <img src="~/assets/images/login.png" class="w-6 h-6 mb-1 " />
          <span class="text-[11px]">ورود</span>
        </NuxtLink>
      </div>

      <div class="hidden md:block w-[120px] my-[-15px] mx-3 bg-gradient-to-b from-[#031535] to-[#004282] rounded-[20px] shadow-lg overflow-hidden z-10">
        <img src="~/assets/images/plane.png" class="w-full h-full object-cover" />
      </div>

      <div class="flex-1 flex flex-col justify-center py-6 px-6 md:px-10 md:pr-2 items-center text-center">
        <h2 class="text-[#0a0a5e] font-bold text-lg mb-1">تایید هویت</h2>
        <p class="text-gray-400 text-[11px] mb-6">کد ۶ رقمی ارسال شده به شماره همراه را وارد کنید</p>

        <div class="flex gap-2 mb-2" dir="ltr">
          <input 
            v-for="(_, i) in 6" :key="i"
            ref="inputs"
            v-model="otpValues[i]"
            type="text" 
            maxlength="1"
            inputmode="numeric" 
            @input="handleInput(i, $event)"
            @keydown="handleKeyDown(i, $event)"
            class="w-10 h-12 md:w-11 md:h-14 text-center text-xl font-bold border-2 border-[#ebebeb] rounded-xl outline-none transition-all bg-[#ebebeb]/40 focus:border-[#0a0a5e] focus:bg-white"
          />
        </div>

        <p class="text-red-500 text-[10px] h-4 mb-4 font-bold" :class="{ 'invisible': !errorMsg }">
          {{ errorMsg }}
        </p>

        <div class="w-full max-w-[280px] flex justify-between items-center mb-6 text-[11px]">
          <span :class="timer < 30 ? 'text-red-500' : 'text-[#0a0a5e]'" class="font-bold">
            {{ formatTime(timer) }}
          </span>
          <button @click="resendCode" :disabled="!showResend" class="transition-colors" :class="showResend ? 'text-[#2b2bb5] font-bold underline' : 'text-gray-300'">
            ارسال مجدد کد
          </button>
        </div>

        <button 
          @click="checkCode" 
          :disabled="otpValues.some(v => v === '') || isLoading" 
          class="w-full max-w-[280px] h-10 bg-[#0b0b54] text-white rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:bg-gray-300 flex items-center justify-center"
        >
          <span v-if="!isLoading">تایید و ادامه</span>
          <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </button>
      </div>
    </div>
    
    <Transition name="fade">
      <div v-if="modal.show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4 backdrop-blur-sm">
        <div class="bg-white p-6 rounded-2xl text-center max-w-[280px] w-full shadow-2xl">
          <h3 class="text-[#0a0a5e] font-bold text-base mb-2">{{ modal.title }}</h3>
          <p class="text-gray-500 text-xs mb-6">{{ modal.body }}</p>
          <button @click="modal.show = false" class="bg-[#0a0a5e] text-white py-2 rounded-lg w-full text-sm font-bold">متوجه شدم</button>
        </div>
      </div>
    </Transition>
  </div>
</template>




<script setup lang="ts">


import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'nuxt/app'

// router برای هدایت کاربر بعد از تایید
const router = useRouter()



// ساختار داده مودال پیام
interface ModalState {
  show: boolean;
  title: string;
  body: string;
}

// آرایه نگه‌دارنده ۶ رقم او تی پی
const otpValues = reactive<string[]>(['', '', '', '', '', ''])

// رفرنس اینپوت‌ها برای کنترل فوکوس
const inputs = ref<HTMLInputElement[]>([]) 

// تایمر اعتبار کد 
const timer = ref<number>(120)

// تعداد تلاش‌های ناموفق
const attempts = ref<number>(0)

// وضعیت منقضی شدن کد
const isExpired = ref<boolean>(false)

// وضعیت لودینگ هنگام بررسی کد
const isLoading = ref<boolean>(false)

// پیام خطای نمایشی
const errorMsg = ref<string>('')

// فعال بودن ارسال مجدد کد
const showResend = ref<boolean>(false)

// فعال‌سازی انیمیشن shake هنگام خطا
const isShaking = ref<boolean>(false)

// وضعیت مودال
const modal = reactive<ModalState>({ show: false, title: '', body: '' })

// نگه‌دارنده اینرول تایمر
let interval: any

//   ریست تایمر 
const startTimer = (duration: number) => {
  if (interval) clearInterval(interval)
  timer.value = duration
  isExpired.value = false
  showResend.value = false
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
      // بعد از ۶۰ ثانیه اجازه ارسال مجدد فعال می‌شود
      if (timer.value <= 60) showResend.value = true
    } else {
      isExpired.value = true
      clearInterval(interval)
    }
  }, 1000)
}

// تبدیل ثانیه به فرمت mm:ss
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// مدیریت ورود هر رقم او تی
const handleInput = async (index: number, e: Event) => {
  const target = e.target as HTMLInputElement
  const val = target.value

  // فقط عدد مجاز است
  if (!/^\d$/.test(val)) {
    otpValues[index] = ''
    return
  }

  errorMsg.value = ''

  // فوکوس خودکار به اینپوت بعدی
  if (val && index < 5) {
    inputs.value[index + 1].focus()
  }

  await nextTick()

  // اگر همه ارقام پر شدند، بررسی کد انجام شود
  if (otpValues.every(v => v !== '')) {
    checkCode()
  }
}

// مدیریت بک اسپیس برای برگشت فوکوس
const handleKeyDown = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
    inputs.value[index - 1].focus()
  }
}

// --- بخش اصلی: بررسی کد و مدیریت کاربران ---
const checkCode = async () => {
  if (isLoading.value) return

  // بررسی کامل بودن کد
  if (otpValues.some(v => v === '')) {
    errorMsg.value = "لطفاً کد ۶ رقمی را کامل وارد کنید"
    return
  }

  // محدودیت تعداد تلاش
  if (attempts.value >= 3) {
    openModal("دسترسی محدود", "تعداد تلاش‌های شما بیش از حد مجاز بود.")
    return
  }

  // بررسی منقضی شدن کد
  if (isExpired.value) {
    openModal("کد منقضی شده", "زمان استفاده از این کد به پایان رسیده است.")
    return
  }

  isLoading.value = true
  const code = otpValues.join('')

  // شبیه‌سازی درخواست به سرور
  setTimeout(() => {
    isLoading.value = false
    
    if (code === "123456") {
      // ۱. گرفتن موبایل و نام کاربری که در مرحله لاگین/ثبت‌نام ذخیره شده بود
      const pendingPhone = localStorage.getItem('pending_user_phone') || '09120000000';
      const displayName = localStorage.getItem('pending_display_name') || 'کاربر جدید';
      openModal("خوش آمدید", `${displayName} عزیز، هویت شما ... تایید شد.`);
      // ۲. ثبت نهایی وضعیت احراز هویت
      localStorage.setItem('user_phone', pendingPhone);
      localStorage.setItem('user_name', displayName);
      localStorage.setItem('is_auth', 'true');
      
      // پاکسازی حافظه موقت
      localStorage.removeItem('pending_user_phone');
      localStorage.removeItem('pending_display_name');

      openModal("خوش آمدید", `${displayName} عزیز، هویت شما ... تایید شد.`);
      
      // ۳. انتقال به داشبورد
      setTimeout(() => router.push('/dashboard'), 1500)
    } else {
      // کد اشتباه
      attempts.value++
      isShaking.value = true
      errorMsg.value = `کد اشتباه است (تلاش ${attempts.value} از ۳)`
      otpValues.fill('') 
      if (inputs.value[0]) inputs.value[0].focus()
      setTimeout(() => isShaking.value = false, 500)
    }
  }, 1500)
}

// باز کردن مودال پیام
const openModal = (title: string, body: string) => {
  modal.title = title
  modal.body = body
  modal.show = true
}

// ارسال مجدد کد او تی پی
const resendCode = () => {
  attempts.value = 0
  otpValues.fill('')
  startTimer(120)
  if (inputs.value[0]) inputs.value[0].focus()
}

// اجرای اولیه هنگام ورود به صفحه
onMounted(() => {
  // جلوگیری از ورود مستقیم بدون مرحله لاگین (حالا بر اساس شماره چک می‌شود)
  if (!localStorage.getItem('pending_user_phone')) {
    router.push('/login')
  }
  startTimer(120)
})

// پاکسازی interval هنگام خروج از صفحه
onUnmounted(() => clearInterval(interval))
</script>



<style scoped>
/* انیمیشن ورود کارت */
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* انیمیشن خطا */
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }

/* انیمیشن مودال */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>