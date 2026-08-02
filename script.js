/* ==========================================================================
   Thota Bhadrachalam - Portfolio JavaScript Application
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

  /* --- 3. Mobile Navigation Menu Toggle --- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-links');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
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
    'ai-assistant': {
      title: 'AI Web Assistant & Data Processing Utilities',
      description: 'An interactive frontend dashboard connecting lightweight Python execution concepts with JavaScript UI triggers. Designed to showcase machine learning concepts, automated data parsing, and user-friendly web widgets.',
      tags: ['Python', 'JavaScript', 'AIML Algorithms', 'REST API']
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      if (data) {
        modalTitle.textContent = data.title;
        modalBody.textContent = data.description;
        modalTags.innerHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        modalBackdrop.classList.add('active');
      }
    });
  });

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
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
          <hr style="border-color: var(--border-color); margin-bottom: 1rem;">
          <p><strong>Education:</strong> Diploma in AIML (Pydah College of Eng.) | SSC (Tagore High School - 456/600)</p>
          <p><strong>Skills:</strong> HTML, CSS, JavaScript, Python, SQL, Vibe Coding, Full Stack Web Dev (Basic)</p>
          <p><strong>Projects:</strong> College Website with Firebase DB, AI Web Assistant</p>
          <p><strong>Strengths:</strong> Quick Learner, Teamwork, Communication, Time Management</p>
        </div>
      `;
      modalTags.innerHTML = `<span class="tag">Diploma AIML</span><span class="tag">Entry-Level Developer</span>`;
      modalBackdrop.classList.add('active');
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
