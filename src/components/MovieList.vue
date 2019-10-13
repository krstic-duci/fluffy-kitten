<template>
  <div class="movies__cards" v-show="!isLoading">
    <div
      v-for="movie in movies"
      :key="movie.id"
      class="card-shadow movies__cards__item"
    >

      <!-- Movie poster image -->
      <div class="movies__cards__item__image">
        <v-lazy-image
          :src="`${MX_movieImagePathUrl}${movie.poster_path}`"
          :src-placeholder="`${MX_movieImagePathUrl}${movie.backdrop_path}`"
        />
      </div><!-- ./movies__cards__item__image -->

      <!-- Movie rating -->
      <span class="movies__cards__item__rating">
        {{ roundVoteRating(movie.vote_average) }}
      </span>

      <div class="movies__cards__item__placeholder">

        <!-- Movie title -->
        <p class="movies__cards__item__title">
          {{ movie.title }}
        </p>

        <!-- Movie released date -->
        <p class="movies__cards__item__date">
          <span>
            Release date:
          </span>
          <span>
            {{ MX_beautifyDate(movie.release_date) }}
          </span>
        </p>

        <!-- Movie overview -->
        <p class="movies__cards__item__overview">
          {{ movie.overview }}
        </p>

      </div><!-- ./movies__cards__item__placeholder -->

      <div class="movies__cards__item__functionality">
        <!-- Favorite movie -->
        <span :class="{'d-none': $route.name === 'WatchLater'}">
          Mark as favorite:
          <i class="small material-icons">
            favorite_border
          </i>
          <!-- <i v-else class="small material-icons">
            favorite
          </i> -->
        </span>

        <!-- Movie details -->
        <span :class="{'d-none': $route.name === 'WatchLater'}">
          <router-link to="/">
            Movie details...
          </router-link>
        </span>

        <!-- Watch later -->
        <span @click="fillWatchLaterList(movie.id)" :class="{'d-none': $route.name === 'WatchLater'}">
          Watch later:
          <i class="small material-icons">restore</i>
          <!-- <i class="small material-icons">check_circle</i> -->
        </span>

        <!-- Remove from "watch later" -->
        <span @click="removeFromWatchLaterList" :class="{'d-none': $route.name === 'Home'}">
          Remove from "Watch Later":
          <i class="small material-icons">delete</i>
        </span>

        <!-- Play Trailer -->
        <span @click="playTrailer(movie.id)" :class="{'d-none': $route.name === 'Home'}">
          Play trailer:
          <i class="small material-icons">play_arrow</i>
        </span>
      </div><!-- ./movies__cards__item__functionality -->

    </div><!-- ./movies__cards__item -->

    <section class="video__player--modal" :class="{'video__player--modal-show': isPlayerLoaded}">
      <iframe
        type="text/html"
        :src="`https://www.youtube.com/embed/${youtubeVideoKey}`"
        frameborder="0"
      >
      </iframe>
    </section>
  </div><!-- ./movies__cards -->
</template>

<script>
import { formatDate } from '@/mixins/formatDate'
import { movieImagePath } from '@/mixins/movieImagePath'
import { getMovieTrailerById } from '@/api/moviesApi'

export default {
  name: 'movieList',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    movies: {
      type: Array,
      default: () => { return [] }
    }
  },
  mixins: [
    formatDate,
    movieImagePath
  ],
  data () {
    return {
      isPlayerLoaded: false,
      youtubeVideoKey: ''
    }
  },
  mounted () {
    this.playTrailer()
  },
  methods: {
    /**
     * @description - Round the movie rating up to 2 decimals
     * @params {String} - num
     * @returns {Number}
     */
    roundVoteRating (num) {
      return Number.parseFloat(num).toFixed(2)
    },
    /**
     * @description - Filter the movies from home page via Vuex to be shown on /watch-later path
     * @params {String} - favMovieId
     * @returns {Array}
    */
    fillWatchLaterList (favMovieId) {
      let movieList = [...this.movies]

      movieList.filter(elem => {
        if (elem.id === favMovieId) {
          this.$store.dispatch('home/ACTION_WATCH_LATER_ARRAY', elem)
        }
      })
    },
    /**
     * @description -
     * @params {String} -
     * @returns {Array}
    */
    removeFromWatchLaterList () {
      console.log('daaaaaaa')
    },
    /**
     * @description - Make a youtube player with appropriate video
     * @params {String} - movieId
     * @returns {String}
    */
    playTrailer (movieId) {
      if (!movieId) {
        return
      }
      getMovieTrailerById(movieId)
        .then(response => {
          this.youtubeVideoKey = response.results[0].key
          this.isPlayerLoaded = true
        })
        .catch(err => console.error(err))
    }
  }
}
</script>
