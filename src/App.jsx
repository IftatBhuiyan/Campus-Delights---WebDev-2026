import { useState, useEffect } from 'react'
import FoodDetail from './components/FoodDetail'
import FoodList from './components/FoodList'
import './App.css'

function App() {
  const [spots, setSpots] = useState([]) // Initialize as empty array
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    fetch('http://localhost:5000/api/foodspots')
      .then((res) => res.json())
      .then((data) => {
        setSpots(data)
        if (data.length > 0) setSelectedSpot(data[0])
      })
      .catch((err) => console.error('Error fetching data:', err))
  }, [])

  const sortedSpots = [...spots].sort((a, b) => {
    if (sortBy === 'rating-desc') {
      return b.rating - a.rating
    }
    if (sortBy === 'price-asc') {
      return a.priceRange.length - b.priceRange.length
    }
    if (sortBy === 'price-desc') {
      return b.priceRange.length - a.priceRange.length
    }
    return 0
  })

  return (
    <div className="app">
      <header className="site-header">
        <a className="logo" href="#home">Campus Delights</a>
        <nav>
          <a href="#home">Home</a>
          <a href="#spots">Food Spots</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <div className="hero-image">
          <section className="hero-section" id="home">
            <h1>Campus Delights</h1>
            <p>Find student-approved food spots near Hunter College!</p>
          </section>
        </div>

        {spots.length > 0 ? (
          <>
            <FoodList
              spots={sortedSpots}
              selectedSpot={selectedSpot}
              onSelectSpot={setSelectedSpot}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <FoodDetail spot={selectedSpot} />
          </>
        ) : (
          <p>Loading food spots...</p>
        )}

        <section className="placeholder-section" id="about">
          <h2>About</h2>
          <p>
            Campus Delights is a class project for helping Hunter students find
            quick, affordable places to eat nearby.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App