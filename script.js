const data = [
  { title: "Narnia", author: "J Velazquez", pages: 300, isRead: false },
  { title: "Winnie", author: "Abraham", pages: 20, isRead: true },
  { title: "Bob esponga", author: "Marco Suarez", pages: 4123, isRead: true },
  { title: "Libro Vaquero", author: "Juan Camaney", pages: 240, isRead: false },
  { title: "Como cautivar", author: " L Zavaleta", pages: 430, isRead: false },
];

const myLibrary = []



class Book {
  constructor(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
  }

  delete(e) {
    const bookID = e.target.parentNode.getAttribute("data-book")
    console.log(e)
    console.log(myLibrary.findIndex(book => book.author === this.author))
    myLibrary.splice(myLibrary.findIndex(book => book.author === this.author), 1)
    console.log(myLibrary)
    const rowToDelete = document.querySelector(`tr[data-book=${bookID}]`)
    console.log(bookID)
    rowToDelete.remove()
  }

  changeReadStatus(e) {
    const bookID = e.target.parentNode.getAttribute("data-book")
    const arrayIndex = myLibrary.findIndex(book => { return formatBookID(book) === bookID })
    let readStatus = myLibrary[arrayIndex].isRead
    myLibrary[arrayIndex].isRead = !readStatus
    readStatus = myLibrary[arrayIndex].isReadd
    const cellToEdit = document.querySelector(`tr[data-book=${bookID}] td[data-cell=isRead]`)
    cellToEdit.innerText = readStatus ? "Leído" : "No leído"
  }

}

data.map(book => {
  myLibrary.push(new Book(book.title, book.author, book.pages, book.isRead))
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

function generateRow() {

}

const tbody = document.querySelector("tbody")

function generateTable() {
  tbody.innerHTML = ""

  myLibrary.forEach(book => {

    const tr = document.createElement("tr")

    const readStatusBtn = document.createElement("button")
    readStatusBtn.innerText = "Cambiar estatus de leído";
    readStatusBtn.addEventListener("click", e => Book.prototype.changeReadStatus(e))
    const editBtn = document.createElement("button")
    editBtn.innerText = "Editar";
    editBtn.addEventListener("click", e => {
      handleOpenModal(e);
    })

    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Eliminar";
    deleteBtn.addEventListener("click", (e) => Book.prototype.delete(e))

    tr.setAttribute("data-book", formatBookID(book))
    const cellTitle = document.createElement("td")
    const cellAuthor = document.createElement("td")
    const cellPages = document.createElement("td")
    const cellIsRead = document.createElement("td")
    cellIsRead.setAttribute("data-cell", "isRead")
    cellTitle.innerText = book.title;
    cellAuthor.innerText = book.author;
    cellPages.innerText = book.pages;
    cellIsRead.innerText = book.isRead ? "Leído" : "No leído";
    tr.appendChild(cellTitle)
    tr.appendChild(cellAuthor)
    tr.appendChild(cellPages)
    tr.appendChild(cellIsRead)
    tr.appendChild(readStatusBtn)
    tr.appendChild(editBtn)
    tr.appendChild(deleteBtn)

    tbody.appendChild(tr)
  })
}
function formatBookID(book) {
  return book.title.split(" ").join("") + book.pages
}

generateTable()

const openModalBtn = document.querySelector("#open-modal-btn")
const addBookBtn = document.querySelector("#add-book-btn")
const modal = document.querySelector("dialog")
const closeModalBtn = document.querySelector("#close-modal-btn")

function handleOpenModal(e) {
  e.preventDefault();
  form.reset()
  modal.showModal();
}

openModalBtn.addEventListener("click", (e) => handleOpenModal(e))
form.addEventListener("submit", (e) => addBookToLibrary(e))
addBookBtn.addEventListener("click", (e) => handleAddBookBtn())
closeModalBtn.addEventListener("click", (e) => handleCloseModal(e))


function handleAddBookBtn() {
  modal.close()
  console.log("hola")
}

function handleCloseModal(e) {
  e.preventDefault
  modal.close()
}