import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default () => {
  const store = new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 'test textaaaccc'
        },
        mutations: {
          adText (state, text) {
            state.text += text
          }
        },
        actions: {
          addTextAsync (context, text) {
            setTimeout(() => {
              context.commit('adText', text)
            }, 1000)
          }
        },
        modules: {
          b: {
            namespaced: true,
            state: {
              abc: 'abcc'
            }
          }
        }
      }
    }
  })

  // 设置热更替
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        action: newActions,
        getters: newGetters
      })
    })
  }
  return store
}
