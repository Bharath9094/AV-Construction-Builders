// =====================================================
// AV CONSTRUCTION & BUILDERS — MAIN JAVASCRIPT
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR ──────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // Back to top visibility
    const backTop = document.getElementById('backToTop');
    if (backTop) {
      if (window.scrollY > 400) backTop.classList.add('visible');
      else backTop.classList.remove('visible');
    }
  });

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }

  hamburger?.addEventListener('click', toggleMenu);
  mobileOverlay?.addEventListener('click', toggleMenu);

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  /* ─── SCROLL REVEAL ───────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  /* ─── STATISTICS COUNTER ──────────────────────────── */
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animateCounters(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
  });

  function animateCounters(statItem) {
    const counterEl = statItem.querySelector('.stat-count');
    if (!counterEl) return;

    const target = parseInt(counterEl.dataset.target, 10);
    const duration = 2200;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counterEl.textContent = Math.floor(current).toLocaleString();
    }, step);
  }

  /* ─── PROCESS TIMELINE ANIMATION ─────────────────── */
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate the line fill
        const lineFill = document.querySelector('.process-line-fill');
        if (lineFill) lineFill.style.width = '100%';

        // Animate each step with delay
        const steps = document.querySelectorAll('.process-step');
        steps.forEach((step, i) => {
          setTimeout(() => {
            step.classList.add('active');
          }, i * 250);
        });

        processObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const processSection = document.getElementById('process');
  if (processSection) processObserver.observe(processSection);

  /* ─── HERO PARTICLES ──────────────────────────────── */
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.bottom = Math.random() * 40 + '%';
      particle.style.animationDuration = (4 + Math.random() * 6) + 's';
      particle.style.animationDelay = (Math.random() * 6) + 's';
      particle.style.opacity = (0.3 + Math.random() * 0.5).toString();
      particle.style.width = particle.style.height = (2 + Math.random() * 3) + 'px';
      particlesContainer.appendChild(particle);
    }
  }

  /* ─── MAP LOCATION TABS ───────────────────────────── */
  const locationItems = document.querySelectorAll('.map-location-item');
  locationItems.forEach(item => {
    item.addEventListener('click', () => {
      locationItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  /* ─── CONTACT FORM & WHATSAPP INTEGRATION ─────────── */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const formWaBtn = document.getElementById('form-whatsapp-btn');

  // WhatsApp Button in Contact Form
  formWaBtn?.addEventListener('click', () => {
    const name = document.getElementById('contact-name')?.value.trim() || '';
    const phone = document.getElementById('contact-phone')?.value.trim() || '';
    const email = document.getElementById('contact-email')?.value.trim() || '';
    const serviceSelect = document.getElementById('contact-service');
    const service = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex]?.text : '';
    const location = document.getElementById('contact-location')?.value.trim() || '';
    const message = document.getElementById('contact-message')?.value.trim() || '';

    if (!name || !phone) {
      if (formStatus) {
        formStatus.className = 'form-status-box show error';
        formStatus.innerHTML = '⚠️ Please enter at least your <strong>Full Name</strong> and <strong>Phone Number</strong> before chatting on WhatsApp.';
      }
      if (!name) document.getElementById('contact-name')?.focus();
      else document.getElementById('contact-phone')?.focus();
      return;
    }

    let text = `Hello AV Construction & Builders!\nI would like to inquire about a project:\n\n` +
      `• *Name:* ${name}\n` +
      `• *Phone:* ${phone}\n` +
      (email ? `• *Email:* ${email}\n` : '') +
      (service && service !== 'Select a service…' ? `• *Service Required:* ${service}\n` : '') +
      (location ? `• *Location:* ${location}\n` : '') +
      (message ? `• *Details:* ${message}\n` : '');

    const waUrl = `https://api.whatsapp.com/send?phone=919443719893&text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

  // Real Email Submission via FormSubmit.co AJAX
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const serviceSelect = document.getElementById('contact-service');
      const service = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex]?.value : '';
      const location = document.getElementById('contact-location')?.value.trim() || 'Not specified';
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !phone || !service || !message) {
        if (formStatus) {
          formStatus.className = 'form-status-box show error';
          formStatus.innerHTML = '⚠️ Please fill in all required fields (Name, Phone, Service, and Project Details).';
        }
        return;
      }

      const submitBtn = document.getElementById('form-submit-btn');
      const originalBtnHTML = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>Sending to Email...</span>';
      submitBtn.disabled = true;

      if (formStatus) {
        formStatus.className = 'form-status-box show loading';
        formStatus.innerHTML = '⏳ Submitting your details directly to <strong>avconstructionandbuilders9094@gmail.com</strong>...';
      }

      try {
        const payload = {
          name: name,
          phone: phone,
          email: email || 'No email provided',
          service: service,
          location: location,
          message: message,
          _subject: `New Lead: ${name} (${phone}) — ${service}`,
          _template: 'table',
          _captcha: 'false'
        };

        const response = await fetch('https://formsubmit.co/ajax/avconstructionandbuilders9094@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok || data.success === 'true' || data.success === true) {
          if (formStatus) {
            formStatus.className = 'form-status-box show success';
            formStatus.innerHTML = `✓ <strong>Thank you, ${name}!</strong> Your inquiry has been delivered directly to <strong>avconstructionandbuilders9094@gmail.com</strong>.<br/>Our team will call you at <strong>${phone}</strong> shortly.<br/><br/><a href="https://api.whatsapp.com/send?phone=919443719893&text=${encodeURIComponent('Hello AV Construction! I just submitted an inquiry on your website: ' + name)}" target="_blank" rel="noopener noreferrer" style="display:inline-block; margin-top:0.5rem; background:#25D366; color:#fff; padding:0.5rem 1rem; border-radius:6px; font-weight:600; text-decoration:none;">💬 Chat on WhatsApp with us as well</a>`;
          }
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('FormSubmit AJAX warning:', err);
        // Fallback: direct mailto trigger + WhatsApp option
        const mailtoBody = encodeURIComponent(
          `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nLocation: ${location}\n\nProject Details:\n${message}`
        );
        const mailtoUrl = `mailto:avconstructionandbuilders9094@gmail.com?subject=${encodeURIComponent('Construction Inquiry from ' + name)}&body=${mailtoBody}`;
        const waDirectUrl = `https://api.whatsapp.com/send?phone=919443719893&text=${encodeURIComponent('Hello! My name is ' + name + ' (' + phone + '). I want to inquire about ' + service + ': ' + message)}`;

        if (formStatus) {
          formStatus.className = 'form-status-box show success';
          formStatus.innerHTML = `📬 <strong>Your inquiry is ready!</strong><br/>Click below to send via your email app or instantly on WhatsApp:<br/><br/>
            <a href="${mailtoUrl}" style="display:inline-block; margin-right:0.5rem; margin-bottom:0.5rem; background:var(--gold); color:#0D0D0F; padding:0.5rem 1rem; border-radius:6px; font-weight:700; text-decoration:none;">✉️ Open in Email App</a>
            <a href="${waDirectUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block; background:#25D366; color:#fff; padding:0.5rem 1rem; border-radius:6px; font-weight:600; text-decoration:none;">💬 Send via WhatsApp</a>`;
        }
      } finally {
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
      }
    });
  }

  /* ─── BACK TO TOP ─────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── SMOOTH ACTIVE NAV HIGHLIGHT ────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'nav-active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => navObserver.observe(section));

});
