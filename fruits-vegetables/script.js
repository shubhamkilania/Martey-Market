const products = [

    /* ---------------- FRUITS ---------------- */

    {
        id: 1052,
        name: "Fresh Red Apples",
        category: "Fruits",
        size: "1 kg",
        price: 149,
        mrp: 175,
        rating: 4.7,
        image: "../assets/products/apple.jpg"
    },

    {
        id: 1053,
        name: "Fresh Bananas",
        category: "Fruits",
        size: "1 dozen",
        price: 55,
        mrp: 65,
        rating: 4.6,
        image: "../assets/products/banana.jpg"
    },

    {
        id: 1054,
        name: "Fresh Oranges",
        category: "Fruits",
        size: "1 kg",
        price: 85,
        mrp: 100,
        rating: 4.6,
        image: "../assets/products/orange.jpg"
    },

    {
        id: 1055,
        name: "Fresh Alphonso Mangoes",
        category: "Fruits",
        size: "1 kg",
        price: 199,
        mrp: 240,
        rating: 4.8,
        image: "../assets/products/mango.jpg"
    },

    {
        id: 1056,
        name: "Fresh Green Grapes",
        category: "Fruits",
        size: "500 g",
        price: 75,
        mrp: 90,
        rating: 4.5,
        image: "../assets/products/grapes.jpg"
    },

    {
        id: 1057,
        name: "Fresh Watermelon",
        category: "Fruits",
        size: "1 pc",
        price: 79,
        mrp: 95,
        rating: 4.5,
        image: "../assets/products/watermelon.jpg"
    },


    /* ---------------- VEGETABLES ---------------- */

    {
        id: 1058,
        name: "Fresh Potatoes",
        category: "Vegetables",
        size: "1 kg",
        price: 39,
        mrp: 45,
        rating: 4.5,
        image: "../assets/products/potato.jpg"
    },

    {
        id: 1059,
        name: "Fresh Tomatoes",
        category: "Vegetables",
        size: "1 kg",
        price: 49,
        mrp: 60,
        rating: 4.6,
        image: "../assets/products/tomato.jpg"
    },

    {
        id: 1060,
        name: "Fresh Onions",
        category: "Vegetables",
        size: "1 kg",
        price: 45,
        mrp: 55,
        rating: 4.5,
        image: "../assets/products/onion.jpg"
    },

    {
        id: 1061,
        name: "Fresh Carrots",
        category: "Vegetables",
        size: "500 g",
        price: 38,
        mrp: 45,
        rating: 4.5,
        image: "../assets/products/carrot.jpg"
    },

    {
        id: 1062,
        name: "Fresh Green Capsicum",
        category: "Vegetables",
        size: "500 g",
        price: 59,
        mrp: 70,
        rating: 4.4,
        image: "../assets/products/capsicum.jpg"
    },

    {
        id: 1063,
        name: "Fresh Cucumbers",
        category: "Vegetables",
        size: "500 g",
        price: 35,
        mrp: 42,
        rating: 4.5,
        image: "../assets/products/cucumber.jpg"
    },


    /* ---------------- LEAFY GREENS ---------------- */

    {
        id: 1064,
        name: "Fresh Spinach",
        category: "Leafy Greens",
        size: "250 g",
        price: 25,
        mrp: 30,
        rating: 4.5,
        image: "../assets/products/spinach.jpg"
    },

    {
        id: 1065,
        name: "Fresh Coriander Leaves",
        category: "Leafy Greens",
        size: "100 g",
        price: 20,
        mrp: 25,
        rating: 4.6,
        image: "../assets/products/coriander.jpg"
    },


    /* ---------------- HERBS ---------------- */

    {
        id: 1066,
        name: "Fresh Mint Leaves",
        category: "Herbs",
        size: "100 g",
        price: 20,
        mrp: 25,
        rating: 4.5,
        image: "../assets/products/mint.jpg"
    },

    {
        id: 1067,
        name: "Fresh Curry Leaves",
        category: "Herbs",
        size: "50 g",
        price: 15,
        mrp: 20,
        rating: 4.4,
        image: "../assets/products/curry-leaves.jpg"
    },


    /* ---------------- EXOTIC FRUITS ---------------- */

    {
        id: 1068,
        name: "Premium Kiwi",
        category: "Exotic Fruits",
        size: "3 pcs",
        price: 129,
        mrp: 150,
        rating: 4.7,
        image: "../assets/products/kiwi.jpg"
    },

    {
        id: 1069,
        name: "Premium Dragon Fruit",
        category: "Exotic Fruits",
        size: "1 pc",
        price: 99,
        mrp: 120,
        rating: 4.7,
        image: "../assets/products/dragon-fruit.jpg"
    },


    /* ---------------- EXOTIC VEGETABLES ---------------- */

    {
        id: 1070,
        name: "Fresh Broccoli",
        category: "Exotic Vegetables",
        size: "500 g",
        price: 89,
        mrp: 110,
        rating: 4.6,
        image: "../assets/products/broccoli.jpg"
    },

    {
        id: 1071,
        name: "Fresh Zucchini",
        category: "Exotic Vegetables",
        size: "500 g",
        price: 95,
        mrp: 120,
        rating: 4.5,
        image: "../assets/products/zucchini.jpg"
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");

const resultCount = document.getElementById("resultCount");
const mobileResultCount = document.getElementById("mobileResultCount");

const sortSelect = document.getElementById("sortSelect");

const clearFiltersButton = document.getElementById("clearFilters");
const emptyClearButton = document.getElementById("emptyClearButton");

const filterButton = document.getElementById("filterButton");
const filterSidebar = document.getElementById("filterSidebar");
const filterOverlay = document.getElementById("filterOverlay");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const locationButton = document.getElementById("locationButton");
const cartCount = document.getElementById("cartCount");


/* =========================================================
   STATE
========================================================= */

let filteredProducts = [...products];


/* =========================================================
   CART
========================================================= */

function getCart() {
    try {
        const possibleKeys = [
            "marteyCart",
            "cart",
            "MARTEY_CART"
        ];

        for (const key of possibleKeys) {
            const saved = localStorage.getItem(key);

            if (!saved) {
                continue;
            }

            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                return parsed;
            }
        }

        return [];

    } catch (error) {
        console.error("Cart read error:", error);
        return [];
    }
}


function saveCart(cart) {
    localStorage.setItem(
        "marteyCart",
        JSON.stringify(cart)
    );
}


function getCartItemId(item) {
    return Number(
        item.id ??
        item.productId ??
        item.productID
    );
}


function getCartItemQuantity(item) {
    return Number(
        item.quantity ??
        item.qty ??
        1
    );
}


function updateCartCount() {

    const cart = getCart();

    const totalQuantity = cart.reduce(
        (total, item) => {
            return total + getCartItemQuantity(item);
        },
        0
    );

    cartCount.textContent = totalQuantity;
}


function addToCart(productId) {

    const cart = getCart();

    const existingIndex = cart.findIndex(
        item => getCartItemId(item) === Number(productId)
    );

    if (existingIndex !== -1) {

        const existingQuantity =
            getCartItemQuantity(cart[existingIndex]);

        cart[existingIndex].quantity =
            existingQuantity + 1;

    } else {

        cart.push({
            id: Number(productId),
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
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
   IMAGE FALLBACK
========================================================= */

function imageFallback(image) {

    image.onerror = function () {

        if (!this.dataset.fallbackApplied) {

            this.dataset.fallbackApplied = "true";

            this.src =
                "../assets/products/apple.jpg";
        }
    };
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const discount = getDiscount(product);

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

        ${
            discount > 0
                ? `
                    <span class="discount-badge">
                        ${discount}% OFF
                    </span>
                `
                : ""
        }

        <a
            href="/product/${product.id}"
            class="product-image-link"
            aria-label="${product.name}"
        >
            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >
        </a>

        <div class="product-info">

            <div class="product-category">
                ${product.category}
            </div>

            <a
                href="/product/${product.id}"
                class="product-name"
            >
                ${product.name}
            </a>

            <div class="product-size">
                ${product.size}
            </div>

            <div class="product-rating">
                <span class="rating-star">★</span>
                <span class="rating-value">
                    ${product.rating}
                </span>
            </div>

            <div class="product-price-row">

                <strong class="product-price">
                    ₹${product.price}
                </strong>

                ${
                    product.mrp > product.price
                        ? `
                            <span class="product-mrp">
                                ₹${product.mrp}
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

    const image = card.querySelector(".product-image");

    imageFallback(image);

    const addButton = card.querySelector(".add-button");

    addButton.addEventListener("click", function () {

        addToCart(product.id);

        this.textContent = "Added to Cart";
        this.classList.add("added");

        setTimeout(() => {
            this.textContent = "Add to Cart";
            this.classList.remove("added");
        }, 900);
    });

    return card;
}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    productGrid.innerHTML = "";

    resultCount.textContent =
        `${filteredProducts.length} products`;

    mobileResultCount.textContent =
        `${filteredProducts.length} products`;

    if (filteredProducts.length === 0) {

        productGrid.style.display = "none";
        emptyState.hidden = false;

        return;
    }

    productGrid.style.display = "grid";
    emptyState.hidden = true;

    filteredProducts.forEach(product => {

        const card = createProductCard(product);

        productGrid.appendChild(card);
    });
}


/* =========================================================
   FILTERS
========================================================= */

function getSelectedValues(name) {

    return Array.from(
        document.querySelectorAll(
            `input[name="${name}"]:checked`
        )
    ).map(input => input.value);
}


function applyFilters() {

    const selectedCategories =
        getSelectedValues("category");

    const selectedPrices =
        getSelectedValues("price");


    filteredProducts = products.filter(product => {

        /* CATEGORY */

        if (
            selectedCategories.length > 0 &&
            !selectedCategories.includes(product.category)
        ) {
            return false;
        }


        /* PRICE */

        if (selectedPrices.length > 0) {

            const matchesPrice =
                selectedPrices.some(range => {

                    if (range === "under50") {
                        return product.price < 50;
                    }

                    if (range === "50to100") {
                        return (
                            product.price >= 50 &&
                            product.price <= 100
                        );
                    }

                    if (range === "above100") {
                        return product.price > 100;
                    }

                    return false;
                });

            if (!matchesPrice) {
                return false;
            }
        }

        return true;
    });


    applySorting();

    renderProducts();
}


/* =========================================================
   SORTING
========================================================= */

function applySorting() {

    const sortValue = sortSelect.value;

    if (sortValue === "price-low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    } else if (sortValue === "price-high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    } else if (sortValue === "discount") {

        filteredProducts.sort(
            (a, b) =>
                getDiscount(b) - getDiscount(a)
        );

    } else {

        const originalOrder =
            new Map(
                products.map(
                    (product, index) => [
                        product.id,
                        index
                    ]
                )
            );

        filteredProducts.sort(
            (a, b) =>
                originalOrder.get(a.id) -
                originalOrder.get(b.id)
        );
    }
}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearFilters() {

    document
        .querySelectorAll(
            'input[type="checkbox"]'
        )
        .forEach(input => {
            input.checked = false;
        });

    sortSelect.value = "relevance";

    filteredProducts = [...products];

    renderProducts();
}


/* =========================================================
   SORT EVENT
========================================================= */

sortSelect.addEventListener(
    "change",
    function () {

        applySorting();
        renderProducts();
    }
);


/* =========================================================
   FILTER EVENTS
========================================================= */

document
    .querySelectorAll(
        'input[type="checkbox"]'
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            applyFilters
        );
    });


/* =========================================================
   CLEAR BUTTONS
========================================================= */

clearFiltersButton.addEventListener(
    "click",
    clearFilters
);

emptyClearButton.addEventListener(
    "click",
    clearFilters
);


/* =========================================================
   MOBILE FILTER
========================================================= */

function openFilters() {

    filterSidebar.classList.add("open");
    filterOverlay.classList.add("open");

    document.body.style.overflow = "hidden";
}


function closeFilters() {

    filterSidebar.classList.remove("open");
    filterOverlay.classList.remove("open");

    document.body.style.overflow = "";
}


filterButton.addEventListener(
    "click",
    openFilters
);

filterOverlay.addEventListener(
    "click",
    closeFilters
);


/* =========================================================
   SEARCH
========================================================= */

searchForm.addEventListener(
    "submit",
    function (event) {

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


/* =========================================================
   LOCATION
========================================================= */

locationButton.addEventListener(
    "click",
    function () {

        alert(
            "Location selection will be connected to MARTEY's location service later."
        );
    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateCartCount();
renderProducts();
