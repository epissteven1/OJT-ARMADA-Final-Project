const products = {
    "Asus ROG Phone 7 Ultimate": {
        price: 20499,
        image: "../Product/assets/Asus ROG Phone 7 Ultimate.jpg",
        rating: 4.8,
        reviews: 1873,
        description: "A powerful gaming smartphone with an advanced cooling system and high-refresh-rate display."
    },
    "ZTE Nubia Red Magic 9 Pro": {
        price: 24000,
        image: "../Product/assets/zte-nubia-red-magic-9-pro.jpg",
        rating: 4.8,
        reviews: 120,
        description: "A cutting-edge gaming smartphone that combines powerful performance with a sleek design."
    },
    "Samsung Galaxy S24 Ultra": {
        image: "../Product/assets/Samsung Galaxy S24 Ultra.jpg",
        price: 30999,
        rating: 4.8,
        reviews: 120,
        description: "A premium flagship smartphone with an advanced camera system, powerful performance, and a stunning display."
    },
    "Xiaomi POCO F4 GT": {
        image: "../Product/assets/Xiaomi POCO F4 GT.jpg",
        price: 21499,
        rating: 5,
        reviews: 120,
        description: "A gaming powerhouse with a Snapdragon processor, fast charging, and magnetic pop-up triggers for a seamless gaming experience."
    },
    "Infinix Note 30 Pro 8": {
        image: "../Product/assets/Infinix Note 30 Pro 8.jpg",
        price: 9599,
        rating: 5,
        reviews: 120,
        description: "An affordable smartphone with a high-refresh-rate display, a capable camera setup, and a long-lasting battery."
    },
    "Lenovo Legion Y70": {
        image: "../Product/assets/Lenovo Legion Y70.jpg",
        price: 10599,
        rating: 5,
        reviews: 120,
        description: "A gaming-focused phone with high-performance specs, an advanced cooling system, and a stunning display."
    },
    "Tecno Spark 10 Pro": {
        image: "../Product/assets/Tecno Spark 10 Pro.jpg",
        price: 13000,
        rating: 5,
        reviews: 120,
        description: "A budget-friendly smartphone with a stylish design, AI-enhanced cameras, and a large battery for all-day usage."
    },
    "Black Shark 5 Pro 8": {
        image: "../Product/assets/Black Shark 5 Pro 8.jpg",
        price: 15599,
        rating: 5,
        reviews: 120,
        description: "A dedicated gaming smartphone with top-tier specs, customizable RGB lighting, and advanced cooling technology."
    },
    "Xiaomi Poco X5 Pro": {
        image: "../Product/assets/Xiaomi Poco X5 Pro.jpg",
        price: 16000,
        rating: 5,
        reviews: 120,
        description: "A powerful mid-range smartphone with a high refresh rate AMOLED display, a Snapdragon processor, and excellent battery life."
    },
    "Nubia Red Magic 8 Pro": {
        image: "../Product/assets/Nubia Red Magic 8 Pro.jpg",
        price: 13000,
        rating: 5,
        reviews: 120,
        description: "A gaming-centric smartphone featuring a Snapdragon chipset, a fast display, and a built-in cooling fan for sustained performance."
    },
    "Nubia Red Magic 7S Pro": {
        image: "../Product/assets/redmagic.jpg",
        price: 10000,
        rating: 5,
        reviews: 120,
        description: "A budget-friendly gaming phone with impressive performance, a high refresh rate display, and advanced cooling technology."
    },
    "Nubia Red Magic 7S": {
        image: "../Product/assets/Nubia Red Magic 7s.jpg",
        price: 9599,
        rating: 5,
        reviews: 120,
        description: "An affordable gaming smartphone offering excellent performance, long battery life, and a sleek design."
    }
};

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalQuantity;
}
// Function to get the product name from sessionStorage
function getSelectedProduct() {
    return sessionStorage.getItem("selectedProduct");
}

// Function to update product details
function updateProductDetails() {
    const productName = getSelectedProduct();
    console.log("Product Name:", productName); // Debugging

    if (productName && products[productName]) {
        console.log("Product Found:", products[productName]); // Debugging

        const product = products[productName];

        document.querySelector(".product-container img").src = product.image;
        document.querySelector(".product-container img").alt = productName;
        document.querySelector(".product-info h1").textContent = productName;
        document.querySelector(".product-info .price").textContent = `₱ ${product.price}.00`;
        document.querySelector(".rating-info strong").textContent = product.rating;
        document.querySelector(".rating-info p").innerHTML = `<strong>${product.rating}</strong> (${product.reviews} reviews)`;
        document.querySelector(".details").textContent = product.description;
    } else {
        console.error("Product not found in the products list!");
        document.querySelector(".details").textContent = "Product details not found.";
    }
}
function addToCart(productName, quantity = 1) {
    const product = products[productName];
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += quantity; // Update quantity properly
    } else {
        cart.push({ name: productName, price: product.price, image: product.image, quantity: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();  // Update cart count display
    animateAddToCart(product.image);  // Animate image to cart
}

/**
 * Animates the product image flying to the cart.
 */
function animateAddToCart(imageSrc) {
    const cartIcon = document.getElementById("cart-icon"); // Selects the cart icon
    if (!cartIcon) return;

    // Create a cloned image element
    const flyingImage = document.createElement("img");
    flyingImage.src = imageSrc;
    flyingImage.style.position = "fixed";
    flyingImage.style.width = "50px";  // Adjust size as needed
    flyingImage.style.zIndex = "1000";
    flyingImage.style.transition = "transform 1s ease-in-out, opacity 1s ease-in-out";

    // Append to body
    document.body.appendChild(flyingImage);

    // Get the position of the product image
    const productImg = document.querySelector(".product-container img");
    if (!productImg) return;

    const productRect = productImg.getBoundingClientRect();
    flyingImage.style.left = `${productRect.left + window.scrollX}px`;
    flyingImage.style.top = `${productRect.top + window.scrollY}px`;

    // Start the animation
    setTimeout(() => {
        const cartRect = cartIcon.getBoundingClientRect();
        flyingImage.style.transform = `translate(${cartRect.left - productRect.left}px, ${cartRect.top - productRect.top}px) scale(0.3)`;
        flyingImage.style.opacity = "0";
    }, 100);

    // Remove the image after animation
    setTimeout(() => flyingImage.remove(), 1000);
}

function orderNow(productName) {
    const product = products[productName];
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: product.price, image: product.image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();  // Update cart count display
    window.location.href = "../Cart/Cart.html";
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();  // Ensure cart count updates on page load

    document.getElementById("cart-button").addEventListener("click", function () {
        const selectedProduct = getSelectedProduct();
        const quantity = parseInt(document.getElementById("quantity").textContent, 10);
        addToCart(selectedProduct, quantity);
    });

    document.getElementById("order-button").addEventListener("click", function () {
        orderNow(getSelectedProduct());
    });

    updateProductDetails();

    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");
    const quantityValue = document.getElementById("quantity");
    let currentQuantity = 1;

    increaseBtn.addEventListener("click", function () {
        currentQuantity++;
        quantityValue.textContent = currentQuantity;
    });

    decreaseBtn.addEventListener("click", function () {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityValue.textContent = currentQuantity;
        }
    });
});
