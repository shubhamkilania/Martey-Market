document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       STORAGE HELPERS
    ================================= */

    function getJSON(key, fallback) {
        try {
            const value = localStorage.getItem(key);

            if (!value) {
                return fallback;
            }

            return JSON.parse(value);

        } catch (error) {
            return fallback;
        }
    }


    function setJSON(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }


    /* ================================
       ACCOUNT DATA
    ================================= */

    const currentUser = getJSON("marteyCurrentUser", null);

    const legacyUser = getJSON("marteyUser", null);

    let accountUser = currentUser || legacyUser || null;


    function getUserName() {

        if (!accountUser) {
            return "";
        }

        return (
            accountUser.name ||
            accountUser.fullName ||
            accountUser.username ||
            ""
        ).trim();
    }


    function getUserEmail() {

        if (!accountUser) {
            return "";
        }

        return (
            accountUser.email ||
            ""
        ).trim();
    }


    function getUserMobile() {

        if (!accountUser) {
            return "";
        }

        return (
            accountUser.mobile ||
            accountUser.phone ||
            ""
        ).trim();
    }


    function getUserPhoto() {

        if (!accountUser) {
            return "";
        }

        return (
            accountUser.profilePicture ||
            accountUser.profilePhoto ||
            accountUser.photo ||
            ""
        );
    }


    /* ================================
       PROFILE ELEMENTS
    ================================= */

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");

    const displayName = document.getElementById("displayName");
    const displayEmail = document.getElementById("displayEmail");
    const displayMobile = document.getElementById("displayMobile");

    const profileAvatarLetter =
        document.getElementById("profileAvatarLetter");

    const profileAvatarImage =
        document.getElementById("profileAvatarImage");


    function getInitial(name) {

        if (!name) {
            return "M";
        }

        return name
            .trim()
            .charAt(0)
            .toUpperCase();
    }


    function renderProfile() {

        const name = getUserName();
        const email = getUserEmail();
        const mobile = getUserMobile();
        const photo = getUserPhoto();


        profileName.textContent =
            name || "MARTEY Customer";


        profileEmail.textContent =
            email || "Your email will appear here";


        displayName.textContent =
            name || "Not added";


        displayEmail.textContent =
            email || "Not added";


        displayMobile.textContent =
            mobile || "Not added";


        profileAvatarLetter.textContent =
            getInitial(name);


        if (photo) {

            profileAvatarImage.src = photo;

            profileAvatarImage.style.display = "block";

            profileAvatarLetter.style.display = "none";

        } else {

            profileAvatarImage.removeAttribute("src");

            profileAvatarImage.style.display = "none";

            profileAvatarLetter.style.display = "block";
        }
    }


    renderProfile();


    /* ================================
       EDIT PROFILE
    ================================= */

    const editProfileButton =
        document.getElementById("editProfileButton");

    const editProfileCard =
        document.getElementById("editProfileCard");

    const profileForm =
        document.getElementById("profileForm");

    const cancelProfileButton =
        document.getElementById("cancelProfileButton");


    const profileNameInput =
        document.getElementById("profileNameInput");

    const profileEmailInput =
        document.getElementById("profileEmailInput");

    const profileMobileInput =
        document.getElementById("profileMobileInput");


    function fillProfileForm() {

        profileNameInput.value = getUserName();

        profileEmailInput.value = getUserEmail();

        profileMobileInput.value = getUserMobile();
    }


    editProfileButton.addEventListener("click", function () {

        fillProfileForm();

        editProfileCard.classList.add("open");

        editProfileCard.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });


    cancelProfileButton.addEventListener("click", function () {

        editProfileCard.classList.remove("open");
    });


    profileForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            profileNameInput.value.trim();

        const email =
            profileEmailInput.value.trim();

        const mobile =
            profileMobileInput.value.trim();


        if (!name) {

            alert("Please enter your name.");

            return;
        }


        if (!email) {

            alert("Please enter your email.");

            return;
        }


        if (!accountUser) {

            accountUser = {
                name: name,
                email: email,
                mobile: mobile,
                role: "customer"
            };

        } else {

            accountUser.name = name;

            accountUser.email = email;

            accountUser.mobile = mobile;
        }


        setJSON("marteyCurrentUser", accountUser);

        setJSON("marteyUser", accountUser);


        renderProfile();

        editProfileCard.classList.remove("open");


        alert("Profile updated successfully.");
    });


    /* ================================
       ACCOUNT NAVIGATION
    ================================= */

    const navItems =
        document.querySelectorAll(".account-nav-item[data-section]");

    const sections =
        document.querySelectorAll(".account-section");


    function showSection(sectionName) {

        navItems.forEach(function (item) {

            item.classList.toggle(
                "active",
                item.dataset.section === sectionName
            );
        });


        sections.forEach(function (section) {

            section.classList.toggle(
                "active",
                section.id === sectionName + "Section"
            );
        });


        if (sectionName === "wishlist") {
            renderWishlist();
        }


        if (sectionName === "addresses") {
            renderAddresses();
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    navItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const sectionName =
                item.dataset.section;

            showSection(sectionName);
        });
    });


    /* ================================
       CART
    ================================= */

    const accountCartCount =
        document.getElementById("accountCartCount");


    function getCart() {

        const possibleKeys = [
            "marteyCart",
            "cart"
        ];


        for (const key of possibleKeys) {

            const value =
                getJSON(key, null);

            if (Array.isArray(value)) {
                return value;
            }
        }


        return [];
    }


    function updateCartCount() {

        if (!accountCartCount) {
            return;
        }


        const cart =
            getCart();


        let count = 0;


        cart.forEach(function (item) {

            const quantity =
                Number(item.quantity || 1);

            count += quantity;
        });


        if (count > 0) {

            accountCartCount.textContent = count;

            accountCartCount.style.display = "flex";

        } else {

            accountCartCount.style.display = "none";
        }
    }


    updateCartCount();


    /* ================================
       WISHLIST
    ================================= */

    const wishlistGrid =
        document.getElementById("wishlistGrid");

    const wishlistEmptyState =
        document.getElementById("wishlistEmptyState");


    function getWishlist() {

        const possibleKeys = [
            "marteyWishlist",
            "wishlist"
        ];


        for (const key of possibleKeys) {

            const value =
                getJSON(key, null);

            if (Array.isArray(value)) {
                return value;
            }
        }


        return [];
    }


    function renderWishlist() {

        if (!wishlistGrid) {
            return;
        }


        const wishlist =
            getWishlist();


        if (!wishlist.length) {

            wishlistGrid.innerHTML = "";

            wishlistEmptyState.style.display =
                "flex";

            return;
        }


        wishlistEmptyState.style.display =
            "none";


        wishlistGrid.innerHTML =
            wishlist.map(function (product) {

                const image =
                    product.image ||
                    product.imageUrl ||
                    product.productImage ||
                    "images/product-placeholder.jpg";


                const name =
                    product.name ||
                    "MARTEY Product";


                const price =
                    product.price ||
                    product.sellingPrice ||
                    "";


                return `
                    <a
                        href="product.html?id=${encodeURIComponent(product.id || "")}"
                        class="wishlist-card"
                    >

                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(name)}"
                            onerror="this.style.display='none'"
                        >

                        <div class="wishlist-card-info">

                            <h3>
                                ${escapeHTML(name)}
                            </h3>

                            ${
                                price
                                ? `<p>₹${escapeHTML(String(price))}</p>`
                                : ""
                            }

                        </div>

                    </a>
                `;

            }).join("");
    }


    /* ================================
       ADDRESS SYSTEM
    ================================= */

    const addressList =
        document.getElementById("addressList");

    const addressFormCard =
        document.getElementById("addressFormCard");

    const addAddressButton =
        document.getElementById("addAddressButton");

    const cancelAddressButton =
        document.getElementById("cancelAddressButton");

    const addressForm =
        document.getElementById("addressForm");


    function getAddresses() {

        return getJSON(
            "marteyCustomerAddresses",
            []
        );
    }


    function renderAddresses() {

        if (!addressList) {
            return;
        }


        const addresses =
            getAddresses();


        if (!addresses.length) {

            addressList.innerHTML = `
                <div class="empty-account-state">
                    <div class="empty-icon">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11Z"/>
                            <circle cx="12" cy="10" r="2.3"/>
                        </svg>
                    </div>

                    <h3>No saved addresses</h3>

                    <p>
                        Add an address to use for future MARTEY orders.
                    </p>
                </div>
            `;

            return;
        }


        addressList.innerHTML =
            addresses.map(function (address, index) {

                return `
                    <div class="address-card">

                        <h3>
                            ${escapeHTML(address.name)}
                        </h3>

                        <p>
                            ${escapeHTML(address.line)}
                            <br>
                            ${escapeHTML(address.city)},
                            ${escapeHTML(address.state)}
                            ${escapeHTML(address.pincode)}
                            <br>
                            ${escapeHTML(address.phone)}
                        </p>

                        <button
                            type="button"
                            class="delete-address-button"
                            data-address-index="${index}"
                        >
                            Remove Address
                        </button>

                    </div>
                `;

            }).join("");


        const deleteButtons =
            document.querySelectorAll(
                "[data-address-index]"
            );


        deleteButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.dataset.addressIndex);


                const addresses =
                    getAddresses();


                addresses.splice(index, 1);


                setJSON(
                    "marteyCustomerAddresses",
                    addresses
                );


                renderAddresses();
            });
        });
    }


    addAddressButton.addEventListener(
        "click",
        function () {

            addressForm.reset();

            addressFormCard.classList.add("open");

            addressFormCard.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    );


    cancelAddressButton.addEventListener(
        "click",
        function () {

            addressFormCard.classList.remove("open");
        }
    );


    addressForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const newAddress = {

                name:
                    document.getElementById("addressName")
                        .value.trim(),

                phone:
                    document.getElementById("addressPhone")
                        .value.trim(),

                line:
                    document.getElementById("addressLine")
                        .value.trim(),

                city:
                    document.getElementById("addressCity")
                        .value.trim(),

                state:
                    document.getElementById("addressState")
                        .value.trim(),

                pincode:
                    document.getElementById("addressPincode")
                        .value.trim()
            };


            const addresses =
                getAddresses();


            addresses.push(newAddress);


            setJSON(
                "marteyCustomerAddresses",
                addresses
            );


            addressForm.reset();

            addressFormCard.classList.remove("open");

            renderAddresses();


            alert("Address saved successfully.");
        }
    );


    /* ================================
       SETTINGS / THEME
    ================================= */

    const themeButton =
        document.getElementById("themeButton");


    function applySavedTheme() {

        const theme =
            localStorage.getItem(
                "marteyTheme"
            );


        if (theme === "light") {

            document.body.classList.add(
                "light-mode"
            );

        } else {

            document.body.classList.remove(
                "light-mode"
            );
        }
    }


    applySavedTheme();


    themeButton.addEventListener(
        "click",
        function () {

            const isLight =
                document.body.classList.toggle(
                    "light-mode"
                );


            localStorage.setItem(
                "marteyTheme",
                isLight ? "light" : "dark"
            );
        }
    );


    /* ================================
       LOGOUT
    ================================= */

    const logoutButton =
        document.getElementById("logoutButton");


    logoutButton.addEventListener(
        "click",
        function () {

            const shouldLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!shouldLogout) {
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


    /* ================================
       STORAGE SYNC
    ================================= */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key === "marteyCurrentUser" ||
                event.key === "marteyUser"
            ) {

                accountUser =
                    getJSON(
                        "marteyCurrentUser",
                        null
                    ) ||
                    getJSON(
                        "marteyUser",
                        null
                    );


                renderProfile();
            }


            if (
                event.key === "marteyCart" ||
                event.key === "cart"
            ) {

                updateCartCount();
            }


            if (
                event.key === "marteyWishlist" ||
                event.key === "wishlist"
            ) {

                renderWishlist();
            }


            if (
                event.key === "marteyCustomerAddresses"
            ) {

                renderAddresses();
            }

        }
    );


    /* ================================
       ESCAPE HTML
    ================================= */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* ================================
       INITIAL LOAD
    ================================= */

    renderWishlist();

    renderAddresses();

});
