import { mutationTree } from 'nuxt-typed-vuex'

export const state = () => ({
  sidebarVisible: false
})

export const mutations = mutationTree(state, {
  TOGGLE_SIDEBAR: state => { state.sidebarVisible = !state.sidebarVisible }
})
