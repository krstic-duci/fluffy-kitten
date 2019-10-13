<template>
  <div class="container">
    <section class="home__wrapper pt-header">

      <h1>Popular movies</h1>

      <div class="home__wrapper__movies">
        <div
          v-for="movie in popularMoviesList"
          :key="movie.id"
          class="card-shadow home__wrapper__movies__item"
        >

          <!-- Movie poster image -->
          <div class="home__wrapper__movies__item__image">
            <v-lazy-image
              :src="`${MX_movieImagePathUrl}${movie.poster_path}`"
              :src-placeholder="`${MX_movieImagePathUrl}${movie.backdrop_path}`"
            />
          </div>

          <!-- Movie rating -->
          <span class="home__wrapper__movies__item__rating">
            {{ roundVoteRating(movie.vote_average) }}
          </span>

          <div class="home__wrapper__movies__item__placeholder">

            <!-- Movie title -->
            <p class="home__wrapper__movies__item__title">
              {{ movie.title }}
            </p>

            <!-- Movie released date -->
            <p class="home__wrapper__movies__item__date">
              <span>
                Release date:
              </span>
              <span>
                {{ MX_beautifyDate(movie.release_date) }}
              </span>
            </p>

            <!-- Movie synopsis -->
            <p class="home__wrapper__movies__item__overview">
              {{ movie.overview }}
            </p>

          </div>

          <!-- Movie favourite, Watch later -->
          <div class="home__wrapper__movies__item__functionality">
            <!-- Favorite movie -->
            <span @click="markFavoriteMovie">
              Mark as favorite:
              <i v-if="!isFavoriteGetter" class="small material-icons">
                favorite_border
              </i>
              <i v-else class="small material-icons">
                favorite
              </i>
            </span>

            <!-- Movie details -->
            <span>
              <router-link to="/">
                Movie details...
              </router-link>
            </span>

            <!-- Watch later -->
            <span>
              Watch later:
              <i class="small material-icons">restore</i>
            </span>
          </div>

        </div><!-- ./home__wrapper__movies__item -->
      </div><!-- ./home__wrapper__movies -->

    </section><!-- ./home__wrapper -->
  </div>
</template>

<script>
import { getPopularMovies } from '@/api/moviesApi'
import { formatDate } from '@/mixins/formatDate'
import { movieImagePath } from '@/mixins/movieImagePath'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'home',
  mixins: [
    formatDate,
    movieImagePath
  ],
  data () {
    return {
      popularMoviesList: [],
      guestSessionID: ''
    }
  },
  computed: {
    ...mapGetters({
      isFavoriteGetter: 'home/IS_FAVORITE_ACTIVE'
    })
  },
  created () {
    this.initPopularMovies()
  },
  methods: {
    ...mapActions [
      'home/MAKE_IT_FAVORITE'
    ],
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
    },
    /**
     * @description - Round the movie rating up to 2 decimals
     * @params {String} - num
     * @returns {Number}
     */
    roundVoteRating (num) {
      return Number.parseFloat(num).toFixed(2)
    },
    markFavoriteMovie () {
      this.$store.dispatch('home/MAKE_IT_FAVORITE', false)
    }
  }
}
</script>
