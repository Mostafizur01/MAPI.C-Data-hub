// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    lerp: 0.05
});

// GSAP Integration with Locomotive
scroll.on('scroll', (instance) => {
    document.documentElement.setAttribute('data-direction', instance.direction);
});

// Text Reveal Animation
gsap.from(".reveal-text", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    stagger: 0.2
});

// Update Locomotive after page load
window.addEventListener("load", () => {
    scroll.update();
});