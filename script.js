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

Book.prototype.toggleReadStatus = function() { this.read = !this.read };

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

function addBook(title, author, genre, pages, read, description) {
    const newBook = new Book(title, author, genre, pages, read, description);
    allBooks.push(newBook);

    return newBook;
}

const emptyLibraryPromptContainer = document.querySelector(".empty-library-prompt-container");
const bookList = document.querySelector(".book-list");

const addBookButtonContainers = [
    document.querySelector(".header-right"),
    document.querySelector(".library-section > .section-header"),
    emptyLibraryPromptContainer.firstElementChild
];

// Appends the "Add Book" button to the elements of the document it is supposed to be a child of, and adds an event listener.
function appendAddBookButton() {
    const addBookButton = document.querySelector("#add-book-button-template").content.cloneNode(true);
    addBookButtonContainers.forEach(container => container.appendChild(addBookButton.cloneNode(true)));
} appendAddBookButton();

const bookCardTemplate = bookList.querySelector("#book-card-li-template");

function setBookCardBasedOnReadStatus(bookCard, isRead) {
    const bookStatus = (isRead ? "read" : "unread");
    bookCard.querySelector(".book-status").textContent = bookStatus;

    const markAsReadButton = bookCard.querySelector(".mark-as-read-unread");

    const markAsReadButtonTitle = `Click here if you have ${isRead ? "not " : ""}finished reading this book.`;
    const markAsReadButtonText = "mark as " + (isRead ? "un" : "") + "read";

    markAsReadButton.setAttribute("title", markAsReadButtonTitle);
    markAsReadButton.textContent = markAsReadButtonText;
}

function displayBook(bookOrBookID) {
    let book = undefined;

    if (typeof bookOrBookID === "string")
        book = allBooks.find(book => (book.id === bookOrBookID));
    else if (bookOrBookID instanceof Book)
        book = bookOrBookID;

    if (book === undefined)
        console.error(`Attempting to display an invalid or non-existent book.`);

    const numberOfPagesUnknown = (book.pages === null);

    const bookPages = numberOfPagesUnknown ? "Unknown number of pages" : `${book.pages} page${(book.pages === 1) ? "" : "s"}`;

    const bookCard = bookCardTemplate.content.cloneNode(true);

    bookCard.querySelector(".book-title > cite").textContent = book.title;
    bookCard.querySelector(".book-author").textContent = book.author;
    bookCard.querySelector(".book-genre").textContent = book.genre;
    bookCard.querySelector(".number-of-pages").textContent = bookPages;
    bookCard.querySelector(".book-description").textContent = book.description;

    setBookCardBasedOnReadStatus(bookCard, book.read);

    bookCard.querySelector(".book-card").dataset.id = book.id;

    if (numberOfPagesUnknown)
        bookCard.querySelector(".number-of-pages").style.fontStyle = "italic";

    // TODO: Handle the cases where optional fields have no values.

    bookList.appendChild(bookCard.cloneNode(true));
}

function toggleEmptyLibraryPrompt() {
    const isLibraryEmpty = (allBooks.length === 0);

    emptyLibraryPromptContainer.hidden = !isLibraryEmpty;
    bookList.hidden = !(emptyLibraryPromptContainer.hidden);

    return isLibraryEmpty;
}

const statsTableDataCells = document.querySelector(".stats-table").querySelectorAll("td");

function updateLibraryStats(updateReadUnreadOnly = false) {
    // `updateReadUnreadOnly` prevents re-evaluation of unchanged data when the user marks a book as read/unread. 

    if (typeof updateReadUnreadOnly !== "boolean")
        throw Error(`function \`updateLibraryStats\`: argument passed to \`updateReadUnreadOnly\` is not of type \`boolean\`.`);

    const numberOfBooksRead = allBooks.filter(book => book.read).length;
    const numberOfBooksReadPercent =  (allBooks.length === 0) ? 0 : Math.round(numberOfBooksRead / allBooks.length) * 100;

    const libraryStats = {
        "number-of-books-read": `${numberOfBooksRead} (${numberOfBooksReadPercent}%)`,
        "number-of-books-unread": `${(allBooks.length - numberOfBooksRead)} (${100 - numberOfBooksReadPercent}%)`,
    }

    if (!updateReadUnreadOnly) {
        const numberOfPages = allBooks.reduce((numberOfPages, book) => {
            if (book.pages !== null)
                return (book.pages + numberOfPages);
        }, 0);

        libraryStats["number-of-books"] = allBooks.length;
        libraryStats["number-of-pages"] = numberOfPages;
    }

    for (const dataCell of statsTableDataCells) {
        const name = dataCell.dataset.item;

        if (Object.hasOwn(libraryStats, name))
            dataCell.textContent = libraryStats[name];
    }
}

function displayAllBooks() {
    // (1) Display current library stats
    updateLibraryStats();

    // (2) Return early if the library is empty
    
    if (toggleEmptyLibraryPrompt() === true)
        return;

    // (3) Display all book cards if the library is not empty
    allBooks.forEach(book => displayBook(book));
} displayAllBooks();

bookList.addEventListener('click', (event) => {
    if (event.target.matches(".mark-as-read-unread")) {
        const toggledBookCard = event.target.closest(".book-card");
        const toggledBook = allBooks.find(book => (book.id === toggledBookCard.dataset.id));

        toggledBook.toggleReadStatus();
        setBookCardBasedOnReadStatus(toggledBookCard, toggledBook.read);

        updateLibraryStats(true);

        return;
    }

    if (event.target.matches(".delete-book, .delete-book *")) {
        const confirmDelete = window.confirm("This action cannot be undone." + "\n" + `Are you sure you wish to delete this book?`);

        if (!confirmDelete)
            return;

        // `Node.removeChild` returns a reference to the child node removed.
        const removedBookCard = bookList.removeChild(event.target.closest(".book-card"));
        const indexOfRemovedBook = allBooks.findIndex(book => (book.id === removedBookCard.dataset.id));

        allBooks.splice(indexOfRemovedBook, 1);

        // Show the empty library prompt if the library is empty after deleting the book.
        toggleEmptyLibraryPrompt();

        updateLibraryStats();

        return;
    }
});

const dialog = document.querySelector("#add-edit-book-dialog");
const dialogForm = dialog.querySelector("form");

document.addEventListener('click', (event) => {
    if (event.target.matches(".add-book, .edit-book")) {
        // Open the dialog as a modal.
        dialog.showModal();

        // Reset form inputs to their default values.
        dialogForm.reset();

        const isAddBook = event.target.matches(".add-book");

        const dialogTitle = dialog.querySelector(".dialog-title");
        dialogTitle.textContent = isAddBook ? "Add New Book" : "Edit Book";
    }
});

let bookData = [];

const dialogFormElements = Array.from(dialog.querySelectorAll("input, textarea"));

dialog.addEventListener('click', (event) => {
    if (event.target.matches("[value='discard'], [value='discard'] *"))
        dialog.close("noData");
    else if (event.target.matches("[value='save'], [value='save'] *")) {
        bookData = dialogFormElements.map((dialogFormElement) => {
            if (dialogFormElement.type === "checkbox")
                return (dialogFormElement.checked);

            if (dialogFormElement.type === "number") {
                if (dialogFormElement.value === "")
                    return null;
                else
                    return (Number(dialogFormElement.value));
            }

            return dialogFormElement.value;
        });

        displayBook(addBook(...bookData));

        // Hide the empty library prompt in case the library was empty before adding the book.
        toggleEmptyLibraryPrompt();

        updateLibraryStats();

        // The dialog element will be automatically closed due to `method="dialog"` set on the `form` element.
    }
});

// Script to update the number of characters left in the description textbox as the user modifies its content.

const description = dialog.querySelector("#book-description");
const numberOfCharactersLeft = dialog.querySelector(".number-of-characters");

description.addEventListener('input', () => {
    numberOfCharactersLeft.textContent = (750 - description.value.length);
});
