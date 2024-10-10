const users = [{ email: "admin@gmail.com", password: "Admin" }];

const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("error-msg");
const welcomeContainer = document.getElementById("welcome-container");
const logoutBtn = document.getElementById("logoutBtn");
const loginContainer = document.querySelector(".login-container");

if (localStorage.getItem("loggedInUser")) {
  showWelcomePage();
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    showWelcomePage();
  } else {
    errorMsg.textContent = "Invalid email or password!";
  }
});

function showWelcomePage() {
  loginContainer.classList.add("welcome");
  welcomeContainer.classList.remove("welcome");
}

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  loginContainer.classList.remove("welcome");
  welcomeContainer.classList.add("welcome");
});
