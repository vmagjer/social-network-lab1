
const OMDb_API_key='ffc6784c'

function async getMoviesByTitle(title) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDb_API_key}&t=${title}`)
  const json = response.json()
  const 
}