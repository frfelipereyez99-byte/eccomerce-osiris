const elementos = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  elementos.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});const track = document.getElementById("testimoniosTrack");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

if (track && next && prev) {
  next.addEventListener("click", () => {
    track.scrollLeft += 350;
  });

  prev.addEventListener("click", () => {
    track.scrollLeft -= 350;
  });
}const instTrack = document.getElementById("instTrack");
const instNext = document.querySelector(".inst-btn.next");
const instPrev = document.querySelector(".inst-btn.prev");

if (instTrack && instNext && instPrev) {
  instNext.addEventListener("click", () => {
    instTrack.scrollLeft += 350;
  });

  instPrev.addEventListener("click", () => {
    instTrack.scrollLeft -= 350;
  });
}const instTrack = document.getElementById("instTrack");
const instNext = document.querySelector(".inst-next");
const instPrev = document.querySelector(".inst-prev");

if (instTrack && instNext && instPrev) {
  instNext.addEventListener("click", () => {
    instTrack.scrollLeft += 390;
  });

  instPrev.addEventListener("click", () => {
    instTrack.scrollLeft -= 390;
  });

  let autoplay = setInterval(() => {
    instTrack.scrollLeft += 390;

    if (instTrack.scrollLeft + instTrack.clientWidth >= instTrack.scrollWidth - 10) {
      instTrack.scrollLeft = 0;
    }
  }, 3000);

  instTrack.addEventListener("mouseenter", () => clearInterval(autoplay));

  instTrack.addEventListener("mouseleave", () => {
    autoplay = setInterval(() => {
      instTrack.scrollLeft += 390;

      if (instTrack.scrollLeft + instTrack.clientWidth >= instTrack.scrollWidth - 10) {
        instTrack.scrollLeft = 0;
      }
    }, 3000);
  });
}

/* Abrir imagen grande */
const modalImg = document.getElementById("modalImg");
const modalFoto = document.getElementById("modalFoto");
const cerrarModal = document.getElementById("cerrarModal");

document.querySelectorAll(".inst-card img").forEach((img) => {
  img.addEventListener("click", () => {
    modalImg.style.display = "flex";
    modalFoto.src = img.src;
  });
});

if (cerrarModal) {
  cerrarModal.addEventListener("click", () => {
    modalImg.style.display = "none";
  });
}

if (modalImg) {
  modalImg.addEventListener("click", (e) => {
    if (e.target === modalImg) {
      modalImg.style.display = "none";
    }
  });
}function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("active");
}/* FLECHAS CARRUSEL INSTALACIONES */
const instTrack = document.getElementById("instTrack");
const instNext = document.querySelector(".inst-next");
const instPrev = document.querySelector(".inst-prev");

if (instTrack && instNext && instPrev) {
  instNext.addEventListener("click", () => {
    instTrack.scrollBy({
      left: 390,
      behavior: "smooth"
    });
  });

  instPrev.addEventListener("click", () => {
    instTrack.scrollBy({
      left: -390,
      behavior: "smooth"
    });
  });
}
