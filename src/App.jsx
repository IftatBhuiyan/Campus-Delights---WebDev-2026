import { useEffect, useState } from 'react'
import FoodDetailModal from './components/FoodDetailModal'
import FoodList from './components/FoodList'
import { getFoodSpots, addReview } from './api/foodSpots'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import './App.css'

function getCurrentPage() {
  const page = window.location.hash.replace('#', '')
  return page || 'home'
}

const normalize = (spot) => ({ ...spot, id: spot._id })

function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage())
  const [spots, setSpots] = useState([])
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [sortBy, setSortBy] = useState('default')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPage(getCurrentPage())
    }

    window.addEventListener('hashchange', handleRouteChange)
    return () => window.removeEventListener('hashchange', handleRouteChange)
  }, [])

  useEffect(() => {
    setLoading(true)
    getFoodSpots({ sortBy })
      .then((data) => {
        const normalized = data.map(normalize)
        setSpots(normalized)
        setSelectedSpot(null)
        setError('')
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [sortBy])

  const updateSpotReviews = async (spotId, updatedReviews) => {
    const newReview = updatedReviews[updatedReviews.length - 1]
    try {
      const updated = normalize(await addReview(spotId, newReview))
      setSpots((currentSpots) =>
        currentSpots.map((spot) => (spot.id === spotId ? updated : spot)),
      )
      setSelectedSpot(updated)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <header className="site-header">
        <a className="logo" href="#home">Campus Delights</a>
        <nav>
          <a href="#home">Home</a>
          <a href="#food-spots">Food Spots</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        {currentPage === 'home' && (
          <section className="hero-section" id="home">
            <div className="hero-copy">
              <p className="hero-label">Hunter College food finder</p>
              <h1>Campus Delights</h1>
              <p className="hero-text">
                Find student-approved food spots near Hunter College without
                guessing where to eat between classes.
              </p>

              <div className="feature-list">
                <span>Browse spots near Hunter</span>
                <span>Filter and search restaurants</span>
                <span>Check prices and open status</span>
                <span>Suggest new places to the team</span>
              </div>

              <div className="hero-actions">
                <a className="primary-button" href="#food-spots">
                  Explore Food Spots
                </a>
                <a className="secondary-link" href="#about">
                  What can I do here?
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-label="Campus food preview">
              <div className="visual-card main-card">
                <span className="card-label">Why students would use it</span>
                <h2>Food spots made easier</h2>
                <p>See quick meals, prices, status, and basic details in one place.</p>
              </div>
              <div className="visual-card small-card top-card">
                <span>Student-picked spots</span>
                <strong>Reviews</strong>
              </div>
              <div className="visual-card small-card bottom-card">
                <span>Budget-friendly options</span>
                <strong>Cheap eats</strong>
              </div>
              <div className="visual-card small-card side-card">
                <span>Quick meals near campus</span>
                <strong>Fast</strong>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'food-spots' && (
          <section className="page-section">
            <div className="page-heading">
              <p className="hero-label">Food Spots</p>
              <h1>Browse nearby spots</h1>
              <p>
                Search, sort, and click a spot to open its full details — hours,
                menu, reviews, and more.
              </p>
            </div>

            {loading && <p className="status-message">Loading food spots...</p>}
            {error && <p className="status-message">{error}</p>}
            {!loading && !error && (
              <>
                <FoodList
                  spots={spots}
                  selectedSpot={selectedSpot}
                  onSelectSpot={setSelectedSpot}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
                {selectedSpot && (
                  <FoodDetailModal
                    spot={selectedSpot}
                    onClose={() => setSelectedSpot(null)}
                    onUpdateSpotReviews={updateSpotReviews}
                  />
                )}
              </>
            )}
          </section>
        )}

        {currentPage === 'about' && (
          <section className="page-section about-page">
            <div className="page-heading">
              <p className="hero-label">About</p>
              <h1>About Campus Delights</h1>
              <p>
                Campus Delights is a class project for helping Hunter students
                find quick, affordable places to eat nearby.
              </p>
            </div>

            <div className="info-grid">
              <article>
                <h2>What it does</h2>
                <p>
                  The app helps students browse food spots, compare prices, see
                  ratings, and check details before deciding where to go.
                </p>
              </article>
              <article>
                <h2>Why we made it</h2>
                <p>
                  Hunter students are usually moving between classes, so the goal
                  is to make nearby food options easier to find.
                </p>
              </article>
            </div>
          </section>
        )}

        {currentPage === 'contact' && <Contact />}

        {currentPage === 'admin' && <Admin />}
      </main>
    </div>
  )
}

export default App
