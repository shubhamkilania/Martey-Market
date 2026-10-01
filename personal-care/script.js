const products = [

    /* ---------------- SHAMPOO & CONDITIONER ---------------- */

    {
        id: 1072,
        name: "Daily Care Shampoo",
        category: "Shampoo & Conditioner",
        size: "180 ml",
        price: 129,
        mrp: 155,
        rating: 4.5,
        image: "../assets/products/shampoo.jpg"
    },

    {
        id: 1073,
        name: "Smooth & Shine Shampoo",
        category: "Shampoo & Conditioner",
        size: "340 ml",
        price: 229,
        mrp: 275,
        rating: 4.6,
        image: "../assets/products/shampoo-smooth.jpg"
    },

    {
        id: 1074,
        name: "Anti-Dandruff Shampoo",
        category: "Shampoo & Conditioner",
        size: "180 ml",
        price: 149,
        mrp: 180,
        rating: 4.5,
        image: "../assets/products/anti-dandruff-shampoo.jpg"
    },

    {
        id: 1075,
        name: "Daily Hair Conditioner",
        category: "Shampoo & Conditioner",
        size: "180 ml",
        price: 169,
        mrp: 200,
        rating: 4.4,
        image: "../assets/products/conditioner.jpg"
    },


    /* ---------------- SOAP & BODY WASH ---------------- */

    {
        id: 1076,
        name: "Fresh Bath Soap",
        category: "Soap & Body Wash",
        size: "4 × 100 g",
        price: 125,
        mrp: 145,
        rating: 4.5,
        image: "../assets/products/bath-soap.jpg"
    },

    {
        id: 1077,
        name: "Moisturizing Soap",
        category: "Soap & Body Wash",
        size: "3 × 100 g",
        price: 110,
        mrp: 130,
        rating: 4.5,
        image: "../assets/products/moisturizing-soap.jpg"
    },

    {
        id: 1078,
        name: "Refreshing Body Wash",
        category: "Soap & Body Wash",
        size: "250 ml",
        price: 199,
        mrp: 235,
        rating: 4.6,
        image: "../assets/products/body-wash.jpg"
    },

    {
        id: 1079,
        name: "Gentle Body Wash",
        category: "Soap & Body Wash",
        size: "250 ml",
        price: 189,
        mrp: 225,
        rating: 4.5,
        image: "../assets/products/gentle-body-wash.jpg"
    },


    /* ---------------- ORAL CARE ---------------- */

    {
        id: 1080,
        name: "Complete Care Toothpaste",
        category: "Oral Care",
        size: "150 g",
        price: 95,
        mrp: 110,
        rating: 4.6,
        image: "../assets/products/toothpaste.jpg"
    },

    {
        id: 1081,
        name: "Soft Bristle Toothbrush",
        category: "Oral Care",
        size: "2 pcs",
        price: 75,
        mrp: 90,
        rating: 4.5,
        image: "../assets/products/toothbrush.jpg"
    },

    {
        id: 1082,
        name: "Fresh Mouthwash",
        category: "Oral Care",
        size: "250 ml",
        price: 129,
        mrp: 150,
        rating: 4.4,
        image: "../assets/products/mouthwash.jpg"
    },


    /* ---------------- SKIN CARE ---------------- */

    {
        id: 1083,
        name: "Daily Face Wash",
        category: "Skin Care",
        size: "100 ml",
        price: 159,
        mrp: 190,
        rating: 4.5,
        image: "../assets/products/face-wash.jpg"
    },

    {
        id: 1084,
        name: "Daily Moisturizer",
        category: "Skin Care",
        size: "100 ml",
        price: 199,
        mrp: 240,
        rating: 4.6,
        image: "../assets/products/moisturizer.jpg"
    },

    {
        id: 1085,
        name: "Aloe Vera Gel",
        category: "Skin Care",
        size: "150 ml",
        price: 145,
        mrp: 175,
        rating: 4.6,
        image: "../assets/products/aloe-vera-gel.jpg"
    },


    /* ---------------- HAIR CARE ---------------- */

    {
        id: 1086,
        name: "Nourishing Hair Oil",
        category: "Hair Care",
        size: "200 ml",
        price: 135,
        mrp: 160,
        rating: 4.5,
        image: "../assets/products/hair-oil.jpg"
    },

    {
        id: 1087,
        name: "Hair Serum",
        category: "Hair Care",
        size: "100 ml",
        price: 199,
        mrp: 240,
        rating: 4.5,
        image: "../assets/products/hair-serum.jpg"
    },

    {
        id: 1088,
        name: "Hair Comb",
        category: "Hair Care",
        size: "1 pc",
        price: 55,
        mrp: 70,
        rating: 4.4,
        image: "../assets/products/hair-comb.jpg"
    },


    /* ---------------- GROOMING ---------------- */

    {
        id: 1089,
        name: "Shaving Razor",
        category: "Grooming",
        size: "1 pc",
        price: 99,
        mrp: 120,
        rating: 4.5,
        image: "../assets/products/razor.jpg"
    },

    {
        id: 1090,
        name: "Shaving Cream",
        category: "Grooming",
        size: "100 g",
        price: 115,
        mrp: 135,
        rating: 4.5,
        image: "../assets/products/shaving-cream.jpg"
    },


    /* ---------------- DEODORANTS ---------------- */

    {
        id: 1091,
        name: "Fresh Daily Deodorant",
        category: "Deodorants",
        size: "150 ml",
        price: 179,
        mrp: 210,
        rating: 4.5,
        image: "../assets/products/deodorant.jpg"
    },

    {
        id: 1092,
        name: "Sport Fresh Deodorant",
        category: "Deodorants",
        size: "150 ml",
        price: 189,
        mrp: 225,
        rating: 4.6,
        image: "../assets/products/deodorant-sport.jpg"
    },


    /* ---------------- FEMININE HYGIENE ---------------- */

    {
        id: 1093,
        name: "Cotton Soft Hygiene Pads",
        category: "Feminine Hygiene",
        size: "20 pads",
        price: 149,
        mrp: 175,
        rating: 4.6,
        image: "../assets/products/hygiene-pads.jpg"
    },

    {
        id: 1094,
        name: "Comfort Hygiene Pads",
        category: "Feminine Hygiene",
        size: "15 pads",
        price: 119,
        mrp: 140,
        rating: 4.5,
        image: "../assets/products/hygiene-pads-comfort.jpg"
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const productGrid =
    document.getElementById("productGrid");

const emptyState =
    document.getElementById("emptyState");

const resultCount =
    document.getElementById("resultCount");

const mobileResultCount =
    document.getElementById("mobileResultCount");

const sortSelect =
    document.getElementById("sortSelect");

const clearFiltersButton =
    document.getElementById("clearFilters");

const emptyClearButton =
    document.getElementById("emptyClearButton");

const filterButton =
    document.getElementById("filterButton");

const filterSidebar =
    document.getElementById("filterSidebar");

const filterOverlay =
    document.getElementById("filterOverlay");

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const locationButton =
    document.getElementById("locationButton");

const cartCount =
    document.getElementById("cartCount");


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

            const saved =
                localStorage.getItem(key);

            if (!saved) {
                continue;
            }

            const parsed =
                JSON.parse(saved);

            if (Array.isArray(parsed)) {
                return parsed;
            }
        }

        return [];

    } catch (error) {

        console.error(
            "Cart read error:",
            error
        );

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

    const totalQuantity =
        cart.reduce(
            (total, item) => {

                return (
                    total +
                    getCartItemQuantity(item)
                );

            },
            0
        );

    cartCount.textContent =
        totalQuantity;
}


function addToCart(productId) {

    const cart = getCart();

    const existingIndex =
        cart.findIndex(
            item =>
                getCartItemId(item) ===
                Number(productId)
        );

    if (existingIndex !== -1) {

        const quantity =
            getCartItemQuantity(
                cart[existingIndex]
            );

        cart[existingIndex].quantity =
            quantity + 1;

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
   IMAGE FALLBACK
========================================================= */

function imageFallback(image) {

    image.onerror = function () {

        if (!this.dataset.fallbackApplied) {

            this.dataset.fallbackApplied =
                "true";

            this.src =
                "../assets/products/shampoo.jpg";
        }
    };
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

                <span class="rating-star">
                    ★
                </span>

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


    const image =
        card.querySelector(".product-image");

    imageFallback(image);


    const addButton =
        card.querySelector(".add-button");

    addButton.addEventListener(
        "click",
        function () {

            addToCart(product.id);

            this.textContent =
                "Added to Cart";

            this.classList.add("added");

            setTimeout(() => {

                this.textContent =
                    "Add to Cart";

                this.classList.remove(
                    "added"
                );

            }, 900);
        }
    );


    return card;
}


/* =========================================================
   RENDER
========================================================= */

function renderProducts() {

    productGrid.innerHTML = "";

    resultCount.textContent =
        `${filteredProducts.length} products`;

    mobileResultCount.textContent =
        `${filteredProducts.length} products`;


    if (filteredProducts.length === 0) {

        productGrid.style.display =
            "none";

        emptyState.hidden =
            false;

        return;
    }


    productGrid.style.display =
        "grid";

    emptyState.hidden =
        true;


    filteredProducts.forEach(
        product => {

            const card =
                createProductCard(product);

            productGrid.appendChild(card);
        }
    );
}


/* =========================================================
   FILTER VALUES
========================================================= */

function getSelectedValues(name) {

    return Array.from(
        document.querySelectorAll(
            `input[name="${name}"]:checked`
        )
    ).map(
        input => input.value
    );
}


/* =========================================================
   APPLY FILTERS
========================================================= */

function applyFilters() {

    const selectedCategories =
        getSelectedValues("category");

    const selectedPrices =
        getSelectedValues("price");


    filteredProducts =
        products.filter(product => {

            /* CATEGORY */

            if (
                selectedCategories.length > 0 &&
                !selectedCategories.includes(
                    product.category
                )
            ) {
                return false;
            }


            /* PRICE */

            if (selectedPrices.length > 0) {

                const matchesPrice =
                    selectedPrices.some(
                        range => {

                            if (
                                range ===
                                "under100"
                            ) {
                                return (
                                    product.price <
                                    100
                                );
                            }


                            if (
                                range ===
                                "100to250"
                            ) {
                                return (
                                    product.price >=
                                        100 &&
                                    product.price <=
                                        250
                                );
                            }


                            if (
                                range ===
                                "above250"
                            ) {
                                return (
                                    product.price >
                                    250
                                );
                            }


                            return false;
                        }
                    );


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
   SORT
========================================================= */

function applySorting() {

    const sortValue =
        sortSelect.value;


    if (sortValue === "price-low") {

        filteredProducts.sort(
            (a, b) =>
                a.price - b.price
        );

    } else if (
        sortValue === "price-high"
    ) {

        filteredProducts.sort(
            (a, b) =>
                b.price - a.price
        );

    } else if (
        sortValue === "discount"
    ) {

        filteredProducts.sort(
            (a, b) =>
                getDiscount(b) -
                getDiscount(a)
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


    sortSelect.value =
        "relevance";


    filteredProducts =
        [...products];


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

    filterSidebar.classList.add(
        "open"
    );

    filterOverlay.classList.add(
        "open"
    );

    document.body.style.overflow =
        "hidden";
}


function closeFilters() {

    filterSidebar.classList.remove(
        "open"
    );

    filterOverlay.classList.remove(
        "open"
    );

    document.body.style.overflow =
        "";
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
            `/search?q=${encodeURIComponent(
                query
            )}`;
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
