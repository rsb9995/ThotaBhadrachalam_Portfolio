/* ==========================================================================
   Thota Bhadrachalam - Portfolio JavaScript Application
   Enhanced Mobile Responsiveness & Touch Navigation Handlers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Typing Text Effect --- */
  const typedTextSpan = document.getElementById('typed-text');
  const roles = [
    'Software Developer',
    'AIML Diploma Student',
    'Full Stack Web Developer',
    'AI & Vibe Coding Enthusiast'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typedTextSpan) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  /* --- 2. Header Scroll & Active Section Highlight --- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Header shadow background
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy active link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* --- 3. Mobile Navigation Menu & Touch Handlers --- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-links');

  function closeMobileMenu() {
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileToggle) {
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    }
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      const icon = mobileToggle.querySelector('i');
      
      if (isOpen) {
        icon.className = 'fa-solid fa-xmark';
        document.body.style.overflow = 'hidden'; // Lock background scrolling
      } else {
        icon.className = 'fa-solid fa-bars';
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close menu when clicking outside of nav menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  /* --- 4. Interactive Project Detail Modals --- */
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalTags = document.getElementById('modal-tags');
  const modalClose = document.getElementById('modal-close');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const projectDetails = {
    'college': {
      title: 'Basic College Website with Firebase Database',
      description: 'A comprehensive educational website built for college information delivery. Integrated with Google Firebase Realtime Database to store and serve student notices, department updates, and contact submissions dynamically.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Firebase DB', 'Cloud Firestore']
    },
    'rsb-cyber-shield': {
      title: 'RSB Cyber Shield – AI-Based Cybersecurity & Threat Detection',
      description: 'An advanced AI-powered cybersecurity web application currently under active development. RSB Cyber Shield leverages machine learning algorithms and real-time network analysis to identify security vulnerabilities, detect digital threats, and protect online assets.',
      tags: ['AI / AIML', 'Cyber Security', 'Threat Detection', 'Python', 'In Progress']
    }
  };

  function openModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      if (data) {
        modalTitle.textContent = data.title;
        modalBody.textContent = data.description;
        modalTags.innerHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        openModal();
      }
    });
  });

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  /* --- 5. View Resume Button Modal --- */
  const viewResumeBtn = document.getElementById('view-resume-btn');
  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', () => {
      modalTitle.textContent = 'Thota Bhadrachalam - Resume Summary';
      modalBody.innerHTML = `
        <div style="text-align: left;">
          <h4 style="color: var(--text-main); margin-bottom: 0.5rem;">Thota Bhadrachalam</h4>
          <p style="font-size: 0.9rem; margin-bottom: 1rem;">Location: Kajuluru, Kakinada | Email: thotabhadrachalam24@gmail.com | Phone: +91 9010105077</p>
          <p style="font-size: 0.88rem; margin-bottom: 1rem; color: var(--accent-cyan);">
            <i class="fa-brands fa-github"></i> <a href="https://github.com/rsb9995" target="_blank" style="color: var(--accent-cyan); text-decoration: underline;">github.com/rsb9995</a> &nbsp;|&nbsp; 
            <i class="fa-brands fa-linkedin"></i> <a href="https://linkedin.com/in/bhadra9995" target="_blank" style="color: var(--accent-blue); text-decoration: underline;">linkedin.com/in/bhadra9995</a>
          </p>
          <hr style="border-color: var(--border-color); margin-bottom: 1rem;">
          <p><strong>Education:</strong> Diploma in AIML (Pydah College of Eng.) | SSC (Tagore High School - 456/600)</p>
          <p><strong>Skills:</strong> HTML, CSS, JavaScript, Python, SQL, Vibe Coding, Full Stack Web Dev (Basic)</p>
          <p><strong>Projects:</strong> College Website with Firebase DB, AI Web Assistant</p>
          <p><strong>Strengths:</strong> Quick Learner, Teamwork, Communication, Time Management</p>
        </div>
      `;
      modalTags.innerHTML = `<span class="tag">Diploma AIML</span><span class="tag">Entry-Level Developer</span>`;
      openModal();
    });
  }

  /* --- 6. Contact Form Submission Toast --- */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;

      if (toast) {
        toast.textContent = `Thank you, ${name}! Your message has been sent to Bhadrachalam.`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);
      }

      contactForm.reset();
    });
  }

  /* --- 7. Dynamic Copyright Year --- */
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
