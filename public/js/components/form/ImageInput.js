import { getChildList, createElement } from "../../../../src/noReact";

const ImageInput = () => {
    // Inital state
    const images = {};

    // Parent element
    const container = document.getElementById("images-input").querySelector(".image-input");

    // The onClick file input
    const fileInput = container.children.item(1).querySelector("input");

    /**  Sets the actual value that gets sent
     * <input name="images" type="hidden" />
     * @param {string[]} urls
     */
    // prettier-ignore
    const setHiddenInputValue = (images) => (container.children.item(0).value = JSON.stringify(Object.values(images)));

    const deleteImage = (imageContainer) => {
        delete images[parseInt(imageContainer.getAttribute("data-id"))];
        setHiddenInputValue(images);
        container.removeChild(imageContainer);
    };

    const createImageDiv = (url, imageID) => {
        const container = createElement("div", {
            class: "submitted-image square square-medium",
            style: `background-image: url('${url}');`,
            "data-url": url,
            "data-id": imageID,
        });

        container.addEventListener("click", (e) => deleteImage(e.target));

        return container;
    };

    // Main functions
    const addImage = (image, imageID = Date.now()) => {
        images[imageID] = image;
        setHiddenInputValue(images);
        container.appendChild(createImageDiv(image, imageID));
        console.log(JSON.parse(container.children.item(0).value).length);
    };

    // When a file gets uploaded: these events will fire
    fileInput.addEventListener("change", function () {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            // !
            // TODO: double check for file types
            // Add image to the state
            addImage(reader.result);
        });
        reader.readAsDataURL(this.files[0]);
    });
};

export default ImageInput;
