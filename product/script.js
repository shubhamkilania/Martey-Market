const products = [

    {
        id: 1001,
        name: "Fresh Milk",
        category: "Milk & Dairy",
        size: "1 L",
        price: 62,
        mrp: 68,
        rating: 4.6,
        image: "../assets/products/milk.jpg",
        description:
            "A quality everyday milk product selected for convenient and reliable shopping through MARTEY."
    },

    {
        id: 1002,
        name: "Classic White Bread",
        category: "Bakery",
        size: "400 g",
        price: 45,
        mrp: 50,
        rating: 4.5,
        image: "../assets/products/bread.jpg",
        description:
            "A fresh everyday bakery essential suitable for breakfast, snacks and quick meals."
    },

    {
        id: 1003,
        name: "Orange Fruit Drink",
        category: "Drinks",
        size: "1 L",
        price: 85,
        mrp: 100,
        rating: 4.4,
        image: "../assets/products/orange-drink.jpg",
        description:
            "A refreshing fruit drink for everyday moments and quick refreshment."
    },

    {
        id: 1004,
        name: "Classic Potato Chips",
        category: "Snacks",
        size: "100 g",
        price: 30,
        mrp: 35,
        rating: 4.5,
        image: "../assets/products/chips.jpg",
        description:
            "Crispy potato chips made for convenient snacking throughout the day."
    },

    {
        id: 1005,
        name: "Fresh Bananas",
        category: "Fresh",
        size: "1 kg",
        price: 55,
        mrp: 65,
        rating: 4.7,
        image: "../assets/products/bananas.jpg",
        description:
            "Fresh bananas selected for everyday household consumption."
    },

    {
        id: 1006,
        name: "Daily Care Shampoo",
        category: "Personal Care",
        size: "180 ml",
        price: 149,
        mrp: 175,
        rating: 4.4,
        image: "../assets/products/shampoo.jpg",
        description:
            "An everyday personal-care essential available through MARTEY."
    },

    {
        id: 1007,
        name: "Liquid Laundry Detergent",
        category: "Household",
        size: "1 L",
        price: 189,
        mrp: 220,
        rating: 4.5,
        image: "../assets/products/detergent.jpg",
        description:
            "A practical household laundry essential for regular cleaning."
    },

    {
        id: 1008,
        name: "Baby Soft Wipes",
        category: "Baby Care",
        size: "72 wipes",
        price: 125,
        mrp: 150,
        rating: 4.6,
        image: "../assets/products/baby-wipes.jpg",
        description:
            "Convenient soft wipes for everyday baby-care needs."
    },

    {
        id: 1009,
        name: "Butter Biscuits",
        category: "Snacks",
        size: "250 g",
        price: 55,
        mrp: 65,
        rating: 4.5,
        image: "../assets/products/biscuits.jpg",
        description:
            "Light and convenient biscuits for everyday snacking."
    },

    {
        id: 1010,
        name: "Premium Pet Food",
        category: "Pet Supplies",
        size: "1 kg",
        price: 299,
        mrp: 349,
        rating: 4.6,
        image: "../assets/products/pet-food.jpg",
        description:
            "An everyday pet-care food option available through MARTEY."
    },

    {
        id: 1011,
        name: "Wireless Headphones",
        category: "Electronics & Accessories",
        size: "1 unit",
        price: 799,
        mrp: 999,
        rating: 4.3,
        image: "../assets/products/headphones.jpg",
        description:
            "Wireless headphones designed for convenient everyday listening."
    },

    {
        id: 1012,
        name: "Premium Notebook",
        category: "Stationery",
        size: "A5",
        price: 99,
        mrp: 120,
        rating: 4.6,
        image: "../assets/products/notebook.jpg",
        description:
            "A practical notebook for writing, planning and everyday use."
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const productImage =
    document.getElementById("productImage");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productSize =
    document.getElementById("productSize");

const productPrice =
    document.getElementById("productPrice");

const productMrp =
    document.getElementById("productMrp");

const productDiscount =
    document.getElementById("productDiscount");

const discountBadge =
    document.getElementById("discountBadge");

const productRating =
    document.getElementById("productRating");

const productDescription =
    document.getElementById("productDescription");

const infoCategory =
    document.getElementById("infoCategory");

const infoSize =
    document.getElementById("infoSize");

const infoId =
    document.getElementById("infoId");

const reviewRating =
    document.getElementById("reviewRating");

const breadcrumbCategory =
    document.getElementById("breadcrumbCategory");

const breadcrumbProduct =
    document.getElementById("breadcrumbProduct");

const quantityElement =
    document.getElementById("quantity");

const cartCount =
    document.getElementById("cartCount");

const relatedProducts =
    document.getElementById("relatedProducts");

const searchInput =
    document.getElementById("searchInput");

const searchForm =
    document.getElementById("searchForm");

const searchSuggestions =
    document.getElementById("searchSuggestions");


/* =========================================================
   GET PRODUCT ID
========================================================= */

function getProductId() {

    const path =
        window.location.pathname;

    const parts =
        path.split("/").filter(Boolean);

    const productIndex =
        parts.indexOf("product");

    if (productIndex === -1) {
        return 1001;
    }

    const id =
        Number(parts[productIndex + 1]);

    return Number.isFinite(id)
        ? id
        : 1001;
}


const productId =
    getProductId();


/* =========================================================
   FIND PRODUCT
========================================================= */

const product =
    products.find(item =>
        item.id === productId
    );


/* =========================================================
   DISCOUNT
========================================================= */

function getDiscount(price, mrp) {

    if (mrp <= price) {
        return 0;
    }

    return Math.round(
        ((mrp - price) / mrp) * 100
    );
}


/* =========================================================
   LOAD PRODUCT
========================================================= */

function loadProduct() {

    if (!product) {

        document.title =
            "Product Not Found | MARTEY";

        productName.textContent =
            "Product not found";

        productCategory.textContent =
            "MARTEY";

        productDescription.textContent =
            "The product you are looking for could not be found.";

        return;
    }


    const discount =
        getDiscount(
            product.price,
            product.mrp
        );


    document.title =
        `${product.name} | MARTEY`;


    productImage.src =
        product.image;

    productImage.alt =
        product.name;


    productName.textContent =
        product.name;

    productCategory.textContent =
        product.category;

    productSize.textContent =
        product.size;

    productPrice.textContent =
        `₹${product.price}`;

    productMrp.textContent =
        `₹${product.mrp}`;

    productDiscount.textContent =
        discount > 0
            ? `${discount}% OFF`
            : "";

    discountBadge.textContent =
        discount > 0
            ? `${discount}% OFF`
            : "";

    discountBadge.style.display =
        discount > 0
            ? "block"
            : "none";


    productRating.textContent =
        product.rating;

    reviewRating.textContent =
        product.rating;


    productDescription.textContent =
        product.description;


    infoCategory.textContent =
        product.category;

    infoSize.textContent =
        product.size;

    infoId.textContent =
        product.id;


    breadcrumbProduct.textContent =
        product.name;


    breadcrumbCategory.textContent =
        product.category;


    breadcrumbCategory.href =
        getCategoryUrl(product.category);


    renderRelatedProducts();
}


/* =========================================================
   CATEGORY URL
========================================================= */

function getCategoryUrl(category) {

    const categoryMap = {

        "Milk & Dairy": "/milk",
        "Bakery": "/bakery",
        "Drinks": "/drinks",
        "Snacks": "/snacks",
        "Fresh": "/fruits-vegetables",
        "Personal Care": "/personal-care",
        "Household": "/household"

    };

    return categoryMap[category]
        || "/categories";
}


/* =========================================================
   QUANTITY
========================================================= */

let quantity = 1;


document
    .getElementById("increaseQuantity")
    .addEventListener(
        "click",
        () => {

            if (quantity >= 20) {
                return;
            }

            quantity++;

            quantityElement.textContent =
                quantity;
        }
    );


document
    .getElementById("decreaseQuantity")
    .addEventListener(
        "click",
        () => {

            if (quantity <= 1) {
                return;
            }

            quantity--;

            quantityElement.textContent =
                quantity;
        }
    );


/* =========================================================
   CART
========================================================= */

let cart =
    JSON.parse(
        localStorage.getItem("marteyCart") || "[]"
    );


function updateCartCount() {

    const total =
        cart.reduce(
            (sum, item) =>
                sum + (item.quantity || 1),
            0
        );

    cartCount.textContent =
        total;
}


updateCartCount();


function addCurrentProductToCart() {

    if (!product) {
        return;
    }


    const existing =
        cart.find(
            item => item.id === product.id
        );


    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({
            id: product.id,
            quantity: quantity
        });

    }


    localStorage.setItem(
        "marteyCart",
        JSON.stringify(cart)
    );


    updateCartCount();
}


/* =========================================================
   ADD TO CART BUTTON
========================================================= */

document
    .getElementById("addToCart")
    .addEventListener(
        "click",
        () => {

            addCurrentProductToCart();

            const button =
                document.getElementById("addToCart");

            button.textContent =
                "Added to Cart ✓";

            button.style.background =
                "#155EEF";

            button.style.color =
                "#FFFFFF";


            setTimeout(() => {

                button.textContent =
                    "Add to Cart";

                button.style.background =
                    "";

                button.style.color =
                    "";

            }, 1200);
        }
    );


/* =========================================================
   BUY NOW
========================================================= */

document
    .getElementById("buyNow")
    .addEventListener(
        "click",
        () => {

            addCurrentProductToCart();

            window.location.href =
                "/cart";
        }
    );


/* =========================================================
   WISHLIST
========================================================= */

const wishlistButton =
    document.getElementById(
        "wishlistButton"
    );


let wishlist =
    JSON.parse(
        localStorage.getItem("marteyWishlist") || "[]"
    );


function updateWishlistButton() {

    if (!product) {
        return;
    }

    const exists =
        wishlist.includes(product.id);

    wishlistButton.classList.toggle(
        "active",
        exists
    );

    wishlistButton.textContent =
        exists
            ? "♥ Added to Wishlist"
            : "♡ Add to Wishlist";
}


wishlistButton.addEventListener(
    "click",
    () => {

        if (!product) {
            return;
        }


        const index =
            wishlist.indexOf(product.id);


        if (index === -1) {

            wishlist.push(product.id);

        } else {

            wishlist.splice(index, 1);
        }


        localStorage.setItem(
            "marteyWishlist",
            JSON.stringify(wishlist)
        );


        updateWishlistButton();
    }
);


updateWishlistButton();


/* =========================================================
   RELATED PRODUCTS
========================================================= */

function renderRelatedProducts() {

    if (!product) {
        return;
    }


    let related =
        products.filter(item =>
            item.id !== product.id &&
            item.category === product.category
        );


    if (related.length < 4) {

        const additional =
            products.filter(item =>
                item.id !== product.id &&
                !related.includes(item)
            );

        related =
            [
                ...related,
                ...additional
            ];
    }


    related =
        related.slice(0, 4);


    relatedProducts.innerHTML =
        related.map(item => `

            <a
                href="/product/${item.id}"
                class="related-card"
            >

                <div class="related-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        loading="lazy"
                    >

                </div>


                <div class="related-content">

                    <span class="related-category">
                        ${item.category}
                    </span>

                    <span class="related-name">
                        ${item.name}
                    </span>

                    <div class="related-price">
                        ₹${item.price}
                    </div>

                </div>

            </a>

        `).join("");
}


/* =========================================================
   PRODUCT TABS
========================================================= */

const tabs =
    document.querySelectorAll(
        ".details-tab"
    );

const tabContents =
    document.querySelectorAll(
        ".tab-content"
    );


tabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            const target =
                tab.dataset.tab;


            tabs.forEach(item =>
                item.classList.remove("active")
            );


            tabContents.forEach(item =>
                item.classList.remove("active")
            );


            tab.classList.add("active");


            document
                .getElementById(target)
                .classList.add("active");
        }
    );

});


/* =========================================================
   LOCATION
========================================================= */

document
    .getElementById("changeLocation")
    .addEventListener(
        "click",
        () => {

            alert(
                "Location selection will be connected to MARTEY's location system later."
            );
        }
    );


/* =========================================================
   SEARCH
========================================================= */

searchForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const query =
            searchInput.value.trim();

        if (!query) {
            return;
        }

        window.location.href =
            `/search?q=${encodeURIComponent(query)}`;
    }
);


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!query) {

            searchSuggestions.classList.remove(
                "active"
            );

            return;
        }


        const matches =
            products
                .filter(item => {

                    const text = `
                        ${item.name}
                        ${item.category}
                        ${item.size}
                    `.toLowerCase();

                    return text.includes(query);
                })
                .slice(0, 5);


        if (matches.length === 0) {

            searchSuggestions.innerHTML = `

                <div class="suggestion-item">

                    <div class="suggestion-info">

                        <strong>
                            No products found
                        </strong>

                        <span>
                            Try another search
                        </span>

                    </div>

                </div>

            `;

        } else {

            searchSuggestions.innerHTML =
                matches.map(item => `

                    <a
                        href="/product/${item.id}"
                        class="suggestion-item"
                    >

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                        <div class="suggestion-info">

                            <strong>
                                ${item.name}
                            </strong>

                            <span>
                                ${item.size}
                                ·
                                ${item.category}
                            </span>

                        </div>

                        <span class="suggestion-price">
                            ₹${item.price}
                        </span>

                    </a>

                `).join("");
        }


        searchSuggestions.classList.add(
            "active"
        );
    }
);


/* =========================================================
   CLOSE SEARCH SUGGESTIONS
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !searchForm.contains(event.target)
        ) {

            searchSuggestions.classList.remove(
                "active"
            );
        }
    }
);


/* =========================================================
   INITIALIZE
========================================================= */

loadProduct();
