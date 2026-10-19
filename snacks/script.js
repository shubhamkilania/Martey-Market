const snackProducts = [

    {
        id: 1004,
        name: "Classic Potato Chips",
        category: "Chips",
        size: "100 g",
        price: 35,
        mrp: 40,
        rating: 4.5,
        image: "../assets/products/chips.jpg"
    },

    {
        id: 1040,
        name: "Masala Potato Chips",
        category: "Chips",
        size: "100 g",
        price: 35,
        mrp: 40,
        rating: 4.5,
        image: "../assets/products/masala-chips.jpg"
    },

    {
        id: 1041,
        name: "Cream & Onion Chips",
        category: "Chips",
        size: "90 g",
        price: 40,
        mrp: 45,
        rating: 4.4,
        image: "../assets/products/cream-onion-chips.jpg"
    },

    {
        id: 1042,
        name: "Classic Salted Namkeen",
        category: "Namkeen",
        size: "200 g",
        price: 70,
        mrp: 80,
        rating: 4.5,
        image: "../assets/products/namkeen.jpg"
    },

    {
        id: 1043,
        name: "Spicy Mixture Namkeen",
        category: "Namkeen",
        size: "200 g",
        price: 75,
        mrp: 90,
        rating: 4.6,
        image: "../assets/products/mixture.jpg"
    },

    {
        id: 1009,
        name: "Chocolate Biscuits",
        category: "Biscuits",
        size: "120 g",
        price: 35,
        mrp: 40,
        rating: 4.4,
        image: "../assets/products/biscuits.jpg"
    },

    {
        id: 1044,
        name: "Cream Filled Biscuits",
        category: "Biscuits",
        size: "150 g",
        price: 45,
        mrp: 50,
        rating: 4.5,
        image: "../assets/products/cream-biscuits.jpg"
    },

    {
        id: 1045,
        name: "Milk Chocolate Bar",
        category: "Chocolates",
        size: "100 g",
        price: 95,
        mrp: 110,
        rating: 4.7,
        image: "../assets/products/milk-chocolate.jpg"
    },

    {
        id: 1046,
        name: "Dark Chocolate Bar",
        category: "Chocolates",
        size: "80 g",
        price: 110,
        mrp: 130,
        rating: 4.7,
        image: "../assets/products/dark-chocolate.jpg"
    },

    {
        id: 1047,
        name: "Chocolate Chip Cookies",
        category: "Cookies",
        size: "200 g",
        price: 85,
        mrp: 100,
        rating: 4.6,
        image: "../assets/products/cookies.jpg"
    },

    {
        id: 1048,
        name: "Salted Butter Cookies",
        category: "Cookies",
        size: "200 g",
        price: 80,
        mrp: 95,
        rating: 4.5,
        image: "../assets/products/butter-cookies.jpg"
    },

    {
        id: 1049,
        name: "Instant Popcorn",
        category: "Instant Snacks",
        size: "100 g",
        price: 55,
        mrp: 65,
        rating: 4.4,
        image: "../assets/products/popcorn.jpg"
    },

    {
        id: 1050,
        name: "Ready to Eat Nachos",
        category: "Instant Snacks",
        size: "150 g",
        price: 85,
        mrp: 100,
        rating: 4.5,
        image: "../assets/products/nachos.jpg"
    },

    {
        id: 1051,
        name: "Roasted Peanut Snack",
        category: "Other Snacks",
        size: "200 g",
        price: 60,
        mrp: 70,
        rating: 4.4,
        image: "../assets/products/peanuts.jpg"
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const productGrid =
    document.getElementById("productGrid");

const resultCount =
    document.getElementById("resultCount");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const categoryFilters =
    document.querySelectorAll(".category-filter");

const priceFilters =
    document.querySelectorAll(".price-filter");

const clearFilters =
    document.getElementById("clearFilters");

const resetEmptyState =
    document.getElementById("resetEmptyState");

const cartCount =
    document.getElementById("cartCount");

const locationButton =
    document.getElementById("locationButton");


/* MOBILE */

const mobileFilterButton =
    document.getElementById(
        "mobileFilterButton"
    );

const mobileFilterPanel =
    document.getElementById(
        "mobileFilterPanel"
    );

const filterOverlay =
    document.getElementById(
        "filterOverlay"
    );

const closeMobileFilter =
    document.getElementById(
        "closeMobileFilter"
    );

const applyMobileFilters =
    document.getElementById(
        "applyMobileFilters"
    );

const mobileCategoryFilters =
    document.querySelectorAll(
        ".mobile-category-filter"
    );

const mobilePriceFilters =
    document.querySelectorAll(
        ".mobile-price-filter"
    );


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function imageFallback(img) {

    img.onerror = function () {

        if (!this.dataset.fallbackApplied) {

            this.dataset.fallbackApplied =
                "true";

            this.src =
                "../assets/products/chips.jpg";
        }

    };

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
            (product.mrp - product.price)
            /
            product.mrp
        ) * 100
    );
}


/* =========================================================
   CART
========================================================= */

function getCart() {

    try {

        const stored =
            localStorage.getItem(
                "marteyCart"
            );

        if (!stored) {
            return [];
        }

        const parsed =
            JSON.parse(stored);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed;

    } catch (error) {

        console.error(
            "MARTEY cart error:",
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

    return Number(
        item.quantity ??
        item.qty ??
        1
    );
}


function addToCart(product) {

    const cart =
        getCart();

    const existing =
        cart.find(
            item =>
                getItemId(item) ===
                Number(product.id)
        );


    if (existing) {

        existing.quantity =
            getItemQuantity(existing) + 1;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }


    saveCart(cart);

    showAddedState(product.id);
}


function updateCartCount() {

    const cart =
        getCart();

    const total =
        cart.reduce(
            (sum, item) =>
                sum + getItemQuantity(item),
            0
        );

    cartCount.textContent =
        total;
}


/* =========================================================
   ADD BUTTON FEEDBACK
========================================================= */

function showAddedState(productId) {

    const button =
        document.querySelector(
            `.add-button[data-id="${productId}"]`
        );

    if (!button) {
        return;
    }


    const originalText =
        button.textContent;


    button.textContent =
        "Added";

    button.classList.add(
        "added"
    );


    setTimeout(() => {

        button.textContent =
            originalText;

        button.classList.remove(
            "added"
        );

    }, 900);
}


/* =========================================================
   FILTER STATE
========================================================= */

let activeSearch = "";

let selectedCategories = [];

let selectedPrices = [];


/* =========================================================
   GET FILTERED PRODUCTS
========================================================= */

function getFilteredProducts() {

    let products =
        [...snackProducts];


    /* SEARCH */

    if (activeSearch) {

        const query =
            activeSearch
                .toLowerCase()
                .trim();


        products =
            products.filter(product => {

                return (
                    product.name
                        .toLowerCase()
                        .includes(query)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(query)

                    ||

                    product.size
                        .toLowerCase()
                        .includes(query)
                );

            });

    }


    /* CATEGORY */

    if (
        selectedCategories.length > 0
    ) {

        products =
            products.filter(product =>
                selectedCategories.includes(
                    product.category
                )
            );

    }


    /* PRICE */

    if (
        selectedPrices.length > 0
    ) {

        products =
            products.filter(product => {

                return selectedPrices.some(
                    range => {

                        if (
                            range ===
                            "under50"
                        ) {
                            return (
                                product.price <
                                50
                            );
                        }


                        if (
                            range ===
                            "50to100"
                        ) {
                            return (
                                product.price >= 50 &&
                                product.price <= 100
                            );
                        }


                        if (
                            range ===
                            "above100"
                        ) {
                            return (
                                product.price > 100
                            );
                        }


                        return false;
                    }
                );

            });

    }


    /* SORT */

    const sort =
        sortSelect.value;


    if (
        sort === "low-high"
    ) {

        products.sort(
            (a, b) =>
                a.price - b.price
        );

    } else if (
        sort === "high-low"
    ) {

        products.sort(
            (a, b) =>
                b.price - a.price
        );

    } else if (
        sort === "discount"
    ) {

        products.sort(
            (a, b) =>
                getDiscount(b) -
                getDiscount(a)
        );

    }


    return products;
}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const products =
        getFilteredProducts();


    productGrid.innerHTML =
        "";


    resultCount.textContent =
        `${products.length} ${
            products.length === 1
                ? "product"
                : "products"
        }`;


    if (products.length === 0) {

        productGrid.style.display =
            "none";

        emptyState.style.display =
            "block";

        return;
    }


    productGrid.style.display =
        "grid";

    emptyState.style.display =
        "none";


    products.forEach(product => {

        const discount =
            getDiscount(product);


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "product-card";


        card.innerHTML = `

            <a
                href="/product/${product.id}"
                class="product-image-wrap"
                aria-label="${product.name}"
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
                    src="${product.image}"
                    alt="${product.name}"
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

                    ${product.rating}

                </div>


                <div class="product-bottom">

                    <div class="price-area">

                        <div>

                            <span class="product-price">
                                ₹${product.price}
                            </span>

                            ${
                                product.mrp >
                                product.price
                                    ? `
                                        <span class="product-mrp">
                                            ₹${product.mrp}
                                        </span>
                                    `
                                    : ""
                            }

                        </div>


                        ${
                            discount > 0
                                ? `
                                    <div class="product-discount">
                                        Save ${discount}%
                                    </div>
                                `
                                : ""
                        }

                    </div>


                    <button
                        class="add-button"
                        data-id="${product.id}"
                    >
                        Add
                    </button>

                </div>

            </div>
        `;


        productGrid.appendChild(
            card
        );


        const img =
            card.querySelector("img");

        imageFallback(img);


        const addButton =
            card.querySelector(
                ".add-button"
            );


        addButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                addToCart(product);

            }
        );

    });

}


/* =========================================================
   DESKTOP FILTERS
========================================================= */

function readDesktopFilters() {

    selectedCategories =
        Array.from(
            categoryFilters
        )
        .filter(
            input =>
                input.checked
        )
        .map(
            input =>
                input.value
        );


    selectedPrices =
        Array.from(
            priceFilters
        )
        .filter(
            input =>
                input.checked
        )
        .map(
            input =>
                input.value
        );
}


function syncDesktopFilters() {

    categoryFilters.forEach(
        input => {

            input.checked =
                selectedCategories.includes(
                    input.value
                );

        }
    );


    priceFilters.forEach(
        input => {

            input.checked =
                selectedPrices.includes(
                    input.value
                );

        }
    );

}


/* =========================================================
   DESKTOP FILTER EVENTS
========================================================= */

categoryFilters.forEach(
    input => {

        input.addEventListener(
            "change",
            () => {

                readDesktopFilters();

                renderProducts();

            }
        );

    }
);


priceFilters.forEach(
    input => {

        input.addEventListener(
            "change",
            () => {

                readDesktopFilters();

                renderProducts();

            }
        );

    }
);


/* =========================================================
   MOBILE FILTERS
========================================================= */

function readMobileFilters() {

    selectedCategories =
        Array.from(
            mobileCategoryFilters
        )
        .filter(
            input =>
                input.checked
        )
        .map(
            input =>
                input.value
        );


    selectedPrices =
        Array.from(
            mobilePriceFilters
        )
        .filter(
            input =>
                input.checked
        )
        .map(
            input =>
                input.value
        );


    syncDesktopFilters();
}


/* =========================================================
   CLEAR FILTERS
========================================================= */

clearFilters.addEventListener(
    "click",
    () => {

        selectedCategories = [];
        selectedPrices = [];

        categoryFilters.forEach(
            input =>
                input.checked = false
        );

        priceFilters.forEach(
            input =>
                input.checked = false
        );

        mobileCategoryFilters.forEach(
            input =>
                input.checked = false
        );

        mobilePriceFilters.forEach(
            input =>
                input.checked = false
        );

        activeSearch = "";

        searchInput.value = "";

        sortSelect.value =
            "relevance";

        renderProducts();

    }
);


/* =========================================================
   EMPTY RESET
========================================================= */

resetEmptyState.addEventListener(
    "click",
    () => {

        selectedCategories = [];
        selectedPrices = [];

        categoryFilters.forEach(
            input =>
                input.checked = false
        );

        priceFilters.forEach(
            input =>
                input.checked = false
        );

        mobileCategoryFilters.forEach(
            input =>
                input.checked = false
        );

        mobilePriceFilters.forEach(
            input =>
                input.checked = false
        );

        activeSearch = "";

        searchInput.value = "";

        sortSelect.value =
            "relevance";

        renderProducts();

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
   SEARCH
========================================================= */

searchInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Enter"
        ) {
            return;
        }


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
    () => {

        alert(
            "Location selection will be connected with MARTEY's delivery system later."
        );

    }
);


/* =========================================================
   MOBILE FILTER OPEN
========================================================= */

mobileFilterButton.addEventListener(
    "click",
    () => {

        mobileFilterPanel.classList.add(
            "open"
        );

        filterOverlay.classList.add(
            "open"
        );

        document.body.style.overflow =
            "hidden";

    }
);


/* =========================================================
   MOBILE FILTER CLOSE
========================================================= */

function closeFilterPanel() {

    mobileFilterPanel.classList.remove(
        "open"
    );

    filterOverlay.classList.remove(
        "open"
    );

    document.body.style.overflow =
        "";

}


closeMobileFilter.addEventListener(
    "click",
    closeFilterPanel
);


filterOverlay.addEventListener(
    "click",
    closeFilterPanel
);


/* =========================================================
   APPLY MOBILE FILTERS
========================================================= */

applyMobileFilters.addEventListener(
    "click",
    () => {

        readMobileFilters();

        renderProducts();

        closeFilterPanel();

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateCartCount();

renderProducts();
