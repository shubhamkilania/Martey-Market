const products = [

    {
        id: 1095,
        name: "Power Floor Cleaner",
        category: "Floor & Surface Care",
        size: "1 L",
        price: 119,
        mrp: 145,
        rating: 4.6,
        image: "floor-cleaner.jpg"
    },

    {
        id: 1096,
        name: "Multi Surface Cleaner",
        category: "Cleaning Supplies",
        size: "500 ml",
        price: 99,
        mrp: 120,
        rating: 4.5,
        image: "surface-cleaner.jpg"
    },

    {
        id: 1097,
        name: "Kitchen Dishwash Liquid",
        category: "Dishwashing",
        size: "500 ml",
        price: 89,
        mrp: 105,
        rating: 4.6,
        image: "dishwash-liquid.jpg"
    },

    {
        id: 1098,
        name: "Lemon Dishwash Bar",
        category: "Dishwashing",
        size: "250 g",
        price: 35,
        mrp: 40,
        rating: 4.5,
        image: "dishwash-bar.jpg"
    },

    {
        id: 1099,
        name: "Daily Wash Detergent",
        category: "Laundry",
        size: "1 kg",
        price: 119,
        mrp: 140,
        rating: 4.6,
        image: "detergent.jpg"
    },

    {
        id: 1100,
        name: "Premium Laundry Detergent",
        category: "Laundry",
        size: "2 kg",
        price: 219,
        mrp: 255,
        rating: 4.7,
        image: "premium-detergent.jpg"
    },

    {
        id: 1101,
        name: "Fresh Fabric Softener",
        category: "Laundry",
        size: "860 ml",
        price: 149,
        mrp: 175,
        rating: 4.5,
        image: "fabric-softener.jpg"
    },

    {
        id: 1102,
        name: "Laundry Washing Bar",
        category: "Laundry",
        size: "250 g",
        price: 32,
        mrp: 38,
        rating: 4.4,
        image: "laundry-bar.jpg"
    },

    {
        id: 1103,
        name: "Heavy Duty Garbage Bags",
        category: "Garbage Bags",
        size: "30 bags",
        price: 99,
        mrp: 120,
        rating: 4.5,
        image: "garbage-bags.jpg"
    },

    {
        id: 1104,
        name: "Small Garbage Bags",
        category: "Garbage Bags",
        size: "40 bags",
        price: 69,
        mrp: 85,
        rating: 4.4,
        image: "small-garbage-bags.jpg"
    },

    {
        id: 1105,
        name: "Soft Facial Tissues",
        category: "Tissues & Paper",
        size: "100 pulls",
        price: 75,
        mrp: 90,
        rating: 4.6,
        image: "tissues.jpg"
    },

    {
        id: 1106,
        name: "Kitchen Paper Towels",
        category: "Tissues & Paper",
        size: "2 rolls",
        price: 99,
        mrp: 120,
        rating: 4.5,
        image: "paper-towels.jpg"
    },

    {
        id: 1107,
        name: "Microfiber Cleaning Cloth",
        category: "Home Utility",
        size: "3 pcs",
        price: 79,
        mrp: 95,
        rating: 4.5,
        image: "microfiber-cloth.jpg"
    },

    {
        id: 1108,
        name: "Multi Purpose Scrubbers",
        category: "Home Utility",
        size: "4 pcs",
        price: 59,
        mrp: 70,
        rating: 4.4,
        image: "scrubbers.jpg"
    },

    {
        id: 1109,
        name: "Floor Cleaning Mop",
        category: "Home Utility",
        size: "1 pc",
        price: 199,
        mrp: 249,
        rating: 4.6,
        image: "mop.jpg"
    },

    {
        id: 1110,
        name: "Bathroom Floor Cleaner",
        category: "Bathroom Cleaning",
        size: "1 L",
        price: 125,
        mrp: 150,
        rating: 4.6,
        image: "bathroom-cleaner.jpg"
    },

    {
        id: 1111,
        name: "Toilet Cleaning Liquid",
        category: "Bathroom Cleaning",
        size: "500 ml",
        price: 99,
        mrp: 120,
        rating: 4.6,
        image: "toilet-cleaner.jpg"
    },

    {
        id: 1112,
        name: "Bathroom Cleaning Brush",
        category: "Bathroom Cleaning",
        size: "1 pc",
        price: 89,
        mrp: 110,
        rating: 4.5,
        image: "bathroom-brush.jpg"
    },

    {
        id: 1113,
        name: "Glass & Window Cleaner",
        category: "Cleaning Supplies",
        size: "500 ml",
        price: 109,
        mrp: 130,
        rating: 4.5,
        image: "glass-cleaner.jpg"
    },

    {
        id: 1114,
        name: "Kitchen Surface Cleaner",
        category: "Cleaning Supplies",
        size: "500 ml",
        price: 115,
        mrp: 140,
        rating: 4.6,
        image: "kitchen-cleaner.jpg"
    },

    {
        id: 1115,
        name: "Steel Scrub Pads",
        category: "Dishwashing",
        size: "3 pcs",
        price: 45,
        mrp: 55,
        rating: 4.4,
        image: "steel-scrub.jpg"
    },

    {
        id: 1116,
        name: "Dishwashing Scrub Sponge",
        category: "Dishwashing",
        size: "5 pcs",
        price: 49,
        mrp: 60,
        rating: 4.5,
        image: "dishwash-sponge.jpg"
    },

    {
        id: 1117,
        name: "Dustpan & Brush Set",
        category: "Home Utility",
        size: "1 set",
        price: 129,
        mrp: 155,
        rating: 4.5,
        image: "dustpan.jpg"
    },

    {
        id: 1118,
        name: "Bathroom Cleaning Gloves",
        category: "Bathroom Cleaning",
        size: "1 pair",
        price: 69,
        mrp: 85,
        rating: 4.4,
        image: "cleaning-gloves.jpg"
    }

];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");

const sortSelect = document.getElementById("sortSelect");

const categoryFilters =
    document.querySelectorAll(".category-filter");

const priceFilters =
    document.querySelectorAll(".price-filter");

const clearFiltersButton =
    document.getElementById("clearFilters");

const emptyClearButton =
    document.getElementById("emptyClearButton");

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const searchSuggestions =
    document.getElementById("searchSuggestions");

const locationButton =
    document.getElementById("locationButton");

const cartCount =
    document.getElementById("cartCount");

const filterSidebar =
    document.getElementById("filterSidebar");

const filterOverlay =
    document.getElementById("filterOverlay");

const openFilterButton =
    document.getElementById("openFilter");

const closeFilterButton =
    document.getElementById("closeFilter");


/* =========================================================
   IMAGE FALLBACK
========================================================= */

const fallbackImage = "../assets/products/floor-cleaner.jpg";


function handleImageError(image) {

    if (image.dataset.fallbackApplied) {
        return;
    }

    image.dataset.fallbackApplied = "true";
    image.src = fallbackImage;
}


/* =========================================================
   DISCOUNT
========================================================= */

function getDiscount(product) {

    if (!product.mrp || product.mrp <= product.price) {
        return 0;
    }

    return Math.round(
        ((product.mrp - product.price) / product.mrp) * 100
    );
}


/* =========================================================
   CART HELPERS
========================================================= */

function getCart() {

    const possibleKeys = [
        "marteyCart",
        "cart",
        "MARTEY_CART"
    ];

    for (const key of possibleKeys) {

        try {

            const raw = localStorage.getItem(key);

            if (!raw) {
                continue;
            }

            const parsed = JSON.parse(raw);

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
            console.warn("Could not read cart:", error);
        }
    }

    return [];
}


function normalizeCartItem(item) {

    if (typeof item === "number") {
        return {
            id: item,
            quantity: 1
        };
    }

    if (!item || typeof item !== "object") {
        return null;
    }

    const id =
        item.id ??
        item.productId ??
        item.productID;

    const quantity =
        Number(
            item.quantity ??
            item.qty ??
            1
        );

    if (id === undefined) {
        return null;
    }

    return {
        id: Number(id),
        quantity: quantity > 0 ? quantity : 1
    };
}


function saveCart(cart) {

    localStorage.setItem(
        "marteyCart",
        JSON.stringify(cart)
    );
}


function getCartItemCount() {

    const cart = getCart();

    return cart.reduce((total, item) => {

        const normalized = normalizeCartItem(item);

        return total + (
            normalized
                ? normalized.quantity
                : 0
        );

    }, 0);
}


function updateCartCount() {

    if (!cartCount) {
        return;
    }

    cartCount.textContent = getCartItemCount();
}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId, button) {

    let cart = getCart()
        .map(normalizeCartItem)
        .filter(Boolean);

    const existing = cart.find(
        item => item.id === productId
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    saveCart(cart);

    updateCartCount();

    if (button) {

        const originalText =
            button.textContent;

        button.textContent = "Added ✓";
        button.classList.add("added");

        setTimeout(() => {

            button.textContent = originalText;
            button.classList.remove("added");

        }, 900);
    }
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const discount = getDiscount(product);

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

        <div
            class="product-image-wrapper"
            data-product-id="${product.id}"
        >

            ${
                discount > 0
                    ? `<span class="discount-badge">${discount}% OFF</span>`
                    : ""
            }

            <img
                class="product-image"
                src="../assets/products/${product.image}"
                alt="${product.name}"
                loading="lazy"
                onerror="handleImageError(this)"
            >

        </div>


        <div class="product-body">

            <span class="product-category">
                ${product.category}
            </span>

            <h3
                class="product-name"
                data-product-id="${product.id}"
            >
                ${product.name}
            </h3>

            <span class="product-meta">
                ${product.size}
            </span>

            <span class="product-rating">
                <span class="rating-star">★</span>
                ${product.rating}
            </span>

            <div class="price-row">

                <span class="product-price">
                    ₹${product.price}
                </span>

                <span class="product-mrp">
                    ₹${product.mrp}
                </span>

            </div>

            <button
                class="add-button"
                type="button"
                data-add-id="${product.id}"
            >
                Add
            </button>

        </div>
    `;

    return card;
}


/* =========================================================
   OPEN PRODUCT
========================================================= */

function openProduct(productId) {

    window.location.href =
        `/product/${productId}`;
}


/* =========================================================
   ACTIVE FILTERS
========================================================= */

function getSelectedCategories() {

    return Array.from(categoryFilters)
        .filter(input => input.checked)
        .map(input => input.value);
}


function getSelectedPrices() {

    return Array.from(priceFilters)
        .filter(input => input.checked)
        .map(input => input.value);
}


/* =========================================================
   PRICE FILTER
========================================================= */

function matchesPriceFilter(product, selectedPrices) {

    if (selectedPrices.length === 0) {
        return true;
    }

    return selectedPrices.some(filter => {

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

        return false;
    });
}


/* =========================================================
   FILTER + SORT
========================================================= */

function getFilteredProducts() {

    const selectedCategories =
        getSelectedCategories();

    const selectedPrices =
        getSelectedPrices();

    let filtered = [...products];

    /* CATEGORY */

    if (selectedCategories.length > 0) {

        filtered = filtered.filter(product =>
            selectedCategories.includes(
                product.category
            )
        );
    }


    /* PRICE */

    filtered = filtered.filter(product =>
        matchesPriceFilter(
            product,
            selectedPrices
        )
    );


    /* SEARCH */

    const query =
        searchInput.value.trim().toLowerCase();

    if (query) {

        filtered = filtered.filter(product => {

            const searchableText = `
                ${product.name}
                ${product.category}
                ${product.size}
            `.toLowerCase();

            return searchableText.includes(query);
        });
    }


    /* SORT */

    const sortValue =
        sortSelect.value;

    if (sortValue === "low-high") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    } else if (sortValue === "high-low") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    } else if (sortValue === "discount") {

        filtered.sort(
            (a, b) =>
                getDiscount(b) -
                getDiscount(a)
        );
    }

    return filtered;
}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const filtered =
        getFilteredProducts();

    productGrid.innerHTML = "";

    if (filtered.length === 0) {

        emptyState.classList.add("show");

        resultsCount.textContent =
            "No products found";

        return;
    }

    emptyState.classList.remove("show");


    filtered.forEach(product => {

        productGrid.appendChild(
            createProductCard(product)
        );

    });


    resultsCount.textContent =
        `${filtered.length} household product${filtered.length === 1 ? "" : "s"}`;
}


/* =========================================================
   SEARCH SUGGESTIONS
========================================================= */

function showSearchSuggestions() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();

    if (!query) {

        searchSuggestions.classList.remove("show");
        searchSuggestions.innerHTML = "";

        return;
    }


    const matches =
        products
            .filter(product => {

                const text = `
                    ${product.name}
                    ${product.category}
                    ${product.size}
                `.toLowerCase();

                return text.includes(query);
            })
            .slice(0, 6);


    if (matches.length === 0) {

        searchSuggestions.classList.remove("show");
        searchSuggestions.innerHTML = "";

        return;
    }


    searchSuggestions.innerHTML =
        matches.map(product => {

            return `

                <div
                    class="suggestion-item"
                    data-product-id="${product.id}"
                >

                    <img
                        class="suggestion-image"
                        src="../assets/products/${product.image}"
                        alt="${product.name}"
                        onerror="handleImageError(this)"
                    >

                    <div class="suggestion-info">

                        <strong>
                            ${product.name}
                        </strong>

                        <span>
                            ${product.category} · ${product.size}
                        </span>

                    </div>

                    <span class="suggestion-price">
                        ₹${product.price}
                    </span>

                </div>

            `;

        }).join("");


    searchSuggestions.classList.add("show");
}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearAllFilters() {

    categoryFilters.forEach(
        input => input.checked = false
    );

    priceFilters.forEach(
        input => input.checked = false
    );

    searchInput.value = "";

    sortSelect.value = "relevance";

    renderProducts();

    searchSuggestions.classList.remove("show");
    searchSuggestions.innerHTML = "";
}


/* =========================================================
   FILTER DRAWER
========================================================= */

function openFilterDrawer() {

    filterSidebar.classList.add("open");
    filterOverlay.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeFilterDrawer() {

    filterSidebar.classList.remove("open");
    filterOverlay.classList.remove("show");

    document.body.style.overflow = "";
}


/* =========================================================
   EVENTS
========================================================= */


/* Filter changes */

categoryFilters.forEach(input => {

    input.addEventListener(
        "change",
        renderProducts
    );

});


priceFilters.forEach(input => {

    input.addEventListener(
        "change",
        renderProducts
    );

});


/* Sort */

sortSelect.addEventListener(
    "change",
    renderProducts
);


/* Search typing */

searchInput.addEventListener(
    "input",
    () => {

        showSearchSuggestions();
        renderProducts();

    }
);


/* Search submit */

searchForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const query =
            searchInput.value.trim();

        if (!query) {
            return;
        }

        window.location.href =
            `/search?q=${encodeURIComponent(query)}`;
    }
);


/* Product clicks + add buttons */

productGrid.addEventListener(
    "click",
    event => {

        const addButton =
            event.target.closest(
                "[data-add-id]"
            );

        if (addButton) {

            const productId =
                Number(
                    addButton.dataset.addId
                );

            addToCart(
                productId,
                addButton
            );

            return;
        }


        const productTarget =
            event.target.closest(
                "[data-product-id]"
            );

        if (productTarget) {

            const productId =
                Number(
                    productTarget.dataset.productId
                );

            openProduct(productId);
        }

    }
);


/* Suggestions */

searchSuggestions.addEventListener(
    "click",
    event => {

        const item =
            event.target.closest(
                ".suggestion-item"
            );

        if (!item) {
            return;
        }

        const productId =
            Number(
                item.dataset.productId
            );

        openProduct(productId);

    }
);


/* Clear */

clearFiltersButton.addEventListener(
    "click",
    clearAllFilters
);


emptyClearButton.addEventListener(
    "click",
    clearAllFilters
);


/* Location */

locationButton.addEventListener(
    "click",
    () => {

        alert(
            "Location selection will be connected with MARTEY location services later."
        );

    }
);


/* Filter drawer */

openFilterButton.addEventListener(
    "click",
    openFilterDrawer
);


closeFilterButton.addEventListener(
    "click",
    closeFilterDrawer
);


filterOverlay.addEventListener(
    "click",
    closeFilterDrawer
);


/* Close suggestions */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".search-wrapper"
            )
        ) {

            searchSuggestions.classList.remove(
                "show"
            );
        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateCartCount();
renderProducts();


/* Keep cart count updated if another MARTEY page
   changes localStorage in another tab */

window.addEventListener(
    "storage",
    event => {

        if (
            event.key === "marteyCart" ||
            event.key === "cart" ||
            event.key === "MARTEY_CART"
        ) {

            updateCartCount();
        }

    }
);

