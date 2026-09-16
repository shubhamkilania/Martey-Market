/* =========================================================
   MARTEY SELLER CENTER
   seller.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       STORAGE HELPERS
    ===================================================== */

    const STORAGE = {
        accounts: "marteyAccounts",
        currentUser: "marteyCurrentUser",
        legacyUser: "marteyUser",
        products: "marteySellerProducts",
        draft: "marteyProductDraft",
        orders: "marteySellerOrders",
        notifications: "marteySellerNotifications",
        promotions: "marteySellerPromotions",
        reviews: "marteySellerReviews",
        payouts: "marteySellerPayouts",
        activity: "marteySellerActivity",
        sidebar: "marteySellerSidebar"
    };


    function readJSON(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            console.error(`MARTEY storage error: ${key}`, error);
            return fallback;
        }
    }


    function writeJSON(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }


    function getProducts() {
        const products = readJSON(STORAGE.products, []);
        return Array.isArray(products) ? products : [];
    }


    function saveProducts(products) {
        writeJSON(STORAGE.products, products);
    }


    function getOrders() {
        const orders = readJSON(STORAGE.orders, []);
        return Array.isArray(orders) ? orders : [];
    }


    function getPromotions() {
        const promotions = readJSON(STORAGE.promotions, []);
        return Array.isArray(promotions) ? promotions : [];
    }


    function getReviews() {
        const reviews = readJSON(STORAGE.reviews, []);
        return Array.isArray(reviews) ? reviews : [];
    }


    function getPayouts() {
        const payouts = readJSON(STORAGE.payouts, []);
        return Array.isArray(payouts) ? payouts : [];
    }


    /* =====================================================
       CURRENT SELLER
    ===================================================== */

    function getCurrentSeller() {

        let currentUser = readJSON(STORAGE.currentUser, null);

        if (!currentUser) {
            currentUser = readJSON(STORAGE.legacyUser, null);
        }

        if (!currentUser) {
            return {
                name: "Seller",
                email: "seller@martey.com",
                role: "seller",
                storeName: "Your Store"
            };
        }

        return currentUser;
    }


    const currentSeller = getCurrentSeller();


    /* =====================================================
       DOM REFERENCES
    ===================================================== */

    const sellerApp = document.getElementById("sellerApp");
    const sellerSidebar = document.getElementById("sellerSidebar");
    const mobileMenuButton = document.getElementById("mobileMenuButton");

    const pageTitle = document.getElementById("pageTitle");

    const sellerSearch = document.getElementById("sellerSearch");

    const notificationButton =
        document.getElementById("notificationButton");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const notificationDot =
        document.getElementById("notificationDot");

    const notificationCount =
        document.getElementById("notificationCount");

    const markNotificationsRead =
        document.getElementById("markNotificationsRead");

    const sellerProfileButton =
        document.getElementById("sellerProfileButton");

    const sellerAvatar =
        document.getElementById("sellerAvatar");

    const profileOverlay =
        document.getElementById("profileOverlay");

    const profileCloseButton =
        document.getElementById("profileCloseButton");

    const sellerModalOverlay =
        document.getElementById("sellerModalOverlay");

    const sellerModal =
        document.getElementById("sellerModal");

    const sellerModalContent =
        document.getElementById("sellerModalContent");

    const sellerModalClose =
        document.getElementById("sellerModalClose");

    const sellerToast =
        document.getElementById("sellerToast");


    /* =====================================================
       SIDEBAR
    ===================================================== */

    function setSidebar(open) {

        if (!sellerSidebar || !sellerApp) return;

        if (open) {

            sellerSidebar.classList.remove("sidebar-closed");
            sellerApp.classList.remove("sidebar-hidden");

            localStorage.setItem(STORAGE.sidebar, "open");

        } else {

            sellerSidebar.classList.add("sidebar-closed");
            sellerApp.classList.add("sidebar-hidden");

            localStorage.setItem(STORAGE.sidebar, "closed");
        }

        if (mobileMenuButton) {
            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(open)
            );
        }
    }


    function initializeSidebar() {

        const savedState =
            localStorage.getItem(STORAGE.sidebar);

        if (savedState === "open") {
            setSidebar(true);
        } else {
            setSidebar(false);
        }
    }


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener("click", () => {

            const isClosed =
                sellerSidebar.classList.contains("sidebar-closed");

            setSidebar(isClosed);

        });
    }


    initializeSidebar();


    /* =====================================================
       SECTION NAVIGATION
    ===================================================== */

    const sectionNames = {
        dashboard: "Dashboard",
        products: "Products",
        orders: "Orders",
        inventory: "Inventory",
        earnings: "Earnings",
        analytics: "Analytics",
        promotions: "Promotions",
        reviews: "Reviews",
        store: "My Store"
    };


    function showSection(sectionName) {

        const sections =
            document.querySelectorAll("[data-page-section]");

        const navItems =
            document.querySelectorAll("[data-section]");

        let found = false;

        sections.forEach(section => {

            const active =
                section.dataset.pageSection === sectionName;

            section.classList.toggle("active", active);

            if (active) found = true;
        });


        navItems.forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.section === sectionName
            );

        });


        if (!found) {
            sectionName = "dashboard";
        }


        if (pageTitle) {
            pageTitle.textContent =
                sectionNames[sectionName] || "Dashboard";
        }


        if (sectionName === "products") {
            renderProducts();
        }

        if (sectionName === "orders") {
            renderOrders();
        }

        if (sectionName === "inventory") {
            renderInventory();
        }

        if (sectionName === "earnings") {
            renderEarnings();
        }

        if (sectionName === "analytics") {
            renderAnalytics();
        }

        if (sectionName === "promotions") {
            renderPromotions();
        }

        if (sectionName === "reviews") {
            renderReviews();
        }

        if (sectionName === "store") {
            renderStore();
        }

        updateDashboard();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    document.querySelectorAll("[data-section]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const section =
                    button.dataset.section;

                showSection(section);

            });

        });


    document.querySelectorAll("[data-open-section]")
        .forEach(button => {

            button.addEventListener("click", () => {

                showSection(
                    button.dataset.openSection
                );

            });

        });


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer = null;


    function showToast(message, type = "success") {

        if (!sellerToast) return;

        sellerToast.textContent = message;

        sellerToast.className =
            "seller-toast show " + type;

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            sellerToast.classList.remove("show");

        }, 2800);
    }


    /* =====================================================
       MODAL
    ===================================================== */

    function openModal(content) {

        if (!sellerModalOverlay || !sellerModalContent) {
            return;
        }

        sellerModalContent.innerHTML = content;

        sellerModalOverlay.classList.add("show");

        sellerModalOverlay.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    function closeModal() {

        if (!sellerModalOverlay) return;

        sellerModalOverlay.classList.remove("show");

        sellerModalOverlay.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    if (sellerModalClose) {
        sellerModalClose.addEventListener(
            "click",
            closeModal
        );
    }


    if (sellerModalOverlay) {

        sellerModalOverlay.addEventListener(
            "click",
            event => {

                if (event.target === sellerModalOverlay) {
                    closeModal();
                }

            }
        );
    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeModal();

            if (profileOverlay) {
                profileOverlay.classList.remove("show");
            }

            if (notificationPanel) {
                notificationPanel.classList.remove("show");
            }
        }

    });


    /* =====================================================
       PROFILE
    ===================================================== */

    function getSellerName() {

        return (
            currentSeller.name ||
            currentSeller.fullName ||
            currentSeller.username ||
            "Seller"
        );
    }


    function getSellerEmail() {

        return (
            currentSeller.email ||
            "seller@martey.com"
        );
    }


    function getStoreName() {

        return (
            currentSeller.storeName ||
            currentSeller.shopName ||
            "Your Store"
        );
    }


    function getInitials(name) {

        if (!name) return "S";

        const words =
            String(name)
                .trim()
                .split(/\s+/);

        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[1].charAt(0)
        ).toUpperCase();
    }


    function updateSellerProfileUI() {

        const name = getSellerName();
        const email = getSellerEmail();

        const profileSellerName =
            document.getElementById("profileSellerName");

        const profileSellerEmail =
            document.getElementById("profileSellerEmail");

        const profileLargeAvatar =
            document.getElementById("profileLargeAvatar");


        if (profileSellerName) {
            profileSellerName.textContent = name;
        }

        if (profileSellerEmail) {
            profileSellerEmail.textContent = email;
        }


        const image =
            currentSeller.profilePicture ||
            currentSeller.profileImage ||
            currentSeller.avatar;


        if (sellerAvatar) {

            if (image) {

                sellerAvatar.innerHTML =
                    `<img src="${image}" alt="Seller profile">`;

            } else {

                sellerAvatar.textContent =
                    getInitials(name);

            }
        }


        if (profileLargeAvatar) {

            if (image) {

                profileLargeAvatar.innerHTML =
                    `<img src="${image}" alt="Seller profile">`;

            } else {

                profileLargeAvatar.textContent =
                    getInitials(name);

            }
        }
    }


    updateSellerProfileUI();


    if (sellerProfileButton) {

        sellerProfileButton.addEventListener(
            "click",
            () => {

                if (!profileOverlay) return;

                profileOverlay.classList.add("show");

            }
        );
    }


    if (profileCloseButton) {

        profileCloseButton.addEventListener(
            "click",
            () => {

                profileOverlay.classList.remove("show");

            }
        );
    }


    if (profileOverlay) {

        profileOverlay.addEventListener(
            "click",
            event => {

                if (event.target === profileOverlay) {

                    profileOverlay.classList.remove(
                        "show"
                    );

                }

            }
        );
    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutButton =
        document.getElementById("sellerLogoutButton");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                const confirmed =
                    window.confirm(
                        "Are you sure you want to logout?"
                    );

                if (!confirmed) return;

                localStorage.removeItem(
                    STORAGE.currentUser
                );

                localStorage.removeItem(
                    STORAGE.legacyUser
                );

                window.location.href =
                    "index.html";

            }
        );
    }


    /* =====================================================
       PROFILE SETTINGS
    ===================================================== */

    const accountSettings =
        document.getElementById(
            "sellerAccountSettings"
        );

    const businessSettings =
        document.getElementById(
            "sellerBusinessSettings"
        );

    const securitySettings =
        document.getElementById(
            "sellerSecuritySettings"
        );


    if (accountSettings) {

        accountSettings.addEventListener(
            "click",
            () => {

                openModal(`
                    <div class="modal-heading">
                        <span class="section-eyebrow">
                            ACCOUNT
                        </span>
                        <h2>Account & Profile</h2>
                    </div>

                    <div class="seller-modal-info">
                        <p><strong>Name:</strong> ${escapeHTML(getSellerName())}</p>
                        <p><strong>Email:</strong> ${escapeHTML(getSellerEmail())}</p>
                        <p><strong>Role:</strong> Seller</p>
                    </div>
                `);

            }
        );
    }


    if (businessSettings) {

        businessSettings.addEventListener(
            "click",
            () => {

                openModal(`
                    <div class="modal-heading">
                        <span class="section-eyebrow">
                            BUSINESS
                        </span>
                        <h2>Business Information</h2>
                    </div>

                    <div class="seller-modal-info">
                        <p><strong>Store:</strong> ${escapeHTML(getStoreName())}</p>
                        <p>Store settings will control your public MARTEY storefront.</p>
                    </div>
                `);

            }
        );
    }


    if (securitySettings) {

        securitySettings.addEventListener(
            "click",
            () => {

                openModal(`
                    <div class="modal-heading">
                        <span class="section-eyebrow">
                            SECURITY
                        </span>
                        <h2>Login & Security</h2>
                    </div>

                    <div class="seller-modal-info">
                        <p>Your login and security controls will be connected to the MARTEY account system.</p>
                    </div>
                `);

            }
        );
    }


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    function getNotifications() {

        let notifications =
            readJSON(
                STORAGE.notifications,
                null
            );

        if (!Array.isArray(notifications)) {

            notifications = [
                {
                    id: "default-order",
                    type: "order",
                    title: "New order received",
                    message: "New seller order activity will appear here.",
                    time: "Recently",
                    unread: true
                },
                {
                    id: "default-payment",
                    type: "payment",
                    title: "Payment update",
                    message: "Your payout information will appear here.",
                    time: "Recently",
                    unread: false
                },
                {
                    id: "default-review",
                    type: "review",
                    title: "Product review",
                    message: "Customer reviews will appear here.",
                    time: "Recently",
                    unread: false
                }
            ];

            writeJSON(
                STORAGE.notifications,
                notifications
            );
        }

        return notifications;
    }


    function renderNotifications() {

        const list =
            document.getElementById(
                "sellerNotificationsList"
            );

        if (!list) return;

        const notifications =
            getNotifications();

        const unread =
            notifications.filter(
                item => item.unread
            ).length;


        if (notificationCount) {

            notificationCount.textContent =
                `${unread} new updates`;

        }


        if (notificationDot) {

            notificationDot.style.display =
                unread > 0 ? "" : "none";

        }


        list.innerHTML =
            notifications.length
                ? notifications.map(notification => {

                    const symbol =
                        notification.type === "payment"
                            ? "₹"
                            : notification.type === "review"
                                ? "★"
                                : "!";

                    const extraClass =
                        notification.type === "payment"
                            ? "purple"
                            : notification.type === "review"
                                ? "blue"
                                : "";

                    return `
                        <div
                            class="notification-item ${notification.unread ? "unread" : ""}"
                            data-notification-id="${escapeHTML(notification.id)}">

                            <div class="notification-symbol ${extraClass}">
                                ${symbol}
                            </div>

                            <div>
                                <strong>
                                    ${escapeHTML(notification.title)}
                                </strong>

                                <p>
                                    ${escapeHTML(notification.message)}
                                </p>

                                <small>
                                    ${escapeHTML(notification.time || "Recently")}
                                </small>
                            </div>

                        </div>
                    `;

                }).join("")
                : `
                    <div class="empty-dashboard-message">
                        No notifications.
                    </div>
                `;
    }


    renderNotifications();


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                if (!notificationPanel) return;

                notificationPanel.classList.toggle(
                    "show"
                );

            }
        );
    }


    document.addEventListener(
        "click",
        event => {

            if (!notificationPanel) return;

            const wrapper =
                document.querySelector(
                    ".notification-wrapper"
                );

            if (
                wrapper &&
                !wrapper.contains(event.target)
            ) {
                notificationPanel.classList.remove(
                    "show"
                );
            }

        }
    );


    if (markNotificationsRead) {

        markNotificationsRead.addEventListener(
            "click",
            () => {

                const notifications =
                    getNotifications();

                notifications.forEach(
                    item => {
                        item.unread = false;
                    }
                );

                writeJSON(
                    STORAGE.notifications,
                    notifications
                );

                renderNotifications();

                showToast(
                    "Notifications marked as read."
                );

            }
        );
    }


    /* =====================================================
       SHOP MARTEY
    ===================================================== */

    const shopButtons = [
        document.getElementById("shopMarteyButton"),
        document.getElementById("topShopButton")
    ].filter(Boolean);


    shopButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                window.location.href =
                    "index.html";

            }
        );

    });


    /* =====================================================
       ADD PRODUCT
    ===================================================== */

    function goToAddProduct() {

        window.location.href =
            "add-product.html";

    }


    [
        "addProductButton",
        "productsAddButton",
        "emptyAddProductButton"
    ]
        .map(id => document.getElementById(id))
        .filter(Boolean)
        .forEach(button => {

            button.addEventListener(
                "click",
                goToAddProduct
            );

        });


    /* =====================================================
       PRODUCT HELPERS
    ===================================================== */

    function normalizeProductStatus(product) {

        const raw =
            String(product.status || "")
                .toLowerCase()
                .trim();

        const stock =
            Number(product.stock || 0);


        if (
            raw === "draft" ||
            raw === "saved"
        ) {
            return "draft";
        }


        if (
            raw === "published" ||
            raw === "active"
        ) {

            if (stock <= 0) {
                return "out-of-stock";
            }

            return "active";
        }


        if (stock <= 0) {
            return "out-of-stock";
        }


        return "active";
    }


    function getProductImage(product) {

        if (!product) return "";


        if (product.imageData) {
            return product.imageData;
        }


        if (product.image) {
            return product.image;
        }


        if (product.images) {

            if (Array.isArray(product.images)) {

                const first =
                    product.images[0];

                if (
                    typeof first === "string" &&
                    first.startsWith("data:")
                ) {
                    return first;
                }

                if (
                    first &&
                    typeof first === "object" &&
                    first.data
                ) {
                    return first.data;
                }
            }
        }


        if (
            product.imageUrls &&
            Array.isArray(product.imageUrls) &&
            product.imageUrls.length
        ) {

            return product.imageUrls[0];

        }


        if (
            product.imageDataUrls &&
            Array.isArray(product.imageDataUrls) &&
            product.imageDataUrls.length
        ) {

            return product.imageDataUrls[0];

        }


        return "";
    }


    function getProductImageHTML(product) {

        const image =
            getProductImage(product);

        if (image) {

            return `
                <img
                    src="${escapeAttribute(image)}"
                    alt="${escapeAttribute(product.name || "Product")}"
                    class="row-product-image">
            `;

        }

        return `
            <div class="product-image-placeholder">
                IMG
            </div>
        `;
    }


    function getProductPrice(product) {

        const price =
            Number(product.price || 0);

        const sellingPrice =
            product.sellingPrice !== undefined
                ? Number(product.sellingPrice)
                : price;

        return sellingPrice;
    }


    function getProductOldPrice(product) {

        const price =
            Number(product.price || 0);

        const sellingPrice =
            getProductPrice(product);

        return price > sellingPrice
            ? price
            : 0;
    }


    function getStatusLabel(status) {

        if (status === "out-of-stock") {
            return "Out of Stock";
        }

        if (status === "draft") {
            return "Draft";
        }

        return "Active";
    }


    function getStatusClass(status) {

        if (status === "out-of-stock") {
            return "out-of-stock";
        }

        if (status === "draft") {
            return "draft";
        }

        return "active";
    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    function escapeAttribute(value) {

        return escapeHTML(value);
    }


    /* =====================================================
       PRODUCTS
    ===================================================== */

    let currentProductFilter = "all";
    let currentProductSearch = "";


    function getFilteredProducts() {

        const products =
            getProducts();


        return products.filter(product => {

            const status =
                normalizeProductStatus(product);


            const matchesFilter =
                currentProductFilter === "all" ||
                status === currentProductFilter;


            const search =
                currentProductSearch
                    .toLowerCase()
                    .trim();


            const searchable =
                [
                    product.name,
                    product.category,
                    product.brand,
                    product.sku,
                    product.description
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


            const matchesSearch =
                !search ||
                searchable.includes(search);


            return matchesFilter && matchesSearch;

        });

    }


    function renderProducts() {

        const list =
            document.getElementById(
                "sellerProductsList"
            );

        const empty =
            document.getElementById(
                "productsEmptyState"
            );

        const count =
            document.getElementById(
                "productsListCount"
            );


        if (!list) return;


        const products =
            getFilteredProducts();


        if (count) {

            count.textContent =
                `${products.length} Product${products.length === 1 ? "" : "s"}`;

        }


        if (!products.length) {

            list.innerHTML = "";

            if (empty) {

                empty.style.display =
                    "block";

                const title =
                    empty.querySelector("h3");

                const paragraph =
                    empty.querySelector("p");


                if (currentProductFilter !== "all" ||
                    currentProductSearch) {

                    if (title) {
                        title.textContent =
                            "No matching products";
                    }

                    if (paragraph) {
                        paragraph.textContent =
                            "Try another search or filter.";
                    }

                } else {

                    if (title) {
                        title.textContent =
                            "No products yet";
                    }

                    if (paragraph) {
                        paragraph.textContent =
                            "Add your first product and start building your MARTEY store.";
                    }
                }
            }

            return;
        }


        if (empty) {
            empty.style.display = "none";
        }


        list.innerHTML =
            products.map(product => {

                const status =
                    normalizeProductStatus(product);

                const price =
                    getProductPrice(product);

                const oldPrice =
                    getProductOldPrice(product);

                const stock =
                    Number(product.stock || 0);


                return `
                    <div
                        class="seller-product-row"
                        data-product-id="${escapeAttribute(product.id)}">

                        <div class="product-main-info">

                            <div class="product-row-image">
                                ${getProductImageHTML(product)}
                            </div>

                            <div>

                                <strong class="product-row-name">
                                    ${escapeHTML(product.name || "Unnamed Product")}
                                </strong>

                                <span class="product-row-meta">
                                    ${escapeHTML(product.category || "Uncategorized")}
                                    ${product.sku ? ` • SKU: ${escapeHTML(product.sku)}` : ""}
                                </span>

                            </div>

                        </div>


                        <div class="product-row-price">

                            <strong>
                                ₹${formatMoney(price)}
                            </strong>

                            ${
                                oldPrice
                                    ? `<span>₹${formatMoney(oldPrice)}</span>`
                                    : ""
                            }

                        </div>


                        <div class="product-row-stock">

                            <strong>
                                ${stock}
                            </strong>

                            <span>
                                ${stock <= 0
                                    ? "Out of stock"
                                    : stock <= 5
                                        ? "Low stock"
                                        : "In stock"}
                            </span>

                        </div>


                        <div class="product-row-status">

                            <span class="status ${getStatusClass(status)}">
                                ${getStatusLabel(status)}
                            </span>

                        </div>


                        <div class="product-actions">

                            <button
                                type="button"
                                class="product-action-btn view-product-btn"
                                data-product-action="view"
                                data-product-id="${escapeAttribute(product.id)}">
                                View
                            </button>

                            <button
                                type="button"
                                class="product-action-btn edit-product-btn"
                                data-product-action="edit"
                                data-product-id="${escapeAttribute(product.id)}">
                                Edit
                            </button>

                            <button
                                type="button"
                                class="product-action-btn delete-product-btn"
                                data-product-action="delete"
                                data-product-id="${escapeAttribute(product.id)}">
                                Delete
                            </button>

                        </div>

                    </div>
                `;

            }).join("");
    }


    const productSearch =
        document.getElementById(
            "productListSearch"
        );


    if (productSearch) {

        productSearch.addEventListener(
            "input",
            () => {

                currentProductSearch =
                    productSearch.value;

                renderProducts();

            }
        );
    }


    document.querySelectorAll(
        "[data-product-filter]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document.querySelectorAll(
                    "[data-product-filter]"
                ).forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                button.classList.add("active");


                currentProductFilter =
                    button.dataset.productFilter;


                renderProducts();

            }
        );

    });


    /* =====================================================
       PRODUCT ACTIONS
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-product-action]"
                );

            if (!button) return;


            const action =
                button.dataset.productAction;

            const productId =
                button.dataset.productId;


            if (action === "view") {
                viewProduct(productId);
            }

            if (action === "edit") {
                editProduct(productId);
            }

            if (action === "delete") {
                deleteProduct(productId);
            }

        }
    );


    function findProduct(productId) {

        return getProducts().find(
            product =>
                String(product.id) === String(productId)
        );

    }


    function viewProduct(productId) {

        const product =
            findProduct(productId);

        if (!product) {

            showToast(
                "Product not found.",
                "error"
            );

            return;
        }


        const image =
            getProductImage(product);

        const price =
            getProductPrice(product);

        const status =
            normalizeProductStatus(product);


        openModal(`

            <div class="product-view-modal">

                <div class="modal-heading">

                    <span class="section-eyebrow">
                        PRODUCT
                    </span>

                    <h2>
                        ${escapeHTML(product.name || "Product")}
                    </h2>

                </div>


                <div class="product-view-layout">

                    <div class="product-view-image">

                        ${
                            image
                                ? `<img src="${escapeAttribute(image)}"
                                        alt="${escapeAttribute(product.name || "Product")}">`
                                : `<div class="product-image-placeholder large">IMG</div>`
                        }

                    </div>


                    <div class="product-view-details">

                        <p>
                            <strong>Category:</strong>
                            ${escapeHTML(product.category || "—")}
                        </p>

                        <p>
                            <strong>Brand:</strong>
                            ${escapeHTML(product.brand || "—")}
                        </p>

                        <p>
                            <strong>SKU:</strong>
                            ${escapeHTML(product.sku || "—")}
                        </p>

                        <p>
                            <strong>Price:</strong>
                            ₹${formatMoney(price)}
                        </p>

                        <p>
                            <strong>Stock:</strong>
                            ${Number(product.stock || 0)}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            ${getStatusLabel(status)}
                        </p>

                        <p>
                            <strong>Description:</strong><br>
                            ${escapeHTML(product.description || "No description added.")}
                        </p>

                    </div>

                </div>


                <div class="modal-actions">

                    <button
                        type="button"
                        class="primary-seller-btn"
                        data-modal-edit-product="${escapeAttribute(product.id)}">
                        Edit Product
                    </button>

                    <button
                        type="button"
                        class="secondary-seller-btn"
                        id="closeProductModalButton">
                        Close
                    </button>

                </div>

            </div>

        `);


        const editButton =
            sellerModalContent.querySelector(
                "[data-modal-edit-product]"
            );


        if (editButton) {

            editButton.addEventListener(
                "click",
                () => {

                    closeModal();

                    editProduct(productId);

                }
            );
        }


        const closeButton =
            document.getElementById(
                "closeProductModalButton"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeModal
            );

        }
    }


    function editProduct(productId) {

        const product =
            findProduct(productId);

        if (!product) {

            showToast(
                "Product not found.",
                "error"
            );

            return;
        }


        localStorage.setItem(
            "marteyEditingProduct",
            JSON.stringify(product)
        );


        window.location.href =
            `add-product.html?edit=${encodeURIComponent(productId)}`;

    }


    function deleteProduct(productId) {

        const product =
            findProduct(productId);

        if (!product) {

            showToast(
                "Product not found.",
                "error"
            );

            return;
        }


        const confirmed =
            window.confirm(
                `Delete "${product.name || "this product"}"?`
            );


        if (!confirmed) return;


        const updated =
            getProducts().filter(
                item =>
                    String(item.id) !== String(productId)
            );


        saveProducts(updated);


        renderProducts();
        renderInventory();
        renderStore();
        updateDashboard();


        showToast(
            "Product deleted successfully."
        );

    }


    /* =====================================================
       DASHBOARD
    ===================================================== */

    function updateDashboard() {

        const products =
            getProducts();

        const orders =
            getOrders();


        const activeProducts =
            products.filter(
                product =>
                    normalizeProductStatus(product) === "active"
            );


        const pendingOrders =
            orders.filter(order => {

                const status =
                    String(order.status || "")
                        .toLowerCase();

                return [
                    "new",
                    "pending",
                    "confirmed",
                    "packed"
                ].includes(status);

            });


        setText(
            "dashboardProductCount",
            activeProducts.length
        );


        setText(
            "dashboardOrderCount",
            orders.length
        );


        setText(
            "dashboardPendingOrders",
            pendingOrders.length
        );


        const todaySales =
            calculateTodaySales(orders);


        setText(
            "dashboardTodaySales",
            `₹${formatMoney(todaySales)}`
        );


        const lowStock =
            products.filter(product => {

                const status =
                    normalizeProductStatus(product);

                const stock =
                    Number(product.stock || 0);

                return (
                    status !== "draft" &&
                    stock > 0 &&
                    stock <= 5
                );

            });


        renderDashboardLowStock(lowStock);


        renderDashboardOrders(orders);


        setText(
            "dashboardProductViews",
            getActivityValue("views")
        );


        setText(
            "dashboardAddToCart",
            getActivityValue("cartAdds")
        );


        const views =
            Number(getActivityValue("views"));

        const orderCount =
            Number(orders.length);

        const conversion =
            views > 0
                ? ((orderCount / views) * 100)
                : 0;


        setText(
            "dashboardConversion",
            `${conversion.toFixed(1)}%`
        );


        const reviews =
            getReviews();

        const rating =
            calculateAverageRating(reviews);


        setText(
            "dashboardStoreRating",
            rating
                ? `★ ${rating.toFixed(1)}`
                : "—"
        );


        const returned =
            orders.filter(order => {

                const status =
                    String(order.status || "")
                        .toLowerCase();

                return status === "returned";

            }).length;


        const returnRate =
            orders.length
                ? ((returned / orders.length) * 100)
                : 0;


        setText(
            "dashboardReturnRate",
            `${returnRate.toFixed(1)}%`
        );
    }


    function renderDashboardOrders(orders) {

        const body =
            document.getElementById(
                "dashboardRecentOrders"
            );

        if (!body) return;


        const recent =
            orders.slice(-5).reverse();


        if (!recent.length) {

            body.innerHTML = `
                <tr>
                    <td colspan="4">
                        No orders yet
                    </td>
                </tr>
            `;

            return;
        }


        body.innerHTML =
            recent.map(order => {

                const product =
                    order.productName ||
                    order.product ||
                    "Product";

                const amount =
                    Number(
                        order.amount ||
                        order.total ||
                        order.price ||
                        0
                    );


                return `
                    <tr>

                        <td>
                            #${escapeHTML(
                                order.id ||
                                order.orderId ||
                                "—"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(product)}
                        </td>

                        <td>
                            ₹${formatMoney(amount)}
                        </td>

                        <td>
                            <span class="status ${getOrderStatusClass(order.status)}">
                                ${escapeHTML(
                                    getOrderStatusLabel(order.status)
                                )}
                            </span>
                        </td>

                    </tr>
                `;

            }).join("");
    }


    function renderDashboardLowStock(products) {

        const container =
            document.getElementById(
                "dashboardLowStockList"
            );

        if (!container) return;


        if (!products.length) {

            container.innerHTML = `
                <div class="empty-dashboard-message">
                    No low-stock products
                </div>
            `;

            return;
        }


        container.innerHTML =
            products.slice(0, 5).map(product => {

                return `
                    <div class="stock-item">

                        <div class="stock-product-image">
                            ${getProductImageHTML(product)}
                        </div>

                        <div class="stock-product-info">

                            <strong>
                                ${escapeHTML(
                                    product.name || "Product"
                                )}
                            </strong>

                            <span>
                                SKU:
                                ${escapeHTML(
                                    product.sku || "—"
                                )}
                            </span>

                        </div>

                        <span class="stock-number">
                            ${Number(product.stock || 0)} left
                        </span>

                    </div>
                `;

            }).join("");
    }


    /* =====================================================
       ORDERS
    ===================================================== */

    let orderSearch = "";
    let orderFilter = "all";


    function getOrderStatusLabel(status) {

        const value =
            String(status || "pending")
                .toLowerCase();

        const labels = {
            new: "New",
            pending: "Pending",
            confirmed: "Confirmed",
            packed: "Packed",
            shipped: "Shipped",
            delivered: "Delivered",
            cancelled: "Cancelled",
            returned: "Returned"
        };

        return labels[value] || "Pending";
    }


    function getOrderStatusClass(status) {

        const value =
            String(status || "pending")
                .toLowerCase();

        return value;
    }


    function renderOrders() {

        const body =
            document.getElementById(
                "sellerOrdersList"
            );

        if (!body) return;


        const orders =
            getOrders();


        const filtered =
            orders.filter(order => {

                const status =
                    String(order.status || "pending")
                        .toLowerCase();


                const matchesFilter =
                    orderFilter === "all" ||
                    status === orderFilter;


                const searchable =
                    [
                        order.id,
                        order.orderId,
                        order.productName,
                        order.product,
                        order.customerName,
                        order.customerEmail
                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();


                const matchesSearch =
                    !orderSearch ||
                    searchable.includes(
                        orderSearch.toLowerCase()
                    );


                return matchesFilter && matchesSearch;

            });


        updateOrderStats(orders);


        if (!filtered.length) {

            body.innerHTML = `
                <tr>
                    <td colspan="7">
                        No orders available.
                    </td>
                </tr>
            `;

            return;
        }


        body.innerHTML =
            filtered.map(order => {

                const amount =
                    Number(
                        order.amount ||
                        order.total ||
                        order.price ||
                        0
                    );


                const date =
                    formatDate(
                        order.date ||
                        order.createdAt
                    );


                return `
                    <tr>

                        <td>
                            #${escapeHTML(
                                order.id ||
                                order.orderId ||
                                "—"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                order.productName ||
                                order.product ||
                                "Product"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                order.customerName ||
                                "Customer"
                            )}
                        </td>

                        <td>
                            ₹${formatMoney(amount)}
                        </td>

                        <td>
                            ${escapeHTML(date)}
                        </td>

                        <td>
                            <span class="status ${getOrderStatusClass(order.status)}">
                                ${escapeHTML(
                                    getOrderStatusLabel(
                                        order.status
                                    )
                                )}
                            </span>
                        </td>

                        <td>

                            <button
                                type="button"
                                class="product-action-btn"
                                data-order-view="${escapeAttribute(
                                    order.id ||
                                    order.orderId ||
                                    ""
                                )}">
                                View
                            </button>

                        </td>

                    </tr>
                `;

            }).join("");
    }


    function updateOrderStats(orders) {

        setText(
            "ordersTotalCount",
            orders.length
        );


        setText(
            "ordersPendingCount",
            orders.filter(order =>
                [
                    "new",
                    "pending",
                    "confirmed",
                    "packed"
                ].includes(
                    String(order.status || "pending")
                        .toLowerCase()
                )
            ).length
        );


        setText(
            "ordersShippedCount",
            orders.filter(order =>
                String(order.status || "")
                    .toLowerCase() === "shipped"
            ).length
        );


        setText(
            "ordersDeliveredCount",
            orders.filter(order =>
                String(order.status || "")
                    .toLowerCase() === "delivered"
            ).length
        );

    }


    const ordersSearch =
        document.getElementById(
            "ordersSearch"
        );


    if (ordersSearch) {

        ordersSearch.addEventListener(
            "input",
            () => {

                orderSearch =
                    ordersSearch.value;

                renderOrders();

            }
        );
    }


    const orderStatusFilter =
        document.getElementById(
            "orderStatusFilter"
        );


    if (orderStatusFilter) {

        orderStatusFilter.addEventListener(
            "change",
            () => {

                orderFilter =
                    orderStatusFilter.value;

                renderOrders();

            }
        );
    }


    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-order-view]"
                );

            if (!button) return;


            const orderId =
                button.dataset.orderView;


            const order =
                getOrders().find(item =>
                    String(
                        item.id ||
                        item.orderId
                    ) === String(orderId)
                );


            if (!order) {

                showToast(
                    "Order not found.",
                    "error"
                );

                return;
            }


            openModal(`

                <div class="modal-heading">

                    <span class="section-eyebrow">
                        ORDER DETAILS
                    </span>

                    <h2>
                        #${escapeHTML(
                            order.id ||
                            order.orderId ||
                            "Order"
                        )}
                    </h2>

                </div>


                <div class="seller-modal-info">

                    <p>
                        <strong>Product:</strong>
                        ${escapeHTML(
                            order.productName ||
                            order.product ||
                            "—"
                        )}
                    </p>

                    <p>
                        <strong>Customer:</strong>
                        ${escapeHTML(
                            order.customerName ||
                            "—"
                        )}
                    </p>

                    <p>
                        <strong>Amount:</strong>
                        ₹${formatMoney(
                            Number(
                                order.amount ||
                                order.total ||
                                0
                            )
                        )}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${escapeHTML(
                            getOrderStatusLabel(
                                order.status
                            )
                        )}
                    </p>

                </div>

            `);

        }
    );


    /* =====================================================
       INVENTORY
    ===================================================== */

    let inventorySearch = "";
    let inventoryFilter = "all";


    function getInventoryStatus(stock) {

        stock = Number(stock || 0);

        if (stock <= 0) {
            return "out-of-stock";
        }

        if (stock <= 5) {
            return "low-stock";
        }

        return "in-stock";
    }


    function renderInventory() {

        const container =
            document.getElementById(
                "sellerInventoryList"
            );

        if (!container) return;


        const products =
            getProducts()
                .filter(
                    product =>
                        normalizeProductStatus(product) !== "draft"
                )
                .filter(product => {

                    const stock =
                        Number(product.stock || 0);

                    const status =
                        getInventoryStatus(stock);


                    const matchesFilter =
                        inventoryFilter === "all" ||
                        status === inventoryFilter;


                    const searchable =
                        [
                            product.name,
                            product.sku,
                            product.category
                        ]
                            .filter(Boolean)
                            .join(" ")
                            .toLowerCase();


                    const matchesSearch =
                        !inventorySearch ||
                        searchable.includes(
                            inventorySearch.toLowerCase()
                        );


                    return (
                        matchesFilter &&
                        matchesSearch
                    );

                });


        updateInventoryStats(
            getProducts()
        );


        if (!products.length) {

            container.innerHTML = `
                <div class="empty-dashboard-message">
                    No inventory products found.
                </div>
            `;

            return;
        }


        container.innerHTML =
            products.map(product => {

                const stock =
                    Number(product.stock || 0);

                const status =
                    getInventoryStatus(stock);


                return `
                    <div
                        class="seller-product-row inventory-row"
                        data-inventory-id="${escapeAttribute(product.id)}">

                        <div class="product-main-info">

                            <div class="product-row-image">
                                ${getProductImageHTML(product)}
                            </div>

                            <div>

                                <strong class="product-row-name">
                                    ${escapeHTML(
                                        product.name ||
                                        "Product"
                                    )}
                                </strong>

                                <span class="product-row-meta">
                                    SKU:
                                    ${escapeHTML(
                                        product.sku || "—"
                                    )}
                                </span>

                            </div>

                        </div>


                        <div class="product-row-stock">

                            <strong>
                                ${stock}
                            </strong>

                            <span>
                                ${status === "out-of-stock"
                                    ? "Out of stock"
                                    : status === "low-stock"
                                        ? "Low stock"
                                        : "In stock"}
                            </span>

                        </div>


                        <div class="product-row-status">

                            <span class="status ${status}">
                                ${status === "out-of-stock"
                                    ? "Out of Stock"
                                    : status === "low-stock"
                                        ? "Low Stock"
                                        : "In Stock"}
                            </span>

                        </div>


                        <div class="product-actions">

                            <button
                                type="button"
                                class="product-action-btn"
                                data-inventory-edit="${escapeAttribute(product.id)}">
                                Update Stock
                            </button>

                        </div>

                    </div>
                `;

            }).join("");
    }


    function updateInventoryStats(products) {

        const normalProducts =
            products.filter(
                product =>
                    normalizeProductStatus(product) !== "draft"
            );


        const inStock =
            normalProducts.filter(
                product =>
                    getInventoryStatus(product.stock) ===
                    "in-stock"
            ).length;


        const lowStock =
            normalProducts.filter(
                product =>
                    getInventoryStatus(product.stock) ===
                    "low-stock"
            ).length;


        const outOfStock =
            normalProducts.filter(
                product =>
                    getInventoryStatus(product.stock) ===
                    "out-of-stock"
            ).length;


        setText(
            "inventoryTotalProducts",
            normalProducts.length
        );

        setText(
            "inventoryInStock",
            inStock
        );

        setText(
            "inventoryLowStock",
            lowStock
        );

        setText(
            "inventoryOutOfStock",
            outOfStock
        );
    }


    const inventorySearch =
        document.getElementById(
            "inventorySearch"
        );


    if (inventorySearch) {

        inventorySearch.addEventListener(
            "input",
            () => {

                inventorySearch =
                    inventorySearch.value;

                renderInventory();

            }
        );
    }


    const inventoryStatusFilter =
        document.getElementById(
            "inventoryStatusFilter"
        );


    if (inventoryStatusFilter) {

        inventoryStatusFilter.addEventListener(
            "change",
            () => {

                inventoryFilter =
                    inventoryStatusFilter.value;

                renderInventory();

            }
        );
    }


    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-inventory-edit]"
                );

            if (!button) return;


            const product =
                findProduct(
                    button.dataset.inventoryEdit
                );


            if (!product) return;


            openModal(`

                <div class="modal-heading">

                    <span class="section-eyebrow">
                        INVENTORY
                    </span>

                    <h2>
                        Update Stock
                    </h2>

                </div>

                <p>
                    ${escapeHTML(
                        product.name ||
                        "Product"
                    )}
                </p>

                <div class="stock-update-form">

                    <label>
                        Stock Quantity

                        <input
                            type="number"
                            id="modalStockInput"
                            min="0"
                            value="${Number(
                                product.stock || 0
                            )}">
                    </label>

                    <button
                        type="button"
                        class="primary-seller-btn"
                        id="saveModalStockButton">
                        Save Stock
                    </button>

                </div>

            `);


            const saveButton =
                document.getElementById(
                    "saveModalStockButton"
                );


            if (saveButton) {

                saveButton.addEventListener(
                    "click",
                    () => {

                        const input =
                            document.getElementById(
                                "modalStockInput"
                            );


                        const stock =
                            Math.max(
                                0,
                                Number(
                                    input.value || 0
                                )
                            );


                        const products =
                            getProducts();


                        const index =
                            products.findIndex(
                                item =>
                                    String(item.id) ===
                                    String(product.id)
                            );


                        if (index === -1) return;


                        products[index].stock =
                            stock;


                        if (
                            normalizeProductStatus(
                                products[index]
                            ) !== "draft"
                        ) {

                            products[index].status =
                                stock <= 0
                                    ? "active"
                                    : "published";
                        }


                        saveProducts(products);


                        closeModal();

                        renderInventory();
                        renderProducts();
                        updateDashboard();

                        showToast(
                            "Stock updated successfully."
                        );

                    }
                );

            }

        }
    );


    /* =====================================================
       EARNINGS
    ===================================================== */

    function calculateOrderSales(orders) {

        return orders.reduce(
            (total, order) => {

                const status =
                    String(order.status || "")
                        .toLowerCase();


                if (
                    status === "cancelled" ||
                    status === "returned"
                ) {
                    return total;
                }


                return total +
                    Number(
                        order.amount ||
                        order.total ||
                        order.price ||
                        0
                    );

            },
            0
        );
    }


    function calculateTodaySales(orders) {

        const today =
            new Date().toDateString();


        return orders.reduce(
            (total, order) => {

                const date =
                    order.date ||
                    order.createdAt;


                if (!date) return total;


                const orderDate =
                    new Date(date);


                if (
                    orderDate.toDateString() !==
                    today
                ) {
                    return total;
                }


                const status =
                    String(order.status || "")
                        .toLowerCase();


                if (
                    status === "cancelled" ||
                    status === "returned"
                ) {
                    return total;
                }


                return total +
                    Number(
                        order.amount ||
                        order.total ||
                        order.price ||
                        0
                    );

            },
            0
        );
    }


    function renderEarnings() {

        const orders =
            getOrders();


        const sales =
            calculateOrderSales(orders);


        const commissionRate =
            0.10;


        const commission =
            sales *
            commissionRate;


        const refunds =
            orders.reduce(
                (total, order) => {

                    if (
                        String(
                            order.status || ""
                        ).toLowerCase() ===
                        "returned"
                    ) {

                        return total +
                            Number(
                                order.amount ||
                                order.total ||
                                0
                            );
                    }

                    return total;

                },
                0
            );


        const available =
            Math.max(
                0,
                sales -
                commission -
                refunds
            );


        setText(
            "earningsTotalSales",
            `₹${formatMoney(sales)}`
        );


        setText(
            "earningsCommission",
            `₹${formatMoney(commission)}`
        );


        setText(
            "earningsRefunds",
            `₹${formatMoney(refunds)}`
        );


        setText(
            "earningsAvailable",
            `₹${formatMoney(available)}`
        );


        setText(
            "availablePayoutAmount",
            `₹${formatMoney(available)}`
        );


        renderPayoutHistory();

    }


    function renderPayoutHistory() {

        const body =
            document.getElementById(
                "payoutHistoryList"
            );

        if (!body) return;


        const payouts =
            getPayouts();


        if (!payouts.length) {

            body.innerHTML = `
                <tr>
                    <td colspan="5">
                        No payout history yet.
                    </td>
                </tr>
            `;

            return;
        }


        body.innerHTML =
            payouts.map(payout => {

                return `
                    <tr>

                        <td>
                            #${escapeHTML(
                                payout.id || "—"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                formatDate(
                                    payout.date ||
                                    payout.createdAt
                                )
                            )}
                        </td>

                        <td>
                            ₹${formatMoney(
                                Number(
                                    payout.amount || 0
                                )
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                payout.type ||
                                "Payout"
                            )}
                        </td>

                        <td>
                            <span class="status delivered">
                                ${escapeHTML(
                                    payout.status ||
                                    "Processed"
                                )}
                            </span>
                        </td>

                    </tr>
                `;

            }).join("");
    }


    const requestPayoutButton =
        document.getElementById(
            "requestPayoutButton"
        );


    if (requestPayoutButton) {

        requestPayoutButton.addEventListener(
            "click",
            () => {

                const orders =
                    getOrders();


                const sales =
                    calculateOrderSales(
                        orders
                    );


                const available =
                    Math.max(
                        0,
                        sales -
                        sales * 0.10
                    );


                if (available <= 0) {

                    showToast(
                        "No payout balance available.",
                        "error"
                    );

                    return;
                }


                showToast(
                    "Payout request system is ready for backend integration."
                );

            }
        );
    }


    /* =====================================================
       ANALYTICS
    ===================================================== */

    function getActivity() {

        const activity =
            readJSON(
                STORAGE.activity,
                {}
            );


        return {
            views: Number(activity.views || 0),
            clicks: Number(activity.clicks || 0),
            cartAdds: Number(activity.cartAdds || 0),
            purchases: Number(activity.purchases || 0)
        };
    }


    function getActivityValue(key) {

        return getActivity()[key] || 0;

    }


    function renderAnalytics() {

        const activity =
            getActivity();


        setText(
            "analyticsViews",
            activity.views
        );


        setText(
            "analyticsClicks",
            activity.clicks
        );


        setText(
            "analyticsCartAdds",
            activity.cartAdds
        );


        const conversion =
            activity.views > 0
                ? (
                    activity.purchases /
                    activity.views
                ) * 100
                : 0;


        setText(
            "analyticsConversion",
            `${conversion.toFixed(1)}%`
        );


        renderAnalyticsProducts();

    }


    function renderAnalyticsProducts() {

        const container =
            document.getElementById(
                "analyticsTopProducts"
            );

        if (!container) return;


        const products =
            getProducts();


        if (!products.length) {

            container.innerHTML = `
                <div class="performance-item">

                    <span class="performance-label">
                        No product data
                    </span>

                    <strong class="performance-value">
                        —
                    </strong>

                </div>
            `;

            return;
        }


        container.innerHTML =
            products.slice(0, 5).map(product => {

                return `
                    <div class="performance-item">

                        <span class="performance-label">
                            ${escapeHTML(
                                product.name ||
                                "Product"
                            )}
                        </span>

                        <strong class="performance-value">
                            ${Number(
                                product.views || 0
                            )} views
                        </strong>

                    </div>
                `;

            }).join("");
    }


    /* =====================================================
       PROMOTIONS
    ===================================================== */

    function renderPromotions() {

        const promotions =
            getPromotions();


        const active =
            promotions.filter(
                promotion =>
                    String(
                        promotion.status || "active"
                    ).toLowerCase() ===
                    "active"
            );


        const flash =
            promotions.filter(
                promotion =>
                    String(
                        promotion.type || ""
                    ).toLowerCase() ===
                    "flash"
            );


        const promotedProducts =
            promotions.filter(
                promotion =>
                    String(
                        promotion.type || ""
                    ).toLowerCase() ===
                    "sponsored"
            );


        const expired =
            promotions.filter(
                promotion =>
                    String(
                        promotion.status || ""
                    ).toLowerCase() ===
                    "expired"
            );


        setText(
            "promotionsActiveCount",
            active.length
        );

        setText(
            "promotionsFlashCount",
            flash.length
        );

        setText(
            "promotionsProductsCount",
            promotedProducts.length
        );

        setText(
            "promotionsExpiredCount",
            expired.length
        );


        const container =
            document.getElementById(
                "sellerPromotionsList"
            );


        if (!container) return;


        if (!promotions.length) {

            container.innerHTML = `
                <div class="empty-dashboard-message">
                    No promotions created yet.
                </div>
            `;

            return;
        }


        container.innerHTML =
            promotions.map(promotion => {

                return `
                    <div class="seller-product-row">

                        <div class="product-main-info">

                            <div class="product-row-image">
                                %
                            </div>

                            <div>

                                <strong>
                                    ${escapeHTML(
                                        promotion.name ||
                                        "Promotion"
                                    )}
                                </strong>

                                <span class="product-row-meta">
                                    ${escapeHTML(
                                        promotion.type ||
                                        "Discount"
                                    )}
                                </span>

                            </div>

                        </div>


                        <div class="product-row-price">
                            ${promotion.discount
                                ? `${Number(
                                    promotion.discount
                                )}% OFF`
                                : "—"}
                        </div>


                        <div class="product-row-status">

                            <span class="status ${String(
                                promotion.status ||
                                "active"
                            ).toLowerCase()}">
                                ${escapeHTML(
                                    promotion.status ||
                                    "Active"
                                )}
                            </span>

                        </div>

                    </div>
                `;

            }).join("");
    }


    const createPromotionButton =
        document.getElementById(
            "createPromotionButton"
        );


    if (createPromotionButton) {

        createPromotionButton.addEventListener(
            "click",
            () => {

                openModal(`

                    <div class="modal-heading">

                        <span class="section-eyebrow">
                            GROWTH
                        </span>

                        <h2>
                            Create Promotion
                        </h2>

                    </div>


                    <div class="promotion-form">

                        <label>
                            Promotion Name

                            <input
                                type="text"
                                id="promotionName"
                                placeholder="e.g. Summer Sale">
                        </label>


                        <label>
                            Promotion Type

                            <select id="promotionType">

                                <option value="discount">
                                    Discount
                                </option>

                                <option value="flash">
                                    Flash Sale
                                </option>

                                <option value="sponsored">
                                    Sponsored Product
                                </option>

                            </select>

                        </label>


                        <label>
                            Discount %

                            <input
                                type="number"
                                id="promotionDiscount"
                                min="0"
                                max="100"
                                value="10">
                        </label>


                        <button
                            type="button"
                            class="primary-seller-btn"
                            id="savePromotionButton">
                            Create Promotion
                        </button>

                    </div>

                `);


                const saveButton =
                    document.getElementById(
                        "savePromotionButton"
                    );


                if (saveButton) {

                    saveButton.addEventListener(
                        "click",
                        () => {

                            const name =
                                document.getElementById(
                                    "promotionName"
                                )?.value.trim();


                            const type =
                                document.getElementById(
                                    "promotionType"
                                )?.value;


                            const discount =
                                Number(
                                    document.getElementById(
                                        "promotionDiscount"
                                    )?.value || 0
                                );


                            if (!name) {

                                showToast(
                                    "Enter a promotion name.",
                                    "error"
                                );

                                return;
                            }


                            const promotions =
                                getPromotions();


                            promotions.push({
                                id:
                                    "PROMO-" +
                                    Date.now(),

                                name,
                                type,
                                discount,
                                status: "active",

                                createdAt:
                                    new Date().toISOString()
                            });


                            writeJSON(
                                STORAGE.promotions,
                                promotions
                            );


                            closeModal();

                            renderPromotions();

                            showToast(
                                "Promotion created."
                            );

                        }
                    );
                }

            }
        );
    }


    /* =====================================================
       REVIEWS
    ===================================================== */

    function calculateAverageRating(reviews) {

        if (!reviews.length) {
            return 0;
        }


        const total =
            reviews.reduce(
                (sum, review) =>
                    sum +
                    Number(
                        review.rating || 0
                    ),
                0
            );


        return total / reviews.length;
    }


    function renderReviews() {

        const reviews =
            getReviews();


        const average =
            calculateAverageRating(
                reviews
            );


        const positive =
            reviews.filter(
                review =>
                    Number(
                        review.rating || 0
                    ) >= 4
            ).length;


        const pendingReplies =
            reviews.filter(
                review =>
                    !review.reply
            ).length;


        setText(
            "reviewsAverageRating",
            average
                ? average.toFixed(1)
                : "—"
        );


        setText(
            "reviewsTotalCount",
            reviews.length
        );


        setText(
            "reviewsPositiveCount",
            positive
        );


        setText(
            "reviewsPendingReplies",
            pendingReplies
        );


        const withImages =
            reviews.filter(
                review =>
                    Array.isArray(
                        review.images
                    ) &&
                    review.images.length
            ).length;


        setText(
            "reviewsWithImages",
            withImages
        );


        const replies =
            reviews.filter(
                review =>
                    review.reply
            ).length;


        setText(
            "reviewsRepliesSent",
            replies
        );


        renderRatingBreakdown(
            reviews
        );


        const container =
            document.getElementById(
                "sellerReviewsList"
            );


        if (!container) return;


        if (!reviews.length) {

            container.innerHTML = `
                <div class="empty-dashboard-message">
                    No customer reviews yet.
                </div>
            `;

            return;
        }


        container.innerHTML =
            reviews.map(review => {

                return `
                    <div class="review-item">

                        <div class="review-header">

                            <strong>
                                ${escapeHTML(
                                    review.customerName ||
                                    "Customer"
                                )}
                            </strong>

                            <span>
                                ${"★".repeat(
                                    Math.max(
                                        0,
                                        Math.min(
                                            5,
                                            Number(
                                                review.rating ||
                                                0
                                            )
                                        )
                                    )
                                )}
                            </span>

                        </div>

                        <p>
                            ${escapeHTML(
                                review.text ||
                                review.comment ||
                                ""
                            )}
                        </p>

                        ${
                            review.reply
                                ? `
                                    <div class="seller-review-reply">
                                        <strong>Your reply:</strong>
                                        ${escapeHTML(
                                            review.reply
                                        )}
                                    </div>
                                `
                                : `
                                    <button
                                        type="button"
                                        class="product-action-btn"
                                        data-review-reply="${escapeAttribute(
                                            review.id || ""
                                        )}">
                                        Reply
                                    </button>
                                `
                        }

                    </div>
                `;

            }).join("");
    }


    function renderRatingBreakdown(reviews) {

        const container =
            document.getElementById(
                "ratingBreakdown"
            );

        if (!container) return;


        const total =
            reviews.length;


        container
            .querySelectorAll(
                ".rating-row"
            )
            .forEach(row => {

                const rating =
                    Number(
                        row
                            .querySelector("span")
                            ?.textContent
                            ?.charAt(0)
                    );


                const count =
                    reviews.filter(
                        review =>
                            Number(
                                review.rating || 0
                            ) === rating
                    ).length;


                const percentage =
                    total
                        ? (count / total) * 100
                        : 0;


                const progress =
                    row.querySelector(
                        ".rating-progress span"
                    );


                const number =
                    row.querySelector(
                        "strong"
                    );


                if (progress) {
                    progress.style.width =
                        `${percentage}%`;
                }


                if (number) {
                    number.textContent =
                        count;
                }

            });
    }


    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-review-reply]"
                );

            if (!button) return;


            const reviewId =
                button.dataset.reviewReply;


            const reviews =
                getReviews();


            const review =
                reviews.find(
                    item =>
                        String(item.id) ===
                        String(reviewId)
                );


            if (!review) return;


            openModal(`

                <div class="modal-heading">

                    <span class="section-eyebrow">
                        REVIEW
                    </span>

                    <h2>
                        Reply to Customer
                    </h2>

                </div>


                <p>
                    ${escapeHTML(
                        review.text ||
                        review.comment ||
                        ""
                    )}
                </p>


                <textarea
                    id="reviewReplyInput"
                    rows="5"
                    placeholder="Write your reply..."></textarea>


                <button
                    type="button"
                    class="primary-seller-btn"
                    id="saveReviewReply">
                    Send Reply
                </button>

            `);


            const saveReply =
                document.getElementById(
                    "saveReviewReply"
                );


            if (saveReply) {

                saveReply.addEventListener(
                    "click",
                    () => {

                        const reply =
                            document.getElementById(
                                "reviewReplyInput"
                            )?.value.trim();


                        if (!reply) {

                            showToast(
                                "Write a reply first.",
                                "error"
                            );

                            return;
                        }


                        review.reply =
                            reply;


                        writeJSON(
                            STORAGE.reviews,
                            reviews
                        );


                        closeModal();

                        renderReviews();

                        showToast(
                            "Reply saved."
                        );

                    }
                );
            }

        }
    );


    /* =====================================================
       MY STORE
    ===================================================== */

    function renderStore() {

        const storeName =
            getStoreName();


        const description =
            currentSeller.storeDescription ||
            currentSeller.description ||
            "Your store description will appear here.";


        setText(
            "storePreviewName",
            storeName
        );


        setText(
            "storePreviewDescription",
            description
        );


        setText(
            "storeDetailName",
            storeName
        );


        setText(
            "storeDetailCategory",
            currentSeller.storeCategory ||
            "—"
        );


        const products =
            getProducts().filter(
                product =>
                    normalizeProductStatus(product) ===
                    "active"
            );


        setText(
            "storeDetailProducts",
            products.length
        );


        const reviews =
            getReviews();


        const average =
            calculateAverageRating(
                reviews
            );


        setText(
            "storeDetailRating",
            average
                ? `★ ${average.toFixed(1)}`
                : "—"
        );


        const logo =
            currentSeller.storeLogo ||
            currentSeller.profilePicture ||
            currentSeller.profileImage;


        const logoCircle =
            document.getElementById(
                "storeLogoCircle"
            );


        if (logoCircle) {

            if (logo) {

                logoCircle.innerHTML =
                    `<img src="${escapeAttribute(logo)}" alt="Store logo">`;

            } else {

                logoCircle.textContent =
                    getInitials(storeName);

            }
        }


        renderStoreProducts(
            products
        );

    }


    function renderStoreProducts(products) {

        const container =
            document.getElementById(
                "storeProductsPreview"
            );

        if (!container) return;


        if (!products.length) {

            container.innerHTML = `
                <div class="empty-dashboard-message">
                    Your published products will appear here.
                </div>
            `;

            return;
        }


        container.innerHTML =
            products.slice(0, 8)
                .map(product => {

                    return `
                        <div class="store-product-card">

                            <div class="store-product-image">
                                ${getProductImageHTML(product)}
                            </div>

                            <strong>
                                ${escapeHTML(
                                    product.name ||
                                    "Product"
                                )}
                            </strong>

                            <span>
                                ₹${formatMoney(
                                    getProductPrice(
                                        product
                                    )
                                )}
                            </span>

                        </div>
                    `;

                }).join("");
    }


    function openStoreSettings() {

        openModal(`

            <div class="modal-heading">

                <span class="section-eyebrow">
                    YOUR BRAND
                </span>

                <h2>
                    Store Settings
                </h2>

            </div>


            <div class="store-settings-form">

                <label>
                    Store Name

                    <input
                        type="text"
                        id="storeNameInput"
                        value="${escapeAttribute(
                            getStoreName()
                        )}">
                </label>


                <label>
                    Store Description

                    <textarea
                        id="storeDescriptionInput"
                        rows="4">${escapeHTML(
                            currentSeller.storeDescription ||
                            currentSeller.description ||
                            ""
                        )}</textarea>
                </label>


                <button
                    type="button"
                    class="primary-seller-btn"
                    id="saveStoreSettingsButton">
                    Save Store Settings
                </button>

            </div>

        `);


        const saveButton =
            document.getElementById(
                "saveStoreSettingsButton"
            );


        if (saveButton) {

            saveButton.addEventListener(
                "click",
                () => {

                    const name =
                        document.getElementById(
                            "storeNameInput"
                        )?.value.trim();


                    const description =
                        document.getElementById(
                            "storeDescriptionInput"
                        )?.value.trim();


                    if (!name) {

                        showToast(
                            "Store name is required.",
                            "error"
                        );

                        return;
                    }


                    currentSeller.storeName =
                        name;

                    currentSeller.storeDescription =
                        description;


                    updateCurrentSellerStorage();


                    closeModal();

                    renderStore();

                    showToast(
                        "Store settings saved."
                    );

                }
            );
        }
    }


    function updateCurrentSellerStorage() {

        writeJSON(
            STORAGE.currentUser,
            currentSeller
        );


        const accounts =
            readJSON(
                STORAGE.accounts,
                []
            );


        if (Array.isArray(accounts)) {

            const index =
                accounts.findIndex(
                    account =>
                        account.email ===
                        currentSeller.email
                );


            if (index !== -1) {

                accounts[index] = {
                    ...accounts[index],
                    ...currentSeller
                };

                writeJSON(
                    STORAGE.accounts,
                    accounts
                );
            }
        }
    }


    [
        "storeSettingsButton",
        "storeSettingsButton2"
    ]
        .map(id =>
            document.getElementById(id)
        )
        .filter(Boolean)
        .forEach(button => {

            button.addEventListener(
                "click",
                openStoreSettings
            );

        });


    const viewStoreButton =
        document.getElementById(
            "viewStoreButton"
        );


    if (viewStoreButton) {

        viewStoreButton.addEventListener(
            "click",
            () => {

                showToast(
                    "Public store page will be connected to the marketplace system."
                );

            }
        );
    }


    /* =====================================================
       SELLER HELP
    ===================================================== */

    const sellerHelpButton =
        document.getElementById(
            "sellerHelpButton"
        );


    if (sellerHelpButton) {

        sellerHelpButton.addEventListener(
            "click",
            () => {

                openModal(`

                    <div class="modal-heading">

                        <span class="section-eyebrow">
                            MARTEY SELLER
                        </span>

                        <h2>
                            Seller Help
                        </h2>

                    </div>

                    <div class="seller-modal-info">

                        <p>
                            Use Products to manage your catalog.
                        </p>

                        <p>
                            Use Inventory to monitor stock.
                        </p>

                        <p>
                            Use Orders to manage customer purchases.
                        </p>

                        <p>
                            Earnings, Analytics, Promotions and Reviews
                            will use the same seller data system.
                        </p>

                    </div>

                `);

            }
        );
    }


    /* =====================================================
       GLOBAL SEARCH
    ===================================================== */

    if (sellerSearch) {

        sellerSearch.addEventListener(
            "keydown",
            event => {

                if (event.key !== "Enter") {
                    return;
                }


                const query =
                    sellerSearch.value
                        .trim()
                        .toLowerCase();


                if (!query) return;


                const products =
                    getProducts();


                const product =
                    products.find(
                        item =>
                            [
                                item.name,
                                item.category,
                                item.brand,
                                item.sku
                            ]
                                .filter(Boolean)
                                .join(" ")
                                .toLowerCase()
                                .includes(query)
                    );


                if (product) {

                    showSection(
                        "products"
                    );


                    if (productSearch) {

                        productSearch.value =
                            sellerSearch.value;

                        currentProductSearch =
                            sellerSearch.value;

                        renderProducts();

                    }

                    return;
                }


                const orders =
                    getOrders();


                const order =
                    orders.find(
                        item =>
                            String(
                                item.id ||
                                item.orderId ||
                                ""
                            )
                                .toLowerCase()
                                .includes(query)
                    );


                if (order) {

                    showSection(
                        "orders"
                    );

                    if (ordersSearch) {

                        ordersSearch.value =
                            sellerSearch.value;

                        orderSearch =
                            sellerSearch.value;

                        renderOrders();

                    }

                    return;
                }


                showToast(
                    "No matching seller data found.",
                    "error"
                );

            }
        );
    }


    /* =====================================================
       UTILITY FUNCTIONS
    ===================================================== */

    function setText(id, value) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent = value;
        }

    }


    function formatMoney(value) {

        const number =
            Number(value || 0);


        return number.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }
        );
    }


    function formatDate(value) {

        if (!value) return "—";


        const date =
            new Date(value);


        if (Number.isNaN(date.getTime())) {
            return String(value);
        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    }


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    renderProducts();
    renderOrders();
    renderInventory();
    renderEarnings();
    renderAnalytics();
    renderPromotions();
    renderReviews();
    renderStore();
    updateDashboard();
    updateSellerProfileUI();


    /* =====================================================
       PUBLIC DEBUG HELPER
       Useful during development only.
    ===================================================== */

    window.MARTEY_SELLER = {
        getProducts,
        getOrders,
        renderProducts,
        renderOrders,
        renderInventory,
        renderEarnings,
        renderAnalytics,
        renderPromotions,
        renderReviews,
        renderStore,
        updateDashboard,
        showSection
    };

});
