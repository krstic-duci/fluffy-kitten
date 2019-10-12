<template>
  <div class="sidebar--width movie__details--modal">
    <h1>Details page</h1>
    {{movieProp.title}}
  </div>
</template>

<script>
export default {
  name: 'movieDetails',
  props: {
    movieProp: {
      type: Object,
      required: true
    }
  }
}
</script>
