/* =========================================
   FraudShield — Login
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("toggle-password");
  const loginError = document.getElementById("login-error");


  // =========================================
  // Show / Hide Password
  // =========================================

  togglePassword.addEventListener("click", () => {

    const isPassword =
      passwordInput.type === "password";

    passwordInput.type = isPassword
      ? "text"
      : "password";

    togglePassword.textContent =
      isPassword ? "Hide" : "Show";

    togglePassword.setAttribute(
      "aria-label",
      isPassword
        ? "Hide password"
        : "Show password"
    );
  });


  // =========================================
  // Login
  // =========================================

  loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    // Clear previous error
    loginError.hidden = true;
    loginError.textContent = "";


    // Basic validation
    if (!email || !password) {

      loginError.textContent =
        "Please enter your email and password.";

      loginError.hidden = false;

      return;
    }


    // =========================================
    // Demo Authentication
    // =========================================

    /*
     * Temporary demo login.
     *
     * We will replace this with the real
     * authentication system when the backend
     * is connected.
     */

    const demoEmail = "admin@fraudshield.com";
    const demoPassword = "admin123";


    if (
      email === demoEmail &&
      password === demoPassword
    ) {

      // Store login state
      sessionStorage.setItem(
        "fraudshield_logged_in",
        "true"
      );

      // Redirect to dashboard
      window.location.href = "index.html";

    } else {

      loginError.textContent =
        "Invalid email or password.";

      loginError.hidden = false;
    }

  });

});