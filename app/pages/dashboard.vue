

<template>
  <div class="min-h-screen pt-16 bg-[#f4f7fa] inte-font" dir="rtl">
    <header class="bg-white border-b  border-[#ebebeb] h-16 flex items-center justify-between px-6  top-0 left-0 w-full z-50 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10  bg-[#0a0a5e] rounded-full flex items-center justify-center text-white font-bold shadow-lg uppercase transition-transform hover:scale-105">
          {{ userInitial }}
        </div>
        <div>
          <h2 class="text-[#0a0a5e] font-bold text-sm leading-none">{{ userName }} </h2>
          <span class="text-[10px] text-green-500 font-medium flex items-center gap-1">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            آنلاین
          </span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button @click="logout" class="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors group">
          <span class="text-xs font-bold hidden sm:inline">خروج</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>

    <div class="flex pt-16">
      <aside class="hidden md:flex w-64 bg-white border-l border-[#ebebeb] flex-col p-6 h-[calc(100vh-64px)] sticky top-16 justify-between">
        <nav class="space-y-2">
          <div class="p-3 bg-[#0a0a5e] text-white rounded-xl text-sm font-bold flex items-center gap-3 shadow-md">
            <img src="~/assets/images/plane.png" class="w-5 h-5 brightness-0 invert" />
            پیشخوان
          </div>
          <div v-for="item in ['رزروها', 'تراکنش‌ها', 'تنظیمات']" :key="item" 
               class="p-3 text-gray-400 hover:bg-[#ebebeb]/40 hover:text-[#0a0a5e] rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-3">
            <div class="w-5 h-5 rounded-md border-2 border-[#ebebeb]"></div>
            {{ item }}
          </div>
        </nav>

        <button @click="logout" class="mt-auto p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl text-sm font-bold transition-all flex items-center gap-3 border border-transparent hover:border-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          خروج از حساب
        </button>
      </aside>

      <main class="flex-1 p-6 md:p-10">
        <div class="max-w-5xl mx-auto">
          <div class="bg-gradient-to-l from-[#0a0a5e] to-[#2b2bb5] rounded-[30px] p-8 text-white relative overflow-hidden shadow-xl mb-8 animate-[fadeIn_0.5s_ease-out]">
            <div class="relative z-10">
              <h1 class="text-2xl md:text-3xl font-bold mb-2">
                    خوش آمدید، {{ userName }} عزیز

              </h1>
              <p class="text-blue-100 text-sm opacity-80">
                    شماره تلفن شما ({{ userPhone }}) تایید شد.

              </p>
            </div>
            <img src="~/assets/images/plane.png" class="absolute left-[-20px] bottom-[-20px] w-48 opacity-10 -rotate-12" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(label, index) in ['سفرهای من', 'اعتبار کیف پول', 'پیام‌ها']" :key="index"
                 class="bg-white p-6 rounded-2xl border border-[#ebebeb] shadow-sm hover:shadow-md transition-shadow group">
              <div class="flex justify-between items-start mb-4">
                <div class="w-10 h-10 bg-[#f4f7fa] rounded-lg flex items-center justify-center group-hover:bg-[#0a0a5e]/10 transition-colors">
                  <div class="w-5 h-5 bg-[#0a0a5e] rounded-sm"></div>
                </div>
                <span class="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+ ۱۲٪</span>
              </div>
              <h3 class="text-gray-400 text-xs font-bold mb-1">{{ label }}</h3>
              <p class="text-[#0a0a5e] text-xl font-extrabold">۰</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'nuxt/app'

// تعریف روتر برای جابجایی بین صفحات
const router = useRouter()

// تعریف متغیرهای واکنشی (Reactive)
const userName = ref('')
const userPhone = ref('')

/** * گرفتن حرف اول نام برای نمایش در دایره پروفایل 
 * اگر نام موجود نباشد، حرف 'ک' (مخفف کاربر) را برمی‌گرداند
 */
const userInitial = computed(() => {
  return userName.value ? userName.value.charAt(0) : 'ک'
})

// اجرای کدها هنگام لود شدن کامپوننت
onMounted(() => {
  // اگر در محیط کلاینت هستیم اطلاعات را از حافظه بخوان
  if (process.client) {
    userName.value = localStorage.getItem('user_name') || 'کاربر'
    userPhone.value = localStorage.getItem('user_phone') || '---'
    
    // اگر کاربر وارد نشده بود، اجازه نده در داشبورد بماند
    if (localStorage.getItem('is_auth') !== 'true') {
      router.push('/login')
    }
  }
})

/**
 * عملیات خروج از حساب کاربری
 */
const logout = () => {
  // ۱. پاکسازی کامل تمام کلیدهای مربوط به احراز هویت
  localStorage.removeItem('is_auth')
  localStorage.removeItem('user_name')
  localStorage.removeItem('user_phone')
  localStorage.removeItem('pending_user_phone')
  localStorage.removeItem('pending_display_name')

  // ۲. شلیک رویداد برای آپدیت شدن آنی هدر یا سایر بخش‌های سایت
  if (process.client) {
    window.dispatchEvent(new Event('auth-change'))
  }

  // ۳. هدایت کاربر به صفحه اصلی یا لاگین
  router.push('/')
}
</script>

<style scoped>
/* اضافه کردن فونت و انیمیشن برای زیبایی بیشتر */
.inte-font {
  font-family: 'Tahoma', sans-serif; /* می‌توانید فونت اصلی خود را جایگزین کنید */
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* افکت هاور برای بخش خوش‌آمدگویی */
.bg-gradient-to-l:hover img {
  transform: scale(1.1) rotate(0deg);
  opacity: 0.2;
  transition: all 0.5s ease;
}
</style>