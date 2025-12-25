// GSAP Entrance Animations
gsap.registerPlugin(ScrollTrigger);

// Animate Headings
gsap.from(".anim-up", {
    scrollTrigger: {
        trigger: ".anim-up",
        scroller: "[data-scroll-container]",
        start: "top 90%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

// Image Reveal Animation (Slide In)
const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            scroller: "[data-scroll-container]",
            start: "top 95%",
        },
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: i * 0.1
    });
});
// Initializing GSAP Hover Animation
const hoverBox = document.querySelector("#dept-hover-img");
const cards = document.querySelectorAll(".dept-card");

// 1. Follow Mouse
let hoverActive = false;
window.addEventListener("mousemove", (e) => {
    if (hoverActive) {
        // Position hoverBox 5px above the cursor
        const offsetY = 5;
        gsap.to(hoverBox, {
            x: e.clientX,
            y: e.clientY - offsetY,
            duration: 0.2,
            ease: "power3.out"
        });
    }
});

// 2. Card Specific Interactions
cards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("mouseenter", () => {
        hoverActive = true;
        const logoUrl = card.getAttribute("data-logo");
        // Update background image
        hoverBox.style.backgroundImage = `url(${logoUrl})`;
        // GSAP Reveal
        gsap.to(hoverBox, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)"
        });
        // Add a slight glow/lift to the card
        gsap.to(card, {
            y: -10,
            backgroundColor: "rgba(255, 180, 0, 0.1)", // MPI Gold Tint
            duration: 0.3
        });
    });

    card.addEventListener("mouseleave", () => {
        hoverActive = false;
        // GSAP Hide
        gsap.to(hoverBox, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        });
        // Reset Card
        gsap.to(card, {
            y: 0,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            duration: 0.3
        });
    });
});