/* ══════════════════════════════════════════
   SparkByE Portfolio – script.js
   ══════════════════════════════════════════ */

// ── Navbar scroll effect ─────────────────
const navbar   = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 30);
  scrollTop.classList.toggle('show', y > 400);
  updateActiveNavLink();
});

scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Mobile hamburger ─────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Active nav link on scroll ─────────────
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

// ── Typing effect ─────────────────────────
const roles = [
  'Frontend Developer 💻',
  'UI/UX Enthusiast 🎨',
  'Creative Coder ⚡',
  'Problem Solver 🧩',
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl  = document.getElementById('typedRole');

function typeRole() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, isDeleting ? 60 : 90);
}
typeRole();

// ── Counter animation ─────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const step     = target / (duration / 16);
    let   current  = 0;
    const timer    = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

// Trigger counters once hero is in view
const heroObserver = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) { animateCounters(); heroObserver.disconnect(); }
}, { threshold: 0.3 });
heroObserver.observe(document.querySelector('.hero'));

// ── Reveal on scroll ─────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Skill bar animation ───────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ── Contact form ──────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn     = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');

  btn.textContent = 'Sending… ⏳';
  btn.disabled    = true;

  // Simulate network request
  setTimeout(() => {
    btn.textContent = 'Send Message 🚀';
    btn.disabled    = false;
    success.classList.add('show');
    this.reset();

    setTimeout(() => success.classList.remove('show'), 4000);
  }, 1500);
});

// ── Footer year ───────────────────────────
document.getElementById('footerYear').textContent = new Date().getFullYear();
