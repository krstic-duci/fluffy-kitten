import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/watch-later',
      name: 'WatchLater',
      component: () => import(/* webpackChunkName: "WatchLater" */ '../views/WatchLater.vue')
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
