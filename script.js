let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
  this.isRead = false;
}

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.push(book);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);
addBookToLibrary("Moby-Dick", "Herman Melville", 635);
addBookToLibrary("Wuthering Heights", "Emily Brontë", 416);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277);
addBookToLibrary("Jane Eyre", "Charlotte Brontë", 624);

console.log(myLibrary);

function displayBook(arr) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    const cardBook = document.createElement("div");
    container.appendChild(cardBook);

    cardBook.dataset.bookId = arr[i].id;

    const title = document.createElement("h3");
    cardBook.appendChild(title);
    title.textContent = arr[i].title;

    const author = document.createElement("p");
    cardBook.appendChild(author);
    author.textContent = `Author: ${arr[i].author}`;

    const pages = document.createElement("p");
    cardBook.appendChild(pages);
    pages.textContent = `Pages: ${arr[i].pages}`;

    const id = document.createElement("p");
    cardBook.appendChild(id);
    id.textContent = `ID: ${arr[i].id}`;

    cardBook.classList.add("cardbook");

    const buttonDiv = document.createElement("div");
    cardBook.appendChild(buttonDiv);

    buttonDiv.classList.add("forBtn");

    const deleteBook = document.createElement("button");
    buttonDiv.appendChild(deleteBook);

    deleteBook.textContent = "Delete";

    deleteBook.style.backgroundColor = "white";
    deleteBook.style.color = "rgb(117, 117, 255)";
    deleteBook.style.border = "2px solid rgb(117, 117, 255)";

    deleteBook.addEventListener("click", () => {
      const bookId = cardBook.dataset.bookId;
      removeBookById(bookId);
    });

    const readBook = document.createElement("button");
    buttonDiv.appendChild(readBook);

    if (arr[i].isRead) {
      readBook.textContent = "Read";
      readBook.style.backgroundColor = "rgb(117, 117, 255)";
      readBook.style.color = "white";
    } else {
      readBook.textContent = "Unread";
      readBook.style.backgroundColor = "white";
      readBook.style.color = "rgb(117, 117, 255)";
    }

    readBook.style.border = "2px solid rgb(117, 117, 255)";

    readBook.addEventListener("click", () => {
      if (arr[i].isRead === false) {
        readBook.textContent = "Read";
        readBook.style.backgroundColor = "rgb(117, 117, 255)";
        readBook.style.color = "white";
        arr[i].isRead = true;
      } else if (arr[i].isRead) {
        readBook.textContent = "Unread";
        readBook.style.backgroundColor = "white";
        readBook.style.color = "rgb(117, 117, 255)";

        arr[i].isRead = false;
      }
    });
  }
}

function removeBookById(bookId) {
  myLibrary = myLibrary.filter((book) => book.id !== bookId);
  displayBook(myLibrary);
}

const dialog = document.getElementById("bookDialog");
const showBtn = document.getElementById("showBtn");

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("close", () => {
  if (dialog.returnValue === "confirm") {
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const pages = document.getElementById("pagesInput").value;

    if (title && author && pages) {
      addBookToLibrary(title, author, pages);
      displayBook(myLibrary);
    }
  }

  document.getElementById("titleInput").value = "";
  document.getElementById("authorInput").value = "";
  document.getElementById("pagesInput").value = "";
});

displayBook(myLibrary);
