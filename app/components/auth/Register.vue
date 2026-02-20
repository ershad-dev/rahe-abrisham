<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr mt-[38px]">
    
    <div :class="{'shake': isShaking}" class="w-full max-w-[700px] md:min-h-[440px] rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible ">
      
      <div class="flex md:hidden w-full border-b border-gray-100 overflow-hidden rounded-t-2xl bg-gray-50/50">
        <NuxtLink to="/register" class="flex-1 py-4 flex flex-col items-center gap-1 transition-all duration-300 bg-white border-b-2 border-[#2b2bb5] text-[#2b2bb5]">
          <img src="~/assets/images/sign.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ثبت نام</span>
        </NuxtLink>
        <NuxtLink to="/login" class="flex-1 py-4 flex flex-col items-center gap-1 transition-all duration-300 text-gray-400 opacity-60">
          <img src="~/assets/images/login.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ورود</span>
        </NuxtLink>
      </div>

      <div class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center gap-8">
        <div class="absolute left-[-2px] top-[150px] w-1 h-14 bg-[#2b2bb5] rounded-full transition-all duration-500"></div>
        <div class="flex flex-col items-center text-[#0a0a5e] font-bold scale-90 cursor-default">
          <img src="~/assets/images/sign.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ثبت نام</span>
        </div>
        <NuxtLink to="/login" class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition-all duration-300 group">
          <img src="~/assets/images/login.png" class="w-6 h-6 mb-1 group-hover:-translate-y-1 transition-transform" />
          <span class="text-[11px] font-medium">ورود</span>
        </NuxtLink>
      </div>

      <div class="hidden md:block w-[120px] my-[-15px] mx-3 bg-gradient-to-b from-[#031535] to-[#004282] rounded-[20px] shadow-lg overflow-hidden z-10">
        <img src="~/assets/images/plane.png" class="w-full h-full object-cover shadow-inner" />
      </div>

      <form @submit.prevent="submit" class="flex-1 flex flex-col justify-center py-6 px-6 md:px-10 md:pr-2">
        
        <div v-for="field in singleFields" :key="field" class="mb-3">
          <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px] text-right">
            {{ fieldLabels[field] }}
          </label>
          <input 
            v-model="form[field]" 
            :type="field === 'phone' ? 'tel' : (field === 'email' ? 'email' : 'text')"
            class="w-full h-11 rounded-full border border-gray-200 px-4 text-[14px] outline-none focus:border-[#0a0a5e] transition-all bg-[#ebebeb]/40 focus:bg-white placeholder:text-gray-300"
            :dir="(field === 'username') ? 'rtl' : 'ltr'"
            :placeholder="field === 'phone' ? '09123456789' : ''"
            @input="field === 'phone' ? handlePhoneInput($event) : null"
          />
        </div>

        <div class="flex flex-col md:flex-row gap-3 mb-3">
          <div v-for="field in passwordFields" :key="field" class="flex-1">
            <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px] text-right">
              {{ fieldLabels[field] }}
            </label>
            <div class="relative">
              <input 
                v-model="form[field]" 
                :type="isPasswordVisible(field) ? 'text' : 'password'"
                class="w-full h-11 rounded-full border border-gray-200 px-4 text-[14px] outline-none focus:border-[#0a0a5e] transition-all bg-[#ebebeb]/40 focus:bg-white pl-12"
                dir="rtl"
              />
              <button 
                type="button"
                @click="toggleVisibility(field)"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a0a5e] transition-colors "
              >
                <svg v-if="isPasswordVisible(field)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.413 8.242 7.291 4.5 12 4.5c4.686 0 8.573 3.742 9.964 7.178.07.242.07.485 0 .727C20.587 15.758 16.699 19.5 12 19.5c-4.687 0-8.574-3.742-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
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
import { useRouter } from 'nuxt/app'

// ۱. تعریف دقیق ساختار داده برای جلوگیری از خطای Index Type
interface RegisterForm {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const router = useRouter()

// ۲. استفاده از اینترفیس در reactive
const form = reactive<RegisterForm>({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')
const isShaking = ref(false)
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// ۳. تعریف آرایه‌ها با استفاده از keyof برای امنیت تایپ در v-for
const singleFields: (keyof RegisterForm)[] = ['username', 'email', 'phone']
const passwordFields: (keyof RegisterForm)[] = ['password', 'confirmPassword']

const fieldLabels: Record<keyof RegisterForm, string> = {
  username: 'نام کاربری',
  email: 'ایمیل',
  phone: 'شماره موبایل',
  password: 'رمز عبور',
  confirmPassword: 'تکرار رمز عبور'
}

// ۴. اصلاح توابع با تایپ دقیق ورودی
const isPasswordVisible = (field: keyof RegisterForm) => {
  return field === 'password' ? showPassword.value : showConfirmPassword.value
}

const toggleVisibility = (field: keyof RegisterForm) => {
  if (field === 'password') showPassword.value = !showPassword.value
  if (field === 'confirmPassword') showConfirmPassword.value = !showConfirmPassword.value
}

const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  if (value.length > 11) value = value.slice(0, 11);
  form.phone = value;
};

const triggerError = (msg: string) => {
  error.value = msg
  isShaking.value = true
  setTimeout(() => isShaking.value = false, 500)
}

const submit = async () => {
  error.value = ''
  
  // منطق چک کردن پر بودن تمام فیلدها (با Trim برای امنیت بیشتر)
  const values = Object.values(form);
  if (values.some(value => !value.trim())) {
    triggerError('لطفاً تمامی فیلدها را پر کنید');
    return;
  }

  if (form.phone.length < 11) {
    triggerError('شماره موبایل باید ۱۱ رقم باشد')
    return
  }

  if (form.password !== form.confirmPassword) {
    triggerError('رمز عبور و تکرار آن با هم مطابقت ندارند')
    return
  }

  isLoading.value = true
  try {
    // شبیه‌سازی API
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    // ذخیره مقادیر در localStorage (منطق قبلی شما)
    localStorage.setItem('pending_user_phone', form.phone)
    localStorage.setItem('pending_display_name', form.username) 
    localStorage.setItem('pending_user_email', form.email) 
    
    await router.push('/otp')
  } catch (err) {
    error.value = 'خطایی در ثبت‌نام رخ داد.'
  } finally {
    isLoading.value = false
  }
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