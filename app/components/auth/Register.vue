<template>
  <!-- کانتینر اصلی صفحه ثبت‌نام با بکگراند و سنتر کامل -->
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7fa] bg-[url('~/assets/images/login-bg.png')] bg-cover bg-center p-4 dir-ltr mt-[38px]">
    
    <!-- کارت اصلی فرم + افکت لرزش هنگام خطا -->
    <div :class="{'shake': isShaking}" class="w-full max-w-[700px] md:min-h-[440px] rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out] overflow-visible ">
      
      <!-- تب موبایل -->
      <div class="flex md:hidden w-full border-b border-gray-100 overflow-hidden rounded-t-2xl bg-gray-50/50">
        
        <!-- لینک ثبت نام فعال -->
        <NuxtLink to="/register" class="flex-1 py-4 flex flex-col items-center gap-1 transition-all duration-300 bg-white border-b-2 border-[#2b2bb5] text-[#2b2bb5]">
          <img src="~/assets/images/sign.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ثبت نام</span>
        </NuxtLink>

        <!-- لینک ورود -->
        <NuxtLink to="/login" class="flex-1 py-4 flex flex-col items-center gap-1 transition-all duration-300 text-gray-400 opacity-60">
          <img src="~/assets/images/login.png" class="w-5 h-5" />
          <span class="text-[12px] font-bold">ورود</span>
        </NuxtLink>
      </div>

      <!-- سایدبار دسکتاپ -->
      <div class="relative w-[90px] border-l border-gray-50 hidden md:flex flex-col items-center justify-center gap-8">
        
        <!-- نشانگر تب فعال -->
        <div class="absolute left-[-2px] top-[150px] w-1 h-14 bg-[#2b2bb5] rounded-full transition-all duration-500"></div>

        <!-- عنوان ثبت نام -->
        <div class="flex flex-col items-center text-[#0a0a5e] font-bold scale-90 cursor-default">
          <img src="~/assets/images/sign.png" class="w-6 h-6 mb-1" />
          <span class="text-[11px]">ثبت نام</span>
        </div>

        <!-- لینک ورود -->
        <NuxtLink to="/login" class="flex flex-col items-center text-gray-400 opacity-60 scale-90 hover:opacity-100 transition-all duration-300 group">
          <img src="~/assets/images/login.png" class="w-6 h-6 mb-1 group-hover:-translate-y-1 transition-transform" />
          <span class="text-[11px] font-medium">ورود</span>
        </NuxtLink>
      </div>

      <!-- تصویر وسط دسکتاپ -->
      <div class="hidden md:block w-[120px] my-[-15px] mx-3 bg-gradient-to-b from-[#031535] to-[#004282] rounded-[20px] shadow-lg overflow-hidden z-10">
        <img src="~/assets/images/plane.png" class="w-full h-full object-cover shadow-inner" />
      </div>

      <!-- فرم ثبت نام -->
      <form @submit.prevent="submit" class="flex-1 flex flex-col justify-center py-6 px-6 md:px-10 md:pr-2">
        
        <!-- فیلدهای تکی: نام، ایمیل، موبایل -->
        <div v-for="field in singleFields" :key="field" class="mb-3">
          <label class="block  text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px] text-right" style="text-shadow: 0.5px 0 0 #0a0a5e, -0.5px 0 0 #0a0a5e;">
            {{ fieldLabels[field] }}
          </label>

          <!-- اینپوت داینامیک بر اساس نوع فیلد -->
          <input 
            v-model="form[field]" 
            :type="field === 'phone' ? 'tel' : (field === 'email' ? 'email' : 'text')"
            class="w-full h-11 rounded-full border border-gray-200 px-4 text-[14px] outline-none focus:border-[#0a0a5e] transition-all bg-[#ebebeb]/40 focus:bg-transparent placeholder:text-gray-300 dir-ltr"
            :dir="(field === 'username') ? 'rtl' : 'ltr'"
            :placeholder="fieldPlaceholders[field]"
            @input="field === 'phone' ? handlePhoneInput($event) : null"
          />
        </div>

        <!-- فیلدهای رمز عبور -->
        <div class="flex flex-col md:flex-row gap-3 mb-3">
          <div v-for="field in passwordFields" :key="field" class="flex-1">
            
            <!-- لیبل -->
            <label class="block text-[#0a0a5e] font-bold mb-1 mr-3 text-[13px] text-right" style="text-shadow: 0.5px 0 0 #0a0a5e, -0.5px 0 0 #0a0a5e;">
              {{ fieldLabels[field] }}
            </label>

            <div class="relative">
              
              <!-- اینپوت رمز با قابلیت نمایش یا مخفی کردن -->
              <input 
                v-model="form[field]" 
                :type="isPasswordVisible(field) ? 'text' : 'password'"
                class="w-full h-11 rounded-full border border-gray-200 px-4 text-[14px] outline-none focus:border-[#0a0a5e] transition-all bg-[#ebebeb]/40 focus:bg-transparent pl-12 placeholder:text-gray-300 "
                dir="ltr"
                :placeholder="fieldPlaceholders[field]"
              />

              <!-- دکمه نمایش یا مخفی کردن رمز -->
              <button 
                type="button"
                @click="toggleVisibility(field)"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a0a5e] transition-colors "
              >
                <!-- آیکن‌ها بدون تغییر -->
              </button>
            </div>
          </div>
        </div>

        <!-- پیام خطا -->
        <p v-if="error" class="text-red-500 text-[11px] text-center mb-1 font-bold animate-pulse">
          {{ error }}
        </p>

        <!-- دکمه ثبت نام -->
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full h-12 bg-[#0b0b54] text-white text-base font-bold rounded-lg hover:bg-[#15158a] transition-all active:scale-95 mt-2 shadow-md disabled:opacity-70 flex items-center justify-center overflow-hidden"
        >
          <span v-if="!isLoading">ثبت نام</span>

          <!-- حالت لودینگ -->
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

/* تایپ فرم ثبت نام */
interface RegisterForm {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

/* روتینگ */
const router = useRouter()

/* مدل اصلی فرم */
const form = reactive<RegisterForm>({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

/* وضعیت‌ها */
const error = ref('')
const isShaking = ref(false)
const isLoading = ref(false)

/* کنترل نمایش رمز */
const showPassword = ref(false)
const showConfirmPassword = ref(false)

/* فیلدهای تکی */
const singleFields: (keyof RegisterForm)[] = ['username', 'email', 'phone']

/* فیلدهای رمز */
const passwordFields: (keyof RegisterForm)[] = ['password', 'confirmPassword']

/* لیبل‌ها */
const fieldLabels: Record<keyof RegisterForm, string> = {
  username: 'نام کاربری',
  email: 'ایمیل',
  phone: 'شماره موبایل',
  password: 'رمز عبور',
  confirmPassword: 'تکرار رمز عبور'
}

/* placeholder ها */
const fieldPlaceholders: Record<keyof RegisterForm, string> = {
  username: 'نام و نام خانوادگی',
  email: 'example@mail.com',
  phone: '09123456789',
  password: '••••••••',
  confirmPassword: '••••••••'
}

/* بررسی اینکه رمز قابل مشاهده است یا نه */
const isPasswordVisible = (field: keyof RegisterForm) => {
  return field === 'password' ? showPassword.value : showConfirmPassword.value
}

/* تغییر وضعیت نمایش رمز */
const toggleVisibility = (field: keyof RegisterForm) => {
  if (field === 'password') showPassword.value = !showPassword.value
  if (field === 'confirmPassword') showConfirmPassword.value = !showConfirmPassword.value
}

/* فقط اجازه ورود عدد برای موبایل */
const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  if (value.length > 11) value = value.slice(0, 11);
  form.phone = value;
};

/* فعال کردن خطا + انیمیشن */
const triggerError = (msg: string) => {
  error.value = msg
  isShaking.value = true
  setTimeout(() => isShaking.value = false, 500)
}

/* ارسال فرم */
const submit = async () => {
  error.value = ''
  
  const values = Object.values(form);

  /* بررسی پر بودن فیلدها */
  if (values.some(value => !value.trim())) {
    triggerError('لطفاً تمامی فیلدها را پر کنید');
    return;
  }

  /* بررسی طول موبایل */
  if (form.phone.length < 11) {
    triggerError('شماره موبایل باید ۱۱ رقم باشد')
    return
  }

  /* بررسی تطابق رمز */
  if (form.password !== form.confirmPassword) {
    triggerError('رمز عبور و تکرار آن با هم مطابقت ندارند')
    return
  }

  isLoading.value = true

  try {
    /* شبیه‌سازی درخواست سرور */
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    /* ذخیره اطلاعات موقت برای مرحله OTP */
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
/* انیمیشن ورود */
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* انیمیشن لرزش هنگام خطا */
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
}

.shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
</style>  