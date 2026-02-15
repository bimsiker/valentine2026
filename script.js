/* ============================================
   OUR LOVE JOURNEY - Valentine's Website JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- ELEMENTS ----
  const landing = document.getElementById('landing');
  const envelope = document.getElementById('envelope');
  const openBtn = document.getElementById('openBtn');
  const mainContent = document.getElementById('mainContent');
  const heartsBg = document.getElementById('heartsBg');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const askResponse = document.getElementById('askResponse');
  const askButtons = document.querySelector('.ask-buttons');
  const celebration = document.getElementById('celebration');
  const floatingHearts = document.getElementById('floatingHearts');
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');

  // ---- LANDING: FLOATING HEARTS BACKGROUND ----
  function createBgHearts() {
    const hearts = ['♥', '♡', '❤', '💕', '💗'];
    for (let i = 0; i < 25; i++) {
      const heart = document.createElement('span');
      heart.classList.add('bg-heart');
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (Math.random() * 20 + 12) + 'px';
      heart.style.animationDuration = (Math.random() * 8 + 6) + 's';
      heart.style.animationDelay = (Math.random() * 10) + 's';
      heartsBg.appendChild(heart);
    }
  }
  createBgHearts();

  // ---- ENVELOPE OPEN + ENTER SITE ----
  envelope.addEventListener('click', () => {
    envelope.classList.add('open');
  });

  openBtn.addEventListener('click', () => {
    envelope.classList.add('open');

    setTimeout(() => {
      landing.classList.add('fade-out');

      setTimeout(() => {
        landing.style.display = 'none';
        mainContent.classList.remove('hidden');
        document.body.style.overflow = 'auto';
        initScrollAnimations();
        createAskFloatingHearts();
      }, 800);
    }, 400);
  });

  // ---- SCROLL ANIMATIONS FOR TIMELINE ----
  function initScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const fadeInSections = document.querySelectorAll('.her-section, .love-letter-section, .timeline-section');

    // Add fade-in class to sections
    fadeInSections.forEach(section => {
      section.classList.add('fade-in-section');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => observer.observe(item));
    fadeInSections.forEach(section => observer.observe(section));
  }

  // ---- FLOATING HEARTS FOR ASK SECTION ----
  function createAskFloatingHearts() {
    const hearts = ['♥', '♡', '❤', '💗'];
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('span');
      heart.classList.add('float-heart');
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (Math.random() * 18 + 14) + 'px';
      heart.style.animationDuration = (Math.random() * 6 + 5) + 's';
      heart.style.animationDelay = (Math.random() * 8) + 's';
      floatingHearts.appendChild(heart);
    }
  }

  // ---- "NO" BUTTON - RUNS AWAY ----
  let noClickCount = 0;
  const noMessages = [
    "Are you sure? 🥺",
    "Please reconsider... 💔",
    "My heart can't take this! 😢",
    "I'll keep trying... ❤️"
  ];

  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    noClickCount++;

    // Make the No button run away
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 200;
    noBtn.style.position = 'relative';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${Math.max(0.5, 1 - noClickCount * 0.15)})`;

    // Change button text
    noBtn.textContent = noMessages[Math.min(noClickCount - 1, noMessages.length - 1)];

    // Make yes button grow
    const yesScale = 1 + noClickCount * 0.1;
    yesBtn.style.transform = `scale(${yesScale})`;

    // After enough tries, hide the No button
    if (noClickCount >= 4) {
      noBtn.style.opacity = '0';
      noBtn.style.pointerEvents = 'none';
    }
  });

  // ---- "YES" BUTTON - CELEBRATION ----
  yesBtn.addEventListener('click', () => {
    // Hide buttons
    askButtons.style.display = 'none';

    // Show response
    askResponse.classList.remove('hidden');

    // Launch celebration hearts
    launchCelebration();

    // Try to play music
    playMusic();
  });

  function launchCelebration() {
    const colors = ['#ff6b8a', '#ff385c', '#e91e63', '#d32f2f', '#ff8a9e', '#d4a054', '#ff4d6d'];
    const hearts = ['♥', '❤', '💕', '💗', '💖', '💝', '♡'];

    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const heart = document.createElement('span');
        heart.classList.add('confetti-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.fontSize = (Math.random() * 24 + 16) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        celebration.appendChild(heart);

        // Clean up after animation
        setTimeout(() => heart.remove(), 5000);
      }, i * 80);
    }

    // Second wave
    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const heart = document.createElement('span');
          heart.classList.add('confetti-heart');
          heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
          heart.style.left = Math.random() * 100 + '%';
          heart.style.color = colors[Math.floor(Math.random() * colors.length)];
          heart.style.fontSize = (Math.random() * 20 + 14) + 'px';
          heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
          celebration.appendChild(heart);
          setTimeout(() => heart.remove(), 5000);
        }, i * 100);
      }
    }, 2000);
  }

  // ---- MUSIC TOGGLE ----
  let isPlaying = false;

  function playMusic() {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicToggle.classList.add('playing');
    }).catch(() => {
      // Autoplay blocked, that's ok
    });
  }

  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
      musicToggle.classList.remove('playing');
    } else {
      playMusic();
    }
  });

  // Prevent scrolling on landing page
  document.body.style.overflow = 'hidden';

});
