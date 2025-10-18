// Portfolio JavaScript - Enhanced Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initCounters();
    initMobileMenu();
    initBackToTop();
    initParallax();
    initTechNews();
    
    // Loading animation
    document.body.classList.add('loaded');
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Typewriter effect for hero subtitle
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const texts = [
        'Full Stack Developer',
        'Mobile App Developer', 
        'UI/UX Designer',
        'Cloud Solutions Developer',
        'Computer Engineering Graduate'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Add cursor effect
    typewriterElement.style.borderRight = '2px solid #6366f1';
    typewriterElement.style.animation = 'blink 1s infinite';
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animation if it's a stat card
                if (entry.target.classList.contains('stat-card')) {
                    const numberElement = entry.target.querySelector('.stat-number');
                    if (numberElement && !numberElement.classList.contains('counted')) {
                        animateCounter(numberElement);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .skill-category, 
        .project-card, 
        .contact-card, 
        .stat-card,
        .about-text
    `);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: #6366f1; }
        }
        
        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Counter animation for statistics
function initCounters() {
    // This will be triggered by the scroll animation observer
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    element.classList.add('counted');
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current) + (target === 100 ? '%' : '');
    }, 16);
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Parallax effect for hero section
function initParallax() {
    const profileCard = document.querySelector('.profile-card');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (profileCard && scrolled < window.innerHeight) {
            profileCard.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    
    notification.innerHTML = `
        <div style="
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            background: ${colors[type]};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            font-weight: 500;
        ">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                margin-left: 8px;
            ">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Skill items hover effect
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Loading screen
window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        ">
            <div style="text-align: center; color: white;">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 4px solid rgba(255,255,255,0.3);
                    border-top: 4px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <h3 style="font-size: 24px; margin-bottom: 8px;">Loading Portfolio</h3>
                <p style="opacity: 0.8;">Please wait...</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});

// Enhanced scroll indicator
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization - Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(function() {
    // Any scroll-dependent code can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Tech News API Integration
function initTechNews() {
    fetchTechNews();
}

async function fetchTechNews() {
    const newsGrid = document.getElementById('news-grid');
    const newsLoading = document.getElementById('news-loading');
    const newsError = document.getElementById('news-error');
    
    try {
        const response = await fetch('https://tech-news3.p.rapidapi.com/venturebeat', {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'tech-news3.p.rapidapi.com',
                'x-rapidapi-key': '06d8968fb2msh62a9f3137e3602ap185e47jsnd49db5987b16'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        // Handle different response formats
        let articles = [];
        if (Array.isArray(data)) {
            articles = data;
        } else if (data.articles && Array.isArray(data.articles)) {
            articles = data.articles;
        } else if (data.data && Array.isArray(data.data)) {
            articles = data.data;
        } else {
            console.warn('Unexpected API response format:', data);
            throw new Error('Invalid response format');
        }
        
        displayTechNews(articles.slice(0, 6)); // Show only first 6 articles
        
    } catch (error) {
        console.error('Error fetching tech news:', error);
        
        // Try fallback with mock data if API fails
        console.log('API failed, showing sample tech news...');
        const mockNews = generateMockNews();
        displayTechNews(mockNews);
    }
}

function displayTechNews(articles) {
    const newsGrid = document.getElementById('news-grid');
    const newsLoading = document.getElementById('news-loading');
    const refreshBtn = document.getElementById('refresh-news');
    
    // Hide loading and show refresh button
    newsLoading.style.display = 'none';
    newsGrid.style.display = 'grid';
    refreshBtn.style.display = 'inline-block';
    
    // Clear existing content
    newsGrid.innerHTML = '';
    
    if (articles && articles.length > 0) {
        articles.forEach(article => {
            const newsCard = createNewsCard(article);
            newsGrid.appendChild(newsCard);
        });
    } else {
        // Show message if no articles found
        newsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 40px;">No tech news articles found at the moment.</p>';
    }
}

function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card';
    
    // Handle different URL field names
    const articleUrl = article.url || article.link || article.guid || '#';
    card.onclick = () => {
        if (articleUrl !== '#') {
            window.open(articleUrl, '_blank');
        }
    };
    
    // Handle different date formats
    let date = 'Recent';
    try {
        const dateValue = article.publishedAt || article.pubDate || article.published || article.date;
        if (dateValue) {
            date = new Date(dateValue).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    } catch (e) {
        console.warn('Error parsing date:', e);
    }
    
    // Handle different image field names
    const imageUrl = article.urlToImage || article.image || article.thumbnail || article.img;
    
    // Handle different title and description fields
    const title = article.title || article.headline || 'Tech News Article';
    const description = article.description || article.summary || article.content || article.excerpt || 'Click to read more about this tech news article.';
    
    // Handle different source field names
    let sourceName = 'VentureBeat';
    if (article.source) {
        sourceName = typeof article.source === 'string' ? article.source : article.source.name || 'VentureBeat';
    } else if (article.publisher) {
        sourceName = article.publisher;
    }
    
    card.innerHTML = `
        <div class="news-image">
            ${imageUrl ? 
                `<img src="${imageUrl}" alt="${title}" onerror="this.parentElement.innerHTML='<i class=\\"fas fa-newspaper\\"></i>'">` : 
                '<i class="fas fa-newspaper"></i>'
            }
        </div>
        <div class="news-content">
            <h3 class="news-title">${title}</h3>
            <p class="news-description">${description}</p>
            <div class="news-meta">
                <span class="news-source">${sourceName}</span>
                <span class="news-date">${date}</span>
            </div>
        </div>
    `;
    
    return card;
}

function showNewsError() {
    const newsGrid = document.getElementById('news-grid');
    const newsLoading = document.getElementById('news-loading');
    const newsError = document.getElementById('news-error');
    const refreshBtn = document.getElementById('refresh-news');
    
    newsLoading.style.display = 'none';
    newsGrid.style.display = 'none';
    newsError.style.display = 'block';
    refreshBtn.style.display = 'inline-block';
}

function refreshTechNews() {
    const newsGrid = document.getElementById('news-grid');
    const newsLoading = document.getElementById('news-loading');
    const newsError = document.getElementById('news-error');
    const refreshBtn = document.getElementById('refresh-news');
    
    // Reset to loading state
    newsGrid.style.display = 'none';
    newsError.style.display = 'none';
    newsLoading.style.display = 'block';
    refreshBtn.style.display = 'none';
    
    // Fetch news again
    fetchTechNews();
}

// Generate mock tech news as fallback
function generateMockNews() {
    return [
        {
            title: "Latest Developments in Full Stack Development",
            description: "Exploring the newest trends and technologies in full stack web development, including modern frameworks and best practices.",
            url: "https://example.com",
            urlToImage: null,
            publishedAt: new Date().toISOString(),
            source: { name: "Tech Sample" }
        },
        {
            title: "Cloud Computing Innovations in 2025",
            description: "AWS and other cloud providers continue to innovate with new services and capabilities for developers.",
            url: "https://example.com",
            urlToImage: null,
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            source: { name: "Cloud News" }
        },
        {
            title: "Mobile App Development Trends",
            description: "Flutter, React Native, and native development approaches compared for modern mobile applications.",
            url: "https://example.com",
            urlToImage: null,
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            source: { name: "Mobile Dev" }
        },
        {
            title: "UI/UX Design Best Practices 2025",
            description: "New design trends and user experience principles shaping the future of digital interfaces.",
            url: "https://example.com",
            urlToImage: null,
            publishedAt: new Date(Date.now() - 259200000).toISOString(),
            source: { name: "Design Weekly" }
        },
        {
            title: "IoT and Embedded Systems Growth",
            description: "Internet of Things continues to expand with new applications in smart homes and industrial automation.",
            url: "https://example.com",
            urlToImage: null,
            publishedAt: new Date(Date.now() - 345600000).toISOString(),
            source: { name: "IoT Today" }
        },
        {
            title: "API Integration in Modern Web Apps",
            description: "Best practices for integrating third-party APIs and managing real-time data in web applications.",
            url: "https://example.com",
            urlToImage: null,
            publishedAt: new Date(Date.now() - 432000000).toISOString(),
            source: { name: "API News" }
        }
    ];
}

// Make refresh function global so it can be called from HTML
window.refreshTechNews = refreshTechNews;