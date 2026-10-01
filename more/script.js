const products = [

    /* =========================
       KITCHEN & DINING
    ========================= */

    {
        id: 1355,
        name: "Premium Stainless Steel Water Bottle",
        category: "Kitchen & Dining",
        size: "1 L",
        price: 349,
        mrp: 449,
        rating: 4.7,
        image: "steel-water-bottle.jpg"
    },

    {
        id: 1356,
        name: "Airtight Food Storage Container Set",
        category: "Kitchen & Dining",
        size: "5 pcs",
        price: 399,
        mrp: 499,
        rating: 4.6,
        image: "food-storage-containers.jpg"
    },

    {
        id: 1357,
        name: "Premium Kitchen Knife",
        category: "Kitchen & Dining",
        size: "1 pc",
        price: 199,
        mrp: 249,
        rating: 4.5,
        image: "kitchen-knife.jpg"
    },

    {
        id: 1358,
        name: "Silicone Kitchen Spatula Set",
        category: "Kitchen & Dining",
        size: "3 pcs",
        price: 249,
        mrp: 299,
        rating: 4.6,
        image: "spatula-set.jpg"
    },

    {
        id: 1359,
        name: "Non-Stick Cooking Pan",
        category: "Kitchen & Dining",
        size: "24 cm",
        price: 599,
        mrp: 749,
        rating: 4.7,
        image: "cooking-pan.jpg"
    },


    /* =========================
       HOME UTILITY
    ========================= */

    {
        id: 1360,
        name: "Multi-Purpose Storage Basket",
        category: "Home Utility",
        size: "1 pc",
        price: 249,
        mrp: 299,
        rating: 4.5,
        image: "storage-basket.jpg"
    },

    {
        id: 1361,
        name: "Microfiber Cleaning Cloth Set",
        category: "Home Utility",
        size: "5 pcs",
        price: 149,
        mrp: 199,
        rating: 4.6,
        image: "microfiber-cloth-set.jpg"
    },

    {
        id: 1362,
        name: "Reusable Clothes Hangers",
        category: "Home Utility",
        size: "10 pcs",
        price: 199,
        mrp: 249,
        rating: 4.5,
        image: "clothes-hangers.jpg"
    },

    {
        id: 1363,
        name: "Foldable Laundry Basket",
        category: "Home Utility",
        size: "1 pc",
        price: 449,
        mrp: 599,
        rating: 4.6,
        image: "laundry-basket.jpg"
    },

    {
        id: 1364,
        name: "Home Storage Organizer",
        category: "Home Utility",
        size: "1 pc",
        price: 349,
        mrp: 449,
        rating: 4.5,
        image: "home-organizer.jpg"
    },


    /* =========================
       TRAVEL ESSENTIALS
    ========================= */

    {
        id: 1365,
        name: "Compact Travel Toiletry Kit",
        category: "Travel Essentials",
        size: "1 kit",
        price: 299,
        mrp: 399,
        rating: 4.6,
        image: "travel-toiletry-kit.jpg"
    },

    {
        id: 1366,
        name: "Travel Neck Pillow",
        category: "Travel Essentials",
        size: "1 pc",
        price: 399,
        mrp: 499,
        rating: 4.6,
        image: "travel-neck-pillow.jpg"
    },

    {
        id: 1367,
        name: "Foldable Travel Backpack",
        category: "Travel Essentials",
        size: "20 L",
        price: 699,
        mrp: 899,
        rating: 4.7,
        image: "travel-backpack.jpg"
    },

    {
        id: 1368,
        name: "Luggage Organizer Set",
        category: "Travel Essentials",
        size: "6 pcs",
        price: 549,
        mrp: 699,
        rating: 4.6,
        image: "luggage-organizer.jpg"
    },


    /* =========================
       CAR & BIKE ACCESSORIES
    ========================= */

    {
        id: 1369,
        name: "Car Cleaning Microfiber Kit",
        category: "Car & Bike Accessories",
        size: "1 kit",
        price: 249,
        mrp: 299,
        rating: 4.6,
        image: "car-cleaning-kit.jpg"
    },

    {
        id: 1370,
        name: "Car Dashboard Phone Holder",
        category: "Car & Bike Accessories",
        size: "1 pc",
        price: 349,
        mrp: 449,
        rating: 4.5,
        image: "dashboard-phone-holder.jpg"
    },

    {
        id: 1371,
        name: "Car Air Freshener",
        category: "Car & Bike Accessories",
        size: "1 pc",
        price: 149,
        mrp: 199,
        rating: 4.4,
        image: "car-air-freshener.jpg"
    },

    {
        id: 1372,
        name: "Bike Phone Mount",
        category: "Car & Bike Accessories",
        size: "1 pc",
        price: 399,
        mrp: 499,
        rating: 4.6,
        image: "bike-phone-mount.jpg"
    },


    /* =========================
       FITNESS & SPORTS
    ========================= */

    {
        id: 1373,
        name: "Premium Yoga Mat",
        category: "Fitness & Sports",
        size: "6 mm",
        price: 599,
        mrp: 799,
        rating: 4.7,
        image: "yoga-mat.jpg"
    },

    {
        id: 1374,
        name: "Resistance Band Set",
        category: "Fitness & Sports",
        size: "5 pcs",
        price: 449,
        mrp: 599,
        rating: 4.6,
        image: "resistance-bands.jpg"
    },

    {
        id: 1375,
        name: "Adjustable Skipping Rope",
        category: "Fitness & Sports",
        size: "1 pc",
        price: 199,
        mrp: 249,
        rating: 4.5,
        image: "skipping-rope.jpg"
    },

    {
        id: 1376,
        name: "Sports Water Bottle",
        category: "Fitness & Sports",
        size: "750 ml",
        price: 299,
        mrp: 399,
        rating: 4.6,
        image: "sports-water-bottle.jpg"
    },

    {
        id: 1377,
        name: "Hand Grip Strengthener",
        category: "Fitness & Sports",
        size: "1 pc",
        price: 149,
        mrp: 199,
        rating: 4.5,
        image: "hand-grip.jpg"
    },


    /* =========================
       SEASONAL ESSENTIALS
    ========================= */

    {
        id: 1378,
        name: "Compact Umbrella",
        category: "Seasonal Essentials",
        size: "1 pc",
        price: 299,
        mrp: 399,
        rating: 4.5,
        image: "umbrella.jpg"
    },

    {
        id: 1379,
        name: "Reusable Rain Cover",
        category: "Seasonal Essentials",
        size: "1 pc",
        price: 199,
        mrp: 249,
        rating: 4.4,
        image: "rain-cover.jpg"
    },

    {
        id: 1380,
        name: "Insulated Winter Gloves",
        category: "Seasonal Essentials",
        size: "1 pair",
        price: 249,
        mrp: 299,
        rating: 4.5,
        image: "winter-gloves.jpg"
    },

    {
        id: 1381,
        name: "Soft Winter Cap",
        category: "Seasonal Essentials",
        size: "1 pc",
        price: 199,
        mrp: 249,
        rating: 4.5,
        image: "winter-cap.jpg"
    },


    /* =========================
       LIFESTYLE
    ========================= */

    {
        id: 1382,
        name: "Premium Scented Candle",
        category: "Lifestyle",
        size: "1 pc",
        price: 299,
        mrp: 399,
        rating: 4.7,
        image: "scented-candle.jpg"
    },

    {
        id: 1383,
        name: "Minimal Desk Organizer",
        category: "Lifestyle",
        size: "1 pc",
        price: 249,
        mrp: 299,
        rating: 4.6,
        image: "desk-organizer.jpg"
    },

    {
        id: 1384,
        name: "Premium Coffee Tumbler",
        category: "Lifestyle",
        size: "450 ml",
        price: 449,
        mrp: 599,
        rating: 4.7,
        image: "coffee-tumbler.jpg"
    },

    {
        id: 1385,
        name: "Decorative LED String Lights",
        category: "Lifestyle",
        size: "3 m",
        price: 299,
        mrp: 399,
        rating: 4.6,
        image: "led-string-lights.jpg"
    },

    {
        id: 1386,
        name: "Minimal Digital Desk Clock",
        category: "Lifestyle",
        size: "1 pc",
        price: 499,
        mrp: 649,
        rating: 4.6,
        image: "desk-clock.jpg"
    },


    /* =========================
       MISCELLANEOUS
    ========================= */

    {
        id: 1387,
        name: "Premium Multi-Purpose Scissors",
        category: "Miscellaneous",
        size: "1 pc",
        price: 129,
        mrp: 169,
        rating: 4.5,
        image: "multi-purpose-scissors.jpg"
    },

    {
        id: 1388,
        name: "Reusable Zip Storage Bags",
        category: "Miscellaneous",
        size: "10 pcs",
        price: 149,
        mrp: 199,
        rating: 4.5,
        image: "zip-storage-bags.jpg"
    },

    {
        id: 1389,
        name: "Portable LED Torch",
        category: "Miscellaneous",
        size: "1 pc",
        price: 249,
        mrp: 299,
        rating: 4.6,
        image: "led-torch.jpg"
    },

    {
        id: 1390,
        name: "Compact Sewing Kit",
        category: "Miscellaneous",
        size: "1 kit",
        price: 179,
        mrp: 229,
        rating: 4.5,
        image: "sewing-kit.jpg"
    },

    {
        id: 1391,
        name: "Everyday Multi-Utility Kit",
        category: "Miscellaneous",
        size: "1 kit",
        price: 349,
        mrp: 449,
        rating: 4.6,
        image: "utility-kit.jpg"
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");

const resultsCount = document.getElementById("resultsCount");
const productCount = document.getElementById("productCount");

const sortSelect = document.getElementById("sortSelect");

const clearFilters = document.getElementById("clearFilters");
const resetEmptyState = document.getElementById("resetEmptyState");

const activeFilters = document.getElementById("activeFilters");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");

const cartCountElement = document.getElementById("cartCount");

const locationButton = document.getElementById("locationButton");

const mobileFilterButton =
    document.getElementById("mobileFilterButton");

const filtersSidebar =
    document.getElementById("filtersSidebar");

const mobileFilterOverlay =
    document.getElementById("mobileFilterOverlay");


/* =========================================================
   IMAGE FALLBACK
========================================================= */

const fallbackImage =
    "../assets/products/steel-water-bottle.jpg";


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


function formatPrice(value) {

    return `₹${value.toLocaleString("en-IN")}`;

}


function getProductImage(product) {

    return `../assets/products/${product.image}`;

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

        const stored = localStorage.getItem(key);

        if (!stored) continue;

        try {

            const parsed = JSON.parse(stored);

            if (Array.isArray(parsed)) {
                return parsed;
            }

        } catch (error) {

            console.warn("Invalid cart data:", key);

        }

    }

    return [];

}


function saveCart(cart) {

    localStorage.setItem(
        "marteyCart",
        JSON.stringify(cart)
    );

}


function normalizeCartItem(item) {

    const id =
        Number(
            item.id ??
            item.productId ??
            item.productID
        );

    const quantity =
        Number(
            item.quantity ??
            item.qty ??
            1
        );

    return {
        ...item,
        id,
        quantity:
            Number.isFinite(quantity) && quantity > 0
                ? quantity
                : 1
    };

}


function getCartQuantity() {

    const cart = getCart();

    return cart.reduce((total, item) => {

        const normalized = normalizeCartItem(item);

        return total + normalized.quantity;

    }, 0);

}


function updateCartCount() {

    if (!cartCountElement) return;

    cartCountElement.textContent =
        getCartQuantity();

}


function addToCart(product, button) {

    let cart = getCart()
        .map(normalizeCartItem);

    const existingIndex =
        cart.findIndex(
            item => Number(item.id) === product.id
        );


    if (existingIndex >= 0) {

        cart[existingIndex].quantity += 1;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }


    saveCart(cart);

    updateCartCount();


    if (button) {

        button.textContent = "Added";
        button.classList.add("added");

        setTimeout(() => {

            button.textContent = "ADD";
            button.classList.remove("added");

        }, 900);

    }

}


/* =========================================================
   FILTER STATE
========================================================= */

let selectedCategories = [];
let selectedPrices = [];


function getFilteredProducts() {

    let filtered = [...products];


    /* CATEGORY */

    if (selectedCategories.length > 0) {

        filtered = filtered.filter(product =>
            selectedCategories.includes(product.category)
        );

    }


    /* PRICE */

    if (selectedPrices.length > 0) {

        filtered = filtered.filter(product => {

            return selectedPrices.some(range => {

                if (range === "under-250") {
                    return product.price < 250;
                }

                if (range === "250-750") {
                    return product.price >= 250 &&
                           product.price <= 750;
                }

                if (range === "above-750") {
                    return product.price > 750;
                }

                return true;

            });

        });

    }


    /* SORT */

    switch (sortSelect.value) {

        case "low-high":

            filtered.sort(
                (a, b) => a.price - b.price
            );

            break;


        case "high-low":

            filtered.sort(
                (a, b) => b.price - a.price
            );

            break;


        case "discount":

            filtered.sort(
                (a, b) =>
                    getDiscount(b) -
                    getDiscount(a)
            );

            break;


        case "relevance":

        default:

            filtered.sort(
                (a, b) => a.id - b.id
            );

            break;

    }


    return filtered;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const filteredProducts =
        getFilteredProducts();


    productGrid.innerHTML = "";


    resultsCount.textContent =
        filteredProducts.length;

    productCount.textContent =
        filteredProducts.length;


    if (filteredProducts.length === 0) {

        productGrid.style.display = "none";

        emptyState.classList.add("show");

        renderActiveFilters();

        return;

    }


    productGrid.style.display = "grid";

    emptyState.classList.remove("show");


    filteredProducts.forEach(product => {

        const discount =
            getDiscount(product);


        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div
                class="product-image-wrapper"
                data-product-id="${product.id}"
            >

                ${
                    discount > 0
                        ? `
                            <span class="discount-badge">
                                ${discount}% OFF
                            </span>
                        `
                        : ""
                }

                <img
                    class="product-image"
                    src="${getProductImage(product)}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </div>


            <div class="product-content">

                <div class="product-category">
                    ${product.category}
                </div>


                <div
                    class="product-name"
                    data-product-id="${product.id}"
                >
                    ${product.name}
                </div>


                <div class="product-meta">
                    ${product.size}
                </div>


                <div class="product-rating">
                    ★ ${product.rating}
                </div>


                <div class="product-bottom">

                    <div class="price-block">

                        <span class="product-price">
                            ${formatPrice(product.price)}
                        </span>

                        <span class="product-mrp">
                            ${formatPrice(product.mrp)}
                        </span>

                    </div>


                    <button
                        class="add-button"
                        type="button"
                        data-add-id="${product.id}"
                    >
                        ADD
                    </button>

                </div>

            </div>

        `;


        const image =
            card.querySelector(".product-image");


        image.addEventListener(
            "error",
            () => {

                image.src = fallbackImage;

            },
            { once: true }
        );


        const productClickableElements =
            card.querySelectorAll(
                ".product-image-wrapper, .product-name"
            );


        productClickableElements.forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    const id =
                        element.dataset.productId;

                    window.location.href =
                        `/product/${id}`;

                }
            );

        });


        const addButton =
            card.querySelector(".add-button");


        addButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const id =
                    Number(addButton.dataset.addId);

                const selectedProduct =
                    products.find(
                        item => item.id === id
                    );

                if (selectedProduct) {

                    addToCart(
                        selectedProduct,
                        addButton
                    );

                }

            }
        );


        productGrid.appendChild(card);

    });


    renderActiveFilters();

}


/* =========================================================
   FILTER UI
========================================================= */

function renderActiveFilters() {

    activeFilters.innerHTML = "";


    selectedCategories.forEach(category => {

        const chip =
            document.createElement("span");

        chip.className = "filter-chip";

        chip.innerHTML = `
            ${category}
            <button
                type="button"
                data-remove-category="${category}"
                aria-label="Remove ${category} filter"
            >
                ×
            </button>
        `;

        activeFilters.appendChild(chip);

    });


    selectedPrices.forEach(price => {

        let label = price;

        if (price === "under-250") {
            label = "Under ₹250";
        }

        if (price === "250-750") {
            label = "₹250 – ₹750";
        }

        if (price === "above-750") {
            label = "Above ₹750";
        }


        const chip =
            document.createElement("span");

        chip.className = "filter-chip";

        chip.innerHTML = `
            ${label}
            <button
                type="button"
                data-remove-price="${price}"
                aria-label="Remove ${label} filter"
            >
                ×
            </button>
        `;

        activeFilters.appendChild(chip);

    });

}


/* =========================================================
   CATEGORY FILTERS
========================================================= */

document
    .querySelectorAll(".category-filter")
    .forEach(input => {

        input.addEventListener(
            "change",
            () => {

                selectedCategories =
                    Array.from(
                        document.querySelectorAll(
                            ".category-filter:checked"
                        )
                    ).map(
                        checkbox => checkbox.value
                    );


                renderProducts();

            }
        );

    });


/* =========================================================
   PRICE FILTERS
========================================================= */

document
    .querySelectorAll(".price-filter")
    .forEach(input => {

        input.addEventListener(
            "change",
            () => {

                selectedPrices =
                    Array.from(
                        document.querySelectorAll(
                            ".price-filter:checked"
                        )
                    ).map(
                        checkbox => checkbox.value
                    );


                renderProducts();

            }
        );

    });


/* =========================================================
   ACTIVE FILTER REMOVE
========================================================= */

activeFilters.addEventListener(
    "click",
    event => {

        const category =
            event.target.dataset.removeCategory;

        const price =
            event.target.dataset.removePrice;


        if (category) {

            const checkbox =
                document.querySelector(
                    `.category-filter[value="${CSS.escape(category)}"]`
                );

            if (checkbox) {
                checkbox.checked = false;
            }

            selectedCategories =
                selectedCategories.filter(
                    item => item !== category
                );

            renderProducts();

        }


        if (price) {

            const checkbox =
                document.querySelector(
                    `.price-filter[value="${CSS.escape(price)}"]`
                );

            if (checkbox) {
                checkbox.checked = false;
            }

            selectedPrices =
                selectedPrices.filter(
                    item => item !== price
                );

            renderProducts();

        }

    }
);


/* =========================================================
   SORT
========================================================= */

sortSelect.addEventListener(
    "change",
    renderProducts
);


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearAllFilters() {

    selectedCategories = [];
    selectedPrices = [];


    document
        .querySelectorAll(
            ".category-filter, .price-filter"
        )
        .forEach(input => {

            input.checked = false;

        });


    sortSelect.value = "relevance";

    renderProducts();

}


clearFilters.addEventListener(
    "click",
    clearAllFilters
);


resetEmptyState.addEventListener(
    "click",
    clearAllFilters
);


/* =========================================================
   SEARCH
========================================================= */

function getSearchMatches(query) {

    const cleanQuery =
        query.trim().toLowerCase();


    if (!cleanQuery) {
        return [];
    }


    return products
        .filter(product => {

            return (
                product.name.toLowerCase().includes(cleanQuery) ||
                product.category.toLowerCase().includes(cleanQuery) ||
                product.size.toLowerCase().includes(cleanQuery)
            );

        })
        .slice(0, 6);

}


function renderSearchSuggestions(query) {

    const matches =
        getSearchMatches(query);


    searchSuggestions.innerHTML = "";


    if (!query.trim() || matches.length === 0) {

        searchSuggestions.classList.remove("show");

        return;

    }


    matches.forEach(product => {

        const item =
            document.createElement("div");

        item.className = "suggestion-item";


        item.innerHTML = `

            <img
                class="suggestion-image"
                src="${getProductImage(product)}"
                alt="${product.name}"
            >

            <div class="suggestion-info">

                <strong>${product.name}</strong>

                <span>
                    ${product.category} · ${product.size}
                </span>

            </div>

            <span class="suggestion-price">
                ${formatPrice(product.price)}
            </span>

        `;


        const image =
            item.querySelector("img");


        image.addEventListener(
            "error",
            () => {

                image.src = fallbackImage;

            },
            { once: true }
        );


        item.addEventListener(
            "click",
            () => {

                window.location.href =
                    `/product/${product.id}`;

            }
        );


        searchSuggestions.appendChild(item);

    });


    searchSuggestions.classList.add("show");

}


searchInput.addEventListener(
    "input",
    event => {

        renderSearchSuggestions(
            event.target.value
        );

    }
);


searchInput.addEventListener(
    "focus",
    () => {

        if (searchInput.value.trim()) {

            renderSearchSuggestions(
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


        if (!query) return;


        window.location.href =
            `/search?q=${encodeURIComponent(query)}`;

    }
);


document.addEventListener(
    "click",
    event => {

        if (!event.target.closest(".search-wrapper")) {

            searchSuggestions.classList.remove("show");

        }

    }
);


/* =========================================================
   LOCATION
========================================================= */

locationButton.addEventListener(
    "click",
    () => {

        alert(
            "Location selection will be connected to MARTEY's location service in the next development phase."
        );

    }
);


/* =========================================================
   MOBILE FILTER
========================================================= */

function openMobileFilters() {

    filtersSidebar.classList.add("open");

    mobileFilterOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeMobileFilters() {

    filtersSidebar.classList.remove("open");

    mobileFilterOverlay.classList.remove("show");

    document.body.style.overflow = "";

}


mobileFilterButton.addEventListener(
    "click",
    openMobileFilters
);


mobileFilterOverlay.addEventListener(
    "click",
    closeMobileFilters
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMobileFilters();

            searchSuggestions.classList.remove("show");

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateCartCount();

renderProducts();
