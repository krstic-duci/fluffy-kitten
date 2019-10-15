<template>
  <div id="app">
    <the-header></the-header>
    <transition name="fade-in" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    'the-header': () => import('@/components/theSidebar.vue')
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/main-style.scss';
</style>
