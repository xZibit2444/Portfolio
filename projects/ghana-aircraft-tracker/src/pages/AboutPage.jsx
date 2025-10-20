import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <header className="about-header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
            </svg>
            <span>Ghana Flight Tracker</span>
          </div>
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
            Back
          </button>
        </div>
      </header>

      <main className="about-main">
        <div className="about-hero">
          <h1>About Ghana Flight Tracker</h1>
          <p className="hero-subtitle">Your trusted companion for real-time aviation tracking in Ghana</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
              </svg>
            </div>
            <h2>Our Mission</h2>
            <p>
              Ghana Flight Tracker is dedicated to providing accurate, real-time flight information 
              to travelers, aviation enthusiasts, and professionals across Ghana and beyond. We leverage 
              cutting-edge technology to deliver comprehensive flight data, airport information, and 
              aircraft tracking services.
            </p>
          </section>

          <section className="about-section">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
              </svg>
            </div>
            <h2>What We Offer</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3>Real-Time Flight Tracking</h3>
                <p>Track flights in real-time with live updates on status, location, and estimated arrival times.</p>
              </div>
              <div className="feature-item">
                <h3>Comprehensive Airport Data</h3>
                <p>Access detailed information about airports including location, timezone, and IATA codes.</p>
              </div>
              <div className="feature-item">
                <h3>Airline Information</h3>
                <p>Explore data on airlines operating in and out of Ghana, including fleet and route information.</p>
              </div>
              <div className="feature-item">
                <h3>Aircraft Details</h3>
                <p>View specifications and details about different aircraft types in operation.</p>
              </div>
              <div className="feature-item">
                <h3>Flight History Log</h3>
                <p>Track and review all aircraft arrivals and departures with a complete 30-day history.</p>
              </div>
              <div className="feature-item">
                <h3>User-Friendly Interface</h3>
                <p>Navigate seamlessly through our intuitive design built with modern web technologies.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor"/>
              </svg>
            </div>
            <h2>Our Technology</h2>
            <p>
              Built with React and powered by industry-leading aviation data APIs, our platform 
              combines modern web development practices with reliable data sources to ensure you 
              receive the most accurate and up-to-date flight information. Our comprehensive logging 
              system maintains a 30-day history of all aircraft movements for your review and analysis.
            </p>
          </section>

          <section className="about-section">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
              </svg>
            </div>
            <h2>Why Choose Us</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Accuracy</h3>
                <p>We prioritize data accuracy through verified aviation sources and regular updates.</p>
              </div>
              <div className="value-card">
                <h3>Reliability</h3>
                <p>Our platform is built for stability, ensuring consistent access to flight information.</p>
              </div>
              <div className="value-card">
                <h3>Simplicity</h3>
                <p>A clean, intuitive interface makes tracking flights effortless for everyone.</p>
              </div>
              <div className="value-card">
                <h3>Innovation</h3>
                <p>We continuously improve our platform with the latest web technologies and features.</p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <h2>Ready to Start Tracking?</h2>
            <p>Explore real-time flight data and discover the power of our tracking platform.</p>
            <div className="cta-buttons">
              <button className="primary-btn" onClick={() => navigate('/tracking')}>
                Start Tracking
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor"/>
                </svg>
              </button>
              <button className="secondary-btn" onClick={() => navigate('/contact')}>
                Contact Us
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="about-footer">
        <p>&copy; 2025 Ghana Flight Tracker. All rights reserved.</p>
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
      </footer>
    </div>
  );
}

export default AboutPage;
