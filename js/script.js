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

  // =========================
  // 8. MODALE MULTI-PURPOSE + FALLBACK BROWSER FACEBOOK
  // =========================

  function isFacebookInAppBrowser() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1 || ua.indexOf('Instagram') > -1;
  }

  const pdfModal = document.getElementById('pdf-modal');
  const pdfModalTitle = document.getElementById('pdf-modal-title');
  const pdfFrame = document.getElementById('pdf-frame');
  const pdfModalClose = document.getElementById('pdf-modal-close');

  function openPdfModal(title, pdfUrl) {
    pdfModalTitle.textContent = title;
    const url = pdfUrl + "#toolbar=0&embedded=true"; 
    pdfFrame.src = url;
    pdfModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('[data-modal-pdf]').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const pdfUrl = this.getAttribute('data-modal-pdf');
      const title = this.getAttribute('data-modal-title') || 'Documento';
      const isMobileOrTablet = /android|iphone|ipod|ipad/i.test(navigator.userAgent);

      if (isMobileOrTablet || isFacebookInAppBrowser()) {
        window.open(pdfUrl, '_blank');
      } else {
        openPdfModal(title, pdfUrl);
      }
    });
  });

  pdfModalClose.addEventListener('click', () => {
    pdfModal.style.display = 'none';
    pdfFrame.src = '';
    document.body.style.overflow = '';
  });

  pdfModal.addEventListener('click', (e) => {
    if (e.target === pdfModal) {
      pdfModal.style.display = 'none';
      pdfFrame.src = '';
      document.body.style.overflow = '';
    }
  });

  // =========================
  // 9. FALLBACK MENU FACEBOOK
  // =========================
  if (isFacebookInAppBrowser()) {
    console.warn('Fallback Facebook attivo');
    if (menuOverlay) menuOverlay.remove();
    navLinks.classList.add('always-visible');

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
          justify-content: center;
        }
        .nav-links li {
          margin: 0 10px !important;
        }
        .menu-toggle {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
});