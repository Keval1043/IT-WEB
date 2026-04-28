// ==============================================
//  Hopo Infotech - Fully Functional Website
//  Contact form ab seedha keval1043@gmail.com par bhejega
// ==============================================

// ---------- CONFIGURATION ----------
// Apni Formspree ID yahan daalein (yeh aapki asli ID hai)
const FORMSPREE_ID = 'mlgavvgy';
// ------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  const submitBtn = document.getElementById('submitBtn');
  const statusDiv = document.getElementById('formStatus');

  // Check if Formspree is configured
  const isLive = FORMSPREE_ID !== 'YOUR_FORMSPREE_ID' && FORMSPREE_ID.length > 0;

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Collect data
      const payload = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        serviceType: document.getElementById('serviceType').value,
        urgency: document.getElementById('urgency').value,
        message: document.getElementById('message').value.trim(),
        _subject: `New Lead: ${document.getElementById('name').value || 'Website Visitor'}`,
      };

      // Show loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
      statusDiv.style.display = 'block';
      statusDiv.className = '';
      statusDiv.innerHTML = 'Sending your request...';

      // Demo mode if ID not set
      if (!isLive) {
        console.warn('⚠️ Demo mode: Replace "YOUR_FORMSPREE_ID" in script.js with your Formspree ID.');
        setTimeout(() => {
          statusDiv.className = 'status-success';
          statusDiv.innerHTML = '✅ Demo: Lead captured! (Set Formspree ID for live emails)';
          console.log('📋 Lead data:', payload);
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request & Get Help';
          setTimeout(() => statusDiv.style.display = 'none', 6000);
        }, 1000);
        return;
      }

      // Live submission to Formspree
      try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          statusDiv.className = 'status-success';
          statusDiv.innerHTML = '✅ Thank you! I will contact you within 30 minutes.';
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Submission error:', error);
        statusDiv.className = 'status-error';
        statusDiv.innerHTML = '❌ Unable to send. Please call +91 95104 13920 directly.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request & Get Help';
        setTimeout(() => statusDiv.style.display = 'none', 6000);
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  console.log(`🚀 Hopo Infotech Ready — ${isLive ? 'LIVE MODE (emails will be sent)' : 'DEMO MODE (set Formspree ID)'}`);
});
