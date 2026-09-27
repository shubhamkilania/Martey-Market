/* =========================================================
   MARTEY — ORDER DETAILS
   Frontend Only
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
   DOM ELEMENTS
   ========================================================= */

const orderContent =
    document.getElementById("orderContent");

const noOrder =
    document.getElementById("noOrder");

const productsList =
    document.getElementById("productsList");

const itemsCount =
    document.getElementById("itemsCount");

const pageTitle =
    document.getElementById("pageTitle");

const orderMeta =
    document.getElementById("orderMeta");

const statusBadge =
    document.getElementById("statusBadge");

const statusText =
    document.getElementById("statusText");

const addressName =
    document.getElementById("addressName");

const addressText =
    document.getElementById("addressText");

const addressMobile =
    document.getElementById("addressMobile");

const deliveryInstructions =
    document.getElementById("deliveryInstructions");

const instructionsText =
    document.getElementById("instructionsText");

const paymentMethod =
    document.getElementById("paymentMethod");

const paymentStatus =
    document.getElementById("paymentStatus");

const subtotal =
    document.getElementById("subtotal");

const savings =
    document.getElementById("savings");

const delivery =
    document.getElementById("delivery");

const total =
    document.getElementById("total");

const orderIdElement =
    document.getElementById("orderId");

const orderDate =
    document.getElementById("orderDate");

const sidebarItems =
    document.getElementById("sidebarItems");

const trackOrderBtn =
    document.getElementById("trackOrderBtn");

const cartCount =
    document.getElementById("cartCount");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const locationBtn =
    document.getElementById("locationBtn");


/* =========================================================
   STORAGE
   ========================================================= */

function getAllOrders() {

    let orders = [];


    try {

        const raw =
            localStorage.getItem("marteyOrders");

        if (raw) {

            const parsed =
                JSON.parse(raw);

            if (Array.isArray(parsed)) {
                orders = parsed;
            }

        }

    } catch (error) {

        console.error(
            "Could not read marteyOrders:",
            error
        );

    }


    /*
       Compatibility with the current system.

       If the order exists only inside marteyLastOrder,
       add it to marteyOrders.
    */

    try {

        const lastOrderRaw =
            localStorage.getItem("marteyLastOrder");

        if (lastOrderRaw) {

            const lastOrder =
                JSON.parse(lastOrderRaw);


            if (
                lastOrder &&
                lastOrder.orderId &&
                !orders.some(
                    order =>
                        order.orderId ===
                        lastOrder.orderId
                )
            ) {

                orders.unshift(lastOrder);

                localStorage.setItem(
                    "marteyOrders",
                    JSON.stringify(orders)
                );

            }

        }

    } catch (error) {

        console.error(
            "Could not migrate last order:",
            error
        );

    }


    return orders;

}


/* =========================================================
   GET ORDER ID FROM URL
   ========================================================= */

function getOrderIdFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return params.get("order");

}


/* =========================================================
   FIND ORDER
   ========================================================= */

function getCurrentOrder() {

    const orderId =
        getOrderIdFromURL();


    const orders =
        getAllOrders();


    if (orderId) {

        const exactOrder =
            orders.find(
                order =>
                    String(order.orderId) ===
                    String(orderId)
            );


        if (exactOrder) {
            return exactOrder;
        }

    }


    /*
       If no order parameter exists,
       use the most recent order.
    */

    if (orders.length > 0) {
        return orders[0];
    }


    return null;

}


/* =========================================================
   PRODUCT
   ========================================================= */

function getProduct(productId) {

    return products.find(
        product =>
            Number(product.id) ===
            Number(productId)
    );

}


/* =========================================================
   NORMALIZE ITEMS
   ========================================================= */

function normalizeItems(order) {

    if (
        !order ||
        !Array.isArray(order.items)
    ) {
        return [];
    }


    return order.items.map(item => {

        const id =
            item.id ??
            item.productId ??
            item.productID;


        const product =
            getProduct(id);


        return {

            id: id,

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

            mrp:
                Number(
                    item.mrp ??
                    product?.mrp ??
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
   FORMAT PRICE
   ========================================================= */

function formatPrice(amount) {

    return "₹" +
        Number(amount || 0)
            .toLocaleString("en-IN");

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(dateValue) {

    if (!dateValue) {
        return "Date unavailable";
    }


    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "Date unavailable";
    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================================================
   FORMAT DATE + TIME
   ========================================================= */

function formatDateTime(dateValue) {

    if (!dateValue) {
        return "Date unavailable";
    }


    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "Date unavailable";
    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    ) +
        " • " +
        date.toLocaleTimeString(
            "en-IN",
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );

}


/* =========================================================
   STATUS
   ========================================================= */

function getStatus(order) {

    const raw =
        String(
            order?.status ||
            "PLACED"
        ).toUpperCase();


    if (
        raw === "DELIVERED"
    ) {

        return {

            key: "delivered",

            label: "Delivered"

        };

    }


    if (
        raw === "CANCELLED" ||
        raw === "CANCELED"
    ) {

        return {

            key: "cancelled",

            label: "Cancelled"

        };

    }


    return {

        key: "active",

        label: formatStatus(raw)

    };

}


function formatStatus(status) {

    return String(status)
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(
            /\b\w/g,
            letter =>
                letter.toUpperCase()
        );

}


/* =========================================================
   CREATE PRODUCT ROW
   ========================================================= */

function createProductRow(item) {

    const row =
        document.createElement("div");

    row.className =
        "product-row";


    /* Image */

    const imageBox =
        document.createElement("div");

    imageBox.className =
        "product-image";


    const image =
        document.createElement("img");

    image.src =
        item.image;

    image.alt =
        item.name;

    image.loading =
        "lazy";


    image.onerror =
        function () {

            this.style.display =
                "none";

            imageBox.innerHTML =
                "🛍";

            imageBox.style.fontSize =
                "25px";

        };


    imageBox.appendChild(image);


    /* Info */

    const info =
        document.createElement("div");

    info.className =
        "product-info";


    const name =
        document.createElement("h3");

    name.textContent =
        item.name;


    const category =
        document.createElement("div");

    category.className =
        "category";

    category.textContent =
        item.category;


    const size =
        document.createElement("div");

    size.className =
        "size";

    size.textContent =
        item.size;


    info.appendChild(name);
    info.appendChild(category);
    info.appendChild(size);


    /* Quantity */

    const quantity =
        document.createElement("div");

    quantity.className =
        "product-quantity";


    const quantityLabel =
        document.createElement("span");

    quantityLabel.textContent =
        "Quantity";


    const quantityValue =
        document.createElement("strong");

    quantityValue.textContent =
        item.quantity;


    quantity.appendChild(
        quantityLabel
    );

    quantity.appendChild(
        quantityValue
    );


    /* Price */

    const price =
        document.createElement("div");

    price.className =
        "product-price";


    const priceValue =
        document.createElement("strong");

    priceValue.textContent =
        formatPrice(
            item.price *
            item.quantity
        );


    const priceLabel =
        document.createElement("span");

    priceLabel.textContent =
        `${formatPrice(item.price)} × ${item.quantity}`;


    price.appendChild(
        priceValue
    );

    price.appendChild(
        priceLabel
    );


    row.appendChild(imageBox);
    row.appendChild(info);
    row.appendChild(quantity);
    row.appendChild(price);


    return row;

}


/* =========================================================
   ADDRESS
   ========================================================= */

function renderAddress(order) {

    const address =
        order.address || {};


    const name =
        address.fullName ||
        address.name ||
        "Customer";


    const mobile =
        address.mobile ||
        address.phone ||
        "";


    const parts = [

        address.houseFlat,

        address.areaLocality,

        address.city,

        address.state,

        address.pincode

    ].filter(Boolean);


    addressName.textContent =
        name;


    addressText.textContent =
        parts.length
            ? parts.join(", ")
            : "Delivery address not available";


    addressMobile.textContent =
        mobile
            ? `Mobile: ${mobile}`
            : "";


    const instruction =
        address.deliveryInstructions ||
        address.instructions ||
        "";


    if (instruction) {

        deliveryInstructions.style.display =
            "block";

        instructionsText.textContent =
            instruction;

    } else {

        deliveryInstructions.style.display =
            "none";

    }

}


/* =========================================================
   PAYMENT
   ========================================================= */

function renderPayment(order) {

    const method =
        order.paymentMethod ||
        order.payment?.method ||
        "Payment method unavailable";


    const formattedMethod =
        String(method)
            .replace(/_/g, " ")
            .replace(
                /\b\w/g,
                letter =>
                    letter.toUpperCase()
            );


    paymentMethod.textContent =
        formattedMethod;


    /*
       Real payment integration comes later.
    */

    if (
        method.toLowerCase() ===
        "cash on delivery"
    ) {

        paymentStatus.textContent =
            "Pay on delivery";

    } else {

        paymentStatus.textContent =
            order.isDemo
                ? "Demo payment"
                : "Payment information saved";

    }

}


/* =========================================================
   PRICING
   ========================================================= */

function calculatePricing(order, items) {

    let calculatedSubtotal = 0;

    let calculatedMRP = 0;


    items.forEach(item => {

        calculatedSubtotal +=
            item.price *
            item.quantity;


        calculatedMRP +=
            item.mrp *
            item.quantity;

    });


    const savedPricing =
        order.pricing || {};


    const finalSubtotal =
        savedPricing.subtotal !== undefined
            ? Number(savedPricing.subtotal)
            : calculatedSubtotal;


    const finalSavings =
        savedPricing.savings !== undefined
            ? Number(savedPricing.savings)
            : Math.max(
                calculatedMRP -
                calculatedSubtotal,
                0
            );


    let finalDelivery =
        savedPricing.delivery !== undefined
            ? Number(savedPricing.delivery)
            : 0;


    let finalTotal;


    if (
        savedPricing.total !== undefined
    ) {

        finalTotal =
            Number(savedPricing.total);

    } else {

        finalTotal =
            finalSubtotal +
            finalDelivery;

    }


    subtotal.textContent =
        formatPrice(finalSubtotal);


    savings.textContent =
        "-" +
        formatPrice(finalSavings);


    if (
        savedPricing.delivery !== undefined
    ) {

        delivery.textContent =
            finalDelivery === 0
                ? "FREE"
                : formatPrice(finalDelivery);

    } else {

        delivery.textContent =
            "Calculated";

    }


    total.textContent =
        formatPrice(finalTotal);

}


/* =========================================================
   RENDER ORDER
   ========================================================= */

function renderOrder(order) {

    if (!order) {

        orderContent.style.display =
            "none";

        noOrder.classList.add(
            "show"
        );

        return;

    }


    orderContent.style.display =
        "grid";

    noOrder.classList.remove(
        "show"
    );


    const items =
        normalizeItems(order);


    const status =
        getStatus(order);


    const currentOrderId =
        order.orderId ||
        order.id ||
        "MRT-ORDER";


    const createdAt =
        order.createdAt ||
        order.date ||
        order.created_at;


    /* Heading */

    pageTitle.textContent =
        `Order ${currentOrderId}`;


    orderMeta.textContent =
        `Placed on ${formatDateTime(createdAt)}`;


    /* Status */

    statusBadge.className =
        `status-badge status-${status.key}`;


    statusText.textContent =
        status.label;


    /* Products */

    productsList.innerHTML =
        "";


    if (items.length === 0) {

        const empty =
            document.createElement("p");

        empty.textContent =
            "No product information is available for this order.";

        empty.style.padding =
            "22px";

        empty.style.color =
            "#667085";

        empty.style.fontSize =
            "13px";

        productsList.appendChild(
            empty
        );

    } else {

        items.forEach(item => {

            productsList.appendChild(
                createProductRow(item)
            );

        });

    }


    const totalQuantity =
        items.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    itemsCount.textContent =
        `${totalQuantity} item${totalQuantity === 1 ? "" : "s"}`;


    sidebarItems.textContent =
        `${totalQuantity} item${totalQuantity === 1 ? "" : "s"}`;


    /* Address */

    renderAddress(order);


    /* Payment */

    renderPayment(order);


    /* Pricing */

    calculatePricing(
        order,
        items
    );


    /* Order information */

    orderIdElement.textContent =
        currentOrderId;


    orderDate.textContent =
        formatDate(createdAt);


    /* Track button */

    trackOrderBtn.href =
        `/order-tracking?order=${encodeURIComponent(currentOrderId)}`;


    /*
       If order is cancelled, tracking isn't useful.
    */

    if (
        status.key === "cancelled"
    ) {

        trackOrderBtn.textContent =
            "View Order Status";

    }

}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    let cart = [];


    try {

        const raw =
            localStorage.getItem("marteyCart");

        if (raw) {

            cart =
                JSON.parse(raw);

        }

    } catch (error) {

        console.error(
            "Could not read cart:",
            error
        );

    }


    if (!Array.isArray(cart)) {
        cart = [];
    }


    const count =
        cart.reduce(
            (total, item) => {

                const quantity =
                    Number(
                        item.quantity
                    ) ||
                    Number(
                        item.qty
                    ) ||
                    1;


                return total + quantity;

            },
            0
        );


    cartCount.textContent =
        count;


    cartCount.style.display =
        count > 0
            ? "grid"
            : "none";

}


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

    const order =
        getCurrentOrder();

    renderOrder(order);

}


init();
