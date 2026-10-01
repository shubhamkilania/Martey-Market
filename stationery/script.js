const products = [

    // NOTEBOOKS & REGISTERS
    {
        id: 1283,
        name: "Classic Ruled Notebook",
        category: "Notebooks & Registers",
        size: "172 pages",
        price: 59,
        mrp: 70,
        rating: 4.6,
        image: "notebook.jpg"
    },

    {
        id: 1284,
        name: "Premium Spiral Notebook",
        category: "Notebooks & Registers",
        size: "200 pages",
        price: 129,
        mrp: 160,
        rating: 4.7,
        image: "spiral-notebook.jpg"
    },

    {
        id: 1285,
        name: "Long Class Notebook",
        category: "Notebooks & Registers",
        size: "180 pages",
        price: 69,
        mrp: 80,
        rating: 4.5,
        image: "long-notebook.jpg"
    },

    {
        id: 1286,
        name: "Hard Cover Register",
        category: "Notebooks & Registers",
        size: "300 pages",
        price: 179,
        mrp: 220,
        rating: 4.7,
        image: "register.jpg"
    },

    {
        id: 1287,
        name: "A5 Daily Notes Book",
        category: "Notebooks & Registers",
        size: "160 pages",
        price: 99,
        mrp: 120,
        rating: 4.5,
        image: "a5-notebook.jpg"
    },


    // PENS & PENCILS
    {
        id: 1288,
        name: "Smooth Ball Pen Pack",
        category: "Pens & Pencils",
        size: "10 pens",
        price: 55,
        mrp: 65,
        rating: 4.6,
        image: "ball-pen.jpg"
    },

    {
        id: 1289,
        name: "Premium Gel Pen Pack",
        category: "Pens & Pencils",
        size: "5 pens",
        price: 75,
        mrp: 90,
        rating: 4.7,
        image: "gel-pen.jpg"
    },

    {
        id: 1290,
        name: "Blue Ball Pen Pack",
        category: "Pens & Pencils",
        size: "10 pens",
        price: 49,
        mrp: 60,
        rating: 4.5,
        image: "blue-pen-pack.jpg"
    },

    {
        id: 1291,
        name: "HB Writing Pencils",
        category: "Pens & Pencils",
        size: "10 pencils",
        price: 45,
        mrp: 55,
        rating: 4.6,
        image: "pencils.jpg"
    },

    {
        id: 1292,
        name: "Mechanical Pencil",
        category: "Pens & Pencils",
        size: "1 pc",
        price: 39,
        mrp: 50,
        rating: 4.5,
        image: "mechanical-pencil.jpg"
    },

    {
        id: 1293,
        name: "Eraser Pack",
        category: "Pens & Pencils",
        size: "5 pcs",
        price: 25,
        mrp: 30,
        rating: 4.5,
        image: "eraser.jpg"
    },

    {
        id: 1294,
        name: "Premium Pencil Sharpener",
        category: "Pens & Pencils",
        size: "2 pcs",
        price: 35,
        mrp: 45,
        rating: 4.4,
        image: "sharpener.jpg"
    },


    // ART & CRAFT
    {
        id: 1295,
        name: "Wax Crayons Set",
        category: "Art & Craft",
        size: "24 colours",
        price: 85,
        mrp: 105,
        rating: 4.7,
        image: "crayons.jpg"
    },

    {
        id: 1296,
        name: "Premium Colour Pencils",
        category: "Art & Craft",
        size: "24 colours",
        price: 149,
        mrp: 180,
        rating: 4.7,
        image: "colour-pencils.jpg"
    },

    {
        id: 1297,
        name: "Water Colours Set",
        category: "Art & Craft",
        size: "12 colours",
        price: 79,
        mrp: 95,
        rating: 4.6,
        image: "water-colours.jpg"
    },

    {
        id: 1298,
        name: "Drawing Book",
        category: "Art & Craft",
        size: "40 pages",
        price: 69,
        mrp: 85,
        rating: 4.5,
        image: "drawing-book.jpg"
    },

    {
        id: 1299,
        name: "Premium Art Paper",
        category: "Art & Craft",
        size: "25 sheets",
        price: 119,
        mrp: 145,
        rating: 4.6,
        image: "art-paper.jpg"
    },

    {
        id: 1300,
        name: "Craft Paper Pack",
        category: "Art & Craft",
        size: "20 sheets",
        price: 65,
        mrp: 80,
        rating: 4.5,
        image: "craft-paper.jpg"
    },

    {
        id: 1301,
        name: "Multi Purpose Glue",
        category: "Art & Craft",
        size: "50 g",
        price: 39,
        mrp: 50,
        rating: 4.5,
        image: "glue.jpg"
    },

    {
        id: 1302,
        name: "Safety Craft Scissors",
        category: "Art & Craft",
        size: "1 pc",
        price: 59,
        mrp: 70,
        rating: 4.5,
        image: "scissors.jpg"
    },


    // SCHOOL SUPPLIES
    {
        id: 1303,
        name: "Complete School Pencil Pouch",
        category: "School Supplies",
        size: "1 pc",
        price: 129,
        mrp: 160,
        rating: 4.6,
        image: "school-pencil-pouch.jpg"
    },

    {
        id: 1304,
        name: "School Name Labels",
        category: "School Supplies",
        size: "40 labels",
        price: 59,
        mrp: 75,
        rating: 4.5,
        image: "school-name-labels.jpg"
    },

    {
        id: 1305,
        name: "Student Study Kit",
        category: "School Supplies",
        size: "1 set",
        price: 199,
        mrp: 240,
        rating: 4.7,
        image: "study-kit.jpg"
    },

    {
        id: 1306,
        name: "Homework Notebook Set",
        category: "School Supplies",
        size: "4 notebooks",
        price: 159,
        mrp: 190,
        rating: 4.6,
        image: "homework-notebooks.jpg"
    },


    // OFFICE SUPPLIES
    {
        id: 1307,
        name: "Heavy Duty Stapler",
        category: "Office Supplies",
        size: "1 pc",
        price: 149,
        mrp: 180,
        rating: 4.6,
        image: "stapler.jpg"
    },

    {
        id: 1308,
        name: "Staples Pack",
        category: "Office Supplies",
        size: "1000 staples",
        price: 35,
        mrp: 45,
        rating: 4.5,
        image: "staples.jpg"
    },

    {
        id: 1309,
        name: "Paper Clips",
        category: "Office Supplies",
        size: "100 pcs",
        price: 45,
        mrp: 55,
        rating: 4.5,
        image: "paper-clips.jpg"
    },

    {
        id: 1310,
        name: "Sticky Notes",
        category: "Office Supplies",
        size: "100 sheets",
        price: 59,
        mrp: 75,
        rating: 4.6,
        image: "sticky-notes.jpg"
    },


    // PAPER & PRINTING
    {
        id: 1311,
        name: "A4 Copier Paper",
        category: "Paper & Printing",
        size: "500 sheets",
        price: 299,
        mrp: 350,
        rating: 4.7,
        image: "a4-paper.jpg"
    },

    {
        id: 1312,
        name: "Premium Printer Paper",
        category: "Paper & Printing",
        size: "100 sheets",
        price: 119,
        mrp: 145,
        rating: 4.6,
        image: "printer-paper.jpg"
    },


    // MARKERS & HIGHLIGHTERS
    {
        id: 1313,
        name: "Highlighter Set",
        category: "Markers & Highlighters",
        size: "6 colours",
        price: 89,
        mrp: 110,
        rating: 4.7,
        image: "highlighters.jpg"
    },

    {
        id: 1314,
        name: "Permanent Marker Set",
        category: "Markers & Highlighters",
        size: "4 markers",
        price: 75,
        mrp: 95,
        rating: 4.6,
        image: "markers.jpg"
    },

    {
        id: 1315,
        name: "Sketch Pens",
        category: "Markers & Highlighters",
        size: "12 colours",
        price: 99,
        mrp: 125,
        rating: 4.6,
        image: "sketch-pens.jpg"
    },


    // SCHOOL ACCESSORIES
    {
        id: 1316,
        name: "School Water Bottle",
        category: "School Accessories",
        size: "750 ml",
        price: 179,
        mrp: 220,
        rating: 4.6,
        image: "school-bottle.jpg"
    },


    // FILES & FOLDERS
    {
        id: 1317,
        name: "Document File Folder",
        category: "Files & Folders",
        size: "12 pockets",
        price: 129,
        mrp: 160,
        rating: 4.6,
        image: "document-folder.jpg"
    }

];


/* =========================
   ELEMENTS
========================= */

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const productCount = document.getElementById("productCount");

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const searchSuggestions = document.getElementById("searchSuggestions");

const sortSelect = document.getElementById("sortSelect");
const mobileSort = document.getElementById("mobileSort");

const clearFilters = document.getElementById("clearFilters");
const emptyClear = document.getElementById("emptyClear");

const filterOpen = document.getElementById("filterOpen");
const filterClose = document.getElementById("filterClose");
const filterSidebar = document.getElementById("filterSidebar");
const filterOverlay = document.getElementById("filterOverlay");

const locationBtn = document.getElementById("locationBtn");

const categoryFilters = document.querySelectorAll(".category-filter");
const priceFilters = document.querySelectorAll(".price-filter");

const cartCount = document.getElementById("cartCount");


/* =========================
   IMAGE FALLBACK
========================= */

function getImage(product) {

    return `../assets/products/${product.image}`;

}


/* =========================
   DISCOUNT
========================= */

function getDiscount(product) {

    if (!product.mrp || product.mrp <= product.price) {
        return 0;
    }

    return Math.round(
        ((product.mrp - product.price) / product.mrp) * 100
    );

}


/* =========================
   CART
========================= */

function getCart() {

    try {

        const keys = [
            "marteyCart",
            "cart",
            "MARTEY_CART"
        ];

        for (const key of keys) {

            const saved = localStorage.getItem(key);

            if (!saved) continue;

            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                return parsed;
            }

            if (parsed && Array.isArray(parsed.items)) {
                return parsed.items;
            }

        }

    } catch (error) {

        console.error("Cart read error:", error);

    }

    return [];

}


function normalizeCart(cart) {

    return cart.map(item => {

        if (typeof item === "number") {
            return {
                id: item,
                quantity: 1
            };
        }

        return {
            ...item,
            id: Number(
                item.id ??
                item.productId ??
                item.productID
            ),
            quantity: Number(
                item.quantity ??
                item.qty ??
                1
            )
        };

    });

}


function saveCart(cart) {

    localStorage.setItem(
        "marteyCart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const cart = normalizeCart(getCart());

    const total = cart.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0),
        0
    );

    cartCount.textContent = total;

}


function addToCart(productId) {

    let cart = normalizeCart(getCart());

    const existing = cart.find(
        item => Number(item.id) === Number(productId)
    );

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            id: Number(productId),
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

}


/* =========================
   FILTER STATE
========================= */

function getSelectedCategories() {

    return [
        ...document.querySelectorAll(
            ".category-filter:checked"
        )
    ].map(input => input.value);

}


function getSelectedPrices() {

    return [
        ...document.querySelectorAll(
            ".price-filter:checked"
        )
    ].map(input => input.value);

}


function priceMatches(product, filters) {

    if (!filters.length) {
        return true;
    }

    return filters.some(filter => {

        if (filter === "under100") {
            return product.price < 100;
        }

        if (filter === "100-250") {
            return product.price >= 100 &&
                   product.price <= 250;
        }

        if (filter === "above250") {
            return product.price > 250;
        }

        return true;

    });

}


/* =========================
   SEARCH
========================= */

function getSearchQuery() {

    return searchInput.value
        .trim()
        .toLowerCase();

}


function searchMatches(product, query) {

    if (!query) {
        return true;
    }

    const text = `
        ${product.name}
        ${product.category}
        ${product.size}
    `.toLowerCase();

    return text.includes(query);

}


function renderSearchSuggestions() {

    const query = searchInput.value
        .trim()
        .toLowerCase();

    searchSuggestions.innerHTML = "";

    if (!query) {

        searchSuggestions.classList.remove("active");

        return;

    }

    const matches = products
        .filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        )
        .slice(0, 6);

    if (!matches.length) {

        searchSuggestions.classList.remove("active");

        return;

    }

    matches.forEach(product => {

        const item = document.createElement("div");

        item.className = "suggestion-item";

        item.innerHTML = `
            <img
                src="${getImage(product)}"
                alt="${product.name}"
                onerror="this.src='../assets/products/notebook.jpg'"
            >

            <div class="suggestion-info">
                <strong>${product.name}</strong>
                <span>
                    ${product.category} · ₹${product.price}
                </span>
            </div>
        `;

        item.addEventListener("click", () => {

            window.location.href =
                `/product/${product.id}`;

        });

        searchSuggestions.appendChild(item);

    });

    searchSuggestions.classList.add("active");

}


/* =========================
   SORT
========================= */

function sortProducts(list, sortType) {

    const sorted = [...list];

    if (sortType === "price-low") {

        sorted.sort(
            (a, b) => a.price - b.price
        );

    }

    if (sortType === "price-high") {

        sorted.sort(
            (a, b) => b.price - a.price
        );

    }

    if (sortType === "discount") {

        sorted.sort(
            (a, b) =>
                getDiscount(b) -
                getDiscount(a)
        );

    }

    return sorted;

}


/* =========================
   FILTER PRODUCTS
========================= */

function getFilteredProducts() {

    const query = getSearchQuery();

    const selectedCategories =
        getSelectedCategories();

    const selectedPrices =
        getSelectedPrices();

    let filtered = products.filter(product => {

        const categoryMatch =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        const priceMatch =
            priceMatches(product, selectedPrices);

        const searchMatch =
            searchMatches(product, query);

        return (
            categoryMatch &&
            priceMatch &&
            searchMatch
        );

    });

    const sortType = sortSelect.value;

    filtered = sortProducts(
        filtered,
        sortType
    );

    return filtered;

}


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts() {

    const filtered = getFilteredProducts();

    productGrid.innerHTML = "";

    productCount.textContent =
        `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`;

    if (!filtered.length) {

        emptyState.classList.add("active");

        return;

    }

    emptyState.classList.remove("active");

    filtered.forEach(product => {

        const discount =
            getDiscount(product);

        const card =
            document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <div
                class="product-image-wrap"
                data-product="${product.id}"
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
                    src="${getImage(product)}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.src='../assets/products/notebook.jpg'"
                >

            </div>


            <div class="product-content">

                <div class="product-category">
                    ${product.category}
                </div>

                <div
                    class="product-name"
                    data-product="${product.id}"
                >
                    ${product.name}
                </div>

                <div class="product-size">
                    ${product.size}
                </div>

                <div class="rating">
                    <span class="rating-star">★</span>
                    ${product.rating}
                </div>

                <div class="price-row">
                    <strong class="price">
                        ₹${product.price}
                    </strong>

                    <span class="mrp">
                        ₹${product.mrp}
                    </span>
                </div>

                <div class="card-bottom">

                    <button
                        class="add-btn"
                        data-add="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);

    });

    attachProductEvents();

}


/* =========================
   PRODUCT EVENTS
========================= */

function attachProductEvents() {

    document.querySelectorAll(
        "[data-product]"
    ).forEach(element => {

        element.addEventListener(
            "click",
            () => {

                const id =
                    element.dataset.product;

                window.location.href =
                    `/product/${id}`;

            }
        );

    });


    document.querySelectorAll(
        "[data-add]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const id =
                    Number(button.dataset.add);

                addToCart(id);

                button.textContent =
                    "Added ✓";

                button.classList.add("added");

                setTimeout(() => {

                    button.textContent =
                        "Add to Cart";

                    button.classList.remove(
                        "added"
                    );

                }, 900);

            }
        );

    });

}


/* =========================
   CLEAR FILTERS
========================= */

function clearAllFilters() {

    categoryFilters.forEach(
        checkbox => checkbox.checked = false
    );

    priceFilters.forEach(
        checkbox => checkbox.checked = false
    );

    searchInput.value = "";

    sortSelect.value = "relevance";
    mobileSort.value = "relevance";

    searchSuggestions.classList.remove(
        "active"
    );

    renderProducts();

}


/* =========================
   MOBILE FILTER
========================= */

function openFilters() {

    filterSidebar.classList.add("open");

    filterOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeFilters() {

    filterSidebar.classList.remove("open");

    filterOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================
   LOCATION
========================= */

locationBtn.addEventListener(
    "click",
    () => {

        alert(
            "Location selection will be connected to MARTEY's location system later."
        );

    }
);


/* =========================
   EVENTS
========================= */

searchInput.addEventListener(
    "input",
    () => {

        renderSearchSuggestions();

        renderProducts();

    }
);


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


sortSelect.addEventListener(
    "change",
    () => {

        mobileSort.value =
            sortSelect.value;

        renderProducts();

    }
);


mobileSort.addEventListener(
    "change",
    () => {

        sortSelect.value =
            mobileSort.value;

        renderProducts();

    }
);


categoryFilters.forEach(
    checkbox => {

        checkbox.addEventListener(
            "change",
            renderProducts
        );

    }
);


priceFilters.forEach(
    checkbox => {

        checkbox.addEventListener(
            "change",
            renderProducts
        );

    }
);


clearFilters.addEventListener(
    "click",
    clearAllFilters
);


emptyClear.addEventListener(
    "click",
    clearAllFilters
);


filterOpen.addEventListener(
    "click",
    openFilters
);


filterClose.addEventListener(
    "click",
    closeFilters
);


filterOverlay.addEventListener(
    "click",
    closeFilters
);


/* Close search suggestions outside */

document.addEventListener(
    "click",
    event => {

        if (!event.target.closest(".search-box")) {

            searchSuggestions.classList.remove(
                "active"
            );

        }

    }
);


/* =========================
   INITIALIZE
========================= */

updateCartCount();

renderProducts();
