<template>
  <div class="bg-white rounded-[20px] p-6 md:p-10 shadow-sm border border-gray-50 relative w-full" dir="rtl">
    
    <Transition name="toast">
      <div v-if="showToast" class="fixed top-5 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-[350px]">
        <div class="bg-white border-r-4 border-green-500 shadow-2xl rounded-xl p-4 flex items-center gap-4 overflow-hidden relative">
          <div class="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <div class="flex flex-col">
            <span class="text-[#0a0a5e] font-bold text-[14px]">عملیات موفق</span>
            <span class="text-gray-500 text-[12px]">اطلاعات با موفقیت ذخیره شد.</span>
          </div>
          <div class="absolute bottom-0 left-0 h-1 bg-green-500 progress-bar"></div>
        </div>
      </div>
    </Transition>

    <div class="absolute left-6 top-6 md:left-10 md:top-10 flex gap-2">
      <button 
        v-if="!isEditMode"
        @click="isEditMode = true"
        class="border border-[#0b0b54] text-[#0b0b54] px-3 md:px-6 py-2 rounded-lg font-bold text-[13px] md:text-[14px] hover:bg-blue-50 transition-all active:scale-95 w-fit mx-auto md:mx-0"
      >
        ویرایش اطلاعات
      </button>
            
        <button 
          v-else
          @click="showConfirmModal = true"
          :disabled="isSaving || userForm.nationalCode.length < 10"
          class="bg-[#0b0b54] text-white px-4 md:px-8 py-2 rounded-lg font-bold text-[13px] md:text-[14px] hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 w-fit whitespace-nowrap"
        >
          <span v-if="!isSaving">ذخیره تغییرات</span>
          <span v-else class="flex items-center gap-2">
            <div class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            در حال ذخیره...
          </span>
        </button>
    </div>

    <h2 class="text-[#0a0a5e] font-bold text-xl mb-10 text-right">اطلاعات حساب کاربری</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
      <div v-for="field in profileFields" :key="field.key" class="flex flex-col gap-2 text-right">
        <label class="text-[#0a0a5e] font-bold text-[13px] mr-2">{{ field.label }}</label>
        
        <input 
          v-model="userForm[field.key]"
          :type="field.type" 
          :placeholder="field.placeholder"
          :disabled="!isEditMode || field.disabled"
          @input="handleInput($event, field)"
          class="w-full h-12 rounded-xl border px-4 outline-none transition-all placeholder:text-gray-400 font-sans"
          :class="[
            field.dir === 'ltr' ? 'text-left' : 'text-right',
            !isEditMode ? 'bg-gray-50/50 border-transparent text-gray-500' : 'bg-[#ebebeb]/40 border-gray-200 focus:bg-white focus:border-[#0b0b54]',
            field.key === 'nationalCode' && userForm.nationalCode.length < 10 ? 'border-red-500 bg-red-50/20' : ''
          ]"
          :dir="field.dir || 'rtl'"
        />
        
        <span v-if="field.key === 'nationalCode' && userForm.nationalCode.length < 10" class="text-red-500 text-[11px] mr-2 font-bold italic">
          * تکمیل کد ملی ۱۰ رقمی الزامی است
        </span>
      </div>

      <div class="flex flex-col gap-2 text-right md:col-span-2">
        <label class="text-[#0a0a5e] font-bold text-[13px] mr-2">آدرس</label>
        <textarea 
          v-model="userForm.address"
          :disabled="!isEditMode"
          placeholder="آدرس دقیق محل سکونت..."
          rows="4"
          class="w-full rounded-xl border p-4 outline-none transition-all resize-none text-right"
          :class="!isEditMode ? 'bg-gray-50/50 border-transparent text-gray-500' : 'bg-[#ebebeb]/40 border-gray-200 focus:bg-white focus:border-[#0b0b54]'"
        ></textarea>
      </div>
    </div>

    <Transition name="modal">
      <div v-if="showConfirmModal" class="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div class="bg-white rounded-[24px] w-full max-w-sm overflow-hidden shadow-2xl border border-gray-100">
          <div class="p-8 text-center">
            <div class="bg-blue-50 text-[#0b0b54] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-[#0a0a5e] mb-2 font-sans">تایید تغییرات</h3>
            <p class="text-gray-500 text-[14px]">آیا از صحت اطلاعات وارد شده و ذخیره تغییرات اطمینان دارید؟</p>
          </div>
          <div class="p-4 bg-gray-50 flex gap-3">
            <button @click="showConfirmModal = false" class="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-all">انصراف</button>
            <button @click="saveProfile" class="flex-1 py-3 rounded-xl font-bold bg-[#0b0b54] text-white hover:shadow-lg transition-all active:scale-95">بله، ذخیره</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'

const isSaving = ref(false)
const isEditMode = ref(false)
const showConfirmModal = ref(false)
const showToast = ref(false)

const userForm = reactive({
  fullName: '', phone: '', birthday: '', email: '', nationalCode: '', postalCode: '', address: ''
})

const profileFields = [
  { label: 'نام و نام خانوادگی', key: 'fullName', placeholder: 'مثلاً: مهدی قنبر پور', type: 'text' },
  { label: 'شماره موبایل', key: 'phone', placeholder: '09xxxxxxxxx', type: 'text', disabled: true, dir: 'ltr' },
  { label: 'تاریخ تولد (شمسی)', key: 'birthday', placeholder: '1370/01/01', type: 'text', dir: 'ltr', isDate: true },
  { label: 'ایمیل', key: 'email', placeholder: 'example@mail.com', type: 'email', dir: 'ltr' },
  { label: 'کد ملی', key: 'nationalCode', placeholder: '۱۰ رقم کد ملی', type: 'text', dir: 'ltr', isNumeric: true, max: 10 },
  { label: 'کد پستی', key: 'postalCode', placeholder: '۱۰ رقم کد پستی', type: 'text', dir: 'ltr', isNumeric: true, max: 10 },
]

const handleInput = (event, field) => {
  let val = event.target.value;
  if (field.isNumeric) {
    val = val.replace(/\D/g, '');
    if (field.max && val.length > field.max) val = val.substring(0, field.max);
  }
  if (field.isDate) {
    val = val.replace(/\D/g, '');
    if (val.length > 8) val = val.substring(0, 8);
    if (val.length > 4 && val.length <= 6) val = val.substring(0, 4) + '/' + val.substring(4);
    if (val.length > 6) val = val.substring(0, 4) + '/' + val.substring(4, 6) + '/' + val.substring(6);
  }
  userForm[field.key] = val;
}

const saveProfile = async () => {
  showConfirmModal.value = false;
  isSaving.value = true
  
  await new Promise(r => setTimeout(r, 800))
  
  if (process.client) {
    localStorage.setItem('display_name', userForm.fullName)
    localStorage.setItem('user_email', userForm.email)
    localStorage.setItem('user_national_code', userForm.nationalCode)
    localStorage.setItem('user_address', userForm.address)
    localStorage.setItem('user_birthday', userForm.birthday)
    localStorage.setItem('user_postal_code', userForm.postalCode)
    
    window.dispatchEvent(new Event('auth-change'))
    isEditMode.value = false
    
    // نمایش Toast به جای مودال دوم
    showToast.value = true
    setTimeout(() => { showToast.value = false }, 2000)
  }
  isSaving.value = false
}

onMounted(() => {
  if (process.client) {
    userForm.fullName = localStorage.getItem('display_name') || ''
    userForm.email = localStorage.getItem('user_email') || ''
    userForm.phone = localStorage.getItem('user_phone') || ''
    userForm.nationalCode = localStorage.getItem('user_national_code') || ''
    userForm.address = localStorage.getItem('user_address') || ''
    userForm.birthday = localStorage.getItem('user_birthday') || ''
    userForm.postalCode = localStorage.getItem('user_postal_code') || ''
  }
})
</script>

<style scoped>
/* انیمیشن مودال */
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.9); }

/* انیمیشن Toast */
.toast-enter-active { animation: toast-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-leave-active { animation: toast-in 0.3s reverse ease-in; }

@keyframes toast-in {
  0% { transform: translate(-50%, -100%); opacity: 0; }
  100% { transform: translate(-50%, 0); opacity: 1; }
}

/* نوار پیشرفت ۲ ثانیه‌ای */
.progress-bar {
  animation: progress 2s linear forwards;
}

@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}
</style>