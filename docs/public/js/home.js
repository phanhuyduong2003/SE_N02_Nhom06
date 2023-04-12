const loginButton = document.querySelector(".login-button");
const registerButton = document.querySelector(".register-button");
loginButton.addEventListener("click", () => {
  window.location.href = "../public/login.html";
});
registerButton.addEventListener("click", () => {
  window.location.href = "../public/register.html";
});
function toggleSidebar() {
  var sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("open");
}