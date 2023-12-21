const myLibrary = [
  { title: "Narnia", author: "J Velazquez", pages: 300, isRead: false },
  { title: "Winnie", author: "Abraham", pages: 20, isRead: true },
  { title: "Bob esponga", author: "Marco Suarez", pages: 4123, isRead: true },
  { title: "Libro Vaquero", author: "Juan Camaney", pages: 240, isRead: false },
  { title: "Como cautivar", author: " L Zavaleta", pages: 430, isRead: false },
];

function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

const form = document.querySelector("form")
function addBookToLibrary(e) {
e.preventDefault()
const formData = new FormData(form, addBookBtnBtn)
modal.close();
console.log(formData)
}



myLibrary.forEach(book => {

  const tr = document.createElement("tr")
  tr.classList = book.title
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

  document.querySelector("tbody").appendChild(tr)
})

const openModalBtn = document.querySelector("#open-modal-btn")
const addBookBtnBtn = document.querySelector("#add-book-btn")
const modal = document.querySelector("dialog")

function handleOpenModal(e){
  e.preventDefault();
  modal.showModal();
}

openModalBtn.addEventListener("click", (e) => handleOpenModal(e))
addBookBtnBtn.addEventListener("click", (e) => addBookToLibrary(e))