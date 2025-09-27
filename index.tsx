document.addEventListener('DOMContentLoaded', () => {

  // --- INTERNATIONALIZATION (i1n) ---
  const translations = {
    en: {
      navProps: 'Properties',
      navStore: 'Services',
      navContact: 'Contact',
      navAbout: 'About',
      heroTitle: 'SIGHT REAL ESTATE <strong>DEVELOPMENT</strong>',
      heroTag: 'Sustainable solutions and strategic locations for office & commercial spaces.',
      ctaView: 'View Gallery',
      ctaWhatsapp: 'WhatsApp',
      galleryTitle: 'PROPERTY GALLERY',
      viewDetails: 'View Details',
      highlights: 'Highlights',
      gallery: 'Gallery',
      paymentPlan: 'Payment Plan',
      prices: 'Prices',
      unit: 'Unit',
      area: 'Area',
      price: 'Price',
      bookNow: 'Book Now',
      backToHome: 'Back to Home',
      virtualTour: '360° Virtual Tour',
      aboutTab: 'About SIGHT',
      locTab: 'Our Locations',
      credits: '© SIGHT Real Estate Development — Strong presence across Egypt; offices and commercial specialists.',
      requestCallback: 'Request a Call Back',
      formTitle: 'Leave your info & we will contact you',
      name: 'Name',
      namePh: 'Your name',
      phone: 'Phone',
      phonePh: '0100 000 0000',
      email: 'Email',
      emailPh: 'your@email.com',
      sendWhats: 'Send via WhatsApp',
      connectTitle: 'Connect With Us',
      cookieText: 'This website uses cookies to ensure you get the best experience on our website.',
      cookieBtn: 'Got it!',
    },
    ar: {
      navProps: 'المشاريع',
      navStore: 'خدماتنا',
      navContact: 'تواصل معنا',
      navAbout: 'عن الشركة',
      heroTitle: 'سايت للتطوير <strong>العقاري</strong>',
      heroTag: 'حلول مستدامة ومواقع استراتيجية للمساحات المكتبية والتجارية.',
      ctaView: 'شاهد المشاريع',
      ctaWhatsapp: 'واتساب',
      galleryTitle: 'معرض المشاريع',
      viewDetails: 'عرض التفاصيل',
      highlights: 'أبرز المميزات',
      gallery: 'معرض الصور',
      paymentPlan: 'خطة السداد',
      prices: 'الأسعار',
      unit: 'الوحدة',
      area: 'المساحة',
      price: 'السعر',
      bookNow: 'احجز الآن',
      backToHome: 'العودة للرئيسية',
      virtualTour: 'جولة افتراضية 360°',
      aboutTab: 'عن سايت',
      locTab: 'مواقعنا',
      credits: '© سايت للتطوير العقاري — حضور قوي في جميع أنحاء مصر، متخصصون في المكاتب والمحلات التجارية.',
      requestCallback: 'اطلب إعاده الاتصال',
      formTitle: 'اترك معلوماتك وسنتصل بك',
      name: 'الاسم',
      namePh: 'اسمك',
      phone: 'رقم الهاتف',
      phonePh: '01000000000',
      email: 'البريد الإلكتروني',
      emailPh: 'your@email.com',
      sendWhats: 'أرسل عبر واتساب',
      connectTitle: 'تواصل معنا',
      cookieText: 'يستخدم هذا الموقع ملفات تعريف الارتباط لضمان حصولك على أفضل تجربة.',
      cookieBtn: 'حسناً!',
    }
  };

  let currentLang = 'en';

  const setLanguage = (lang) => {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i1n]').forEach(el => {
      const key = el.getAttribute('data-i1n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    document.querySelectorAll('[data-i1n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i1n-placeholder');
      if (translations[lang][key]) {
        (el as HTMLInputElement).placeholder = translations[lang][key];
      }
    });

    const langToggleButtons = document.querySelectorAll('#langToggle, #langToggleMobile');
    langToggleButtons.forEach(btn => {
      btn.textContent = lang === 'ar' ? 'English' : 'العربية';
    });
  };

  document.querySelectorAll('#langToggle, #langToggleMobile').forEach(btn => {
    btn.addEventListener('click', () => {
      const newLang = currentLang === 'en' ? 'ar' : 'en';
      setLanguage(newLang);
    });
  });

  // --- HERO SLIDER ---
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('dots');
  let currentSlide = 0;
  let slideInterval;

  // FIX: Add null check for dotsContainer to prevent runtime errors.
  if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => {
        setSlide(i);
        resetSlideInterval();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const setSlide = (index) => {
      slides[currentSlide].classList.remove('is-active');
      dots[currentSlide].classList.remove('is-active');
      currentSlide = index;
      slides[currentSlide].classList.add('is-active');
      dots[currentSlide].classList.add('is-active');
    };

    const nextSlide = () => {
      const nextIndex = (currentSlide + 1) % slides.length;
      setSlide(nextIndex);
    };
    
    const resetSlideInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    resetSlideInterval();
  }

  // --- MOBILE NAVIGATION ---
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  
  const toggleMobileNav = () => {
    // FIX: Add null check for mobileNavToggle.
    if (!mobileNavToggle) return;
    const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
    document.body.classList.toggle('mobile-nav-open');
    mobileNavToggle.setAttribute('aria-expanded', String(!isExpanded));
  };

  // FIX: Add null check for mobileNavToggle to prevent runtime errors.
  mobileNavToggle?.addEventListener('click', toggleMobileNav);
  
  // FIX: Add null check for mobileNavOverlay to prevent runtime errors.
  mobileNavOverlay?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
          if(document.body.classList.contains('mobile-nav-open')) {
              toggleMobileNav();
          }
      });
  });

  // --- PAGE ROUTING/VIEW MANAGEMENT ---
  // FIX: Cast querySelectorAll result to HTMLElement to access style property.
  const projectWrappers = document.querySelectorAll<HTMLElement>('.project-wrapper');
  const mainSections = document.querySelectorAll('main > .section');

  const showView = (hash) => {
    const projectId = hash.startsWith('#project-') ? hash.substring(1) : null;

    if (projectId) {
      document.body.classList.add('project-view-active');
      projectWrappers.forEach(wrapper => {
        wrapper.style.display = wrapper.id === `${projectId}-wrapper` ? 'block' : 'none';
      });
      const targetElement = document.getElementById(projectId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      document.body.classList.remove('project-view-active');
      projectWrappers.forEach(wrapper => wrapper.style.display = 'none');
      if(hash && document.querySelector(hash)) {
          document.querySelector(hash).scrollIntoView({behavior: 'smooth'});
      }
    }
  };

  // Handle clicks on project links, nav links, and home buttons
  document.addEventListener('click', (e) => {
    let target = e.target as HTMLElement;
    while(target && target !== document.body) {
        if(target.matches('a[href^="#"], .btn-home, #home-button')) {
            const link = target as HTMLAnchorElement;
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                try {
                    history.pushState(null, null, href === '#' ? window.location.pathname : href);
                } catch (err) {
                    // Silently fail in restricted environments where history manipulation is not allowed.
                }
                showView(href);
            } else if (target.matches('.btn-home') || target.matches('.brand') || target.matches('#home-button')) {
                 e.preventDefault();
                 try {
                    // Use replaceState to avoid adding a duplicate "home" entry to the browser history.
                    history.replaceState(null, null, window.location.pathname);
                 } catch (err) {
                    // Silently fail in restricted environments.
                 }
                 showView('');
            }
            break;
        }
        target = target.parentElement;
    }
  });

  // Handle initial page load and back/forward buttons
  window.addEventListener('popstate', () => showView(window.location.hash));
  
  // Always show the home page on initial load, ignoring any URL hash.
  showView('');
  // Also clean the URL to remove the hash, preventing issues on reload.
  // This can fail in sandboxed environments, so we suppress the error.
  try {
    history.replaceState(null, null, window.location.pathname);
  } catch (e) {
    // Silently fail.
  }


  // --- SCROLL ANIMATIONS ---
  const animatedElements = document.querySelectorAll('.scroll-animate');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
  
  // --- ABOUT/LOCATION TABS ---
  const tabButtons = document.querySelectorAll('.seg-btn');
  const tabPanels = document.querySelectorAll('.segpanels .panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPanelId = button.getAttribute('data-target');
      
      tabButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      
      tabPanels.forEach(panel => {
        panel.classList.toggle('show', panel.id === targetPanelId);
      });
    });
  });
  
  // --- MODALS (QR & LIGHTBOX) ---
  const qrModal = document.getElementById('qrModal');
  const qrOpenBtn = document.getElementById('qrOpen');
  const qrCloseBtn = document.getElementById('qrClose');

  // FIX: Add null checks for modal elements to prevent runtime errors.
  qrOpenBtn?.addEventListener('click', () => { if (qrModal) qrModal.style.display = 'grid'; });
  qrCloseBtn?.addEventListener('click', () => { if (qrModal) qrModal.style.display = 'none'; });
  qrModal?.addEventListener('click', (e) => {
      if(e.target === qrModal && qrModal) qrModal.style.display = 'none';
  });

  // Lightbox
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImage') as HTMLImageElement;
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  let currentImageIndex = 0;
  let currentGalleryImages: string[] = [];
  
  document.querySelectorAll('.project-gallery-grid').forEach(grid => {
      grid.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'IMG') {
              const galleryImages = Array.from(grid.querySelectorAll('img'));
              currentGalleryImages = galleryImages.map(img => img.src);
              currentImageIndex = galleryImages.indexOf(target as HTMLImageElement);
              openLightbox();
          }
      });
  });

  const openLightbox = () => {
    updateLightboxImage();
    // FIX: Add null check for lightbox to prevent runtime errors.
    if (lightbox) lightbox.style.display = 'flex';
    document.addEventListener('keydown', handleLightboxKeys);
  }

  const closeLightbox = () => {
    // FIX: Add null check for lightbox to prevent runtime errors.
    if (lightbox) lightbox.style.display = 'none';
    document.removeEventListener('keydown', handleLightboxKeys);
  }

  const updateLightboxImage = () => {
    // FIX: Add null checks for lightbox elements to prevent runtime errors.
    if (lightboxImg && lightboxCounter) {
        lightboxImg.src = currentGalleryImages[currentImageIndex];
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
    }
  }

  const showPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    updateLightboxImage();
  }
  
  const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
    updateLightboxImage();
  }
  
  const handleLightboxKeys = (e) => {
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowLeft') showPrevImage();
      if(e.key === 'ArrowRight') showNextImage();
  }

  // FIX: Add null checks for lightbox elements to prevent runtime errors.
  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', showPrevImage);
  lightboxNext?.addEventListener('click', showNextImage);
  lightbox?.addEventListener('click', (e) => {
      if(e.target === lightbox) closeLightbox();
  });

  // --- COOKIE BAR ---
  const cookieBar = document.getElementById('cookieBar');
  const cookieOkBtn = document.getElementById('cookieOk');

  // FIX: Add null check for cookieBar to prevent runtime errors.
  if (cookieBar && !localStorage.getItem('cookiesAccepted')) {
    cookieBar.classList.add('show');
  }

  // FIX: Add null checks for cookie bar elements to prevent runtime errors.
  cookieOkBtn?.addEventListener('click', () => {
    cookieBar?.classList.remove('show');
    localStorage.setItem('cookiesAccepted', 'true');
  });

  // --- CONTACT FORM & BOOKING ---
  const whatsSendBtn = document.getElementById('whatsSend');
  const nameInput = document.getElementById('fName') as HTMLInputElement;
  const phoneInput = document.getElementById('fPhone') as HTMLInputElement;
  const emailInput = document.getElementById('fEmail') as HTMLInputElement;

  let interestedProject = '';

  document.querySelectorAll('.btn.book').forEach(btn => {
    btn.addEventListener('click', () => {
      interestedProject = btn.getAttribute('data-project') || '';
      // FIX: Add null check to prevent runtime error if 'contact' element doesn't exist.
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // FIX: Add null checks for whatsSendBtn and form inputs to prevent runtime errors.
  whatsSendBtn?.addEventListener('click', () => {
    const name = nameInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const phoneNumber = "201099993903"; // Replace with your number

    let message = `Hello SIGHT Real Estate,\n\nMy name is ${name}.`;
    if (phone) message += `\nMy phone number is ${phone}.`;
    if (email) message += `\nMy email is ${email}.`;
    if (interestedProject) {
        message += `\n\nI am interested in the "${interestedProject}" project.`;
        interestedProject = ''; // Reset after use
    } else {
        message += `\n\nI would like to inquire about your properties.`;
    }
    
    message += `\n\nPlease contact me. Thank you.`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });

});