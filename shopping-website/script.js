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