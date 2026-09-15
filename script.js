document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       MARTEY — Main Frontend Script
       ========================================================= */

    // ---------- Helpers ----------
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const getJSON = (key, fallback) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch {
            return fallback;
        }
    };

    const setJSON = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };


    /* =========================================================
       ELEMENTS
       ========================================================= */

    const authModal = $("#authModal");
    const accountModal = $("#accountModal");
    const settingsModal = $("#settingsModal");
    const toast = $("#toast");
    const toastMessage = $("#toastMessage");

    const accountButton = $("#accountButton");
    const accountAvatar = $("#accountAvatar");

    const cartButton = $("#cartButton");
    const cartCount = $("#cartCount");

    const wishlistButton = $("#wishlistButton");

    const searchInput = $("#searchInput");
    const searchButton = $("#searchButton");

    const productGrid = $("#productGrid");
    const emptyState = $("#emptyState");

    const viewAllProducts = $("#viewAllProducts");

    const startShopping = $("#startShopping");

    const sellButton = $("#sellButton");
    const footerSellerLink = $("#footerSellerLink");
    const footerSellerButton = $("#footerSellerButton");
    const footerSellerHelp = $("#footerSellerHelp");

    const loginForm = $("#loginForm");
    const signupForm = $("#signupForm");

    const loginEmail = $("#loginEmail");
    const loginPassword = $("#loginPassword");

    const signupName = $("#signupName");
    const signupEmail = $("#signupEmail");
    const signupPassword = $("#signupPassword");
    const signupRole = $("#signupRole");

    const storeNameGroup = $("#storeNameGroup");
    const storeName = $("#storeName");

    const themeToggle = $("#themeToggle");
    const notificationToggle = $("#notificationToggle");


    /* =========================================================
       TOAST
       ========================================================= */

    function showToast(message) {
        if (!toast) return;

        if (toastMessage) {
            toastMessage.textContent = message;
        } else {
            toast.textContent = message;
        }

        toast.classList.add("show");

        clearTimeout(window.marteyToastTimer);

        window.marteyToastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }


    /* =========================================================
       MODALS
       ========================================================= */

    function openModal(modal) {
        if (!modal) return;

        modal.classList.remove("hidden");
        modal.classList.add("show");

        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    }


    function closeModal(modal) {
        if (!modal) return;

        modal.classList.remove("show");
        modal.classList.add("hidden");

        modal.setAttribute("aria-hidden", "true");

        if (
            (!authModal || authModal.classList.contains("hidden")) &&
            (!accountModal || accountModal.classList.contains("hidden")) &&
            (!settingsModal || settingsModal.classList.contains("hidden"))
        ) {
            document.body.classList.remove("modal-open");
        }
    }


    // Close buttons
    $$(".modal-close").forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");

            if (modal) {
                closeModal(modal);
            }
        });
    });


    // Click outside modal
    $$(".modal").forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });


    // ESC key
    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        closeModal(authModal);
        closeModal(accountModal);
        closeModal(settingsModal);
    });


    /* =========================================================
       AUTH TABS
       ========================================================= */

    const authTabs = $$(".auth-tab");
    const authViews = $$(".auth-view");

    function switchAuthTab(type) {
        authTabs.forEach((tab) => {
            tab.classList.toggle(
                "active",
                tab.dataset.authTab === type
            );
        });

        authViews.forEach((view) => {
            view.classList.add("hidden");
        });

        const selectedView = $(
            type === "login" ? "#loginView" : "#signupView"
        );

        if (selectedView) {
            selectedView.classList.remove("hidden");
        }
    }


    authTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const type = tab.dataset.authTab;

            if (type) {
                switchAuthTab(type);
            }
        });
    });


    // Buttons such as "Create account" / "Already have account"
    $$("[data-auth-switch]").forEach((button) => {
        button.addEventListener("click", () => {
            const type = button.dataset.authSwitch;

            if (type) {
                switchAuthTab(type);
            }
        });
    });


    /* =========================================================
       USER DATA
       ========================================================= */

    function getUser() {
        return getJSON("marteyUser", null);
    }


    function saveUser(user) {
        setJSON("marteyUser", user);
    }


    function updateAccountAvatar() {
        if (!accountAvatar) return;

        const user = getUser();

        if (!user) {
            accountAvatar.innerHTML = `
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="8" r="3.5"></circle>
                    <path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5"></path>
                </svg>
            `;

            return;
        }

        const name = user.name || "User";

        const initials = name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase();

        accountAvatar.textContent = initials || "U";
    }


    /* =========================================================
       ACCOUNT BUTTON
       ========================================================= */

 if (accountButton) {
    accountButton.addEventListener("click", () => {
        const user = getUser();

        if (!user) {
            openModal(authModal);
            switchAuthTab("login");
            return;
        }

        if (accountModal) {
            openModal(accountModal);
        } else {
            showToast("Account page is coming soon.");
        }
    });
}

    /* =========================================================
       LOGIN
       ========================================================= */

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = loginEmail?.value.trim();
            const password = loginPassword?.value.trim();

            if (!email || !password) {
                showToast("Please enter email and password.");
                return;
            }

            const savedUser = getUser();

            /*
             * Frontend demo login.
             * Real authentication will be connected
             * after backend/database is created.
             */

            if (
                savedUser &&
                savedUser.email &&
                savedUser.email.toLowerCase() !== email.toLowerCase()
            ) {
                showToast("No account found with this email.");
                return;
            }

            const user = savedUser || {
                name: email.split("@")[0],
                email: email,
                role: "customer"
            };

            saveUser(user);

            closeModal(authModal);

            updateAccountAvatar();

            showToast("Welcome back to MARTEY!");

            loginForm.reset();
        });
    }


    /* =========================================================
       SIGNUP ROLE
       ========================================================= */

    const roleOptions = $$(".role-option");

    function selectRole(role) {
        if (!role) return;

        roleOptions.forEach((option) => {
            const optionRole = option.dataset.role;

            option.classList.toggle(
                "active",
                optionRole === role
            );

            option.classList.toggle(
                "selected",
                optionRole === role
            );
        });

        if (signupRole) {
            signupRole.value = role;
        }

        // Store name only needed for seller
        if (storeNameGroup) {
            storeNameGroup.classList.toggle(
                "hidden",
                role !== "seller"
            );
        }
    }


    roleOptions.forEach((option) => {
        option.addEventListener("click", () => {
            selectRole(option.dataset.role);
        });
    });


    // Default role
    if (signupRole?.value) {
        selectRole(signupRole.value);
    } else {
        selectRole("customer");
    }


    /* =========================================================
       OPEN SIGNUP
       ========================================================= */

    function openSignup(role = "customer") {
        openModal(authModal);

        switchAuthTab("signup");

        selectRole(role);
    }


    // Sell buttons
    if (sellButton) {
        sellButton.addEventListener("click", () => {
            openSignup("seller");
        });
    }


    if (footerSellerLink) {
        footerSellerLink.addEventListener("click", () => {
            openSignup("seller");
        });
    }


    if (footerSellerButton) {
        footerSellerButton.addEventListener("click", () => {
            openSignup("seller");
        });
    }


    if (footerSellerHelp) {
        footerSellerHelp.addEventListener("click", () => {
            showToast("Seller help center will be available soon.");
        });
    }


    /* =========================================================
       SIGNUP
       ========================================================= */

    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = signupName?.value.trim();
            const email = signupEmail?.value.trim();
            const password = signupPassword?.value.trim();

            const role =
                signupRole?.value ||
                "customer";

            const sellerStoreName =
                storeName?.value.trim() || "";

            if (!name || !email || !password) {
                showToast("Please fill all required fields.");
                return;
            }

            if (password.length < 6) {
                showToast(
                    "Password should be at least 6 characters."
                );
                return;
            }

            if (
                role === "seller" &&
                !sellerStoreName
            ) {
                showToast("Please enter your store name.");
                return;
            }

            const user = {
                name,
                email,
                role,
                storeName:
                    role === "seller"
                        ? sellerStoreName
                        : "",
                createdAt:
                    new Date().toISOString()
            };

            saveUser(user);

            updateAccountAvatar();

            signupForm.reset();

            selectRole("customer");

            closeModal(authModal);

            showToast(
                "MARTEY account created successfully!"
            );
        });
    }


    /* =========================================================
       CART
       ========================================================= */

    function getCart() {
        return getJSON("marteyCart", []);
    }


    function updateCartCount() {
        if (!cartCount) return;

        const cart = getCart();

        let count = 0;

        cart.forEach((item) => {
            count += Number(item.quantity) || 1;
        });

        cartCount.textContent = count;

        if (count > 0) {
            cartCount.classList.add("has-items");
        } else {
            cartCount.classList.remove("has-items");
        }
    }


    if (cartButton) {
        cartButton.addEventListener("click", () => {
            window.location.href = "cart.html";
        });
    }


    updateCartCount();


    /* =========================================================
       WISHLIST
       ========================================================= */

    function getWishlist() {
        return getJSON("marteyWishlist", []);
    }


    function saveWishlist(wishlist) {
        setJSON("marteyWishlist", wishlist);
    }


    function isWishlisted(productId) {
        const wishlist = getWishlist();

        return wishlist.some(
            (id) => String(id) === String(productId)
        );
    }


    function updateWishlistButtons() {
        $$(".heart-btn").forEach((button) => {
            const productId =
                button.dataset.productId ||
                button.closest(".product-card")?.dataset.productId;

            if (!productId) return;

            const active = isWishlisted(productId);

            button.classList.toggle("active", active);

            button.setAttribute(
                "aria-pressed",
                active ? "true" : "false"
            );

            button.textContent = active
                ? "♥"
                : "♡";
        });
    }


    $$(".heart-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const card = button.closest(".product-card");

            if (!card) return;

            const productId =
                card.dataset.productId;

            if (!productId) return;

            let wishlist = getWishlist();

            const existingIndex =
                wishlist.findIndex(
                    (id) =>
                        String(id) ===
                        String(productId)
                );

            if (existingIndex !== -1) {
                wishlist.splice(existingIndex, 1);

                showToast(
                    "Removed from wishlist."
                );
            } else {
                wishlist.push(productId);

                showToast(
                    "Added to wishlist."
                );
            }

            saveWishlist(wishlist);

            updateWishlistButtons();
        });
    });


    updateWishlistButtons();


    if (wishlistButton) {
        wishlistButton.addEventListener("click", () => {
            const wishlist = getWishlist();

            if (wishlist.length === 0) {
                showToast("Your wishlist is empty.");
                return;
            }

            window.location.href =
                "account.html#wishlist";
        });
    }


    /* =========================================================
       SEARCH
       ========================================================= */

    function filterProducts(searchTerm = "") {
        if (!productGrid) return;

        const term =
            searchTerm.trim().toLowerCase();

        const cards =
            productGrid.querySelectorAll(
                ".product-card"
            );

        let visibleCount = 0;

        cards.forEach((card) => {
            const name =
                card.dataset.name ||
                card.querySelector(
                    ".product-name"
                )?.textContent ||
                "";

            const category =
                card.dataset.category || "";

            const searchableText =
                `${name} ${category}`.toLowerCase();

            const matches =
                !term ||
                searchableText.includes(term);

            card.style.display =
                matches ? "" : "none";

            if (matches) {
                visibleCount++;
            }
        });

        if (emptyState) {
            emptyState.classList.toggle(
                "hidden",
                visibleCount !== 0
            );
        }
    }


    if (searchButton) {
        searchButton.addEventListener("click", () => {
            filterProducts(
                searchInput?.value || ""
            );

            document
                .getElementById("products")
                ?.scrollIntoView({
                    behavior: "smooth"
                });
        });
    }


    if (searchInput) {
        searchInput.addEventListener(
            "keydown",
            (event) => {
                if (event.key === "Enter") {
                    filterProducts(
                        searchInput.value
                    );

                    document
                        .getElementById("products")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });
                }
            }
        );
    }


    /* =========================================================
       CATEGORY FILTER
       ========================================================= */

    function filterByCategory(category) {
        if (!productGrid) return;

        const cards =
            productGrid.querySelectorAll(
                ".product-card"
            );

        let visibleCount = 0;

        cards.forEach((card) => {
            const cardCategory =
                (
                    card.dataset.category || ""
                ).toLowerCase();

            const wantedCategory =
                String(category).toLowerCase();

            const matches =
                wantedCategory === "all" ||
                wantedCategory === "more" ||
                cardCategory === wantedCategory;

            card.style.display =
                matches ? "" : "none";

            if (matches) {
                visibleCount++;
            }
        });

        if (emptyState) {
            emptyState.classList.toggle(
                "hidden",
                visibleCount !== 0
            );
        }

        document
            .getElementById("products")
            ?.scrollIntoView({
                behavior: "smooth"
            });
    }


    // Header categories
    $$(".category-link").forEach((button) => {
        button.addEventListener("click", () => {
            const category =
                button.dataset.category;

            if (!category) return;

            $$(".category-link").forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            filterByCategory(category);
        });
    });


    // Homepage category cards
    $$(".category-card").forEach((card) => {
        card.addEventListener("click", () => {
            const category =
                card.dataset.categoryCard;

            if (!category) return;

            filterByCategory(category);
        });
    });


    /* =========================================================
       VIEW ALL PRODUCTS
       ========================================================= */

    if (viewAllProducts) {
        viewAllProducts.addEventListener(
            "click",
            () => {
                if (searchInput) {
                    searchInput.value = "";
                }

                $$(".product-card").forEach(
                    (card) => {
                        card.style.display = "";
                    }
                );

                if (emptyState) {
                    emptyState.classList.add(
                        "hidden"
                    );
                }

                $$(".category-link").forEach(
                    (item) => {
                        item.classList.remove(
                            "active"
                        );
                    }
                );

                document
                    .querySelector(
                        '.category-link[data-category="all"]'
                    )
                    ?.classList.add("active");

                document
                    .getElementById("products")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });
            }
        );
    }


    /* =========================================================
       HERO BUTTON
       ========================================================= */

    if (startShopping) {
        startShopping.addEventListener(
            "click",
            (event) => {
                const target =
                    document.getElementById(
                        "products"
                    );

                if (target) {
                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        );
    }


    /* =========================================================
       PRODUCT CARD NAVIGATION
       ========================================================= */

    $$(".product-card").forEach((card) => {
        const productLink =
            card.querySelector(
                'a[href*="product.html"]'
            );

        if (!productLink) return;

        card.addEventListener("click", (event) => {
            // Don't interfere with wishlist button
            if (
                event.target.closest(".heart-btn")
            ) {
                return;
            }

            // If user clicked another actual link,
            // let normal browser behavior happen.
            if (
                event.target.closest("a")
            ) {
                return;
            }

            window.location.href =
                productLink.href;
        });
    });


    /* =========================================================
       ACCOUNT MODAL — OPTIONAL / FUTURE
       ========================================================= */

    const accountOrders =
        $("#accountOrders");

    const accountWishlist =
        $("#accountWishlist");

    const accountSettings =
        $("#accountSettings");

    const accountLogout =
        $("#accountLogout");


    if (accountOrders) {
        accountOrders.addEventListener(
            "click",
            () => {
                window.location.href =
                    "orders.html";
            }
        );
    }


    if (accountWishlist) {
        accountWishlist.addEventListener(
            "click",
            () => {
                window.location.href =
                    "account.html#wishlist";
            }
        );
    }


    if (accountSettings) {
        accountSettings.addEventListener(
            "click",
            () => {
                closeModal(accountModal);
                openModal(settingsModal);
            }
        );
    }


    if (accountLogout) {
        accountLogout.addEventListener(
            "click",
            () => {
                localStorage.removeItem(
                    "marteyUser"
                );

                updateAccountAvatar();

                closeModal(accountModal);

                showToast(
                    "You have been logged out."
                );
            }
        );
    }


    /* =========================================================
       SETTINGS — THEME
       ========================================================= */

    function applyTheme(theme) {
        if (theme === "light") {
            document.body.classList.add(
                "light-theme"
            );
        } else {
            document.body.classList.remove(
                "light-theme"
            );
        }

        localStorage.setItem(
            "marteyTheme",
            theme
        );
    }


    const savedTheme =
        localStorage.getItem(
            "marteyTheme"
        );

    if (savedTheme) {
        applyTheme(savedTheme);
    }


    if (themeToggle) {
        themeToggle.addEventListener(
            "click",
            () => {
                const isLight =
                    document.body.classList.contains(
                        "light-theme"
                    );

                applyTheme(
                    isLight
                        ? "dark"
                        : "light"
                );

                showToast(
                    isLight
                        ? "Dark theme enabled."
                        : "Light theme enabled."
                );
            }
        );
    }


    /* =========================================================
       SETTINGS — NOTIFICATIONS
       ========================================================= */

    if (notificationToggle) {
        notificationToggle.addEventListener(
            "click",
            () => {
                const current =
                    localStorage.getItem(
                        "marteyNotifications"
                    ) !== "false";

                localStorage.setItem(
                    "marteyNotifications",
                    String(!current)
                );

                showToast(
                    !current
                        ? "Notifications enabled."
                        : "Notifications disabled."
                );
            }
        );
    }


    /* =========================================================
       PRODUCT IMAGE ERROR HANDLING
       ========================================================= */

    $$("img").forEach((image) => {
        image.addEventListener(
            "error",
            () => {
                image.classList.add(
                    "image-error"
                );
            }
        );
    });


    /* =========================================================
       INITIAL STATE
       ========================================================= */

    updateAccountAvatar();

    // Make sure empty state is hidden initially
    if (emptyState) {
        emptyState.classList.add("hidden");
    }


    console.log(
        "MARTEY frontend initialized successfully."
    );
});
