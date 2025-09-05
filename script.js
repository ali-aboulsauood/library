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
    // Starting Example book
    new Book(
        "The Odin Project", 
        "Erik Trautman",
        "Web Dev",
        244,
        false,
        "Not exactly a book, but it is the great online web development tutorial that helped me build this project :)"
    ),
];

const emptyLibraryPromptContainer = document.querySelector(".empty-library-prompt-container");
const bookList = document.querySelector(".book-list");

// Appends the "Add Book" button to the elements of the document it is supposed to be a child of, and adds an event listener.
function appendAddBookButton() {
    // (1) Append the "Add Book" button

    const addBookButtonContainers = [
        document.querySelector(".header-right"),
        document.querySelector(".library-section > .section-header"),
        emptyLibraryPromptContainer.firstElementChild
    ];

    const addBookButton = document.querySelector("#add-book-button-template").content.cloneNode(true);
    addBookButtonContainers.forEach(container => container.appendChild(addBookButton.cloneNode(true)));
} appendAddBookButton();

function displayAllBooks() {
    // (1) Return early if the library is empty

    const isLibraryEmpty = (allBooks.length === 0);

    [emptyLibraryPromptContainer.hidden, bookList.hidden] = (isLibraryEmpty) ? [false, true] : [true, false];
    
    if (isLibraryEmpty)
        return;

    // (2) Display all book cards if the library is not empty
    allBooks.forEach(book => {
        const bookCard = bookList.querySelector("#book-card-li-template").content.cloneNode(true);

        const bookPages = `${book.pages} page${(book.pages === 1) ? "" : "s"}`;
        const bookStatus = (book.read ? "read" : "unread");

        bookCard.querySelector(".book-title > cite").textContent = book.title;
        bookCard.querySelector(".book-author").textContent = book.author;
        bookCard.querySelector(".book-genre").textContent = book.genre;
        bookCard.querySelector(".number-of-pages").textContent = bookPages;
        bookCard.querySelector(".book-description").textContent = book.description;
        bookCard.querySelector(".book-status").textContent = bookStatus;

        const markAsReadButton = bookCard.querySelector(".mark-as-read-unread");
        const markAsReadButtonTitleAndText = "mark as " + (book.read ? "un" : "") + "read";

        markAsReadButton.setAttribute("title", markAsReadButtonTitleAndText);
        markAsReadButton.textContent = markAsReadButtonTitleAndText;

        bookList.appendChild(bookCard);
    });
} displayAllBooks();

document.addEventListener('click', (event) => {
    if (event.target.matches(".mark-as-read-unread")) {
        // TODO

        return;
    }

    if (event.target.matches(".delete-book")) {
        // TODO
    }
});

const dialog = document.querySelector("#add-edit-book-dialog");

document.addEventListener('click', (event) => {
    if (event.target.matches(".add-book, .edit-book")) {
        // Open the dialog as a modal.
        dialog.showModal();

        const dialogTitle = dialog.querySelector(".dialog-title");
        dialogTitle.textContent = (event.target.matches(".add-book")) ? "Add New Book" : "Edit Book";
    }
});

dialog.addEventListener('click', (event) => {
    if (event.target.matches(".dialog-close, .dialog-close > *"))
        // Close the dialog
        dialog.close();
});

const description = dialog.querySelector("#book-description");
const numberOfCharactersLeft = dialog.querySelector(".number-of-characters");

description.addEventListener('input', () => {
    numberOfCharactersLeft.textContent = (750 - description.value.length);
});
