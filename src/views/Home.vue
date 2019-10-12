<template>
  <div class="sidebar--width home__wrapper">
    <h1>Home page</h1>
    {{popularMoviesList}}
  </div>
</template>

<script>
import { getPopularMovies } from '@/api/moviesApi'

export default {
  name: 'home',
  data () {
    return {
      popularMoviesList: []
    }
  },
  created () {
    this.initPopularMovies()
  },
  methods: {
    initPopularMovies () {
      /*
      * @description - Call TMDB endpoint for fetching 20 movies rated by popularity
      * @returns {Object}
      */
      getPopularMovies()
        .then(response => {
          this.popularMoviesList = response.results
        })
        .catch(err => console.error(err))
    }
  }
}
</script>
