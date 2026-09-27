(() => {

    "use strict";


    /*
    ============================================================
    MARTEY CUSTOMER HOMEPAGE
    ============================================================

    FRONTEND PROTOTYPE ONLY.

    The product data below is mock data.

    Later this can be replaced with API/database data:

        API
         ↓
        Store
         ↓
        Inventory
         ↓
        Products

    No backend is connected yet.
    ============================================================
    */


    /* =========================================================
       PRODUCT DATA
    ========================================================= */

    const products = [

        {
            id: 1001,
            name: "Amul Taaza Toned Milk",
            size: "1 L",
            price: 64,
            mrp: 68,
            discount: "6% OFF",
            category: "milk",
            image:
                "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80"
        },


        {
            id: 1002,
            name: "Harvest White Bread",
            size: "400 g",
            price: 42,
            mrp: 50,
            discount: "16% OFF",
            category: "bakery",
            image:
                "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80"
        },


        {
            id: 1003,
            name: "Coca-Cola Original Taste",
            size: "750 ml",
            price: 45,
            mrp: 50,
            discount: "10% OFF",
            category: "drinks",
            image:
                "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80"
        },


        {
            id: 1004,
            name: "Lay's Classic Salted Chips",
            size: "50 g",
            price: 20,
            mrp: 20,
            discount: "",
            category: "snacks",
            image:
                "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=80"
        },


        {
            id: 1005,
            name: "Fresh Bananas",
            size: "6 pcs",
            price: 49,
            mrp: 60,
            discount: "18% OFF",
            category: "fruits-vegetables",
            image:
                "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80"
        },


        {
            id: 1006,
            name: "Colgate Strong Teeth",
            size: "200 g",
            price: 105,
            mrp: 125,
            discount: "16% OFF",
            category: "personal-care",
            image:
                "https://images.unsplash.com/photo-1628061767014-7b0e7b5c5e98?auto=format&fit=crop&w=700&q=80"
        },


        {
            id: 1007,
            name: "Surf Excel Matic",
            size: "2 kg",
            price: 335,
            mrp: 390,
            discount: "14% OFF",
            category: "household",
            image:
                "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80"
        },


        {
            id: 1008,
            name: "Nestlé Everyday Milk Powder",
            size: "200 g",
            price: 115,
            mrp: 130,
            discount: "12% OFF",
            category: "milk",
            image:
                "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=700&q=80"
        },


        {
            id: 1009,
            name: "Brown Eggs",
            size: "6 pcs",
            price: 58,
            mrp: 65,
            discount: "10% OFF",
            category: "grocery",
            image:
                "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=700&q=80"
        },


        {
            id: 1010,
            name: "Aashirvaad Atta",
            size: "5 kg",
            price: 285,
            mrp: 315,
            discount: "10% OFF",
            category: "grocery",
            image:
                "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80"
        }

    ];


    /* =========================================================
       CATEGORIES
    ========================================================= */

    const categories = [

        {
            name: "Milk & Dairy",
            short: "DAIRY",
            href: "/milk"
        },


        {
            name: "Bakery",
            short: "BAKERY",
            href: "/bakery"
        },


        {
            name: "Drinks",
            short: "DRINKS",
            href: "/drinks"
        },


        {
            name: "Snacks",
            short: "SNACKS",
            href: "/snacks"
        },


        {
            name: "Fresh",
            short: "FRESH",
            href: "/fruits-vegetables"
        },


        {
            name: "Personal Care",
            short: "CARE",
            href: "/personal-care"
        },


        {
            name: "Household",
            short: "HOME",
            href: "/household"
        },


        {
            name: "More",
            short: "MORE",
            href: "/categories"
        }

    ];


    /* =========================================================
       SEARCH PLACEHOLDER PRODUCTS
    ========================================================= */

    const searchPlaceholders = [

        "Search for milk...",
        "Search for bread...",
        "Search for snacks...",
        "Search for drinks...",
        "Search for fruits...",
        "Search for personal care...",
        "Search for household products...",
        "Search for groceries..."

    ];


    /* =========================================================
       DOM ELEMENTS
    ========================================================= */

    const categoryGrid =
        document.getElementById("categoryGrid");


    const dealGrid =
        document.getElementById("dealGrid");


    const essentialGrid =
        document.getElementById("essentialGrid");


    const searchForm =
        document.getElementById("searchForm");


    const searchInput =
        document.getElementById("searchInput");


    const clearSearch =
        document.getElementById("clearSearch");


    const searchSuggestions =
        document.getElementById("searchSuggestions");


    const cartCountElement =
        document.getElementById("cartCount");


    const locationButton =
        document.getElementById("locationButton");


    const locationModal =
        document.getElementById("locationModal");


    const locationText =
        document.getElementById("locationText");


    const toast =
        document.getElementById("toast");


    /* =========================================================
       CART
    ========================================================= */

    let cartCount =
        Number(
            localStorage.getItem("marteyCartCount") || 0
        );


    let toastTimer = null;


    /* =========================================================
       SEARCH PLACEHOLDER ROTATION
    ========================================================= */

    let placeholderIndex = 0;


    function rotateSearchPlaceholder() {

        if (
            document.activeElement === searchInput ||
            searchInput.value.trim() !== ""
        ) {
            return;
        }


        searchInput.placeholder =
            searchPlaceholders[placeholderIndex];


        placeholderIndex =
            (placeholderIndex + 1) %
            searchPlaceholders.length;
    }


    setInterval(
        rotateSearchPlaceholder,
        2200
    );


    rotateSearchPlaceholder();


    /* =========================================================
       PRICE
    ========================================================= */

    function formatPrice(value) {

        return `₹${value}`;

    }


    /* =========================================================
       ESCAPE HTML
    ========================================================= */

    function escapeHtml(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* =========================================================
       PRODUCT CARD
    ========================================================= */

    function productCard(product) {

        return `

            <article class="product-card">

                <a
                    href="/product/${product.id}"
                    aria-label="View ${escapeHtml(product.name)}">

                    <div class="product-image-wrap">

                        ${
                            product.discount
                                ? `
                                    <span class="deal-badge">
                                        ${escapeHtml(product.discount)}
                                    </span>
                                  `
                                : ""
                        }


                        <img
                            class="product-image"
                            src="${escapeHtml(product.image)}"
                            alt="${escapeHtml(product.name)}"
                            loading="lazy"
                        >

                    </div>

                </a>


                <div class="product-body">

                    <a href="/product/${product.id}">

                        <h3 class="product-name">
                            ${escapeHtml(product.name)}
                        </h3>


                        <div class="product-size">
                            ${escapeHtml(product.size)}
                        </div>

                    </a>


                    <div class="product-footer">

                        <div>

                            <span class="current-price">
                                ${formatPrice(product.price)}
                            </span>


                            ${
                                product.mrp > product.price
                                    ? `
                                        <span class="mrp">
                                            ₹${product.mrp}
                                        </span>
                                      `
                                    : ""
                            }

                        </div>


                        <button
                            class="add-button"
                            type="button"
                            data-add="${product.id}">

                            ADD

                        </button>

                    </div>

                </div>

            </article>

        `;

    }


    /* =========================================================
       RENDER CATEGORIES
    ========================================================= */

    function renderCategories() {

        categoryGrid.innerHTML =
            categories
                .map(category => {

                    return `

                        <a
                            class="category-card"
                            href="${category.href}">

                            <span class="category-icon">
                                ${escapeHtml(category.short)}
                            </span>

                            <strong>
                                ${escapeHtml(category.name)}
                            </strong>

                        </a>

                    `;

                })
                .join("");

    }


    /* =========================================================
       RENDER PRODUCTS
    ========================================================= */

    function renderProducts() {

        const deals =
            products
                .filter(product => product.discount)
                .slice(0, 5);


        const essentials =
            products.slice(5, 10);


        dealGrid.innerHTML =
            deals
                .map(productCard)
                .join("");


        essentialGrid.innerHTML =
            essentials
                .map(productCard)
                .join("");

    }


    /* =========================================================
       CART UPDATE
    ========================================================= */

    function updateCart() {

        cartCountElement.textContent =
            cartCount;


        localStorage.setItem(
            "marteyCartCount",
            String(cartCount)
        );

    }


    /* =========================================================
       ADD TO CART
    ========================================================= */

    function addToCart(productId) {

        const product =
            products.find(
                item =>
                    item.id === Number(productId)
            );


        if (!product) {
            return;
        }


        cartCount += 1;


        updateCart();


        showToast(
            `${product.name} added to cart`
        );

    }


    /* =========================================================
       TOAST
    ========================================================= */

    function showToast(message) {

        toast.textContent = message;

        toast.classList.add("show");


        window.clearTimeout(toastTimer);


        toastTimer =
            window.setTimeout(() => {

                toast.classList.remove("show");

            }, 2200);

    }


    /* =========================================================
       SEARCH ENGINE
    ========================================================= */

    function searchProducts(query) {

        const normalized =
            query
                .trim()
                .toLowerCase();


        /*
        Empty search:
        show popular products.
        */

        if (!normalized) {

            return products.slice(0, 5);

        }


        const words =
            normalized
                .split(/\s+/)
                .filter(Boolean);


        return products

            .map(product => {

                const name =
                    product.name.toLowerCase();


                const searchableText =
                    `
                        ${product.name}
                        ${product.category}
                        ${product.size}
                    `
                    .toLowerCase();


                let score = 0;


                words.forEach(word => {

                    if (name.startsWith(word)) {

                        score += 5;

                    }

                    else if (name.includes(word)) {

                        score += 3;

                    }

                    else if (
                        searchableText.includes(word)
                    ) {

                        score += 1;

                    }

                });


                return {
                    product,
                    score
                };

            })


            .filter(item => item.score > 0)


            .sort(
                (a, b) =>
                    b.score - a.score
            )


            .map(item => item.product)


            .slice(0, 6);

    }


    /* =========================================================
       SEARCH PREVIEW
    ========================================================= */

    function renderSuggestions(query) {

        const results =
            searchProducts(query);


        /*
        Search has no result.
        */

        if (
            query.trim() &&
            results.length === 0
        ) {

            searchSuggestions.innerHTML = `

                <div class="search-suggestion">

                    <div class="suggestion-image"></div>

                    <div class="suggestion-info">

                        <span class="suggestion-name">
                            No products found
                        </span>

                        <span class="suggestion-meta">
                            Try milk, bread, snacks or drinks
                        </span>

                    </div>

                </div>

            `;


            searchSuggestions.hidden = false;

            return;

        }


        /*
        Search is empty:
        show popular products.
        */

        searchSuggestions.innerHTML = `

            ${
                !query.trim()
                    ? `
                        <div
                            style="
                                padding: 11px 13px 5px;
                                color:#667085;
                                font-size:10px;
                                font-weight:700;
                                letter-spacing:.5px;
                            ">

                            POPULAR PRODUCTS

                        </div>
                      `
                    : ""
            }


            ${
                results
                    .map(product => {

                        return `

                            <button
                                class="search-suggestion"
                                type="button"
                                data-suggestion-id="${product.id}">

                                <img
                                    class="suggestion-image"
                                    src="${escapeHtml(product.image)}"
                                    alt=""
                                    loading="lazy"
                                >


                                <span class="suggestion-info">

                                    <span class="suggestion-name">
                                        ${escapeHtml(product.name)}
                                    </span>

                                    <span class="suggestion-meta">
                                        ${escapeHtml(product.size)}
                                    </span>

                                </span>


                                <span class="suggestion-price">
                                    ${formatPrice(product.price)}
                                </span>

                            </button>

                        `;

                    })
                    .join("")
            }

        `;


        searchSuggestions.hidden = false;

    }


    /* =========================================================
       SEARCH PAGE NAVIGATION
    ========================================================= */

    function goToSearch(query) {

        const cleanQuery =
            query.trim();


        if (!cleanQuery) {
            return;
        }


        /*
        Future page:

        /search?q=milk

        The backend/search page will eventually
        perform the real product search.
        */

        window.location.href =
            `/search?q=${encodeURIComponent(cleanQuery)}`;

    }


    /* =========================================================
       LOCATION MODAL
    ========================================================= */

    function openLocationModal() {

        locationModal.hidden = false;

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeLocationModal() {

        locationModal.hidden = true;

        document.body.classList.remove(
            "modal-open"
        );

    }


    /* =========================================================
       EVENT DELEGATION
    ========================================================= */

    document.addEventListener(
        "click",
        event => {

            /* ADD BUTTON */

            const addButton =
                event.target.closest(
                    "[data-add]"
                );


            if (addButton) {

                event.preventDefault();

                addToCart(
                    addButton.dataset.add
                );

                return;

            }


            /* SEARCH RESULT */

            const suggestion =
                event.target.closest(
                    "[data-suggestion-id]"
                );


            if (suggestion) {

                const product =
                    products.find(
                        item =>
                            item.id ===
                            Number(
                                suggestion.dataset
                                    .suggestionId
                            )
                    );


                if (product) {

                    window.location.href =
                        `/product/${product.id}`;

                }

                return;

            }


            /* CLOSE SEARCH */

            if (
                !event.target.closest(
                    ".search-wrap"
                )
            ) {

                searchSuggestions.hidden = true;

            }


            /* CLOSE LOCATION */

            if (
                event.target.matches(
                    "[data-close-location]"
                )
            ) {

                closeLocationModal();

            }

        }
    );


    /* =========================================================
       SEARCH INPUT
    ========================================================= */

    searchInput.addEventListener(
        "input",
        () => {

            clearSearch.hidden =
                searchInput.value.length === 0;


            renderSuggestions(
                searchInput.value
            );

        }
    );


    searchInput.addEventListener(
        "focus",
        () => {

            renderSuggestions(
                searchInput.value
            );

        }
    );


    /* =========================================================
       SEARCH FORM
    ========================================================= */

    searchForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            goToSearch(
                searchInput.value
            );

        }
    );


    /* =========================================================
       CLEAR SEARCH
    ========================================================= */

    clearSearch.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            clearSearch.hidden = true;

            searchInput.focus();

            renderSuggestions("");

        }
    );


    /* =========================================================
       LOCATION
    ========================================================= */

    locationButton.addEventListener(
        "click",
        openLocationModal
    );


    document
        .querySelectorAll(".location-option")
        .forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    const location =
                        option.dataset.location;


                    locationText.textContent =
                        location;


                    localStorage.setItem(
                        "marteyDemoLocation",
                        location
                    );


                    closeLocationModal();


                    showToast(
                        `Delivery area set to ${location}`
                    );

                }
            );

        });


    /* =========================================================
       LOAD SAVED LOCATION
    ========================================================= */

    const savedLocation =
        localStorage.getItem(
            "marteyDemoLocation"
        );


    if (savedLocation) {

        locationText.textContent =
            savedLocation;

    }


    /* =========================================================
       INITIALIZE
    ========================================================= */

    renderCategories();

    renderProducts();

    updateCart();


})();
