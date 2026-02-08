<template>
  <footer class="relative w-full overflow-hidden text-white dir-rtl font-sans">
    
    <img 
      src="~/assets/images/footer-bg.png" 
      alt="Background" 
      class="absolute inset-0 w-full h-full object-cover z-0"
    />

    <div class="relative z-10 w-full px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row gap-10 md:gap-4 justify-between">
      
      <div class="flex-1">
  <h3 class="text-[20px] md:text-[22px] font-bold mb-4 md:mb-6 text-white">ارتباط با ما</h3>
  <div class="space-y-4 text-[15px] md:text-[17px]">
    
    <div class="flex items-center gap-3">
      <img src="~/assets/images/call-calling.svg" alt="تلفن" class="w-5 h-5 object-contain" />
      <span class="dir-ltr">09158875649</span>
    </div>
    
    <div class="flex items-center gap-3">
      <img src="~/assets/images/sms-notification.png" alt="ایمیل" class="w-5 h-5 object-contain" />
      <span>info@solotis.ir</span>
    </div>
    
    <div class="flex items-start gap-3 leading-relaxed">
      <img src="~/assets/images/location.png" alt="آدرس" class="w-5 h-5 mt-1 object-contain" />
      <span>تهران - خیابان دهقان - کوچه قائم پلاک 60</span>
    </div>

  </div>
</div>

      <div class="flex-1 flex flex-col md:items-center">
        <div class="text-right">
          <h3 class="text-[20px] md:text-[22px] font-bold mb-4 md:mb-6 text-white">دسترسی سریع</h3>
          <ul class="space-y-3 text-[15px] md:text-[17px]">
            <li class="hover:text-gray-300 cursor-pointer transition">• پرسش‌های متداول صادرات</li>
            <li class="hover:text-gray-300 cursor-pointer transition">• ثبت سفارش کالا</li>
            <li class="hover:text-gray-300 cursor-pointer transition">• تماس با ما</li>
            <li class="hover:text-gray-300 cursor-pointer transition">• درباره ما</li>
          </ul>
        </div>
      </div>

      <div class="flex-1 flex items-center justify-center md:items-end md:justify-end">
        <div class="grid grid-cols-2 gap-4">
          <div class="w-[80px] h-[100px] md:w-[90px] md:h-[110px] flex items-center justify-center">
            <img src="~/assets/images/khallagh.png" alt="لوگو ۱" class="max-w-full max-h-full object-contain" />
          </div>
          
          <div class="w-[80px] h-[100px] md:w-[90px] md:h-[110px] flex items-center justify-center">
            <img src="~/assets/images/senf.png" alt="لوگو ۲" class="max-w-full max-h-full object-contain" />
          </div>

          <div class="w-[80px] h-[100px] md:w-[90px] md:h-[110px] flex items-center justify-center">
            <img src="~/assets/images/saderat.png" alt="لوگو ۳" class="max-w-full max-h-full object-contain" />
          </div>

          <div class="w-[80px] h-[100px] md:w-[90px] md:h-[110px] flex items-center justify-center">
            <img src="~/assets/images/enamad.png" alt="لوگو ۴" class="max-w-full max-h-full object-contain" />
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
.dir-ltr {
  direction: ltr;
}
</style>