const registerForm = document.querySelector('form');  // Select the form without ID
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const registerbtn = document.getElementById('btn');

// Add event listener to the form
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get the input values
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  
  // Validate the input values
  if (username === '' || password === '' || confirmPassword === '') {
    alert('Please enter all fields');
    return;
  }
  
  // Check if the password and confirm password match
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  
  // Store the username and password in local storage
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  
  // Redirect to index.html
  window.location.href = 'index.html';
});