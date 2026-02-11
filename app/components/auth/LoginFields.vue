<template>
  <div class="p-8 bg-white/70 backdrop-blur-md rounded-[32px] border border-white shadow-xl">
    <div class="text-center mb-8">
      <div class="inline-flex p-4 bg-teal-50 rounded-2xl text-teal-600 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-5.19 4.59-9.362 9.716-10.198" />
        </svg>
      </div>
      <h2 class="text-2xl font-black text-slate-800">خوش آمدید</h2>
      <p class="text-slate-500 text-sm mt-2">برای ورود یا ثبت‌نام، شماره موبایل خود را وارد کنید</p>
    </div>

    <div class="space-y-5">
      <div class="relative">
        <input 
          v-model="phone"
          type="tel" 
          placeholder="۰۹۱۸*******"
          class="w-full p-4 pr-12 rounded-2xl border-2 border-gray-100 focus:border-teal-500 focus:bg-white outline-none transition-all text-center text-xl font-bold tracking-widest bg-gray-50/50"
        />
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </span>
      </div>
      
      <button 
        @click="$emit('next', phone)"
        class="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-200 transition-all active:scale-95"
      >
        دریافت کد تایید
      </button>
    </div>
  </div>
</template>

<script setup>
const phone = ref('')
defineEmits(['next'])
</script>