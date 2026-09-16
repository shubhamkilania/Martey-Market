document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       MARTEY SELLER DASHBOARD
       Products System + Sidebar + Notifications + Profile
       ========================================================= */

    const app = document.querySelector(".seller-app");
    const sidebar = document.querySelector(".seller-sidebar");
    const mobileMenuButton = document.getElementById("mobileMenuButton");

    const navItems = document.querySelectorAll(".seller-nav-item");
    const sections = document.querySelectorAll(".seller-section");
    const pageTitle = document.getElementById("pageTitle");

    const shopButtons = [
        document.getElementById("shopMarteyButton"),
        document.getElementById("topShopButton")
    ].filter(Boolean);

    const profileButton = document.getElementById("sellerProfileButton");
    const notificationButton = document.getElementById("notificationButton");

    const addProductButton = document.getElementById("addProductButton");
    const productsAddButton = document.getElementById("productsAddButton");

    const helpButton = document.getElementById("sellerHelpButton");
    const searchInput = document.getElementById("sellerSearch");

    /* =========================================================
       SECTION TITLES
       ========================================================= */

    const sectionTitles = {
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

    /* =========================================================
       SIDEBAR
       ========================================================= */

    function openSidebar() {
        if (!sidebar || !app) return;

        sidebar.classList.remove("sidebar-closed");
        app.classList.remove("sidebar-hidden");

        localStorage.setItem("marteySellerSidebar", "open");
    }

    function closeSidebar() {
        if (!sidebar || !app) return;

        sidebar.classList.add("sidebar-closed");
        app.classList.add("sidebar-hidden");

        localStorage.setItem("marteySellerSidebar", "closed");
    }

    function toggleSidebar() {
        if (!sidebar || !app) return;

        const isClosed = sidebar.classList.contains("sidebar-closed");

        if (isClosed) {
            openSidebar();
        } else {
            closeSidebar();
        }
    }

    /*
       IMPORTANT:
       Sidebar starts CLOSED so the 3-dot button opens it.
    */

    const savedSidebarState = localStorage.getItem("marteySellerSidebar");

    if (savedSidebarState === "open") {
        openSidebar();
    } else {
        closeSidebar();
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleSidebar();
        });
    }

    /* =========================================================
       SECTION NAVIGATION
       ========================================================= */

    function showSection(sectionName) {
        sections.forEach(section => {
            section.classList.remove("active");
        });

        const selectedSection = document.querySelector(
            `[data-page-section="${sectionName}"]`
        );

        if (selectedSection) {
            selectedSection.classList.add("active");
        }

        navItems.forEach(item => {
            item.classList.toggle(
                "active",
                item.dataset.section === sectionName
            );
        });

        if (pageTitle) {
            pageTitle.textContent =
                sectionTitles[sectionName] || "Dashboard";
        }

        /*
           Keep sidebar open after selecting a section.
        */
        openSidebar();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        /*
           Products section refresh
        */
        if (sectionName === "products") {
            renderProducts();
        }
    }

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const sectionName = item.dataset.section;

            if (!sectionName) return;

            showSection(sectionName);
        });
    });

    /* =========================================================
       QUICK LINKS
       ========================================================= */

    const quickLinks = document.querySelectorAll("[data-open-section]");

    quickLinks.forEach(button => {
        button.addEventListener("click", () => {
            const sectionName = button.dataset.openSection;

            if (!sectionName) return;

            showSection(sectionName);
        });
    });

    /* =========================================================
       SHOP MARTEY
       ========================================================= */

    shopButtons.forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    });

    /* =========================================================
       ADD PRODUCT
       ========================================================= */

    function openAddProductPage() {
        window.location.href = "add-product.html";
    }

    if (addProductButton) {
        addProductButton.addEventListener("click", openAddProductPage);
    }

    if (productsAddButton) {
        productsAddButton.addEventListener("click", openAddProductPage);
    }

    /* =========================================================
       NOTIFICATION SYSTEM
       ========================================================= */

    const notificationPanel =
        document.getElementById("notificationPanel");

    if (notificationButton && notificationPanel) {
        notificationButton.addEventListener("click", (event) => {
            event.stopPropagation();

            notificationPanel.classList.toggle("show");
        });
    }

    document.addEventListener("click", event => {
        if (!notificationPanel) return;

        const clickedNotification =
            notificationButton &&
            notificationButton.contains(event.target);

        if (!clickedNotification &&
            !notificationPanel.contains(event.target)) {
            notificationPanel.classList.remove("show");
        }
    });

    const markNotificationsRead =
        document.getElementById("markNotificationsRead");

    if (markNotificationsRead) {
        markNotificationsRead.addEventListener("click", () => {
            const notificationDot =
                document.querySelector(".notification-dot");

            if (notificationDot) {
                notificationDot.style.display = "none";
            }
        });
    }

    /* =========================================================
       PROFILE
       ========================================================= */

    const profileOverlay =
        document.getElementById("profileOverlay");

    const profileCloseButton =
        document.getElementById("profileCloseButton");

    if (profileButton && profileOverlay) {
        profileButton.addEventListener("click", event => {
            event.stopPropagation();

            profileOverlay.classList.toggle("show");
        });
    }

    if (profileCloseButton && profileOverlay) {
        profileCloseButton.addEventListener("click", () => {
            profileOverlay.classList.remove("show");
        });
    }

    if (profileOverlay) {
        profileOverlay.addEventListener("click", event => {
            if (event.target === profileOverlay) {
                profileOverlay.classList.remove("show");
            }
        });
    }

    /* =========================================================
       SELLER PROFILE DATA
       ========================================================= */

    function loadSellerProfile() {
        let currentUser = null;

        try {
            currentUser = JSON.parse(
                localStorage.getItem("marteyCurrentUser")
            );
        } catch (error) {
            currentUser = null;
        }

        let accounts = [];

        try {
            accounts = JSON.parse(
                localStorage.getItem("marteyAccounts")
            ) || [];
        } catch (error) {
            accounts = [];
        }

        if (!currentUser) return;

        const sellerName =
            document.getElementById("sellerName");

        const sellerStoreName =
            document.getElementById("sellerStoreName");

        const sellerProfileName =
            document.getElementById("sellerProfileName");

        const sellerProfileStore =
            document.getElementById("sellerProfileStore");

        const sellerAvatar =
            document.getElementById("sellerAvatar");

        const profileAvatar =
            document.getElementById("profileAvatar");

        const account =
            accounts.find(
                item => item.email === currentUser.email
            ) || currentUser;

        const name =
            account.name ||
            account.fullName ||
            "Seller";

        const storeName =
            account.storeName ||
            "MARTEY Seller Store";

        if (sellerName) {
            sellerName.textContent = name;
        }

        if (sellerStoreName) {
            sellerStoreName.textContent = storeName;
        }

        if (sellerProfileName) {
            sellerProfileName.textContent = name;
        }

        if (sellerProfileStore) {
            sellerProfileStore.textContent = storeName;
        }

        if (account.profilePicture) {
            if (sellerAvatar) {
                sellerAvatar.src = account.profilePicture;
            }

            if (profileAvatar) {
                profileAvatar.src = account.profilePicture;
            }
        }
    }

    loadSellerProfile();

    /* =========================================================
       PRODUCTS STORAGE
       ========================================================= */

    function getProducts() {
        try {
            const products =
                JSON.parse(
                    localStorage.getItem("marteySellerProducts")
                );

            return Array.isArray(products)
                ? products
                : [];
        } catch (error) {
            console.error(
                "MARTEY: Could not read products.",
                error
            );

            return [];
        }
    }

    function saveProducts(products) {
        localStorage.setItem(
            "marteySellerProducts",
            JSON.stringify(products)
        );
    }

    /* =========================================================
       PRODUCT STATUS
       ========================================================= */

    function getProductStatus(product) {
        const status =
            String(product.status || "published").toLowerCase();

        if (Number(product.stock || 0) <= 0) {
            return "out";
        }

        if (
            status === "draft" ||
            status === "inactive"
        ) {
            return "draft";
        }

        return "active";
    }

    function getStatusLabel(product) {
        const status = getProductStatus(product);

        if (status === "out") {
            return "Out of Stock";
        }

        if (status === "draft") {
            return "Draft";
        }

        return "Active";
    }

    /* =========================================================
       STOCK STATUS
       ========================================================= */

    function getStockStatus(stock) {
        stock = Number(stock || 0);

        if (stock <= 0) {
            return {
                text: "Out of Stock",
                className: "stock-out"
            };
        }

        if (stock <= 5) {
            return {
                text: `Low Stock (${stock})`,
                className: "stock-low"
            };
        }

        return {
            text: `In Stock (${stock})`,
            className: "stock-good"
        };
    }

    /* =========================================================
       PRICE
       ========================================================= */

    function getSellingPrice(product) {
        if (product.sellingPrice !== undefined) {
            return Number(product.sellingPrice || 0);
        }

        const price = Number(product.price || 0);
        const discount = Number(product.discount || 0);

        return price - (price * discount / 100);
    }

    /* =========================================================
       PRODUCTS CONTAINER
       ========================================================= */

    function getProductsContainer() {
        return (
            document.getElementById("productsList") ||
            document.getElementById("sellerProductsList") ||
            document.querySelector(".products-list-panel")
        );
    }

    /* =========================================================
       PRODUCT RENDERING
       ========================================================= */

    function renderProducts() {
        const container = getProductsContainer();

        if (!container) return;

        const products = getProducts();

        const searchField =
            document.getElementById("productSearch");

        const filterField =
            document.getElementById("productFilter");

        const search =
            searchField
                ? searchField.value.trim().toLowerCase()
                : "";

        const filter =
            filterField
                ? filterField.value
                : "all";

        let filteredProducts = products.filter(product => {
            const name =
                String(product.name || "").toLowerCase();

            const category =
                String(product.category || "").toLowerCase();

            const sku =
                String(product.sku || "").toLowerCase();

            const matchesSearch =
                !search ||
                name.includes(search) ||
                category.includes(search) ||
                sku.includes(search);

            if (!matchesSearch) return false;

            const status = getProductStatus(product);

            if (filter === "active") {
                return status === "active";
            }

            if (filter === "draft") {
                return status === "draft";
            }

            if (filter === "out") {
                return status === "out";
            }

            return true;
        });

        /*
           If the container is the panel itself,
           create/use a dedicated list.
        */

        let list =
            document.getElementById("sellerProductsList");

        if (!list) {
            list = document.createElement("div");
            list.id = "sellerProductsList";
            list.className = "seller-products-rendered-list";

            container.appendChild(list);
        }

        if (filteredProducts.length === 0) {
            list.innerHTML = `
                <div class="products-empty-state">
                    <div class="empty-icon">📦</div>
                    <h3>No products found</h3>
                    <p>
                        ${
                            products.length === 0
                                ? "Add your first product to start selling on MARTEY."
                                : "Try another search or filter."
                        }
                    </p>

                    ${
                        products.length === 0
                            ? `
                                <button
                                    type="button"
                                    class="seller-primary-btn"
                                    id="emptyAddProductButton"
                                >
                                    + Add Product
                                </button>
                            `
                            : ""
                    }
                </div>
            `;

            const emptyAddButton =
                document.getElementById(
                    "emptyAddProductButton"
                );

            if (emptyAddButton) {
                emptyAddButton.addEventListener(
                    "click",
                    openAddProductPage
                );
            }

            updateProductCounters(products);

            return;
        }

        list.innerHTML = filteredProducts
            .map(product => createProductHTML(product))
            .join("");

        attachProductActions();

        updateProductCounters(products);
    }

    /* =========================================================
       PRODUCT CARD
       ========================================================= */

    function createProductHTML(product) {
        const status = getStatusLabel(product);
        const statusClass = getProductStatus(product);

        const stock =
            getStockStatus(product.stock);

        const price =
            getSellingPrice(product);

        const originalPrice =
            Number(product.price || 0);

        const discount =
            Number(product.discount || 0);

        const imageName =
            Array.isArray(product.imageNames) &&
            product.imageNames.length
                ? product.imageNames[0]
                : "";

        /*
           Add Product currently stores image names only.
           Actual image storage will be connected with backend later.
        */

        const imageHTML = `
            <div class="product-row-image">
                <div class="product-image-placeholder">
                    ${
                        imageName
                            ? "🖼️"
                            : "📦"
                    }
                </div>
            </div>
        `;

        return `
            <div
                class="seller-product-row"
                data-product-id="${escapeHTML(product.id)}"
            >

                ${imageHTML}

                <div class="product-main-info">

                    <div class="product-row-top">

                        <div class="product-row-title-wrap">

                            <h3>
                                ${escapeHTML(
                                    product.name ||
                                    "Unnamed Product"
                                )}
                            </h3>

                            <span class="product-status ${statusClass}">
                                ${status}
                            </span>

                        </div>

                    </div>

                    <div class="product-row-details">

                        <span>
                            Category:
                            <strong>
                                ${escapeHTML(
                                    product.category ||
                                    "—"
                                )}
                            </strong>
                        </span>

                        <span>
                            SKU:
                            <strong>
                                ${escapeHTML(
                                    product.sku ||
                                    "—"
                                )}
                            </strong>
                        </span>

                        <span>
                            Stock:
                            <strong class="${stock.className}">
                                ${escapeHTML(stock.text)}
                            </strong>
                        </span>

                    </div>

                    <div class="product-row-price">

                        <strong>
                            ₹${formatMoney(price)}
                        </strong>

                        ${
                            discount > 0 &&
                            originalPrice > price
                                ? `
                                    <span class="old-price">
                                        ₹${formatMoney(
                                            originalPrice
                                        )}
                                    </span>

                                    <span class="discount-badge">
                                        ${discount}% OFF
                                    </span>
                                `
                                : ""
                        }

                    </div>

                </div>

                <div class="product-actions">

                    <button
                        type="button"
                        class="product-action-btn view-product-btn"
                        data-id="${escapeHTML(product.id)}"
                    >
                        View
                    </button>

                    <button
                        type="button"
                        class="product-action-btn edit-product-btn"
                        data-id="${escapeHTML(product.id)}"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="product-action-btn delete-product-btn danger"
                        data-id="${escapeHTML(product.id)}"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;
    }

    /* =========================================================
       PRODUCT ACTIONS
       ========================================================= */

    function attachProductActions() {
        const viewButtons =
            document.querySelectorAll(
                ".view-product-btn"
            );

        const editButtons =
            document.querySelectorAll(
                ".edit-product-btn"
            );

        const deleteButtons =
            document.querySelectorAll(
                ".delete-product-btn"
            );

        viewButtons.forEach(button => {
            button.addEventListener("click", () => {
                const id = button.dataset.id;

                viewProduct(id);
            });
        });

        editButtons.forEach(button => {
            button.addEventListener("click", () => {
                const id = button.dataset.id;

                editProduct(id);
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener("click", () => {
                const id = button.dataset.id;

                deleteProduct(id);
            });
        });
    }

    /* =========================================================
       VIEW PRODUCT
       ========================================================= */

    function viewProduct(id) {
        const products = getProducts();

        const product =
            products.find(item => String(item.id) === String(id));

        if (!product) {
            alert("Product not found.");
            return;
        }

        alert(
            `Product Preview\n\n` +
            `Name: ${product.name || "—"}\n` +
            `Category: ${product.category || "—"}\n` +
            `Price: ₹${formatMoney(
                getSellingPrice(product)
            )}\n` +
            `Stock: ${product.stock || 0}\n` +
            `SKU: ${product.sku || "—"}`
        );
    }

    /* =========================================================
       EDIT PRODUCT
       ========================================================= */

    function editProduct(id) {
        const products = getProducts();

        const product =
            products.find(item => String(item.id) === String(id));

        if (!product) {
            alert("Product not found.");
            return;
        }

        /*
           Edit Product page will be connected
           in the next development step.
        */

        localStorage.setItem(
            "marteyEditingProduct",
            JSON.stringify(product)
        );

        window.location.href =
            `add-product.html?edit=${encodeURIComponent(id)}`;
    }

    /* =========================================================
       DELETE PRODUCT
       ========================================================= */

    function deleteProduct(id) {
        const products = getProducts();

        const product =
            products.find(item => String(item.id) === String(id));

        if (!product) return;

        const confirmed = confirm(
            `Delete "${product.name || "this product"}"?\n\n` +
            `This will remove it from your seller product list.`
        );

        if (!confirmed) return;

        const updatedProducts =
            products.filter(
                item => String(item.id) !== String(id)
            );

        saveProducts(updatedProducts);

        renderProducts();

        alert("Product deleted successfully.");
    }

    /* =========================================================
       PRODUCT SEARCH
       ========================================================= */

    const productSearch =
        document.getElementById("productSearch");

    if (productSearch) {
        productSearch.addEventListener(
            "input",
            renderProducts
        );
    }

    /* =========================================================
       PRODUCT FILTER
       ========================================================= */

    const productFilter =
        document.getElementById("productFilter");

    if (productFilter) {
        productFilter.addEventListener(
            "change",
            renderProducts
        );
    }

    /*
       Support individual filter buttons too.
       Example:
       data-product-filter="active"
    */

    const filterButtons =
        document.querySelectorAll(
            "[data-product-filter]"
        );

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const value =
                button.dataset.productFilter;

            if (productFilter) {
                productFilter.value = value;
            }

            renderProducts();
        });
    });

    /* =========================================================
       DASHBOARD PRODUCT COUNTERS
       ========================================================= */

    function updateProductCounters(products) {
        const total =
            products.length;

        const active =
            products.filter(
                product =>
                    getProductStatus(product) === "active"
            ).length;

        const outOfStock =
            products.filter(
                product =>
                    getProductStatus(product) === "out"
            ).length;

        const draft =
            products.filter(
                product =>
                    getProductStatus(product) === "draft"
            ).length;

        const productCountElements =
            document.querySelectorAll(
                "[data-product-count]"
            );

        productCountElements.forEach(element => {
            const type =
                element.dataset.productCount;

            if (type === "active") {
                element.textContent = active;
            } else if (type === "out") {
                element.textContent = outOfStock;
            } else if (type === "draft") {
                element.textContent = draft;
            } else {
                element.textContent = total;
            }
        });

        /*
           Common IDs for dashboard cards.
        */

        const possibleCounters = [
            ["productCount", total],
            ["productsCount", total],
            ["totalProducts", total],
            ["dashboardProductCount", total]
        ];

        possibleCounters.forEach(([id, value]) => {
            const element =
                document.getElementById(id);

            if (element) {
                element.textContent = value;
            }
        });
    }

    /* =========================================================
       SELLER SEARCH
       ========================================================= */

    if (searchInput) {
        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key !== "Enter") {
                    return;
                }

                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();

                if (!query) return;

                if (
                    query.includes("product") ||
                    query.includes("products")
                ) {
                    showSection("products");
                    return;
                }

                if (
                    query.includes("order") ||
                    query.includes("orders")
                ) {
                    showSection("orders");
                    return;
                }

                if (
                    query.includes("inventory") ||
                    query.includes("stock")
                ) {
                    showSection("inventory");
                    return;
                }

                if (
                    query.includes("earning") ||
                    query.includes("earnings") ||
                    query.includes("sale") ||
                    query.includes("sales")
                ) {
                    showSection("earnings");
                    return;
                }

                if (query.includes("analytics")) {
                    showSection("analytics");
                    return;
                }

                if (
                    query.includes("review") ||
                    query.includes("reviews")
                ) {
                    showSection("reviews");
                    return;
                }

                if (
                    query.includes("promotion") ||
                    query.includes("promotions") ||
                    query.includes("discount")
                ) {
                    showSection("promotions");
                    return;
                }

                if (
                    query.includes("store") ||
                    query.includes("shop")
                ) {
                    showSection("store");
                    return;
                }

                alert(
                    `No seller section found for "${searchInput.value}".`
                );
            }
        );
    }

    /* =========================================================
       SALES PERIOD
       ========================================================= */

    const salesPeriod =
        document.getElementById("salesPeriod");

    if (salesPeriod) {
        salesPeriod.addEventListener(
            "change",
            () => {
                console.log(
                    "Sales period:",
                    salesPeriod.value
                );
            }
        );
    }

    /* =========================================================
       HELP
       ========================================================= */

    if (helpButton) {
        helpButton.addEventListener("click", () => {
            alert(
                "MARTEY Seller Support will be connected with the backend later."
            );
        });
    }

    /* =========================================================
       ESCAPE HTML
       ========================================================= */

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* =========================================================
       MONEY FORMAT
       ========================================================= */

    function formatMoney(value) {
        const number =
            Number(value || 0);

        return number.toLocaleString("en-IN", {
            maximumFractionDigits: 2
        });
    }

    /* =========================================================
       INITIALIZE
       ========================================================= */

    updateProductCounters(
        getProducts()
    );

    /*
       Dashboard opens first.
    */

    showSection("dashboard");

    /*
       Products list can still be refreshed
       immediately if the Products section is visible.
    */

    renderProducts();
});
