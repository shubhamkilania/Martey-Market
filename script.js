/* =========================================================
   MARTEY — Homepage Controller
   Prototype frontend: accounts, categories, search, wishlist,
   cart counter, product navigation and account avatar.
   ========================================================= */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const STORAGE = {
    accounts: "marteyAccounts",
    currentUser: "marteyCurrentUser",
    legacyUser: "marteyUser",
    cart: "marteyCart",
    wishlist: "marteyWishlist",
    recent: "marteyRecentlyViewed",
    theme: "marteyTheme"
  };

  const readJSON = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const writeJSON = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const toast = (message) => {
    const el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(window.__marteyToastTimer);
    window.__marteyToastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  };

  /* =========================================================
     ACCOUNT DATA / MIGRATION
     ========================================================= */

  function getAccounts() {
    let accounts = readJSON(STORAGE.accounts, []);
    if (!Array.isArray(accounts)) accounts = [];

    // Migrate the previous single-user storage format automatically.
    const legacy = readJSON(STORAGE.legacyUser, null);
    if (legacy && legacy.email && !accounts.some(a => a.email === legacy.email)) {
      accounts.push(legacy);
      writeJSON(STORAGE.accounts, accounts);
    }

    return accounts;
  }

  function getCurrentUser() {
    const current = readJSON(STORAGE.currentUser, null);
    if (current && current.email) return current;

    const legacy = readJSON(STORAGE.legacyUser, null);
    if (legacy && legacy.email) {
      writeJSON(STORAGE.currentUser, legacy);
      return legacy;
    }

    return null;
  }

  function saveCurrentUser(user) {
    if (user) {
      writeJSON(STORAGE.currentUser, user);
      writeJSON(STORAGE.legacyUser, user);
    } else {
      localStorage.removeItem(STORAGE.currentUser);
      localStorage.removeItem(STORAGE.legacyUser);
    }
  }

  function initials(name = "") {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "M";
    return parts.slice(0, 2).map(part => part[0]).join("").toUpperCase();
  }

  function updateAvatar(user = getCurrentUser()) {
    const avatar = $("#accountAvatar");
    const profileAvatar = $("#accountProfileAvatar");

    const render = (element) => {
      if (!element) return;
      element.innerHTML = "";

      if (user?.profileImage) {
        const img = document.createElement("img");
        img.src = user.profileImage;
        img.alt = "Profile picture";
        img.className = "user-dp";
        element.appendChild(img);
      } else if (user?.name) {
        const span = document.createElement("span");
        span.className = "user-initials";
        span.textContent = initials(user.name);
        element.appendChild(span);
      } else {
        const span = document.createElement("span");
        span.className = "default-avatar";
        span.textContent = "♙";
        element.appendChild(span);
      }
    };

    render(avatar);
    render(profileAvatar);
  }

  function updateAccountModal(user = getCurrentUser()) {
    const name = $("#accountName");
    const email = $("#accountEmail");
    const phone = $("#accountPhone");
    const role = $("#accountRole");

    if (!user) return;

    if (name) name.textContent = user.name || "MARTEY User";
    if (email) email.textContent = user.email || "";
    if (phone) phone.textContent = user.phone || "—";
    if (role) {
      const labels = {
        customer: "Customer",
        seller: "Seller",
        delivery: "Delivery Partner"
      };
      role.textContent = labels[user.role] || "Customer";
    }

    updateAvatar(user);
  }

  /* =========================================================
     MODALS
     ========================================================= */

  const modalIds = ["authModal", "accountModal", "settingsModal"];

  function closeModal(id) {
    const modal = $("#" + id);
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  function closeAllModals() {
    modalIds.forEach(closeModal);
    document.body.classList.remove("modal-open");
  }

  function openModal(id) {
    const modal = $("#" + id);
    if (!modal) return;

    closeAllModals();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  $$('[data-close-modal]').forEach(button => {
    button.addEventListener("click", () => closeModal(button.dataset.closeModal));
  });

  $$(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
      if (event.target === modal) closeModal(modal.id);
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeAllModals();
  });

  /* =========================================================
     AUTH LOGIN / CREATE ACCOUNT
     ========================================================= */

  const loginView = $("#loginView");
  const signupView = $("#signupView");
  const signupRole = $("#signupRole");
  const storeNameGroup = $("#storeNameGroup");
  const storeNameInput = $("#signupStoreName");

  function switchAuth(view) {
    const signup = view === "signup";

    if (loginView) loginView.classList.toggle("hidden", signup);
    if (signupView) signupView.classList.toggle("hidden", !signup);

    $$('[data-auth]').forEach(tab => {
      const active = tab.dataset.auth === view;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
  }

  function openAuth(view = "login") {
    switchAuth(view);
    openModal("authModal");
  }

  // Event delegation keeps Login/Create Account working even after UI changes.
  document.addEventListener("click", event => {
    const tab = event.target.closest("[data-auth]");
    if (tab) {
      switchAuth(tab.dataset.auth);
      return;
    }

    const switchButton = event.target.closest("[data-auth-switch]");
    if (switchButton) {
      switchAuth(switchButton.dataset.authSwitch);
    }
  });

  $("#accountButton")?.addEventListener("click", () => {
    const user = getCurrentUser();
    if (user) {
      updateAccountModal(user);
      openModal("accountModal");
    } else {
      openAuth("login");
    }
  });

  /* =========================================================
     ROLE SELECTOR
     ========================================================= */

  function setRole(role) {
    if (signupRole) signupRole.value = role;

    $$('[data-role]').forEach(button => {
      const selected = button.dataset.role === role;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    const seller = role === "seller";
    if (storeNameGroup) storeNameGroup.classList.toggle("hidden", !seller);
    if (storeNameInput) storeNameInput.required = seller;
  }

  $$('[data-role]').forEach(button => {
    button.addEventListener("click", () => setRole(button.dataset.role));
  });

  setRole(signupRole?.value || "customer");

  /* =========================================================
     PROFILE PHOTO
     ========================================================= */

  function readProfileImage(file, callback) {
    if (!file) {
      callback("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast("Please select an image file.");
      callback("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => callback(String(reader.result || ""));
    reader.onerror = () => callback("");
    reader.readAsDataURL(file);
  }

  /* =========================================================
     CREATE ACCOUNT
     ========================================================= */

  $("#signupForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const role = signupRole?.value || "customer";
    const name = $("#signupName")?.value.trim() || "";
    const email = $("#signupEmail")?.value.trim().toLowerCase() || "";
    const phone = $("#signupPhone")?.value.trim() || "";
    const password = $("#signupPassword")?.value || "";
    const storeName = storeNameInput?.value.trim() || "";
    const imageInput = $("#signupProfileImage");

    if (!name || !email || !phone || password.length < 6) {
      toast("Please complete all required fields.");
      return;
    }

    if (role === "seller" && !storeName) {
      toast("Please enter your store or brand name.");
      return;
    }

    const accounts = getAccounts();

    if (accounts.some(account => account.email === email)) {
      toast("An account with this email already exists.");
      switchAuth("login");
      $("#loginEmail") && ($("#loginEmail").value = email);
      return;
    }

    readProfileImage(imageInput?.files?.[0], profileImage => {
      const user = {
        id: "u_" + Date.now(),
        name,
        email,
        phone,
        password,
        role,
        storeName,
        profileImage,
        createdAt: new Date().toISOString()
      };

      accounts.push(user);
      writeJSON(STORAGE.accounts, accounts);
      saveCurrentUser(user);
      updateAccountModal(user);
      updateAvatar(user);
      closeAllModals();
      toast("Account created successfully.");
    });
  });

  /* =========================================================
     LOGIN
     ========================================================= */

  $("#loginForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const email = $("#loginEmail")?.value.trim().toLowerCase() || "";
    const password = $("#loginPassword")?.value || "";

    if (!email || !password) {
      toast("Please enter your email and password.");
      return;
    }

    const accounts = getAccounts();
    const account = accounts.find(item => item.email === email && item.password === password);

    if (!account) {
      toast("Email or password is incorrect.");
      return;
    }

    saveCurrentUser(account);
    updateAccountModal(account);
    updateAvatar(account);
    closeAllModals();
    toast("Welcome back to MARTEY.");
  });

  /* =========================================================
     SELLER / DELIVERY ENTRY
     ========================================================= */

  function openSellerSignup() {
    openAuth("signup");
    setRole("seller");
  }

  function openDeliverySignup() {
    openAuth("signup");
    setRole("delivery");
  }

  $("#sellButton")?.addEventListener("click", openSellerSignup);
  $("#sellerButton")?.addEventListener("click", openSellerSignup);
  $("#sellerEntry")?.addEventListener("click", openSellerSignup);
  $("#deliveryEntry")?.addEventListener("click", openDeliverySignup);

  $("#footerSellerLink")?.addEventListener("click", event => {
    event.preventDefault();
    openSellerSignup();
  });

  /* =========================================================
     CATEGORY NAV + SEARCH
     ========================================================= */

  const productCards = $$(".product-card");
  const productGrid = $("#productGrid");
  const emptyState = $("#emptyState");
  const searchInput = $("#searchInput");

  let activeCategory = "all";
  let activeQuery = "";

  function productText(card) {
    return [
      card.dataset.name || "",
      card.dataset.category || "",
      $(".product-category", card)?.textContent || "",
      $("h3", card)?.textContent || "",
      $(".product-badge", card)?.textContent || ""
    ].join(" ").toLowerCase();
  }

  function filterProducts(scroll = false) {
    let visible = 0;

    productCards.forEach(card => {
      const categoryMatch = activeCategory === "all" || card.dataset.category === activeCategory;
      const queryMatch = !activeQuery || productText(card).includes(activeQuery);
      const show = categoryMatch && queryMatch;

      card.classList.toggle("is-hidden", !show);
      card.setAttribute("aria-hidden", String(!show));
      if (show) visible++;
    });

    if (emptyState) emptyState.classList.toggle("hidden", visible !== 0);
    if (productGrid) productGrid.classList.toggle("has-results", visible !== 0);

    if (scroll) $("#products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setCategory(category, scroll = true) {
    activeCategory = category;

    $$(".category-link").forEach(button => {
      const active = button.dataset.category === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    filterProducts(scroll);
  }

  $$(".category-link").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      if (category === "more") {
        toast("More categories will be added as MARTEY grows.");
        return;
      }

      setCategory(category, true);
    });
  });

  $$(".category-card").forEach(card => {
    card.addEventListener("click", () => setCategory(card.dataset.category, true));
  });

  function performSearch() {
    activeQuery = searchInput?.value.trim().toLowerCase() || "";
    filterProducts(true);
  }

  $("#searchButton")?.addEventListener("click", performSearch);
  searchInput?.addEventListener("keydown", event => {
    if (event.key === "Enter") performSearch();
  });
  searchInput?.addEventListener("input", () => {
    activeQuery = searchInput.value.trim().toLowerCase();
    filterProducts(false);
  });

  $("#clearFilter")?.addEventListener("click", () => {
    activeQuery = "";
    if (searchInput) searchInput.value = "";
    setCategory("all", true);
  });

  $("#viewAllCategories")?.addEventListener("click", () => {
    setCategory("all", true);
  });

  $("#startShopping")?.addEventListener("click", () => {
    $("#products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* =========================================================
     PRODUCT NAVIGATION
     ========================================================= */

  function openProduct(card) {
    const id = card.dataset.productId;
    if (!id) {
      toast("This product is not configured yet.");
      return;
    }

    const recent = readJSON(STORAGE.recent, []);
    const next = [id, ...recent.filter(item => String(item) !== String(id))].slice(0, 10);
    writeJSON(STORAGE.recent, next);

    window.location.href = `product.html?id=${encodeURIComponent(id)}`;
  }

  productCards.forEach(card => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "link");

    card.addEventListener("click", event => {
      if (event.target.closest(".heart-btn")) return;
      openProduct(card);
    });

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProduct(card);
      }
    });
  });

  /* =========================================================
     WISHLIST
     ========================================================= */

  function getWishlist() {
    const value = readJSON(STORAGE.wishlist, []);
    return Array.isArray(value) ? value.map(String) : [];
  }

  function updateWishlistButton(button, active) {
    if (!button) return;
    button.textContent = active ? "♥" : "♡";
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", active ? "Remove from wishlist" : "Add to wishlist");
  }

  function syncWishlist() {
    const wishlist = getWishlist();
    $$(".heart-btn").forEach(button => {
      const card = button.closest(".product-card");
      updateWishlistButton(button, wishlist.includes(String(card?.dataset.productId)));
    });
  }

  $$(".heart-btn").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();

      const card = button.closest(".product-card");
      const id = card?.dataset.productId;
      if (!id) return;

      const wishlist = getWishlist();
      const index = wishlist.indexOf(String(id));

      if (index >= 0) {
        wishlist.splice(index, 1);
        updateWishlistButton(button, false);
        toast("Removed from wishlist.");
      } else {
        wishlist.unshift(String(id));
        updateWishlistButton(button, true);
        toast("Added to wishlist.");
      }

      writeJSON(STORAGE.wishlist, wishlist);
    });
  });

  $("#wishlistButton")?.addEventListener("click", () => {
    const count = getWishlist().length;
    toast(count ? `${count} item${count === 1 ? "" : "s"} in your wishlist.` : "Your wishlist is empty.");
  });

  /* =========================================================
     CART
     ========================================================= */

  function updateCartCount() {
    const cart = readJSON(STORAGE.cart, []);
    const items = Array.isArray(cart) ? cart : [];
    const count = items.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
    const badge = $("#cartCount");
    if (badge) badge.textContent = String(count);
  }

  $("#cartButton")?.addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  /* =========================================================
     ACCOUNT MODAL ACTIONS
     ========================================================= */

  $("#settingsButton")?.addEventListener("click", () => {
    closeModal("accountModal");
    openModal("settingsModal");
  });

  function logout() {
    saveCurrentUser(null);
    updateAvatar(null);
    closeAllModals();
    toast("You have been logged out.");
  }

  $("#logoutButton")?.addEventListener("click", logout);
  $("#settingsLogoutButton")?.addEventListener("click", logout);

  $("#ordersButton")?.addEventListener("click", () => toast("Orders will be connected with the database later."));
  $("#wishlistAccountButton")?.addEventListener("click", () => toast(`${getWishlist().length} item(s) in wishlist.`));
  $("#cartAccountButton")?.addEventListener("click", () => { window.location.href = "cart.html"; });
  $("#reviewsButton")?.addEventListener("click", () => toast("Reviews will be connected later."));
  $("#recentButton")?.addEventListener("click", () => {
    const recent = readJSON(STORAGE.recent, []);
    toast(recent.length ? `${recent.length} recently viewed product(s).` : "No recently viewed products.");
  });

  ["#editProfileButton", "#settingsEditProfile", "#loginSecurityButton", "#addressButton", "#notificationsButton", "#orderUpdatesButton", "#helpButton", "#reportButton", "#privacyButton", "#termsButton"].forEach(selector => {
    $(selector)?.addEventListener("click", () => toast("This section will be connected with the database later."));
  });

  $("#deleteAccountButton")?.addEventListener("click", () => {
    const user = getCurrentUser();
    if (!user) return;

    const accounts = getAccounts().filter(account => account.email !== user.email);
    writeJSON(STORAGE.accounts, accounts);
    saveCurrentUser(null);
    updateAvatar(null);
    closeAllModals();
    toast("Account removed from this browser.");
  });

  /* =========================================================
     THEME
     ========================================================= */

  const themeSelect = $("#themeSelect");

  function applyTheme(theme) {
    const finalTheme = theme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme;

    document.body.classList.toggle("light-theme", finalTheme === "light");
    if (themeSelect) themeSelect.value = theme;
  }

  const savedTheme = localStorage.getItem(STORAGE.theme) || "dark";
  applyTheme(savedTheme);

  themeSelect?.addEventListener("change", () => {
    localStorage.setItem(STORAGE.theme, themeSelect.value);
    applyTheme(themeSelect.value);
  });

  /* =========================================================
     INITIAL STATE
     ========================================================= */

  updateAvatar();
  updateAccountModal();
  updateCartCount();
  syncWishlist();
  setCategory("all", false);

  console.log("MARTEY: homepage script loaded successfully.");
})();
