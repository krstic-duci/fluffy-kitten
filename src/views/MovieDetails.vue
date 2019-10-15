<template>
  <section class="container">

    <the-spinner :isLoading="isLoading"></the-spinner>

    <div class="movies__details__wrapper pt-header">

      <h1>
        Movie Details:
      </h1>

      <!-- TODO: Implement movie details TMDB API -->
      <!-- <div v-for="(movie, index) in movieDetailsList" :key="index">
        <p>{{movie.title}}</p>

        <section v-if="movie.results.length">
          <div>
            Movies trailers list
          </div>
        </section>
        <section v-else>
          Sorry there are no videos for selected movie
        </section>
      </div> -->

    </div>
  </section>
</template>

<script>
import { getMovieById } from '@/api/moviesApi'
import { formatDate } from '@/mixins/formatDate'
import theSpinner from '@/components/theSpinner.vue'
import { TMDB_FULL_IMG_API_URL } from '@/config/api.constants'

export default {
  name: 'movieDetails',
  components: {
    'the-spinner': theSpinner
  },
  mixins: [
    formatDate
  ],
  data () {
    return {
      isLoading: true,
      movieDetailsList: [],
      tmdbFullImageUrl: TMDB_FULL_IMG_API_URL,
      movieId: this.$route.params.id
    }
  },
  watch: {
    // Watch for changes in search bar and URL and call the TMDB API accordingly
    $route (to, from) {
      if (to.params.id !== from.params.id) {
        this.movieId = from.params.id
      }
    }
  },
  created () {
    this.initMovieDetails()
  },
  updated () {
    this.initMovieDetails()
  },
  methods: {
    /**
     * @description - Call the TMDB Api for Movie details
     * @params {String} - movieId
     * @returns {Object}
     */
    initMovieDetails () {
      getMovieById(this.movieId)
        .then(response => {
          this.movieDetailsList = response
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
