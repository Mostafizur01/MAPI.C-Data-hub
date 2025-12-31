window.addEventListener('load', () => {
    // ১. Locomotive Scroll শুরু করা
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.07
    });

    const columns = document.querySelectorAll('.overlay-column');

    // ২. পেজ রিভিল এনিমেশন (In-Animation)
    function revealPage() {
        gsap.set(columns, { y: "0%" });
        gsap.to(columns, {
            y: "-100%",
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.inOut",
            onComplete: () => scroller.update()
        });
    }
    revealPage();

    // ৩. লিঙ্কে ক্লিক করলে আপনার কাঙ্ক্ষিত "100 -> 0 -> -100" এনিমেশন
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const destination = link.href;
            if (link.hostname === window.location.hostname && !link.hash) {
                e.preventDefault();
                const tl = gsap.timeline();

                tl.set(columns, { y: "100%" })
                  .to(columns, {
                      y: "0%",
                      duration: 0.5,
                      stagger: 0.05,
                      ease: "expo.out"
                  })
                  .to(columns, {
                      y: "-100%",
                      duration: 0.5,
                      stagger: 0.05,
                      ease: "expo.in",
                      onComplete: () => {
                          window.location.href = destination;
                      }
                  });
            }
        });
    });

    // ব্যাক বাটনের জন্য ফিক্স
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) revealPage();
    });
});