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
