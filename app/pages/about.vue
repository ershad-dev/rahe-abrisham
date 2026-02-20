<template>
  <div class="min-h-screen bg-white flex flex-col items-center overflow-x-hidden mt-[45px]" dir="ltr">
    
    <div class="w-full max-w-[950px] flex flex-col items-center py-[60px] px-5 animate-[fadeIn_1s_ease-out] flex-grow">
      
      <div class="flex flex-col-reverse md:flex-row items-center justify-between w-full mb-[50px]">
        <div class="relative w-full md:w-[610px] h-auto aspect-[16/9] md:h-[270px] rounded-[40px] border-[10px] border-[#ebebeb] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.1)]">
          <img src="~/assets/images/about-us.png" alt="درباره ما" class="w-full h-full object-cover">
          <div class="absolute inset-0 flex flex-col justify-center items-center text-white">
          </div>
        </div>

        <div class="flex-1 text-center md:text-right md:pr-[40px] mb-[30px] md:mb-0">
          <h1 class="text-[36px] md:text-[45px] text-black text-center leading-[1.2] font-[100]">
            همراه شما <br>
            هستیم در <br>
            دنیای تجارت <br>
            بین الملل
          </h1>
        </div>
      </div>

      <div class="w-full px-2 md:px-[40px] text-center mb-[70px]">
        <p class="text-[18px] md:text-[20px] leading-[1.8] md:leading-[2] text-[#333] font-medium max-w-[850px] mx-auto">
          راه ابریشم یک شرکت موفق و با تجربه در دنیای تجارت است که نزد تمامی 
          فعالان اقتصادی به عنوان چهره‌ای مطرح شناخته شده است. با وجود تحریم‌ها 
          و مشکلات و موانع موجود نگران تجارت خود نباشید و کار را به ما بسپارید.
        </p>
      </div>
    </div>

    <div class="w-full bg-[#0a0a5e] relative h-[90px] flex justify-center items-center overflow-hidden mb-5">
      <div class="absolute inset-0 opacity-10 pointer-events-none" 
           style="background-image: repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%); background-size: 10px 10px;">
      </div>
      
      <p class="relative z-10 text-white text-[14px] md:text-[18px] font-[500] px-6 text-center leading-tight">
        برای موفقیت در دنیای پیچیده و تخصصی تجارت بین الملل یک همراه خوب هستیم.
      </p>
    </div>

  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}


</style>