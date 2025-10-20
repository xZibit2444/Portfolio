import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './TrackingPage.css'

function TrackingPage() {
  const navigate = useNavigate()
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [activeFlights, setActiveFlights] = useState([])
  const [airlines, setAirlines] = useState([])
  const [aircraftTypes, setAircraftTypes] = useState([])
  const [airports, setAirports] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [selectedAirline, setSelectedAirline] = useState(null)
  const [selectedAircraft, setSelectedAircraft] = useState(null)
  const [selectedAirport, setSelectedAirport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentEndpoint, setCurrentEndpoint] = useState('flights') // 'flights', 'airlines', 'airports', or 'aircraft'

  const API_KEY = '791d9da205d0a7ba501948da6bd7ec5a'
  const BASE_URL = 'http://api.aviationstack.com/v1'
  const MAPTILER_KEY = 'CwRTU4oD8x6sW4OMNBlq'

  // Endpoint 1: Real-time Flights (with Ghana filter)
  const fetchRealTimeFlights = async () => {
    try {
      setLoading(true)
      setError(null)
      setCurrentEndpoint('flights')
      
      // Fetch flights - try multiple Ghana-related queries
      const queries = [
        `${BASE_URL}/flights?access_key=${API_KEY}&dep_iata=ACC&limit=20`, // Departing from Accra
        `${BASE_URL}/flights?access_key=${API_KEY}&arr_iata=ACC&limit=20`, // Arriving to Accra
      ]

      let allFlights = []
      
      for (const query of queries) {
        const response = await fetch(query)
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error.message || 'API Error')
        }

        if (data.data && data.data.length > 0) {
          allFlights = [...allFlights, ...data.data]
        }
      }

      // Remove duplicates based on flight IATA code
      const uniqueFlights = allFlights.filter((flight, index, self) =>
        index === self.findIndex((f) => f.flight?.iata === flight.flight?.iata)
      )

      // Transform API data
      const flights = uniqueFlights.map(flight => ({
        id: flight.flight?.iata || flight.flight?.icao || `FL-${Math.random().toString(36).substr(2, 9)}`,
        callsign: flight.flight?.icao || 'N/A',
        airline: flight.airline?.name || 'Unknown Airline',
        airlineIata: flight.airline?.iata || 'N/A',
        from: `${flight.departure?.airport || 'Unknown'} (${flight.departure?.iata || 'N/A'})`,
        to: `${flight.arrival?.airport || 'Unknown'} (${flight.arrival?.iata || 'N/A'})`,
        altitude: flight.live?.altitude ? `${flight.live.altitude.toLocaleString()} ft` : 'N/A',
        speed: flight.live?.speed_horizontal ? `${flight.live.speed_horizontal} km/h` : 'N/A',
        status: flight.flight_status ? flight.flight_status.charAt(0).toUpperCase() + flight.flight_status.slice(1) : 'Unknown',
        departure_time: flight.departure?.scheduled || 'N/A',
        arrival_time: flight.arrival?.scheduled || 'N/A',
        departure_delay: flight.departure?.delay || 0,
        arrival_delay: flight.arrival?.delay || 0,
        latitude: flight.live?.latitude || null,
        longitude: flight.live?.longitude || null,
        direction: flight.live?.direction || null,
        aircraft_registration: flight.aircraft?.registration || 'N/A',
        aircraft_iata: flight.aircraft?.iata || 'N/A',
        flight_date: flight.flight_date || 'N/A',
        departure_terminal: flight.departure?.terminal || 'N/A',
        arrival_terminal: flight.arrival?.terminal || 'N/A',
        departure_gate: flight.departure?.gate || 'N/A',
        arrival_gate: flight.arrival?.gate || 'N/A',
      }))

      setActiveFlights(flights)
      setLoading(false)
      
      console.log(`✈️ Endpoint 1: Fetched ${flights.length} flights`)
      
    } catch (err) {
      console.error('Error fetching flights:', err)
      setError(err.message)
      setLoading(false)
      
      // Fallback to sample data
      const sampleFlights = [
        { 
          id: 'GH101', 
          callsign: 'AWA101',
          airline: 'Africa World Airlines', 
          airlineIata: 'AW',
          from: 'Kotoka International Airport (ACC)', 
          to: 'Kumasi Airport (KMS)', 
          altitude: '12,000 ft', 
          speed: '450 km/h', 
          status: 'Active',
          departure_time: new Date().toISOString(),
          arrival_time: new Date(Date.now() + 3600000).toISOString(),
        },
      ]
      setActiveFlights(sampleFlights)
    }
  }

  // Endpoint 2: Airlines API
  const fetchAirlines = async () => {
    try {
      setLoading(true)
      setError(null)
      setCurrentEndpoint('airlines')
      
      // Fetch all airlines
      const response = await fetch(`${BASE_URL}/airlines?access_key=${API_KEY}&limit=100`)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error.message || 'API Error')
      }

      // Transform airline data
      const airlinesList = data.data.map(airline => ({
        id: airline.airline_id || Math.random().toString(36).substr(2, 9),
        name: airline.airline_name || 'Unknown Airline',
        iata: airline.iata_code || 'N/A',
        icao: airline.icao_code || 'N/A',
        callsign: airline.callsign || 'N/A',
        country: airline.country_name || 'Unknown',
        country_iso: airline.country_iso2 || 'N/A',
        fleet_size: airline.fleet_size || 'N/A',
        fleet_average_age: airline.fleet_average_age || 'N/A',
        date_founded: airline.date_founded || 'N/A',
        hub_code: airline.hub_code || 'N/A',
        status: airline.status || 'Unknown',
        type: airline.type || 'N/A',
      }))

      // Sort by airline name
      airlinesList.sort((a, b) => a.name.localeCompare(b.name))

      setAirlines(airlinesList)
      setLoading(false)
      
      console.log(`🛫 Endpoint 2: Fetched ${airlinesList.length} airlines`)
      
    } catch (err) {
      console.error('Error fetching airlines:', err)
      setError(err.message)
      setLoading(false)
      
      // Fallback sample data
      const sampleAirlines = [
        { id: '1', name: 'Africa World Airlines', iata: 'AW', icao: 'AFW', country: 'Ghana', fleet_size: '8', status: 'active' },
        { id: '2', name: 'Ethiopian Airlines', iata: 'ET', icao: 'ETH', country: 'Ethiopia', fleet_size: '130', status: 'active' },
        { id: '3', name: 'Kenya Airways', iata: 'KQ', icao: 'KQA', country: 'Kenya', fleet_size: '35', status: 'active' },
      ]
      setAirlines(sampleAirlines)
    }
  }

  // Endpoint 3: Airports
  const fetchAirports = async () => {
    try {
      setLoading(true)
      setError(null)
      setCurrentEndpoint('airports')
      
      const response = await fetch(`${BASE_URL}/airports?access_key=${API_KEY}&limit=100`)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error.message || 'API Error')
      }

      // Transform airport data
      const airportsList = data.data.map(airport => ({
        id: airport.iata_code || airport.airport_name || Math.random().toString(36).substr(2, 9),
        name: airport.airport_name || 'Unknown Airport',
        iata_code: airport.iata_code || 'N/A',
        icao_code: airport.icao_code || 'N/A',
        country: airport.country_name || 'Unknown',
        country_iso: airport.country_iso2 || 'N/A',
        city: airport.city_name || airport.city_iata_code || 'Unknown',
        timezone: airport.timezone || 'N/A',
        gmt_offset: airport.gmt || 'N/A',
        latitude: airport.latitude || null,
        longitude: airport.longitude || null,
        altitude: airport.altitude || 'N/A',
        geoname_id: airport.geoname_id || 'N/A',
        phone_number: airport.phone_number || 'N/A',
      }))

      // Sort by airport name
      airportsList.sort((a, b) => a.name.localeCompare(b.name))

      setAirports(airportsList)
      setLoading(false)
      
      console.log(`🛫 Endpoint 3: Fetched ${airportsList.length} airports`)
      
    } catch (err) {
      console.error('Error fetching airports:', err)
      setError(err.message)
      setLoading(false)
      
      // Fallback sample data
      const sampleAirports = [
        { id: 'ACC', name: 'Kotoka International Airport', iata_code: 'ACC', icao_code: 'DGAA', city: 'Accra', country: 'Ghana', latitude: 5.6052, longitude: -0.1669, timezone: 'Africa/Accra' },
        { id: 'KMS', name: 'Kumasi Airport', iata_code: 'KMS', icao_code: 'DGSI', city: 'Kumasi', country: 'Ghana', latitude: 6.7146, longitude: -1.5908, timezone: 'Africa/Accra' },
        { id: 'TML', name: 'Tamale Airport', iata_code: 'TML', icao_code: 'DGLE', city: 'Tamale', country: 'Ghana', latitude: 9.5572, longitude: -0.8632, timezone: 'Africa/Accra' },
      ]
      setAirports(sampleAirports)
    }
  }

  // Endpoint 4: Aircraft Types
  const fetchAircraftTypes = async () => {
    try {
      setLoading(true)
      setError(null)
      setCurrentEndpoint('aircraft')
      
      const response = await fetch(`${BASE_URL}/airplanes?access_key=${API_KEY}&limit=100`)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error.message || 'API Error')
      }

      // Transform aircraft data
      const aircraftList = data.data.map(aircraft => ({
        id: aircraft.iata_code || aircraft.aircraft_name || Math.random().toString(36).substr(2, 9),
        name: aircraft.aircraft_name || 'Unknown Aircraft',
        iata_code: aircraft.iata_code || 'N/A',
        icao_code: aircraft.icao_code || 'N/A',
        registration: aircraft.registration_number || 'N/A',
        production_line: aircraft.production_line || 'N/A',
        first_flight_date: aircraft.first_flight_date || 'N/A',
        model_code: aircraft.model_code || 'N/A',
        plane_age: aircraft.plane_age || 'N/A',
        plane_class: aircraft.plane_class || 'N/A',
        plane_owner: aircraft.plane_owner || 'N/A',
        plane_series: aircraft.plane_series || 'N/A',
        plane_status: aircraft.plane_status || 'Active',
        engine_type: aircraft.engine_type || 'N/A',
        engine_count: aircraft.engines_count || 'N/A',
      }))

      // Sort by aircraft name
      aircraftList.sort((a, b) => a.name.localeCompare(b.name))

      setAircraftTypes(aircraftList)
      setLoading(false)
      
      console.log(`✈️ Endpoint 4: Fetched ${aircraftList.length} aircraft types`)
      
    } catch (err) {
      console.error('Error fetching aircraft types:', err)
      setError(err.message)
      setLoading(false)
      
      // Fallback sample data
      const sampleAircraft = [
        { id: 'B738', name: 'Boeing 737-800', iata_code: 'B738', icao_code: 'B738', plane_class: 'Narrow Body', engine_type: 'Jet', engine_count: '2', plane_status: 'Active' },
        { id: 'A320', name: 'Airbus A320', iata_code: 'A320', icao_code: 'A320', plane_class: 'Narrow Body', engine_type: 'Jet', engine_count: '2', plane_status: 'Active' },
        { id: 'B77W', name: 'Boeing 777-300ER', iata_code: 'B77W', icao_code: 'B77W', plane_class: 'Wide Body', engine_type: 'Jet', engine_count: '2', plane_status: 'Active' },
      ]
      setAircraftTypes(sampleAircraft)
    }
  }

  // Fetch on component mount
  useEffect(() => {
    fetchRealTimeFlights()
    
    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchRealTimeFlights, 120000)
    return () => clearInterval(interval)
  }, [])

  // Initialize map
  useEffect(() => {
    if (map.current) return // Initialize map only once
    
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_KEY}`,
      center: [0, 7.9465], // Ghana coordinates (longitude, latitude)
      zoom: 6,
      pitch: 0,
      bearing: 0
    })

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

    // Add markers when map loads
    map.current.on('load', () => {
      // Add a source and layer for flight paths
      map.current.addSource('ghana-bounds', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-0.1870, 5.6037] // Accra coordinates
          }
        }
      })
    })
  }, [])

  // Update map markers when flights change
  useEffect(() => {
    if (!map.current || currentEndpoint !== 'flights') return

    // Clear existing markers
    const markers = document.querySelectorAll('.maplibregl-marker')
    markers.forEach(marker => marker.remove())

    // Add markers for each flight
    activeFlights.forEach(flight => {
      if (flight.latitude && flight.longitude) {
        const el = document.createElement('div')
        el.className = 'flight-marker'
        el.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" fill="#006B3F" opacity="0.9"/>
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="white"/>
          </svg>
        `
        
        new maplibregl.Marker({ element: el })
          .setLngLat([parseFloat(flight.longitude), parseFloat(flight.latitude)])
          .setPopup(new maplibregl.Popup().setHTML(`
            <strong>${flight.id}</strong><br/>
            ${flight.airline}<br/>
            ${flight.from} → ${flight.to}
          `))
          .addTo(map.current)
      }
    })

    // Add marker for Accra Airport (ACC)
    const accraMarker = document.createElement('div')
    accraMarker.className = 'airport-marker'
    accraMarker.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#FFD700" opacity="0.9"/>
        <text x="12" y="16" text-anchor="middle" fill="#006B3F" font-size="10" font-weight="bold">ACC</text>
      </svg>
    `
    
    new maplibregl.Marker({ element: accraMarker })
      .setLngLat([-0.1870, 5.6037])
      .setPopup(new maplibregl.Popup().setHTML('<strong>Kotoka International Airport (ACC)</strong><br/>Accra, Ghana'))
      .addTo(map.current)
  }, [activeFlights, currentEndpoint])

  return (
    <div className="tracking-page">
      {/* Header */}
      <header className="tracking-header">
        <div className="tracking-header-content">
          <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
              </svg>
            </div>
            <h1>Ghana Aircraft Tracker</h1>
          </div>
          <button className="back-btn" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
            Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="tracking-container">
        {/* Navigation Tabs */}
        <div className="endpoint-tabs">
          <button 
            className={`endpoint-tab ${currentEndpoint === 'flights' ? 'active' : ''}`}
            onClick={fetchRealTimeFlights}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
            </svg>
            Flights
          </button>
          <button 
            className={`endpoint-tab ${currentEndpoint === 'airlines' ? 'active' : ''}`}
            onClick={fetchAirlines}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
            Airlines
          </button>
          <button 
            className={`endpoint-tab ${currentEndpoint === 'airports' ? 'active' : ''}`}
            onClick={fetchAirports}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
            </svg>
            Airports
          </button>
          <button 
            className={`endpoint-tab ${currentEndpoint === 'aircraft' ? 'active' : ''}`}
            onClick={fetchAircraftTypes}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89 2.12 9.19-1.41 1.42-3.88-7.43L9.6 17l.36 2.47-1.07 1.06-1.76-3.18-3.19-1.77L5 14.5l2.5.37 3.88-3.89-7.42-3.88 1.41-1.41 9.19 2.12 3.89-3.89c.59-.58 1.53-.58 2.12 0z" fill="currentColor"/>
            </svg>
            Aircraft
          </button>
        </div>

        {/* Sidebar - Flight List, Airlines List, Airports List, or Aircraft List */}
        {currentEndpoint === 'flights' ? (
        <aside className="flight-list">
          <div className="flight-list-header">
            <h2>Active Flights</h2>
            <span className="flight-count">
              {loading ? 'Loading...' : `${activeFlights.length} flights`}
            </span>
          </div>
          
          {error && (
            <div className="error-message">
              <p>⚠️ API Error: {error}</p>
              <p style={{fontSize: '0.85rem', marginTop: '0.5rem'}}>Showing sample data</p>
            </div>
          )}
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading flight data...</p>
            </div>
          ) : (
            <div className="flights">
              {activeFlights.length > 0 ? (
                activeFlights.map((flight, index) => (
                  <div 
                    key={`${flight.id}-${index}`}
                    className={`flight-item ${selectedFlight?.id === flight.id && selectedFlight?.from === flight.from ? 'active' : ''}`}
                    onClick={() => setSelectedFlight(flight)}
                  >
                    <div className="flight-header-row">
                      <span className="flight-id">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                        </svg>
                        {flight.id}
                      </span>
                      <span className={`status-badge ${flight.status.toLowerCase().replace(' ', '-')}`}>
                        {flight.status}
                      </span>
                    </div>
                    <div className="flight-airline">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" fill="currentColor"/>
                      </svg>
                      {flight.airline}
                    </div>
                    <div className="flight-route">
                      <span className="airport-code">{flight.from}</span>
                      <svg width="20" height="16" viewBox="0 0 24 24" fill="none" style={{margin: '0 4px'}}>
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="airport-code">{flight.to}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-flights">
                  <p>No active flights found</p>
                </div>
              )}
            </div>
          )}
        </aside>
        ) : currentEndpoint === 'airlines' ? (
          /* Airlines List */
          <aside className="flight-list">
            <div className="flight-list-header">
              <h2>Airlines Database</h2>
              <span className="flight-count">
                {loading ? 'Loading...' : `${airlines.length} airlines`}
              </span>
            </div>
            
            {error && (
              <div className="error-message">
                <p>⚠️ API Error: {error}</p>
                <p style={{fontSize: '0.85rem', marginTop: '0.5rem'}}>Showing sample data</p>
              </div>
            )}
            
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading airlines data...</p>
              </div>
            ) : (
              <div className="flights">
                {airlines.length > 0 ? (
                  airlines.map((airline, index) => (
                    <div 
                      key={`${airline.id}-${index}`}
                      className={`flight-item ${selectedAirline?.id === airline.id ? 'active' : ''}`}
                      onClick={() => setSelectedAirline(airline)}
                    >
                      <div className="flight-header-row">
                        <span className="flight-id">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="3" fill="currentColor"/>
                          </svg>
                          {airline.iata}
                        </span>
                        <span className={`status-badge ${airline.status === 'active' ? 'on-time' : 'cancelled'}`}>
                          {airline.status}
                        </span>
                      </div>
                      <div className="flight-airline">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}>
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {airline.name}
                      </div>
                      <div className="flight-route">
                        <span style={{fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="#006B3F" strokeWidth="2"/>
                            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#006B3F" strokeWidth="2"/>
                          </svg>
                          {airline.country} • ICAO: {airline.icao}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-flights">
                    <p>No airlines found</p>
                  </div>
                )}
              </div>
            )}
          </aside>
        ) : currentEndpoint === 'airports' ? (
          /* Airports List */
          <aside className="flight-list">
            <div className="flight-list-header">
              <h2>Airports Database</h2>
              <span className="flight-count">
                {loading ? 'Loading...' : `${airports.length} airports`}
              </span>
            </div>
            
            {error && (
              <div className="error-message">
                <p>⚠️ API Error: {error}</p>
                <p style={{fontSize: '0.85rem', marginTop: '0.5rem'}}>Showing sample data</p>
              </div>
            )}
            
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading airports data...</p>
              </div>
            ) : (
              <div className="flights">
                {airports.length > 0 ? (
                  airports.map((airport, index) => (
                    <div 
                      key={`${airport.id}-${index}`}
                      className={`flight-item ${selectedAirport?.id === airport.id ? 'active' : ''}`}
                      onClick={() => setSelectedAirport(airport)}
                    >
                      <div className="flight-header-row">
                        <span className="flight-id">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                          </svg>
                          {airport.iata_code}
                        </span>
                        <span className="status-badge on-time">
                          Active
                        </span>
                      </div>
                      <div className="flight-airline">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}>
                          <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z" fill="currentColor"/>
                        </svg>
                        {airport.name}
                      </div>
                      <div className="flight-route">
                        <span style={{fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="#006B3F" strokeWidth="2"/>
                            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#006B3F" strokeWidth="2"/>
                          </svg>
                          {airport.city}, {airport.country}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-flights">
                    <p>No airports found</p>
                  </div>
                )}
              </div>
            )}
          </aside>
        ) : currentEndpoint === 'aircraft' ? (
          /* Aircraft Types List */
          <aside className="flight-list">
            <div className="flight-list-header">
              <h2>Aircraft Types</h2>
              <span className="flight-count">
                {loading ? 'Loading...' : `${aircraftTypes.length} aircraft`}
              </span>
            </div>
            
            {error && (
              <div className="error-message">
                <p>⚠️ API Error: {error}</p>
                <p style={{fontSize: '0.85rem', marginTop: '0.5rem'}}>Showing sample data</p>
              </div>
            )}
            
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading aircraft data...</p>
              </div>
            ) : (
              <div className="flights">
                {aircraftTypes.length > 0 ? (
                  aircraftTypes.map((aircraft, index) => (
                    <div 
                      key={`${aircraft.id}-${index}`}
                      className={`flight-item ${selectedAircraft?.id === aircraft.id ? 'active' : ''}`}
                      onClick={() => setSelectedAircraft(aircraft)}
                    >
                      <div className="flight-header-row">
                        <span className="flight-id">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89 2.12 9.19-1.41 1.42-3.88-7.43L9.6 17l.36 2.47-1.07 1.06-1.76-3.18-3.19-1.77L5 14.5l2.5.37 3.88-3.89-7.42-3.88 1.41-1.41 9.19 2.12 3.89-3.89c.59-.58 1.53-.58 2.12 0z" fill="currentColor"/>
                          </svg>
                          {aircraft.iata_code}
                        </span>
                        <span className={`status-badge ${aircraft.plane_status === 'Active' ? 'on-time' : 'cancelled'}`}>
                          {aircraft.plane_status}
                        </span>
                      </div>
                      <div className="flight-airline">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '6px'}}>
                          <rect x="3" y="8" width="18" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <path d="M6 8V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2M8 16v3M16 16v3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {aircraft.name}
                      </div>
                      <div className="flight-route">
                        <span style={{fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2v20M17 7l-5 5-5-5M17 17l-5-5-5 5" stroke="#006B3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {aircraft.plane_class} • {aircraft.engine_type}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-flights">
                    <p>No aircraft types found</p>
                  </div>
                )}
              </div>
            )}
          </aside>
        ) : null}

        {/* Main Area - Map and Details */}
        <main className="tracking-main">
          {/* Interactive Map */}
          <div className="map-container">
            <div ref={mapContainer} className="map" />
            
            <div className="map-legend">
              <div className="legend-item">
                <span className="legend-icon airport"></span>
                <span>Airports</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon aircraft"></span>
                <span>Active Flights</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon route"></span>
                <span>Flight Routes</span>
              </div>
            </div>
          </div>

          {/* Flight/Airline Details Panel */}
          {currentEndpoint === 'flights' && selectedFlight ? (
            <div className="flight-details">
              <div className="details-header">
                <h3>Flight Details - {selectedFlight.id}</h3>
                <span className="api-badge">Endpoint: Real-time Flights API</span>
              </div>
              
              <div className="details-section">
                <h4>Basic Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Flight Number (IATA)</label>
                    <value>{selectedFlight.id}</value>
                  </div>
                  <div className="detail-item">
                    <label>Callsign (ICAO)</label>
                    <value>{selectedFlight.callsign}</value>
                  </div>
                  <div className="detail-item">
                    <label>Airline</label>
                    <value>{selectedFlight.airline}</value>
                  </div>
                  <div className="detail-item">
                    <label>Airline Code</label>
                    <value>{selectedFlight.airlineIata}</value>
                  </div>
                  <div className="detail-item">
                    <label>Status</label>
                    <value>
                      <span className={`status-badge ${selectedFlight.status.toLowerCase().replace(' ', '-')}`}>
                        {selectedFlight.status}
                      </span>
                    </value>
                  </div>
                  <div className="detail-item">
                    <label>Flight Date</label>
                    <value>{selectedFlight.flight_date !== 'N/A' ? new Date(selectedFlight.flight_date).toLocaleDateString() : 'N/A'}</value>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Route Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Departure Airport</label>
                    <value>{selectedFlight.from}</value>
                  </div>
                  <div className="detail-item">
                    <label>Arrival Airport</label>
                    <value>{selectedFlight.to}</value>
                  </div>
                  <div className="detail-item">
                    <label>Departure Terminal</label>
                    <value>{selectedFlight.departure_terminal}</value>
                  </div>
                  <div className="detail-item">
                    <label>Arrival Terminal</label>
                    <value>{selectedFlight.arrival_terminal}</value>
                  </div>
                  <div className="detail-item">
                    <label>Departure Gate</label>
                    <value>{selectedFlight.departure_gate}</value>
                  </div>
                  <div className="detail-item">
                    <label>Arrival Gate</label>
                    <value>{selectedFlight.arrival_gate}</value>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Schedule & Timing</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Scheduled Departure</label>
                    <value>{selectedFlight.departure_time !== 'N/A' ? new Date(selectedFlight.departure_time).toLocaleString() : 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Scheduled Arrival</label>
                    <value>{selectedFlight.arrival_time !== 'N/A' ? new Date(selectedFlight.arrival_time).toLocaleString() : 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Departure Delay</label>
                    <value className={selectedFlight.departure_delay > 0 ? 'text-warning' : ''}>
                      {selectedFlight.departure_delay > 0 ? `${selectedFlight.departure_delay} min` : 'On Time'}
                    </value>
                  </div>
                  <div className="detail-item">
                    <label>Arrival Delay</label>
                    <value className={selectedFlight.arrival_delay > 0 ? 'text-warning' : ''}>
                      {selectedFlight.arrival_delay > 0 ? `${selectedFlight.arrival_delay} min` : 'On Time'}
                    </value>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Live Flight Data</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Altitude</label>
                    <value>{selectedFlight.altitude}</value>
                  </div>
                  <div className="detail-item">
                    <label>Speed</label>
                    <value>{selectedFlight.speed}</value>
                  </div>
                  {selectedFlight.direction && (
                    <div className="detail-item">
                      <label>Direction</label>
                      <value>{selectedFlight.direction}°</value>
                    </div>
                  )}
                  {selectedFlight.latitude && (
                    <div className="detail-item">
                      <label>Latitude</label>
                      <value>{selectedFlight.latitude}°</value>
                    </div>
                  )}
                  {selectedFlight.longitude && (
                    <div className="detail-item">
                      <label>Longitude</label>
                      <value>{selectedFlight.longitude}°</value>
                    </div>
                  )}
                </div>
              </div>

              <div className="details-section">
                <h4>Aircraft Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Registration</label>
                    <value>{selectedFlight.aircraft_registration}</value>
                  </div>
                  <div className="detail-item">
                    <label>Aircraft Code</label>
                    <value>{selectedFlight.aircraft_iata}</value>
                  </div>
                </div>
              </div>
            </div>
          ) : currentEndpoint === 'airlines' && selectedAirline ? (
            <div className="flight-details">
              <div className="details-header">
                <h3>Airline Details - {selectedAirline.name}</h3>
                <span className="api-badge">Endpoint: Airlines API</span>
              </div>
              
              <div className="details-section">
                <h4>Basic Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Airline Name</label>
                    <value>{selectedAirline.name}</value>
                  </div>
                  <div className="detail-item">
                    <label>IATA Code</label>
                    <value>{selectedAirline.iata || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>ICAO Code</label>
                    <value>{selectedAirline.icao || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Callsign</label>
                    <value>{selectedAirline.callsign || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Airline ID</label>
                    <value>{selectedAirline.id}</value>
                  </div>
                  <div className="detail-item">
                    <label>Status</label>
                    <value>
                      <span className={`status-badge ${selectedAirline.status === 'active' ? 'on-time' : 'cancelled'}`}>
                        {selectedAirline.status}
                      </span>
                    </value>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Operational Details</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Country</label>
                    <value>{selectedAirline.country || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Date Founded</label>
                    <value>{selectedAirline.date_founded || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Hub Airport Code</label>
                    <value>{selectedAirline.hub_code || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Type</label>
                    <value>{selectedAirline.type || 'N/A'}</value>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Fleet Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Fleet Size</label>
                    <value>{selectedAirline.fleet_size || 'N/A'} aircraft</value>
                  </div>
                  <div className="detail-item">
                    <label>Average Fleet Age</label>
                    <value>{selectedAirline.fleet_average_age ? `${selectedAirline.fleet_average_age} years` : 'N/A'}</value>
                  </div>
                </div>
              </div>
            </div>
          ) : currentEndpoint === 'aircraft' && selectedAircraft ? (
            <div className="flight-details">
              <div className="details-header">
                <h3>Aircraft Details - {selectedAircraft.name}</h3>
                <span className="api-badge">Endpoint: Aircraft Types API</span>
              </div>
              
              <div className="details-section">
                <h4>Basic Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Aircraft Name</label>
                    <value>{selectedAircraft.name}</value>
                  </div>
                  <div className="detail-item">
                    <label>IATA Code</label>
                    <value>{selectedAircraft.iata_code || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>ICAO Code</label>
                    <value>{selectedAircraft.icao_code || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Model Code</label>
                    <value>{selectedAircraft.model_code || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Registration</label>
                    <value>{selectedAircraft.registration || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Status</label>
                    <value>
                      <span className={`status-badge ${selectedAircraft.plane_status === 'Active' ? 'on-time' : 'cancelled'}`}>
                        {selectedAircraft.plane_status}
                      </span>
                    </value>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Aircraft Specifications</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Aircraft Class</label>
                    <value>{selectedAircraft.plane_class || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Series</label>
                    <value>{selectedAircraft.plane_series || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Production Line</label>
                    <value>{selectedAircraft.production_line || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Aircraft Age</label>
                    <value>{selectedAircraft.plane_age !== 'N/A' ? `${selectedAircraft.plane_age} years` : 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>First Flight Date</label>
                    <value>{selectedAircraft.first_flight_date || 'N/A'}</value>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Engine Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Engine Type</label>
                    <value>{selectedAircraft.engine_type || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Number of Engines</label>
                    <value>{selectedAircraft.engine_count || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Owner</label>
                    <value>{selectedAircraft.plane_owner || 'N/A'}</value>
                  </div>
                </div>
              </div>
            </div>
          ) : currentEndpoint === 'airports' && selectedAirport ? (
            <div className="flight-details">
              <div className="details-header">
                <h3>Airport Details - {selectedAirport.name}</h3>
                <span className="api-badge">Endpoint: Airports API</span>
              </div>
              
              <div className="details-section">
                <h4>Basic Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Airport Name</label>
                    <value>{selectedAirport.name}</value>
                  </div>
                  <div className="detail-item">
                    <label>IATA Code</label>
                    <value>{selectedAirport.iata_code || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>ICAO Code</label>
                    <value>{selectedAirport.icao_code || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Geoname ID</label>
                    <value>{selectedAirport.geoname_id || 'N/A'}</value>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Location Details</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>City</label>
                    <value>{selectedAirport.city || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Country</label>
                    <value>{selectedAirport.country || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Country ISO Code</label>
                    <value>{selectedAirport.country_iso || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Timezone</label>
                    <value>{selectedAirport.timezone || 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>GMT Offset</label>
                    <value>{selectedAirport.gmt_offset || 'N/A'}</value>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Geographic Coordinates</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Latitude</label>
                    <value>{selectedAirport.latitude ? `${selectedAirport.latitude}°` : 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Longitude</label>
                    <value>{selectedAirport.longitude ? `${selectedAirport.longitude}°` : 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Altitude</label>
                    <value>{selectedAirport.altitude !== 'N/A' ? `${selectedAirport.altitude} ft` : 'N/A'}</value>
                  </div>
                  <div className="detail-item">
                    <label>Phone Number</label>
                    <value>{selectedAirport.phone_number || 'N/A'}</value>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#ccc"/>
              </svg>
              <p>Select {currentEndpoint === 'flights' ? 'a flight' : currentEndpoint === 'airlines' ? 'an airline' : currentEndpoint === 'airports' ? 'an airport' : 'an aircraft'} from the list to view detailed information</p>
              <p style={{fontSize: '0.9rem', color: '#999', marginTop: '0.5rem'}}>
                Data from AviationStack {currentEndpoint === 'flights' ? 'Real-time Flights' : currentEndpoint === 'airlines' ? 'Airlines' : currentEndpoint === 'airports' ? 'Airports' : 'Aircraft Types'} API
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default TrackingPage
