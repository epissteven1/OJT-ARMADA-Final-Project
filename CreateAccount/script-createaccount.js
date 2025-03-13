function handleCreateAccount(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    if (localStorage.getItem(email)) {
        alert("This email is already registered.");
        return;
    }

    localStorage.setItem(email, password); 
    localStorage.setItem(`${email}_name`, name); 

    alert("Account created successfully!");
    window.location.href = "../Login/login.html"; 
}

document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleCreateAccount);
    }

});