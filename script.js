document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       MARTEY - FRONTEND SCRIPT
       Current stage:
       Frontend + localStorage
       Backend / Database will be connected later.
    ========================================================= */

    /* =========================================================
       HELPERS
    ========================================================= */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));

    const getJSON = (key, fallback = null) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            console.warn(`MARTEY: Could not read ${key}`, error);
            return fallback;
        }
    };

    const setJSON = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn(`MARTEY: Could not save ${key}`, error);
            return false;
        }
    };

    const removeStorage = (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn(`MARTEY: Could not remove ${key}`, error);
        }
    };


    /* =========================================================
       ELEMENTS
    ========================================================= */

    const authModal = $("#authModal");
    const accountModal = $("#accountModal");
    const settingsModal = $("#settingsModal");

    const accountButton = $("#accountButton");
    const accountAvatar = $("#accountAvatar");

    const cartButton = $("#cartButton");
    const cartCount = $("#cartCount");

    const wishlistButton = $("#wishlistButton");

    const searchInput = $("#searchInput");
    const searchButton = $("#searchButton");

    const productGrid = $("#productGrid");
    const emptyState = $("#emptyState");

    const startShopping = $("#startShopping");

    const sellButton = $("#sellButton");
    const footerSellerButton = $("#footerSellerButton");
    const footerSellerHelp = $("#footerSellerHelp");
    const footerSellerLink = $("#footerSellerLink");

    const loginForm = $("#loginForm");
    const signupForm = $("#signupForm");

    const loginEmail = $("#loginEmail");
    const loginPassword = $("#loginPassword");

    const signupName = $("#signupName");
    const signupEmail = $("#signupEmail");
    const signupPassword = $("#signupPassword");
    const signupRole = $("#signupRole");
    const storeName = $("#storeName");
    const storeNameGroup = $("#storeNameGroup");

    const themeToggle = $("#themeToggle");
    const notificationToggle = $("#notificationToggle");

    const toast = $("#toast");
    const toastMessage = $("#toastMessage");


    /* =========================================================
       TOAST
    ========================================================= */

    let toastTimer = null;

    function showToast(message, duration = 2600) {
        if (!toast || !toastMessage) {
            console.log(message);
            return;
        }

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, duration);
    }


    /* =========================================================
       MODAL SYSTEM
    ========================================================= */

    function getOverlay(element) {
        if (!element) return null;

        if (element.classList.contains("modal-overlay")) {
            return element;
        }

        return element.closest(".modal-overlay");
    }

    function openModal(modal) {
        const overlay = getOverlay(modal);

        if (!overlay) return;

        overlay.classList.remove("hidden");
        overlay.classList.add("show");
        overlay.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");
    }

    function closeModal(modal) {
        const overlay = getOverlay(modal);

        if (!overlay) return;

        overlay.classList.remove("show");
        overlay.classList.add("hidden");
        overlay.setAttribute("aria-hidden", "true");

        const anyOpenModal = $$(".modal-overlay.show").length > 0;

        if (!anyOpenModal) {
            document.body.classList.remove("modal-open");
        }
    }

    function closeAllModals() {
        $$(".modal-overlay").forEach((overlay) => {
            overlay.classList.remove("show");
            overlay.classList.add("hidden");
            overlay.setAttribute("aria-hidden", "true");
        });

        document.body.classList.remove("modal-open");
    }

    // Normalize modals when page loads
    $$(".modal-overlay").forEach((overlay) => {
        overlay.classList.remove("show");
        overlay.classList.add("hidden");
        overlay.setAttribute("aria-hidden", "true");
    });

    // Close buttons
    $$(".modal-close").forEach((button) => {
        button.addEventListener("click", () => {
            const overlay = button.closest(".modal-overlay");

            if (overlay) {
                closeModal(overlay);
            }
        });
    });

    // Click outside modal
    $$(".modal-overlay").forEach((overlay) => {
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    // ESC closes modal
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });


    /* =========================================================
       AUTH TABS
    ========================================================= */

    const authTabs = $$(".auth-tab");
    const loginView = $("#loginView");
    const signupView = $("#signupView");

    function switchAuthTab(tabName = "login") {
        authTabs.forEach((tab) => {
            const active = tab.dataset.authTab === tabName;

            tab.classList.toggle("active", active);
            tab.setAttribute("aria-selected", active ? "true" : "false");
        });

        if (loginView) {
            loginView.classList.toggle(
                "hidden",
                tabName !== "login"
            );
        }

        if (signupView) {
            signupView.classList.toggle(
                "hidden",
                tabName !== "signup"
            );
        }
    }

    authTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const tabName = tab.dataset.authTab || "login";
            switchAuthTab(tabName);
        });
    });


    /* =========================================================
       USER SYSTEM - TEMPORARY LOCAL STORAGE
    ========================================================= */

    const USER_KEY = "marteyUser";

    function getUser() {
        return getJSON(USER_KEY, null);
    }

    function saveUser(user) {
        return setJSON(USER_KEY, user);
    }

    function updateAccountAvatar() {
        if (!accountAvatar) return;

        const user = getUser();

        if (!user) {
            accountAvatar.innerHTML = `
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M20 21C20 17.6863 17.3137 15 14 15H10C6.68629 15 4 17.6863 4 21"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                    <circle
                        cx="12"
                        cy="7"
                        r="4"
                        stroke="currentColor"
                        stroke-width="2"
                    />
                </svg>
            `;

            return;
        }

        const name =
            user.name ||
            user.email?.split("@")[0] ||
            "M";

        const initials = name
            .trim()
            .split(/\s+/)
            .map((word) => word.charAt(0))
            .join("")
            .substring(0, 2)
            .toUpperCase();

        accountAvatar.textContent = initials || "M";
    }


    /* =========================================================
       ACCOUNT BUTTON
       CURRENT STAGE:
       ALWAYS OPENS LOGIN / SIGNUP MODAL
    ========================================================= */

    if (accountButton) {
        accountButton.addEventListener("click", () => {
            if (!authModal) {
                showToast("Login system is loading...");
                return;
            }

            openModal(authModal);
            switchAuthTab("login");
        });
    }


    /* =========================================================
       LOGIN
    ========================================================= */

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = loginEmail?.value.trim() || "";
            const password = loginPassword?.value || "";

            if (!email) {
                showToast("Please enter your email.");
                loginEmail?.focus();
                return;
            }

            if (!email.includes("@")) {
                showToast("Please enter a valid email.");
                loginEmail?.focus();
                return;
            }

            if (!password) {
                showToast("Please enter your password.");
                loginPassword?.focus();
                return;
            }

            if (password.length < 6) {
                showToast("Password must be at least 6 characters.");
                loginPassword?.focus();
                return;
            }

            const existingUser = getUser();

            if (
                existingUser &&
                existingUser.email &&
                existingUser.email.toLowerCase() !== email.toLowerCase()
            ) {
                showToast(
                    "No local account found with this email. Please sign up."
                );
                return;
            }

            const user = existingUser || {
                name: email.split("@")[0],
                email,
                role: "customer"
            };

            user.email = email;

            saveUser(user);
            updateAccountAvatar();

            closeModal(authModal);

            loginForm.reset();

            showToast("Login successful! Welcome to MARTEY.");
        });
    }


    /* =========================================================
       SIGNUP ROLE SYSTEM
    ========================================================= */

    const roleOptions = $$(".role-option");

    function selectRole(role) {
        if (!signupRole) return;

        signupRole.value = role;

        roleOptions.forEach((option) => {
            const isSelected = option.dataset.role === role;

            option.classList.toggle("active", isSelected);
            option.classList.toggle("selected", isSelected);

            option.setAttribute(
                "aria-pressed",
                isSelected ? "true" : "false"
            );
        });

        if (storeNameGroup) {
            storeNameGroup.classList.toggle(
                "hidden",
                role !== "seller"
            );
        }

        if (role !== "seller" && storeName) {
            storeName.value = "";
        }
    }

    roleOptions.forEach((option) => {
        option.addEventListener("click", () => {
            selectRole(option.dataset.role || "customer");
        });
    });

    // Default role
    if (signupRole?.value) {
        selectRole(signupRole.value);
    } else {
        selectRole("customer");
    }


    /* =========================================================
       SIGNUP
    ========================================================= */

    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = signupName?.value.trim() || "";
            const email = signupEmail?.value.trim() || "";
            const password = signupPassword?.value || "";
            const role = signupRole?.value || "customer";
            const sellerStoreName = storeName?.value.trim() || "";

            if (!name) {
                showToast("Please enter your name.");
                signupName?.focus();
                return;
            }

            if (!email || !email.includes("@")) {
                showToast("Please enter a valid email.");
                signupEmail?.focus();
                return;
            }

            if (!password) {
                showToast("Please create a password.");
                signupPassword?.focus();
                return;
            }

            if (password.length < 6) {
                showToast("Password must be at least 6 characters.");
                signupPassword?.focus();
                return;
            }

            if (role === "seller" && !sellerStoreName) {
                showToast("Please enter your store name.");
                storeName?.focus();
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
                createdAt: new Date().toISOString()
            };

            saveUser(user);
            updateAccountAvatar();

            closeModal(authModal);

            signupForm.reset();

            selectRole("customer");

            showToast("Account created successfully!");
        });
    }


    /* =========================================================
       OPEN SIGNUP MODAL
    ========================================================= */

    function openSignup(role = "customer") {
        if (!authModal) return;

        openModal(authModal);
        switchAuthTab("signup");
        selectRole(role);
    }


    /* =========================================================
       SELLER BUTTONS
    ========================================================= */

    [sellButton, footerSellerButton, footerSellerHelp, footerSellerLink]
        .filter(Boolean)
        .forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                openSignup("seller");
            });
        });


    /* =========================================================
       CART
    ========================================================= */

    function getCart() {
        return getJSON("marteyCart", []);
    }

    function updateCartCount() {
        if (!cartCount) return;

        const cart = getCart();

        const count = cart.reduce((total, item) => {
            const quantity = Number(item.quantity) || 1;
            return total + quantity;
        }, 0);

        cartCount.textContent = count;
        cartCount.hidden = count <= 0;
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

    function isInWishlist(productId) {
        return getWishlist().some(
            (id) => String(id) === String(productId)
        );
    }

    function updateWishlistButtons() {
        $$(".heart-btn").forEach((button) => {
            const card = button.closest(".product-card");

            if (!card) return;

            const productId = card.dataset.productId;

            const active = isInWishlist(productId);

            button.classList.toggle("active", active);
            button.setAttribute(
                "aria-pressed",
                active ? "true" : "false"
            );

            button.textContent = active ? "♥" : "♡";
        });
    }

    $$(".heart-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const card = button.closest(".product-card");

            if (!card) return;

            const productId = card.dataset.productId;

            if (!productId) return;

            let wishlist = getWishlist();

            const index = wishlist.findIndex(
                (id) => String(id) === String(productId)
            );

            if (index >= 0) {
                wishlist.splice(index, 1);
                showToast("Removed from wishlist.");
            } else {
                wishlist.push(productId);
                showToast("Added to wishlist.");
            }

            saveWishlist(wishlist);
            updateWishlistButtons();
        });
    });

    if (wishlistButton) {
        wishlistButton.addEventListener("click", () => {
            const wishlist = getWishlist();

            if (!wishlist.length) {
                showToast("Your wishlist is empty.");
                return;
            }

            showToast(
                `${wishlist.length} item${wishlist.length > 1 ? "s" : ""} in your wishlist. Wishlist page is coming soon.`
            );
        });
    }

    updateWishlistButtons();


    /* =========================================================
       PRODUCT FILTERING
    ========================================================= */

    let activeCategory = "all";
    let activeSearch = "";

    function getProductName(card) {
        return (
            card.dataset.name ||
            $(".product-info h3", card)?.textContent ||
            $("h3", card)?.textContent ||
            ""
        )
            .trim()
            .toLowerCase();
    }

    function getProductCategory(card) {
        return (
            card.dataset.category ||
            ""
        )
            .trim()
            .toLowerCase();
    }

    function filterProducts() {
        const cards = $$(".product-card");

        let visibleCount = 0;

        cards.forEach((card) => {
            const name = getProductName(card);
            const category = getProductCategory(card);

            const matchesSearch =
                !activeSearch ||
                name.includes(activeSearch) ||
                category.includes(activeSearch);

            const matchesCategory =
                activeCategory === "all" ||
                activeCategory === "more" ||
                category === activeCategory;

            const visible =
                matchesSearch &&
                matchesCategory;

            card.style.display = visible ? "" : "none";

            if (visible) {
                visibleCount++;
            }
        });

        if (emptyState) {
            emptyState.classList.toggle(
                "hidden",
                visibleCount > 0
            );
        }

        return visibleCount;
    }


    /* =========================================================
       SEARCH
    ========================================================= */

    function performSearch() {
        activeSearch =
            searchInput?.value.trim().toLowerCase() || "";

        filterProducts();

        const productsSection = $("#products");

        if (productsSection && activeSearch) {
            productsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    if (searchButton) {
        searchButton.addEventListener("click", performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                performSearch();
            }

            if (event.key === "Escape") {
                searchInput.value = "";
                activeSearch = "";
                filterProducts();
            }
        });

        searchInput.addEventListener("input", () => {
            if (!searchInput.value.trim()) {
                activeSearch = "";
                filterProducts();
            }
        });
    }


    /* =========================================================
       CATEGORY NAVIGATION
    ========================================================= */

    $$(".category-link").forEach((button) => {
        button.addEventListener("click", () => {
            const category =
                button.dataset.category || "all";

            activeCategory = category.toLowerCase();

            $$(".category-link").forEach((item) => {
                item.classList.toggle(
                    "active",
                    item === button
                );
            });

            filterProducts();

            const productsSection = $("#products");

            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================================
       CATEGORY CARDS
    ========================================================= */

    $$("[data-category-card]").forEach((card) => {
        card.addEventListener("click", () => {
            const category =
                card.dataset.categoryCard || "all";

            activeCategory = category.toLowerCase();

            const matchingButton = $(
                `.category-link[data-category="${category}"]`
            );

            if (matchingButton) {
                $$(".category-link").forEach((item) => {
                    item.classList.toggle(
                        "active",
                        item === matchingButton
                    );
                });
            }

            filterProducts();

            const productsSection = $("#products");

            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================================
       VIEW ALL / MORE BUTTONS
    ========================================================= */

    $$("[data-view-all]").forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = "all";
            activeSearch = "";

            if (searchInput) {
                searchInput.value = "";
            }

            $$(".category-link").forEach((item) => {
                item.classList.toggle(
                    "active",
                    item.dataset.category === "all"
                );
            });

            filterProducts();

            const productsSection = $("#products");

            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================================
       PRODUCT CARD NAVIGATION
    ========================================================= */

    $$(".product-card").forEach((card) => {
        const productLink = card.querySelector(
            'a[href*="product.html"]'
        );

        function openProduct() {
            if (productLink?.href) {
                window.location.href = productLink.href;
                return;
            }

            const productId = card.dataset.productId;

            if (productId) {
                window.location.href =
                    `product.html?id=${encodeURIComponent(productId)}`;
            }
        }

        card.addEventListener("click", (event) => {
            if (
                event.target.closest(".heart-btn") ||
                event.target.closest("a") ||
                event.target.closest("button")
            ) {
                return;
            }

            openProduct();
        });

        card.addEventListener("keydown", (event) => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                openProduct();
            }
        });
    });


    /* =========================================================
       HERO CTA
    ========================================================= */

    if (startShopping) {
        startShopping.addEventListener("click", (event) => {
            const productsSection = $("#products");

            if (!productsSection) return;

            event.preventDefault();

            productsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }


    /* =========================================================
       ACCOUNT MODAL
       FUTURE USE ONLY
    ========================================================= */

    const accountOrders = $("#accountOrders");
    const accountWishlist = $("#accountWishlist");
    const accountSettings = $("#accountSettings");
    const accountLogout = $("#accountLogout");

    if (accountOrders) {
        accountOrders.addEventListener("click", () => {
            showToast("Orders page will be connected after database setup.");
        });
    }

    if (accountWishlist) {
        accountWishlist.addEventListener("click", () => {
            showToast("Wishlist page will be connected later.");
        });
    }

    if (accountSettings) {
        accountSettings.addEventListener("click", () => {
            closeModal(accountModal);

            if (settingsModal) {
                openModal(settingsModal);
            }
        });
    }

    if (accountLogout) {
        accountLogout.addEventListener("click", () => {
            removeStorage(USER_KEY);

            updateAccountAvatar();

            closeModal(accountModal);

            showToast("You have been logged out.");
        });
    }


    /* =========================================================
       SETTINGS
    ========================================================= */

    const SETTINGS_KEY = "marteySettings";

    const settings = getJSON(SETTINGS_KEY, {
        darkMode: true,
        notifications: true
    });

    function saveSettings() {
        setJSON(SETTINGS_KEY, settings);
    }

    if (themeToggle) {
        themeToggle.checked = Boolean(settings.darkMode);

        themeToggle.addEventListener("change", () => {
            settings.darkMode = themeToggle.checked;

            document.body.classList.toggle(
                "light-theme",
                !settings.darkMode
            );

            saveSettings();

            showToast(
                settings.darkMode
                    ? "Dark mode enabled."
                    : "Light mode enabled."
            );
        });
    }

    if (notificationToggle) {
        notificationToggle.checked =
            Boolean(settings.notifications);

        notificationToggle.addEventListener("change", () => {
            settings.notifications =
                notificationToggle.checked;

            saveSettings();

            showToast(
                settings.notifications
                    ? "Notifications enabled."
                    : "Notifications disabled."
            );
        });
    }

    // Apply saved theme
    document.body.classList.toggle(
        "light-theme",
        !settings.darkMode
    );


    /* =========================================================
       IMAGE ERROR PROTECTION
    ========================================================= */

    $$("img").forEach((image) => {
        image.addEventListener("error", () => {
            image.classList.add("image-error");

            image.alt = "MARTEY product image";
        });
    });


    /* =========================================================
       INITIAL STATE
    ========================================================= */

    updateAccountAvatar();
    updateCartCount();
    updateWishlistButtons();
    filterProducts();


    /* =========================================================
       DEBUG
    ========================================================= */

    console.log(
        "MARTEY frontend initialized successfully."
    );
});
