/* =========================================================
   MARTEY — HOMEPAGE JAVASCRIPT
   Frontend demo / backend-ready structure
========================================================= */


/* ================= PRODUCT DATA ================= */

const products = [

    {
        id: 1001,
        name: "Fresh Full Cream Milk",
        category: "Milk & Dairy",
        unit: "1 L",
        price: 68,
        mrp: 72,
        discount: "6% OFF",
        image: "assets/products/milk.jpg",
        deal: true
    },

    {
        id: 1002,
        name: "Classic White Bread",
        category: "Bakery",
        unit: "400 g",
        price: 45,
        mrp: 50,
        discount: "10% OFF",
        image: "assets/products/bread.jpg",
        deal: true
    },

    {
        id: 1003,
        name: "Fresh Orange Drink",
        category: "Drinks",
        unit: "750 ml",
        price: 55,
        mrp: 60,
        discount: "8% OFF",
        image: "assets/products/orange-drink.jpg",
        deal: true
    },

    {
        id: 1004,
        name: "Classic Salted Chips",
        category: "Snacks",
        unit: "100 g",
        price: 28,
        mrp: 30,
        discount: "7% OFF",
        image: "assets/products/chips.jpg",
        deal: true
    },

    {
        id: 1005,
        name: "Fresh Bananas",
        category: "Fruits & Vegetables",
        unit: "1 kg",
        price: 49,
        mrp: 55,
        discount: "11% OFF",
        image: "assets/products/bananas.jpg",
        deal: true
    },

    {
        id: 1006,
        name: "Daily Care Shampoo",
        category: "Personal Care",
        unit: "180 ml",
        price: 149,
        mrp: 175,
        discount: "15% OFF",
        image: "assets/products/shampoo.jpg",
        deal: true
    },


    {
        id: 1007,
        name: "Liquid Laundry Detergent",
        category: "Household",
        unit: "1 L",
        price: 189,
        mrp: 220,
        discount: "14% OFF",
        image: "assets/products/detergent.jpg",
        deal: false
    },

    {
        id: 1008,
        name: "Soft Baby Wipes",
        category: "Baby Care",
        unit: "80 wipes",
        price: 99,
        mrp: 120,
        discount: "18% OFF",
        image: "assets/products/baby-wipes.jpg",
        deal: false
    },

    {
        id: 1009,
        name: "Crunchy Butter Biscuits",
        category: "Snacks",
        unit: "200 g",
        price: 42,
        mrp: 50,
        discount: "16% OFF",
        image: "assets/products/biscuits.jpg",
        deal: false
    },

    {
        id: 1010,
        name: "Premium Pet Food",
        category: "Pet Supplies",
        unit: "1 kg",
        price: 299,
        mrp: 340,
        discount: "12% OFF",
        image: "assets/products/pet-food.jpg",
        deal: false
    },

    {
        id: 1011,
        name: "Wireless Headphones",
        category: "Electronics & Accessories",
        unit: "1 unit",
        price: 899,
        mrp: 1199,
        discount: "25% OFF",
        image: "assets/products/headphones.jpg",
        deal: false
    },

    {
        id: 1012,
        name: "Premium Spiral Notebook",
        category: "Stationery",
        unit: "200 pages",
        price: 99,
        mrp: 125,
        discount: "21% OFF",
        image: "assets/products/notebook.jpg",
        deal: false
    }

];


/* ================= DOM ================= */

const dealContainer = document.getElementById("dealProducts");
const essentialContainer = document.getElementById("essentialProducts");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchDropdown = document.getElementById("searchDropdown");

const cartCountElement = document.getElementById("cartCount");


/* ================= ROTATING SEARCH PLACEHOLDER ================= */

const searchSuggestions = [
    "Search for milk",
    "Search for bread",
    "Search for drinks",
    "Search for snacks",
    "Search for fruits",
    "Search for shampoo",
    "Search for groceries"
];

let suggestionIndex = 0;

function rotateSearchPlaceholder() {

    if (document.activeElement === searchInput) {
        return;
    }

    searchInput.classList.add("placeholder-changing");

    setTimeout(() => {

        searchInput.placeholder =
            searchSuggestions[suggestionIndex];

        suggestionIndex =
            (suggestionIndex + 1) % searchSuggestions.length;

        searchInput.classList.remove("placeholder-changing");

    }, 180);

}

setInterval(rotateSearchPlaceholder, 2500);


/* ================= PRODUCT CARD ================= */

function createProductCard(product) {

    return `
        <article class="product-card">

            <a
                href="/product/${product.id}"
                class="product-image"
                aria-label="View ${product.name}"
            >

                ${
                    product.discount
                        ? `<span class="discount-badge">${product.discount}</span>`
                        : ""
                }

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </a>


            <div class="product-info">

                <a
                    href="/product/${product.id}"
                    class="product-name"
                >
                    ${product.name}
                </a>

                <div class="product-unit">
                    ${product.unit}
                </div>


                <div class="product-bottom">

                    <div class="product-price">

                        <strong>
                            ₹${product.price}
                        </strong>

                        <del>
                            ₹${product.mrp}
                        </del>

                    </div>


                    <button
                        class="add-button"
                        type="button"
                        data-product-id="${product.id}"
                        aria-label="Add ${product.name} to cart"
                    >
                        +
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* ================= RENDER PRODUCTS ================= */

function renderProducts(container, productList) {

    if (!container) return;

    container.innerHTML =
        productList
            .map(createProductCard)
            .join("");

}


/* ================= HOMEPAGE PRODUCTS ================= */

renderProducts(
    dealContainer,
    products.filter(product => product.deal).slice(0, 6)
);

renderProducts(
    essentialContainer,
    products.filter(product => !product.deal).slice(0, 6)
);


/* ================= CART ================= */

let cartCount =
    Number(localStorage.getItem("marteyCartCount")) || 0;

function updateCartCount() {

    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }

}

updateCartCount();


document.addEventListener("click", function (event) {

    const button =
        event.target.closest(".add-button");

    if (!button) return;

    cartCount++;

    localStorage.setItem(
        "marteyCartCount",
        cartCount
    );

    button.classList.add("added");
    button.textContent = "✓";

    updateCartCount();

    setTimeout(() => {

        button.classList.remove("added");
        button.textContent = "+";

    }, 900);

});


/* ================= SEARCH ================= */

function searchProducts(query) {

    const cleanQuery =
        query.trim().toLowerCase();

    if (!cleanQuery) {
        return products.slice(0, 5);
    }

    return products.filter(product => {

        const searchableText = [
            product.name,
            product.category,
            product.unit
        ]
            .join(" ")
            .toLowerCase();

        return searchableText.includes(cleanQuery);

    });

}


/* ================= SEARCH DROPDOWN ================= */

function showSearchDropdown(query) {

    const results =
        searchProducts(query);

    if (!searchDropdown) return;


    if (!query.trim()) {

        searchDropdown.innerHTML = `

            <div class="search-dropdown-heading">
                Popular products
            </div>

            ${results
                .slice(0, 5)
                .map(createSearchResult)
                .join("")}

        `;

        searchDropdown.classList.add("active");

        return;
    }


    if (results.length === 0) {

        const popular =
            products.slice(0, 4);

        searchDropdown.innerHTML = `

            <div class="search-dropdown-heading">
                Popular products
            </div>

            ${popular
                .map(createSearchResult)
                .join("")}

            <a
                href="/search?q=${encodeURIComponent(query.trim())}"
                class="search-view-all"
            >
                Search all products for "${escapeHTML(query.trim())}"
            </a>

        `;

        searchDropdown.classList.add("active");

        return;
    }


    searchDropdown.innerHTML = `

        <div class="search-dropdown-heading">
            Products
        </div>

        ${results
            .slice(0, 6)
            .map(createSearchResult)
            .join("")}

        <a
            href="/search?q=${encodeURIComponent(query.trim())}"
            class="search-view-all"
        >
            View all results for "${escapeHTML(query.trim())}"
        </a>

    `;

    searchDropdown.classList.add("active");

}


/* ================= SEARCH RESULT ================= */

function createSearchResult(product) {

    return `

        <a
            href="/product/${product.id}"
            class="search-result"
        >

            <div class="search-result-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="search-result-info">

                <strong>
                    ${product.name}
                </strong>

                <span>
                    ${product.category} · ${product.unit}
                </span>

            </div>


            <div class="search-result-price">
                ₹${product.price}
            </div>

        </a>

    `;

}


/* ================= INPUT EVENTS ================= */

searchInput.addEventListener("focus", function () {

    showSearchDropdown(
        searchInput.value
    );

});


searchInput.addEventListener("input", function () {

    showSearchDropdown(
        searchInput.value
    );

});


/* ================= SEARCH SUBMIT ================= */

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const query =
        searchInput.value.trim();

    if (!query) {
        searchInput.focus();
        return;
    }

    window.location.href =
        `/search?q=${encodeURIComponent(query)}`;

});


/* ================= CLOSE SEARCH ================= */

document.addEventListener("click", function (event) {

    if (
        !event.target.closest(".search-wrapper")
    ) {

        searchDropdown.classList.remove(
            "active"
        );

    }

});


/* ================= ESCAPE HTML ================= */

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
