<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 [direction:ltr] mt-[45px]">
    
    <div class="w-full max-w-[700px] rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row overflow-visible min-h-[380px] text-right">
      
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

      <div class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center gap-8 bg-gray-50/30">
        <div class="absolute left-[-2px] top-[215px] w-1 h-14 bg-[#0b0b54] rounded-full"></div>
        <NuxtLink to="/register" class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition">
          <img src="~/assets/images/sign.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px] font-bold">ثبت نام</span>
        </NuxtLink>
        <NuxtLink to="/login" class="flex flex-col items-center text-[#0b0b54] font-bold scale-90">
          <img src="~/assets/images/login.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ورود</span>
        </NuxtLink>
      </div>

      <div class="hidden md:block w-[150px] my-[-15px] mx-3 bg-gradient-to-b from-[#031535] to-[#004282] rounded-[20px] shadow-lg overflow-hidden z-10">
        <img src="~/assets/images/plane.png" class="w-full h-full object-cover" />
      </div>

      <form @submit.prevent="handleReset" class="flex-1 flex flex-col justify-center py-6 px-6 md:px-12">
        
        <div class="mb-5 text-right" :class="{ 'animate-shake': shakeField === 'password' }">
          <label class="block text-[#0a0a5e] font-bold mb-2 mr-4 text-[13px]">رمز عبور جدید</label>
          <div class="relative">
            <input 
              v-model="form.password" 
              :type="showPassword ? 'text' : 'password'" 
              dir="ltr" 
              placeholder="••••••••"
              class="w-full h-12 rounded-full border px-6 pl-12 text-[15px] outline-none transition-all text-left bg-[#ebebeb]/40 focus:bg-white"
              :class="errors.password ? 'border-red-500' : 'border-gray-200 focus:border-[#0a0a5e]'"
            />
            <button type="button" @click="showPassword = !showPassword" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a0a5e]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.413 8.242 7.291 4.5 12 4.5c4.686 0 8.573 3.742 9.964 7.178.07.242.07.485 0 .727C20.587 15.758 16.699 19.5 12 19.5c-4.687 0-8.574-3.742-9.963-7.178z" />
                <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-[11px] mt-1 mr-4 font-bold">{{ errors.password }}</p>
        </div>

        <div class="mb-6 text-right" :class="{ 'animate-shake': shakeField === 'confirm' }">
          <label class="block text-[#0a0a5e] font-bold mb-2 mr-4 text-[13px]">تکرار رمز عبور جدید</label>
          <div class="relative">
            <input 
              v-model="form.confirmPassword" 
              :type="showConfirmPassword ? 'text' : 'password'" 
              dir="ltr" 
              placeholder="••••••••"
              class="w-full h-12 rounded-full border px-6 pl-12 text-[15px] outline-none transition-all text-left bg-[#ebebeb]/40 focus:bg-white"
              :class="errors.confirmPassword ? 'border-red-500' : 'border-gray-200 focus:border-[#0a0a5e]'"
            />
            <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a0a5e]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path v-if="!showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.413 8.242 7.291 4.5 12 4.5c4.686 0 8.573 3.742 9.964 7.178.07.242.07.485 0 .727C20.587 15.758 16.699 19.5 12 19.5c-4.687 0-8.574-3.742-9.963-7.178z" />
                <path v-if="!showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="text-red-500 text-[11px] mt-1 mr-4 font-bold">{{ errors.confirmPassword }}</p>
        </div>

        <div class="mb-8 space-y-2 px-4 text-[#0a0a5e] text-[13px] font-bold text-right">
          <p>• حداقل 8 کاراکتر داشته باشد</p>
          <p>• از اعداد در آن استفاده شود</p>
          <p>• از حروف بزرگ و کوچک در آن استفاده شود</p>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full h-12 bg-[#0b0b54] text-white text-lg font-bold rounded-xl hover:bg-[#15158a] transition-all active:scale-95 shadow-md flex items-center justify-center"
        >
          <span v-if="!isLoading">ثبت</span>
          <div v-else class="w-5 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </button>
      </form>
    </div>

    <Transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div class="bg-white rounded-3xl p-8 max-w-[400px] w-full shadow-2xl flex flex-col items-center text-center animate-pop">
          <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-[#0a0a5e] mb-2">عملیات موفقیت‌آمیز</h3>
          <p class="text-gray-500 font-medium">رمز عبور شما با موفقیت تغییر یافت.</p>
          <p class="text-gray-400 text-sm mt-4">در حال انتقال به صفحه ورود...</p>
          
          <div class="w-full h-1 bg-gray-100 mt-6 rounded-full overflow-hidden">
            <div class="h-full bg-green-500 animate-progress"></div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showModal = ref(false)
const shakeField = ref('')

const form = reactive({ password: '', confirmPassword: '' })
const errors = reactive({ password: '', confirmPassword: '' })

const triggerShake = (field: string) => {
  shakeField.value = field
  setTimeout(() => { shakeField.value = '' }, 500)
}

const handleReset = async () => {
  errors.password = ''
  errors.confirmPassword = ''

  if (!form.password) {
    errors.password = 'لطفاً رمز عبور را وارد کنید'
    triggerShake('password'); return
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,}$/
  if (!passwordRegex.test(form.password)) {
    errors.password = 'رمز باید شامل حروف بزرگ، کوچک، عدد و علامت @ باشد'
    triggerShake('password'); return
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'رمزها با هم مطابقت ندارند'
    triggerShake('confirm'); return
  }

  isLoading.value = true
  
  // شبیه‌سازی API
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isLoading.value = false
  showModal.value = true
  
  // هدایت بعد از ۳ ثانیه
  setTimeout(() => {
    navigateTo('/login')
  }, 3000)
}
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
.animate-shake {
  animation: shake 0.2s ease-in-out 0s 2;
}

@keyframes pop {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-pop {
  animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes progress {
  0% { width: 100%; }
  100% { width: 0%; }
}
.animate-progress {
  animation: progress 3s linear forwards;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>