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

// GLOBAL
let cartItems = [];

// GLOBAL FUNGSI
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
    cartCount.textContent = totalQty;
  }
}

function toggleCart() {
  alert("Isi keranjang akan muncul di sini nanti.");
}

function addToCart(name, price) {
  // Cari apakah produk sudah ada di keranjang
  const existing = cartItems.find((item) => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ name, price, qty: 1 });
  }

  updateCartCount();
  renderCart();
  showToast(`${name} masuk ke keranjang!`);
}

function toggleCart() {
  const dropdown = document.getElementById("cart-dropdown");
  dropdown.classList.toggle("hidden");
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (cartItems.length === 0) {
    container.innerHTML = "<p class='text-gray-500'>Keranjang kosong!</p>";
    return;
  }

  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    container.innerHTML += `
      <div class="flex justify-between items-center border-b pb-1">
        <div>
          <p class="font-semibold">${item.name}</p>
          <p class="text-xs text-gray-500">Rp${item.price.toLocaleString()} x ${item.qty} = <strong>Rp${subtotal.toLocaleString()}</strong></p>
        </div>
        <div class="flex items-center space-x-1">
          <button onclick="decreaseQty(${index})" class="px-2 bg-gray-200 hover:bg-gray-300 rounded">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${index})" class="px-2 bg-gray-200 hover:bg-gray-300 rounded">+</button>
        </div>
      </div>
    `;
  });

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  container.innerHTML += `
  <div class="pt-2 border-t text-right font-bold">
    Total: Rp${totalPrice.toLocaleString()}
  </div>
`;
}

function increaseQty(index) {
  cartItems[index].qty++;
  updateCartCount();
  renderCart();
}

function decreaseQty(index) {
  if (cartItems[index].qty > 1) {
    cartItems[index].qty--;
  } else {
    cartItems.splice(index, 1);
  }
  updateCartCount();
  renderCart();
}

function clearCart() {
  cartItems = [];
  updateCartCount();
  renderCart();
}

function checkoutWhatsApp() {
  if (cartItems.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let message = "Halo! Saya ingin memesan:\n";
  let total = 0;

  cartItems.forEach((item) => {
    message += `- ${item.qty}x ${item.name} (Rp${item.price.toLocaleString()})\n`;
    total += item.price * item.qty;
  });

  message += `\nTotal: Rp${total.toLocaleString()}`;
  const waNumber = "6281287192688"; // Ganti dengan nomor asli
  const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  window.open(waURL, "_blank");
}

function showToast(message = "Ditambahkan ke keranjang!") {
  const toast = document.getElementById("cart-toast");

  toast.textContent = message;
  toast.classList.remove("opacity-0", "pointer-events-none");
  toast.classList.add("opacity-100");

  // Hilangin setelah 3 detik
  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0", "pointer-events-none");
  }, 3000);
}
