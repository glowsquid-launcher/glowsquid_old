import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
@Module({
  name: 'ui',
  stateFactory: true,
  namespaced: true
})
export default class UiModule extends VuexModule {
  sidebarVisible = false
  authModalVisible = false
  settingsVisible = false

  @Mutation
  TOGGLE_SIDEBAR () { this.sidebarVisible = !this.sidebarVisible }

  @Mutation
  TOGGLE_AUTH_MODAL () { this.authModalVisible = !this.authModalVisible }

  @Mutation
  TOGGLE_SETTINGS () { this.settingsVisible = !this.settingsVisible }
}
