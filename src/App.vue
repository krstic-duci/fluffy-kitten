<template>
  <div id="app">
    <the-header></the-header>
    <transition name="fade-in" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import theSidebar from './components/theSidebar.vue'

export default {
  name: 'app',
  components: {
    'the-header': theSidebar
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/main-style.scss';
</style>
