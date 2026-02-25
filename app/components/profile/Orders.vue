<template>
  <div class="bg-white rounded-[30px] p-6 shadow-sm w-full max-w-4xl mx-auto" dir="rtl">
    <h2 class="text-[#0a0a5e] font-bold text-2xl mb-8 text-right">سفارش‌های من</h2>

    <div class="flex flex-col gap-6">
      <div 
        v-for="order in orders" 
        :key="order.id"
        class="relative overflow-hidden rounded-[25px] flex items-center min-h-[160px] text-white"
        style="background: linear-gradient(90deg, #2b9bb1 0%, #1e3a5f 100%);"
      >
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 p-6 pr-8">
          <div class="flex flex-col gap-3 justify-center order-1 md:order-2">
            <div class="flex items-center  gap-1 ">
              <span class="text-[14px]">مقدار سود :</span>
              <span class="font-bold text-[16px]">{{ order.profit }}</span>
            </div>
            <div class="flex items-center gap-1 ">
              <span class="text-[14px] ">مقدار هر سهم :</span>
              <span class="font-bold text-[16px]">{{ order.shareValue }}</span>
            </div>
            <button class="text-right text-[11px] mt-2 opacity-70 hover:opacity-100 transition-opacity underline-offset-4 underline text-[#BFFFFA] md:mt-[30px]">
              ارسال تیکت برای پیگیری سفارش
            </button>
          </div>

          <div class="flex flex-col gap-2 text-right order-2 md:order-1">
            <div class="flex items-center gap-1">
              <span class="text-[14px] text-[#BFFFFA] opacity-80">نام کالا :</span>
              <span class="font-bold text-[15px]">{{ order.name }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-[14px] text-[#BFFFFA] opacity-80">نوع بیمه کالا :</span>
              <span class="font-bold text-[15px]">{{ order.insurance }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-[14px] text-[#BFFFFA] opacity-80">نوع حمل بار :</span>
              <span class="font-bold text-[15px]">{{ order.shipping }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-[14px] text-white  ">سهم خریداری شده :</span>
              <span class="font-bold text-[18px]">{{ order.sharesPurchased }}</span>
            </div>
          </div>
        </div>

        <div class="w-1/3 md:w-1/4 flex flex-col items-center justify-center p-4 border-r border-white/10 gap-4" dir="ltr">
          <span class="text-[15px] font-sans font-medium opacity-90">{{ order.date }}</span>
          <div class="flex flex-col items-center">
            <span class="text-[12px] opacity-70 font-sans uppercase">hscode :</span>
            <span class="text-[14px] font-sans font-bold">{{ order.hscode }}</span>
          </div>
          
          <div 
            :class="getStatusClass(order.status)"
            class="px-6 py-1.5 rounded-full text-[13px] font-bold shadow-sm min-w-[120px] text-center"
          >
            {{ order.statusLabel }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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
    name: 'فرمان ماشین',
    insurance: 'بیمه عبور مرور',
    shipping: 'حمل هوایی',
    sharesPurchased: '20',
    profit: '$500',
    shareValue: '$20',
    date: '1404 / 12 / 5',
    hscode: '12873g91',
    status: 'pending',
    statusLabel: 'درانتظار  پرداخت'
  },
  {
    id: 3,
    name: 'فرمان ماشین',
    insurance: 'بیمه عبور مرور',
    shipping: 'حمل هوایی',
    sharesPurchased: '20',
    profit: '$500',
    shareValue: '$20',
    date: '1404 / 12 / 5',
    hscode: '12873g91',
    status: 'unpaid',
    statusLabel: 'پرداخت نشده'
  }
]);

const getStatusClass = (status) => {
  switch (status) {
    case 'paid':
      return 'bg-[#c1f9b3] text-[#3d8c40]';
    case 'pending':
      return 'bg-[#fff1a8] text-[#917d00]';
    case 'unpaid':
      return 'bg-[#ffb6b6] text-[#b33a3a]';
    default:
      return 'bg-gray-200 text-white';
  }
};
</script>

