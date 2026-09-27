/* =========================================================
   MARTEY CHECKOUT
   Frontend-only checkout
========================================================= */


/* =========================
   PRODUCT DATA
========================= */

const products = [
    {
        id: 1001,
        name: "Fresh Toned Milk",
        category: "Milk & Dairy",
        size: "1 L",
        price: 62,
        mrp: 68,
        image: "../assets/products/milk.jpg"
    },

    {
        id: 1002,
        name: "Daily Fresh Bread",
        category: "Bakery",
        size: "400 g",
        price: 45,
        mrp: 50,
        image: "../assets/products/bread.jpg"
    },

    {
        id: 1003,
        name: "Orange Refresh Drink",
        category: "Drinks",
        size: "750 ml",
        price: 55,
        mrp: 60,
        image: "../assets/products/orange-drink.jpg"
    },

    {
        id: 1004,
        name: "Classic Potato Chips",
        category: "Snacks",
        size: "100 g",
        price: 35,
        mrp: 40,
        image: "../assets/products/chips.jpg"
    },

    {
        id: 1005,
        name: "Fresh Bananas",
        category: "Fresh",
        size: "6 pcs",
        price: 48,
        mrp: 55,
        image: "../assets/products/bananas.jpg"
    },

    {
        id: 1006,
        name: "Daily Care Shampoo",
        category: "Personal Care",
        size: "180 ml",
        price: 145,
        mrp: 165,
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
        name: "Gentle Baby Wipes",
        category: "Baby Care",
        size: "72 wipes",
        price: 99,
        mrp: 120,
        image: "../assets/products/baby-wipes.jpg"
    },

    {
        id: 1009,
        name: "Chocolate Cream Biscuits",
        category: "Snacks",
        size: "120 g",
        price: 30,
        mrp: 35,
        image: "../assets/products/biscuits.jpg"
    },

    {
        id: 1010,
        name: "Premium Pet Food",
        category: "Pet Supplies",
        size: "500 g",
        price: 249,
        mrp: 280,
        image: "../assets/products/pet-food.jpg"
    },

    {
        id: 1011,
        name: "Wireless Headphones",
        category: "Electronics & Accessories",
        size: "1 unit",
        price: 899,
        mrp: 1199,
        image: "../assets/products/headphones.jpg"
    },

    {
        id: 1012,
        name: "Classic Notebook",
        category: "Stationery",
        size: "200 pages",
        price: 79,
        mrp: 99,
        image: "../assets/products/notebook.jpg"
    }
];


/* =========================
   DOM
========================= */

const checkoutContent = document.getElementById("checkoutContent");
const emptyCheckout = document.getElementById("emptyCheckout");

const cartCount = document.getElementById("cartCount");

const summaryProducts = document.getElementById("summaryProducts");
const summaryItemCount = document.getElementById("summaryItemCount");

const subtotalElement = document.getElementById("subtotal");
const savingsElement = document.getElementById("savings");
const totalElement = document.getElementById("total");

const placeOrderButton = document.getElementById("placeOrderButton");

const addressForm = document.getElementById("addressForm");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const locationButton = document.getElementById("locationButton");

const orderModal = document.getElementById("orderModal");


/* =========================
   HELPERS
========================= */

function formatPrice(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}


function getProductById(id) {
    return products.find(product => Number(product.id) === Number(id));
}


/* =========================
   CART NORMALIZATION
========================= */

function getCart() {

    const possibleKeys = [
        "marteyCart",
        "cart",
        "MARTEY_CART"
    ];

    let storedCart = null;

    for (const key of possibleKeys) {

        const raw = localStorage.getItem(key);

        if (!raw) {
            continue;
        }

        try {

            const parsed = JSON.parse(raw);

            if (Array.isArray(parsed)) {
                storedCart = parsed;
                break;
            }

            if (parsed && Array.isArray(parsed.items)) {
                storedCart = parsed.items;
                break;
            }

        } catch (error) {
            console.warn(`Could not read ${key}`, error);
        }
    }


    if (!storedCart) {
        return [];
    }


    const normalized = [];

    storedCart.forEach(item => {

        if (!item) {
            return;
        }


        let productId =
            item.id ??
            item.productId ??
            item.productID;


        let quantity =
            item.quantity ??
            item.qty ??
            item.count ??
            1;


        productId = Number(productId);
        quantity = Number(quantity);


        if (!Number.isFinite(productId)) {
            return;
        }

        if (!Number.isFinite(quantity) || quantity <= 0) {
            quantity = 1;
        }


        const product = getProductById(productId);

        if (!product) {
            return;
        }


        const existing = normalized.find(
            cartItem => cartItem.id === product.id
        );


        if (existing) {
            existing.quantity += quantity;
        } else {

            normalized.push({
                ...product,
                quantity
            });

        }

    });


    return normalized;
}


/* =========================
   SAVE CART
========================= */

function saveCart(cart) {

    const simplifiedCart = cart.map(item => ({
        id: item.id,
        quantity: item.quantity
    }));

    localStorage.setItem(
        "marteyCart",
        JSON.stringify(simplifiedCart)
    );
}


/* =========================
   CART TOTALS
========================= */

function calculateTotals(cart) {

    let subtotal = 0;
    let mrpTotal = 0;
    let itemCount = 0;


    cart.forEach(item => {

        const quantity = Number(item.quantity) || 1;

        subtotal += item.price * quantity;

        mrpTotal += item.mrp * quantity;

        itemCount += quantity;

    });


    const savings = Math.max(0, mrpTotal - subtotal);


    return {
        subtotal,
        mrpTotal,
        savings,
        total: subtotal,
        itemCount
    };
}


/* =========================
   UPDATE HEADER CART
========================= */

function updateCartCount(cart) {

    const totals = calculateTotals(cart);

    cartCount.textContent = totals.itemCount;
}


/* =========================
   RENDER SUMMARY
========================= */

function renderSummary(cart) {

    const totals = calculateTotals(cart);


    summaryProducts.innerHTML = "";


    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;


        const productElement = document.createElement("div");

        productElement.className = "summary-product";


        productElement.innerHTML = `
            <div class="summary-product-image">
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    onerror="this.style.display='none'"
                >
            </div>

            <div class="summary-product-info">

                <div class="summary-product-name">
                    ${item.name}
                </div>

                <div class="summary-product-meta">
                    ${item.size} · Qty ${item.quantity}
                </div>

            </div>

            <div class="summary-product-price">
                ${formatPrice(itemTotal)}
            </div>
        `;


        summaryProducts.appendChild(productElement);

    });


    summaryItemCount.textContent =
        `${totals.itemCount} ${
            totals.itemCount === 1 ? "item" : "items"
        }`;


    subtotalElement.textContent =
        formatPrice(totals.subtotal);


    savingsElement.textContent =
        formatPrice(totals.savings);


    totalElement.textContent =
        formatPrice(totals.total);

}


/* =========================
   EMPTY STATE
========================= */

function showEmptyCheckout() {

    checkoutContent.style.display = "none";

    emptyCheckout.classList.add("show");

}


function showCheckout() {

    checkoutContent.style.display = "grid";

    emptyCheckout.classList.remove("show");

}


/* =========================
   LOAD SAVED ADDRESS
========================= */

function loadSavedAddress() {

    const saved = localStorage.getItem(
        "marteyCheckoutAddress"
    );


    if (!saved) {
        return;
    }


    try {

        const address = JSON.parse(saved);


        const fields = [
            "fullName",
            "mobile",
            "house",
            "area",
            "city",
            "state",
            "pincode"
        ];


        fields.forEach(field => {

            const input = document.getElementById(field);

            if (input && address[field]) {
                input.value = address[field];
            }

        });


        const saveCheckbox =
            document.getElementById("saveAddress");

        if (saveCheckbox) {
            saveCheckbox.checked = true;
        }


    } catch (error) {

        console.warn(
            "Could not load saved address.",
            error
        );

    }

}


/* =========================
   ADDRESS VALIDATION
========================= */

function clearErrors() {

    const groups =
        addressForm.querySelectorAll(".form-group");


    groups.forEach(group => {

        group.classList.remove("has-error");

        const error =
            group.querySelector(".error-message");

        if (error) {
            error.textContent = "";
        }

    });

}


function showError(fieldId, message) {

    const field =
        document.getElementById(fieldId);


    if (!field) {
        return;
    }


    const group =
        field.closest(".form-group");


    if (!group) {
        return;
    }


    group.classList.add("has-error");


    const error =
        group.querySelector(".error-message");


    if (error) {
        error.textContent = message;
    }

}


function validateAddress() {

    clearErrors();


    let valid = true;


    const fullName =
        document.getElementById("fullName").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const house =
        document.getElementById("house").value.trim();

    const area =
        document.getElementById("area").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const state =
        document.getElementById("state").value;

    const pincode =
        document.getElementById("pincode").value.trim();


    if (fullName.length < 2) {

        showError(
            "fullName",
            "Please enter your full name."
        );

        valid = false;
    }


    if (!/^[6-9]\d{9}$/.test(mobile)) {

        showError(
            "mobile",
            "Enter a valid 10-digit mobile number."
        );

        valid = false;
    }


    if (house.length < 2) {

        showError(
            "house",
            "Please enter your house or flat details."
        );

        valid = false;
    }


    if (area.length < 2) {

        showError(
            "area",
            "Please enter your area or locality."
        );

        valid = false;
    }


    if (city.length < 2) {

        showError(
            "city",
            "Please enter your city."
        );

        valid = false;
    }


    if (!state) {

        showError(
            "state",
            "Please select your state."
        );

        valid = false;
    }


    if (!/^\d{6}$/.test(pincode)) {

        showError(
            "pincode",
            "Enter a valid 6-digit pincode."
        );

        valid = false;
    }


    return valid;
}


/* =========================
   GET ADDRESS
========================= */

function getAddress() {

    return {

        fullName:
            document.getElementById("fullName").value.trim(),

        mobile:
            document.getElementById("mobile").value.trim(),

        house:
            document.getElementById("house").value.trim(),

        area:
            document.getElementById("area").value.trim(),

        city:
            document.getElementById("city").value.trim(),

        state:
            document.getElementById("state").value,

        pincode:
            document.getElementById("pincode").value.trim(),

        instructions:
            document.getElementById("instructions").value.trim()

    };

}


/* =========================
   SAVE ADDRESS
========================= */

function saveAddressIfRequested(address) {

    const checkbox =
        document.getElementById("saveAddress");


    if (!checkbox.checked) {
        return;
    }


    localStorage.setItem(
        "marteyCheckoutAddress",
        JSON.stringify(address)
    );

}


/* =========================
   PAYMENT
========================= */

function getSelectedPayment() {

    const selected =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    return selected ? selected.value : null;
}


/* =========================
   CREATE FRONTEND ORDER
========================= */

function createDemoOrder(cart, address, payment) {

    const totals = calculateTotals(cart);


    const orderId =
        `MRT-${Date.now().toString().slice(-8)}`;


    const order = {

        orderId,

        createdAt:
            new Date().toISOString(),

        status: "PLACED",

        isDemo: true,

        address,

        paymentMethod: payment,

        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            category: item.category,
            size: item.size,
            price: item.price,
            mrp: item.mrp,
            quantity: item.quantity,
            image: item.image
        })),

        pricing: {
            subtotal: totals.subtotal,
            savings: totals.savings,
            delivery: 0,
            total: totals.total
        }

    };


    localStorage.setItem(
        "marteyLastOrder",
        JSON.stringify(order)
    );


    return order;
}


/* =========================
   PLACE ORDER
========================= */

function placeOrder() {

    const cart = getCart();


    if (cart.length === 0) {

        showEmptyCheckout();

        return;
    }


    const addressValid =
        validateAddress();


    if (!addressValid) {

        const firstError =
            addressForm.querySelector(".has-error input, .has-error select");


        if (firstError) {
            firstError.focus();
        }

        return;
    }


    const payment =
        getSelectedPayment();


    if (!payment) {

        alert("Please select a payment method.");

        return;
    }


    const address =
        getAddress();


    saveAddressIfRequested(address);


    placeOrderButton.disabled = true;


    orderModal.classList.add("show");


    const order =
        createDemoOrder(
            cart,
            address,
            payment
        );


    /*
       Frontend demo only.

       No real payment gateway is connected.
       No real order is sent to a server.
    */

    setTimeout(() => {

        localStorage.removeItem("marteyCart");

        localStorage.removeItem("cart");

        localStorage.removeItem("MARTEY_CART");


        /*
           Save the order once more after clearing
           the cart, so the order remains available.
        */

        localStorage.setItem(
            "marteyLastOrder",
            JSON.stringify(order)
        );


        window.location.href =
            "/order-success";

    }, 900);

}


/* =========================
   SEARCH
========================= */

searchForm.addEventListener(
    "submit",
    function(event) {

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


/* =========================
   LOCATION
========================= */

locationButton.addEventListener(
    "click",
    function() {

        alert(
            "Location selection will be connected to the MARTEY location system later."
        );

    }
);


/* =========================
   INPUT CLEANUP
========================= */

document
    .getElementById("mobile")
    .addEventListener("input", function() {

        this.value =
            this.value.replace(/\D/g, "").slice(0, 10);

    });


document
    .getElementById("pincode")
    .addEventListener("input", function() {

        this.value =
            this.value.replace(/\D/g, "").slice(0, 6);

    });


/* =========================
   CLEAR ERROR ON INPUT
========================= */

addressForm
    .querySelectorAll("input, select, textarea")
    .forEach(field => {

        field.addEventListener(
            "input",
            function() {

                const group =
                    this.closest(".form-group");

                if (!group) {
                    return;
                }

                group.classList.remove("has-error");

                const error =
                    group.querySelector(".error-message");

                if (error) {
                    error.textContent = "";
                }

            }
        );


        field.addEventListener(
            "change",
            function() {

                const group =
                    this.closest(".form-group");

                if (!group) {
                    return;
                }

                group.classList.remove("has-error");

                const error =
                    group.querySelector(".error-message");

                if (error) {
                    error.textContent = "";
                }

            }
        );

    });


/* =========================
   PLACE ORDER BUTTON
========================= */

placeOrderButton.addEventListener(
    "click",
    placeOrder
);


/* =========================
   INITIALIZE
========================= */

function initializeCheckout() {

    const cart =
        getCart();


    updateCartCount(cart);


    if (cart.length === 0) {

        showEmptyCheckout();

        return;
    }


    showCheckout();

    renderSummary(cart);

    loadSavedAddress();

}


initializeCheckout();


/* =========================
   STORAGE SYNC
========================= */

window.addEventListener(
    "storage",
    function() {

        const cart =
            getCart();


        updateCartCount(cart);


        if (cart.length === 0) {

            showEmptyCheckout();

        } else {

            showCheckout();

            renderSummary(cart);

        }

    }
);
