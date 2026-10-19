const revealTargets = [
    ...document.querySelectorAll(
        ".works_title, .work_card, .about_content, .about_decor, " +
        ".team_title, .team_card, .join_content, .join_badge, " +
        ".contact_title, .contact_text, .contact_link"
    )
];

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (revealTargets.length && !reduceMotion && "IntersectionObserver" in window) {
    try {
        revealTargets.forEach((element) => {
            element.classList.add("reveal-item");
        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.02,
                rootMargin: "0px 0px 80px 0px"
            }
        );

        revealTargets.forEach((element, index) => {
            const isCard = element.matches(".work_card, .team_card, .contact_link");
            if (isCard) {
                element.style.transitionDelay = `${(index % 4) * 55}ms`;
            }
            revealObserver.observe(element);
        });

        document.documentElement.classList.add("js-reveal-enabled");
    } catch (error) {
        revealTargets.forEach((element) => {
            element.classList.remove("reveal-item");
            element.style.transitionDelay = "";
        });
        console.error("Scroll reveal could not be initialized.", error);
    }
}
