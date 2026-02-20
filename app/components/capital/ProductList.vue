<template>
  <div class="w-full flex flex-col items-center gap-[40px]">
    <capitalProductCard 
      v-for="(product, index) in filteredList" 
      :key="index" 
      :item="product" 
    />
    
    <div v-if="filteredList.length === 0" class="text-gray-400 mt-10">
      موردی برای نمایش وجود ندارد.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// دریافت کلمه جستجو از والد (صفحه اصلی)
const props = defineProps<{ search: string }>()

// تمام داده‌ها اینجا قرار دارند (محل اضافه یا کم کردن)
const products = ref([
  {
    deliveryTime: '30 روز',
    pricePerShare: '100',
    shareAmount: '100/20',
    details: [
      { label: 'نام کالا', value: 'قطعات گیربکس' },
      { label: 'نوع کالا', value: 'ماشین آلات' },
      { label: 'نوع حمل بار', value: 'حمل زمینی' },
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
    ]
  },
  {
    deliveryTime: '45 روز',
    pricePerShare: '250',
    shareAmount: '40/5',
    details: [
      { label: 'نام کالا', value: 'تجهیزات الکترونیکی' },
      { label: 'نوع کالا', value: 'الکترونیکی' },
      { label: 'نوع حمل بار', value: 'دریایی' },
    ]
  }
  // برای اضافه کردن محصول، فقط کافیست یک آبجکت جدید اینجا اضافه کنید
])

// فیلتر کردن لیست بر اساس ورودی جستجو
const filteredList = computed(() => {
  if (!props.search) return products.value
  return products.value.filter(p => 
    p.details.some(d => d.label === 'نام کالا' && d.value.includes(props.search))
  )
})
</script>