<template>
  <div class="container">
    <section class="home__wrapper pt-header">

      <h1>Popular movies</h1>

      <the-spinner :isLoading="isLoading"></the-spinner>

      <movie-list
        :isLoading="isLoading"
        :movies="popularMoviesList"
      >
      </movie-list>

    </section><!-- ./home__wrapper -->
  </div>
</template>

<script>
import { getPopularMovies } from '@/api/moviesApi'
import { mapActions, mapGetters } from 'vuex'
import theSpinner from '@/components/theSpinner.vue'
import movieList from '@/components/MovieList.vue'

export default {
  name: 'home',
  components: {
    'the-spinner': theSpinner,
    'movie-list': movieList
  },
  data () {
    return {
      popularMoviesList: [],
      isLoading: true
    }
  },
  computed: {
    ...mapGetters({
      watchLaterList: 'home/WATCH_LATER_GETTER'
    })
  },
  created () {
    this.initPopularMovies()
  },
  methods: {
    ...mapActions['home/ACTION_WATCH_LATER_ARRAY'],
    initPopularMovies () {
    /**
     * @description - Call TMDB endpoint for fetching 20 movies rated by popularity
     * @returns {Object}
     */
      getPopularMovies()
        .then(response => {
          this.popularMoviesList = response.results
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
