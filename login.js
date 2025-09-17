// Get the form elements
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Add event listener to the form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get the input values
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate the input values
    if (username === '' || password === '') {
        alert('Please enter both username and password');
        return; // Exit the function if validation fails
    }

    // Check if the username and password match the stored credentials
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Ensure that stored credentials are set before checking
    if (storedUsername && storedPassword && username === storedUsername && password === storedPassword) {
        // Redirect to index.html on successful login
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password'); // Alert for invalid credentials
    }
});