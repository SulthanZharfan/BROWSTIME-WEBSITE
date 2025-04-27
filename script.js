document.addEventListener("DOMContentLoaded", function () {
  // Create falling cookies
  function createCookies() {
    const container = document.getElementById("cookieContainer");
    const cookieTypes = ["🍪", "🍩", "🧁", "🥨", "🍬"];

    for (let i = 0; i < 15; i++) {
      const cookie = document.createElement("div");
      cookie.className = "cookie";
      cookie.textContent = cookieTypes[Math.floor(Math.random() * cookieTypes.length)];
      cookie.style.left = Math.random() * 100 + "vw";
      cookie.style.fontSize = Math.random() * 20 + 10 + "px";
      cookie.style.animationDuration = Math.random() * 10 + 10 + "s";
      cookie.style.animationDelay = Math.random() * 5 + "s";
      container.appendChild(cookie);
    }
  }

  // Scroll to top button show/hide
  function toggleScrollToTop() {
    const scrollToTop = document.getElementById("scrollToTop");
    if (window.scrollY > 300) {
      scrollToTop.classList.remove("opacity-0", "invisible");
      scrollToTop.classList.add("opacity-100", "visible");
    } else {
      scrollToTop.classList.remove("opacity-100", "visible");
      scrollToTop.classList.add("opacity-0", "invisible");
    }
  }

  // Smooth scrolling for internal navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Music Play Control
  const musicButton = document.getElementById("musicButton");
  const mySong = document.getElementById("mySong");
  let isPlaying = false;

  if (mySong) {
    mySong.volume = 0.1; // Set volume kecil

    // Klik tombol Music untuk toggle Play/Pause
    musicButton.addEventListener("click", () => {
      if (isPlaying) {
        mySong.pause();
        isPlaying = false;
      } else {
        mySong.play();
        isPlaying = true;
      }
    });

    // Ini trick fix: klik pertama dimana saja ➔ play musik
    const startMusic = () => {
      if (!isPlaying) {
        mySong.play();
        isPlaying = true;
      }
      document.removeEventListener("click", startMusic); // Hapus event setelah sukses
    };

    document.addEventListener("click", startMusic);
  }

  // Scroll to Top button click
  const scrollToTop = document.getElementById("scrollToTop");
  scrollToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Initialize after page fully loaded
  createCookies();
  toggleScrollToTop();

  window.addEventListener("scroll", toggleScrollToTop);
});
