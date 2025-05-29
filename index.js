document.getElementById("accessForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const recaptchaToken = grecaptcha.getResponse();
  if (!recaptchaToken) {
    alert("Please complete the reCAPTCHA.");
    return;
  }

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;

  const response = await fetch("/api/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      recaptchaToken
    }),
  });

  const result = await response.text();
  alert(result);
});
