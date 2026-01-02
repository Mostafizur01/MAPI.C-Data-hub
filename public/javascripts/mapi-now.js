document.addEventListener('DOMContentLoaded', () => {
    
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.05
    });

    gsap.registerPlugin(ScrollTrigger);
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
    gsap.from("nav", { y: -50, opacity: 0, duration: 1 });
    gsap.from("h1", { y: 100, opacity: 0, stagger: 0.2, duration: 1.2, ease: "power4.out" });

    gsap.from(".stat-card", {
        scrollTrigger: {
            trigger: ".about-section", 
            scroller: "[data-scroll-container]",
            start: "top 70%", 
            toggleActions: "play none none none"
        },
        y: 60,
        opacity: 1,
        stagger: 0.3,
        duration: 1.5,
        ease: "expo.out"
    });

    ScrollTrigger.addEventListener("refresh", () => scroller.update());
    ScrollTrigger.refresh();
});