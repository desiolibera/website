document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // 1. ANIMAZIONI SU SCROLL (AOS)
  // =========================
  AOS.init({
    duration: 800,
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
    once: false,
    mirror: true,
    anchorPlacement: "center-bottom",
    offset: 120,
    delay: 100,
  });

  // =========================
  // 2. EFFETTI PARALLASSE (RELLAX)
  // =========================
  if (document.querySelectorAll(".rellax").length > 0) {
    var rellax = new Rellax(".rellax");
  }

  // =========================
  // 3. HEADER DINAMICO (SCROLL + NASCONDI)
  // =========================
  const header = document.getElementById("header");
  let lastScrollTop = 0;
  let ticking = false;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (scrollTop > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }

        if (scrollTop > lastScrollTop && scrollTop > 200) {
          header.classList.add("header-hidden");
        } else {
          header.classList.remove("header-hidden");
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
      });

      ticking = true;
    }
  });

  // =========================
  // 4. ANIMAZIONE SORRISO LOGO (GSAP)
  // =========================
  const logoImg = document.getElementById("logo-img");
  const smile = document.getElementById("sorriso");

  gsap.set(smile, { transformOrigin: "150px 190px" });

  const smileAnimation = gsap.to(smile, {
    scaleX: 1.08,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    paused: true,
  });

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    if (scrollPosition < 800) {
      const intensity = Math.max(0, 1 - scrollPosition / 800);
      if (!smileAnimation.isActive()) {
        smileAnimation.play();
      }
      smileAnimation.timeScale(0.8 + intensity * 0.4);
      gsap.to(smile, {
        duration: 0.3,
        attr: {
          "stroke-width": 16 + intensity * 4,
        },
      });
    } else {
      smileAnimation.pause();
      gsap.to(smile, {
        duration: 0.5,
        attr: { "stroke-width": 20 },
      });
    }
  });

  logoImg.addEventListener("mouseenter", function () {
    gsap.to(smile, {
      duration: 0.4,
      scaleX: 1.15,
      attr: { "stroke-width": 24 },
      ease: "back.out(1.7)",
    });
  });

  logoImg.addEventListener("mouseleave", function () {
    gsap.to(smile, {
      duration: 0.6,
      scaleX: 1,
      attr: { "stroke-width": 20 },
      ease: "elastic.out(1, 0.3)",
    });
  });

  // =========================
  // 5. PARALLASSE HERO (GSAP ScrollTrigger)
  // =========================
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".hero-bg", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
    },
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    ease: "none"
  });

  gsap.utils.toArray(".floating-element").forEach((element, i) => {
    const depth = parseFloat(element.getAttribute("data-speed")) || i * 0.1 + 0.1;
    gsap.to(element, {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: `${-50 * depth}%`,
      x: `${20 * depth}%`,
      ease: "none",
    });
  });

  // =========================
  // 6. SCROLL LISCIO PER I LINK DI NAVIGAZIONE
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // =========================
  // 7. MENU MOBILE E MINI HEADER
  // =========================
  const menuToggle = document.getElementById("menu-toggle");
  const miniMenuToggle = document.getElementById("mini-menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const menuOverlay = document.getElementById("menu-overlay");
  const miniHeader = document.getElementById("mini-header");

  function toggleMenu() {
    menuToggle.classList.toggle("active");
    miniMenuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  }

  menuToggle.addEventListener("click", toggleMenu);
  miniMenuToggle.addEventListener("click", toggleMenu);
  menuOverlay.addEventListener("click", toggleMenu);

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  let headerHeight = header.offsetHeight;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > headerHeight) {
      if (scrollTop < lastScrollTop) {
        miniHeader.classList.add("visible");
      } else {
        if (!navLinks.classList.contains("active")) {
          miniHeader.classList.remove("visible");
        }
      }

      if (window.innerWidth <= 768) {
        header.classList.add("scrolled");
        if (scrollTop > lastScrollTop && scrollTop > 200) {
          header.classList.add("header-hidden");
        } else {
          header.classList.remove("header-hidden");
        }
      } else {
        if (scrollTop > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }

        if (scrollTop > lastScrollTop && scrollTop > 200) {
          header.classList.add("header-hidden");
        } else {
          header.classList.remove("header-hidden");
        }
      }
    } else {
      miniHeader.classList.remove("visible");
      header.classList.remove("scrolled");
      header.classList.remove("header-hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  window.addEventListener("resize", function () {
    headerHeight = header.offsetHeight;

    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });

  // Chiudi il menu mobile quando clicchi su un link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      // Chiudi menu mobile e overlay
      document.getElementById('nav-links').classList.remove('active');
      document.getElementById('menu-toggle').classList.remove('active');
      document.getElementById('mini-menu-toggle')?.classList.remove('active');
      document.getElementById('menu-overlay').classList.remove('active');

      // Rimuovi il focus per evitare contorno persistente
      link.blur();
    });
  });

  // Rimuove il focus dai link di ancoraggio dopo il click
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      // Delay per permettere lo scroll prima di rimuovere il focus
      setTimeout(() => this.blur(), 100);
    });
  });

// =========================
// 8. ANIMAZIONE CTA SANTINO ELETTORALE + COGNOME
// =========================
function animateCognomeInTimeline(timeline) {
  const text = document.querySelector('#cognome-text');
  if (text) {
    // Imposta l'opacità iniziale e un leggero offset in basso
    gsap.set(text, {
      opacity: 0,
      y: 20,
    });

    // Aggiunge l'animazione alla timeline dopo la X
    timeline.to(text, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    });
  }
}

function animateCTA() {
  // Anima la comparsa della sezione CTA (contenitore santino)
  gsap.to('.cta-container', {
    duration: 1,
    delay: 0.3,
    opacity: 1,
    y: 0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.cta h2',
      start: 'bottom 80%',
      toggleActions: 'play none none none'
    }
  });

  // Timeline per la X e il cognome sovrapposti sul santino
  const tlX = gsap.timeline({
    scrollTrigger: {
      trigger: '.voto-wrapper',
      start: 'top 80%',
      toggleActions: 'restart none restart none',
    }
  });

  // Disegna la prima linea della X
  tlX.to('#x-line1', {
    attr: { x2: 90, y2: 90 },
    duration: 0.6,
    ease: 'power1.out',
  });

  // Disegna la seconda linea della X
  tlX.to('#x-line2', {
    attr: { x2: 90, y2: 10 },
    duration: 0.6,
    ease: 'power1.out',
  });

  // Anima il cognome (fade in + risalita)
  animateCognomeInTimeline(tlX);

  // Anima il disclaimer finale
  tlX.to('.cta-disclaimer', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
  });
}

  // =========================
  // 9. MODALE MULTI-PURPOSE
  // =========================
  const pdfModal = document.getElementById('pdf-modal');
  const pdfModalTitle = document.getElementById('pdf-modal-title');
  const pdfFrame = document.getElementById('pdf-frame');
  const pdfModalClose = document.getElementById('pdf-modal-close');

  // Funzione per aprire la modale
  function openPdfModal(title, pdfUrl) {
    pdfModalTitle.textContent = title;
    const url = pdfUrl + "#toolbar=0&embedded=true"; 
    pdfFrame.src = url;
    pdfModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Blocca lo scroll sotto
    // Aggiungi l'evento per bloccare lo scroll quando la modale è aperta
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
  }

  // Funzione per chiudere la modale
  function closePdfModal() {
    pdfModal.style.display = 'none';
    pdfFrame.src = ''; // Svuota iframe
    document.body.style.overflow = ''; // Ripristina scroll
    // Rimuove gli eventi di blocco dello scroll
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
  }

  // Funzione che impedisce lo scroll
  function preventScroll(e) {
    e.preventDefault(); // Blocca l'evento di scroll
    return false; // Restituisce false per evitare il comportamento di default
  }

  // Aggiungi listener ai pulsanti che hanno data-modal-pdf
  document.querySelectorAll('[data-modal-pdf]').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const pdfUrl = this.getAttribute('data-modal-pdf');
      const title = this.getAttribute('data-modal-title') || 'Documento';
  
      // Funzione per rilevare mobile, tablet e anche iPad in modalità desktop
      const isMobileOrTablet = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
        // Controllo dispositivi mobili classici
        if (/android/i.test(userAgent) || /iPhone|iPod/i.test(userAgent)) {
          return true;
        }
  
        // Controllo per iPad (anche in modalità desktop Safari)
        if (
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
        ) {
          return true; // È un iPad
        }
  
        return false; // Altrimenti è desktop
      };
  
      if (isMobileOrTablet()) {
        // Mobile/tablet (incluso iPad), apri in nuova scheda
        window.open(pdfUrl, '_blank');
      } else {
        // Desktop normale, apri la modale
        openPdfModal(title, pdfUrl);
      }
    });
  });
  
  // Chiudi quando clicchi sulla X
  pdfModalClose.addEventListener('click', closePdfModal);

  // Chiudi anche cliccando fuori dal contenuto (overlay)
  pdfModal.addEventListener('click', function (e) {
    if (e.target === pdfModal) {
      closePdfModal();
    }
  });

  // Opzionale: chiudi con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal.style.display === 'block') {
      closePdfModal();
    }
  });

    // =========================
  // 10. FALLBACK PER BROWSER FACEBOOK/INSTAGRAM
  // =========================
  function isFacebookInAppBrowser() {
    const ua = navigator.userAgent || '';
    return ua.includes('FBAN') || ua.includes('FBAV') || ua.includes('Instagram');
  }

  if (isFacebookInAppBrowser()) {
    console.warn('Rilevato browser interno Facebook/Instagram: attivo fallback');

    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');

    // Rimuovi overlay se esiste
    if (menuOverlay) menuOverlay.remove();

    // Rendi il menu sempre visibile
    navLinks.classList.add('always-visible');
    if (menuToggle) menuToggle.style.display = 'none';

    // Applica stili per forzare il menu mobile statico
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 768px) {
        .nav-links {
          position: static !important;
          width: 100% !important;
          max-width: none !important;
          height: auto !important;
          background: none !important;
          box-shadow: none !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          justify-content: center;
          text-align: center !important;
          padding: 10px 0;
        }
        .nav-links li {
          margin: 5px 10px !important;
          flex: 1 1 auto !important;
          text-align: center !important;
        }
        .nav-links a {
          display: block;
          padding: 8px 5px;
          font-size: 1.1rem;
        }
        .menu-toggle {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Aggiorna anche la gestione della modale per forzare l'apertura in nuova scheda
    document.querySelectorAll('[data-modal-pdf]').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const pdfUrl = this.getAttribute('data-modal-pdf');
        if (pdfUrl) {
          window.open(pdfUrl, '_blank');
        }
      });
    });
  }

  // Inizializza l'animazione CTA
  animateCTA();
});