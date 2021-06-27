import getBooks from "./api.js";
import {
    createElementWithText,
    createImgTag,
    clearResults,
    createErrorMessage,
    truncate,
} from "./dom_utils.js";

const searchButton = document.getElementById("searchButton");

const createCard = (parent, image, title, author, description, index) => {
    const card = document.createElement("div");
    card.addEventListener("click", function () {
        moreDetails(index);
    });
    card.classList.add("card", `${index}`);
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
        const description = createElementWithText(
            "P",
            truncate(results[i].description, 300)
        );
        const index = [i];
        createCard(output, image, title, author, description, index);
    }
};

const moreDetails = (index) => {
    const dataOutput = document.getElementById("data");
    dataOutput.classList.add("grid__1");
    dataOutput.classList.remove("grid__3");
    const cards = document.getElementsByClassName("card");
    console.log(cards);
    const indexString = index.join();
    // for (let card in cards) {
    //     if (!card.classList.contains(`${indexString}`)) {
    //         card.classList.remove("card");
    //     }
    // }
    console.log(typeof index.join());
};

searchButton.addEventListener("click", fetchAndRender);
