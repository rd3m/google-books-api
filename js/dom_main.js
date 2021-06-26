import getBooks from "./api.js";
import {
    createElementWithText,
    createImgTag,
    clearResults,
    createErrorMessage,
} from "./dom_utils.js";

const searchButton = document.getElementById("searchButton");

const createCard = (parent, image, title, author, description) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(description);
    parent.appendChild(card);
};

const fetchAndRender = async (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById("searchBox").value;
    const books = await getBooks(searchTerm);
    const dataOutput = document.getElementById("data");
    clearResults(dataOutput);
    books === null
        ? createErrorMessage(dataOutput)
        : renderResults(books, dataOutput);
};

const renderResults = (results, output) => {
    for (let i = 0; i < results.length; ++i) {
        const image = createImgTag(results[i].image);
        const title = createElementWithText("H3", results[i].title);
        const author = createElementWithText("H5", results[i].author);
        const description = createElementWithText("P", results[i].description);
        createCard(output, image, title, author, description);
    }
};

searchButton.addEventListener("click", fetchAndRender);
