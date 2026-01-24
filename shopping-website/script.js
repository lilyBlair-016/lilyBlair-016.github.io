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
  const saved = localStorage.getItem("userData");

  if (!saved) {
    console.warn("No userData found in localStorage. Signup first.");
    return;
  }

  const user = JSON.parse(saved);

  const firstNameEl = document.getElementById("displayFirstName");
  const lastNameEl = document.getElementById("displayLastName");
  const emailEl = document.getElementById("displayEmail");
  const mobileEl = document.getElementById("displayMobile");
  const addressEl = document.getElementById("displayAddress");
  const passwordEl = document.getElementById("displayPassword");

  if (firstNameEl) firstNameEl.textContent = user.firstName || "—";
  if (lastNameEl) lastNameEl.textContent = user.lastName || "—";
  if (emailEl) emailEl.textContent = user.email || "—";
  if (mobileEl) mobileEl.textContent = user.mobile || "—";
  if (addressEl) addressEl.textContent = user.address || "—";

  if (passwordEl) {
    const pw = user.password || "";
    passwordEl.textContent = pw ? "•".repeat(Math.min(pw.length, 12)) : "—";
  }

  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  if (profileName) profileName.textContent = fullName || "Guest User";
  if (profileEmail) profileEmail.textContent = user.email || "guest@example.com";
});
