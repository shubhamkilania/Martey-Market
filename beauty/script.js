const products = [
    {
        id: 1215,
        name: "Daily Glow Face Wash",
        category: "Face Care",
        size: "100 ml",
        price: 159,
        mrp: 190,
        rating: 4.6,
        image: "face-wash.jpg"
    },
    {
        id: 1216,
        name: "Vitamin C Face Serum",
        category: "Face Care",
        size: "30 ml",
        price: 249,
        mrp: 299,
        rating: 4.7,
        image: "face-serum.jpg"
    },
    {
        id: 1217,
        name: "Daily Moisturizing Face Cream",
        category: "Face Care",
        size: "50 g",
        price: 189,
        mrp: 225,
        rating: 4.5,
        image: "face-cream.jpg"
    },
    {
        id: 1218,
        name: "Lightweight Sunscreen",
        category: "Face Care",
        size: "50 g",
        price: 229,
        mrp: 275,
        rating: 4.6,
        image: "sunscreen.jpg"
    },

    {
        id: 1219,
        name: "Natural Finish Foundation",
        category: "Makeup",
        size: "30 ml",
        price: 299,
        mrp: 349,
        rating: 4.5,
        image: "foundation.jpg"
    },
    {
        id: 1220,
        name: "Soft Matte Compact",
        category: "Makeup",
        size: "9 g",
        price: 199,
        mrp: 240,
        rating: 4.5,
        image: "compact.jpg"
    },
    {
        id: 1221,
        name: "Volume Mascara",
        category: "Makeup",
        size: "10 ml",
        price: 179,
        mrp: 220,
        rating: 4.4,
        image: "mascara.jpg"
    },
    {
        id: 1222,
        name: "Classic Black Eyeliner",
        category: "Makeup",
        size: "3 ml",
        price: 129,
        mrp: 160,
        rating: 4.5,
        image: "eyeliner.jpg"
    },
    {
        id: 1223,
        name: "Natural Glow Blush",
        category: "Makeup",
        size: "5 g",
        price: 189,
        mrp: 225,
        rating: 4.5,
        image: "blush.jpg"
    },

    {
        id: 1224,
        name: "Moisture Care Lip Balm",
        category: "Lip Care",
        size: "4.5 g",
        price: 79,
        mrp: 99,
        rating: 4.6,
        image: "lip-balm.jpg"
    },
    {
        id: 1225,
        name: "Everyday Lipstick",
        category: "Lip Care",
        size: "4 g",
        price: 199,
        mrp: 240,
        rating: 4.5,
        image: "lipstick.jpg"
    },
    {
        id: 1226,
        name: "Glossy Lip Gloss",
        category: "Lip Care",
        size: "5 ml",
        price: 159,
        mrp: 190,
        rating: 4.4,
        image: "lip-gloss.jpg"
    },

    {
        id: 1227,
        name: "Strong Hold Hair Styling Gel",
        category: "Hair Styling",
        size: "150 g",
        price: 149,
        mrp: 180,
        rating: 4.5,
        image: "hair-styling-gel.jpg"
    },
    {
        id: 1228,
        name: "Natural Hold Hair Spray",
        category: "Hair Styling",
        size: "200 ml",
        price: 219,
        mrp: 260,
        rating: 4.5,
        image: "hair-spray.jpg"
    },
    {
        id: 1229,
        name: "Matte Hair Styling Wax",
        category: "Hair Styling",
        size: "100 g",
        price: 179,
        mrp: 215,
        rating: 4.6,
        image: "hair-wax.jpg"
    },

    {
        id: 1230,
        name: "Hydrating Skin Cream",
        category: "Skincare",
        size: "100 g",
        price: 199,
        mrp: 240,
        rating: 4.6,
        image: "skin-cream.jpg"
    },
    {
        id: 1231,
        name: "Gentle Skin Cleanser",
        category: "Skincare",
        size: "150 ml",
        price: 219,
        mrp: 260,
        rating: 4.5,
        image: "skin-cleanser.jpg"
    },
    {
        id: 1232,
        name: "Aloe Skin Gel",
        category: "Skincare",
        size: "150 ml",
        price: 145,
        mrp: 175,
        rating: 4.6,
        image: "aloe-skin-gel.jpg"
    },

    {
        id: 1233,
        name: "Daily Body Lotion",
        category: "Body Care",
        size: "250 ml",
        price: 189,
        mrp: 225,
        rating: 4.5,
        image: "body-lotion.jpg"
    },
    {
        id: 1234,
        name: "Refreshing Body Scrub",
        category: "Body Care",
        size: "200 g",
        price: 229,
        mrp: 275,
        rating: 4.5,
        image: "body-scrub.jpg"
    },
    {
        id: 1235,
        name: "Nourishing Body Butter",
        category: "Body Care",
        size: "200 g",
        price: 249,
        mrp: 299,
        rating: 4.6,
        image: "body-butter.jpg"
    },

    {
        id: 1236,
        name: "Everyday Fresh Perfume",
        category: "Fragrance",
        size: "100 ml",
        price: 299,
        mrp: 399,
        rating: 4.5,
        image: "perfume.jpg"
    },
    {
        id: 1237,
        name: "Fresh Floral Body Mist",
        category: "Fragrance",
        size: "120 ml",
        price: 249,
        mrp: 299,
        rating: 4.6,
        image: "body-mist.jpg"
    },
    {
        id: 1238,
        name: "Classic Fresh Fragrance",
        category: "Fragrance",
        size: "50 ml",
        price: 199,
        mrp: 250,
        rating: 4.4,
        image: "fragrance.jpg"
    },

    {
        id: 1239,
        name: "Gloss Finish Nail Polish",
        category: "Nail Care",
        size: "8 ml",
        price: 89,
        mrp: 110,
        rating: 4.5,
        image: "nail-polish.jpg"
    },
    {
        id: 1240,
        name: "Gentle Nail Polish Remover",
        category: "Nail Care",
        size: "100 ml",
        price: 79,
        mrp: 99,
        rating: 4.4,
        image: "nail-remover.jpg"
    },
    {
        id: 1241,
        name: "Nail Care Kit",
        category: "Nail Care",
        size: "5 pcs",
        price: 149,
        mrp: 180,
        rating: 4.5,
        image: "nail-care-kit.jpg"
    },

    {
        id: 1242,
        name: "Professional Makeup Brush Set",
        category: "Beauty Tools",
        size: "10 pcs",
        price: 299,
        mrp: 399,
        rating: 4.7,
        image: "makeup-brushes.jpg"
    },
    {
        id: 1243,
        name: "Soft Beauty Makeup Sponge",
        category: "Beauty Tools",
        size: "2 pcs",
        price: 129,
        mrp: 160,
        rating: 4.5,
        image: "beauty-sponge.jpg"
    },
    {
        id: 1244,
        name: "Wide Tooth Hair Brush",
        category: "Beauty Tools",
        size: "1 pc",
        price: 99,
        mrp: 125,
        rating: 4.5,
        image: "hair-brush.jpg"
    },

    {
        id: 1245,
        name: "Daily Beard & Hair Trimmer",
        category: "Men's Grooming",
        size: "1 pc",
        price: 699,
        mrp: 899,
        rating: 4.6,
        image: "trimmer.jpg"
    },
    {
        id: 1246,
        name: "Complete Shaving Kit",
        category: "Men's Grooming",
        size: "4 pcs",
        price: 249,
        mrp: 299,
        rating: 4.5,
        image: "shaving-kit.jpg"
    },
    {
        id: 1247,
        name: "Men's Face Care Kit",
        category: "Men's Grooming",
        size: "3 pcs",
        price: 349,
        mrp: 425,
        rating: 4.6,
        image: "mens-face-kit.jpg"
    }
];

/* =========================================================
   ELEMENTS
========================================================= */

const productGrid = document.getElementById("productGrid");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

const sortSelect = document.getElementById("sortSelect");
const clearFiltersButton = document.getElementById("clearFilters");
const resetEmptyButton = document.getElementById("resetEmpty");

const activeFilters = document.getElementById("activeFilters");

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchSuggestions = document.getElementById("searchSuggestions");

const cartCount = document.getElementById("cartCount");

const mobileFilterButton = document.getElementById("mobileFilterButton");
const filterSidebar = document.getElementById("filterSidebar");
const filterOverlay = document.getElementById("filterOverlay");

const locationButton = document.getElementById("locationButton");

let selectedCategories = [];
let selectedPrices = [];

/* =========================================================
   HELPERS
========================================================= */

function getDiscount(product) {
    if (!product.mrp || product.mrp <= product.price) {
        return 0;
    }

    return Math.round(
        ((product.mrp - product.price) / product.mrp) * 100
    );
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getCart() {
    try {
        const stored = localStorage.getItem("marteyCart");

        if (!stored) {
            return [];
        }

        const cart = JSON.parse(stored);

        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem("marteyCart", JSON.stringify(cart));
}

function getCartQuantity(productId) {
    const cart = getCart();

    const item = cart.find(
        product =>
            Number(product.id ?? product.productId ?? product.productID) ===
            Number(productId)
    );

    if (!item) {
        return 0;
    }

    return Number(item.quantity ?? item.qty ?? 1);
}

/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {
    const cart = getCart();

    const totalQuantity = cart.reduce((total, item) => {
        return total + Number(item.quantity ?? item.qty ?? 1);
    }, 0);

    cartCount.textContent = totalQuantity;
}

/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {
    const product = products.find(
        item => Number(item.id) === Number(productId)
    );

    if (!product) {
        return;
    }

    const cart = getCart();

    const existingIndex = cart.findIndex(
        item =>
            Number(item.id ?? item.productId ?? item.productID) ===
            Number(productId)
    );

    if (existingIndex !== -1) {
        cart[existingIndex].quantity =
            Number(
                cart[existingIndex].quantity ??
                cart[existingIndex].qty ??
                1
            ) + 1;
    } else {
        cart.push({
            id: product.id,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
    updateAddButtons();

    const button = document.querySelector(
        `.add-button[data-id="${productId}"]`
    );

    if (button) {
        const originalText = button.textContent;

        button.textContent = "Added ✓";
        button.classList.add("added");

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove("added");
        }, 900);
    }
}

/* =========================================================
   PRODUCT PAGE
========================================================= */

function openProduct(productId) {
    window.location.href = `../product/${productId}`;
}

/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(list) {
    productGrid.innerHTML = "";

    if (!list.length) {
        productGrid.style.display = "none";
        emptyState.classList.add("show");

        resultCount.textContent = "0 products";
        return;
    }

    productGrid.style.display = "grid";
    emptyState.classList.remove("show");

    resultCount.textContent =
        `${list.length} ${list.length === 1 ? "product" : "products"}`;

    list.forEach(product => {
        const discount = getDiscount(product);

        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <div
                class="product-image-wrapper"
                data-product="${product.id}"
            >
                ${
                    discount > 0
                        ? `<span class="discount-badge">${discount}% OFF</span>`
                        : ""
                }

                <img
                    src="../assets/products/${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                    onerror="this.src='../assets/products/face-wash.jpg';"
                >
            </div>

            <div class="product-content">

                <span class="product-category">
                    ${escapeHTML(product.category)}
                </span>

                <h3
                    class="product-name"
                    data-product="${product.id}"
                >
                    ${escapeHTML(product.name)}
                </h3>

                <span class="product-size">
                    ${escapeHTML(product.size)}
                </span>

                <div class="product-rating">
                    <span class="rating-star">★</span>
                    <strong>${product.rating}</strong>
                    <span class="rating-count">Rating</span>
                </div>

                <div class="product-bottom">

                    <div class="price-box">
                        <span class="product-price">
                            ₹${product.price}
                        </span>

                        <span class="product-mrp">
                            ₹${product.mrp}
                        </span>
                    </div>

                    <button
                        class="add-button"
                        data-id="${product.id}"
                    >
                        ${
                            getCartQuantity(product.id) > 0
                                ? "Added ✓"
                                : "ADD"
                        }
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);
    });

    document.querySelectorAll("[data-product]").forEach(element => {
        element.addEventListener("click", event => {
            if (event.target.closest(".add-button")) {
                return;
            }

            openProduct(element.dataset.product);
        });
    });

    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", event => {
            event.stopPropagation();
            addToCart(button.dataset.id);
        });
    });
}

function updateAddButtons() {
    document.querySelectorAll(".add-button").forEach(button => {
        const quantity = getCartQuantity(button.dataset.id);

        button.textContent = quantity > 0 ? "Added ✓" : "ADD";
        button.classList.toggle("added", quantity > 0);
    });
}

/* =========================================================
   FILTERING
========================================================= */

function matchesPrice(product) {
    if (!selectedPrices.length) {
        return true;
    }

    return selectedPrices.some(range => {
        if (range === "under100") {
            return product.price < 100;
        }

        if (range === "100to250") {
            return product.price >= 100 && product.price <= 250;
        }

        if (range === "above250") {
            return product.price > 250;
        }

        return true;
    });
}

function applyFilters() {
    let filtered = [...products];

    if (selectedCategories.length) {
        filtered = filtered.filter(product =>
            selectedCategories.includes(product.category)
        );
    }

    filtered = filtered.filter(matchesPrice);

    const sortValue = sortSelect.value;

    if (sortValue === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "discount") {
        filtered.sort(
            (a, b) =>
                getDiscount(b) - getDiscount(a)
        );
    }

    renderProducts(filtered);
    renderActiveFilters();
}

/* =========================================================
   ACTIVE FILTER DISPLAY
========================================================= */

function renderActiveFilters() {
    activeFilters.innerHTML = "";

    selectedCategories.forEach(category => {
        const chip = document.createElement("div");

        chip.className = "active-filter";

        chip.innerHTML = `
            ${escapeHTML(category)}
            <button
                type="button"
                data-remove-category="${escapeHTML(category)}"
            >
                ×
            </button>
        `;

        activeFilters.appendChild(chip);
    });

    selectedPrices.forEach(price => {
        let label = price;

        if (price === "under100") {
            label = "Under ₹100";
        }

        if (price === "100to250") {
            label = "₹100 – ₹250";
        }

        if (price === "above250") {
            label = "Above ₹250";
        }

        const chip = document.createElement("div");

        chip.className = "active-filter";

        chip.innerHTML = `
            ${label}
            <button
                type="button"
                data-remove-price="${price}"
            >
                ×
            </button>
        `;

        activeFilters.appendChild(chip);
    });

    document.querySelectorAll("[data-remove-category]").forEach(button => {
        button.addEventListener("click", () => {
            const value = button.dataset.removeCategory;

            selectedCategories =
                selectedCategories.filter(item => item !== value);

            document.querySelectorAll(".category-filter").forEach(input => {
                input.checked = selectedCategories.includes(input.value);
            });

            applyFilters();
        });
    });

    document.querySelectorAll("[data-remove-price]").forEach(button => {
        button.addEventListener("click", () => {
            const value = button.dataset.removePrice;

            selectedPrices =
                selectedPrices.filter(item => item !== value);

            document.querySelectorAll(".price-filter").forEach(input => {
                input.checked = selectedPrices.includes(input.value);
            });

            applyFilters();
        });
    });
}

/* =========================================================
   CATEGORY FILTER EVENTS
========================================================= */

document.querySelectorAll(".category-filter").forEach(input => {
    input.addEventListener("change", () => {
        selectedCategories =
            [...document.querySelectorAll(".category-filter:checked")]
                .map(item => item.value);

        applyFilters();
    });
});

document.querySelectorAll(".price-filter").forEach(input => {
    input.addEventListener("change", () => {
        selectedPrices =
            [...document.querySelectorAll(".price-filter:checked")]
                .map(item => item.value);

        applyFilters();
    });
});

sortSelect.addEventListener("change", applyFilters);

/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearFilters() {
    selectedCategories = [];
    selectedPrices = [];

    document.querySelectorAll(
        ".category-filter, .price-filter"
    ).forEach(input => {
        input.checked = false;
    });

    sortSelect.value = "relevance";

    applyFilters();
}

clearFiltersButton.addEventListener("click", clearFilters);
resetEmptyButton.addEventListener("click", clearFilters);

/* =========================================================
   SEARCH
========================================================= */

function performSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        return;
    }

    window.location.href =
        `../search/?q=${encodeURIComponent(query)}`;
}

searchButton.addEventListener("click", performSearch);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        performSearch();
    }
});

/* =========================================================
   SEARCH SUGGESTIONS
========================================================= */

function showSuggestions(query) {
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) {
        searchSuggestions.classList.remove("active");
        searchSuggestions.innerHTML = "";
        return;
    }

    const matches = products
        .filter(product =>
            product.name.toLowerCase().includes(cleanQuery) ||
            product.category.toLowerCase().includes(cleanQuery)
        )
        .slice(0, 5);

    if (!matches.length) {
        searchSuggestions.classList.remove("active");
        searchSuggestions.innerHTML = "";
        return;
    }

    searchSuggestions.innerHTML = matches.map(product => `
        <div
            class="suggestion-item"
            data-suggestion="${product.id}"
        >
            <img
                src="../assets/products/${escapeHTML(product.image)}"
                alt="${escapeHTML(product.name)}"
                onerror="this.src='../assets/products/face-wash.jpg';"
            >

            <div class="suggestion-info">
                <div class="suggestion-name">
                    ${escapeHTML(product.name)}
                </div>

                <div class="suggestion-meta">
                    ${escapeHTML(product.category)}
                    · ${escapeHTML(product.size)}
                    · ₹${product.price}
                </div>
            </div>
        </div>
    `).join("");

    searchSuggestions.classList.add("active");

    document.querySelectorAll("[data-suggestion]").forEach(item => {
        item.addEventListener("click", () => {
            openProduct(item.dataset.suggestion);
        });
    });
}

searchInput.addEventListener("input", () => {
    showSuggestions(searchInput.value);
});

document.addEventListener("click", event => {
    if (!event.target.closest(".search-wrapper")) {
        searchSuggestions.classList.remove("active");
    }
});

/* =========================================================
   LOCATION
========================================================= */

locationButton.addEventListener("click", () => {
    alert(
        "Location selection will be connected to MARTEY's location and nearby-store system later."
    );
});

/* =========================================================
   MOBILE FILTER
========================================================= */

mobileFilterButton.addEventListener("click", () => {
    filterSidebar.classList.add("open");
    filterOverlay.classList.add("active");
});

filterOverlay.addEventListener("click", () => {
    filterSidebar.classList.remove("open");
    filterOverlay.classList.remove("active");
});

/* =========================================================
   INITIALIZE
========================================================= */

updateCartCount();
applyFilters();
