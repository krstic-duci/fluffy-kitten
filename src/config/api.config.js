import axios from 'axios'

const ApiService = {
  init () {
    axios.defaults.baseURL = 'https://api.themoviedb.org/3/'
    axios.defaults.params = {
      api_key: process.env.VUE_APP_TMDB_API_KEY
    }
  }
}

export default ApiService
