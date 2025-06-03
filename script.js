// Create and animate falling stars
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.appendChild(starsContainer);

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const startPositionX = Math.random() * window.innerWidth;
        star.style.left = `${startPositionX}px`;
        
        // Random size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 3 + Math.random() * 5;
        star.style.animationDuration = `${duration}s`;
        
        // Random delay
        const delay = Math.random() * 5;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
        
        // Remove star after animation
        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    // Create initial stars
    for (let i = 0; i < 50; i++) {
        createStar();
    }

    // Continuously create new stars
    setInterval(() => {
        if (document.querySelectorAll('.star').length < 100) {
            createStar();
        }
    }, 200);
}

// Initialize stars when the page loads
window.addEventListener('load', createStars);

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true,
    offset: 50
});

// Mobile Menu Toggle with Animation
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
        navLinks.style.backdropFilter = 'blur(10px)';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navLinks.style.transform = 'translateY(0)';
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        navLinks.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            navLinks.style.display = 'none';
        }, 300);
        menuOpen = false;
    }
});

// Enhanced Mobile Menu Close
document.addEventListener('click', (e) => {
    if (menuOpen && !e.target.closest('.nav-links') && !e.target.closest('.menu-btn')) {
        menuBtn.classList.remove('open');
        navLinks.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            navLinks.style.display = 'none';
        }, 300);
        menuOpen = false;
    }
});

// Smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            if (menuOpen) {
                menuBtn.classList.remove('open');
                navLinks.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300);
                menuOpen = false;
            }
        }
    });
});

// Enhanced Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up', 'scroll-down');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
    
    // Add active class to current section in view
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const id = section.getAttribute('id');
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Initialize Lucide icons with animation
lucide.createIcons();

// Enhanced Project Cards Interaction
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
    
    // Add click interaction
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        }, 150);
    });
});

// Enhanced Skill Progress Animation
const skillProgress = document.querySelectorAll('.skill-progress');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const width = progress.style.width;
            progress.style.width = '0';
            setTimeout(() => {
                progress.style.width = width;
            }, 100);
        }
    });
}, observerOptions);

skillProgress.forEach(progress => {
    observer.observe(progress);
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Add typing effect to role text
const roleText = document.querySelector('.role');
const text = roleText.textContent;
roleText.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        roleText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when hero section is in view
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeWriter();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

heroObserver.observe(hero);