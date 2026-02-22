document.addEventListener("DOMContentLoaded", function() {
    // Hamburger menu toggle functionality
    const toggleBtn = document.querySelector(".toggle-btn");
    const navLinks = document.querySelector(".nav-links");

    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener("click", () => {
            toggleBtn.classList.toggle("click");
            navLinks.classList.toggle("open");
        });

        // Close menu when a navigation link is clicked (for mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = e.target.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = 0;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                }
                // Close mobile menu after clicking a link
                if (navLinks.classList.contains('open')) {
                    toggleBtn.classList.remove('click');
                    navLinks.classList.remove('open');
                }
            });
        });
    }

    // Typed.js initialization
    if (typeof Typed !== "undefined") {
        new Typed(".typed-text", {
            strings: ["Frontend Developer", "Web Designer", "UI/UX Designer", "Problem Solver"],
            typeSpeed: 70,
            backSpeed: 55,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    } else {
        console.warn("Typed.js library not loaded. Ensure the CDN link is correct and accessible.");
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});