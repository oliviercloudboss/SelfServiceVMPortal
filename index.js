document.getElementById("accessForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Submitting request...";

  try {
    const response = await fetch("/api/request-vm-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email
      })
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.innerHTML = `<span style="color: green;">✅ ${data.message}</span>`;
      document.getElementById("accessForm").reset();
    } else {
      resultDiv.innerHTML = `<span style="color: red;">❌ ${data.error || "Something went wrong."}</span>`;
    }
  } catch (error) {
    console.error("Error:", error);
    resultDiv.innerHTML = `<span style="color: red;">❌ Request failed. Please try again later.</span>`;
  }
});
