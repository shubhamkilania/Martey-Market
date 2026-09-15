/* =========================================================
   MARTEY — Main Script
   Homepage functionality
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     HELPERS
     ========================================================= */

  const $ = (selector, parent = document) => parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  const safeJSONParse = (value, fallback) => {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  };

  const getStorage = (key, fallback) => {
    return safeJSONParse(localStorage.getItem(key), fallback);
  };

  const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  /* =========================================================
     STORAGE KEYS
     ========================================================= */

  const STORAGE = {
    USER: "marteyUser",
    CART: "marteyCart",
    WISHLIST: "marteyWishlist",
    THEME: "marteyTheme",
    NOTIFICATIONS: "marteyNotifications",
    RECENT: "marteyRecentlyViewed"
  };

  /* =========================================================
     BASIC ELEMENTS
     ========================================================= */

  const body = document.body;

  const searchInput = $("#searchInput");
  const searchButton = $("#searchButton");

  const cartButton = $("#cartButton");
  const wishlistButton = $("#wishlistButton");
  const accountButton = $("#accountButton");

  const cartCount = $("#cartCount");

  const productGrid = $("#productGrid");
  const emptyState = $("#emptyState");

  /* =========================================================
     TOAST
     ========================================================= */

  let toastTimer = null;

  function showToast(message) {
    let toast = $("#marteyToast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "marteyToast";
      toast.className = "martey-toast";

      Object.assign(toast.style, {
        position: "fixed",
        left: "50%",
        bottom: "28px",
        transform: "translateX(-50%) translateY(20px)",
        zIndex: "99999",
        opacity: "0",
        pointerEvents: "none",
        padding: "12px 18px",
        borderRadius: "12px",
        background: "#17131f",
        color: "#ffffff",
        border: "1px solid rgba(139,92,246,.35)",
        boxShadow: "0 12px 35px rgba(0,0,0,.35)",
        fontSize: "14px",
        transition: "all .25s ease"
      });

      body.appendChild(toast);
    }

    toast.textContent = message;

    clearTimeout(toastTimer);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });

    toastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(20px)";
    }, 2500);
  }

  /* =========================================================
     MODALS
     ========================================================= */

  const modalIds = [
    "#authModal",
    "#accountModal",
    "#settingsModal"
  ];

  function closeAllModals() {
    modalIds.forEach((id) => {
      const modal = $(id);

      if (modal) {
        modal.hidden = true;
        modal.classList.remove("active", "open");
      }
    });

    body.classList.remove("modal-open");
  }

  function openModal(selector) {
    const modal = $(selector);

    if (!modal) return;

    closeAllModals();

    modal.hidden = false;
    modal.classList.add("active", "open");

    body.classList.add("modal-open");
  }

  $$("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", closeAllModals);
  });

  modalIds.forEach((id) => {
    const modal = $(id);

    if (!modal) return;

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeAllModals();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });

  /* =========================================================
     AUTH MODAL
     ========================================================= */

  function switchAuth(type) {
    const loginForm = $("#loginForm");
    const signupForm = $("#signupForm");

    const loginTab = $('[data-auth="login"]');
    const signupTab = $('[data-auth="signup"]');

    if (type === "signup") {
      if (loginForm) loginForm.hidden = true;
      if (signupForm) signupForm.hidden = false;

      if (loginTab) loginTab.setAttribute("aria-selected", "false");
      if (signupTab) signupTab.setAttribute("aria-selected", "true");
    } else {
      if (loginForm) loginForm.hidden = false;
      if (signupForm) signupForm.hidden = true;

      if (loginTab) loginTab.setAttribute("aria-selected", "true");
      if (signupTab) signupTab.setAttribute("aria-selected", "false");
    }
  }

  $$("[data-auth]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.auth;

      if (type) {
        switchAuth(type);
      }
    });
  });

  $$("[data-auth-switch]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.authSwitch;

      if (type) {
        switchAuth(type);
      }
    });
  });

  /* =========================================================
     ACCOUNT BUTTON
     ========================================================= */

  if (accountButton) {
    accountButton.addEventListener("click", () => {
      const user = getStorage(STORAGE.USER, null);

      if (user && user.loggedIn) {
        openModal("#accountModal");
      } else {
        switchAuth("login");
        openModal("#authModal");
      }
    });
  }

  /* =========================================================
     SELLER / DELIVERY BUTTONS
     ========================================================= */

  function openSellerSignup() {
    switchAuth("signup");

    const sellerRole = $('[data-role="seller"]');

    if (sellerRole) {
      sellerRole.click();
    }

    openModal("#authModal");
  }

  function openDeliverySignup() {
    switchAuth("signup");

    const deliveryRole = $('[data-role="delivery"]');

    if (deliveryRole) {
      deliveryRole.click();
    }

    openModal("#authModal");
  }

  const sellerButton = $("#sellerButton");
  const footerSellerLink = $("#footerSellerLink");

  if (sellerButton) {
    sellerButton.addEventListener("click", openSellerSignup);
  }

  if (footerSellerLink) {
    footerSellerLink.addEventListener("click", (event) => {
      event.preventDefault();
      openSellerSignup();
    });
  }

  const deliveryButton = $("#deliveryButton");

  if (deliveryButton) {
    deliveryButton.addEventListener("click", openDeliverySignup);
  }

  /* =========================================================
     ROLE SELECTION
     ========================================================= */

  const roleButtons = $$("[data-role]");
  const storeNameGroup = $("#storeNameGroup");

  function updateRole(role) {
    roleButtons.forEach((button) => {
      const active = button.dataset.role === role;

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (storeNameGroup) {
      storeNameGroup.hidden = role !== "seller";
    }
  }

  roleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateRole(button.dataset.role);
    });
  });

  /* =========================================================
     SIGN UP
     ========================================================= */

  const signupForm = $("#signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = $("#signupName");
      const emailInput = $("#signupEmail");
      const phoneInput = $("#signupPhone");
      const passwordInput = $("#signupPassword");
      const storeInput = $("#signupStoreName");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";
      const storeName = storeInput ? storeInput.value.trim() : "";

      const selectedRole =
        $('[data-role].active')?.dataset.role ||
        $('[data-role][aria-pressed="true"]')?.dataset.role ||
        "customer";

      if (!name || !email || !password) {
        showToast("Please fill all required fields.");
        return;
      }

      const user = {
        name,
        email,
        phone,
        password,
        role: selectedRole,
        storeName,
        loggedIn: true,
        createdAt: new Date().toISOString()
      };

      setStorage(STORAGE.USER, user);

      updateAccountUI();

      closeAllModals();

      showToast("Welcome to MARTEY, " + name + "!");
    });
  }

  /* =========================================================
     LOGIN
     ========================================================= */

  const loginForm = $("#loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = $("#loginEmail");
      const passwordInput = $("#loginPassword");

      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";

      if (!email || !password) {
        showToast("Please enter email and password.");
        return;
      }

      const existingUser = getStorage(STORAGE.USER, null);

      const user = existingUser || {
        name: email.split("@")[0],
        email,
        role: "customer"
      };

      user.email = email;
      user.loggedIn = true;

      setStorage(STORAGE.USER, user);

      updateAccountUI();

      closeAllModals();

      showToast("Login successful.");
    });
  }

  /* =========================================================
     ACCOUNT UI
     ========================================================= */

  function getInitials(name) {
    if (!name) return "M";

    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  }

  function updateAccountUI() {
    const user = getStorage(STORAGE.USER, null);

    const avatarElements = $$(".avatar, [data-avatar]");
    const nameElements = $$("[data-user-name]");
    const emailElements = $$("[data-user-email]");

    if (user && user.loggedIn) {
      const initials = getInitials(user.name);

      avatarElements.forEach((element) => {
        element.textContent = initials;
      });

      nameElements.forEach((element) => {
        element.textContent = user.name || "MARTEY User";
      });

      emailElements.forEach((element) => {
        element.textContent = user.email || "";
      });
    }
  }

  /* =========================================================
     LOGOUT
     ========================================================= */

  function logout() {
    const user = getStorage(STORAGE.USER, null);

    if (user) {
      user.loggedIn = false;
      setStorage(STORAGE.USER, user);
    }

    closeAllModals();

    showToast("You have been logged out.");

    setTimeout(() => {
      updateAccountUI();
    }, 100);
  }

  const logoutButton = $("#logoutButton");
  const settingsLogoutButton = $("#settingsLogoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }

  if (settingsLogoutButton) {
    settingsLogoutButton.addEventListener("click", logout);
  }

  /* =========================================================
     SEARCH
     ========================================================= */

  function getProductCards() {
    if (!productGrid) return [];

    return $$(".product-card", productGrid);
  }

  function filterProducts(searchTerm = "") {
    const term = searchTerm.trim().toLowerCase();

    const cards = getProductCards();

    let visibleCount = 0;

    cards.forEach((card) => {
      const searchableText = (
        card.textContent +
        " " +
        (card.dataset.category || "") +
        " " +
        (card.dataset.name || "")
      ).toLowerCase();

      const matches = !term || searchableText.includes(term);

      card.hidden = !matches;

      if (matches) {
        visibleCount++;
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  }

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      filterProducts(searchInput ? searchInput.value : "");

      if (productGrid) {
        productGrid.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      filterProducts(searchInput.value);
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        filterProducts(searchInput.value);

        if (productGrid) {
          productGrid.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  }

  /* =========================================================
     CATEGORY FILTERING
     ========================================================= */

  $$("[data-category-filter]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const category = button.dataset.categoryFilter;

      if (!category || category === "all") {
        filterProducts("");
      } else {
        filterProducts(category);
      }

      if (productGrid) {
        productGrid.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* =========================================================
     VIEW ALL
     ========================================================= */

  $$("[data-view-all]").forEach((button) => {
    button.addEventListener("click", () => {
      filterProducts("");

      if (productGrid) {
        productGrid.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  $$("[data-view-all-categories]").forEach((button) => {
    button.addEventListener("click", () => {
      const categorySection =
        $("#categories") ||
        $(".categories-section") ||
        $("[data-categories-section]");

      if (categorySection) {
        categorySection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* =========================================================
     PRODUCT CARD NAVIGATION
     ========================================================= */

  function openProduct(productId) {
    if (!productId) return;

    saveRecentlyViewed(productId);

    window.location.href =
      "product.html?id=" +
      encodeURIComponent(productId);
  }

  getProductCards().forEach((card) => {
    const productId = card.dataset.productId;

    if (!productId) return;

    card.addEventListener("click", (event) => {
      const interactive = event.target.closest(
        "button, a, input, select, textarea"
      );

      if (interactive) return;

      openProduct(productId);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProduct(productId);
      }
    });
  });

  /* =========================================================
     RECENTLY VIEWED
     ========================================================= */

  function saveRecentlyViewed(productId) {
    let recent = getStorage(STORAGE.RECENT, []);

    if (!Array.isArray(recent)) {
      recent = [];
    }

    recent = recent.filter(
      (id) => String(id) !== String(productId)
    );

    recent.unshift(productId);

    recent = recent.slice(0, 10);

    setStorage(STORAGE.RECENT, recent);
  }

  /* =========================================================
     WISHLIST
     ========================================================= */

  function getWishlist() {
    const wishlist = getStorage(STORAGE.WISHLIST, []);

    return Array.isArray(wishlist) ? wishlist : [];
  }

  function saveWishlist(wishlist) {
    setStorage(STORAGE.WISHLIST, wishlist);
  }

  function updateWishlistButtons() {
    const wishlist = getWishlist();

    $$("[data-wishlist]").forEach((button) => {
      const id = button.dataset.wishlist;

      const active = wishlist.some(
        (item) => String(item) === String(id)
      );

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  $$("[data-wishlist]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const id = button.dataset.wishlist;

      if (!id) return;

      let wishlist = getWishlist();

      const exists = wishlist.some(
        (item) => String(item) === String(id)
      );

      if (exists) {
        wishlist = wishlist.filter(
          (item) => String(item) !== String(id)
        );

        showToast("Removed from wishlist.");
      } else {
        wishlist.push(id);

        showToast("Added to wishlist.");
      }

      saveWishlist(wishlist);
      updateWishlistButtons();
    });
  });

  if (wishlistButton) {
    wishlistButton.addEventListener("click", () => {
      const wishlist = getWishlist();

      if (wishlist.length === 0) {
        showToast("Your wishlist is empty.");
        return;
      }

      showToast(
        `${wishlist.length} item${wishlist.length > 1 ? "s" : ""} in wishlist.`
      );
    });
  }

  /* =========================================================
     CART
     ========================================================= */

  function getCart() {
    const cart = getStorage(STORAGE.CART, []);

    return Array.isArray(cart) ? cart : [];
  }

  function updateCartCount() {
    const cart = getCart();

    const total = cart.reduce((sum, item) => {
      const quantity = Number(item.quantity || 1);
      return sum + quantity;
    }, 0);

    if (cartCount) {
      cartCount.textContent = total;
      cartCount.hidden = total === 0;
    }
  }

  function addToCart(productId, quantity = 1) {
    if (!productId) return;

    const cart = getCart();

    const existing = cart.find(
      (item) => String(item.id) === String(productId)
    );

    if (existing) {
      existing.quantity =
        Number(existing.quantity || 1) + Number(quantity);
    } else {
      cart.push({
        id: productId,
        quantity: Number(quantity)
      });
    }

    setStorage(STORAGE.CART, cart);

    updateCartCount();

    showToast("Added to cart.");
  }

  $$("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const productId = button.dataset.addToCart;

      addToCart(productId);
    });
  });

  if (cartButton) {
    cartButton.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }

  /* =========================================================
     SETTINGS
     ========================================================= */

  const settingsButton = $("#settingsButton");

  if (settingsButton) {
    settingsButton.addEventListener("click", () => {
      openModal("#settingsModal");
    });
  }

  /* =========================================================
     THEME
     ========================================================= */

  const themeSelect = $("#themeSelect");

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      return;
    }

    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      return;
    }

    document.documentElement.removeAttribute("data-theme");
  }

  if (themeSelect) {
    const savedTheme =
      localStorage.getItem(STORAGE.THEME) || "dark";

    themeSelect.value = savedTheme;

    applyTheme(savedTheme);

    themeSelect.addEventListener("change", () => {
      const theme = themeSelect.value;

      localStorage.setItem(STORAGE.THEME, theme);

      applyTheme(theme);
    });
  } else {
    const savedTheme =
      localStorage.getItem(STORAGE.THEME) || "dark";

    applyTheme(savedTheme);
  }

  /* =========================================================
     HERO SHOP NOW
     ========================================================= */

  const startShopping = $("#startShopping");

  if (startShopping) {
    startShopping.addEventListener("click", () => {
      const productSection =
        $("#products") ||
        $("#productGrid") ||
        $(".products-section");

      if (productSection) {
        productSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }

  /* =========================================================
     GENERIC ACCOUNT BUTTONS
     ========================================================= */

  const ordersButton = $("#ordersButton");

  if (ordersButton) {
    ordersButton.addEventListener("click", () => {
      window.location.href = "orders.html";
    });
  }

  const wishlistAccountButton = $("#wishlistAccountButton");

  if (wishlistAccountButton) {
    wishlistAccountButton.addEventListener("click", () => {
      const wishlist = getWishlist();

      if (wishlist.length) {
        showToast(
          `${wishlist.length} item${wishlist.length > 1 ? "s" : ""} saved in wishlist.`
        );
      } else {
        showToast("Your wishlist is empty.");
      }
    });
  }

  const cartAccountButton = $("#cartAccountButton");

  if (cartAccountButton) {
    cartAccountButton.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }

  const recentButton = $("#recentButton");

  if (recentButton) {
    recentButton.addEventListener("click", () => {
      const recent = getStorage(STORAGE.RECENT, []);

      if (recent.length === 0) {
        showToast("No recently viewed products.");
      } else {
        showToast(
          `${recent.length} recently viewed product${recent.length > 1 ? "s" : ""}.`
        );
      }
    });
  }

  /* =========================================================
     PROFILE / SETTINGS PLACEHOLDERS
     ========================================================= */

  const editProfileButton = $("#editProfileButton");
  const settingsEditProfile = $("#settingsEditProfile");

  [editProfileButton, settingsEditProfile].forEach((button) => {
    if (!button) return;

    button.addEventListener("click", () => {
      showToast("Profile editing will be connected with the database later.");
    });
  });

  const loginSecurityButton = $("#loginSecurityButton");

  if (loginSecurityButton) {
    loginSecurityButton.addEventListener("click", () => {
      showToast("Security settings will be available after database setup.");
    });
  }

  const addressButton = $("#addressButton");

  if (addressButton) {
    addressButton.addEventListener("click", () => {
      showToast("Address management will be connected later.");
    });
  }

  const notificationsButton = $("#notificationsButton");

  if (notificationsButton) {
    notificationsButton.addEventListener("click", () => {
      showToast("Notification settings opened.");
    });
  }

  const orderUpdatesButton = $("#orderUpdatesButton");

  if (orderUpdatesButton) {
    orderUpdatesButton.addEventListener("click", () => {
      showToast("Order notification settings will be connected later.");
    });
  }

  const helpButton = $("#helpButton");

  if (helpButton) {
    helpButton.addEventListener("click", () => {
      showToast("MARTEY Help Center will be added later.");
    });
  }

  const reportButton = $("#reportButton");

  if (reportButton) {
    reportButton.addEventListener("click", () => {
      showToast("Report system will be connected later.");
    });
  }

  const privacyButton = $("#privacyButton");

  if (privacyButton) {
    privacyButton.addEventListener("click", () => {
      showToast("Privacy Policy page will be added later.");
    });
  }

  const termsButton = $("#termsButton");

  if (termsButton) {
    termsButton.addEventListener("click", () => {
      showToast("Terms & Conditions page will be added later.");
    });
  }

  const deleteAccountButton = $("#deleteAccountButton");

  if (deleteAccountButton) {
    deleteAccountButton.addEventListener("click", () => {
      const confirmed = window.confirm(
        "Are you sure you want to remove the local MARTEY account data?"
      );

      if (!confirmed) return;

      localStorage.removeItem(STORAGE.USER);

      closeAllModals();

      showToast("Local account data removed.");
    });
  }

  /* =========================================================
     IMAGE ERROR HANDLING
     ========================================================= */

  $$("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });
  });

  /* =========================================================
     INITIAL STATE
     ========================================================= */

  updateAccountUI();
  updateCartCount();
  updateWishlistButtons();

  /*
     Do NOT automatically filter products on page load.
     Homepage should show all products.
  */

  console.log("MARTEY script loaded successfully.");
});
