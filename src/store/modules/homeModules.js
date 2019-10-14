import { sliceArrOfObj, sliceArrById } from '@/helpers'

const state = {
  WATCH_LATER_STATE: [],
  SELECTED_MOVIE: [],
  FAVORITE_LIST: []
}

const getters = {
  WATCH_LATER_GETTER: state => state.WATCH_LATER_STATE,
  SELECTED_MOVIE_GETTER: state => state.SELECTED_MOVIE,
  FAVORITE_LIST_GETTER: state => state.FAVORITE_LIST
}

const mutations = {
  SET_WATCH_LATER_LIST (state, payload) {
    state.WATCH_LATER_STATE.push(payload)
  },
  DELETE_ITEM_WATCH_LATER_LIST (state, payload) {
    sliceArrOfObj(state.WATCH_LATER_STATE, payload)
  },
  SET_WATCH_LATER_MOVIE (state, payload) {
    state.SELECTED_MOVIE.push(payload)
  },
  DELETE_WATCH_LATER_ID (state, payload) {
    sliceArrById(state.SELECTED_MOVIE, payload)
  },
  SET_FAVORITE_MOVIE (state, payload) {
    state.FAVORITE_LIST.push(payload)
  },
  DELETE_FAVORITE_MOVIE (state, payload) {
    sliceArrById(state.FAVORITE_LIST, payload)
  }
}

const actions = {
  PUSH_WATCH_LATER_LIST ({ commit }, actionPayload) {
    commit('SET_WATCH_LATER_LIST', actionPayload)
  },
  GET_MOVIE_ID_WATCH_LATER ({ commit }, actionPayload) {
    commit('DELETE_ITEM_WATCH_LATER_LIST', actionPayload)
  },
  MARK_AS_WATCH_LATER ({ commit }, actionPayload) {
    commit('SET_WATCH_LATER_MOVIE', actionPayload)
  },
  REMOVE_MARK_AS_WATCH_LATER ({ commit }, actionPayload) {
    commit('DELETE_WATCH_LATER_ID', actionPayload)
  },
  MARK_AS_FAVORITE ({ commit }, actionPayload) {
    commit('SET_FAVORITE_MOVIE', actionPayload)
  },
  REMOVE_MARK_AS_FAVORITE ({ commit }, actionPayload) {
    commit('DELETE_FAVORITE_MOVIE', actionPayload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
