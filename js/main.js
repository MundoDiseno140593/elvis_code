window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


// Reveal animation (Intersection Observer)
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // solo una vez
      }
    });
  },
  {
    threshold: 0.3
  }
);

revealElements.forEach(el => revealObserver.observe(el));



// ===== Reveal on scroll =====
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((el) => observer.observe(el));


// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});


// ===== WhatsApp message auto =====
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

whatsappLinks.forEach((link) => {
  const baseUrl = "https://wa.me/86479297";
  const message = encodeURIComponent(
    "Hola Elvis, vi tu portafolio y quiero conversar sobre un sistema web."
  );
  link.setAttribute("href", `${baseUrl}?text=${message}`);
});


// ===== WhatsApp float feedback =====
const whatsappFloat = document.querySelector(".whatsapp-float");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    whatsappFloat.classList.add("active");
  } else {
    whatsappFloat.classList.remove("active");
  }
});
