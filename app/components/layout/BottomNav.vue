<template>
  <nav class="lg:hidden fixed bottom-6 inset-x-5 z-[999] dir-rtl">
    <div class="bg-white/90 backdrop-blur-md border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[24px] flex items-center justify-between px-2 h-16">
      
      

      <NuxtLink to="/contact" class="nav-item">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <span class="nav-text">ارتباط با ما</span>
      </NuxtLink>

      <NuxtLink to="/capital" class="nav-item">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span class="nav-text">تامین سرمایه</span>
      </NuxtLink>

      <div class="relative flex-1 flex justify-center">
        <NuxtLink to="/" class="absolute -top-10 flex flex-col items-center group">
          <div class="bg-teal-600 p-4 rounded-full shadow-lg shadow-teal-200 border-[6px] border-[#ebebeb] text-white active:scale-90 transition-all duration-300 group-[.router-link-exact-active]:bg-teal-700 group-[.router-link-exact-active]:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span class="mt-11 text-[11px] font-bold text-teal-700">خانه</span>
        </NuxtLink>
      </div>

      <NuxtLink to="/about" class="nav-item">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span class="nav-text">درباره ما</span>
      </NuxtLink>

      <NuxtLink to="/auth" class="nav-item">
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <span class="nav-text">پروفایل</span>
      </NuxtLink>

    </div>
  </nav>
</template>

<style scoped>
.nav-item {
  @apply flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-300;
}
.icon-wrapper {
  @apply p-2 rounded-xl text-slate-500 transition-all duration-300;
}
.nav-text {
  @apply text-[10px] font-medium text-slate-500 transition-all duration-300 whitespace-nowrap;
}
/* فعال شدن حاله سبز بر اساس روت */
.router-link-active .icon-wrapper {
  @apply bg-teal-50 text-teal-600 shadow-inner;
}
.router-link-active .nav-text {
  @apply text-teal-600 font-bold;
}
</style>