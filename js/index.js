function show(section) {
  document.getElementById("registration").classList.add("hidden");
  document.getElementById("login").classList.add("hidden");
  document.getElementById("home").classList.add("hidden");
  document.getElementById(section).classList.remove("hidden");
}

function register() {
  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const errorElem = document.getElementById("reg-error");

  if (!username || !email || !password) {
    errorElem.textContent = "All fields are required.";
    return;
  }

  if (!email.includes("@")) {
    errorElem.textContent = "Invalid email format.";
    return;
  }

  // Check if email already exists
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.some((user) => user.email === email)) {
    errorElem.textContent = "Email is already registered. Try another.";
    return;
  }

  // Save user
  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  errorElem.textContent = "";
  alert("Registration successful! Please log in.");
  show("login");
}

function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const errorElem = document.getElementById("login-error");

  // Check if user exists
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    errorElem.textContent = "Invalid email or password.";
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  errorElem.textContent = "";
  show("home");
  document.getElementById("user-name").textContent = user.username;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  show("login");
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    show("home");
    document.getElementById("user-name").textContent = loggedInUser.username;
  } else {
    show("registration");
  }
});
