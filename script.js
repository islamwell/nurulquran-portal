/**
 * NurulQuran Landing Page JavaScript Core - Version 1.07
 * Handles: Multi-Language Translation (EN, FR, UR, NO), RTL switching,
 * Theme Toggle (Light <-> Dark), floating Quran audio player with playlist,
 * floating Quran audio player with playlist + volume + progress bar,
 * scroll indicator, search/filter, back-to-top, keyboard navigation,
 * touch swipe for carousel, and announcement banner system.
 */

// ============================================================================
// ██████  ANNOUNCEMENT CONFIGURATION  ██████
// ============================================================================
// ✏️  TO ADD/EDIT ANNOUNCEMENTS — just edit this array!
//     Each entry: { text, link (optional), linkText (optional), enabled }
//     Set enabled: false to hide without deleting.
//     HTML inside text is allowed (for bold, etc.)
//     Only the FIRST enabled announcement is shown.
// ============================================================================
const ANNOUNCEMENTS = [
    {
        text: "📖 Programs for everyone!",
        link: "https://nurulquran.web.app/#programs",
        linkText: "View Programs",
        enabled: true
    },
    // Add more announcements below. Only the first enabled one is displayed.
    // {
    //     text: "🌙 Ramadan Mubarak! Special courses available.",
    //     link: "https://nurulquran.com",
    //     linkText: "View Courses",
    //     enabled: false
    // },
];
// ============================================================================


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
            hero_subtitle: "In the name of Allah, the Merciful, the Kind. Connecting Hearts to Divine Guidance — Explore NurulQuran Resources.",
            desc_nq_main: "The main central hub for online Islamic courses, book store, admissions, and structured curriculum.",
            desc_nq_intl: "Explore a massive digital catalog of audios, lectures, and series categorization in various languages.",
            desc_nq_live: "Tune in to real-time online broadcasts, Ramadan special courses, and live interactive lectures.",
            desc_tafseer: "A dedicated Web App featuring deep Quranic explanations, lectures, translations, and notes.",
            desc_iqra: "Interactive Quran reading assistant. Access translation, word-by-word analysis, and recitations.",
            desc_urdu: "Dedicated web portal for Urdu-speaking students, compiling extensive audio collections and transcripts.",
            desc_norway: "Connect with our active regional branch in Norway for local courses, seminars, and Nordic communities.",
            desc_uk: "Access educational courses and events organized for the UK community and Islamic studies academic networks.",
            desc_pakistan: "Local branch serving the Pakistani community with courses, events, and Urdu-language Islamic education.",
            desc_usa: "The US branch connecting American communities with Islamic courses, study circles, and outreach programs.",
            desc_ios_audio: "Official iPhone & iPad app for seamless offline playback of lectures, Quran recitations, and audio series.",
            desc_ios_dua: "A curated collection of authentic duas for daily life, categorized by occasion, with Arabic text and translations.",
            desc_android: "Full Tafseer libraries, audio streaming, and notification alerts — available on Google Play for all Android devices.",
            app_ios_desc: "Download official apps on your iPhone or iPad for seamless offline playback of lectures and Quran recitations.",
            app_android_desc: "Access Android applications featuring full Tafseer libraries, audio streaming, and automatic notification alerts.",
            founder_tag: "FOUNDER & INSTRUCTOR",
            founder_bio: "Connecting global listeners with deep knowledge of Quranic Tafseer, Hadith studies, and Islamic ethics. Explore her active channels and broadcasts below.",
            visit_portal: "Visit Portal",
            launch_app: "Launch Web App",
            download_app: "Download App",
            search_placeholder: "Search portals, apps, branches...",
            search_no_results: "No results found.",
            footer_tagline: "Connecting humanity with the divine light of the Noble Quran.",
            footer_contact: "Contact",
            design_note: "v1.2.0 (updated 2026-08-02 00:57)"
        },
        fr: {
            current_lang: "Français",
            hero_badge: "نُورُ القُرْآن",
            hero_title: "La lumière du Coran",
            hero_subtitle: "Au nom d'Allah, le Miséricordieux, le Bienveillant. Connecter les cœurs à la guidance divine — Explorez les ressources de NurulQuran.",
            desc_nq_main: "Le hub central principal pour les cours islamiques en ligne, la librairie, les admissions et le programme structuré.",
            desc_nq_intl: "Explorez un vaste catalogue numérique d'audios, de conférences et de catégorisations de séries en plusieurs langues.",
            desc_nq_live: "Écoutez les diffusions en ligne en temps réel, les cours spéciaux du Ramadan et les conférences interactives en direct.",
            desc_tafseer: "Une application web dédiée proposant des explications coraniques approfondies, des conférences, des traductions et des notes.",
            desc_iqra: "Assistant interactif de lecture du Coran. Accédez à la traduction, à l'analyse mot à mot et aux récitations.",
            desc_urdu: "Portail web dédié aux étudiants de langue ourdoue, regroupant d'importantes collections audio et transcriptions.",
            desc_norway: "Connectez-vous avec notre branche régionale active en Norvège pour des cours locaux, des séminaires et des communautés nordiques.",
            desc_uk: "Accédez aux cours éducatifs et aux événements organisés pour la communauté du Royaume-Uni et les réseaux académiques.",
            desc_pakistan: "Branche locale au service de la communauté pakistanaise avec des cours, des événements et une éducation islamique en ourdou.",
            desc_usa: "La branche américaine connectant les communautés avec des cours islamiques, des cercles d'études et des programmes de sensibilisation.",
            desc_ios_audio: "Application officielle iPhone et iPad pour une écoute hors ligne fluide de conférences, récitations coraniques et séries audio.",
            desc_ios_dua: "Une collection soigneusement sélectionnée de duas authentiques pour la vie quotidienne, classées par occasion, avec texte arabe et traductions.",
            desc_android: "Bibliothèques complètes de Tafseer, streaming audio et alertes de notification — disponible sur Google Play pour tous les appareils Android.",
            app_ios_desc: "Téléchargez les applications officielles sur votre iPhone ou iPad pour une lecture hors ligne fluide des conférences et récitations coraniques.",
            app_android_desc: "Accédez aux applications Android comprenant des bibliothèques complètes de Tafseer, le streaming audio et des alertes de notification automatiques.",
            founder_tag: "FONDATRICE & ENSEIGNANTE",
            founder_bio: "Connecter les auditeurs du monde entier avec une connaissance approfondie du Tafseer coranique, des études de Hadith et de l'éthique islamique. Explorez ses canaux actifs et ses diffusions ci-dessous.",
            visit_portal: "Visiter le portail",
            launch_app: "Lancer l'application",
            download_app: "Télécharger l'application",
            search_placeholder: "Rechercher portails, applications, branches...",
            search_no_results: "Aucun résultat trouvé.",
            footer_tagline: "Connecter l'humanité avec la lumière divine du Noble Coran.",
            footer_contact: "Contact",
            design_note: "v1.2.0 (updated 2026-08-02 00:57)"
        },
        ur: {
            current_lang: "اردو",
            hero_badge: "نُورُ القُرْآن",
            hero_title: "نور القرآن",
            hero_subtitle: "اللہ کے نام سے جو رحمان اور رحیم ہے۔ دلوں کو ہدایتِ ربّانی سے جوڑنا — نور القرآن کے تعلیمی وسائل تلاش کریں۔",
            desc_nq_main: "تفسیرِ قرآن اور اسلامی تعلیمات کا مرکزی پورٹل جہاں داخلے، آن لائن کورسز اور کتب دستیاب ہیں۔",
            desc_nq_intl: "مختلف موضوعات پر آڈیوز، تقاریر اور لیکچرز کا ایک وسیع اور منظم بین الاقوامی ذخیرہ۔",
            desc_nq_live: "رمضان کے خصوصی پروگرامز، دروس اور براہِ راست نشریات کا لائیو سٹریمنگ پورٹل۔",
            desc_tafseer: "قرآنِ مجید کی تفصیلی تفاسیر، آڈیو لیکچرز، اور تحریری نوٹس پر مشتمل خصوصی ویب ایپ۔",
            desc_iqra: "لفظ بہ لفظ ترجمہ، تجوید، تلاوت اور سورتوں کے ساتھ قرآن پڑھنے کا جدید معلوماتی پورٹل۔",
            desc_urdu: "اردو زبان میں لیکچرز، آڈیو ریکارڈنگز، اور تعلیمی مواد کا مخصوص ڈیجیٹل مرکز۔",
            desc_norway: "ناروے میں کورسز، سیمینارز اور مقامی مسلم کمیونٹی سے جڑنے کے لیے ناروے برانچ کا پورٹل۔",
            desc_uk: "برطانیہ کی کمیونٹی اور اکیڈمک نیٹ ورکس کے لیے منظم کردہ کورسز اور سیمینارز تک رسائی حاصل کریں۔",
            desc_pakistan: "پاکستانی کمیونٹی کی خدمت کے لیے مقامی برانچ — کورسز، تقریبات اور اردو زبان میں اسلامی تعلیم۔",
            desc_usa: "امریکی کمیونٹیز کو اسلامی کورسز، حلقہ ہائے علم اور آؤٹ ریچ پروگرامز سے جوڑنے والی امریکی برانچ۔",
            desc_ios_audio: "لیکچرز، قرآن کی تلاوت اور آڈیو سیریز کی آف لائن سماعت کے لیے آئی فون اور آئی پیڈ ایپ۔",
            desc_ios_dua: "روزمرہ زندگی کی مستند دعاؤں کا مجموعہ — مواقع کے لحاظ سے مرتب، عربی متن اور ترجمے کے ساتھ۔",
            desc_android: "تفسیر لائبریریز، آڈیو سٹریمنگ اور نوٹیفکیشن الرٹس — گوگل پلے پر تمام اینڈرائیڈ ڈیوائسز کے لیے۔",
            app_ios_desc: "آئی فون یا آئی پیڈ کے لیے آفیشل ایپس ڈاؤن لوڈ کریں اور آف لائن دروس اور تلاوت سے استفادہ کریں۔",
            app_android_desc: "اینڈرائیڈ ایپس حاصل کریں جن میں تفصیلی تفسیر لائبریریز، لائیو ریڈیو اور اہم اعلانات شامل ہیں۔",
            founder_tag: "بانی و معلمہ",
            founder_bio: "عالمی سامعین کو قرآنی تفسیر، احادیث اور اسلامی اخلاقیات کے گہرے علم سے روشناس کرانا۔ ان کے تمام فعال چینلز اور براہِ راست پورٹلز درج ذیل ہیں۔",
            visit_portal: "پورٹل پر جائیں",
            launch_app: "ویب ایپ کھولیں",
            download_app: "ایپ ڈاؤن لوڈ کریں",
            search_placeholder: "پورٹلز، ایپس، برانچز تلاش کریں...",
            search_no_results: "کوئی نتائج نہیں ملے۔",
            footer_tagline: "انسانیت کو قرآنِ مجید کے نور اور ابدی رہنمائی سے جوڑنا۔",
            footer_contact: "رابطہ کریں",
            design_note: "ورژن 1.07"
        },
        no: {
            current_lang: "Norsk",
            hero_badge: "نُورُ القُرْآن",
            hero_title: "Quranens Lys",
            hero_subtitle: "I Allahs navn, den Barmhjertige, den Nåderike. Kobler hjerter til guddommelig veiledning — Utforsk NurulQuran Ressurser.",
            desc_nq_main: "Hovedsenteret for online islamske kurs, bokhandel, opptak og strukturert pensum.",
            desc_nq_intl: "Utforsk en enorm digital katalog med lydfiler, forelesninger og seriekategorisering på forskjellige språk.",
            desc_nq_live: "Følg med på direktesendinger i sanntid, spesielle Ramadan-kurs og interaktive forelesninger live.",
            desc_tafseer: "En dedikert nettapp med detaljerte forklaringer av Koranen, forelesninger, oversettelser og notater.",
            desc_iqra: "Interaktiv leseassistent for Koranen. Få tilgang til oversettelse, ord-for-ord-analyse og resitasjoner.",
            desc_urdu: "Egen nettportal for urdu-talende studenter, med et stort utvalg av lydopptak og transkripsjoner.",
            desc_norway: "Koble deg til vår aktive regionale avdeling i Norge for lokale kurs, seminarer og nordiske fellesskap.",
            desc_uk: "Få tilgang til utdanningskurs og arrangementer organisert for det britiske samfunnet og akademiske nettverk.",
            desc_pakistan: "Lokal avdeling som betjener det pakistanske samfunnet med kurs, arrangementer og islamsk utdanning på urdu.",
            desc_usa: "Den amerikanske avdelingen som kobler samfunn med islamske kurs, studiesirkler og oppsøkende programmer.",
            desc_ios_audio: "Offisiell iPhone- og iPad-app for sømløs offline avspilling av forelesninger, Koran-resitasjoner og lydserier.",
            desc_ios_dua: "En kuratert samling av autentiske duaer for dagliglivet, kategorisert etter anledning, med arabisk tekst og oversettelser.",
            desc_android: "Komplette Tafseer-biblioteker, lydstrømming og varslinger — tilgjengelig på Google Play for alle Android-enheter.",
            app_ios_desc: "Last ned offisielle apper på din iPhone or iPad for sømløs offline avspilling av forelesninger og Koran-resitasjoner.",
            app_android_desc: "Få tilgang til Android-apper med komplette Tafseer-biblioteker, lydstrømming og automatiske varsler.",
            founder_tag: "GRUNNLEGGER OG INSTRUKTØR",
            founder_bio: "Kobler globale lyttere til dyp kunnskap om Koranens Tafseer, Hadith-studier og islamsk etikk. Utforsk hennes aktive kanaler og sendinger nedenfor.",
            visit_portal: "Besøk Portal",
            launch_app: "Åpne Nettapp",
            download_app: "Last ned App",
            search_placeholder: "Søk portaler, apper, filialer...",
            search_no_results: "Ingen resultater funnet.",
            footer_tagline: "Koble menneskeheten til det guddommelige lyset fra den edle Koranen.",
            footer_contact: "Kontakt",
            design_note: "v1.2.0 (updated 2026-08-02 00:57)"
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
    const searchInput = document.getElementById('searchInput');
    const searchNoResults = document.getElementById('searchNoResults');

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

        // Translate search placeholder and no-results
        if (searchInput) searchInput.placeholder = translations[lang].search_placeholder || searchInput.placeholder;
        if (searchNoResults) searchNoResults.textContent = translations[lang].search_no_results || searchNoResults.textContent;

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
    // 2. Light / Dark Theme Toggle
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themes = ['light', 'dark'];

    const setTheme = (theme) => {
        const validTheme = themes.includes(theme) ? theme : 'light';
        htmlElement.setAttribute('data-theme', validTheme);
        localStorage.setItem('nq_theme', validTheme);
    };

    // Toggle theme action (Light <-> Dark)
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    });


    // ==========================================
    // 3. Dynamic Card Carousel Logic (8s Timer + Freeze & Resume + Touch Swipe + Keyboard Nav)
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

    // --- Touch Swipe Support ---
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let isSwiping = false;

    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwiping = true;
    }, { passive: true });

    carouselWrapper.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        const diffX = Math.abs(e.changedTouches[0].screenX - touchStartX);
        const diffY = Math.abs(e.changedTouches[0].screenY - touchStartY);
        // If horizontal swipe is dominant, prevent vertical scroll
        if (diffX > diffY && diffX > 10) {
            e.preventDefault();
        }
    }, { passive: false });

    carouselWrapper.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        const isRTL = htmlElement.getAttribute('dir') === 'rtl';
        const threshold = 50; // minimum swipe distance in pixels

        if (Math.abs(swipeDistance) > threshold) {
            if (isRTL) {
                // In RTL, swipe right goes next, swipe left goes prev
                swipeDistance > 0 ? moveToSlide(currentSlideIndex + 1) : moveToSlide(currentSlideIndex - 1);
            } else {
                // In LTR, swipe left goes next, swipe right goes prev
                swipeDistance < 0 ? moveToSlide(currentSlideIndex + 1) : moveToSlide(currentSlideIndex - 1);
            }
        }
    }, { passive: true });

    // --- Keyboard Navigation ---
    document.addEventListener('keydown', (e) => {
        // Escape key closes dropdown
        if (e.key === 'Escape') {
            langBtn.parentElement.classList.remove('open');
            langBtn.setAttribute('aria-expanded', 'false');
            return;
        }

        // Arrow keys for carousel (only if not typing in search)
        if (document.activeElement && document.activeElement.tagName === 'INPUT') return;

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const isRTL = htmlElement.getAttribute('dir') === 'rtl';
            isRTL ? moveToSlide(currentSlideIndex + 1) : moveToSlide(currentSlideIndex - 1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const isRTL = htmlElement.getAttribute('dir') === 'rtl';
            isRTL ? moveToSlide(currentSlideIndex - 1) : moveToSlide(currentSlideIndex + 1);
        }
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
    // 4. Floating Quran Audio Player (Auto-Play Playlist + Volume + Progress Bar)
    // ==========================================
    const quranAudio = document.getElementById('quranAudio');
    const playerToggleBtn = document.getElementById('playerToggleBtn');
    const floatingAudioPlayer = document.getElementById('floatingAudioPlayer');
    const playerTitle = document.getElementById('playerTitle');
    const playerSubtitle = document.getElementById('playerSubtitle');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeBtn = document.getElementById('volumeBtn');
    const trackProgressFill = document.getElementById('trackProgressFill');

    // Playlist definition
    const playlist = [
        {
            src: 'https://nqapp.nurulquran.com/audios/Short-Series/Quran-Ki-Kirnain/01-Quran-is-my-Life-Edited-complete-Lec.mp3',
            title: 'Quran is my Life',
            subtitle: 'Quran Ki Kirnain'
        },
        {
            src: '050shatri.mp3',
            title: 'Surah Qaf (050)',
            subtitle: 'Abu Bakr Al Shatri'
        }
    ];
    let currentTrackIndex = 0;
    let savedVolume = 0.3;

    // Set initial volume to 30%
    quranAudio.volume = 0.3;

    // Update player UI labels
    const updatePlayerLabels = () => {
        const track = playlist[currentTrackIndex];
        playerTitle.textContent = track.title;
        playerSubtitle.textContent = track.subtitle;
    };

    // Load and play next track in playlist
    const playNextTrack = () => {
        currentTrackIndex++;
        if (currentTrackIndex < playlist.length) {
            const track = playlist[currentTrackIndex];
            quranAudio.src = track.src;
            updatePlayerLabels();
            quranAudio.play().catch(err => console.log("Next track play blocked.", err));
        } else {
            // All tracks finished
            floatingAudioPlayer.classList.remove('playing');
        }
    };

    // Toggle play/pause
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

    // When current track ends, advance to next
    quranAudio.addEventListener('ended', () => {
        playNextTrack();
    });

    // --- Volume Slider ---
    volumeSlider.addEventListener('input', (e) => {
        const vol = parseInt(e.target.value) / 100;
        quranAudio.volume = vol;
        savedVolume = vol;
    });

    // Mute / Unmute toggle
    volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (quranAudio.volume > 0) {
            savedVolume = quranAudio.volume;
            quranAudio.volume = 0;
            volumeSlider.value = 0;
        } else {
            quranAudio.volume = savedVolume || 0.3;
            volumeSlider.value = Math.round(quranAudio.volume * 100);
        }
    });

    // --- Track Progress Bar ---
    quranAudio.addEventListener('timeupdate', () => {
        if (quranAudio.duration && isFinite(quranAudio.duration)) {
            const pct = (quranAudio.currentTime / quranAudio.duration) * 100;
            trackProgressFill.style.width = `${pct}%`;
        }
    });

    // Auto-play Track 1 at 30% volume on page load
    const attemptAutoplay = () => {
        quranAudio.play()
            .then(() => {
                floatingAudioPlayer.classList.add('playing');
            })
            .catch(() => {
                // Autoplay blocked: wait for first user interaction to start
                const startOnInteraction = () => {
                    quranAudio.play()
                        .then(() => {
                            floatingAudioPlayer.classList.add('playing');
                        })
                        .catch(() => {});
                    document.removeEventListener('click', startOnInteraction);
                    document.removeEventListener('touchstart', startOnInteraction);
                };
                document.addEventListener('click', startOnInteraction, { once: true });
                document.addEventListener('touchstart', startOnInteraction, { once: true });
            });
    };

    // Delay autoplay slightly to let page settle
    setTimeout(attemptAutoplay, 800);


    // ==========================================
    // 5. Scroll Indicator + Back to Top Button
    // ==========================================
    const scrollIndicator = document.getElementById('scrollIndicator');
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    window.addEventListener('scroll', () => {
        // Scroll indicator
        if (window.scrollY > 80) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }

        // Back to top button
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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


    // ==========================================
    // 8. Search / Filter Logic
    // ==========================================
    const allSearchableCards = document.querySelectorAll('.portal-card, .branch-card, .app-card');
    const allSections = document.querySelectorAll('.portal-group-section');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        let totalVisible = 0;

        allSearchableCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const href = (card.getAttribute('href') || '').toLowerCase();
            const match = !query || text.includes(query) || href.includes(query);
            
            if (match) {
                card.classList.remove('search-hidden');
                totalVisible++;
            } else {
                card.classList.add('search-hidden');
            }
        });

        // Hide entire sections if all children are hidden
        allSections.forEach(section => {
            const visibleCards = section.querySelectorAll('.portal-card:not(.search-hidden), .branch-card:not(.search-hidden), .app-card:not(.search-hidden)');
            if (visibleCards.length === 0 && query) {
                section.classList.add('search-section-hidden');
            } else {
                section.classList.remove('search-section-hidden');
            }
        });

        // Show "no results" message
        if (totalVisible === 0 && query) {
            searchNoResults.classList.add('visible');
        } else {
            searchNoResults.classList.remove('visible');
        }
    });


    // ==========================================
    // 9. Announcement Banner System
    // ==========================================
    const announcementBanner = document.getElementById('announcementBanner');
    const announcementText = document.getElementById('announcementText');
    const announcementDismiss = document.getElementById('announcementDismiss');

    // Find the first enabled announcement
    const activeAnnouncement = ANNOUNCEMENTS.find(a => a.enabled);

    if (activeAnnouncement) {
        // Build the announcement HTML
        let html = activeAnnouncement.text;
        if (activeAnnouncement.link && activeAnnouncement.linkText) {
            html += ` <a href="${activeAnnouncement.link}" target="_blank" rel="noopener">${activeAnnouncement.linkText}</a>`;
        }
        announcementText.innerHTML = html;

        // Check if this announcement was previously dismissed (by hashing the text)
        const announcementKey = 'nq_dismissed_' + btoa(encodeURIComponent(activeAnnouncement.text)).slice(0, 20);
        const wasDismissed = localStorage.getItem(announcementKey);

        if (!wasDismissed) {
            announcementBanner.classList.remove('hidden');
        }

        // Dismiss handler
        announcementDismiss.addEventListener('click', () => {
            announcementBanner.classList.add('hidden');
            localStorage.setItem(announcementKey, 'true');
        });
    }

    // ==========================================
    // 10. Interactive v3.0 Effects (Cursor Spotlight & Header Shrink-on-Scroll)
    // ==========================================
    document.querySelectorAll('.portal-card').forEach(c =>
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', `${e.clientX - r.left}px`);
        c.style.setProperty('--my', `${e.clientY - r.top}px`);
      }));

    window.addEventListener('scroll', () =>
      document.querySelector('.main-header')
        ?.classList.toggle('scrolled', window.scrollY > 20));

});
