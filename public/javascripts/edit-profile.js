document.addEventListener('DOMContentLoaded', () => {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });

    const tl = gsap.timeline();

    tl.from(".edit-card", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    })
    .from(".input-group", {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    })
    .from(".form-actions", {
        y: 20,
        opacity: 0
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-save, .btn-back, .btn-logout, .btn-edit');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,       
                duration: 0.3,
                boxShadow: "0px 10px 20px rgba(56, 189, 248, 0.4)",
                ease: "power2.out"
            });

            gsap.fromTo(btn.querySelector('::after'), 
                { left: '-60%' }, 
                { left: '150%', duration: 0.6, ease: "power2.inOut" }
            ); 
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
                duration: 0.3,
                ease: "power2.inOut"
            });
        });
    });
});

const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false, 
    multiplier: 1,
    touchMultiplier: 2
});

window.addEventListener('resize', () => {
    scroller.update();
});