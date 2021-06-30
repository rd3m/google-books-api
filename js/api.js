const getRelevantInfo = (jsonResponse) => {
    return jsonResponse.items.map((item) => {
        const book = {
            title: null,
            image: null,
            author: null,
            description: null,
            link: null,
        };
        book.title = item.volumeInfo?.title || book.title;
        book.image = item.volumeInfo?.imageLinks?.thumbnail || book.image;
        book.author = item.volumeInfo?.authors?.join(", ") || book.author;
        book.description = item.volumeInfo?.description || book.description;
        book.link = item.volumeInfo?.infoLink || book.link;
        return book;
    });
};

const apiHandler = async (url) => {
    const responsePromise = fetch(url);
    const response = await responsePromise; // Response Object
    const jsonResponse = await response.json();
    console.log(jsonResponse.items); // view array of objects
    return jsonResponse.items !== undefined
        ? getRelevantInfo(jsonResponse)
        : null;
};

const getBooks = (searchTerm) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q={${searchTerm}}&maxResults=18`;
    return apiHandler(url);
};

export default getBooks;
