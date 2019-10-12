<template>
  <div id="app">
    <the-header></the-header>
    <search-movie></search-movie>
    <transition name="fade-in" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import theSidebar from './components/theSidebar.vue'
import searchMovie from './components/searchMovie.vue'

export default {
  name: 'app',
  components: {
    'the-header': theSidebar,
    'searchMovie': searchMovie
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/main-style.scss';
</style>
