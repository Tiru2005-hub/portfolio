// Navigation Toggle
const toggleBtn = document.getElementById('toggleBtn');
const navLinks = document.getElementById('navLinks');

if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Typed.js Initialization
if (typeof Typed !== 'undefined') {
    const typed = new Typed('.typed-text', {
        strings: ['Frontend Developer', 'Web Designer', 'UI/UX Designer', 'Full Stack Developer'],
        typeSpeed: 70,
        backSpeed: 55,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Animate Skill Bars on Scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && (bar.style.width === '0px' || !bar.style.width)) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Certificate Modal
const certificateItems = document.querySelectorAll('.certificate-item');
const modal = document.getElementById('certificateModal');
const certificateFrame = document.getElementById('certificateFrame');
const closeModal = document.querySelector('.close-modal');

if (certificateItems.length > 0 && modal && certificateFrame) {
    certificateItems.forEach(item => {
        item.addEventListener('click', () => {
            const certificatePath = item.getAttribute('data-certificate');
            if (certificatePath) {
                certificateFrame.src = certificatePath;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Close Modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        certificateFrame.src = '';
        document.body.style.overflow = 'auto';
    });
}

// Close Modal on Outside Click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            certificateFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close Modal on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        certificateFrame.src = '';
        document.body.style.overflow = 'auto';
    }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTop() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

if (scrollTopBtn) {
    window.addEventListener('scroll', toggleScrollTop);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert(`Thank you for your message, ${name}! I'll get back to you at ${email} soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for Fade-in Animations
if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize on page load
window.addEventListener('load', () => {
    // Trigger initial animations
    highlightActiveSection();
    animateSkillBars();
    toggleScrollTop();
});