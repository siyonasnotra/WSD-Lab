document.addEventListener('DOMContentLoaded', function () {
    let booksData = [];
    let currentPage = 1;
    const booksPerPage = 5;

    function fetchBooks(subjectName) {
        const apiUrl = `https://openlibrary.org/subjects/${subjectName}.json`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                booksData = data.works || [];
                currentPage = 1;
                displayBooks(booksData, currentPage);
                updatePagination();
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                document.getElementById('book-table-container').innerHTML = '<p>Sorry, there was an error fetching the books.</p>';
            });
    }

    function displayBooks(books, page) {
        const bookTableContainer = document.getElementById('book-table-container');
        bookTableContainer.innerHTML = '';

        if (books.length === 0) {
            bookTableContainer.innerHTML = '<p>No books found.</p>';
            return;
        }

        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-bordered');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Cover', 'Title', 'Author(s)', 'First Published Year', 'Get Details'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        const booksToShow = books.slice(startIndex, endIndex);

        booksToShow.forEach(book => {
            const row = document.createElement('tr');

            // Cover Image Cell
            const coverCell = document.createElement('td');
            const coverImage = document.createElement('img');
            coverImage.src = book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` : 'https://via.placeholder.com/100x150?text=No+Cover';
            coverImage.alt = book.title;
            coverImage.style.width = '100px';
            coverImage.style.height = '150px';
            coverCell.appendChild(coverImage);
            row.appendChild(coverCell);

            // Title Cell
            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell);

            // Author(s) Cell
            const authorCell = document.createElement('td');
            authorCell.textContent = book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown';
            row.appendChild(authorCell);

            // Year Cell
            const yearCell = document.createElement('td');
            yearCell.textContent = book.first_publish_year || 'N/A';
            row.appendChild(yearCell);

            // Details Button Cell
            const detailsCell = document.createElement('td');
            const detailsButton = document.createElement('button');
            detailsButton.classList.add('btn', 'btn-info', 'book-detail');
            detailsButton.textContent = 'Click Me';
            detailsButton.addEventListener('click', function () {
                if (book.key) {
                    window.open(`https://openlibrary.org${book.key}`);
                }
            });
            detailsCell.appendChild(detailsButton);
            row.appendChild(detailsCell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        bookTableContainer.appendChild(table);
    }

    function updatePagination() {
        const paginationContainer = document.getElementById('pagination-container');
        paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(booksData.length / booksPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('btn', 'btn-secondary', 'me-2');
            pageButton.addEventListener('click', function () {
                currentPage = i;
                displayBooks(booksData, currentPage);
            });
            paginationContainer.appendChild(pageButton);
        }
    }

    const searchForm = document.querySelector('form');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const subjectName = searchForm.querySelector('input[type="search"]').value;
        if (subjectName) {
            fetchBooks(subjectName);
        }
    });

    const sortOptions = document.querySelectorAll('.sort-option');
    sortOptions.forEach(option => {
        option.addEventListener('click', function () {
            const sortBy = this.getAttribute('data-sort');
            if (sortBy === 'title') {
                booksData.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortBy === 'year') {
                booksData.sort((a, b) => a.first_publish_year - b.first_publish_year);
            }
            displayBooks(booksData, currentPage);
        });
    });

    document.getElementById('filterButton').addEventListener('click', function () {
        const yearFrom = parseInt(document.getElementById('yearFrom').value, 10) || 0;
        const yearTo = parseInt(document.getElementById('yearTo').value, 10) || new Date().getFullYear();
        const filteredBooks = booksData.filter(book => book.first_publish_year >= yearFrom && book.first_publish_year <= yearTo);
        displayBooks(filteredBooks, currentPage);
        updatePagination();
    });

    // Remove the default fetch call
    // fetchBooks('fiction');
});
