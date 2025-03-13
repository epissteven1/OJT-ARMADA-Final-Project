function handleLogin(event) {
    event.preventDefault(); 
    
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    console.log("Email:", email); 
    console.log("Password:", password);

    if (email === "userexample@gmail.com" && password === "12345678") {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = "dashboard.html"; 
    } else {
        alert("Invalid email or password.");
    }
}