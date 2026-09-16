document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PRODUCT DATABASE
    ===================================================== */

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


    /* =====================================================
       GET PRODUCT ID
    ===================================================== */

    const urlParams =
        new URLSearchParams(window.location.search);

    const productId =
        urlParams.get("id") || "1";

    const product =
        productDatabase[productId] ||
        productDatabase["1"];


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const productTitle =
        document.getElementById("productTitle");

    const productCategory =
        document.getElementById("productCategory");

    const productPrice =
        document.getElementById("productPrice");

    const productMRP =
        document.getElementById("productMRP");

    const productDiscount =
        document.getElementById("productDiscount");

    const productRating =
        document.getElementById("productRating");

    const productReviews =
        document.getElementById("productReviews");

    const productBadge =
        document.getElementById("productBadge");

    const mainProductImage =
        document.getElementById("mainProductImage");

    const breadcrumbProduct =
        document.getElementById("breadcrumbProduct");

    const specCategory =
        document.getElementById("specCategory");

    const reviewScore =
        document.getElementById("reviewScore");

    const reviewCount =
        document.getElementById("reviewCount");

    const productToast =
        document.getElementById("productToast");


    /* =====================================================
       UPDATE PRODUCT
    ===================================================== */

    if (productTitle) {
        productTitle.textContent = product.title;
    }

    if (productCategory) {
        productCategory.textContent = product.category;
    }

    if (productPrice) {
        productPrice.textContent =
            "₹" + Number(product.price).toLocaleString("en-IN");
    }

    if (productMRP) {
        productMRP.textContent =
            "₹" + Number(product.mrp).toLocaleString("en-IN");
    }

    if (productDiscount) {
        productDiscount.textContent =
            product.discount;
    }

    if (productRating) {
        productRating.textContent =
            product.rating;
    }

    if (productReviews) {
        productReviews.textContent =
            product.reviews;
    }

    if (productBadge) {
        productBadge.textContent =
            product.badge;
    }

    if (mainProductImage) {
        mainProductImage.src =
            product.image;

        mainProductImage.alt =
            product.title;
    }

    if (breadcrumbProduct) {
        breadcrumbProduct.textContent =
            product.title;
    }

    if (specCategory) {
        specCategory.textContent =
            product.category;
    }

    if (reviewScore) {
        reviewScore.textContent =
            product.rating;
    }

    if (reviewCount) {
        reviewCount.textContent =
            product.reviews;
    }

    document.title =
        product.title + " | MARTEY";


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        if (!productToast) {
            return;
        }

        productToast.textContent =
            message;

        productToast.classList.add("show");

        clearTimeout(window.marteyProductToastTimer);

        window.marteyProductToastTimer =
            setTimeout(function () {

                productToast.classList.remove("show");

            }, 2200);
    }


    /* =====================================================
       PRODUCT THUMBNAILS
    ===================================================== */

    const thumbnails =
        document.querySelectorAll(
            ".product-thumbnail"
        );

    thumbnails.forEach(function (thumbnail) {

        thumbnail.addEventListener(
            "click",
            function () {

                const image =
                    thumbnail.dataset.image;

                if (!image || !mainProductImage) {
                    return;
                }

                mainProductImage.src =
                    image;

                thumbnails.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                thumbnail.classList.add(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       SIZE
    ===================================================== */

    let selectedSize = "M";

    const sizeButtons =
        document.querySelectorAll(
            "[data-size]"
        );

    const selectedSizeElement =
        document.getElementById(
            "selectedSize"
        );

    sizeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                selectedSize =
                    button.dataset.size;

                sizeButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                if (selectedSizeElement) {

                    selectedSizeElement.textContent =
                        selectedSize;

                }

            }
        );

    });


    /* =====================================================
       COLOR
    ===================================================== */

    let selectedColor = "Black";

    const colorButtons =
        document.querySelectorAll(
            "[data-color]"
        );

    const selectedColorElement =
        document.getElementById(
            "selectedColor"
        );

    colorButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                selectedColor =
                    button.dataset.color;

                colorButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                if (selectedColorElement) {

                    selectedColorElement.textContent =
                        selectedColor;

                }

            }
        );

    });


    /* =====================================================
       CART FUNCTIONS
    ===================================================== */

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

        const totalQuantity =
            cart.reduce(
                function (total, item) {

                    return total +
                        Number(
                            item.quantity || 1
                        );

                },
                0
            );

        const cartCount =
            document.getElementById(
                "cartCount"
            );

        if (cartCount) {

            cartCount.textContent =
                totalQuantity;

        }

    }


    function addProductToCart() {

        const cart =
            getCart();

        const existingItem =
            cart.find(
                function (item) {

                    return String(item.id) ===
                        String(productId) &&
                        item.size === selectedSize &&
                        item.color === selectedColor;

                }
            );


        if (existingItem) {

            existingItem.quantity =
                Number(
                    existingItem.quantity || 1
                ) + 1;

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


    const addToCartButton =
        document.getElementById(
            "addToCartButton"
        );

    if (addToCartButton) {

        addToCartButton.addEventListener(
            "click",
            addProductToCart
        );

    }


    /* =====================================================
       BUY NOW
    ===================================================== */

    const buyNowButton =
        document.getElementById(
            "buyNowButton"
        );

    if (buyNowButton) {

        buyNowButton.addEventListener(
            "click",
            function () {

                const buyNowItem = {

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
                    JSON.stringify(
                        buyNowItem
                    )
                );


                showToast(
                    "Buy Now selected"
                );

            }
        );

    }


    /* =====================================================
       DELIVERY CHECK
    ===================================================== */

    const checkDeliveryButton =
        document.getElementById(
            "checkDeliveryButton"
        );

    const deliveryPincode =
        document.getElementById(
            "deliveryPincode"
        );

    if (checkDeliveryButton) {

        checkDeliveryButton.addEventListener(
            "click",
            function () {

                const pin =
                    deliveryPincode
                        ? deliveryPincode.value.trim()
                        : "";

                if (!/^\d{6}$/.test(pin)) {

                    showToast(
                        "Enter a valid 6-digit PIN code"
                    );

                    return;

                }

                showToast(
                    "Delivery available for this PIN"
                );

            }
        );

    }


    /* =====================================================
       HEADER WISHLIST
    ===================================================== */

    const wishlistHeaderButton =
        document.getElementById(
            "wishlistHeaderButton"
        );

    if (wishlistHeaderButton) {

        wishlistHeaderButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Wishlist opened"
                );

            }
        );

    }


    /* =====================================================
       HEADER CART
    ===================================================== */

    const cartHeaderButton =
        document.getElementById(
            "cartHeaderButton"
        );

    if (cartHeaderButton) {

        cartHeaderButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "cart.html";

            }
        );

    }


    /* =====================================================
       HEADER ACCOUNT
    ===================================================== */

    const accountHeaderButton =
        document.getElementById(
            "accountHeaderButton"
        );

    if (accountHeaderButton) {

        accountHeaderButton.addEventListener(
            "click",
            function () {

                const currentUser =
                    localStorage.getItem(
                        "marteyCurrentUser"
                    );

                if (currentUser) {

                    window.location.href =
                        "account.html";

                } else {

                    window.location.href =
                        "index.html";

                }

            }
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const searchButton =
        document.getElementById(
            "searchButton"
        );


    function performSearch() {

        if (!searchInput) {
            return;
        }

        const query =
            searchInput.value.trim();

        if (!query) {
            return;
        }

        window.location.href =
            "index.html?search=" +
            encodeURIComponent(query);

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    performSearch();

                }

            }
        );

    }


    /* =====================================================
       SELLER STORE
    ===================================================== */

    const sellerStoreButton =
        document.getElementById(
            "sellerStoreButton"
        );

    if (sellerStoreButton) {

        sellerStoreButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Seller store will open here"
                );

            }
        );

    }


    /* =====================================================
       INITIAL CART COUNT
    ===================================================== */

    updateCartCount();

});
