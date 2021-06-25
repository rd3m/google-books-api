export const createElementWithText = (type, text) => {
    const newElement = document.createElement(type);
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
    return newElement;
};

export const createImgTag = (source) => {
    const img = document.createElement("img");
    img.src = source;
    return img;
};

export const clearResults = (output) => {
    return (output.innerHTML = "");
};
