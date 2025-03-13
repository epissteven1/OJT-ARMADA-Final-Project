document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.querySelector(".cart-count");
    const cartTable = document.querySelector(".cart-table tbody");
    const allTotalPriceElement = document.querySelector(".all-total-price");
    const promoCodeInput = document.querySelector("#promo-code");
    const promoMessage = document.querySelector(".promo-message");
    const discountElement = document.querySelector(".promo-section span");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let discountAmount = 0;

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
        allTotalPriceElement.textContent = `₱${(totalCartPrice - discountAmount).toLocaleString()}`;
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
});