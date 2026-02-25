<template>
  <div class="bg-white rounded-[30px] p-4 md:p-6 shadow-sm w-full max-w-4xl mx-auto" dir="rtl">
    <h2 class="text-[#0a0a5e] font-bold text-xl md:text-2xl mb-6 md:mb-8 text-right">سفارش‌های من</h2>

    <div class="flex flex-col gap-6">
      <div 
        v-for="order in orders" 
        :key="order.id"
        class="relative overflow-hidden rounded-[25px] flex flex-col md:flex-row items-stretch text-white shadow-md"
        style="background: linear-gradient(90deg, #2b9bb1 0%, #1e3a5f 100%);"
      >
        <div class="flex-1 flex flex-col md:grid md:grid-cols-2 p-6 md:p-8 pr-8">
          
          <div class="flex flex-col gap-2 text-right order-1 border-b border-white/10 pb-5 mb-5 md:border-0 md:pb-0 md:mb-0">
            <div class="flex items-center gap-2">
              <span class="text-[13px] md:text-[14px] text-[#BFFFFA] opacity-80">نام کالا :</span>
              <span class="font-bold text-[14px] md:text-[15px]">{{ order.name }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[13px] md:text-[14px] text-[#BFFFFA] opacity-80">نوع بیمه کالا :</span>
              <span class="font-bold text-[14px] md:text-[15px]">{{ order.insurance }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[13px] md:text-[14px] text-[#BFFFFA] opacity-80">نوع حمل بار :</span>
              <span class="font-bold text-[14px] md:text-[15px]">{{ order.shipping }}</span>
            </div>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-[14px] text-white">سهم خریداری شده :</span>
              <span class="font-bold text-[18px] md:text-[20px]">{{ order.sharesPurchased }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-3 justify-center order-2 border-b border-white/10 pb-5 mb-5 md:border-0 md:pb-0 md:mb-0 md:pr-4">
            <div class="flex items-center gap-2">
              <span class="text-[13px] md:text-[14px] opacity-90">مقدار سود :</span>
              <span class="font-bold text-[15px] md:text-[17px]">{{ order.profit }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[13px] md:text-[14px] opacity-90">مقدار هر سهم :</span>
              <span class="font-bold text-[15px] md:text-[17px]">{{ order.shareValue }}</span>
            </div>
            <button class="hidden md:block text-right text-[11px] mt-6 opacity-70 hover:opacity-100 transition-opacity underline-offset-4 underline text-[#BFFFFA]">
              ارسال تیکت برای پیگیری سفارش
            </button>
          </div>
        </div>

        <div class="w-full md:w-1/4 flex flex-col items-center justify-center p-6 md:p-4 border-b border-white/10 md:border-0 gap-4 order-3 md:bg-transparent" dir="ltr">
          <span class="text-[15px]  font-medium tracking-wide opacity-90">{{ order.date }}</span>
          
          <div class="flex flex-col items-center">
            <span class="text-[10px] opacity-60  uppercase tracking-[0.2em]">hscode</span>
            <span class="text-[14px]  font-bold">{{ order.hscode }}</span>
          </div>
          
          <div 
            :class="getStatusClass(order.status)"
            class="px-6 py-2 rounded-full text-[12px] md:text-[13px] font-black shadow-lg min-w-[140px] text-center transition-transform active:scale-95"
          >
            {{ order.statusLabel }}
          </div>
        </div>

        <div class="order-4 md:hidden p-5 text-center bg-black/10">
            <button class="text-[13px] font-bold opacity-90 hover:opacity-100 transition-all underline-offset-8 underline text-[#BFFFFA]">
              ارسال تیکت برای پیگیری سفارش
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// لیست داده‌های سفارشات         
const orders = ref([
  {
    id: 1,
    name: 'فرمان ماشین',
    insurance: 'بیمه عبور مرور',
    shipping: 'حمل هوایی',
    sharesPurchased: '20',
    profit: '$500',
    shareValue: '$20',
    date: '1404 / 12 / 05',
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
    date: '1404 / 12 / 05',
    hscode: '12873g91',
    status: 'pending',
    statusLabel: 'درانتظار پرداخت'
  },
  {
    id: 3,
    name: 'فرمان ماشین',
    insurance: 'بیمه عبور مرور',
    shipping: 'حمل هوایی',
    sharesPurchased: '20',
    profit: '$500',
    shareValue: '$20',
    date: '1404 / 12 / 05',
    hscode: '12873g91',
    status: 'unpaid',
    statusLabel: 'پرداخت نشده'
  }
]);

/**
 * مدیریت استایل‌های رنگی وضعیت
 * @param {string} status کد وضعیت سفارش
 */
const getStatusClass = (status) => {
  switch (status) {
    case 'paid':
      return 'bg-[#c1f9b3] text-[#1a401c]'; // سبز ملایم با متن تیره
    case 'pending':
      return 'bg-[#fff1a8] text-[#6b5900]'; // زرد با متن تیره
    case 'unpaid':
      return 'bg-[#ffb6b6] text-[#7d1a1a]'; // قرمز با متن تیره
    default:
      return 'bg-gray-200 text-gray-700';
  }
};
</script>

<style scoped>
/* استفاده از فونت سیستم برای بخش‌های لاتین و اعداد */
.font-sans { 
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; 
}

/* افکت‌های انتقال ملایم برای تعامل بهتر کاربر */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>