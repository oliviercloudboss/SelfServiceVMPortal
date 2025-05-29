document.getElementById('vmAccessForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const result = document.getElementById('result');
  result.textContent = 'Submitting...';

  const form = e.target;
  const formData = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    recaptchaToken: grecaptcha.getResponse(),
  };

  if (!formData.recaptchaToken) {
    result.textContent = 'Please complete the reCAPTCHA.';
    return;
  }

  try {
    const response = await fetch('/api/request-vm-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      result.textContent = `✅ Request submitted! Credentials sent to: ${formData.email}`;
    } else {
      result.textContent = `❌ Error: ${data.error || 'Unknown error'}`;
    }
  } catch (err) {
    console.error(err);
    result.textContent = '❌ Submission failed. Check console.';
  }
});
