const getBooks = (searchTerm) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q={${searchTerm}}&maxResults=14`;
    return apiHandler(url);
};

const apiHandler = async (url) => {
    const responsePromise = fetch(url);
    const response = await responsePromise; // Response Object
    const jsonResponse = await response.json();
    console.log(jsonResponse); // view array of objects
    return getRelevantInfo(jsonResponse);
};

const getRelevantInfo = (jsonResponse) => {
    return jsonResponse.items.map((item) => {
        return {
            title: item.volumeInfo.title,
            image: item.volumeInfo.imageLinks.thumbnail,
            author: item.volumeInfo.authors.join(", "),
            description: item.volumeInfo.description,
        };
    });
};

export default getBooks;
