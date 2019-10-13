const state = {
  WATCH_LATER_STATE: []
}

const getters = {
  WATCH_LATER_GETTER: state => state.WATCH_LATER_STATE
}

const mutations = {
  MUTATION_WATCH_LATER_ARRAY (state, payload) {
    state.WATCH_LATER_STATE.push(payload)
  }
}

const actions = {
  ACTION_WATCH_LATER_ARRAY ({ commit }, actionPayload) {
    commit('MUTATION_WATCH_LATER_ARRAY', actionPayload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
