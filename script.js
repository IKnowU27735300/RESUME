document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Magnetic Interactive Elements
    const magneticElements = document.querySelectorAll('.magnetic, .magnetic-card, a, button');
    magneticElements.forEach(el => {
        el.addEventListener('mouseleave', () => {
            // Revert magnetic translation
            if (el.classList.contains('magnetic')) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
                }
            }
        });
        
        if (el.classList.contains('magnetic')) {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                if (typeof gsap !== 'undefined') {
                    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
                }
            });
        }
    });

    // 3. Mesmerizing Hover Preview for Projects & Certificates
    const projects = document.querySelectorAll('.project-card, .cert-card');
    const previewOverlay = document.getElementById('project-preview-overlay');
    const previewTitle = document.getElementById('preview-title');
    const previewIconContainer = document.querySelector('.preview-visual');
    let isHoveringProject = false;

    if (previewOverlay && typeof gsap !== 'undefined') {
        projects.forEach(project => {
            project.addEventListener('mouseenter', (e) => {
                isHoveringProject = true;
                
                let title = "";
                let iconHtml = "";
                const imageSrc = project.getAttribute('data-image');
                
                if (imageSrc) {
                    iconHtml = `<img src="${imageSrc}" style="max-width: 100%; border-radius: 8px; object-fit: contain; max-height: 120px;" alt="preview"/>`;
                } else if (project.classList.contains('project-card')) {
                    iconHtml = project.querySelector('.project-icon').innerHTML;
                } else {
                    iconHtml = project.querySelector('.cert-icon').outerHTML;
                }
                
                if (project.classList.contains('project-card')) {
                    title = project.querySelector('.project-title').textContent;
                } else {
                    title = project.querySelector('h4').textContent;
                }
                
                const color = project.getAttribute('data-color') || '#00f0ff';
                
                previewTitle.textContent = title;
                previewIconContainer.innerHTML = iconHtml;
                previewOverlay.style.boxShadow = `0 0 60px ${color}40`;
                previewOverlay.style.borderColor = color;
                
                previewOverlay.classList.add('show');

            });

            project.addEventListener('mousemove', (e) => {
                if (isHoveringProject) {
                    // Instantly follow cursor for the preview orb
                    gsap.to(previewOverlay, {
                        x: e.clientX,
                        y: e.clientY,
                        xPercent: -50,
                        yPercent: -50,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            project.addEventListener('mouseleave', () => {
                isHoveringProject = false;
                previewOverlay.classList.remove('show');
                gsap.to(previewOverlay, {
                    scale: 0.6,
                    duration: 0.3
                });
                

            });
        });
    }

    // 4. GSAP Scroll Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Fade up elements
        gsap.utils.toArray('.card, .timeline-item').forEach((element) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    }

    // 5. Neural Network Canvas Background
    const canvas = document.getElementById('canvas-network');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let mouseXHover = -1000;
        let mouseYHover = -1000;
        
        window.addEventListener('mousemove', (e) => {
            mouseXHover = e.clientX;
            mouseYHover = e.clientY;
        });
        
        window.addEventListener('mouseout', () => {
            mouseXHover = -1000;
            mouseYHover = -1000;
        });

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                
                if (mouseXHover !== -1000) {
                    const dx = mouseXHover - this.x;
                    const dy = mouseYHover - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        this.x -= dx * 0.01;
                        this.y -= dy * 0.01;
                    }
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
                ctx.fill();
            }
        }

        for (let i = 0; i < 70; i++) {
            particles.push(new Particle());
        }

        function animateNetwork() {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(188, 19, 254, ${1 - dist/120})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateNetwork);
        }
        animateNetwork();
    }
});