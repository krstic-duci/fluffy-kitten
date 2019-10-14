import axios from 'axios'

const getPopularMovies = async () => {
  try {
    const response = await axios.get(`/movie/popular`)
    return response.data
  } catch (error) {
    console.error('Error in Popular movie API call', error)
  }
}

const searchMovieByQuery = async (id) => {
  try {
    const response = await axios.get(`/search/movie&query=${id}`)
    return response.data
  } catch (error) {
    console.error('Error in search movie by query param API call', error)
  }
}

const getMovieTrailerById = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}/videos`)
    return response.data
  } catch (error) {
    console.error('Error in get movie trailer by Id API call', error)
  }
}

const getMovieById = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}`)
    return response.data
  } catch (error) {
    console.error('Error in get movie by Id API call', error)
  }
}

export {
  getPopularMovies,
  searchMovieByQuery,
  getMovieTrailerById,
  getMovieById
}
