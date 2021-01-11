import { getAccessorType } from 'typed-vuex'
import * as ui from './ui'
import * as users from './users'
export const accessorType = getAccessorType({
  modules: {
    ui,
    users
  }
})
