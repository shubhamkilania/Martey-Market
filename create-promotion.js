/* =========================================================
   MARTEY — CREATE PROMOTION
   Seller Center Promotion System
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const promotionForm =
        document.getElementById("promotionForm");

    const promotionType =
        document.getElementById("promotionType");

    const discountValue =
        document.getElementById("discountValue");

    const discountUnit =
        document.getElementById("discountUnit");

    const allProducts =
        document.getElementById("allProducts");

    const selectedProducts =
        document.getElementById("selectedProducts");

    const selectedProductsBox =
        document.getElementById("selectedProductsBox");

    const selectProductsButton =
        document.getElementById("selectProductsButton");

    const startDate =
        document.getElementById("startDate");

    const endDate =
        document.getElementById("endDate");


    /* =====================================================
       PROMOTION TYPE
    ===================================================== */

    function updateDiscountUnit() {

        if (!promotionType || !discountUnit || !discountValue) {
            return;
        }

        const type = promotionType.value;

        if (type === "fixed") {

            discountUnit.textContent = "₹";
            discountValue.placeholder = "100";

        } else if (type === "percentage") {

            discountUnit.textContent = "%";
            discountValue.placeholder = "10";

        } else if (type === "flash-sale") {

            discountUnit.textContent = "%";
            discountValue.placeholder = "20";

        } else {

            discountUnit.textContent = "%";
            discountValue.placeholder = "10";

        }
    }


    if (promotionType) {

        promotionType.addEventListener(
            "change",
            updateDiscountUnit
        );

    }


    updateDiscountUnit();


    /* =====================================================
       PRODUCT SCOPE
    ===================================================== */

    function updateProductSelection() {

        if (
            !allProducts ||
            !selectedProducts ||
            !selectedProductsBox
        ) {
            return;
        }

        if (selectedProducts.checked) {

            selectedProductsBox.style.display = "block";

        } else {

            selectedProductsBox.style.display = "none";

        }
    }


    if (allProducts) {

        allProducts.addEventListener(
            "change",
            updateProductSelection
        );

    }


    if (selectedProducts) {

        selectedProducts.addEventListener(
            "change",
            updateProductSelection
        );

    }


    updateProductSelection();


    /* =====================================================
       SELECT PRODUCTS
    ===================================================== */

    if (selectProductsButton) {

        selectProductsButton.addEventListener(
            "click",
            () => {

                alert(
                    "Product selection will be connected to your MARTEY products."
                );

            }
        );

    }


    /* =====================================================
       DATE VALIDATION
    ===================================================== */

    if (startDate && endDate) {

        startDate.addEventListener(
            "change",
            () => {

                if (startDate.value) {

                    endDate.min = startDate.value;

                    if (
                        endDate.value &&
                        endDate.value < startDate.value
                    ) {

                        endDate.value = "";

                    }

                }

            }
        );

    }


    /* =====================================================
       LOAD SAVED PROMOTIONS
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
       SAVE PROMOTION
    ===================================================== */

    if (promotionForm) {

        promotionForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "promotionName"
                    ).value.trim();

                const type =
                    promotionType.value;

                const discount =
                    Number(discountValue.value);

                const productScope =
                    document.querySelector(
                        'input[name="productScope"]:checked'
                    )?.value || "all";

                const minimumOrder =
                    Number(
                        document.getElementById(
                            "minimumOrder"
                        ).value
                    ) || 0;

                const maximumDiscount =
                    Number(
                        document.getElementById(
                            "maximumDiscount"
                        ).value
                    ) || 0;

                const usageLimit =
                    Number(
                        document.getElementById(
                            "usageLimit"
                        ).value
                    ) || 0;

                const start =
                    document.getElementById(
                        "startDate"
                    ).value;

                const startTime =
                    document.getElementById(
                        "startTime"
                    ).value;

                const end =
                    document.getElementById(
                        "endDate"
                    ).value;

                const endTime =
                    document.getElementById(
                        "endTime"
                    ).value;


                /* -----------------------------------------
                   VALIDATION
                ----------------------------------------- */

                if (!name) {

                    alert(
                        "Please enter a promotion name."
                    );

                    return;

                }


                if (!type) {

                    alert(
                        "Please select a promotion type."
                    );

                    return;

                }


                if (!discount || discount <= 0) {

                    alert(
                        "Please enter a valid discount."
                    );

                    return;

                }


                if (
                    (type === "percentage" ||
                    type === "flash-sale") &&
                    discount > 100
                ) {

                    alert(
                        "Percentage discount cannot be more than 100%."
                    );

                    return;

                }


                if (!start || !end) {

                    alert(
                        "Please select the promotion dates."
                    );

                    return;

                }


                const startDateTime =
                    new Date(
                        `${start}T${startTime}`
                    );

                const endDateTime =
                    new Date(
                        `${end}T${endTime}`
                    );


                if (
                    isNaN(startDateTime.getTime()) ||
                    isNaN(endDateTime.getTime())
                ) {

                    alert(
                        "Please enter valid promotion dates and times."
                    );

                    return;

                }


                if (endDateTime <= startDateTime) {

                    alert(
                        "End date and time must be after the start date and time."
                    );

                    return;

                }


                /* -----------------------------------------
                   CREATE PROMOTION OBJECT
                ----------------------------------------- */

                const promotion = {

                    id:
                        "PROMO-" +
                        Date.now(),

                    name: name,

                    type: type,

                    discount: discount,

                    productScope: productScope,

                    minimumOrder:
                        minimumOrder,

                    maximumDiscount:
                        maximumDiscount,

                    usageLimit:
                        usageLimit,

                    usedCount: 0,

                    startDate: start,

                    startTime: startTime,

                    endDate: end,

                    endTime: endTime,

                    status: "Scheduled",

                    createdAt:
                        new Date().toISOString()

                };


                /* -----------------------------------------
                   SAVE
                ----------------------------------------- */

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


                /* -----------------------------------------
                   SUCCESS
                ----------------------------------------- */

                alert(
                    "Promotion created successfully."
                );


                /* -----------------------------------------
                   RETURN TO SELLER CENTER
                ----------------------------------------- */

                window.location.href =
                    "seller.html";

            }
        );

    }

});
