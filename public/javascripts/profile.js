document.addEventListener('DOMContentLoaded', () => {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });

    const tl = gsap.timeline();

    tl.from(".profile-card", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
    })
    .from(".profile-img-wrapper", {
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.8")
    .from(".user-name, .user-email", {
        y: 20,
        opacity: 0,
        stagger: 0.2
    }, "-=0.5")
    .from(".event-card-item", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.3");
});
document.addEventListener('DOMContentLoaded', () => {
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smoothMobile: false, 
        multiplier: 1
    });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        gsap.from(".profile-card", { y: 100, opacity: 0, duration: 1 });
    });

    mm.add("(max-width: 768px)", () => {
        gsap.from(".profile-card", { scale: 0.9, opacity: 0, duration: 0.8 });
    });
});