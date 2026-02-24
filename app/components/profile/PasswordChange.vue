<template>
  <div class="bg-white rounded-[20px] p-6 md:p-10 shadow-sm border border-gray-50 relative w-full" dir="rtl">
    <div class="absolute left-6 top-6 md:left-10 md:top-10">
      <button 
        @click="handleSubmit"
        :disabled="isLoading"
        class="bg-[#0b0b54] text-white px-8 py-2 rounded-lg font-bold text-[14px] hover:bg-[#1a1a7a] transition-all active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-out"
      >
        <span v-if="!isLoading">ذخیره</span>
        <span v-else class="flex items-center gap-2">
          <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          در حال ارسال...
        </span>
      </button>
    </div>

    <h2 class="text-[#0a0a5e] font-bold text-xl mb-12 text-right">تغییر رمز عبور</h2>

    <div class="flex flex-col gap-10 max-w-4xl mx-auto md:mx-0">
      
      <div v-for="field in passwordFields" :key="field.id" class="flex flex-col gap-3 text-right">
        <label class="text-[#0a0a5e] font-bold text-[14px] mr-2">{{ field.label }}</label>
        
        <div class="relative">
          <input 
            v-model="formData[field.key]"
            :type="field.show ? 'text' : 'password'" 
            class="w-full h-14 rounded-2xl border border-gray-200 bg-[#ebebeb]/40 pr-5 pl-14 focus:bg-white focus:border-[#0b0b54] outline-none transition-all text-left font-sans text-[#0a0a5e]"
            :class="{'border-red-500': errors[field.key]}"
            dir="ltr"
          />
          
    <button 
            @click="field.show = !field.show"
            type="button"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center transition-all cursor-pointer group z-10"
          >
            <svg v-if="!field.show" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0b0b54" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:scale-110 transition-transform">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0b0b54" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:scale-110 transition-transform">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
        <span v-if="errors[field.key]" class="text-red-500 text-xs mr-2">{{ errors[field.key] }}</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// ۱. وضعیت فیلدها (برای نمایش/عدم نمایش رمز)
const passwordFields = ref([
  { id: 'current', label: 'رمز عبور فعلی', key: 'oldPassword', show: false },
  { id: 'new', label: 'رمز عبور جدید', key: 'newPassword', show: false },
  { id: 'confirm', label: 'تکرار رمز عبور جدید', key: 'confirmPassword', show: false }
])

// ۲. داده‌های فرم
const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// ۳. مدیریت خطاها و لودینگ
const errors = reactive({})
const isLoading = ref(false)

// ۴. تابع اصلی ارسال فرم
const handleSubmit = async () => {
  // پاک کردن خطاهای قبلی
  Object.keys(errors).forEach(key => errors[key] = '')
  
  // الف) اعتبارسنجی (Frontend Validation)
  if (!formData.oldPassword) {
    errors.oldPassword = 'رمز عبور فعلی الزامی است'
  }
  
  if (formData.newPassword.length < 8) {
    errors.newPassword = 'رمز عبور جدید باید حداقل ۸ کاراکتر باشد'
  }

  if (formData.newPassword !== formData.confirmPassword) {
    errors.confirmPassword = 'تکرار رمز عبور با رمز جدید مطابقت ندارد'
    return // توقف عملیات
  }

  // ب) ارسال به سمت سرور
  if (Object.values(errors).every(e => !e)) {
    isLoading.value = true
    
    try {
      // اینجا کدهای مربوط به API خود را می‌نویسید
      // const response = await $fetch('/api/user/change-password', { method: 'POST', body: formData })
      
      console.log('ارسال داده‌ها:', formData)
      
      // شبیه‌سازی انتظار برای پاسخ سرور
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('رمز عبور با موفقیت تغییر یافت!')
      // پاک کردن فرم بعد از موفقیت
      formData.oldPassword = ''
      formData.newPassword = ''
      formData.confirmPassword = ''
      
    } catch (err) {
      alert('خطایی در سیستم رخ داده است.')
    } finally {
      isLoading.value = false
    }
  }
}
</script>