/* =========================================================
   MARTEY — ORDER TRACKING
   Frontend Demo
========================================================= */


/* =========================================================
   PRODUCT DATA
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
        name: "Fresh White Bread",
        category: "Bakery",
        size: "400 g",
        price: 45,
        mrp: 50,
        image: "../assets/products/bread.jpg"
    },

    {
        id: 1003,
        name: "Orange Drink",
        category: "Drinks",
        size: "750 ml",
        price: 70,
        mrp: 80,
        image: "../assets/products/orange-drink.jpg"
    },

    {
        id: 1004,
        name: "Classic Salted Chips",
        category: "Snacks",
        size: "100 g",
        price: 35,
        mrp: 40,
        image: "../assets/products/chips.jpg"
    },

    {
        id: 1005,
        name: "Fresh Bananas",
        category: "Fruits & Vegetables",
        size: "6 pcs",
        price: 42,
        mrp: 48,
        image: "../assets/products/bananas.jpg"
    },

    {
        id: 1006,
        name: "Daily Care Shampoo",
        category: "Personal Care",
        size: "180 ml",
        price: 145,
        mrp: 170,
        image: "../assets/products/shampoo.jpg"
    },

    {
        id: 1007,
        name: "Liquid Laundry Detergent",
        category: "Household",
        size: "1 L",
        price: 180,
        mrp: 210,
        image: "../assets/products/detergent.jpg"
    },

    {
        id: 1008,
        name: "Baby Soft Wipes",
        category: "Baby Care",
        size: "72 wipes",
        price: 120,
        mrp: 140,
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
        mrp: 340,
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
        name: "Classic Notebook",
        category: "Stationery",
        size: "200 pages",
        price: 85,
        mrp: 100,
        image: "../assets/products/notebook.jpg"
    }
];


/* =========================================================
   TRACKING STATUSES
========================================================= */

const trackingStatuses = [
    {
        key: "PLACED",
        title: "Order Placed",
        description: "Your order has been successfully placed."
    },

    {
        key: "CONFIRMED",
        title: "Order Confirmed",
        description: "Your order has been confirmed by MARTEY."
    },

    {
        key: "PICKING",
        title: "Picking Items",
        description: "The store is preparing your items."
    },

    {
        key: "PACKED",
        title: "Order Packed",
        description: "Your order has been packed and is ready for pickup."
    },

    {
        key: "READY FOR PICKUP",
        title: "Ready for Pickup",
        description: "Your order is ready for the delivery partner."
    },

    {
        key: "DELIVERY ASSIGNED",
        title: "Delivery Assigned",
        description: "A delivery partner has been assigned to your order."
    },

    {
        key: "OUT FOR DELIVERY",
        title: "Out for Delivery",
        description: "Your order is on its way to you."
    },

    {
        key: "DELIVERED",
        title: "Delivered",
        description: "Your order has been delivered."
    }
];


/* =========================================================
   DOM
========================================================= */

const trackingContent =
    document.getElementById("trackingContent");

const notFoundState =
    document.getElementById("notFoundState");

const orderIdElement =
    document.getElementById("orderId");

const orderDateElement =
    document.getElementById("orderDate");

const orderStatusElement =
    document.getElementById("orderStatus");

const statusBox =
    document.getElementById("statusBox");

const deliveryHeading =
    document.getElementById("deliveryHeading");

const deliveryMessage =
    document.getElementById("deliveryMessage");

const timeline =
    document.getElementById("timeline");

const orderedItems =
    document.getElementById("orderedItems");

const itemCount =
    document.getElementById("itemCount");

const customerName =
    document.getElementById("customerName");

const customerAddress =
    document.getElementById("customerAddress");

const customerMobile =
    document.getElementById("customerMobile");

const deliveryInstruction =
    document.getElementById("deliveryInstruction");

const paymentMethod =
    document.getElementById("paymentMethod");

const paymentStatus =
    document.getElementById("paymentStatus");

const subtotal =
    document.getElementById("subtotal");

const savings =
    document.getElementById("savings");

const deliveryFee =
    document.getElementById("deliveryFee");

const total =
    document.getElementById("total");

const viewDetailsButton =
    document.getElementById("viewDetailsButton");

const cartCount =
    document.getElementById("cartCount");

const searchInput =
    document.getElementById("searchInput");

const locationButton =
    document.getElementById("locationButton");


/* =========================================================
   HELPERS
========================================================= */

function getOrderIdFromURL() {

    const params = new URLSearchParams(
        window.location.search
    );

    return params.get("order");
}


function formatCurrency(value) {

    const number = Number(value) || 0;

    return `₹${number.toLocaleString("en-IN")}`;
}


function formatDate(dateValue) {

    if (!dateValue) {
        return "Date unavailable";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}


function normalizeStatus(status) {

    if (!status) {
        return "PLACED";
    }

    return String(status)
        .trim()
        .toUpperCase();
}


/* =========================================================
   PRODUCT LOOKUP
========================================================= */

function getProduct(productId) {

    return products.find(
        product => Number(product.id) === Number(productId)
    );
}


/* =========================================================
   ORDER STORAGE
========================================================= */

function getOrders() {

    let orders = [];

    try {

        const savedOrders =
            JSON.parse(
                localStorage.getItem("marteyOrders")
            );

        if (Array.isArray(savedOrders)) {
            orders = savedOrders;
        }

    } catch (error) {

        console.warn(
            "Could not read marteyOrders.",
            error
        );

    }

    return orders;
}


function migrateLastOrder() {

    let lastOrder = null;

    try {

        lastOrder =
            JSON.parse(
                localStorage.getItem("marteyLastOrder")
            );

    } catch (error) {

        console.warn(
            "Could not read marteyLastOrder.",
            error
        );

    }

    if (!lastOrder || !lastOrder.orderId) {
        return;
    }

    const orders = getOrders();

    const alreadyExists = orders.some(
        order =>
            String(order.orderId) ===
            String(lastOrder.orderId)
    );

    if (!alreadyExists) {

        orders.unshift(lastOrder);

        localStorage.setItem(
            "marteyOrders",
            JSON.stringify(orders)
        );
    }
}


function getOrder(orderId) {

    migrateLastOrder();

    const orders = getOrders();

    return orders.find(
        order =>
            String(order.orderId) ===
            String(orderId)
    );
}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    let cart = [];

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

                cart = stored;
                break;
            }

        } catch (error) {
            // Ignore invalid cart storage.
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

        count += quantity > 0 ? quantity : 1;
    });

    cartCount.textContent = count;
}


/* =========================================================
   STATUS INFORMATION
========================================================= */

function getStatusIndex(status) {

    return trackingStatuses.findIndex(
        item => item.key === status
    );
}


function getStatusText(status) {

    const found =
        trackingStatuses.find(
            item => item.key === status
        );

    return found
        ? found.title
        : "Order Placed";
}


/* =========================================================
   DELIVERY UPDATE
========================================================= */

function renderDeliveryUpdate(status) {

    if (status === "CANCELLED") {

        deliveryHeading.textContent =
            "This order has been cancelled";

        deliveryMessage.textContent =
            "This order is no longer moving through the delivery process.";

        statusBox.style.background = "#FEF2F2";
        statusBox.style.color = "#E53935";

        return;
    }

    if (status === "DELIVERED") {

        deliveryHeading.textContent =
            "Order delivered";

        deliveryMessage.textContent =
            "Your order has been delivered successfully.";

        return;
    }

    if (status === "OUT FOR DELIVERY") {

        deliveryHeading.textContent =
            "Your order is on the way";

        deliveryMessage.textContent =
            "Your order has left the fulfillment location and is out for delivery.";

        return;
    }

    if (status === "DELIVERY ASSIGNED") {

        deliveryHeading.textContent =
            "Delivery partner assigned";

        deliveryMessage.textContent =
            "Your order is ready to move toward delivery.";

        return;
    }

    if (status === "READY FOR PICKUP") {

        deliveryHeading.textContent =
            "Order ready for pickup";

        deliveryMessage.textContent =
            "Your order has been prepared and is waiting for pickup.";

        return;
    }

    if (status === "PACKED") {

        deliveryHeading.textContent =
            "Your order is packed";

        deliveryMessage.textContent =
            "Your items have been packed and are being prepared for pickup.";

        return;
    }

    if (status === "PICKING") {

        deliveryHeading.textContent =
            "We're preparing your order";

        deliveryMessage.textContent =
            "The store is currently picking your items.";

        return;
    }

    if (status === "CONFIRMED") {

        deliveryHeading.textContent =
            "Order confirmed";

        deliveryMessage.textContent =
            "The nearby MARTEY store has confirmed your order.";

        return;
    }

    deliveryHeading.textContent =
        "Your order has been placed";

    deliveryMessage.textContent =
        "Your order is waiting to move through the MARTEY fulfillment process.";
}


/* =========================================================
   TIMELINE
========================================================= */

function renderTimeline(status) {

    timeline.innerHTML = "";

    if (status === "CANCELLED") {

        const item = document.createElement("div");

        item.className =
            "timeline-item active";

        item.innerHTML = `
            <div class="timeline-marker">×</div>

            <div class="timeline-content">
                <strong>Order Cancelled</strong>
                <p>
                    This order has been cancelled and will not continue through delivery.
                </p>
            </div>
        `;

        timeline.appendChild(item);

        return;
    }

    const currentIndex =
        getStatusIndex(status);

    trackingStatuses.forEach(
        (statusItem, index) => {

            const item =
                document.createElement("div");

            let stateClass = "";

            if (currentIndex === -1) {

                if (index === 0) {
                    stateClass = "active";
                }

            } else if (index < currentIndex) {

                stateClass = "completed";

            } else if (index === currentIndex) {

                stateClass = "active";

            }

            item.className =
                `timeline-item ${stateClass}`;

            let marker = "•";

            if (stateClass === "completed") {
                marker = "✓";
            }

            if (stateClass === "active") {
                marker = "•";
            }

            item.innerHTML = `
                <div class="timeline-marker">
                    ${marker}
                </div>

                <div class="timeline-content">
                    <strong>
                        ${statusItem.title}
                    </strong>

                    <p>
                        ${statusItem.description}
                    </p>
                </div>
            `;

            timeline.appendChild(item);
        }
    );
}


/* =========================================================
   ORDER ITEMS
========================================================= */

function renderItems(order) {

    orderedItems.innerHTML = "";

    const items =
        Array.isArray(order.items)
            ? order.items
            : [];

    let totalQuantity = 0;

    items.forEach(item => {

        const product =
            getProduct(
                item.id ??
                item.productId ??
                item.productID
            );

        const quantity =
            Number(
                item.quantity ??
                item.qty ??
                1
            ) || 1;

        totalQuantity += quantity;

        const name =
            item.name ??
            product?.name ??
            "MARTEY Product";

        const image =
            item.image ??
            product?.image ??
            "../assets/products/milk.jpg";

        const category =
            item.category ??
            product?.category ??
            "Product";

        const size =
            item.size ??
            product?.size ??
            "";

        const price =
            Number(
                item.price ??
                product?.price ??
                0
            );

        const itemElement =
            document.createElement("div");

        itemElement.className =
            "ordered-item";

        itemElement.innerHTML = `
            <img
                class="product-image"
                src="${image}"
                alt="${name}"
                onerror="this.src='../assets/products/milk.jpg'"
            >

            <div class="product-info">

                <h3>${name}</h3>

                <p>
                    ${category}
                    ${size ? ` • ${size}` : ""}
                </p>

                <div class="product-quantity">
                    Qty: ${quantity}
                </div>

            </div>

            <div class="product-price">
                ${formatCurrency(price * quantity)}
            </div>
        `;

        orderedItems.appendChild(itemElement);
    });

    if (!items.length) {

        orderedItems.innerHTML = `
            <p style="color:#667085;font-size:13px;">
                No item information is available for this order.
            </p>
        `;

    }

    itemCount.textContent =
        `${totalQuantity} ${
            totalQuantity === 1 ? "item" : "items"
        }`;
}


/* =========================================================
   ADDRESS
========================================================= */

function renderAddress(order) {

    const address =
        order.address || {};

    customerName.textContent =
        address.fullName ||
        address.name ||
        "Customer";

    const addressParts = [
        address.houseFlat,
        address.areaLocality,
        address.city,
        address.state,
        address.pincode
    ].filter(Boolean);

    customerAddress.textContent =
        addressParts.length
            ? addressParts.join(", ")
            : "Address information unavailable.";

    customerMobile.textContent =
        address.mobile
            ? `Mobile: ${address.mobile}`
            : "Mobile number unavailable.";

    const instruction =
        address.deliveryInstructions ||
        address.instructions ||
        "";

    if (instruction) {

        deliveryInstruction.textContent =
            `Delivery instructions: ${instruction}`;

        deliveryInstruction.classList.remove(
            "hidden"
        );

    } else {

        deliveryInstruction.textContent = "";

        deliveryInstruction.classList.add(
            "hidden"
        );
    }
}


/* =========================================================
   PAYMENT + SUMMARY
========================================================= */

function renderSummary(order) {

    const pricing =
        order.pricing || {};

    const calculatedSubtotal =
        Number(
            pricing.subtotal ??
            0
        );

    const calculatedSavings =
        Number(
            pricing.savings ??
            0
        );

    const calculatedDelivery =
        Number(
            pricing.delivery ??
            pricing.deliveryFee ??
            0
        );

    const calculatedTotal =
        Number(
            pricing.total ??
            (
                calculatedSubtotal -
                calculatedSavings +
                calculatedDelivery
            )
        );

    subtotal.textContent =
        formatCurrency(calculatedSubtotal);

    savings.textContent =
        `-${formatCurrency(calculatedSavings)}`;

    deliveryFee.textContent =
        calculatedDelivery === 0
            ? "FREE"
            : formatCurrency(calculatedDelivery);

    total.textContent =
        formatCurrency(calculatedTotal);


    let method =
        order.paymentMethod ||
        "Cash on Delivery";

    method =
        String(method)
            .toUpperCase();

    if (method === "COD") {
        method = "Cash on Delivery";
    }

    if (method === "UPI") {
        method = "UPI";
    }

    if (method === "CARD") {
        method = "Card";
    }

    paymentMethod.textContent =
        method;

    const paymentIsCompleted =
        method === "UPI" ||
        method === "Card";

    paymentStatus.textContent =
        paymentIsCompleted
            ? "Payment selected"
            : "Pay on delivery";
}


/* =========================================================
   RENDER ORDER
========================================================= */

function renderOrder(order) {

    const status =
        normalizeStatus(order.status);

    orderIdElement.textContent =
        `Order #${order.orderId}`;

    orderDateElement.textContent =
        `Placed on ${formatDate(order.createdAt)}`;

    orderStatusElement.textContent =
        getStatusText(status);

    renderDeliveryUpdate(status);

    renderTimeline(status);

    renderItems(order);

    renderAddress(order);

    renderSummary(order);

    viewDetailsButton.href =
        `/order-details?order=${encodeURIComponent(
            order.orderId
        )}`;
}


/* =========================================================
   SEARCH
========================================================= */

function handleSearch() {

    const query =
        searchInput.value.trim();

    if (!query) {
        return;
    }

    window.location.href =
        `/search?q=${encodeURIComponent(query)}`;
}


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            handleSearch();
        }
    }
);


/* =========================================================
   LOCATION
========================================================= */

locationButton.addEventListener(
    "click",
    () => {

        alert(
            "Location selection will be connected to MARTEY's location and store system later."
        );
    }
);


/* =========================================================
   INIT
========================================================= */

function init() {

    updateCartCount();

    const orderId =
        getOrderIdFromURL();

    if (!orderId) {

        trackingContent.classList.add(
            "hidden"
        );

        notFoundState.classList.remove(
            "hidden"
        );

        return;
    }

    const order =
        getOrder(orderId);

    if (!order) {

        trackingContent.classList.add(
            "hidden"
        );

        notFoundState.classList.remove(
            "hidden"
        );

        return;
    }

    notFoundState.classList.add(
        "hidden"
    );

    trackingContent.classList.remove(
        "hidden"
    );

    renderOrder(order);
}


init();
