document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initTypingEffect();
  initContactForm();
  initMobileNav();
  initAboutCarousel();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ---------- Navegação entre abas ---------- */
function initTabs() {
  const links = document.querySelectorAll("[data-tab-link]");
  const panels = document.querySelectorAll(".tab-panel");
  const navLinks = document.querySelectorAll(".nav-link");

  function showTab(id) {
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === id);
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.tabLink === id);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });

    const navLinksEl = document.getElementById("navLinks");
    navLinksEl.classList.remove("open");
    document.getElementById("navToggle").setAttribute("aria-expanded", "false");
  }

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showTab(link.dataset.tabLink);
    });
  });
}

/* ---------- Efeito de digitação no hero ---------- */
function initTypingEffect() {
  const el = document.getElementById("typedText");
  if (!el) return;

  const words = ["Full Stack", "Front-end", "Back-end", "Web Design"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const currentWord = words[wordIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = currentWord.slice(0, charIndex);
      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = currentWord.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(tick, deleting ? 45 : 90);
  }

  tick();
}

/* ---------- Formulário de contato ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = data.get("nome");

    note.textContent = `> Obrigado, ${nome}! Sua mensagem foi registrada. Em breve entro em contato.`;
    form.reset();
  });
}

/* ---------- Carrossel de fotos (aba Sobre) ---------- */
function initAboutCarousel() {
  const container = document.getElementById("aboutCarousel");
  if (!container) return;

  const slides = Array.from(container.querySelectorAll(".carousel-slide"));
  const dotsWrap = document.getElementById("carouselDots");
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = index;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  setInterval(() => {
    goTo((current + 1) % slides.length);
  }, 5000);
}

/* ---------- Menu mobile ---------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}