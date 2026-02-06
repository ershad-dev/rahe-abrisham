<template>
  <footer class="relative w-full h-[px] overflow-hidden text-white dir-rtl font-sans">
    
    <img 
      src="~/assets/images/footer-bg.png" 
      alt="Background" 
      class="absolute inset-0 w-full h-full object-cover z-0"
    />

    <div class="relative z-10 w-full h-full px-10 py-16 flex flex-col md:flex-row justify-between">
      
      <div class="flex-1">
        <h3 class="text-[24px] font-bold mb-8 text-white">ارتباط با ما</h3>
        <div class="space-y-5 text-[18px]">
          <div class="flex items-center gap-3">
            <span>📞</span>
            <span>09158875649</span>
          </div>
          <div class="flex items-center gap-3">
            <span>📧</span>
            <span>info@solotis.ir</span>
          </div>
          <div class="flex items-start gap-3 leading-relaxed">
            <span>📍</span>
            <span>تهران - خیابان دهقان - کوچه قائم پلاک 60</span>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col md:items-center">
        <div class="text-right">
          <h3 class="text-[24px] font-bold mb-8 text-white">دسترسی سریع</h3>
          <ul class="space-y-4 text-[18px]">
            <li class="hover:text-gray-300 cursor-pointer transition">• پرسش‌های متداول صادرات</li>
            <li class="hover:text-gray-300 cursor-pointer transition">• ثبت سفارش کالا</li>
            <li class="hover:text-gray-300 cursor-pointer transition">• تماس با ما</li>
            <li class="hover:text-gray-300 cursor-pointer transition">• درباره ما</li>
          </ul>
        </div>
      </div>

      <div class="flex-1 flex items-end justify-center md:justify-end">
        <div class="flex gap-4">
          <div class="w-[120px] h-[140px] flex items-center justify-center">
            <img src="~/assets/images/e-namd.png" alt="لوگو" class="max-w-full max-h-full object-contain" />
          </div>
          
          <div class="w-[120px] h-[140px] flex items-center justify-center">
            <img src="~/assets/images/e-namd2.png" alt="لوگو" class="max-w-full max-h-full object-contain" />
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.dir-rtl {
  direction: rtl;
}
</style>