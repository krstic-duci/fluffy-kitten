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
          :src="`${movieImagePathUrl}${movie.poster_path}`"
          :src-placeholder="`${movieImagePathUrl}${movie.backdrop_path}`"
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
        <span
          @click="fillFavoriteList(movie.id)"
          :class="{'d-none': $route.name === 'WatchLater'}"
        >
          Mark as favorite:
          <i
            class="small material-icons"
            :class="{'d-none': listIdsFavorite.includes(movie.id)}"
          >
            favorite_border
          </i>
          <i
            class="small material-icons"
            :class="{'d-none': !listIdsFavorite.includes(movie.id)}"
          >
            favorite
          </i>
        </span>

        <!-- Movie details -->
        <span :class="{'d-none': $route.name === 'WatchLater'}">
          <router-link :to="{ name: 'MovieDetails', params: { id: movie.id }}">
            Movie details...
          </router-link>
        </span>

        <!-- Watch later -->
        <span
          @click="fillWatchLaterList(movie.id)"
          :class="{'d-none': $route.name === 'WatchLater'}"
        >
          Watch later:
          <i
            class="small material-icons"
            :class="{'d-none': listIdsWatchLater.includes(movie.id)}"
          >
            restore
          </i>
          <i
            class="small material-icons"
            :class="{'d-none': !listIdsWatchLater.includes(movie.id)}"
          >
            check_circle
          </i>
        </span>

        <!-- Remove from "watch later" -->
        <span @click="removeFromWatchLaterList(movie.id)" :class="{'d-none': $route.name === 'Home'}">
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

    <!-- TODO: Error on adding embed video -->
    <!-- <section class="video__player--modal" :class="{'video__player--modal-show': isPlayerLoaded}">
      <iframe
        type="text/html"
        :src="`https://www.youtube.com/embed/${youtubeVideoKey}`"
        frameborder="0"
      >
      </iframe>
    </section> -->
  </div><!-- ./movies__cards -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getMovieTrailerById } from '@/api/moviesApi'
import { formatDate } from '@/mixins/formatDate'
import { TMDB_IMG_API_URL } from '@/config/api.constants'

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
    formatDate
  ],
  data () {
    return {
      isPlayerLoaded: false,
      youtubeVideoKey: '',
      movieImagePathUrl: TMDB_IMG_API_URL,
      selectedIdsWatchLater: []
    }
  },
  computed: {
    ...mapGetters({
      watchLaterList: 'home/WATCH_LATER_GETTER',
      listIdsWatchLater: 'home/SELECTED_MOVIE_GETTER',
      listIdsFavorite: 'home/FAVORITE_LIST_GETTER'
    })
  },
  mounted () {
    this.playTrailer()
  },
  methods: {
    /* eslint-disable-next-line */
    ...mapActions[
      /* eslint-disable-next-line */
      'home/PUSH_WATCH_LATER_LIST',
      'home/GET_MOVIE_ID_WATCH_LATER',
      'home/MARK_AS_WATCH_LATER',
      'home/REMOVE_MARK_AS_WATCH_LATER',
      'home/MARK_AS_FAVORITE',
      'home/REMOVE_MARK_AS_FAVORITE'
    ],
    /**
     * @description - Round the movie rating up to 2 decimals
     * @params {String} - num
     * @returns {Number}
     */
    roundVoteRating (num) {
      return Number.parseFloat(num).toFixed(2)
    },
    /**
     * @description - Map the movies from home page via Vuex to be shown on /watch-later path
     * and set Watch later icons on Home component
     * @params {String} - watchLaterMovieId
     * @returns {Array}
    */
    fillWatchLaterList (watchLaterMovieId) {
      // Prevent user to add multiple movies with same ID
      if (this.listIdsWatchLater.includes(watchLaterMovieId)) {
        return
      }
      let movieList = [...this.movies]

      // Add a single movie card
      movieList.map(elem => {
        if (elem.id === watchLaterMovieId) {
          this.$store.dispatch('home/PUSH_WATCH_LATER_LIST', elem)
        }
      })

      // Change the icon for watch later, and
      // Push IDs into array to represent watched later movies
      this.$store.dispatch('home/MARK_AS_WATCH_LATER', watchLaterMovieId)
    },
    /**
     * @description - Delete a movie from "Watch later" section
     * and remove checked icon from "Home" page
     * @params {String} - elemWatchLaterMovie
     * @returns {Array or Null}
    */
    removeFromWatchLaterList (elemWatchLaterMovie) {
      // Remove movie Card
      this.$store.dispatch('home/GET_MOVIE_ID_WATCH_LATER', elemWatchLaterMovie)
      // Remove icon
      this.$store.dispatch('home/REMOVE_MARK_AS_WATCH_LATER', elemWatchLaterMovie)
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
    },
    /**
     * @description - Toggle show/hide favorite movie on "Home" page
     * @params {String} - favMovieId
     * @returns {Array or Null}
    */
    fillFavoriteList (favMovieId) {
      // Remove icon
      if (this.listIdsFavorite.includes(favMovieId)) {
        this.$store.dispatch('home/REMOVE_MARK_AS_FAVORITE', favMovieId)
      } else {
        // Push IDs into array to represent favorite movies
        this.$store.dispatch('home/MARK_AS_FAVORITE', favMovieId)
      }
    }
  }
}
</script>
