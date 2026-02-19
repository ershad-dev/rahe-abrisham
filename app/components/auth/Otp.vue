<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr font-sans">
    <div :class="{'shake': isShaking}" class="w-full max-w-[700px] md:h-[380px] rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible ">
      
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
          <span class="text-[11px]">تایید</span>
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
        <p class="text-gray-400 text-[11px] mb-6">کد ۶ رقمی (123456) را وارد کنید</p>

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
            class="w-10 h-12 md:w-11 md:h-14 text-center text-xl font-bold border-2 border-[#ebebeb] rounded-xl outline-none transition-all bg-[#ebebeb]/30 focus:border-[#0a0a5e] focus:bg-white"
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
          class="w-full max-w-[280px] h-12 bg-[#0b0b54] text-white rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:bg-gray-300 flex items-center justify-center"
        >
          <span v-if="!isLoading">تایید و ورود به پنل</span>
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

const otpValues = reactive<string[]>(['', '', '', '', '', ''])
const inputs = ref<HTMLInputElement[]>([]) 
const timer = ref<number>(120)
const attempts = ref<number>(0)
const isExpired = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const errorMsg = ref<string>('')
const showResend = ref<boolean>(false)
const isShaking = ref<boolean>(false)
const modal = reactive({ show: false, title: '', body: '' })

let interval: any

const startTimer = (duration: number) => {
  if (interval) clearInterval(interval)
  timer.value = duration
  isExpired.value = false
  showResend.value = false
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
      if (timer.value <= 60) showResend.value = true
    } else {
      isExpired.value = true
      clearInterval(interval)
    }
  }, 1000)
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const handleInput = async (index: number, e: Event) => {
  const target = e.target as HTMLInputElement
  const val = target.value
  if (!/^\d$/.test(val)) {
    otpValues[index] = ''
    return
  }
  errorMsg.value = ''
  if (val && index < 5) {
    inputs.value[index + 1].focus()
  }
  if (otpValues.every(v => v !== '')) {
    checkCode()
  }
}

const handleKeyDown = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
    inputs.value[index - 1].focus()
  }
}

const checkCode = async () => {
  if (isLoading.value) return
  
  if (otpValues.some(v => v === '')) {
    errorMsg.value = "لطفاً کد ۶ رقمی را کامل وارد کنید"
    return
  }

  isLoading.value = true
  const code = otpValues.join('')

  setTimeout(() => {
    if (code === "123456") {
      // ۱. استخراج دیتای موقت
      const email = localStorage.getItem('pending_user_email') || 'user@test.com'
      const name = localStorage.getItem('pending_display_name') || 'کاربر عزیز'

      // ۲. ثبت کلیدهای نهایی (هماهنگ با هدر و داشبورد)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('display_name', name)
      localStorage.setItem('user_email', email)

      // ۳. پاکسازی
      localStorage.removeItem('pending_user_email')
      localStorage.removeItem('pending_display_name')

      // ۴. اطلاع‌رسانی به هدر برای تغییر دکمه بدون رفرش
      if (process.client) {
        window.dispatchEvent(new Event('auth-change'))
      }

      // ۵. انتقال قطعی و اجباری به داشبورد
      window.location.href = '/dashboard'
      
    } else {
      isLoading.value = false
      attempts.value++
      isShaking.value = true
      errorMsg.value = `کد اشتباه است (تلاش ${attempts.value} از ۳)`
      otpValues.fill('') 
      if (inputs.value[0]) inputs.value[0].focus()
      setTimeout(() => isShaking.value = false, 500)
    }
  }, 1000)
}

const resendCode = () => {
  attempts.value = 0
  otpValues.fill('')
  startTimer(120)
  if (inputs.value[0]) inputs.value[0].focus()
}

onMounted(() => {
  if (process.client && !localStorage.getItem('pending_display_name')) {
    window.location.href = '/login'
  }
  startTimer(120)
})

onUnmounted(() => clearInterval(interval))
</script>

<style scoped>
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
.shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>