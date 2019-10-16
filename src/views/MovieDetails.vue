<template>
  <section class="container">

    <div class="movies__details__wrapper pt-header">

      <h1>
        Movie Details:
      </h1>

      <the-spinner :isLoading="isLoading"></the-spinner>

      <section v-if="movieDetailsList" class="movies__details__wrapper__item">
        <div class="movie__details__card">

          <div class="movie__details__card__headline">
            <!-- Title -->
            <h2>{{movieDetailsList.title}}</h2>
            <!-- Fan page -->
            <p v-if="movieDetailsList.homepage" class="movie__details__card__homepage">
              <a :href="movieDetailsList.homepage" rel="noopener noreferrer" target="_blank">
                Fan page
              </a>
            </p>
            <!-- Genres -->
            <div v-if="movieDetailsList.genres.length">
              <span v-for="genre in movieDetailsList.genres" :key="genre.id" class="movie__details__card__genre">
                {{genre.name}}
              </span>
            </div>
            <!-- Overview -->
            <p class="movie__details__card__overview">{{movieDetailsList.overview}}</p>
          </div>

          <!-- Movie image -->
          <div class="movie__details__card__image">
            <v-lazy-image
              :src="`${tmdbFullImageUrl}/${movieDetailsList.poster_path}`"
              :src-placeholder="`${tmdbFullImageUrl}/${movieDetailsList.backdrop_path}`"
            />
          </div>
        </div>

        <!-- Movie trailer section -->
        <section v-if="movieDetailsList.videos.results.length">
          <h2>
            Movie trailers:
          </h2>
          <section class="movie__details__trailers">
            <!-- Trailer No.1 -->
            <div>
              <iframe
                type="text/html"
                :src="`https://www.youtube.com/embed/${movieDetailsList.videos.results[0].key}`"
                frameborder="0"
                allowfullscreen
              >
              </iframe>
            </div>
            <!-- Trailer No.2 -->
            <div v-if="movieDetailsList.videos.results[1]">
              <div>
                <iframe
                  type="text/html"
                  :src="`https://www.youtube.com/embed/${movieDetailsList.videos.results[1].key}`"
                  frameborder="0"
                  allowfullscreen
                >
                </iframe>
              </div>
            </div>
          </section>
        </section>
        <section v-else class="movies__details__trailer--disabled">
          Sorry there are no videos for selected movie...
        </section>
      </section>

    </div>
  </section>
</template>

<script>
import { getMovieById } from '@/api/moviesApi'
import { formatDate } from '@/mixins/formatDate'
import theSpinner from '@/components/theSpinner.vue'
import { TMDB_IMG_API_URL } from '@/config/api.constants'

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
      tmdbFullImageUrl: TMDB_IMG_API_URL
    }
  },
  watch: {
    // Watch for changes in search bar and URL and call the TMDB API accordingly
    $route (to, from) {
      if (to.params.id !== from.params.id) {
        this.initMovieDetails(from.params.id)
      }
    }
  },
  mounted () {
    this.initMovieDetails()
  },
  methods: {
    /**
     * @description - Call the TMDB Api for Movie details
     * @params {String} - movieId
     * @returns {Object}
     */
    initMovieDetails () {
      getMovieById(this.$route.params.id)
        .then(response => {
          this.movieDetailsList = response
        })
        .catch(err => {
          this.$toasted.show('Error fetching movie details, please try again later...', {
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
