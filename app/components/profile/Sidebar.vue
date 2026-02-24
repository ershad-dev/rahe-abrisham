<template>
  <div class="flex flex-col gap-4 w-full " dir="ltr">
    
    <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex items-center justify-between transition-all " dir="rtl">
      <div class="flex items-center">
        <div class="w-16 h-16 bg-[#0b0b54] rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0 ">
          مق
        </div>
        <div class="flex flex-col items-start w-full mr-4">
          <h3 class="text-[#0a0a5e] font-bold text-[15px] text-right w-full">مهدی قنبرپور مطلق</h3>
          <p class="text-gray-400 text-[13px] mt-1 font-sans text-right w-full">09054886048</p>
          <div class="mt-2 bg-[#e8f5e9] px-3 py-1 rounded-full flex items-center gap-1">
            <span class="text-[#4caf50] text-[10px] font-bold">اعتبار سنجی شده</span>
            <svg class="w-3.5 h-3.5 text-[#4caf50]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
      </div>

      <div id="mobile-logout-wrapper" class="md:hidden"></div>
    </div>

    <div class="bg-white rounded-[20px] py-6 shadow-sm border border-gray-50 flex flex-col relative overflow-hidden">
      <h4 class="hidden md:block text-[#0a0a5e] font-bold text-[17px] px-8 mb-4 text-right" dir="rtl">منو کاربری</h4>
      
      <div class="relative w-full">
        <div class="md:hidden absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none flex items-center justify-start pl-2">
          <svg class="w-5 h-5 text-[#0b0b54] animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div class="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/90 to-transparent z-20 pointer-events-none flex items-center justify-end pr-2">
          <svg class="w-5 h-5 text-[#0b0b54] animate-bounce-x-reverse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <div class="flex md:flex-col w-full font-medium overflow-x-auto md:overflow-x-visible custom-scrollbar pb-3 md:pb-0 scroll-smooth px-10 md:px-0">
          
  <button 
    v-for="item in menuItems" :key="item.id"
    @click="$emit('update:activeTab', item.id)"
    class="flex items-center justify-between px-8 py-4 transition-all relative shrink-0 md:shrink text-[#0b0b54]"
    :class="activeTab === item.id ? 'bg-[#f8fafc]' : 'hover:bg-gray-50/50'"
  >
    <div v-if="activeTab === item.id" class="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#0b0b54] rounded-l-md"></div>
    <div v-if="activeTab === item.id" class="md:hidden absolute bottom-0 left-0 right-0 h-1 bg-[#0b0b54]"></div>

    <div class="flex items-center gap-4 w-full justify-end">
      <span class="text-[14px]" :class="activeTab === item.id ? 'font-bold' : ''">
        {{ item.title }}
      </span>
      
      <svg 
        class="w-6 h-6 shrink-0 text-[#0b0b54]" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="1.2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" :d="item.iconPath" />
      </svg>
    </div>
  </button>

  <div id="desktop-logout-wrapper" class="hidden md:block border-t border-gray-50 mt-4"></div>

</div>
      </div>
    </div>

    <Teleport :to="isMobile ? '#mobile-logout-wrapper' : '#desktop-logout-wrapper'" v-if="isMounted">
      <button 
        @click="handleLogout" 
        :class="[
          'flex items-center transition-all group',
          isMobile 
            ? 'flex-col justify-center p-2 rounded-xl bg-red-50 text-red-500 border border-red-100 active:scale-90' 
            : 'justify-between px-8 py-5 hover:bg-red-50 w-full'
        ]"
      >
        <div :class="['flex items-center gap-1 md:gap-4 w-full justify-end', isMobile ? 'flex-col' : 'flex-row']">
          <span :class="['text-red-500', isMobile ? 'text-[10px] font-bold mt-1' : 'text-[14px]']">
            خروج {{ isMobile ? '' : 'از حساب' }}
          </span>
          <svg class="w-6 h-6 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </button>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineProps(['activeTab']);
const emit = defineEmits(['update:activeTab', 'logout']);

const isMobile = ref(false);
const isMounted = ref(false);

const checkScreen = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  isMounted.value = true;
  checkScreen();
  window.addEventListener('resize', checkScreen);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen);
});

const menuItems = [
  { id: 'account', title: 'اطلاعات حساب کاربری', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'password', title: 'تغییر رمز عبور', iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { id: 'orders', title: 'پیگیری سفارش ها', iconPath: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { id: 'tickets', title: 'تیکت به پشتیبانی', iconPath: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  { id: 'auth', title: 'احراز هویت', iconPath: 'M12 1a9 9 0 0 1 9 9v4a9 9 0 0 1-12.092 8.455c.128-.177.251-.357.369-.542l.17-.28a10.918 10.918 0 0 0 1.55-5.345L11 16V9h2v7a12.96 12.96 0 0 1-.997 5.001 7.026 7.026 0 0 0 2.27-.378c.442-1.361.693-2.808.724-4.31L15 16v-3.001h2V16c0 1.088-.102 2.153-.298 3.185a6.978 6.978 0 0 0 2.294-4.944L19 14v-4A7 7 0 0 0 7.808 4.394L6.383 2.968A8.962 8.962 0 0 1 12 1zm-5 9a5 5 0 1 1 10 0v1h-2v-1a3 3 0 0 0-5.995-.176L9 10v6c0 1.567-.4 3.04-1.104 4.323l-.024.04c-.23.414-.491.808-.782 1.179a9.03 9.03 0 0 1-1.237-.97l-.309-.3A8.97 8.97 0 0 1 3 14v-4c0-2.125.736-4.078 1.968-5.617l1.426 1.425a6.966 6.966 0 0 0-1.39 3.951L5 10v4c0 1.675.588 3.212 1.57 4.417a6.91 6.91 0 0 0 .426-2.176L7 16v-6z' },
];

const handleLogout = () => { emit('logout'); };
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #ebebeb; border-radius: 10px; margin: 0 40px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #5c5c5c; border-radius: 10px; }

@keyframes bounce-x { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-5px); } }
@keyframes bounce-x-reverse { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
.animate-bounce-x { animation: bounce-x 1s infinite; }
.animate-bounce-x-reverse { animation: bounce-x-reverse 1s infinite; }

@media (min-width: 768px) { .custom-scrollbar::-webkit-scrollbar { display: none; } }
button { -webkit-tap-highlight-color: transparent; outline: none; }
</style>

