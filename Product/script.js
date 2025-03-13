document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".cart-btn");
    const cartCountElement = document.getElementById("cart-count");
    const cartIcon = document.getElementById("cart-icon");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    cartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const productElement = button.closest("li");
            if (!productElement) {
                console.warn("No parent <li> found for cart button.");
                return;
            }

            const productName = productElement.querySelector("h1").textContent; // Fix here
            const productImage = productElement.querySelector(".product-image").src;
            const productPrice = parseFloat(productElement.querySelector(".price").textContent.replace("₱", "").replace(",", "")); // Fix here

            const existingItem = cart.find((item) => item.name === productName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: productName, image: productImage, price: productPrice, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            createFlyingImage(button, productImage);
        });
    });

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let uniqueItemCount = cart.length; // Count only unique items
        const cartCountElement = document.getElementById("cart-count");

        if (cartCountElement) {
            cartCountElement.textContent = uniqueItemCount; // Ensure it updates correctly
        }
    }

    function createFlyingImage(button, imageSrc) {
        const flyingImg = document.createElement("img");
        flyingImg.src = imageSrc;
        flyingImg.style.position = "absolute";
        flyingImg.style.width = "50px";
        flyingImg.style.height = "50px";
        flyingImg.style.borderRadius = "50%";
        flyingImg.style.zIndex = "1000";
        flyingImg.style.left = `${button.getBoundingClientRect().left + window.scrollX}px`;
        flyingImg.style.top = `${button.getBoundingClientRect().top + window.scrollY}px`;
        flyingImg.style.transition = "transform 0.8s ease-in-out, opacity 0.8s";
        document.body.appendChild(flyingImg);

        setTimeout(() => {
            flyingImg.style.transform = `translate(${cartIcon.getBoundingClientRect().left - flyingImg.getBoundingClientRect().left + 10}px, 
                                                    ${cartIcon.getBoundingClientRect().top - flyingImg.getBoundingClientRect().top - 10}px) 
                                                    scale(0.2)`;
            flyingImg.style.opacity = "0";
        }, 10);

        setTimeout(() => {
            document.body.removeChild(flyingImg);
        }, 800);
    }
});
