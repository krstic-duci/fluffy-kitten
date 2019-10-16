<template>
  <header class="sidebar__wrapper">

    <!-- Navigation -->
    <nav>
      <div class="sidebar__wrapper__links">

        <!-- Home -->
        <router-link to="/" class="sidebar__item">
          <i class="medium material-icons">home</i>
          <span>Home</span>
        </router-link>

        <!-- Single Item Movie Details -->
        <router-link to="/watch-later" class="sidebar__item">
          <i class="medium material-icons">watch_later</i>
          <span class="sidebar__item__notification">
            Watch Later...
            <span v-if="listIdsWatchLater.length">
              <span>
                {{listIdsWatchLater.length}}
              </span>
            </span>
          </span>
        </router-link>

      </div><!-- ./sidebar__wrapper__links -->
    </nav>

    <!-- Search Movies -->
    <section class="search__movies__wrapper">

      <i class="small material-icons">search</i>

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
          >
            <router-link :to="{ name: 'MovieDetails', params: { id: movie.id }}">
              <!-- Set image from TMDB if exists, TMDB returns 404 -->
              <v-lazy-image
                v-if="movie.poster_path"
                :src="`${movieImagePathUrl}${movie.poster_path}`"
                :src-placeholder="`${movieImagePathUrl}${movie.backdrop_path}`"
              />
              <!-- Otherwise set default No Image -->
              <v-lazy-image
                v-else
                :src="require('../assets/images/noimage.jpg')"
                :src-placeholder="require('../assets/images/no-image-icon.png')"
              />
              <span>{{ movie.title }}</span>
            </router-link>

          </div><!-- ./search__movies__wrapper__item -->
      </div><!-- ./search__movies__wrapper__list -->

    </section><!-- ./search__movies__wrapper -->

  </header><!-- ./sidebar__wrapper -->
</template>

<script>
import { searchMovieByQuery } from '@/api/moviesApi'
import { TMDB_IMG_API_URL } from '@/config/api.constants'
import { mapGetters } from 'vuex'

export default {
  name: 'theSidebar',
  data () {
    return {
      movieQuery: '',
      movies: [],
      hasMovie: true,
      movieImagePathUrl: TMDB_IMG_API_URL
    }
  },
  computed: {
    ...mapGetters({
      listIdsWatchLater: 'home/SELECTED_MOVIE_GETTER'
    })
  },
  watch: {
    $route (to, from) {
      if (to.params.id !== from.params.id) {
        this.movieQuery = ''
        this.movies = []
      }
    }
  },
  methods: {
    searchMovieById (movieId) {
      // Don't bother the server when movieId is undefined/null,
      // reset everything
      if (!movieId.length) {
        this.movies = []
        return
      }
      /**
      * @description - Call TMDB endpoint for fetching a single movie
      * @params {String} - movieId
      * @returns {Object}
      */
      searchMovieByQuery(movieId)
        .then(response => {
          // Handle the case when there are no results
          !response.results.length ? this.hasMovie = false : this.hasMovie = true
          // Otherwise push the movies for displaying
          this.movies = response.results
        })
        .catch(err => console.error(err))
    }
  }
}
</script>
