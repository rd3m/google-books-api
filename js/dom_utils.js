export const createElementWithText = (type, text) => {
    const newElement = document.createElement(type);
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
    return newElement;
};

export const createImgTag = (source) => {
    const img = document.createElement("img");
    source.includes("http")
        ? (img.src = source)
        : (img.alt = "Image not found");
    return img;
};

export const clearResults = (output) => {
    return (output.innerHTML = "");
};

export const createErrorMessage = (parent) => {
    parent.appendChild(createElementWithText("H3", "No results returned"));
};

export const truncate = (str, max) => {
    if (str !== null) {
        return str.length < max
            ? str
            : `${str.substr(0, str.substr(0, max).lastIndexOf(" "))} [...]`;
    } else return null;
};

export const removeElements = (className) => {};
