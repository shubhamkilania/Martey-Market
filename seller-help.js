"use strict";

/* =========================================
   MARTEY SELLER AI
   Frontend AI Assistant Prototype
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const aiMessages = document.getElementById("aiMessages");
const aiChatForm = document.getElementById("aiChatForm");
const aiMessageInput = document.getElementById("aiMessageInput");
const aiSendButton = document.getElementById("aiSendButton");
const quickQuestions = document.querySelectorAll(".quick-question");
const helpTopicCards = document.querySelectorAll(".help-topic-card");


/* =========================================
   BASIC SAFETY CHECK
========================================= */

if (!aiMessages || !aiChatForm || !aiMessageInput) {
    console.error("MARTEY Seller AI: Required elements are missing.");
}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   ADD USER MESSAGE
========================================= */

function addUserMessage(message) {

    if (!aiMessages) return;

    const messageRow = document.createElement("div");

    messageRow.className = "user-message-row";

    messageRow.innerHTML = `
        <div class="user-message">
            ${escapeHTML(message)}
        </div>
    `;

    aiMessages.appendChild(messageRow);

    scrollChatToBottom();

}


/* =========================================
   ADD AI MESSAGE
========================================= */

function addAIMessage(message) {

    if (!aiMessages) return;

    const messageRow = document.createElement("div");

    messageRow.className = "ai-message-row";

    messageRow.innerHTML = `
        <div class="message-avatar">
            M
        </div>

        <div class="ai-message">
            ${message}
        </div>
    `;

    aiMessages.appendChild(messageRow);

    scrollChatToBottom();

}


/* =========================================
   TYPING INDICATOR
========================================= */

function showTypingIndicator() {

    if (!aiMessages) return null;

    const typingRow = document.createElement("div");

    typingRow.className = "ai-message-row typing-row";

    typingRow.innerHTML = `
        <div class="message-avatar">
            M
        </div>

        <div class="ai-message typing-message">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `;

    aiMessages.appendChild(typingRow);

    scrollChatToBottom();

    return typingRow;

}


/* =========================================
   REMOVE TYPING INDICATOR
========================================= */

function removeTypingIndicator(typingRow) {

    if (!typingRow) return;

    typingRow.remove();

}


/* =========================================
   SCROLL CHAT
========================================= */

function scrollChatToBottom() {

    if (!aiMessages) return;

    aiMessages.scrollTo({
        top: aiMessages.scrollHeight,
        behavior: "smooth"
    });

}


/* =========================================
   SELLER DATA
========================================= */

function getSellerProducts() {

    try {

        return JSON.parse(
            localStorage.getItem("marteySellerProducts") || "[]"
        );

    } catch (error) {

        return [];

    }

}


function getSellerPromotions() {

    try {

        return JSON.parse(
            localStorage.getItem("marteySellerPromotions") || "[]"
        );

    } catch (error) {

        return [];

    }

}


/* =========================================
   STORE INFORMATION
========================================= */

function getStoreInformation() {

    const products = getSellerProducts();
    const promotions = getSellerPromotions();

    const activeProducts = products.filter(function (product) {

        const stock = Number(product.stock ?? 0);

        return !product.draft && stock > 0;

    });

    const outOfStockProducts = products.filter(function (product) {

        return Number(product.stock ?? 0) <= 0;

    });

    const activePromotions = promotions.filter(function (promotion) {

        return promotion.status === "Active";

    });

    return {
        totalProducts: products.length,
        activeProducts: activeProducts.length,
        outOfStockProducts: outOfStockProducts.length,
        totalPromotions: promotions.length,
        activePromotions: activePromotions.length
    };

}


/* =========================================
   AI RESPONSE ENGINE
========================================= */

function generateAIResponse(question) {

    const text = question.toLowerCase().trim();

    const store = getStoreInformation();


    /* SALES */

    if (
        text.includes("sales") ||
        text.includes("sell") ||
        text.includes("selling") ||
        text.includes("customer")
    ) {

        return `
            <p>
                To improve your sales, focus on three things:
            </p>

            <p>
                <strong>1. Product listing</strong> — Use clear product
                photos, accurate titles and useful descriptions.
            </p>

            <p>
                <strong>2. Pricing</strong> — Keep your price competitive
                and clearly show discounts when applicable.
            </p>

            <p>
                <strong>3. Visibility</strong> — Use MARTEY Promotions
                to increase product visibility.
            </p>

            <p>
                Your store currently has
                <strong>${store.totalProducts}</strong> product${store.totalProducts === 1 ? "" : "s"}
                and
                <strong>${store.activePromotions}</strong> active promotion${store.activePromotions === 1 ? "" : "s"}.
            </p>
        `;

    }


    /* PRODUCTS */

    if (
        text.includes("product") ||
        text.includes("listing") ||
        text.includes("photo") ||
        text.includes("description")
    ) {

        return `
            <p>
                A strong product listing should contain:
            </p>

            <p>
                • Clear, high-quality product images<br>
                • A simple and searchable product title<br>
                • Accurate description and specifications<br>
                • Correct price and discount<br>
                • Correct stock quantity<br>
                • Available sizes and colours when applicable
            </p>

            <p>
                You currently have
                <strong>${store.totalProducts}</strong>
                product${store.totalProducts === 1 ? "" : "s"} in your seller account.
            </p>
        `;

    }


    /* PROMOTIONS */

    if (
        text.includes("promotion") ||
        text.includes("promote") ||
        text.includes("advertis") ||
        text.includes("reach")
    ) {

        return `
            <p>
                MARTEY Promotions are designed to increase your
                product visibility.
            </p>

            <p>
                You can choose a product, select a duration from
                <strong>1–7 days</strong>, and set a daily budget.
            </p>

            <p>
                Your total promotion budget is:
                <strong>Daily Budget × Number of Days</strong>.
            </p>

            <p>
                Your store currently has
                <strong>${store.activePromotions}</strong>
                active promotion${store.activePromotions === 1 ? "" : "s"}.
            </p>
        `;

    }


    /* ORDERS */

    if (
        text.includes("order") ||
        text.includes("shipping") ||
        text.includes("ship") ||
        text.includes("delivery")
    ) {

        return `
            <p>
                Seller orders should generally move through these stages:
            </p>

            <p>
                <strong>New → Confirmed → Packed → Shipped → Delivered</strong>
            </p>

            <p>
                Keep product stock updated and process new orders
                promptly so customers receive accurate order updates.
            </p>
        `;

    }


    /* INVENTORY */

    if (
        text.includes("inventory") ||
        text.includes("stock") ||
        text.includes("out of stock") ||
        text.includes("low stock")
    ) {

        if (store.outOfStockProducts > 0) {

            return `
                <p>
                    Your store currently has
                    <strong>${store.outOfStockProducts}</strong>
                    product${store.outOfStockProducts === 1 ? "" : "s"}
                    with zero or unavailable stock.
                </p>

                <p>
                    Review those products in your Inventory section
                    and update the stock quantity when new stock arrives.
                </p>
            `;

        }

        return `
            <p>
                Inventory management helps prevent products from
                being sold when they are unavailable.
            </p>

            <p>
                Keep stock quantities updated and check your
                low-stock products regularly.
            </p>

            <p>
                Your current product list does not show any
                zero-stock products.
            </p>
        `;

    }


    /* EARNINGS */

    if (
        text.includes("earning") ||
        text.includes("payout") ||
        text.includes("money") ||
        text.includes("withdraw")
    ) {

        const balance = Number(
            localStorage.getItem("marteySellerAvailableBalance") || 0
        );

        return `
            <p>
                Seller earnings are based on your completed sales
                after applicable MARTEY fees, refunds and other
                adjustments.
            </p>

            <p>
                Your currently stored available payout balance is
                <strong>₹${balance.toLocaleString("en-IN")}</strong>.
            </p>

            <p>
                You can use the
                <strong>Request Payout</strong>
                option from the Earnings section when your payout
                workflow is available.
            </p>
        `;

    }


    /* HELP */

    if (
        text.includes("help") ||
        text.includes("how are you") ||
        text.includes("what can you do")
    ) {

        return `
            <p>
                I can help you with your MARTEY seller store.
            </p>

            <p>
                You can ask me about:
            </p>

            <p>
                • Sales<br>
                • Products<br>
                • Orders<br>
                • Inventory<br>
                • Promotions<br>
                • Earnings
            </p>
        `;

    }


    /* GREETING */

    if (
        text === "hi" ||
        text === "hello" ||
        text === "hey" ||
        text.includes("hi martey") ||
        text.includes("hello martey")
    ) {

        return `
            <p>
                Hi! 👋
            </p>

            <p>
                I'm ready to help you manage your MARTEY store.
                Ask me about sales, products, orders, inventory,
                promotions or earnings.
            </p>
        `;

    }


    /* DEFAULT */

    return `
        <p>
            I can help with your MARTEY seller store.
        </p>

        <p>
            Try asking something like:
        </p>

        <p>
            <strong>“How can I improve my sales?”</strong><br>
            <strong>“How should I promote my product?”</strong><br>
            <strong>“How do I manage my inventory?”</strong><br>
            <strong>“How do seller payouts work?”</strong>
        </p>
    `;

}


/* =========================================
   SEND MESSAGE
========================================= */

function sendMessage(message) {

    if (!message || !message.trim()) return;

    const cleanMessage = message.trim();

    addUserMessage(cleanMessage);

    aiMessageInput.value = "";

    if (aiSendButton) {
        aiSendButton.disabled = true;
    }

    const typingIndicator = showTypingIndicator();

    setTimeout(function () {

        removeTypingIndicator(typingIndicator);

        const response = generateAIResponse(cleanMessage);

        addAIMessage(response);

        if (aiSendButton) {
            aiSendButton.disabled = false;
        }

        aiMessageInput.focus();

    }, 650);

}


/* =========================================
   CHAT FORM
========================================= */

if (aiChatForm) {

    aiChatForm.addEventListener("submit", function (event) {

        event.preventDefault();

        sendMessage(aiMessageInput.value);

    });

}


/* =========================================
   QUICK QUESTIONS
========================================= */

quickQuestions.forEach(function (button) {

    button.addEventListener("click", function () {

        const question =
            button.dataset.question ||
            button.textContent.trim();

        sendMessage(question);

    });

});


/* =========================================
   HELP TOPIC CARDS
========================================= */

helpTopicCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const question = card.dataset.question;

        if (!question) return;

        sendMessage(question);

        if (aiMessages) {

            aiMessages.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    });

});


/* =========================================
   ENTER KEY
========================================= */

if (aiMessageInput) {

    aiMessageInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            aiChatForm.dispatchEvent(
                new Event("submit", {
                    bubbles: true,
                    cancelable: true
                })
            );

        }

    });

}


/* =========================================
   EXTRA CHAT MESSAGE STYLES
   Added through JS so the HTML/CSS
   structure remains compatible.
========================================= */

const dynamicAIStyles = document.createElement("style");

dynamicAIStyles.textContent = `
    .user-message-row {
        display: flex;
        justify-content: flex-end;
        margin: 18px 0;
    }

    .user-message {
        max-width: 70%;
        padding: 13px 16px;
        border-radius: 17px 17px 6px 17px;
        background: #6c4df6;
        color: #ffffff;
        font-size: 14px;
        line-height: 1.55;
    }

    .typing-message {
        display: flex;
        align-items: center;
        gap: 5px;
        min-width: 58px;
    }

    .typing-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #92929f;
        animation: marteyTyping 1.2s infinite ease-in-out;
    }

    .typing-dot:nth-child(2) {
        animation-delay: 0.15s;
    }

    .typing-dot:nth-child(3) {
        animation-delay: 0.3s;
    }

    @keyframes marteyTyping {
        0%,
        60%,
        100% {
            opacity: 0.35;
            transform: translateY(0);
        }

        30% {
            opacity: 1;
            transform: translateY(-3px);
        }
    }

    .ai-message strong {
        color: #ffffff;
        font-weight: 700;
    }

    .ai-send-button:disabled {
        opacity: 0.55;
        cursor: wait;
        transform: none;
    }

    @media (max-width: 600px) {
        .user-message {
            max-width: 84%;
            font-size: 13px;
        }
    }
`;

document.head.appendChild(dynamicAIStyles);


/* =========================================
   INITIAL FOCUS
========================================= */

if (aiMessageInput) {

    setTimeout(function () {
        aiMessageInput.focus();
    }, 300);

}
