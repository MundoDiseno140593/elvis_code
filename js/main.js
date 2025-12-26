// ===== Page loaded =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});


// ===== Reveal animation (IntersectionObserver) =====
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

revealElements.forEach(el => revealObserver.observe(el));


// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// ===== WhatsApp auto message =====
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

whatsappLinks.forEach(link => {
  const baseUrl = "https://wa.me/86479297";
  const message = encodeURIComponent(
    "Hola Elvis, vi tu portafolio y quiero conversar sobre un sistema web."
  );
  link.setAttribute("href", `${baseUrl}?text=${message}`);
});


// ===== WhatsApp float scroll feedback =====
const whatsappFloat = document.querySelector(".whatsapp-float");

if (whatsappFloat) {
  window.addEventListener("scroll", () => {
    whatsappFloat.classList.toggle("active", window.scrollY > 300);
  });
}


// ===== Animated Stars Background =====
(() => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "0";
  canvas.style.pointerEvents = "none";

  document.body.prepend(canvas);

  let stars = [];
  const STAR_COUNT = 120;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.15 + 0.05,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctx.fill();

      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(drawStars);
  }

  createStars();
  drawStars();
})();


// ===== Mouse Parallax (Hero) =====
(() => {
  const hero = document.querySelector(".hero");
  const heroText = document.querySelector(".hero-content");
  const heroImg = document.querySelector(".hero-img");

  if (!hero || !heroText || !heroImg) return;

  // Desactivar en móviles
  if (window.innerWidth < 992) return;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / centerX;
    const moveY = (y - centerY) / centerY;

    // Texto (movimiento mínimo)
    heroText.style.transform = `
      translate(${moveX * 8}px, ${moveY * 8}px)
    `;

    // Imagen (un poco más de profundidad)
    heroImg.style.transform = `
      translate(${moveX * 18}px, ${moveY * 18}px)
    `;
  });

  hero.addEventListener("mouseleave", () => {
    heroText.style.transform = "translate(0, 0)";
    heroImg.style.transform = "translate(0, 0)";
  });
})();


// ===== Proyectos description enhancement =====
(() => {
  const el = document.getElementById("projects-desc");
  if (!el) return;

  // Palabras clave a resaltar
  const keywords = [
    "Sistemas reales",
    "necesidades concretas",
    "instituciones",
    "negocios",
    "entornos académicos"
  ];

  let html = el.innerHTML;

  keywords.forEach(word => {
    const regex = new RegExp(word, "gi");
    html = html.replace(
      regex,
      `<span style="
        color:#38bdf8;
        font-weight:600;
        text-shadow:0 0 8px rgba(56,189,248,.5);
      ">${word}</span>`
    );
  });

  el.innerHTML = html;

  // Estado inicial (animación)
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.8s ease, transform 0.8s ease";

  // Reveal cuando entra en pantalla
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.disconnect();
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(el);
})();


