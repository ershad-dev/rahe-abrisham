<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr mt-[38px]">
    
    <div :class="{'shake': isShaking}" class="w-full max-w-[700px] rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible  min-h-[440px]">
      
      <div class="flex md:hidden w-full border-b border-gray-100 overflow-hidden rounded-t-2xl bg-gray-50/50">
        <NuxtLink to="/register" class="flex-1 py-4 flex flex-col items-center gap-1 text-gray-400 opacity-60">
          <img src="~/assets/images/sign.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ثبت نام</span>
        </NuxtLink>
        <NuxtLink to="/login" class="flex-1 py-4 flex flex-col items-center gap-1 bg-white border-b-2 border-[#0b0b54] text-[#0b0b54]">
          <img src="~/assets/images/login.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ورود</span>
        </NuxtLink>
      </div>

      <div class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center gap-8">
        <div class="absolute left-[-2px] top-[225px] w-1 h-14 bg-[#0b0b54] rounded-full transition-all"></div>
        
        <NuxtLink to="/register" class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition">
          <img src="~/assets/images/sign.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px] font-medium">ثبت نام</span>
        </NuxtLink>

        <NuxtLink to="/login" class="flex flex-col items-center text-[#0b0b54] font-bold scale-90">
          <img src="~/assets/images/login.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ورود</span>
        </NuxtLink>
      </div>

      <div class="hidden md:block w-[120px] my-[-15px] mx-3 bg-gradient-to-b from-[#031535] to-[#004282] rounded-[20px] shadow-lg overflow-hidden z-10">
        <img src="~/assets/images/plane.png" class="w-full h-full object-cover" />
      </div>

      <div class="flex-1 flex flex-col justify-center py-10 px-6 md:px-12 relative">
        
        <div class="absolute left-6 top-6 z-20">
          <button v-if="currentStep === 1" @click="navigateTo('/login')" class="text-gray-400 hover:text-[#0b0b54] transition-colors flex items-center gap-1 text-[12px] font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            بازگشت
          </button>
          <button v-else @click="currentStep--" class="text-gray-400 hover:text-[#0b0b54] transition-colors flex items-center gap-1 text-[12px] font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            مرحله قبل
          </button>
        </div>

        <div v-if="currentStep === 1" class="animate-in text-right">
          <h2 class="text-xl font-bold text-[#0a0a5e] mb-2">فراموشی رمز</h2>
          <p class="text-gray-400 text-[13px] mb-8">شماره موبایل خود را وارد کنید.</p>
          
          <div class="mb-8">
            <label class="block text-[#0a0a5e] font-bold mb-2 mr-4 text-[13px]">شماره موبایل</label>
            <input 
              v-model="form.mobile" 
              @keyup.enter="verifyMobile"
              @input="validateMobileInput"
              type="text" dir="ltr" maxlength="11" placeholder="09157962833"
              class="w-full h-14 rounded-full border border-gray-200 px-6 bg-[#ebebeb]/40 focus:bg-transparent outline-none transition-all focus:border-[#0b0b54] placeholder:text-gray-300" 
            />
            <p v-if="errors.mobile" class="text-red-500 text-[11px] mt-2 mr-4 font-bold">{{ errors.mobile }}</p>
          </div>

          <button @click="verifyMobile" :disabled="isLoading" class="w-full h-14 bg-[#0b0b54] text-white font-bold rounded-xl shadow-md flex items-center justify-center active:scale-95 transition-all">
            <span v-if="!isLoading">ارسال کد تایید</span>
            <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </button>
        </div>

        <div v-if="currentStep === 2" class="animate-in text-center">
          <h2 class="text-xl font-bold text-[#0a0a5e] mb-2 text-right">تایید هویت</h2>
          <p class="text-gray-400 text-[13px] mb-8 text-right">کد ۶ رقمی به شماره {{ form.mobile }} ارسال شد.</p>
          
          <div class="flex justify-center gap-2 mb-4" dir="ltr">
            <input
              v-for="(n, index) in 6" :key="index" :id="'otp-' + index"
              v-model="otpArray[index]" type="text" maxlength="1"
              @input="handleOtpInput($event, index)"
              @keydown.backspace="handleOtpBackspace($event, index)"
              @paste="handlePaste"
              :disabled="isExpired || attempts <= 0"
              class="w-10 h-12 md:w-11 md:h-14 text-center text-xl font-bold rounded-xl border border-gray-200 bg-[#ebebeb]/40 focus:bg-transparent focus:border-[#0b0b54] outline-none disabled:opacity-50"
            />
          </div>

          <p v-if="errors.otp" class="text-red-500 text-[11px] mb-4 font-bold">{{ errors.otp }}</p>

          <div class="flex justify-between items-center w-full max-w-[280px] mx-auto mb-6 text-[12px]">
            <span :class="timer < 30 ? 'text-red-500' : 'text-gray-400'" class="font-bold">
              مانده تا انقضا: {{ Math.floor(timer / 60) }}:{{ (timer % 60).toString().padStart(2, '0') }}
            </span>
            <button v-if="showResend" @click="resendCode" class="text-[#0b0b54] font-bold underline">ارسال مجدد</button>
          </div>

          <button @click="verifyOTP" :disabled="isLoading || attempts <= 0 || isExpired || otpArray.includes('')" class="w-full h-14 bg-[#0b0b54] text-white font-bold rounded-xl shadow-md transition-all disabled:bg-gray-300">
            {{ attempts <= 0 ? 'تعداد تلاش مجاز تمام شد' : 'تایید کد' }}
          </button>
          <p class="text-gray-400 text-[11px] mt-4 font-bold">تعداد تلاش باقی‌مانده: {{ attempts }}</p>
        </div>

        <div v-if="currentStep === 3" class="animate-in text-right">
          <h2 class="text-xl font-bold text-[#0a0a5e] mb-6">رمز عبور جدید</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-[#0a0a5e] font-bold mb-1 mr-4 text-[13px]">رمز عبور جدید</label>
              <div class="relative">
                <input v-model="form.password" :type="showPass ? 'text' : 'password'" dir="ltr" placeholder="••••••••" class="w-full h-12 rounded-full border border-gray-200 px-6 pl-12 bg-[#ebebeb]/40 focus:bg-transparent focus:border-[#0b0b54] outline-none" />
                <button @click="showPass = !showPass" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg v-if="showPass" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.06m2.72-2.224A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.028 10.028 0 01-1.72 3.11m-1.283 1.283A11.356 11.356 0 0112 18.233M4.222 4.222l15.556 15.556" /></svg>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-[#0a0a5e] font-bold mb-1 mr-4 text-[13px]">تکرار رمز عبور</label>
              <div class="relative">
                <input v-model="form.confirm" :type="showConfirm ? 'text' : 'password'" dir="ltr" placeholder="••••••••" class="w-full h-12 rounded-full border border-gray-200 px-6 pl-12 bg-[#ebebeb]/40 focus:bg-transparent focus:border-[#0b0b54] outline-none" />
                <button @click="showConfirm = !showConfirm" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                   <svg v-if="showConfirm" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.06m2.72-2.224A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.028 10.028 0 01-1.72 3.11m-1.283 1.283A11.356 11.356 0 0112 18.233M4.222 4.222l15.556 15.556" /></svg>
                </button>
              </div>
            </div>
            <p v-if="errors.pass" class="text-red-500 text-[11px] mr-4 font-bold">{{ errors.pass }}</p>
          </div>

          <button @click="resetPassword" :disabled="isLoading" class="w-full h-14 bg-[#0b0b54] text-white font-bold rounded-xl shadow-md mt-6 active:scale-95 transition-all flex items-center justify-center">
            <span v-if="!isLoading">تغییر رمز عبور</span>
            <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </button>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showSuccess" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div class="bg-white rounded-3xl p-8 max-w-[380px] w-full shadow-2xl text-center animate-pop">
          <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
          <h3 class="text-xl font-bold text-[#0a0a5e] mb-2">تغییر یافت!</h3>
          <p class="text-gray-500 text-sm">رمز شما با موفقیت بروزرسانی شد.</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, nextTick } from 'vue'

// دیتای کاربران تستی (این لیست در اولین اجرا در LocalStorage ذخیره می‌شود)
const mockUsers = [
  { email: 'erd@gmail.com', password: '1234', username: 'Ershad', phone: '09157962833' },
  { email: 'ali@gmail.com', password: '1111', username: 'Ali', phone: '09123456789' }
]

const currentStep = ref(1)
const isLoading = ref(false)
const isShaking = ref(false)
const showSuccess = ref(false)
const showPass = ref(false)
const showConfirm = ref(false)
const showResend = ref(false)
const isExpired = ref(false)
const attempts = ref(3)
const timer = ref(120)
let timerInterval: any = null

const otpArray = ref(['', '', '', '', '', ''])
const form = reactive({ mobile: '', password: '', confirm: '' })
const errors = reactive({ mobile: '', otp: '', pass: '' })

// مدیریت تایمر
const startTimer = () => {
  timer.value = 120
  isExpired.value = false
  showResend.value = false
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
      if (timer.value <= 60) showResend.value = true
    } else {
      clearInterval(timerInterval)
      isExpired.value = true
    }
  }, 1000)
}

// مرحله ۱: بررسی وجود موبایل
const verifyMobile = async () => {
  errors.mobile = ''
  if (form.mobile.length < 11) { errors.mobile = 'شماره موبایل صحیح نیست'; triggerShake(); return }
  
  isLoading.value = true
  await new Promise(r => setTimeout(r, 800))
  
  // بررسی در LocalStorage برای کاربران تستی
  const allUsers = JSON.parse(localStorage.getItem('all_mock_users') || JSON.stringify(mockUsers))
  const userExists = allUsers.find((u: any) => u.phone === form.mobile)
  
  if (userExists) {
    isLoading.value = false
    currentStep.value = 2
    startTimer()
  } else {
    isLoading.value = false
    errors.mobile = 'کاربری با این شماره یافت نشد'
    triggerShake()
  }
}

// مدیریت اینپوت‌های کد تایید
const handleOtpInput = (e: any, index: number) => {
  const val = e.target.value.replace(/\D/g, '')
  otpArray.value[index] = val
  if (val && index < 5) nextTick(() => document.getElementById(`otp-${index + 1}`)?.focus())
  if (otpArray.value.every(v => v !== '')) verifyOTP()
}

const handleOtpBackspace = (e: any, index: number) => {
  if (!otpArray.value[index] && index > 0) document.getElementById(`otp-${index - 1}`)?.focus()
}

const handlePaste = (e: ClipboardEvent) => {
  const pasteData = e.clipboardData?.getData('text').slice(0, 6).split('')
  if (pasteData) {
    pasteData.forEach((char, i) => { if (/\d/.test(char)) otpArray.value[i] = char })
    verifyOTP()
  }
}

// مرحله ۲: تایید کد OTP
const verifyOTP = async () => {
  if (isLoading.value || attempts.value <= 0 || isExpired.value) return
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1000))
  
  if (otpArray.value.join('') === '123456') { 
    isLoading.value = false
    currentStep.value = 3
  } else {
    attempts.value--
    errors.otp = `کد نادرست است (تلاش‌های باقی‌مانده: ${attempts.value})`
    isLoading.value = false
    otpArray.value.fill('')
    document.getElementById('otp-0')?.focus()
    triggerShake()
  }
}

// مرحله ۳: تغییر نهایی رمز در LocalStorage
const resetPassword = async () => {
  errors.pass = ''
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  
  if (!regex.test(form.password)) {
    errors.pass = 'رمز باید شامل حرف بزرگ، کوچک و عدد باشد'; triggerShake(); return
  }
  if (form.password !== form.confirm) {
    errors.pass = 'رمزها مطابقت ندارند'; triggerShake(); return
  }
  
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1500))
  
  if (process.client) {
    const allUsers = JSON.parse(localStorage.getItem('all_mock_users') || JSON.stringify(mockUsers))
    const userIndex = allUsers.findIndex((u: any) => u.phone === form.mobile)
    
    if (userIndex !== -1) {
      allUsers[userIndex].password = form.password // آپدیت رمز در لیست
      localStorage.setItem('all_mock_users', JSON.stringify(allUsers)) // ذخیره مجدد
    }
  }

  showSuccess.value = true
  setTimeout(() => navigateTo('/login'), 2500)
}

const resendCode = () => {
  otpArray.value.fill(''); errors.otp = ''; attempts.value = 3; startTimer()
}

const triggerShake = () => {
  isShaking.value = true; setTimeout(() => isShaking.value = false, 500)
}

const validateMobileInput = (e: any) => { form.mobile = e.target.value.replace(/\D/g, '') }

onUnmounted(() => { if (timerInterval) clearInterval(timerInterval) })
</script>

<style scoped>
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.animate-in { animation: fadeIn 0.4s ease-out; }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
.shake { animation: shake 0.2s ease-in-out 0s 2; }
@keyframes pop { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.animate-pop { animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>