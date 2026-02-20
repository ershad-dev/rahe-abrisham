<template>
  <div class="flex flex-col gap-[35px] md:gap-[45px] w-full items-center">
    <div 
      v-for="(item, index) in filteredProducts" 
      :key="index"
      class="info-card relative w-full max-w-[1050px] flex flex-col md:flex-row justify-between p-[30px] md:p-[40px_60px] text-[#BFFFFA] rounded-[30px] overflow-hidden shadow-[0_15px_35px_rgba(26,42,77,0.3)] transition-all duration-300 hover:scale-[1.01]"
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
            <span class="text-white/80">{{ info.value }}</span>
          </li>
        </ul>
        
        <a href="#" class="hidden md:block text-[16px] font-bold text-white opacity-90 hover:opacity-100 transition-all mt-6 underline underline-offset-8 decoration-white/30">
          برای دانلود فاکتور خرید کلیک کنید
        </a>
      </div>

      <div class="w-full h-[1px] bg-white/20 my-6 md:hidden relative z-10"></div>

      <div class="relative z-10 w-full md:w-[48%] flex flex-col justify-between items-center md:items-end text-center md:text-left">
        <p class="text-[17px] md:text-[19px] font-bold mb-4 md:mb-0 text-[#BFFFFA]">زمان تحویل کالا : {{ item.deliveryTime }}</p>
        
        <div class="flex flex-col gap-2 md:items-end">
          <p class="text-[16px] md:text-[18px] font-bold">قیمت هر سهم به دلار : ${{ item.pricePerShare }}</p>
          <p class="text-[16px] md:text-[18px] font-bold opacity-80">مقدار سهم : {{ item.shareAmount }}</p>
        </div>

        <a href="#" class="md:hidden text-[15px] font-bold text-white underline underline-offset-4 opacity-90 mt-8">
          برای دانلود فاکتور خرید کلیک کنید
        </a>
      </div>
    </div>

    <div v-if="filteredProducts.length === 0" class="text-gray-500 font-bold text-xl mt-10">
      موردی یافت نشد...
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// دریافت مقدار سرچ از صفحه اصلی
const props = defineProps<{
  searchQuery: string
}>()

// داده‌های محصولات که گفتی می‌خواهی همین‌جا مدیریت کنی
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
      { label: 'نام کالا', value: 'تجهیزات صنعتی' },
      { label: 'نوع کالا', value: 'صنعتی' },
      { label: 'نوع حمل بار', value: 'دریایی' },
      { label: 'نوع بیمه کالا', value: 'بیمه باربری' },
    ]
  }
  // اینجا می‌توانی محصولات را اضافه یا کم کنی
]

// فیلتر کردن بر اساس پروپسِ سرچ
const filteredProducts = computed(() => {
  if (!props.searchQuery) return products
  return products.filter(product => 
    product.details.some(d => d.label === 'نام کالا' && d.value.includes(props.searchQuery))
  )
})
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