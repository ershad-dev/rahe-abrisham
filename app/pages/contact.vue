<template>
  <div class="page-wrapper min-h-screen bg-white py-[50px] [direction:rtl] inteFont overflow-x-hidden mt-[45px]">
    <div class="container max-w-[820px] mx-auto px-[14px]">
      
      <div class="contact-card relative w-full bg-[linear-gradient(to_right,#D8D8D8_0%,#D8D8D8_70%,#ffffff_100%)] rounded-[10px] p-[45px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-400 ease-in-out animate-[fadeInUp_0.8s_ease-out_forwards] hover:-translate-y-[5px] hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]">
        <div class="contact-info absolute top-[35px] left-[40px] flex flex-col gap-[12px] [direction:ltr] text-left text-[15px] font-bold max-md:static max-md:items-center max-md:mb-[25px]">
          <div class="contact-row flex items-center gap-[10px] text-[#1a1a1a] transition-transform duration-300 ease-in hover:translate-x-[5px]">
            <span>09158875649</span>
            <img src="~/assets/images/call-calling.svg" alt="تلفن" class="contact-icon w-[20px] h-[20px] object-contain">
          </div>
          <div class="contact-row flex items-center gap-[10px] text-[#1a1a1a] transition-transform duration-300 ease-in hover:translate-x-[5px]">
            <span>info@solotis.ir</span>
            <img src="~/assets/images/sms-notification.png" alt="ایمیل" class="contact-icon w-[20px] h-[20px] object-contain">
          </div>
        </div>
        <h2 class="m-0 text-[34px] font-[900] text-black ">ارتباط با ما</h2>


        <p class="contact-text text-[15px] [line-height:2.2] mt-[65px] text-[#222] text-justify">
          همراهان و مشتریان گرامی بازرگانی راه ابریشم می‌توانند از طریق ایمیل سایت، تلفن ثابت با ما در تماس باشند.
          <br><br>
          همکاران و متخصصان ما در تمام ساعات اداری ایام هفته (۹ صبح تا ۳ بعدازظهر، شنبه تا چهارشنبه) و (۹ صبح تا ۱۲ ظهر، پنجشنبه‌ها) پاسخگوی شما عزیزان خواهند بود.
        </p>
      </div>

      <div class="map-wrapper relative w-full md:w-[800px] h-[350px] mt-[100px] 
                  md:ml-0 max-md:mx-auto [direction:ltr] 
                  animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] opacity-0 [animation-fill-mode:forwards]">
            <div class="custom-marker absolute top-1/2 right-0 z-[10] md:z-[1] translate-x-[60%] -translate-y-1/2 pointer-events-none">
              <img src="~/assets/images/neshan.png" alt="نشانگر اختصاصی" class="w-[170px] md:w-[280px] h-auto drop-shadow-[5px_5px_15px_rgba(0,0,0,0.15)] ">
            </div>

        <div class="google-map-container relative w-full h-full bg-[#ebebeb] rounded-[10px] shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-[#ddd] z-[2] overflow-hidden ">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1317.1965416823843!2d57.26590478084265!3d37.41595009213574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1771189658280!5m2!1sen!2s" 
                width="600" 
                height="450" 
                style="border:0;" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-full"
            ></iframe>
        </div>
      </div>

      <div class="form-container w-full mt-[55px] animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
        <h3 class="text-[28px] font-[900] m-0 mb-[12px] text-center">پیامی برای ما بفرستید</h3>
        <span class="form-note block text-[14px] text-[#555] mb-[30px] text-center">فیلدهای ستاره‌دار (*) الزامی هستند.</span>
        <form @submit.prevent="handleSubmit">
          <div class="input-group flex flex-col flex-1">
            <textarea 
              v-model="formData.message" 
              placeholder="نوشتن متن *"
              @input="resetFieldError('message')"
              class="bg-[#f7f7f7] border border-[#ddd] rounded-[12px] font-inherit transition-all duration-300 ease-in-out w-full h-[170px] p-[18px] text-[15px] resize-none focus:outline-none focus:border-[#171AD4] focus:bg-white focus:shadow-[0_0_0_4px_rgba(23,26,212,0.15)] focus:scale-[1.01]"
              :class="{ '!border-[#ff0000]': errors.message }"
            ></textarea>
            <span class="error-msg text-[#ff0000] text-[11px] mt-[5px] h-[15px] transition-all duration-300 ease-in-out font-bold opacity-0" :class="{ 'opacity-100': errors.message }">
              {{ errors.message }}
            </span>
          </div>

          <div class="inputs w-full flex gap-[18px] mt-[18px] max-md:flex-col">
            <div class="input-group flex flex-col flex-1">
              <input 
                type="text" 
                v-model="formData.fullname" 
                placeholder="نام و فامیل *"
                @input="resetFieldError('fullname')"
                class="bg-[#f7f7f7] border border-[#ddd] rounded-[12px] font-inherit transition-all duration-300 ease-in-out w-full h-[52px] text-center focus:outline-none focus:border-[#171AD4] focus:bg-white focus:shadow-[0_0_0_4px_rgba(23,26,212,0.15)] focus:scale-[1.01]"
                :class="{ '!border-[#ff0000]': errors.fullname }"
              >
              <span class="error-msg text-[#ff0000] text-[11px] mt-[5px] h-[15px] transition-all duration-300 ease-in-out font-bold opacity-0" :class="{ 'opacity-100': errors.fullname }">
                {{ errors.fullname }}
              </span>
            </div>

            <div class="input-group flex flex-col flex-1">
              <input 
                type="email" 
                v-model="formData.email" 
                placeholder="ایمیل (اختیاری)"
                class="bg-[#f7f7f7] border border-[#ddd] rounded-[12px] font-inherit transition-all duration-300 ease-in-out w-full h-[52px] text-center focus:outline-none focus:border-[#171AD4] focus:bg-white focus:shadow-[0_0_0_4px_rgba(23,26,212,0.15)] focus:scale-[1.01]"
              >
              <span class="error-msg h-[15px]"></span>
            </div>

            <div class="input-group flex flex-col flex-1">
              <input 
                type="tel" 
                v-model="formData.phone" 
                placeholder="شماره تلفن *" 
                maxlength="11"
                @keypress="onlyNumbers"
                @input="resetFieldError('phone')"
                class="bg-[#f7f7f7] border border-[#ddd] rounded-[12px] font-inherit transition-all duration-300 ease-in-out w-full h-[52px] text-center focus:outline-none focus:border-[#171AD4] focus:bg-white focus:shadow-[0_0_0_4px_rgba(23,26,212,0.15)] focus:scale-[1.01]"
                :class="{ '!border-[#ff0000]': errors.phone }"
              >
              <span class="error-msg text-[#ff0000] text-[11px] mt-[5px] h-[15px] transition-all duration-300 ease-in-out font-bold opacity-0" :class="{ 'opacity-100': errors.phone }">
                {{ errors.phone }}
              </span>
            </div>
          </div>

          <div class="form-footer w-full flex flex-row-reverse justify-between items-center mt-[15px] max-md:flex-col max-md:gap-[20px]">
            <button 
              type="submit"
              class="h-[52px] px-[60px] bg-[#171AD4] text-white border-none rounded-[12px] text-[17px] font-bold cursor-pointer transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] shadow-[0_8px_15px_rgba(23,26,212,0.25)] hover:bg-[#1214a8] hover:-translate-y-[3px] hover:scale-[1.05] hover:shadow-[0_12px_20px_rgba(23,26,212,0.35)]"
            >
              ثبت نام
            </button>
            <label class="remember flex items-center gap-[10px] text-[15.5px] cursor-pointer">
              <input 
                type="checkbox" 
                v-model="formData.remember"
                class="appearance-none w-[24px] h-[24px] bg-[#f7f7f7] border border-[#ddd] rounded-[6px] cursor-pointer relative transition-all duration-300 checked:bg-[#171AD4] checked:border-[#171AD4] after:content-['✔'] after:text-white after:text-[12px] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 checked:after:opacity-100"
              >
              <span>مرا به خاطر بسپار</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue'

// تعریف ساختار داده‌های فرم برای جلوگیری از خطاهای تایپی
interface IFormData {
  message: string;
  fullname: string;
  email: string;
  phone: string;
  remember: boolean;
}

// تعریف ساختار پیام‌های خطا
interface IErrors {
  message: string;
  fullname: string;
  phone: string;
}

// ایجاد شیء واکنش‌گرا برای داده‌های ورودی
const formData = reactive<IFormData>({
  message: '',
  fullname: '',
  email: '',
  phone: '',
  remember: false
});

// ایجاد شیء واکنش‌گرا برای مدیریت متن خطاهای هر فیلد
const errors = reactive<IErrors>({
  message: '',
  fullname: '',
  phone: ''
});

/**
 * جلوگیری از وارد کردن کاراکترهای غیر عددی در فیلد تلفن
 */
const onlyNumbers = (e: KeyboardEvent): void => {
  if (e.key < '0' || e.key > '9') {
    e.preventDefault();
  }
};

/**
 * پاک کردن متن خطا و استایل قرمز به محض اینکه کاربر شروع به اصلاح فیلد می‌کند
 */
const resetFieldError = (field: keyof IErrors): void => {
  errors[field] = '';
};

/**
 * منطق نهایی بررسی اعتبار و ارسال فرم
 */
const handleSubmit = (): void => {
  let isValid = true;

  // ۱. بررسی نام و نام خانوادگی
  if (!formData.fullname.trim()) {
    errors.fullname = "این فیلد نمی‌تواند خالی باشد";
    isValid = false;
  } else if (formData.fullname.length < 3) {
    errors.fullname = "نام باید حداقل ۳ کاراکتر باشد";
    isValid = false;
  }

  // ۲. بررسی شماره تلفن
  if (!formData.phone.trim()) {
    errors.phone = "این فیلد نمی‌تواند خالی باشد";
    isValid = false;
  } else if (formData.phone.length !== 11) {
    errors.phone = "شماره تلفن باید ۱۱ رقم باشد";
    isValid = false;
  }

  // ۳. بررسی متن پیام
  if (!formData.message.trim()) {
    errors.message = "این فیلد نمی‌تواند خالی باشد";
    isValid = false;
  } else if (formData.message.length < 3) {
    errors.message = "متن پیام خیلی کوتاه است";
    isValid = false;
  }

  // ارسال نهایی در صورت نبود خطا
  if (isValid) {
    // تبدیل دیتای پروکسی شده به دیتای خام برای ارسال به ای پی آی
    const cleanData = toRaw(formData);
    console.log("در حال ارسال داده‌ها به سمت سرور:", cleanData);
    
    if (process.client) {
      alert("فرم با موفقیت ثبت شد.");
    }
  }
};
</script>

<style>
/* انیمیشن دقیق (فید این اپ )برای استفاده در کلاس‌های تیلوند */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>