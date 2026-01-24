/* Contact */
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
contactForm.addEventListener('submit', (e) => {
e.preventDefault();

const name = document.getElementById('name').value;
const message = document.getElementById('message').value;

successMessage.style.display = 'block';
contactForm.reset();

setTimeout(() => {
successMessage.style.display = 'none';
}, 5000);

console.log('Form submitted:', { name, message });
});
}


/* SIGN-UP */
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const signupSuccess = document.getElementById('successMessage');

    if (password !== confirmPassword) {
      alert('Passwords do not match! Please try again.');
      return;
    }

    const formData = {
      firstName: document.getElementById('firstName')?.value,
      lastName: document.getElementById('lastName')?.value,
      email: document.getElementById('email')?.value,
      mobile: document.getElementById('mobile')?.value,
      address: document.getElementById('address')?.value,
      password: password  
    };

    localStorage.setItem('userData', JSON.stringify(formData));

    if (signupSuccess) signupSuccess.style.display = 'block';

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  });
}

/* LOGIN */
const loginForm = document.getElementById('loginForm');

async function authenticateUser(email, password) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, email }), 1000);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const loginSuccess = document.getElementById('successMessage');

    try {
      const result = await authenticateUser(email, password);

      if (result?.success) {
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('isLoggedIn', 'true');

        if (loginSuccess) loginSuccess.style.display = 'block';

        setTimeout(() => {
          window.location.href = 'index.html'; 
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  });
}

/* Profile */
document.addEventListener("DOMContentLoaded", () => {
  const notLoggedIn = document.getElementById("notLoggedIn");
  const profileInfo = document.getElementById("profileInfo");

  if (!notLoggedIn || !profileInfo) return;

  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    notLoggedIn.style.display = "block";
    profileInfo.style.display = "none";
    return;
  }

  notLoggedIn.style.display = "none";
  profileInfo.style.display = "block";

  const saved = localStorage.getItem("userData");
  if (!saved) {
    console.warn("Logged in but no userData found in localStorage.");
    return;
  }

  const user = JSON.parse(saved);

  document.getElementById("displayFirstName").textContent = user.firstName || "—";
  document.getElementById("displayLastName").textContent = user.lastName || "—";
  document.getElementById("displayEmail").textContent = user.email || "—";
  document.getElementById("displayMobile").textContent = user.mobile || "—";
  document.getElementById("displayAddress").textContent = user.address || "—";

  const pw = user.password || "";
  document.getElementById("displayPassword").textContent =
    pw ? "•".repeat(Math.min(pw.length, 12)) : "—";

  const profileName = document.getElementById("profileName");
  if (profileName) {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    profileName.textContent = fullName || "Guest User";
  }
});
