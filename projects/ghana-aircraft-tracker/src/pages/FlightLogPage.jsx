import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlightLogPage.css';

function FlightLogPage() {
  const navigate = useNavigate();
  const [flightLogs, setFlightLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filterType, setFilterType] = useState('all'); // all, arrival, departure
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('7'); // days

  // Initialize flight logs from localStorage or create new
  useEffect(() => {
    const savedLogs = localStorage.getItem('flightLogs');
    if (savedLogs) {
      const logs = JSON.parse(savedLogs);
      // Filter out logs older than 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const validLogs = logs.filter(log => new Date(log.timestamp) > thirtyDaysAgo);
      setFlightLogs(validLogs);
      setFilteredLogs(validLogs);
      // Save back filtered logs
      localStorage.setItem('flightLogs', JSON.stringify(validLogs));
    }
  }, []);

  // Auto-log flights (simulated - in production this would be triggered by real API data)
  useEffect(() => {
    // This is a simulation - in real app, you'd log when actual flights are detected
    const interval = setInterval(() => {
      fetchAndLogFlights();
    }, 300000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const fetchAndLogFlights = async () => {
    try {
      const response = await fetch(
        `http://api.aviationstack.com/v1/flights?access_key=724b9a1b4ff7494a82258ad0d2082a39&limit=10`
      );
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        const newLogs = data.data.map(flight => ({
          id: `${flight.flight?.iata || 'N/A'}-${Date.now()}`,
          flightNumber: flight.flight?.iata || flight.flight?.icao || 'N/A',
          airline: flight.airline?.name || 'Unknown Airline',
          aircraft: flight.aircraft?.registration || 'N/A',
          aircraftType: flight.aircraft?.iata || 'N/A',
          departure: flight.departure?.airport || 'Unknown',
          departureIata: flight.departure?.iata || 'N/A',
          arrival: flight.arrival?.airport || 'Unknown',
          arrivalIata: flight.arrival?.iata || 'N/A',
          status: flight.flight_status || 'unknown',
          timestamp: new Date().toISOString(),
          type: flight.flight_status === 'landed' ? 'arrival' : 'departure',
          scheduledDeparture: flight.departure?.scheduled || 'N/A',
          scheduledArrival: flight.arrival?.scheduled || 'N/A',
        }));

        const existingLogs = JSON.parse(localStorage.getItem('flightLogs') || '[]');
        const updatedLogs = [...newLogs, ...existingLogs].slice(0, 1000); // Keep max 1000 logs
        localStorage.setItem('flightLogs', JSON.stringify(updatedLogs));
        setFlightLogs(updatedLogs);
        setFilteredLogs(updatedLogs);
      }
    } catch (error) {
      console.error('Error fetching flights for logging:', error);
    }
  };

  // Filter logs based on type, search, and date range
  useEffect(() => {
    let filtered = [...flightLogs];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(log => log.type === filterType);
    }

    // Filter by date range
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(dateRange));
    filtered = filtered.filter(log => new Date(log.timestamp) > daysAgo);

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(log =>
        log.flightNumber.toLowerCase().includes(query) ||
        log.airline.toLowerCase().includes(query) ||
        log.aircraft.toLowerCase().includes(query) ||
        log.departure.toLowerCase().includes(query) ||
        log.arrival.toLowerCase().includes(query)
      );
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredLogs(filtered);
  }, [filterType, searchQuery, dateRange, flightLogs]);

  const clearOldLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs older than 30 days?')) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const validLogs = flightLogs.filter(log => new Date(log.timestamp) > thirtyDaysAgo);
      setFlightLogs(validLogs);
      setFilteredLogs(validLogs);
      localStorage.setItem('flightLogs', JSON.stringify(validLogs));
    }
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flight-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'landed':
      case 'active':
        return '#4caf50';
      case 'scheduled':
        return '#2196f3';
      case 'delayed':
        return '#ff9800';
      case 'cancelled':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <div className="flight-log-page">
      <header className="log-header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
            </svg>
            <span>Flight Log</span>
          </div>
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
            Back
          </button>
        </div>
      </header>

      <main className="log-main">
        <div className="log-controls">
          <div className="control-section">
            <h2>Flight History Log</h2>
            <p className="subtitle">Complete record of all aircraft arrivals and departures (30-day retention)</p>
          </div>

          <div className="filters">
            <div className="search-box">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
              </svg>
              <input
                type="text"
                placeholder="Search flights, airlines, aircraft..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <button
                className={filterType === 'all' ? 'active' : ''}
                onClick={() => setFilterType('all')}
              >
                All Flights
              </button>
              <button
                className={filterType === 'arrival' ? 'active' : ''}
                onClick={() => setFilterType('arrival')}
              >
                Arrivals
              </button>
              <button
                className={filterType === 'departure' ? 'active' : ''}
                onClick={() => setFilterType('departure')}
              >
                Departures
              </button>
            </div>

            <select
              className="date-filter"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="1">Last 24 hours</option>
              <option value="7">Last 7 days</option>
              <option value="14">Last 14 days</option>
              <option value="30">Last 30 days</option>
            </select>

            <div className="action-buttons">
              <button className="export-btn" onClick={exportLogs}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" fill="currentColor"/>
                </svg>
                Export
              </button>
              <button className="clear-btn" onClick={clearOldLogs}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                </svg>
                Clear Old
              </button>
            </div>
          </div>
        </div>

        <div className="log-stats">
          <div className="stat-card">
            <div className="stat-value">{filteredLogs.length}</div>
            <div className="stat-label">Total Flights</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{filteredLogs.filter(l => l.type === 'arrival').length}</div>
            <div className="stat-label">Arrivals</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{filteredLogs.filter(l => l.type === 'departure').length}</div>
            <div className="stat-label">Departures</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{new Set(filteredLogs.map(l => l.airline)).size}</div>
            <div className="stat-label">Airlines</div>
          </div>
        </div>

        <div className="logs-container">
          {filteredLogs.length === 0 ? (
            <div className="no-logs">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
              </svg>
              <h3>No flight logs found</h3>
              <p>Logs will appear here as flights are tracked. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="logs-table">
              <div className="table-header">
                <div className="col-timestamp">Timestamp</div>
                <div className="col-flight">Flight</div>
                <div className="col-airline">Airline</div>
                <div className="col-route">Route</div>
                <div className="col-aircraft">Aircraft</div>
                <div className="col-type">Type</div>
                <div className="col-status">Status</div>
              </div>
              <div className="table-body">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="table-row">
                    <div className="col-timestamp">
                      <div className="timestamp-date">{formatDate(log.timestamp)}</div>
                    </div>
                    <div className="col-flight">
                      <span className="flight-number">{log.flightNumber}</span>
                    </div>
                    <div className="col-airline">{log.airline}</div>
                    <div className="col-route">
                      <div className="route">
                        <span className="airport">{log.departureIata}</span>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor"/>
                        </svg>
                        <span className="airport">{log.arrivalIata}</span>
                      </div>
                      <div className="route-details">{log.departure} → {log.arrival}</div>
                    </div>
                    <div className="col-aircraft">
                      <div className="aircraft-info">
                        <span className="registration">{log.aircraft}</span>
                        <span className="aircraft-type">{log.aircraftType}</span>
                      </div>
                    </div>
                    <div className="col-type">
                      <span className={`type-badge ${log.type}`}>
                        {log.type === 'arrival' ? '↓' : '↑'} {log.type}
                      </span>
                    </div>
                    <div className="col-status">
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(log.status) }}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default FlightLogPage;
