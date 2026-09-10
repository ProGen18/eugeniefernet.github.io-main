// Image Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close");

    const closeModal = () => {
        if (modal) {
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
        }
    };

    if (modal && modalImg && closeBtn) {
        document.querySelectorAll(".project-gallery img, .mini-project-images img").forEach(img => {
            img.addEventListener("click", function () {
                modal.style.display = "flex";
                modalImg.src = this.src;
                modalImg.alt = this.alt || "Vue agrandie";
                document.body.classList.add('modal-open');
            });
        });

        closeBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && modal.style.display === "flex") {
                closeModal();
            }
        });
    }

    // Apparition en fondu de la liste de projets (page d'accueil)
    const projectList = document.querySelector('.project-list');

    const revealProjects = () => {
        if (projectList) {
            projectList.classList.add('is-visible');
        }
    };

    if (projectList) {
        const listObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealProjects();
                }
            });
        }, { threshold: 0.05 });

        listObserver.observe(projectList);
    }

    // Scroll Reveal Animation
    const gridItems = document.querySelectorAll('.project-row');

    if (gridItems.length > 0) {
        // Add scroll-reveal class to all grid items
        gridItems.forEach(item => {
            item.classList.add('scroll-reveal');
        });

        // Create observer for scroll reveal
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        gridItems.forEach(item => revealObserver.observe(item));
    }

    // Touch-hover simulation for mobile
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

    if (isTouchDevice || isSmallScreen) {
        if (gridItems.length > 0) {
            let currentHovered = null;
            const itemVisibility = new Map();

            const hoverObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    itemVisibility.set(entry.target, entry.intersectionRatio);
                });

                let maxRatio = 0;
                let mostVisible = null;

                itemVisibility.forEach((ratio, item) => {
                    const rect = item.getBoundingClientRect();
                    const viewportCenter = window.innerHeight / 2;
                    const itemCenter = rect.top + rect.height / 2;
                    const distanceFromCenter = Math.abs(viewportCenter - itemCenter);
                    const score = ratio * (1 - distanceFromCenter / window.innerHeight);

                    if (score > maxRatio && ratio > 0.3) {
                        maxRatio = score;
                        mostVisible = item;
                    }
                });

                if (mostVisible !== currentHovered) {
                    if (currentHovered) {
                        currentHovered.classList.remove('touch-hover');
                    }
                    if (mostVisible) {
                        mostVisible.classList.add('touch-hover');
                    }
                    currentHovered = mostVisible;
                }
            }, {
                threshold: [0, 0.25, 0.5, 0.75, 1],
                rootMargin: '-10% 0px -10% 0px'
            });

            gridItems.forEach(item => hoverObserver.observe(item));
        }
    }

    // Menu plein écran (bouton "Menu" / "Fermer")
    const menuToggle = document.getElementById('menuToggle');
    const siteMenu = document.getElementById('siteMenu');

    if (menuToggle && siteMenu) {
        const closeMenu = () => {
            siteMenu.classList.remove('is-open');
            menuToggle.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        };

        const toggleMenu = () => {
            const isOpen = siteMenu.classList.toggle('is-open');
            menuToggle.classList.toggle('is-open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('menu-open', isOpen);
        };

        menuToggle.addEventListener('click', toggleMenu);

        siteMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });
    }

    // Logo fade-in on every page
    const logo = document.querySelector('.logo-icon img');

    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-10px)';
        logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';

            // Une fois l'animation terminée, on retire les styles inline
            // pour que le :hover en CSS reprenne la main.
            setTimeout(() => {
                logo.style.transform = '';
                logo.style.transition = '';
                logo.style.opacity = '';
            }, 500);
        }, 100);
    }

    // Hero entrance (homepage only): headline settles in gently — a single
    // orchestrated reveal rather than scattered effects.
    const heroText = document.querySelector('.hero-text');

    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(16px)';
        heroText.style.transition = 'opacity 0.7s ease, transform 0.7s ease';

        requestAnimationFrame(() => {
            setTimeout(() => {
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
            }, 150);
        });
    }

    // Entrée douce du contenu principal (contact, par-ci-par-là, à propos,
    // pages projets) — même principe que le hero : un seul mouvement
    // orchestré au chargement.
    const softEntranceEl = document.querySelector(
        '.contact-container, .misc-container, .about-page, .project-container'
    );

    if (softEntranceEl) {
        softEntranceEl.style.opacity = '0';
        softEntranceEl.style.transform = 'translateY(16px)';
        softEntranceEl.style.transition = 'opacity 0.7s ease, transform 0.7s ease';

        requestAnimationFrame(() => {
            setTimeout(() => {
                softEntranceEl.style.opacity = '1';
                softEntranceEl.style.transform = 'translateY(0)';
            }, 150);
        });
    }

    // Clic sur "Voir les projets" — scroll doux et personnalisé
    const heroCta = document.querySelector('.hero-cta');
    const projectsSection = document.getElementById('projets');

    function smoothScrollTo(targetEl, duration) {
        const startY = window.scrollY;
        const targetY = startY + targetEl.getBoundingClientRect().top;
        const distance = targetY - startY;
        const startTime = performance.now();

        const easeInOutQuad = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, startY + distance * easeInOutQuad(progress));
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    if (heroCta && projectsSection) {
        heroCta.addEventListener('click', (event) => {
            event.preventDefault();
            revealProjects();
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                projectsSection.scrollIntoView({ behavior: 'auto', block: 'start' });
            } else {
                smoothScrollTo(projectsSection, 1300);
            }
        });
    }
});
