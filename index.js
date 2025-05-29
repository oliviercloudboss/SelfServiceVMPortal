document.getElementById('accessForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!firstName || !lastName || !email) {
    alert("All fields are required.");
    return;
  }

  try {
    const res = await fetch('/api/request-vm-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email })
    });

    if (res.ok) {
      const result = await res.json();
      alert("Request submitted successfully! Check your email.");
    } else {
      const error = await res.text();
      alert("Failed to submit request: " + error);
    }
  } catch (err) {
    console.error(err);
    alert("An unexpected error occurred.");
  }
});
