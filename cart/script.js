/* =========================================================
   MARTEY CART
   ========================================================= */

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
   DOM
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
   FORMAT PRICE
   ========================================================= */

function formatPrice(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}


/* =========================================================
   READ CART
   ========================================================= */

function getRawCart() {

    const possibleKeys = [
        "marteyCart",
        "cart",
        "MARTEY_CART"
    ];

    for (const key of possibleKeys) {

        const saved = localStorage.getItem(key);

        if (!saved) {
            continue;
        }

        try {

            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }

        } catch (error) {
            console.error(`Invalid cart data in ${key}`, error);
        }
    }

    return [];
}


/* =========================================================
   NORMALIZE CART
   Supports:
   { id: 1001, quantity: 2 }

   and:
   { id: 1001, qty: 2 }

   and:
   { productId: 1001, quantity: 2 }

   and product objects
   ========================================================= */

function getCart() {

    const rawCart = getRawCart();

    const normalized = [];

    rawCart.forEach(item => {

        if (!item) {
            return;
        }

        let id =
            item.id ??
            item.productId ??
            item.productID;

        let quantity =
            item.quantity ??
            item.qty ??
            item.count ??
            1;

        /*
         * Sometimes id can be stored as a string.
         */
        id = Number(id);
        quantity = Number(quantity);

        if (!Number.isFinite(id)) {
            return;
        }

        if (!Number.isFinite(quantity) || quantity < 1) {
            quantity = 1;
        }

        const existing = normalized.find(
            cartItem => cartItem.id === id
        );

        if (existing) {
            existing.quantity += quantity;
        } else {
            normalized.push({
                id: id,
                quantity: quantity
            });
        }

    });

    return normalized;
}


/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart(cart) {

    /*
     * MARTEY's main cart key
     */
    localStorage.setItem(
        "marteyCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   GET PRODUCT
   ========================================================= */

function getProduct(id) {

    return products.find(
        product => Number(product.id) === Number(id)
    );

}


/* =========================================================
   DETAILED CART
   ========================================================= */

function getDetailedCart() {

    const cart = getCart();

    return cart
        .map(item => {

            const product = getProduct(item.id);

            if (!product) {
                return null;
            }

            return {
                ...product,
                quantity: item.quantity
            };

        })
        .filter(Boolean);

}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent =
        count > 99 ? "99+" : count;

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    const cart = getDetailedCart();

    updateCartCount();

    if (cart.length === 0) {

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

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    itemCount.textContent =
        `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`;

    cartDescription.textContent =
        `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"} ready for checkout.`;


    cartItemsContainer.innerHTML = "";


    let subtotal = 0;
    let savings = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        const itemSavings =
            Math.max(0, item.mrp - item.price) *
            item.quantity;

        subtotal += itemTotal;
        savings += itemSavings;


        const discount =
            item.mrp > item.price
                ? Math.round(
                    ((item.mrp - item.price) / item.mrp) * 100
                )
                : 0;


        const element =
            document.createElement("article");

        element.className = "cart-item";


        element.innerHTML = `

            <a
                href="/product/${item.id}"
                class="cart-product-image"
            >
                <img
                    src="${escapeHTML(item.image)}"
                    alt="${escapeHTML(item.name)}"
                    loading="lazy"
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
                                    ${discount}% OFF
                                </span>
                            `
                            : ""
                    }

                </div>

            </div>


            <div class="cart-item-actions">

                <strong class="item-total">
                    ${formatPrice(itemTotal)}
                </strong>


                <div class="quantity-control">

                    <button
                        type="button"
                        class="quantity-button decrease-button"
                        data-id="${item.id}"
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


        cartItemsContainer.appendChild(element);

    });


    subtotalElement.textContent =
        formatPrice(subtotal);

    savingsElement.textContent =
        formatPrice(savings);

    totalElement.textContent =
        formatPrice(subtotal);

}


/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQuantity(id, change) {

    const cart = getCart();

    const item = cart.find(
        product => Number(product.id) === Number(id)
    );

    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        const updated = cart.filter(
            product => Number(product.id) !== Number(id)
        );

        saveCart(updated);

    } else {

        saveCart(cart);

    }


    renderCart();

}


/* =========================================================
   REMOVE ITEM
   ========================================================= */

function removeItem(id) {

    const cart = getCart();

    const updatedCart =
        cart.filter(
            item => Number(item.id) !== Number(id)
        );

    saveCart(updatedCart);

    renderCart();

}


/* =========================================================
   CART BUTTONS
   ========================================================= */

cartItemsContainer.addEventListener(
    "click",
    function(event) {

        const increase =
            event.target.closest(".increase-button");

        const decrease =
            event.target.closest(".decrease-button");

        const remove =
            event.target.closest(".remove-item");


        if (increase) {

            changeQuantity(
                Number(increase.dataset.id),
                1
            );

            return;
        }


        if (decrease) {

            changeQuantity(
                Number(decrease.dataset.id),
                -1
            );

            return;
        }


        if (remove) {

            removeItem(
                Number(remove.dataset.id)
            );

        }

    }
);


/* =========================================================
   CLEAR CART
   ========================================================= */

clearCartButton.addEventListener(
    "click",
    function() {

        clearModal.classList.add("show");

        document.body.style.overflow = "hidden";

    }
);


function closeModal() {

    clearModal.classList.remove("show");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


modalCancel.addEventListener(
    "click",
    closeModal
);


modalConfirm.addEventListener(
    "click",
    function() {

        localStorage.removeItem("marteyCart");
        localStorage.removeItem("cart");
        localStorage.removeItem("MARTEY_CART");

        closeModal();

        renderCart();

    }
);


clearModal.addEventListener(
    "click",
    function(event) {

        if (event.target === clearModal) {
            closeModal();
        }

    }
);


/* =========================================================
   CHECKOUT
   ========================================================= */

checkoutButton.addEventListener(
    "click",
    function() {

        const cart = getCart();

        if (cart.length === 0) {
            return;
        }

        window.location.href = "/checkout";

    }
);


/* =========================================================
   SEARCH
   ========================================================= */

searchForm.addEventListener(
    "submit",
    function(event) {

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


/* =========================================================
   STORAGE LISTENER
   ========================================================= */

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key === "marteyCart" ||
            event.key === "cart" ||
            event.key === "MARTEY_CART"
        ) {
            renderCart();
        }

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

renderCart();
updateCartCount();
