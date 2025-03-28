// Main functionality for cyberpunk theme
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize scroll-to-top button
    const scrollButton = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize ad banners
    initAdBanners();
});

// Ad banner functionality
function initAdBanners() {
    // Add interaction effects to ad buttons
    document.querySelectorAll('.ad-cta').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('pulsate');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('pulsate');
        });
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            adClickEffect(button);
        });
    });

    // Add hover effects to ad banners
    document.querySelectorAll('.ad-banner, .ad-square').forEach(banner => {
        banner.addEventListener('mouseenter', () => {
            banner.style.boxShadow = '0 0 30px var(--shadow-color)';
            banner.style.borderColor = 'var(--secondary-color)';
        });
        
        banner.addEventListener('mouseleave', () => {
            banner.style.boxShadow = '0 0 20px rgba(0, 246, 255, 0.15)';
            banner.style.borderColor = 'var(--border-color)';
        });
    });

    // Randomly highlight ads
    setInterval(() => {
        highlightRandomAd();
    }, 5000);
}

function adClickEffect(button) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ad-ripple';
    button.appendChild(ripple);
    
    // Trigger ripple animation
    setTimeout(() => {
        ripple.style.animation = 'ripple 0.6s ease-out';
    }, 0);
    
    // Remove ripple element after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Change button text temporarily
    const originalText = button.textContent;
    button.textContent = 'REDIRECTING...';
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

function highlightRandomAd() {
    const ads = document.querySelectorAll('.ad-banner, .ad-square');
    const randomAd = ads[Math.floor(Math.random() * ads.length)];
    
    // Remove highlight from all ads
    ads.forEach(ad => ad.classList.remove('ad-highlight'));
    
    // Add highlight to random ad
    randomAd.classList.add('ad-highlight');
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'cyberpunk' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'cyberpunk';
document.body.setAttribute('data-theme', savedTheme); 