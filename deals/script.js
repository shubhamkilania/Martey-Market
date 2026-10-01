const dealProducts = [

    {
        id: 1001,
        name: "Fresh Full Cream Milk",
        category: "Milk & Dairy",
        size: "1 L",
        price: 68,
        mrp: 72,
        discount: 6,
        image: "/assets/products/milk.jpg"
    },

    {
        id: 1002,
        name: "Classic White Bread",
        category: "Bakery",
        size: "400 g",
        price: 45,
        mrp: 50,
        discount: 10,
        image: "/assets/products/bread.jpg"
    },

    {
        id: 1003,
        name: "Fresh Orange Drink",
        category: "Drinks",
        size: "750 ml",
        price: 55,
        mrp: 60,
        discount: 8,
        image: "/assets/products/orange-drink.jpg"
    },

    {
        id: 1004,
        name: "Classic Salted Chips",
        category: "Snacks",
        size: "100 g",
        price: 28,
        mrp: 30,
        discount: 7,
        image: "/assets/products/chips.jpg"
    },

    {
        id: 1005,
        name: "Fresh Bananas",
        category: "Fruits & Vegetables",
        size: "1 kg",
        price: 49,
        mrp: 55,
        discount: 11,
        image: "/assets/products/bananas.jpg"
    },

    {
        id: 1006,
        name: "Daily Care Shampoo",
        category: "Personal Care",
        size: "180 ml",
        price: 149,
        mrp: 175,
        discount: 15,
        image: "/assets/products/shampoo.jpg"
    },

    {
        id: 1007,
        name: "Liquid Laundry Detergent",
        category: "Household",
        size: "1 L",
        price: 189,
        mrp: 220,
        discount: 14,
        image: "/assets/products/detergent.jpg"
    },

    {
        id: 1008,
        name: "Soft Baby Wipes",
        category: "Baby Care",
        size: "80 wipes",
        price: 99,
        mrp: 120,
        discount: 18,
        image: "/assets/products/baby-wipes.jpg"
    },

    {
        id: 1009,
        name: "Crunchy Butter Biscuits",
        category: "Snacks",
        size: "200 g",
        price: 42,
        mrp: 50,
        discount: 16,
        image: "/assets/products/biscuits.jpg"
    },

    {
        id: 1010,
        name: "Premium Pet Food",
        category: "Pet Supplies",
        size: "1 kg",
        price: 299,
        mrp: 340,
        discount: 12,
        image: "/assets/products/pet-food.jpg"
    },

    {
        id: 1011,
        name: "Wireless Headphones",
        category: "Electronics & Accessories",
        size: "1 unit",
        price: 899,
        mrp: 1199,
        discount: 25,
        image: "/assets/products/headphones.jpg"
    },

    {
        id: 1012,
        name: "Premium Spiral Notebook",
        category: "Stationery",
        size: "200 pages",
        price: 99,
        mrp: 125,
        discount: 21,
        image: "/assets/products/notebook.jpg"
    }

];


/* =========================================================
   DOM
========================================================= */

const productGrid =
    document.getElementById("dealProductGrid");

const resultCount =
    document.getElementById("resultCount");

const dealProductCount =
    document.getElementById("dealProductCount");

const emptyState =
    document.getElementById("emptyState");

const sortSelect =
    document.getElementById("sortSelect");

const dealCategoryList =
    document.getElementById("dealCategoryList");

const cartCount =
    document.getElementById("cartCount");

const searchInput =
    document.getElementById("searchInput");

const mainSearchForm =
    document.getElementById("mainSearchForm");

const locationButton =
    document.getElementById("locationButton");

const toast =
    document.getElementById("toast");

const currentYear =
    document.getElementById("currentYear");


/* =========================================================
   STATE
========================================================= */

let activeCategory = "all";


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function handleImageError(image) {

    image.style.opacity = "0";

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const card =
        document.createElement("article");

    card.className = "product-card";


    card.innerHTML = `

        <a
            href="/product/${product.id}"
            class="product-image-link"
        >

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="discount-badge">
                    ${product.discount}% OFF
                </span>


                <button
                    class="quick-add"
                    type="button"
                    data-add-id="${product.id}"
                >
                    ADD
                </button>

            </div>

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


            <div class="product-price-row">

                <span class="product-price">
                    ₹${product.price}
                </span>

                <span class="product-mrp">
                    ₹${product.mrp}
                </span>

                <span class="product-save">
                    Save ₹${product.mrp - product.price}
                </span>

            </div>

        </div>

    `;


    const image =
        card.querySelector("img");

    image.addEventListener(
        "error",
        () => handleImageError(image)
    );


    return card;
}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(products) {

    productGrid.innerHTML = "";


    if (!products.length) {

        emptyState.classList.remove(
            "hidden"
        );

        resultCount.textContent =
            "0 deals";

        return;

    }


    emptyState.classList.add(
        "hidden"
    );


    products.forEach(product => {

        productGrid.appendChild(
            createProductCard(product)
        );

    });


    resultCount.textContent =
        `${products.length} ${
            products.length === 1
                ? "deal"
                : "deals"
        }`;

}


/* =========================================================
   FILTER
========================================================= */

function getFilteredProducts() {

    if (activeCategory === "all") {

        return [...dealProducts];

    }


    return dealProducts.filter(
        product =>
            product.category === activeCategory
    );

}


/* =========================================================
   SORT
========================================================= */

function sortProducts(products) {

    const sorted =
        [...products];


    switch (sortSelect.value) {

        case "discount-high":

            sorted.sort(
                (a, b) =>
                    b.discount - a.discount
            );

            break;


        case "price-low":

            sorted.sort(
                (a, b) =>
                    a.price - b.price
            );

            break;


        case "price-high":

            sorted.sort(
                (a, b) =>
                    b.price - a.price
            );

            break;


        case "name":

            sorted.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );

            break;


        default:

            break;

    }


    return sorted;

}


/* =========================================================
   UPDATE PRODUCTS
========================================================= */

function updateProducts() {

    const filtered =
        getFilteredProducts();

    const sorted =
        sortProducts(filtered);

    renderProducts(sorted);

}


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

dealCategoryList?.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".deal-category"
            );


        if (!button) {
            return;
        }


        document
            .querySelectorAll(
                ".deal-category"
            )
            .forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


        button.classList.add(
            "active"
        );


        activeCategory =
            button.dataset.category;


        updateProducts();

    }
);


/* =========================================================
   SORT
========================================================= */

sortSelect?.addEventListener(
    "change",
    updateProducts
);


/* =========================================================
   CART STORAGE
========================================================= */

function getCart() {

    const possibleKeys = [
        "marteyCart",
        "cart",
        "MARTEY_CART"
    ];


    for (const key of possibleKeys) {

        try {

            const stored =
                JSON.parse(
                    localStorage.getItem(key)
                );


            if (Array.isArray(stored)) {

                return stored;

            }

        } catch (error) {

            // Ignore invalid cart data.

        }

    }


    return [];

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart(cart) {

    localStorage.setItem(
        "marteyCart",
        JSON.stringify(cart)
    );


    updateCartCount();

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {

    const product =
        dealProducts.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (!product) {
        return;
    }


    const cart =
        getCart();


    const existing =
        cart.find(item => {

            const itemId =
                item.id ??
                item.productId ??
                item.productID;

            return Number(itemId) ===
                Number(productId);

        });


    if (existing) {

        existing.quantity =
            Number(
                existing.quantity ??
                existing.qty ??
                0
            ) + 1;

        delete existing.qty;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            category: product.category,

            size: product.size,

            price: product.price,

            mrp: product.mrp,

            discount: product.discount,

            image: product.image,

            quantity: 1

        });

    }


    saveCart(cart);

    showToast(
        `${product.name} added to cart`
    );

}


/* =========================================================
   ADD BUTTON EVENT DELEGATION
========================================================= */

productGrid?.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".quick-add"
            );


        if (!button) {
            return;
        }


        event.preventDefault();

        event.stopPropagation();


        const productId =
            button.dataset.addId;


        addToCart(productId);

    }
);


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    if (!cartCount) {
        return;
    }


    const cart =
        getCart();


    let total = 0;


    cart.forEach(item => {

        const quantity =
            Number(
                item.quantity ??
                item.qty ??
                1
            );


        total +=
            quantity > 0
                ? quantity
                : 1;

    });


    cartCount.textContent =
        total > 99
            ? "99+"
            : total;

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================================================
   MAIN SEARCH
========================================================= */

mainSearchForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const query =
            searchInput?.value.trim();


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

locationButton?.addEventListener(
    "click",
    () => {

        alert(
            "Location selection will be connected to MARTEY's nearby-store system later."
        );

    }
);


/* =========================================================
   STORAGE SYNC
========================================================= */

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


/* =========================================================
   IMAGE PRELOADING FALLBACK
========================================================= */

document.addEventListener(
    "error",
    event => {

        if (
            event.target &&
            event.target.tagName === "IMG"
        ) {

            event.target.style.opacity =
                "0";

        }

    },
    true
);


/* =========================================================
   INIT
========================================================= */

function init() {

    updateProducts();

    updateCartCount();


    if (dealProductCount) {

        dealProductCount.textContent =
            dealProducts.length;

    }


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

}


init();
