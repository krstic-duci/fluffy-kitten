<template>
  <section class="container">

    <div class="home__wrapper pt-header">

      <h1>Popular movies</h1>

      <the-spinner :isLoading="isLoading"></the-spinner>

      <movie-list
        :isLoading="isLoading"
        :movies="popularMoviesList"
      >
      </movie-list>

    </div><!-- ./home__wrapper -->

  </section>
</template>

<script>
import { getPopularMovies } from '@/api/moviesApi'

export default {
  name: 'home',
  components: {
    'the-spinner': () => import('@/components/theSpinner.vue'),
    'movie-list': () => import('@/components/movieLists.vue')
  },
  data () {
    return {
      popularMoviesList: [],
      isLoading: true
    }
  },
  created () {
    this.initPopularMovies()
  },
  methods: {
    initPopularMovies () {
    /**
     * @description - Call TMDB endpoint for fetching 20 movies rated by popularity
     * @returns {Object}
     */
      getPopularMovies()
        .then(response => {
          this.popularMoviesList = response.results
        })
        .catch(err => {
          this.$toasted.show('Error fetching data, please try again later...', {
            type: 'error'
          })
          console.error(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
