<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative" dir="rtl">
    
    <div class="absolute top-6 right-6">
      <button 
        @click="showLogoutModal = true"
        class="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all font-bold text-sm shadow-sm"
      >
        <span>خروج</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 rotate-180">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
      </button>
    </div>

    <div class="mb-12 mt-12 text-center">
      <h1 class="text-[#0a0a5e] text-2xl md:text-3xl font-bold mb-2">خوش آمدید</h1>
      <p class="text-[#0a0a5e] text-xl md:text-2xl font-medium opacity-80">به پنل ادمین راه ابریشم</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
      <button class="admin-btn">
        کنترل سفارش ها
      </button>

      <button class="admin-btn">
        اطلاعات افراد (مشتری ها)
      </button>

      <button class="admin-btn">
        کارت های تامین سرمایه
      </button>

      <button class="admin-btn">
        پاسخ به تیکت ها
      </button>
    </div>

    <div v-if="showLogoutModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#0a0a5e]/40 backdrop-blur-sm" @click="showLogoutModal = false"></div>
      
      <div class="bg-white rounded-[35px] p-8 max-w-sm w-full relative shadow-2xl border border-gray-100 scale-in text-center">
        <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h3 class="text-[#0a0a5e] text-xl font-bold mb-2">خروج از حساب</h3>
        <p class="text-gray-500 mb-8 font-medium">آیا برای خروج از پنل ادمین اطمینان دارید؟</p>
        
        <div class="flex gap-3">
          <button 
            @click="confirmLogout"
            class="flex-1 bg-red-600 text-white font-bold py-3 rounded-2xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
          >
            خروج
          </button>
          <button 
            @click="showLogoutModal = false"
            class="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// ارسال رویداد خروج به فایل والد (AdminPanel.vue)
const emit = defineEmits(['logout']);

const showLogoutModal = ref(false);

const confirmLogout = () => {
  showLogoutModal.value = false;
  emit('logout'); 
};
</script>

<style scoped>
/* استایل دکمه‌های اصلی پنل */
.admin-btn {
  @apply bg-[#1e1e62] text-white font-bold py-6 px-4 rounded-[25px] 
         text-[16px] md:text-[18px] transition-all duration-300
         hover:bg-[#0a0a5e] hover:shadow-xl active:scale-95 shadow-md;
}

/* انیمیشن باز شدن مودال */
.scale-in {
  animation: scaleIn 0.25s ease-out forwards;
}

@keyframes scaleIn {
  from { 
    opacity: 0; 
    transform: scale(0.9) translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
}
</style>