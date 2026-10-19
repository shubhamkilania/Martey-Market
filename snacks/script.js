const products = [

    {
        id: 1001,
        name: "Fresh Milk",
        category: "Milk & Dairy",
        size: "1 L",
        price: 62,
        mrp: 68,
        image: "../assets/products/milk.jpg"
    },

    {
        id: 1002,
        name: "Classic White Bread",
        category: "Bakery",
        size: "400 g",
        price: 45,
        mrp: 50,
        image: "../assets/products/bread.jpg"
    },

    {
        id: 1003,
        name: "Orange Fruit Drink",
        category: "Drinks",
        size: "1 L",
        price: 85,
        mrp: 100,
        image: "../assets/products/orange-drink.jpg"
    },

    {
        id: 1004,
        name: "Classic Potato Chips",
        category: "Snacks",
        size: "100 g",
        price: 30,
        mrp: 35,
        image: "../assets/products/chips.jpg"
    },

    {
        id: 1005,
        name: "Fresh Bananas",
        category: "Fresh",
        size: "1 kg",
        price: 55,
        mrp: 65,
        image: "../assets/products/bananas.jpg"
    },

    {
        id: 1006,
        name: "Daily Care Shampoo",
        category: "Personal Care",
        size: "180 ml",
        price: 149,
        mrp: 175,
        image: "../assets/products/shampoo.jpg"
    },

    {
        id: 1007,
        name: "Liquid Laundry Detergent",
        category: "Household",
        size: "1 L",
        price: 189,
        mrp: 220,
        image: "../assets/products/detergent.jpg"
    },

    {
        id: 1008,
        name: "Baby Soft Wipes",
        category: "Baby Care",
        size: "72 wipes",
        price: 125,
        mrp: 150,
        image: "../assets/products/baby-wipes.jpg"
    },

    {
        id: 1009,
        name: "Butter Biscuits",
        category: "Snacks",
        size: "250 g",
        price: 55,
        mrp: 65,
        image: "../assets/products/biscuits.jpg"
    },

    {
        id: 1010,
        name: "Premium Pet Food",
        category: "Pet Supplies",
        size: "1 kg",
        price: 299,
        mrp: 349,
        image: "../assets/products/pet-food.jpg"
    },

    {
        id: 1011,
        name: "Wireless Headphones",
        category: "Electronics & Accessories",
        size: "1 unit",
        price: 799,
        mrp: 999,
        image: "../assets/products/headphones.jpg"
    },

    {
        id: 1012,
        name: "Premium Notebook",
        category: "Stationery",
        size: "A5",
        price: 99,
        mrp: 120,
        image: "../assets/products/notebook.jpg"
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const searchSuggestions = document.getElementById("searchSuggestions");

const searchTitle = document.getElementById("searchTitle");
const resultCount = document.getElementById("resultCount");
const mobileResultCount = document.getElementById("mobileResultCount");

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");

const sortSelect = document.getElementById("sortSelect");

const categoryFilters =
    document.querySelectorAll(".category-filter");

const priceFilters =
    document.querySelectorAll('input[name="price"]');

const clearFilters =
    document.getElementById("clearFilters");

const showAllButton =
    document.getElementById("showAllButton");

const mobileFilterButton =
    document.getElementById("mobileFilterButton");

const cartCount =
    document.getElementById("cartCount");


/* =========================================================
   GET SEARCH QUERY
========================================================= */

const urlParams = new URLSearchParams(window.location.search);

let currentQuery =
    urlParams.get("q")?.trim() || "";


/* =========================================================
   CART
========================================================= */

let cart = JSON.parse(
    localStorage.getItem("marteyCart") || "[]"
);

function updateCartCount() {

    if (!cartCount) return;

    cartCount.textContent = cart.length;
}

updateCartCount();


/* =========================================================
   DISCOUNT
========================================================= */

function getDiscount(price, mrp) {

    if (!mrp || mrp <= price) {
        return 0;
    }

    return Math.round(
        ((mrp - price) / mrp) * 100
    );
}


/* =========================================================
   SEARCH MATCH
========================================================= */

function matchesProduct(product, query) {

    if (!query) {
        return true;
    }

    const searchText = query
        .toLowerCase()
        .trim();

    const productText = `
        ${product.name}
        ${product.category}
        ${product.size}
    `.toLowerCase();

    return productText.includes(searchText);
}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {

    let result = products.filter(product =>
        matchesProduct(product, currentQuery)
    );


    /* Category */

    const selectedCategories =
        [...categoryFilters]
            .filter(input => input.checked)
            .map(input => input.value);

    if (selectedCategories.length > 0) {

        result = result.filter(product =>
            selectedCategories.includes(product.category)
        );
    }


    /* Price */

    const selectedPrice =
        document.querySelector(
            'input[name="price"]:checked'
        )?.value || "all";

    if (selectedPrice === "under100") {

        result = result.filter(
            product => product.price < 100
        );

    } else if (selectedPrice === "100-300") {

        result = result.filter(
            product =>
                product.price >= 100 &&
                product.price <= 300
        );

    } else if (selectedPrice === "300plus") {

        result = result.filter(
            product => product.price > 300
        );
    }


    /* Sorting */

    const sort = sortSelect.value;

    if (sort === "price-low") {

        result.sort(
            (a, b) => a.price - b.price
        );

    } else if (sort === "price-high") {

        result.sort(
            (a, b) => b.price - a.price
        );

    } else if (sort === "discount") {

        result.sort(
            (a, b) =>
                getDiscount(b.price, b.mrp) -
                getDiscount(a.price, a.mrp)
        );
    }

    return result;
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const discount =
        getDiscount(product.price, product.mrp);

    const card =
        document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

        <a
            href="/product/${product.id}"
            class="product-image-wrap"
        >

            ${
                discount > 0
                    ? `<span class="discount-badge">
                        ${discount}% OFF
                       </span>`
                    : ""
            }

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
                onerror="this.style.opacity='0.25'"
            >

        </a>


        <div class="product-content">

            <span class="product-category">
                ${product.category}
            </span>

            <a
                href="/product/${product.id}"
                class="product-name"
            >
                ${product.name}
            </a>

            <span class="product-size">
                ${product.size}
            </span>


            <div class="price-row">

                <span class="product-price">
                    ₹${product.price}
                </span>

                ${
                    product.mrp > product.price
                        ? `<span class="product-mrp">
                            ₹${product.mrp}
                           </span>`
                        : ""
                }

            </div>


            <button
                class="add-button"
                data-product-id="${product.id}"
            >
                Add
            </button>

        </div>

    `;

    return card;
}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const filteredProducts =
        getFilteredProducts();

    productGrid.innerHTML = "";

    if (filteredProducts.length === 0) {

        productGrid.style.display = "none";
        emptyState.hidden = false;

        resultCount.textContent =
            "No exact products found";

        mobileResultCount.textContent =
            "0 products";

        return;
    }


    productGrid.style.display = "grid";
    emptyState.hidden = true;


    filteredProducts.forEach(product => {

        productGrid.appendChild(
            createProductCard(product)
        );

    });


    const count =
        filteredProducts.length;

    resultCount.textContent =
        `${count} ${count === 1 ? "product" : "products"} found`;

    mobileResultCount.textContent =
        `${count} products`;

    attachAddButtons();
}


/* =========================================================
   ADD TO CART
========================================================= */

function attachAddButtons() {

    const buttons =
        document.querySelectorAll(".add-button");

    buttons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();
            event.stopPropagation();

            const productId =
                Number(button.dataset.productId);

            const product =
                products.find(
                    item => item.id === productId
                );

            if (!product) return;


            const existing =
                cart.find(
                    item => item.id === productId
                );


            if (existing) {

                existing.quantity += 1;

            } else {

                cart.push({
                    id: product.id,
                    quantity: 1
                });
            }


            localStorage.setItem(
                "marteyCart",
                JSON.stringify(cart)
            );

            updateCartCount();


            button.textContent = "Added ✓";
            button.classList.add("added");


            setTimeout(() => {

                button.textContent = "Add";
                button.classList.remove("added");

            }, 1000);

        });

    });
}


/* =========================================================
   SEARCH TITLE
========================================================= */

function updateSearchTitle() {

    if (currentQuery) {

        searchTitle.textContent =
            `Search results for "${currentQuery}"`;

        searchInput.value =
            currentQuery;

    } else {

        searchTitle.textContent =
            "All products";

        searchInput.value = "";
    }
}


/* =========================================================
   SEARCH SUBMIT
========================================================= */

searchForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const query =
            searchInput.value.trim();

        if (!query) {

            window.history.replaceState(
                {},
                "",
                "/search"
            );

            currentQuery = "";

            updateSearchTitle();
            renderProducts();

            return;
        }


        window.location.href =
            `/search?q=${encodeURIComponent(query)}`;
    }
);


/* =========================================================
   SEARCH SUGGESTIONS
========================================================= */

searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!query) {

            searchSuggestions.classList.remove(
                "active"
            );

            return;
        }


        const matches =
            products
                .filter(product =>
                    matchesProduct(product, query)
                )
                .slice(0, 5);


        if (matches.length === 0) {

            searchSuggestions.innerHTML = `
                <div class="suggestion-item">
                    <div class="suggestion-info">
                        <strong>No products found</strong>
                        <span>Try another search</span>
                    </div>
                </div>
            `;

        } else {

            searchSuggestions.innerHTML =
                matches.map(product => `

                    <a
                        href="/product/${product.id}"
                        class="suggestion-item"
                    >

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                        <div class="suggestion-info">

                            <strong>
                                ${product.name}
                            </strong>

                            <span>
                                ${product.size}
                                ·
                                ${product.category}
                            </span>

                        </div>

                        <span class="suggestion-price">
                            ₹${product.price}
                        </span>

                    </a>

                `).join("");
        }


        searchSuggestions.classList.add(
            "active"
        );
    }
);


/* =========================================================
   CLOSE SUGGESTIONS
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !searchForm.contains(event.target)
        ) {

            searchSuggestions.classList.remove(
                "active"
            );
        }
    }
);


/* =========================================================
   FILTER EVENTS
========================================================= */

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


sortSelect.addEventListener(
    "change",
    renderProducts
);


/* =========================================================
   CLEAR FILTERS
========================================================= */

clearFilters.addEventListener(
    "click",
    () => {

        categoryFilters.forEach(
            input => input.checked = false
        );

        document.querySelector(
            'input[name="price"][value="all"]'
        ).checked = true;

        sortSelect.value = "relevance";

        renderProducts();
    }
);


/* =========================================================
   SHOW ALL
========================================================= */

showAllButton.addEventListener(
    "click",
    () => {

        window.location.href = "/search";
    }
);


/* =========================================================
   MOBILE FILTER
========================================================= */

mobileFilterButton.addEventListener(
    "click",
    () => {

        const filters =
            document.querySelector(".filters");

        filters.style.display =
            filters.style.display === "block"
                ? "none"
                : "block";
    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateSearchTitle();
renderProducts();
