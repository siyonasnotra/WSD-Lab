let books = [];
let currentPage = 1;
const booksPerPage = 7;
const bookList = document.getElementById('book-list');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

document.getElementById('search').addEventListener('input', renderBooks);
document.getElementById('sort').addEventListener('change', renderBooks);
prevPageButton.addEventListener('click', () => changePage(-1));
nextPageButton.addEventListener('click', () => changePage(1));

function fetchBooks() {
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            books = data;
            renderBooks();
        })
        .catch(error => {
            bookList.innerHTML = '<p id="error-message">Failed to load books. Please try again later.</p>';
            console.error('Error fetching books:', error);
        });
}

function renderBooks() {
    const filteredBooks = filterBooks();
    const sortedBooks = sortBooks(filteredBooks);
    const paginatedBooks = paginateBooks(sortedBooks);

    bookList.innerHTML = '';

    if (paginatedBooks.length === 0) {
        bookList.innerHTML = '<p>No books found.</p>';
    } else {
        paginatedBooks.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');

            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.title} cover" class="book-cover">
                <div class="book-details">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author"><strong>Author:</strong> ${book.author}</p>
                    <p class="book-year"><strong>Year:</strong> ${book.year}</p>
                </div>
            `;

            bookList.appendChild(bookElement);
        });
    }

    updatePaginationInfo(filteredBooks.length);
}

function filterBooks() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    return books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
}

function sortBooks(filteredBooks) {
    const sortOption = document.getElementById('sort').value;
    return filteredBooks.sort((a, b) => a[sortOption].localeCompare(b[sortOption]));
}

function paginateBooks(sortedBooks) {
    const start = (currentPage - 1) * booksPerPage;
    return sortedBooks.slice(start, start + booksPerPage);
}

function updatePaginationInfo(totalBooks) {
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
}

function changePage(direction) {
    currentPage += direction;
    renderBooks();
}

fetchBooks();