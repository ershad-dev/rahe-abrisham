<template>
  <div class="p-8 bg-white/70 backdrop-blur-md rounded-[32px] border border-white shadow-xl">
    <h2 class="text-xl font-black text-slate-800 mb-6 text-center">تکمیل پروفایل</h2>
    
    <div class="space-y-4">
      <div class="space-y-2">
        <label class="text-sm font-bold text-slate-600 mr-2">نام و نام خانوادگی</label>
        <input type="text" placeholder="مثلاً: محمد راهی" class="w-full p-4 rounded-xl border border-gray-100 bg-white/50 focus:bg-white outline-none" />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-bold text-slate-600 mr-2">کد معرف (اختیاری)</label>
        <input type="text" class="w-full p-4 rounded-xl border border-gray-100 bg-white/50 text-center" />
      </div>
      
      <button class="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg shadow-teal-100">
        ثبت‌نام نهایی
      </button>
    </div>
  </div>
</template>