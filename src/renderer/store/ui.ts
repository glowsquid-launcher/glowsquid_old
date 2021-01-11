import { mutationTree } from 'nuxt-typed-vuex'

export const state = () => ({
  sidebarVisible: false,
  authModalVisible: false,
  settingsVisible: false
})

export const mutations = mutationTree(state, {
  TOGGLE_SIDEBAR: state => { state.sidebarVisible = !state.sidebarVisible },
  TOGGLE_AUTH_MODAL: state => { state.authModalVisible = !state.authModalVisible },
  TOGGLE_SETTINGS: state => { state.settingsVisible = !state.settingsVisible }
})
