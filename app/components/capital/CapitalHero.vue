<!-- // منطق فیلتر کردن کارت‌ها بر اساس جستجوی کاربر
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products
  return products.filter(product => {
    // جستجو در بین مقادیر Details (مثل نام کالا)
    return product.details.some(detail => 
      detail.label === 'نام کالا' && detail.value.includes(searchQuery.value)
    )
  })
}) -->