<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8" dir="ltr">
    
    <h1 class="text-[#0a0a5e] font-bold text-2xl md:text-3xl mb-10 tracking-tight text-center">
      پنل ادمین راه ابریشم
    </h1>

    <div class="w-full max-w-[850px] flex flex-col md:flex-row border-[1.5px] border-[#0a0a5e]/10 rounded-[20px] overflow-hidden shadow-2xl bg-white">
      
      <div class="flex-[1.2] p-8 md:p-14 flex flex-col justify-center bg-white order-2 md:order-1">
        <form @submit.prevent="handleLogin" class="space-y-7" dir="rtl">
          
          <div class="flex flex-col gap-2.5">
            <label class="text-[#0a0a5e] font-extrabold pr-5 text-[15px] text-right">نام کاربری</label>
            <input 
              v-model="loginForm.username"
              type="text" 
              placeholder="Username"
              class="w-full bg-[#ebebeb] border-2 border-transparent rounded-full py-3.5 px-8 focus:outline-none focus:border-[#0a0a5e] focus:bg-white transition-all text-left font-sans"
              required
            >
          </div>

          <div class="flex flex-col gap-2.5">
            <label class="text-[#0a0a5e] font-extrabold pr-5 text-[15px] text-right">رمز عبور</label>
            <div class="relative w-full">
              <input 
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'" 
                placeholder="Password"
                class="w-full bg-[#ebebeb] border-2 border-transparent rounded-full py-3.5 pr-8 pl-14 focus:outline-none focus:border-[#0a0a5e] focus:bg-white transition-all text-left font-sans"
                required
              >
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a0a5e] transition-colors focus:outline-none"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.414 7.574 7.331 4.5 12 4.5c4.669 0 8.586 3.074 9.964 7.178.07.207.07.431 0 .639C20.586 16.426 16.669 19.5 12 19.5c-4.669 0-8.586-3.074-9.964-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-3 pr-5">
            <div class="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="remember" 
                class="w-5 h-5 rounded border-gray-300 text-[#0a0a5e] focus:ring-[#0a0a5e] cursor-pointer"
              >
              <label for="remember" class="text-[#5b6eb3] text-[14px] font-bold cursor-pointer select-none">
                مرا به خاطر بسپار
              </label>
            </div>
            
            <transition name="fade">
              <p v-if="errorMessage" class="text-red-500 text-xs font-bold mt-1 text-right">
                {{ errorMessage }}
              </p>
            </transition>
          </div>

          <button 
            type="submit"
            class="w-full bg-[#0a0a5e] text-white font-black py-4.5 rounded-full hover:bg-[#16164d] hover:shadow-xl transform active:scale-[0.98] transition-all text-lg mt-4"
          >
            ورود
          </button>
        </form>
      </div>

      <div class="hidden md:block flex-1 min-h-full relative bg-[#0a0a5e] order-1 md:order-2">
        <img 
          src="~/assets/images/admin-bg.png" 
          alt="Silk Road Admin Visual" 
          class="absolute inset-0 w-full h-full object-cover opacity-85"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a5e]/50 to-transparent pointer-events-none"></div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const emit = defineEmits(['login-success']);

const showPassword = ref(false);
const errorMessage = ref('');

const loginForm = reactive({
  username: '',
  password: ''
});

const handleLogin = () => {
  errorMessage.value = '';
  // تست با یوزرنیم درخواستی شما
  if (loginForm.username === 'erdkdm' && loginForm.password === '1234') {
    emit('login-success');
  } else {
    errorMessage.value = 'نام کاربری یا رمز عبور اشتباه است.';
  }
};
</script>

<style scoped>
.py-4\.5 {
  padding-top: 1.125rem;
  padding-bottom: 1.125rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

input[type="checkbox"] {
  accent-color: #0a0a5e;
}

input[type="password"], input[type="text"] {
  direction: ltr;
}
</style>