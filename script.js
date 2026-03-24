document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader & Initialization
    window.addEventListener('load', () => {
        setTimeout(() => {
            if(document.getElementById('loader')){
                gsap.to('#loader', { opacity: 0, duration: 0.8, onComplete: () => {
                    document.getElementById('loader').style.display = 'none';
                    initAnim();
                }});
            } else {
                initAnim();
            }
        }, 800);
    });

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Typing Animation & Intro
    function initAnim() {
        if(typeof gsap !== 'undefined') {
            gsap.to("#typed-name", {
                text: "Anish Tanaji Inamadar",
                duration: 2.5,
                ease: "power1.inOut",
                delay: 0.2
            });

            // Float keys animation
            gsap.to('.float-key', {
                y: -15,
                rotation: 5,
                repeat: -1,
                yoyo: true,
                duration: 2,
                stagger: 0.5,
                ease: 'sine.inOut'
            });

            // Sticky Note gentle float
            gsap.to('.sticky-note', {
                y: -8,
                rotation: "+=2",
                repeat: -1,
                yoyo: true,
                duration: 3,
                stagger: 0.4,
                ease: 'sine.inOut'
            });
        }
    }

    // 3. Magnetic Interactive Elements
    const magneticElements = document.querySelectorAll('.magnetic, .magnetic-card, button, .sticky-note, .hero-keyboard');
    magneticElements.forEach(el => {
        el.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
            }
        });
        
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            if (typeof gsap !== 'undefined') {
                gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
            }
        });
    });

    // 4. Custom Cursor & Fluid Aura
    const cursorDot = document.querySelector('.custom-cursor');
    const cursorAura = document.querySelector('.cursor-aura');

    window.addEventListener('mousemove', (e) => {
        if (typeof gsap !== 'undefined') {
            gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'none' });
            gsap.to(cursorAura, {
                x: e.clientX,
                y: e.clientY,
                duration: 1.2,
                ease: 'power3.out'
            });
        }
    });

    // Cursor hover states
    const interactiveElements = document.querySelectorAll('a, button, .magnetic, .magnetic-card, .key3d, .sticky-note, .hk-key');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorAura.style.opacity = '0.8';
            cursorAura.style.transform = 'translate(-50%, -50%) scale(1.3)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorAura.style.opacity = '0.6';
            cursorAura.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // 5. Animated Keyboard Sequence Simulation
    const hkKeys = document.querySelectorAll('.hk-key');
    if(hkKeys.length > 0) {
        setInterval(() => {
            const randomKey = hkKeys[Math.floor(Math.random() * hkKeys.length)];
            randomKey.classList.add('animate-press');
            setTimeout(() => {
                randomKey.classList.remove('animate-press');
            }, 300);
        }, 800);
    }

    // 6. Hover Preview for Projects & Certificates
    const projects = document.querySelectorAll('.project-card, .cert-card, .institute-hoverable');
    const previewOverlay = document.getElementById('project-preview-overlay');
    const previewTitle = document.getElementById('preview-title');
    const previewIconContainer = document.querySelector('.preview-visual');
    let isHoveringItem = false;

    if (previewOverlay && typeof gsap !== 'undefined') {
        projects.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                // If it's institute hoverable that has its own pure CSS logic, skip this JS orb
                if(item.classList.contains('institute-hoverable')) return;

                isHoveringItem = true;
                let title = "";
                let iconHtml = "";
                const imageSrc = item.getAttribute('data-image');
                
                if (imageSrc) {
                    iconHtml = `<img src="${imageSrc}" alt="preview"/>`;
                } else if (item.querySelector('.project-icon')) {
                    iconHtml = item.querySelector('.project-icon').innerHTML;
                } else if (item.querySelector('.cert-icon')) {
                    iconHtml = item.querySelector('.cert-icon').outerHTML;
                }
                
                if (item.classList.contains('project-card')) {
                    title = item.querySelector('.project-title')?.textContent || 'Project';
                } else if (item.querySelector('h4')) {
                    title = item.querySelector('h4').textContent;
                }
                
                const color = item.getAttribute('data-color') || '#00f0ff';
                
                if(previewTitle) previewTitle.textContent = title;
                if(previewIconContainer) previewIconContainer.innerHTML = iconHtml;
                previewOverlay.style.boxShadow = `0 0 60px ${color}40`;
                previewOverlay.style.borderColor = color;
                
                previewOverlay.classList.add('show');
            });

            item.addEventListener('mousemove', (e) => {
                if (isHoveringItem) {
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

            item.addEventListener('mouseleave', () => {
                isHoveringItem = false;
                previewOverlay.classList.remove('show');
                gsap.to(previewOverlay, { scale: 0.6, duration: 0.3 });
            });
        });
    }

    // 7. Three.js 3D Trophy rendering
    const trophyContainer = document.getElementById('trophy-canvas');
    if (trophyContainer && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, trophyContainer.clientWidth / trophyContainer.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(trophyContainer.clientWidth, trophyContainer.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        trophyContainer.appendChild(renderer.domElement);

        // Build generic trophy
        const trophyGroup = new THREE.Group();

        // Material (Gold)
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.8,
            roughness: 0.2,
        });

        // Base
        const baseGeo = new THREE.CylinderGeometry(1.2, 1.5, 0.5, 32);
        const base = new THREE.Mesh(baseGeo, goldMaterial);
        base.position.y = -1.5;
        trophyGroup.add(base);

        // Stem
        const stemGeo = new THREE.CylinderGeometry(0.3, 0.4, 1.5, 32);
        const stem = new THREE.Mesh(stemGeo, goldMaterial);
        stem.position.y = -0.5;
        trophyGroup.add(stem);

        // Cup
        const cupGeo = new THREE.CylinderGeometry(1.5, 0.3, 1.5, 32, 1, true);
        const cupMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.8,
            roughness: 0.2,
            side: THREE.DoubleSide
        });
        const cup = new THREE.Mesh(cupGeo, cupMaterial);
        cup.position.y = 1;
        trophyGroup.add(cup);

        // Handles
        const handleGeo = new THREE.TorusGeometry(0.6, 0.1, 16, 30);
        const handle1 = new THREE.Mesh(handleGeo, goldMaterial);
        handle1.position.set(1.4, 1.2, 0);
        handle1.rotation.y = Math.PI / 2;
        trophyGroup.add(handle1);

        const handle2 = new THREE.Mesh(handleGeo, goldMaterial);
        handle2.position.set(-1.4, 1.2, 0);
        handle2.rotation.y = Math.PI / 2;
        trophyGroup.add(handle2);

        // Add to scene
        scene.add(trophyGroup);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        const pointLight = new THREE.PointLight(0xffa500, 2, 50);
        pointLight.position.set(0, 2, 2);
        scene.add(pointLight);

        camera.position.z = 6;
        camera.position.y = 0;

        let targetRotationX = 0;
        let targetRotationY = 0;
        let isTrophyHovered = false;

        trophyContainer.addEventListener('mousemove', (e) => {
            const rect = trophyContainer.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            targetRotationY = x * Math.PI;
            targetRotationX = y * 0.5;
            isTrophyHovered = true;
        });

        trophyContainer.addEventListener('mouseleave', () => {
            targetRotationX = 0;
            targetRotationY = 0;
            isTrophyHovered = false;
        });

        // Animation Loop
        const animateTrophy = () => {
            requestAnimationFrame(animateTrophy);

            if(isTrophyHovered) {
                trophyGroup.rotation.y += (targetRotationY - trophyGroup.rotation.y) * 0.1;
                trophyGroup.rotation.x += (targetRotationX - trophyGroup.rotation.x) * 0.1;
            } else {
                trophyGroup.rotation.y += 0.01; // Auto rotation
                trophyGroup.rotation.x += (0 - trophyGroup.rotation.x) * 0.1;
            }
            
            renderer.render(scene, camera);
        };
        animateTrophy();

        // Handle Resize
        window.addEventListener('resize', () => {
            if(trophyContainer.clientWidth === 0) return;
            camera.aspect = trophyContainer.clientWidth / trophyContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(trophyContainer.clientWidth, trophyContainer.clientHeight);
        });
    }

    // 8. GSAP Scroll Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.card, .timeline-item').forEach((element) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    }
});