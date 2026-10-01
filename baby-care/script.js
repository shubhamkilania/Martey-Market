const products = [

    /* DIAPERS */

    {
        id: 1119,
        name: "Baby Soft Diapers",
        category: "Diapers",
        size: "M, 24 pcs",
        price: 299,
        mrp: 349,
        rating: 4.6,
        image: "baby-diapers.jpg"
    },

    {
        id: 1120,
        name: "Comfort Care Baby Diapers",
        category: "Diapers",
        size: "L, 22 pcs",
        price: 319,
        mrp: 379,
        rating: 4.7,
        image: "comfort-diapers.jpg"
    },

    {
        id: 1121,
        name: "Newborn Baby Diapers",
        category: "Diapers",
        size: "NB, 24 pcs",
        price: 279,
        mrp: 325,
        rating: 4.6,
        image: "newborn-diapers.jpg"
    },

    {
        id: 1122,
        name: "Pants Style Baby Diapers",
        category: "Diapers",
        size: "XL, 20 pcs",
        price: 349,
        mrp: 399,
        rating: 4.7,
        image: "pants-diapers.jpg"
    },


    /* BABY WIPES */

    {
        id: 1123,
        name: "Gentle Baby Wipes",
        category: "Baby Wipes",
        size: "72 wipes",
        price: 99,
        mrp: 120,
        rating: 4.6,
        image: "baby-wipes.jpg"
    },

    {
        id: 1124,
        name: "Sensitive Baby Wipes",
        category: "Baby Wipes",
        size: "80 wipes",
        price: 129,
        mrp: 155,
        rating: 4.7,
        image: "sensitive-wipes.jpg"
    },

    {
        id: 1125,
        name: "Soft Cotton Baby Wipes",
        category: "Baby Wipes",
        size: "120 wipes",
        price: 169,
        mrp: 199,
        rating: 4.6,
        image: "cotton-wipes.jpg"
    },


    /* BABY BATH & BODY */

    {
        id: 1126,
        name: "Gentle Baby Body Wash",
        category: "Baby Bath & Body",
        size: "200 ml",
        price: 179,
        mrp: 215,
        rating: 4.7,
        image: "baby-body-wash.jpg"
    },

    {
        id: 1127,
        name: "Mild Baby Soap",
        category: "Baby Bath & Body",
        size: "4 × 75 g",
        price: 139,
        mrp: 165,
        rating: 4.6,
        image: "baby-soap.jpg"
    },

    {
        id: 1128,
        name: "Baby Shampoo",
        category: "Baby Bath & Body",
        size: "200 ml",
        price: 159,
        mrp: 190,
        rating: 4.6,
        image: "baby-shampoo.jpg"
    },

    {
        id: 1129,
        name: "Gentle Baby Bath Wash",
        category: "Baby Bath & Body",
        size: "400 ml",
        price: 259,
        mrp: 299,
        rating: 4.7,
        image: "baby-bath-wash.jpg"
    },


    /* BABY SKIN CARE */

    {
        id: 1130,
        name: "Baby Soft Lotion",
        category: "Baby Skin Care",
        size: "200 ml",
        price: 189,
        mrp: 225,
        rating: 4.7,
        image: "baby-lotion.jpg"
    },

    {
        id: 1131,
        name: "Baby Moisturizing Cream",
        category: "Baby Skin Care",
        size: "100 g",
        price: 149,
        mrp: 180,
        rating: 4.6,
        image: "baby-cream.jpg"
    },

    {
        id: 1132,
        name: "Baby Massage Oil",
        category: "Baby Skin Care",
        size: "200 ml",
        price: 199,
        mrp: 235,
        rating: 4.6,
        image: "baby-massage-oil.jpg"
    },

    {
        id: 1133,
        name: "Baby Powder",
        category: "Baby Skin Care",
        size: "200 g",
        price: 169,
        mrp: 195,
        rating: 4.5,
        image: "baby-powder.jpg"
    },


    /* BABY HAIR CARE */

    {
        id: 1134,
        name: "Soft Baby Hair Oil",
        category: "Baby Hair Care",
        size: "100 ml",
        price: 99,
        mrp: 120,
        rating: 4.5,
        image: "baby-hair-oil.jpg"
    },

    {
        id: 1135,
        name: "Gentle Baby Comb",
        category: "Baby Hair Care",
        size: "1 pc",
        price: 69,
        mrp: 85,
        rating: 4.5,
        image: "baby-comb.jpg"
    },

    {
        id: 1136,
        name: "Soft Baby Hair Brush",
        category: "Baby Hair Care",
        size: "1 pc",
        price: 89,
        mrp: 110,
        rating: 4.6,
        image: "baby-hair-brush.jpg"
    },


    /* FEEDING ESSENTIALS */

    {
        id: 1137,
        name: "Baby Feeding Bottle",
        category: "Feeding Essentials",
        size: "250 ml",
        price: 179,
        mrp: 210,
        rating: 4.5,
        image: "feeding-bottle.jpg"
    },

    {
        id: 1138,
        name: "Baby Feeding Spoon Set",
        category: "Feeding Essentials",
        size: "2 pcs",
        price: 99,
        mrp: 120,
        rating: 4.5,
        image: "feeding-spoons.jpg"
    },

    {
        id: 1139,
        name: "Baby Feeding Bowl",
        category: "Feeding Essentials",
        size: "1 pc",
        price: 119,
        mrp: 145,
        rating: 4.5,
        image: "feeding-bowl.jpg"
    },

    {
        id: 1140,
        name: "Baby Bibs",
        category: "Feeding Essentials",
        size: "3 pcs",
        price: 149,
        mrp: 180,
        rating: 4.6,
        image: "baby-bibs.jpg"
    },


    /* BABY ACCESSORIES */

    {
        id: 1141,
        name: "Soft Baby Washcloths",
        category: "Baby Accessories",
        size: "3 pcs",
        price: 99,
        mrp: 120,
        rating: 4.5,
        image: "baby-washcloths.jpg"
    },

    {
        id: 1142,
        name: "Baby Cotton Towels",
        category: "Baby Accessories",
        size: "2 pcs",
        price: 229,
        mrp: 275,
        rating: 4.6,
        image: "baby-towels.jpg"
    },

    {
        id: 1143,
        name: "Baby Storage Container Set",
        category: "Baby Accessories",
        size: "3 pcs",
        price: 199,
        mrp: 240,
        rating: 4.5,
        image: "baby-storage.jpg"
    },


    /* BABY LAUNDRY */

    {
        id: 1144,
        name: "Gentle Baby Laundry Detergent",
        category: "Baby Laundry",
        size: "1 L",
        price: 199,
        mrp: 235,
        rating: 4.7,
        image: "baby-detergent.jpg"
    },

    {
        id: 1145,
        name: "Baby Fabric Softener",
        category: "Baby Laundry",
        size: "800 ml",
        price: 179,
        mrp: 215,
        rating: 4.6,
        image: "baby-softener.jpg"
    },

    {
        id: 1146,
        name: "Baby Laundry Wash",
        category: "Baby Laundry",
        size: "500 ml",
        price: 149,
        mrp: 180,
        rating: 4.5,
        image: "baby-laundry-wash.jpg"
    }

];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const productGrid =
    document.getElementById("productGrid");

const emptyState =
    document.getElementById("emptyState");

const resultsCount =
    document.getElementById("resultsCount");

const sortSelect =
    document.getElementById("sortSelect");

const categoryFilters =
    document.querySelectorAll(
        ".category-filter"
    );

const priceFilters =
    document.querySelectorAll(
        ".price-filter"
    );

const clearFiltersButton =
    document.getElementById("clearFilters");

const emptyClearButton =
    document.getElementById(
        "emptyClearButton"
    );

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const searchSuggestions =
    document.getElementById(
        "searchSuggestions"
    );

const locationButton =
    document.getElementById(
        "locationButton"
    );

const cartCount =
    document.getElementById("cartCount");

const filterSidebar =
    document.getElementById(
        "filterSidebar"
    );

const filterOverlay =
    document.getElementById(
        "filterOverlay"
    );

const openFilterButton =
    document.getElementById(
        "openFilter"
    );

const closeFilterButton =
    document.getElementById(
        "closeFilter"
    );


/* =========================================================
   IMAGE FALLBACK
========================================================= */

const fallbackImage =
    "../assets/products/baby-wipes.jpg";


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

    if (
        !product.mrp ||
        product.mrp <= product.price
    ) {
        return 0;
    }

    return Math.round(
        (
            (product.mrp - product.price) /
            product.mrp
        ) * 100
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

            const raw =
                localStorage.getItem(key);

            if (!raw) {
                continue;
            }

            const parsed =
                JSON.parse(raw);

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
                "Could not read cart:",
                error
            );

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

    if (
        !item ||
        typeof item !== "object"
    ) {
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
        quantity:
            quantity > 0
                ? quantity
                : 1
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

    return cart.reduce(
        (total, item) => {

            const normalized =
                normalizeCartItem(item);

            return total + (
                normalized
                    ? normalized.quantity
                    : 0
            );

        },
        0
    );
}


function updateCartCount() {

    if (!cartCount) {
        return;
    }

    cartCount.textContent =
        getCartItemCount();
}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(
    productId,
    button
) {

    let cart =
        getCart()
            .map(normalizeCartItem)
            .filter(Boolean);

    const existing =
        cart.find(
            item =>
                item.id === productId
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

        button.textContent =
            "Added ✓";

        button.classList.add("added");


        setTimeout(() => {

            button.textContent =
                originalText;

            button.classList.remove(
                "added"
            );

        }, 900);
    }
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const discount =
        getDiscount(product);

    const card =
        document.createElement("article");

    card.className =
        "product-card";


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

                <span class="rating-star">
                    ★
                </span>

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
   SELECTED FILTERS
========================================================= */

function getSelectedCategories() {

    return Array.from(
        categoryFilters
    )
        .filter(
            input => input.checked
        )
        .map(
            input => input.value
        );
}


function getSelectedPrices() {

    return Array.from(
        priceFilters
    )
        .filter(
            input => input.checked
        )
        .map(
            input => input.value
        );
}


/* =========================================================
   PRICE FILTER
========================================================= */

function matchesPriceFilter(
    product,
    selectedPrices
) {

    if (
        selectedPrices.length === 0
    ) {
        return true;
    }

    return selectedPrices.some(
        filter => {

            if (
                filter === "under100"
            ) {
                return product.price < 100;
            }

            if (
                filter === "100to250"
            ) {
                return (
                    product.price >= 100 &&
                    product.price <= 250
                );
            }

            if (
                filter === "above250"
            ) {
                return product.price > 250;
            }

            return false;
        }
    );
}


/* =========================================================
   FILTER + SORT
========================================================= */

function getFilteredProducts() {

    const selectedCategories =
        getSelectedCategories();

    const selectedPrices =
        getSelectedPrices();

    let filtered =
        [...products];


    /* CATEGORY */

    if (
        selectedCategories.length > 0
    ) {

        filtered =
            filtered.filter(
                product =>
                    selectedCategories.includes(
                        product.category
                    )
            );

    }


    /* PRICE */

    filtered =
        filtered.filter(
            product =>
                matchesPriceFilter(
                    product,
                    selectedPrices
                )
        );


    /* SEARCH */

    const query =
        searchInput.value
            .trim()
            .toLowerCase();

    if (query) {

        filtered =
            filtered.filter(
                product => {

                    const searchableText = `
                        ${product.name}
                        ${product.category}
                        ${product.size}
                    `.toLowerCase();

                    return searchableText.includes(
                        query
                    );
                }
            );

    }


    /* SORT */

    const sortValue =
        sortSelect.value;


    if (
        sortValue === "low-high"
    ) {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    } else if (
        sortValue === "high-low"
    ) {

        filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    } else if (
        sortValue === "discount"
    ) {

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


    if (
        filtered.length === 0
    ) {

        emptyState.classList.add(
            "show"
        );

        resultsCount.textContent =
            "No products found";

        return;
    }


    emptyState.classList.remove(
        "show"
    );


    filtered.forEach(
        product => {

            productGrid.appendChild(
                createProductCard(product)
            );

        }
    );


    resultsCount.textContent =
        `${filtered.length} baby care product${
            filtered.length === 1
                ? ""
                : "s"
        }`;
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

        searchSuggestions.classList.remove(
            "show"
        );

        searchSuggestions.innerHTML =
            "";

        return;
    }


    const matches =
        products
            .filter(
                product => {

                    const text = `
                        ${product.name}
                        ${product.category}
                        ${product.size}
                    `.toLowerCase();

                    return text.includes(
                        query
                    );
                }
            )
            .slice(0, 6);


    if (
        matches.length === 0
    ) {

        searchSuggestions.classList.remove(
            "show"
        );

        searchSuggestions.innerHTML =
            "";

        return;
    }


    searchSuggestions.innerHTML =
        matches
            .map(
                product => `

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
                                ${product.category}
                                ·
                                ${product.size}
                            </span>

                        </div>

                        <span class="suggestion-price">
                            ₹${product.price}
                        </span>

                    </div>

                `
            )
            .join("");


    searchSuggestions.classList.add(
        "show"
    );
}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearAllFilters() {

    categoryFilters.forEach(
        input =>
            input.checked = false
    );

    priceFilters.forEach(
        input =>
            input.checked = false
    );

    searchInput.value = "";

    sortSelect.value =
        "relevance";

    renderProducts();


    searchSuggestions.classList.remove(
        "show"
    );

    searchSuggestions.innerHTML =
        "";
}


/* =========================================================
   FILTER DRAWER
========================================================= */

function openFilterDrawer() {

    filterSidebar.classList.add(
        "open"
    );

    filterOverlay.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";
}


function closeFilterDrawer() {

    filterSidebar.classList.remove(
        "open"
    );

    filterOverlay.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";
}


/* =========================================================
   EVENTS
========================================================= */


/* Category filters */

categoryFilters.forEach(
    input => {

        input.addEventListener(
            "change",
            renderProducts
        );

    }
);


/* Price filters */

priceFilters.forEach(
    input => {

        input.addEventListener(
            "change",
            renderProducts
        );

    }
);


/* Sort */

sortSelect.addEventListener(
    "change",
    renderProducts
);


/* Search */

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
            `/search?q=${encodeURIComponent(
                query
            )}`;

    }
);


/* Product grid */

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


/* Search suggestions */

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


/* Clear filters */

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


/* Mobile filter */

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


/* Close search suggestions */

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


/* Keep cart count synchronized */

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

