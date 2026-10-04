/* =====================================================
   STUDIO MINHA TERAPIA
   SCRIPT.JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTOS
    ================================================= */

    const body = document.body;

    const loader =
        document.getElementById("pageLoader");

    const navbar =
        document.getElementById("navbar");

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-menu a[href^='#']"
        );

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav .nav-link"
        );

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    const heroImage =
        document.querySelector(".hero-image");

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .experience-card, .before-after"
        );

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorRing =
        document.querySelector(".cursor-ring");


    /* =================================================
       LOADER
    ================================================= */

    const hideLoader = () => {

        if (!loader) {
            return;
        }

        loader.classList.add("hidden");

        body.classList.remove("loading");
    };


    body.classList.add("loading");


    window.addEventListener(
        "load",
        () => {

            setTimeout(
                hideLoader,
                850
            );

        },
        {
            once: true
        }
    );


    setTimeout(
        hideLoader,
        2500
    );


    /* =================================================
       NAVBAR
    ================================================= */

    const updateNavbar = () => {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    /* =================================================
       MENU MOBILE
    ================================================= */

    const closeMenu = () => {

        if (!menuButton || !mobileMenu) {
            return;
        }

        menuButton.classList.remove("active");

        mobileMenu.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        body.classList.remove("menu-open");

    };


    const openMenu = () => {

        if (!menuButton || !mobileMenu) {
            return;
        }

        menuButton.classList.add("active");

        mobileMenu.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        body.classList.add("menu-open");

    };


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.contains(
                        "active"
                    );

                if (isOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /* =================================================
       ESC FECHA MENU
    ================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =================================================
       NAV ACTIVE
    ================================================= */

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.getAttribute(
                            "id"
                        );

                    navLinks.forEach((link) => {

                        const href =
                            link.getAttribute(
                                "href"
                            );

                        link.classList.toggle(
                            "active",
                            href === `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });


    /* =================================================
       REVEAL ANIMATION
    ================================================= */

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "active"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document
        .querySelectorAll(
            "a[href^='#']"
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =================================================
       CURSOR PERSONALIZADO
    ================================================= */

    const hasFinePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        hasFinePointer &&
        cursorDot &&
        cursorRing
    ) {

        body.classList.add(
            "cursor-active"
        );


        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        const animateCursor = () => {

            ringX +=
                (mouseX - ringX) * 0.16;

            ringY +=
                (mouseY - ringY) * 0.16;

            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;

            requestAnimationFrame(
                animateCursor
            );

        };


        animateCursor();


        interactiveElements.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            }
        );

    }


    /* =================================================
       PARALLAX DO HERO
    ================================================= */

    if (
        heroImage &&
        hasFinePointer
    ) {

        const hero =
            document.querySelector(
                ".hero"
            );


        if (hero) {

            hero.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        hero.getBoundingClientRect();

                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width -
                        0.5;

                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height -
                        0.5;

                    const moveX =
                        x * 8;

                    const moveY =
                        y * 5;

                    heroImage.style.transform =
                        `scale(1.03) translate(${moveX}px, ${moveY}px)`;

                }
            );


            hero.addEventListener(
                "mouseleave",
                () => {

                    heroImage.style.transform =
                        "scale(1.02) translate(0, 0)";

                }
            );

        }

    }


    /* =================================================
       TILT NOS CARDS
    ================================================= */

    if (hasFinePointer) {

        const cards =
            document.querySelectorAll(
                ".experience-card"
            );


        cards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const rotateY =
                        (
                            x / rect.width -
                            0.5
                        ) * 5;

                    const rotateX =
                        (
                            0.5 -
                            y / rect.height
                        ) * 5;

                    card.style.transform =
                        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =================================================
       IMAGENS
    ================================================= */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "loaded"
                    );

                },
                {
                    once: true
                }
            );

        });


    /* =================================================
       FECHAR MENU AO REDIMENSIONAR
    ================================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 1050
            ) {

                closeMenu();

            }

        }
    );


    /* =================================================
       LOG
    ================================================= */

    console.log(
        "%cStudio Minha Terapia",
        "font-size:20px;font-weight:bold;color:#c5a568;"
    );

    console.log(
        "%cSite carregado corretamente.",
        "color:#777;"
    );

});