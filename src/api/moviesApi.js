import axios from 'axios'

const getPopularMovies = async () => {
  try {
    const response = await axios.get(`/movie/popular?api_key=${process.env.VUE_APP_TMDB_API_KEY}`)
    return response.data
  } catch (error) {
    console.error('Error in Popular movie API call', error)
  }
}

const searchMovieByQuery = async (id) => {
  try {
    const response = await axios.get(`/search/movie?api_key=${process.env.VUE_APP_TMDB_API_KEY}&query=${id}`)
    return response.data
  } catch (error) {
    console.error('Error in search movie by query param API call', error)
  }
}

const getMovieById = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`)
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error in get movie by Id API call', error)
  }
}

export {
  getPopularMovies,
  searchMovieByQuery,
  getMovieById
}
