<template>
  <div class="bg-white rounded-[30px] p-4 md:p-6 shadow-sm w-full max-w-4xl mx-auto" dir="rtl">
    <h2 class="text-[#0a0a5e] font-bold text-xl md:text-2xl mb-6 md:mb-8 text-right">سفارش‌های من</h2>

    <div class="flex flex-col gap-6">
      <div 
        v-for="order in orders" 
        :key="order.id"
        class="relative overflow-hidden rounded-[25px] flex flex-col md:flex-row items-stretch text-white shadow-md transition-all hover:shadow-lg"
        style="background: linear-gradient(90deg, #2b9bb1 0%, #1e3a5f 100%);"
      >
        <div class="flex-1 grid grid-cols-1 md:grid-cols-3 p-6 md:p-8 gap-6 md:gap-4">
          
          <div class="flex flex-col gap-3 md:gap-4 text-right order-1 border-b border-white/10 pb-5 md:pb-0 md:border-0">
            <div class="flex items-center gap-2">
              <span class="text-[13px] md:text-[14px] text-[#BFFFFA] opacity-80 shrink-0">نام کالا :</span>
              <span class="font-bold text-[14px] md:text-[15px]">{{ order.name }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[13px] md:text-[14px] text-[#BFFFFA] opacity-80 shrink-0">نوع بیمه کالا :</span>
              <span class="font-bold text-[14px] md:text-[15px]">{{ order.insurance }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[13px] md:text-[14px] text-[#BFFFFA] opacity-80 shrink-0">نوع حمل بار :</span>
              <span class="font-bold text-[14px] md:text-[15px]">{{ order.shipping }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[13px] md:text-[14px] text-white shrink-0">سهم خریداری شده :</span>
              <span class="font-bold text-[16px] md:text-[18px] font-sans">{{ order.sharesPurchased }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-4 justify-center items-start md:items-center order-2 border-b border-white/10 pb-5 md:pb-0 md:border-0">
            <div class="flex items-center gap-2 md:mt-[-5px]">
              <span class="text-[13px] md:text-[14px] text-white">مقدار سود :</span>
              <span class="font-bold text-[15px] md:text-[17px] font-sans tracking-wide">{{ order.profit }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[13px] md:text-[14px] text-white">مقدار هر سهم :</span>
              <span class="font-bold text-[15px] md:text-[17px] font-sans tracking-wide">{{ order.shareValue }}</span>
            </div>
            <div class="flex items-center gap-2 mt-2 font-sans md:mt-[40px]">
              <span class="text-[12px] text-[#BFFFFA] opacity-60 uppercase">hscode :</span>
              <span class="text-[14px] font-bold tracking-wider">{{ order.hscode }}</span>
            </div>
          </div>

          <div class="flex flex-col items-center md:items-end justify-between gap-5 order-3 md:mr-[10px]" dir="ltr">
            <span class="text-[16px] md:text-[18px] font-sans font-medium tracking-widest">
              {{ order.date }}
            </span>
            
            <button 
              @click="$emit('track-order', order.id)"
              class="flex items-center gap-2 text-[12px] md:text-[13px] opacity-80 hover:opacity-100 transition-opacity group"
            >
              <span class="underline underline-offset-4">پیگیری سفارش</span>
              <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            
            <div 
              :class="getStatusClass(order.status)"
              class="px-8 py-2 rounded-full text-[12px] md:text-[13px] font-black shadow-lg min-w-[150px] text-center"
            >
              {{ order.statusLabel }}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// اضافه شدن تعریف Emit برای ارسال به والد
defineEmits(['track-order']);

const orders = ref([
  {
    id: 1,
    name: 'فرمان ماشین',
    insurance: 'بیمه عبور مرور',
    shipping: 'حمل هوایی',
    sharesPurchased: '20',
    profit: '$500',
    shareValue: '$20',
    date: '1404 / 12 / 5',
    hscode: '12873g91',
    status: 'paid',
    statusLabel: 'پرداخت شده'
  },
  {
    id: 2,
    name: 'کالای نمونه ۲',
    insurance: 'بیمه ترانزیت',
    shipping: 'حمل دریایی',
    sharesPurchased: '50',
    profit: '$1,200',
    shareValue: '$24',
    date: '1404 / 11 / 20',
    hscode: '99283x12',
    status: 'pending',
    statusLabel: 'در انتظار پرداخت'
  }
]);

const getStatusClass = (status) => {
  switch (status) {
    case 'paid':
      return 'bg-[#c1f9b3] text-[#1a401c]';
    case 'pending':
      return 'bg-[#fff1a8] text-[#6b5900]';
    case 'unpaid':
      return 'bg-[#ffb6b6] text-[#7d1a1a]';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};
</script>

<style scoped>
.font-sans { 
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; 
}
</style>