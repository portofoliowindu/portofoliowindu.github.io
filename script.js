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

    // 7. Resilient & Persistent Visitor Counter (Harian, Bulanan, Tahunan)
    const initVisitorCounter = () => {
        const namespace = "portofolio_fudak_winduko";
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');

        const dateDayStr = `${yyyy}-${mm}-${dd}`;
        const dateMonthStr = `${yyyy}-${mm}`;
        const dateYearStr = `${yyyy}`;

        const dayKey = `day_${yyyy}_${mm}_${dd}`;
        const monthKey = `month_${yyyy}_${mm}`;
        const yearKey = `year_${yyyy}`;

        // Device Local Storage Accumulation Logic
        const savedDayDate = localStorage.getItem('fw_visit_date_day');
        const savedMonthDate = localStorage.getItem('fw_visit_date_month');
        const savedYearDate = localStorage.getItem('fw_visit_date_year');

        let localDayCount = parseInt(localStorage.getItem('fw_count_day') || '1', 10);
        let localMonthCount = parseInt(localStorage.getItem('fw_count_month') || '1', 10);
        let localYearCount = parseInt(localStorage.getItem('fw_count_year') || '1', 10);

        // Session check to increment on new session
        const hasSessionVisit = sessionStorage.getItem('fw_session_visited');

        if (!hasSessionVisit) {
            sessionStorage.setItem('fw_session_visited', 'true');

            // Handle Day Date Reset / Increment
            if (savedDayDate !== dateDayStr) {
                localStorage.setItem('fw_visit_date_day', dateDayStr);
                localDayCount = 1;
            } else {
                localDayCount += 1;
            }
            localStorage.setItem('fw_count_day', localDayCount.toString());

            // Handle Month Date Reset / Increment
            if (savedMonthDate !== dateMonthStr) {
                localStorage.setItem('fw_visit_date_month', dateMonthStr);
                localMonthCount = 1;
            } else {
                localMonthCount += 1;
            }
            localStorage.setItem('fw_count_month', localMonthCount.toString());

            // Handle Year Date Reset / Increment
            if (savedYearDate !== dateYearStr) {
                localStorage.setItem('fw_visit_date_year', dateYearStr);
                localYearCount = 1;
            } else {
                localYearCount += 1;
            }
            localStorage.setItem('fw_count_year', localYearCount.toString());
        }

        // DOM Update Helper
        const updateDOM = (day, month, year) => {
            const elDay = document.getElementById('countHarian');
            const elMonth = document.getElementById('countBulanan');
            const elYear = document.getElementById('countTahunan');
            if (elDay) elDay.innerText = Math.max(1, day).toLocaleString('id-ID');
            if (elMonth) elMonth.innerText = Math.max(1, month).toLocaleString('id-ID');
            if (elYear) elYear.innerText = Math.max(1, year).toLocaleString('id-ID');
        };

        // Render persistent counts immediately so UI never shows 0!
        updateDOM(localDayCount, localMonthCount, localYearCount);

        // Try syncing with remote Counter API if online
        const endpointType = hasSessionVisit ? 'get' : 'up';
        const fetchCount = (key, type) => {
            const url = `https://api.counterapi.dev/v1/${namespace}/${key}/${type}`;
            return fetch(url).then(res => {
                if (!res.ok) throw new Error('Counter API response error');
                return res.json();
            });
        };

        Promise.all([
            fetchCount(dayKey, endpointType),
            fetchCount(monthKey, endpointType),
            fetchCount(yearKey, endpointType)
        ])
        .then(([dayData, monthData, yearData]) => {
            const apiDay = dayData && typeof dayData.count === 'number' ? dayData.count : 0;
            const apiMonth = monthData && typeof monthData.count === 'number' ? monthData.count : 0;
            const apiYear = yearData && typeof yearData.count === 'number' ? yearData.count : 0;

            const finalDay = Math.max(localDayCount, apiDay);
            const finalMonth = Math.max(localMonthCount, apiMonth);
            const finalYear = Math.max(localYearCount, apiYear);

            updateDOM(finalDay, finalMonth, finalYear);
        })
        .catch(() => {
            // External API fallback: local device accumulation remains active and rendered
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

    // 9. Timeline Detail Modal Handler
    const timelineData = {
        "11": {
            period: "Sabtu, 15 Agustus 2026",
            title: "Bimtek Pelatihan Pembuatan Media Pembelajaran Digital",
            institution: "SLB YPAC SURABAYA — Peningkatan Mutu Pendidik & Tendik",
            badges: [
                { text: "Bimtek Media Inklusi", icon: "fas fa-laptop-code", color: "bg-sky-500/10 text-sky-400 border border-sky-500/20" },
                { text: "SLB YPAC Surabaya", icon: "fas fa-location-dot", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
                { text: "12 Peserta Pendidik", icon: "fas fa-users", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" }
            ],
            overview: "Pelaksanaan Bimbingan Teknis (Bimtek) Pelatihan Pembuatan Media Pembelajaran Digital dalam rangka Peningkatan Mutu Pendidik dan Tenaga Kependidikan di SLB YPAC Surabaya. Kegiatan ini membekali 12 orang peserta pendidik dengan keterampilan merancang media pembelajaran digital yang inklusif, adaptif, serta ramah bagi anak berkebutuhan khusus.",
            highlights: [
                "<strong>Hari / Tanggal Pelaksanaan:</strong> Sabtu, 15 Agustus 2026",
                "<strong>Waktu Pembukaan:</strong> Pukul 08.00 WIB s.d. Selesai",
                "<strong>Tempat / Lokasi Kegiatan:</strong> SLB YPAC SURABAYA",
                "<strong>Jumlah Peserta:</strong> 12 Orang Pendidik & Tenaga Kependidikan",
                "<strong>Materi Utama & Hasil Karya:</strong> Praktik perancangan media ajar digital interaktif, adaptasi konten multimedia pembelajaran khusus, serta teknik pendampingan digital inklusi."
            ],
            photos: [
                { url: "https://drive.google.com/file/d/1294BQimH83imJGy8UvT229dVziZ3jb_K/view?usp=sharing", caption: "Dokumentasi Pembukaan Bimtek Media Pembelajaran Digital di SLB YPAC Surabaya — 15 Agustus 2026" },
                { url: "https://drive.google.com/file/d/12dt9KGWGVdZwaUoZGgQMKeizZLiWJXFZ/view?usp=sharing", caption: "Dokumentasi Sesi Pemaparan Materi Media Pembelajaran Digital Adaptif Inklusi" },
                { url: "https://drive.google.com/file/d/13Gt73MbkKX4-in4P1SFPuaRBc2WCnvH7/view?usp=sharing", caption: "Dokumentasi Antusiasme 12 Peserta Pendidik & Tendik SLB YPAC Surabaya" },
                { url: "https://drive.google.com/file/d/16ND3KM1UVGU1JP4sCNzjg3OdylE_Ek8Z/view?usp=sharing", caption: "Dokumentasi Praktik Langsung Pembuatan Media Ajar Digital Khusus" },
                { url: "https://drive.google.com/file/d/16vOsyRdmCjTSxB6ZaPvRD4gAvKCw1Ric/view?usp=sharing", caption: "Dokumentasi Pendampingan Intensif Perancangan Modul Ajar Digital Interaktif" },
                { url: "https://drive.google.com/file/d/17vgZnHrYuhrWn-LDgmmhSEBiRwIFj0xi/view?usp=sharing", caption: "Dokumentasi Suasana Pelatihan Pendidik Inklusi di SLB YPAC Surabaya" },
                { url: "https://drive.google.com/file/d/1DLxhjldEKjuQru8HC-V1-MggJQ_-M7z8/view?usp=sharing", caption: "Dokumentasi Diskusi Interaktif Kebutuhan Media Pembelajaran Anak Khusus" },
                { url: "https://drive.google.com/file/d/1G6J_rHGBdOTdwtyBy9rhRdabXdINcBrp/view?usp=sharing", caption: "Dokumentasi Demonstrasi Fitur Media Pembelajaran Digital Interaktif" },
                { url: "https://drive.google.com/file/d/1ID8o3H0GEAlG-eD2a9kVHPKks9w1zP9j/view?usp=sharing", caption: "Dokumentasi Bimbingan Praktis Penyusunan Visual & Audio Pembelajaran" },
                { url: "https://drive.google.com/file/d/1K9IRwVW_jnU8IvUC2OClCfYN6CplDI4Q/view?usp=sharing", caption: "Dokumentasi Presentasi Karya Media Digital Peserta Bimtek SLB YPAC" },
                { url: "https://drive.google.com/file/d/1LQAh3YLv-cKVDqDVIovdEV0YOdPVebBa/view?usp=sharing", caption: "Dokumentasi Review & Uji Coba Media Pembelajaran Digital Hasil Karya Guru" },
                { url: "https://drive.google.com/file/d/1NqUtCdFusNgEqk8ezLNUFGpnzBTZmnaF/view?usp=sharing", caption: "Dokumentasi Sesi Pembukaan Pukul 08.00 WIB SLB YPAC Surabaya" },
                { url: "https://drive.google.com/file/d/1QGKs_X98QegfSCDw-B1LG_-AKFx2wStR/view?usp=sharing", caption: "Dokumentasi Konsultasi Teknis Aplikasi & Tools Media Digital" },
                { url: "https://drive.google.com/file/d/1ThfjIzzOyACv3dqbJhIzOb4WPsEobQsg/view?usp=sharing", caption: "Dokumentasi Simulasi Pembelajaran Inklusi Berbantuan Media Digital" },
                { url: "https://drive.google.com/file/d/1UYNODZ01at9fEjguWuETV500K7dv3IUH/view?usp=sharing", caption: "Dokumentasi Foto Bersama 12 Peserta Bimtek SLB YPAC Surabaya" },
                { url: "https://drive.google.com/file/d/1VW-N_cT_O6pVB2ERLxpYUlfL_gwxKTL7/view?usp=sharing", caption: "Dokumentasi Sesi Tanya Jawab & Solusi Digitalisasi Sekolah Khusus" },
                { url: "https://drive.google.com/file/d/1_G-coSPC3Toh5dG2tJM279BtiHzSicgT/view?usp=sharing", caption: "Dokumentasi Eksplorasi Media Ajar Interaktif Adaptif Anak ABK" },
                { url: "https://drive.google.com/file/d/1a3UC7ChODTtbUVBkpCibiCbuS2hNo08m/view?usp=sharing", caption: "Dokumentasi Aksi Praktik Baik Digitalisasi Pendidikan Inklusi Surabaya" },
                { url: "https://drive.google.com/file/d/1ank3O1JIcltGI-SeBrQU_KNUI1TAVvGK/view?usp=sharing", caption: "Dokumentasi Pendampingan Desain Layout & Konten Interaktif" },
                { url: "https://drive.google.com/file/d/1b6xqot3MIrQAJdPU8fjEpaBBSoJSY9YO/view?usp=sharing", caption: "Dokumentasi Komitmen Peningkatan Mutu Pendidik SLB YPAC Surabaya" },
                { url: "https://drive.google.com/file/d/1gF3RYIPS7LHxTcz1UawBMLtx8B7P2m-d/view?usp=sharing", caption: "Dokumentasi Fasilitasi Pelatihan Pembuatan Media Digital Inklusif" },
                { url: "https://drive.google.com/file/d/1gZ26qTUiDe4o3p66bdIZNQDjwA5T1U17/view?usp=sharing", caption: "Dokumentasi Pengarahan & Sambutan Sesi Pelatihan Guru SLB" },
                { url: "https://drive.google.com/file/d/1gm226SMDfnmkE0v6GIQF1JnR2_kXlC3r/view?usp=sharing", caption: "Dokumentasi Gelar Hasil Karya Media Pembelajaran Digital Peserta" },
                { url: "https://drive.google.com/file/d/1k-ABUEpEm4C70HBLSsmCwluNNOCgjr7m/view?usp=sharing", caption: "Dokumentasi Kebersamaan Pendidik & Panitia Pelaksana Bimtek" },
                { url: "https://drive.google.com/file/d/1pDBXhWEcxx6jwjDDoIu6xHAN7kRMDz3g/view?usp=sharing", caption: "Dokumentasi Penyerahan Sertifikat & Dokumen Kegiatan Pelatihan" },
                { url: "https://drive.google.com/file/d/1sOc1wVa8MhsO1gYRXGCTnnyxcwosrxV2/view?usp=sharing", caption: "Dokumentasi Suasana Pembelajaran Mandiri Peserta Bimtek Digital" },
                { url: "https://drive.google.com/file/d/1syBVZcsMiO9V8UfXoKNUfZU9RlsBSQg_/view?usp=sharing", caption: "Dokumentasi Lengkap Bimtek Pembuatan Media Digital SLB YPAC Surabaya" }
            ],
            driveUrl: "https://drive.google.com/drive/u/5/folders/1khQ0qhY5k1A5cm3xHiqWa6ZbJjp-imsS"
        },
        "10": {
            period: "Sabtu, 8 Agustus 2026",
            title: "Bimtek Pelatihan Pembuatan Media Pembelajaran Digital",
            institution: "Aula Korwil V Kecamatan Wungu — Peningkatan Mutu Pendidik & Tendik",
            badges: [
                { text: "Bimtek Media Digital", icon: "fas fa-laptop-code", color: "bg-sky-500/10 text-sky-400 border border-sky-500/20" },
                { text: "Aula Korwil V Wungu", icon: "fas fa-location-dot", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
                { text: "78 Peserta Pendidik", icon: "fas fa-users", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" }
            ],
            overview: "Pelaksanaan Bimbingan Teknis (Bimtek) Pelatihan Pembuatan Media Pembelajaran Digital dalam rangka Peningkatan Mutu Pendidik dan Tenaga Kependidikan di wilayah Korwil V Kecamatan Wungu. Kegiatan ini membekali 78 orang peserta pendidik dengan kemampuan merancang media ajar digital interaktif yang efektif dan menarik.",
            highlights: [
                "<strong>Hari / Tanggal Pelaksanaan:</strong> Sabtu, 8 Agustus 2026",
                "<strong>Waktu Pembukaan:</strong> Pukul 08.00 WIB s.d. Selesai",
                "<strong>Tempat / Lokasi Kegiatan:</strong> Aula Korwil V Kecamatan Wungu",
                "<strong>Jumlah Peserta:</strong> 78 Orang Pendidik & Tenaga Kependidikan",
                "<strong>Materi Utama & Hasil Karya:</strong> Praktik pembuatan media pembelajaran digital interaktif, integrasi konten multimedia, serta teknik penyampaian pembelajaran modern."
            ],
            photos: [
                { url: "https://drive.google.com/file/d/13V_v2aIiffMMuAnRdUZzNlyaA7Rxo3-c/view?usp=sharing", caption: "Dokumentasi Pembukaan Bimtek Media Pembelajaran Digital Korwil V Wungu — 8 Agustus 2026" },
                { url: "https://drive.google.com/file/d/166mgE9X7D61CIl-vD7AjubuY1OC8j_xz/view?usp=sharing", caption: "Dokumentasi Pemaparan Materi Pembuatan Media Digital di Aula Korwil V Wungu" },
                { url: "https://drive.google.com/file/d/17oTm5d_0pMa4RSYZaFptBFO54MqpaFo8/view?usp=sharing", caption: "Dokumentasi Kehadiran & Antusiasme 78 Peserta Pendidik & Tendik" },
                { url: "https://drive.google.com/file/d/19EIDOPTBB1NcVIvsV6l2T_rk6-ivsZSy/view?usp=sharing", caption: "Dokumentasi Praktik Langsung Perancangan Media Ajar Interaktif" },
                { url: "https://drive.google.com/file/d/1ExohYJGjr5KtH93afq1jUZGIwwxgK5Cz/view?usp=sharing", caption: "Dokumentasi Pendampingan Teknis Pemanfaatan Software Media Pembelajaran" },
                { url: "https://drive.google.com/file/d/1Fo4VJvh1E7545V0wnl4h_1osHe1y3P42/view?usp=sharing", caption: "Dokumentasi Suasana Pelatihan Pendidik di Aula Korwil V Kecamatan Wungu" },
                { url: "https://drive.google.com/file/d/1FtD8YXEAq0D_hHim1goYKBa6gRD1ULan/view?usp=sharing", caption: "Dokumentasi Diskusi Kelompok Penyusunan Konten Pembelajaran Digital" },
                { url: "https://drive.google.com/file/d/1KYZt7GOUcuoHP9M6kFivKrkzGR09S8LW/view?usp=sharing", caption: "Dokumentasi Demonstrasi Fitur Media Pembelajaran Interaktif Sekolah" },
                { url: "https://drive.google.com/file/d/1LUMQxp4Z6RRdnGgbW-JSbVxwU4yX9QWG/view?usp=sharing", caption: "Dokumentasi Konsultasi Teknis & Bimbingan Praktik Guru SD" },
                { url: "https://drive.google.com/file/d/1My7Yz5jYUbk61uUq4ScdBzudgBA1XWRt/view?usp=sharing", caption: "Dokumentasi Presentasi Hasil Media Pembelajaran Digital Peserta Bimtek" },
                { url: "https://drive.google.com/file/d/1RcFRfgvBe60045Bi8jyb3oDKOY2Tozdt/view?usp=sharing", caption: "Dokumentasi Review & Evaluasi Karya Media Pembelajaran Pendidik" },
                { url: "https://drive.google.com/file/d/1RzD9bR4X5n9QXmY56pcEGQJi-_OSO2Cu/view?usp=sharing", caption: "Dokumentasi Sesi Pembukaan Pukul 08.00 WIB Aula Korwil V Wungu" },
                { url: "https://drive.google.com/file/d/1UX6mlW3RpblMiApqjhKnWu_UQbnXJhst/view?usp=sharing", caption: "Dokumentasi Pembimbingan Integrasi Multimedia & Audio Visual Ajar" },
                { url: "https://drive.google.com/file/d/1W3VP--xZFkj3cdJErI3q8Vitm8MVY0qw/view?usp=sharing", caption: "Dokumentasi Simulasi Penggunaan Media Digital di Kelas Sekolah Dasar" },
                { url: "https://drive.google.com/file/d/1ZWxgk9BOSugWA__7LG8O9oSI10MIztEL/view?usp=sharing", caption: "Dokumentasi Foto Bersama 78 Peserta Bimtek Korwil V Wungu" },
                { url: "https://drive.google.com/file/d/1Za0ODC_GR_xkHtJGIkQHWvyfD0DmDAHy/view?usp=sharing", caption: "Dokumentasi Penutupan & Respon Positif Pelatihan Media Digital" },
                { url: "https://drive.google.com/file/d/1bStWXZdX6UWN_idr-cReiymkBIyy3SIy/view?usp=sharing", caption: "Dokumentasi Uji Coba Interaktivitas Media Ajar Hasil Karya Peserta" },
                { url: "https://drive.google.com/file/d/1cSRFka81DKSVDDNLGRJSBacDVNg4aV3m/view?usp=sharing", caption: "Dokumentasi Aksi Praktik Baik Digitalisasi Pembelajaran Korwil V" },
                { url: "https://drive.google.com/file/d/1cXQg3gScw5c50rsHVl35MJqHmbZ5V__c/view?usp=sharing", caption: "Dokumentasi Fasilitasi Pelatihan Pembuatan Media Digital Interaktif" },
                { url: "https://drive.google.com/file/d/1d86caUXGt-B7RrhIafwIEidUmhwZ4WxS/view?usp=sharing", caption: "Dokumentasi Komitmen Peningkatan Mutu Pendidik Korwil V Wungu" },
                { url: "https://drive.google.com/file/d/1dEZR014lCP-DdgMIFD5AmoJYP5RQsG4z/view?usp=sharing", caption: "Dokumentasi Pengarahan Teknis & Sambutan Pembukaan Bimtek" },
                { url: "https://drive.google.com/file/d/1dNhnsBb7cohpV_fjinM5xUEyJqKYIS7U/view?usp=sharing", caption: "Dokumentasi Pendampingan Desain Visual & Layout Media Ajar" },
                { url: "https://drive.google.com/file/d/1h0W99GK3A3MZz8RYgIlv93oAzOgzcIKs/view?usp=sharing", caption: "Dokumentasi Gelar Hasil Karya Media Pembelajaran Digital Guru" },
                { url: "https://drive.google.com/file/d/1iKDYnuSmYxDHyF74J1BTaib9NpYOqm85/view?usp=sharing", caption: "Dokumentasi Kolaborasi Pendidik & Tendik se-Kecamatan Wungu" },
                { url: "https://drive.google.com/file/d/1j7KIw4u5FmosHcRC3Z9HzRLDm5NrPbpK/view?usp=sharing", caption: "Dokumentasi Sesi Tanya Jawab & Solusi Kendala Digitalisasi Sekolah" },
                { url: "https://drive.google.com/file/d/1jmISwTU_IBaWyxULA1mg-MVIMpuluI2A/view?usp=sharing", caption: "Dokumentasi Praktik Pengolahan Konten Pembelajaran Interaktif" },
                { url: "https://drive.google.com/file/d/1lJdU5OZ3yg1KZkiA_xvtg68eg7Myhb3K/view?usp=sharing", caption: "Dokumentasi Penguatan Pembelajaran Berbasis Teknologi Digital" },
                { url: "https://drive.google.com/file/d/1nUPxsK7VjWBuscJHfN6tjMPT0B5ezqm4/view?usp=sharing", caption: "Dokumentasi Pembagian Sertifikat & Dokumen Kegiatan Bimtek" },
                { url: "https://drive.google.com/file/d/1oCTCJE0Va0QBSEqpdKm_GPChEqxfrGPy/view?usp=sharing", caption: "Dokumentasi Suasana Aula Korwil V Kecamatan Wungu Madiun" },
                { url: "https://drive.google.com/file/d/1pszYIizfWFNbmHj4waIxSnzmv_IRpIyA/view?usp=sharing", caption: "Dokumentasi Kebersamaan Pendidik & Panitia Pelaksana Bimtek" },
                { url: "https://drive.google.com/file/d/1sPGRbIDReZ_sObiSCB-yMNdsqSwdX3dd/view?usp=sharing", caption: "Dokumentasi Penyerahan Berkas Dokumentasi Hasil Karya Media" },
                { url: "https://drive.google.com/file/d/1vlhS3E5zAVpLji3AKZlNthGNI206c5h4/view?usp=sharing", caption: "Dokumentasi Aktivitas Belajar Mandiri Peserta Bimtek Digital" },
                { url: "https://drive.google.com/file/d/1z3xG0MCelamo3dx309CaMDT4wShYYhum/view?usp=sharing", caption: "Dokumentasi Lengkap Bimtek Pembuatan Media Digital Korwil V" }
            ],
            driveUrl: "https://drive.google.com/drive/u/5/folders/1mD4odOiHMMQSQK0W2LH5lC0g0Tfq7DEr"
        },
        "9": {
            period: "Kamis, 23 Juli 2026",
            title: "Workshop Peningkatan Mutu Pendidik & Tendik",
            institution: "Pemahaman KA (Kecerdasan Artfisial / AI) dalam Pembuatan RPP Menggunakan AI",
            badges: [
                { text: "Workshop AI & RPP", icon: "fas fa-robot", color: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
                { text: "PKBM Mawar Desa Bagi", icon: "fas fa-location-dot", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
                { text: "18 Peserta Pendidik", icon: "fas fa-users", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" }
            ],
            overview: "Pelaksanaan Workshop Peningkatan Mutu Pendidik dan Tenaga Kependidikan dengan fokus materi Pemahaman Kecerdasan Artfisial (KA / AI) dalam Pembuatan Rencana Pelaksanaan Pembelajaran (RPP) Menggunakan AI. Kegiatan ini diselenggarakan di PKBM Mawar Desa Bagi untuk membekali 18 peserta pendidik dengan keterampilan merancang perangkat ajar digital modern.",
            highlights: [
                "<strong>Hari / Tanggal Pelaksanaan:</strong> Kamis, 23 Juli 2026",
                "<strong>Waktu Pembukaan:</strong> Pukul 16.00 WIB s.d. Selesai",
                "<strong>Tempat / Lokasi Kegiatan:</strong> PKBM Mawar (Jl. Raya Poros Desa Bagi, Kec. Madiun, Kab. Madiun, Jawa Timur)",
                "<strong>Jumlah Peserta:</strong> 18 Orang Pendidik & Tenaga Kependidikan",
                "<strong>Materi & Hasil Karya:</strong> Praktik eksplorasi dan penyusunan RPP digital adaptif memanfaatkan teknologi Kecerdasan Artfisial (AI)."
            ],
            photos: [
                { url: "https://drive.google.com/file/d/10vWC0UKrEAqfW3NaipBe2N6WSiC4coq-/view?usp=sharing", caption: "Dokumentasi Pembukaan Workshop Peningkatan Mutu Pendidik — 23 Juli 2026" },
                { url: "https://drive.google.com/file/d/11qN0q9IP5qbUzLq8TURdsueyPwaW3rxG/view?usp=sharing", caption: "Dokumentasi Sesi Pemaparan Kecerdasan Artfisial (AI) RPP di PKBM Mawar" },
                { url: "https://drive.google.com/file/d/13zowkRBN4QuZri8c1pKjvrZE6GlE0EAZ/view?usp=sharing", caption: "Dokumentasi Suasana Pelatihan Pendidik & Tendik Desa Bagi Madiun" },
                { url: "https://drive.google.com/file/d/15eYutwQipG_wFrgn6G-zPyxlWgWaw_e2/view?usp=sharing", caption: "Dokumentasi Praktik Langsung Perancangan RPP Berbantuan AI" },
                { url: "https://drive.google.com/file/d/171SNSRtdVyD7c5Nhot0hBS72OIDU81wd/view?usp=sharing", caption: "Dokumentasi Pendampingan Teknis Pemanfaatan AI untuk Modul Ajar" },
                { url: "https://drive.google.com/file/d/1A86RVj4kuStRlqt1P5sKteHTWWSStlJf/view?usp=sharing", caption: "Dokumentasi Diskusi Interaktif 18 Peserta Pendidik di PKBM Mawar" },
                { url: "https://drive.google.com/file/d/1AAWp9pHUie8OU7s_Hpgtljc9p-9Q8mvL/view?usp=sharing", caption: "Dokumentasi Presentasi Rencana Pelaksanaan Pembelajaran Digital AI" },
                { url: "https://drive.google.com/file/d/1Bvq8jnhshEPAV1xLvwC0pv22TbFMAU6W/view?usp=sharing", caption: "Dokumentasi Konsultasi Penyusunan Prompt AI RPP Sekolah Dasar" },
                { url: "https://drive.google.com/file/d/1C2CrDUjytVzkAryeS0xL9-WMhva5LiIw/view?usp=sharing", caption: "Dokumentasi Antusiasme Pendidik & Tendik Saat Sesi Praktik AI" },
                { url: "https://drive.google.com/file/d/1CtNeTT0sRw7dIQ-x6eoLvuoru3-9QPP9/view?usp=sharing", caption: "Dokumentasi Review Karya RPP Berbasis Kecerdasan Artfisial" },
                { url: "https://drive.google.com/file/d/1Db9ALlcOdvbYiITa00lzYfNmjSBs2Ru1/view?usp=sharing", caption: "Dokumentasi Sesi Pembukaan Pukul 16.00 WIB PKBM Mawar Bagi" },
                { url: "https://drive.google.com/file/d/1J12s8XeR7iBW1qETRZYJuj6kJIPalS_g/view?usp=sharing", caption: "Dokumentasi Pembimbingan Aplikasi AI Generatif Pembelajaran" },
                { url: "https://drive.google.com/file/d/1Jd2yG_iP5ysiIrBWFw7iuBjJ5_5XIIHG/view?usp=sharing", caption: "Dokumentasi Simulasi Pembelajaran Kurikulum Merdeka AI" },
                { url: "https://drive.google.com/file/d/1LNJiSHopYhYMMDWrwiH241kNX3kvP2vH/view?usp=sharing", caption: "Dokumentasi Foto Bersama 18 Peserta Workshop PKBM Mawar" },
                { url: "https://drive.google.com/file/d/1LQnpTFnHq56-I0jWFUaQWWUenC10D4vm/view?usp=sharing", caption: "Dokumentasi Penutupan Sesi Workshop Peningkatan Mutu Pendidik" },
                { url: "https://drive.google.com/file/d/1N6kN8Ia8sB7XuP9XyDv_V24qiV2h4MNF/view?usp=sharing", caption: "Dokumentasi Eksplorasi Tools AI untuk Penilaian & Modul Ajar" },
                { url: "https://drive.google.com/file/d/1SRlAyefiO0fHiGZUvrCHQQTEiMVWI8aL/view?usp=sharing", caption: "Dokumentasi Aksi Nyata Pelatihan Digitalisasi PKBM Mawar Bagi" },
                { url: "https://drive.google.com/file/d/1UQc8-iBNx9UApa2VivDL7Wm7QIORO-vN/view?usp=sharing", caption: "Dokumentasi Fasilitasi Pembelajaran Interaktif Berbantuan AI" },
                { url: "https://drive.google.com/file/d/1eI7XjB1GU2eb-MZfG33aMVMm3NH8NSMA/view?usp=sharing", caption: "Dokumentasi Penguatan Karakter & Mutu Pendidik Berbasis Teknologi" },
                { url: "https://drive.google.com/file/d/1gjAms6KsPM7VkcTDQ5wx9GjtcZ3tmWF4/view?usp=sharing", caption: "Dokumentasi Pembagian Modul Panduan Praktis AI untuk Guru" },
                { url: "https://drive.google.com/file/d/1hNU8VWFalHM0mYZXavBeEv226O0cYL_p/view?usp=sharing", caption: "Dokumentasi Pendampingan Perancangan Diferensiasi RPP AI" },
                { url: "https://drive.google.com/file/d/1lfY6fBmErNgTJpY0EaQd81TMyJX4TOWr/view?usp=sharing", caption: "Dokumentasi Gelar Hasil Praktik RPP AI Pendidik & Tendik" },
                { url: "https://drive.google.com/file/d/1p-GXizJNZ8PCiYZIZtHLFpCjfB7B1Jk_/view?usp=sharing", caption: "Dokumentasi Kolaborasi Peserta & Penggerak Digitalisasi Madiun" },
                { url: "https://drive.google.com/file/d/1t3m3dWhnbbvoOnzrEQ0LWpyV-kX7hWL8/view?usp=sharing", caption: "Dokumentasi Sesi Evaluasi & Tanya Jawab PKBM Mawar" },
                { url: "https://drive.google.com/file/d/1zqLkn-rDR2VC291YxhfrJsgkxXJVbii9/view?usp=sharing", caption: "Dokumentasi Lengkap Workshop Peningkatan Mutu Pendidik 23 Juli 2026" }
            ],
            driveUrl: "https://drive.google.com/drive/u/5/folders/1X4t6ZoJUM726UnEFS52wfx2WCx243U4_"
        },
        "8": {
            period: "Sabtu, 20 Juni 2026",
            title: "Workshop Peningkatan Mutu Pendidik & Tendik",
            institution: "Pemahaman KA (Kecerdasan Artfisial / AI) dalam Pembuatan RPP Menggunakan AI",
            badges: [
                { text: "Workshop AI & RPP", icon: "fas fa-robot", color: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
                { text: "Votel Kartika Madiun", icon: "fas fa-location-dot", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
                { text: "24 Peserta Pendidik", icon: "fas fa-users", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" }
            ],
            overview: "Pelaksanaan Workshop Peningkatan Mutu Pendidik dan Tenaga Kependidikan dengan fokus materi Pemahaman Kecerdasan Artfisial (KA / AI) dalam Pembuatan Rencana Pelaksanaan Pembelajaran (RPP) Menggunakan AI. Kegiatan ini bertujuan memperkuat kapasitas digital para pendidik dalam menyusun perangkat ajar yang inovatif dan adaptif.",
            highlights: [
                "<strong>Hari / Tanggal Pelaksanaan:</strong> Sabtu, 20 Juni 2026",
                "<strong>Waktu Pembukaan:</strong> Pukul 07.30 WIB s.d. Selesai",
                "<strong>Tempat Pelaksanaan:</strong> Votel Kartika Madiun (Jalan Pahlawan No. 54 Pangongangan, Kabupaten Madiun)",
                "<strong>Jumlah Peserta:</strong> 24 Orang Pendidik & Tenaga Kependidikan",
                "<strong>Materi & Hasil Karya:</strong> Praktik langsung integrasi Kecerdasan Artfisial (AI) untuk merancang RPP & Modul Ajar Kurikulum Merdeka secara presisi."
            ],
            photos: [
                { url: "https://drive.google.com/file/d/1-KVd29yNbSsIrRazN-_bH9y0lD2EvOKk/view?usp=sharing", caption: "Dokumentasi Pembukaan Workshop Peningkatan Mutu Pendidik — 20 Juni 2026" },
                { url: "https://drive.google.com/file/d/10FWymRDl6gnUrgHXL9LiEof_ZD8Wmy0o/view?usp=sharing", caption: "Dokumentasi Sesi Pemaparan Kecerdasan Artfisial (AI) dalam Pembuatan RPP" },
                { url: "https://drive.google.com/file/d/11eNmk0hxjhAGRHkusKCOtWf18k7sxCPA/view?usp=sharing", caption: "Dokumentasi Peserta Workshop di Votel Kartika Madiun" },
                { url: "https://drive.google.com/file/d/11fBPQfrRjyK0-JpHpEmLfL7HjjBh0Hlm/view?usp=sharing", caption: "Dokumentasi Praktik Langsung Pembuatan RPP Digital Berbasis AI" },
                { url: "https://drive.google.com/file/d/1234fPxC_HOvvWK_6muImGae3RAO03meS/view?usp=sharing", caption: "Dokumentasi Suasana Pelaksanaan Workshop Pendidik & Tendik" },
                { url: "https://drive.google.com/file/d/13-B8V_jwJ1vESIEZPL3zT77SNj8h72Y9/view?usp=sharing", caption: "Dokumentasi Pendampingan Teknis Pemanfaatan AI untuk Perangkat Ajar" },
                { url: "https://drive.google.com/file/d/14p3jb0oRSGLsRDROEOT9kVJCYtsC8Euu/view?usp=sharing", caption: "Dokumentasi Diskusi Kelompok Perancangan RPP Berbasis KA" },
                { url: "https://drive.google.com/file/d/14rCImyffoK2pQk3ivr5RI49ST-FgtQHU/view?usp=sharing", caption: "Dokumentasi Presentasi Hasil Karya RPP AI Peserta Workshop" },
                { url: "https://drive.google.com/file/d/15cpMPLpmDzwacTr4ej_LNkeFktyxgeUA/view?usp=sharing", caption: "Dokumentasi Sesi Tanya Jawab & Konsultasi Integrasi AI Sekolah" },
                { url: "https://drive.google.com/file/d/16BuxUfCMDuF5QADLlvK-XqpV1StRUAsv/view?usp=sharing", caption: "Dokumentasi Evaluasi Karya RPP Digital Pendidik & Tendik" },
                { url: "https://drive.google.com/file/d/18dh0x1VRZrCWIewIcFdOVQKMbafRtzm9/view?usp=sharing", caption: "Dokumentasi Antusiasme 24 Peserta Workshop Votel Kartika" },
                { url: "https://drive.google.com/file/d/1AFxjniZKBWivIndwleMCLWUO3QBhg9hF/view?usp=sharing", caption: "Dokumentasi Pembimbingan Aplikasi AI Generatif untuk Pendidik" },
                { url: "https://drive.google.com/file/d/1BQ_6Mw_dUjGNARxY8TVqsLb8mAGm3f-t/view?usp=sharing", caption: "Dokumentasi Simulasi Pembelajaran Adaptif Berbantuan AI" },
                { url: "https://drive.google.com/file/d/1HiJMcT93mrQG1swqycbKgCgSE-uONNdZ/view?usp=sharing", caption: "Dokumentasi Foto Bersama Peserta & Pemateri Workshop AI" },
                { url: "https://drive.google.com/file/d/1HlJLHXPcAJlhUDu37EjAM5zXRYTlPqWQ/view?usp=sharing", caption: "Dokumentasi Penutupan Sesi Workshop Votel Kartika Madiun" },
                { url: "https://drive.google.com/file/d/1P20BcnlHoAzJdj32jzDrVkSrmNlrPWdy/view?usp=sharing", caption: "Dokumentasi Penyusunan Modul & Prompt AI RPP Sekolah Dasar" },
                { url: "https://drive.google.com/file/d/1P2kt4d8IjGBoCbrK9vFvOIEOVVssrQ3D/view?usp=sharing", caption: "Dokumentasi Aktivitas Peserta dalam Praktik AI Pembuatan RPP" },
                { url: "https://drive.google.com/file/d/1PEr4t3f5ntuJjQIXueTsauftg2D8fu82/view?usp=sharing", caption: "Dokumentasi Fasilitasi Pembelajaran Digital Pendidik Madiun" },
                { url: "https://drive.google.com/file/d/1QdjNR4cqHul-StLSz1uj-LiEk2jjamiv/view?usp=sharing", caption: "Dokumentasi Review Hasil Pembelajaran & Perangkat Ajar RPP" },
                { url: "https://drive.google.com/file/d/1WM70mcYXg8wsO3Zjx5hHDvt90a-m0ubY/view?usp=sharing", caption: "Dokumentasi Sesi Pembukaan Pukul 07.30 WIB Votel Kartika" },
                { url: "https://drive.google.com/file/d/1WXnEF59cp_0-ZCuiujjNS6zQtSE2-iy_/view?usp=sharing", caption: "Dokumentasi Pendampingan Perancangan Diferensiasi RPP AI" },
                { url: "https://drive.google.com/file/d/1ZS5BFtg76--ABAMri5PsT1mV1-ge1WLf/view?usp=sharing", caption: "Dokumentasi Gelar Hasil Karya RPP Berbasis AI Pendidik" },
                { url: "https://drive.google.com/file/d/1eBPnFgcLKV_7XnuCWrENd4-gw_mIdI1N/view?usp=sharing", caption: "Dokumentasi Kolaborasi 24 Pendidik & Tendik Kab. Madiun" },
                { url: "https://drive.google.com/file/d/1gD456GfzcFW6fta9HdaD6cCkAGpbixBK/view?usp=sharing", caption: "Dokumentasi Penguatan Komitmen Mutu Pendidikan Berbasis AI" },
                { url: "https://drive.google.com/file/d/1iOSD0OCTRkHmI3eT3R3W02etAsDYF55j/view?usp=sharing", caption: "Dokumentasi Penyampaian Materi Peningkatan Mutu Pendidik" },
                { url: "https://drive.google.com/file/d/1p-6ryNPyvl9cwZKi2EmWJArWOhcYY7aY/view?usp=sharing", caption: "Dokumentasi Aksi Praktik Baik Pembuatan RPP AI Sekolah" },
                { url: "https://drive.google.com/file/d/1qeHNM0FKiMqd2sYPEXSShap-NgVFdOr3/view?usp=sharing", caption: "Dokumentasi Penyusunan Rubrik Penilaian Berbantuan AI" },
                { url: "https://drive.google.com/file/d/1rvL6oHZ4AR35kDbaem9CX4pXUyvuzkvL/view?usp=sharing", caption: "Dokumentasi Penyerahan Berkas & Dokumentasi Workshop" },
                { url: "https://drive.google.com/file/d/1voxEzx3xv_mHmayUa3bTB_lZTuHz77aX/view?usp=sharing", caption: "Dokumentasi Suasana Aula Votel Kartika Madiun" },
                { url: "https://drive.google.com/file/d/1w1T2OtLf6RFI76CB6buMvafX8KrID-jY/view?usp=sharing", caption: "Dokumentasi Lengkap Workshop Peningkatan Mutu Pendidik AI" }
            ],
            driveUrl: "https://drive.google.com/drive/u/5/folders/1BX70mSY4QCYnSzvfuW8UlJwjPrmWHGOl"
        },
        "1": {
            period: "Januari - Juni 2026",
            title: "Guru Kelas SD",
            institution: "SDN Candimulyo 01 Kecamatan Dolopo (Aktif Mengajar)",
            badges: [
                { text: "FASDA Digitalisasi", icon: "fas fa-chalkboard-teacher", color: "bg-sky-500/10 text-sky-400 border border-sky-500/20" },
                { text: "Juara 2 INOTEK 2026", icon: "fas fa-trophy", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
                { text: "PGRI POWER", icon: "fas fa-bolt", color: "bg-rose-500/10 text-rose-400 border border-rose-500/20" }
            ],
            overview: "Mendedikasikan diri penuh sebagai Guru Kelas tingkat sekolah dasar. Melaksanakan pembelajaran berbasis siswa di SDN Candimulyo 01, merancang program kelas adaptif dengan Kurikulum Merdeka, bertugas sebagai Fasilitator Daerah Digitalisasi, penggerak PGRI POWER, serta meraih Juara 2 Lomba INOTEK Kab. Madiun 2026.",
            highlights: [
                "<strong>Implementasi Kurikulum Merdeka Adaptif:</strong> Merancang dan menerapkan modul ajar berbasis diferensiasi serta pemanfaatan kecerdasan buatan (AI) untuk mengakomodasi kebutuhan belajar beragam siswa.",
                "<strong>Prestasi INOTEK 2026:</strong> Meraih Juara 2 Lomba Inovasi Teknologi Kabupaten Madiun Tahun 2026 dengan karya inovasi media pembelajaran berbasis digital.",
                "<strong>Fasilitator Daerah (FASDA) Digitalisasi:</strong> Bertindak sebagai pembimbing dan fasilitator pendampingan integrasi teknologi informasi dalam pembelajaran bagi pendidik SD se-Kabupaten Madiun.",
                "<strong>Penggerak PGRI POWER:</strong> Aktif memelopori kegiatan workshop literasi digital, kolaborasi antar-pendidik, serta peningkatan mutu pembelajaran inklusif."
            ],
            // === BAGIAN FOTO DOKUMENTASI & GOOGLE DRIVE (FASDA, INOTEK, PGRI POWER) ===
            photos: [
                { 
                    url: "https://drive.google.com/file/d/12fFRtxZ3nLwjnWkH2hq4pdTcjPEK9FMo/view?usp=sharing",
                    caption: "Dokumentasi Juara 2 INOTEK 2026 — Inovasi Pembelajaran Digital & AI" 
                },
                { 
                    url: "https://drive.google.com/file/d/14sGLGi-5jEmDg872_L666wneY6r9SPg0/view?usp=sharing",
                    caption: "Dokumentasi FASDA Digitalisasi — Pembimbingan Pendidik SD Kab. Madiun" 
                },
                { 
                    url: "https://drive.google.com/file/d/14sMydtWTCA4H9sdNcogqh2t6ODnmsFTq/view?usp=sharing",
                    caption: "Dokumentasi Penggerak PGRI POWER — Workshop Literasi Digital & Inovasi" 
                },
                { 
                    url: "https://drive.google.com/file/d/15WP3GzgVTjsKkj1y7d5p-HLNYHsmMIs-/view?usp=sharing",
                    caption: "Dokumentasi Pembelajaran Adaptif Kurikulum Merdeka di SDN Candimulyo 01" 
                },
                { 
                    url: "https://drive.google.com/file/d/16eucK2KyI-dBQtfIBW0O6qkyMy7ojY43/view?usp=sharing",
                    caption: "Dokumentasi Pendampingan Integrasi Teknologi Pendidikan Sekolah Dasar" 
                },
                { 
                    url: "https://drive.google.com/file/d/19aXYcAWmpzggc2WRYmPkQR87tGxc5pKz/view?usp=sharing",
                    caption: "Dokumentasi Penyerahan Inovasi Teknologi Pendidikan Kab. Madiun" 
                },
                { 
                    url: "https://drive.google.com/file/d/1DlxxMP3a53_g0qBtt18mi-pB0zJtGg57/view?usp=sharing",
                    caption: "Dokumentasi Asistensi Pendidik & Pelatihan Digitalisasi Sekolah" 
                },
                { 
                    url: "https://drive.google.com/file/d/1F8FKmQepw02xPbtd6c7J61SGkLubCui2/view?usp=sharing",
                    caption: "Dokumentasi Forum Kolaborasi Pendidik & Penggerak PGRI POWER" 
                },
                { 
                    url: "https://drive.google.com/file/d/1P1Atv4BWdInHyyh3CD6Nedxwgl-b88ug/view?usp=sharing",
                    caption: "Dokumentasi Kegiatan Praktik Baik Pembelajaran Berbasis Siswa" 
                },
                { 
                    url: "https://drive.google.com/file/d/1WribnBmW1nAhCtor8fl6dtNpeb7-8QWS/view?usp=sharing",
                    caption: "Dokumentasi Pelaksanaan Workshop Literasi Digital Guru SD" 
                },
                { 
                    url: "https://drive.google.com/file/d/1XeFIhSiHlQ4siYfaZHrk5mCxBUUdSkun/view?usp=sharing",
                    caption: "Dokumentasi Pengimbasan Modul Ajar Digital & Media Pembelajaran AI" 
                },
                { 
                    url: "https://drive.google.com/file/d/1_459gYqiv0hdYeOf3o_YVflL9QczcOu7/view?usp=sharing",
                    caption: "Dokumentasi Pendampingan Kelas Adaptif & Pendidikan Inklusi" 
                },
                { 
                    url: "https://drive.google.com/file/d/1asfqEAGGNjryXgOmA6Ihv_Uehkj3kaqH/view?usp=sharing",
                    caption: "Dokumentasi Gelar Karya Inovasi & Hasil Belajar Siswa SDN Candimulyo 01" 
                },
                { 
                    url: "https://drive.google.com/file/d/1cCi6aIPoJrPwy-_3AoWKgAS6CvTzwEba/view?usp=sharing",
                    caption: "Dokumentasi Diskusi Terbimbing & Fasilitasi Pembelajaran Digital" 
                },
                { 
                    url: "https://drive.google.com/file/d/1f9zconLYy0MUyZifW9rwwAXlsiSFX6lG/view?usp=sharing",
                    caption: "Dokumentasi Kegiatan Pembina & Penggerak Literasi Sekolah" 
                },
                { 
                    url: "https://drive.google.com/file/d/1g1IxldJJdzFl1m6kpPbsOke2VJueGPu8/view?usp=sharing",
                    caption: "Dokumentasi Sesi Paparan Inovasi Teknologi Pendidikan INOTEK 2026" 
                },
                { 
                    url: "https://drive.google.com/file/d/1iuTzRDFjTgw7iCWnl9ax6ReXONUOd86W/view?usp=sharing",
                    caption: "Dokumentasi Pendampingan Teknis Pendidik SD se-Kabupaten Madiun" 
                },
                { 
                    url: "https://drive.google.com/file/d/1kueDry-SF0SntiJbrvk4UyBcth7Us3YA/view?usp=sharing",
                    caption: "Dokumentasi Aksi Nyata Kurikulum Merdeka & Kolaborasi Guru" 
                },
                { 
                    url: "https://drive.google.com/file/d/1stVpoEfcfXCHKA8LTjV22eJkrQFATmwg/view?usp=sharing",
                    caption: "Dokumentasi Penyerahan Sertifikat & Apresiasi Penggerak Digitalisasi" 
                },
                { 
                    url: "https://drive.google.com/file/d/1uTi9DRkGIPhAqZB733ue7YRW0SS8s-h9/view?usp=sharing",
                    caption: "Dokumentasi Aktivitas Belajar Siswa di Kelas Adaptif Digital" 
                },
                { 
                    url: "https://drive.google.com/file/d/1wBdZmQH-2QKn7ykORvJ4x3fRHgn7yvNA/view?usp=sharing",
                    caption: "Dokumentasi Portofolio Berkas & Dokumentasi Lengkap Kegiatan" 
                }
            ],
            driveUrl: "https://drive.google.com/drive/folders/1KGPDaFx7jLsv3lza1RDg5wEt-2pRpjXX" // <-- Link Folder Google Drive Dokumentasi Lengkap
        },
        "2": {
            period: "2021 – 2026",
            title: "Guru Kelas SD",
            institution: "SDN Ngadirejo 03 Kecamatan Wonoasri",
            badges: [
                { text: "Kurikulum Merdeka", icon: "fas fa-book-open", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
                { text: "Media Pembelajaran", icon: "fas fa-cubes", color: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" },
                { text: "Pendampingan Siswa", icon: "fas fa-heart", color: "bg-pink-500/10 text-pink-400 border border-pink-500/20" }
            ],
            overview: "Bertanggung jawab membimbing perkembangan proses belajar mengajar anak didik di SDN Ngadirejo 03. Mendesain aneka media ajar kreatif dan membina kompetensi sosial emosional siswa secara holistik.",
            highlights: [
                "<strong>Pengembangan Media Pembelajaran Interaktif:</strong> Membuat dan menguji coba media ajar visual digital dan fisik yang meningkatkan partisipasi aktif siswa di kelas.",
                "<strong>Pembinaan Karakter & Sosial Emosional:</strong> Mengintegrasikan pembelajaran sosial emosional (PSE) untuk membentuk sikap saling menghargai dan disiplin murid.",
                "<strong>Penguatan Literasi-Numerasi:</strong> Inisiator program pojok baca kelas adaptif yang mendorong kebiasaan literasi membaca harian anak didik.",
                "<strong>Kemitraan Sekolah & Orang Tua:</strong> Membangun pola komunikasi transparan dengan wali murid untuk memantau capaian belajar anak secara berkala."
            ],
            // === BAGIAN FOTO DOKUMENTASI & GOOGLE DRIVE ===
            photos: [
                { 
                    url: "media_interaktif_mandiri.png", // <-- Ganti dengan "https://lh3.googleusercontent.com/d/ID_GOOGLE_DRIVE_ANDA" jika pakai Google Drive
                    caption: "Media Pembelajaran Interaktif Mandiri untuk Siswa SD" 
                },
                { 
                    url: "jurnal_ilmiah.png", 
                    caption: "Pengembangan Pojok Baca & Pembelajaran Kreatif di Kelas" 
                }
            ],
            driveUrl: "https://drive.google.com" // <-- Link Folder Google Drive
        },
        "3": {
            period: "2021 – 2021",
            title: "Koordinator & Helpdesk AKM",
            institution: "Kecamatan Mejayan (Tugas Tambahan)",
            badges: [
                { text: "IT Support AKM", icon: "fas fa-desktop", color: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
                { text: "Infrastruktur Ujian", icon: "fas fa-network-wired", color: "bg-teal-500/10 text-teal-400 border border-teal-500/20" },
                { text: "Troubleshooting", icon: "fas fa-screwdriver-wrench", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" }
            ],
            overview: "Menjadi ujung tombak teknis dalam mengoordinasikan kesiapan Asesmen Kompetensi Minimum (AKM) di wilayah Kecamatan Mejayan. Mengawal kelancaran sistem aplikasi ujian nasional serta menjadi jembatan pemecah masalah teknis sekolah-sekolah dasar.",
            highlights: [
                "<strong>Koordinasi Jaringan & Komputer:</strong> Memastikan kesiapan hardware, software VHD, proctoring client, dan stabilitas koneksi internet di seluruh SD sekecamatan.",
                "<strong>Layanan Helpdesk Real-time:</strong> Mengoperasikan pusat bantuan teknis cepat tanggap saat simulasi, gladi bersih, dan hari H pelaksanaan Asesmen Nasional.",
                "<strong>Pendampingan Proktor & Teknisi:</strong> Mengadakan briefing teknis dan menyusun panduan rujukan pemecahan masalah (troubleshooting) untuk tim sekolah.",
                "<strong>Capaian Kelancaran 100%:</strong> Berhasil mengawal pelaksanaan AKM tanpa hambatan data atau kebocoran sistem di seluruh SD Mejayan."
            ],
            // === BAGIAN FOTO DOKUMENTASI & GOOGLE DRIVE ===
            photos: [
                { 
                    url: "narasumber_konten_digital.png", // <-- Ganti dengan "https://lh3.googleusercontent.com/d/ID_GOOGLE_DRIVE_ANDA" jika pakai Google Drive
                    caption: "Koordinasi Teknis & Support Helpdesk AKM Kecamatan Mejayan" 
                },
                { 
                    url: "modul_ajar_ai.png", 
                    caption: "Pendampingan Infrastruktur Komputer & Ujian Asesmen Nasional" 
                }
            ],
            driveUrl: "https://drive.google.com" // <-- Link Folder Google Drive
        },
        "4": {
            period: "2017 – 2021",
            title: "Guru Kelas Merangkap Operator Sekolah",
            institution: "SDN Bangunsari 01 Kecamatan Mejayan",
            badges: [
                { text: "Ketua Operator Sekolah", icon: "fas fa-crown", color: "bg-accentGreen/10 text-accentGreen border border-accentGreen/20" },
                { text: "Korwil Mejayan", icon: "fas fa-map-marker-alt", color: "bg-accentGreen/10 text-accentGreen border border-accentGreen/20" },
                { text: "Tugas Ganda", icon: "fas fa-user-gear", color: "bg-purple-500/10 text-purple-400 border border-purple-500/20" }
            ],
            overview: "Mengampu tugas ganda sebagai guru kelas dan pemegang kunci administrasi data digital di SDN Bangunsari 01. Membantu sinkronisasi Dapodik dan ditunjuk menjadi Koordinator Wilayah Mejayan bagi operator sekolah dasar sekecamatan.",
            highlights: [
                "<strong>Tata Kelola Dapodik & Verval:</strong> Mengelola pembaruan basis data siswa, guru, sarpras, dan rombel sekolah dengan tingkat validasi 100%.",
                "<strong>Kepemimpinan Operator Kecamatan:</strong> Memimpin rapat koordinasi dan pembinaan teknis mingguan bagi seluruh operator SD di Korwil Mejayan.",
                "<strong>Penyaluran Bantuan Pendidikan:</strong> Memastikan data penerima Beasiswa PIP, Dana BOS, dan tunjangan pendidik terproses secara akurat tanpa hambatan.",
                "<strong>Pendidik Kelas Efektif:</strong> Tetap menjalankan peran pengajar utama dengan disiplin tinggi dan hasil pencapaian belajar siswa yang optimal."
            ],
            // === BAGIAN FOTO DOKUMENTASI & GOOGLE DRIVE ===
            photos: [
                { 
                    url: "pembimbing_ekstra_komputer.png", // <-- Ganti dengan "https://lh3.googleusercontent.com/d/ID_GOOGLE_DRIVE_ANDA" jika pakai Google Drive
                    caption: "Kegiatan Pembimbingan Ekstrakurikuler Komputer SDN Bangunsari 01" 
                },
                { 
                    url: "narasumber_konten_digital.png", 
                    caption: "Rapat Koordinasi Wilayah Operator Sekolah Dasar Mejayan" 
                }
            ],
            driveUrl: "https://drive.google.com" // <-- Link Folder Google Drive
        },
        "5": {
            period: "2008 – 2017",
            title: "Operator Sekolah",
            institution: "SDN Bangunsari 01 Kecamatan Mejayan",
            badges: [
                { text: "Ketua Operator Sekolah", icon: "fas fa-crown", color: "bg-accentGreen/10 text-accentGreen border border-accentGreen/20" },
                { text: "Korwil Mejayan", icon: "fas fa-map-marker-alt", color: "bg-accentGreen/10 text-accentGreen border border-accentGreen/20" },
                { text: "Pionir Digitalisasi", icon: "fas fa-database", color: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" }
            ],
            overview: "Mengawali kiprah mengelola basis data pokok sekolah dasar di SDN Bangunsari 01. Mengatur validasi sistem pelaporan nasional dan memimpin koordinasi operator sekolah sekecamatan.",
            highlights: [
                "<strong>Pelopor Migrasi Sistem Digital:</strong> Mengawal transisi pelaporan data sekolah dari format fisik/manual ke sistem pelaporan online Dapodikdas Kemdikbud.",
                "<strong>Pengarsipan & Digitalisasi Berkas:</strong> Mengklasifikasikan dokumen kepegawaian, ijazah siswa, dan inventaris sekolah ke dalam basis data digital terstruktur.",
                "<strong>Kemitraan Dinas Pendidikan:</strong> Menjadi jembatan komunikasi aktif antara sekolah dengan Dinas Pendidikan Kabupaten Madiun.",
                "<strong>Penghargaan Dedikasi Servis:</strong> Menjaga konsistensi ketepatan waktu pelaporan data sekolah selama 9 tahun berturut-turut."
            ],
            // === BAGIAN FOTO DOKUMENTASI & GOOGLE DRIVE ===
            photos: [
                { 
                    url: "narasumber_konten_digital.png", // <-- Ganti dengan "https://lh3.googleusercontent.com/d/ID_GOOGLE_DRIVE_ANDA" jika pakai Google Drive
                    caption: "Pengelolaan Basis Data Pokok Pendidikan (Dapodik) Sekolah" 
                },
                { 
                    url: "pembimbing_ekstra_komputer.png", 
                    caption: "Digitalisasi Arsip & Administrasi Kepegawaian Sekolah" 
                }
            ],
            driveUrl: "https://drive.google.com" // <-- Link Folder Google Drive
        },
        "6": {
            period: "Lulus 2025",
            title: "Magister Pendidikan (M.Pd.)",
            institution: "Universitas Negeri Surabaya (UNESA) — Program Studi Pendidikan Luar Biasa",
            badges: [
                { text: "Pascasarjana S2", icon: "fas fa-graduation-cap", color: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
                { text: "Pendidikan Inklusif", icon: "fas fa-hands-holding-child", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
                { text: "Riset Kurikulum", icon: "fas fa-flask", color: "bg-sky-500/10 text-sky-400 border border-sky-500/20" }
            ],
            overview: "Lulus program pascasarjana dengan fokus riset terapan di bidang kurikulum adaptif, pembelajaran berbasis projek penguatan karakter, serta implementasi strategi pendidikan inklusif bagi anak-anak didik berkebutuhan khusus.",
            highlights: [
                "<strong>Gelar Akademik M.Pd.:</strong> Meraih gelar Magister Pendidikan dari UNESA dengan spesialisasi pendidikan inklusi dan anak berkebutuhan khusus (PDBK).",
                "<strong>Penyusunan Program Pembelajaran Individual (PPI):</strong> Menguasai metodologi perancangan PPI adaptif untuk mengoptimalkan potensi belajar siswa berkebutuhan khusus.",
                "<strong>Riset Strategi Diferensiasi:</strong> Melakukan penelitian mendalam terkait integrasi metode diferensiasi konten, proses, dan produk dalam kelas inklusif SD.",
                "<strong>Karya Ilmiah & Seminar:</strong> Aktif mempublikasikan temuan riset dan menjadi pemapar dalam forum kajian akademis pendidikan ramah anak."
            ],
            // === BAGIAN FOTO DOKUMENTASI & GOOGLE DRIVE ===
            photos: [
                { 
                    url: "penelitian_inklusi.png", // <-- Ganti dengan "https://lh3.googleusercontent.com/d/ID_GOOGLE_DRIVE_ANDA" jika pakai Google Drive
                    caption: "Riset Tesis Pembelajaran Inklusif UNESA Surabaya" 
                },
                { 
                    url: "jurnal_ilmiah.png", 
                    caption: "Publikasi Karya Ilmiah Program Pascasarjana (M.Pd.)" 
                }
            ],
            driveUrl: "https://drive.google.com" // <-- Link Folder Google Drive
        },
        "7": {
            period: "Lulus 2014",
            title: "Sarjana Hukum (SH)",
            institution: "Universitas Merdeka — Fakultas Hukum",
            badges: [
                { text: "Sarjana Hukum S1", icon: "fas fa-scale-balanced", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
                { text: "Hukum Perdata & HTN", icon: "fas fa-gavel", color: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" },
                { text: "Literasi PPKn", icon: "fas fa-landmark", color: "bg-rose-500/10 text-rose-400 border border-rose-500/20" }
            ],
            overview: "Menempuh pendidikan hukum perdata dan tata negara. Pengetahuan perundang-undangan menjadi fondasi kokoh untuk merancang pembelajaran Pancasila dan Kewarganegaraan yang faktual.",
            highlights: [
                "<strong>Gelar Akademik S.H.:</strong> Lulus Sarjana Hukum dengan pemahaman mendalam tentang sistem hukum Indonesia, regulasi pendidikan, dan tata negara.",
                "<strong>Penguatan Literasi Pancasila & Hukum:</strong> Memanfaatkan dasar keilmuan hukum untuk mengajarkan nilai-nilai konstitusi, etika warganegara, dan kedisiplinan pada siswa dasar.",
                "<strong>Advokasi Hak Anak & Regulasi:</strong> Memahami aspek legalitas hak perlindungan anak serta regulasi kelembagaan satuan pendidikan.",
                "<strong>Analisis Logis & Penalaran Normatif:</strong> Mengembangkan kerangka berpikir kritis yang solutif dalam pemecahan masalah pembelajaran dan organisasi sekolah."
            ],
            // === BAGIAN FOTO DOKUMENTASI & GOOGLE DRIVE ===
            photos: [
                { 
                    url: "profile.png", // <-- Ganti dengan "https://lh3.googleusercontent.com/d/ID_GOOGLE_DRIVE_ANDA" jika pakai Google Drive
                    caption: "Dokumentasi Akademik Sarjana Hukum (S.H.) Universitas Merdeka" 
                },
                { 
                    url: "jurnal_ilmiah.png", 
                    caption: "Kajian Literasi Hukum & Pendidikan Kewarganegaraan" 
                }
            ],
            driveUrl: "https://drive.google.com" // <-- Link Folder Google Drive
        }
    };

    const timelineModal = document.getElementById('timelineModal');
    const modalBackdrop = document.getElementById('timelineModalBackdrop');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalFooterCloseBtn = document.getElementById('modalFooterCloseBtn');

    // Helper to auto-convert any Google Drive link format into direct displayable image URL
    const formatImageUrl = (url) => {
        if (!url) return '';
        if (url.includes('drive.google.com')) {
            let fileId = '';
            const fileDMatch = url.match(/\/file\/d\/([^\/]+)/);
            if (fileDMatch && fileDMatch[1]) {
                fileId = fileDMatch[1];
            } else {
                const idMatch = url.match(/[?&]id=([^&]+)/);
                if (idMatch && idMatch[1]) {
                    fileId = idMatch[1];
                }
            }
            if (fileId) {
                fileId = fileId.split('?')[0].split('&')[0];
                return `https://lh3.googleusercontent.com/d/${fileId}`;
            }
        }
        return url;
    };

    const openTimelineModal = (id) => {
        const data = timelineData[id];
        if (!data || !timelineModal) return;

        const periodEl = document.getElementById('modalPeriod');
        const titleEl = document.getElementById('modalTitle');
        const instEl = document.getElementById('modalInstitution');
        const overviewEl = document.getElementById('modalOverview');
        const tagsContainer = document.getElementById('modalTags');
        const highlightsContainer = document.getElementById('modalHighlights');

        if (periodEl) periodEl.innerText = data.period;
        if (titleEl) titleEl.innerText = data.title;
        if (instEl) instEl.innerText = data.institution;
        if (overviewEl) overviewEl.innerText = data.overview;

        // Render badges
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            data.badges.forEach(b => {
                const badgeSpan = document.createElement('span');
                badgeSpan.className = `text-xs font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1.5 ${b.color}`;
                badgeSpan.innerHTML = `<i class="${b.icon}"></i> ${b.text}`;
                tagsContainer.appendChild(badgeSpan);
            });
        }

        // Render highlights
        if (highlightsContainer) {
            highlightsContainer.innerHTML = '';
            data.highlights.forEach(h => {
                const li = document.createElement('li');
                li.className = 'flex items-start gap-2.5 bg-bgDark/40 p-3 rounded-xl border border-textSand/5';
                li.innerHTML = `<i class="fas fa-circle-check text-accentGreen mt-1 text-xs shrink-0"></i><div class="leading-relaxed">${h}</div>`;
                highlightsContainer.appendChild(li);
            });
        }

        // Render photo gallery
        const featuredPhoto = document.getElementById('modalFeaturedPhoto');
        const photoCaption = document.getElementById('modalPhotoCaption');
        const thumbnailsContainer = document.getElementById('modalThumbnails');
        const photoCount = document.getElementById('modalPhotoCount');
        const driveBtn = document.getElementById('modalDriveBtn');

        if (data.photos && data.photos.length > 0) {
            if (photoCount) photoCount.innerText = `${data.photos.length} Foto Kegiatan`;
            const firstPhotoUrl = formatImageUrl(data.photos[0].url);
            if (featuredPhoto) {
                featuredPhoto.src = firstPhotoUrl;
                featuredPhoto.alt = data.photos[0].caption || data.title;
                featuredPhoto.onerror = function() {
                    this.src = 'modul_ajar_ai.png'; // Clean fallback if Drive link is private or invalid
                };
            }
            if (photoCaption) photoCaption.innerText = data.photos[0].caption || '';

            if (thumbnailsContainer) {
                thumbnailsContainer.innerHTML = '';
                data.photos.forEach((photo, idx) => {
                    const formattedUrl = formatImageUrl(photo.url);
                    const thumb = document.createElement('button');
                    thumb.type = 'button';
                    thumb.className = `relative h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${idx === 0 ? 'border-accentGreen ring-2 ring-accentGreen/30' : 'border-textSand/10 opacity-60 hover:opacity-100'}`;
                    thumb.innerHTML = `<img src="${formattedUrl}" alt="${photo.caption || ''}" class="w-full h-full object-cover" onerror="this.src='modul_ajar_ai.png'">`;
                    
                    thumb.addEventListener('click', () => {
                        // Highlight active thumbnail
                        const allThumbs = thumbnailsContainer.querySelectorAll('button');
                        allThumbs.forEach(t => t.className = 'relative h-14 rounded-lg overflow-hidden border-2 border-textSand/10 opacity-60 hover:opacity-100 transition-all cursor-pointer');
                        thumb.className = 'relative h-14 rounded-lg overflow-hidden border-2 border-accentGreen ring-2 ring-accentGreen/30 transition-all cursor-pointer';

                        // Change featured photo with smooth transition
                        if (featuredPhoto) {
                            featuredPhoto.style.opacity = '0';
                            setTimeout(() => {
                                featuredPhoto.src = formattedUrl;
                                featuredPhoto.alt = photo.caption || data.title;
                                featuredPhoto.style.opacity = '1';
                            }, 150);
                        }
                        if (photoCaption) photoCaption.innerText = photo.caption || '';
                    });

                    thumbnailsContainer.appendChild(thumb);
                });
            }
        } else {
            if (photoCount) photoCount.innerText = '0 Foto';
            if (thumbnailsContainer) thumbnailsContainer.innerHTML = '';
        }

        // Render Google Drive button
        if (driveBtn) {
            if (data.driveUrl) {
                driveBtn.href = data.driveUrl;
                driveBtn.style.display = 'flex';
            } else {
                driveBtn.style.display = 'none';
            }
        }

        // Reset to default active tab (Both Sejajar) when opened
        setActiveTab('both');

        // Open animation
        const modalCard = timelineModal.querySelector('.relative.w-full');
        timelineModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Lock background scroll

        setTimeout(() => {
            timelineModal.classList.remove('opacity-0', 'pointer-events-none');
            timelineModal.classList.add('opacity-100', 'pointer-events-auto');
            if (modalCard) {
                modalCard.classList.remove('scale-95');
                modalCard.classList.add('scale-100');
            }
        }, 10);
    };

    const closeTimelineModal = () => {
        if (!timelineModal) return;
        const modalCard = timelineModal.querySelector('.relative.w-full');

        timelineModal.classList.remove('opacity-100', 'pointer-events-auto');
        timelineModal.classList.add('opacity-0', 'pointer-events-none');
        if (modalCard) {
            modalCard.classList.remove('scale-100');
            modalCard.classList.add('scale-95');
        }

        setTimeout(() => {
            timelineModal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore background scroll
        }, 300);
    };

    // Modal Tab Navigation Elements & Logic
    const tabBtnBoth = document.getElementById('tabBtnBoth');
    const tabBtnDetails = document.getElementById('tabBtnDetails');
    const tabBtnPhotos = document.getElementById('tabBtnPhotos');
    const panelLeft = document.getElementById('modalPanelLeft');
    const panelRight = document.getElementById('modalPanelRight');
    const featuredContainer = document.getElementById('modalFeaturedContainer');

    const setActiveTab = (activeTab) => {
        if (!panelLeft || !panelRight) return;

        // Reset Tab Styles
        [tabBtnBoth, tabBtnDetails, tabBtnPhotos].forEach(btn => {
            if (btn) {
                btn.className = 'modal-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-medium text-textSand/70 hover:text-textSand hover:bg-textSand/10 border border-textSand/10 transition-all flex items-center gap-1.5';
            }
        });

        if (activeTab === 'both') {
            if (tabBtnBoth) tabBtnBoth.className = 'modal-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-accentGreen/15 text-accentGreen border border-accentGreen/30 transition-all flex items-center gap-1.5';
            panelLeft.classList.remove('hidden', 'col-span-12');
            panelLeft.classList.add('col-span-12', 'md:col-span-6');
            panelRight.classList.remove('hidden', 'col-span-12');
            panelRight.classList.add('col-span-12', 'md:col-span-6');
            if (featuredContainer) {
                featuredContainer.className = 'relative w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-[350px] rounded-xl overflow-hidden bg-black/60 border border-textSand/15 group/photo shadow-md transition-all';
            }
        } else if (activeTab === 'details') {
            if (tabBtnDetails) tabBtnDetails.className = 'modal-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-accentGreen/15 text-accentGreen border border-accentGreen/30 transition-all flex items-center gap-1.5';
            panelLeft.classList.remove('hidden', 'md:col-span-6');
            panelLeft.classList.add('col-span-12');
            panelRight.classList.add('hidden');
        } else if (activeTab === 'photos') {
            if (tabBtnPhotos) tabBtnPhotos.className = 'modal-tab-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 transition-all flex items-center gap-1.5 shadow-lg';
            panelLeft.classList.add('hidden');
            panelRight.classList.remove('hidden', 'md:col-span-6');
            panelRight.classList.add('col-span-12');
            if (featuredContainer) {
                featuredContainer.className = 'relative w-full h-64 sm:h-96 md:h-[450px] rounded-xl overflow-hidden bg-black/60 border border-textSand/15 group/photo shadow-md transition-all';
            }
        }
    };

    if (tabBtnBoth) tabBtnBoth.addEventListener('click', () => setActiveTab('both'));
    if (tabBtnDetails) tabBtnDetails.addEventListener('click', () => setActiveTab('details'));
    if (tabBtnPhotos) tabBtnPhotos.addEventListener('click', () => setActiveTab('photos'));

    // Attach click listener to timeline cards
    const timelineCards = document.querySelectorAll('.timeline-card');
    timelineCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-timeline-id');
            if (id) {
                openTimelineModal(id);
            }
        });
    });

    // Close event listeners
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeTimelineModal);
    if (modalFooterCloseBtn) modalFooterCloseBtn.addEventListener('click', closeTimelineModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeTimelineModal);

    // Escape key press to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && timelineModal && !timelineModal.classList.contains('hidden')) {
            closeTimelineModal();
        }
    });
});
