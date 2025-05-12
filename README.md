# Desio Libera - Sito ufficiale

> **Unisciti al cambiamento per una Desio che merita di più!**

Sito web statico della lista civica **Desio Libera**, realizzato interamente **lato client** senza backend. Progettato con attenzione a performance, responsività, accessibilità e compatibilità multipiattaforma (desktop, tablet, mobile).

## 🌐 Live Demo

🔗 [https://desiolibera.it](https://desiolibera.it)

---

## 📁 Struttura del progetto

```plaintext
/
├── index.html                # Pagina principale (homepage one-page)
├── candidato-sindaco.html   # Pagina di approfondimento dedicata a Carlo Moscatelli
├── js/
│   └── script.min.js        # Script JavaScript (animazioni, modale, menu mobile)
├── images/                  # Loghi, simboli, santino e favicon
├── photos/                  # Ritratti dei candidati
├── assets/                  # PDF dei programmi e biografie scaricabili
└── css/                     # (opzionale - non usato attualmente: CSS inline in HTML)

---

## ⚙️ Tecnologie e librerie utilizzate

| Strumento                 | Descrizione                                                                                     |
|---------------------------|------------------------------------------------------------------------------------------------|
| **GSAP + ScrollTrigger**  | Animazioni fluide su scroll, parallasse sezione hero, CTA animata, smile interattivo           |
| **Rellax.js**             | Parallasse su elementi decorativi in hero e contesto                                           |
| **AOS (Animate on Scroll)** | Effetti fade/slide su sezioni e elementi durante lo scroll                                   |
| **Google Fonts**          | Font esterni (Montserrat, Caveat) precaricati per velocità                                     |
| **Vanilla JavaScript**    | Gestione completa: menu mobile, modale PDF, scroll smooth, fallback Instagram/Facebook         |
| **SVG inline**            | Logo vettoriale interattivo, simbolo elettorale, X e cognome animati                           |
| **Responsive Design**     | Layout flessibile e ottimizzato per ogni dispositivo                                           |

---

## 📄 Dettaglio file

### `index.html`
Pagina principale che include:

- Meta tag SEO e social (`og:title`, `og:description`, Twitter Card…)
- Font ottimizzati con `preconnect` e `preload`
- Stili CSS inclusi direttamente (`<style>` nel `<head>`)
- Sezioni:
  - **Hero** con call-to-action e PDF scaricabili
  - **Valori** (Partecipazione, Ambiente, Cultura, Giovani)
  - **Candidato Sindaco** (Carlo Moscatelli)
  - **Team dei candidati consiglieri**
  - **Come si vota** (con santino animato)
  - **Footer** con contatti, indirizzo e social
  - **Modale PDF** dinamica e accessibile

### `candidato-sindaco.html`
- Pagina dedicata con profilo completo del candidato sindaco.
- Struttura semplice, ottimizzata per SEO e con scroll-to-top.
- Link per tornare alla homepage.

### `js/script.min.js`
Contiene tutta la logica JavaScript:

- Inizializzazione di:
  - AOS per animazioni in entrata
  - Rellax.js per parallasse
  - ScrollTrigger per GSAP (hero + CTA santino)
- Gestione dinamica dell’**header sticky** e del **mini-header mobile**
- Animazioni personalizzate: **sorriso del logo**, **X e cognome sul santino**
- Scroll liscio e gestione focus/accessibilità
- Modale PDF intelligente:
  - Apertura in modale su desktop
  - Apertura in nuova tab su mobile/tablet/iPad
- Fallback compatibilità per browser interni Facebook e Instagram

---

## 📈 Ottimizzazione e accessibilità

- ✅ Preload immagini principali e WebP
- ✅ Modale accessibile con `ESC`, `focus`, click esterno
- ✅ Link e pulsanti accessibili anche da tastiera
- ✅ Mobile-first design con media query avanzate
- ✅ Performance-oriented: nessun CSS/JS extra non utilizzato

---

## 🚀 Hosting consigliato

Può essere hostato su:
- GitHub Pages
- Netlify / Vercel
- qualsiasi web server statico (Apache/Nginx/Cloudflare Pages…)

---

## 📮 Contatti

📧 info@desiolibera.it  
📍 Via Matteotti 23, Desio  
📱 [Facebook](https://www.facebook.com/DesioLiberaListaCivica) | [Instagram](https://www.instagram.com/desiolibera/)

---

## 📅 Elezioni amministrative

🗓️ **25-26 maggio 2025**  
🗳️ Vota **Desio Libera**  
✖️ Metti una X sul simbolo  
✍️ Scrivi il cognome del candidato che preferisci

---
