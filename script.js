// ==========================================================================
// Javascript Logic — Portofolio FUDAK WINDUKO, SH., M.Pd.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Fade Out
    const preloader = document.querySelector('.preloader');
    const preloaderContainer = document.querySelector('.texts-container');

    if (preloaderContainer) {
        preloaderContainer.style.opacity = '1';
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('fade-out');
            }
        }, 1800); // Allow preloader animation to finish
    });

    // Fallback if window load is too fast or slow
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
        }
    }, 3500);

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // 3. Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    }

    // Trigger counter when visible
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.2 });
        observer.observe(counterSection);
    }

    // 4. Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 5. GSAP Floating Animation (Safe Check)
    if (typeof gsap !== 'undefined') {
        gsap.to(".gsap-float", {
            y: -15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Entrance fade-in for key text elements
        gsap.from(".hero-fade", {
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            delay: 2.0 // Trigger after preloader closes
        });
    }

    // 6. Contact Form Handle (WhatsApp & Email Redirect)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            // Format WhatsApp Message
            const waText = `Halo Ibu Suparti Windu,\n\nPerkenalkan saya *${name}* (${email}).\n\n*Subjek Keperluan:* ${subject}\n\n*Pesan:*\n${message}`;
            const waUrl = `https://wa.me/6282142107586?text=${encodeURIComponent(waText)}`;
            
            // Format Email Link
            const emailSubject = `[Kontak Portofolio] ${subject}`;
            const emailBody = `Nama Lengkap: ${name}\nEmail: ${email}\n\nSubjek Keperluan: ${subject}\n\nPesan:\n${message}`;
            const mailtoUrl = `mailto:supartiwindu@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Notification / Alert
            alert('Menghubungkan ke WhatsApp dan Email Anda...');
            
            // Open WhatsApp in a new tab
            window.open(waUrl, '_blank');
            
            // Trigger Email (open default mail client)
            window.location.href = mailtoUrl;
        });
    }
});
