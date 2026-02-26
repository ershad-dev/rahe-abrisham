<template>
  <div class="bg-white rounded-[30px] p-6 md:p-10 shadow-sm w-full max-w-4xl mx-auto min-h-[600px]" dir="ltr">
<div class="flex flex-col items-start gap-4 mb-12" dir="rtl">
      <h2 class="text-[#0a0a5e] font-bold text-xl md:text-2xl">سفارش‌های من</h2>
      
      <button 
        @click="$emit('back')" 
        class="flex items-center gap-2 text-red-500 font-bold text-[15px] hover:scale-105 transition-transform"
      >
        <span class="font-bold">بازگشت</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>

    <div class="text-center mb-10">
      <h3 class="text-gray-800 font-bold text-lg mb-2">وضعیت سفارش</h3>
      <p class="text-gray-500 text-[14px]">مقدار سود از هر مشارکت</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      
      <div class="flex flex-col items-center justify-center text-center order-2 md:order-1 pt-10">
        <h4 class="text-red-600 font-black text-5xl md:text-6xl mb-6">سود کل</h4>
        <div class="max-w-[280px]  p-5">
          <p class="text-[13px] text-gray-700 leading-7">
            در صورت اتمام مشارکت در این محموله و رسیدن افراد به حد نصاب 
            <span class="font-bold">( ۱۰ نفر )</span>
            سود کل به صورت عدد مشخصی به مقدار 
            <span class="text-red-600 font-bold">۴۰٪ سود کل</span>
            خواهد بود.
          </p>
        </div>
      </div>

      <div class="relative order-1 md:order-2 flex justify-end">
        <div class="absolute right-[19px] top-2 bottom-2 w-[5px] bg-gray-200 rounded-full"></div>

        <div class="flex flex-col gap-10 w-full pr-12 relative">
          <div 
            v-for="(step, index) in orderSteps" 
            :key="index"
            class="flex items-center justify-end gap-4 relative"
          >
            <span 
              class="text-[14px] md:text-[15px] font-bold transition-colors" dir="rtl"
              :class="step.completed ? 'text-gray-800' : 'text-gray-400'"
            >
              {{ step.title }}
            </span>

            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm"
              :class="step.completed ? 'bg-green-600' : 'bg-gray-300'"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// تعریف خروجی برای دکمه بازگشت
defineEmits(['back']);

// مراحل سفارش مطابق تصویر
const orderSteps = ref([
  { title: 'درحال تامین محموله از تامین کننده', completed: true },
  { title: 'درحال هماهنگی حمل و نقل', completed: false },
  { title: 'در مسیر گمرک مبدا (درون مرزی)', completed: false },
  { title: 'درحال ترخیص در گمرک مبدا', completed: false },
  { title: 'در مسیر گمرک مقصد', completed: false },
]);
</script>

<style scoped>
/* انیمیشن برای ورود به صفحه */
.bg-white {
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>