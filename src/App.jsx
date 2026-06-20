import './App.css'

function App() {
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

        <section className="placeholder-section" id="spots">
          <h2>Food spots will go here</h2>
          <p>
            This section will later show search, filters, and nearby campus food
            cards.
          </p>
        </section>

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
