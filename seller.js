/* =========================================================
   MARTEY SELLER CENTER
   Functional Navigation + Products + Sidebar +
   Notifications + Profile
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("MARTEY seller.js loaded successfully");

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const app = document.getElementById("sellerApp");
    const sidebar = document.getElementById("sellerSidebar");
    const mobileMenuButton = document.getElementById("mobileMenuButton");

    const navItems = document.querySelectorAll(".seller-nav-item");
    const sections = document.querySelectorAll(".seller-section");

    const addProductButton = document.getElementById("addProductButton");
    const emptyAddProductButton =
        document.getElementById("emptyAddProductButton");

    const notificationButton =
        document.getElementById("notificationButton");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const markNotificationsRead =
        document.getElementById("markNotificationsRead");

    const sellerProfileButton =
        document.getElementById("sellerProfileButton");

    const profileOverlay =
        document.getElementById("profileOverlay");

    const profileCloseButton =
        document.getElementById("profileCloseButton");

    const shopMarteyButton =
        document.getElementById("shopMarteyButton");

    const sellerHelpButton =
        document.getElementById("sellerHelpButton");

    const storeSettingsButton =
        document.getElementById("storeSettingsButton");

    const storeSettingsButton2 =
        document.getElementById("storeSettingsButton2");


    /* =====================================================
       SECTION NAVIGATION
    ===================================================== */

    function showSection(sectionName) {

        if (!sectionName) {
            sectionName = "dashboard";
        }

        console.log("Opening section:", sectionName);

        let found = false;

        sections.forEach(function (section) {

            const currentSection =
                section.getAttribute("data-page-section");

            if (currentSection === sectionName) {

                found = true;

                section.style.display = "block";
                section.classList.add("active");

            } else {

                section.style.display = "none";
                section.classList.remove("active");

            }

        });


        navItems.forEach(function (button) {

            const buttonSection =
                button.getAttribute("data-section");

            if (buttonSection === sectionName) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }

        });


        if (!found) {

            console.warn(
                "Section not found:",
                sectionName
            );

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        if (window.innerWidth <= 900) {
            closeSidebar();
        }


        /* Refresh products whenever Products opens */
        if (sectionName === "products") {
            renderSellerProducts();
        }

    }


    /* =====================================================
       SIDEBAR
    ===================================================== */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("sidebar-closed");

        if (app) {
            app.classList.remove("sidebar-hidden");
        }

        if (mobileMenuButton) {

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        localStorage.setItem(
            "marteySellerSidebar",
            "open"
        );

    }


    function closeSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("sidebar-closed");

        if (app) {
            app.classList.add("sidebar-hidden");
        }

        if (mobileMenuButton) {

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        localStorage.setItem(
            "marteySellerSidebar",
            "closed"
        );

    }


    function toggleSidebar() {

        if (!sidebar) return;

        const isClosed =
            sidebar.classList.contains("sidebar-closed");

        if (isClosed) {
            openSidebar();
        } else {
            closeSidebar();
        }

    }


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                toggleSidebar();

            }
        );

    }


    /* =====================================================
       SIDEBAR NAVIGATION
    ===================================================== */

    navItems.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const section =
                    button.getAttribute("data-section");

                if (section) {
                    showSection(section);
                }

            }
        );

    });


    /* =====================================================
       OTHER OPEN SECTION BUTTONS
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-open-section]"
                );

            if (!button) return;

            event.preventDefault();

            const section =
                button.getAttribute(
                    "data-open-section"
                );

            showSection(section);

        }
    );

/* =====================================================
   REQUEST PAYOUT
===================================================== */

const requestPayoutButton =
    document.getElementById("requestPayoutButton");

const availablePayoutAmount =
    document.getElementById("availablePayoutAmount");


function updateSellerPayoutAmount() {

    if (!availablePayoutAmount) {
        return;
    }

    const balance =
        Number(
            localStorage.getItem(
                "marteySellerAvailableBalance"
            ) || 0
        );

    availablePayoutAmount.textContent =
        "₹" +
        balance.toLocaleString("en-IN");

}


if (requestPayoutButton) {

    requestPayoutButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            window.location.href =
                "request-payout.html";

        }
    );

}


updateSellerPayoutAmount();
   
    /* =====================================================
       ADD PRODUCT
    ===================================================== */

    function openAddProduct() {

        window.location.href =
            "add-product.html";

    }


    if (addProductButton) {

        addProductButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openAddProduct();

            }
        );

    }


    if (emptyAddProductButton) {

        emptyAddProductButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openAddProduct();

            }
        );

    }


    /* =====================================================
       SELLER PRODUCTS
    ===================================================== */

    const sellerProductsList =
        document.getElementById("sellerProductsList");

    const productsListCount =
        document.getElementById("productsListCount");

    const productsEmptyState =
        document.getElementById("productsEmptyState");

    const productFilterButtons =
        document.querySelectorAll(
            "[data-product-filter]"
        );


    /* Get products saved by add-product.js */

    function getSellerProducts() {

        try {

            const products =
                JSON.parse(
                    localStorage.getItem(
                        "marteySellerProducts"
                    )
                );

            if (Array.isArray(products)) {
                return products;
            }

        } catch (error) {

            console.warn(
                "Could not read seller products",
                error
            );

        }

        return [];

    }


    /* Save products */

    function saveSellerProducts(products) {

        localStorage.setItem(
            "marteySellerProducts",
            JSON.stringify(products)
        );

    }


    /* Determine product status */

    function getProductStatus(product) {

        if (!product) {
            return "active";
        }


        /* Explicit status */

        if (
            product.status &&
            typeof product.status === "string"
        ) {

            const status =
                product.status
                    .toLowerCase()
                    .trim();

            if (
                status === "draft" ||
                status === "active" ||
                status === "published" ||
                status === "out-of-stock" ||
                status === "out_of_stock"
            ) {

                if (status === "published") {
                    return "active";
                }

                if (status === "out_of_stock") {
                    return "out-of-stock";
                }

                return status;

            }

        }


        /* Draft detection */

        if (
            product.isDraft === true ||
            product.draft === true
        ) {

            return "draft";

        }


        /* Stock detection */

        const stock =
            Number(
                product.stock ??
                product.quantity ??
                product.inventory ??
                0
            );

        if (stock <= 0) {
            return "out-of-stock";
        }


        return "active";

    }


    /* Format price */

    function formatPrice(value) {

        const number =
            Number(value || 0);

        return "₹" +
            number.toLocaleString("en-IN");

    }


    /* Escape HTML */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* Get product image */

    function getProductImage(product) {

        if (!product) {
            return "";
        }


        if (
            typeof product.image === "string" &&
            product.image
        ) {

            return product.image;

        }


        if (
            typeof product.imageUrl === "string" &&
            product.imageUrl
        ) {

            return product.imageUrl;

        }


        if (
            Array.isArray(product.images) &&
            product.images.length > 0
        ) {

            const firstImage =
                product.images[0];

            if (typeof firstImage === "string") {
                return firstImage;
            }

            if (
                firstImage &&
                firstImage.url
            ) {
                return firstImage.url;
            }

        }


        return "";

    }


    /* Product status badge */

    function getStatusBadge(status) {

        if (status === "draft") {

            return `
                <span class="product-status-badge draft">
                    Draft
                </span>
            `;

        }


        if (status === "out-of-stock") {

            return `
                <span class="product-status-badge out-of-stock">
                    Out of Stock
                </span>
            `;

        }


        return `
            <span class="product-status-badge active">
                Active
            </span>
        `;

    }


    /* Product card */

    function createProductCard(product, index) {

        const status =
            getProductStatus(product);

        const image =
            getProductImage(product);

        const name =
            product.name ||
            product.title ||
            "Unnamed Product";

        const category =
            product.category ||
            "General";

        const price =
            product.price ??
            product.sellingPrice ??
            0;

        const stock =
            product.stock ??
            product.quantity ??
            product.inventory ??
            0;


        const imageHTML = image
            ? `
                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(name)}"
                    class="seller-product-image"
                >
              `
            : `
                <div class="seller-product-image-placeholder">
                    <span>No Image</span>
                </div>
              `;


        return `
            <div
                class="seller-product-card"
                data-product-status="${status}"
                data-product-index="${index}"
            >

                <div class="seller-product-image-wrap">
                    ${imageHTML}
                </div>

                <div class="seller-product-info">

                    <div class="seller-product-top">

                        <div>
                            <span class="seller-product-category">
                                ${escapeHTML(category)}
                            </span>

                            <h3>
                                ${escapeHTML(name)}
                            </h3>
                        </div>

                        ${getStatusBadge(status)}

                    </div>

                    <div class="seller-product-bottom">

                        <div>
                            <strong class="seller-product-price">
                                ${formatPrice(price)}
                            </strong>

                            <span class="seller-product-stock">
                                Stock: ${escapeHTML(stock)}
                            </span>
                        </div>

                        <div class="seller-product-actions">

                            <button
                                type="button"
                                class="seller-product-action"
                                data-product-action="edit"
                                data-product-index="${index}"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                class="seller-product-action danger"
                                data-product-action="delete"
                                data-product-index="${index}"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        `;

    }


    /* Render products */

    function renderSellerProducts(
        selectedFilter = "all"
    ) {

        if (!sellerProductsList) {
            return;
        }


        const products =
            getSellerProducts();


        let filteredProducts =
            products;


        if (selectedFilter !== "all") {

            filteredProducts =
                products.filter(function (product) {

                    return (
                        getProductStatus(product) ===
                        selectedFilter
                    );

                });

        }


        /* Count */

        if (productsListCount) {

            if (selectedFilter === "all") {

                productsListCount.textContent =
                    `${products.length} product${products.length === 1 ? "" : "s"}`;

            } else {

                productsListCount.textContent =
                    `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"}`;

            }

        }


        /* Empty state */

        if (productsEmptyState) {

            productsEmptyState.style.display =
                filteredProducts.length === 0
                    ? "block"
                    : "none";

        }


        /* Clear list */

        sellerProductsList.innerHTML = "";


        if (filteredProducts.length === 0) {
            return;
        }


        /* Create cards */

        filteredProducts.forEach(
            function (product, index) {

                sellerProductsList.insertAdjacentHTML(
                    "beforeend",
                    createProductCard(
                        product,
                        index
                    )
                );

            }
        );

    }


    /* Product filters */

    productFilterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const filter =
                        button.getAttribute(
                            "data-product-filter"
                        ) || "all";


                    /* Active button */

                    productFilterButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );

                    button.classList.add(
                        "active"
                    );


                    renderSellerProducts(
                        filter
                    );

                }
            );

        }
    );


    /* Product actions */

    if (sellerProductsList) {

        sellerProductsList.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        "[data-product-action]"
                    );

                if (!button) return;


                const action =
                    button.getAttribute(
                        "data-product-action"
                    );

                const index =
                    Number(
                        button.getAttribute(
                            "data-product-index"
                        )
                    );


                const products =
                    getSellerProducts();


                if (
                    Number.isNaN(index) ||
                    !products[index]
                ) {

                    return;

                }


                /* DELETE */

                if (action === "delete") {

                    const productName =
                        products[index].name ||
                        products[index].title ||
                        "this product";


                    const confirmed =
                        confirm(
                            `Delete "${productName}"?`
                        );


                    if (!confirmed) {
                        return;
                    }


                    products.splice(
                        index,
                        1
                    );


                    saveSellerProducts(
                        products
                    );


                    renderSellerProducts(
                        getCurrentProductFilter()
                    );


                    return;

                }


                /* EDIT */

                if (action === "edit") {

                    const product =
                        products[index];


                    /*
                       For now send product data
                       to add-product page.
                    */

                    localStorage.setItem(
                        "marteyEditingProduct",
                        JSON.stringify(product)
                    );


                    window.location.href =
                        "add-product.html?edit=true";

                }

            }
        );

    }


    /* Current product filter */

    function getCurrentProductFilter() {

        const activeButton =
            document.querySelector(
                "[data-product-filter].active"
            );


        if (!activeButton) {
            return "all";
        }


        return (
            activeButton.getAttribute(
                "data-product-filter"
            ) || "all"
        );

    }


    /* Automatically refresh if another page saves product */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                "marteySellerProducts"
            ) {

                renderSellerProducts(
                    getCurrentProductFilter()
                );

            }

        }
    );


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    function openNotifications() {

        if (!notificationPanel) return;

        notificationPanel.classList.add("show");

        notificationPanel.style.display =
            "block";

        if (notificationButton) {

            notificationButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    }


    function closeNotifications() {

        if (!notificationPanel) return;

        notificationPanel.classList.remove(
            "show"
        );

        notificationPanel.style.display = "";

        if (notificationButton) {

            notificationButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    function toggleNotifications() {

        if (!notificationPanel) return;

        const isOpen =
            notificationPanel.classList.contains(
                "show"
            );

        if (isOpen) {
            closeNotifications();
        } else {
            openNotifications();
        }

    }


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                toggleNotifications();

            }
        );

    }


    if (markNotificationsRead) {

        markNotificationsRead.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const unread =
                    document.querySelectorAll(
                        ".notification-item.unread"
                    );


                unread.forEach(
                    function (item) {

                        item.classList.remove(
                            "unread"
                        );

                    }
                );


                const dot =
                    document.getElementById(
                        "notificationDot"
                    );


                if (dot) {
                    dot.style.display = "none";
                }


                const count =
                    document.getElementById(
                        "notificationCount"
                    );


                if (count) {

                    count.textContent =
                        "You're all caught up";

                }

            }
        );

    }


    /* =====================================================
       PROFILE
    ===================================================== */

    function openProfile() {

        if (!profileOverlay) return;

        profileOverlay.classList.add(
            "show"
        );

        profileOverlay.style.display =
            "flex";


        if (sellerProfileButton) {

            sellerProfileButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        loadSellerProfile();

    }


    function closeProfile() {

        if (!profileOverlay) return;

        profileOverlay.classList.remove(
            "show"
        );

        profileOverlay.style.display = "";


        if (sellerProfileButton) {

            sellerProfileButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    function toggleProfile() {

        if (!profileOverlay) return;

        const isOpen =
            profileOverlay.classList.contains(
                "show"
            );


        if (isOpen) {
            closeProfile();
        } else {
            openProfile();
        }

    }


    if (sellerProfileButton) {

        sellerProfileButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                toggleProfile();

            }
        );

    }


    if (profileCloseButton) {

        profileCloseButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeProfile();

            }
        );

    }


    if (profileOverlay) {

        profileOverlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    profileOverlay
                ) {

                    closeProfile();

                }

            }
        );

    }


    /* =====================================================
       LOAD SELLER PROFILE
    ===================================================== */

    function loadSellerProfile() {

        let currentUser = null;


        try {

            currentUser =
                JSON.parse(
                    localStorage.getItem(
                        "marteyCurrentUser"
                    )
                );

        } catch (error) {

            console.warn(
                "Could not read current seller"
            );

        }


        if (!currentUser) {

            try {

                const accounts =
                    JSON.parse(
                        localStorage.getItem(
                            "marteyAccounts"
                        )
                    ) || [];


                currentUser =
                    accounts.find(
                        function (account) {

                            return (
                                account.role ===
                                "seller"
                            );

                        }
                    ) || null;

            } catch (error) {

                console.warn(
                    "Could not read seller accounts"
                );

            }

        }


        if (!currentUser) {
            return;
        }


        const name =
            currentUser.name ||
            currentUser.fullName ||
            currentUser.storeName ||
            "Seller";


        const email =
            currentUser.email ||
            currentUser.phone ||
            "seller@martey.com";


        const nameElement =
            document.getElementById(
                "profileSellerName"
            );


        const emailElement =
            document.getElementById(
                "profileSellerEmail"
            );


        const avatarElement =
            document.getElementById(
                "profileLargeAvatar"
            );


        if (nameElement) {
            nameElement.textContent = name;
        }


        if (emailElement) {
            emailElement.textContent = email;
        }


        if (avatarElement) {

            const image =
                currentUser.profilePicture ||
                currentUser.profileImage ||
                currentUser.avatar ||
                null;


            if (image) {

                avatarElement.innerHTML =
                    `<img src="${image}" alt="Seller profile">`;

            } else {

                avatarElement.textContent =
                    name
                        .trim()
                        .charAt(0)
                        .toUpperCase() ||
                    "S";

            }

        }

    }


    /* =====================================================
       SHOP MARTEY
    ===================================================== */

    if (shopMarteyButton) {

        shopMarteyButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.location.href =
                    "index.html";

            }
        );

    }


    /* =====================================================
       SELLER HELP
    ===================================================== */

    if (sellerHelpButton) {

        sellerHelpButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.location.href =
                    "seller-help.html";

            }
        );

    }


    /* =====================================================
       STORE SETTINGS
    ===================================================== */

    function openStoreSettings() {

        alert(
            "Store Settings\n\n" +
            "Store settings system will be connected here."
        );

    }


    if (storeSettingsButton) {

        storeSettingsButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openStoreSettings();

            }
        );

    }


    if (storeSettingsButton2) {

        storeSettingsButton2.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openStoreSettings();

            }
        );

    }


    /* =====================================================
       PROFILE MENU
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


    const logoutButton =
        document.getElementById(
            "sellerLogoutButton"
        );


    if (accountSettings) {

        accountSettings.addEventListener(
            "click",
            function () {

                alert(
                    "Account & Profile\n\n" +
                    "Seller account settings will be connected here."
                );

            }
        );

    }


    if (businessSettings) {

        businessSettings.addEventListener(
            "click",
            function () {

                alert(
                    "Business Information\n\n" +
                    "Business information settings will be connected here."
                );

            }
        );

    }


    if (securitySettings) {

        securitySettings.addEventListener(
            "click",
            function () {

                alert(
                    "Login & Security\n\n" +
                    "Security settings will be connected here."
                );

            }
        );

    }


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {
                    return;
                }


                localStorage.removeItem(
                    "marteyCurrentUser"
                );


                localStorage.removeItem(
                    "marteyUser"
                );


                window.location.href =
                    "index.html";

            }
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const sellerSearch =
        document.getElementById(
            "sellerSearch"
        );


    if (sellerSearch) {

        sellerSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key !== "Enter") {
                    return;
                }


                const query =
                    sellerSearch.value
                        .trim()
                        .toLowerCase();


                if (!query) {
                    return;
                }


                let matchedSection =
                    "products";


                if (
                    query.includes("order")
                ) {

                    matchedSection =
                        "orders";

                }

                else if (
                    query.includes("stock") ||
                    query.includes("inventory")
                ) {

                    matchedSection =
                        "inventory";

                }

                else if (
                    query.includes("earning") ||
                    query.includes("money") ||
                    query.includes("payout")
                ) {

                    matchedSection =
                        "earnings";

                }

                else if (
                    query.includes("analytic")
                ) {

                    matchedSection =
                        "analytics";

                }

                else if (
                    query.includes("review") ||
                    query.includes("rating")
                ) {

                    matchedSection =
                        "reviews";

                }

                else if (
                    query.includes("promotion") ||
                    query.includes("discount")
                ) {

                    matchedSection =
                        "promotions";

                }

                else if (
                    query.includes("store")
                ) {

                    matchedSection =
                        "store";

                }


                showSection(
                    matchedSection
                );

            }
        );

    }


    /* =====================================================
       CLOSE POPUPS
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            /* Notification */

            if (
                notificationPanel &&
                notificationButton &&
                !notificationPanel.contains(
                    event.target
                ) &&
                !notificationButton.contains(
                    event.target
                )
            ) {

                closeNotifications();

            }


            /* Profile */

            if (
                profileOverlay &&
                profileOverlay.classList.contains(
                    "show"
                )
            ) {

                const panel =
                    profileOverlay.querySelector(
                        ".seller-profile-panel"
                    );


                if (
                    panel &&
                    !panel.contains(
                        event.target
                    ) &&
                    !sellerProfileButton?.contains(
                        event.target
                    )
                ) {

                    closeProfile();

                }

            }

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    sections.forEach(
        function (section) {

            section.style.display =
                "none";

        }
    );


    /* Dashboard */

    showSection(
        "dashboard"
    );


    /* Sidebar */

    const savedSidebar =
        localStorage.getItem(
            "marteySellerSidebar"
        );


    if (savedSidebar === "closed") {

        closeSidebar();

    } else {

        openSidebar();

    }


    /* Initial products */

    renderSellerProducts(
        "all"
    );


    /* Initial filter */

    const allFilter =
        document.querySelector(
            '[data-product-filter="all"]'
        );


    if (allFilter) {

        productFilterButtons.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        allFilter.classList.add(
            "active"
        );

    }


    /* Close popups */

    if (notificationPanel) {

        notificationPanel.classList.remove(
            "show"
        );

    }


    if (profileOverlay) {

        profileOverlay.classList.remove(
            "show"
        );

    }


    console.log(
        "MARTEY Seller Center initialized successfully"
    );

});

/* ================================
   PROMOTIONS
================================ */

const createPromotionButton = document.getElementById("createPromotionButton");

const sellerPromotionsList = document.getElementById("sellerPromotionsList");

const promotionsActiveCount = document.getElementById("promotionsActiveCount");
const promotionsFlashCount = document.getElementById("promotionsFlashCount");
const promotionsProductsCount = document.getElementById("promotionsProductsCount");
const promotionsExpiredCount = document.getElementById("promotionsExpiredCount");


/* Create Promotion button */

if (createPromotionButton) {
    createPromotionButton.addEventListener("click", function () {
        window.location.href = "create-promotion.html";
    });
}


/* Get saved promotions */

function getSellerPromotions() {
    try {
        return JSON.parse(
            localStorage.getItem("marteySellerPromotions") || "[]"
        );
    } catch (error) {
        return [];
    }
}


/* Format money */

function formatPromotionMoney(amount) {
    return "₹" + Number(amount || 0).toLocaleString("en-IN");
}


/* Render Promotions */

function renderSellerPromotions() {

    if (!sellerPromotionsList) return;

    const promotions = getSellerPromotions();

    const activePromotions = promotions.filter(function (promotion) {
        return promotion.status === "Active";
    });

    const expiredPromotions = promotions.filter(function (promotion) {
        return promotion.status === "Expired";
    });


    /* Numbers */

    if (promotionsActiveCount) {
        promotionsActiveCount.textContent = activePromotions.length;
    }

    if (promotionsFlashCount) {
        promotionsFlashCount.textContent = 0;
    }

    if (promotionsProductsCount) {
        const uniqueProducts = new Set(
            promotions.map(function (promotion) {
                return promotion.productId || promotion.productName;
            })
        );

        promotionsProductsCount.textContent = uniqueProducts.size;
    }

    if (promotionsExpiredCount) {
        promotionsExpiredCount.textContent = expiredPromotions.length;
    }


    /* No promotions */

    if (promotions.length === 0) {

        sellerPromotionsList.innerHTML = `
            <div class="seller-empty-state">
                <h3>No promotions yet</h3>
                <p>
                    Create a promotion to increase your product visibility
                    across MARTEY.
                </p>
                <button
                    type="button"
                    class="primary-seller-btn"
                    id="emptyCreatePromotionButton"
                >
                    Create Promotion
                </button>
            </div>
        `;

        const emptyButton = document.getElementById(
            "emptyCreatePromotionButton"
        );

        if (emptyButton) {
            emptyButton.addEventListener("click", function () {
                window.location.href = "create-promotion.html";
            });
        }

        return;
    }


    /* Promotion cards */

    sellerPromotionsList.innerHTML = promotions
        .map(function (promotion) {

            const image =
                promotion.productImage ||
                "images/product-placeholder.jpg";

            const status =
                promotion.status || "Active";

            const statusClass =
                status.toLowerCase().replace(/\s+/g, "-");

            return `
                <div class="seller-promotion-item">

                    <div class="seller-promotion-image">
                        <img
                            src="${image}"
                            alt=""
                            onerror="this.style.display='none'"
                        >
                    </div>

                    <div class="seller-promotion-info">

                        <div class="seller-promotion-title-row">

                            <h3>
                                ${escapeHTML(
                                    promotion.productName || "Product"
                                )}
                            </h3>

                            <span class="promotion-status ${statusClass}">
                                ${escapeHTML(status)}
                            </span>

                        </div>

                        <div class="seller-promotion-meta">

                            <span>
                                ${promotion.durationDays} day${promotion.durationDays == 1 ? "" : "s"}
                            </span>

                            <span>•</span>

                            <span>
                                ${formatPromotionMoney(
                                    promotion.dailyBudget
                                )}/day
                            </span>

                            <span>•</span>

                            <span>
                                Total ${formatPromotionMoney(
                                    promotion.totalBudget
                                )}
                            </span>

                        </div>

                        <div class="seller-promotion-date">
                            Starts ${escapeHTML(
                                promotion.startDate || "—"
                            )}
                        </div>

                    </div>

                </div>
            `;
        })
        .join("");
}


/* Refresh when another page changes promotions */

window.addEventListener("storage", function (event) {

    if (event.key === "marteySellerPromotions") {
        renderSellerPromotions();
    }

});


/* Initial load */

renderSellerPromotions();
