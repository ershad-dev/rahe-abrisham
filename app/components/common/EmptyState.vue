<template>
  <div class="flex flex-col items-center justify-center py-16 px-6 text-center animate-in fade-in zoom-in duration-500">
    
    <div class="relative mb-6">
      <div class="absolute inset-0 bg-white/40 blur-3xl rounded-full"></div>
      
      <div class="relative w-24 h-24 bg-white rounded-[30%] flex items-center justify-center shadow-sm border border-white/50">
        <slot name="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </slot>
      </div>
    </div>

    <h3 class="text-xl font-black text-slate-800 mb-2">
      <slot name="title">{{ title }}</slot>
    </h3>
    
    <p class="text-slate-500 text-sm max-w-[260px] leading-relaxed mb-8">
      <slot name="description">{{ description }}</slot>
    </p>

    <div v-if="showAction">
      <button 
        @click="$emit('action')"
        class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-3.5 rounded-2xl font-bold shadow-lg shadow-teal-100 transition-all active:scale-95"
      >
        {{ actionText }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'موردی یافت نشد' },
  description: { type: String, default: 'در حال حاضر دیتایی برای نمایش در این بخش وجود ندارد.' },
  showAction: { type: Boolean, default: false },
  actionText: { type: String, default: 'بازگشت' }
})

defineEmits(['action'])
</script>