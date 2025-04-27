document.addEventListener("DOMContentLoaded", function () {
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

  // Initialize
  window.addEventListener("load", () => {
    toggleScrollToTop();
  });
});
