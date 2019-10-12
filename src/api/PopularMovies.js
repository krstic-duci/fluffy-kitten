import axios from 'axios'

const getSingleProduct = async (id) => {
  try {
    const response = await axios.get('/products/' + id)
    return response.data
  } catch (error) {
    console.error('Error in /products/id API call', error)
  }
}

export {
  getSingleProduct
}