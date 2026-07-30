# Library

![Screenshot of Library. Header has logo and slogan on its left, and an "Add Book" button on its right. Main body is divided into a Library section having one card containing the details of and a delete button for a book titled "The Odin Project", and a Log section containing a table of stats pertaining to the whole library.](screenshot.png)

> A simple e-library to put your beloved books on display

A small web browser-based library app, created as a practice with [The Odin Project](https://theodinproject.com) (TOP) on [Objects and Object Constructors in JavaScript](https://theodinproject.com/lessons/node-path-javascript-objects-and-object-constructors).

> [!NOTE]
> Despite being primarily a practice project, contributions are still welcome! You can try resolving any [issues](https://github.com/alikamel-dev/library/issues), or, if you think you have found one, feel free to [create an issue](https://github.com/alikamel-dev/library/issues/new) or solve it and [create a pull request](https://github.com/alikamel-dev/library/compare). Note that pull requests implementing the [upcoming features](#upcoming-features) will be rejected.

## Viewing the app

You can use the app on its [GitHub Pages website](https://alikamel-dev.github.io/library).

>[!IMPORTANT]
> About supported devices and browsers:
> - The app is designed to be played in a 1920 × 1080 screen/window resolution. The website is not completely responsive, and is likely to produce worse visual results on smaller screen sizes, especially mobile phone screens, though this issue can be mitigated by loading the desktop version of the website.
> - The app is primarily developed for [Google Chrome](https://google.com/chrome). It should function properly in fairly new versions of major web browsers, though minor visual differences may arise.
>
> Currently the app does _not_ have the capability to save your library locally or to the cloud. Your library will be lost on reloading (refreshing) the page or on closing the page tab or the web browser and loading the page again. I intend to [implement this feature in the future](#upcoming-features) if I have time, though.

> [!TIP]
> If you encounter an issue with the app, feel free to [create an issue](https://github.com/alikamel-dev/library/issues/new) or even solve it yourself and [create a pull request](https://github.com/alikamel-dev/library/compare).

If you like my project, please support me by starring [its repository on GitHub](https://github.com/alikamel-dev/library) and, if you are a fellow learner of The Odin Project, liking it on the project's [community solutions page](https://theodinproject.com/lessons/node-path-javascript-library/project_submissions).

## Features

Currently, the app has the following features:

1. **Add Book**: You can add a new book the button labeled _Add Book_, which can be found on the right side of the header, on the top-right side of the _Library_ section, and additionally in the prompt appearing in the center of the library section if the library is empty. Currently, you can set the following attributes for each book: title, author name, genre, number of pages (optional), description (optional), and whether you have finished reading the book.

2. **Delete Book**: You can delete a book from the library by clicking on the button with a trash can icon located at the bottom-right corner of its book card.

3. **Mark as Read/Unread**: You can mark a book as read (meaning you have finished reading the entire book) or unread through a toggle labeled _Mark as read_ or _Mark as unread_ on its book card.

4. **Library Log**: Contains a table with related statistics to the library. Currently, it shows the total number of books, total number of book pages, number and percentage of books that you have and have not finished reading. The log is updated as you add/edit/delete books or mark them as read or unread. You can hover over table headers to view a tooltip explaining the statistic it represents.

### Upcoming features

> [!NOTE]
> Since this is a practice project, any pull requests implementing any of the aforementioned features will be rejected.

The project is intended to have the following features in the (hopefully near) future:

1. **Storage**: The most likely course is that the project will use local storage first, then it will later have a backend where it could be possible to store your library on the cloud by signing in with an account, or to store it locally if you choose not to sign in.

2. **Edit Book**: Self-explanatory: you will be able to edit the details of an already created book.

3. **Color Themes**: Light, Dark, and Sepia themes.

## Design

### Background Image

The background image, only used in page and dialog headers, is [_close up photo of educational book lot_](https://unsplash.com/photos/closeup-photo-of-educational-book-lot-D1Pa78SnrH0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) by [Drew Coffman on Unsplash](https://unsplash.com/@drewcoffman?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash).

You can find the attribution at the bottom-left corner of the header on hovering over it.

### Fonts and Colors

#### Fonts

The following are the main fonts used for this project. Each link leads to the respective download page of the font.

| Type of text           | Font                                                                          |
|------------------------|-------------------------------------------------------------------------------|
| Page title (logo)      | [Cinzel Decorative](https://fonts.google.com/specimen/Cinzel+Decorative) Bold |
| Page subtitle (slogan) | [Noto Serif](https://fonts.google.com/noto/specimen/Noto+Serif) Regular       |
| Other page text        | [Junicode](https://fontsquirrel.com/fonts/junicode) Bold and Italic           |

### Colors

The following are the colors used for this project. Each link leads to the respective [ColorHexa](https://colorhexa.com) page of the color.

The colors were taken from the [Grand Egyptian Museum (GEM) website](https://visit-gem.com).

| Type of color | Use                                                                                                       |
|---------------|-----------------------------------------------------------------------------------------------------------|
| Primary       | Mainly a background color                                                                                 |
| Secondary     | Mainly for the page title (logo) and subtitle (slogan), and other titles such as section and book titles. |
| Text          | for body text                                                                                             |

|                    |               **Primary Color**               |              **Secondary Color**              |                     **Text Color**                    |
|:------------------:|:---------------------------------------------:|:---------------------------------------------:|:-----------------------------------------------------:|
| **Dark** (Default) | [`#212529`](https://colorhexa.com/212529)     | [`#7C6857`](https://colorhexa.com/7c6857)     | [`#FFFFFF`](https://colorhexa.com/ffffff) (white)     |
| **Light**          | [`#EE7200`](https://colorhexa.com/ee7200)     | [`#EFEFEF`](https://colorhexa.com/efefef)     | [`#000000`](https://colorhexa.com/000000) (black)     |

## Other Projects

Feel free to view my other projects on [my website](https://alikamel-dev.github.io/homepage).
