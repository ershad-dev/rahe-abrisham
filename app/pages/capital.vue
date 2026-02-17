<template>
  <div class="min-h-screen bg-[#ebebeb] py-[30px] md:py-[50px] flex justify-center [direction:rtl] overflow-x-hidden mt-[50px]">
    
    <div class="cards-wrapper flex flex-col gap-[35px] md:gap-[45px] w-full items-center px-4">
      
      <div 
        v-for="(item, index) in products" 
        :key="index"
        class="info-card relative w-full max-w-[1050px] flex flex-col md:flex-row justify-between p-[30px] md:p-[40px_60px] text-white rounded-[30px] overflow-hidden shadow-[0_15px_35px_rgba(26,42,77,0.3)] transition-all duration-300 hover:scale-[1.01]"
        :style="{ background: 'linear-gradient(90deg, #3db3b2 0%, #2d618d 50%, #1a2a4d 100%)' }"
      >
        <img 
          src="~/assets/images/dollar-circle.png" 
          alt="icon" 
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[400px] opacity-30 pointer-events-none z-0"
        >

        <div class="relative z-10 w-full md:w-[48%] flex flex-col justify-between">
          <ul class="flex flex-col gap-[12px] items-center md:items-start">
            <li v-for="(info, i) in item.details" :key="i" class="flex items-center text-[15px] md:text-[17px] whitespace-nowrap">
              <span class="w-[7px] h-[7px] bg-white rounded-full ml-[12px] flex-shrink-0"></span>
              <span class="font-black ml-[6px]">{{ info.label }} :</span>
              <span class="text-[#aaaaaa]">{{ info.value }}</span>
            </li>
          </ul>
          <a href="#" class="hidden md:block text-[16px] font-bold text-white opacity-90 hover:opacity-100 transition-all mt-6">
            برای دانلود فاکتور خرید کلیک کنید
          </a>
        </div>

        <div class="w-full h-[1px] bg-white/20 my-6 md:hidden relative z-10"></div>

        <div class="relative z-10 w-full md:w-[48%] flex flex-col justify-between items-center md:items-end text-center md:text-left">
          <p class="text-[17px] md:text-[19px] font-bold mb-4 md:mb-0">زمان تحویل کالا : {{ item.deliveryTime }}</p>
          
          <div class="flex flex-col gap-2 md:items-end">
            <p class="text-[16px] md:text-[18px] font-bold">قیمت هر سهم به دلار : ${{ item.pricePerShare }}</p>
            <p class="text-[16px] md:text-[18px] font-bold opacity-80">مقدار سهم : {{ item.shareAmount }}</p>
          </div>

          <a href="#" class="md:hidden text-[15px] font-bold text-white underline underline-offset-4 opacity-90 mt-8">
            برای دانلود فاکتور خرید کلیک کنید
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const products = [
  {
    deliveryTime: '30 روز',
    pricePerShare: '100',
    shareAmount: '100/20',
    details: [
      { label: 'نام کالا', value: 'قطعات گیربکس' },
      { label: 'نوع کالا', value: 'ماشین آلات' },
      { label: 'نوع حمل بار', value: 'حمل زمینی' },
      { label: 'نوع بیمه کالا', value: 'بیمه حوادث' },
    ]
  },
  {
    deliveryTime: '45 روز',
    pricePerShare: '250',
    shareAmount: '40/5',
    details: [
      { label: 'نام کالا', value: 'قطعات گیربکس' },
      { label: 'نوع کالا', value: 'ماشین آلات' },
      { label: 'نوع حمل بار', value: 'حمل زمینی' },
      { label: 'نوع بیمه کالا', value: 'بیمه حوادث' },
    ]
  },
  {
    deliveryTime: '20 روز',
    pricePerShare: '180',
    shareAmount: '80/15',
    details: [
      { label: 'نام کالا', value: 'قطعات گیربکس' },
      { label: 'نوع کالا', value: 'ماشین آلات' },
      { label: 'نوع حمل بار', value: 'حمل زمینی' },
      { label: 'نوع بیمه کالا', value: 'بیمه حوادث' },
    ]
  }
]
</script>

<style scoped>

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.info-card {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>