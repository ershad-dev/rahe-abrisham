<template>
  <div class="min-h-screen bg-[#f4f7fa] py-10 px-4 md:px-10" dir="ltr">
    <div class="max-w-[1200px] mx-auto ">
      
      <div class="text-center mb-10">
        <h1 class="text-2xl md:text-3xl font-extrabold text-[#0a0a5e] mt-[50px]">پروفایل کاربری</h1>
        <p class="text-gray-400 text-[13px] md:text-[14px] mt-2 font-bold">مدیریت حساب کاربری و اطلاعات شخصی</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div class="lg:col-span-8 xl:col-span-9 order-2 lg:order-1 w-full">
          <transition name="fade-slide" mode="out-in">
            <ProfileAccountInfo v-if="activeTab === 'account'" />
            
            <ProfilePasswordChange v-else-if="activeTab === 'password'" />

            <ProfileOrders v-else-if="activeTab === 'orders'" />

            <ProfileTickets v-else-if="activeTab === 'tickets'" />


            
            <div v-else class="bg-white p-16 rounded-[20px] shadow-sm border border-gray-50 text-center">
              <div class="text-gray-300 mb-4">
                <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 class="text-[#0a0a5e] font-bold">بخش {{ activeTabName }}</h3>
              <p class="text-gray-400 text-sm mt-2">این بخش به زودی تکمیل خواهد شد.</p>
            </div>
          </transition>
        </div>

        <div class="lg:col-span-4 xl:col-span-3 order-1 lg:order-2 w-full">
          <ProfileSidebar v-model:activeTab="activeTab" />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// وضعیت تب فعال (به صورت پیش‌فرض روی اطلاعات حساب)
const activeTab = ref('account');

// تابعی برای برگرداندن نام فارسی تب (فقط برای نمایش در بخش در حال توسعه)
const activeTabName = computed(() => {
  const titles = {
    'orders': 'پیگیری سفارش‌ها',
    'tickets': 'تیکت پشتیبانی',
    'auth': 'احراز هویت',
  };
  return titles[activeTab.value] || activeTab.value;
});
</script>

<style scoped>
/* انیمیشن جابه‌جایی نرم بین صفحات پروفایل */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>