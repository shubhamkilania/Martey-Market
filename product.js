document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       PRODUCT DATABASE
    ========================================================= */

    const productDatabase = {

        "1": {
            title: "Premium Oversized T-Shirt",
            category: "Fashion",
            price: 799,
            mrp: 1499,
            discount: "47% OFF",
            rating: 4.7,
            reviews: 128,
            badge: "Bestseller",
            image: "images/premium-tshirt.jpg"
        },

        "101": {
            title: "Wireless Headphones",
            category: "Electronics",
            price: 1999,
            mrp: 2999,
            discount: "33% OFF",
            rating: 4.5,
            reviews: 94,
            badge: "Popular",
            image: "images/headphones.jpg"
        },

        "102": {
            title: "Minimal Smart Watch",
            category: "Accessories",
            price: 2499,
            mrp: 3999,
            discount: "38% OFF",
            rating: 4.6,
            reviews: 76,
            badge: "Trending",
            image: "images/smartwatch.jpg"
        },

        "103": {
            title: "Modern Desk Lamp",
            category: "Home",
            price: 1299,
            mrp: 1999,
            discount: "35% OFF",
            rating: 4.4,
            reviews: 61,
            badge: "Popular",
            image: "images/desk-lamp.jpg"
        },

        "104": {
            title: "Premium Oversized T-Shirt",
            category: "Fashion",
            price: 799,
            mrp: 1499,
            discount: "47% OFF",
            rating: 4.7,
            reviews: 128,
            badge: "Bestseller",
            image: "images/premium-tshirt.jpg"
        }

    };


    const params =
        new URLSearchParams(window.location.search);

    const productId =
        params.get("id") || "1";

    const product =
        productDatabase[productId] ||
        productDatabase["1"];


    /* =========================================================
       ELEMENTS
    ========================================================= */

    const $ = function (id) {
        return document.getElementById(id);
    };


    /* =========================================================
       PRODUCT DATA
    ========================================================= */

    $("productTitle").textContent = product.title;
    $("productCategory").textContent = product.category;

    $("productPrice").textContent =
        "₹" + Number(product.price).toLocaleString("en-IN");

    $("productMRP").textContent =
        "₹" + Number(product.mrp).toLocaleString("en-IN");

    $("productDiscount").textContent =
        product.discount;

    $("productRating").textContent =
        product.rating;

    $("productReviews").textContent =
        product.reviews;

    $("productBadge").textContent =
        product.badge;

    $("mainProductImage").src =
        product.image;

    $("mainProductImage").alt =
        product.title;

    $("breadcrumbProduct").textContent =
        product.title;

    $("specCategory").textContent =
        product.category;

    $("reviewScore").textContent =
        product.rating;

    $("reviewCount").textContent =
        product.reviews;

    document.title =
        product.title + " | MARTEY";


    /* =========================================================
       TOAST
    ========================================================= */

    function showToast(message) {

        const toast = $("productToast");

        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(window.marteyToastTimer);

        window.marteyToastTimer =
            setTimeout(function () {
                toast.classList.remove("show");
            }, 2200);
    }


    /* =========================================================
       IMAGE GALLERY
    ========================================================= */

    document.querySelectorAll(
        ".product-thumbnail"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const image =
                    button.dataset.image;

                if (!image) return;

                $("mainProductImage").src =
                    image;

                document.querySelectorAll(
                    ".product-thumbnail"
                ).forEach(function (item) {

                    item.classList.remove("active");

                });

                button.classList.add("active");

            }
        );

    });


    /* =========================================================
       SIZE
    ========================================================= */

    let selectedSize = "M";

    document.querySelectorAll(
        "[data-size]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                selectedSize =
                    button.dataset.size;

                document.querySelectorAll(
                    "[data-size]"
                ).forEach(function (item) {
                    item.classList.remove("active");
                });

                button.classList.add("active");

                $("selectedSize").textContent =
                    selectedSize;

            }
        );

    });


    /* =========================================================
       COLOR
    ========================================================= */

    let selectedColor = "Black";

    document.querySelectorAll(
        "[data-color]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                selectedColor =
                    button.dataset.color;

                document.querySelectorAll(
                    "[data-color]"
                ).forEach(function (item) {
                    item.classList.remove("active");
                });

                button.classList.add("active");

                $("selectedColor").textContent =
                    selectedColor;

            }
        );

    });


    /* =========================================================
       CART
    ========================================================= */

    function getCart() {

        try {
            return JSON.parse(
                localStorage.getItem(
                    "marteyCart"
                ) || "[]"
            );
        } catch (error) {
            return [];
        }

    }


    function saveCart(cart) {

        localStorage.setItem(
            "marteyCart",
            JSON.stringify(cart)
        );

    }


    function updateCartCount() {

        const cart =
            getCart();

        const count =
            cart.reduce(
                function (total, item) {
                    return total +
                        Number(item.quantity || 1);
                },
                0
            );

        $("cartCount").textContent =
            count;

    }


    $("addToCartButton").addEventListener(
        "click",
        function () {

            const cart =
                getCart();

            const existing =
                cart.find(function (item) {

                    return String(item.id) ===
                        String(productId) &&
                        item.size === selectedSize &&
                        item.color === selectedColor;

                });


            if (existing) {

                existing.quantity =
                    Number(existing.quantity || 1) + 1;

            } else {

                cart.push({

                    id: productId,

                    title: product.title,

                    price: product.price,

                    image: product.image,

                    size: selectedSize,

                    color: selectedColor,

                    quantity: 1

                });

            }


            saveCart(cart);

            updateCartCount();

            showToast(
                "Product added to cart"
            );

        }
    );


    /* =========================================================
       LOGIN CHECK
    ========================================================= */

    function getCurrentUser() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "marteyCurrentUser"
                ) || "null"
            );

        } catch (error) {

            return null;

        }

    }


    /* =========================================================
       BUY NOW
    ========================================================= */

    $("buyNowButton").addEventListener(
        "click",
        function () {

            const item = {

                id: productId,

                title: product.title,

                price: product.price,

                image: product.image,

                size: selectedSize,

                color: selectedColor,

                quantity: 1

            };


            localStorage.setItem(
                "marteyBuyNow",
                JSON.stringify(item)
            );


            const user =
                getCurrentUser();

            if (user) {

                window.location.href =
                    "checkout.html?buyNow=1";

                return;

            }


            openAuthModal();

        }
    );


    /* =========================================================
       AUTH MODAL
    ========================================================= */

    const authOverlay =
        $("productAuthOverlay");

    const authClose =
        $("productAuthClose");

    function openAuthModal() {

        authOverlay.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }


    function closeAuthModal() {

        authOverlay.classList.remove("show");

        document.body.style.overflow =
            "";

    }


    authClose.addEventListener(
        "click",
        closeAuthModal
    );


    authOverlay.addEventListener(
        "click",
        function (event) {

            if (event.target === authOverlay) {
                closeAuthModal();
            }

        }
    );


    /* =========================================================
       AUTH TABS
    ========================================================= */

    document.querySelectorAll(
        "[data-auth-tab]"
    ).forEach(function (tab) {

        tab.addEventListener(
            "click",
            function () {

                const type =
                    tab.dataset.authTab;

                document.querySelectorAll(
                    "[data-auth-tab]"
                ).forEach(function (item) {
                    item.classList.remove("active");
                });

                tab.classList.add("active");

                if (type === "login") {

                    $("productLoginForm")
                        .classList.remove("hidden");

                    $("productSignupForm")
                        .classList.add("hidden");

                    $("authModalTitle")
                        .textContent =
                        "Login to continue";

                } else {

                    $("productLoginForm")
                        .classList.add("hidden");

                    $("productSignupForm")
                        .classList.remove("hidden");

                    $("authModalTitle")
                        .textContent =
                        "Create your account";

                }

                $("productAuthMessage")
                    .textContent = "";

            }
        );

    });


    /* =========================================================
       ACCOUNTS
    ========================================================= */

    function getAccounts() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "marteyAccounts"
                ) || "[]"
            );

        } catch (error) {

            return [];

        }

    }


    function saveAccounts(accounts) {

        localStorage.setItem(
            "marteyAccounts",
            JSON.stringify(accounts)
        );

    }


    function finishLogin(user) {

        localStorage.setItem(
            "marteyCurrentUser",
            JSON.stringify(user)
        );

        localStorage.setItem(
            "marteyUser",
            JSON.stringify(user)
        );


        window.location.href =
            "checkout.html?buyNow=1";

    }


    /* =========================================================
       LOGIN
    ========================================================= */

    $("productLoginForm").addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                $("productLoginEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                $("productLoginPassword")
                    .value;

            const accounts =
                getAccounts();

            const account =
                accounts.find(function (item) {

                    return String(item.email)
                        .toLowerCase() === email &&
                        item.password === password;

                });


            if (!account) {

                $("productAuthMessage")
                    .textContent =
                    "Email or password is incorrect.";

                return;

            }


            finishLogin(account);

        }
    );


    /* =========================================================
       SIGNUP
    ========================================================= */

    $("productSignupForm").addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                $("productSignupName")
                    .value
                    .trim();

            const email =
                $("productSignupEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const phone =
                $("productSignupPhone")
                    .value
                    .trim();

            const password =
                $("productSignupPassword")
                    .value;

            if (!/^\d{10}$/.test(phone)) {

                $("productAuthMessage")
                    .textContent =
                    "Enter a valid 10-digit mobile number.";

                return;

            }


            const accounts =
                getAccounts();

            const exists =
                accounts.some(function (item) {

                    return String(item.email)
                        .toLowerCase() === email;

                });


            if (exists) {

                $("productAuthMessage")
                    .textContent =
                    "An account with this email already exists.";

                return;

            }


            const user = {

                id:
                    "USR-" + Date.now(),

                name: name,

                email: email,

                phone: phone,

                password: password,

                role: "customer",

                createdAt:
                    new Date().toISOString()

            };


            accounts.push(user);

            saveAccounts(accounts);

            finishLogin(user);

        }
    );


    /* =========================================================
       DELIVERY CHECK
    ========================================================= */

    $("checkDeliveryButton").addEventListener(
        "click",
        function () {

            const pin =
                $("deliveryPincode")
                    .value
                    .trim();

            if (!/^\d{6}$/.test(pin)) {

                $("deliveryResult")
                    .textContent =
                    "Enter a valid 6-digit PIN code.";

                $("deliveryResult")
                    .style.color =
                    "#f26b78";

                return;

            }

            $("deliveryResult")
                .textContent =
                "Delivery available for this PIN.";

            $("deliveryResult")
                .style.color =
                "#42c98a";

        }
    );


    /* =========================================================
       HEADER
    ========================================================= */

    $("cartHeaderButton").addEventListener(
        "click",
        function () {
            window.location.href =
                "cart.html";
        }
    );


    $("accountHeaderButton").addEventListener(
        "click",
        function () {

            if (getCurrentUser()) {

                window.location.href =
                    "account.html";

            } else {

                openAuthModal();

            }

        }
    );


    $("wishlistHeaderButton").addEventListener(
        "click",
        function () {

            showToast(
                "Wishlist opened"
            );

        }
    );


    /* =========================================================
       SEARCH
    ========================================================= */

    function performSearch() {

        const query =
            $("searchInput")
                .value
                .trim();

        if (!query) return;

        window.location.href =
            "index.html?search=" +
            encodeURIComponent(query);

    }


    $("searchButton").addEventListener(
        "click",
        performSearch
    );


    $("searchInput").addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                performSearch();
            }

        }
    );


    /* =========================================================
       REVIEWS
    ========================================================= */

    function getReviews() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "marteyProductReviews"
                ) || "{}"
            );

        } catch (error) {

            return {};

        }

    }


    function saveReviews(reviews) {

        localStorage.setItem(
            "marteyProductReviews",
            JSON.stringify(reviews)
        );

    }


    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function renderReviews() {

        const allReviews =
            getReviews();

        const reviews =
            allReviews[productId] || [];

        const list =
            $("reviewList");

        if (!list) return;


        if (reviews.length === 0) {

            list.innerHTML = `
                <div class="review-card">
                    <div class="review-user">
                        Be the first MARTEY customer to review this product.
                    </div>
                </div>
            `;

            return;

        }


        list.innerHTML =
            reviews
                .slice()
                .reverse()
                .map(function (review) {

                    const stars =
                        "★".repeat(
                            Number(review.rating)
                        ) +
                        "☆".repeat(
                            5 - Number(review.rating)
                        );


                    return `
                        <article class="review-card">

                            <div class="review-header">

                                <div>

                                    <div class="review-user">
                                        ${escapeHTML(review.userName)}
                                    </div>

                                    <div class="review-date">
                                        Verified Customer
                                    </div>

                                </div>

                                <div class="review-rating">
                                    ${stars}
                                </div>

                            </div>

                            <p class="review-text">
                                ${escapeHTML(review.text)}
                            </p>

                            ${
                                review.image
                                ? `
                                    <div class="review-images">
                                        <div class="review-image">
                                            <img
                                                src="${review.image}"
                                                alt="Customer review"
                                            >
                                        </div>
                                    </div>
                                `
                                : ""
                            }

                        </article>
                    `;

                })
                .join("");

    }


    /* =========================================================
       WRITE REVIEW
    ========================================================= */

    $("writeReviewButton").addEventListener(
        "click",
        function () {

            if (!getCurrentUser()) {

                openAuthModal();

                $("productAuthMessage")
                    .textContent =
                    "Login or sign up to write a review.";

                return;

            }

            $("reviewModalOverlay")
                .classList.add("show");

            document.body.style.overflow =
                "hidden";

        }
    );


    $("reviewModalClose").addEventListener(
        "click",
        function () {

            $("reviewModalOverlay")
                .classList.remove("show");

            document.body.style.overflow =
                "";

        }
    );


    /* =========================================================
       REVIEW RATING
    ========================================================= */

    let selectedRating = 0;

    document.querySelectorAll(
        "#reviewStarsInput button"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                selectedRating =
                    Number(button.dataset.rating);

                document.querySelectorAll(
                    "#reviewStarsInput button"
                ).forEach(function (item) {

                    const rating =
                        Number(
                            item.dataset.rating
                        );

                    item.classList.toggle(
                        "active",
                        rating <= selectedRating
                    );

                });

            }
        );

    });


    /* =========================================================
       REVIEW IMAGE
    ========================================================= */

    let reviewImageData = "";

    $("reviewImage").addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (!file) return;

            const reader =
                new FileReader();

            reader.onload =
                function (event) {

                    reviewImageData =
                        event.target.result;

                    $("reviewImagePreview")
                        .innerHTML = `
                            <img
                                src="${reviewImageData}"
                                alt="Review preview"
                            >
                        `;

                };

            reader.readAsDataURL(file);

        }
    );


    /* =========================================================
       REVIEW SUBMIT
    ========================================================= */

    $("reviewForm").addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const user =
                getCurrentUser();

            if (!user) {

                $("reviewFormMessage")
                    .textContent =
                    "Please login first.";

                return;

            }


            if (
                selectedRating < 1 ||
                selectedRating > 5
            ) {

                $("reviewFormMessage")
                    .textContent =
                    "Please select a rating.";

                return;

            }


            const text =
                $("reviewText")
                    .value
                    .trim();

            if (!text) {

                $("reviewFormMessage")
                    .textContent =
                    "Please write your review.";

                return;

            }


            const allReviews =
                getReviews();

            if (!allReviews[productId]) {
                allReviews[productId] = [];
            }


            allReviews[productId].push({

                id:
                    "REV-" + Date.now(),

                userName:
                    user.name || "MARTEY Customer",

                rating:
                    selectedRating,

                text:
                    text,

                image:
                    reviewImageData,

                createdAt:
                    new Date().toISOString()

            });


            saveReviews(allReviews);

            $("reviewForm").reset();

            $("reviewImagePreview")
                .innerHTML = "";

            $("reviewFormMessage")
                .textContent = "";

            selectedRating = 0;

            document.querySelectorAll(
                "#reviewStarsInput button"
            ).forEach(function (button) {
                button.classList.remove("active");
            });


            $("reviewModalOverlay")
                .classList.remove("show");

            document.body.style.overflow =
                "";

            renderReviews();

            showToast(
                "Your review has been submitted"
            );

        }
    );


    /* =========================================================
       INITIAL LOAD
    ========================================================= */

    updateCartCount();

    renderReviews();

});
