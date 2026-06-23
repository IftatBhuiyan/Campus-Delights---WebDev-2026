import { useState } from 'react'
import FoodDetail from './components/FoodDetail'
import FoodList from './components/FoodList'
import { foodSpots } from './data/foodSpots'
import './App.css'

function App() {
  const [selectedSpot, setSelectedSpot] = useState(foodSpots[0])

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
        <section className="hero-section" id="home">
          <h1>Campus Delights</h1>
          <p>Find student-approved food spots near Hunter College.</p>
        </section>

        <FoodList
          spots={foodSpots}
          selectedSpot={selectedSpot}
          onSelectSpot={setSelectedSpot}
        />

        <FoodDetail spot={selectedSpot} />

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
