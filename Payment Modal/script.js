const form = document.getElementById("paymentForm");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    let isValid = validateCardName() & validateCardNumber() & validateExpiration() & validateCVC();

    // If all fields are valid, simulate payment processing
    if (isValid) {
        alert("Payment Successful!");
        form.reset();

        // Hide the modal
        let modal = bootstrap.Modal.getInstance(document.getElementById("paymentModal"));
        modal.hide();

        // Redirect to the receipt page (change 'receipt.html' to your actual page)

        window.location.href = "Payment%20Receipt/receipt.html";

    }
});


// Function to trigger payment modal from Cart section
function checkAndShowPaymentModal() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("checkout")) {
        let paymentModal = new bootstrap.Modal(document.getElementById("paymentModal"));
        paymentModal.show();
    }
}

// Function to validate Card Name
function validateCardName() {
    let cardName = document.getElementById("cardName").value.trim();
    return toggleError("nameError", cardName !== "");
}

// Function to validate Card Number
function validateCardNumber() {
    let cardNumber = document.getElementById("cardNumber").value.replace(/\s+/g, '');
    let cardRegex = /^\d{16}$/; // 16 digits
    return toggleError("cardError", cardRegex.test(cardNumber));
}

// Function to validate Expiration Date
function validateExpiration() {
    let expiration = document.getElementById("expiration").value;
    let expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    return toggleError("expError", expRegex.test(expiration));
}

// Function to validate CVC
function validateCVC() {
    let cvc = document.getElementById("cvc").value;
    let cvcRegex = /^\d{3}$/; // 3 digits
    return toggleError("cvcError", cvcRegex.test(cvc));
}

// Helper function to show/hide errors
function toggleError(errorId, isValid) {
    document.getElementById(errorId).classList.toggle("d-none", isValid);
    return isValid;
}

// Auto-format Card Number Input
document.getElementById("cardNumber").addEventListener("input", function (event) {
    let input = event.target.value.replace(/\D/g, ''); // Remove non-numeric chars
    input = input.replace(/(.{4})/g, '$1 ').trim(); // Add space after every 4 digits
    event.target.value = input;
});
document.addEventListener("DOMContentLoaded", () => {
    const paymentModal = new bootstrap.Modal(document.getElementById("paymentModal"));
    paymentModal.show(); // ✅ Auto-open the modal on page load
});
