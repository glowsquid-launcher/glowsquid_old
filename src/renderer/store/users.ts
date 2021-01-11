import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { IUser, Authenticator } from 'minecraft-launcher-core'
import { store } from '~/plugins/store'

export const state = () => ({
  users: (store.get('users') || []) as IUser[],
  selected: (store.get('selectedUser') || {}) as IUser
})

export const mutations = mutationTree(state, {
  PUSH_USER (state, user: IUser) {
    state.users.push(user)
    store.set('users', state.users)
  },
  SET_USER (state, idx: number) {
    console.log(state.users[idx])

    state.selected = state.users[idx]
    store.set('selectedUser', state.selected)
  },
  REMOVE_USER (state, idx: number) {
    state.users.splice(idx, 1)
    store.set('users', state.users)
  }
})

export const actions = actionTree({ state, mutations }, {
  async ADD_USER ({ commit, state }, { username, password }: { username:string, password:string}) {
    console.log(username, password)
    try {
      const user = await Authenticator.getAuth(username, password)

      if (state.users.find(val => val.name === user.name)) {
        throw new Error('User already logged in')
      } else commit('PUSH_USER', user)
    } catch (e) {
      if (e.message === 'Validation error: OK') throw new Error('You do not have a minecraft account')
      throw e
    }
  }
})
