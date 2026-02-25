<template>
  <div class="flex flex-col gap-4 w-full" dir="ltr">
    <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex items-center justify-between" dir="rtl">
      <div class="w-16 h-16 bg-[#0b0b54] rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
        {{ userInitials }}
      </div>
      <div class="flex flex-col items-start w-full mr-4">
        <h3 class="text-[#0a0a5e] font-bold text-[15px] text-right w-full">{{ userName }}</h3>
        <p class="text-gray-400 text-[13px] mt-1 font-sans text-right w-full">{{ phoneNumber }}</p>
        <div class="mt-2 bg-[#e8f5e9] px-3 py-1 rounded-full flex items-center gap-1">
          <span class="text-[#4caf50] text-[10px] font-bold">اعتبار سنجی شده</span>
          <svg class="w-3.5 h-3.5 text-[#4caf50]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[20px] py-6 shadow-sm border border-gray-50 flex flex-col relative overflow-hidden">
      <h4 class="text-[#0a0a5e] font-bold text-[17px] px-8 mb-4 text-right">منو کاربری</h4>
      <div class="flex flex-col w-full font-medium">
        <button 
          v-for="item in menuItems" :key="item.id"
          @click="handleMenuClick(item.id)"
          class="flex items-center justify-between px-8 py-4 transition-all relative group overflow-hidden"
          :class="activeTab === item.id ? 'text-[#0b0b54] bg-[#f8fafc]' : 'text-[#424242] hover:bg-gray-50/50'"
        >
          <div v-if="activeTab === item.id" class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#0b0b54] rounded-l-md"></div>

          <div class="flex items-center gap-4 w-full justify-end">
            <span class="text-[14px]" :class="[item.id === 'logout' ? 'text-red-500' : '', activeTab === item.id ? 'font-bold' : '']">
              {{ item.title }}
            </span>
            <svg 
              class="w-6 h-6 shrink-0" 
              :class="[activeTab === item.id ? 'text-[#0b0b54]' : 'text-[#757575]', item.id === 'logout' ? 'text-red-500' : '']"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
            >
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.iconPath" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// تعریف ورودی‌ها و خروجی‌ها (Props & Emits)
const props = defineProps(['activeTab']);
const emit = defineEmits(['update:activeTab', 'logout']);

// داده‌های فرضی کاربر (در پروژه‌ی واقعی از Store گرفته می‌شود)
const userName = "مهدی قنبرپور مطلق";
const phoneNumber = "09054886048";

// لاجیک ساده برای آواتار (حرف اول و آخر نام)
const userInitials = computed(() => {
  const parts = userName.split(' ');
  return parts.length > 1 ? parts[0][0] + parts[parts.length-2][0] : parts[0].substring(0, 2);
});

// تعریف آیتم‌های منو
const menuItems = [
  { id: 'account', title: 'اطلاعات حساب کاربری', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'password', title: 'تغییر رمز عبور', iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { id: 'orders', title: 'پیگیری سفارش ها', iconPath: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { id: 'tickets', title: 'تیکت به پشتیبانی', iconPath: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  { id: 'logout', title: 'خروج از حساب', iconPath: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' },
];

/**
 * مدیریت کلیک روی آیتم‌های منو
 * @param {string} id - شناسه آیتم کلیک شده
 */
const handleMenuClick = (id) => {
  if (id === 'logout') {
    handleLogout();
  } else {
    // بروزرسانی تب فعال در کامپوننت والد
    emit('update:activeTab', id);
  }
};

/**
 * منطق خروج از حساب کاربری
 */
const handleLogout = () => {
  // شبیه‌سازی تایید خروج
  const confirmLogout = confirm("آیا مایل به خروج از حساب کاربری هستید؟");
  if (confirmLogout) {
    console.log("در حال خروج...");
    // در اینجا می‌توانید توکن را پاک کنید یا به صفحه لاگین ریدایرکت کنید
    emit('logout'); 
    // مثال: window.location.href = '/login';
  }
};
</script>