// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initCountdown();
    initHeartsAnimation();
    initPhotoGallery();
    initSurpriseSection();
    initMusicControls();
    initScrollAnimations();
    
});

// Countdown Timer Function
function initCountdown() {
    // Set your girlfriend's birthday date (month day, year)
    // Change this to the actual birthday date
    const birthdayDate = new Date('February 14, 2024 00:00:00').getTime();
    
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthdayDate - now;
        
        if (distance < 0) {
            // Birthday has arrived
            Object.values(countdownElements).forEach(element => {
                if (element) element.textContent = '00';
            });
            
            // Show special birthday message
            const countdownContainer = document.querySelector('.countdown-container');
            if (countdownContainer) {
                countdownContainer.innerHTML = `
                    <h2>🎉 Happy Birthday! 🎉</h2>
                    <p style="font-size: 1.5rem; color: #d63384; margin-top: 1rem;">
                        Today is your special day! Make it amazing! 💕
                    </p>
                `;
            }
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        if (countdownElements.days) countdownElements.days.textContent = String(days).padStart(2, '0');
        if (countdownElements.hours) countdownElements.hours.textContent = String(hours).padStart(2, '0');
        if (countdownElements.minutes) countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
        if (countdownElements.seconds) countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Hearts Animation on Page Load
function initHeartsAnimation() {
    const heartsContainer = document.getElementById('heartsContainer');
    if (!heartsContainer) return;
    
    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }
    
    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 300);
    }
    
    // Continue creating hearts periodically
    setInterval(createHeart, 3000);
}

// Photo Gallery with Messages
function initPhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        const message = item.getAttribute('data-message');
        const messageElement = item.querySelector('.photo-message');
        
        if (message && messageElement) {
            messageElement.textContent = message;
        }
        
        // Add click event for mobile devices
        item.addEventListener('click', function() {
            // Toggle message visibility on mobile
            if (window.innerWidth <= 768) {
                const msg = this.querySelector('.photo-message');
                if (msg) {
                    msg.style.transform = msg.style.transform === 'translateY(0)' ? 'translateY(100%)' : 'translateY(0)';
                }
            }
        });
    });
}

// Surprise Section Reveal
function initSurpriseSection() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseContent = document.getElementById('surpriseContent');
    
    if (!surpriseBtn || !surpriseContent) return;
    
    surpriseBtn.addEventListener('click', function() {
        // Remove hidden class and add show class
        surpriseContent.classList.remove('hidden');
        
        // Trigger reflow for animation
        void surpriseContent.offsetWidth;
        
        surpriseContent.classList.add('show');
        
        // Change button text
        this.textContent = '🎉 Surprise Revealed! 🎉';
        this.disabled = true;
        this.style.opacity = '0.7';
        
        // Create celebration effect
        createConfetti();
        
        // Scroll to surprise content
        setTimeout(() => {
            surpriseContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 300);
    });
}

// Confetti Animation for Surprise
function createConfetti() {
    const colors = ['#d63384', '#c7366f', '#ff69b4', '#ffb6c1', '#ffc0cb'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animate confetti fall
        const duration = Math.random() * 3 + 2;
        const horizontalMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { 
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: 1 
            },
            { 
                transform: `translateY(100vh) translateX(${horizontalMovement}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, duration * 1000);
    }
}

// Music Controls
function initMusicControls() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (!musicToggle || !backgroundMusic) return;
    
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            this.textContent = '🎵 Play Music';
            isPlaying = false;
        } else {
            // Try to play music (may be blocked by browser)
            backgroundMusic.play().then(() => {
                this.textContent = '⏸️ Pause Music';
                isPlaying = true;
            }).catch(error => {
                console.log('Music playback was prevented by browser:', error);
                this.textContent = '🎵 Music Blocked';
                setTimeout(() => {
                    this.textContent = '🎵 Play Music';
                }, 2000);
            });
        }
    });
    
    // Update button text when music actually plays/pauses
    backgroundMusic.addEventListener('play', function() {
        musicToggle.textContent = '⏸️ Pause Music';
        isPlaying = true;
    });
    
    backgroundMusic.addEventListener('pause', function() {
        musicToggle.textContent = '🎵 Play Music';
        isPlaying = false;
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Observe photo items
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Smooth scrolling for navigation links (if any are added later)
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add hover effect to timeline items
function initTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize additional interactions
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initTimelineInteractions();
    
    // Add some interactive sparkles on mouse move (subtle effect)
    let mouseTimer;
    document.addEventListener('mousemove', function(e) {
        clearTimeout(mouseTimer);
        
        mouseTimer = setTimeout(() => {
            createSparkle(e.clientX, e.clientY);
        }, 100);
    });
});

// Create sparkle effect on mouse movement
function createSparkle(x, y) {
    // Limit sparkles to avoid performance issues
    if (Math.random() > 0.1) return;
    
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.backgroundColor = '#d63384';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9998';
    sparkle.style.opacity = '0.8';
    
    document.body.appendChild(sparkle);
    
    // Animate sparkle
    sparkle.animate([
        { 
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: 0.8 
        },
        { 
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 0 
        }
    ], {
        duration: 600,
        easing: 'ease-out'
    });
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 600);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'S' to reveal surprise (if not already revealed)
    if (e.key === 's' || e.key === 'S') {
        const surpriseBtn = document.getElementById('surpriseBtn');
        if (surpriseBtn && !surpriseBtn.disabled) {
            surpriseBtn.click();
        }
    }
    
    // Press 'M' to toggle music
    if (e.key === 'm' || e.key === 'M') {
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) {
            musicToggle.click();
        }
    }
    
    // Press 'Space' to pause/resume music
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) {
            musicToggle.click();
        }
    }
});

// Console message for developers
console.log('%c💕 Happy Birthday Website Loaded! 💕', 'color: #d63384; font-size: 20px; font-weight: bold;');
console.log('%cMade with love for someone special!', 'color: #c7366f; font-size: 14px;');
