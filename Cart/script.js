document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.querySelector(".cart-count");
    const cartTable = document.querySelector(".cart-table tbody");
    const allTotalPriceElement = document.querySelector(".all-total-price");
    const totalAmountElement = document.querySelector(".total span");
    const promoCodeInput = document.querySelector("#promo-code");
    const promoMessage = document.querySelector(".promo-message");
    const discountElement = document.querySelector(".promo-section span");
    const checkoutBtn = document.querySelector(".checkout-btn");
    const shippingInputs = document.querySelectorAll(".shipping-form input");

    const form = document.getElementById("paymentForm");
    const paymentModalElement = document.getElementById("paymentModal");
    let paymentModal = new bootstrap.Modal(paymentModalElement);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let discountAmount = 0;
    const shippingFee = 5;

    updateCartDisplay();

    function updateCartDisplay() {
        cartTable.innerHTML = "";
        let totalCartPrice = 0;
        cartCount.textContent = cart.length;

        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            row.classList.add("cart-item");

            let totalItemPrice = item.price * item.quantity;
            totalCartPrice += totalItemPrice;

            row.innerHTML = `
                <td class="item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div><strong>${item.name}</strong></div>
                </td>
                <td>₱${item.price.toLocaleString()}</td>
                <td>
                    <div class="quantity-control">
                        <button class="decrease" data-index="${index}">−</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                </td>
                <td class="item-total">₱${totalItemPrice.toLocaleString()}</td>
                <td class="actions">
                    <button class="wishlist" data-index="${index}">
                        <i class="fa-solid fa-heart ${item.wishlisted ? 'wishlisted' : ''}"></i>
                    </button>
                    <button class="remove" data-index="${index}">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </td>
            `;
            cartTable.appendChild(row);
        });

        applyPromoCode(totalCartPrice);
    }

    function applyPromoCode(totalCartPrice) {
        if (promoCodeInput.value.trim().toUpperCase() === "HAPPY") {
            discountAmount = totalCartPrice * 0.1;
            promoMessage.style.display = "block";
        } else {
            discountAmount = 0;
            promoMessage.style.display = "none";
        }

        discountElement.textContent = `₱${discountAmount.toLocaleString()}`;

        let finalTotal = totalCartPrice - discountAmount + shippingFee;
        allTotalPriceElement.textContent = `₱${(totalCartPrice - discountAmount).toLocaleString()}`;
        totalAmountElement.textContent = `₱${finalTotal.toLocaleString()}`;
    }

    promoCodeInput.addEventListener("input", () => {
        updateCartDisplay();
    });

    cartTable.addEventListener("click", (event) => {
        if (event.target.closest(".increase")) {
            const index = event.target.dataset.index;
            cart[index].quantity++;
        } else if (event.target.closest(".decrease")) {
            const index = event.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            }
        } else if (event.target.closest(".remove")) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
        } else if (event.target.closest(".wishlist")) {
            const index = event.target.dataset.index;
            cart[index].wishlisted = !cart[index].wishlisted;
        }
        updateCartDisplay();
    });

    // Validate shipping information before allowing checkout
    function isShippingInfoComplete() {
        return [...shippingInputs].every(input => input.value.trim() !== "");
    }

    checkoutBtn.addEventListener("click", () => {
        if (isShippingInfoComplete()) {
            // Get the total amount from the cart page
            const totalAmount = totalAmountElement.textContent;
    
            // Find and update the total amount inside the payment modal
            document.querySelector("#paymentModal .all-total-price").textContent = totalAmount;
    
            // Show the payment modal
            let paymentModal = new bootstrap.Modal(document.getElementById("paymentModal"));
            paymentModal.show();
        } else {
            alert("Please complete all shipping information before proceeding to checkout.");
        }
    });

    shippingInputs.forEach(input => {
        input.addEventListener("input", () => {
            checkoutBtn.disabled = !isShippingInfoComplete();
        });
    });

    // Payment Modal Handling
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = validateCardName() & validateCardNumber() & validateExpiration() & validateCVC();

        if (isValid) {
            alert("Payment Successful!");
            form.reset();

            // Hide the modal
            let modal = bootstrap.Modal.getInstance(paymentModalElement);
            modal.hide();

            // Redirect to receipt page
            window.location.href = "Payment%20Receipt/receipt.html";
        }
    });

    // Auto-show payment modal if coming from checkout page
    function checkAndShowPaymentModal() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("checkout")) {
            paymentModal.show();
        }
    }
    checkAndShowPaymentModal();

    // Payment Form Validations
    function validateCardName() {
        let cardName = document.getElementById("cardName").value.trim();
        return toggleError("nameError", cardName !== "");
    }

    function validateCardNumber() {
        let cardNumber = document.getElementById("cardNumber").value.replace(/\s+/g, '');
        let cardRegex = /^\d{16}$/;
        return toggleError("cardError", cardRegex.test(cardNumber));
    }

    function validateExpiration() {
        let expiration = document.getElementById("expiration").value;
        let expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return toggleError("expError", expRegex.test(expiration));
    }

    function validateCVC() {
        let cvc = document.getElementById("cvc").value;
        let cvcRegex = /^\d{3}$/;
        return toggleError("cvcError", cvcRegex.test(cvc));
    }

    function toggleError(errorId, isValid) {
        document.getElementById(errorId).classList.toggle("d-none", isValid);
        return isValid;
    }

    document.getElementById("cardNumber").addEventListener("input", function (event) {
        let input = event.target.value.replace(/\D/g, '');
        input = input.replace(/(.{4})/g, '$1 ').trim();
        event.target.value = input;
    });
});
