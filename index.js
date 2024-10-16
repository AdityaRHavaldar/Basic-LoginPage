const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("error-msg");
const welcomeContainer = document.getElementById("welcome-container");
const logoutBtn = document.getElementById("logoutBtn");
const loginContainer = document.querySelector(".login-container");

if (localStorage.getItem("loggedInUser")) {
  showWelcomePage();
}

async function usersApi() {
  try {
    const res = await fetch("http://localhost:3000/users");
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return await res.json();
  } catch (error) {
    errorMsg.textContent = "Error fetching users";
  }
}

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = await usersApi();
  console.log(users);
  if (!users) {
    errorMsg.textContent = "Error fetching users, try Again";
    return;
  }
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
