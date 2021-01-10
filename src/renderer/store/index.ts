import { getAccessorType } from 'typed-vuex'
import * as ui from './ui'

export const accessorType = getAccessorType({
  modules: {
    ui
  }
})
