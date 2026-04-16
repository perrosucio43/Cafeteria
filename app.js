document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // ANIMACIONES SCROLL
  // =========================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.zigzag-item, .product-card').forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.8s ease-out";
    observer.observe(item);
  });

  // =========================
  // SLIDER
  // =========================
  const track = document.querySelector(".track");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");
 

  let current = 0;

  // DOTS
  slides.forEach(() => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  // Obtener slides visibles (por categorías)
  function getVisibleSlides() {
  return [...slides].filter(s => !s.classList.contains("hidden"));
}

  // 🔥 UPDATE PRO (ALTURA DINÁMICA)
  function update() {
     const visibleSlides = getVisibleSlides();
  if (visibleSlides.length === 0) return;

  let offsetTop = 0;

  for (let i = 0; i < current; i++) {
    offsetTop += visibleSlides[i].offsetHeight + 12;
  }

  let translateY;

  // 🔥 MOBILE: NO centrar
  if (window.innerWidth < 768) {
    translateY = -offsetTop;
  } else {
    const centerOffset =
      (track.parentElement.offsetHeight / 2) -
      (visibleSlides[current].offsetHeight / 2);

    translateY = centerOffset - offsetTop;
  }

  track.style.transform = `translateY(${translateY}px)`;
  // 👉 🔥 CLAVE: ajustar altura del contenedor al slide activo
  const activeHeight = visibleSlides[current].offsetHeight;
  

  slides.forEach(s => s.classList.remove("active"));
  visibleSlides[current].classList.add("active");

    // dots
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[current]) dots[current].classList.add("active");
  }

  // BOTONES
  document.getElementById("next").onclick = () => {
    const visibleSlides = getVisibleSlides();
    current = (current + 1) % visibleSlides.length;
    update();
  };

  document.getElementById("prev").onclick = () => {
    console.log("g");
    const visibleSlides = getVisibleSlides();
    current = (current - 1 + visibleSlides.length) % visibleSlides.length;
    update();
  };

  // =========================
  // FIX IMPORTANTE (IMÁGENES + RESPONSIVE)
  // =========================
  window.addEventListener("load", update);
  window.addEventListener("resize", update);

  update();

  // =========================
  // NAVBAR
  // =========================
  const NavBar = document.querySelector(".nav-links");
  const btn = document.getElementById("MenuBtn");
  const links = document.querySelectorAll("a");
  const nav = document.querySelector(".navbar");

  btn.addEventListener("click", () => {
    NavBar.classList.toggle("active");

    if (NavBar.classList.contains("active")) {
      btn.innerHTML = "X";
      btn.setAttribute("aria-expanded", "true");
    } else {
      btn.innerHTML = "☰";
      btn.setAttribute("aria-expanded", "false");
    }
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      NavBar.classList.remove("active");
      btn.innerHTML = "☰";
    });
  });

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
      nav.classList.add("active");
      console.log("g");
    } else {
      nav.classList.remove("active");
    }

    lastScroll = currentScroll;
  });

  // =========================
  // CATEGORÍAS
  // =========================
  const categoryButtons = document.querySelectorAll(".cat");

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
console.log("g");
      // activar botón
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;

      // filtrar slides
      slides.forEach(slide => {
  if (category === "all" || slide.dataset.category === category) {
    slide.classList.remove("hidden");
  } else {
    slide.classList.add("hidden");
  }
});

      // reset
      current = 0;

// 🔥 esperar a que el DOM actualice alturas
requestAnimationFrame(() => {
  update();
});
    });
  });

  // =========================
  // EFECTO PARALLAX SUAVE (fondo)
  // =========================
  const section = document.querySelector(".products-slides");

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 30 - 15;
    const y = (e.clientY / window.innerHeight) * 30 - 15;

    section.style.setProperty("--moveX", `${x}px`);
    section.style.setProperty("--moveY", `${y}px`);
  });

});