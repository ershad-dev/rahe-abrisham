<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'nuxt/app';

// ۱. تعریف ساختار فرم برای امنیت تایپی
interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

// استفاده از هوک روتر برای جابجایی بین صفحات
const router = useRouter()

const form = reactive<RegisterForm>({ 
  username: '', 
  email: '', 
  password: '' 
})

const error = ref('')
const isShaking = ref(false)
const isLoading = ref(false)

const fieldNames: (keyof RegisterForm)[] = ['username', 'email', 'password']

const submit = async () => {
  error.value = ''
  
  // چک کردن پر بودن فیلدها
  const isFormInvalid = fieldNames.some(key => !form[key])

  if (isFormInvalid) {
    error.value = 'لطفاً تمامی فیلدها را پر کنید'
    isShaking.value = true
    setTimeout(() => isShaking.value = false, 500)
    return
  }

  isLoading.value = true
  
  try {
    console.log('ارسال فرم موفقیت‌آمیز:', form)
    // هدایت به صفحه OTP (مطمئن شوید فایل pages/otp.vue وجود دارد)
    await router.push('/otp')
  } catch (err) {
    error.value = 'خطایی در انتقال رخ داد'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr font-sans">
    <div :class="{'shake': isShaking}" class="w-full max-w-[700px] md:h-[380px] bg-white rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible">
      
      <div class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center gap-8">
        <div class="absolute left-[-2px] top-[115px] w-1 h-14 bg-[#2b2bb5] rounded-full"></div>
        <div class="flex flex-col items-center text-[#0a0a5e] font-bold scale-90">
          <img src="~/assets/images/plane.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ثبت نام</span>
        </div>
        
        <NuxtLink 
          to="/login" 
          class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition-all duration-300 ease-in-out group"
        >
          <img 
            src="~/assets/images/plane.png" 
            class="w-6 h-6 mb-1 group-hover:-translate-y-1 transition-transform" 
            alt="Login Icon"
          />
          <span class="text-[11px] font-medium">ورود</span>
        </NuxtLink>
      </div>

      <div class="hidden md:block w-[120px] my-[-15px] mx-3 bg-gradient-to-b from-[#031535] to-[#004282] rounded-[20px] shadow-lg overflow-hidden z-10">
        <img src="~/assets/images/plane.png" class="w-full h-full object-cover" />
      </div>

      <form @submit.prevent="submit" class="flex-1 flex flex-col justify-center py-6 px-6 md:px-10 md:pr-2">
        <div v-for="field in fieldNames" :key="field" class="mb-3">
          <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px] text-right">
            {{ field === 'username' ? 'نام کاربری' : field === 'email' ? 'ایمیل' : 'رمز عبور' }}
          </label>
          <input 
            v-model="form[field]" 
            :type="field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'"
            class="w-full h-10 rounded-full border border-gray-200 px-4 text-[13px] outline-none focus:border-[#0a0a5e] focus:ring-1 focus:ring-[#0a0a5e]/5 transition-all bg-gray-50/30"
            :dir="field !== 'username' ? 'ltr' : 'rtl'"
          />
        </div>

        <p v-if="error" class="text-red-500 text-[11px] text-center mb-1 font-bold">{{ error }}</p>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full h-10 bg-[#0b0b54] text-white text-sm font-bold rounded-lg hover:bg-[#15158a] transition-all active:scale-95 mt-2 shadow-md disabled:opacity-70"
        >
          {{ isLoading ? 'در حال انتقال...' : 'تایید و ثبت نام' }}
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