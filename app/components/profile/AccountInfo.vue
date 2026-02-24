<template>
  <div class="bg-white rounded-[20px] p-6 md:p-10 shadow-sm border border-gray-50 relative w-full" dir="rtl">
    <div class="absolute left-6 top-6 md:left-10 md:top-10">
      <button class="bg-[#0b0b54] text-white px-8 py-2 rounded-lg font-bold text-[14px] hover:shadow-lg transition-all active:scale-95">
        ذخیره
      </button>
    </div>

    <h2 class="text-[#0a0a5e] font-bold text-xl mb-10 text-right">اطلاعات حساب کاربری</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
      <div v-for="field in fields" :key="field.label" class="flex flex-col gap-2 text-right">
        <label class="text-[#0a0a5e] font-bold text-[13px] mr-2">{{ field.label }}</label>
        <input 
          :type="field.type" 
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          class="w-full h-12 rounded-xl border border-gray-200 bg-[#ebebeb]/40 px-4 focus:bg-white focus:border-[#0b0b54] outline-none transition-all placeholder:text-gray-400"
          :class="field.dir === 'ltr' ? 'text-left font-sans' : 'text-right'"
          :dir="field.dir || 'rtl'"
        />
      </div>

      <div class="flex flex-col gap-2 text-right md:col-span-2">
        <label class="text-[#0a0a5e] font-bold text-[13px] mr-2">آدرس</label>
        <textarea 
          placeholder="متن تستی لورم ایپسوم"
          rows="4"
          class="w-full rounded-xl border border-gray-200 bg-[#ebebeb]/40 p-4 outline-none focus:bg-white focus:border-[#0b0b54] transition-all resize-none text-right"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
const fields = [
  { label: 'نام و نام خانوادگی', placeholder: 'مهدی قنبر پور', type: 'text' },
  { label: 'شماره موبایل', placeholder: '09054886048', type: 'text', disabled: true, dir: 'ltr' },
  { label: 'تاریخ تولد', placeholder: '1395 / 2 / 20', type: 'text' },
  { label: 'ایمیل', placeholder: 'Mahdi1234@gmail.com', type: 'email', dir: 'ltr' },
  { label: 'کد ملی', placeholder: '0671038795', type: 'text', dir: 'ltr' },
  { label: 'کد پستی', placeholder: '946169001', type: 'text', dir: 'ltr' },
];
</script>