<template>
  <aside
    class="sidebar__wrapper"
    :class="{'sidebar__wrapper--show': isSidebarOpen}"
  >
    <!-- Aside hamburger -->
    <div class="sidebar__wrapper__hamburger" @click="openCloseSidebar">
      <span></span>
      <span></span>
      <span></span>
    </div><!-- ./sidebar__wrapper__hamburger -->

    <div class="sidebar__wrapper__links">

      <!-- Home -->
      <router-link to="/" class="sidebar__item">
        <i class="medium material-icons">home</i>
        <span>Home</span>
      </router-link>

      <!-- Single Item Movie Details -->
      <router-link to="/watch-later" class="sidebar__item">
        <i class="medium material-icons">watch_later</i>
        <span>Watch Later...</span>
      </router-link>

    </div><!-- ./sidebar__wrapper__links -->
  </aside><!-- ./sidebar__wrapper -->
</template>

<script>
export default {
  name: 'theSidebar',
  data () {
    return {
      isSidebarOpen: false
    }
  },
  watch: {
    // Whenever route path is changed reset the
    // sidebar to default
    $route (to, from) {
      this.isSidebarOpen = false
    }
  },
  methods: {
    openCloseSidebar () {
      this.isSidebarOpen = !this.isSidebarOpen
    }
  }
}
</script>
