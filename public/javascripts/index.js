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
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        tablet: { smooth: true },
        smartphone: { smooth: false } 
    });

    scroller.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        
        gsap.from(".card1", {
            scrollTrigger: {
                trigger: ".page2",
                scroller: "[data-scroll-container]",
                start: "top 70%",
            },
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "expo.out"
        });

        gsap.from(".news-card", {
            scrollTrigger: {
                trigger: ".news-grid",
                scroller: "[data-scroll-container]",
                start: "top 80%",
            },
            scale: 0.8,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "back.out(1.7)"
        });
    });

    mm.add("(max-width: 768px)", () => {
        gsap.from(".card1", {
            scrollTrigger: {
                trigger: ".page2",
                start: "top 90%",
            },
            x: -50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8
        });
    });

    let lastScroll = 0;
    scroller.on('scroll', (obj) => {
        const currentScroll = obj.scroll.y;
        if (currentScroll > lastScroll && currentScroll > 100) {
            gsap.to(".main-header", { y: "-100%", duration: 0.3 });
        } else {
            gsap.to(".main-header", { y: "0%", duration: 0.3 });
        }
        lastScroll = currentScroll;
    });

    ScrollTrigger.addEventListener("refresh", () => scroller.update());
    ScrollTrigger.refresh();
});

document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.overlay-column');

    function revealPage() {
        const tl = gsap.timeline();
        gsap.set(columns, { y: "0%" });

        tl.to(columns, {
            y: "-100%",
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.inOut"
        });
    }

    revealPage();

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const destination = link.href;

            if (link.hostname === window.location.hostname &&
                !link.hash &&
                link.target !== "_blank") {

                e.preventDefault();
                const tl = gsap.timeline();


                tl.set(columns, { y: "100%" })
                    .to(columns, {
                        y: "0%",
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "expo.out",
                        onComplete: () => {
                            window.location.href = destination;
                        }
                    });
            }
        });
    });

    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            revealPage();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hasToken = document.querySelector('.loading').classList.contains('has-token');

    if (hasToken) {
        gsap.set("#main-content", { display: "block", opacity: 1 });
        return;
    }

});

document.addEventListener('DOMContentLoaded', () => {
    const hasToken = document.body.dataset.hasToken === 'true';
    const scrollContainer = document.querySelector('[data-scroll-container]');
    const mainContent = document.getElementById('main-content');
    const preloader = document.getElementById('preloader');
    const loadingCount = document.getElementById('loading-count');
    let scroller; 

    const initSmoothScroll = () => {
        scroller = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            multiplier: 1,
            lerp: 0.05,
            tablet: { smooth: true },
            smartphone: { smooth: false }
        });

        scroller.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(scrollContainer, {
            scrollTop(value) {
                return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: scrollContainer.style.transform ? "transform" : "fixed"
        });

        ScrollTrigger.addEventListener("refresh", () => scroller.update());
        ScrollTrigger.refresh();
        
        scroller.update();
    };

    if (hasToken) {
        if (preloader) preloader.style.display = 'none';
        gsap.set(".main-header a, button, nav", { opacity: 1, delay:0, y: 0, scale: 1 });
        initSmoothScroll();
    } else {
        gsap.set(scrollContainer, { overflow: 'hidden', height: '100vh' });

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(preloader, { display: 'none' });
                gsap.set(scrollContainer, { overflow: 'visible', height: 'auto' });
                
                window.scrollTo(0, 0);
                initSmoothScroll(); 
            }
        });

        let count = 0;
        const interval = setInterval(() => {
            if (count < 100) {
                count++;
                if (loadingCount) loadingCount.textContent = count;
            } else { clearInterval(interval); }
        }, 25);

        tl.to('.loading-circle', { duration: 1, scale: 0, opacity: 0, rotation: 360, delay: 0.5, ease: "power4.inOut" })
          .to('.loading-text', { duration: 0.5, opacity: 0, y: -20 }, "<")
          .to(mainContent, { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, "-=0.4")
          .to('.lodingAn', { y: "-100%", duration: 1, ease: "expo.inOut" })
          .from('.main-header a, button, nav', { 
                y: -50,
                delay: 0, 
                opacity: 0, 
                stagger: 0.05, 
                duration: 0.8, 
                ease: "back.out(1.7)" 
          });
    }

    const page1 = document.getElementById('page1');
    const video = document.getElementById('video-dark');
    const overlay = document.getElementById('video-light-overlay');

    if (page1 && video && overlay) {
        page1.addEventListener('mousemove', (e) => {
            const rect = page1.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            gsap.to(overlay, {
                opacity: 1,
                background: `radial-gradient(circle 300px at ${x}% ${y}%, transparent 0%, rgba(0, 0, 0, 0.5) 70%)`,
                duration: 0.3
            });
            
            video.style.filter = `brightness(0.6) contrast(1.1)`;
        });

        page1.addEventListener('mouseleave', () => {
            gsap.to(overlay, { opacity: 0, duration: 0.3 });
            video.style.filter = `brightness(0.4) contrast(1.1)`;
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach((item) => {
        const triggerLink = item.querySelector('a');
        const dropdown = item.querySelector('.academincs');

        if (!triggerLink || !dropdown) return;

        const setupDesktopBehavior = () => {
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
        setupDesktopBehavior();
        setupMobileBehavior();
    });

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
const items = document.querySelectorAll('.card1');

items.forEach((item) => {
    const icon = item.querySelector('i');
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            duration: 0.4,
            ease: "power2.out"
        });
        if (icon) {
            gsap.to(icon, {
                rotation: -45,
                duration: 0.4,
                ease: "power2.out"
            });
        }
        gsap.to('.bg-wrapper', { filter: "brightness(0.5)", duration: 0.4 });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            duration: 0.4,
            ease: "power2.out"
        });
        if (icon) {
            gsap.to(icon, {
                rotation: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        }
        gsap.to('.bg-wrapper', { filter: "brightness(1)", duration: 0.4 });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const bgSlides = document.querySelectorAll('.bg-slide');
    const fgSlides = document.querySelectorAll('.fg-slide');
    const totalSlides = bgSlides.length;
    let isAnimating = false;

    function moveSlide(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const nextIndex = direction === 'next'
            ? (currentIndex + 1) % totalSlides
            : (currentIndex - 1 + totalSlides) % totalSlides;

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                currentIndex = nextIndex;
            }
        });


        tl.to(bgSlides[currentIndex], { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 0);
        tl.to(bgSlides[nextIndex], { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 0);


        tl.to(fgSlides[currentIndex], {
            opacity: 0,
            x: direction === 'next' ? -60 : 60,
            rotate: direction === 'next' ? -5 : 5,
            duration: 0.8,
            ease: "power2.in"
        }, 0);

        tl.fromTo(fgSlides[nextIndex],
            { opacity: 0, x: direction === 'next' ? 60 : -60, rotate: direction === 'next' ? 5 : -5 },
            { opacity: 1, x: 0, rotate: 0, duration: 0.8, ease: "power2.out" },
            0.4
        );
    }


    document.getElementById('nextBtn').addEventListener('click', () => {
        moveSlide('next');
        resetTimer();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        moveSlide('prev');
        resetTimer();
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowRight") {
            moveSlide('next');
            resetTimer();
        } else if (e.key === "ArrowLeft") {
            moveSlide('prev');
            resetTimer();
        }
    });

    let autoPlay = setInterval(() => moveSlide('next'), 3000);

    function resetTimer() {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => moveSlide('next'), 3000);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        tablet: { smooth: true },
        smartphone: { smooth: false } 
    });

    scroller.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        gsap.from(".card1", {
            scrollTrigger: {
                trigger: ".page2",
                scroller: "[data-scroll-container]",
                start: "top 70%",
            },
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "expo.out"
        });

        gsap.from(".news-card", {
            scrollTrigger: {
                trigger: ".news-grid",
                scroller: "[data-scroll-container]",
                start: "top 80%",
            },
            scale: 0.8,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "back.out(1.7)"
        });
    });

    mm.add("(max-width: 768px)", () => {
        gsap.from(".card1", {
            scrollTrigger: {
                trigger: ".page2",
                start: "top 90%",
            },
            x: -50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8
        });
    });

    let lastScroll = 0;
    scroller.on('scroll', (obj) => {
        const currentScroll = obj.scroll.y;
        if (currentScroll > lastScroll && currentScroll > 100) {
            gsap.to(".main-header", { y: "-100%", duration: 0.3 });
        } else {
            gsap.to(".main-header", { y: "0%", duration: 0.3 });
        }
        lastScroll = currentScroll;
    });

    ScrollTrigger.addEventListener("refresh", () => scroller.update());
    ScrollTrigger.refresh();
});