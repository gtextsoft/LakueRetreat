document.addEventListener('DOMContentLoaded', () => {

    /* --- MOBILE MENU --- */
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');

            // Toggle icon
            mobileBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
                mobileBtn.textContent = '☰';
            });
        });
    }

    /* --- SMOOTH SCROLL --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90; // new height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- FAQ ACCORDION --- */
    const faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const span = btn.querySelector('span');

            // Toggle current
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                span.textContent = '+';
            } else {
                // Close others
                document.querySelectorAll('.faq-content').forEach(el => el.style.maxHeight = null);
                document.querySelectorAll('.faq-btn span').forEach(s => s.textContent = '+');

                content.style.maxHeight = content.scrollHeight + "px";
                span.textContent = '−';
            }
        });
    });

    /* --- SIMPLE REVEAL ANIMATION --- */
    const revealElements = document.querySelectorAll('.card, .price-card, .stat, h2');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Init styles for animation
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    // Initial check
    revealOnScroll();
});
