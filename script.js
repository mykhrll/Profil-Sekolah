document.addEventListener("DOMContentLoaded", function() {
  // Alert selamat datang
  alert("Selamat datang di website SMK Negeri 2 Bandar Lampung!");

  // Jam Digital (diperbarui secara real-time)
  function updateJam() {
    const now = new Date(); // Ambil waktu sistem secara dinamis
    const jam = String(now.getHours()).padStart(2, "0");
    const menit = String(now.getMinutes()).padStart(2, "0");
    const detik = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("jam-digital").textContent = `${jam}:${menit}:${detik}`;
  }
  setInterval(updateJam, 1000); // Perbarui setiap detik
  updateJam(); // Panggil sekali saat halaman dimuat

  // Validasi form kontak
  const form = document.querySelector(".form-kontak");
  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const nama = document.getElementById("nama").value.trim();
      const email = document.getElementById("email").value.trim();
      const pesan = document.getElementById("pesan").value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nama || !email || !pesan) {
        alert("Mohon isi semua field (Nama, Email, dan Pesan) sebelum mengirim!");
        return;
      }
      if (!emailRegex.test(email)) {
        alert("Format email tidak valid! Gunakan format seperti: contoh@email.com");
        document.getElementById("email").focus();
        return;
      }
      alert(`Terima kasih, ${nama}! Pesan Anda telah dikirim.`);
      form.reset();
    });
  }

  // Animasi scroll
  function animateOnScroll() {
    const sections = document.querySelectorAll('.section-box');
    const windowHeight = window.innerHeight;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight * 0.8 && !section.classList.contains('animated')) {
        section.classList.add('animated');
      }
    });
  }
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Navigasi SPA-like
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');

  function showPage(targetId) {
    pages.forEach(page => {
      page.style.display = 'none';
    });
    const targetPage = document.querySelector(targetId);
    if (targetPage) {
      targetPage.style.display = 'block';
      animateOnScroll(); // Trigger animasi untuk page baru
    }
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      showPage(targetId);
      history.pushState(null, '', targetId); // Update URL tanpa reload
    });
  });

  // Handle back/forward browser
  window.addEventListener('popstate', function() {
    showPage(window.location.hash || '#beranda');
  });

  // Tampilkan page awal berdasarkan hash
  showPage(window.location.hash || '#beranda');

  // Tombol play manual untuk audio
  const audio = document.getElementById('audio-player');
  const playButton = document.getElementById('play-audio');
  if (audio && playButton) {
    let isPlaying = false;
    playButton.addEventListener('click', function() {
      if (isPlaying) {
        audio.pause();
        playButton.textContent = 'Play Lagu';
      } else {
        audio.play().catch(error => {
          console.log("Autoplay diblokir oleh browser: ", error);
          alert("Klik tombol lagi untuk memutar lagu setelah interaksi awal.");
        });
        playButton.textContent = 'Pause Lagu';
      }
      isPlaying = !isPlaying;
    });
  }
});