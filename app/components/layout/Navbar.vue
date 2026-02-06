<template>
<header class="fixed top-0 left-0 w-full z-50 dir-rtl">
    <div class="w-full flex items-center justify-between bg-white/60 backdrop-blur-md px-8 py-2 shadow-sm border-b border-white/20">
      
      <div class="flex items-center">
        <div class="w-12 h-12 bg-gray-400 rounded-full ml-4"></div>
        
        <ul class="hidden lg:flex items-center text-slate-800 font-medium text-sm">
          <li class="px-3 border-l border-gray-400/30 hover:text-blue-700 transition"><NuxtLink to="/">خانه</NuxtLink></li>
          <li class="px-3 border-l border-gray-400/30 hover:text-blue-700 transition"><NuxtLink to="/capital">تامین سرمایه</NuxtLink></li>
          <li class="px-3 border-l border-gray-400/30 hover:text-blue-700 transition"><NuxtLink to="/about">درباره ما</NuxtLink></li>
          <li class="px-3 border-l border-gray-400/30 hover:text-blue-700 transition"><NuxtLink to="/contact">ارتباط با ما</NuxtLink></li>
          <li class="px-3 hover:text-blue-700 transition"><NuxtLink to="/order">ثبت سفارش کالا</NuxtLink></li>
        </ul>
      </div>

      <div class=" dir:tr, flex items-center bg-white rounded-full overflow-hidden shadow-inner w-64 md:w-80">

        <input 
          type="text" 
          placeholder="جستجو" 
          class="w-full bg-transparent border-none py-1 px-4 text-right text-sm outline-none placeholder-gray-400 rounded-none"
        >
                <button class="bg-gradient-to-r from-[#AAA4A4] to-[#D23729]  p-2 px-4 text-white hover:opacity-90 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      
    </div>
  </header>
</template>

<style scoped>
.dir-rtl {
  direction: rtl;
}
</style>