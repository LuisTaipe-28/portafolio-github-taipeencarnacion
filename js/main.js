/**
 * main.js — Lógica principal del sitio
 */

// =============================================
// SCROLL REVEAL
// =============================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // solo una vez
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// =============================================
// CONTADOR ANIMADO
// =============================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const update = () => {
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current).toLocaleString("es") + (el.dataset.suffix || "");
    if (current < target) requestAnimationFrame(update);
  };

  update();
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-number[data-target]").forEach((el) =>
  counterObserver.observe(el)
);

// =============================================
// NAVBAR — sombra al hacer scroll
// =============================================
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = "0 4px 30px rgba(0,0,0,0.5)";
  } else {
    nav.style.boxShadow = "none";
  }
});

// =============================================
// BOTÓN CONTACTO
// =============================================
const contactBtn = document.getElementById("contactBtn");

if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    const toast = document.createElement("div");
    toast.textContent = "✉️ ¡Mensaje enviado correctamente!";
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "2rem",
      left: "50%",
      transform: "translateX(-50%) translateY(20px)",
      background: "#e8c97a",
      color: "#0a0a0f",
      padding: "0.75rem 1.8rem",
      borderRadius: "100px",
      fontWeight: "500",
      fontSize: "0.9rem",
      zIndex: "9999",
      opacity: "0",
      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(20px)";
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  });
}

// =============================================
// SMOOTH SCROLL — enlaces del nav
// =============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

console.log("✅ main.js cargado correctamente.");
