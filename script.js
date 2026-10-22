/**
 * 20/10 K19 TÂM LÝ HỌC • THE COSMIC ROSE ARCHIVE
 * 3D Heart Galaxy Engine, Explosive Ambush Cannon, Web Audio & Haptic System
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Web Audio Synthesizer (Celebratory Chords & Boom Cannon)
     ========================================================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.initialized = false;
    }

    init() {
      if (!this.initialized) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
          this.initialized = true;
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }

    // Triumphant Ambush Fanfare (Harp & Celesta Glissando)
    playAmbushChords() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const baseTime = this.ctx.currentTime;
      // Majestic E-Major / Rose Gold Pentatonic notes (Hz)
      const notes = [329.63, 415.30, 493.88, 659.25, 830.61, 987.77, 1318.51];

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = baseTime + idx * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.2);
      });
    }

    // Deep Sub-Bass Explosion "Bùm"
    playBoom() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.55);
    }

    // High Laser "Pew-Pew"
    playPew(pitch = 1050) {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.16);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    }

    // Twinkle Sparkle
    playTwinkle() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1350 + Math.random() * 400, now);
      osc.frequency.exponentialRampToValueAtTime(1900, now + 0.12);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    }
  }

  const sound = new SoundEngine();

  // Scroll reset & lock to top on initial load
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  /* ==========================================================================
     2. Haptic Vibration & Screen Shake Engine (Không rung body để tránh giật canvas)
     ========================================================================== */
  let canvasShakeX = 0;
  let canvasShakeY = 0;
  let userHasInteracted = false;

  const markUserInteracted = () => { userHasInteracted = true; };
  window.addEventListener('pointerdown', markUserInteracted, { capture: true });
  window.addEventListener('touchstart', markUserInteracted, { capture: true, passive: true });
  window.addEventListener('click', markUserInteracted, { capture: true });

  function triggerHaptic(type = 'medium') {
    if (!('vibrate' in navigator)) return;

    // Tránh Chrome Intervention: Chỉ gọi vibrate khi người dùng đã có tương tác (tap/click)
    if (navigator.userActivation && !navigator.userActivation.hasBeenActive) {
      return;
    }
    if (!userHasInteracted) {
      return;
    }

    try {
      if (type === 'mega') {
        // Intense rhythmic rumble "đùng đùng"
        navigator.vibrate([100, 40, 120, 50, 250, 60, 400]);
      } else if (type === 'firework') {
        navigator.vibrate([60, 30, 80, 40, 150]);
      } else {
        navigator.vibrate([50, 30, 60]);
      }
    } catch (err) {}
  }

  function triggerScreenShake(isMega = false) {
    const stage = document.getElementById('stage');
    if (stage) {
      const className = isMega ? 'shake-mega' : 'shake-rumble';
      stage.classList.remove('shake-rumble', 'shake-mega');
      void stage.offsetWidth; // Force reflow
      stage.classList.add(className);

      setTimeout(() => {
        stage.classList.remove(className);
      }, isMega ? 750 : 500);
    }

    // Camera canvas jitter mượt mà bên trong canvas, không đụng vào CSS transform của body
    const duration = isMega ? 750 : 500;
    const startTime = performance.now();
    const intensity = isMega ? 14 : 7;

    function jitterCamera(now) {
      const elapsed = now - startTime;
      if (elapsed < duration) {
        const decay = 1 - elapsed / duration;
        canvasShakeX = (Math.random() - 0.5) * intensity * decay;
        canvasShakeY = (Math.random() - 0.5) * intensity * decay;
        requestAnimationFrame(jitterCamera);
      } else {
        canvasShakeX = 0;
        canvasShakeY = 0;
      }
    }
    requestAnimationFrame(jitterCamera);
  }

  /* ==========================================================================
     3. 3D Heart Galaxy & Cosmic Particle System
     ========================================================================== */
  const canvas = document.getElementById('galaxy-canvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  /* ==========================================================================
     3. Explosive Fireworks & Rose Petals Particles (Chỉ chạy khi bấm)
     ========================================================================== */
  const activeParticles = [];

  class BlastParticle {
    constructor(x, y, kind = 'heart', options = {}) {
      this.x = x;
      this.y = y;
      this.kind = kind; // 'heart' | 'petal' | 'sparkle'

      const angle = options.angle !== undefined ? options.angle : Math.random() * Math.PI * 2;
      const speed = options.speed !== undefined ? options.speed : Math.random() * 9 + 3;

      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      this.gravity = options.gravity !== undefined ? options.gravity : 0.14;
      this.drag = options.drag !== undefined ? options.drag : 0.97;

      this.size = options.size || Math.random() * 14 + 10;
      this.maxLife = options.life || Math.random() * 60 + 70;
      this.life = this.maxLife;

      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.1;

      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.08 + 0.02;

      const heartColors = ['#FF6584', '#FF85A1', '#FFAAA6', '#E27991', '#FFFFFF'];
      const petalColors = ['#FF6584', '#D96B82', '#F8B1BF', '#B82046', '#FFAAA6'];
      const sparkleColors = ['#E5C378', '#FFF3D1', '#FFFFFF', '#FFD700'];

      if (this.kind === 'heart') {
        this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
      } else if (this.kind === 'petal') {
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      } else {
        this.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      }
    }

    update() {
      this.vx *= this.drag;
      this.vy = (this.vy + this.gravity) * this.drag;

      this.x += this.vx;
      this.y += this.vy;

      this.rotation += this.rotSpeed;
      this.wobble += this.wobbleSpeed;

      this.life--;
      return this.life > 0;
    }

    draw(context) {
      const alpha = Math.max(0, this.life / this.maxLife);
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.rotation);
      context.globalAlpha = alpha;

      if (this.kind === 'heart') {
        this.drawHeart(context);
      } else if (this.kind === 'petal') {
        this.drawPetal(context);
      } else {
        this.drawSparkle(context);
      }

      context.restore();
    }

    drawHeart(context) {
      const s = this.size * 0.6;
      context.fillStyle = this.color;
      context.shadowBlur = 8;
      context.shadowColor = this.color;
      context.beginPath();
      context.moveTo(0, s * 0.3);
      context.bezierCurveTo(-s, -s * 0.6, -s * 1.3, s * 0.4, 0, s * 1.3);
      context.bezierCurveTo(s * 1.3, s * 0.4, s, -s * 0.6, 0, s * 0.3);
      context.fill();
    }

    drawPetal(context) {
      // 3D fluttering rotation
      context.scale(Math.sin(this.wobble), 1);
      const w = this.size * 0.75;
      const h = this.size * 1.25;

      context.fillStyle = this.color;
      context.beginPath();
      context.moveTo(0, -h / 2);
      context.quadraticCurveTo(w, 0, 0, h / 2);
      context.quadraticCurveTo(-w, 0, 0, -h / 2);
      context.fill();
    }

    drawSparkle(context) {
      const s = this.size * 0.55;
      context.fillStyle = this.color;
      context.shadowBlur = 10;
      context.shadowColor = this.color;
      context.beginPath();
      context.moveTo(0, -s);
      context.lineTo(s * 0.25, -s * 0.25);
      context.lineTo(s, 0);
      context.lineTo(s * 0.25, s * 0.25);
      context.lineTo(0, s);
      context.lineTo(-s * 0.25, s * 0.25);
      context.lineTo(-s, 0);
      context.lineTo(-s * 0.25, -s * 0.25);
      context.closePath();
      context.fill();
    }
  }

  // Fire Particle Burst
  function spawnCannon(x, y, count = 80, kinds = ['heart', 'petal', 'sparkle'], maxSpeed = 14) {
    for (let i = 0; i < count; i++) {
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      activeParticles.push(
        new BlastParticle(x, y, kind, {
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * maxSpeed + 2,
          size: Math.random() * 12 + 10,
          life: Math.random() * 60 + 60,
          gravity: kind === 'sparkle' ? 0.06 : 0.14
        })
      );
    }
  }

  // Petal Storm Generator
  function spawnPetalRain(count = 90) {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = -Math.random() * 150;
      activeParticles.push(
        new BlastParticle(x, y, 'petal', {
          angle: Math.PI / 2 + (Math.random() - 0.5) * 0.4,
          speed: Math.random() * 2.5 + 1.2,
          size: Math.random() * 14 + 10,
          life: Math.random() * 140 + 140,
          gravity: 0.04,
          drag: 0.99
        })
      );
    }
  }

  /* ==========================================================================
     5. K19 FEMALE STUDENTS LIST & FLOATING STARS
     ========================================================================== */
  const FEMALE_STUDENTS = [
    "Hồ Xuân An", "Lê Trường An", "Nguyễn Thị Bình An", "Nguyễn Thúy An", "Vũ Bùi Mỹ An",
    "Bùi Mỹ Anh", "Đào Bảo Anh", "Đặng Phương Anh", "Đỗ Ngọc Xuân Anh", "Lê Hà Anh",
    "Lê Thị Ngọc Anh", "Nguyễn Thị Quỳnh Anh", "Nguyễn Duy Hồng Ánh", "Trần Dương Ngọc Bích",
    "Tô Huỳnh Kim Chi", "Võ Thị Hồng Diệu", "Trần Ngọc Hạnh Dung", "Huỳnh Lâm Yến Đan",
    "Phí Trần Bảo Hân", "Trương Ngọc Thảo Hiếu", "Lê Đinh Hnga", "Nguyễn Thị Quỳnh Hoa",
    "Phan Khánh Hoài", "Nguyễn Trần Ngọc Khánh", "Triệu Kim Khánh", "Đỗ Thùy Lâm",
    "Bùi Hà Linh", "Nguyễn Thị Khánh Linh", "Phạm Thị Trúc Linh", "Trần Khánh Linh",
    "Vũ Thị Mai Linh", "Nguyễn Vũ Khánh Ly", "Hoàng Gia Mẫn", "Lê Cẩm Minh",
    "Võ Nguyễn Thảo Minh", "Châu My My", "Trần Thị Mỹ Nương", "Nguyễn Thị Tuyết Nga",
    "Bạch Ngọc Ngà", "Mai Thanh Ngân", "Trần Hoàng Khánh Ngân", "Trần Yến Nghi",
    "Trịnh Bảo Nghi", "Lê Nguyễn Bảo Ngọc", "Phạm Mỹ Ngọc", "Lương Thảo Nguyên",
    "Nguyễn Phương Tam Nguyên", "Nguyễn Thị Minh Nguyệt", "Đào Ngọc Tuyết Nhi",
    "Lê Thị Yến Nhi", "Nguyễn Phương Nhi", "Võ Song Nhi", "Nguyễn Ngọc Như Phúc",
    "Hồ Ngọc Phụng", "Lang Kim Phụng", "Hoàng Thị Ngọc Phương", "Phạm Hà Triều Quy",
    "Nguyễn Thị Hoàng Tâm", "Tô Cẩm Tiên", "Trương Phụng Tiên", "Huỳnh Thị Minh Tuệ",
    "Nguyễn Nguyên An Tuệ", "Nguyễn Thị Thanh Thanh", "Hoàng Gia Thảo", "Lê Y Thiên",
    "Nguyễn Thị Mỹ Thoa", "Đinh Phương Thùy", "Nguyễn Anh Thư", "Nguyễn Đặng Anh Thư",
    "Nguyễn Hà Mai Thư", "Nguyễn Lê Thư", "Nguyễn Ngọc Minh Thư", "Nguyễn Thị Ánh Thư",
    "Trần Anh Thư", "Nguyễn Hoài Thương", "Nguyễn Hồ Huyền Trang", "Bùi Bích Trâm",
    "Đoàn Thị Thảo Trâm", "Ngô Khánh Trâm", "Trương Huỳnh Bảo Trân", "Lê Thanh Triệu",
    "Nguyễn Ngọc Phương Trinh", "Nguyễn Thị Thu Vân", "Đoàn Ngô Thúy Vi", "Đỗ Việt Thảo Vy",
    "Lê Bùi Thảo Vy", "Nguyễn Hoàng Tường Vy", "Phạm Ngô Tường Vy", "Phan Ngọc Phương Vy",
    "Tào Vi Hương", "Huỳnh Thị Thảo Ly", "Bá Thị Hồng Nhung", "Từ Thị Áo Trắng",
    "Trì Thị Ngọc Trân", "Lâm Hải Triều"
  ];

  /* ==========================================================================
     6. 2D WATERFALL OF NAMES BACKGROUND (Smooth Compositor Stream, 0 Lag)
     ========================================================================== */
  const SWEET_BADGES = [
    "Bóng Hồng K19 💕",
    "Xinh Đẹp Tuyệt Vời 🌸",
    "Tâm Lý Học K19 🧠💖",
    "Rực Rỡ Nhất 20/10 ✨",
    "Luôn Được Yêu Thương 💗",
    "Vô Thức Ngọt Ngào 💖",
    "Điểm A Đại Cương 💯",
    "Mãi Mãi Tỏa Sáng 🌟",
    "Đóa Hoa K19 🌷"
  ];

  function initWaterfallBackground() {
    const container = document.getElementById('waterfall-bg');
    if (!container) return;

    container.innerHTML = '';
    const numColumns = 5;
    const heartIcons = [' 💖', ' 💕', ' 🌸', ' ✨', ' 💗'];

    // Combine student names with occasional badges
    const allItems = [];
    FEMALE_STUDENTS.forEach((name, idx) => {
      const icon = heartIcons[idx % heartIcons.length];
      allItems.push(name + icon);
      if (idx % 8 === 0) {
        allItems.push(SWEET_BADGES[(idx / 8) % SWEET_BADGES.length]);
      }
    });

    // Shuffle helper
    function shuffle(array) {
      const copy = array.slice();
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    for (let c = 0; c < numColumns; c++) {
      const colDiv = document.createElement('div');
      colDiv.className = 'bg-waterfall-col';

      // Shuffled distinct list for each column
      const colItems = shuffle(allItems);
      // Double the items for seamless infinite 50% translation
      const doubled = colItems.concat(colItems);

      doubled.forEach((itemText) => {
        const span = document.createElement('span');
        span.className = 'bg-name-item';
        span.textContent = itemText;
        colDiv.appendChild(span);
      });

      container.appendChild(colDiv);
    }
  }

  initWaterfallBackground();

  /* ==========================================================================
     7. ULTRA-LIGHTWEIGHT CANVAS RENDER LOOP (Only bursts & confetti on demand)
     ========================================================================== */
  let isCanvasDirty = false;

  function renderLoop() {
    if (activeParticles.length > 0) {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(canvasShakeX, canvasShakeY);

      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];
        if (!p.update()) {
          activeParticles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      ctx.restore();
      isCanvasDirty = true;
    } else if (isCanvasDirty) {
      // Clear once when all particles settle to save 100% GPU / CPU
      ctx.clearRect(0, 0, width, height);
      isCanvasDirty = false;
    }

    requestAnimationFrame(renderLoop);
  }

  requestAnimationFrame(renderLoop);

  /* ==========================================================================
     8. AMBUSH TRIGGER LOGIC ("ÚP SỌT BẰNG HIỆU ỨNG" + NHẠC AMEE EM BÉ)
     ========================================================================== */
  let ambushTriggered = false;
  const bgAudio = document.getElementById('bg-music');
  const CHORUS_START = 35; // 0:35
  const CHORUS_END = 66;   // 1:06

  // Loop strictly within the requested segment: 0:35 -> 1:06
  if (bgAudio) {
    bgAudio.addEventListener('timeupdate', () => {
      if (bgAudio.currentTime >= CHORUS_END) {
        bgAudio.currentTime = CHORUS_START;
        bgAudio.play().catch(() => {});
      }
    });
  }

  function playChorus() {
    if (!bgAudio || sound.isMuted) return;
    try {
      if (bgAudio.currentTime < CHORUS_START || bgAudio.currentTime >= CHORUS_END) {
        bgAudio.currentTime = CHORUS_START;
      }
      bgAudio.volume = 0.85;
      bgAudio.play().catch((err) => {
        console.log('Audio autoplay restriction:', err);
      });
    } catch (e) {
      console.log('Play chorus error:', e);
    }
  }

  function executeAmbush(isFromUser = false) {
    if (ambushTriggered) return;
    ambushTriggered = true;
    if (isFromUser) {
      userHasInteracted = true;
    }

    // 1. Mở khoá cuộn trang
    document.body.classList.remove('locked-curtain');
    window.scrollTo(0, 0);

    // 2. Hide curtain with fadeout
    const curtain = document.getElementById('intro-curtain');
    if (curtain) {
      curtain.classList.add('hidden');
    }

    // 3. Play AMEE - Em Bé chorus (0:35 - 1:06)
    playChorus();

    // 4. Play sound effects
    sound.init();
    sound.playBoom();
    setTimeout(() => sound.playPew(1100), 150);

    // 5. Screen shake & haptic (chỉ rung nếu có tương tác người dùng thực sự)
    triggerScreenShake(true);
    if (userHasInteracted) {
      triggerHaptic('mega');
    }

    // 6. Festive particle explosions (center blast + sweet petals)
    const centerX = width / 2;
    const centerY = height / 2;

    spawnCannon(centerX, centerY, 70, ['heart', 'petal', 'sparkle'], 15);
    setTimeout(() => spawnCannon(centerX - 100, centerY - 60, 40, ['heart', 'sparkle'], 11), 200);
    setTimeout(() => spawnCannon(centerX + 100, centerY - 60, 40, ['petal', 'sparkle'], 11), 350);
    setTimeout(() => spawnPetalRain(45), 500);
  }

  // Trigger ambush on first click/touch anywhere on screen
  const introCurtain = document.getElementById('intro-curtain');
  if (introCurtain) {
    introCurtain.addEventListener('click', () => executeAmbush(true));
    introCurtain.addEventListener('touchstart', () => executeAmbush(true), { passive: true });
  }

  // Auto-ambush fallback if no user action after 2.5s
  setTimeout(() => {
    if (!ambushTriggered) {
      executeAmbush(false);
    }
  }, 2500);

  /* ==========================================================================
     9. TAP ANYWHERE INTERACTIVITY (Pháo hoa trái tim mọi lúc chạm)
     ========================================================================== */
  function handleScreenTap(e) {
    userHasInteracted = true;
    // If ambush hasn't fired yet, fire ambush
    if (!ambushTriggered) {
      executeAmbush(true);
      return;
    }

    // If audio paused or restricted, resume
    if (bgAudio && bgAudio.paused && !sound.isMuted) {
      playChorus();
    }

    // If clicking a button, let the button handler manage it
    if (e.target.closest('button')) return;

    sound.playTwinkle();
    triggerHaptic('gentle');
    spawnCannon(e.clientX, e.clientY, 18, ['heart', 'petal', 'sparkle'], 7);
  }

  window.addEventListener('click', handleScreenTap);

  /* ==========================================================================
     10. BUTTON LISTENERS & CONTROLS
     ========================================================================== */
  // Sound Toggle Pill
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  const soundText = document.getElementById('sound-text');

  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMuted = sound.toggleMute();
      if (isMuted) {
        if (bgAudio) bgAudio.pause();
        soundIcon.textContent = '🔕';
        soundText.textContent = 'Nhạc: TẮT';
        soundBtn.classList.add('muted');
      } else {
        if (bgAudio) {
          if (bgAudio.currentTime < CHORUS_START || bgAudio.currentTime >= CHORUS_END) {
            bgAudio.currentTime = CHORUS_START;
          }
          bgAudio.play().catch(() => {});
        }
        sound.init();
        sound.playTwinkle();
        soundIcon.textContent = '🎵';
        soundText.textContent = 'AMEE - Em Bé';
        soundBtn.classList.remove('muted');
      }
    });
  }

  // Action Buttons in Letter Mode
  const btnBlastMore = document.getElementById('btn-blast-more');
  if (btnBlastMore) {
    btnBlastMore.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = btnBlastMore.getBoundingClientRect();
      const ox = rect.left + rect.width / 2;
      const oy = rect.top + rect.height / 2;

      sound.playBoom();
      sound.playPew(1150);
      triggerScreenShake(true);
      triggerHaptic('mega');
      spawnCannon(ox, oy, 80, ['heart', 'petal', 'sparkle'], 14);
    });
  }

  const btnPetalStorm = document.getElementById('btn-petal-storm');
  if (btnPetalStorm) {
    btnPetalStorm.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playTwinkle();
      sound.playAmbushChords();
      triggerHaptic('firework');
      spawnPetalRain(70);
    });
  }

  const btnShakeRumble = document.getElementById('btn-shake-rumble');
  if (btnShakeRumble) {
    btnShakeRumble.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playBoom();
      sound.playBoom();
      triggerScreenShake(true);
      triggerHaptic('mega');
      spawnCannon(width / 2, height / 2, 60, ['heart', 'sparkle'], 13);
    });
  }

  console.log("%c20/10 K19 TÂM LÝ HỌC • SMOOTH 2D WATERFALL BACKGROUND READY", "color:#FF6584; font-size:14px; font-weight:bold;");
})();

