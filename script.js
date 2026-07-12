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

    // 4. Portfolio Filter with "Show More" Limit
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const showMoreBtn = document.getElementById('portfolioShowMoreBtn');
    const showMoreText = document.getElementById('portfolioShowMoreText');
    const showMoreIcon = document.getElementById('portfolioShowMoreIcon');
    const showMoreContainer = document.getElementById('portfolioShowMoreContainer');

    const INITIAL_LIMIT = 6;
    let showAll = false;
    let currentFilter = 'all';

    const updatePortfolio = () => {
        let visibleCount = 0;
        let matchingCount = 0;

        portfolioItems.forEach(item => {
            const matchesFilter = (currentFilter === 'all' || item.classList.contains(currentFilter));
            
            if (matchesFilter) {
                matchingCount++;
                if (showAll || visibleCount < INITIAL_LIMIT) {
                    visibleCount++;
                    // Show item
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Hide because of limit
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            } else {
                // Hide because doesn't match filter
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // Toggle show more button visibility
        if (showMoreContainer) {
            if (matchingCount > INITIAL_LIMIT) {
                showMoreContainer.style.display = 'flex';
                // Update button text and icon orientation
                if (showAll) {
                    showMoreText.innerText = 'Tampilkan Lebih Sedikit';
                    showMoreIcon.style.transform = 'rotate(180deg)';
                } else {
                    showMoreText.innerText = 'Tampilkan Lebih Banyak';
                    showMoreIcon.style.transform = 'rotate(0deg)';
                }
            } else {
                showMoreContainer.style.display = 'none';
            }
        }
    };

    // Filter Buttons Click Listener
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilter = btn.getAttribute('data-filter');
            // reset showAll to false when switching filters
            showAll = false; 
            updatePortfolio();
        });
    });

    // Show More Button Click Listener
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            showAll = !showAll;
            updatePortfolio();
        });
    }

    // Run once on load
    updatePortfolio();

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

    // 7. Visitor Counter (Harian, Bulanan, Tahunan)
    const initVisitorCounter = () => {
        const namespace = "portofolio_fudak_winduko";
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');

        const dayKey = `day_${yyyy}_${mm}_${dd}`;
        const monthKey = `month_${yyyy}_${mm}`;
        const yearKey = `year_${yyyy}`;

        // Base/offset numbers so it looks professional on first loads (set to 0 for real stats)
        const BASE_DAILY = 0;
        const BASE_MONTHLY = 0;
        const BASE_YEARLY = 0;

        // Check session storage to avoid double increments on page refreshes
        const hasVisited = sessionStorage.getItem('has_visited_current_session');
        const isLocalDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        // Increment or just fetch
        let endpointType = 'up'; // default: increment
        if (hasVisited || isLocalDevelopment) {
            endpointType = 'get'; // if already visited or local testing, just read
        }

        const fetchCount = (key, type) => {
            const url = `https://api.counterapi.dev/v1/${namespace}/${key}/${type}`;
            return fetch(url)
                .then(res => {
                    if (!res.ok) throw new Error('API response error');
                    return res.json();
                });
        };

        Promise.all([
            fetchCount(dayKey, endpointType),
            fetchCount(monthKey, endpointType),
            fetchCount(yearKey, endpointType)
        ])
        .then(([dayData, monthData, yearData]) => {
            if (endpointType === 'up') {
                sessionStorage.setItem('has_visited_current_session', 'true');
            }
            
            const dayVal = (dayData.count || 0) + BASE_DAILY;
            const monthVal = (monthData.count || 0) + BASE_MONTHLY;
            const yearVal = (yearData.count || 0) + BASE_YEARLY;

            // Update UI with formatted numbers
            const elDay = document.getElementById('countHarian');
            const elMonth = document.getElementById('countBulanan');
            const elYear = document.getElementById('countTahunan');

            if (elDay) elDay.innerText = dayVal.toLocaleString('id-ID');
            if (elMonth) elMonth.innerText = monthVal.toLocaleString('id-ID');
            if (elYear) elYear.innerText = yearVal.toLocaleString('id-ID');
        })
        .catch(err => {
            console.warn("Visitor counter API error, using static bases:", err);
            // Fallback display
            const elDay = document.getElementById('countHarian');
            const elMonth = document.getElementById('countBulanan');
            const elYear = document.getElementById('countTahunan');
            if (elDay) elDay.innerText = BASE_DAILY.toLocaleString('id-ID');
            if (elMonth) elMonth.innerText = BASE_MONTHLY.toLocaleString('id-ID');
            if (elYear) elYear.innerText = BASE_YEARLY.toLocaleString('id-ID');
        });
    };

    initVisitorCounter();

    // 8. Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                // Show button
                backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
                backToTopBtn.classList.add('translate-y-0', 'opacity-100');
            } else {
                // Hide button
                backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
                backToTopBtn.classList.add('translate-y-20', 'opacity-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
