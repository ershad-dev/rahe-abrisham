<template>
  <div class="p-8 bg-white/70 backdrop-blur-md rounded-[32px] border border-white shadow-xl">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-black text-slate-800">کد تایید</h2>
      <p class="text-slate-500 text-sm mt-2">کد ۵ رقمی به شماره شما پیامک شد</p>
    </div>

    <div class="flex flex-row-reverse justify-center gap-3 mb-8" dir="ltr">
      <input 
        v-for="i in 5" :key="i"
        type="text"
        maxlength="1"
        class="w-12 h-16 bg-white border-2 border-gray-100 rounded-xl text-center text-2xl font-black text-teal-600 focus:border-teal-500 outline-none transition-all shadow-sm"
      />
    </div>

    <button 
      @click="$emit('verify')"
      class="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-2xl font-bold transition-all"
    >
      تایید و ورود
    </button>
    
    <button 
      @click="$emit('back')" 
      class="w-full mt-6 text-sm font-medium text-slate-400 hover:text-teal-600 transition-colors"
    >
      ← ویرایش شماره موبایل
    </button>
  </div>
</template>

<script setup>
defineEmits(['verify', 'back'])
</script>