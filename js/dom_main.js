import getBooks from "./api.js";
import {
    createElementWithText,
    createImgTag,
    clearResults,
    createErrorMessage,
} from "./dom_utils.js";

const searchButton = document.getElementById("searchButton");

const createCard = (parent, image, title, author, description, link) => {
    const card = document.createElement("div");
    card.addEventListener("click", function () {
        window.open(link, "_blank");
    });
    card.classList.add("card");
    card.appendChild(image).classList.add("card--img");
    card.appendChild(title).classList.add("card--title");
    card.appendChild(author).classList.add("card--subtitle");
    card.appendChild(description).classList.add("card--body");
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
        const link = results[i].link;
        createCard(output, image, title, author, description, link);
    }
};

// const toggleModal = (index) => {
//     const dataOutput = document.getElementById("data");
//     dataOutput.classList.add("grid__1");
//     dataOutput.classList.remove("grid__3");
//     const cards = document.getElementsByClassName("card");
//     addClasses(cards, "card--hide");
//     cards[index].classList.add("card--more-details");
//     cards[index].classList.toggle("card--hide");
//     console.log(cards);
// };

searchButton.addEventListener("click", fetchAndRender);
