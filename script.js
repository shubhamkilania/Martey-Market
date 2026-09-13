document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // ELEMENTS
    // ============================

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    const productCards = document.querySelectorAll(".product-card");
    const categoryLinks = document.querySelectorAll(".category-link");
    const categoryCards = document.querySelectorAll(".category-card");

    const cartCount = document.getElementById("cartCount");
    const cartButton = document.getElementById("cartButton");

    const wishlistButton = document.getElementById("wishlistButton");
    const accountButton = document.getElementById("accountButton");

    const startShopping = document.getElementById("startShopping");
    const sellButton = document.getElementById("sellButton");
    const sellerButton = document.getElementById("sellerButton");

    const clearFilter = document.getElementById("clearFilter");

    const toast = document.getElementById("toast");
    const emptyState = document.getElementById("emptyState");

    const productsSection = document.getElementById("products");


    // ============================
    // TOAST
    // ============================

    let toastTimer;

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }


    // ============================
    // CART
    // ============================

    let cart = JSON.parse(
        localStorage.getItem("marteyCart")
    ) || [];


    function updateCartCount() {

        if (cartCount) {
            cartCount.textContent = cart.length;
        }

        localStorage.setItem(
            "marteyCart",
            JSON.stringify(cart)
        );
    }


    updateCartCount();


    document.querySelectorAll(".add-cart").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".product-card");

            if (!card) return;

            const nameElement = card.querySelector("h3");
            const priceElement = card.querySelector(
                ".price-row strong"
            );

            if (!nameElement || !priceElement) return;

            const productName = nameElement.textContent.trim();
            const productPrice = priceElement.textContent.trim();

            cart.push({
                name: productName,
                price: productPrice
            });

            updateCartCount();

            showToast(
                productName + " added to cart"
            );

        });

    });


    // ============================
    // CART PAGE
    // ============================

    if (cartButton) {

        cartButton.addEventListener("click", () => {

            window.location.href = "cart.html";

        });

    }


    // ============================
    // WISHLIST
    // ============================

    let wishlist = JSON.parse(
        localStorage.getItem("marteyWishlist")
    ) || [];


    document.querySelectorAll(".heart-btn").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".product-card");

            if (!card) return;

            const nameElement = card.querySelector("h3");

            if (!nameElement) return;

            const productName =
                nameElement.textContent.trim();


            button.classList.toggle("active");


            if (button.classList.contains("active")) {

                if (!wishlist.includes(productName)) {
                    wishlist.push(productName);
                }

                showToast("Added to wishlist");

            } else {

                wishlist = wishlist.filter(
                    item => item !== productName
                );

                showToast("Removed from wishlist");

            }


            localStorage.setItem(
                "marteyWishlist",
                JSON.stringify(wishlist)
            );

        });

    });


    // ============================
    // SEARCH
    // ============================

    function searchProducts() {

        if (!searchInput) return;

        const query =
            searchInput.value.toLowerCase().trim();

        let visibleProducts = 0;


        productCards.forEach(card => {

            const nameElement = card.querySelector("h3");

            if (!nameElement) return;

            const name =
                nameElement.textContent.toLowerCase();

            const category =
                (card.dataset.category || "").toLowerCase();


            if (
                name.includes(query) ||
                category.includes(query)
            ) {

                card.style.display = "";
                visibleProducts++;

            } else {

                card.style.display = "none";

            }

        });


        if (emptyState) {

            emptyState.classList.toggle(
                "show",
                visibleProducts === 0
            );

        }

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchProducts
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    searchProducts();
                }

            }
        );

    }


    // ============================
    // CATEGORY FILTER
    // ============================

    function filterCategory(category) {

        let visibleProducts = 0;


        productCards.forEach(card => {

            const cardCategory =
                card.dataset.category;


            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display = "";
                visibleProducts++;

            } else {

                card.style.display = "none";

            }

        });


        if (emptyState) {

            emptyState.classList.toggle(
                "show",
                visibleProducts === 0
            );

        }

    }


    categoryLinks.forEach(link => {

        link.addEventListener("click", () => {

            categoryLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");


            if (searchInput) {
                searchInput.value = "";
            }


            filterCategory(
                link.dataset.category
            );


            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    categoryCards.forEach(card => {

        card.addEventListener("click", () => {

            const category =
                card.dataset.category;


            categoryLinks.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.dataset.category === category
                );

            });


            filterCategory(category);


            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    // ============================
    // VIEW ALL
    // ============================

    if (clearFilter) {

        clearFilter.addEventListener("click", () => {

            if (searchInput) {
                searchInput.value = "";
            }


            categoryLinks.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.dataset.category === "all"
                );

            });


            filterCategory("all");

        });

    }


    // ============================
    // START SHOPPING
    // ============================

    if (startShopping) {

        startShopping.addEventListener(
            "click",
            () => {

                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    // ============================
    // SELLER BUTTONS
    // ============================

    function sellerMessage() {

        showToast(
            "Seller registration is coming soon!"
        );

    }


    if (sellButton) {
        sellButton.addEventListener(
            "click",
            sellerMessage
        );
    }


    if (sellerButton) {
        sellerButton.addEventListener(
            "click",
            sellerMessage
        );
    }


    // ============================
    // WISHLIST HEADER
    // ============================

    if (wishlistButton) {

        wishlistButton.addEventListener(
            "click",
            () => {

                if (wishlist.length === 0) {

                    showToast(
                        "Your wishlist is empty"
                    );

                } else {

                    showToast(
                        "You have " +
                        wishlist.length +
                        " wishlist item(s)"
                    );

                }

            }
        );

    }


    // ============================
    // ACCOUNT
    // ============================

    if (accountButton) {

        accountButton.addEventListener(
            "click",
            () => {

                showToast(
                    "Account system is coming soon!"
                );

            }
        );

    }

});
