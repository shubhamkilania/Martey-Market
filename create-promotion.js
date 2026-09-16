/* =========================================================
   MARTEY. — CREATE PROMOTION
   Frontend Promotion + Payment Panel
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const promotionForm =
        document.getElementById("promotionForm");

    const promotionProduct =
        document.getElementById("promotionProduct");

    const promotionDays =
        document.getElementById("promotionDays");

    const dailyBudget =
        document.getElementById("dailyBudget");

    const startDate =
        document.getElementById("startDate");


    /* PRODUCT PREVIEW */

    const productPreviewImage =
        document.getElementById("previewProductImage");

    const previewProductName =
        document.getElementById("previewProductName");

    const previewProductPrice =
        document.getElementById("previewProductPrice");


    /* AD PREVIEW */

    const adPreviewImage =
        document.getElementById("adPreviewImage");

    const adPreviewProductName =
        document.getElementById("adPreviewProductName");

    const adPreviewProductPrice =
        document.getElementById("adPreviewProductPrice");


    /* CALCULATION */

    const calculationDailyBudget =
        document.getElementById(
            "calculationDailyBudget"
        );

    const calculationDays =
        document.getElementById(
            "calculationDays"
        );

    const totalBudget =
        document.getElementById(
            "totalBudget"
        );


    /* SUMMARY */

    const summaryProductImage =
        document.getElementById(
            "summaryProductImage"
        );

    const summaryProductName =
        document.getElementById(
            "summaryProductName"
        );

    const summaryProductPrice =
        document.getElementById(
            "summaryProductPrice"
        );

    const summaryDays =
        document.getElementById(
            "summaryDays"
        );

    const summaryDailyBudget =
        document.getElementById(
            "summaryDailyBudget"
        );

    const summaryStartDate =
        document.getElementById(
            "summaryStartDate"
        );

    const summaryTotalBudget =
        document.getElementById(
            "summaryTotalBudget"
        );


    /* PAYMENT */

    const paymentOverlay =
        document.getElementById(
            "paymentOverlay"
        );

    const closePaymentButton =
        document.getElementById(
            "closePaymentButton"
        );

    const paymentAmount =
        document.getElementById(
            "paymentAmount"
        );

    const confirmPaymentButton =
        document.getElementById(
            "confirmPaymentButton"
        );

    const confirmPaymentAmount =
        document.getElementById(
            "confirmPaymentAmount"
        );

    const paymentUpiId =
        document.getElementById(
            "paymentUpiId"
        );


    const upiPaymentContent =
        document.getElementById(
            "upiPaymentContent"
        );

    const qrPaymentContent =
        document.getElementById(
            "qrPaymentContent"
        );

    const paymentMethods =
        document.querySelectorAll(
            ".payment-method"
        );


    /* =====================================================
       DATA
    ===================================================== */

    let sellerProducts = [];

    let selectedProduct = null;

    let selectedDays = 1;


    /* =====================================================
       LOAD SELLER PRODUCTS
    ===================================================== */

    function loadSellerProducts() {

        try {

            sellerProducts =
                JSON.parse(
                    localStorage.getItem(
                        "marteySellerProducts"
                    ) || "[]"
                );

        } catch (error) {

            sellerProducts = [];

        }


        promotionProduct.innerHTML = `
            <option value="">
                Select a product
            </option>
        `;


        if (!sellerProducts.length) {

            const option =
                document.createElement("option");

            option.value = "";
            option.textContent =
                "No seller products available";

            option.disabled = true;

            promotionProduct.appendChild(option);

            return;
        }


        sellerProducts.forEach(function (product, index) {

            const option =
                document.createElement("option");

            /*
             * Use product.id when available.
             * Otherwise use the array index.
             */

            option.value =
                product.id !== undefined
                    ? String(product.id)
                    : String(index);

            option.textContent =
                product.name ||
                "Unnamed Product";

            promotionProduct.appendChild(option);

        });

    }


    /* =====================================================
       FIND SELECTED PRODUCT
    ===================================================== */

    function getSelectedProduct() {

        const value =
            promotionProduct.value;

        if (!value) {
            return null;
        }


        const found =
            sellerProducts.find(function (product) {

                return String(product.id) === value;

            });


        if (found) {
            return found;
        }


        /*
         * Fallback for products without IDs.
         */

        const index =
            Number(value);

        if (
            Number.isInteger(index) &&
            sellerProducts[index]
        ) {
            return sellerProducts[index];
        }


        return null;

    }


    /* =====================================================
       PRODUCT IMAGE HELPER
    ===================================================== */

    function getProductImage(product) {

        if (!product) {
            return "";
        }


        /*
         * Support common image field names.
         */

        if (typeof product.image === "string") {
            return product.image;
        }

        if (typeof product.imageUrl === "string") {
            return product.imageUrl;
        }

        if (typeof product.productImage === "string") {
            return product.productImage;
        }


        if (
            Array.isArray(product.images) &&
            product.images.length
        ) {

            const firstImage =
                product.images[0];

            if (typeof firstImage === "string") {
                return firstImage;
            }

            if (
                firstImage &&
                typeof firstImage.url === "string"
            ) {
                return firstImage.url;
            }

        }


        return "";

    }


    /* =====================================================
       PRODUCT PRICE HELPER
    ===================================================== */

    function getProductPrice(product) {

        if (!product) {
            return 0;
        }


        const possiblePrice =
            product.price ??
            product.sellingPrice ??
            product.productPrice ??
            0;


        const number =
            Number(
                String(possiblePrice)
                    .replace(/[^\d.]/g, "")
            );


        return Number.isFinite(number)
            ? number
            : 0;

    }


    /* =====================================================
       FORMAT MONEY
    ===================================================== */

    function formatMoney(amount) {

        const number =
            Number(amount) || 0;

        return (
            "₹" +
            number.toLocaleString("en-IN", {
                maximumFractionDigits: 2
            })
        );

    }


    /* =====================================================
       SET IMAGE
    ===================================================== */

    function setImageElement(
        container,
        image
    ) {

        if (!container) {
            return;
        }


        if (!image) {

            container.innerHTML = `
                <span>
                    Product Preview
                </span>
            `;

            return;
        }


        container.innerHTML = "";


        const img =
            document.createElement("img");

        img.src = image;

        img.alt =
            selectedProduct?.name ||
            "Product";


        img.addEventListener(
            "error",
            function () {

                container.innerHTML = `
                    <span>
                        Product Preview
                    </span>
                `;

            }
        );


        container.appendChild(img);

    }


    /* =====================================================
       UPDATE PRODUCT PREVIEW
    ===================================================== */

    function updateProductPreview() {

        selectedProduct =
            getSelectedProduct();


        if (!selectedProduct) {

            previewProductName.textContent =
                "Select a product";

            previewProductPrice.textContent =
                "Your selected product will appear here.";


            adPreviewProductName.textContent =
                "Select a product";

            adPreviewProductPrice.textContent =
                "—";


            summaryProductName.textContent =
                "Select product";

            summaryProductPrice.textContent =
                "—";


            setImageElement(
                productPreviewImage,
                ""
            );


            setImageElement(
                summaryProductImage,
                ""
            );


            adPreviewImage.innerHTML = `
                <div class="preview-placeholder">
                    <span>Your product</span>
                    <small>Promotion preview</small>
                </div>
            `;


            return;
        }


        const name =
            selectedProduct.name ||
            "Unnamed Product";

        const price =
            getProductPrice(
                selectedProduct
            );

        const image =
            getProductImage(
                selectedProduct
            );


        /* PRODUCT PREVIEW */

        previewProductName.textContent =
            name;

        previewProductPrice.textContent =
            price
                ? formatMoney(price)
                : "Price not available";


        setImageElement(
            productPreviewImage,
            image
        );


        /* AD PREVIEW */

        adPreviewProductName.textContent =
            name;

        adPreviewProductPrice.textContent =
            price
                ? formatMoney(price)
                : "—";


        if (image) {

            adPreviewImage.innerHTML = "";

            const img =
                document.createElement("img");

            img.src = image;

            img.alt = name;

            img.addEventListener(
                "error",
                function () {

                    adPreviewImage.innerHTML = `
                        <div class="preview-placeholder">
                            <span>Your product</span>
                            <small>Promotion preview</small>
                        </div>
                    `;

                }
            );

            adPreviewImage.appendChild(img);

        } else {

            adPreviewImage.innerHTML = `
                <div class="preview-placeholder">
                    <span>${escapeHTML(name)}</span>
                    <small>Promotion preview</small>
                </div>
            `;

        }


        /* SUMMARY */

        summaryProductName.textContent =
            name;

        summaryProductPrice.textContent =
            price
                ? formatMoney(price)
                : "—";


        if (image) {

            setImageElement(
                summaryProductImage,
                image
            );

        } else {

            summaryProductImage.innerHTML =
                `<span>Product</span>`;

        }

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       UPDATE BUDGET
    ===================================================== */

    function updateBudget() {

        let budget =
            Number(
                dailyBudget.value
            );


        if (
            !Number.isFinite(budget) ||
            budget < 10
        ) {

            budget = 10;

        }


        dailyBudget.value =
            budget;


        const days =
            Math.min(
                7,
                Math.max(
                    1,
                    Number(selectedDays) || 1
                )
            );


        const total =
            budget * days;


        calculationDailyBudget.textContent =
            formatMoney(budget);

        calculationDays.textContent =
            days === 1
                ? "1 Day"
                : `${days} Days`;


        totalBudget.textContent =
            formatMoney(total);


        summaryDays.textContent =
            days === 1
                ? "1 Day"
                : `${days} Days`;


        summaryDailyBudget.textContent =
            formatMoney(budget);


        summaryTotalBudget.textContent =
            formatMoney(total);


        /*
         * Also update payment amount
         * if payment panel is already open.
         */

        paymentAmount.textContent =
            formatMoney(total);

        confirmPaymentAmount.textContent =
            formatMoney(total);

    }


    /* =====================================================
       DURATION
    ===================================================== */

    const durationOptions =
        document.querySelectorAll(
            ".duration-option"
        );


    durationOptions.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const days =
                    Number(
                        button.dataset.days
                    );


                if (
                    !Number.isInteger(days) ||
                    days < 1 ||
                    days > 7
                ) {
                    return;
                }


                selectedDays =
                    days;


                promotionDays.value =
                    days;


                durationOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                updateBudget();

            }
        );

    });


    /* =====================================================
       DEFAULT DURATION
    ===================================================== */

    const defaultDuration =
        document.querySelector(
            '.duration-option[data-days="1"]'
        );


    if (defaultDuration) {

        defaultDuration.classList.add(
            "active"
        );

    }


    /* =====================================================
       START DATE
    ===================================================== */

    function getTodayString() {

        const now =
            new Date();

        const year =
            now.getFullYear();

        const month =
            String(
                now.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                now.getDate()
            ).padStart(2, "0");


        return `${year}-${month}-${day}`;

    }


    const today =
        getTodayString();


    if (startDate) {

        startDate.min =
            today;


        if (!startDate.value) {

            startDate.value =
                today;

        }

    }


    /* =====================================================
       UPDATE START DATE SUMMARY
    ===================================================== */

    function updateStartDate() {

        if (!startDate.value) {

            summaryStartDate.textContent =
                "—";

            return;

        }


        const date =
            new Date(
                startDate.value +
                "T00:00:00"
            );


        if (Number.isNaN(date.getTime())) {

            summaryStartDate.textContent =
                "—";

            return;

        }


        summaryStartDate.textContent =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    }


    /* =====================================================
       PAYMENT PANEL OPEN
    ===================================================== */

    function openPaymentPanel() {

        updateBudget();
        updateStartDate();


        if (paymentOverlay) {

            paymentOverlay.classList.add(
                "show"
            );

            paymentOverlay.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        }

    }


    /* =====================================================
       PAYMENT PANEL CLOSE
    ===================================================== */

    function closePaymentPanel() {

        if (paymentOverlay) {

            paymentOverlay.classList.remove(
                "show"
            );

            paymentOverlay.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";

        }

    }


    /* =====================================================
       PAYMENT METHOD SWITCHING
    ===================================================== */

    paymentMethods.forEach(function (method) {

        method.addEventListener(
            "click",
            function () {

                const selectedMethod =
                    method.dataset.paymentMethod;


                paymentMethods.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                method.classList.add(
                    "active"
                );


                if (
                    selectedMethod === "upi"
                ) {

                    upiPaymentContent
                        .classList.add(
                            "active"
                        );

                    qrPaymentContent
                        .classList.remove(
                            "active"
                        );

                }


                if (
                    selectedMethod === "qr"
                ) {

                    qrPaymentContent
                        .classList.add(
                            "active"
                        );

                    upiPaymentContent
                        .classList.remove(
                            "active"
                        );

                }

            }
        );

    });


    /* =====================================================
       FORM SUBMIT
       Proceed to Payment
    ===================================================== */

    if (promotionForm) {

        promotionForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* PRODUCT */

                selectedProduct =
                    getSelectedProduct();


                if (!selectedProduct) {

                    alert(
                        "Please select a product first."
                    );

                    promotionProduct.focus();

                    return;

                }


                /* DURATION */

                const days =
                    Number(
                        promotionDays.value
                    );


                if (
                    !Number.isInteger(days) ||
                    days < 1 ||
                    days > 7
                ) {

                    alert(
                        "Please select a promotion duration between 1 and 7 days."
                    );

                    return;

                }


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
                        "Minimum daily budget is ₹10."
                    );

                    dailyBudget.focus();

                    return;

                }


                /* DATE */

                if (!startDate.value) {

                    alert(
                        "Please select a start date."
                    );

                    startDate.focus();

                    return;

                }


                if (
                    startDate.value < today
                ) {

                    alert(
                        "Start date cannot be before today."
                    );

                    startDate.focus();

                    return;

                }


                /* TOTAL */

                const total =
                    budget * days;


                paymentAmount.textContent =
                    formatMoney(total);

                confirmPaymentAmount.textContent =
                    formatMoney(total);


                /* OPEN PAYMENT */

                openPaymentPanel();

            }
        );

    }


    /* =====================================================
       CLOSE PAYMENT BUTTON
    ===================================================== */

    if (closePaymentButton) {

        closePaymentButton.addEventListener(
            "click",
            function () {

                closePaymentPanel();

            }
        );

    }


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE
    ===================================================== */

    if (paymentOverlay) {

        paymentOverlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    paymentOverlay
                ) {

                    closePaymentPanel();

                }

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                paymentOverlay &&
                paymentOverlay.classList.contains(
                    "show"
                )
            ) {

                closePaymentPanel();

            }

        }
    );


    /* =====================================================
       CONFIRM PAYMENT
    ===================================================== */

    if (confirmPaymentButton) {

        confirmPaymentButton.addEventListener(
            "click",
            function () {

                selectedProduct =
                    getSelectedProduct();


                if (!selectedProduct) {

                    alert(
                        "Please select a product first."
                    );

                    closePaymentPanel();

                    return;

                }


                const days =
                    Number(
                        promotionDays.value
                    );


                const budget =
                    Number(
                        dailyBudget.value
                    );


                const total =
                    budget * days;


                /*
                 * Current frontend prototype:
                 *
                 * We do NOT store card,
                 * bank or UPI credentials.
                 *
                 * Real payment verification
                 * will be added with backend later.
                 */


                const activeMethod =
                    document.querySelector(
                        ".payment-method.active"
                    );


                const method =
                    activeMethod
                        ? activeMethod.dataset.paymentMethod
                        : "upi";


                if (
                    method === "upi" &&
                    paymentUpiId &&
                    !paymentUpiId.value.trim()
                ) {

                    alert(
                        "Please enter your UPI ID."
                    );

                    paymentUpiId.focus();

                    return;

                }


                /*
                 * Temporary prototype confirmation.
                 */

                confirmPaymentButton.disabled =
                    true;

                confirmPaymentButton.textContent =
                    "Processing...";


                setTimeout(
                    function () {

                        createPromotion(
                            selectedProduct,
                            days,
                            budget,
                            total,
                            startDate.value,
                            method
                        );


                        confirmPaymentButton.disabled =
                            false;

                        confirmPaymentButton.innerHTML =
                            `Pay <span id="confirmPaymentAmount">${formatMoney(total)}</span>`;


                    },
                    700
                );

            }
        );

    }


    /* =====================================================
       CREATE PROMOTION
    ===================================================== */

    function createPromotion(
        product,
        days,
        budget,
        total,
        date,
        paymentMethod
    ) {

        const image =
            getProductImage(product);


        const promotion = {

            id:
                "PROMO-" +
                Date.now(),

            productId:
                product.id !== undefined
                    ? product.id
                    : null,

            productName:
                product.name ||
                "Unnamed Product",

            productPrice:
                getProductPrice(product),

            productImage:
                image,

            durationDays:
                days,

            dailyBudget:
                budget,

            totalBudget:
                total,

            startDate:
                date,

            status:
                "Active",

            paymentStatus:
                "Prototype Confirmed",

            paymentMethod:
                paymentMethod,

            createdAt:
                new Date().toISOString()

        };


        let promotions = [];


        try {

            promotions =
                JSON.parse(
                    localStorage.getItem(
                        "marteySellerPromotions"
                    ) || "[]"
                );


            if (
                !Array.isArray(promotions)
            ) {

                promotions = [];

            }

        } catch (error) {

            promotions = [];

        }


        promotions.unshift(
            promotion
        );


        localStorage.setItem(
            "marteySellerPromotions",
            JSON.stringify(
                promotions
            )
        );


        closePaymentPanel();


        alert(
            "Promotion started successfully!"
        );


        /*
         * Return to Seller Center.
         */

        window.location.href =
            "seller.html";

    }


    /* =====================================================
       INPUT EVENTS
    ===================================================== */

    if (promotionProduct) {

        promotionProduct.addEventListener(
            "change",
            function () {

                updateProductPreview();

            }
        );

    }


    if (dailyBudget) {

        dailyBudget.addEventListener(
            "input",
            function () {

                updateBudget();

            }
        );

    }


    if (startDate) {

        startDate.addEventListener(
            "change",
            function () {

                updateStartDate();

            }
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    loadSellerProducts();

    updateProductPreview();

    updateBudget();

    updateStartDate();

});
