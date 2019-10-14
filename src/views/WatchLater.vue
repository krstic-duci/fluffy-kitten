<template>
  <div class="container">
    <section class="watch__later__wrapper pt-header">

      <h1>List of added movies:</h1>

      <p v-show="!watchLaterListMovies.length">
        <i class="large material-icons">help</i>
        <span>
          Still nothing select to view, please select a movie from the home page...
        </span>
      </p>

      <movie-list :movies="watchLaterListMovies"></movie-list>

    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import movieList from '@/components/movieList.vue'

export default {
  name: 'watchLater',
  components: {
    'movie-list': movieList
  },
  computed: {
    ...mapGetters({
      watchLaterListMovies: 'home/WATCH_LATER_GETTER'
    })
  }
}
</script>
