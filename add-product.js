/* =========================================================
   MARTEY — ADD PRODUCT
   Seller Product Creation System
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const productImagesInput =
        document.getElementById("productImages");

    const imagePreview =
        document.getElementById("imagePreview");

    const saveDraftButton =
        document.getElementById("saveDraftButton");

    const publishProductButton =
        document.getElementById("publishProductButton");


    /* =====================================================
       IMAGE SYSTEM
    ===================================================== */

    let selectedImages = [];


    if (productImagesInput) {

        productImagesInput.addEventListener(
            "change",
            handleImageSelection
        );

    }


    function handleImageSelection(event) {

        const files = Array.from(event.target.files);

        if (!files.length) {
            return;
        }

        files.forEach(file => {

            if (!file.type.startsWith("image/")) {
                return;
            }

            const imageObject = {
                id:
                    Date.now() +
                    Math.random()
                        .toString(36)
                        .substring(2, 9),

                file: file,

                name: file.name
            };

            selectedImages.push(imageObject);

        });

        renderImagePreviews();

        /*
            Reset input so the seller can select
            the same image again if needed.
        */

        productImagesInput.value = "";

    }


    function renderImagePreviews() {

        if (!imagePreview) {
            return;
        }

        imagePreview.innerHTML = "";

        selectedImages.forEach(imageObject => {

            const previewItem =
                document.createElement("div");

            previewItem.className =
                "image-preview-item";


            const image =
                document.createElement("img");


            const imageURL =
                URL.createObjectURL(
                    imageObject.file
                );


            image.src = imageURL;

            image.alt =
                imageObject.name ||
                "Product image";


            const removeButton =
                document.createElement("button");


            removeButton.type = "button";

            removeButton.className =
                "remove-preview";

            removeButton.innerHTML = "×";

            removeButton.setAttribute(
                "aria-label",
                "Remove image"
            );


            removeButton.addEventListener(
                "click",
                () => {

                    removeImage(
                        imageObject.id
                    );

                }
            );


            previewItem.appendChild(image);

            previewItem.appendChild(
                removeButton
            );

            imagePreview.appendChild(
                previewItem
            );

        });

    }


    function removeImage(imageId) {

        selectedImages =
            selectedImages.filter(
                image =>
                    image.id !== imageId
            );

        renderImagePreviews();

    }


    /* =====================================================
       FORM HELPERS
    ===================================================== */

    function getValue(id) {

        const element =
            document.getElementById(id);

        if (!element) {
            return "";
        }

        return element.value.trim();

    }


    function getNumber(id) {

        const value =
            getValue(id);

        if (value === "") {
            return 0;
        }

        return Number(value);

    }


    function getCommaValues(id) {

        const value =
            getValue(id);

        if (!value) {
            return [];
        }

        return value
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");

    }


    /* =====================================================
       PRODUCT DATA
    ===================================================== */

    function collectProductData(status) {

        const price =
            getNumber("productPrice");

        const discount =
            getNumber("productDiscount");

        let sellingPrice = price;


        if (
            price > 0 &&
            discount > 0
        ) {

            sellingPrice =
                price -
                (price * discount / 100);

        }


        return {

            id:
                "MAR-" +
                Date.now(),

            name:
                getValue("productName"),

            description:
                getValue("productDescription"),

            category:
                getValue("productCategory"),

            sku:
                getValue("productSKU"),

            brand:
                getValue("productBrand"),

            price:
                price,

            discount:
                discount,

            sellingPrice:
                Number(
                    sellingPrice.toFixed(2)
                ),

            stock:
                getNumber("productStock"),

            sizes:
                getCommaValues(
                    "productSizes"
                ),

            colors:
                getCommaValues(
                    "productColors"
                ),

            specifications:
                getValue(
                    "productSpecifications"
                ),

            weight:
                getNumber(
                    "productWeight"
                ),

            shippingType:
                getValue(
                    "shippingType"
                ),

            status:
                status,

            images:
                selectedImages.map(
                    image => image.name
                ),

            createdAt:
                new Date().toISOString()

        };

    }


    /* =====================================================
       VALIDATION
    ===================================================== */

    function clearErrors() {

        document
            .querySelectorAll(".error")
            .forEach(element => {

                element.classList.remove(
                    "error"
                );

            });


        document
            .querySelectorAll(".form-error")
            .forEach(element => {

                element.remove();

            });

    }


    function showFieldError(
        fieldId,
        message
    ) {

        const field =
            document.getElementById(
                fieldId
            );

        if (!field) {
            return;
        }

        field.classList.add("error");


        const error =
            document.createElement("small");

        error.className =
            "form-error";

        error.textContent =
            message;


        field.parentElement.appendChild(
            error
        );

    }


    function validateProduct(
        isDraft = false
    ) {

        clearErrors();

        let valid = true;


        /*
            Draft can be saved without
            completing every field.
        */

        if (isDraft) {

            const productName =
                getValue("productName");

            if (!productName) {

                showFieldError(
                    "productName",
                    "Add a product name before saving."
                );

                valid = false;

            }

            return valid;
        }


        /* Product name */

        if (!getValue("productName")) {

            showFieldError(
                "productName",
                "Product name is required."
            );

            valid = false;

        }


        /* Category */

        if (!getValue("productCategory")) {

            showFieldError(
                "productCategory",
                "Please select a category."
            );

            valid = false;

        }


        /* Description */

        if (
            !getValue(
                "productDescription"
            )
        ) {

            showFieldError(
                "productDescription",
                "Product description is required."
            );

            valid = false;

        }


        /* Price */

        const price =
            getNumber("productPrice");

        if (
            !price ||
            price <= 0
        ) {

            showFieldError(
                "productPrice",
                "Enter a valid product price."
            );

            valid = false;

        }


        /* Discount */

        const discount =
            getNumber(
                "productDiscount"
            );

        if (
            discount < 0 ||
            discount > 100
        ) {

            showFieldError(
                "productDiscount",
                "Discount must be between 0 and 100."
            );

            valid = false;

        }


        /* Stock */

        const stock =
            getNumber("productStock");

        if (
            stock < 0 ||
            !Number.isFinite(stock)
        ) {

            showFieldError(
                "productStock",
                "Enter a valid stock quantity."
            );

            valid = false;

        }


        /* Shipping */

        if (
            !getValue("shippingType")
        ) {

            showFieldError(
                "shippingType",
                "Please select a shipping type."
            );

            valid = false;

        }


        /* Images */

        if (
            selectedImages.length === 0
        ) {

            showImageError();

            valid = false;

        }


        return valid;

    }


    function showImageError() {

        const uploadArea =
            document.querySelector(
                ".image-upload-area"
            );

        if (!uploadArea) {
            return;
        }


        const existingError =
            uploadArea.querySelector(
                ".form-error"
            );


        if (existingError) {
            return;
        }


        const error =
            document.createElement("small");

        error.className =
            "form-error";

        error.textContent =
            "Please upload at least one product image.";


        uploadArea.appendChild(error);

    }


    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    function getStoredProducts() {

        try {

            const saved =
                localStorage.getItem(
                    "marteySellerProducts"
                );


            if (!saved) {
                return [];
            }


            const parsed =
                JSON.parse(saved);


            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "Could not read seller products:",
                error
            );

            return [];

        }

    }


    function saveProduct(product) {

        const products =
            getStoredProducts();


        products.push(product);


        localStorage.setItem(
            "marteySellerProducts",
            JSON.stringify(products)
        );

    }


    /* =====================================================
       DRAFT SYSTEM
    ===================================================== */

    function saveDraft() {

        if (
            !validateProduct(true)
        ) {

            return;

        }


        const draft =
            collectProductData(
                "draft"
            );


        localStorage.setItem(
            "marteyProductDraft",
            JSON.stringify(draft)
        );


        showMessage(
            "Product draft saved successfully.",
            "success"
        );

    }


    /* =====================================================
       PUBLISH SYSTEM
    ===================================================== */

    function publishProduct() {

        if (
            !validateProduct(false)
        ) {

            showMessage(
                "Please complete the required fields.",
                "error"
            );

            return;

        }


        const product =
            collectProductData(
                "published"
            );


        saveProduct(product);


        /*
            Remove old draft
            after successful publishing.
        */

        localStorage.removeItem(
            "marteyProductDraft"
        );


        showMessage(
            "Product published successfully!",
            "success"
        );


        /*
            Go back to seller dashboard
            after a short delay.
        */

        setTimeout(() => {

            window.location.href =
                "seller.html";

        }, 1200);

    }


    /* =====================================================
       MESSAGE SYSTEM
    ===================================================== */

    function showMessage(
        message,
        type
    ) {

        const existing =
            document.querySelector(
                ".js-message"
            );


        if (existing) {
            existing.remove();
        }


        const messageBox =
            document.createElement("div");

        messageBox.className =
            "js-message";


        messageBox.textContent =
            message;


        messageBox.style.position =
            "fixed";

        messageBox.style.top =
            "92px";

        messageBox.style.right =
            "25px";

        messageBox.style.zIndex =
            "9999";

        messageBox.style.maxWidth =
            "340px";

        messageBox.style.padding =
            "13px 17px";

        messageBox.style.borderRadius =
            "10px";

        messageBox.style.fontSize =
            "11px";

        messageBox.style.fontWeight =
            "700";

        messageBox.style.border =
            "1px solid rgba(255,255,255,0.08)";

        messageBox.style.boxShadow =
            "0 15px 40px rgba(0,0,0,0.45)";


        if (type === "success") {

            messageBox.style.background =
                "rgba(52,211,153,0.12)";

            messageBox.style.color =
                "#34d399";

            messageBox.style.borderColor =
                "rgba(52,211,153,0.25)";

        } else {

            messageBox.style.background =
                "rgba(248,113,113,0.12)";

            messageBox.style.color =
                "#f87171";

            messageBox.style.borderColor =
                "rgba(248,113,113,0.25)";

        }


        document.body.appendChild(
            messageBox
        );


        setTimeout(() => {

            messageBox.style.opacity =
                "0";

            messageBox.style.transition =
                "opacity 0.25s ease";


            setTimeout(() => {

                messageBox.remove();

            }, 250);

        }, 3000);

    }


    /* =====================================================
       BUTTON EVENTS
    ===================================================== */

    if (saveDraftButton) {

        saveDraftButton.addEventListener(
            "click",
            saveDraft
        );

    }


    if (publishProductButton) {

        publishProductButton.addEventListener(
            "click",
            publishProduct
        );

    }


    /* =====================================================
       LOAD SAVED DRAFT
    ===================================================== */

    function loadDraft() {

        try {

            const savedDraft =
                localStorage.getItem(
                    "marteyProductDraft"
                );


            if (!savedDraft) {
                return;
            }


            const draft =
                JSON.parse(savedDraft);


            if (!draft) {
                return;
            }


            setField(
                "productName",
                draft.name
            );

            setField(
                "productDescription",
                draft.description
            );

            setField(
                "productCategory",
                draft.category
            );

            setField(
                "productSKU",
                draft.sku
            );

            setField(
                "productBrand",
                draft.brand
            );

            setField(
                "productPrice",
                draft.price
            );

            setField(
                "productDiscount",
                draft.discount
            );

            setField(
                "productStock",
                draft.stock
            );

            setField(
                "productSizes",
                Array.isArray(draft.sizes)
                    ? draft.sizes.join(", ")
                    : ""
            );

            setField(
                "productColors",
                Array.isArray(draft.colors)
                    ? draft.colors.join(", ")
                    : ""
            );

            setField(
                "productSpecifications",
                draft.specifications
            );

            setField(
                "productWeight",
                draft.weight
            );

            setField(
                "shippingType",
                draft.shippingType
            );


            showMessage(
                "Your saved draft has been restored.",
                "success"
            );


        } catch (error) {

            console.error(
                "Could not load draft:",
                error
            );

        }

    }


    function setField(
        id,
        value
    ) {

        const field =
            document.getElementById(id);

        if (!field) {
            return;
        }

        if (
            value === undefined ||
            value === null
        ) {

            return;

        }

        field.value = value;

    }


    /* =====================================================
       PRICE PREVIEW
    ===================================================== */

    const priceInput =
        document.getElementById(
            "productPrice"
        );

    const discountInput =
        document.getElementById(
            "productDiscount"
        );


    function updatePricePreview() {

        const price =
            Number(
                priceInput?.value || 0
            );

        const discount =
            Number(
                discountInput?.value || 0
            );


        if (
            !price ||
            price <= 0
        ) {
            return;
        }


        const finalPrice =
            price -
            (
                price *
                discount /
                100
            );


        console.log(
            "MARTEY selling price:",
            finalPrice.toFixed(2)
        );

    }


    if (priceInput) {

        priceInput.addEventListener(
            "input",
            updatePricePreview
        );

    }


    if (discountInput) {

        discountInput.addEventListener(
            "input",
            updatePricePreview
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    loadDraft();

});
