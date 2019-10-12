<template>
  <div class="sidebar--width search__movies__wrapper">

    <input
      type="text"
      v-model="movieQuery"
      @keyup="searchMovieById(movieQuery)"
      placeholder="Search your movie..."
    >

    <div class="search__movies__wrapper__list">
      <p v-if="!hasMovie">No results for current parameter, please try something else...</p>
      <div
        class="search__movies__wrapper__item"
        v-for="movie in movies"
        :key="movie.id"
        @click.prevent="openMovieModal(movie.id)"
      >
        {{movie}}
        <!-- Set image from TMDB if exists -->
        <v-lazy-image
          v-if="movie.poster_path"
          :src="`${movieByIdImagePath}${movie.poster_path}`"
          :src-placeholder="`${movieByIdImagePath}${movie.backdrop_path}`"
        />
        <!-- Otherwise set default No Image -->
        <v-lazy-image
          v-else
          :src="require('../assets/images/noimage.jpg')"
          :src-placeholder="require('../assets/images/noimage.jpg')"
        />
        <span>{{ movie.title }}</span>

        <!-- <movie-details :movieProp='movie'></movie-details> -->
      </div>
    </div>
  </div>
</template>

<script>
import { searchMovieByQuery } from '@/api/moviesApi'

export default {
  name: 'searchMovie',
  components: {
    'movie-details': () => import('./movieDetails.vue')
  },
  data () {
    return {
      movieByIdImagePath: process.env.VUE_APP_TMDB_IMG_URL,
      movieQuery: '',
      movies: [],
      hasMovie: true
    }
  },
  methods: {
    searchMovieById (movieId) {
      // Don't bother the server when movieId is undefined/null
      // reset everything
      if (!movieId.length) {
        this.movies = []
        return
      }
      /*
      * @description - Call TMDB endpoint for fetching a single movie
      * @params {String} - movieId
      * @returns {Object}
      */
      searchMovieByQuery(movieId)
        .then(response => {
          // Handle the case when there are no results
          if (!response.results.length) {
            this.hasMovie = false
          } else {
            this.hasMovie = true
          }

          this.movies = response.results
        })
        .catch(err => console.error(err))
    }
  }
}
</script>
