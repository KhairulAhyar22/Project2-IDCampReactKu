const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBookList = document.getElementById('uncompleteBookshelfList');
  uncompletedBookList.innerHTML = '';

  const completedBookList = document.getElementById('completeBookshelfList');
  completedBookList.innerHTML = '';

  for (bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) {
      uncompletedBookList.append(bookElement);
    }else{
      completedBookList.append(bookElement);
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
    saveData();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function addBook() {
  const titleBook = document.getElementById('inputBookTitle').value;
  const authorBook = document.getElementById('inputBookAuthor').value;
  const yearBook = document.getElementById('inputBookYear').value;

  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, titleBook, authorBook, yearBook, false);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function generateId() {
  return +new Date();
}

function generateTodoObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted
  }
}

function makeBook(bookObject) {
  const textTitle = document.createElement('h3');
  textTitle.innerText = `Judul : ${bookObject.title}`;

  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = `Pengarang : ${bookObject.author}`;

  const bookYear = document.createElement('p');
  bookYear.innerText = `Tahun Terbit : ${bookObject.year}`;

  const textContainer = document.createElement('div');
  textContainer.classList.add('book_item');
  textContainer.append(textTitle, bookAuthor, bookYear);

  const container = document.createElement('article');
  container.classList.add('container_book');
  container.append(textContainer);

  if (bookObject.isCompleted){
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
 
    undoButton.addEventListener('click', function () {
      undoBookFromCompleted(bookObject.id);
      alert('Perubahan berhasil');
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
 
    trashButton.addEventListener('click', function () {
      removeBookFromCompleted(bookObject.id);
    });

    container.append(undoButton, trashButton);
  }else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    
    checkButton.addEventListener('click', function () {
      addBookToCompleted(bookObject.id);
    });
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
 
    trashButton.addEventListener('click', function () {
      removeBookFromCompleted(bookObject.id);
    });
    
    container.append(checkButton, trashButton);
  }

  return container;
}

function addBookToCompleted (bookId) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoBookFromCompleted(BookId) {
  const bookTarget = findBook(BookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBook(bookId) {
  for (bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function removeBookFromCompleted(bookId) {
  if(confirm('Yakin Hapus Data?')){
    const bookTarget = findBookIndex(bookId);
 
    if (bookTarget === -1) return;
   
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }
}

function findBookIndex(bookId) {
  for (index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

// Membuat fitur web storage
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});
 
function isStorageExist(){
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}
// menampilkan data localstorage
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
 
  if (data !== null) {
    for (const todo of data) {
      books.push(todo);
    }
  }
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}