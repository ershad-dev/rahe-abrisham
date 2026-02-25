<template>
  <div class="bg-white rounded-[30px] p-6 shadow-sm w-full max-w-4xl mx-auto min-h-[500px] flex flex-col" dir="rtl">
    
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-[#0a0a5e] font-bold text-xl md:text-2xl text-right">
        تیکت به پشتیبانی و پیگیری سفارش
      </h2>
      
      <button 
        @click="openNewTicketForm"
        class="bg-[#0b0b54] text-white px-4 py-2 rounded-lg text-[13px] font-bold flex items-center gap-2 hover:bg-[#16167a] transition-colors"
      >
        <span>+</span>
        تیکت جدید
      </button>
    </div>

    <div v-if="tickets.length === 0" class="flex-1 flex flex-col items-center justify-center pb-20">
      <div class="w-24 h-24 border-4 border-[#0b0b54] rounded-full flex items-center justify-center mb-6">
        <svg class="w-12 h-12 text-[#0b0b54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 class="text-[#0a0a5e] font-bold text-xl mb-8">تیکت فعال ندارید</h3>

      <button 
        @click="openNewTicketForm"
        class="bg-[#0b0b54] text-white px-8 py-2.5 rounded-xl text-[14px] font-bold flex items-center gap-2 hover:bg-[#16167a] transition-all active:scale-95 shadow-lg shadow-blue-900/20"
      >
        <span>+</span>
        تیکت جدید
      </button>
    </div>

    <div v-else class="flex flex-col gap-4">
      <div v-for="ticket in tickets" :key="ticket.id" class="p-4 border border-gray-100 rounded-2xl bg-gray-50">
         <p class="text-[#0a0a5e] font-bold">موضوع: {{ ticket.subject }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// آرایه تیکت‌ها - اگر خالی باشد حالت "تیکت فعال ندارید" نمایش داده می‌شود
const tickets = ref([]);

const openNewTicketForm = () => {
  console.log('باز کردن فرم تیکت جدید');
  // منطق باز شدن فرم یا مودال اینجا قرار می‌گیرد
};
</script>

<style scoped>
/* انیمیشن ملایم برای تغییر وضعیت */
div {
  transition: all 0.3s ease-in-out;
}
</style>