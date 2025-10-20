import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TrackingPage from './pages/TrackingPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import FlightLogPage from './pages/FlightLogPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/flight-log" element={<FlightLogPage />} />
      </Routes>
    </Router>
  )
}

export default App
