<template>
  <div class="min-h-screen bg-[#ebebeb] flex items-center justify-center p-4 dir-rtl font-sans">
    
    <div class="w-full max-w-md relative">
      <Transition name="slide-fade" mode="out-in">
        
        <AuthLoginFields 
          v-if="currentStep === 'login'" 
          @next="handleLoginNext" 
        />

        <AuthOtpFields 
          v-else-if="currentStep === 'otp'" 
          :phone="userPhone"
          @verify="handleOtpVerify" 
          @back="currentStep = 'login'" 
        />

        <AuthRegisterFields 
          v-else-if="currentStep === 'register'" 
          @complete="handleRegisterComplete" 
        />

      </Transition>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// غیرفعال کردن لایوت اصلی سایت (هدر و فوتر و منوی پایین فعلا اینجا نباشند)
definePageMeta({
  layout: false
})

// مدیریت وضعیت‌ها
const currentStep = ref('login') // مراحل: login, otp, register
const userPhone = ref('')

// عملکردها
const handleLoginNext = (phone) => {
  userPhone.value = phone
  console.log('ارسال پیامک به:', phone)
  // اینجا بعداً API فراخوانی می‌شود
  currentStep.value = 'otp'
}

const handleOtpVerify = () => {
  console.log('کد تایید شد')
  // اگر کاربر جدید بود:
  currentStep.value = 'register'
  // اگر کاربر قدیمی بود: هدایت به پنل کاربری
}

const handleRegisterComplete = () => {
  console.log('ثبت‌نام تکمیل شد')
  navigateTo('/') // هدایت به صفحه اصلی
}
</script>

<style scoped>
/* انیمیشن نرم برای تعویض مراحل */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>