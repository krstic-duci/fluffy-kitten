const state = {
  IS_FAVORITE: false
}

const getters = {
  IS_FAVORITE_ACTIVE: state => state.IS_FAVORITE
}

const mutations = {
  SET_IS_FAVORITE (state, payload) {
    state.IS_FAVORITE = payload
  }
}

const actions = {
  MAKE_IT_FAVORITE ({ commit }, actionPayload) {
    console.log(actionPayload)
    commit('SET_IS_FAVORITE', actionPayload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
