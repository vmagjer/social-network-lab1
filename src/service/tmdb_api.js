const TMDB_API_key = 'a503b1a32e0c44268929db86df6c1151'
const api = 'https://api.themoviedb.org/3'

export const getPopularMovies = async (query, page) => {
  const response = await fetch(
    `${api}/movie/popular?api_key=${TMDB_API_key}&page=${page}`
  )
  const result = await response.json()
  return result
}
export const getMovies = async (query, page) => {
  const response = await fetch(
    `${api}/search/movie?api_key=${TMDB_API_key}&page=${page}&query=${query}`
  )
  const result = await response.json()
  return result
}

export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${api}/movie/${movieId}?api_key=${TMDB_API_key}`
  )
  const result = await response.json()
  return result
}

export const getSimilarMovies = async (movieId) => {
  const response = await fetch(
    `${api}/movie/${movieId}/similar?api_key=${TMDB_API_key}`
  )
  const result = await response.json()
  return result
}
