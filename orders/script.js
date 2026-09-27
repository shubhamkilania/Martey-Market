/* =========================================================
   MARTEY — ORDERS PAGE
   Frontend order management
   ========================================================= */


/* =========================================================
   PRODUCT DATA
   ========================================================= */

const products = [

    {
        id: 1001,
        name: "Fresh Full Cream Milk",
        category: "Milk & Dairy",
        size: "1 L",
        price: 68,
        mrp: 72,
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
        name: "Orange Fruit Drink",
        category: "Drinks",
        size: "1 L",
        price: 95,
        mrp: 110,
        image: "../assets/products/orange-drink.jpg"
    },

    {
        id: 1004,
        name: "Classic Salted Chips",
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
        size: "6 pcs",
        price: 45,
        mrp: 50,
        image: "../assets/products/bananas.jpg"
    },

    {
        id: 1006,
        name: "Daily Care Shampoo",
        category: "Personal Care",
        size: "180 ml",
        price: 149,
        mrp: 175,
        image: "../assets/products/shampoo.jpg"
    },

    {
        id: 1007,
        name: "Liquid Laundry Detergent",
        category: "Household",
        size: "1 L",
        price: 199,
        mrp: 230,
        image: "../assets/products/detergent.jpg"
    },

    {
        id: 1008,
        name: "Baby Soft Wipes",
        category: "Baby Care",
        size: "72 wipes",
        price: 125,
        mrp: 150,
        image: "../assets/products/baby-wipes.jpg"
    },

    {
        id: 1009,
        name: "Chocolate Biscuits",
        category: "Snacks",
        size: "120 g",
        price: 35,
        mrp: 40,
        image: "../assets/products/biscuits.jpg"
    },

    {
        id: 1010,
        name: "Premium Pet Food",
        category: "Pet Supplies",
        size: "500 g",
        price: 299,
        mrp: 340,
        image: "../assets/products/pet-food.jpg"
    },

    {
        id: 1011,
        name: "Wireless Bluetooth Headphones",
        category: "Electronics & Accessories",
        size: "1 pc",
        price: 799,
        mrp: 999,
        image: "../assets/products/headphones.jpg"
    },

    {
        id: 1012,
        name: "Classic Spiral Notebook",
        category: "Stationery",
        size: "200 pages",
        price: 85,
        mrp: 100,
        image: "../assets/products/notebook.jpg"
    }

];


/* =========================================================
   DOM
   ========================================================= */

const ordersContainer = document.getElementById("ordersContainer");
const emptyOrders = document.getElementById("emptyOrders");

const cartCount = document.getElementById("cartCount");

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const locationBtn = document.getElementById("locationBtn");

const filterButtons = document.querySelectorAll(".filter-btn");


/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function getOrders() {

    let orders = [];

    try {
        const storedOrders = localStorage.getItem("marteyOrders");

        if (storedOrders) {
            const parsed = JSON.parse(storedOrders);

            if (Array.isArray(parsed)) {
                orders = parsed;
            }
        }

    } catch (error) {
        console.error("Could not read marteyOrders:", error);
    }


    /*
       Compatibility:

       The current checkout system saves the latest order
       inside marteyLastOrder.

       If marteyOrders does not contain that order yet,
       migrate it here.
    */

    try {

        const lastOrderRaw = localStorage.getItem("marteyLastOrder");

        if (lastOrderRaw) {

            const lastOrder = JSON.parse(lastOrderRaw);

            if (
                lastOrder &&
                lastOrder.orderId &&
                !orders.some(order => order.orderId === lastOrder.orderId)
            ) {

                orders.unshift(lastOrder);

                localStorage.setItem(
                    "marteyOrders",
                    JSON.stringify(orders)
                );
            }
        }

    } catch (error) {
        console.error("Could not migrate marteyLastOrder:", error);
    }


    return orders;
}


/* =========================================================
   SAVE ORDERS
   ========================================================= */

function saveOrders(orders) {

    try {

        localStorage.setItem(
            "marteyOrders",
            JSON.stringify(orders)
        );

    } catch (error) {

        console.error("Could not save orders:", error);

    }

}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    let cart = [];

    try {

        const rawCart = localStorage.getItem("marteyCart");

        if (rawCart) {
            cart = JSON.parse(rawCart);
        }

    } catch (error) {

        console.error("Could not read cart:", error);

    }


    if (!Array.isArray(cart)) {
        cart = [];
    }


    const totalQuantity = cart.reduce((total, item) => {

        const quantity =
            Number(item.quantity) ||
            Number(item.qty) ||
            1;

        return total + quantity;

    }, 0);


    if (cartCount) {
        cartCount.textContent = totalQuantity;
        cartCount.style.display =
            totalQuantity > 0 ? "grid" : "none";
    }

}


/* =========================================================
   FORMAT CURRENCY
   ========================================================= */

function formatPrice(amount) {

    return "₹" + Number(amount || 0).toLocaleString("en-IN");

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(dateValue) {

    if (!dateValue) {
        return "Date unavailable";
    }


    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }


    return date.toLocaleDateString("en-IN", {

        day: "numeric",
        month: "short",
        year: "numeric"

    });

}


/* =========================================================
   GET PRODUCT
   ========================================================= */

function getProduct(productId) {

    return products.find(
        product => Number(product.id) === Number(productId)
    );

}


/* =========================================================
   NORMALIZE ORDER ITEMS
   ========================================================= */

function normalizeItems(order) {

    if (!order || !Array.isArray(order.items)) {
        return [];
    }


    return order.items.map(item => {

        const productId =
            item.id ??
            item.productId ??
            item.productID;


        const product = getProduct(productId);


        return {

            id: productId,

            name:
                item.name ||
                item.productName ||
                product?.name ||
                "Product",

            category:
                item.category ||
                product?.category ||
                "MARTEY",

            size:
                item.size ||
                product?.size ||
                "",

            price:
                Number(
                    item.price ??
                    product?.price ??
                    0
                ),

            quantity:
                Number(
                    item.quantity ??
                    item.qty ??
                    1
                ) || 1,

            image:
                item.image ||
                product?.image ||
                ""

        };

    });

}


/* =========================================================
   ORDER TOTAL
   ========================================================= */

function getOrderTotal(order) {

    if (order?.pricing?.total !== undefined) {
        return Number(order.pricing.total);
    }


    if (order?.total !== undefined) {
        return Number(order.total);
    }


    const items = normalizeItems(order);


    return items.reduce((total, item) => {

        return total + (item.price * item.quantity);

    }, 0);

}


/* =========================================================
   STATUS HELPERS
   ========================================================= */

function getStatus(order) {

    const rawStatus = String(
        order?.status || "PLACED"
    ).toUpperCase();


    if (
        rawStatus === "DELIVERED"
    ) {
        return {
            key: "delivered",
            label: "Delivered"
        };
    }


    if (
        rawStatus === "CANCELLED" ||
        rawStatus === "CANCELED"
    ) {
        return {
            key: "cancelled",
            label: "Cancelled"
        };
    }


    return {
        key: "active",
        label: formatStatusLabel(rawStatus)
    };

}


function formatStatusLabel(status) {

    return String(status)
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());

}


/* =========================================================
   CREATE PRODUCT PREVIEW
   ========================================================= */

function createProductPreview(item) {

    const wrapper = document.createElement("div");

    wrapper.className = "product-preview";


    const image = document.createElement("img");

    image.src = item.image;
    image.alt = item.name;

    image.loading = "lazy";


    image.onerror = function () {

        this.style.display = "none";

        wrapper.innerHTML = "🛍";

        wrapper.style.fontSize = "22px";

    };


    wrapper.appendChild(image);


    return wrapper;

}


/* =========================================================
   CREATE ORDER CARD
   ========================================================= */

function createOrderCard(order) {

    const card = document.createElement("article");

    card.className = "order-card";


    const status = getStatus(order);

    const items = normalizeItems(order);

    const total = getOrderTotal(order);

    const orderId =
        order.orderId ||
        order.id ||
        "MRT-ORDER";


    /* ================= TOP ================= */

    const top = document.createElement("div");

    top.className = "order-card-top";


    const idArea = document.createElement("div");

    idArea.className = "order-id-area";


    const idLabel = document.createElement("span");

    idLabel.className = "order-id-label";
    idLabel.textContent = "Order ID";


    const id = document.createElement("strong");

    id.className = "order-id";
    id.textContent = orderId;


    const date = document.createElement("span");

    date.className = "order-date";

    date.textContent =
        formatDate(
            order.createdAt ||
            order.date ||
            order.created_at
        );


    idArea.appendChild(idLabel);
    idArea.appendChild(id);
    idArea.appendChild(date);


    const statusBadge = document.createElement("div");

    statusBadge.className =
        `order-status status-${status.key}`;


    const statusDot = document.createElement("span");

    statusDot.className = "status-dot";


    const statusText = document.createElement("span");

    statusText.textContent = status.label;


    statusBadge.appendChild(statusDot);
    statusBadge.appendChild(statusText);


    top.appendChild(idArea);
    top.appendChild(statusBadge);


    /* ================= BODY ================= */

    const body = document.createElement("div");

    body.className = "order-card-body";


    /* Product previews */

    const productArea = document.createElement("div");

    productArea.className = "order-products";


    const previewItems = items.slice(0, 3);


    previewItems.forEach(item => {

        productArea.appendChild(
            createProductPreview(item)
        );

    });


    if (items.length > 3) {

        const more = document.createElement("div");

        more.className = "more-products";

        more.textContent =
            `+${items.length - 3}`;


        productArea.appendChild(more);

    }


    /* Product information */

    const productInfo = document.createElement("div");

    productInfo.className = "order-product-info";


    const productTitle = document.createElement("h3");

    if (items.length === 0) {

        productTitle.textContent =
            "Order details unavailable";

    } else if (items.length === 1) {

        productTitle.textContent =
            items[0].name;

    } else {

        productTitle.textContent =
            `${items[0].name} + ${items.length - 1} more`;

    }


    const itemCount = document.createElement("p");

    const totalQuantity = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );


    itemCount.textContent =
        `${totalQuantity} item${totalQuantity === 1 ? "" : "s"}`;


    productInfo.appendChild(productTitle);
    productInfo.appendChild(itemCount);


    /* Total */

    const totalArea = document.createElement("div");

    totalArea.className = "order-total";


    const totalLabel = document.createElement("span");

    totalLabel.textContent = "Total";


    const totalValue = document.createElement("strong");

    totalValue.textContent =
        formatPrice(total);


    totalArea.appendChild(totalLabel);
    totalArea.appendChild(totalValue);


    /* Actions */

    const actions = document.createElement("div");

    actions.className = "order-actions";


    const detailsButton = document.createElement("a");

    detailsButton.className = "secondary-btn";

    detailsButton.href =
        `/order-details?order=${encodeURIComponent(orderId)}`;

    detailsButton.textContent =
        "View Details";


    const trackButton = document.createElement("a");

    trackButton.className = "primary-small-btn";

    trackButton.href =
        `/order-tracking?order=${encodeURIComponent(orderId)}`;

    trackButton.textContent =
        status.key === "delivered"
            ? "View Order"
            : "Track Order";


    actions.appendChild(detailsButton);
    actions.appendChild(trackButton);


    body.appendChild(productArea);
    body.appendChild(productInfo);
    body.appendChild(totalArea);
    body.appendChild(actions);


    card.appendChild(top);
    card.appendChild(body);


    return card;

}


/* =========================================================
   RENDER ORDERS
   ========================================================= */

function renderOrders(filter = "all") {

    const orders = getOrders();


    ordersContainer.innerHTML = "";


    let filteredOrders = orders;


    if (filter !== "all") {

        filteredOrders = orders.filter(order => {

            return getStatus(order).key === filter;

        });

    }


    if (orders.length === 0) {

        emptyOrders.classList.add("show");

        return;

    }


    emptyOrders.classList.remove("show");


    if (filteredOrders.length === 0) {

        const noResults = document.createElement("div");

        noResults.className = "no-filter-results";


        const title = document.createElement("h3");

        title.textContent =
            filter === "active"
                ? "No active orders"
                : filter === "delivered"
                    ? "No delivered orders"
                    : "No cancelled orders";


        const description = document.createElement("p");

        description.textContent =
            "Orders matching this filter will appear here.";


        noResults.appendChild(title);
        noResults.appendChild(description);


        ordersContainer.appendChild(noResults);

        return;

    }


    const container = document.createElement("div");

    container.className = "orders-container";


    filteredOrders.forEach(order => {

        container.appendChild(
            createOrderCard(order)
        );

    });


    ordersContainer.appendChild(container);

}


/* =========================================================
   FILTERS
   ========================================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        button.classList.add("active");


        const filter =
            button.dataset.filter || "all";


        renderOrders(filter);

    });

});


/* =========================================================
   SEARCH
   ========================================================= */

function performSearch() {

    const query =
        searchInput.value.trim();


    if (!query) {
        return;
    }


    window.location.href =
        `/search?q=${encodeURIComponent(query)}`;

}


searchButton.addEventListener(
    "click",
    performSearch
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            performSearch();
        }

    }
);


/* =========================================================
   LOCATION
   ========================================================= */

locationBtn.addEventListener(
    "click",
    () => {

        alert(
            "Location selection will be connected to MARTEY's location system later."
        );

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

function init() {

    updateCartCount();

    renderOrders("all");

}


init();
