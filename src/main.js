import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store/store'
import ApiService from '@/config/api.config'
import { VLazyImagePlugin } from 'v-lazy-image'
import Toasted from 'vue-toasted'

Vue.config.productionTip = false

ApiService.init()

// Initialize Vue Plugins:
Vue.use(VLazyImagePlugin)
Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 2000
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
