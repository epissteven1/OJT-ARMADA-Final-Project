function handleLogin(event) {
    event.preventDefault(); 

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Retrieve the stored password directly from local storage
    let storedPassword = localStorage.getItem(email);

    if (storedPassword) {
        if (password === storedPassword) {
            window.location.href = "../Dashboard.html"; 
        } else {
            alert("Invalid email or password.");
        }
    } else {
        alert("Invalid email or password.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let loginForm = document.querySelector('form'); 
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});