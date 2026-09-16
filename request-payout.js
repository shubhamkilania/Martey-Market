/* =========================================================
   MARTEY — REQUEST PAYOUT
   Payout Form + Validation + Local History
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("MARTEY request-payout.js loaded");


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const payoutForm =
        document.getElementById("payoutForm");

    const availableBalanceElement =
        document.getElementById("availableBalance");

    const payoutAmount =
        document.getElementById("payoutAmount");

    const amountMessage =
        document.getElementById("amountMessage");

    const payoutMethod =
        document.getElementById("payoutMethod");

    const upiFields =
        document.getElementById("upiFields");

    const bankFields =
        document.getElementById("bankFields");

    const upiId =
        document.getElementById("upiId");

    const accountHolder =
        document.getElementById("accountHolder");

    const accountNumber =
        document.getElementById("accountNumber");

    const ifsc =
        document.getElementById("ifsc");

    const requestButton =
        document.getElementById("requestPayoutButton");

    const payoutHistory =
        document.getElementById("payoutHistory");


    /* =====================================================
       STORAGE KEYS
    ===================================================== */

    const PRODUCTS_KEY =
        "marteySellerProducts";

    const PAYOUTS_KEY =
        "marteySellerPayouts";

    const BALANCE_KEY =
        "marteySellerAvailableBalance";


    /* =====================================================
       HELPERS
    ===================================================== */

    function getNumber(value) {

        const number =
            Number(value);

        return Number.isFinite(number)
            ? number
            : 0;

    }


    function formatCurrency(value) {

        return "₹" +
            getNumber(value).toLocaleString(
                "en-IN"
            );

    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function getPayouts() {

        try {

            const payouts =
                JSON.parse(
                    localStorage.getItem(
                        PAYOUTS_KEY
                    )
                );

            return Array.isArray(payouts)
                ? payouts
                : [];

        } catch (error) {

            console.warn(
                "Could not read payout history",
                error
            );

            return [];

        }

    }


    function savePayouts(payouts) {

        localStorage.setItem(
            PAYOUTS_KEY,
            JSON.stringify(payouts)
        );

    }


    /* =====================================================
       AVAILABLE BALANCE
    ===================================================== */

    function calculateBalanceFromProducts() {

        /*
           If a seller balance has already been saved,
           use that balance.
        */

        const savedBalance =
            localStorage.getItem(
                BALANCE_KEY
            );


        if (savedBalance !== null) {

            const balance =
                getNumber(savedBalance);

            return Math.max(
                0,
                balance
            );

        }


        /*
           For now, calculate a basic demo balance
           from seller products.

           This is only a frontend placeholder.
           Later backend will calculate real earnings.
        */

        let balance = 0;


        try {

            const products =
                JSON.parse(
                    localStorage.getItem(
                        PRODUCTS_KEY
                    )
                ) || [];


            if (Array.isArray(products)) {

                products.forEach(
                    function (product) {

                        /*
                           No real order data exists yet,
                           so product sales are NOT counted.

                           This keeps the payout balance
                           at ₹0 until real order/earning
                           data is connected.
                        */

                    }
                );

            }

        } catch (error) {

            console.warn(
                "Could not calculate seller balance",
                error
            );

        }


        return balance;

    }


    let availableBalance =
        calculateBalanceFromProducts();


    function updateBalanceDisplay() {

        if (!availableBalanceElement) {
            return;
        }

        availableBalanceElement.textContent =
            formatCurrency(
                availableBalance
            );

    }


    updateBalanceDisplay();


    /* =====================================================
       METHOD SWITCHING
    ===================================================== */

    function resetMethodFields() {

        if (upiFields) {

            upiFields.classList.remove(
                "show"
            );

        }

        if (bankFields) {

            bankFields.classList.remove(
                "show"
            );

        }


        if (upiId) {

            upiId.required = false;

        }

        if (accountHolder) {

            accountHolder.required = false;

        }

        if (accountNumber) {

            accountNumber.required = false;

        }

        if (ifsc) {

            ifsc.required = false;

        }

    }


    function updatePayoutMethod() {

        resetMethodFields();


        const method =
            payoutMethod
                ? payoutMethod.value
                : "";


        if (method === "upi") {

            if (upiFields) {

                upiFields.classList.add(
                    "show"
                );

            }

            if (upiId) {

                upiId.required = true;

            }

        }


        if (method === "bank") {

            if (bankFields) {

                bankFields.classList.add(
                    "show"
                );

            }

            if (accountHolder) {

                accountHolder.required =
                    true;

            }

            if (accountNumber) {

                accountNumber.required =
                    true;

            }

            if (ifsc) {

                ifsc.required =
                    true;

            }

        }

    }


    if (payoutMethod) {

        payoutMethod.addEventListener(
            "change",
            updatePayoutMethod
        );

    }


    /* =====================================================
       AMOUNT VALIDATION
    ===================================================== */

    function validateAmount(showMessage = true) {

        if (!payoutAmount) {
            return false;
        }


        const amount =
            getNumber(
                payoutAmount.value
            );


        if (!amount || amount <= 0) {

            if (showMessage && amountMessage) {

                amountMessage.textContent =
                    "Enter a valid payout amount.";

                amountMessage.style.color =
                    "#dc4b59";

            }

            return false;

        }


        if (amount > availableBalance) {

            if (showMessage && amountMessage) {

                amountMessage.textContent =
                    "Amount cannot exceed your available balance.";

                amountMessage.style.color =
                    "#dc4b59";

            }

            return false;

        }


        if (amountMessage) {

            amountMessage.textContent =
                "Amount is available for payout.";

            amountMessage.style.color =
                "#20a66a";

        }


        return true;

    }


    if (payoutAmount) {

        payoutAmount.addEventListener(
            "input",
            function () {

                validateAmount(
                    true
                );

            }
        );

    }


    /* =====================================================
       UPI VALIDATION
    ===================================================== */

    function validateUPI() {

        if (!upiId) {
            return false;
        }


        const value =
            upiId.value
                .trim()
                .toLowerCase();


        if (!value) {
            return false;
        }


        /*
           Basic UPI format validation.
           This does not verify ownership.
        */

        const upiPattern =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/;


        return upiPattern.test(
            value
        );

    }


    /* =====================================================
       BANK VALIDATION
    ===================================================== */

    function validateBank() {

        if (
            !accountHolder ||
            !accountNumber ||
            !ifsc
        ) {

            return false;

        }


        const holder =
            accountHolder.value
                .trim();


        const account =
            accountNumber.value
                .replace(/\s/g, "")
                .trim();


        const ifscCode =
            ifsc.value
                .trim()
                .toUpperCase();


        if (!holder) {
            return false;
        }


        if (!/^\d{6,20}$/.test(account)) {
            return false;
        }


        /*
           Basic IFSC format:
           4 letters + 0 + 6 alphanumeric
        */

        if (
            !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(
                ifscCode
            )
        ) {

            return false;

        }


        return true;

    }


    /* =====================================================
       PAYOUT METHOD TEXT
    ===================================================== */

    function getMethodLabel(method) {

        if (method === "upi") {
            return "UPI";
        }

        if (method === "bank") {
            return "Bank Account";
        }

        return "Unknown";

    }


    /* =====================================================
       DATE / TIME
    ===================================================== */

    function getCurrentDateTime() {

        const date =
            new Date();


        return date.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    /* =====================================================
       HISTORY
    ===================================================== */

    function renderPayoutHistory() {

        if (!payoutHistory) {
            return;
        }


        const payouts =
            getPayouts();


        if (payouts.length === 0) {

            payoutHistory.innerHTML = `

                <div class="history-empty">

                    <strong>
                        No payout requests yet
                    </strong>

                    <p>
                        Your payout requests will appear here.
                    </p>

                </div>

            `;

            return;

        }


        payoutHistory.innerHTML =
            payouts
                .slice()
                .reverse()
                .map(
                    function (payout) {

                        const status =
                            payout.status ||
                            "Pending";


                        const statusClass =
                            status
                                .toLowerCase()
                                .replace(
                                    /\s+/g,
                                    "-"
                                );


                        return `

                            <div class="payout-history-row">

                                <div class="history-info">

                                    <strong>
                                        ${formatCurrency(
                                            payout.amount
                                        )}
                                    </strong>

                                    <span>
                                        ${escapeHTML(
                                            getMethodLabel(
                                                payout.method
                                            )
                                        )}
                                        •
                                        ${escapeHTML(
                                            payout.date
                                        )}
                                    </span>

                                </div>

                                <div>

                                    <span class="history-status ${statusClass}">
                                        ${escapeHTML(
                                            status
                                        )}
                                    </span>

                                </div>

                            </div>

                        `;

                    }
                )
                .join("");

    }


    renderPayoutHistory();


    /* =====================================================
       SUBMIT PAYOUT
    ===================================================== */

    if (payoutForm) {

        payoutForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* Amount */

                if (
                    !validateAmount(
                        true
                    )
                ) {

                    payoutAmount?.focus();

                    return;

                }


                const amount =
                    getNumber(
                        payoutAmount.value
                    );


                /* Method */

                const method =
                    payoutMethod
                        ? payoutMethod.value
                        : "";


                if (!method) {

                    alert(
                        "Please select a payout method."
                    );

                    payoutMethod?.focus();

                    return;

                }


                /* UPI */

                if (
                    method === "upi" &&
                    !validateUPI()
                ) {

                    alert(
                        "Please enter a valid UPI ID."
                    );

                    upiId?.focus();

                    return;

                }


                /* Bank */

                if (
                    method === "bank" &&
                    !validateBank()
                ) {

                    alert(
                        "Please enter valid bank details."
                    );

                    return;

                }


                /* Confirmation */

                const confirmed =
                    confirm(
                        `Request payout of ${formatCurrency(
                            amount
                        )}?`
                    );


                if (!confirmed) {
                    return;
                }


                /* Disable button */

                if (requestButton) {

                    requestButton.disabled =
                        true;

                    requestButton.textContent =
                        "Submitting...";

                }


                /* Create payout */

                const payout = {

                    id:
                        "PAY-" +
                        Date.now(),

                    amount:
                        amount,

                    method:
                        method,

                    status:
                        "Pending",

                    date:
                        getCurrentDateTime(),

                    createdAt:
                        new Date().toISOString()

                };


                /* Save */

                const payouts =
                    getPayouts();


                payouts.push(
                    payout
                );


                savePayouts(
                    payouts
                );


                /*
                   Reduce local available balance.

                   This is only frontend demo logic.
                */

                availableBalance =
                    Math.max(
                        0,
                        availableBalance -
                        amount
                    );


                localStorage.setItem(
                    BALANCE_KEY,
                    String(
                        availableBalance
                    )
                );


                updateBalanceDisplay();


                renderPayoutHistory();


                /* Reset form */

                payoutForm.reset();

                resetMethodFields();


                if (amountMessage) {

                    amountMessage.textContent =
                        "Payout request submitted successfully.";

                    amountMessage.style.color =
                        "#20a66a";

                }


                if (requestButton) {

                    requestButton.disabled =
                        false;

                    requestButton.textContent =
                        "Request Payout";

                }


                alert(
                    "Your payout request has been submitted successfully."
                );

            }
        );

    }


    /* =====================================================
       STORAGE REFRESH
    ===================================================== */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                PAYOUTS_KEY
            ) {

                renderPayoutHistory();

            }


            if (
                event.key ===
                BALANCE_KEY
            ) {

                availableBalance =
                    getNumber(
                        event.newValue
                    );

                updateBalanceDisplay();

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    resetMethodFields();

    updateBalanceDisplay();

    renderPayoutHistory();


    console.log(
        "MARTEY Request Payout initialized successfully"
    );

});
