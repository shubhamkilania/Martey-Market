document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    const productCards =
        document.querySelectorAll(".product-card");

    const categoryLinks =
        document.querySelectorAll(".category-link");

    const categoryCards =
        document.querySelectorAll(".category-card");

    const cartCount =
        document.getElementById("cartCount");

    const cartButton =
        document.getElementById("cartButton");

    const wishlistButton =
        document.getElementById("wishlistButton");

    const accountButton =
        document.getElementById("accountButton");

    const startShopping =
        document.getElementById("startShopping");

    const sellButton =
        document.getElementById("sellButton");

    const sellerButton =
        document.getElementById("sellerButton");

    const clearFilter =
        document.getElementById("clearFilter");

    const toast =
        document.getElementById("toast");

    const emptyState =
        document.getElementById("emptyState");

    const productsSection =
        document.getElementById("products");


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer;

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);
    }


    /* =====================================================
       CART
    ===================================================== */

    let cart =
        JSON.parse(
            localStorage.getItem("marteyCart")
        ) || [];


    function updateCartCount() {

        if (cartCount) {

            cartCount.textContent =
                cart.length;

        }

        localStorage.setItem(
            "marteyCart",
            JSON.stringify(cart)
        );
    }


    updateCartCount();


    document.querySelectorAll(".add-cart")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".product-card"
                        );

                    if (!card) return;


                    const nameElement =
                        card.querySelector("h3");

                    const priceElement =
                        card.querySelector(
                            ".price-row strong"
                        );


                    if (
                        !nameElement ||
                        !priceElement
                    ) {
                        return;
                    }


                    const productName =
                        nameElement.textContent.trim();

                    const productPrice =
                        priceElement.textContent.trim();


                    cart.push({

                        name: productName,

                        price: productPrice

                    });


                    updateCartCount();


                    showToast(
                        productName +
                        " added to cart"
                    );

                }
            );

        });


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    "cart.html";

            }
        );

    }


    /* =====================================================
       WISHLIST
    ===================================================== */

    let wishlist =
        JSON.parse(
            localStorage.getItem(
                "marteyWishlist"
            )
        ) || [];


    document.querySelectorAll(".heart-btn")
        .forEach(button => {

            const card =
                button.closest(
                    ".product-card"
                );

            if (!card) return;


            const nameElement =
                card.querySelector("h3");

            if (!nameElement) return;


            const productName =
                nameElement.textContent.trim();


            /*
               Restore wishlist state
            */

            if (
                wishlist.includes(
                    productName
                )
            ) {

                button.classList.add(
                    "active"
                );

                button.textContent = "♥";

            }


            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "active"
                    );


                    if (
                        button.classList.contains(
                            "active"
                        )
                    ) {

                        button.textContent =
                            "♥";


                        if (
                            !wishlist.includes(
                                productName
                            )
                        ) {

                            wishlist.push(
                                productName
                            );

                        }


                        showToast(
                            "Added to wishlist"
                        );

                    } else {

                        button.textContent =
                            "♡";


                        wishlist =
                            wishlist.filter(
                                item =>
                                    item !==
                                    productName
                            );


                        showToast(
                            "Removed from wishlist"
                        );

                    }


                    localStorage.setItem(
                        "marteyWishlist",
                        JSON.stringify(
                            wishlist
                        )
                    );

                }
            );

        });


    /* =====================================================
       SEARCH
    ===================================================== */

    function searchProducts() {

        if (!searchInput) return;


        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        let visibleProducts = 0;


        productCards.forEach(card => {

            const nameElement =
                card.querySelector("h3");

            if (!nameElement) return;


            const name =
                nameElement.textContent
                    .toLowerCase();


            const category =
                (
                    card.dataset.category ||
                    ""
                ).toLowerCase();


            if (
                name.includes(query) ||
                category.includes(query)
            ) {

                card.style.display = "";

                visibleProducts++;

            } else {

                card.style.display =
                    "none";

            }

        });


        if (emptyState) {

            emptyState.classList.toggle(
                "show",
                visibleProducts === 0
            );

        }

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchProducts
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    searchProducts();

                }

            }
        );

    }


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    function filterCategory(category) {

        let visibleProducts = 0;


        productCards.forEach(card => {

            const cardCategory =
                card.dataset.category;


            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display = "";

                visibleProducts++;

            } else {

                card.style.display =
                    "none";

            }

        });


        if (emptyState) {

            emptyState.classList.toggle(
                "show",
                visibleProducts === 0
            );

        }

    }


    categoryLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                categoryLinks.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                link.classList.add(
                    "active"
                );


                if (searchInput) {

                    searchInput.value = "";

                }


                filterCategory(
                    link.dataset.category
                );


                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    categoryCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const category =
                    card.dataset.category;


                categoryLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.dataset.category ===
                        category
                    );

                });


                filterCategory(category);


                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    /* =====================================================
       VIEW ALL
    ===================================================== */

    if (clearFilter) {

        clearFilter.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value = "";

                }


                categoryLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.dataset.category ===
                        "all"
                    );

                });


                filterCategory("all");

            }
        );

    }


    /* =====================================================
       START SHOPPING
    ===================================================== */

    if (startShopping) {

        startShopping.addEventListener(
            "click",
            () => {

                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =====================================================
       ACCOUNT SYSTEM
    ===================================================== */

    let marteyUser =
        JSON.parse(
            localStorage.getItem(
                "marteyUser"
            )
        ) || null;


    function getInitials(name) {

        if (!name) return "M";


        const words =
            name.trim().split(" ");


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


    /* =====================================================
       ACCOUNT AVATAR
    ===================================================== */

    function updateAccountAvatar() {

        if (!accountButton) return;


        let avatar =
            accountButton.querySelector(
                ".account-avatar"
            );


        /*
           If new HTML does not yet contain
           .account-avatar, create it.
        */

        if (!avatar) {

            avatar =
                document.createElement(
                    "div"
                );

            avatar.className =
                "account-avatar";

            accountButton.innerHTML = "";

            accountButton.appendChild(
                avatar
            );

        }


        if (
            marteyUser &&
            marteyUser.avatar
        ) {

            avatar.innerHTML =
                `<img src="${marteyUser.avatar}"
                 alt="Profile picture">`;

        } else if (marteyUser) {

            avatar.textContent =
                getInitials(
                    marteyUser.name
                );

        } else {

            avatar.textContent = "M";

        }

    }


    updateAccountAvatar();


    /* =====================================================
       FIND MODALS
    ===================================================== */

    const authModal =
        document.getElementById(
            "authModal"
        );

    const accountModal =
        document.getElementById(
            "accountModal"
        );

    const settingsModal =
        document.getElementById(
            "settingsModal"
        );


    function openModal(modal) {

        if (!modal) return;

        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }


    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("show");

        document.body.style.overflow =
            "";

    }


    function closeAllModals() {

        document
            .querySelectorAll(".modal.show")
            .forEach(modal => {

                modal.classList.remove(
                    "show"
                );

            });

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       CLOSE BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".modal-close")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    closeAllModals();

                }
            );

        });


    /*
       Close when clicking outside modal
    */

    document
        .querySelectorAll(".modal")
        .forEach(modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        closeModal(modal);

                    }

                }
            );

        });


    /*
       Escape key
    */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeAllModals();

            }

        }
    );


    /* =====================================================
       ACCOUNT BUTTON
    ===================================================== */

    if (accountButton) {

        accountButton.addEventListener(
            "click",
            () => {

                if (marteyUser) {

                    if (accountModal) {

                        updateAccountPanel();

                        openModal(
                            accountModal
                        );

                    } else {

                        showToast(
                            "Account panel is being prepared"
                        );

                    }

                } else {

                    if (authModal) {

                        openModal(authModal);

                    } else {

                        showToast(
                            "Login / Signup is being prepared"
                        );

                    }

                }

            }
        );

    }


    /* =====================================================
       AUTH TABS
    ===================================================== */

    const authTabs =
        document.querySelectorAll(
            ".auth-tab"
        );

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    const signupForm =
        document.getElementById(
            "signupForm"
        );


    authTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                authTabs.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                tab.classList.add(
                    "active"
                );


                const type =
                    tab.dataset.auth;


                if (loginForm) {

                    loginForm.style.display =
                        type === "login"
                            ? "block"
                            : "none";

                }


                if (signupForm) {

                    signupForm.style.display =
                        type === "signup"
                            ? "block"
                            : "none";

                }

            }
        );

    });


    /* =====================================================
       ROLE SELECTION
    ===================================================== */

    let selectedRole = "customer";


    const roleOptions =
        document.querySelectorAll(
            ".role-option"
        );


    roleOptions.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                roleOptions.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                option.classList.add(
                    "active"
                );


                selectedRole =
                    option.dataset.role ||
                    "customer";

            }
        );

    });


    /* =====================================================
       OPEN SIGNUP WITH SPECIFIC ROLE
    ===================================================== */

    function openSignup(role = "customer") {

        selectedRole = role;


        if (authModal) {

            openModal(authModal);

        }


        /*
           Switch to signup tab
        */

        const signupTab =
            document.querySelector(
                '.auth-tab[data-auth="signup"]'
            );


        if (signupTab) {

            signupTab.click();

        }


        /*
           Select role
        */

        roleOptions.forEach(option => {

            const isSelected =
                option.dataset.role ===
                role;


            option.classList.toggle(
                "active",
                isSelected
            );

        });

    }


    if (sellButton) {

        sellButton.addEventListener(
            "click",
            () => {

                openSignup("seller");

            }
        );

    }


    if (sellerButton) {

        sellerButton.addEventListener(
            "click",
            () => {

                openSignup("seller");

            }
        );

    }


    /* =====================================================
       SIGNUP
    ===================================================== */

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "signupName"
                    )?.value.trim();


                const email =
                    document.getElementById(
                        "signupEmail"
                    )?.value.trim();


                const phone =
                    document.getElementById(
                        "signupPhone"
                    )?.value.trim();


                if (!name || !email) {

                    showToast(
                        "Please enter your name and email"
                    );

                    return;

                }


                /*
                   Demo frontend account.

                   Passwords are intentionally
                   NOT stored in localStorage.
                   Real authentication will be
                   added with the backend later.
                */

                marteyUser = {

                    name: name,

                    email: email,

                    phone: phone || "",

                    role: selectedRole,

                    avatar: "",

                    createdAt:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "marteyUser",
                    JSON.stringify(
                        marteyUser
                    )
                );


                updateAccountAvatar();


                closeModal(authModal);


                showToast(
                    "Welcome to MARTEY, " +
                    name
                );

            }
        );

    }


    /* =====================================================
       LOGIN
    ===================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "loginEmail"
                    )?.value.trim();


                if (!email) {

                    showToast(
                        "Please enter your email"
                    );

                    return;

                }


                /*
                   Frontend demo login.

                   Real password authentication
                   will be connected to backend
                   later.
                */

                if (
                    marteyUser &&
                    marteyUser.email === email
                ) {

                    closeModal(authModal);

                    updateAccountAvatar();

                    showToast(
                        "Welcome back!"
                    );

                } else {

                    showToast(
                        "Account not found. Please sign up first."
                    );

                }

            }
        );

    }


    /* =====================================================
       ACCOUNT PANEL
    ===================================================== */

    function updateAccountPanel() {

        if (!marteyUser) return;


        const name =
            document.getElementById(
                "accountName"
            );

        const email =
            document.getElementById(
                "accountEmail"
            );

        const phone =
            document.getElementById(
                "accountPhone"
            );

        const role =
            document.getElementById(
                "accountRole"
            );

        const avatar =
            document.getElementById(
                "accountProfileAvatar"
            );


        if (name) {

            name.textContent =
                marteyUser.name || "MARTEY User";

        }


        if (email) {

            email.textContent =
                marteyUser.email || "";

        }


        if (phone) {

            phone.textContent =
                marteyUser.phone || "";

        }


        if (role) {

            role.textContent =
                marteyUser.role ||
                "customer";

        }


        if (avatar) {

            if (marteyUser.avatar) {

                avatar.innerHTML =
                    `<img src="${marteyUser.avatar}"
                     alt="Profile picture">`;

            } else {

                avatar.textContent =
                    getInitials(
                        marteyUser.name
                    );

            }

        }

    }


    /* =====================================================
       EDIT PROFILE
    ===================================================== */

    const editProfileButton =
        document.getElementById(
            "editProfileButton"
        );


    if (editProfileButton) {

        editProfileButton.addEventListener(
            "click",
            () => {

                /*
                   We will create profile.html
                   separately.
                */

                window.location.href =
                    "profile.html";

            }
        );

    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    const settingsButton =
        document.getElementById(
            "settingsButton"
        );


    if (settingsButton) {

        settingsButton.addEventListener(
            "click",
            () => {

                closeModal(accountModal);

                openModal(settingsModal);

            }
        );

    }


    /* =====================================================
       THEME SYSTEM
    ===================================================== */

    const savedTheme =
        localStorage.getItem(
            "marteyTheme"
        ) || "dark";


    function applyTheme(theme) {

        if (theme === "light") {

            document.body.classList.add(
                "light-theme"
            );

        } else if (theme === "system") {

            const prefersLight =
                window.matchMedia(
                    "(prefers-color-scheme: light)"
                ).matches;


            document.body.classList.toggle(
                "light-theme",
                prefersLight
            );

        } else {

            document.body.classList.remove(
                "light-theme"
            );

        }

    }


    applyTheme(savedTheme);


    const themeSelect =
        document.getElementById(
            "themeSelect"
        );


    if (themeSelect) {

        themeSelect.value =
            savedTheme;


        themeSelect.addEventListener(
            "change",
            () => {

                const theme =
                    themeSelect.value;


                localStorage.setItem(
                    "marteyTheme",
                    theme
                );


                applyTheme(theme);


                showToast(
                    "Theme updated"
                );

            }
        );

    }


    /*
       Update automatically if
       system theme changes.
    */

    window
        .matchMedia(
            "(prefers-color-scheme: light)"
        )
        .addEventListener(
            "change",
            () => {

                const currentTheme =
                    localStorage.getItem(
                        "marteyTheme"
                    );

                if (
                    currentTheme === "system"
                ) {

                    applyTheme("system");

                }

            }
        );


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                marteyUser = null;


                localStorage.removeItem(
                    "marteyUser"
                );

// ===============================
// ACCOUNT BUTTON
// ===============================

const accountButton = document.getElementById("accountButton");

if (accountButton) {
    accountButton.addEventListener("click", () => {
        window.location.href = "account.html";
    });
}
    /* =====================================================
       INITIALIZE ACCOUNT STATE
    ===================================================== */

    if (marteyUser) {

        updateAccountAvatar();

    }


});
