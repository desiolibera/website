# Desio Libera - Sito ufficiale

> **Unisciti al cambiamento per una Desio che merita di più!**

Sito web ufficiale della lista civica **Desio Libera**, sviluppato interamente lato client, senza backend, ottimizzato per performance, accessibilità e compatibilità su desktop, tablet e mobile.

## 🌐 Live Demo

🔗 [https://desiolibera.it](https://desiolibera.it)

---

## 📦 Struttura del progetto

/
├── index.html → Pagina principale con HTML, SEO, Open Graph e layout responsive
├── js/
│ └── script.min.js → Script JavaScript (GSAP, ScrollTrigger, Rellax.js, AOS, menu mobile, CTA, modale PDF)
├── images/ → Icone, loghi, simboli
├── photos/ → Foto candidati e immagini sezione team
├── assets/ → PDF dei programmi e materiali scaricabili
└── css/ (opzionale) → (gli stili sono inclusi inline dentro index.html)


---

## ⚙️ Tecnologie e librerie usate

| Strumento            | Descrizione                                                                                          |
|----------------------|-----------------------------------------------------------------------------------------------------|
| **GSAP + ScrollTrigger** | Animazioni fluide su scroll, parallasse hero, movimento elementi dinamici                          |
| **Rellax.js**            | Effetto parallasse leggero per elementi decorativi                                                |
| **AOS (Animate on Scroll)** | Effetti di fade/slide sugli elementi in entrata durante lo scroll                              |
| **Google Fonts**         | Font esterni Montserrat e Caveat, precaricati e ottimizzati per performance                       |
| **Vanilla JavaScript**   | Gestione del menu hamburger, header dinamico, animazioni custom, modale PDF multi-purpose         |
| **SVG inline**           | Elementi grafici interattivi come il logo e il santino elettorale                                 |
| **Responsive Design**    | Layout fluido su dispositivi mobili, tablet, desktop, con media query e controlli specifici       |

---

## 📂 Dettaglio dei file

### `index.html`

- Contiene:
  - Meta tag SEO e social sharing (Open Graph, Twitter Card).
  - Stili CSS integrati direttamente (evitando richieste extra).
  - Sezioni:
    - Hero
    - Valori (Partecipazione, Ambiente, Cultura, Giovani)
    - Team candidati
    - Call To Action (come votare, santino animato)
    - Footer con contatti e social
    - Modale PDF per visualizzare programmi senza lasciare la pagina.

### `js/script.min.js`

- Contiene:
  - Inizializzazione librerie AOS e Rellax.js.
  - Animazioni GSAP personalizzate:
    - Hero parallela su scroll.
    - Animazione “sorriso” sul logo.
    - Disegno della “X” e del cognome sul santino.
  - Gestione smooth scroll per i link.
  - Menu hamburger responsive.
  - Mini-header che appare in scroll su mobile.
  - Gestione fallback per browser interni Facebook/Instagram.
  - Modale PDF con gestione mobile/desktop (apre modale su desktop, nuova tab su mobile/iPad).
