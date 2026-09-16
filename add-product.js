/* =========================================================
   MARTEY — ADD / EDIT PRODUCT SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const imageInput =
        document.getElementById("productImages");

    const imagePreview =
        document.getElementById("imagePreview");

    const saveDraftButton =
        document.getElementById("saveDraftButton");

    const publishButton =
        document.getElementById("publishProductButton");


    /* =====================================================
       EDIT MODE
    ===================================================== */

    const urlParams =
        new URLSearchParams(window.location.search);

    const editProductId =
        urlParams.get("edit");

    let isEditMode = Boolean(editProductId);

    let editingProduct = null;


    /* =====================================================
       PRODUCT STORAGE
    ===================================================== */

    function getProducts() {
        try {
            return JSON.parse(
                localStorage.getItem("marteySellerProducts")
            ) || [];
        } catch (error) {
            console.error(
                "MARTEY: Products loading failed.",
                error
            );

            return [];
        }
    }


    function saveProducts(products) {
        localStorage.setItem(
            "marteySellerProducts",
            JSON.stringify(products)
        );
    }


    /* =====================================================
       FIND EDITING PRODUCT
    ===================================================== */

    if (isEditMode) {

        const products = getProducts();

        editingProduct =
            products.find(
                product =>
                    String(product.id) ===
                    String(editProductId)
            );

        if (!editingProduct) {

            alert(
                "The product you are trying to edit was not found."
            );

            window.location.href =
                "seller.html";

            return;
        }
    }


    /* =====================================================
       IMAGE SYSTEM
    ===================================================== */

    let selectedImages = [];


    /*
       Existing image names are stored in localStorage,
       but actual image files are not stored yet.
    */

    function loadExistingImages(product) {

        if (!product) return;

        if (
            Array.isArray(product.imageNames) &&
            product.imageNames.length
        ) {

            selectedImages =
                product.imageNames.map(name => ({
                    id:
                        "existing-" +
                        Date.now() +
                        Math.random(),

                    file: null,

                    name: name,

                    existing: true
                }));

        }

        renderImages();
    }


    imageInput?.addEventListener(
        "change",
        event => {

            const files =
                Array.from(event.target.files);

            files.forEach(file => {

                if (!file.type.startsWith("image/")) {
                    return;
                }

                selectedImages.push({

                    id:
                        Date.now() +
                        Math.random(),

                    file: file,

                    name: file.name,

                    existing: false

                });

            });

            renderImages();

            imageInput.value = "";

        }
    );


    function renderImages() {

        if (!imagePreview) return;

        imagePreview.innerHTML = "";

        selectedImages.forEach(item => {

            const wrapper =
                document.createElement("div");

            wrapper.className =
                "image-preview-item";


            const img =
                document.createElement("img");


            if (item.file) {

                img.src =
                    URL.createObjectURL(
                        item.file
                    );

            } else {

                /*
                   Existing images are currently only
                   represented by their filename.
                */

                img.src =
                    createImagePlaceholder();

            }


            img.alt =
                item.name;


            const remove =
                document.createElement("button");

            remove.type = "button";

            remove.className =
                "remove-preview";

            remove.innerHTML = "×";


            remove.addEventListener(
                "click",
                () => {

                    selectedImages =
                        selectedImages.filter(
                            image =>
                                image.id !== item.id
                        );

                    renderImages();

                }
            );


            wrapper.appendChild(img);

            wrapper.appendChild(remove);

            imagePreview.appendChild(wrapper);

        });

    }


    function createImagePlaceholder() {

        return (
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="300"
                    height="300"
                    viewBox="0 0 300 300"
                >
                    <rect
                        width="300"
                        height="300"
                        fill="#18181b"
                    />

                    <text
                        x="150"
                        y="140"
                        text-anchor="middle"
                        fill="#a1a1aa"
                        font-size="52"
                    >
                        📦
                    </text>

                    <text
                        x="150"
                        y="190"
                        text-anchor="middle"
                        fill="#71717a"
                        font-size="16"
                    >
                        Existing Product Image
                    </text>
                </svg>
            `)
        );

    }


    /* =====================================================
       SIZE SELECTION
    ===================================================== */

    const sizeButtons =
        document.querySelectorAll(
            "[data-size]"
        );

    const selectedSizes = [];


    sizeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const size =
                    button.dataset.size;


                if (
                    selectedSizes.includes(size)
                ) {

                    const index =
                        selectedSizes.indexOf(size);

                    selectedSizes.splice(
                        index,
                        1
                    );

                    button.classList.remove(
                        "selected"
                    );

                } else {

                    selectedSizes.push(size);

                    button.classList.add(
                        "selected"
                    );

                }


                updateHiddenField(
                    "productSizes",
                    selectedSizes
                );

            }
        );

    });


    /* =====================================================
       COLOUR SELECTION
    ===================================================== */

    const colourButtons =
        document.querySelectorAll(
            "[data-color]"
        );

    const selectedColours = [];


    colourButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const colour =
                    button.dataset.color;


                if (
                    selectedColours.includes(colour)
                ) {

                    const index =
                        selectedColours.indexOf(
                            colour
                        );

                    selectedColours.splice(
                        index,
                        1
                    );

                    button.classList.remove(
                        "selected"
                    );

                } else {

                    selectedColours.push(colour);

                    button.classList.add(
                        "selected"
                    );

                }


                updateHiddenField(
                    "productColors",
                    selectedColours
                );

            }
        );

    });


    function updateHiddenField(
        id,
        values
    ) {

        const field =
            document.getElementById(id);

        if (!field) return;

        field.value =
            values.join(",");

    }


    /* =====================================================
       FORM VALUES
    ===================================================== */

    function getValue(id) {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : "";

    }


    function getNumber(id) {

        const value =
            getValue(id);

        return value === ""
            ? 0
            : Number(value);

    }


    function getArray(id) {

        const value =
            getValue(id);

        if (!value) {
            return [];
        }

        return value
            .split(",")
            .map(item => item.trim())
            .filter(Boolean);

    }


    /* =====================================================
       PRODUCT DATA
    ===================================================== */

    function collectProduct(
        status,
        existingProduct = null
    ) {

        const price =
            getNumber("productPrice");

        const discount =
            getNumber("productDiscount");


        const sellingPrice =
            price -
            (
                price *
                discount /
                100
            );


        return {

            /*
               Keep the SAME ID when editing.
               Create a NEW ID only for a new product.
            */

            id:
                existingProduct
                    ? existingProduct.id
                    : "MAR-" + Date.now(),


            name:
                getValue("productName"),


            category:
                getValue("productCategory"),


            brand:
                getValue("productBrand"),


            sku:
                getValue("productSKU"),


            description:
                getValue("productDescription"),


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
                getArray("productSizes"),


            colours:
                getArray("productColors"),


            specifications:
                getValue(
                    "productSpecifications"
                ),


            weight:
                getNumber("productWeight"),


            shippingType:
                getValue("shippingType"),


            /*
               Keep existing image names if the seller
               does not upload a new image.
            */

            imageNames:
                selectedImages.map(
                    image => image.name
                ),


            status:
                status,


            createdAt:
                existingProduct &&
                existingProduct.createdAt
                    ? existingProduct.createdAt
                    : new Date().toISOString(),


            updatedAt:
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


    function error(
        id,
        message
    ) {

        const field =
            document.getElementById(id);

        if (!field) return;

        field.classList.add("error");


        const errorText =
            document.createElement("small");

        errorText.className =
            "form-error";

        errorText.textContent =
            message;


        if (field.parentElement) {

            field.parentElement.appendChild(
                errorText
            );

        }

    }


    function validate() {

        clearErrors();

        let valid = true;


        if (!getValue("productName")) {

            error(
                "productName",
                "Product name is required."
            );

            valid = false;

        }


        if (!getValue("productCategory")) {

            error(
                "productCategory",
                "Please select a category."
            );

            valid = false;

        }


        if (!getValue("productDescription")) {

            error(
                "productDescription",
                "Product description is required."
            );

            valid = false;

        }


        if (
            getNumber("productPrice") <= 0
        ) {

            error(
                "productPrice",
                "Enter a valid price."
            );

            valid = false;

        }


        if (
            getNumber("productStock") < 0
        ) {

            error(
                "productStock",
                "Enter a valid stock quantity."
            );

            valid = false;

        }


        if (!getValue("shippingType")) {

            error(
                "shippingType",
                "Please select shipping type."
            );

            valid = false;

        }


        /*
           In Edit Mode, existing images count as images.
        */

        if (
            selectedImages.length === 0
        ) {

            const uploadArea =
                document.querySelector(
                    ".image-upload-area"
                );

            if (uploadArea) {

                const text =
                    document.createElement(
                        "small"
                    );

                text.className =
                    "form-error";

                text.textContent =
                    "Please upload at least one image.";

                uploadArea.appendChild(text);

            }

            valid = false;

        }


        return valid;

    }


    /* =====================================================
       SAVE NEW PRODUCT
    ===================================================== */

    function saveProduct(product) {

        const products =
            getProducts();

        products.push(product);

        saveProducts(products);

    }


    /* =====================================================
       UPDATE EXISTING PRODUCT
    ===================================================== */

    function updateProduct(product) {

        const products =
            getProducts();

        const index =
            products.findIndex(
                item =>
                    String(item.id) ===
                    String(product.id)
            );


        if (index === -1) {

            return false;

        }


        products[index] =
            product;

        saveProducts(products);

        return true;

    }


    /* =====================================================
       SAVE DRAFT
    ===================================================== */

    saveDraftButton?.addEventListener(
        "click",
        () => {

            const name =
                getValue("productName");


            if (!name) {

                error(
                    "productName",
                    "Add a product name first."
                );

                return;

            }


            /*
               If editing an existing product,
               keep its ID.
            */

            const draft =
                collectProduct(
                    "draft",
                    editingProduct
                );


            localStorage.setItem(
                "marteyProductDraft",
                JSON.stringify(draft)
            );


            showMessage(
                isEditMode
                    ? "Product changes saved as draft."
                    : "Product draft saved."
            );

        }
    );


    /* =====================================================
       PUBLISH / SAVE CHANGES
    ===================================================== */

    publishButton?.addEventListener(
        "click",
        () => {

            if (!validate()) {

                showMessage(
                    "Please complete the required fields.",
                    true
                );

                return;

            }


            /* =================================================
               EDIT MODE
            ================================================= */

            if (isEditMode) {

                const updatedProduct =
                    collectProduct(
                        "published",
                        editingProduct
                    );


                const updated =
                    updateProduct(
                        updatedProduct
                    );


                if (!updated) {

                    showMessage(
                        "Could not update the product.",
                        true
                    );

                    return;

                }


                localStorage.removeItem(
                    "marteyProductDraft"
                );


                localStorage.removeItem(
                    "marteyEditingProduct"
                );


                showMessage(
                    "Product updated successfully!"
                );


                setTimeout(() => {

                    window.location.href =
                        "seller.html";

                }, 1200);


                return;
            }


            /* =================================================
               NEW PRODUCT
            ================================================= */

            const product =
                collectProduct(
                    "published"
                );


            saveProduct(product);


            localStorage.removeItem(
                "marteyProductDraft"
            );


            showMessage(
                "Product published successfully!"
            );


            setTimeout(() => {

                window.location.href =
                    "seller.html";

            }, 1200);

        }
    );


    /* =====================================================
       MESSAGE
    ===================================================== */

    function showMessage(
        message,
        isError = false
    ) {

        const old =
            document.querySelector(
                ".js-message"
            );

        old?.remove();


        const box =
            document.createElement("div");

        box.className =
            "js-message";


        box.textContent =
            message;


        box.style.position =
            "fixed";

        box.style.top =
            "85px";

        box.style.right =
            "22px";

        box.style.zIndex =
            "9999";

        box.style.padding =
            "12px 16px";

        box.style.borderRadius =
            "9px";

        box.style.fontSize =
            "14px";

        box.style.fontWeight =
            "700";

        box.style.background =
            isError
                ? "rgba(248,113,113,0.12)"
                : "rgba(52,211,153,0.12)";

        box.style.color =
            isError
                ? "#f87171"
                : "#34d399";

        box.style.border =
            isError
                ? "1px solid rgba(248,113,113,0.25)"
                : "1px solid rgba(52,211,153,0.25)";


        document.body.appendChild(
            box
        );


        setTimeout(() => {

            box.remove();

        }, 3000);

    }


    /* =====================================================
       LOAD PRODUCT INTO FORM
    ===================================================== */

    function loadProductForEdit() {

        if (!editingProduct) {
            return;
        }


        setField(
            "productName",
            editingProduct.name
        );


        setField(
            "productCategory",
            editingProduct.category
        );


        setField(
            "productBrand",
            editingProduct.brand
        );


        setField(
            "productSKU",
            editingProduct.sku
        );


        setField(
            "productDescription",
            editingProduct.description
        );


        setField(
            "productPrice",
            editingProduct.price
        );


        setField(
            "productDiscount",
            editingProduct.discount
        );


        setField(
            "productStock",
            editingProduct.stock
        );


        setField(
            "productSpecifications",
            editingProduct.specifications
        );


        setField(
            "productWeight",
            editingProduct.weight
        );


        setField(
            "shippingType",
            editingProduct.shippingType
        );


        /* =================================================
           RESTORE SIZES
        ================================================= */

        if (
            Array.isArray(editingProduct.sizes)
        ) {

            editingProduct.sizes.forEach(
                size => {

                    const button =
                        document.querySelector(
                            `[data-size="${size}"]`
                        );


                    if (!button) {
                        return;
                    }


                    button.classList.add(
                        "selected"
                    );


                    if (
                        !selectedSizes.includes(
                            size
                        )
                    ) {

                        selectedSizes.push(
                            size
                        );

                    }

                }
            );


            updateHiddenField(
                "productSizes",
                selectedSizes
            );

        }


        /* =================================================
           RESTORE COLOURS
        ================================================= */

        if (
            Array.isArray(
                editingProduct.colours
            )
        ) {

            editingProduct.colours.forEach(
                colour => {

                    const button =
                        document.querySelector(
                            `[data-color="${colour}"]`
                        );


                    if (!button) {
                        return;
                    }


                    button.classList.add(
                        "selected"
                    );


                    if (
                        !selectedColours.includes(
                            colour
                        )
                    ) {

                        selectedColours.push(
                            colour
                        );

                    }

                }
            );


            updateHiddenField(
                "productColors",
                selectedColours
            );

        }


        /* =================================================
           EXISTING IMAGES
        ================================================= */

        loadExistingImages(
            editingProduct
        );


        /* =================================================
           CHANGE PAGE TEXT
        ================================================= */

        if (publishButton) {

            publishButton.textContent =
                "Save Changes";

        }


        const heading =
            document.querySelector(
                "h1"
            );


        if (
            heading &&
            (
                heading.textContent
                    .toLowerCase()
                    .includes("add product")
            )
        ) {

            heading.textContent =
                "Edit Product";

        }


        document.title =
            "MARTEY — Edit Product";


        showMessage(
            "Editing existing product."
        );

    }


    /* =====================================================
       LOAD DRAFT
    ===================================================== */

    function loadDraft() {

        /*
           Do NOT load normal draft when editing
           an existing product.
        */

        if (isEditMode) {
            return;
        }


        try {

            const saved =
                localStorage.getItem(
                    "marteyProductDraft"
                );


            if (!saved) return;


            const draft =
                JSON.parse(saved);


            if (!draft) return;


            setField(
                "productName",
                draft.name
            );


            setField(
                "productCategory",
                draft.category
            );


            setField(
                "productBrand",
                draft.brand
            );


            setField(
                "productSKU",
                draft.sku
            );


            setField(
                "productDescription",
                draft.description
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


            /* Restore sizes */

            if (
                Array.isArray(draft.sizes)
            ) {

                draft.sizes.forEach(
                    size => {

                        const button =
                            document.querySelector(
                                `[data-size="${size}"]`
                            );


                        if (button) {

                            button.classList.add(
                                "selected"
                            );


                            if (
                                !selectedSizes.includes(
                                    size
                                )
                            ) {

                                selectedSizes.push(
                                    size
                                );

                            }

                        }

                    }
                );


                updateHiddenField(
                    "productSizes",
                    selectedSizes
                );

            }


            /* Restore colours */

            if (
                Array.isArray(draft.colours)
            ) {

                draft.colours.forEach(
                    colour => {

                        const button =
                            document.querySelector(
                                `[data-color="${colour}"]`
                            );


                        if (button) {

                            button.classList.add(
                                "selected"
                            );


                            if (
                                !selectedColours.includes(
                                    colour
                                )
                            ) {

                                selectedColours.push(
                                    colour
                                );

                            }

                        }

                    }
                );


                updateHiddenField(
                    "productColors",
                    selectedColours
                );

            }


            showMessage(
                "Saved draft restored."
            );


        } catch (error) {

            console.error(
                "Draft loading failed:",
                error
            );

        }

    }


    /* =====================================================
       SET FIELD
    ===================================================== */

    function setField(
        id,
        value
    ) {

        const field =
            document.getElementById(id);


        if (
            field &&
            value !== undefined &&
            value !== null
        ) {

            field.value =
                value;

        }

    }


    /* =====================================================
       PAGE INITIALIZATION
    ===================================================== */

    if (isEditMode) {

        loadProductForEdit();

    } else {

        loadDraft();

    }

});
