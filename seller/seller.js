document.addEventListener("DOMContentLoaded", () => {

    const navItems =
        document.querySelectorAll(".seller-nav-item");

    const sections =
        document.querySelectorAll(".seller-section");

    const pageTitle =
        document.getElementById("pageTitle");

    const sidebar =
        document.querySelector(".seller-sidebar");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const notificationButton =
        document.getElementById("notificationButton");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const profileButton =
        document.getElementById("sellerProfileButton");

    const profileOverlay =
        document.getElementById("profileOverlay");

    const profileCloseButton =
        document.getElementById("profileCloseButton");

    const searchInput =
        document.getElementById("sellerSearch");

    const addProductButton =
        document.getElementById("addProductButton");

    const productsAddButton =
        document.getElementById("productsAddButton");

    const storeSettingsButton =
        document.getElementById("storeSettingsButton");

    const storeSettingsButton2 =
        document.getElementById("storeSettingsButton2");

    const shopButtons = [
        document.getElementById("shopMarteyButton"),
        document.getElementById("topShopButton")
    ];


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
        store: "My Store"

    };


    /* =====================================================
       SHOW SECTION
    ===================================================== */

    function showSection(sectionName) {

        sections.forEach(section => {

            section.classList.remove("active");

        });


        const selectedSection =
            document.querySelector(
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
                sectionTitles[sectionName] ||
                "Dashboard";

        }


        closeMobileSidebar();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       SIDEBAR
    ===================================================== */

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const section =
                item.dataset.section;

            if (!section) return;

            showSection(section);

        });

    });


    /* =====================================================
       QUICK LINKS
    ===================================================== */

    document
        .querySelectorAll("[data-open-section]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const section =
                    button.dataset.openSection;

                if (section) {
                    showSection(section);
                }

            });

        });


    /* =====================================================
       ADD PRODUCT
    ===================================================== */

    function openAddProductPage() {

        window.location.href =
            "add-product.html";

    }


    if (addProductButton) {

        addProductButton.addEventListener(
            "click",
            openAddProductPage
        );

    }


    if (productsAddButton) {

        productsAddButton.addEventListener(
            "click",
            openAddProductPage
        );

    }


    document
        .querySelectorAll("[data-open-add-product]")
        .forEach(button => {

            button.addEventListener(
                "click",
                openAddProductPage
            );

        });


    /* =====================================================
       SHOP MARTEY
    ===================================================== */

    shopButtons.forEach(button => {

        if (!button) return;

        button.addEventListener("click", () => {

            window.location.href =
                "index.html";

        });

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileSidebar() {

        if (sidebar) {

            sidebar.classList.remove(
                "mobile-open"
            );

        }

    }


    if (mobileMenuButton && sidebar) {

        mobileMenuButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                sidebar.classList.toggle(
                    "mobile-open"
                );

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (!sidebar) return;

            if (window.innerWidth > 900) {
                return;
            }

            const insideSidebar =
                sidebar.contains(event.target);

            const clickedMenu =
                mobileMenuButton &&
                mobileMenuButton.contains(event.target);

            if (
                !insideSidebar &&
                !clickedMenu
            ) {

                closeMobileSidebar();

            }

        }
    );


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                if (notificationPanel) {

                    notificationPanel.classList.toggle(
                        "show"
                    );

                }

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            const wrapper =
                document.querySelector(
                    ".notification-wrapper"
                );

            if (!wrapper) return;

            if (
                !wrapper.contains(event.target)
            ) {

                notificationPanel?.classList.remove(
                    "show"
                );

            }

        }
    );


    const markRead =
        document.getElementById(
            "markNotificationsRead"
        );


    if (markRead) {

        markRead.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".notification-item.unread"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "unread"
                        );

                    });


                document
                    .querySelector(
                        ".notification-dot"
                    )
                    ?.classList.add("hidden");

            }
        );

    }


    /* =====================================================
       SELLER PROFILE
    ===================================================== */

    function openProfile() {

        if (!profileOverlay) return;

        updateSellerProfile();

        profileOverlay.classList.add(
            "show"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeProfile() {

        if (!profileOverlay) return;

        profileOverlay.classList.remove(
            "show"
        );

        document.body.style.overflow =
            "";

    }


    if (profileButton) {

        profileButton.addEventListener(
            "click",
            openProfile
        );

    }


    if (profileCloseButton) {

        profileCloseButton.addEventListener(
            "click",
            closeProfile
        );

    }


    if (profileOverlay) {

        profileOverlay.addEventListener(
            "click",
            event => {

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
       SELLER PROFILE DATA
    ===================================================== */

    function getSellerData() {

        let user = null;

        try {

            user =
                JSON.parse(
                    localStorage.getItem(
                        "marteyCurrentUser"
                    )
                );

        } catch (error) {

            user = null;

        }


        if (!user) {

            try {

                user =
                    JSON.parse(
                        localStorage.getItem(
                            "marteyUser"
                        )
                    );

            } catch (error) {

                user = null;

            }

        }


        return user;

    }


    function getInitials(name) {

        if (!name) return "S";

        const words =
            name
                .trim()
                .split(/\s+/);

        if (words.length === 1) {

            return words[0]
                .substring(0, 2)
                .toUpperCase();

        }

        return (
            words[0][0] +
            words[1][0]
        ).toUpperCase();

    }


    function updateSellerProfile() {

        const user =
            getSellerData();


        const name =
            user?.name ||
            "Seller";


        const email =
            user?.email ||
            "seller@martey.com";


        const avatar =
            user?.avatar ||
            "";


        const sellerAvatar =
            document.getElementById(
                "sellerAvatar"
            );


        const largeAvatar =
            document.getElementById(
                "profileLargeAvatar"
            );


        const profileName =
            document.getElementById(
                "profileSellerName"
            );


        const profileEmail =
            document.getElementById(
                "profileSellerEmail"
            );


        if (sellerAvatar) {

            if (avatar) {

                sellerAvatar.innerHTML =
                    `<img src="${avatar}" alt="Seller profile">`;

            } else {

                sellerAvatar.textContent =
                    getInitials(name);

            }

        }


        if (largeAvatar) {

            if (avatar) {

                largeAvatar.innerHTML =
                    `<img src="${avatar}" alt="Seller profile">`;

            } else {

                largeAvatar.textContent =
                    getInitials(name);

            }

        }


        if (profileName) {

            profileName.textContent =
                name;

        }


        if (profileEmail) {

            profileEmail.textContent =
                email;

        }

    }


    updateSellerProfile();


    /* =====================================================
       STORE SETTINGS
    ===================================================== */

    function openStoreSettings() {

        showStoreSettingsMessage();

    }


    function showStoreSettingsMessage() {

        const name =
            prompt(
                "Enter your store name:",
                "Your Store"
            );


        if (
            name &&
            name.trim()
        ) {

            const previewName =
                document.getElementById(
                    "storePreviewName"
                );


            if (previewName) {

                previewName.textContent =
                    name.trim();

            }

        }

    }


    if (storeSettingsButton) {

        storeSettingsButton.addEventListener(
            "click",
            openStoreSettings
        );

    }


    if (storeSettingsButton2) {

        storeSettingsButton2.addEventListener(
            "click",
            openStoreSettings
        );

    }


    /* =====================================================
       PROFILE SETTINGS
    ===================================================== */

    const sellerAccountSettings =
        document.getElementById(
            "sellerAccountSettings"
        );


    const sellerBusinessSettings =
        document.getElementById(
            "sellerBusinessSettings"
        );


    const sellerSecuritySettings =
        document.getElementById(
            "sellerSecuritySettings"
        );


    if (sellerAccountSettings) {

        sellerAccountSettings.addEventListener(
            "click",
            () => {

                alert(
                    "Seller Account & Profile settings will be connected with the database."
                );

            }
        );

    }


    if (sellerBusinessSettings) {

        sellerBusinessSettings.addEventListener(
            "click",
            () => {

                closeProfile();

                showSection("store");

            }
        );

    }


    if (sellerSecuritySettings) {

        sellerSecuritySettings.addEventListener(
            "click",
            () => {

                alert(
                    "Login & Security will be connected with the backend."
                );

            }
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutButton =
        document.getElementById(
            "sellerLogoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

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

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !==
                    "Enter"
                ) {
                    return;
                }


                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                if (!query) return;


                if (
                    query.includes("product")
                ) {

                    showSection(
                        "products"
                    );

                    return;

                }


                if (
                    query.includes("order")
                ) {

                    showSection(
                        "orders"
                    );

                    return;

                }


                if (
                    query.includes("stock") ||
                    query.includes("inventory")
                ) {

                    showSection(
                        "inventory"
                    );

                    return;

                }


                if (
                    query.includes("earning") ||
                    query.includes("sale")
                ) {

                    showSection(
                        "earnings"
                    );

                    return;

                }


                if (
                    query.includes("analytic")
                ) {

                    showSection(
                        "analytics"
                    );

                    return;

                }


                if (
                    query.includes("promotion") ||
                    query.includes("discount")
                ) {

                    showSection(
                        "promotions"
                    );

                    return;

                }


                if (
                    query.includes("review")
                ) {

                    showSection(
                        "reviews"
                    );

                    return;

                }


                if (
                    query.includes("store") ||
                    query.includes("shop")
                ) {

                    showSection(
                        "store"
                    );

                    return;

                }

            }
        );

    }


    /* =====================================================
       SALES PERIOD
    ===================================================== */

    const salesPeriod =
        document.getElementById(
            "salesPeriod"
        );


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


    /* =====================================================
       HELP
    ===================================================== */

    const helpButton =
        document.getElementById(
            "sellerHelpButton"
        );


    if (helpButton) {

        helpButton.addEventListener(
            "click",
            () => {

                alert(
                    "MARTEY Seller Help Center will be connected here."
                );

            }
        );

    }


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                notificationPanel?.classList.remove(
                    "show"
                );

                closeProfile();

                closeMobileSidebar();

            }

        }
    );


    /* =====================================================
       DEFAULT
    ===================================================== */

    showSection("dashboard");

});
