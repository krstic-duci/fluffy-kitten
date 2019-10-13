import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import homeModules from './modules/homeModules'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  modules: {
    home: homeModules
  },
  strict: process.env.NODE_ENV !== 'production'
})
