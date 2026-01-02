document.addEventListener('DOMContentLoaded', () => {
    // Locomotive Init
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.05
    });

    // GSAP ScrollTrigger Integration
    gsap.registerPlugin(ScrollTrigger);
    scroller.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        }
    });

    // Animate Indicator Line
    gsap.to(".process-indicator .line", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".admission-sticky",
            scroller: "[data-scroll-container]",
            start: "top 20%",
            end: "bottom 80%",
            scrub: true
        }
    });

    // Reveal Glass Cards on Scroll
    gsap.to(".glass-card", {
        opacity: 1,
        y: -30,
        stagger: 0.3,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".right-scroll",
            scroller: "[data-scroll-container]",
            start: "top 70%",
        }
    });
    

    ScrollTrigger.addEventListener("refresh", () => scroller.update());
    ScrollTrigger.refresh();
});