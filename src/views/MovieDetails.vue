<template>
  <section class="container">

    <the-spinner :isLoading="isLoading"></the-spinner>

    <div class="movies__details__wrapper pt-header">

      <h1>
        Movie Details:
      </h1>
      <!-- MX_movieDetailsImagePathUrl -->
      <div v-for="movie in movieDetailsList" :key="movie.id">
        <p>{{movie.adult}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { getMovieById } from '@/api/moviesApi'
import { formatDate } from '@/mixins/formatDate'
import theSpinner from '@/components/theSpinner.vue'
import { movieDetailsImagePath } from '@/mixins/movieDetailsImagePath'

export default {
  name: 'movieDetails',
  components: {
    'the-spinner': theSpinner
  },
  mixins: [
    formatDate,
    movieDetailsImagePath
  ],
  data () {
    return {
      isLoading: true,
      movieDetailsList: []
    }
  },
  mounted () {
    this.initMovieDetails()
  },
  methods: {
    initMovieDetails () {
      getMovieById(this.$route.params.id)
        .then(responseData => {
          // console.log(responseData)
          this.movieDetailsList = responseData
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
