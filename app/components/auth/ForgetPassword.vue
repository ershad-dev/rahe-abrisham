<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 [direction:ltr] mt-[45px] font-sans">
    
    <div class="w-full max-w-[700px] rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row overflow-visible min-h-[440px] text-right ">
      
      <div class="flex md:hidden border-b border-gray-100 w-full shrink-0">
        <NuxtLink to="/register" class="flex-1 py-4 flex flex-col items-center justify-center text-gray-400 opacity-60 transition border-b-2 border-transparent">
          <img src="~/assets/images/sign.png" class="w-5 h-5 mb-1" />
          <span class="text-[11px] font-bold">ثبت نام</span>
        </NuxtLink>
        <NuxtLink to="/login" class="flex-1 py-4 flex flex-col items-center justify-center text-[#0b0b54] font-bold border-b-2 border-[#0b0b54] bg-gray-50/50">
          <img src="~/assets/images/login.png" class="w-5 h-5 mb-1" />
          <span class="text-[11px]">ورود </span>
        </NuxtLink>
      </div>

      <div class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center bg-gray-50/30 shrink-0">
        <div class="absolute left-[-2px] top-[58%] -translate-y-1/2 w-1 h-14 bg-[#0b0b54] rounded-full transition-all duration-300"></div>
        
        <div class="flex flex-col gap-10">
          <NuxtLink to="/register" class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition group">
            <img src="~/assets/images/sign.png" class="w-6 h-6 mb-1 group-hover:-translate-y-1 transition-transform" />
            <span class="text-[11px] font-bold">ثبت نام</span>
          </NuxtLink>
          
          <NuxtLink to="/login" class="flex flex-col items-center text-[#0b0b54] font-bold scale-90">
            <img src="~/assets/images/login.png" class="w-6 h-6 mb-1" />
            <span class="text-[11px]">ورود</span>
          </NuxtLink>
        </div>
      </div>

      <div class="hidden md:block w-[120px] my-[-15px] mx-3 bg-gradient-to-b from-[#031535] to-[#004282] rounded-[20px] shadow-lg overflow-hidden z-10 shrink-0">
        <img src="~/assets/images/plane.png" class="w-full h-full object-cover" />
      </div>

      <div class="flex-1 flex flex-col justify-center py-10 px-6 md:px-12 relative min-h-[420px]">
        
        <div class="absolute left-6 top-6 z-20">
          <button v-if="currentStep === 1" @click="navigateTo('/login')" class="text-gray-400 hover:text-[#0b0b54] transition-colors flex items-center gap-1 text-[12px] font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            بازگشت
          </button>
          <button v-else @click="currentStep--" class="text-gray-400 hover:text-[#0b0b54] transition-colors flex items-center gap-1 text-[12px] font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            مرحله قبل
          </button>
        </div>

        <div v-if="currentStep === 1" class="animate-in">
          <h2 class="text-xl font-bold text-[#0a0a5e] mb-2">فراموشی رمز</h2>
          <p class="text-gray-400 text-[13px] mb-8">شماره موبایل خود را وارد کنید.</p>
          
          <div class="mb-8 text-right" :class="{ 'animate-shake': isShaking }">
            <label class="block text-[#0a0a5e] font-bold mb-2 mr-4 text-[13px]" style="text-shadow: 0.5px 0 0 #0a0a5e, -0.5px 0 0 #0a0a5e;">شماره موبایل</label>
            
            <input 
              @keyup.enter="verifyMobile"
              v-model="form.mobile" 
              type="text" 
              dir="rtl" 
              maxlength="11" 
              @input="validateMobileInput" 
              placeholder="09157962833"
              class="w-full h-14 rounded-full border px-6 text-left bg-[#ebebeb]/40 focus:bg-transparent outline-none transition-all focus:border-[#0a0a5e] border-gray-200  placeholder:text-gray-300" 
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
          <p class="text-gray-400 text-[13px] mb-8 font-bold text-right">کد ۶ رقمی به شماره {{ form.mobile }} ارسال شد.</p>
          
          <div class="mb-6" :class="{ 'animate-shake': isShaking }">
            <div class="flex justify-center gap-2" dir="ltr">
              <input
                @keyup.enter="verifyOTP" 
                v-for="(n, index) in 6" :key="index" :id="'otp-' + index"
                v-model="otpArray[index]" type="text" maxlength="1"
                @input="handleOtpInput($event, index)"
                @keydown.backspace="handleOtpBackspace($event, index)"
                @paste="handlePaste"
                :disabled="isExpired"
                class="w-10 h-12 md:w-12 md:h-14 text-center text-xl font-bold rounded-xl border border-gray-200 bg-[#ebebeb]/40 focus:bg-transparent focus:border-[#0a0a5e] outline-none transition-all disabled:opacity-50"
              />
            </div>
            <p v-if="errors.otp" class="text-red-500 text-[11px] mt-4 font-bold">{{ errors.otp }}</p>
            <p v-if="isExpired" class="text-red-500 text-[11px] mt-2 font-bold">کد منقضی شده است.</p>
          </div>

          <div class="mb-6">
            <div v-if="timer > 0" class="text-gray-400 text-[13px] font-bold">
              مانده تا انقضا: {{ Math.floor(timer / 60) }}:{{ (timer % 60).toString().padStart(2, '0') }}
            </div>
            <button v-if="showResend" @click="resendCode" class="text-[#2b2bb5] text-[13px] font-bold hover:underline mt-2">ارسال مجدد کد تایید</button>
          </div>

          <button @click="verifyOTP" :disabled="isLoading || attempts <= 0 || isExpired" class="w-full h-14 bg-[#0b0b54] text-white font-bold rounded-xl shadow-md flex items-center justify-center transition-all disabled:bg-gray-300">
            <span v-if="!isLoading">تایید کد</span>
            <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </button>
          <p class="text-gray-400 text-[11px] mt-4 px-2 font-bold text-center">تعداد تلاش باقی‌مانده: {{ attempts }}</p>
        </div>

        <div v-if="currentStep === 3" class="animate-in">
          <h2 class="text-xl font-bold text-[#0a0a5e] mb-6 text-right">رمز عبور جدید</h2>
          
          <div class="space-y-4 text-right">
            <div class="relative" :class="{ 'animate-shake': passErrorShaking }">
              <label class="block text-[#0a0a5e] font-bold mb-1 mr-4 text-[13px]" style="text-shadow: 0.5px 0 0 #0a0a5e, -0.5px 0 0 #0a0a5e;">رمز عبور جدید</label>
              <div class="relative flex items-center">
                <input 
                 @keyup.enter="resetPassword"
                  v-model="form.password" 
                  :type="showPass ? 'text' : 'password'" 
                  dir="rtl" 
                  placeholder="••••••••"
                  class="w-full h-12 rounded-full border px-6 pl-12 bg-[#ebebeb]/40 focus:bg-transparent outline-none focus:border-[#0a0a5e] text-left border-gray-200 " 
                />
                <button type="button" @click.stop="showPass = !showPass" class="absolute left-4 z-50 p-2 text-gray-400 hover:text-[#0b0b54] transition-colors cursor-pointer outline-none">
                   <svg v-if="!showPass" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                   <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="relative" :class="{ 'animate-shake': passErrorShaking }">
              <label class="block text-[#0a0a5e] font-bold mb-1 mr-4 text-[13px]" style="text-shadow: 0.5px 0 0 #0a0a5e, -0.5px 0 0 #0a0a5e;">تکرار رمز عبور</label>
              <div class="relative flex items-center">
                <input 
                  @keyup.enter="resetPassword"
                  v-model="form.confirm" 
                  :type="showConfirm ? 'text' : 'password'" 
                  dir="rt" 
                  placeholder="••••••••"
                  class="w-full h-12 rounded-full border px-6 pl-12 bg-[#ebebeb]/40 focus:bg-transparent outline-none focus:border-[#0a0a5e] text-left border-gray-200 " 
                />
                <button type="button" @click.stop="showConfirm = !showConfirm" class="absolute left-4 z-50 p-2 text-gray-400 hover:text-[#0b0b54] transition-colors cursor-pointer outline-none">
                   <svg v-if="!showConfirm" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                   <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>
              <p v-if="errors.pass" class="text-red-500 text-[11px] mt-2 mr-4 font-bold">{{ errors.pass }}</p>
            </div>
          </div>

          <div class="my-6 space-y-2 px-4 text-red-600 text-[13px] font-bold text-right opacity-80">
            <p>• حداقل ۸ کاراکتر باشد</p>
            <p>• از حروف بزرگ و کوچک استفاده شود</p>

            <p>•  از اعداد در آن استفاده شود</p>

          </div>

          <button @click="resetPassword" :disabled="isLoading" class="w-full h-14 bg-[#0b0b54] text-white font-bold rounded-xl shadow-md active:scale-95 transition-all">
            <span v-if="!isLoading">تغییر رمز عبور</span>
            <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          </button>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showSuccess" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div class="bg-white rounded-3xl p-8 max-w-[380px] w-full shadow-2xl text-center animate-pop">
          <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✅</div>
          <h3 class="text-2xl font-bold text-[#0a0a5e] mb-2 ">تغییر یافت!</h3>
          <p class="text-gray-500 font-medium ">رمز شما با موفقیت بروزرسانی شد.</p>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, nextTick } from 'vue'

// مدیریت مراحل و وضعیت‌های فرم
const currentStep = ref(1)
const isLoading = ref(false)
const isShaking = ref(false)
const passErrorShaking = ref(false)
const showSuccess = ref(false)
const showPass = ref(false)
const showConfirm = ref(false)
const showResend = ref(false)
const isExpired = ref(false)
const targetEmail = ref('') 
const attempts = ref(3)
const timer = ref(120)
let timerInterval: any = null

const otpArray = ref(['', '', '', '', '', ''])
const form = reactive({ mobile: '', password: '', confirm: '' })
const errors = reactive({ mobile: '', otp: '', pass: '' })

const mockUsers = [
  { email: 'erd@gmail.com', password: '1234', username: 'ershad', phone: '09157962833' },
  { email: 'ali@gmail.com', password: '1111', username: 'علی', phone: '09123456789' }
]

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

const verifyMobile = async () => {
  errors.mobile = ''
  if (form.mobile.length < 11) { errors.mobile = 'شماره موبایل ناقص است'; triggerShake(); return }
  isLoading.value = true
  await new Promise(r => setTimeout(r, 800))
  const user = mockUsers.find(u => u.phone === form.mobile)
  if (user) {
    targetEmail.value = user.email
    isLoading.value = false
    currentStep.value = 2
    startTimer()
  } else {
    isLoading.value = false
    errors.mobile = 'کاربری با این شماره یافت نشد';
    triggerShake()
  }
}

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
    nextTick(() => verifyOTP())
  }
}

const resendCode = () => {
  otpArray.value = ['', '', '', '', '', '']
  errors.otp = ''; attempts.value = 3; startTimer()
}

const verifyOTP = async () => {
  if (isLoading.value || attempts.value <= 0 || isExpired.value) return
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1000))
  if (otpArray.value.join('') === '123456') { 
    isLoading.value = false
    currentStep.value = 3
  } else {
    attempts.value--
    errors.otp = `کد نادرست است (${attempts.value} تلاش باقی‌مانده)`
    isLoading.value = false
    triggerShake()
    otpArray.value = ['', '', '', '', '', '']
    document.getElementById('otp-0')?.focus()
  }
}

const resetPassword = async () => {
  errors.pass = ''
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  if (!regex.test(form.password)) {
    errors.pass = 'رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد';
    triggerShake('pass'); return
  }
  if (form.password !== form.confirm) {
    errors.pass = 'رمز عبور و تکرار آن مطابقت ندارند';
    triggerShake('pass'); return
  }
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1500))
  
  // ذخیره در LocalStorage برای شبیه‌سازی تغییر دیتابیس
  const storageData = JSON.parse(localStorage.getItem('mock_passwords') || '{}')
  storageData[targetEmail.value] = form.password
  localStorage.setItem('mock_passwords', JSON.stringify(storageData))
  
  showSuccess.value = true
  setTimeout(() => navigateTo('/login'), 2500)
}

const triggerShake = (type: 'general' | 'pass' = 'general') => {
  if (type === 'pass') {
    passErrorShaking.value = true; setTimeout(() => passErrorShaking.value = false, 500)
  } else {
    isShaking.value = true; setTimeout(() => isShaking.value = false, 500)
  }
}

const validateMobileInput = (e: any) => { form.mobile = e.target.value.replace(/\D/g, '') }

onUnmounted(() => { if (timerInterval) clearInterval(timerInterval) })
</script>

<style scoped>
.animate-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
.animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
@keyframes pop { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.animate-pop { animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>