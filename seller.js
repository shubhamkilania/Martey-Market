/* =========================================================
   MARTEY SELLER CENTER
   Stable Navigation + Sidebar + Notifications + Profile
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
    const emptyAddProductButton = document.getElementById("emptyAddProductButton");

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


        /* Update sidebar active button */

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


        /* Scroll to top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /* Close sidebar on smaller screens */

        if (window.innerWidth <= 900) {
            closeSidebar();
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
       OTHER "OPEN SECTION" BUTTONS
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
       NOTIFICATIONS
    ===================================================== */

    function openNotifications() {

        if (!notificationPanel) return;

        notificationPanel.classList.add("show");

        notificationPanel.style.display = "block";

        if (notificationButton) {
            notificationButton.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    }


    function closeNotifications() {

        if (!notificationPanel) return;

        notificationPanel.classList.remove("show");

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
            notificationPanel.classList.contains("show");

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


    /* Mark notifications read */

    if (markNotificationsRead) {

        markNotificationsRead.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const unread =
                    document.querySelectorAll(
                        ".notification-item.unread"
                    );

                unread.forEach(function (item) {
                    item.classList.remove("unread");
                });


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

        profileOverlay.classList.add("show");

        profileOverlay.style.display = "flex";

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

        profileOverlay.classList.remove("show");

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
            profileOverlay.classList.contains("show");

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


    /* Click outside profile */

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
                    accounts.find(function (account) {

                        return account.role === "seller";

                    }) || null;

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
                        .toUpperCase() || "S";
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

                alert(
                    "MARTEY Seller Help\n\n" +
                    "Use the sidebar to manage your products, orders, inventory and store."
                );
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
       PROFILE MENU BUTTONS
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


                const possibleSections = [
                    "products",
                    "orders",
                    "inventory",
                    "earnings",
                    "analytics",
                    "reviews",
                    "promotions",
                    "store"
                ];


                let matchedSection =
                    "products";


                if (
                    query.includes("order")
                ) {
                    matchedSection = "orders";
                }

                else if (
                    query.includes("stock") ||
                    query.includes("inventory")
                ) {
                    matchedSection = "inventory";
                }

                else if (
                    query.includes("earning") ||
                    query.includes("money") ||
                    query.includes("payout")
                ) {
                    matchedSection = "earnings";
                }

                else if (
                    query.includes("analytic")
                ) {
                    matchedSection = "analytics";
                }

                else if (
                    query.includes("review") ||
                    query.includes("rating")
                ) {
                    matchedSection = "reviews";
                }

                else if (
                    query.includes("promotion") ||
                    query.includes("discount")
                ) {
                    matchedSection = "promotions";
                }

                else if (
                    query.includes("store")
                ) {
                    matchedSection = "store";
                }


                showSection(matchedSection);
            }
        );

    }


    /* =====================================================
       CLOSE POPUPS WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            /* Notification */

            if (
                notificationPanel &&
                notificationButton &&
                !notificationPanel.contains(event.target) &&
                !notificationButton.contains(event.target)
            ) {
                closeNotifications();
            }


            /* Profile */

            if (
                profileOverlay &&
                profileOverlay.classList.contains("show")
            ) {

                const panel =
                    profileOverlay.querySelector(
                        ".seller-profile-panel"
                    );

                if (
                    panel &&
                    !panel.contains(event.target) &&
                    !sellerProfileButton?.contains(event.target)
                ) {
                    closeProfile();
                }
            }

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    /* Hide all sections first */

    sections.forEach(function (section) {

        section.style.display = "none";

    });


    /* Open dashboard */

    showSection("dashboard");


    /* Sidebar default */

    const savedSidebar =
        localStorage.getItem(
            "marteySellerSidebar"
        );


    if (savedSidebar === "closed") {

        closeSidebar();

    } else {

        openSidebar();

    }


    /* Close popup panels initially */

    if (notificationPanel) {
        notificationPanel.classList.remove("show");
    }

    if (profileOverlay) {
        profileOverlay.classList.remove("show");
    }


    console.log(
        "MARTEY Seller Center initialized"
    );

});
