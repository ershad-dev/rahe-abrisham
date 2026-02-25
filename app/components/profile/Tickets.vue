<template>
  <div class="bg-white md:rounded-[30px] p-0 shadow-lg w-full mx-auto h-[650px] flex flex-col overflow-hidden border border-gray-100" dir="rtl">
    
    <div class="flex-none flex items-center justify-between p-5 md:p-6 border-b border-gray-50 bg-white">
      <h2 class="text-[#0a0a5e] font-bold text-lg md:text-2xl">
        تیکت به پشتیبانی و پیگیری سفارش
      </h2>
      <button 
        @click="createNewTicket"
        class="bg-[#0b0b54] text-white px-5 py-2 rounded-xl text-[13px] font-bold flex items-center gap-2 hover:bg-[#16167a] transition-all active:scale-95 shadow-sm"
      >
        <span class="text-lg leading-none">+</span> تیکت جدید
      </button>
    </div>

    <div v-if="currentView === 'list'" class="flex-1 overflow-y-auto bg-white">
      
      <div class="hidden md:block">
        <table class="w-full text-right border-collapse">
          <thead class="sticky top-0 z-10 bg-[#ebebeb]">
            <tr class="text-[#0a0a5e] text-[14px]">
              <th class="p-4 pr-8 font-black">کد تیکت</th>
              <th class="p-4 font-black text-center">موضوع تیکت</th>
              <th class="p-4 font-black text-center">نوع تیکت</th>
              <th class="p-4 font-black text-center">وضعیت</th>
              <th class="p-4 font-normal text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in tickets" :key="ticket.id" class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
              <td class="p-5 pr-8 text-[14px] font-medium text-gray-500 tracking-tight">#{{ ticket.code }}</td>
              <td class="p-5 text-[14px] text-black font-medium text-center">{{ ticket.subject }}</td>
              <td class="p-5 text-[14px] text-gray-600 text-center">{{ ticket.type }}</td>
              <td class="p-5">
                <div class="flex justify-center">
                  <span :class="getStatusClasses(ticket.status)" class="px-4 py-1.5 rounded-[10px] text-[11px] font-bold min-w-[110px] text-center shadow-sm">
                    {{ ticket.statusLabel }}
                  </span>
                </div>
              </td>
              <td class="p-5 text-center">
                <button @click="openChat(ticket)" class=" p-2 rounded-full text-[#0b0b54] hover:bg-[#0b0b54] hover:text-white transition-all">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="md:hidden flex flex-col gap-4 p-4">
        <div v-for="ticket in tickets" :key="'mob-'+ticket.id" class="bg-gray-50 p-5 rounded-[20px] flex flex-col gap-3 border border-gray-100 shadow-sm">
          <div class="flex justify-between items-center">
            <span class="font-sans text-gray-400 text-xs font-bold">#{{ ticket.code }}</span>
            <span :class="getStatusClasses(ticket.status)" class="px-3 py-1 rounded-full text-[10px] font-bold">
              {{ ticket.statusLabel }}
            </span>
          </div>
          <div class="text-[#0a0a5e] font-bold text-[15px] leading-relaxed">{{ ticket.subject }}</div>
          <button @click="openChat(ticket)" class="mt-2 w-full bg-white text-[#0b0b54] py-2.5 rounded-xl border border-gray-200 font-bold text-sm shadow-sm">
            مشاهده و گفتگو
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="currentView === 'chat'" class="flex-1 flex flex-col min-h-0 bg-white">
      
      <div class="flex-none w-full bg-[#ebebeb] p-3 md:p-4 flex items-center justify-between text-[12px] md:text-[13px] border-b border-gray-200" dir="ltr">
        <div class="flex items-center gap-2 pr-2">
          <span class="text-gray-500 font-bold">#{{ selectedTicket?.code }}</span>
        </div>
        <span class="text-[#0a0a5e] font-bold truncate mx-2" dir="rtl">
          {{ selectedTicket?.subject }}
        </span>
        <button @click="currentView = 'list'" class="text-red-500 px-3 py-1.5 rounded-xl font-black hover:bg-white/50 transition-colors flex items-center gap-1 shrink-0">
          <span class="text-[11px] md:text-[13px]">بازگشت</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <div ref="chatContainer" class="flex-1 p-3 md:p-6 flex flex-col gap-4 md:gap-6 overflow-y-auto scroll-smooth">
        <div v-for="(msg, index) in chatMessages" :key="index" 
             :class="msg.role === 'admin' ? 'self-start' : 'self-end'" 
             class="max-w-[92%] md:max-w-[70%] flex flex-col">
          
          <div :class="[
            msg.role === 'admin' ? 'bg-[#ebebeb] text-[#1a1a1a] rounded-tr-none' : 'bg-[#747474] text-white rounded-tl-none text-right shadow-sm',
            'p-3 md:p-4 rounded-[18px] md:rounded-[22px] text-[12.5px] md:text-[13px] leading-6 font-medium'
          ]">
            {{ msg.text }}
            <div v-if="msg.file" class="mt-2 pt-2 border-t border-black/5 text-[10px] italic flex items-center gap-1 opacity-80">
              📎 فایل: {{ msg.file }}
            </div>
          </div>
          <span class="text-[9px] md:text-[10px] text-gray-400 mt-1.5 px-2" :class="msg.role === 'admin' ? 'text-right' : 'text-left'">
            {{ msg.time }}
          </span>
        </div>
      </div>

      <div class="flex-none p-3 md:p-6 border-t border-gray-50 bg-white">
        <input 
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text" 
          placeholder="پیامی بنویسید..." 
          class="w-full bg-[#f0f2f5] p-3 md:p-4 rounded-xl md:rounded-2xl text-[13px] outline-none mb-3 md:mb-4 text-right focus:bg-white focus:ring-2 focus:ring-[#0436BF]/10 transition-all border border-transparent focus:border-[#0436BF]/20 shadow-inner"
        />
        
        <div class="flex items-center justify-between gap-2">
          <div class="relative">
            <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden" />
            <button @click="$refs.fileInput.click()" class="bg-[#8DA1D7] text-white px-3 md:px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold text-[11px] md:text-[12px] hover:opacity-90 transition-all shadow-sm">
               <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
               <span class="hidden md:inline">{{ fileName || 'فایل پیوست' }}</span>
               <span v-if="fileName" class="md:hidden">۱ فایل</span>
            </button>
          </div>

          <button @click="sendMessage" class="flex-1 md:flex-none justify-center bg-[#0436BF] text-white px-6 md:px-8 py-2.5 rounded-xl flex items-center gap-2 font-bold text-[13px] hover:shadow-lg active:scale-95 transition-all">
            ارسال <span class="hidden md:inline">پیام</span> 
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <rect x="4" y="6" width="16" height="12" rx="2" stroke="white" fill="none" stroke-width="1.5"></rect> 
              <path d="M4 9L11.1056 12.5528C11.6686 12.8343 12.3314 12.8343 12.8944 12.5528L20 9" stroke="white" fill="none" stroke-width="1.5"></path> 
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


// --- حالت‌های واکنشی (Reactive States) ---
     // مدیریت نمای جاری کاربر
const currentView = ref('list'); 

// ذخیره آبجکت تیکت انتخاب شده
const selectedTicket = ref(null); 

// بایند شده به اینپوت پیام
const newMessage = ref('');    

 // ذخیره نام فایل انتخاب شده برای نمایش به کاربر
const fileName = ref('');           

// رفرنس به DOM عنصر چت برای مدیریت اسکرول
const chatContainer = ref(null);     



// --- داده‌های اولیه (Mock Data) ---
const tickets = ref([
  { id: 1, code: '7D93B20', subject: 'پشتیبانی تمام وقت در مسیر واردات کالا', type: 'پیگیری خرید', status: 'answered', statusLabel: 'پاسخ داده شده' },
  { id: 2, code: '8F22A10', subject: 'سوال در مورد هزینه‌های ترخیص از گمرک', type: 'مشاوره', status: 'pending', statusLabel: 'در انتظار پاسخ' },
  { id: 3, code: 'C44X112', subject: 'درخواست فاکتور رسمی دوره اخیر', type: 'مالی', status: 'pending', statusLabel: 'در انتظار پاسخ' }
]);

const chatMessages = ref([
  { role: 'admin', text: 'سلام، وقت بخیر. چطور می‌توانم کمکتان کنم؟', time: '20:20', file: null },
  { role: 'user', text: 'سلام، من در مورد وضعیت آخرین سفارشم سوال داشتم.', time: '20:21', file: null }
]);


/**
 * ارسال پیام 
 */
const sendMessage = async () => {
  if (!newMessage.value.trim() && !fileName.value) return; // جلوگیری از ارسال پیام خالی
  
  const now = new Date();
  const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

  chatMessages.value.push({
    role: 'user',
    text: newMessage.value,
    time: timeStr,
    file: fileName.value
  });

  newMessage.value = ''; // پاکسازی اینپوت
  fileName.value = '';   // پاکسازی نام فایل
  
  // استفاده از nextTick برای اطمینان از رندر شدن پیام در DOM قبل از محاسبه اسکرول
  await nextTick();
  scrollToBottom();
};

/**
 * مدیریت رویداد انتخاب فایل از سیستم کاربر
 */
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) fileName.value = file.name;
};

/**
 * اسکرول خودکار به انتهای باکس چت 
 */
const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

/**
 * تغییر نما به چت و بارگذاری اطلاعات تیکت انتخاب شده
 */
const openChat = (ticket) => {
  selectedTicket.value = ticket;
  currentView.value = 'chat';
  nextTick(() => scrollToBottom()); // اسکرول به محض باز شدن
};

const createNewTicket = () => {
  alert("هدایت به صفحه ثبت تیکت جدید...");
};

/**
 * برگرداندن کلاس‌های استایل وضعیت بر اساس وضعیت تیکت
 * param {string} status - وضعیت تیکت
 * returns {string} کلاس‌های Tailwind
 */
const getStatusClasses = (status) => {
  switch (status) {
    case 'answered': return 'bg-green-50 text-green-700 border border-green-100 shadow-sm';
    case 'pending': return 'bg-orange-50 text-orange-700 border border-orange-100 shadow-sm';
    default: return 'bg-gray-50 text-gray-600 border border-gray-100';
  }
};
</script>

<style scoped>
/* شخصی‌سازی اسکرول‌بار برای هماهنگی با دیزاین سیستم */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.font-sans { font-family: 'Inter', sans-serif; }

/* فعال‌سازی شتاب‌دهنده سخت‌افزاری برای اسکرول روان در موبایل */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
}
</style>