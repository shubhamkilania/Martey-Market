"use strict";

const products = [

    {
        id: 1001,
        name: "Fresh Full Cream Milk",
        category: "Milk & Dairy",
        size: "1 L",
        price: 68,
        mrp: 72,
        discount: "6% OFF",
        image: "assets/products/milk.jpg",
        deal: true
    },

    {
        id: 1002,
        name: "Classic White Bread",
        category: "Bakery",
        size: "400 g",
        price: 45,
        mrp: 50,
        discount: "10% OFF",
        image: "assets/products/bread.jpg",
        deal: true
    },

    {
        id: 1003,
        name: "Fresh Orange Drink",
        category: "Drinks",
        size: "750 ml",
        price: 55,
        mrp: 60,
        discount: "8% OFF",
        image: "assets/products/orange-drink.jpg",
        deal: true
    },

    {
        id: 1004,
        name: "Classic Salted Chips",
        category: "Snacks",
        size: "100 g",
        price: 28,
        mrp: 30,
        discount: "7% OFF",
        image: "assets/products/chips.jpg",
        deal: true
    },

    {
        id: 1005,
        name: "Fresh Bananas",
        category: "Fruits & Vegetables",
        size: "1 kg",
        price: 49,
        mrp: 55,
        discount: "11% OFF",
        image: "assets/products/bananas.jpg",
        deal: true
    },

    {
        id: 1006,
        name: "Daily Care Shampoo",
        category: "Personal Care",
        size: "180 ml",
        price: 149,
        mrp: 175,
        discount: "15% OFF",
        image: "assets/products/shampoo.jpg",
        deal: true
    },

    {
        id: 1007,
        name: "Liquid Laundry Detergent",
        category: "Household",
        size: "1 L",
        price: 189,
        mrp: 220,
        discount: "14% OFF",
        image: "assets/products/detergent.jpg",
        deal: false
    },

    {
        id: 1008,
        name: "Soft Baby Wipes",
        category: "Baby Care",
        size: "80 wipes",
        price: 99,
        mrp: 120,
        discount: "18% OFF",
        image: "assets/products/baby-wipes.jpg",
        deal: false
    },

    {
        id: 1009,
        name: "Crunchy Butter Biscuits",
        category: "Snacks",
        size: "200 g",
        price: 42,
        mrp: 50,
        discount: "16% OFF",
        image: "assets/products/biscuits.jpg",
        deal: false
    },

    {
        id: 1010,
        name: "Premium Pet Food",
        category: "Pet Supplies",
        size: "1 kg",
        price: 299,
        mrp: 340,
        discount: "12% OFF",
        image: "assets/products/pet-food.jpg",
        deal: false
    },

    {
        id: 1011,
        name: "Wireless Headphones",
        category: "Electronics & Accessories",
        size: "1 unit",
        price: 899,
        mrp: 1199,
        discount: "25% OFF",
        image: "assets/products/headphones.jpg",
        deal: false
    },

    {
        id: 1012,
        name: "Premium Spiral Notebook",
        category: "Stationery",
        size: "200 pages",
        price: 99,
        mrp: 125,
        discount: "21% OFF",
        image: "assets/products/notebook.jpg",
        deal: false
    }

];


/* =========================================================
   DOM
========================================================= */

const dealProducts = document.getElementById("dealProducts");
const essentialProducts = document.getElementById("essentialProducts");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");
const searchDropdown = document.getElementById("searchDropdown");

const cartCountElement = document.getElementById("cartCount");
const toastElement = document.getElementById("toast");

const currentYear = document.getElementById("currentYear");


/* =========================================================
   CONSTANTS
========================================================= */

const CART_KEY = "marteyCart";

let toastTimer = null;


/* =========================================================
   SAFE IMAGE FALLBACK
========================================================= */

function handleImageError(image) {

    if (!image) {
        return;
    }

    image.onerror = null;

    image.src =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
                <rect width="100%" height="100%" fill="#F7F8FA"/>
                <text
                    x="50%"
                    y="50%"
                    dominant-baseline="middle"
                    text-anchor="middle"
                    font-family="Arial"
                    font-size="22"
                    fill="#98A2B3"
                >
                    MARTEY
                </text>
            </svg>
        `);
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   CART
========================================================= */

function getCart() {

    try {

        const raw =
            localStorage.getItem(CART_KEY);

        if (!raw) {
            return [];
        }

        const parsed =
            JSON.parse(raw);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed;

    } catch (error) {

        console.error(
            "MARTEY cart read error:",
            error
        );

        return [];
    }
}


function saveCart(cart) {

    try {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "MARTEY cart save error:",
            error
        );
    }
}


function normalizeCartItem(item) {

    if (!item || typeof item !== "object") {
        return null;
    }

    const id =
        Number(
            item.id ??
            item.productId ??
            item.productID
        );

    if (!Number.isFinite(id)) {
        return null;
    }

    const quantity =
        Number(
            item.quantity ??
            item.qty ??
            1
        );

    return {
        id,
        quantity:
            Number.isFinite(quantity) && quantity > 0
                ? quantity
                : 1
    };
}


function getNormalizedCart() {

    const rawCart = getCart();

    const normalized = [];

    rawCart.forEach(item => {

        const normalizedItem =
            normalizeCartItem(item);

        if (!normalizedItem) {
            return;
        }

        const existing =
            normalized.find(
                cartItem =>
                    cartItem.id === normalizedItem.id
            );

        if (existing) {

            existing.quantity +=
                normalizedItem.quantity;

        } else {

            normalized.push(normalizedItem);
        }

    });

    return normalized;
}


function getCartItemCount() {

    const cart =
        getNormalizedCart();

    return cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );
}


function updateCartCount() {

    if (!cartCountElement) {
        return;
    }

    const count =
        getCartItemCount();

    if (count > 0) {

        cartCountElement.textContent =
            count > 99 ? "99+" : count;

        cartCountElement.classList.add(
            "visible"
        );

    } else {

        cartCountElement.textContent = "0";

        cartCountElement.classList.remove(
            "visible"
        );
    }
}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {

    const id = Number(productId);

    if (!Number.isFinite(id)) {
        return;
    }

    const cart =
        getNormalizedCart();

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            id,
            quantity: 1
        });
    }

    saveCart(cart);

    updateCartCount();

    const product =
        products.find(item => item.id === id);

    if (product) {

        showToast(
            `${product.name} added to cart`
        );
    }

    refreshAddButtons(id);
}


/* =========================================================
   ADD BUTTON STATE
========================================================= */

function refreshAddButtons(productId = null) {

    const cart =
        getNormalizedCart();

    document
        .querySelectorAll(".add-button")
        .forEach(button => {

            const id =
                Number(button.dataset.productId);

            const item =
                cart.find(cartItem =>
                    cartItem.id === id
                );

            if (
                productId !== null &&
                id !== Number(productId)
            ) {
                return;
            }

            if (item) {

                button.textContent =
                    item.quantity > 1
                        ? `+${item.quantity}`
                        : "Added";

                button.classList.add("added");

            } else {

                button.textContent = "Add";

                button.classList.remove("added");
            }

        });
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    return `
        <article class="product-card">

            <a
                href="/product/${product.id}"
                class="product-image-link"
                aria-label="View ${escapeHTML(product.name)}"
            >

                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    class="product-image"
                    loading="lazy"
                    onerror="handleImageError(this)"
                >

                ${
                    product.discount
                        ? `
                            <span class="discount-badge">
                                ${escapeHTML(product.discount)}
                            </span>
                          `
                        : ""
                }

            </a>


            <div class="product-info">

                <div class="product-category">
                    ${escapeHTML(product.category)}
                </div>

                <a
                    href="/product/${product.id}"
                    class="product-name"
                >
                    ${escapeHTML(product.name)}
                </a>

                <div class="product-size">
                    ${escapeHTML(product.size)}
                </div>


                <div class="product-bottom">

                    <div class="product-pricing">

                        <span class="product-price">
                            ₹${product.price}
                        </span>

                        <span class="product-mrp">
                            ₹${product.mrp}
                        </span>

                    </div>


                    <button
                        type="button"
                        class="add-button"
                        data-product-id="${product.id}"
                        aria-label="Add ${escapeHTML(product.name)} to cart"
                    >
                        Add
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(container, productList) {

    if (!container) {
        return;
    }

    if (!productList.length) {

        container.innerHTML = `
            <div class="product-empty">
                No products available right now.
            </div>
        `;

        return;
    }

    container.innerHTML =
        productList
            .map(createProductCard)
            .join("");

    refreshAddButtons();
}


/* =========================================================
   PRODUCT LISTS
========================================================= */

function renderHomepageProducts() {

    const deals =
        products
            .filter(product => product.deal)
            .slice(0, 6);

    const essentials =
        products
            .filter(product => !product.deal)
            .slice(0, 6);

    renderProducts(
        dealProducts,
        deals
    );

    renderProducts(
        essentialProducts,
        essentials
    );
}


/* =========================================================
   SEARCH SUGGESTIONS
========================================================= */

const rotatingSearches = [
    "milk",
    "bread",
    "chips",
    "drinks",
    "fruits",
    "shampoo",
    "biscuits",
    "headphones"
];

let searchRotationIndex = 0;

let searchRotationTimer = null;


function startSearchPlaceholderRotation() {

    if (!searchInput) {
        return;
    }

    searchRotationTimer =
        window.setInterval(() => {

            if (
                document.activeElement ===
                searchInput
            ) {
                return;
            }

            if (searchInput.value.trim()) {
                return;
            }

            searchRotationIndex =
                (searchRotationIndex + 1) %
                rotatingSearches.length;

            searchInput.placeholder =
                `Search for ${rotatingSearches[searchRotationIndex]}...`;

        }, 2200);
}


/* =========================================================
   SEARCH DROPDOWN
========================================================= */

function getSearchMatches(query) {

    const normalizedQuery =
        query
            .trim()
            .toLowerCase();

    if (!normalizedQuery) {
        return [];
    }

    return products
        .filter(product => {

            const searchableText =
                [
                    product.name,
                    product.category,
                    product.size
                ]
                    .join(" ")
                    .toLowerCase();

            return searchableText.includes(
                normalizedQuery
            );
        })
        .slice(0, 6);
}


function renderSearchDropdown(query) {

    if (!searchDropdown) {
        return;
    }

    const trimmed =
        query.trim();

    if (!trimmed) {

        searchDropdown.innerHTML = "";

        searchDropdown.classList.remove(
            "show"
        );

        searchDropdown.setAttribute(
            "aria-hidden",
            "true"
        );

        return;
    }

    const matches =
        getSearchMatches(query);

    if (!matches.length) {

        searchDropdown.innerHTML = `
            <div class="search-suggestion">
                <div class="search-suggestion-content">
                    <div class="search-suggestion-name">
                        No products found
                    </div>
                    <div class="search-suggestion-meta">
                        Try another product name
                    </div>
                </div>
            </div>
        `;

    } else {

        searchDropdown.innerHTML =
            matches
                .map(product => {

                    return `
                        <a
                            href="/product/${product.id}"
                            class="search-suggestion"
                        >

                            <img
                                src="${escapeHTML(product.image)}"
                                alt="${escapeHTML(product.name)}"
                                class="search-suggestion-image"
                                loading="lazy"
                                onerror="handleImageError(this)"
                            >

                            <div class="search-suggestion-content">

                                <div class="search-suggestion-name">
                                    ${escapeHTML(product.name)}
                                </div>

                                <div class="search-suggestion-meta">
                                    ${escapeHTML(product.category)}
                                    ·
                                    ${escapeHTML(product.size)}
                                </div>

                            </div>

                            <span class="search-suggestion-price">
                                ₹${product.price}
                            </span>

                        </a>
                    `;
                })
                .join("");
    }

    searchDropdown.classList.add("show");

    searchDropdown.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeSearchDropdown() {

    if (!searchDropdown) {
        return;
    }

    searchDropdown.classList.remove(
        "show"
    );

    searchDropdown.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   SEARCH FORM
========================================================= */

function setupSearch() {

    if (!searchForm || !searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        () => {

            const value =
                searchInput.value;

            if (searchClear) {

                searchClear.style.display =
                    value.length
                        ? "grid"
                        : "none";
            }

            renderSearchDropdown(value);
        }
    );


    searchInput.addEventListener(
        "focus",
        () => {

            if (searchInput.value.trim()) {

                renderSearchDropdown(
                    searchInput.value
                );
            }
        }
    );


    searchForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const query =
                searchInput.value.trim();

            if (!query) {

                searchInput.focus();

                return;
            }

            window.location.href =
                `/search?q=${encodeURIComponent(query)}`;
        }
    );


    if (searchClear) {

        searchClear.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                searchClear.style.display =
                    "none";

                closeSearchDropdown();

                searchInput.focus();
            }
        );
    }
}


/* =========================================================
   CLOSE SEARCH OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (!searchForm) {
            return;
        }

        if (
            !searchForm.contains(
                event.target
            )
        ) {
            closeSearchDropdown();
        }
    }
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        closeSearchDropdown();

        if (
            document.activeElement ===
            searchInput
        ) {
            searchInput.blur();
        }
    }
);


/* =========================================================
   BUTTON EVENT DELEGATION
========================================================= */

document.addEventListener(
    "click",
    event => {

        const addButton =
            event.target.closest(
                ".add-button"
            );

        if (!addButton) {
            return;
        }

        event.preventDefault();

        const productId =
            addButton.dataset.productId;

        addToCart(productId);
    }
);


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    if (!toastElement) {
        return;
    }

    toastElement.textContent =
        message;

    toastElement.classList.add(
        "show"
    );

    if (toastTimer) {
        window.clearTimeout(
            toastTimer
        );
    }

    toastTimer =
        window.setTimeout(
            () => {

                toastElement.classList.remove(
                    "show"
                );

            },
            2200
        );
}


/* =========================================================
   YEAR
========================================================= */

function setCurrentYear() {

    if (!currentYear) {
        return;
    }

    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   STORAGE SYNC
   Keeps cart count updated if another MARTEY tab changes it.
========================================================= */

window.addEventListener(
    "storage",
    event => {

        if (event.key === CART_KEY) {

            updateCartCount();
            refreshAddButtons();
        }
    }
);


/* =========================================================
   INITIALIZE
========================================================= */

function initMarteyHomepage() {

    renderHomepageProducts();

    updateCartCount();

    setupSearch();

    startSearchPlaceholderRotation();

    setCurrentYear();

    /*
       Make image fallback function available
       to inline image error handlers.
    */
    window.handleImageError =
        handleImageError;
}


/* =========================================================
   START
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initMarteyHomepage
    );

} else {

    initMarteyHomepage();
}
