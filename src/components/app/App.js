import { getAuth, signInWithPopup, signOut } from '@firebase/auth'
import { addDoc, collection } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { facebookProvider } from '../../config/authMethods'
import app, { db } from '../../config/firebase-config'
import { getReviews } from '../../service/nyt-api'
import { getMovies, getPopularMovies } from '../../service/tmdb_api'
import './App.css'

const FacebookProfile = ({ name, email, photoURL }) => (
  <div className="current-user-data">
    <div>{name}</div>
    <img src={photoURL + '?redirect=false'} alt="profile_picture" />
  </div>
)

function App() {
  const [user, setUser] = useState(null)
  // const [userImg, setUserImg] = useState(null)

  const handleSignIn = async (provider) => {
    const auth = getAuth(app)
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      setUser(user)

      const docRef = await addDoc(collection(db, 'users'), {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (error) {
      console.error(error)
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    const auth = getAuth(app)
    try {
      await signOut(auth)
      setUser(getAuth(app).currentUser)
      // smth
    } catch (error) {
      // smth else
      console.error(error)
    }
  }
  // ---------------------------MOVIES---------------------------
  const [movieList, setMovieList] = useState([])
  const [listPage, setListPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [search, setSearch] = useState('')
  // const [lastQuery, setLastQuery] = useState(() => () => {})

  // const handleGetPopularMovies = async () => {
  //   const movies = await getPopularMovies(search, listPage)
  //   setMovieList(movies.results)
  //   setMaxPage(movies.total_pages)
  //   setListPage(movies.page)
  //   setLastQuery(() => handleGetPopularMovies)
  // }
  const handlePageLeft = async () => {
    if (movieList.length === 0) return
    if (listPage === 1) return
    setListPage((prev) => prev - 1)
  }
  const handlePageRight = async () => {
    if (movieList.length === 0) return
    if (listPage === maxPage) return
    setListPage((prev) => prev + 1)
  }

  useEffect(() => {
    async function bo() {
      const movies = await getMovies(search, listPage)
      setMovieList(movies.results)
      setMaxPage(movies.total_pages)
    }
    if (search.length) bo()
  }, [listPage])

  const handleInputChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSearch = async () => {
    const movies = await getMovies(search, listPage)
    setMovieList(movies.results)
    setMaxPage(movies.total_pages)
    setListPage(movies.page)
    // setLastQuery(() => handleSearch)
  }

  // ---------------------------REVIEWS---------------------------
  const [reviewList, setReviewList] = useState([])
  const [reviewListPage, setReviewListPage] = useState(1)
  const [reviewSearch, setReviewSearch] = useState('')
  const [hasMore, setHasMore] = useState(true)

  const handleReviewPageLeft = async () => {
    if (reviewList.length === 0) return

    setReviewListPage((prev) => Math.max(prev - 1, 1))
    handleReviewSearch()
  }
  const handleReviewPageRight = async () => {
    if (reviewList.length === 0) return
    if (!hasMore) return
    setReviewListPage((prev) => prev + 1)
    handleReviewSearch()
  }

  const handleReviewInputChange = (event) => {
    setReviewSearch(event.target.value)
  }

  const handleReviewSearch = async () => {
    const response = await getReviews(reviewSearch, reviewListPage)
    setReviewList(response.results)
    setHasMore(response.has_more)
  }

  return (
    <div className="App">
      {/* ---------------------------LOG IN--------------------------- */}
      <div className="menu-bar">
        {user && (
          <FacebookProfile
            name={user.displayName}
            email={user.email}
            photoURL={user.photoURL}
          />
        )}

        {!user && (
          <button
            className="sign-in-btn"
            onClick={() => handleSignIn(facebookProvider)}
          >
            Sign in with Facebook
          </button>
        )}
        {user && (
          <button
            className="sign-out-btn"
            onClick={() => handleSignOut(facebookProvider)}
          >
            Sign out
          </button>
        )}
      </div>
      <div style={{ display: 'flex' }}>
        {/* ---------------------------MOVIES--------------------------- */}
        <div style={{ width: '50%' }}>
          <h3>Movies</h3>
          <div className="list-control">
            {/* <button
              className="movies-btn"
              onClick={() => handleGetPopularMovies()}
            >
              Get Popular movies
            </button> */}
            <input type="text" value={search} onChange={handleInputChange} />
            <button
              className="movies-btn"
              onClick={() => handleSearch()}
              disabled={search.trim().length === 0}
            >
              Search
            </button>

            <button
              className="movies-btn"
              onClick={() => handlePageLeft()}
              disabled={listPage === 1}
            >
              {'<'}
            </button>
            <div>{listPage}</div>
            <button
              className="movies-btn"
              onClick={() => handlePageRight()}
              disabled={listPage === maxPage}
            >
              {'>'}
            </button>
            <div>{maxPage}</div>
          </div>
          <div className="movie-list">
            {movieList.map((movie) => (
              <div className="movie-listing" key={movie.id}>
                <div>{`Title: ${movie.title}`}</div>
                <div>{`${movie.vote_average}/10   ${movie.vote_count}`}</div>
                {/* <div>{`Vote count: ${movie.vote_count}`}</div> */}
                <p>{movie.overview}</p>
              </div>
            ))}
          </div>
        </div>
        {/* ---------------------------REVIEWS--------------------------- */}
        <div style={{ width: '50%' }}>
          <h3>Reviews</h3>
          <div className="list-control">
            <input
              type="text"
              value={reviewSearch}
              onChange={handleReviewInputChange}
            />
            <button className="movies-btn" onClick={() => handleReviewSearch()}>
              Search
            </button>

            <button
              className="movies-btn"
              onClick={() => handleReviewPageLeft()}
              disabled={reviewListPage === 1}
            >
              {'<'}
            </button>
            <div>{reviewListPage}</div>
            <button
              className="movies-btn"
              onClick={() => handleReviewPageRight()}
              disabled={!hasMore || reviewList?.length === 0}
            >
              {'>'}
            </button>
          </div>
          <div className="movie-list">
            {reviewList.map((review, index) => (
              <div className="movie-listing" key={reviewListPage * 20 + index}>
                <div>{`Headline: ${review.headline}`}</div>
                <div>{`Movie: ${review.display_title}`}</div>
                <div>{`Review author: ${review.byline}`}</div>
                {/* <div>{`Vote count: ${movie.vote_count}`}</div> */}
                <a href={review.link.url} type={review.link.type}>
                  {review.link.suggested_link_text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
