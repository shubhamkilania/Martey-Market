"use strict";


const products = [
    {
        id: 1001,
        name: "Fresh Full Cream Milk",
        category: "Milk",
        size: "1 L",
        price: 64,
        mrp: 68,
        rating: 4.6,
        discount: 6,
        image: "../assets/products/milk.jpg"
    },

    {
        id: 1020,
        name: "Toned Milk",
        category: "Milk",
        size: "1 L",
        price: 58,
        mrp: 62,
        rating: 4.5,
        discount: 6,
        image: "../assets/products/milk.jpg"
    },

    {
        id: 1021,
        name: "Double Toned Milk",
        category: "Milk",
        size: "1 L",
        price: 52,
        mrp: 56,
        rating: 4.4,
        discount: 7,
        image: "../assets/products/milk.jpg"
    },

    {
        id: 1022,
        name: "Fresh Curd",
        category: "Curd & Yogurt",
        size: "400 g",
        price: 45,
        mrp: 50,
        rating: 4.5,
        discount: 10,
        image: "../assets/products/curd.jpg"
    },

    {
        id: 1023,
        name: "Thick Natural Yogurt",
        category: "Curd & Yogurt",
        size: "400 g",
        price: 55,
        mrp: 65,
        rating: 4.4,
        discount: 15,
        image: "../assets/products/yogurt.jpg"
    },

    {
        id: 1024,
        name: "Fresh White Butter",
        category: "Butter",
        size: "100 g",
        price: 58,
        mrp: 65,
        rating: 4.6,
        discount: 11,
        image: "../assets/products/butter.jpg"
    },

    {
        id: 1025,
        name: "Fresh Paneer",
        category: "Paneer",
        size: "200 g",
        price: 85,
        mrp: 95,
        rating: 4.7,
        discount: 11,
        image: "../assets/products/paneer.jpg"
    },

    {
        id: 1026,
        name: "Premium Paneer",
        category: "Paneer",
        size: "500 g",
        price: 195,
        mrp: 220,
        rating: 4.7,
        discount: 11,
        image: "../assets/products/paneer.jpg"
    },

    {
        id: 1027,
        name: "Processed Cheese Slices",
        category: "Cheese",
        size: "200 g",
        price: 125,
        mrp: 145,
        rating: 4.5,
        discount: 14,
        image: "../assets/products/cheese.jpg"
    },

    {
        id: 1028,
        name: "Cheese Block",
        category: "Cheese",
        size: "200 g",
        price: 145,
        mrp: 165,
        rating: 4.4,
        discount: 12,
        image: "../assets/products/cheese.jpg"
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

const searchForm = document.getElementById("searchForm");
const headerSearch = document.getElementById("headerSearch");
const searchClear = document.getElementById("searchClear");
const searchDropdown = document.getElementById("searchDropdown");

const cartCount = document.getElementById("cartCount");

const clearFilters = document.getElementById("clearFilters");
const emptyClearButton = document.getElementById("emptyClearButton");

const mobileFilterButton = document.getElementById("mobileFilterButton");
const mobileFilterClose = document.getElementById("mobileFilterClose");
const filterOverlay = document.getElementById("filterOverlay");
const mobileFilterContent = document.getElementById("mobileFilterContent");

const locationButton = document.getElementById("locationButton");
const locationText = document.getElementById("locationText");

const locationOverlay = document.getElementById("locationOverlay");
const locationClose = document.getElementById("locationClose");
const locationInput = document.getElementById("locationInput");
const saveLocationButton = document.getElementById("saveLocation");
const useCurrentLocation = document.getElementById("useCurrentLocation");
const locationStatus = document.getElementById("locationStatus");

const toast = document.getElementById("toast");
const currentYear = document.getElementById("currentYear");


/* =========================================================
   HELPERS
========================================================= */

function formatPrice(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
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
        } catch (error) {
            console.warn("Could not read cart:", error);
        }
    }

    return [];
}


function normalizeCartItem(item) {
    if (!item || typeof item !== "object") {
        return null;
    }

    const id =
        item.id ??
        item.productId ??
        item.productID ??
        item.product_id;

    if (id === undefined || id === null) {
        return null;
    }

    const quantity =
        Number(item.quantity ?? item.qty ?? 1) || 1;

    return {
        ...item,
        id: String(id),
        quantity: Math.max(1, quantity)
    };
}


function saveCart(cart) {
    try {
        localStorage.setItem("marteyCart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage"));
    } catch (error) {
        console.warn("Could not save cart:", error);
    }

    updateCartCount();
}


function updateCartCount() {
    const cart = getCart();

    const total = cart.reduce((sum, item) => {
        const normalized = normalizeCartItem(item);

        if (!normalized) {
            return sum;
        }

        return sum + normalized.quantity;
    }, 0);

    if (!cartCount) {
        return;
    }

    cartCount.textContent = total > 99 ? "99+" : String(total);
}


function addToCart(product) {
    const cart = getCart()
        .map(normalizeCartItem)
        .filter(Boolean);

    const existing = cart.find(
        item => String(item.id) === String(product.id)
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: String(product.id),
            name: product.name,
            category: product.category,
            size: product.size,
            price: product.price,
            mrp: product.mrp,
            discount: product.discount,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);

    showToast(`${product.name} added to cart.`);
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
        <a
            class="product-image-link"
            href="/product/?id=${encodeURIComponent(product.id)}"
            aria-label="View ${escapeHTML(product.name)}"
        >
            <img
                class="product-image"
                src="${escapeHTML(product.image)}"
                alt="${escapeHTML(product.name)}"
                loading="lazy"
                onerror="this.style.opacity='0.25'"
            >

            ${
                product.discount > 0
                    ? `<span class="discount-badge">${product.discount}% OFF</span>`
                    : ""
            }
        </a>

        <div class="product-info">

            <span class="product-category">
                ${escapeHTML(product.category)}
            </span>

            <a
                href="/product/?id=${encodeURIComponent(product.id)}"
                class="product-name"
            >
                ${escapeHTML(product.name)}
            </a>

            <span class="product-size">
                ${escapeHTML(product.size)}
            </span>

            <div class="product-bottom">

                <div class="product-prices">
                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <span class="product-mrp">
                        ${formatPrice(product.mrp)}
                    </span>
                </div>

                <button
                    type="button"
                    class="add-button"
                    data-product-id="${escapeHTML(product.id)}"
                >
                    Add
                </button>

            </div>

        </div>
    `;

    return card;
}


/* =========================================================
   FILTERS
========================================================= */

function getSelectedDairyTypes() {
    return [...document.querySelectorAll(".dairy-filter:checked")]
        .map(input => input.value);
}


function getSelectedPriceFilter() {
    const selected = document.querySelector(
        'input[name="price"]:checked'
    );

    return selected ? selected.value : "all";
}


function matchesPriceFilter(product, filter) {

    if (filter === "under50") {
        return product.price < 50;
    }

    if (filter === "50to100") {
        return product.price >= 50 && product.price <= 100;
    }

    if (filter === "above100") {
        return product.price > 100;
    }

    return true;
}


function filterProducts() {

    const dairyTypes = getSelectedDairyTypes();
    const priceFilter = getSelectedPriceFilter();

    return products.filter(product => {

        const dairyMatch =
            dairyTypes.length === 0 ||
            dairyTypes.includes(product.category);

        const priceMatch =
            matchesPriceFilter(product, priceFilter);

        return dairyMatch && priceMatch;
    });
}


/* =========================================================
   SORT
========================================================= */

function sortProducts(list) {

    const sorted = [...list];

    switch (sortSelect.value) {

        case "price-low":
            sorted.sort((a, b) => a.price - b.price);
            break;

        case "price-high":
            sorted.sort((a, b) => b.price - a.price);
            break;

        case "discount":
            sorted.sort((a, b) => b.discount - a.discount);
            break;

        default:
            sorted.sort((a, b) => a.id - b.id);
            break;
    }

    return sorted;
}


/* =========================================================
   RENDER
========================================================= */

function renderProducts() {

    const filtered = sortProducts(filterProducts());

    productGrid.innerHTML = "";

    if (productCount) {
        productCount.textContent =
            `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`;
    }

    if (resultsText) {
        resultsText.textContent =
            `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`;
    }

    if (filtered.length === 0) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;

    const fragment = document.createDocumentFragment();

    filtered.forEach(product => {
        fragment.appendChild(createProductCard(product));
    });

    productGrid.appendChild(fragment);
}


/* =========================================================
   SEARCH
========================================================= */

function goToSearch(query) {

    const cleanQuery = String(query || "").trim();

    if (!cleanQuery) {
        return;
    }

    window.location.href =
        `/search?q=${encodeURIComponent(cleanQuery)}`;
}


function updateSearchUI() {

    const query = headerSearch.value.trim();

    if (query) {
        searchClear.classList.add("visible");
    } else {
        searchClear.classList.remove("visible");
    }

    if (!query) {
        searchDropdown.classList.remove("active");
        searchDropdown.innerHTML = "";
        return;
    }

    const lowerQuery = query.toLowerCase();

    const matches = products
        .filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        )
        .slice(0, 5);

    if (matches.length === 0) {
        searchDropdown.innerHTML = `
            <div class="search-result">
                <div class="search-result-info">
                    <strong>No matching Milk & Dairy product</strong>
                    <span>Press Enter to search all MARTEY products</span>
                </div>
            </div>
        `;

        searchDropdown.classList.add("active");
        return;
    }

    searchDropdown.innerHTML = matches.map(product => `
        <button
            type="button"
            class="search-result"
            data-search-product-id="${escapeHTML(product.id)}"
        >
            <span class="search-result-image">
                <img
                    src="${escapeHTML(product.image)}"
                    alt=""
                    onerror="this.style.opacity='0.25'"
                >
            </span>

            <span class="search-result-info">
                <strong>${escapeHTML(product.name)}</strong>
                <span>
                    ${escapeHTML(product.size)} · ${formatPrice(product.price)}
                </span>
            </span>
        </button>
    `).join("");

    searchDropdown.classList.add("active");
}


if (searchForm) {
    searchForm.addEventListener("submit", event => {
        event.preventDefault();
        goToSearch(headerSearch.value);
    });
}


if (headerSearch) {

    headerSearch.addEventListener("input", updateSearchUI);

    headerSearch.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            goToSearch(headerSearch.value);
        }

        if (event.key === "Escape") {
            searchDropdown.classList.remove("active");
        }
    });
}


if (searchClear) {

    searchClear.addEventListener("click", () => {
        headerSearch.value = "";
        updateSearchUI();
        headerSearch.focus();
    });
}


if (searchDropdown) {

    searchDropdown.addEventListener("click", event => {

        const button =
            event.target.closest("[data-search-product-id]");

        if (!button) {
            return;
        }

        const productId =
            button.dataset.searchProductId;

        window.location.href =
            `/product/?id=${encodeURIComponent(productId)}`;
    });
}


document.addEventListener("click", event => {

    if (
        searchForm &&
        !searchForm.contains(event.target)
    ) {
        searchDropdown.classList.remove("active");
    }
});


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearAllFilters() {

    document.querySelectorAll(".dairy-filter").forEach(input => {
        input.checked = false;
    });

    const allPrice =
        document.querySelector('input[name="price"][value="all"]');

    if (allPrice) {
        allPrice.checked = true;
    }

    sortSelect.value = "relevance";

    renderProducts();
}


if (clearFilters) {
    clearFilters.addEventListener("click", clearAllFilters);
}


if (emptyClearButton) {
    emptyClearButton.addEventListener("click", clearAllFilters);
}


document.querySelectorAll(".dairy-filter").forEach(input => {
    input.addEventListener("change", renderProducts);
});


document.querySelectorAll('input[name="price"]').forEach(input => {
    input.addEventListener("change", renderProducts);
});


if (sortSelect) {
    sortSelect.addEventListener("change", renderProducts);
}


/* =========================================================
   MOBILE FILTER
========================================================= */

function createMobileFilters() {

    if (!mobileFilterContent) {
        return;
    }

    const sidebar = document.getElementById("filterSidebar");

    if (!sidebar) {
        return;
    }

    mobileFilterContent.innerHTML = sidebar.innerHTML;

    mobileFilterContent
        .querySelectorAll(".dairy-filter")
        .forEach(input => {

            input.addEventListener("change", event => {

                const value = event.target.value;
                const checked = event.target.checked;

                const desktopInput =
                    document.querySelector(
                        `.dairy-filter[value="${CSS.escape(value)}"]`
                    );

                if (desktopInput) {
                    desktopInput.checked = checked;
                }

                renderProducts();
            });
        });


    mobileFilterContent
        .querySelectorAll('input[name="price"]')
        .forEach(input => {

            input.addEventListener("change", event => {

                const value = event.target.value;

                const desktopInput =
                    document.querySelector(
                        `input[name="price"][value="${CSS.escape(value)}"]`
                    );

                if (desktopInput) {
                    desktopInput.checked = true;
                }

                renderProducts();
            });
        });


    const mobileClear =
        mobileFilterContent.querySelector("#clearFilters");

    if (mobileClear) {
        mobileClear.addEventListener("click", () => {
            clearAllFilters();
            closeMobileFilters();
        });
    }
}


function syncMobileFilters() {

    if (!mobileFilterContent) {
        return;
    }

    const desktopChecks =
        [...document.querySelectorAll(".dairy-filter")];

    const mobileChecks =
        [...mobileFilterContent.querySelectorAll(".dairy-filter")];

    mobileChecks.forEach(input => {

        const desktopInput =
            desktopChecks.find(
                item => item.value === input.value
            );

        if (desktopInput) {
            input.checked = desktopInput.checked;
        }
    });


    const desktopPrice =
        document.querySelector('input[name="price"]:checked');

    const mobilePrice =
        mobileFilterContent.querySelectorAll(
            'input[name="price"]'
        );

    mobilePrice.forEach(input => {
        input.checked =
            desktopPrice &&
            input.value === desktopPrice.value;
    });
}


function openMobileFilters() {

    syncMobileFilters();

    filterOverlay.hidden = false;
    document.body.style.overflow = "hidden";
}


function closeMobileFilters() {

    filterOverlay.hidden = true;
    document.body.style.overflow = "";
}


if (mobileFilterButton) {
    mobileFilterButton.addEventListener(
        "click",
        openMobileFilters
    );
}


if (mobileFilterClose) {
    mobileFilterClose.addEventListener(
        "click",
        closeMobileFilters
    );
}


if (filterOverlay) {

    filterOverlay.addEventListener("click", event => {

        if (event.target === filterOverlay) {
            closeMobileFilters();
        }
    });
}


createMobileFilters();


/* =========================================================
   LOCATION SYSTEM
========================================================= */

const LOCATION_KEY = "marteyLocation";


function getSavedLocation() {

    try {
        const saved = localStorage.getItem(LOCATION_KEY);

        if (!saved) {
            return null;
        }

        return JSON.parse(saved);

    } catch (error) {
        console.warn("Could not read saved location:", error);
        return null;
    }
}


function saveLocationData(location) {

    try {
        localStorage.setItem(
            LOCATION_KEY,
            JSON.stringify(location)
        );

        updateLocationDisplay();

    } catch (error) {
        console.warn("Could not save location:", error);
    }
}


function updateLocationDisplay() {

    const saved = getSavedLocation();

    if (!locationText) {
        return;
    }

    if (!saved) {
        locationText.textContent = "Select location";
        return;
    }

    if (saved.label) {
        locationText.textContent = saved.label;
        return;
    }

    locationText.textContent = "Location selected";
}


function openLocationModal() {

    if (!locationOverlay) {
        return;
    }

    const saved = getSavedLocation();

    if (saved && saved.label) {
        locationInput.value = saved.label;
    } else {
        locationInput.value = "";
    }

    locationStatus.textContent = "";
    locationStatus.className = "location-status";

    locationOverlay.hidden = false;
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        locationInput.focus();
    }, 50);
}


function closeLocationModal() {

    if (!locationOverlay) {
        return;
    }

    locationOverlay.hidden = true;
    document.body.style.overflow = "";
}


function showLocationStatus(message, type = "") {

    locationStatus.textContent = message;
    locationStatus.className =
        `location-status ${type}`.trim();
}


if (locationButton) {
    locationButton.addEventListener(
        "click",
        openLocationModal
    );
}


if (locationClose) {
    locationClose.addEventListener(
        "click",
        closeLocationModal
    );
}


if (locationOverlay) {

    locationOverlay.addEventListener("click", event => {

        if (event.target === locationOverlay) {
            closeLocationModal();
        }
    });
}


if (saveLocationButton) {

    saveLocationButton.addEventListener("click", () => {

        const value = locationInput.value.trim();

        if (!value) {
            showLocationStatus(
                "Please enter your area or locality.",
                "error"
            );

            locationInput.focus();
            return;
        }

        saveLocationData({
            type: "manual",
            label: value,
            savedAt: new Date().toISOString()
        });

        showLocationStatus(
            "Location saved successfully.",
            "success"
        );

        showToast(`Delivering to ${value}.`);

        setTimeout(() => {
            closeLocationModal();
        }, 600);
    });
}


if (locationInput) {

    locationInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            event.preventDefault();

            saveLocationButton.click();
        }
    });
}


/* =========================================================
   CURRENT LOCATION
========================================================= */

function handleCurrentLocation() {

    if (!navigator.geolocation) {

        showLocationStatus(
            "Your browser does not support location access. Enter your area manually.",
            "error"
        );

        return;
    }

    showLocationStatus(
        "Requesting your current location..."
    );

    useCurrentLocation.disabled = true;

    navigator.geolocation.getCurrentPosition(
        position => {

            const latitude =
                Number(position.coords.latitude).toFixed(5);

            const longitude =
                Number(position.coords.longitude).toFixed(5);

            saveLocationData({
                type: "current",
                label: "Current location",
                latitude,
                longitude,
                savedAt: new Date().toISOString()
            });

            locationInput.value = "Current location";

            showLocationStatus(
                "Current location selected successfully.",
                "success"
            );

            showToast("Current delivery location selected.");

            useCurrentLocation.disabled = false;

            setTimeout(() => {
                closeLocationModal();
            }, 700);
        },

        error => {

            useCurrentLocation.disabled = false;

            let message =
                "Location access was not available. Please enter your area manually.";

            if (error.code === 1) {
                message =
                    "Location permission was denied. Please enter your area manually.";
            }

            if (error.code === 2) {
                message =
                    "Your current location could not be determined. Try manual entry.";
            }

            if (error.code === 3) {
                message =
                    "Location request timed out. Please try again or enter your area.";
            }

            showLocationStatus(message, "error");
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}


if (useCurrentLocation) {
    useCurrentLocation.addEventListener(
        "click",
        handleCurrentLocation
    );
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2400);
}


/* =========================================================
   STORAGE SYNC
========================================================= */

window.addEventListener("storage", () => {
    updateCartCount();
});


/* =========================================================
   ADD TO CART EVENT DELEGATION
========================================================= */

if (productGrid) {

    productGrid.addEventListener("click", event => {

        const button =
            event.target.closest(".add-button");

        if (!button) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const productId =
            Number(button.dataset.productId);

        const product =
            products.find(item => item.id === productId);

        if (!product) {
            return;
        }

        addToCart(product);
    });
}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") {
        return;
    }

    if (locationOverlay && !locationOverlay.hidden) {
        closeLocationModal();
    }

    if (filterOverlay && !filterOverlay.hidden) {
        closeMobileFilters();
    }

    if (searchDropdown) {
        searchDropdown.classList.remove("active");
    }
});


/* =========================================================
   INITIALIZE
========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

updateLocationDisplay();
updateCartCount();
renderProducts();
