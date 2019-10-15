import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import homeModules from './modules/homeModules'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    // I deliberately used persist Vuex to local storage for
    // "watch later" functionality, I could instead use the API from
    // TMDB but then I would never used Vuex and I wanted to show my
    // knowledge on these matters
    createPersistedState()
  ],
  modules: {
    home: homeModules
  }
})
