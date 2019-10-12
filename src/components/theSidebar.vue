<template>
  <aside>
    <!-- Home -->
    <router-link to="/">
      <i class="medium material-icons">home</i>
      <span>Home</span>
    </router-link>
    <!-- Single Item Movie Details -->
    <router-link to="/watch-later">
      <i class="medium material-icons">watch_later</i>
      <span>Watch Later...</span>
    </router-link>
  </aside>
</template>

<script>
export default {
  name: 'theSidebar'
}
</script>
