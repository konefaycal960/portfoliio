import { SITE_DATA } from '../data';
import { getLang, getUi } from '../core/i18n';

/* ============================================================================
   CONTACT FORM — Netlify Forms (détection par formulaire caché dans index.html),
   validation client, états sending/success/error.
   ============================================================================ */

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');
  const submit = form.querySelector('[type="submit"]');
  const fields = {
    name: form.querySelector('[name="name"]'),
    email: form.querySelector('[name="email"]'),
    message: form.querySelector('[name="message"]'),
  };
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setStatus(msg, ok) {
    if (!status) return;
    status.textContent = msg || '';
    status.className = msg ? `form-status ${ok ? 'ok' : 'err'}` : 'form-status';
  }

  function validate() {
    let firstInvalid = null;
    const check = (el, valid) => {
      el.classList.toggle('invalid', !valid);
      if (!valid && !firstInvalid) firstInvalid = el;
      return valid;
    };
    const okName = check(fields.name, fields.name.value.trim().length > 1);
    const okEmail = check(fields.email, EMAIL_RE.test(fields.email.value.trim()));
    const okMsg = check(fields.message, fields.message.value.trim().length >= 10);
    return { ok: okName && okEmail && okMsg, firstInvalid };
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('');

    const v = validate();
    if (!v.ok) {
      setStatus(getUi(getLang()).form_error, false);
      if (v.firstInvalid) v.firstInvalid.focus();
      return;
    }

    const ui = getUi(getLang());
    const original = submit.textContent;
    submit.disabled = true;
    submit.textContent = ui.form_sending;

    try {
      const body = new URLSearchParams();
      body.append('form-name', 'contact');
      body.append('name', fields.name.value.trim());
      body.append('email', fields.email.value.trim());
      body.append('message', fields.message.value.trim());

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) throw new Error('request failed');
      setStatus(ui.form_success, true);
      form.reset();
    } catch {
      setStatus(ui.form_error, false);
    } finally {
      submit.disabled = false;
      submit.textContent = original;
    }
  });
}
