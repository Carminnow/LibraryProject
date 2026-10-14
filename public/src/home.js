function getTotalBooksCount(books) {
  // YOUR SOLUTION HERE
  // returning amount of books in the library, since each is an object in the array the length should be all we need. 
  return books.length; 
}

function getTotalAccountsCount(accounts) {
  // YOUR SOLUTION HERE
  //returning the amount of accounts registered, same as above returning the length of the array. 
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // YOUR SOLUTION HERE
  // Hint: You can use the [`filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method here. 
  // If you get stuck, feel free to take a look at this repl.it: https://replit.com/@thinkful/getBooksBorrowedCount#index.js
  //returns how many books are checked out. the most recent borrow is going to be the first item in the array, if it has returned set to false it is still out. filter() is going to keep the books that are still out, and I will use .length to count them. additionally to protect against crashes, I added a comparison to check if there is nothing being borrowed. 
  const borrowedBooks = books.filter((book) => {
    const latestBorrow = book.borrows[0];
    return latestBorrow && latestBorrow.returned === false;
  })
  return borrowedBooks.length;
}

// Tbis is a helper function that's called by other functions inside this file. You don't have to edit it.
function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

// NOTE: YOU DON'T HAVE TO EDIT THE FUNCTIONS BELOW
function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }

    return acc;
  }, {});

  const sorted = _sortObjectByValues(count);
  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
  }, {});

  const sorted = _sortObjectByValues(groupById);
  return sorted
    .map((id) => {
      const { title: name } = books.find(({ id: bookId }) => bookId === id);
      return { name, count: groupById[id] };
    })
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }

    return acc;
  }, {});

  for (let id in count) {
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }

  const sorted = _sortObjectByValues(count);
  return sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === Number(authorId));
      const name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
