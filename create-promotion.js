/* =========================================================
   MARTEY. — CREATE PROMOTION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const promotionForm =
        document.getElementById("promotionForm");

    const promotionProduct =
        document.getElementById("promotionProduct");

    const productPreview =
        document.getElementById("productPreview");

    const previewProductName =
        document.getElementById("previewProductName");

    const previewProductPrice =
        document.getElementById("previewProductPrice");

    const productPreviewImage =
        document.querySelector(".product-preview-image");

    const durationOptions =
        document.querySelectorAll(".duration-option");

    const promotionDays =
        document.getElementById("promotionDays");

    const dailyBudget =
        document.getElementById("dailyBudget");

    const budgetCalculation =
        document.getElementById("budgetCalculation");

    const totalBudget =
        document.getElementById("totalBudget");

    const startDate =
        document.getElementById("startDate");

    const summaryProductName =
        document.getElementById("summaryProductName");

    const summaryProductPrice =
        document.getElementById("summaryProductPrice");

    const summaryProductImage =
        document.getElementById("summaryProductImage");

    const summaryDays =
        document.getElementById("summaryDays");

    const summaryDailyBudget =
        document.getElementById("summaryDailyBudget");

    const summaryTotalBudget =
        document.getElementById("summaryTotalBudget");

    const summaryFinalBudget =
        document.getElementById("summaryFinalBudget");


    /* =====================================================
       PRODUCTS
    ===================================================== */

    function getSellerProducts() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "marteySellerProducts"
                )
            ) || [];

        } catch (error) {

            return [];

        }

    }


    const sellerProducts =
        getSellerProducts();


    function getProductName(product) {

        return (
            product.name ||
            product.productName ||
            product.title ||
            "Unnamed Product"
        );

    }


    function getProductPrice(product) {

        const price =
            Number(
                product.price ||
                product.sellingPrice ||
                0
            );

        return price;

    }


    function getProductImage(product) {

        if (
            product.image &&
            typeof product.image === "string"
        ) {
            return product.image;
        }

        if (
            product.images &&
            Array.isArray(product.images) &&
            product.images.length > 0
        ) {
            return product.images[0];
        }

        return "";

    }


    function populateProducts() {

        if (!promotionProduct) {
            return;
        }

        sellerProducts.forEach(
            (product, index) => {

                const option =
                    document.createElement("option");

                option.value = index;

                option.textContent =
                    getProductName(product);

                promotionProduct.appendChild(
                    option
                );

            }
        );

    }


    populateProducts();


    /* =====================================================
       PRODUCT CHANGE
    ===================================================== */

    function updateProductPreview() {

        if (!promotionProduct) {
            return;
        }

        const selectedIndex =
            promotionProduct.value;

        if (
            selectedIndex === "" ||
            !sellerProducts[selectedIndex]
        ) {

            if (productPreview) {
                productPreview.classList.remove("show");
            }

            summaryProductName.textContent =
                "Select product";

            summaryProductPrice.textContent =
                "—";

            summaryProductImage.innerHTML =
                "Product";

            return;

        }


        const product =
            sellerProducts[selectedIndex];

        const name =
            getProductName(product);

        const price =
            getProductPrice(product);

        const image =
            getProductImage(product);


        if (productPreview) {
            productPreview.classList.add("show");
        }


        previewProductName.textContent =
            name;

        previewProductPrice.textContent =
            price > 0
                ? "₹" + price.toLocaleString("en-IN")
                : "Price not available";


        summaryProductName.textContent =
            name;

        summaryProductPrice.textContent =
            price > 0
                ? "₹" + price.toLocaleString("en-IN")
                : "Price not available";


        if (image) {

            productPreviewImage.innerHTML =
                `<img src="${image}" alt="">`;

            summaryProductImage.innerHTML =
                `<img src="${image}" alt="">`;

        } else {

            productPreviewImage.innerHTML =
                "Product";

            summaryProductImage.innerHTML =
                "Product";

        }

    }


    if (promotionProduct) {

        promotionProduct.addEventListener(
            "change",
            updateProductPreview
        );

    }


    /* =====================================================
       DURATION
       ONLY 1–7 DAYS
    ===================================================== */

    function updateDuration(days) {

        const safeDays =
            Math.min(
                7,
                Math.max(
                    1,
                    Number(days) || 1
                )
            );


        promotionDays.value =
            safeDays;


        durationOptions.forEach(
            option => {

                const optionDays =
                    Number(
                        option.dataset.days
                    );

                option.classList.toggle(
                    "active",
                    optionDays === safeDays
                );

            }
        );


        summaryDays.textContent =
            safeDays === 1
                ? "1 Day"
                : safeDays + " Days";


        updateBudget();

    }


    durationOptions.forEach(
        option => {

            option.addEventListener(
                "click",
                () => {

                    const days =
                        Number(
                            option.dataset.days
                        );

                    updateDuration(days);

                }
            );

        }
    );


    updateDuration(1);


    /* =====================================================
       BUDGET
    ===================================================== */

    function updateBudget() {

        const days =
            Math.min(
                7,
                Math.max(
                    1,
                    Number(
                        promotionDays.value
                    ) || 1
                )
            );


        let budget =
            Number(
                dailyBudget.value
            ) || 0;


        if (budget < 0) {
            budget = 0;
        }


        const total =
            budget * days;


        budgetCalculation.textContent =
            "₹" +
            budget.toLocaleString("en-IN") +
            " × " +
            days +
            (days === 1 ? " day" : " days");


        totalBudget.textContent =
            "₹" +
            total.toLocaleString("en-IN");


        summaryDailyBudget.textContent =
            "₹" +
            budget.toLocaleString("en-IN");


        summaryTotalBudget.textContent =
            "₹" +
            total.toLocaleString("en-IN");


        summaryFinalBudget.textContent =
            "₹" +
            total.toLocaleString("en-IN");

    }


    if (dailyBudget) {

        dailyBudget.addEventListener(
            "input",
            updateBudget
        );

    }


    updateBudget();


    /* =====================================================
       START DATE
    ===================================================== */

    function setMinimumDate() {

        if (!startDate) {
            return;
        }

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");


        const todayString =
            `${year}-${month}-${day}`;


        startDate.min =
            todayString;


        if (!startDate.value) {

            startDate.value =
                todayString;

        }

    }


    setMinimumDate();


    /* =====================================================
       GET SAVED PROMOTIONS
    ===================================================== */

    function getPromotions() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "marteySellerPromotions"
                )
            ) || [];

        } catch (error) {

            return [];

        }

    }


    /* =====================================================
       CREATE PROMOTION
    ===================================================== */

    if (promotionForm) {

        promotionForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                /* PRODUCT */

                if (
                    promotionProduct.value === "" ||
                    !sellerProducts[
                        promotionProduct.value
                    ]
                ) {

                    alert(
                        "Please select a product."
                    );

                    return;

                }


                const selectedProduct =
                    sellerProducts[
                        promotionProduct.value
                    ];


                /* DURATION */

                const days =
                    Math.min(
                        7,
                        Math.max(
                            1,
                            Number(
                                promotionDays.value
                            ) || 1
                        )
                    );


                /* BUDGET */

                const budget =
                    Number(
                        dailyBudget.value
                    );


                if (
                    !Number.isFinite(budget) ||
                    budget < 10
                ) {

                    alert(
                        "Daily budget must be at least ₹10."
                    );

                    return;

                }


                const total =
                    budget * days;


                /* DATE */

                if (!startDate.value) {

                    alert(
                        "Please select a start date."
                    );

                    return;

                }


                /* CREATE OBJECT */

                const promotion = {

                    id:
                        "PROMO-" +
                        Date.now(),

                    productId:
                        selectedProduct.id ||
                        selectedProduct.productId ||
                        null,

                    productName:
                        getProductName(
                            selectedProduct
                        ),

                    productPrice:
                        getProductPrice(
                            selectedProduct
                        ),

                    productImage:
                        getProductImage(
                            selectedProduct
                        ),

                    durationDays:
                        days,

                    dailyBudget:
                        budget,

                    totalBudget:
                        total,

                    startDate:
                        startDate.value,

                    status:
                        "Scheduled",

                    createdAt:
                        new Date().toISOString()

                };


                /* SAVE */

                const promotions =
                    getPromotions();


                promotions.push(
                    promotion
                );


                localStorage.setItem(
                    "marteySellerPromotions",
                    JSON.stringify(
                        promotions
                    )
                );


                /* SUCCESS */

                alert(
                    "Promotion created successfully."
                );


                /* RETURN */

                window.location.href =
                    "seller.html";

            }
        );

    }

});
