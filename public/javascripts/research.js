// Initialize Locomotive Scroll
const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    lerp: 0.05
});

// GSAP + Locomotive ScrollTrigger Bridge
gsap.registerPlugin(ScrollTrigger);

scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main-container", {
    scrollTop(value) {
        return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector("#main-container").style.transform ? "transform" : "fixed"
});

window.addEventListener("load", () => {
    gsap.from(".hero-content h1", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    });

    gsap.to(".project-card", {
        scrollTrigger: {
            trigger: ".projects-grid",
            scroller: "#main-container",
            start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });
});

ScrollTrigger.addEventListener("refresh", () => scroller.update());
ScrollTrigger.refresh();