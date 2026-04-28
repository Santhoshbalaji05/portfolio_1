document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switching ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        if (isLight) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // --- Typing Animation ---
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        "Full Stack Developer",
        "AI Enthusiast",
        "Problem Solver",
        "Architecting Scalable Systems"
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIdx];
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }
    type();

    // --- Scroll Reveal ---
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(el => revealObserver.observe(el));

    // --- Active Link Highlighting ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        // Sticky Nav logic
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.padding = '0.5rem 0';
            nav.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.3)';
        } else {
            nav.style.padding = '1rem 0';
            nav.style.boxShadow = 'none';
        }

        // Scroll Top Button
        const scrollTop = document.querySelector('.scroll-top');
        if (window.scrollY > 500) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    });

    // --- Scroll to Top ---
    document.querySelector('.scroll-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
