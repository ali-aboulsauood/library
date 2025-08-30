"use strict";

function Book(title, author, genre, pages, read, description) {
    if (!new.target)
        throw Error(`Constructor ${Book.name} called without the \`new\` operator.`);

    // TODO: Handle validation and sanitization methods for the arguments of `Book` in the markup and the script.

    // a universally unique identifier (UUID) that ensures that each book has a unique and stable identifier, preventing issues when books are removed or rearranged.
    this.id = crypto.randomUUID();

    // TODO: Find a way to avoid repeating book parameters.

    // Refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign.
    Object.assign(this, { title, author, genre, pages, read, description });
}

// Object destructuring used in the function to allow the `Book` object to be correctly created, regardless of the order of properties in the object passed as argument.
function addBook({ title, author, genre, pages, read, description }) {
    const newBook = new Book(title, author, genre, pages, read, description);

    allBooks.push(newBook);
}

// Contains all the books the user has added to their library, in addition to a starting example book.
const allBooks = [
    // A starting example book.
    new Book("The Odin Project", "Erik Trautman", "Web Dev", null, false, "Not exactly a book, but it is the great online web development tutorial that helped me create this library :)"),
];

function displayAllBooks() {
    allBooks.forEach((book) => {
        
    });
}
