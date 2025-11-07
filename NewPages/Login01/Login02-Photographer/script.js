// Client-side form validation
document.querySelector(".login-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  let valid = true;

  // Clear previous errors
  [emailInput, passwordInput].forEach(input => {
    input.classList.remove("invalid");
    input.nextElementSibling.textContent = "";
  });

  if (!emailInput.value.trim()) {
    valid = false;
    emailInput.classList.add("invalid");
    emailInput.nextElementSibling.textContent = "Email or username is required";
  }

  if (!passwordInput.value.trim()) {
    valid = false;
    passwordInput.classList.add("invalid");
    passwordInput.nextElementSibling.textContent = "Password is required";
  }

  if (valid) {
    // For demo: normally submit form or process login here
    alert("Form submitted successfully!");
    this.reset();
  }
});
