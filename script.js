const data = [
  { title: "Narnia", author: "J Velazquez", pages: 300, isRead: false },
  { title: "Winnie", author: "Abraham", pages: 20, isRead: true },
  { title: "Bob esponga", author: "Marco Suarez", pages: 4123, isRead: true },
  { title: "Libro Vaquero", author: "Juan Camaney", pages: 240, isRead: false },
  { title: "Como cautivar", author: " L Zavaleta", pages: 430, isRead: false },
];



class Book {
  constructor(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
  }

  delete(e) {
    const bookID = e.target.parentNode.parentNode.getAttribute("data-book")
    console.log(e)
    console.log(Library.myLibrary.findIndex(book => book.author === this.author))
    Library.myLibrary.splice(Library.myLibrary.findIndex(book => book.author === this.author), 1)
    console.log(Library.myLibrary)
    const rowToDelete = document.querySelector(`article[data-book=${bookID}]`)
    console.log(bookID)
    rowToDelete.remove()
  }

  changeReadStatus(e) {
    const bookID = e.target.parentNode.parentNode.getAttribute("data-book")
    const arrayIndex = Library.myLibrary.findIndex(book => { return formatBookID(book) === bookID })
    let readStatus = Library.myLibrary[arrayIndex].isRead
    Library.myLibrary[arrayIndex].isRead = !readStatus
    readStatus = Library.myLibrary[arrayIndex].isRead
    const cardToEdit = document.querySelector(`article[data-book=${bookID}] p[data-book=isRead]`)
    cardToEdit.innerText = readStatus ? "Leído ✅" : "No leído ❌"
  }

}

class Library {
  static myLibrary = []
  static generateLibrary() {
    data.map(book => {
      Library.myLibrary.push(new Book(book.title, book.author, book.pages, book.isRead))
    })
  }

  static addBookToLibrary(e) {
    e.preventDefault()
    const form = e.target

    if (form.checkValidity()) {
      const formData = new FormData(form)
      modal.close();
      const entries = Object.fromEntries(formData)
      console.log(entries)
      const book = new Book(entries.title, entries.author, entries.pages, entries.isRead)
      Library.myLibrary.push(book)
      UIRenderer.generateCardGrid()

    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}

Library.generateLibrary()

const form = document.querySelector("form")
const cardSection = document.querySelector(".card-grid")

class UIRenderer {

  static generateCardGrid() {
    cardSection.innerHTML = ""

    Library.myLibrary.forEach(book => {
      const card = UIRenderer.generateCard(book)
      cardSection.appendChild(card)
    })
  }

  static generateCard(book){
    const card = document.createElement("article");
    card.classList.add("card");

    const readStatusBtn = document.createElement("button")
    readStatusBtn.innerText = "Cambiar estatus de leído";
    readStatusBtn.addEventListener("click", e => Book.prototype.changeReadStatus(e))
    const editBtn = document.createElement("button")
    editBtn.innerText = "Editar";
    editBtn.addEventListener("click", e => {
      UIRenderer.handleOpenModal(e);
    })

    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Eliminar";
    deleteBtn.addEventListener("click", (e) => Book.prototype.delete(e))

    card.setAttribute("data-book", formatBookID(book))
    const bookTitle = document.createElement("h3")
    const authorName = document.createElement("p")
    const pagesNumber = document.createElement("p")
    const isReadStatus = document.createElement("p")
    const buttonSection = document.createElement("div")
    buttonSection.classList.add("button-row")
    isReadStatus.setAttribute("data-book", "isRead")
    bookTitle.innerText = book.title;
    authorName.innerText = book.author;
    pagesNumber.innerText = book.pages;
    isReadStatus.innerText = book.isRead ? "Leído ✅" : "No leído ❌"
    card.appendChild(bookTitle)
    card.appendChild(authorName)
    card.appendChild(pagesNumber)
    card.appendChild(isReadStatus)
    card.appendChild(buttonSection)
    buttonSection.appendChild(readStatusBtn)
    buttonSection.appendChild(editBtn)
    buttonSection.appendChild(deleteBtn)

    return card;
  }

  static handleOpenModal(e) {
    e.preventDefault();
    form.reset()
    modal.showModal();
  }

  static handleAddBookBtn() {
    modal.close()
  }

  static handleCloseModal(e) {
    e.preventDefault();
    modal.close()
  }
}


function formatBookID(book) {
  return book.title.split(" ").join("") + book.pages
}

UIRenderer.generateCardGrid()

const openModalBtn = document.querySelector("#open-modal-btn")
const addBookBtn = document.querySelector("#add-book-btn")
const modal = document.querySelector("dialog")
const closeModalBtn = document.querySelector("#close-modal-btn")




openModalBtn.addEventListener("click", (e) => UIRenderer.handleOpenModal(e))
form.addEventListener("submit", (e) => Library.addBookToLibrary(e))
addBookBtn.addEventListener("click", (e) => UIRenderer.handleAddBookBtn())
closeModalBtn.addEventListener("click", (e) => UIRenderer.handleCloseModal(e))



