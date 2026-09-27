const successCard =
    document.querySelector(".success-card");

const detailsLayout =
    document.querySelector(".details-layout");

const noOrder =
    document.getElementById("noOrder");

const orderIdElement =
    document.getElementById("orderId");

const orderDateElement =
    document.getElementById("orderDate");

const customerNameElement =
    document.getElementById("customerName");

const customerAddressElement =
    document.getElementById("customerAddress");

const customerMobileElement =
    document.getElementById("customerMobile");

const productCountElement =
    document.getElementById("productCount");

const orderedProducts =
    document.getElementById("orderedProducts");

const paymentMethodElement =
    document.getElementById("paymentMethod");

const subtotalElement =
    document.getElementById("subtotal");

const savingsElement =
    document.getElementById("savings");

const totalElement =
    document.getElementById("total");

const cartCount =
    document.getElementById("cartCount");

const copyOrderIdButton =
    document.getElementById("copyOrderId");

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const locationButton =
    document.getElementById("locationButton");


/* =========================
   PRODUCT FALLBACK DATA
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
   HELPERS
========================= */

function formatPrice(value) {

    return `₹${Number(value || 0).toLocaleString("en-IN")}`;

}


function getProduct(id) {

    return products.find(
        product =>
            Number(product.id) === Number(id)
    );

}


/* =========================
   GET ORDER
========================= */

function getLastOrder() {

    const raw =
        localStorage.getItem("marteyLastOrder");


    if (!raw) {
        return null;
    }


    try {

        const order =
            JSON.parse(raw);


        if (
            !order ||
            !Array.isArray(order.items)
        ) {
            return null;
        }


        return order;

    } catch (error) {

        console.warn(
            "Could not read last order.",
            error
        );

        return null;
    }

}


/* =========================
   CART COUNT
========================= */

function getCartCount() {

    const possibleKeys = [
        "marteyCart",
        "cart",
        "MARTEY_CART"
    ];


    let total = 0;


    for (const key of possibleKeys) {

        const raw =
            localStorage.getItem(key);


        if (!raw) {
            continue;
        }


        try {

            const cart =
                JSON.parse(raw);


            if (Array.isArray(cart)) {

                cart.forEach(item => {

                    const quantity =
                        Number(
                            item.quantity ??
                            item.qty ??
                            item.count ??
                            1
                        );


                    if (Number.isFinite(quantity)) {
                        total += quantity;
                    }

                });

                break;
            }


            if (
                cart &&
                Array.isArray(cart.items)
            ) {

                cart.items.forEach(item => {

                    const quantity =
                        Number(
                            item.quantity ??
                            item.qty ??
                            item.count ??
                            1
                        );


                    if (Number.isFinite(quantity)) {
                        total += quantity;
                    }

                });

                break;
            }

        } catch (error) {

            console.warn(
                `Could not read ${key}`,
                error
            );

        }

    }


    return total;
}


function updateCartCount() {

    cartCount.textContent =
        getCartCount();

}


/* =========================
   PAYMENT NAME
========================= */

function getPaymentName(method) {

    const paymentNames = {

        cod: "Cash on Delivery",

        upi: "UPI",

        card: "Credit / Debit Card"

    };


    return (
        paymentNames[method] ||
        "Payment method selected"
    );

}


/* =========================
   FORMAT DATE
========================= */

function formatOrderDate(dateValue) {

    if (!dateValue) {
        return "Order placed successfully";
    }


    const date =
        new Date(dateValue);


    if (Number.isNaN(date.getTime())) {
        return "Order placed successfully";
    }


    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/* =========================
   ADDRESS
========================= */

function renderAddress(order) {

    const address =
        order.address || {};


    customerNameElement.textContent =
        address.fullName || "Customer";


    const addressParts = [
        address.house,
        address.area,
        address.city,
        address.state,
        address.pincode
    ].filter(Boolean);


    customerAddressElement.textContent =
        addressParts.join(", ") ||
        "Delivery address not available";


    customerMobileElement.textContent =
        address.mobile
            ? `Mobile: ${address.mobile}`
            : "";

}


/* =========================
   PRODUCTS
========================= */

function renderProducts(order) {

    orderedProducts.innerHTML = "";


    const items =
        Array.isArray(order.items)
            ? order.items
            : [];


    let totalQuantity = 0;


    items.forEach(item => {

        const quantity =
            Number(item.quantity) || 1;


        totalQuantity += quantity;


        const product =
            getProduct(item.id);


        const image =
            item.image ||
            product?.image ||
            "";


        const name =
            item.name ||
            product?.name ||
            "MARTEY Product";


        const size =
            item.size ||
            product?.size ||
            "";


        const price =
            Number(item.price) ||
            Number(product?.price) ||
            0;


        const itemTotal =
            price * quantity;


        const productElement =
            document.createElement("div");


        productElement.className =
            "ordered-product";


        productElement.innerHTML = `

            <div class="product-image">

                ${
                    image
                        ? `
                            <img
                                src="${image}"
                                alt="${name}"
                                onerror="this.style.display='none'"
                            >
                        `
                        : ""
                }

            </div>


            <div class="product-info">

                <div class="product-name">
                    ${name}
                </div>

                <div class="product-meta">
                    ${size ? `${size} · ` : ""}
                    Quantity: ${quantity}
                </div>

            </div>


            <div class="product-price">

                <strong>
                    ${formatPrice(itemTotal)}
                </strong>

                ${
                    quantity > 1
                        ? `<small>${formatPrice(price)} each</small>`
                        : ""
                }

            </div>

        `;


        orderedProducts.appendChild(
            productElement
        );

    });


    productCountElement.textContent =
        `${totalQuantity} ${
            totalQuantity === 1
                ? "item"
                : "items"
        }`;

}


/* =========================
   PRICING
========================= */

function renderPricing(order) {

    const pricing =
        order.pricing || {};


    const subtotal =
        Number(pricing.subtotal) || 0;


    const savings =
        Number(pricing.savings) || 0;


    const total =
        Number(pricing.total) || subtotal;


    subtotalElement.textContent =
        formatPrice(subtotal);


    savingsElement.textContent =
        formatPrice(savings);


    totalElement.textContent =
        formatPrice(total);

}


/* =========================
   ORDER ID
========================= */

function renderOrderId(order) {

    orderIdElement.textContent =
        order.orderId || "MRT-ORDER";


    orderDateElement.textContent =
        formatOrderDate(order.createdAt);

}


/* =========================
   PAYMENT
========================= */

function renderPayment(order) {

    paymentMethodElement.textContent =
        getPaymentName(
            order.paymentMethod
        );

}


/* =========================
   COPY ORDER ID
========================= */

copyOrderIdButton.addEventListener(
    "click",
    async function() {

        const order =
            getLastOrder();


        if (!order || !order.orderId) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                order.orderId
            );


            copyOrderIdButton.textContent =
                "Copied";


            setTimeout(() => {

                copyOrderIdButton.textContent =
                    "Copy";

            }, 1600);

        } catch (error) {

            /*
                Clipboard API may not work on some
                HTTP hosting environments.
            */

            alert(
                `Order ID: ${order.orderId}`
            );

        }

    }
);


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
   NO ORDER STATE
========================= */

function showNoOrder() {

    successCard.style.display =
        "none";

    detailsLayout.style.display =
        "none";

    noOrder.classList.add("show");

}


/* =========================
   SHOW ORDER
========================= */

function showOrder(order) {

    successCard.style.display =
        "block";

    detailsLayout.style.display =
        "grid";

    noOrder.classList.remove("show");


    renderOrderId(order);

    renderAddress(order);

    renderProducts(order);

    renderPricing(order);

    renderPayment(order);

}


/* =========================
   INITIALIZE
========================= */

function initializePage() {

    updateCartCount();


    const order =
        getLastOrder();


    if (!order) {

        showNoOrder();

        return;
    }


    showOrder(order);

}


initializePage();


/* =========================
   STORAGE SYNC
========================= */

window.addEventListener(
    "storage",
    function() {

        updateCartCount();

    }
);
