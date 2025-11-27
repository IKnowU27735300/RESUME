// ========================================
// PREMIUM PORTFOLIO - JAVASCRIPT
// Advanced Interactions & Animations
// ========================================

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initNavigation();
    initScrollProgress();
    initParticles();
    initGSAPAnimations();
    initTypingEffect();
    initCounters();
    initSkillBars();
    initMagneticButtons();
    initLucideIcons();
    initDynamicGreeting();
    initLiveClock();
    initDynamicBackgrounds();
    initFloatingElements();
    initRandomGlitchEffect();
});

// ========== LOADING SCREEN ==========
function initLoader() {
    const loader = document.querySelector('.loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2500);
}

// ========== CUSTOM CURSOR ==========
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor movement
    function animateCursor() {
        // Dot follows immediately
        cursorX += (mouseX - cursorX) * 0.9;
        cursorY += (mouseY - cursorY) * 0.9;
        
        // Outline follows with delay
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .magnetic, .project-card, .skill-card, .gallery-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ========== NAVIGATION ==========
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let lastScroll = 0;
    
    // Navbar hide/show on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
        } else {
            navbar.classList.add('scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
        
        // Active section highlighting
        updateActiveSection();
    });
    
    // Mobile menu toggle
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close mobile menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active section
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ========== SCROLL PROGRESS ==========
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ========== PARTICLE SYSTEM ==========
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    const mouse = { x: null, y: null, radius: 150 };
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Mouse interaction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = dx / distance;
                const directionY = dy / distance;
                
                this.x -= directionX * force * 3;
                this.y -= directionY * force * 3;
            }
            
            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Connect particles
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.2;
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Mouse move event
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    // Resize canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========== GSAP ANIMATIONS ==========
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    gsap.from('.hero-content > *', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 2.5
    });
    
    gsap.from('.hero-image-container', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 2.7
    });
    
    // Section animations
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section.querySelector('.section-header'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            rotation: 5,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Gallery items
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'back.out(1.7)'
        });
    });
    
    // Skill cards
    gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
    
    // About text reveal
    gsap.utils.toArray('.about-text p').forEach((p, index) => {
        gsap.from(p, {
            scrollTrigger: {
                trigger: p,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
    
    // Parallax effect for hero background
    gsap.to('.gradient-orb', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        ease: 'none'
    });
}

// ========== TYPING EFFECT ==========
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = [
        'Web Developer',
        'AI Enthusiast',
        'Problem Solver',
        'Creative Thinker'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after loader
    setTimeout(type, 3000);
}

// ========== COUNTER ANIMATION ==========
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ========== SKILL BARS ANIMATION ==========
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                const percentage = bar.querySelector('.skill-percentage');
                
                // Animate width
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
                
                // Animate percentage counter
                let current = 0;
                const target = parseInt(progress);
                const increment = target / 50;
                
                const updatePercentage = () => {
                    current += increment;
                    if (current < target) {
                        percentage.textContent = Math.ceil(current) + '%';
                        requestAnimationFrame(updatePercentage);
                    } else {
                        percentage.textContent = target + '%';
                    }
                };
                
                setTimeout(updatePercentage, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ========== MAGNETIC BUTTONS ==========
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.3;
            const moveY = y * 0.3;
            
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ========== 3D TILT EFFECT ==========
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ========== RIPPLE EFFECT ==========
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== INITIALIZE LUCIDE ICONS ==========
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for resize events
function debounce(func, wait) {
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

// Optimized resize handler
window.addEventListener('resize', debounce(() => {
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}, 250));

// ========== SMOOTH SCROLL BEHAVIOR ==========
// Enhanced smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';

// Prevent scroll during loading
document.body.style.overflow = 'hidden';

// ========== ACCESSIBILITY ==========
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuBtn = document.querySelector('.menu-btn');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Focus visible for keyboard users
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========== DYNAMIC GREETING ==========
function initDynamicGreeting() {
    const badge = document.querySelector('.hero-badge span');
    if (!badge) return;
    
    const hour = new Date().getHours();
    let greeting = 'Available for opportunities';
    
    if (hour >= 5 && hour < 12) {
        greeting = '☀️ Good Morning! Available for opportunities';
    } else if (hour >= 12 && hour < 17) {
        greeting = '🌤️ Good Afternoon! Available for opportunities';
    } else if (hour >= 17 && hour < 22) {
        greeting = '🌆 Good Evening! Available for opportunities';
    } else {
        greeting = '🌙 Burning the midnight oil! Available for opportunities';
    }
    
    badge.textContent = greeting;
}

// ========== LIVE CLOCK ==========
function initLiveClock() {
    // Add a subtle live indicator to footer
    const footer = document.querySelector('.footer-content');
    if (!footer) return;
    
    const clockDiv = document.createElement('p');
    clockDiv.className = 'live-clock';
    clockDiv.style.cssText = `
        font-size: 0.85rem;
        opacity: 0.6;
        margin-top: 0.5rem;
        font-family: 'Space Grotesk', monospace;
    `;
    footer.appendChild(clockDiv);
    
    function updateClock() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: true 
        });
        const date = now.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        clockDiv.innerHTML = `<span style="color: #00d4ff;">●</span> Live • ${date} • ${time}`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// ========== DYNAMIC BACKGROUNDS ==========
function initDynamicBackgrounds() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        // Continuous subtle movement
        setInterval(() => {
            const randomX = Math.random() * 100 - 50;
            const randomY = Math.random() * 100 - 50;
            const randomScale = 0.8 + Math.random() * 0.4;
            
            gsap.to(orb, {
                x: randomX,
                y: randomY,
                scale: randomScale,
                duration: 8 + Math.random() * 4,
                ease: 'sine.inOut'
            });
        }, (index + 1) * 8000);
    });
    
    // Subtle color shift based on time
    const hour = new Date().getHours();
    const heroSection = document.querySelector('.hero');
    
    if (hour >= 6 && hour < 12) {
        // Morning - warmer tones
        heroSection.style.setProperty('--orb-color-1', 'rgba(255, 179, 71, 0.3)');
    } else if (hour >= 18 || hour < 6) {
        // Evening/Night - cooler tones
        heroSection.style.setProperty('--orb-color-1', 'rgba(99, 102, 241, 0.3)');
    }
}

// ========== FLOATING ELEMENTS ==========
function initFloatingElements() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add continuous floating animation
        gsap.to(card, {
            y: '+=20',
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        gsap.to(card, {
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 3 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
    
    // Animate skill bubbles
    const skillBubbles = document.querySelectorAll('.skill-bubble');
    skillBubbles.forEach((bubble, index) => {
        gsap.to(bubble, {
            y: '+=15',
            x: index % 2 === 0 ? '+=10' : '-=10',
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
    });
}

// ========== RANDOM GLITCH EFFECT ==========
function initRandomGlitchEffect() {
    const logo = document.querySelector('.logo-text');
    if (!logo) return;
    
    // Occasional subtle glitch effect on logo
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
            logo.style.textShadow = `
                2px 0 #ff00de,
                -2px 0 #00d4ff
            `;
            
            setTimeout(() => {
                logo.style.textShadow = 'none';
            }, 100);
        }
    }, 5000);
}

// ========== SCROLL VELOCITY EFFECT ==========
let lastScrollY = window.pageYOffset;
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;
    scrollVelocity = Math.abs(currentScrollY - lastScrollY);
    lastScrollY = currentScrollY;
    
    // Add blur effect on fast scroll
    const sections = document.querySelectorAll('section');
    if (scrollVelocity > 20) {
        sections.forEach(section => {
            section.style.filter = 'blur(2px)';
        });
    } else {
        sections.forEach(section => {
            section.style.filter = 'blur(0)';
        });
    }
});

// ========== INTERACTIVE STATS ==========
// Add hover effect to stats that shows "real-time" updates
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach(stat => {
    stat.addEventListener('mouseenter', () => {
        const number = stat.querySelector('.stat-number');
        const currentValue = parseInt(number.textContent);
        
        // Simulate "live" increment
        gsap.to(number, {
            textContent: currentValue + 1,
            duration: 0.5,
            snap: { textContent: 1 },
            ease: 'power2.out'
        });
        
        // Revert after a moment
        setTimeout(() => {
            gsap.to(number, {
                textContent: currentValue,
                duration: 0.5,
                snap: { textContent: 1 },
                ease: 'power2.in'
            });
        }, 1500);
    });
});

// ========== DYNAMIC PAGE TITLE ==========
let originalTitle = document.title;
let titleInterval;

window.addEventListener('blur', () => {
    let toggle = false;
    titleInterval = setInterval(() => {
        document.title = toggle ? '👋 Come back!' : '✨ Missing you...';
        toggle = !toggle;
    }, 2000);
});

window.addEventListener('focus', () => {
    clearInterval(titleInterval);
    document.title = originalTitle;
});

console.log('🚀 Premium Portfolio Loaded Successfully!');
console.log('💎 100% Static • Looks 100% Dynamic');
console.log('⚡ All effects are client-side only!');