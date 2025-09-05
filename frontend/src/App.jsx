import { useState } from 'react'
import MovieWatchlist from './components/MovieWatchlist'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <MovieWatchlist/>
   </div>
  )
}

export default App
