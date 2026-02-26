<template>
  <div class="min-h-screen bg-white font-sans overflow-x-hidden mt-[50px]">
    <transition name="page-fade" mode="out-in">
      
      <AdminLogin 
        v-if="!isLoggedIn" 
        @login-success="handleLoginSuccess" 
      />

      <AdminHome 
        v-else 
        @logout="handleLogout"
      />

    </transition>
  </div>
</template>

<script setup>


const isLoggedIn = ref(false);

/**
 * بخش کلیدی: جلوگیری از پریدن به صفحه لاگین هنگام رفرش (Refresh)
 * بلافاصله بعد از لود شدن کامپوننت، وضعیت را از LocalStorage می‌خواند.
 */
onMounted(() => {
  const savedAuth = localStorage.getItem('silk_road_admin_auth');
  if (savedAuth === 'true') {
    isLoggedIn.value = true;
  }
});

/**
 * تابع مدیریت ورود موفق
 * وضعیت را در مرورگر ذخیره می‌کند تا با رفرش پاک نشود.
 */
const handleLoginSuccess = () => {
  isLoggedIn.value = true;
  localStorage.setItem('silk_road_admin_auth', 'true');
};

/**
 * تابع مدیریت خروج
 * وضعیت را از حافظه پاک می‌کند تا کاربر دوباره به صفحه لاگین هدایت شود.
 */
const handleLogout = () => {
  isLoggedIn.value = false;
  localStorage.removeItem('silk_road_admin_auth');
};
</script>

<style>

/* انیمیشن محو شدن (Fade) هنگام جابجایی صفحات */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.4s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* استایل‌های کلی برای جلوگیری از اسکرول افقی ناخواسته */
body {
  margin: 0;
  padding: 0;
  background-color: white;
}
</style>