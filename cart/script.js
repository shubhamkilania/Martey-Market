const products = [
    {
        id: 1001,
        name: "Fresh Toned Milk",
        category: "Milk & Dairy",
        size: "1 L",
        price: 58,
        mrp: 62,
        image: "../assets/products/milk.jpg"
    },

    {
        id: 1002,
        name: "Whole Wheat Bread",
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
        price: 89,
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
        price: 49,
        mrp: 60,
        image: "../assets/products/bananas.jpg"
    },

    {
        id: 1006,
        name: "Daily Care Shampoo",
        category: "Personal Care",
        size: "340 ml",
        price: 199,
        mrp: 249,
        image: "../assets/products/shampoo.jpg"
    },

    {
        id: 1007,
        name: "Liquid Laundry Detergent",
        category: "Household",
        size: "1 L",
        price: 179,
        mrp: 220,
        image: "../assets/products/detergent.jpg"
    },

    {
        id: 1008,
        name: "Gentle Baby Wipes",
        category: "Baby Care",
        size: "72 wipes",
        price: 119,
        mrp: 149,
        image: "../assets/products/baby-wipes.jpg"
    },

    {
        id: 1009,
        name: "Butter Cookies",
        category: "Snacks",
        size: "200 g",
        price: 75,
        mrp: 90,
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
        size: "A5 · 160 pages",
        price: 129,
        mrp: 160,
        image: "../assets/products/notebook.jpg"
    }
];


/* =========================================================
   STORAGE KEY
   ========================================================= */

const CART_KEY = "marteyCart";


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const cartItemsContainer = document.getElementById("cartItems");
const cartContent = document.getElementById("cartContent");
const emptyCart = document.getElementById("emptyCart");

const cartCount = document.getElementById("cartCount");
const itemCount = document.getElementById("itemCount");
const cartDescription = document.getElementById("cartDescription");

const subtotalElement = document.getElementById("subtotal");
const savingsElement = document.getElementById("savings");
const totalElement = document.getElementById("total");

const clearCartButton = document.getElementById("clearCartButton");
const checkoutButton = document.getElementById("checkoutButton");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const clearModal = document.getElementById("clearModal");
const modalClose = document.getElementById("modalClose");
const modalCancel = document.getElementById("modalCancel");
const modalConfirm = document.getElementById("modalConfirm");


/* =========================================================
   HELPERS
   ========================================================= */

function formatPrice(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}


function getCart() {
    try {
        const storedCart = localStorage.getItem(CART_KEY);

        if (!storedCart) {
            return [];
        }

        const parsedCart = JSON.parse(storedCart);

        if (!Array.isArray(parsedCart)) {
            return [];
        }

        return parsedCart;
    } catch (error) {
        console.error("Unable to read MARTEY cart:", error);
        return [];
    }
}


function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}


function getProduct(productId) {
    return products.find(
        product => Number(product.id) === Number(productId)
    );
}


function getDetailedCart() {
    const cart = getCart();

    return cart
        .map(item => {
            const product = getProduct(item.id);

            if (!product) {
                return null;
            }

            const quantity = Math.max(
                1,
                Number(item.quantity) || 1
            );

            return {
                ...product,
                quantity
            };
        })
        .filter(Boolean);
}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {
    const cart = getCart();

    const totalQuantity = cart.reduce(
        (total, item) => total + Math.max(1, Number(item.quantity) || 1),
        0
    );

    cartCount.textContent = totalQuantity > 99
        ? "99+"
        : totalQuantity;
}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {
    const detailedCart = getDetailedCart();

    updateCartCount();

    const totalQuantity = detailedCart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if (detailedCart.length === 0) {
        cartContent.style.display = "none";
        emptyCart.classList.add("show");

        itemCount.textContent = "0 items";
        cartDescription.textContent =
            "Your cart is currently empty.";

        subtotalElement.textContent = "₹0";
        savingsElement.textContent = "₹0";
        totalElement.textContent = "₹0";

        return;
    }

    cartContent.style.display = "";
    emptyCart.classList.remove("show");

    itemCount.textContent =
        `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`;

    cartDescription.textContent =
        `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"} ready for checkout.`;

    cartItemsContainer.innerHTML = "";

    let subtotal = 0;
    let savings = 0;

    detailedCart.forEach(item => {

        const itemSubtotal = item.price * item.quantity;
        const itemSavings =
            Math.max(0, item.mrp - item.price) * item.quantity;

        subtotal += itemSubtotal;
        savings += itemSavings;

        const discountPercentage = item.mrp > item.price
            ? Math.round(
                ((item.mrp - item.price) / item.mrp) * 100
            )
            : 0;

        const cartItem = document.createElement("article");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <a
                href="/product/${item.id}"
                class="cart-product-image"
                aria-label="View ${escapeHTML(item.name)}"
            >
                <img
                    src="${escapeAttribute(item.image)}"
                    alt="${escapeAttribute(item.name)}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                >
            </a>

            <div class="cart-item-info">

                <div class="cart-item-category">
                    ${escapeHTML(item.category)}
                </div>

                <a
                    href="/product/${item.id}"
                    class="cart-item-name"
                >
                    ${escapeHTML(item.name)}
                </a>

                <div class="cart-item-size">
                    ${escapeHTML(item.size)}
                </div>

                <div class="cart-price-line">

                    <span class="cart-price">
                        ${formatPrice(item.price)}
                    </span>

                    ${
                        item.mrp > item.price
                            ? `
                                <span class="cart-mrp">
                                    ${formatPrice(item.mrp)}
                                </span>

                                <span class="cart-discount">
                                    ${discountPercentage}% OFF
                                </span>
                            `
                            : ""
                    }

                </div>

            </div>

            <div class="cart-item-actions">

                <strong class="item-total">
                    ${formatPrice(itemSubtotal)}
                </strong>

                <div
                    class="quantity-control"
                    aria-label="Quantity controls for ${escapeAttribute(item.name)}"
                >

                    <button
                        type="button"
                        class="quantity-button decrease-button"
                        data-id="${item.id}"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>

                    <span class="quantity-value">
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        class="quantity-button increase-button"
                        data-id="${item.id}"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>

                </div>

                <button
                    type="button"
                    class="remove-item"
                    data-id="${item.id}"
                >
                    Remove
                </button>

            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    subtotalElement.textContent = formatPrice(subtotal);
    savingsElement.textContent = formatPrice(savings);

    // Delivery is intentionally not calculated on the frontend.
    // Backend will determine this later.
    totalElement.textContent = formatPrice(subtotal);
}


/* =========================================================
   ESCAPE HTML
   Prevents product data from being inserted as raw HTML
   ========================================================= */

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {
    return escapeHTML(value);
}


/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQuantity(productId, change) {
    const cart = getCart();

    const item = cart.find(
        cartItem => Number(cartItem.id) === Number(productId)
    );

    if (!item) {
        return;
    }

    const currentQuantity = Math.max(
        1,
        Number(item.quantity) || 1
    );

    const newQuantity = currentQuantity + change;

    if (newQuantity <= 0) {
        removeItem(productId);
        return;
    }

    item.quantity = newQuantity;

    saveCart(cart);
    renderCart();
}


/* =========================================================
   REMOVE ITEM
   ========================================================= */

function removeItem(productId) {
    const cart = getCart();

    const updatedCart = cart.filter(
        item => Number(item.id) !== Number(productId)
    );

    saveCart(updatedCart);
    renderCart();
}


/* =========================================================
   CLEAR CART
   ========================================================= */

function openClearModal() {
    clearModal.classList.add("show");
    document.body.style.overflow = "hidden";
}


function closeClearModal() {
    clearModal.classList.remove("show");
    document.body.style.overflow = "";
}


function clearEntireCart() {
    localStorage.removeItem(CART_KEY);

    closeClearModal();
    renderCart();
}


/* =========================================================
   CART EVENT DELEGATION
   ========================================================= */

cartItemsContainer.addEventListener("click", event => {

    const increaseButton =
        event.target.closest(".increase-button");

    const decreaseButton =
        event.target.closest(".decrease-button");

    const removeButton =
        event.target.closest(".remove-item");


    if (increaseButton) {
        const productId = Number(
            increaseButton.dataset.id
        );

        changeQuantity(productId, 1);
        return;
    }


    if (decreaseButton) {
        const productId = Number(
            decreaseButton.dataset.id
        );

        changeQuantity(productId, -1);
        return;
    }


    if (removeButton) {
        const productId = Number(
            removeButton.dataset.id
        );

        removeItem(productId);
    }

});


/* =========================================================
   CLEAR CART EVENTS
   ========================================================= */

clearCartButton.addEventListener(
    "click",
    openClearModal
);

modalClose.addEventListener(
    "click",
    closeClearModal
);

modalCancel.addEventListener(
    "click",
    closeClearModal
);

modalConfirm.addEventListener(
    "click",
    clearEntireCart
);


clearModal.addEventListener("click", event => {

    if (event.target === clearModal) {
        closeClearModal();
    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeClearModal();
    }

});


/* =========================================================
   CHECKOUT
   ========================================================= */

checkoutButton.addEventListener("click", () => {

    const cart = getDetailedCart();

    if (cart.length === 0) {
        return;
    }

    /*
        Checkout page will be created in the next step.
        The cart itself is ready to send the user there.
    */

    window.location.href = "/checkout";

});


/* =========================================================
   SEARCH
   ========================================================= */

searchForm.addEventListener("submit", event => {

    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
        searchInput.focus();
        return;
    }

    window.location.href =
        `/search?q=${encodeURIComponent(query)}`;

});


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});


/* =========================================================
   HANDLE STORAGE CHANGES
   Useful if cart changes in another MARTEY tab
   ========================================================= */

window.addEventListener("storage", event => {

    if (event.key === CART_KEY) {
        renderCart();
    }

});
