document.getElementById("accessForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!firstName || !lastName || !email) {
    alert("Please fill out all required fields.");
    return;
  }

  const payload = { firstName, lastName, email };

  try {
    const response = await fetch("/api/request-vm-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const text = await response.text();

    if (response.ok) {
      alert("✅ " + text);
      document.getElementById("accessForm").reset();
    } else {
      alert("❌ Error: " + text);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
    alert("An error occurred while submitting the request.");
  }
});
