import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store/store'
import { VLazyImagePlugin } from 'v-lazy-image'
import ApiService from '@/config/api.config'

Vue.config.productionTip = false

ApiService.init()

// Initialize Vue Plugins:
Vue.use(VLazyImagePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
