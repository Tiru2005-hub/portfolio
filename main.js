/**
 * ============================================================
 * ANTI-GRAVITY PORTFOLIO — main.js
 * Author : Tiru krishna E
 * Desc   : Particles, Animations, Typed text, Contact API
 *          Works across all separate pages.
 * ============================================================
 */

/* ─── CONFIG ─────────────────────────────────────────────── */
const BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001'
    : window.location.origin;

/* ─── 1. LOADING SCREEN ──────────────────────────────────── */
(function initLoader() {
    const overlay = document.getElementById('loader');
    const bar = document.getElementById('loaderBar');
    if (!overlay || !bar) return;

    let progress = 0;
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
        progress += Math.random() * 22;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                overlay.classList.add('hidden');
                document.body.style.overflow = 'auto';
                initApp();
            }, 400);
        }
        bar.style.width = progress + '%';
    }, 100);
})();

/* ─── 2. PARTICLE CANVAS ─────────────────────────────────── */
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const COLORS = ['#00d4ff', '#a855f7', '#06ffd8', '#f72585'];
    let particles = [], W, H;

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W; this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4;
            this.r = Math.random() * 1.8 + 0.4; this.alpha = Math.random() * 0.5 + 0.1;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
            ctx.save(); ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color; ctx.shadowColor = this.color; ctx.shadowBlur = 8;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        }
    }

    function buildParticles() {
        particles = [];
        const count = Math.min(Math.floor((W * H) / 10000), 120);
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.save(); ctx.globalAlpha = (1 - dist / 120) * 0.12;
                    ctx.strokeStyle = '#00d4ff'; ctx.lineWidth = 0.5;
                    ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); ctx.restore();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { resize(); buildParticles(); });
    resize(); buildParticles(); animate();
}

/* ─── 3. TYPED TEXT ANIMATION (index.html only) ──────────── */
function initTyped() {
    const el = document.getElementById('heroTyped');
    if (!el) return;
    const words = ['B.Tech IT Student', 'Web Developer', 'Cloud Enthusiast', 'Python Programmer', 'Problem Solver'];
    let wordIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const word = words[wordIdx];
        el.textContent = isDeleting ? word.slice(0, charIdx--) : word.slice(0, charIdx++);
        let delay = isDeleting ? 60 : 110;
        if (!isDeleting && charIdx === word.length + 1) { delay = 1800; isDeleting = true; }
        if (isDeleting && charIdx === 0) { isDeleting = false; wordIdx = (wordIdx + 1) % words.length; delay = 300; }
        setTimeout(type, delay);
    }
    type();
}

/* ─── 4. NAVBAR SCROLL BEHAVIOR ──────────────────────────── */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    // Always scrolled on inner pages (non-home)
    const isHome = document.querySelector('.hero-section') !== null;
    if (!isHome) navbar.classList.add('scrolled');
    window.addEventListener('scroll', () => {
        if (isHome) navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
}

/* ─── 5. MOBILE HAMBURGER ────────────────────────────────── */
function initHamburger() {
    const btn = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (!btn || !mobileNav) return;

    function toggle() {
        const open = btn.classList.toggle('open');
        mobileNav.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open);
    }
    btn.addEventListener('click', toggle);
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('open');
            mobileNav.classList.remove('open');
            btn.setAttribute('aria-expanded', false);
        });
    });
}

/* ─── 6. SCROLL REVEAL ───────────────────────────────────── */
function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
}

/* ─── 7. COUNTER ANIMATION ───────────────────────────────── */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const target = +entry.target.dataset.count;
            let current = 0;
            const step = target / 40;
            const interval = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(interval); }
                entry.target.textContent = Math.floor(current);
            }, 40);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

/* ─── 8. SCROLL TO TOP BUTTON ────────────────────────────── */
function initScrollTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── 9. SCROLL INDICATOR HIDE (home page) ───────────────── */
function initScrollIndicator() {
    const ind = document.getElementById('scrollIndicator');
    if (!ind) return;
    window.addEventListener('scroll', () => {
        ind.style.opacity = window.scrollY > 100 ? '0' : '1';
    });
}

/* ─── 10. CONTACT FORM + BACKEND API ────────────────────── */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const statusEl = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');

    /* Find correct field IDs (contact.html uses contactName etc.) */
    const nameId = document.getElementById('contactName') ? 'contactName' : 'formName';
    const emailId = document.getElementById('contactEmail') ? 'contactEmail' : 'formEmail';
    const subjectId = document.getElementById('contactSubject') ? 'contactSubject' : 'formSubject';
    const messageId = document.getElementById('contactMessage') ? 'contactMessage' : 'formMessage';

    function validateField(id, errorId, min, max, label) {
        const el = document.getElementById(id);
        const err = document.getElementById(errorId);
        if (!el || !err) return true;
        const val = el.value.trim();
        if (!val || val.length < min) { err.textContent = `${label} must be at least ${min} characters.`; return false; }
        if (val.length > max) { err.textContent = `${label} must be under ${max} characters.`; return false; }
        err.textContent = ''; return true;
    }

    function validateEmail() {
        const el = document.getElementById(emailId);
        const err = document.getElementById('emailError');
        if (!el || !err) return true;
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
        err.textContent = valid ? '' : 'Please enter a valid email address.';
        return valid;
    }

    function setStatus(msg, type) {
        if (!statusEl) return;
        statusEl.textContent = msg;
        statusEl.className = 'form-status ' + type;
        statusEl.style.display = msg ? 'block' : 'none';
    }

    function setLoading(loading) {
        if (submitBtn) submitBtn.disabled = loading;
        if (submitText) submitText.style.display = loading ? 'none' : 'inline-flex';
        if (submitLoader) submitLoader.style.display = loading ? 'inline-flex' : 'none';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (statusEl) statusEl.style.display = 'none';

        const nameOk = validateField(nameId, 'nameError', 2, 100, 'Name');
        const emailOk = validateEmail();
        const messageOk = validateField(messageId, 'messageError', 10, 2000, 'Message');
        if (!nameOk || !emailOk || !messageOk) return;

        const payload = {
            name: document.getElementById(nameId).value.trim(),
            email: document.getElementById(emailId).value.trim(),
            subject: (document.getElementById(subjectId) || {}).value?.trim() || '',
            message: document.getElementById(messageId).value.trim()
        };

        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data.success) {
                setStatus('🎉 ' + data.message, 'success');
                form.reset();
                createSparkles();
            } else {
                const errMsg = data.errors ? data.errors[0].msg : 'Something went wrong.';
                setStatus('❌ ' + errMsg, 'error');
            }
        } catch (err) {
            // Backend offline: save in localStorage as fallback
            const saved = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            saved.push({ ...payload, timestamp: new Date().toISOString(), id: Date.now() });
            localStorage.setItem('portfolio_messages', JSON.stringify(saved));
            setStatus('✅ Message received! (Saved locally while offline)', 'success');
            form.reset();
        } finally {
            setLoading(false);
        }
    });

    // Real-time blur validation
    const nameEl = document.getElementById(nameId);
    const emailEl = document.getElementById(emailId);
    const msgEl = document.getElementById(messageId);
    if (nameEl) nameEl.addEventListener('blur', () => validateField(nameId, 'nameError', 2, 100, 'Name'));
    if (emailEl) emailEl.addEventListener('blur', validateEmail);
    if (msgEl) msgEl.addEventListener('blur', () => validateField(messageId, 'messageError', 10, 2000, 'Message'));
}

/* ─── 11. SPARKLE EFFECT on success ─────────────────────── */
function createSparkles() {
    const colors = ['#00d4ff', '#a855f7', '#06ffd8', '#f72585', '#fff'];
    for (let i = 0; i < 30; i++) {
        const s = document.createElement('div');
        const tx = (Math.random() > 0.5 ? '' : '-') + (Math.random() * 200 + 50) + 'px';
        s.style.cssText = `
      position:fixed; width:6px; height:6px; border-radius:50%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}vw; top:50vh;
      pointer-events:none; z-index:9999;
      animation: sparkleAnim_${i} 1s ease-out forwards;
      animation-delay:${Math.random() * 0.5}s;
    `;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 2000);
    }
    if (!document.getElementById('sparkleStyle')) {
        const style = document.createElement('style');
        style.id = 'sparkleStyle';
        let keyframes = '';
        for (let j = 0; j < 30; j++) {
            const tx = (Math.random() > 0.5 ? '' : '-') + (Math.random() * 200 + 50) + 'px';
            const ty = '-' + (Math.random() * 200 + 100) + 'px';
            keyframes += `@keyframes sparkleAnim_${j} { 
                0% { transform: translate(0,0) scale(1); opacity: 1; } 
                100% { transform: translate(${tx}, ${ty}) scale(0); opacity: 0; } 
            } `;
        }
        style.textContent = keyframes;
        document.head.appendChild(style);
    }
}

/* ─── 12. NEON CURSOR TRAIL ─────────────────────────────── */
function initCursorTrail() {
    const trail = document.createElement('div');
    trail.style.cssText = `
    position:fixed; width:8px; height:8px; border-radius:50%;
    background: radial-gradient(circle, rgba(0,212,255,0.8), transparent);
    pointer-events:none; z-index:9998; transform:translate(-50%,-50%);
    transition: left 0.05s, top 0.05s;
  `;
    document.body.appendChild(trail);
    document.addEventListener('mousemove', (e) => {
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
    });
}

/* ─── 13. CERTIFICATE LIGHTBOX MODAL ────────────────────── */
function initCertModal() {
    const overlay = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const modalTitle = document.getElementById('certModalTitle');
    const modalLoader = document.getElementById('certModalLoader');
    const closeBtn = document.getElementById('certModalClose');
    const zoomInBtn = document.getElementById('certZoomIn');
    const zoomOutBtn = document.getElementById('certZoomOut');
    const zoomLevelEl = document.getElementById('certZoomLevel');
    const downloadBtn = document.getElementById('certDownload');
    const prevBtn = document.getElementById('certNavPrev');
    const nextBtn = document.getElementById('certNavNext');
    const pageIndicator = document.getElementById('certPageIndicator');
    const pageCurrent = document.getElementById('certPageCurrent');
    const pageTotal = document.getElementById('certPageTotal');

    if (!overlay || !modalImg) return;

    let currentZoom = 100;
    let currentImgSrc = '';
    let imageList = [];
    let currentIndex = 0;

    function showImage(index) {
        if (index < 0 || index >= imageList.length) return;
        currentIndex = index;
        currentImgSrc = imageList[currentIndex];
        currentZoom = 100;
        updateZoomDisplay();

        // Reset image state
        modalImg.classList.remove('loaded');
        modalImg.style.transform = '';
        if (modalLoader) modalLoader.classList.remove('hidden');

        // Load image
        modalImg.src = currentImgSrc;
        modalImg.onload = function () {
            if (modalLoader) modalLoader.classList.add('hidden');
            modalImg.classList.add('loaded');
        };
        modalImg.onerror = function () {
            if (modalLoader) modalLoader.classList.add('hidden');
            modalImg.alt = 'Certificate image not found. Please add the image to the certificates folder.';
            modalImg.classList.add('loaded');
        };

        // Update page indicator
        if (pageCurrent) pageCurrent.textContent = currentIndex + 1;

        // Update nav button visibility
        updateNavButtons();
    }

    function updateNavButtons() {
        if (imageList.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (pageIndicator) pageIndicator.style.display = 'none';
        } else {
            if (prevBtn) prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
            if (nextBtn) nextBtn.style.display = currentIndex < imageList.length - 1 ? 'flex' : 'none';
            if (pageIndicator) pageIndicator.style.display = 'inline-flex';
        }
    }

    function openModal(images, title) {
        imageList = images;
        currentIndex = 0;

        // Set title
        if (modalTitle) modalTitle.textContent = title || 'Certificate';

        // Set page total
        if (pageTotal) pageTotal.textContent = imageList.length;

        // Show overlay
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Show first image
        showImage(0);
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modalImg.src = '';
            modalImg.classList.remove('loaded');
            currentZoom = 100;
            imageList = [];
            currentIndex = 0;
            updateZoomDisplay();
        }, 400);
    }

    function goNext() {
        if (currentIndex < imageList.length - 1) showImage(currentIndex + 1);
    }

    function goPrev() {
        if (currentIndex > 0) showImage(currentIndex - 1);
    }

    function updateZoomDisplay() {
        if (zoomLevelEl) zoomLevelEl.textContent = currentZoom + '%';
        modalImg.style.transform = `scale(${currentZoom / 100})`;
    }

    function zoomIn() {
        if (currentZoom < 250) {
            currentZoom += 25;
            updateZoomDisplay();
        }
    }

    function zoomOut() {
        if (currentZoom > 50) {
            currentZoom -= 25;
            updateZoomDisplay();
        }
    }

    function downloadCert() {
        if (!currentImgSrc) return;
        const a = document.createElement('a');
        a.href = currentImgSrc;
        a.download = currentImgSrc.split('/').pop() || 'certificate';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Event: Click cert-btn buttons (supports both data-cert-img and data-cert-imgs)
    document.querySelectorAll('.cert-btn[data-cert-img], .cert-btn[data-cert-imgs]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const title = btn.getAttribute('data-cert-title') || 'Certificate';

            // Check for multi-image (data-cert-imgs) or single-image (data-cert-img)
            const multiImgs = btn.getAttribute('data-cert-imgs');
            const singleImg = btn.getAttribute('data-cert-img');

            let images = [];
            if (multiImgs) {
                images = multiImgs.split(',').map(s => s.trim()).filter(s => s);
            } else if (singleImg) {
                images = [singleImg];
            }

            if (images.length > 0) {
                openModal(images, title);
            }
        });
    });

    // Event: Close button
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Event: Nav buttons
    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    if (nextBtn) nextBtn.addEventListener('click', goNext);

    // Event: Click overlay background to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Event: Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === '+') zoomIn();
        if (e.key === '-') zoomOut();
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
    });

    // Event: Zoom controls
    if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
    if (downloadBtn) downloadBtn.addEventListener('click', downloadCert);

    // Event: Mouse wheel zoom on modal body
    const modalBody = document.getElementById('certModalBody');
    if (modalBody) {
        modalBody.addEventListener('wheel', (e) => {
            if (!overlay.classList.contains('active')) return;
            e.preventDefault();
            if (e.deltaY < 0) zoomIn();
            else zoomOut();
        }, { passive: false });
    }
}

/* ─── BOOT ───────────────────────────────────────────────── */
function initApp() {
    initParticles();
    initTyped();
    initNavbar();
    initHamburger();
    initScrollReveal();
    initCounters();
    initScrollTop();
    initScrollIndicator();
    initContactForm();
    initCursorTrail();
    initCertModal();
    console.log('%c🚀 Anti-Gravity Portfolio Loaded!', 'color:#00d4ff;font-size:16px;font-weight:bold;');
}

