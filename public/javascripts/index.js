document.addEventListener('DOMContentLoaded', () => {
    const navToggler = document.getElementById('nav-toggler');
    const mainNav = document.getElementById('main-nav');

    navToggler.addEventListener('click', () => {
        navToggler.classList.toggle('open');

        mainNav.classList.toggle('open');

        const isExpanded = navToggler.classList.contains('open');
        navToggler.setAttribute('aria-expanded', isExpanded);
    });

    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && mainNav.classList.contains('open')) {
                navToggler.classList.remove('open');
                mainNav.classList.remove('open');
                navToggler.setAttribute('aria-expanded', 'false');
            }
        });
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
            preloader.style.display = 'none';
            document.body.style.height = 'auto';
            if (page1) {
                page1.style.display = 'block';
                page1.style.height = '100vh';
                page1.style.marginTop = nav.offsetHeight + 'px';
                page1.style.zIndex = '2';
            }
            if (mainContent) {
                mainContent.style.position = 'absolute';
                mainContent.style.top = '0';
                mainContent.style.left = '0';
                mainContent.style.height = '0';
                mainContent.style.width = '0';
                mainContent.style.opacity = '0';
                mainContent.style.overflow = 'hidden';
                mainContent.style.zIndex = '1';
            }
            if (nav && page1) {
                nav.style.position = 'fixed';
                nav.style.top = '0';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.zIndex = '10';
            }
            window.scrollTo(0, 0);

            gsap.from("#main-nav li, .main-header a", {
                y: -100,
                scale: 0,
                opacity: 0,
                stagger: 0.06,
                duration: 1,
                ease: "power2.out"
            });
        }
    });
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
        display: "none"
    });

    tl.from('.main-header a, button, nav', {
        y: -100,
        scale: 0,
        opacity: 0,
        stagger: 0.05
    });
});