/* =========================================================
   BETWEEN THE SHARDS — WEBSITE SCRIPTS
   Matrix rain, boot sequence, form handling, toasts
   ========================================================= */

(() => {
  'use strict';

  // =========================================================
  // MATRIX RAIN BACKGROUND
  // =========================================================

  const matrixCanvas = document.getElementById('matrix-canvas');
  const matrixCtx = matrixCanvas.getContext('2d');
  let matrixColumns = [];
  let matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=-_<>[]{}|';
  let animationId = null;

  function resizeMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    const fontSize = 14;
    const cols = Math.floor(matrixCanvas.width / fontSize);
    matrixColumns = Array(cols).fill(0).map(() => ({
      y: Math.random() * -matrixCanvas.height,
      speed: 0.5 + Math.random() * 1.5,
      chars: Array.from({ length: 10 + Math.floor(Math.random() * 15) }, () => 
        matrixChars[Math.floor(Math.random() * matrixChars.length)]
      )
    }));
  }

  function drawMatrix() {
    matrixCtx.fillStyle = 'rgba(5, 8, 15, 0.15)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    matrixCtx.font = '14px VT323, monospace';
    matrixCtx.textBaseline = 'top';
    matrixColumns.forEach((col, i) => {
      col.chars.forEach((char, j) => {
        const x = i * 14;
        const y = col.y + j * 14;
        if (y > matrixCanvas.height) return;
        const alpha = 1 - j / col.chars.length;
        const brightness = j === col.chars.length - 1 ? 1 : alpha * 0.6;
        matrixCtx.fillStyle = `rgba(0, 255, 204, ${brightness * 0.4})`;
        matrixCtx.fillText(char, x, y);
      });
      col.y += col.speed;
      if (col.y > matrixCanvas.height + 200) {
        col.y = -col.chars.length * 14;
        col.speed = 0.5 + Math.random() * 1.5;
      }
    });
    animationId = requestAnimationFrame(drawMatrix);
  }

  // =========================================================
  // BOOT SEQUENCE
  // =========================================================

  const bootLines = [
    '> INITIALIZING NEURAL_INTERFACE...',
    '> CHECKING SYSTEM_INTEGRITY... [OK]',
    '> LOADING MEMORY_FRAGMENTS... [OK]',
    '> ESTABLISHING SECURE_CHANNEL... [OK]',
    '> DECRYPTING SIGNAL_BEACON... [OK]',
    '> CALIBRATING REALITY_ANCHORS... [OK]',
    '> SYNCING TEMPORAL_COORDINATES... [OK]',
    '> VERIFYING PLAYER_ENTITY... [NOT_FOUND]',
    '> WARNING: PLAYER_NOT_FOUND IN THIS_TIMELINE',
    '> LAUNCHING TERMINAL_INTERFACE...',
    '> SYSTEM_READY // AWAITING_INPUT_'
  ];

  const bootOverlay = document.getElementById('boot-overlay');
  const bootLinesContainer = document.getElementById('boot-lines');

  async function playBootSequence() {
    return new Promise(resolve => {
      bootLines.forEach((line, i) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = 'boot-line';
          div.textContent = line;
          bootLinesContainer.appendChild(div);
          if (i === bootLines.length - 1) {
            setTimeout(() => {
              bootOverlay.classList.add('hidden');
              setTimeout(resolve, 500);
            }, 400);
          }
        }, i * 180 + 200);
      });
    });
  }

// =========================================================
  // SYSTEM TIME
  // =========================================================

  function updateSystemTime() {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const timeEl = document.getElementById('system-time');
    if (timeEl) timeEl.textContent = timeStr;
  }

  // =========================================================
  // TOAST NOTIFICATIONS
  // =========================================================

  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toast-in 0.3s ease-out reverse';
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  // =========================================================
  // VIDEO PLAYER HANDLING (self-hosted)
  // =========================================================

  const videoPlaceholder = document.getElementById('video-placeholder');
  const trailerVideo = document.getElementById('trailer-video');
  const retryVideoBtn = document.getElementById('retry-video');
  const videoStatus = document.getElementById('video-status');

  function showVideoPlayer() {
    videoPlaceholder.classList.add('hidden');
    trailerVideo.style.display = 'block';
    videoStatus.textContent = 'SIGNAL_STABLE';
    videoStatus.style.color = 'var(--c-neon)';
  }

  // Initial load - show video after short delay
  setTimeout(showVideoPlayer, 800);

  retryVideoBtn.addEventListener('click', () => {
    videoStatus.textContent = 'RECONNECTING...';
    videoStatus.style.color = 'var(--c-pink)';
    trailerVideo.style.display = 'none';
    videoPlaceholder.classList.remove('hidden');
    // Reload video
    trailerVideo.load();
    setTimeout(showVideoPlayer, 1500);
  });

  // Optional: pause video when hidden (save resources)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !trailerVideo.paused) {
      trailerVideo.pause();
    }
  });

  // =========================================================
  // ENTRANCE ANIMATIONS - Start panels immediately
  // =========================================================

  function startPanelAnimations() {
    const panels = document.querySelectorAll('.terminal-panel');
    panels.forEach((panel, i) => {
      panel.style.animationPlayState = 'running';
    });
  }

  // =========================================================
  // GLITCH EFFECT ON TITLE HOVER
  // =========================================================

  const gameTitle = document.querySelector('.game-title');
  let glitchInterval = null;

  gameTitle.addEventListener('mouseenter', () => {
    const originalText = gameTitle.dataset.text;
    let glitchCount = 0;
    glitchInterval = setInterval(() => {
      if (glitchCount > 5) {
        clearInterval(glitchInterval);
        gameTitle.querySelectorAll('.title-line').forEach((line, i) => {
          line.textContent = originalText.split(' ')[i] || '';
        });
        return;
      }
      const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      gameTitle.querySelectorAll('.title-line').forEach(line => {
        const text = line.textContent;
        const pos = Math.floor(Math.random() * text.length);
        const arr = text.split('');
        arr[pos] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        line.textContent = arr.join('');
      });
      glitchCount++;
    }, 50);
  });

  gameTitle.addEventListener('mouseleave', () => {
    clearInterval(glitchInterval);
    const originalText = gameTitle.dataset.text;
    gameTitle.querySelectorAll('.title-line').forEach((line, i) => {
      line.textContent = originalText.split(' ')[i] || '';
    });
  });
// =========================================================
  // PARALLAX EFFECT ON MOUSE MOVE
  // =========================================================

  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animateParallax() {
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    const panels = document.querySelectorAll('.terminal-panel');
    panels.forEach((panel, i) => {
      const depth = (i + 1) * 0.5;
      const x = targetX * depth;
      const y = targetY * depth;
      panel.style.transform = `translate(${x}px, ${y}px)`;
    });
    requestAnimationFrame(animateParallax);
  }

  // =========================================================
  // INITIALIZATION
  // =========================================================

  async function init() {
    resizeMatrix();
    drawMatrix();
    window.addEventListener('resize', resizeMatrix);
    
    await playBootSequence();
    
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
    
    // Start animations AFTER boot sequence
    startPanelAnimations();
    
    animateParallax();

  // Button hover sound
  const hoverSound = new Audio('bep.wav');
  hoverSound.volume = 0.3;
  document.querySelectorAll('.terminal-btn, .social-link').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(() => {});
    });
  });
}

// Handle reduced motion - skip all animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  bootOverlay.classList.add('hidden');
  document.querySelectorAll('.terminal-panel').forEach(p => {
    p.style.animation = 'none';
    p.style.opacity = '1';
    p.style.transform = 'none';
  });
  document.querySelectorAll('.title-line').forEach(l => {
    l.style.animation = 'none';
    l.style.opacity = '1';
    l.style.transform = 'none';
  });
  const subtitle = document.querySelector('.subtitle');
  if (subtitle) { subtitle.style.animation = 'none'; subtitle.style.opacity = '1'; }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.addEventListener('beforeunload', () => {
  if (animationId) cancelAnimationFrame(animationId);
});
})();
