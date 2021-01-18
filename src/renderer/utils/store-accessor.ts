/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Instance from '~/store/instances'
import Ui from '~/store/ui'
import Users from '~/store/users'

let instanceStore: Instance
let usersStore: Users
let uiStore: Ui

function initialiseStores (store: Store<any>): void {
  instanceStore = getModule(Instance, store)
  uiStore = getModule(Ui, store)
  usersStore = getModule(Users, store)
}

export { initialiseStores, instanceStore, uiStore, usersStore }
