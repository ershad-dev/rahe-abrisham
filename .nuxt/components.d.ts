
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


export const AuthLoginFields: typeof import("../app/components/auth/LoginFields.vue").default
export const AuthOtpFields: typeof import("../app/components/auth/OtpFields.vue").default
export const AuthRegisterFields: typeof import("../app/components/auth/RegisterFields.vue").default
export const CapitalForm: typeof import("../app/components/capital/CapitalForm.vue").default
export const CapitalHero: typeof import("../app/components/capital/CapitalHero.vue").default
export const CapitalStats: typeof import("../app/components/capital/CapitalStats.vue").default
export const CapitalSteps: typeof import("../app/components/capital/CapitalSteps.vue").default
export const CommonEmptyState: typeof import("../app/components/common/EmptyState.vue").default
export const HomeInfoBlock: typeof import("../app/components/home/InfoBlock.vue").default
export const HomeServicesSection: typeof import("../app/components/home/ServicesSection.vue").default
export const HomeWhyUsBanner: typeof import("../app/components/home/WhyUsBanner.vue").default
export const LayoutBottomNav: typeof import("../app/components/layout/BottomNav.vue").default
export const LayoutFooter: typeof import("../app/components/layout/Footer.vue").default
export const LayoutHeaderImg: typeof import("../app/components/layout/HeaderImg.vue").default
export const LayoutNavbar: typeof import("../app/components/layout/Navbar.vue").default
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only").default
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only").default
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page").default
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components").Link
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components").Base
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components").Title
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components").Style
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components").Head
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components").Html
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components").Body
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default
export const LazyAuthLoginFields: LazyComponent<typeof import("../app/components/auth/LoginFields.vue").default>
export const LazyAuthOtpFields: LazyComponent<typeof import("../app/components/auth/OtpFields.vue").default>
export const LazyAuthRegisterFields: LazyComponent<typeof import("../app/components/auth/RegisterFields.vue").default>
export const LazyCapitalForm: LazyComponent<typeof import("../app/components/capital/CapitalForm.vue").default>
export const LazyCapitalHero: LazyComponent<typeof import("../app/components/capital/CapitalHero.vue").default>
export const LazyCapitalStats: LazyComponent<typeof import("../app/components/capital/CapitalStats.vue").default>
export const LazyCapitalSteps: LazyComponent<typeof import("../app/components/capital/CapitalSteps.vue").default>
export const LazyCommonEmptyState: LazyComponent<typeof import("../app/components/common/EmptyState.vue").default>
export const LazyHomeInfoBlock: LazyComponent<typeof import("../app/components/home/InfoBlock.vue").default>
export const LazyHomeServicesSection: LazyComponent<typeof import("../app/components/home/ServicesSection.vue").default>
export const LazyHomeWhyUsBanner: LazyComponent<typeof import("../app/components/home/WhyUsBanner.vue").default>
export const LazyLayoutBottomNav: LazyComponent<typeof import("../app/components/layout/BottomNav.vue").default>
export const LazyLayoutFooter: LazyComponent<typeof import("../app/components/layout/Footer.vue").default>
export const LazyLayoutHeaderImg: LazyComponent<typeof import("../app/components/layout/HeaderImg.vue").default>
export const LazyLayoutNavbar: LazyComponent<typeof import("../app/components/layout/Navbar.vue").default>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only").default>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only").default>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page").default>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Link>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Base>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Title>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Style>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Head>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Html>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Body>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default>

export const componentNames: string[]
