
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  'AuthLogin': typeof import("../../app/components/auth/Login.vue").default
  'AuthOtp': typeof import("../../app/components/auth/Otp.vue").default
  'AuthRegister': typeof import("../../app/components/auth/Register.vue").default
  'CapitalHero': typeof import("../../app/components/capital/CapitalHero.vue").default
  'CapitalStats': typeof import("../../app/components/capital/CapitalStats.vue").default
  'CapitalProductCard': typeof import("../../app/components/capital/ProductCard.vue").default
  'CapitalProductList': typeof import("../../app/components/capital/ProductList.vue").default
  'CommonEmptyState': typeof import("../../app/components/common/EmptyState.vue").default
  'HomeInfoBlock': typeof import("../../app/components/home/InfoBlock.vue").default
  'HomeServicesSection': typeof import("../../app/components/home/ServicesSection.vue").default
  'HomeWhyUsBanner': typeof import("../../app/components/home/WhyUsBanner.vue").default
  'LayoutBottomNav': typeof import("../../app/components/layout/BottomNav.vue").default
  'LayoutFooter': typeof import("../../app/components/layout/Footer.vue").default
  'LayoutHeaderImg': typeof import("../../app/components/layout/HeaderImg.vue").default
  'LayoutNavbar': typeof import("../../app/components/layout/Navbar.vue").default
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only").default
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
  'NuxtImg': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg
  'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default
  'LazyAuthLogin': LazyComponent<typeof import("../../app/components/auth/Login.vue").default>
  'LazyAuthOtp': LazyComponent<typeof import("../../app/components/auth/Otp.vue").default>
  'LazyAuthRegister': LazyComponent<typeof import("../../app/components/auth/Register.vue").default>
  'LazyCapitalHero': LazyComponent<typeof import("../../app/components/capital/CapitalHero.vue").default>
  'LazyCapitalStats': LazyComponent<typeof import("../../app/components/capital/CapitalStats.vue").default>
  'LazyCapitalProductCard': LazyComponent<typeof import("../../app/components/capital/ProductCard.vue").default>
  'LazyCapitalProductList': LazyComponent<typeof import("../../app/components/capital/ProductList.vue").default>
  'LazyCommonEmptyState': LazyComponent<typeof import("../../app/components/common/EmptyState.vue").default>
  'LazyHomeInfoBlock': LazyComponent<typeof import("../../app/components/home/InfoBlock.vue").default>
  'LazyHomeServicesSection': LazyComponent<typeof import("../../app/components/home/ServicesSection.vue").default>
  'LazyHomeWhyUsBanner': LazyComponent<typeof import("../../app/components/home/WhyUsBanner.vue").default>
  'LazyLayoutBottomNav': LazyComponent<typeof import("../../app/components/layout/BottomNav.vue").default>
  'LazyLayoutFooter': LazyComponent<typeof import("../../app/components/layout/Footer.vue").default>
  'LazyLayoutHeaderImg': LazyComponent<typeof import("../../app/components/layout/HeaderImg.vue").default>
  'LazyLayoutNavbar': LazyComponent<typeof import("../../app/components/layout/Navbar.vue").default>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only").default>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
