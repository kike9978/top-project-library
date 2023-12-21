const data = [
  { title: "Narnia", author: "J Velazquez", pages: 300, isRead: false },
  { title: "Winnie", author: "Abraham", pages: 20, isRead: true },
  { title: "Bob esponga", author: "Marco Suarez", pages: 4123, isRead: true },
  { title: "Libro Vaquero", author: "Juan Camaney", pages: 240, isRead: false },
  { title: "Como cautivar", author: " L Zavaleta", pages: 430, isRead: false },
];

const myLibrary =[]


function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

Book.prototype.delete = function() {
  console.log(myLibrary.findIndex(book => book.author === this.author))
  myLibrary.splice(myLibrary.findIndex(book => book.author === this.author), 1)
  console.log(myLibrary)
  generateTable()
  // myLibrary.slice(myLibrary.findIndex(author === this.author))
}
data.map(book => {
  myLibrary.push(new Book (book.title, book.author, book.pages, book.isRead))
})

const form = document.querySelector("form")

function addBookToLibrary(e) {
  e.preventDefault()
  const formData = new FormData(form)
  modal.close();
  const entries = Object.fromEntries(formData)
  console.log(entries)
  const book = new Book(entries.title, entries.author, entries.pages, entries.isRead)
  myLibrary.push(book)
  generateTable()
}



const tbody = document.querySelector("tbody")

function generateTable() {
  tbody.innerHTML = ""

  myLibrary.forEach(book => {

    const tr = document.createElement("tr")
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Eliminar";
    tr.setAttribute("data-book", book.title.split(" ").join("") + book.pages)
    const cellTitle = document.createElement("td")
    const cellAuthor = document.createElement("td")
    const cellPages = document.createElement("td")
    const cellIsRead = document.createElement("td")
    cellTitle.innerText = book.title;
    cellAuthor.innerText = book.author;
    cellPages.innerText = book.pages;
    cellIsRead.innerText = book.isRead ? "Leído" : "No leído";
    tr.appendChild(cellTitle)
    tr.appendChild(cellAuthor)
    tr.appendChild(cellPages)
    tr.appendChild(cellIsRead)
    tr.appendChild(deleteBtn)

    tbody.appendChild(tr)
  })
}

generateTable()

const openModalBtn = document.querySelector("#open-modal-btn")
const addBookBtn = document.querySelector("#add-book-btn")
const modal = document.querySelector("dialog")

function handleOpenModal(e) {
  e.preventDefault();
  modal.showModal();
}

openModalBtn.addEventListener("click", (e) => handleOpenModal(e))
form.addEventListener("submit", (e) => addBookToLibrary(e))
addBookBtn.addEventListener("click", (e) => handleAddBookBtn())

function handleAddBookBtn() {
  modal.close()
  console.log("hola")
}