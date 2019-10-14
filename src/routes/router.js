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
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
    },
    {
      path: '/movie-details',
      name: 'MovieDetails',
      component: () => import(/* webpackChunkName: "MovieDetails" */ '../views/MovieDetails.vue'),
      props: true
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
