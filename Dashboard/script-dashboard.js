function redirectToProducts() {
    window.location.href = "products.html"; // Redirect to the products page
}

document.addEventListener("DOMContentLoaded", function() {

    let isLoggedIn = true; 

    if (isLoggedIn) {
        console.log("User is logged in. Welcome to the dashboard!");
    } else {
        window.location.href = "login.html";
    }
});