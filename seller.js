/* =========================================================
   MARTEY — SELLER DASHBOARD
   Frontend navigation + basic interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navItems = document.querySelectorAll(".seller-nav-item");
    const sections = document.querySelectorAll(".seller-section");

    const pageTitle = document.getElementById("pageTitle");

    const shopButtons = [
        document.getElementById("shopMarteyButton"),
        document.getElementById("topShopButton")
    ];

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const sidebar =
        document.querySelector(".seller-sidebar");

    const profileButton =
        document.getElementById("sellerProfileButton");

    const notificationButton =
        document.getElementById("notificationButton");

    const addProductButton =
        document.getElementById("addProductButton");

    const productsAddButton =
        document.getElementById("productsAddButton");

    const helpButton =
        document.getElementById("sellerHelpButton");

    const searchInput =
        document.getElementById("sellerSearch");


    /* =====================================================
       SECTION TITLES
    ===================================================== */

    const sectionTitles = {
        dashboard: "Dashboard",
        products: "Products",
        orders: "Orders",
        inventory: "Inventory",
        earnings: "Earnings",
        analytics: "Analytics",
        promotions: "Promotions",
        reviews: "Reviews",
        store: "My Store",
        settings: "Settings"
    };


    /* =====================================================
       SHOW SECTION
    ===================================================== */

    function showSection(sectionName) {

        /*
            Hide every section
        */

        sections.forEach(section => {
            section.classList.remove("active");
        });


        /*
            Show selected section
        */

        const selectedSection =
            document.querySelector(
                `[data-page-section="${sectionName}"]`
            );

        if (selectedSection) {
            selectedSection.classList.add("active");
        }


        /*
            Update sidebar active state
        */

        navItems.forEach(item => {

            const itemSection =
                item.dataset.section;

            item.classList.toggle(
                "active",
                itemSection === sectionName
            );

        });


        /*
            Update page title
        */

        if (pageTitle) {

            pageTitle.textContent =
                sectionTitles[sectionName] || "Dashboard";

        }


        /*
            Close mobile sidebar
        */

        if (window.innerWidth <= 900 && sidebar) {
            sidebar.classList.remove("mobile-open");
        }


        /*
            Scroll to top
        */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       SIDEBAR NAVIGATION
    ===================================================== */

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const sectionName =
                item.dataset.section;

            if (!sectionName) return;

            showSection(sectionName);

        });

    });


    /* =====================================================
       DASHBOARD QUICK LINKS
    ===================================================== */

    const quickLinks =
        document.querySelectorAll("[data-open-section]");

    quickLinks.forEach(button => {

        button.addEventListener("click", () => {

            const sectionName =
                button.dataset.openSection;

            if (!sectionName) return;

            showSection(sectionName);

        });

    });


    /* =====================================================
       SHOP MARTEY
    ===================================================== */

    shopButtons.forEach(button => {

        if (!button) return;

        button.addEventListener("click", () => {

            /*
                Seller can shop like a normal customer.
                Customer homepage remains the same.
            */

            window.location.href = "index.html";

        });

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenuButton && sidebar) {

        mobileMenuButton.addEventListener("click", () => {

            sidebar.classList.toggle("mobile-open");

        });

    }


    /* =====================================================
       CLOSE MOBILE SIDEBAR
       WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", event => {

        if (!sidebar) return;

        if (window.innerWidth > 900) return;

        const clickedInsideSidebar =
            sidebar.contains(event.target);

        const clickedMenu =
            mobileMenuButton &&
            mobileMenuButton.contains(event.target);

        if (!clickedInsideSidebar && !clickedMenu) {

            sidebar.classList.remove("mobile-open");

        }

    });


    /* =====================================================
       PROFILE BUTTON
    ===================================================== */

    if (profileButton) {

        profileButton.addEventListener("click", () => {

            alert(
                "Seller profile settings will be connected when the account system and database are ready."
            );

        });

    }


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    if (notificationButton) {

        notificationButton.addEventListener("click", () => {

            alert(
                "You currently have 3 seller notifications."
            );

        });

    }


    /* =====================================================
       ADD PRODUCT
    ===================================================== */

    function openAddProductMessage() {

        alert(
            "Add Product system will be built in the next Seller development step."
        );

    }


    if (addProductButton) {

        addProductButton.addEventListener(
            "click",
            openAddProductMessage
        );

    }


    if (productsAddButton) {

        productsAddButton.addEventListener(
            "click",
            openAddProductMessage
        );

    }


    /* =====================================================
       HELP & SUPPORT
    ===================================================== */

    if (helpButton) {

        helpButton.addEventListener("click", () => {

            alert(
                "MARTEY Seller Support will be available here."
            );

        });

    }


    /* =====================================================
       SELLER SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener("keydown", event => {

            if (event.key !== "Enter") return;

            const query =
                searchInput.value.trim().toLowerCase();

            if (!query) return;


            /*
                Basic frontend search.
                Real product/order search will come
                after database integration.
            */

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


            if (query.includes("setting")) {

                showSection("settings");
                return;

            }


            alert(
                `No seller section found for "${searchInput.value}".`
            );

        });

    }


    /* =====================================================
       SALES PERIOD
    ===================================================== */

    const salesPeriod =
        document.getElementById("salesPeriod");

    if (salesPeriod) {

        salesPeriod.addEventListener("change", () => {

            /*
                Chart data will become dynamic
                after backend/database integration.
            */

            console.log(
                "Sales period:",
                salesPeriod.value
            );

        });

    }


    /* =====================================================
       PROFILE DATA
       Future database connection
    ===================================================== */

    function loadSellerProfile() {

        /*
            For now we use demo seller information.

            Later this will come from:
            MARTEY Database → Seller Account
        */

        const sellerName =
            document.getElementById("sellerName");

        if (sellerName) {

            sellerName.textContent = "Seller";

        }

    }

    loadSellerProfile();


    /* =====================================================
       DEFAULT PAGE
    ===================================================== */

    showSection("dashboard");


    /* =====================================================
       PREVENT EMPTY SEARCH SUBMISSION
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            /*
                Reserved for future live search.
            */

        });

    }

});
