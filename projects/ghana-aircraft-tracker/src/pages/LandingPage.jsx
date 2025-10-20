import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
  const navigate = useNavigate()

  const handleStartTracking = () => {
    navigate('/tracking')
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
              </svg>
            </div>
            <h1>Ghana Aircraft Tracker</h1>
          </div>
          <nav className="nav">
            <a href="#home">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>
              </svg>
              Home
            </a>
            <a href="#track" onClick={(e) => { e.preventDefault(); navigate('/tracking'); }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8h2.5l2-5 2 10 2-5h2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Track
            </a>
            <a href="#log" onClick={(e) => { e.preventDefault(); navigate('/flight-log'); }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor"/>
              </svg>
              Flight Log
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
              </svg>
              About
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
              </svg>
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Monitor Aircraft Activity Across Ghana</h2>
            <p>Real-time tracking of aircraft movements in Ghanaian airspace. Stay informed with our comprehensive aviation monitoring system.</p>
            <div className="hero-actions">
              <button 
                className="btn-primary"
                onClick={handleStartTracking}
              >
                Start Tracking
              </button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="aircraft-graphic">
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                {/* Sky background gradient */}
                <defs>
                  <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#4A90E2', stopOpacity: 0.2}} />
                    <stop offset="100%" style={{stopColor: '#006B3F', stopOpacity: 0.1}} />
                  </linearGradient>
                  <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#FFD700', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#FFA500', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                
                {/* Clouds */}
                <ellipse cx="80" cy="60" rx="30" ry="15" fill="white" opacity="0.3" className="cloud cloud-1"/>
                <ellipse cx="100" cy="55" rx="35" ry="18" fill="white" opacity="0.3" className="cloud cloud-1"/>
                <ellipse cx="120" cy="60" rx="30" ry="15" fill="white" opacity="0.3" className="cloud cloud-1"/>
                
                <ellipse cx="280" cy="100" rx="35" ry="18" fill="white" opacity="0.25" className="cloud cloud-2"/>
                <ellipse cx="310" cy="95" rx="40" ry="20" fill="white" opacity="0.25" className="cloud cloud-2"/>
                <ellipse cx="340" cy="100" rx="35" ry="18" fill="white" opacity="0.25" className="cloud cloud-2"/>
                
                <ellipse cx="150" cy="180" rx="30" ry="15" fill="white" opacity="0.2" className="cloud cloud-3"/>
                <ellipse cx="175" cy="175" rx="38" ry="19" fill="white" opacity="0.2" className="cloud cloud-3"/>
                
                {/* Main Airplane */}
                <g transform="translate(200, 150)" className="main-plane">
                  {/* Fuselage */}
                  <ellipse cx="0" cy="0" rx="60" ry="12" fill="url(#planeGradient)"/>
                  <path d="M -50 0 Q -60 0 -65 -3 Q -60 0 -65 3 Q -60 0 -50 0" fill="#FFA500"/>
                  
                  {/* Wings */}
                  <ellipse cx="-10" cy="0" rx="55" ry="3.5" fill="#FFD700" transform="rotate(-5)"/>
                  <path d="M -65 -3 L -40 -35 L -20 -35 L -30 -3 Z" fill="#006B3F" opacity="0.8"/>
                  <path d="M -65 3 L -40 35 L -20 35 L -30 3 Z" fill="#006B3F" opacity="0.8"/>
                  
                  {/* Tail */}
                  <path d="M 50 0 L 65 -15 L 60 -15 L 50 -3 Z" fill="#006B3F"/>
                  <path d="M 50 -3 L 60 -18 L 55 -18 L 48 -6 Z" fill="#FFD700"/>
                  
                  {/* Windows */}
                  <circle cx="-20" cy="-2" r="3" fill="#4A90E2" opacity="0.6"/>
                  <circle cx="-10" cy="-2" r="3" fill="#4A90E2" opacity="0.6"/>
                  <circle cx="0" cy="-2" r="3" fill="#4A90E2" opacity="0.6"/>
                  <circle cx="10" cy="-2" r="3" fill="#4A90E2" opacity="0.6"/>
                  <circle cx="20" cy="-2" r="3" fill="#4A90E2" opacity="0.6"/>
                  <circle cx="30" cy="-2" r="3" fill="#4A90E2" opacity="0.6"/>
                  
                  {/* Cockpit window */}
                  <ellipse cx="-45" cy="-2" rx="6" ry="4" fill="#4A90E2" opacity="0.7"/>
                  
                  {/* Engine details */}
                  <circle cx="-15" cy="-35" r="5" fill="#333" opacity="0.3"/>
                  <circle cx="-15" cy="35" r="5" fill="#333" opacity="0.3"/>
                </g>
                
                {/* Motion lines */}
                <line x1="100" y1="145" x2="130" y2="145" stroke="#FFD700" strokeWidth="2" opacity="0.3" className="motion-line line-1"/>
                <line x1="90" y1="150" x2="120" y2="150" stroke="#FFD700" strokeWidth="2" opacity="0.4" className="motion-line line-2"/>
                <line x1="95" y1="155" x2="125" y2="155" stroke="#FFD700" strokeWidth="2" opacity="0.3" className="motion-line line-3"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h3>Key Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8h2.5l2-5 2 10 2-5h2.5" stroke="#006B3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Real-time Tracking</h4>
              <p>Monitor aircraft positions and movements across Ghana in real-time with advanced radar technology</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#006B3F"/>
                </svg>
              </div>
              <h4>Flight Information</h4>
              <p>Access detailed flight data including altitude, speed, route, and destination information</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#006B3F"/>
                </svg>
              </div>
              <h4>Visual Map Display</h4>
              <p>View aircraft on a map of Ghana showing flight positions and airport locations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="#006B3F"/>
                </svg>
              </div>
              <h4>Analytics</h4>
              <p>Comprehensive aviation statistics, patterns, and historical flight data analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="white"/>
                </svg>
              </div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Continuous Monitoring</div>
            </div>
            <div className="stat">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="white"/>
                </svg>
              </div>
              <div className="stat-number">150+</div>
              <div className="stat-label">Daily Flights</div>
            </div>
            <div className="stat">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
                </svg>
              </div>
              <div className="stat-number">5</div>
              <div className="stat-label">Major Airports</div>
            </div>
            <div className="stat">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
                </svg>
              </div>
              <div className="stat-number">100%</div>
              <div className="stat-label">National Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h5>Ghana Aircraft Tracker</h5>
              <p>Monitoring aviation safety and efficiency across Ghana with state-of-the-art tracking technology</p>
            </div>
            <div className="footer-section">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/tracking'); }}>Map</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/tracking'); }}>Flight Data</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/tracking'); }}>Airports</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Contact</h5>
              <p>Email: tiekujason@gmail.com</p>
              <p>Phone: +233 248931252</p>
              <button 
                onClick={() => navigate('/contact')}
                style={{
                  marginTop: '1rem',
                  background: 'linear-gradient(135deg, #006B3F, #008a50)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-credits">
              <p>&copy; 2025 Ghana Aircraft Tracker. All rights reserved.</p>
              <div className="creator-info">
                <span className="created-by">Created by <strong>Jason Nana Yaw Tieku</strong></span>
                <div className="creator-socials">
                  <a href="https://www.linkedin.com/in/jason-nana-yaw-tieku-207302141/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="https://github.com/xZibit2444" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="mailto:tiekujason@gmail.com" className="social-link" title="Email">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
