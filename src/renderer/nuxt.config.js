/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */

module.exports = {
  ssr: false,
  css: ['@/assets/transitions.css', '@/assets/extra.css'],
  head: {
    title: 'glowsquid-next',
    meta: [{ charset: 'utf-8' }]
  },
  plugins: [
    { ssr: true, src: '@/plugins/icons.js' },
    { ssr: false, src: '@/plugins/notifier.ts' },
    { ssr: false, src: '@/plugins/store.ts' }

  ],
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    'nuxt-typed-vuex',
    '@nuxtjs/tailwindcss'
  ],
  vuetify: {
    theme: {
      themes: {
        dark: {
          primary: '#002B36',
          accent: '#D33682',
          secondary: '#586E75',
          success: '#859900',
          info: '#2AA198',
          warning: '#CB4B16',
          error: '#DC322F'
        },
        light: {
          primary: '#FDF6E3',
          accent: '#D33682',
          secondary: '#EEE8D5',
          success: '#859900',
          info: '#2AA198',
          warning: '#CB4B16',
          error: '#DC322F'
        }
      },
      dark: true,
      options: { customProperties: true }
    },
    icons: {
      iconfont: 'mdi'
    }
  }
}
