import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/watch-later',
      name: 'WatchLater',
      component: () => import(/* webpackChunkName: "WatchLater" */ '@/views/WatchLater.vue')
    },
    {
      path: '/movie-details/:id',
      name: 'MovieDetails',
      component: () => import(/* webpackChunkName: "MovieDetails" */ '@/views/MovieDetails.vue'),
      props: true
    },
    {
      path: '*',
      component: () => import('@/views/404.vue')
    }
  ]
})
