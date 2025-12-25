gsap.registerPlugin(ScrollTrigger);


document.addEventListener('DOMContentLoaded', () => {
    

    // 2. Stats Counter Animation
    const statsTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#section2",
            start: "top center",
        }
    });

    document.querySelectorAll(".counter").forEach(counter => {
        const target = +counter.getAttribute('data-target');
        gsap.to(counter, {
            innerText: target,
            duration: 2.5,
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: "#section2",
                start: "top 70%",
            }
        });
    });

    
});