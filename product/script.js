"use strict";


const products = [
    {
        id: 1001,
        name: "Fresh Full Cream Milk",
        category: "Milk & Dairy",
        size: "1 L",
        price: 68,
        mrp: 72,
        discount: 6,
        rating: 4.7,
        image: "assets/products/milk.jpg",
        description:
            "Fresh full cream milk for everyday use. A convenient choice for tea, coffee, breakfast and home cooking."
    },

    {
        id: 1002,
        name: "Classic White Bread",
        category: "Bakery",
        size: "400 g",
        price: 45,
        mrp: 50,
        discount: 10,
        rating: 4.6,
        image: "assets/products/bread.jpg",
        description:
            "Soft classic white bread made for everyday breakfasts, sandwiches and quick snacks."
    },

    {
        id: 1003,
        name: "Fresh Orange Drink",
        category: "Drinks",
        size: "750 ml",
        price: 55,
        mrp: 60,
        discount: 8,
        rating: 4.5,
        image: "assets/products/orange-drink.jpg",
        description:
            "A refreshing orange drink that is perfect for a chilled everyday beverage."
    },

    {
        id: 1004,
        name: "Classic Salted Chips",
        category: "Snacks",
        size: "100 g",
        price: 28,
        mrp: 30,
        discount: 7,
        rating: 4.5,
        image: "assets/products/chips.jpg",
        description:
            "Classic salted chips with a crisp texture, perfect for quick snacking."
    },

    {
        id: 1005,
        name: "Fresh Bananas",
        category: "Fruits & Vegetables",
        size: "1 kg",
        price: 49,
        mrp: 55,
        discount: 11,
        rating: 4.7,
        image: "assets/products/bananas.jpg",
        description:
            "Fresh bananas selected for everyday consumption and convenient home use."
    },

    {
        id: 1006,
        name: "Daily Care Shampoo",
        category: "Personal Care",
        size: "180 ml",
        price: 149,
        mrp: 175,
        discount: 15,
        rating: 4.4,
        image: "assets/products/shampoo.jpg",
        description:
            "A daily-use shampoo designed for a simple and convenient hair-care routine."
    },

    {
        id: 1007,
        name: "Liquid Laundry Detergent",
        category: "Household",
        size: "1 L",
        price: 189,
        mrp: 220,
        discount: 14,
        rating: 4.5,
        image: "assets/products/detergent.jpg",
        description:
            "Liquid laundry detergent for everyday washing and household cleaning needs."
    },

    {
        id: 1008,
        name: "Soft Baby Wipes",
        category: "Baby Care",
        size: "80 wipes",
        price: 99,
        mrp: 120,
        discount: 18,
        rating: 4.6,
        image: "assets/products/baby-wipes.jpg",
        description:
            "Soft everyday baby wipes designed for convenient cleaning and care."
    },

    {
        id: 1009,
        name: "Crunchy Butter Biscuits",
        category: "Snacks",
        size: "200 g",
        price: 42,
        mrp: 50,
        discount: 16,
        rating: 4.5,
        image: "assets/products/biscuits.jpg",
        description:
            "Crunchy butter biscuits that make a convenient snack for tea time and everyday breaks."
    },

    {
        id: 1010,
        name: "Premium Pet Food",
        category: "Pet Supplies",
        size: "1 kg",
        price: 299,
        mrp: 340,
        discount: 12,
        rating: 4.6,
        image: "assets/products/pet-food.jpg",
        description:
            "Premium everyday pet food for convenient feeding at home."
    },

    {
        id: 1011,
        name: "Wireless Headphones",
        category: "Electronics & Accessories",
        size: "1 unit",
        price: 899,
        mrp: 1199,
        discount: 25,
        rating: 4.4,
        image: "assets/products/headphones.jpg",
        description:
            "Wireless headphones designed for everyday entertainment, calls and music."
    },

    {
        id: 1012,
        name: "Premium Spiral Notebook",
        category: "Stationery",
        size: "200 pages",
        price: 99,
        mrp: 125,
        discount: 21,
        rating: 4.6,
        image: "assets/products/notebook.jpg",
        description:
            "A premium spiral notebook suitable for school, planning, notes and everyday writing."
    }
];


/* =========================================================
   DOM
========================================================= */

const productImage = document.getElementById("productImage");
const productDiscount = document.getElementById("productDiscount");
const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productRating = document.getElementById("productRating");
const ratingText = document.getElementById("ratingText");
const productPrice = document.getElementById("productPrice");
const productMrp = document.getElementById("productMrp");
const productSave = document.getElementById("productSave");
const productSize = document.getElementById("productSize");

const deliveryText = document.getElementById("deliveryText");

const quantityValue = document.getElementById("quantityValue");
const decreaseQty = document.getElementById("decreaseQty");
const increaseQty = document.getElementById("increaseQty");

const addToCartButton = document.getElementById("addToCart");
const buyNowButton = document.getElementById("buyNow");

const descriptionText = document.getElementById("descriptionText");

const infoCategory = document.getElementById("infoCategory");
const infoSize = document.getElementById("infoSize");
const infoMrp = document.getElementById("infoMrp");
const infoDiscount = document.getElementById("infoDiscount");

const reviewScore = document.getElementById("reviewScore");

const relatedProducts = document.getElementById("relatedProducts");

const cartCount = document.getElementById("cartCount");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");
const searchDropdown = document.getElementById("searchDropdown");

const locationButton = document.getElementById("locationButton");
const changeLocation = document.getElementById("changeLocation");

const toast = document.getElementById("toast");
const currentYear = document.getElementById("currentYear");

const breadcrumbProduct = document.getElementById("breadcrumbProduct");


/* =========================================================
   PRODUCT ID
========================================================= */

function getProductId() {
    const path = window.location.pathname.replace(/\/+$/, "");
    const parts = path.split("/");

    const lastPart = parts[parts.length - 1];

    const pathId = Number(lastPart);

    if (Number.isInteger(pathId) && pathId > 0) {
        return pathId;
    }

    const queryId = Number(
        new URLSearchParams(window.location.search).get("id")
    );

    if (Number.isInteger(queryId) && queryId > 0) {
        return queryId;
    }

    return 1001;
}


const currentProductId = getProductId();

const currentProduct =
    products.find(product => product.id === currentProductId) ||
    products[0];


/* =========================================================
   HELPERS
========================================================= */

function formatPrice(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}


function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function applyImageFallback(imageElement) {
    if (!imageElement) return;

    imageElement.addEventListener("error", () => {
        imageElement.src =
            "https://placehold.co/700x700/F7F8FA/667085?text=MARTEY";
    });
}


/* =========================================================
   RENDER PRODUCT
========================================================= */

function renderProduct() {

    document.title = `${currentProduct.name} | MARTEY`;

    breadcrumbProduct.textContent = currentProduct.name;

    productImage.src = currentProduct.image;
    productImage.alt = currentProduct.name;

    productDiscount.textContent =
        `${currentProduct.discount}% OFF`;

    productCategory.textContent =
        currentProduct.category;

    productName.textContent =
        currentProduct.name;

    productRating.textContent =
        currentProduct.rating.toFixed(1);

    ratingText.textContent =
        currentProduct.rating >= 4.6
            ? "Highly rated"
            : "Good rating";

    productPrice.textContent =
        formatPrice(currentProduct.price);

    productMrp.textContent =
        formatPrice(currentProduct.mrp);

    const savings =
        currentProduct.mrp - currentProduct.price;

    productSave.textContent =
        `Save ${formatPrice(savings)}`;

    productSize.textContent =
        currentProduct.size;

    deliveryText.textContent =
        "Select your location to check nearby delivery availability.";

    descriptionText.textContent =
        currentProduct.description;

    infoCategory.textContent =
        currentProduct.category;

    infoSize.textContent =
        currentProduct.size;

    infoMrp.textContent =
        formatPrice(currentProduct.mrp);

    infoDiscount.textContent =
        `${currentProduct.discount}% OFF`;

    reviewScore.textContent =
        currentProduct.rating.toFixed(1);

    applyImageFallback(productImage);
}


/* =========================================================
   QUANTITY
========================================================= */

let quantity = 1;


function updateQuantity() {
    quantityValue.textContent = quantity;
}


decreaseQty.addEventListener("click", () => {

    if (quantity <= 1) return;

    quantity -= 1;

    updateQuantity();
});


increaseQty.addEventListener("click", () => {

    if (quantity >= 20) {
        showToast("Maximum quantity is 20.");
        return;
    }

    quantity += 1;

    updateQuantity();
});


/* =========================================================
   CART
========================================================= */

const CART_KEY = "marteyCart";


function getCart() {

    try {
        const saved =
            localStorage.getItem(CART_KEY);

        if (!saved) return [];

        const parsed =
            JSON.parse(saved);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch {
        return [];
    }
}


function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();
}


function getItemId(item) {

    return Number(
        item.id ??
        item.productId ??
        item.productID
    );
}


function getItemQuantity(item) {

    const quantityValue =
        Number(
            item.quantity ??
            item.qty ??
            1
        );

    return Number.isFinite(quantityValue) &&
        quantityValue > 0
        ? quantityValue
        : 1;
}


function updateCartCount() {

    const cart = getCart();

    const total = cart.reduce(
        (sum, item) =>
            sum + getItemQuantity(item),
        0
    );

    if (total > 99) {
        cartCount.textContent = "99+";
    } else {
        cartCount.textContent = String(total);
    }
}


function addProductToCart(redirectToCart = false) {

    const cart = getCart();

    const existingIndex =
        cart.findIndex(
            item =>
                getItemId(item) === currentProduct.id
        );


    if (existingIndex !== -1) {

        const existing =
            cart[existingIndex];

        existing.quantity =
            Math.min(
                getItemQuantity(existing) + quantity,
                20
            );

    } else {

        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            category: currentProduct.category,
            size: currentProduct.size,
            price: currentProduct.price,
            mrp: currentProduct.mrp,
            discount: currentProduct.discount,
            image: currentProduct.image,
            quantity: quantity
        });
    }


    saveCart(cart);

    if (redirectToCart) {

        window.location.href = "/cart";

        return;
    }


    showToast(
        `${currentProduct.name} added to cart`
    );
}


addToCartButton.addEventListener(
    "click",
    () => addProductToCart(false)
);


buyNowButton.addEventListener(
    "click",
    () => addProductToCart(true)
);


/* =========================================================
   RELATED PRODUCTS
========================================================= */

function renderRelatedProducts() {

    if (!relatedProducts) return;

    const related =
        products
            .filter(
                product =>
                    product.id !== currentProduct.id &&
                    product.category === currentProduct.category
            )
            .slice(0, 4);


    const fallbackRelated =
        products
            .filter(
                product =>
                    product.id !== currentProduct.id
            )
            .slice(0, 4);


    const finalProducts =
        related.length >= 4
            ? related
            : fallbackRelated;


    relatedProducts.innerHTML =
        finalProducts
            .map(product => {

                return `
                    <article class="product-card">

                        <a
                            href="/product/${product.id}"
                            aria-label="View ${escapeHtml(product.name)}"
                        >
                            <div class="product-card-image">

                                <span class="product-card-discount">
                                    ${product.discount}% OFF
                                </span>

                                <img
                                    src="${product.image}"
                                    alt="${escapeHtml(product.name)}"
                                >

                            </div>
                        </a>

                        <div class="product-card-body">

                            <p class="product-card-category">
                                ${escapeHtml(product.category)}
                            </p>

                            <a
                                href="/product/${product.id}"
                                class="product-card-name"
                            >
                                ${escapeHtml(product.name)}
                            </a>

                            <p class="product-card-size">
                                ${escapeHtml(product.size)}
                            </p>

                            <div class="product-card-bottom">

                                <div class="product-card-price">

                                    <strong>
                                        ${formatPrice(product.price)}
                                    </strong>

                                    <span>
                                        ${formatPrice(product.mrp)}
                                    </span>

                                </div>

                                <button
                                    type="button"
                                    class="product-add"
                                    data-add-id="${product.id}"
                                >
                                    ADD
                                </button>

                            </div>

                        </div>

                    </article>
                `;

            })
            .join("");


    relatedProducts
        .querySelectorAll("img")
        .forEach(applyImageFallback);
}


relatedProducts.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-add-id]"
            );

        if (!button) return;

        event.preventDefault();
        event.stopPropagation();

        const productId =
            Number(button.dataset.addId);

        const selected =
            products.find(
                product =>
                    product.id === productId
            );

        if (!selected) return;


        const cart = getCart();

        const existingIndex =
            cart.findIndex(
                item =>
                    getItemId(item) === selected.id
            );


        if (existingIndex !== -1) {

            cart[existingIndex].quantity =
                Math.min(
                    getItemQuantity(
                        cart[existingIndex]
                    ) + 1,
                    20
                );

        } else {

            cart.push({
                id: selected.id,
                name: selected.name,
                category: selected.category,
                size: selected.size,
                price: selected.price,
                mrp: selected.mrp,
                discount: selected.discount,
                image: selected.image,
                quantity: 1
            });
        }


        saveCart(cart);

        showToast(
            `${selected.name} added to cart`
        );
    }
);


/* =========================================================
   INFORMATION TABS
========================================================= */

const infoTabs =
    document.querySelectorAll(".info-tab");

const tabContents =
    document.querySelectorAll(".tab-content");


infoTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target =
            tab.dataset.tab;


        infoTabs.forEach(item =>
            item.classList.remove("active")
        );

        tabContents.forEach(content =>
            content.classList.remove("active")
        );


        tab.classList.add("active");

        const targetContent =
            document.getElementById(target);

        if (targetContent) {
            targetContent.classList.add("active");
        }

    });

});


/* =========================================================
   SEARCH
========================================================= */

const searchExamples = [
    "milk",
    "bread",
    "chips",
    "shampoo",
    "biscuits"
];

let searchExampleIndex = 0;

function rotateSearchPlaceholder() {

    if (
        document.activeElement === searchInput ||
        searchInput.value.trim()
    ) {
        return;
    }

    searchInput.placeholder =
        `Search for ${searchExamples[searchExampleIndex]}...`;

    searchExampleIndex =
        (searchExampleIndex + 1) %
        searchExamples.length;
}


setInterval(
    rotateSearchPlaceholder,
    2200
);


function renderSearchResults(query) {

    const value =
        query.trim().toLowerCase();


    if (!value) {

        searchDropdown.classList.remove("show");
        searchDropdown.innerHTML = "";

        return;
    }


    const matches =
        products
            .filter(product =>
                `${product.name} ${product.category}`
                    .toLowerCase()
                    .includes(value)
            )
            .slice(0, 6);


    if (!matches.length) {

        searchDropdown.innerHTML = `
            <div class="search-result">
                <div>
                    <strong>No products found</strong>
                    <small>Try another search.</small>
                </div>
            </div>
        `;

        searchDropdown.classList.add("show");

        return;
    }


    searchDropdown.innerHTML =
        matches
            .map(product => {

                return `
                    <a
                        class="search-result"
                        href="/product/${product.id}"
                    >

                        <img
                            src="${product.image}"
                            alt=""
                        >

                        <div>
                            <strong>
                                ${escapeHtml(product.name)}
                            </strong>

                            <small>
                                ${escapeHtml(product.category)}
                                · ${formatPrice(product.price)}
                            </small>
                        </div>

                    </a>
                `;

            })
            .join("");


    searchDropdown
        .querySelectorAll("img")
        .forEach(applyImageFallback);


    searchDropdown.classList.add("show");
}


searchInput.addEventListener(
    "input",
    () => {

        const value =
            searchInput.value.trim();

        searchClear.hidden =
            !value;

        renderSearchResults(value);
    }
);


searchInput.addEventListener(
    "focus",
    () => {

        if (searchInput.value.trim()) {
            renderSearchResults(
                searchInput.value
            );
        }
    }
);


searchClear.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        searchClear.hidden = true;

        searchDropdown.classList.remove("show");

        searchInput.focus();
    }
);


searchForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const query =
            searchInput.value.trim();

        if (!query) return;

        window.location.href =
            `/search?q=${encodeURIComponent(query)}`;
    }
);


document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(".search-form")
        ) {
            searchDropdown.classList.remove(
                "show"
            );
        }
    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            searchDropdown.classList.remove(
                "show"
            );
        }
    }
);


/* =========================================================
   LOCATION
========================================================= */

function showLocationMessage() {

    showToast(
        "Location selection will be connected later."
    );
}


locationButton.addEventListener(
    "click",
    showLocationMessage
);


changeLocation.addEventListener(
    "click",
    showLocationMessage
);


/* =========================================================
   STORAGE SYNC
========================================================= */

window.addEventListener(
    "storage",
    event => {

        if (event.key === CART_KEY) {
            updateCartCount();
        }
    }
);


/* =========================================================
   YEAR
========================================================= */

currentYear.textContent =
    new Date().getFullYear();


/* =========================================================
   INITIALIZE
========================================================= */

renderProduct();

renderRelatedProducts();

updateQuantity();

updateCartCount();
