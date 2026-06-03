/**
 * NurulQuran Landing Page JavaScript Core - Version 1.04
 * Handles Multi-Language Translation (EN, FR, UR, NO), RTL switching, Theme Toggle Cycle (Light -> Dark -> Nature),
 * nature video play/pause, floating Quran audio player, scroll indicator,
 * and high-fidelity carousel logic with resume-on-mouseleave timeline filling bar.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 0. Register Service Worker (PWA)
    // ==========================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('Service Worker registered successfully.', reg.scope))
                .catch(err => console.log('Service Worker registration failed.', err));
        });
    }

    // ==========================================
    // 1. Language Translation Database & Logic
    // ==========================================
    const translations = {
        en: {
            current_lang: "English",
            hero_badge: "نُورُ القُرْآن",
            hero_title: "Light of the Quran",
            hero_subtitle: "Bismillah, Connecting Hearts to Divine Guidance - Explore NurulQuran Resources.",
            desc_nq_main: "The main central hub for online Islamic courses, book store, admissions, and structured curriculum.",
            desc_nq_intl: "Explore a massive digital catalog of audios, lectures, and series categorization in various languages.",
            desc_nq_live: "Tune in to real-time online broadcasts, Ramadan special courses, and live interactive lectures.",
            desc_tafseer: "A dedicated Web App featuring deep Quranic explanations, lectures, translations, and notes.",
            desc_iqra: "Interactive Quran reading assistant. Access translation, word-by-word analysis, and recitations.",
            desc_urdu: "Dedicated web portal for Urdu-speaking students, compiling extensive audio collections and transcripts.",
            desc_norway: "Connect with our active regional branch in Norway for local courses, seminars, and Nordic communities.",
            desc_uk: "Access educational courses and events organized for the UK community and Islamic studies academic networks.",
            app_ios_desc: "Download official apps on your iPhone or iPad for seamless offline playback of lectures and Quran recitations.",
            app_android_desc: "Access Android applications featuring full Tafseer libraries, audio streaming, and automatic notification alerts.",
            founder_tag: "FOUNDER & INSTRUCTOR",
            founder_bio: "Connecting global listeners with deep knowledge of Quranic Tafseer, Hadith studies, and Islamic ethics. Explore her active channels and broadcasts below.",
            visit_portal: "Visit Portal",
            launch_app: "Launch Web App",
            footer_tagline: "Connecting humanity with the divine light of the Noble Quran.",
            footer_contact: "Contact",
            design_note: "Version 1.04"
        },
        fr: {
            current_lang: "Français",
            hero_badge: "نُورُ القُرْآن",
            hero_title: "La lumière du Coran",
            hero_subtitle: "Bismillah, Connecter les cœurs à la guidance divine - Explorez les ressources de NurulQuran.",
            desc_nq_main: "Le hub central principal pour les cours islamiques en ligne, la librairie, les admissions et le programme structuré.",
            desc_nq_intl: "Explorez un vaste catalogue numérique d'audios, de conférences et de catégorisations de séries en plusieurs langues.",
            desc_nq_live: "Écoutez les diffusions en ligne en temps réel, les cours spéciaux du Ramadan et les conférences interactives en direct.",
            desc_tafseer: "Une application web dédiée proposant des explications coraniques approfondies, des conférences, des traductions et des notes.",
            desc_iqra: "Assistant interactif de lecture du Coran. Accédez à la traduction, à l'analyse mot à mot et aux récitations.",
            desc_urdu: "Portail web dédié aux étudiants de langue ourdoue, regroupant d'importantes collections audio et transcriptions.",
            desc_norway: "Connectez-vous avec notre branche régionale active en Norvège pour des cours locaux, des séminaires et des communautés nordiques.",
            desc_uk: "Accédez aux cours éducatifs et aux événements organisés pour la communauté du Royaume-Uni et les réseaux académiques.",
            app_ios_desc: "Téléchargez les applications officielles sur votre iPhone ou iPad pour une lecture hors ligne fluide des conférences et récitations coraniques.",
            app_android_desc: "Accédez aux applications Android comprenant des bibliothèques complètes de Tafseer, le streaming audio et des alertes de notification automatiques.",
            founder_tag: "FONDATRICE & ENSEIGNANTE",
            founder_bio: "Connecter les auditeurs du monde entier avec une connaissance approfondie du Tafseer coranique, des études de Hadith et de l'éthique islamique. Explorez ses canaux actifs et ses diffusions ci-dessous.",
            visit_portal: "Visiter le portail",
            launch_app: "Lancer l'application",
            footer_tagline: "Connecter l'humanité avec la lumière divine du Noble Coran.",
            footer_contact: "Contact",
            design_note: "Version 1.04"
        },
        ur: {
            current_lang: "اردو",
            hero_badge: "نُورُ القُرْآن",
            hero_title: "نور القرآن",
            hero_subtitle: "بسم اللہ، دلوں کو ہدایتِ ربّانی سے جوڑنا - نور القرآن کے تعلیمی وسائل تلاش کریں۔",
            desc_nq_main: "تفسیرِ قرآن اور اسلامی تعلیمات کا مرکزی پورٹل جہاں داخلے، آن لائن کورسز اور کتب دستیاب ہیں۔",
            desc_nq_intl: "مختلف موضوعات پر آڈیوز، تقاریر اور لیکچرز کا ایک وسیع اور منظم بین الاقوامی ذخیرہ۔",
            desc_nq_live: "رمضان کے خصوصی پروگرامز، دروس اور براہِ راست نشریات کا لائیو سٹریمنگ پورٹل۔",
            desc_tafseer: "قرآنِ مجید کی تفصیلی تفاسیر، آڈیو لیکچرز، اور تحریری نوٹس پر مشتمل خصوصی ویب ایپ۔",
            desc_iqra: "لفظ بہ لفظ ترجمہ، تجوید، تلاوت اور سورتوں کے ساتھ قرآن پڑھنے کا جدید معلوماتی پورٹل۔",
            desc_urdu: "اردو زبان میں لیکچرز، آڈیو ریکارڈنگز، اور تعلیمی مواد کا مخصوص ڈیجیٹل مرکز۔",
            desc_norway: "ناروے میں کورسز، سیمینارز اور مقامی مسلم کمیونٹی سے جڑنے کے لیے ناروے برانچ کا پورٹل۔",
            desc_uk: "برطانیہ کی کمیونٹی اور اکیڈمک نیٹ ورکس کے لیے منظم کردہ کورسز اور سیمینارز تک رسائی حاصل کریں۔",
            app_ios_desc: "آئی فون یا آئی پیڈ کے لیے آفیشل ایپس ڈاؤن لوڈ کریں اور آف لائن دروس اور تلاوت سے استفادہ کریں۔",
            app_android_desc: "اینڈرائیڈ ایپس حاصل کریں جن میں تفصیلی تفسیر لائبریریز، لائیو ریڈیو اور اہم اعلانات شامل ہیں۔",
            founder_tag: "بانی و معلمہ",
            founder_bio: "عالمی سامعین کو قرآنی تفسیر، احادیث اور اسلامی اخلاقیات کے گہرے علم سے روشناس کرانا۔ ان کے تمام فعال چینلز اور براہِ راست پورٹلز درج ذیل ہیں۔",
            visit_portal: "پورٹل پر جائیں",
            launch_app: "ویب ایپ کھولیں",
            footer_tagline: "انسانیت کو قرآنِ مجید کے نور اور ابدی رہنمائی سے جوڑنا۔",
            footer_contact: "رابطہ کریں",
            design_note: "ورژن 1.04"
        },
        no: {
            current_lang: "Norsk",
            hero_badge: "نُورُ القُرْآن",
            hero_title: "Quranens Lys",
            hero_subtitle: "Bismillah, Kobler hjerter til guddommelig veiledning - Utforsk NurulQuran Ressurser.",
            desc_nq_main: "Hovedsenteret for online islamske kurs, bokhandel, opptak og strukturert pensum.",
            desc_nq_intl: "Utforsk en enorm digital katalog med lydfiler, forelesninger og seriekategorisering på forskjellige språk.",
            desc_nq_live: "Følg med på direktesendinger i sanntid, spesielle Ramadan-kurs og interaktive forelesninger live.",
            desc_tafseer: "En dedikert nettapp med detaljerte forklaringer av Koranen, forelesninger, oversettelser og notater.",
            desc_iqra: "Interaktiv leseassistent for Koranen. Få tilgang til oversettelse, ord-for-ord-analyse og resitasjoner.",
            desc_urdu: "Egen nettportal for urdu-talende studenter, med et stort utvalg av lydopptak og transkripsjoner.",
            desc_norway: "Koble deg til vår aktive regionale avdeling i Norge for lokale kurs, seminarer og nordiske fellesskap.",
            desc_uk: "Få tilgang til utdanningskurs og arrangementer organisert for det britiske samfunnet og akademiske nettverk.",
            app_ios_desc: "Last ned offisielle apper på din iPhone or iPad for sømløs offline avspilling av forelesninger og Koran-resitasjoner.",
            app_android_desc: "Få tilgang til Android-apper med komplette Tafseer-biblioteker, lydstrømming og automatiske varsler.",
            founder_tag: "GRUNNLEGGER OG INSTRUKTØR",
            founder_bio: "Kobler globale lyttere til dyp kunnskap om Koranens Tafseer, Hadith-studier og islamsk etikk. Utforsk hennes aktive kanaler og sendinger nedenfor.",
            visit_portal: "Besøk Portal",
            launch_app: "Åpne Nettapp",
            footer_tagline: "Koble menneskeheten til det guddommelige lyset fra den edle Koranen.",
            footer_contact: "Kontakt",
            design_note: "Versjon 1.04"
        }
    };

    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');
    const currentLangLabel = document.getElementById('currentLangLabel');
    const htmlElement = document.documentElement;

    // Toggle Dropdown Menu
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wrapper = langBtn.parentElement;
        const isOpen = wrapper.classList.contains('open');
        
        if (isOpen) {
            wrapper.classList.remove('open');
            langBtn.setAttribute('aria-expanded', 'false');
        } else {
            wrapper.classList.add('open');
            langBtn.setAttribute('aria-expanded', 'true');
        }
    });

    // Close Dropdown when clicking outside
    document.addEventListener('click', () => {
        langBtn.parentElement.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
    });

    // Switch Language Handler
    const setLanguage = (lang) => {
        if (!translations[lang]) return;

        // Set direction based on language
        if (lang === 'ur') {
            htmlElement.setAttribute('dir', 'rtl');
            htmlElement.setAttribute('lang', 'ur');
        } else {
            htmlElement.setAttribute('dir', 'ltr');
            htmlElement.setAttribute('lang', lang);
        }

        // Update active class in menu
        const menuItems = langMenu.querySelectorAll('li');
        menuItems.forEach(item => {
            if (item.getAttribute('data-lang') === lang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update Label
        currentLangLabel.textContent = translations[lang].current_lang;

        // Translate Static IDs
        document.getElementById('heroBadge').textContent = translations[lang].hero_badge;
        document.getElementById('heroTitle').textContent = translations[lang].hero_title;
        document.getElementById('heroSubtitle').textContent = translations[lang].hero_subtitle;

        // Translate elements with data-translate attribute
        const translatableElements = document.querySelectorAll('[data-translate]');
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Retrigger carousel slide alignment to adjust LTR/RTL offset directions
        updateCarousel();

        // Save selection
        localStorage.setItem('nq_language', lang);
    };

    // Add click listeners to options
    langMenu.addEventListener('click', (e) => {
        const selectedOption = e.target.closest('li');
        if (!selectedOption) return;

        const lang = selectedOption.getAttribute('data-lang');
        setLanguage(lang);
    });


    // ==========================================
    // 2. Three-State Light / Dark / Nature Theme
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const natureVideo = document.getElementById('natureVideo');
    const themes = ['light', 'dark', 'nature'];

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('nq_theme', theme);
        
        // Dynamic background video control (Preload none, load on demand)
        if (theme === 'nature') {
            if (natureVideo.readyState === 0) {
                natureVideo.load();
            }
            natureVideo.play().catch(err => console.log("Video autoplay blocked", err));
        } else {
            natureVideo.pause();
        }
    };

    // Toggle theme cycling action
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    });


    // ==========================================
    // 3. Dynamic Card Carousel Logic (8s Timer + Freeze & Resume via requestAnimationFrame)
    // ==========================================
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselDotsContainer = document.getElementById('carouselDots');
    const carouselProgressFill = document.getElementById('carouselProgressFill');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const slides = Array.from(carouselTrack.children);
    
    const SLIDE_DURATION = 8000; // 8 seconds
    let currentSlideIndex = 0;
    
    let elapsed = 0;
    let lastTime = performance.now();
    let animationFrameId = null;
    let isPaused = false;

    // Create navigation dots dynamically based on slide count
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('data-dot-index', index);
        carouselDotsContainer.appendChild(dot);
    });

    const dots = Array.from(carouselDotsContainer.children);

    const updateCarousel = () => {
        const isRTL = htmlElement.getAttribute('dir') === 'rtl';
        const offset = isRTL ? (currentSlideIndex * 100) : -(currentSlideIndex * 100);
        carouselTrack.style.transform = `translateX(${offset}%)`;
        
        // Update dot indicators
        dots.forEach((dot, index) => {
            if (index === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const moveToSlide = (index) => {
        if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlideIndex = 0;
        } else {
            currentSlideIndex = index;
        }
        updateCarousel();
        
        // Reset progress tracking
        elapsed = 0;
        carouselProgressFill.style.width = '0%';
        
        // Match current hover state of the wrapper to maintain paused state if hovered
        isPaused = carouselWrapper.matches(':hover');
        lastTime = performance.now();
    };

    // Control triggers
    carouselPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        moveToSlide(currentSlideIndex - 1);
    });

    carouselNext.addEventListener('click', (e) => {
        e.stopPropagation();
        moveToSlide(currentSlideIndex + 1);
    });

    carouselDotsContainer.addEventListener('click', (e) => {
        const clickedDot = e.target.closest('.carousel-dot');
        if (!clickedDot) return;
        
        const dotIndex = parseInt(clickedDot.getAttribute('data-dot-index'));
        moveToSlide(dotIndex);
    });

    // Hover listeners to pause/resume timelines seamlessly
    carouselWrapper.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    carouselWrapper.addEventListener('mouseleave', () => {
        isPaused = false;
        lastTime = performance.now(); // Reset lastTime to prevent dt spike
    });

    // requestAnimationFrame tick loop
    const tick = (now) => {
        const dt = now - lastTime;
        lastTime = now;

        if (!isPaused) {
            elapsed += dt;
            if (elapsed >= SLIDE_DURATION) {
                elapsed = 0;
                moveToSlide(currentSlideIndex + 1);
            } else {
                carouselProgressFill.style.width = `${(elapsed / SLIDE_DURATION) * 100}%`;
            }
        }

        animationFrameId = requestAnimationFrame(tick);
    };

    // Start the animation loop
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(tick);


    // ==========================================
    // 4. Floating Quran Audio Player (050shatri.mp3)
    // ==========================================
    const quranAudio = document.getElementById('quranAudio');
    const playerToggleBtn = document.getElementById('playerToggleBtn');
    const floatingAudioPlayer = document.getElementById('floatingAudioPlayer');

    playerToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (quranAudio.paused) {
            quranAudio.play()
                .then(() => {
                    floatingAudioPlayer.classList.add('playing');
                })
                .catch(err => console.log("Audio play blocked.", err));
        } else {
            quranAudio.pause();
            floatingAudioPlayer.classList.remove('playing');
        }
    });

    // Reset visualizer when audio ends
    quranAudio.addEventListener('ended', () => {
        floatingAudioPlayer.classList.remove('playing');
    });


    // ==========================================
    // 5. Scroll Indicator Fading Operations
    // ==========================================
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });


    // ==========================================
    // 6. System Preferences & State Recovery
    // ==========================================
    // Restore Language
    const savedLanguage = localStorage.getItem('nq_language');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    } else {
        setLanguage('en');
    }

    // Restore Theme
    const savedTheme = localStorage.getItem('nq_theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Carousel loop initialized automatically.


    // ==========================================
    // 7. Subtle Card Reveal Scroll Animations
    // ==========================================
    const revealCards = document.querySelectorAll('.portal-card, .branch-card, .app-card, .lecturer-banner');
    
    revealCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), border-color var(--transition-normal), background-color var(--transition-normal), box-shadow var(--transition-normal)';
    });

    const revealOnScroll = () => {
        revealCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 50;

            if (cardTop < triggerPoint) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    setTimeout(revealOnScroll, 100);
});
