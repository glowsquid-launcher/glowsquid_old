import { VueConstructor } from 'vue'
import { accessorType } from '~/store'

declare const __resources : string

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }
}
declare module '*.vue' {
  const _default: VueConstructor
  export default _default
}
