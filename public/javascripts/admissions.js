document.addEventListener('DOMContentLoaded', () => {
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.05, 
        multiplier: 1,
        smartphone: { smooth: true },
        tablet: { smooth: true }
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

    const heroTl = gsap.timeline();
    heroTl.from(".hero-content h1", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5
    })
    .from(".hero-content p", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8");

   gsap.from(".info-card", {
    scrollTrigger: {
        trigger: ".admission-grid",
        scroller: "[data-scroll-container]",
        start: "top 100%", 
        toggleActions: "play none none none", 
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "back.out(1.7)",
    clearProps: "all" 
});

    // গ) Steps (01, 02, 03) 
    const steps = gsap.utils.toArray(".step");
    steps.forEach((step, i) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                scroller: "[data-scroll-container]",
                start: "top 85%",
            },
            x: i % 2 === 0 ? -50 : 50, 
            opacity: 0,
            duration: 1,
            ease: "expo.out"
        });
    });

    gsap.from(".section-title", {
        scrollTrigger: {
            trigger: ".section-title",
            scroller: "[data-scroll-container]",
            start: "top 90%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    ScrollTrigger.addEventListener("refresh", () => scroller.update());
    ScrollTrigger.refresh();
});