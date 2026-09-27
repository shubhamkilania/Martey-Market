const products = [
    {
        id: 1003,
        name: "Orange Refresh Drink",
        category: "Soft Drink",
        size: "750 ml",
        price: 45,
        mrp: 50,
        rating: 4.5,
        discount: 10,
        image: "../assets/products/orange-drink.jpg"
    },

    {
        id: 1013,
        name: "Fresh Mango Drink",
        category: "Juice",
        size: "1 L",
        price: 85,
        mrp: 100,
        rating: 4.4,
        discount: 15,
        image: "../assets/products/mango-drink.jpg"
    },

    {
        id: 1014,
        name: "Lemon Refresh Drink",
        category: "Soft Drink",
        size: "750 ml",
        price: 40,
        mrp: 45,
        rating: 4.3,
        discount: 11,
        image: "../assets/products/lemon-drink.jpg"
    },

    {
        id: 1015,
        name: "Apple Fruit Juice",
        category: "Juice",
        size: "1 L",
        price: 95,
        mrp: 110,
        rating: 4.6,
        discount: 14,
        image: "../assets/products/apple-juice.jpg"
    },

    {
        id: 1016,
        name: "Energy Drink",
        category: "Energy Drink",
        size: "250 ml",
        price: 55,
        mrp: 60,
        rating: 4.2,
        discount: 8,
        image: "../assets/products/energy-drink.jpg"
    },

    {
        id: 1017,
        name: "Natural Mineral Water",
        category: "Water",
        size: "1 L",
        price: 20,
        mrp: 20,
        rating: 4.5,
        discount: 0,
        image: "../assets/products/water.jpg"
    },

    {
        id: 1018,
        name: "Tropical Fruit Drink",
        category: "Juice",
        size: "750 ml",
        price: 70,
        mrp: 80,
        rating: 4.4,
        discount: 13,
        image: "../assets/products/tropical-drink.jpg"
    },

    {
        id: 1019,
        name: "Classic Cola Drink",
        category: "Soft Drink",
        size: "750 ml",
        price: 50,
        mrp: 55,
        rating: 4.3,
        discount: 9,
        image: "../assets/products/cola.jpg"
    }
];


/* =========================================================
   DOM
========================================================= */

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");

const productCount = document.getElementById("productCount");
const resultsText = document.getElementById("resultsText");

const sortSelect = document.getElementById("sortSelect");

const headerSearch = document.getElementById("headerSearch");

const clearFilters = document.getElementById("clearFilters");
const emptyClearButton = document.getElementById("emptyClearButton");

const mobileFilterButton =
    document.getElementById("mobileFilterButton");

const mobileFilterClose =
    document.getElementById("mobileFilterClose");

const filterSidebar =
    document.querySelector(".filter-sidebar");

const filterOverlay =
    document.getElementById("filterOverlay");

const locationButton =
    document.getElementById("locationButton");

const cartCount =
    document.getElementById("cartCount");

const toast =
    document.getElementById("toast");


/* =========================================================
   STATE
========================================================= */

let currentSearch = "";
let currentSort = "relevance";


/* =========================================================
   HELPERS
========================================================= */

function formatPrice(value) {
    return `₹${value}`;
}


function getDiscount(product) {
    if (product.mrp <= product.price) {
        return 0;
    }

    return Math.round(
        ((product.mrp - product.price) / product.mrp) * 100
    );
}


function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   IMAGE FALLBACK
   Allows the page to work before all studio images
   are uploaded.
========================================================= */

function imageFallback(imageElement) {
    if (imageElement.dataset.fallbackApplied === "true") {
        return;
    }

    imageElement.dataset.fallbackApplied = "true";

    imageElement.src =
        "../assets/products/orange-drink.jpg";
}


/* =========================================================
   CART
========================================================= */

function getCart() {
    const possibleKeys = [
        "marteyCart",
        "cart",
        "MARTEY_CART"
    ];

    for (const key of possibleKeys) {

        try {

            const stored = localStorage.getItem(key);

            if (!stored) {
                continue;
            }

            const parsed = JSON.parse(stored);

            if (Array.isArray(parsed)) {
                return parsed;
            }

            if (
                parsed &&
                Array.isArray(parsed.items)
            ) {
                return parsed.items;
            }

        } catch (error) {
            console.warn(
                `Could not read cart from ${key}`,
                error
            );
        }
    }

    return [];
}


function normalizeCartItem(item) {

    if (!item) {
        return null;
    }

    const id =
        item.id ??
        item.productId ??
        item.productID;

    const quantity =
        item.quantity ??
        item.qty ??
        1;

    if (id === undefined || id === null) {
        return null;
    }

    return {
        id: Number(id),
        quantity: Math.max(1, Number(quantity) || 1)
    };
}


function saveCart(cart) {
    localStorage.setItem(
        "marteyCart",
        JSON.stringify(cart)
    );
}


function updateCartCount() {

    const rawCart = getCart();

    const cart = rawCart
        .map(normalizeCartItem)
        .filter(Boolean);

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;
}


function addToCart(productId) {

    const rawCart = getCart();

    let cart = rawCart
        .map(normalizeCartItem)
        .filter(Boolean);

    const existingItem = cart.find(
        item => item.id === Number(productId)
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Number(productId),
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();

    showToast("Added to cart");
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const discount =
        product.discount || getDiscount(product);

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
        <a
            href="/product/${product.id}"
            class="product-image-link"
            aria-label="View ${escapeHTML(product.name)}"
        >
            <div class="product-image">

                ${
                    discount > 0
                        ? `<span class="discount-badge">
                            ${discount}% OFF
                           </span>`
                        : ""
                }

                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                    onerror="imageFallback(this)"
                >

            </div>
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


            <div class="product-meta">

                <span class="product-size">
                    ${escapeHTML(product.size)}
                </span>

                <span class="rating">
                    <span>★</span>
                    ${product.rating}
                </span>

            </div>


            <div class="price-row">

                <strong class="product-price">
                    ${formatPrice(product.price)}
                </strong>

                ${
                    product.mrp > product.price
                        ? `
                            <span class="product-mrp">
                                ${formatPrice(product.mrp)}
                            </span>
                        `
                        : ""
                }

                ${
                    discount > 0
                        ? `
                            <span class="product-discount">
                                Save ${discount}%
                            </span>
                        `
                        : ""
                }

            </div>


            <button
                type="button"
                class="add-button"
                data-product-id="${product.id}"
            >
                Add to Cart
            </button>

        </div>
    `;

    return card;
}


/* =========================================================
   FILTERS
========================================================= */

function getSelectedDrinkTypes() {

    return Array.from(
        document.querySelectorAll(
            'input[name="drinkType"]:checked'
        )
    ).map(input => input.value);
}


function getSelectedPriceFilter() {

    const selected =
        document.querySelector(
            'input[name="priceFilter"]:checked'
        );

    return selected
        ? selected.value
        : "all";
}


function matchesPriceFilter(product, filter) {

    if (filter === "under50") {
        return product.price < 50;
    }

    if (filter === "50to100") {
        return product.price >= 50 &&
               product.price <= 100;
    }

    if (filter === "above100") {
        return product.price > 100;
    }

    return true;
}


function filterProducts() {

    const selectedTypes =
        getSelectedDrinkTypes();

    const selectedPrice =
        getSelectedPriceFilter();

    return products.filter(product => {

        const searchMatch =
            product.name
                .toLowerCase()
                .includes(currentSearch.toLowerCase()) ||
            product.category
                .toLowerCase()
                .includes(currentSearch.toLowerCase()) ||
            product.size
                .toLowerCase()
                .includes(currentSearch.toLowerCase());

        const typeMatch =
            selectedTypes.length === 0 ||
            selectedTypes.includes(product.category);

        const priceMatch =
            matchesPriceFilter(
                product,
                selectedPrice
            );

        return searchMatch &&
               typeMatch &&
               priceMatch;
    });
}


/* =========================================================
   SORT
========================================================= */

function sortProducts(productList) {

    const sorted = [...productList];

    if (currentSort === "price-low") {

        sorted.sort(
            (a, b) => a.price - b.price
        );

    } else if (currentSort === "price-high") {

        sorted.sort(
            (a, b) => b.price - a.price
        );

    } else if (currentSort === "discount") {

        sorted.sort(
            (a, b) =>
                (b.discount || getDiscount(b)) -
                (a.discount || getDiscount(a))
        );

    }

    return sorted;
}


/* =========================================================
   RENDER
========================================================= */

function renderProducts() {

    const filtered =
        filterProducts();

    const sorted =
        sortProducts(filtered);

    productGrid.innerHTML = "";

    productCount.textContent =
        `${sorted.length} ${
            sorted.length === 1
                ? "product"
                : "products"
        }`;

    resultsText.textContent =
        `Showing ${sorted.length} ${
            sorted.length === 1
                ? "product"
                : "products"
        }`;


    if (sorted.length === 0) {

        emptyState.hidden = false;

        return;
    }


    emptyState.hidden = true;


    const fragment =
        document.createDocumentFragment();

    sorted.forEach(product => {

        fragment.appendChild(
            createProductCard(product)
        );

    });

    productGrid.appendChild(fragment);
}


/* =========================================================
   SEARCH
========================================================= */

function handleHeaderSearch() {

    const query =
        headerSearch.value.trim();

    if (!query) {
        return;
    }

    window.location.href =
        `/search?q=${encodeURIComponent(query)}`;
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearAllFilters() {

    currentSearch = "";

    document
        .querySelectorAll(
            'input[name="drinkType"]'
        )
        .forEach(input => {
            input.checked = false;
        });


    const allPrice =
        document.querySelector(
            'input[name="priceFilter"][value="all"]'
        );

    if (allPrice) {
        allPrice.checked = true;
    }


    currentSort = "relevance";

    sortSelect.value = "relevance";

    renderProducts();

    closeMobileFilters();
}


/* =========================================================
   MOBILE FILTER
========================================================= */

function openMobileFilters() {

    filterSidebar.classList.add(
        "mobile-open"
    );

    filterOverlay.classList.add(
        "show"
    );

    mobileFilterClose.classList.add(
        "show"
    );

    document.body.style.overflow = "hidden";
}


function closeMobileFilters() {

    filterSidebar.classList.remove(
        "mobile-open"
    );

    filterOverlay.classList.remove(
        "show"
    );

    mobileFilterClose.classList.remove(
        "show"
    );

    document.body.style.overflow = "";
}


/* =========================================================
   EVENTS
========================================================= */

sortSelect.addEventListener(
    "change",
    event => {

        currentSort =
            event.target.value;

        renderProducts();
    }
);


document
    .querySelectorAll(
        'input[name="drinkType"], input[name="priceFilter"]'
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            renderProducts
        );

    });


clearFilters.addEventListener(
    "click",
    clearAllFilters
);


emptyClearButton.addEventListener(
    "click",
    clearAllFilters
);


mobileFilterButton.addEventListener(
    "click",
    openMobileFilters
);


mobileFilterClose.addEventListener(
    "click",
    closeMobileFilters
);


filterOverlay.addEventListener(
    "click",
    closeMobileFilters
);


/* Add to Cart event delegation */

productGrid.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".add-button"
            );

        if (!button) {
            return;
        }

        const productId =
            Number(
                button.dataset.productId
            );

        addToCart(productId);

        button.textContent =
            "Added ✓";

        button.classList.add("added");

        setTimeout(() => {

            button.textContent =
                "Add to Cart";

            button.classList.remove(
                "added"
            );

        }, 1200);
    }
);


/* Header search */

headerSearch.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            handleHeaderSearch();
        }

    }
);


/* Location */

locationButton.addEventListener(
    "click",
    () => {

        showToast(
            "Location selection will be connected later."
        );

    }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

updateCartCount();
renderProducts();
