// Main functionality for cyberpunk theme
document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded, initializing cyberpunk theme...");
    
    // Force cyberpunk theme
    document.body.classList.add('cyberpunk');
    document.body.setAttribute('data-theme', 'cyberpunk');
    
    // Legacy theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'light') {
            document.body.setAttribute('data-theme', 'cyberpunk');
            localStorage.setItem('theme', 'cyberpunk');
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Add scroll indicator
    window.addEventListener('scroll', function() {
        const scrollButton = document.querySelector('.scroll-to-top');
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Initialize cyberpunk effects
    setTimeout(initCyberpunkEffects, 100);
    
    // Cyberpunk welcome terminal text
    setTimeout(terminalAnimation, 500);
    
    // Initialize ad banners
    initAdBanners();
});

// Initialize ad banner behavior
function initAdBanners() {
    console.log("Initializing ad banners...");
    
    // Add interaction effects to ad buttons
    const adButtons = document.querySelectorAll('.ad-cta');
    adButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            adClickEffect(button);
        });
    });
    
    // Add hover effects to ad banners
    const adBanners = document.querySelectorAll('.ad-banner, .ad-square');
    adBanners.forEach(banner => {
        banner.addEventListener('mouseenter', () => {
            banner.style.boxShadow = '0 0 25px rgba(0, 246, 255, 0.3)';
            banner.style.borderColor = 'var(--secondary-color)';
        });
        
        banner.addEventListener('mouseleave', () => {
            banner.style.boxShadow = '';
            banner.style.borderColor = '';
        });
    });
    
    // Show random ads with delay
    setTimeout(() => {
        const topBanner = document.querySelector('.top-banner');
        if (topBanner) fadeInElement(topBanner);
    }, 2000);
    
    // Periodically highlight a random ad
    setInterval(highlightRandomAd, 8000);
}

// Ad click effect animation
function adClickEffect(button) {
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ad-ripple');
    button.appendChild(ripple);
    
    // Animate ripple
    ripple.style.animation = 'ripple 0.8s ease-out';
    
    // Remove ripple after animation
    setTimeout(() => {
        button.removeChild(ripple);
        
        // Show "ad clicked" message
        const parent = button.closest('.ad-content');
        const originalText = button.textContent;
        button.textContent = 'REDIRECTING...';
        button.style.backgroundColor = 'var(--accent-color)';
        button.style.borderColor = 'var(--accent-color)';
        
        // Reset after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.style.borderColor = '';
        }, 2000);
    }, 800);
}

// Fade in element
function fadeInElement(element) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let opacity = 0;
    const fadeIn = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(fadeIn);
        }
        element.style.opacity = opacity.toString();
        opacity += 0.1;
    }, 50);
}

// Highlight a random ad
function highlightRandomAd() {
    const ads = document.querySelectorAll('.ad-banner, .ad-square');
    if (ads.length === 0) return;
    
    // Random index
    const randomIndex = Math.floor(Math.random() * ads.length);
    const ad = ads[randomIndex];
    
    // Add highlight class
    ad.classList.add('ad-highlight');
    
    // Add pulsating effect to button
    const button = ad.querySelector('.ad-cta');
    if (button) {
        button.classList.add('pulsate');
    }
    
    // Remove highlight after delay
    setTimeout(() => {
        ad.classList.remove('ad-highlight');
        if (button) {
            button.classList.remove('pulsate');
        }
    }, 3000);
}

// Initialize all cyberpunk visual effects
function initCyberpunkEffects() {
    console.log("Initializing cyberpunk effects...");
    
    // Add data-text attributes for glitch effect if missing
    document.querySelectorAll('h2, h3').forEach(heading => {
        if (!heading.hasAttribute('data-text')) {
            heading.setAttribute('data-text', heading.textContent);
        }
    });
    
    // Add cyberpunk terminal typing effect to project cards
    const projectTitles = document.querySelectorAll('.project-card h3');
    projectTitles.forEach(title => {
        const originalText = title.textContent;
        title.textContent = '';
        
        setTimeout(() => {
            typeText(title, originalText, 0, 50);
        }, Math.random() * 1000);
    });
    
    // Add random glitch effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        // Add immediate glitch effect to a few random items for initial impact
        if (Math.random() > 0.7) {
            setTimeout(() => {
                applyGlitchEffect(item);
            }, Math.random() * 2000);
        }
        
        // Random glitch effect at random intervals
        setInterval(() => {
            if (Math.random() > 0.95) {
                applyGlitchEffect(item);
            }
        }, 2000 + Math.random() * 3000);
        
        // Add immediate glitch on hover
        item.addEventListener('mouseenter', () => {
            applyGlitchEffect(item);
        });
    });
    
    // Add interactive effect to language cards
    const languageCards = document.querySelectorAll('.language-card');
    languageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('card-glow');
            
            // Add data flow animation to cards
            const flow = document.createElement('div');
            flow.classList.add('data-flow');
            card.appendChild(flow);
            
            setTimeout(() => {
                if (flow && card.contains(flow)) {
                    card.removeChild(flow);
                }
            }, 1000);
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-glow');
        });
    });
}

// Terminal typing animation
function typeText(element, text, index, speed) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(() => typeText(element, text, index, speed), speed + Math.random() * 50);
    }
}

// Glitch text effect
function applyGlitchEffect(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+{}:"<>?|[]\\;\',.';
    
    // Create glitched version
    let glitchedText = '';
    for (let i = 0; i < originalText.length; i++) {
        if (Math.random() > 0.7) {
            glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
            glitchedText += originalText[i];
        }
    }
    
    // Apply glitch effect
    element.classList.add('glitching');
    element.textContent = glitchedText;
    
    // Restore original text after a short delay
    setTimeout(() => {
        element.textContent = originalText;
        element.classList.remove('glitching');
    }, 100 + Math.random() * 200);
}

// Terminal welcome animation
function terminalAnimation() {
    console.log("Starting terminal animation...");
    
    const terminal = document.createElement('div');
    terminal.classList.add('terminal-overlay');
    terminal.innerHTML = `
        <div class="terminal-content">
            <div class="terminal-line">SYSTEM INITIALIZED</div>
            <div class="terminal-line">LOADING INTERFACE...</div>
            <div class="terminal-line">ESTABLISHING CONNECTION...</div>
            <div class="terminal-line">ACCESS GRANTED</div>
            <div class="terminal-line">WELCOME TO ARTIFEX INTERFACE</div>
            <div class="terminal-line">LOADING ADS FROM SPONSORS...</div>
        </div>
    `;
    
    document.body.appendChild(terminal);
    
    const lines = terminal.querySelectorAll('.terminal-line');
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('visible');
        }, index * 500);
    });
    
    setTimeout(() => {
        terminal.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(terminal);
        }, 1000);
    }, 4000);
} 