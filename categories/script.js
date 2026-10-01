/* =========================================================
   MARTEY — CATEGORIES PAGE
========================================================= */

const categories = [

    {
        name: "Milk & Dairy",
        description: "Milk, curd, butter & more",
        icon: "🥛",
        url: "/milk",
        popular: true
    },

    {
        name: "Bakery",
        description: "Bread, cakes & bakery",
        icon: "🥐",
        url: "/bakery",
        popular: true
    },

    {
        name: "Drinks",
        description: "Juices, beverages & drinks",
        icon: "🥤",
        url: "/drinks",
        popular: true
    },

    {
        name: "Snacks",
        description: "Chips, biscuits & snacks",
        icon: "🍿",
        url: "/snacks",
        popular: true
    },

    {
        name: "Fruits & Vegetables",
        description: "Fresh fruits & vegetables",
        icon: "🍎",
        url: "/fruits-vegetables",
        popular: true
    },

    {
        name: "Personal Care",
        description: "Daily personal essentials",
        icon: "🧴",
        url: "/personal-care",
        popular: false
    },

    {
        name: "Household",
        description: "Cleaning & home essentials",
        icon: "🏠",
        url: "/household",
        popular: false
    },

    {
        name: "Baby Care",
        description: "Baby food & essentials",
        icon: "👶",
        url: "/baby-care",
        popular: false
    },

    {
        name: "Pet Supplies",
        description: "Food & care for pets",
        icon: "🐾",
        url: "/pet-supplies",
        popular: false
    },

    {
        name: "Grocery",
        description: "Everyday grocery essentials",
        icon: "🛒",
        url: "/grocery",
        popular: false
    },

    {
        name: "Beauty",
        description: "Beauty & grooming essentials",
        icon: "💄",
        url: "/beauty",
        popular: false
    },

    {
        name: "Electronics & Accessories",
        description: "Useful tech & accessories",
        icon: "🎧",
        url: "/electronics",
        popular: false
    },

    {
        name: "Stationery",
        description: "Books, notebooks & supplies",
        icon: "📚",
        url: "/stationery",
        popular: false
    },

    {
        name: "Gifts",
        description: "Gifts for every occasion",
        icon: "🎁",
        url: "/gifts",
        popular: false
    },

    {
        name: "More",
        description: "Explore more on MARTEY",
        icon: "＋",
        url: "/more",
        popular: false
    }

];


/* =========================================================
   DOM
========================================================= */

const popularGrid =
    document.getElementById("popularGrid");

const allCategoriesGrid =
    document.getElementById("allCategoriesGrid");

const categorySearch =
    document.getElementById("categorySearch");

const categoryResultCount =
    document.getElementById("categoryResultCount");

const emptyCategoryState =
    document.getElementById("emptyCategoryState");

const cartCount =
    document.getElementById("cartCount");

const searchInput =
    document.getElementById("searchInput");

const locationButton =
    document.getElementById("locationButton");

const currentYear =
    document.getElementById("currentYear");


/* =========================================================
   POPULAR CARD
========================================================= */

function createPopularCard(category) {

    const card =
        document.createElement("a");

    card.className = "popular-card";
    card.href = category.url;

    card.innerHTML = `
        <div class="category-icon">
            ${category.icon}
        </div>

        <div>
            <h3>${category.name}</h3>

            <p>
                ${category.description}
            </p>
        </div>
    `;

    return card;
}


/* =========================================================
   CATEGORY CARD
========================================================= */

function createCategoryCard(category) {

    const card =
        document.createElement("a");

    card.className = "category-card";
    card.href = category.url;

    card.innerHTML = `
        <div class="category-icon">
            ${category.icon}
        </div>

        <div class="category-card-content">

            <h3>
                ${category.name}
            </h3>

            <p>
                ${category.description}
            </p>

        </div>

        <span class="category-arrow">
            →
        </span>
    `;

    return card;
}


/* =========================================================
   RENDER POPULAR
========================================================= */

function renderPopularCategories() {

    if (!popularGrid) {
        return;
    }

    popularGrid.innerHTML = "";

    const popular =
        categories.filter(
            category => category.popular
        );

    popular.forEach(category => {

        popularGrid.appendChild(
            createPopularCard(category)
        );

    });
}


/* =========================================================
   RENDER ALL
========================================================= */

function renderCategories(list) {

    if (!allCategoriesGrid) {
        return;
    }

    allCategoriesGrid.innerHTML = "";

    if (!list.length) {

        if (emptyCategoryState) {
            emptyCategoryState.classList.remove("hidden");
        }

        if (categoryResultCount) {
            categoryResultCount.textContent =
                "0 categories";
        }

        return;
    }

    if (emptyCategoryState) {
        emptyCategoryState.classList.add("hidden");
    }

    list.forEach(category => {

        allCategoriesGrid.appendChild(
            createCategoryCard(category)
        );

    });

    if (categoryResultCount) {

        categoryResultCount.textContent =
            `${list.length} ${
                list.length === 1
                    ? "category"
                    : "categories"
            }`;
    }
}


/* =========================================================
   CATEGORY SEARCH
========================================================= */

function filterCategories() {

    if (!categorySearch) {
        return;
    }

    const query =
        categorySearch.value
            .trim()
            .toLowerCase();

    if (!query) {

        renderCategories(categories);

        return;
    }

    const filtered =
        categories.filter(category => {

            const searchableText = `
                ${category.name}
                ${category.description}
            `.toLowerCase();

            return searchableText.includes(query);
        });

    renderCategories(filtered);
}

if (categorySearch) {

    categorySearch.addEventListener(
        "input",
        filterCategories
    );
}


/* =========================================================
   MAIN SEARCH
========================================================= */

function handleMainSearch() {

    if (!searchInput) {
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

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                handleMainSearch();
            }

        }
    );
}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    if (!cartCount) {
        return;
    }

    const possibleKeys = [
        "marteyCart",
        "cart",
        "MARTEY_CART"
    ];

    let cart = [];

    for (const key of possibleKeys) {

        try {

            const stored =
                JSON.parse(
                    localStorage.getItem(key)
                );

            if (Array.isArray(stored)) {

                cart = stored;

                break;
            }

        } catch (error) {
            // Ignore invalid storage.
        }
    }


    let count = 0;

    cart.forEach(item => {

        const quantity =
            Number(
                item.quantity ??
                item.qty ??
                1
            );

        count += quantity > 0
            ? quantity
            : 1;

    });


    cartCount.textContent =
        count > 99
            ? "99+"
            : count;
}


/* =========================================================
   LOCATION
========================================================= */

if (locationButton) {

    locationButton.addEventListener(
        "click",
        () => {

            alert(
                "Location selection will be connected to MARTEY's nearby-store system later."
            );

        }
    );
}


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
   INIT
========================================================= */

function init() {

    renderPopularCategories();

    renderCategories(categories);

    updateCartCount();

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }

}

init();
