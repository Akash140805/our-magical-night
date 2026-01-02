document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
   MONTHSARY PRELOADER (ONCE)
   =============================== */

const preloader = document.getElementById('monthsaryPreloader');

if (preloader) {
  // remove after animation completes
  setTimeout(() => {
    preloader.remove();
  }, 3200);
}


    /* ===============================
     MUSIC CONTROLS
     =============================== */

  const bgAudio = document.getElementById('bgAudio');
  const playBtn = document.getElementById('playBtn');
  const muteBtn = document.getElementById('muteBtn');

  if (bgAudio && playBtn) {
    playBtn.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play().catch(() => {});
        playBtn.textContent = '⏸';
      } else {
        bgAudio.pause();
        playBtn.textContent = '⏯︎';
      }
    });

    // soft autoplay attempt
    // setTimeout(() => {
    //   bgAudio.play().catch(() => {});
    // }, 600);
  }

  if (bgAudio && muteBtn) {
    muteBtn.addEventListener('click', () => {
      bgAudio.muted = !bgAudio.muted;
      muteBtn.textContent = bgAudio.muted ? '🔇' : '🔈';
    });
  }


  /* ===============================
     CORE PANEL SYSTEM (ONLY ONE)
     =============================== */

  const PANELS = ['hero', 'lanterns', 'timeline', 'final', 'letter'];

  function showScene(id) {
    PANELS.forEach(pid => {
      const el = document.getElementById(pid);
      if (el) el.classList.add('hidden');
    });

    const next = document.getElementById(id);
    if (next) next.classList.remove('hidden');
  }

  // Start on hero
  showScene('hero');

  /* ===============================
     LETTER OVERLAY
     =============================== */

  const letter = document.getElementById('letter');
  const blurOverlay = document.getElementById('blurOverlay');
  const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
  const paperSound = document.getElementById('paperSound');

  const closeLetterBtn = document.getElementById('closeLetter');
  const sendWishBtn = document.getElementById('sendWish');

  openEnvelopeBtn.addEventListener('click', () => {
  letter.classList.remove('hidden');

  if (paperSound) {
  paperSound.currentTime = 0;
  paperSound.volume = 0;
  paperSound.play().catch(() => {});

  let v = 0;
  const fade = setInterval(() => {
    v += 0.05;
    paperSound.volume = Math.min(v, 0.35);
    if (v >= 0.35) clearInterval(fade);
  }, 40);
}

const heartbeatAudio = document.getElementById('heartbeatAudio');
if (heartbeatAudio) {
  heartbeatAudio.volume = 0.55; // soft & romantic
}


  // 🎵 Soft music fade-in (only first time)
  if (bgAudio && bgAudio.paused) {
    bgAudio.volume = 0;
    bgAudio.play().catch(() => {});
    playBtn.textContent = '⏸';

    let v = 0;
    const fadeIn = setInterval(() => {
      v += 0.05;
      bgAudio.volume = Math.min(v, 1);
      if (v >= 1) clearInterval(fadeIn);
    }, 120);
  }
});



  closeLetterBtn.addEventListener('click', () => {
    letter.classList.add('hidden');
    // blurOverlay.classList.remove('active');
  });

  sendWishBtn.addEventListener('click', () => {
  letter.classList.add('hidden');
  showScene('lanterns');

  const lanternArea = document.getElementById('lanternArea');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      spawnLanterns();
    });
  });
});


  /* ===============================
     LANTERNS
     =============================== */

  const lanternArea = document.getElementById('lanternArea');

  function spawnLanterns() {
  if (!lanternArea) return;

  // ✅ Always reset
  lanternArea.innerHTML = '';

  const TOTAL_LANTERNS = 16;   // 🔥 good visible number
  const BATCH_DELAY = 180;    // spacing between lanterns

  for (let i = 0; i < TOTAL_LANTERNS; i++) {
    setTimeout(() => {
      const img = document.createElement('img');
      img.src = 'assets/lantern.png';
      img.className = 'lantern';

      img.style.left = `${8 + Math.random() * 84}%`;
      img.style.bottom = '-180px';
      img.style.width = `${70 + Math.random() * 70}px`;
      img.style.position = 'absolute';
      img.style.opacity = '0';

      lanternArea.appendChild(img);

      requestAnimationFrame(() => {
        img.style.transition =
          'transform 18s cubic-bezier(.25,.9,.25,1), opacity 1.8s';
        img.style.transform = `translateY(-${window.innerHeight + 500}px)`;
        img.style.opacity = '1';
      });

      setTimeout(() => img.remove(), 16000);
    }, i * BATCH_DELAY);
  }
}


  /* ===============================
     TIMELINE
     =============================== */

  const gotoTimelineBtn = document.getElementById('gotoTimelineBtn');
  const slides = Array.from(document.querySelectorAll('.slide'));
  let currentSlide = 0;

  function showSlide(i) {
    slides.forEach((s, idx) =>
      s.classList.toggle('active', idx === i)
    );
  }

  gotoTimelineBtn.addEventListener('click', () => {
    showScene('timeline');
    showSlide(0);
  });

  document.querySelectorAll('.nextSlide').forEach(btn => {
    btn.addEventListener('click', () => {
      currentSlide = Math.min(currentSlide + 1, slides.length - 1);
      showSlide(currentSlide);
    });
  });

  /* ===============================
     FINAL SCENE
     =============================== */

  const toFinalBtn = document.getElementById('toFinal');
  const finalLantern = document.getElementById('finalLantern');
  const finalMsg = document.getElementById('finalMsg');
  const restartBtn = document.getElementById('restartBtn');

  toFinalBtn.addEventListener('click', () => {
    showScene('final');
  });

  finalLantern.addEventListener('click', () => {

  /* 1️⃣ Lantern rises and fades */
  finalLantern.style.transition = 'transform 3s ease, opacity 2s';
  finalLantern.style.transform = 'translateY(-220vh)';
  finalLantern.style.opacity = '0';

  /* 2️⃣ Hearts appear */
  const leftHeart = document.querySelector('.heart.left');
  const rightHeart = document.querySelector('.heart.right');
  const mergedHeart = document.querySelector('.heart.merged');

  setTimeout(() => {
    leftHeart.classList.add('show');
    rightHeart.classList.add('show');
  }, 800);

  /* 3️⃣ Hearts move toward each other */
  setTimeout(() => {
    leftHeart.classList.add('merge');
    rightHeart.classList.add('merge');
  }, 2600);

  /* 4️⃣ Merge into one heart */
  /* 4️⃣ Merge into one heart */
setTimeout(() => {
  leftHeart.style.opacity = '0';
  rightHeart.style.opacity = '0';

  // 💓 HEARTBEAT SOUND
  if (heartbeatAudio) {
    heartbeatAudio.currentTime = 0;
    heartbeatAudio.play().catch(() => {});
  }

  setTimeout(() => {
    mergedHeart.style.opacity = '1';
    mergedHeart.classList.add('show');
  }, 300);

}, 4200);


  /* 5️⃣ Heart shower */
  setTimeout(() => {
    startHeartShower();
  }, 3400);

  /* 6️⃣ Final message fades in */
  setTimeout(() => {
    finalMsg.classList.remove('hidden');
    finalMsg.classList.add('show');
    finalMsg.style.display = 'flex';
  }, 4200);

  /* 7️⃣ "I love you" reveal */
setTimeout(() => {
  const loveLine = document.getElementById('loveLine');
  if (loveLine) {
    loveLine.classList.remove('hidden');
    loveLine.classList.add('show');
  }
}, 5400);

});


  restartBtn.addEventListener('click', () => {

  // 🔁 RESET TIMELINE
  currentSlide = 0;
  showSlide(0);

  // 🔁 RESET FINAL MESSAGE COMPLETELY
  if (finalMsg) {
    finalMsg.classList.remove('show');
    finalMsg.classList.add('hidden');   // ✅ IMPORTANT
    finalMsg.style.display = 'none';
    finalMsg.style.opacity = '';
    finalMsg.style.transform = '';
  }

  // 🔁 RESET FINAL LANTERN
  if (finalLantern) {
  finalLantern.style.transition = 'none';
  finalLantern.style.transform = 'translateY(0)';
  finalLantern.style.opacity = '1';

  // force reflow so browser re-applies animation next time
  finalLantern.offsetHeight;

  finalLantern.style.transition = '';
}


  // 🔁 HIDE FINAL SCENE & GO HOME
  lanternArea.innerHTML = '';
  showScene('hero');
  currentSlide = 0;
  showSlide(0);

  document.querySelectorAll('.heart').forEach(h => {
  h.className = h.classList.contains('merged')
    ? 'heart merged'
    : h.classList.contains('left')
    ? 'heart left'
    : 'heart right';
  h.style.opacity = '';
});

});

function startHeartShower() {
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.className = 'falling-heart';
      h.style.left = Math.random() * window.innerWidth + 'px';
      h.style.top = '-20px';
      document.body.appendChild(h);

      setTimeout(() => h.remove(), 7000);
    }, i * 180);
  }
}



  /* ===============================
     PETALS (UNCHANGED)
     =============================== */

  const canvas = document.getElementById('petals');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const petals = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 6 + Math.random() * 10,
    s: 0.4 + Math.random(),
    a: Math.random() * Math.PI * 2
  }));

  function drawPetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,180,210,0.6)';
      ctx.fill();
      ctx.restore();

      p.y += p.s;
      if (p.y > canvas.height) p.y = -20;
    });
    requestAnimationFrame(drawPetals);
  }
  drawPetals();

});

  /* ===============================
     COMET ANIMATION
     =============================== */

  const comet = document.getElementById('comet');

  if (comet) {
    function flyComet() {
      comet.style.transition = 'none';
      comet.style.transform = 'translateX(-300%)';
      comet.style.opacity = 0;

      setTimeout(() => {
        comet.style.transition = 'transform 6s linear, opacity 1s';
        comet.style.opacity = 1;
        comet.style.transform = 'translateX(360%)';
      }, 300);

      setTimeout(flyComet, 9000 + Math.random() * 4000);
    }

    flyComet();
  }

  /* ===============================
   CURSOR HEART TRAIL
   =============================== */

/* ===============================
   CURSOR HEART TRAIL 💖
   =============================== */

let lastHeartTime = 0;

function spawnCursorHeart(x, y) {
  const now = Date.now();
  if (now - lastHeartTime < 50) return; // throttle
  lastHeartTime = now;

  const heart = document.createElement('div');
  heart.className = 'cursor-heart';
  heart.textContent = '💖';

  heart.style.left = x + 'px';
  heart.style.top = y + 'px';

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1400);
}

// Desktop mouse
document.addEventListener('mousemove', e => {
  spawnCursorHeart(e.clientX, e.clientY);
});

// Mobile touch
document.addEventListener(
  'touchmove',
  e => {
    if (e.touches && e.touches.length > 0) {
      spawnCursorHeart(
        e.touches[0].clientX,
        e.touches[0].clientY
      );
    }
  },
  { passive: true }
);



