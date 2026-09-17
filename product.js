document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRODUCT DATABASE
    ===================================================== */

    const productDatabase = {

        "1": {
            id: "1",
            title: "Premium Oversized T-Shirt",
            category: "Fashion",
            price: 799,
            mrp: 1499,
            discount: "47% OFF",
            rating: 4.7,
            reviews: 128,
            badge: "Bestseller",
            image: "images/premium-tshirt.jpg",
            gallery: [
                "images/premium-tshirt.jpg",
                "images/premium-tshirt-2.jpg",
                "images/premium-tshirt-3.jpg",
                "images/premium-tshirt-4.jpg",
                "images/premium-tshirt-5.jpg"
            ],
            description:
                "A premium oversized T-shirt designed for everyday comfort with a clean and modern look. Made for casual styling and easy everyday wear.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Black", "White", "Blue"]
        },

        "1001": {
            id: "1001",
            title: "Premium Oversized T-Shirt",
            category: "Fashion",
            price: 799,
            mrp: 1499,
            discount: "47% OFF",
            rating: 4.7,
            reviews: 128,
            badge: "Bestseller",
            image: "images/premium-tshirt.jpg",
            gallery: [
                "images/premium-tshirt.jpg",
                "images/premium-tshirt-2.jpg",
                "images/premium-tshirt-3.jpg",
                "images/premium-tshirt-4.jpg",
                "images/premium-tshirt-5.jpg"
            ],
            description:
                "A premium oversized T-shirt designed for everyday comfort with a clean and modern look. Made for casual styling and easy everyday wear.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Black", "White", "Blue"]
        },

        "101": {
            id: "101",
            title: "Wireless Headphones",
            category: "Electronics",
            price: 1999,
            mrp: 2999,
            discount: "33% OFF",
            rating: 4.5,
            reviews: 94,
            badge: "Popular",
            image: "images/headphones.jpg",
            gallery: [
                "images/headphones.jpg"
            ],
            description:
                "Wireless headphones designed for everyday listening with a clean design, comfortable fit and convenient wireless connectivity.",
            sizes: ["Standard"],
            colors: ["Black", "White"]
        },

        "1002": {
            id: "1002",
            title: "Wireless Headphones",
            category: "Electronics",
            price: 1999,
            mrp: 2999,
            discount: "33% OFF",
            rating: 4.5,
            reviews: 94,
            badge: "Popular",
            image: "images/headphones.jpg",
            gallery: [
                "images/headphones.jpg"
            ],
            description:
                "Wireless headphones designed for everyday listening with a clean design, comfortable fit and convenient wireless connectivity.",
            sizes: ["Standard"],
            colors: ["Black", "White"]
        },

        "102": {
            id: "102",
            title: "Minimal Smart Watch",
            category: "Accessories",
            price: 2499,
            mrp: 3999,
            discount: "38% OFF",
            rating: 4.6,
            reviews: 76,
            badge: "Trending",
            image: "images/smartwatch.jpg",
            gallery: [
                "images/smartwatch.jpg"
            ],
            description:
                "A minimal smart watch combining a clean design with useful everyday smart features in a modern form.",
            sizes: ["Standard"],
            colors: ["Black", "White", "Blue"]
        },

        "1003": {
            id: "1003",
            title: "Minimal Smart Watch",
            category: "Accessories",
            price: 2499,
            mrp: 3999,
            discount: "38% OFF",
            rating: 4.6,
            reviews: 76,
            badge: "Trending",
            image: "images/smartwatch.jpg",
            gallery: [
                "images/smartwatch.jpg"
            ],
            description:
                "A minimal smart watch combining a clean design with useful everyday smart features in a modern form.",
            sizes: ["Standard"],
            colors: ["Black", "White", "Blue"]
        },

        "103": {
            id: "103",
            title: "Modern Desk Lamp",
            category: "Home",
            price: 1299,
            mrp: 1999,
            discount: "35% OFF",
            rating: 4.4,
            reviews: 61,
            badge: "Popular",
            image: "images/desk-lamp.jpg",
            gallery: [
                "images/desk-lamp.jpg"
            ],
            description:
                "A modern desk lamp with a clean design, suitable for study desks, workspaces and everyday home use.",
            sizes: ["Standard"],
            colors: ["Black", "White"]
        },

        "1004": {
            id: "1004",
            title: "Modern Desk Lamp",
            category: "Home",
            price: 1299,
            mrp: 1999,
            discount: "35% OFF",
            rating: 4.4,
            reviews: 61,
            badge: "Popular",
            image: "images/desk-lamp.jpg",
            gallery: [
                "images/desk-lamp.jpg"
            ],
            description:
                "A modern desk lamp with a clean design, suitable for study desks, workspaces and everyday home use.",
            sizes: ["Standard"],
            colors: ["Black", "White"]
        },

        "104": {
            id: "104",
            title: "Premium Oversized T-Shirt",
            category: "Fashion",
            price: 799,
            mrp: 1499,
            discount: "47% OFF",
            rating: 4.7,
            reviews: 128,
            badge: "Bestseller",
            image: "images/premium-tshirt.jpg",
            gallery: [
                "images/premium-tshirt.jpg",
                "images/premium-tshirt-2.jpg",
                "images/premium-tshirt-3.jpg",
                "images/premium-tshirt-4.jpg",
                "images/premium-tshirt-5.jpg"
            ],
            description:
                "A premium oversized T-shirt designed for everyday comfort with a clean and modern look.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Black", "White", "Blue"]
        }

    };


    /* =====================================================
       CURRENT PRODUCT
    ===================================================== */

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("id") || "1";

    const product =
        productDatabase[requestedId] ||
        productDatabase["1"];


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const productTitle = document.getElementById("productTitle");
    const productCategory = document.getElementById("productCategory");
    const productPrice = document.getElementById("productPrice");
    const productMRP = document.getElementById("productMRP");
    const productDiscount = document.getElementById("productDiscount");
    const productRating = document.getElementById("productRating");
    const productReviews = document.getElementById("productReviews");
    const productBadge = document.getElementById("productBadge");
    const mainProductImage = document.getElementById("mainProductImage");
    const breadcrumbProduct = document.getElementById("breadcrumbProduct");
    const productDescription = document.getElementById("productDescription");
    const specCategory = document.getElementById("specCategory");

    const cartCount = document.getElementById("cartCount");

    const addToCartButton = document.getElementById("addToCartButton");
    const buyNowButton = document.getElementById("buyNowButton");

    const selectedSizeElement = document.getElementById("selectedSize");
    const selectedColorElement = document.getElementById("selectedColor");

    const productThumbnails = document.getElementById("productThumbnails");

    const productWishlistButton =
        document.getElementById("productWishlistButton");

    const quantityValue =
        document.getElementById("quantityValue");

    const quantityMinus =
        document.getElementById("quantityMinus");

    const quantityPlus =
        document.getElementById("quantityPlus");


    /* =====================================================
       HELPERS
    ===================================================== */

    function formatPrice(value) {
        return "₹" + Number(value).toLocaleString("en-IN");
    }

    function showToast(message) {
        const toast = document.getElementById("productToast");

        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(window.marteyToastTimer);

        window.marteyToastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }

    function escapeHTML(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    /* =====================================================
       PRODUCT INFORMATION
    ===================================================== */

    productTitle.textContent = product.title;
    productCategory.textContent = product.category;

    productPrice.textContent = formatPrice(product.price);
    productMRP.textContent = formatPrice(product.mrp);

    productDiscount.textContent = product.discount;

    productRating.textContent = `★ ${product.rating}`;
    productReviews.textContent =
        `${product.reviews} Ratings & Reviews`;

    productBadge.textContent = product.badge;

    productDescription.textContent = product.description;
    specCategory.textContent = product.category;

    breadcrumbProduct.textContent = product.title;

    mainProductImage.src = product.image;
    mainProductImage.alt = product.title;

    document.title = `${product.title} | MARTEY`;


    /* =====================================================
       GALLERY
    ===================================================== */

    function renderGallery() {

        productThumbnails.innerHTML = "";

        const gallery = product.gallery || [product.image];

        gallery.forEach((image, index) => {

            const button = document.createElement("button");

            button.type = "button";
            button.className =
                "product-thumbnail" +
                (index === 0 ? " active" : "");

            button.dataset.image = image;

            const img = document.createElement("img");

            img.src = image;
            img.alt = `${product.title} image ${index + 1}`;

            button.appendChild(img);

            button.addEventListener("click", () => {

                mainProductImage.src = image;

                document
                    .querySelectorAll(".product-thumbnail")
                    .forEach(item => item.classList.remove("active"));

                button.classList.add("active");
            });

            productThumbnails.appendChild(button);
        });
    }

    renderGallery();


    /* =====================================================
       OPTIONS
    ===================================================== */

    let selectedSize =
        product.sizes.includes("M")
            ? "M"
            : product.sizes[0];

    let selectedColor =
        product.colors.includes("Black")
            ? "Black"
            : product.colors[0];


    function renderOptions() {

        const sizeButtons =
            document.querySelectorAll("[data-size]");

        sizeButtons.forEach(button => {

            const size = button.dataset.size;

            if (!product.sizes.includes(size)) {
                button.style.display = "none";
                return;
            }

            button.style.display = "";

            button.classList.toggle(
                "active",
                size === selectedSize
            );

            button.onclick = () => {

                selectedSize = size;
                selectedSizeElement.textContent = size;

                sizeButtons.forEach(item => {
                    item.classList.remove("active");
                });

                button.classList.add("active");
            };
        });


        const colorButtons =
            document.querySelectorAll("[data-color]");

        colorButtons.forEach(button => {

            const color = button.dataset.color;

            if (!product.colors.includes(color)) {
                button.style.display = "none";
                return;
            }

            button.style.display = "";

            button.classList.toggle(
                "active",
                color === selectedColor
            );

            button.onclick = () => {

                selectedColor = color;
                selectedColorElement.textContent = color;

                colorButtons.forEach(item => {
                    item.classList.remove("active");
                });

                button.classList.add("active");
            };
        });

        selectedSizeElement.textContent = selectedSize;
        selectedColorElement.textContent = selectedColor;
    }

    renderOptions();


    /* =====================================================
       QUANTITY
    ===================================================== */

    let quantity = 1;

    function updateQuantity() {
        quantityValue.textContent = quantity;
    }

    quantityMinus.addEventListener("click", () => {

        if (quantity > 1) {
            quantity--;
            updateQuantity();
        }

    });

    quantityPlus.addEventListener("click", () => {

        if (quantity < 10) {
            quantity++;
            updateQuantity();
        }

    });


    /* =====================================================
       CART
    ===================================================== */

    function getCart() {

        try {
            return JSON.parse(
                localStorage.getItem("marteyCart") || "[]"
            );
        } catch {
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

        const cart = getCart();

        const totalQuantity = cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 1),
            0
        );

        cartCount.textContent = totalQuantity;
    }


    function addProductToCart(productQuantity = quantity) {

        const cart = getCart();

        const existingItem = cart.find(item =>
            String(item.id) === String(product.id) &&
            item.size === selectedSize &&
            item.color === selectedColor
        );

        if (existingItem) {

            existingItem.quantity =
                Number(existingItem.quantity || 1) +
                productQuantity;

        } else {

            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                size: selectedSize,
                color: selectedColor,
                quantity: productQuantity
            });

        }

        saveCart(cart);
        updateCartCount();

        showToast(
            productQuantity > 1
                ? `${productQuantity} items added to cart`
                : "Product added to cart"
        );
    }


    addToCartButton.addEventListener("click", () => {
        addProductToCart(quantity);
    });


    /* =====================================================
       BUY NOW
    ===================================================== */

    buyNowButton.addEventListener("click", () => {

        const buyNowItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity
        };

        localStorage.setItem(
            "marteyBuyNow",
            JSON.stringify(buyNowItem)
        );

        const currentUser =
            JSON.parse(
                localStorage.getItem("marteyCurrentUser") ||
                "null"
            );

        if (currentUser) {

            window.location.href =
                "checkout.html?buyNow=1";

        } else {

            openAuthModal("login");

        }
    });


    /* =====================================================
       WISHLIST
    ===================================================== */

    function getWishlist() {

        try {
            return JSON.parse(
                localStorage.getItem("marteyWishlist") || "[]"
            );
        } catch {
            return [];
        }
    }


    function saveWishlist(wishlist) {
        localStorage.setItem(
            "marteyWishlist",
            JSON.stringify(wishlist)
        );
    }


    function isInWishlist() {

        const wishlist = getWishlist();

        return wishlist.some(item =>
            String(
                typeof item === "object"
                    ? item.id
                    : item
            ) === String(product.id)
        );
    }


    function updateWishlistButton() {

        productWishlistButton.classList.toggle(
            "active",
            isInWishlist()
        );
    }


    productWishlistButton.addEventListener("click", () => {

        let wishlist = getWishlist();

        const index = wishlist.findIndex(item =>
            String(
                typeof item === "object"
                    ? item.id
                    : item
            ) === String(product.id)
        );

        if (index >= 0) {

            wishlist.splice(index, 1);

            showToast("Removed from wishlist");

        } else {

            wishlist.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image
            });

            showToast("Added to wishlist");
        }

        saveWishlist(wishlist);
        updateWishlistButton();
    });

    updateWishlistButton();


    /* =====================================================
       DELIVERY CHECK
    ===================================================== */

    const deliveryPincode =
        document.getElementById("deliveryPincode");

    const checkDeliveryButton =
        document.getElementById("checkDeliveryButton");

    const deliveryResult =
        document.getElementById("deliveryResult");


    checkDeliveryButton.addEventListener("click", () => {

        const pincode =
            deliveryPincode.value.trim();

        deliveryResult.className =
            "delivery-result";

        if (!/^\d{6}$/.test(pincode)) {

            deliveryResult.textContent =
                "Please enter a valid 6-digit pincode.";

            deliveryResult.classList.add("error");

            return;
        }

        deliveryResult.textContent =
            "Delivery available to this pincode.";

        deliveryResult.classList.add("success");
    });


    deliveryPincode.addEventListener("input", () => {

        deliveryPincode.value =
            deliveryPincode.value.replace(/\D/g, "");

    });


    /* =====================================================
       HEADER
    ===================================================== */

    const cartHeaderButton =
        document.getElementById("cartHeaderButton");

    const wishlistHeaderButton =
        document.getElementById("wishlistHeaderButton");

    const accountHeaderButton =
        document.getElementById("accountHeaderButton");

    cartHeaderButton.addEventListener("click", () => {

        window.location.href = "cart.html";

    });


    wishlistHeaderButton.addEventListener("click", () => {

        showToast("Wishlist opened");

        /*
          If wishlist.html is added later,
          this can simply become:
          window.location.href = "wishlist.html";
        */
    });


    accountHeaderButton.addEventListener("click", () => {

        const currentUser =
            JSON.parse(
                localStorage.getItem("marteyCurrentUser") ||
                "null"
            );

        if (currentUser) {

            window.location.href = "account.html";

        } else {

            openAuthModal("login");

        }
    });


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById("searchInput");

    const searchButton =
        document.getElementById("searchButton");


    function performSearch() {

        const query =
            searchInput.value.trim();

        if (!query) return;

        window.location.href =
            `index.html?search=${encodeURIComponent(query)}`;
    }


    searchButton.addEventListener(
        "click",
        performSearch
    );


    searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            performSearch();
        }

    });


    /* =====================================================
       AUTH MODAL
    ===================================================== */

    const authOverlay =
        document.getElementById("productAuthOverlay");

    const authClose =
        document.getElementById("productAuthClose");

    const authModalTitle =
        document.getElementById("authModalTitle");

    const loginForm =
        document.getElementById("productLoginForm");

    const signupForm =
        document.getElementById("productSignupForm");

    const authMessage =
        document.getElementById("productAuthMessage");


    function openAuthModal(tab = "login") {

        authOverlay.classList.add("show");
        document.body.style.overflow = "hidden";

        switchAuthTab(tab);
    }


    function closeAuthModal() {

        authOverlay.classList.remove("show");
        document.body.style.overflow = "";
    }


    function switchAuthTab(tab) {

        const tabs =
            document.querySelectorAll("[data-auth-tab]");

        tabs.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.authTab === tab
            );

        });


        if (tab === "signup") {

            loginForm.classList.add("hidden");
            signupForm.classList.remove("hidden");

            authModalTitle.textContent =
                "Create your account";

        } else {

            signupForm.classList.add("hidden");
            loginForm.classList.remove("hidden");

            authModalTitle.textContent =
                "Login to continue";
        }

        authMessage.textContent = "";
        authMessage.className = "form-message";
    }


    document
        .querySelectorAll("[data-auth-tab]")
        .forEach(button => {

            button.addEventListener("click", () => {
                switchAuthTab(
                    button.dataset.authTab
                );
            });

        });


    authClose.addEventListener(
        "click",
        closeAuthModal
    );


    authOverlay.addEventListener("click", event => {

        if (event.target === authOverlay) {
            closeAuthModal();
        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (authOverlay.classList.contains("show")) {
                closeAuthModal();
            }

            if (
                reviewModalOverlay.classList.contains("show")
            ) {
                closeReviewModal();
            }
        }

    });


    /* =====================================================
       ACCOUNTS
    ===================================================== */

    function getAccounts() {

        try {
            return JSON.parse(
                localStorage.getItem("marteyAccounts") || "[]"
            );
        } catch {
            return [];
        }
    }


    function saveAccounts(accounts) {

        localStorage.setItem(
            "marteyAccounts",
            JSON.stringify(accounts)
        );
    }


    function setCurrentUser(user) {

        localStorage.setItem(
            "marteyCurrentUser",
            JSON.stringify(user)
        );

        localStorage.setItem(
            "marteyUser",
            JSON.stringify(user)
        );
    }


    /* =====================================================
       LOGIN
    ===================================================== */

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        const email =
            document
                .getElementById("productLoginEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document
                .getElementById("productLoginPassword")
                .value;


        const accounts = getAccounts();

        const account = accounts.find(item =>
            String(item.email).toLowerCase() === email &&
            item.password === password
        );


        if (!account) {

            authMessage.textContent =
                "Incorrect email or password.";

            authMessage.className =
                "form-message error";

            return;
        }


        setCurrentUser({
            id: account.id,
            name: account.name,
            email: account.email,
            phone: account.phone,
            role: account.role || "customer"
        });


        authMessage.textContent =
            "Login successful.";

        authMessage.className =
            "form-message success";


        setTimeout(() => {

            window.location.href =
                "checkout.html?buyNow=1";

        }, 500);

    });


    /* =====================================================
       SIGNUP
    ===================================================== */

    signupForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document
                .getElementById("productSignupName")
                .value
                .trim();

        const email =
            document
                .getElementById("productSignupEmail")
                .value
                .trim()
                .toLowerCase();

        const phone =
            document
                .getElementById("productSignupPhone")
                .value
                .trim();

        const password =
            document
                .getElementById("productSignupPassword")
                .value;


        if (!/^\d{10}$/.test(phone)) {

            authMessage.textContent =
                "Please enter a valid 10-digit phone number.";

            authMessage.className =
                "form-message error";

            return;
        }


        if (password.length < 6) {

            authMessage.textContent =
                "Password must contain at least 6 characters.";

            authMessage.className =
                "form-message error";

            return;
        }


        const accounts = getAccounts();

        const emailExists = accounts.some(item =>
            String(item.email).toLowerCase() === email
        );


        if (emailExists) {

            authMessage.textContent =
                "An account with this email already exists.";

            authMessage.className =
                "form-message error";

            return;
        }


        const newAccount = {

            id:
                "customer_" +
                Date.now(),

            name,
            email,
            phone,
            password,
            role: "customer"
        };


        accounts.push(newAccount);
        saveAccounts(accounts);


        setCurrentUser({
            id: newAccount.id,
            name: newAccount.name,
            email: newAccount.email,
            phone: newAccount.phone,
            role: "customer"
        });


        authMessage.textContent =
            "Account created successfully.";

        authMessage.className =
            "form-message success";


        setTimeout(() => {

            window.location.href =
                "checkout.html?buyNow=1";

        }, 500);

    });


    /* =====================================================
       REVIEW SYSTEM
    ===================================================== */

    const reviewModalOverlay =
        document.getElementById("reviewModalOverlay");

    const reviewModalClose =
        document.getElementById("reviewModalClose");

    const reviewForm =
        document.getElementById("reviewForm");

    const reviewStarsInput =
        document.getElementById("reviewStarsInput");

    const reviewText =
        document.getElementById("reviewText");

    const reviewImage =
        document.getElementById("reviewImage");

    const reviewImagePreview =
        document.getElementById("reviewImagePreview");

    const reviewFormMessage =
        document.getElementById("reviewFormMessage");

    const selectedRatingText =
        document.getElementById("selectedRatingText");

    const reviewList =
        document.getElementById("reviewList");

    const writeReviewButton =
        document.getElementById("writeReviewButton");


    let selectedRating = 0;
    let selectedReviewImage = "";


    function getReviews() {

        try {
            return JSON.parse(
                localStorage.getItem(
                    "marteyProductReviews"
                ) || "[]"
            );
        } catch {
            return [];
        }
    }


    function saveReviews(reviews) {

        localStorage.setItem(
            "marteyProductReviews",
            JSON.stringify(reviews)
        );
    }


    function openReviewModal() {

        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "marteyCurrentUser"
                ) || "null"
            );

        if (!currentUser) {

            openAuthModal("login");

            authMessage.textContent =
                "Please login to write a review.";

            authMessage.className =
                "form-message error";

            return;
        }


        resetReviewForm();

        reviewModalOverlay.classList.add("show");
        document.body.style.overflow = "hidden";
    }


    function closeReviewModal() {

        reviewModalOverlay.classList.remove("show");
        document.body.style.overflow = "";
    }


    writeReviewButton.addEventListener(
        "click",
        openReviewModal
    );


    reviewModalClose.addEventListener(
        "click",
        closeReviewModal
    );


    reviewModalOverlay.addEventListener("click", event => {

        if (event.target === reviewModalOverlay) {
            closeReviewModal();
        }

    });


    /* =====================================================
       STAR SELECTOR
    ===================================================== */

    reviewStarsInput
        .querySelectorAll("[data-rating]")
        .forEach(button => {

            button.addEventListener("click", () => {

                selectedRating =
                    Number(button.dataset.rating);

                reviewStarsInput
                    .querySelectorAll("[data-rating]")
                    .forEach(star => {

                        star.classList.toggle(
                            "active",
                            Number(star.dataset.rating) <=
                            selectedRating
                        );

                    });


                selectedRatingText.textContent =
                    `${selectedRating} out of 5 stars`;
            });

        });


    /* =====================================================
       IMAGE UPLOAD
       OPTIONAL
    ===================================================== */

    reviewImage.addEventListener("change", event => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }


        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];


        if (!allowedTypes.includes(file.type)) {

            reviewFormMessage.textContent =
                "Please upload a JPG, PNG or WebP image.";

            reviewFormMessage.className =
                "form-message error";

            reviewImage.value = "";

            return;
        }


        /*
          Limit image to 2 MB in this frontend prototype.
        */

        if (file.size > 2 * 1024 * 1024) {

            reviewFormMessage.textContent =
                "Image must be smaller than 2 MB.";

            reviewFormMessage.className =
                "form-message error";

            reviewImage.value = "";

            return;
        }


        const reader = new FileReader();


        reader.onload = event => {

            selectedReviewImage =
                event.target.result;

            renderReviewImagePreview();
        };


        reader.readAsDataURL(file);
    });


    function renderReviewImagePreview() {

        if (!selectedReviewImage) {

            reviewImagePreview.innerHTML = "";

            return;
        }


        reviewImagePreview.innerHTML = `

            <div class="review-image-preview-card">

                <img
                    src="${selectedReviewImage}"
                    alt="Selected product image"
                >

                <button
                    type="button"
                    class="remove-review-image"
                    id="removeReviewImage"
                    aria-label="Remove image"
                >
                    ×
                </button>

            </div>

        `;


        const removeButton =
            document.getElementById(
                "removeReviewImage"
            );


        removeButton.addEventListener(
            "click",
            removeReviewImage
        );
    }


    function removeReviewImage() {

        selectedReviewImage = "";
        reviewImage.value = "";

        reviewImagePreview.innerHTML = "";

        reviewFormMessage.textContent = "";
        reviewFormMessage.className =
            "form-message";
    }


    /* =====================================================
       REVIEW SUBMIT
    ===================================================== */

    reviewForm.addEventListener("submit", event => {

        event.preventDefault();


        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "marteyCurrentUser"
                ) || "null"
            );


        if (!currentUser) {

            reviewFormMessage.textContent =
                "Please login before submitting a review.";

            reviewFormMessage.className =
                "form-message error";

            return;
        }


        if (selectedRating < 1) {

            reviewFormMessage.textContent =
                "Please select a rating.";

            reviewFormMessage.className =
                "form-message error";

            return;
        }


        const text =
            reviewText.value.trim();


        if (!text) {

            reviewFormMessage.textContent =
                "Please write your review.";

            reviewFormMessage.className =
                "form-message error";

            return;
        }


        const reviews = getReviews();


        const newReview = {

            id:
                "review_" +
                Date.now(),

            productId: String(product.id),

            userName:
                currentUser.name ||
                "MARTEY Customer",

            rating: selectedRating,

            text,

            /*
              Image is optional.
              If customer doesn't upload one,
              this remains empty.
            */
            image:
                selectedReviewImage || "",

            createdAt:
                new Date().toISOString()
        };


        reviews.push(newReview);

        saveReviews(reviews);


        closeReviewModal();

        renderReviews();

        reviewFormMessage.textContent = "";

        showToast(
            "Your review has been submitted"
        );
    });


    /* =====================================================
       RESET REVIEW FORM
    ===================================================== */

    function resetReviewForm() {

        reviewForm.reset();

        selectedRating = 0;
        selectedReviewImage = "";

        reviewStarsInput
            .querySelectorAll("[data-rating]")
            .forEach(button => {
                button.classList.remove("active");
            });

        selectedRatingText.textContent =
            "Select a rating";

        reviewImagePreview.innerHTML = "";

        reviewFormMessage.textContent = "";
        reviewFormMessage.className =
            "form-message";
    }


    /* =====================================================
       RENDER REVIEWS
    ===================================================== */

    function formatReviewDate(dateString) {

        const date =
            new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    }


    function renderReviews() {

        const reviews =
            getReviews().filter(item =>
                String(item.productId) ===
                String(product.id)
            );


        /*
          If this is an alias product ID,
          also show reviews from equivalent IDs.
        */

        const equivalentIds = new Set([
            String(product.id)
        ]);


        if (
            ["1", "1001", "104"].includes(
                String(product.id)
            )
        ) {
            ["1", "1001", "104"].forEach(id =>
                equivalentIds.add(id)
            );
        }


        if (
            ["101", "1002"].includes(
                String(product.id)
            )
        ) {
            ["101", "1002"].forEach(id =>
                equivalentIds.add(id)
            );
        }


        if (
            ["102", "1003"].includes(
                String(product.id)
            )
        ) {
            ["102", "1003"].forEach(id =>
                equivalentIds.add(id)
            );
        }


        if (
            ["103", "1004"].includes(
                String(product.id)
            )
        ) {
            ["103", "1004"].forEach(id =>
                equivalentIds.add(id)
            );
        }


        const allProductReviews =
            getReviews().filter(item =>
                equivalentIds.has(
                    String(item.productId)
                )
            );


        if (!allProductReviews.length) {

            reviewList.innerHTML = `

                <div class="empty-review-card">

                    <strong>
                        Be the first to review this product
                    </strong>

                    <p>
                        Share your experience and help
                        other customers make better decisions.
                    </p>

                </div>

            `;

            return;
        }


        const sortedReviews =
            [...allProductReviews].reverse();


        reviewList.innerHTML =
            sortedReviews.map(review => {

                const stars =
                    "★".repeat(Number(review.rating)) +
                    "☆".repeat(
                        5 - Number(review.rating)
                    );


                const imageHTML =
                    review.image
                        ? `
                            <img
                                src="${review.image}"
                                alt="Customer uploaded product image"
                                class="customer-review-image"
                            >
                        `
                        : "";


                return `

                    <article class="review-card">

                        <div class="review-card-header">

                            <div>
                                <div class="reviewer-name">
                                    ${escapeHTML(
                                        review.userName
                                    )}
                                </div>

                                <div class="review-card-rating">
                                    ${stars}
                                </div>
                            </div>

                            <span class="review-date">
                                ${formatReviewDate(
                                    review.createdAt
                                )}
                            </span>

                        </div>

                        <p class="review-card-text">
                            ${escapeHTML(
                                review.text
                            )}
                        </p>

                        ${imageHTML}

                    </article>

                `;

            }).join("");
    }


    renderReviews();


    /* =====================================================
       CART COUNT INITIAL LOAD
    ===================================================== */

    updateCartCount();

});
