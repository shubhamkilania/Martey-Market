const categories = [

    {
        name: "Milk & Dairy",
        description: "Milk, curd, butter & more",
        image: "/assets/categories/milk.jpg",
        url: "/milk",
        popular: true
    },

    {
        name: "Bakery",
        description: "Bread, cakes & bakery",
        image: "/assets/categories/bakery.jpg",
        url: "/bakery",
        popular: true
    },

    {
        name: "Drinks",
        description: "Juices, beverages & drinks",
        image: "/assets/categories/drinks.jpg",
        url: "/drinks",
        popular: true
    },

    {
        name: "Snacks",
        description: "Chips, biscuits & snacks",
        image: "/assets/categories/snacks.jpg",
        url: "/snacks",
        popular: true
    },

    {
        name: "Fruits & Vegetables",
        description: "Fresh fruits & vegetables",
        image: "/assets/categories/fruits-vegetables.jpg",
        url: "/fruits-vegetables",
        popular: true
    },

    {
        name: "Personal Care",
        description: "Daily personal essentials",
        image: "/assets/categories/personal-care.jpg",
        url: "/personal-care",
        popular: false
    },

    {
        name: "Household",
        description: "Cleaning & home essentials",
        image: "/assets/categories/household.jpg",
        url: "/household",
        popular: false
    },

    {
        name: "Baby Care",
        description: "Baby food & essentials",
        image: "/assets/categories/baby-care.jpg",
        url: "/baby-care",
        popular: false
    },

    {
        name: "Pet Supplies",
        description: "Food & care for pets",
        image: "/assets/categories/pet-supplies.jpg",
        url: "/pet-supplies",
        popular: false
    },

    {
        name: "Grocery",
        description: "Everyday grocery essentials",
        image: "/assets/categories/grocery.jpg",
        url: "/grocery",
        popular: false
    },

    {
        name: "Beauty",
        description: "Beauty & grooming essentials",
        image: "/assets/categories/beauty.jpg",
        url: "/beauty",
        popular: false
    },

    {
        name: "Electronics & Accessories",
        description: "Useful tech & accessories",
        image: "/assets/categories/electronics.jpg",
        url: "/electronics",
        popular: false
    },

    {
        name: "Stationery",
        description: "Books, notebooks & supplies",
        image: "/assets/categories/stationery.jpg",
        url: "/stationery",
        popular: false
    },

    {
        name: "Gifts",
        description: "Gifts for every occasion",
        image: "/assets/categories/gifts.jpg",
        url: "/gifts",
        popular: false
    },

    {
        name: "More",
        description: "Explore more on MARTEY",
        image: "/assets/categories/more.jpg",
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

const mainSearchForm =
    document.getElementById("mainSearchForm");

const locationButton =
    document.getElementById("locationButton");

const currentYear =
    document.getElementById("currentYear");

/* =========================================================
   ROTATING SEARCH PLACEHOLDER
========================================================= */

const searchSuggestions = [
    "Search for milk...",
    "Search for bakery...",
    "Search for drinks...",
    "Search for snacks...",
    "Search for fruits & vegetables...",
    "Search for personal care...",
    "Search for household...",
    "Search for baby care...",
    "Search for grocery...",
    "Search for beauty...",
    "Search for electronics..."
];

let suggestionIndex = 0;

function startSearchPlaceholderRotation() {
    if (!searchInput) return;

    setInterval(() => {

        // Do not rotate while user is typing
        if (searchInput.value.trim()) {
            return;
        }

        // Do not change placeholder while input is focused
        if (document.activeElement === searchInput) {
            return;
        }

        searchInput.placeholder =
            searchSuggestions[suggestionIndex];

        suggestionIndex =
            (suggestionIndex + 1) % searchSuggestions.length;

    }, 1800);
}

startSearchPlaceholderRotation();


/* =========================================================
   SEARCH FOCUS
========================================================= */

if (searchInput) {

    searchInput.addEventListener("focus", () => {
        if (!searchInput.value.trim()) {
            searchInput.placeholder = "What are you looking for?";
        }
    });

    searchInput.addEventListener("blur", () => {
        if (!searchInput.value.trim()) {
            searchInput.placeholder =
                searchSuggestions[suggestionIndex];
        }
    });

}
/* =========================================================
   IMAGE FALLBACK
========================================================= */

function handleImageError(image) {

    image.style.display = "none";

    image.parentElement.classList.add(
        "image-fallback"
    );

}


/* =========================================================
   POPULAR CARD
========================================================= */

function createPopularCard(category) {

    const card =
        document.createElement("a");

    card.className = "popular-card";

    card.href = category.url;

    card.innerHTML = `

        <div class="popular-image">

            <img
                src="${category.image}"
                alt="${category.name}"
                loading="lazy"
            >

        </div>

        <div class="popular-card-content">

            <h3>
                ${category.name}
            </h3>

            <p>
                ${category.description}
            </p>

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
   ALL CATEGORY CARD
========================================================= */

function createCategoryCard(category) {

    const card =
        document.createElement("a");

    card.className = "category-card";

    card.href = category.url;

    card.innerHTML = `

        <div class="category-card-image">

            <img
                src="${category.image}"
                alt="${category.name}"
                loading="lazy"
            >

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

    const image =
        card.querySelector("img");

    image.addEventListener(
        "error",
        () => handleImageError(image)
    );

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

        emptyCategoryState?.classList.remove(
            "hidden"
        );

        if (categoryResultCount) {
            categoryResultCount.textContent =
                "0 categories";
        }

        return;
    }


    emptyCategoryState?.classList.add(
        "hidden"
    );


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

            return searchableText.includes(
                query
            );

        });


    renderCategories(filtered);

}


categorySearch?.addEventListener(
    "input",
    filterCategories
);


/* =========================================================
   MAIN SEARCH
========================================================= */

function handleMainSearch(event) {

    event?.preventDefault();

    const query =
        searchInput?.value.trim();


    if (!query) {
        return;
    }


    window.location.href =
        `/search?q=${encodeURIComponent(query)}`;

}


mainSearchForm?.addEventListener(
    "submit",
    handleMainSearch
);


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


        count +=
            quantity > 0
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

locationButton?.addEventListener(
    "click",
    () => {

        alert(
            "Location selection will be connected to MARTEY's nearby-store system later."
        );

    }
);


/* =========================================================
   CART STORAGE SYNC
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
