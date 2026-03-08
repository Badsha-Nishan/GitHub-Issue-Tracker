// 1. Login Page Logic

const username = document.getElementById("username");
const password = document.getElementById("password");
const signInBtn = document.getElementById("signIn-btn");

function handleLogin() {
  if (
    username.value.trim() === "admin" &&
    password.value.trim() === "admin123"
  ) {
    // set sessionStorage
    sessionStorage.setItem("isLogIn", "true");

    openModal("Login Successfully", "Welcome!");
    setTimeout(() => {
      window.location.assign("./home.html");
    }, 2000);
  } else {
    openModal("Warning!!", "Username or Password not match");
  }
}
signInBtn.addEventListener("click", handleLogin);

password.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleLogin();
  }
});
// For Modal
const modal = document.getElementById("my_modal_2");
const title = document.getElementById("title");
const message = document.getElementById("msg");
function openModal(titleContent, messageContent) {
  title.textContent = titleContent;
  message.textContent = messageContent;
  modal.showModal();
}

// Toggle Show Password
const passwordBtn = document.getElementById("showPassword");
const eye = document.getElementById("eye");

passwordBtn.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    eye.classList.remove("fa-eye");
    eye.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    eye.classList.add("fa-eye");
    eye.classList.remove("fa-eye-slash");
  }
});
