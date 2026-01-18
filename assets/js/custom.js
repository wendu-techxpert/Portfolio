const form = document.getElementById("contact-form");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      submitBtn.textContent = "Message Sent ✓";
      form.reset();

      // keep button disabled after success
      submitBtn.disabled = true;
    } else {
      submitBtn.textContent = "Send message";
      submitBtn.disabled = false;
      alert("Error: " + data.message);
    }
  } catch (error) {
    submitBtn.textContent = "Send message";
    submitBtn.disabled = false;
    alert("Something went wrong. Please try again.");
  }
});
