document.addEventListener('DOMContentLoaded', () => {
    
    // ১. Locomotive Scroll Initialize
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        tablet: { smooth: true },
        smartphone: { smooth: false }
    });

    // ২. GSAP Page Transition
    gsap.to(".overlay-column", {
        y: "-100%",
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.inOut"
    });

    // ৩. Text Reveal Animation
    gsap.from(".reveal-text", {
        scrollTrigger: {
            trigger: ".story-details",
            scroller: "[data-scroll-container]",
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // ৪. Image Scale Animation
    gsap.from(".story-image img", {
        scrollTrigger: {
            trigger: ".story-image",
            scroller: "[data-scroll-container]",
            start: "top 90%"
        },
        scale: 1.3,
        duration: 1.5,
        ease: "power2.out"
    });

    // Locomotive update on resize
    window.addEventListener('resize', () => scroller.update());
});