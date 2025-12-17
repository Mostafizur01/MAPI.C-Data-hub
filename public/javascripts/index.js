document.addEventListener('DOMContentLoaded', () => {
    const navToggler = document.getElementById('nav-toggler');
    const mainNav = document.getElementById('main-nav');

    navToggler.addEventListener('click', () => {
        navToggler.classList.toggle('open');
        mainNav.classList.toggle('open');
        const isExpanded = navToggler.classList.contains('open');
        navToggler.setAttribute('aria-expanded', isExpanded);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const loadingCircle = document.querySelector('.loading-circle');
    const loadingText = document.querySelector('.loading-text');
    const mainContent = document.getElementById('main-content');
    const nav = document.getElementById('main-nav');
    const page1 = document.getElementById('page1');
    const loadingCount = document.getElementById('loading-count');

    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set(preloader, { display: 'none' });
            gsap.set(document.body, { height: 'auto' });

            if (page1) {
                gsap.set(page1, {
                    display: 'block',
                    height: '100vh',
                    marginTop: '0',
                    zIndex: 2
                });
            }

            if (mainContent) {
                gsap.set(mainContent, {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    height: '0',
                    width: '0',
                    opacity: '0',
                    overflow: 'hidden',
                    zIndex: 1
                });
            }

            if (nav && page1) {
                gsap.set(nav, { position: 'relative' });
            }

            window.scrollTo(0, 0);

            gsap.from("#main-nav li, .main-header a", {
                y: -100,
                scale: 0,
                opacity: 0,
                stagger: 0.06,
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                    initLocomotiveScroll();
                }
            });
        }
    });

    let scroll;
    const initLocomotiveScroll = () => {
        setTimeout(() => {
            scroll = new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]'),
                smooth: true,
                smoothMobile: false,
                multiplier: 1,
                class: 'is-revealed'
            });

            window.addEventListener('resize', () => {
                if (scroll) {
                    scroll.update();
                }
            });
        }, 200);
    };

    let count = 0;
    const interval = setInterval(() => {
        if (count < 100) {
            count++;
            loadingCount.textContent = count;
        } else {
            clearInterval(interval);
        }
    }, 30);

    tl.to(loadingCircle, {
        duration: 1.0,
        scale: 0,
        opacity: 0,
        ease: "power2.inOut",
        rotation: 360,
        delay: 0.5
    });

    tl.to(loadingText, {
        duration: 0.5,
        opacity: 0,
        y: -20,
    }, "<");

    tl.to(mainContent, {
        duration: 0.9,
        opacity: 1,
        y: 0,
        ease: "power2.out"
    }, "-=0.6");

    tl.to('.lodingAn', {
        y: "-100%",
        display: "none",
        ease: "power2.inOut"
    });

    tl.from('.main-header a, button, nav', {
        y: -100,
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const page1 = document.getElementById('page1');
    const video = document.getElementById('video-dark');
    const overlay = document.getElementById('video-light-overlay');

    if (page1 && video && overlay) {
        let isHovering = false;
        const mousePos = { x: 50, y: 50 };
        const videoBrightness = { value: 0.4 };

        gsap.set(overlay, {
            opacity: 0,
            background: 'radial-gradient(circle 200px at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.6) 100%)'
        });

        page1.addEventListener('mouseenter', () => {
            isHovering = true;
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(videoBrightness, {
                value: 0.5,
                duration: 0.3,
                ease: "power2.out",
                onUpdate: function() {
                    video.style.filter = `brightness(${videoBrightness.value}) contrast(1.08)`;
                }
            });
        });

        page1.addEventListener('mouseleave', () => {
            isHovering = false;
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(videoBrightness, {
                value: 0.4,
                duration: 0.3,
                ease: "power2.out",
                onUpdate: function() {
                    video.style.filter = `brightness(${videoBrightness.value}) contrast(1.1)`;
                }
            });
        });

        page1.addEventListener('mousemove', (e) => {
            if (!isHovering) return;

            const rect = page1.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;

            gsap.to(mousePos, {
                x: percentX,
                y: percentY,
                duration: 0.3,
                ease: "power2.out",
                onUpdate: function() {
                    const gradientSize = 300;
                    overlay.style.background = `radial-gradient(circle ${gradientSize}px at ${mousePos.x}% ${mousePos.y}%, transparent 0%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.7) 100%)`;
                }
            });

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
            const brightnessFactor = 1 - (distance / maxDistance) * 0.4;
            const newBrightness = 0.4 + (brightnessFactor * 0.4);

            gsap.to(videoBrightness, {
                value: newBrightness,
                duration: 0.2,
                ease: "power2.out",
                onUpdate: function() {
                    video.style.filter = `brightness(${videoBrightness.value}) contrast(1.1)`;
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach((item) => {
        const triggerLink = item.querySelector('a');
        const dropdown = item.querySelector('.academincs');

        if (!triggerLink || !dropdown) return;

        // Desktop: hover behavior
        const setupDesktopBehavior = () => {
            // set initial hidden state for desktop
            gsap.set(dropdown, {
                opacity: 0,
                y: -20,
                display: 'none'
            });

            item.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    dropdown.style.display = 'block';
                    gsap.to(dropdown, {
                        opacity: 1,
                        y: 0,
                        duration: 0.25,
                        ease: 'power2.out'
                    });

                    const links = dropdown.querySelectorAll('li a');
                    gsap.from(links, {
                        opacity: 0,
                        x: -15,
                        stagger: 0.04,
                        duration: 0.25,
                        ease: 'power2.out',
                        delay: 0.05
                    });
                }
            });

            item.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    gsap.to(dropdown, {
                        opacity: 0,
                        y: -10,
                        duration: 0.2,
                        ease: 'power2.in',
                        onComplete: () => {
                            dropdown.style.display = 'none';
                        }
                    });
                }
            });

            triggerLink.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    gsap.to(triggerLink, {
                        scale: 1.05,
                        duration: 0.15,
                        ease: 'power2.out'
                    });
                }
            });

            triggerLink.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    gsap.to(triggerLink, {
                        scale: 1,
                        duration: 0.15,
                        ease: 'power2.out'
                    });
                }
            });
        };

        
        const setupMobileBehavior = () => {
            triggerLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isActive = item.classList.contains('active');
                    
                
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherDropdown = otherItem.querySelector('.academincs');
                            if (otherDropdown) {
                                otherDropdown.style.display = 'none';
                            }
                        }
                    });

                    // Toggle current dropdown
                    if (isActive) {
                        item.classList.remove('active');
                        dropdown.style.display = 'none';
                    } else {
                        item.classList.add('active');
                        dropdown.style.display = 'block';
                    }
                }
            });
        };

        // Setup both behaviors
        setupDesktopBehavior();
        setupMobileBehavior();
    });

    // Handle window resize - reset dropdowns when switching between mobile/desktop
    window.addEventListener('resize', () => {
        dropdownItems.forEach(item => {
            if (window.innerWidth > 768) {
                item.classList.remove('active');
                const dropdown = item.querySelector('.academincs');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            }
        });
    });
});