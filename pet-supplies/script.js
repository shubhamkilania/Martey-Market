const products = [

    /* =========================
       DOG FOOD
    ========================= */

    {
        id: 1147,
        name: "Premium Adult Dog Food",
        category: "Dog Food",
        size: "1 kg",
        price: 299,
        mrp: 349,
        rating: 4.7,
        image: "../assets/products/dog-food.jpg"
    },

    {
        id: 1148,
        name: "Healthy Puppy Food",
        category: "Dog Food",
        size: "1 kg",
        price: 279,
        mrp: 325,
        rating: 4.6,
        image: "../assets/products/puppy-food.jpg"
    },

    {
        id: 1149,
        name: "Balanced Adult Dog Meal",
        category: "Dog Food",
        size: "2 kg",
        price: 549,
        mrp: 620,
        rating: 4.7,
        image: "../assets/products/dog-food-premium.jpg"
    },


    /* =========================
       CAT FOOD
    ========================= */

    {
        id: 1150,
        name: "Premium Adult Cat Food",
        category: "Cat Food",
        size: "1 kg",
        price: 329,
        mrp: 379,
        rating: 4.7,
        image: "../assets/products/cat-food.jpg"
    },

    {
        id: 1151,
        name: "Healthy Kitten Food",
        category: "Cat Food",
        size: "1 kg",
        price: 349,
        mrp: 399,
        rating: 4.6,
        image: "../assets/products/kitten-food.jpg"
    },

    {
        id: 1152,
        name: "Daily Nutrition Cat Meal",
        category: "Cat Food",
        size: "500 g",
        price: 189,
        mrp: 220,
        rating: 4.5,
        image: "../assets/products/cat-food-daily.jpg"
    },


    /* =========================
       PET TREATS
    ========================= */

    {
        id: 1153,
        name: "Crunchy Dog Treats",
        category: "Pet Treats",
        size: "200 g",
        price: 149,
        mrp: 175,
        rating: 4.6,
        image: "../assets/products/dog-treats.jpg"
    },

    {
        id: 1154,
        name: "Soft Chicken Dog Treats",
        category: "Pet Treats",
        size: "150 g",
        price: 179,
        mrp: 210,
        rating: 4.7,
        image: "../assets/products/dog-treats-soft.jpg"
    },

    {
        id: 1155,
        name: "Crunchy Cat Treats",
        category: "Pet Treats",
        size: "60 g",
        price: 99,
        mrp: 120,
        rating: 4.6,
        image: "../assets/products/cat-treats.jpg"
    },

    {
        id: 1156,
        name: "Pet Biscuit Treats",
        category: "Pet Treats",
        size: "250 g",
        price: 129,
        mrp: 150,
        rating: 4.5,
        image: "../assets/products/pet-biscuits.jpg"
    },


    /* =========================
       PET HYGIENE
    ========================= */

    {
        id: 1157,
        name: "Gentle Pet Shampoo",
        category: "Pet Hygiene",
        size: "200 ml",
        price: 169,
        mrp: 199,
        rating: 4.6,
        image: "../assets/products/pet-shampoo.jpg"
    },

    {
        id: 1158,
        name: "Pet Cleaning Wipes",
        category: "Pet Hygiene",
        size: "50 wipes",
        price: 119,
        mrp: 145,
        rating: 4.5,
        image: "../assets/products/pet-wipes.jpg"
    },

    {
        id: 1159,
        name: "Pet Paw Cleaning Wipes",
        category: "Pet Hygiene",
        size: "60 wipes",
        price: 139,
        mrp: 165,
        rating: 4.6,
        image: "../assets/products/pet-paw-wipes.jpg"
    },


    /* =========================
       PET GROOMING
    ========================= */

    {
        id: 1160,
        name: "Pet Grooming Brush",
        category: "Pet Grooming",
        size: "1 pc",
        price: 149,
        mrp: 180,
        rating: 4.6,
        image: "../assets/products/pet-grooming-brush.jpg"
    },

    {
        id: 1161,
        name: "Pet Grooming Comb",
        category: "Pet Grooming",
        size: "1 pc",
        price: 99,
        mrp: 120,
        rating: 4.5,
        image: "../assets/products/pet-comb.jpg"
    },

    {
        id: 1162,
        name: "Pet Nail Care Tool",
        category: "Pet Grooming",
        size: "1 pc",
        price: 129,
        mrp: 155,
        rating: 4.5,
        image: "../assets/products/pet-nail-cutter.jpg"
    },


    /* =========================
       PET ACCESSORIES
    ========================= */

    {
        id: 1163,
        name: "Adjustable Pet Collar",
        category: "Pet Accessories",
        size: "1 pc",
        price: 129,
        mrp: 160,
        rating: 4.6,
        image: "../assets/products/pet-collar.jpg"
    },

    {
        id: 1164,
        name: "Comfort Pet Leash",
        category: "Pet Accessories",
        size: "1 pc",
        price: 199,
        mrp: 240,
        rating: 4.7,
        image: "../assets/products/pet-leash.jpg"
    },

    {
        id: 1165,
        name: "Reflective Pet Collar",
        category: "Pet Accessories",
        size: "1 pc",
        price: 179,
        mrp: 215,
        rating: 4.6,
        image: "../assets/products/reflective-collar.jpg"
    },


    /* =========================
       PET TOYS
    ========================= */

    {
        id: 1166,
        name: "Interactive Pet Toy",
        category: "Pet Toys",
        size: "1 pc",
        price: 149,
        mrp: 180,
        rating: 4.5,
        image: "../assets/products/pet-toy.jpg"
    },

    {
        id: 1167,
        name: "Pet Play Ball",
        category: "Pet Toys",
        size: "1 pc",
        price: 99,
        mrp: 120,
        rating: 4.6,
        image: "../assets/products/pet-ball.jpg"
    },

    {
        id: 1168,
        name: "Rope Chew Pet Toy",
        category: "Pet Toys",
        size: "1 pc",
        price: 129,
        mrp: 155,
        rating: 4.6,
        image: "../assets/products/rope-toy.jpg"
    },


    /* =========================
       PET BOWLS & FEEDING
    ========================= */

    {
        id: 1169,
        name: "Stainless Steel Pet Bowl",
        category: "Pet Bowls & Feeding",
        size: "1 pc",
        price: 179,
        mrp: 220,
        rating: 4.6,
        image: "../assets/products/pet-bowl.jpg"
    },

    {
        id: 1170,
        name: "Double Pet Feeding Bowl",
        category: "Pet Bowls & Feeding",
        size: "1 set",
        price: 249,
        mrp: 299,
        rating: 4.7,
        image: "../assets/products/pet-feeding-bowl.jpg"
    },

    {
        id: 1171,
        name: "Pet Food Storage Container",
        category: "Pet Bowls & Feeding",
        size: "2 L",
        price: 229,
        mrp: 275,
        rating: 4.5,
        image: "../assets/products/pet-food-container.jpg"
    },


    /* =========================
       PET CLEANING
    ========================= */

    {
        id: 1172,
        name: "Pet Cleaning Solution",
        category: "Pet Cleaning",
        size: "500 ml",
        price: 189,
        mrp: 225,
        rating: 4.5,
        image: "../assets/products/pet-cleaner.jpg"
    },

    {
        id: 1173,
        name: "Pet Litter",
        category: "Pet Cleaning",
        size: "5 kg",
        price: 399,
        mrp: 459,
        rating: 4.6,
        image: "../assets/products/pet-litter.jpg"
    },

    {
        id: 1174,
        name: "Pet Waste Bags",
        category: "Pet Cleaning",
        size: "120 bags",
        price: 149,
        mrp: 180,
        rating: 4.5,
        image: "../assets/products/pet-waste-bags.jpg"
    }

];


/* =========================================================
   DOM
========================================================= */

const productGrid = document.getElementById("productGrid");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

const sortSelect = document.getElementById("sortSelect");
const clearFilters = document.getElementById("clearFilters");
const emptyClearButton = document.getElementById("emptyClearButton");

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchSuggestions = document.getElementById("searchSuggestions");

const cartCount = document.getElementById("cartCount");

const mobileFilterButton = document.getElementById("mobileFilterButton");
const filterSidebar = document.getElementById("filterSidebar");
const mobileFilterOverlay = document.getElementById("mobileFilterOverlay");

const locationButton = document.getElementById("locationButton");


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function imageFallback(image) {

    image.onerror = function () {
        this.onerror = null;
        this.src = "../assets/products/dog-food.jpg";
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

        const cart = localStorage.getItem("marteyCart");

        if (!cart) {
            return [];
        }

        const parsed = JSON.parse(cart);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        "marteyCart",
        JSON.stringify(cart)
    );

}


function getCartQuantity(productId) {

    const cart = getCart();

    const item = cart.find(
        item => Number(
            item.id ?? item.productId ?? item.productID
        ) === Number(productId)
    );

    if (!item) {
        return 0;
    }

    return Number(
        item.quantity ??
        item.qty ??
        1
    );

}


function updateCartCount() {

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {

        total += Number(
            item.quantity ??
            item.qty ??
            1
        );

    });

    cartCount.textContent = total;

}


function addToCart(productId) {

    const cart = getCart();

    const existingItem = cart.find(
        item => Number(
            item.id ?? item.productId ?? item.productID
        ) === Number(productId)
    );

    if (existingItem) {

        if (existingItem.quantity !== undefined) {
            existingItem.quantity += 1;
        } else if (existingItem.qty !== undefined) {
            existingItem.qty += 1;
        } else {
            existingItem.quantity = 2;
        }

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    renderProducts();

}


/* =========================================================
   FILTERS
========================================================= */

function getSelectedFilters() {

    const categoryFilters = [
        ...document.querySelectorAll(
            'input[data-filter="category"]:checked'
        )
    ].map(input => input.value);

    const priceFilters = [
        ...document.querySelectorAll(
            'input[data-filter="price"]:checked'
        )
    ].map(input => input.value);

    return {
        categories: categoryFilters,
        prices: priceFilters
    };

}


function applyFilters() {

    const filters = getSelectedFilters();

    let filteredProducts = [...products];


    /* CATEGORY */

    if (filters.categories.length > 0) {

        filteredProducts = filteredProducts.filter(product =>
            filters.categories.includes(product.category)
        );

    }


    /* PRICE */

    if (filters.prices.length > 0) {

        filteredProducts = filteredProducts.filter(product => {

            return filters.prices.some(priceFilter => {

                if (priceFilter === "under100") {
                    return product.price < 100;
                }

                if (priceFilter === "100to250") {
                    return product.price >= 100 &&
                           product.price <= 250;
                }

                if (priceFilter === "above250") {
                    return product.price > 250;
                }

                return true;

            });

        });

    }


    return filteredProducts;

}


/* =========================================================
   SORT
========================================================= */

function sortProducts(productList) {

    const sortValue = sortSelect.value;

    const sorted = [...productList];

    if (sortValue === "price-low") {

        sorted.sort(
            (a, b) => a.price - b.price
        );

    }

    else if (sortValue === "price-high") {

        sorted.sort(
            (a, b) => b.price - a.price
        );

    }

    else if (sortValue === "discount") {

        sorted.sort(
            (a, b) => getDiscount(b) - getDiscount(a)
        );

    }

    return sorted;

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const discount = getDiscount(product);
    const quantity = getCartQuantity(product.id);

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

        <div
            class="product-image-wrap"
            data-product-id="${product.id}"
        >

            ${
                discount > 0
                ? `<span class="discount-badge">${discount}% OFF</span>`
                : ""
            }

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

        </div>


        <div class="product-info">

            <div class="product-category">
                ${product.category} · ${product.size}
            </div>


            <div
                class="product-name"
                data-product-id="${product.id}"
            >
                ${product.name}
            </div>


            <div class="product-rating">

                <span class="rating-star">★</span>

                <span class="rating-value">
                    ${product.rating}
                </span>

            </div>


            <div class="price-row">

                <strong class="product-price">
                    ₹${product.price}
                </strong>

                <span class="product-mrp">
                    ₹${product.mrp}
                </span>

                ${
                    discount > 0
                    ? `<span class="product-discount">${discount}% off</span>`
                    : ""
                }

            </div>


            <button
                class="add-button ${quantity > 0 ? "added" : ""}"
                data-product-id="${product.id}"
            >
                ${quantity > 0 ? "Added to Cart" : "Add to Cart"}
            </button>

        </div>

    `;


    const image = card.querySelector(".product-image");

    imageFallback(image);


    const productImage = card.querySelector(".product-image-wrap");

    productImage.addEventListener("click", () => {

        window.location.href =
            `/product/${product.id}`;

    });


    const productName = card.querySelector(".product-name");

    productName.addEventListener("click", () => {

        window.location.href =
            `/product/${product.id}`;

    });


    const addButton = card.querySelector(".add-button");

    addButton.addEventListener("click", event => {

        event.stopPropagation();

        addToCart(product.id);

    });


    return card;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    let filteredProducts = applyFilters();

    filteredProducts = sortProducts(filteredProducts);

    productGrid.innerHTML = "";

    resultCount.textContent =
        `${filteredProducts.length} ${
            filteredProducts.length === 1
                ? "product"
                : "products"
        }`;


    if (filteredProducts.length === 0) {

        emptyState.classList.add("active");

        productGrid.style.display = "none";

        return;

    }


    emptyState.classList.remove("active");

    productGrid.style.display = "grid";


    filteredProducts.forEach(product => {

        productGrid.appendChild(
            createProductCard(product)
        );

    });

}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearAllFilters() {

    document
        .querySelectorAll('input[type="checkbox"]')
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

emptyClearButton.addEventListener(
    "click",
    clearAllFilters
);


/* =========================================================
   FILTER EVENTS
========================================================= */

document
    .querySelectorAll('input[type="checkbox"]')
    .forEach(input => {

        input.addEventListener(
            "change",
            renderProducts
        );

    });


sortSelect.addEventListener(
    "change",
    renderProducts
);


/* =========================================================
   SEARCH SUGGESTIONS
========================================================= */

function showSearchSuggestions(query) {

    const searchTerm =
        query.trim().toLowerCase();

    if (!searchTerm) {

        searchSuggestions.classList.remove("active");

        searchSuggestions.innerHTML = "";

        return;

    }


    const matches = products
        .filter(product =>
            product.name
                .toLowerCase()
                .includes(searchTerm)
            ||
            product.category
                .toLowerCase()
                .includes(searchTerm)
        )
        .slice(0, 6);


    if (matches.length === 0) {

        searchSuggestions.classList.remove("active");

        searchSuggestions.innerHTML = "";

        return;

    }


    searchSuggestions.innerHTML = "";


    matches.forEach(product => {

        const item =
            document.createElement("div");

        item.className = "suggestion-item";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="suggestion-info">

                <span class="suggestion-name">
                    ${product.name}
                </span>

                <span class="suggestion-meta">
                    ${product.category} ·
                    ${product.size} ·
                    ₹${product.price}
                </span>

            </div>

        `;


        const suggestionImage =
            item.querySelector("img");

        imageFallback(suggestionImage);


        item.addEventListener("click", () => {

            window.location.href =
                `/product/${product.id}`;

        });


        searchSuggestions.appendChild(item);

    });


    searchSuggestions.classList.add("active");

}


searchInput.addEventListener(
    "input",
    event => {

        showSearchSuggestions(
            event.target.value
        );

    }
);


/* =========================================================
   SEARCH
========================================================= */

function performSearch() {

    const query =
        searchInput.value.trim();

    if (!query) {
        return;
    }

    window.location.href =
        `/search?q=${encodeURIComponent(query)}`;

}


searchButton.addEventListener(
    "click",
    performSearch
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            event.preventDefault();

            performSearch();

        }

    }
);


/* =========================================================
   CLOSE SEARCH SUGGESTIONS
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(".header-search")
        ) {

            searchSuggestions.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================================
   MOBILE FILTER
========================================================= */

function openMobileFilters() {

    filterSidebar.classList.add("active");

    mobileFilterOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeMobileFilters() {

    filterSidebar.classList.remove("active");

    mobileFilterOverlay.classList.remove("active");

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
   LOCATION
========================================================= */

locationButton.addEventListener(
    "click",
    () => {

        alert(
            "Location selection will be connected to MARTEY's delivery system in the backend."
        );

    }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

updateCartCount();

renderProducts();
