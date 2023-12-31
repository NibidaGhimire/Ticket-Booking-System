import Home from '../components/Home'
import Concerts from '../components/Concerts'
import Movies from '../components/Movies'
import Theaterevents from '../components/Theaterevents'
import Eventdetails from '../components/Eventdetails'
import Checkout from '../components/Checkout'
import { Route, Routes } from 'react-router-dom'

// Routing to different pages
const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/theaterevents" element={<Theaterevents />} />
        <Route path="/:id" element={<Eventdetails />} />
        <Route path="/:id/:c" element={<Checkout />} />
      </Routes>
    </div>
  )
}

export default Router
