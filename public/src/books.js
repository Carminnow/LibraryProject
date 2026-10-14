function findAuthorById(authors, id) {
  // YOUR SOLUTION HERE
  // Use find() to return the first author whose ID matches. since the author IDs are numbers its a comparison between numbers 
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  // YOUR SOLUTION HERE
  //Same as findAuthorByID, using find() to return the first book whose ID matches. since Book IDs are strings we are going to compare strings
  return books.find((book) => book.id === id);
}

// NOTE: YOU DON'T HAVE TO EDIT THE FUNCTIONS BELOW
function partitionBooksByBorrowedStatus(books) {
  return books.reduce(
    (acc, book) => {
      const [borrowed, returned] = acc;
      const recent = book.borrows[0];
      if (recent.returned) {
        returned.push(book);
      } else {
        borrowed.push(book);
      }

      return acc;
    },
    [[], []]
  );
}

function getBorrowersForBook(book, accounts) {
  const accountsById = accounts.reduce((acc, account) => {
    acc[account.id] = account;
    return acc;
  }, {});

  return book.borrows
    .map(({ id, returned }) => ({
      ...accountsById[id],
      returned,
    }))
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
