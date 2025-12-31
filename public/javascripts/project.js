window.addEventListener('load', () => {
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });

    const columns = document.querySelectorAll('.overlay-column');
    
    gsap.to(columns, {
        y: "-100%", duration: 0.8, stagger: 0.1, ease: "expo.inOut"
    });

    if(document.querySelector('.form-container')) {
        gsap.from(".form-container", {
            y: 50, opacity: 0, duration: 1, ease: "power4.out"
        });
    }
});