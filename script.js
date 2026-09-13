document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       VARIABLES
    ============================ */

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    const productCards = document.querySelectorAll(".product-card");
    const productGrid = document.getElementById("productGrid");

    const categoryLinks = document.querySelectorAll(".category-link");
    const categoryCards = document.querySelectorAll(".category-card");

    const cartCount = document.getElementById("cartCount");

    const wishlistButton = document.getElementById("wishlistButton");
    const cartButton = document.getElementById("cartButton");
    const accountButton = document.getElementById("accountButton");

    const startShopping = document.getElementById("startShopping");
    const sellButton = document.getElementById("sellButton");
    const sellerButton = document.getElementById("sellerButton");

    const clearFilter = document.getElementById("clearFilter");

    const toast = document.getElementById("toast");
    const emptyState = document.getElementById("emptyState");


    /* ============================
       CART
    ============================ */

    let cart = JSON.parse(localStorage.getItem("marteyCart")) || [];

    function updateCartCount() {

        cartCount.textContent = cart.length;

        localStorage.setItem(
            "marteyCart",
            JSON.stringify(cart)
        );
    }


    updateCartCount();


    document.querySelectorAll(".add-cart").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".product-card");

            const productName =
                card.querySelector("h3").textContent;

            const productPrice =
                card.querySelector(".price-row strong").textContent;

            cart.push({
                name: productName,
                price: productPrice
            });

            updateCartCount();

            showToast(
                `${productName} added to cart`
            );

        });

    });


    /* ============================
       WISHLIST
    ============================ */

    let wishlist =
        JSON.parse(localStorage.getItem("marteyWishlist")) || [];


    document.querySelectorAll(".heart-btn").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".product-card");

            const productName =
                card.querySelector("h3").textContent;


            button.classList.toggle("active");


            if (button.classList.contains("active")) {

                wishlist.push(productName);

                showToast("Added to wishlist");

            } else {

                wishlist =
                    wishlist.filter(
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


    /* ============================
       SEARCH
    ============================ */

    function searchProducts() {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        let visibleProducts = 0;


        productCards.forEach(card => {

            const name =
                card.querySelector("h3")
                    .textContent
                    .toLowerCase();

            const category =
                card.dataset.category
                    .toLowerCase();


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


        emptyState.classList.toggle(
            "show",
            visibleProducts === 0
        );

    }


    searchButton.addEventListener(
        "click",
        searchProducts
    );


    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                searchProducts();
            }

        }
    );


    /* ============================
       CATEGORY FILTER
    ============================ */

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


        emptyState.classList.toggle(
            "show",
            visibleProducts === 0
        );

    }


    categoryLinks.forEach(link => {

        link.addEventListener("click", () => {

            categoryLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");


            searchInput.value = "";


            filterCategory(
                link.dataset.category
            );


            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

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


            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


    /* ============================
       VIEW ALL
    ============================ */

    clearFilter.addEventListener("click", () => {

        searchInput.value = "";

        categoryLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.category === "all"
            );

        });

        filterCategory("all");

    });


    /* ============================
       START SHOPPING
    ============================ */

    startShopping.addEventListener(
        "click",
        () => {

            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* ============================
       SELLER BUTTONS
    ============================ */

    function sellerMessage() {

        showToast(
            "Seller registration is coming soon!"
        );

    }


    sellButton.addEventListener(
        "click",
        sellerMessage
    );

    sellerButton.addEventListener(
        "click",
        sellerMessage
    );


    /* ============================
       HEADER BUTTONS
    ============================ */

    cartButton.addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your cart is empty");

        } else {

            showToast(
                `You have ${cart.length} item(s) in your cart`
            );

        }

    });


    wishlistButton.addEventListener(
        "click",
        () => {

            if (wishlist.length === 0) {

                showToast(
                    "Your wishlist is empty"
                );

            } else {

                showToast(
                    `You have ${wishlist.length} wishlist item(s)`
                );

            }

        }
    );


    accountButton.addEventListener(
        "click",
        () => {

            showToast(
                "Account system is coming soon!"
            );

        }
    );


    /* ============================
       TOAST
    ============================ */

    let toastTimer;


    function showToast(message) {

        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }

});
