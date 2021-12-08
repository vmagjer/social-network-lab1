const nyt_API_KEY = 'cimYQMmOyAQ8KmG0vvR9E2njqfKLxgPR'
const movie_api = 'https://api.nytimes.com/svc/movies/v2'

export const getReviews = async (query, page) => {
  const response = await fetch(
    `${movie_api}/reviews/search.json?order=by-opening-date&api-key=${nyt_API_KEY}&offset=${
      (page - 1) * 20
    }&query=${query}`
  )
  const result = await response.json()

  return result
}

// export const getArticles = async (query, page) => {
//   const response = await fetch(
//     `${api}/movie/popular?api_key=${TMDB_API_key}&page=${page}`
//   )
//   const result = await response.json()
//   return result
// }
