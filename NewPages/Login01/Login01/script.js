// Optional: Show error on empty fields (handled by browser natively)
document.querySelector(".login-form").addEventListener("submit", function(e) {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  if(!username.value.trim() || !password.value.trim()) {
    e.preventDefault();
    username.style.borderColor = "#e7473c";
    password.style.borderColor = "#e7473c";
    setTimeout(() => {
      username.style.borderColor = "";
      password.style.borderColor = "";
    }, 2000);
  }
});
