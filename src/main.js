import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store/store'
import { VLazyImagePlugin } from "v-lazy-image"
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000'

Vue.use(VLazyImagePlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
