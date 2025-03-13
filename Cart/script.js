document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.querySelector(".cart-count");
    const cartTable = document.querySelector(".cart-table tbody");
    const totalPriceElement = document.querySelector(".summary-details .total-price");
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
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
                    <div>
                        <strong>${item.name}</strong>
                        <p>${item.description}</p>
                    </div>
                </td>
                <td>₱${item.price.toLocaleString()}</td>
                <td>
                    <div class="quantity-control">
                        <button class="decrease" data-index="${index}">−</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                </td>
                <td>₱${totalItemPrice.toLocaleString()}</td>
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
        totalPriceElement.textContent = `₱${totalCartPrice.toLocaleString()}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

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
