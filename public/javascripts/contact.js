document.addEventListener('DOMContentLoaded', () => {
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });

    const tl = gsap.timeline();

    tl.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    })
    .from(".subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.8
    }, "-=0.5");

    gsap.from(".detail-item", {
        scrollTrigger: {
            trigger: ".contact-main",
            start: "top 80%"
        },
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
    });

    const btn = document.querySelector('.btn-submit');
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.05, duration: 0.3 });
        gsap.to(btn.querySelector('i'), { x: 5, duration: 0.3 });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3 });
        gsap.to(btn.querySelector('i'), { x: 0, duration: 0.3 });
    });
});