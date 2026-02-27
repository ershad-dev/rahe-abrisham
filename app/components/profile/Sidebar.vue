<template>
  <div class="flex flex-col gap-4 w-full" dir="ltr">
    <div class="bg-white rounded-[20px] p-5 shadow-sm border border-[#ebebeb] flex items-center justify-between" dir="rtl">
      
      <div class="flex flex-col items-center gap-2 shrink-0 group">
        <div class="relative">
          <div 
            @click="userImage ? showViewModal = true : null"
            class="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border-2 border-gray-100 shadow-sm transition-all hover:border-[#0b0b54] bg-[#0b0b54] cursor-pointer"
          >
            <img v-if="userImage" :src="userImage" class="w-full h-full object-cover" />
            <span v-else class="text-white text-2xl font-bold">{{ userInitials }}</span>
            
            <label v-if="!userImage" class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke-width="2" stroke-linecap="round"/></svg>
              <input type="file" class="hidden" accept="image/*" @change="onFileChange" />
            </label>
          </div>
          
          <label v-if="userImage" class="absolute -bottom-1 -right-1 bg-white border border-gray-200 text-[#0b0b54] rounded-full p-1.5 shadow-sm hover:bg-gray-50 cursor-pointer transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <input type="file" class="hidden" accept="image/*" @change="onFileChange" />
          </label>
        </div>
        <span class="text-[10px] font-bold text-gray-400 group-hover:text-[#0b0b54] transition-colors">تنظیم عکس</span>
      </div>
      
      <div class="flex flex-col items-start w-full mr-4">
        <h3 class="text-[#0a0a5e] font-bold text-[15px] text-right w-full line-clamp-1">
          {{ userName || 'کاربر مهمان' }}
        </h3>
        <p class="text-gray-400 text-[13px] mt-1 font-sans text-right w-full">
          {{ phoneNumber || '---' }}
        </p>
        <div 
          class="mt-2 px-3 py-1 rounded-full flex items-center gap-1 transition-all duration-300"
          :class="isVerified ? 'bg-[#e8f5e9]' : 'bg-red-50'"
        >
          <span :class="isVerified ? 'text-[#4caf50]' : 'text-red-500'" class="text-[10px] font-bold">
            {{ isVerified ? 'اعتبار سنجی شده' : 'اعتبار سنجی نشده'}}
          </span>
          <svg v-if="isVerified" class="w-3.5 h-3.5 text-[#4caf50]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[20px] py-6 shadow-sm border border-[#ebebeb] flex flex-col relative overflow-hidden">
      <h4 class="text-[#0a0a5e] font-bold text-[17px] px-8 mb-4 text-right">منو کاربری</h4>
      <div class="flex flex-col w-full font-medium">
        <button 
          v-for="item in menuItems" :key="item.id"
          @click="handleMenuClick(item.id)"
          class="flex items-center justify-between px-8 py-4 transition-all relative group"
          :class="activeTab === item.id ? 'text-[#0b0b54] bg-[#f8fafc]' : 'text-[#424242] hover:bg-gray-50/50'"
        >
          <div v-if="activeTab === item.id" class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#0b0b54] rounded-l-md"></div>
          <div class="flex items-center gap-4 w-full justify-end">
            <span class="text-[14px]" :class="[item.id === 'logout' ? 'text-red-500' : '', activeTab === item.id ? 'font-bold' : '']">
              {{ item.title }}
            </span>
            <svg 
              class="w-6 h-6 shrink-0 transition-colors" 
              :class="[activeTab === item.id ? 'text-[#0b0b54]' : 'text-[#757575]', item.id === 'logout' ? 'text-red-500' : '']"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
            >
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.iconPath" />
            </svg>
          </div>
        </button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showViewModal" class="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md" @click.self="showViewModal = false">
        <div class="relative bg-white rounded-[32px] overflow-hidden max-w-md w-full animate-pop shadow-2xl">
          <div class="p-2 flex justify-end">
            <button @click="showViewModal = false" class="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2" /></svg>
            </button>
          </div>
          <div class="px-8 pb-8 flex flex-col items-center">
            <div class="w-64 h-64 rounded-2xl overflow-hidden border-4 border-gray-50 shadow-inner mb-6 bg-gray-100">
              <img :src="userImage" class="w-full h-full object-cover" />
            </div>
            <div class="flex gap-3 w-full">
              <button @click="triggerAction('delete')" class="flex-1 py-3 rounded-2xl border-2 border-red-50 text-red-500 font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2 text-sm">
                حذف تصویر
              </button>
              <label class="flex-[2] py-3 rounded-2xl bg-[#0b0b54] text-white font-bold hover:bg-[#0a0a5e] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm shadow-lg shadow-blue-100">
                تعویض تصویر
                <input type="file" class="hidden" accept="image/*" @change="onFileChange" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="editModal.show" class="fixed inset-0 z-[800] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" dir="rtl">
        <div class="bg-white rounded-[32px] w-full max-w-md overflow-hidden animate-pop shadow-2xl">
          <div class="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 class="font-bold text-[#0a0a5e]">ویرایش و تنظیم تصویر</h3>
            <button @click="editModal.show = false" class="text-gray-400 hover:text-red-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2"/></svg>
            </button>
          </div>
          
          <div class="p-8 flex flex-col items-center bg-gray-50/50">
            <div class="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-xl transition-transform duration-300 bg-white" 
                 :style="{ transform: `rotate(${editModal.rotation}deg)` }">
              <img :src="editModal.tempSrc" class="w-full h-full object-cover" />
            </div>
            
            <button @click="rotateImage" class="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-[#0b0b54] hover:bg-blue-50 transition-all shadow-sm font-bold text-xs">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              چرخش ۹۰ درجه
            </button>
          </div>

          <div class="p-6 flex gap-3 bg-white">
            <button @click="editModal.show = false" class="flex-1 py-3 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 transition-all">انصراف</button>
            <button @click="applyEdit" class="flex-1 py-3 rounded-2xl bg-[#0b0b54] text-white font-bold hover:bg-[#0a0a5e] transition-all shadow-lg">تأیید ویرایش</button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="confirmModal.show" class="fixed inset-0 z-[900] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm" dir="rtl">
        <div class="bg-white rounded-[24px] w-full max-w-[320px] shadow-2xl animate-pop border border-gray-100 overflow-hidden text-center">
          <div class="p-6">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" :class="confirmModal.type === 'delete' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#0b0b54]'">
              <svg v-if="confirmModal.type === 'delete'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" /></svg>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </div>
            <h4 class="text-[15px] font-bold text-[#0a0a5e] mb-1">{{ confirmModal.title }}</h4>
            <p class="text-[12px] text-gray-500 leading-relaxed px-2">{{ confirmModal.message }}</p>
          </div>
          <div class="flex border-t border-gray-100">
            <button @click="confirmModal.show = false" class="flex-1 py-4 text-[13px] font-bold text-gray-400 hover:bg-gray-50 transition-all border-l border-gray-100">انصراف</button>
            <button @click="executeAction" class="flex-1 py-4 text-[13px] font-bold transition-all hover:bg-gray-50" :class="confirmModal.type === 'delete' ? 'text-red-500' : 'text-[#0b0b54]'">تأیید</button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="modal">
      <div v-if="showLogoutModal" class="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" dir="rtl">
        <div class="bg-white rounded-[24px] w-full max-sm:max-w-xs overflow-hidden shadow-2xl border border-gray-100 animate-pop">
           <div class="p-8 text-center">
            <div class="bg-red-50 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-[#0a0a5e] mb-2">خروج از حساب</h3>
            <p class="text-gray-500 text-[14px]">آیا مایل هستید از حساب کاربری خود خارج شوید؟</p>
          </div>
          <div class="p-4 bg-gray-50 flex gap-3">
            <button @click="showLogoutModal = false" class="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-all">انصراف</button>
            <button @click="confirmLogout" class="flex-1 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-100">بله، خروج</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue';
import { useRouter } from 'nuxt/app';

const props = defineProps(['activeTab']);
const emit = defineEmits(['update:activeTab']);
const router = useRouter();

// --- وضعیت‌های اطلاعات کاربر ---
const userName = ref("");
const phoneNumber = ref("");
const nationalCode = ref("");
const userImage = ref(null);

// --- وضعیت مودال‌ها ---
const showViewModal = ref(false);
const showLogoutModal = ref(false);
const editModal = reactive({ show: false, tempSrc: null, rotation: 0 });
const confirmModal = reactive({ show: false, type: '', title: '', message: '', pendingData: null });

// --- همگام‌سازی با LocalStorage ---
const syncSidebarData = () => {
  if (process.client) {
    userName.value = localStorage.getItem('display_name') || "";
    phoneNumber.value = localStorage.getItem('user_phone') || "";
    nationalCode.value = localStorage.getItem('user_national_code') || "";
    userImage.value = localStorage.getItem('user_avatar') || null;
  }
};

// --- مدیریت کلیک روی منو و اسکرول خودکار ---
const handleMenuClick = (id) => {
  if (id === 'logout') {
    showLogoutModal.value = true;
  } else {
    // ۱. تغییر تب فعال
    emit('update:activeTab', id);

    // ۲. اسکرول به محتوا در حالت موبایل
    if (process.client && window.innerWidth < 1024) {
      setTimeout(() => {
        // پیدا کردن کانتینر محتوا در صفحه اصلی (بر اساس کلاسی که دارد)
        const contentSection = document.querySelector('.lg\\:col-span-8') || 
                               document.querySelector('.xl\\:col-span-9');
        
        if (contentSection) {
          const headerOffset = 80; // فاصله برای اینکه زیر هدر ثابت نرود
          const elementPosition = contentSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // وقفه کوتاه برای رندر شدن تب جدید
    }
  }
};

// --- توابع مدیریت عکس پروفایل (همان کدهای قبلی شما) ---
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    editModal.tempSrc = event.target.result;
    editModal.rotation = 0;
    editModal.show = true;
    showViewModal.value = false;
  };
  reader.readAsDataURL(file);
};

const rotateImage = () => { editModal.rotation = (editModal.rotation + 90) % 360; };

const applyEdit = () => {
  const img = new Image();
  img.src = editModal.tempSrc;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 500;
    canvas.width = size; canvas.height = size;
    ctx.translate(size/2, size/2);
    ctx.rotate((editModal.rotation * Math.PI) / 180);
    const aspect = img.width / img.height;
    let dw, dh;
    if (aspect > 1) { dh = size; dw = size * aspect; } else { dw = size; dh = size / aspect; }
    ctx.drawImage(img, -dw/2, -dh/2, dw, dh);
    confirmModal.pendingData = canvas.toDataURL('image/jpeg', 0.8);
    confirmModal.type = 'upload';
    confirmModal.title = 'تأیید نهایی تصویر';
    confirmModal.message = 'آیا مایل هستید این تصویر ذخیره شود؟';
    editModal.show = false;
    confirmModal.show = true;
  };
};

const triggerAction = (action) => {
  if (action === 'delete') {
    confirmModal.type = 'delete';
    confirmModal.title = 'حذف تصویر';
    confirmModal.message = 'آیا از حذف عکس پروفایل اطمینان دارید؟';
    confirmModal.show = true;
  }
};

const executeAction = () => {
  if (confirmModal.type === 'upload') {
    userImage.value = confirmModal.pendingData;
    localStorage.setItem('user_avatar', confirmModal.pendingData);
  } else if (confirmModal.type === 'delete') {
    userImage.value = null;
    localStorage.removeItem('user_avatar');
    showViewModal.value = false;
  }
  window.dispatchEvent(new Event('auth-change'));
  confirmModal.show = false;
};

// --- منطق خروج ---
const confirmLogout = async () => {
  if (process.client) {
    localStorage.clear(); // پاکسازی کل حافظه برای امنیت بیشتر
    window.dispatchEvent(new Event('auth-change'));
    showLogoutModal.value = false;
    await router.replace('/login');
  }
};

// --- محاسبات نمایشی ---
const isVerified = computed(() => nationalCode.value?.trim().length === 10);
const userInitials = computed(() => {
  if (!userName.value) return "??";
  const parts = userName.value.trim().split(' ');
  return parts.length >= 2 
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() 
    : userName.value.substring(0, 2).toUpperCase();
});

const menuItems = [
  { id: 'account', title: 'اطلاعات حساب کاربری', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'password', title: 'تغییر رمز عبور', iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { id: 'orders', title: 'پیگیری سفارش ها', iconPath: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { id: 'tickets', title: 'تیکت به پشتیبانی', iconPath: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  { id: 'logout', title: 'خروج از حساب', iconPath: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' },
];

// --- Lifecycle ---
onMounted(() => {
  syncSidebarData();
  if (process.client) window.addEventListener('auth-change', syncSidebarData);
});
onUnmounted(() => {
  if (process.client) window.removeEventListener('auth-change', syncSidebarData);
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.modal-enter-active, .modal-leave-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }

@keyframes pop {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-pop { animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
</style>