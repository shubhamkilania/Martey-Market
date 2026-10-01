const bakeryProducts = [

    {
        id: 1002,
        name: "Fresh White Bread",
        category: "Bread",
        size: "400 g",
        price: 40,
        mrp: 45,
        rating: 4.6,
        image: "../assets/products/bread.jpg"
    },

    {
        id: 1030,
        name: "Whole Wheat Bread",
        category: "Bread",
        size: "400 g",
        price: 48,
        mrp: 55,
        rating: 4.5,
        image: "../assets/products/whole-wheat-bread.jpg"
    },

    {
        id: 1031,
        name: "Soft Milk Bread",
        category: "Bread",
        size: "350 g",
        price: 45,
        mrp: 52,
        rating: 4.5,
        image: "../assets/products/milk-bread.jpg"
    },

    {
        id: 1032,
        name: "Fresh Burger Buns",
        category: "Buns",
        size: "4 pcs",
        price: 55,
        mrp: 65,
        rating: 4.6,
        image: "../assets/products/bun.jpg"
    },

    {
        id: 1033,
        name: "Pav Buns",
        category: "Buns",
        size: "6 pcs",
        price: 45,
        mrp: 50,
        rating: 4.5,
        image: "../assets/products/pav.jpg"
    },

    {
        id: 1034,
        name: "Fresh Chocolate Cake",
        category: "Cakes",
        size: "500 g",
        price: 299,
        mrp: 349,
        rating: 4.8,
        image: "../assets/products/cake.jpg"
    },

    {
        id: 1035,
        name: "Classic Vanilla Cake",
        category: "Cakes",
        size: "500 g",
        price: 249,
        mrp: 299,
        rating: 4.7,
        image: "../assets/products/vanilla-cake.jpg"
    },

    {
        id: 1036,
        name: "Butter Cookies",
        category: "Cookies",
        size: "200 g",
        price: 75,
        mrp: 90,
        rating: 4.5,
        image: "../assets/products/cookies.jpg"
    },

    {
        id: 1009,
        name: "Chocolate Biscuits",
        category: "Cookies",
        size: "120 g",
        price: 35,
        mrp: 40,
        rating: 4.4,
        image: "../assets/products/biscuits.jpg"
    },

    {
        id: 1037,
        name: "Butter Croissant",
        category: "Croissants",
        size: "2 pcs",
        price: 99,
        mrp: 120,
        rating: 4.7,
        image: "../assets/products/croissant.jpg"
    },

    {
        id: 1038,
        name: "Chocolate Croissant",
        category: "Croissants",
        size: "2 pcs",
        price: 119,
        mrp: 140,
        rating: 4.7,
        image: "../assets/products/chocolate-croissant.jpg"
    },

    {
        id: 1039,
        name: "Fresh Donuts",
        category: "Other Bakery",
        size: "4 pcs",
        price: 110,
        mrp: 130,
        rating: 4.6,
        image: "../assets/products/donuts.jpg"
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const productGrid = document.getElementById("productGrid");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

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


/* MOBILE FILTER */

const mobileFilterButton =
    document.getElementById("mobileFilterButton");

const mobileFilterPanel =
    document.getElementById("mobileFilterPanel");

const filterOverlay =
    document.getElementById("filterOverlay");

const closeMobileFilter =
    document.getElementById("closeMobileFilter");

const applyMobileFilters =
    document.getElementById("applyMobileFilters");

const mobileCategoryFilters =
    document.querySelectorAll(".mobile-category-filter");

const mobilePriceFilters =
    document.querySelectorAll(".mobile-price-filter");


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function imageFallback(img) {

    img.onerror = function () {

        if (!this.dataset.fallbackApplied) {

            this.dataset.fallbackApplied = "true";

            this.src =
                "../assets/products/bread.jpg";
        }
    };
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
   CART
========================================================= */

function getCart() {

    try {

        const stored =
            localStorage.getItem("marteyCart");

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

    const cart = getCart();

    const existing =
        cart.find(
            item =>
                getItemId(item) === Number(product.id)
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

    const cart = getCart();

    const total =
        cart.reduce(
            (sum, item) =>
                sum + getItemQuantity(item),
            0
        );

    cartCount.textContent = total;
}


/* =========================================================
   ADD BUTTON STATE
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

    button.textContent = "Added";
    button.classList.add("added");

    setTimeout(() => {

        button.textContent =
            originalText;

        button.classList.remove("added");

    }, 900);
}


/* =========================================================
   FILTER STATE
========================================================= */

let activeSearch = "";

let selectedCategories = [];

let selectedPrices = [];


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {

    let products =
        [...bakeryProducts];


    /* SEARCH */

    if (activeSearch) {

        const query =
            activeSearch.toLowerCase().trim();

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

    if (selectedCategories.length > 0) {

        products =
            products.filter(product =>
                selectedCategories.includes(
                    product.category
                )
            );
    }


    /* PRICE */

    if (selectedPrices.length > 0) {

        products =
            products.filter(product => {

                return selectedPrices.some(range => {

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

            });
    }


    /* SORT */

    const sort =
        sortSelect.value;


    if (sort === "low-high") {

        products.sort(
            (a, b) =>
                a.price - b.price
        );

    } else if (sort === "high-low") {

        products.sort(
            (a, b) =>
                b.price - a.price
        );

    } else if (sort === "discount") {

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


    productGrid.innerHTML = "";


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
            document.createElement("article");

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
                    <span class="rating-star">★</span>
                    ${product.rating}
                </div>


                <div class="product-bottom">

                    <div class="price-area">

                        <div>
                            <span class="product-price">
                                ₹${product.price}
                            </span>

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


        productGrid.appendChild(card);


        const img =
            card.querySelector("img");

        imageFallback(img);


        const addButton =
            card.querySelector(".add-button");


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
        Array.from(categoryFilters)
            .filter(input => input.checked)
            .map(input => input.value);


    selectedPrices =
        Array.from(priceFilters)
            .filter(input => input.checked)
            .map(input => input.value);
}


function syncDesktopFilters() {

    categoryFilters.forEach(input => {

        input.checked =
            selectedCategories.includes(
                input.value
            );
    });


    priceFilters.forEach(input => {

        input.checked =
            selectedPrices.includes(
                input.value
            );
    });
}


/* =========================================================
   MOBILE FILTERS
========================================================= */

function readMobileFilters() {

    selectedCategories =
        Array.from(mobileCategoryFilters)
            .filter(input => input.checked)
            .map(input => input.value);


    selectedPrices =
        Array.from(mobilePriceFilters)
            .filter(input => input.checked)
            .map(input => input.value);


    syncDesktopFilters();
}


/* =========================================================
   DESKTOP FILTER EVENTS
========================================================= */

categoryFilters.forEach(input => {

    input.addEventListener(
        "change",
        () => {

            readDesktopFilters();

            renderProducts();
        }
    );
});


priceFilters.forEach(input => {

    input.addEventListener(
        "change",
        () => {

            readDesktopFilters();

            renderProducts();
        }
    );
});


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
   EMPTY STATE RESET
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

        if (event.key !== "Enter") {
            return;
        }

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

        mobileFilterPanel.classList.add("open");
        filterOverlay.classList.add("open");

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
