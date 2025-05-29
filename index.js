document.getElementById("accessForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const resultBox = document.getElementById("result");

  try {
    const response = await fetch("/api/request-vm-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstName, lastName, email })
    });

    const resultText = await response.text();
    resultBox.className = "alert mt-3 " + (response.ok ? "alert-success" : "alert-danger");
    resultBox.textContent = resultText;
    resultBox.classList.remove("d-none");
  } catch (error) {
    resultBox.className = "alert alert-danger mt-3";
    resultBox.textContent = "Something went wrong. Please try again.";
    resultBox.classList.remove("d-none");
  }
});
