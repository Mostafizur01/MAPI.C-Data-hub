window.addEventListener('load', () => {
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.08
    });

    const columns = document.querySelectorAll('.overlay-column');

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

    window.addEventListener('pageshow', (e) => {
        if (e.persisted) revealPage();
    });
});