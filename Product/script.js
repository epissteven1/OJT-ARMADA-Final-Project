document.addEventListener("DOMContentLoaded", function () {
    // ✅ Handle Product Video Hover
    let productContainer = document.querySelector(".product-container");
    if (productContainer) {
        let video = productContainer.querySelector("video");
        if (video) {
            productContainer.addEventListener("mouseenter", function () {
                video.muted = false;
                video.play();
            });

            productContainer.addEventListener("mouseleave", function () {
                video.pause();
                video.currentTime = 0;
                video.muted = true;
            });
        } else {
            console.warn("⚠️ No <video> element found inside .product-container!");
        }
    } else {
        console.warn("⚠️ No .product-container element found!");
    }

    // ✅ Handle Cart Button Click Animation
    const cartButtons = document.querySelectorAll(".cart-btn");
    const cartCountElement = document.getElementById("cart-count");
    const cartIcon = document.getElementById("cart-icon");

    let cartCount = 0;

    cartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            cartCount++;
            cartCountElement.textContent = cartCount;

            if (cartCount > 0) {
                cartCountElement.style.display = "flex";
            }

            // Find the corresponding product image
            const productImage = button.closest("li")?.querySelector(".product-image");
            if (!productImage) {
                console.warn("⚠️ No .product-image found for button!");
                return;
            }

            const flyingImg = productImage.cloneNode(true);
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
        });
    });
});

