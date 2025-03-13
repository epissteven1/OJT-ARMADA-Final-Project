const products = {
    "Asus ROG Phone 7 Ultimate": {
        price: "20,499",
        image: "../Product/assets/Asus ROG Phone 7 Ultimate.jpg",
        rating: "4.8",
        reviews: "1873",
        description: "A powerful gaming smartphone with an advanced cooling system and high-refresh-rate display."
    },
    "ZTE Nubia Red Magic 9 Pro": {
        price: "24,000",
        image: "../Product/assets/zte-nubia-red-magic-9-pro.jpg",
        rating: "4.8",
        reviews: "120",
        description: "A cutting-edge gaming smartphone that combines powerful performance with a sleek design."
    },
    "Samsung Galaxy S24 Ultra": {

        image: "../Product/assets/Samsung Galaxy S24 Ultra.jpg",
        price: "30,999",
        rating: 4.8,
        reviews: 120,
        description: "A premium flagship smartphone with an advanced camera system, powerful performance, and a stunning display."
    },
    "Xiaomi POCO F4 GT": {
        image: "../Product/assets/Xiaomi POCO F4 GT.jpg",
        price: "21,499",
        rating: 5,
        reviews: 120,
        description: "A gaming powerhouse with a Snapdragon processor, fast charging, and magnetic pop-up triggers for a seamless gaming experience."
    },
    "Infinix Note 30 Pro 8": {
        image: "../Product/assets/Infinix Note 30 Pro 8.jpg",
        price: "9,599",
        rating: 5,
        reviews: 120,
        description: "An affordable smartphone with a high-refresh-rate display, a capable camera setup, and a long-lasting battery."
    },
    "Lenovo Legion Y70": {
        image: "../Product/assets/Lenovo Legion Y70.jpg",
        price: "10,599",
        rating: 5,
        reviews: 120,
        description: "A gaming-focused phone with high-performance specs, an advanced cooling system, and a stunning display."
    },
    "Tecno Spark 10 Pro": {
        image: "../Product/assets/Tecno Spark 10 Pro.jpg",
        price: "13,000",
        rating: 5,
        reviews: 120,
        description: "A budget-friendly smartphone with a stylish design, AI-enhanced cameras, and a large battery for all-day usage."
    },
    "Black Shark 5 Pro 8": {
        image: "../Product/assets/Black Shark 5 Pro 8.jpg",
        price: "15,599",
        rating: 5,
        reviews: 120,
        description: "A dedicated gaming smartphone with top-tier specs, customizable RGB lighting, and advanced cooling technology."
    },
    "Xiaomi Poco X5 Pro": {
        image: "../Product/assets/Xiaomi Poco X5 Pro.jpg",
        price: "16,000",
        ratin: 5,
        reviews: 120,
        description: "A powerful mid-range smartphone with a high refresh rate AMOLED display, a Snapdragon processor, and excellent battery life."
    },
    "Asus ROG Phone 7 Ultimate": {
        image: "../Product/assets/Asus ROG Phone 7 Ultimate.jpg",
        price: "20,499",
        rating: 5,
        reviews: 120,
        description: "A high-end gaming smartphone with top-tier performance, an advanced cooling system, and customizable RGB lighting."
    },
    "Nubia Red Magic 8 Pro": {
        image: "../Product/assets/Nubia Red Magic 8 Pro.jpg",
        price: "13,000",
        rating: 5,
        reviews: 120,
        description: "A gaming-centric smartphone featuring a Snapdragon chipset, a fast display, and a built-in cooling fan for sustained performance."
    },
    "Nubia Red Magic 7S Pro": {

        image: "../Product/assets/redmagic.jpg",
        price: "10,000",
        rating: 5,
        reviews: 120,
        description: "A budget-friendly gaming phone with impressive performance, a high refresh rate display, and advanced cooling technology."
    },
    "Nubia Red Magic 7S": {

        image: "../Product/assets/Nubia Red Magis 7s.jpg",
        price: "9,599",
        rating: 5,
        reviews: 120,
        description: "An affordable gaming smartphone offering excellent performance, long battery life, and a sleek design."
    }
};

// Function to get the product name from sessionStorage
function getSelectedProduct() {
    return sessionStorage.getItem("selectedProduct");
}

// Function to update product details
function updateProductDetails() {
    const productName = getSelectedProduct();

    if (productName && products[productName]) {
        const product = products[productName];

        document.querySelector(".product-container img").src = product.image;
        document.querySelector(".product-container img").alt = productName;
        document.querySelector(".product-info h1").textContent = productName;
        document.querySelector(".product-info .price").textContent = `₱ ${product.price}.00`;
        document.querySelector(".rating-info strong").textContent = product.rating;
        document.querySelector(".rating-info p").innerHTML = `<strong>${product.rating}</strong> (${product.reviews} reviews)`;
        document.querySelector(".details").textContent = product.description;
    } else {
        document.querySelector(".details").textContent = "Product details not found.";
    }
}

// Run function when page loads
document.addEventListener("DOMContentLoaded", updateProductDetails);

document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cart-button");
    const cartCountElement = document.getElementById("cart-count");
    const cartIcon = document.getElementById("cart-icon");
    const orderButton = document.getElementById("order-button");
    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");
    const quantityValue = document.getElementById("quantity");

    let cartCount = 0; // Default cart count
    let currentQuantity = 1; // Default quantity selector value

    // Update quantity when clicking + or -
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

    // Add to cart button
    cartButton.addEventListener("click", function () {
        cartCount += currentQuantity; // Add selected quantity to cart count
        cartCountElement.textContent = cartCount; // Update cart notification

        // Show the cart count only if it's greater than 0
        if (cartCount > 0) {
            cartCountElement.style.display = "flex";
        }
    });
    
    // Redirect to cart.html when Order Now button is clicked
    orderButton.addEventListener("click", function () {
        window.location.href = "../Cart/Cart.html"; // Redirect to cart.html
    });

});
