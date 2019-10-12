import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store/store'
import axios from 'axios'
import { VLazyImagePlugin } from 'v-lazy-image'

Vue.config.productionTip = false

// Set default URL for TMDB API endpoints,
// will be used in api/moviesApi.js
axios.defaults.baseURL = 'https://api.themoviedb.org/3/'

// Initialize Vue Plugins:
Vue.use(VLazyImagePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
