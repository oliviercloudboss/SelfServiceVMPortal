document.getElementById("accessForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const statusEl = document.getElementById("status");
  statusEl.innerText = "Submitting...";
  statusEl.style.color = "#0078d4";

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();

  const recaptchaToken = grecaptcha.getResponse();
  if (!recaptchaToken) {
    statusEl.innerText = "❌ Please complete the reCAPTCHA";
    statusEl.style.color = "red";
    return;
  }

  try {
    const response = await fetch("/api/request-vm-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        recaptchaToken
      })
    });

    const result = await response.text();

    if (response.ok) {
      statusEl.innerText = "✅ Request submitted successfully! Please check your email.";
      statusEl.style.color = "green";
      document.getElementById("accessForm").reset();
      grecaptcha.reset();
    } else {
      statusEl.innerText = "❌ Error: " + result;
      statusEl.style.color = "red";
      grecaptcha.reset();
    }
  } catch (err) {
    statusEl.innerText = "❌ Submission failed. Please try again.";
    statusEl.style.color = "red";
    grecaptcha.reset();
  }
});
