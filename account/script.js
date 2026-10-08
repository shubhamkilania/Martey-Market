"use strict";

const cartCountElement =
    document.getElementById("cartCount");

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const searchClear =
    document.getElementById("searchClear");

const searchDropdown =
    document.getElementById("searchDropdown");

const toastElement =
    document.getElementById("toast");

const currentYear =
    document.getElementById("currentYear");

const loginButton =
    document.getElementById("loginButton");

const signupButton =
    document.getElementById("signupButton");


/* =========================================================
   CONSTANTS
========================================================= */

const CART_KEY = "marteyCart";

let toastTimer = null;


/* =========================================================
   DEMO SEARCH DATA
   Temporary until global product catalog is connected.
========================================================= */

const searchProducts = [

    {
        id: 1001,
        name: "Fresh Full Cream Milk",
        category: "Milk & Dairy",
        size: "1 L",
        price: 68,
        image: "/assets/products/milk.jpg"
    },

    {
        id: 1002,
        name: "Classic White Bread",
        category: "Bakery",
        size: "400 g",
        price: 45,
        image: "/assets/products/bread.jpg"
    },

    {
        id: 1003,
        name: "Fresh Orange Drink",
        category: "Drinks",
        size: "750 ml",
        price: 55,
        image: "/assets/products/orange-drink.jpg"
    },

    {
        id: 1004,
        name: "Classic Salted Chips",
        category: "Snacks",
        size: "100 g",
        price: 28,
        image: "/assets/products/chips.jpg"
    },

    {
        id: 1005,
        name: "Fresh Bananas",
        category: "Fruits & Vegetables",
        size: "1 kg",
        price: 49,
        image: "/assets/products/bananas.jpg"
    },

    {
        id: 1006,
        name: "Daily Care Shampoo",
        category: "Personal Care",
        size: "180 ml",
        price: 149,
        image: "/assets/products/shampoo.jpg"
    }

];


/* =========================================================
   CART
========================================================= */

function getCart() {

    try {

        const raw =
            localStorage.getItem(CART_KEY);

        if (!raw) {
            return [];
        }

        const parsed =
            JSON.parse(raw);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "MARTEY cart read error:",
            error
        );

        return [];
    }
}


function getCartItemCount() {

    const cart =
        getCart();

    return cart.reduce(
        (total, item) => {

            if (!item || typeof item !== "object") {
                return total;
            }

            const quantity =
                Number(
                    item.quantity ??
                    item.qty ??
                    1
                );

            return total +
                (
                    Number.isFinite(quantity) &&
                    quantity > 0
                        ? quantity
                        : 1
                );

        },
        0
    );
}


function updateCartCount() {

    if (!cartCountElement) {
        return;
    }

    const count =
        getCartItemCount();

    if (count > 0) {

        cartCountElement.textContent =
            count > 99
                ? "99+"
                : String(count);

        cartCountElement.classList.add(
            "visible"
        );

    } else {

        cartCountElement.textContent =
            "0";

        cartCountElement.classList.remove(
            "visible"
        );
    }
}


/* =========================================================
   SEARCH
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function getSearchMatches(query) {

    const normalized =
        query
            .trim()
            .toLowerCase();

    if (!normalized) {
        return [];
    }

    return searchProducts
        .filter(product => {

            const text = [
                product.name,
                product.category,
                product.size
            ]
                .join(" ")
                .toLowerCase();

            return text.includes(normalized);
        })
        .slice(0, 6);
}


function renderSearchDropdown(query) {

    if (!searchDropdown) {
        return;
    }

    const trimmed =
        query.trim();

    if (!trimmed) {

        searchDropdown.innerHTML = "";

        searchDropdown.classList.remove(
            "show"
        );

        searchDropdown.setAttribute(
            "aria-hidden",
            "true"
        );

        return;
    }

    const matches =
        getSearchMatches(query);

    if (!matches.length) {

        searchDropdown.innerHTML = `
            <div class="search-suggestion">

                <div class="search-suggestion-content">

                    <div class="search-suggestion-name">
                        No products found
                    </div>

                    <div class="search-suggestion-meta">
                        Try another product name
                    </div>

                </div>

            </div>
        `;

    } else {

        searchDropdown.innerHTML =
            matches
                .map(product => {

                    return `
                        <a
                            href="/product/?id=${product.id}"
                            class="search-suggestion"
                        >

                            <img
                                src="${escapeHTML(product.image)}"
                                alt="${escapeHTML(product.name)}"
                                class="search-suggestion-image"
                            >

                            <div class="search-suggestion-content">

                                <div class="search-suggestion-name">
                                    ${escapeHTML(product.name)}
                                </div>

                                <div class="search-suggestion-meta">
                                    ${escapeHTML(product.category)}
                                    ·
                                    ${escapeHTML(product.size)}
                                </div>

                            </div>

                            <span class="search-suggestion-price">
                                ₹${product.price}
                            </span>

                        </a>
                    `;
                })
                .join("");
    }

    searchDropdown.classList.add("show");

    searchDropdown.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeSearchDropdown() {

    if (!searchDropdown) {
        return;
    }

    searchDropdown.classList.remove(
        "show"
    );

    searchDropdown.setAttribute(
        "aria-hidden",
        "true"
    );
}


function setupSearch() {

    if (!searchForm || !searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        () => {

            const value =
                searchInput.value;

            if (searchClear) {

                searchClear.style.display =
                    value.length
                        ? "grid"
                        : "none";
            }

            renderSearchDropdown(value);
        }
    );


    searchInput.addEventListener(
        "focus",
        () => {

            if (searchInput.value.trim()) {

                renderSearchDropdown(
                    searchInput.value
                );
            }
        }
    );


    searchForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const query =
                searchInput.value.trim();

            if (!query) {

                searchInput.focus();

                return;
            }

            window.location.href =
                `/search?q=${encodeURIComponent(query)}`;
        }
    );


    if (searchClear) {

        searchClear.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                searchClear.style.display =
                    "none";

                closeSearchDropdown();

                searchInput.focus();
            }
        );
    }
}


/* =========================================================
   FEATURE PLACEHOLDERS
========================================================= */

function handleFeature(feature) {

    const messages = {

        addresses:
            "Saved Addresses will be available after account login.",

        wishlist:
            "Wishlist will be available after account login.",

        profile:
            "Profile settings will be available after account login."

    };

    showToast(
        messages[feature] ||
        "This account feature is coming soon."
    );
}


document
    .querySelectorAll("[data-feature]")
    .forEach(element => {

        element.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const feature =
                    element.dataset.feature;

                handleFeature(feature);
            }
        );

    });


/* =========================================================
   AUTH BUTTONS
========================================================= */

if (loginButton) {

    loginButton.addEventListener(
        "click",
        () => {

            showToast(
                "Sign in will be connected when authentication is added."
            );

        }
    );

}


if (signupButton) {

    signupButton.addEventListener(
        "click",
        () => {

            showToast(
                "Account creation will be connected when authentication is added."
            );

        }
    );

}


/* =========================================================
   PREFERENCES
========================================================= */

const preferenceInputs =
    document.querySelectorAll(
        ".preference-row input"
    );


preferenceInputs.forEach(input => {

    input.addEventListener(
        "change",
        () => {

            showToast(
                input.checked
                    ? "Preference enabled"
                    : "Preference disabled"
            );

        }
    );

});


/* =========================================================
   OUTSIDE SEARCH CLICK
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (!searchForm) {
            return;
        }

        if (
            !searchForm.contains(
                event.target
            )
        ) {
            closeSearchDropdown();
        }
    }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        closeSearchDropdown();

        if (
            document.activeElement ===
            searchInput
        ) {
            searchInput.blur();
        }
    }
);


/* =========================================================
   STORAGE SYNC
========================================================= */

window.addEventListener(
    "storage",
    event => {

        if (event.key === CART_KEY) {

            updateCartCount();
        }
    }
);


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    if (!toastElement) {
        return;
    }

    toastElement.textContent =
        message;

    toastElement.classList.add(
        "show"
    );

    if (toastTimer) {

        window.clearTimeout(
            toastTimer
        );
    }

    toastTimer =
        window.setTimeout(
            () => {

                toastElement.classList.remove(
                    "show"
                );

            },
            2500
        );
}


/* =========================================================
   YEAR
========================================================= */

function setCurrentYear() {

    if (!currentYear) {
        return;
    }

    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   INITIALIZE
========================================================= */

function initAccountPage() {

    updateCartCount();

    setupSearch();

    setCurrentYear();
}


/* =========================================================
   START
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initAccountPage
    );

} else {

    initAccountPage();
}
