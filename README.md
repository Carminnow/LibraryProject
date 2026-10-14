# LibraryProject
Chegg project for a neighborhood library dashboard: books available, books borrowed, and account stats.

A neighborhood library dashboard that shows which books are available, which are checked out, and general statistics about the lending program. The HTML, CSS, and data were provided. My job was to write the algorithms in public/src/ that turn the raw accounts, authors, and books data into what the dashboard displays.
 
 
1. PROJECT PLAN
 
Goal
 
Complete the eight unfinished functions in public/src/ so that every Qualified test passes and the dashboard pages display correct data, while meeting the rubric: no single-letter variables in my code, at least one arrow function, find() and filter(), and at least one additional JavaScript feature.
 
The data
 
The accounts dataset holds people registered with the library. Each account has an id (a string), a name with first and last parts, an email, an age, and a company.
 
The authors dataset holds the people who wrote the books. Each author has a numeric id and a name with first and last parts. Author IDs are numbers, unlike the other two datasets, which use strings.
 
The books dataset holds each book's id (a string), title, genre, authorId, and a borrows array. Each borrow is an object with an id that matches an account ID and a returned value of true or false. The first item in borrows is the most recent borrow.
 
Functions to write
 
In accounts.js:
- findAccountById(accounts, id) uses find() to return the first account with a matching id.
- sortAccountsByLastName(accounts) uses sort() with a comparison callback on name.last and returns the accounts ordered A to Z by last name.
- getAccountFullNames(accounts) uses map() with destructuring and a template literal to return an array of "First Last" strings.
 
In books.js:
- findAuthorById(authors, id) uses find() to compare numeric IDs and return one author.
- findBookById(books, id) uses find() to compare string IDs and return one book.
 
In home.js:
- getTotalBooksCount(books) returns the array's length.
- getTotalAccountsCount(accounts) returns the array's length.
- getBooksBorrowedCount(books) uses filter() on each book's most recent borrow, then returns the length of the result.
 
The other functions in each file (getTotalNumberOfBorrows, getBooksPossessedByAccount, partitionBooksByBorrowedStatus, getBorrowersForBook, getMostCommonGenres, getMostPopularBooks, and getMostPopularAuthors) were provided, so I did not need to write them. I did read through them to understand how they use the data.
 
Features this supports
 
The Overall Stats page shows total books, books currently borrowed, and registered accounts, plus the most common genres and the most popular books and authors.
 
The Stats by Book page shows a list of books where each can be selected to show details. It relies on findBookById and findAuthorById.
 
The Stats by Account page shows an alphabetized list of accounts. It relies on sortAccountsByLastName, getAccountFullNames, and findAccountById.
 
Coding choices
 
- Descriptive variable names in the code I wrote (latestBorrow, lastNameA, borrowedBooks) and no single-letter variables.
- Arrow functions for short callbacks (find, filter, map, sort) and function declarations for the exported functions.
- Native array methods (find, filter, map, sort) instead of manual loops.
- Destructuring and a template literal in getAccountFullNames().
- Small functions that each do one job, and no edits to any files outside public/src/.
 
 
2. IMPLEMENTATION PLAN
 
Step 1. Set up and read. Open the project in Qualified and read the instructions in docs/, the data files, and the tests so I know what each function should return.
 
Step 2. Start with the simplest functions. getTotalBooksCount, getTotalAccountsCount, findAccountById, findAuthorById, and findBookById each need one line.
 
Step 3. Add the array-method functions. Write getAccountFullNames (map) and getBooksBorrowedCount (filter).
 
Step 4. Write the sort. Implement sortAccountsByLastName last because it has the most logic (a comparison callback).
 
Step 5. Test after every function. Run the tests after each function and read any error messages carefully before changing code.
 
Step 6. Check the live site. Open each page to make sure the dashboard displays the same results the tests expect.
 
Step 7. Clean up. Add comments to every function and confirm the rubric requirements are met.
 
Step 8. Commit and document. Commit after each completed function, take a Replit screenshot at each step, and finish this README.
 
 
3. EXAMPLE OF AN ACCEPTABLE NAVIGATION STRUCTURE
 
The three pages share one header navigation bar, so a visitor can reach every section from anywhere. The current page's link is highlighted.
 
Local Library (header on every page)
  Overall Stats (index.html): general stats, most common genres, most popular books, most popular authors
  Stats by Book (books.html): a book list on the left and the selected book's details on the right
  Stats by Account (accounts.html): an account list on the left and the selected account's details on the right
 
This works because there are only three top-level destinations, each named for what it shows. The list-on-the-left, details-on-the-right layout on the Books and Accounts pages lets an administrator scan many items and drill into one without leaving the page. This structure came with the project, and my functions supply the data behind each section.
 
 
4. REFLECTION ON CODING TRADE-OFFS
 
Sorting the original array in place. In sortAccountsByLastName I sort the original array instead of a copy. The benefit is shorter, simpler code that is easy to explain. The cost is that sort() changes the shared accounts array, so any other code that depended on the original order would be affected. Nothing in this project depends on it.
 

 
Named variables and a plain filter() in getBooksBorrowedCount. I avoided nested destructuring with a ternary because the plain version is easier to read and debug. The cost is that it assumes every book has at least one borrow, which is true for this data. But adding a check for latestBorrow before the returned check protects against empty borrows arrays.
 
 
Using .length for counts. It is the simplest possible solution, but it only works because each object in the array counts as exactly one item.
 
 
5. JUSTIFICATION OF CHOICES, CHALLENGES, AND DEBUGGING MOMENTS
 
Justification of choices
 
I used find() for the lookups because it stops at the first match and returns the object itself, which is exactly what the lookup functions are supposed to return.
 
I used filter() plus .length for borrowed books because filter() keeps only the books that are still out and .length counts them. Checking only the first borrow works because it is the most recent one.
 
I used map() for full names because one account object becomes one string, so the output keeps the original order and length. Pulling first and last out of the name object with destructuring makes the template literal short and readable.
 
I added comments to every function so I can explain what each one does and why it is written that way.
 
Challenges and debugging moments
 
 
Challenge 1: The hardest part for me was understanding filter() in getBooksBorrowedCount. I knew it gave back some of the items in an array, but I didn’t get what the function inside it was supposed to do. I kept trying to make it return the books themselves. Its real job is to answer a yes or no question about each book: true keeps the book, false drops it. Then .length counts what’s left.

It clicked when I broke the callback into small steps. First I wrote const latestBorrow = book.borrows[0];, then returned latestBorrow.returned === false. Seeing it one book at a time made it make sense.

What I learned:  I learned that filter() is just a yes-or-no question asked about every item in an array, and that find(), filter(), and map() each return something different. I also learned to look closely at how the data is organized before starting, like realizing the first borrow is the most recent one. Breaking my code into small named steps made it easier to debug, and running the tests after each function helped me catch all of my mistakes early.
 
6. AI TOOLS USED
 
Claude (Anthropic). I used it to help plan the functions, break down the sort() and getBooksBorrowedCount() code, figure out how filter() and map() worked, and draft this README. I chose it because I wanted a coding assistant to speed up planning and to explain options, such as different ways to write the sort and the borrowed-books count. 
 
How I used it responsibly: I inputted how I wanted to solve each problem and had it grade me on my approach, then I tied in suggestions to formulate my own path, When it suggested more complex ideas I haven’t heard of I worked with it similarly to a rubber duck and threw additional ideas to figure out how to make the code clean and simple, had it give me examples of how to use the new array methods, ran the tests myself, and wrote the challenges and debugging section from my own experience. 
 
7. PROJECT PROCESS SUMMARY
 
I started by reading the rubric, learning objectives, datasets, and tests so I understood what the dashboard needed. I planned eight functions: three lookups with find(), a sort, a name formatter with map(), two counters using .length, and a borrowed-books counter with filter(). I implemented them one at a time, committing after each and running the tests. I chose simple, readable code over clever shortcuts, such as plain if statements for sorting and named variables instead of single letters. I used Claude as a coding assistant to plan, write, and comment the functions, then reviewed each line so I could explain it. My challenges and fixes are documented above.

8. Screenshots

   Decision 1: Count functions
   <img width="818" height="102" alt="image" src="https://github.com/user-attachments/assets/95d0bb62-4ec6-467e-b534-0e08fcb91de3" />
   <img width="707" height="126" alt="image" src="https://github.com/user-attachments/assets/55d1d738-c14b-4283-a306-104dbd0a3346" />


   Decision 2: Lookup functions with find()
   <img width="1028" height="132" alt="image" src="https://github.com/user-attachments/assets/213ac0be-d927-453a-a690-0e40f53ad981" />
   <img width="895" height="116" alt="image" src="https://github.com/user-attachments/assets/dd22001f-a537-48cb-8966-137e0a8fa40c" />
   <img width="1028" height="113" alt="image" src="https://github.com/user-attachments/assets/8e8e6cfc-42fa-4a3d-bfa5-7e6f6d7470c0" />



   Decision 3: getAccountFullNames with map()
   <img width="998" height="132" alt="image" src="https://github.com/user-attachments/assets/5f748b28-2589-4b9d-bde9-82322136f43d" />


   Decision 4: getBooksBorrowedCount with filter()
   <img width="1386" height="266" alt="image" src="https://github.com/user-attachments/assets/17c7ff94-74d0-4c89-aba0-530917cc8d4e" />


   Decision 5: sortAccountsByLastName with sort()
   <img width="982" height="300" alt="image" src="https://github.com/user-attachments/assets/f1817afd-92f8-40c9-b08a-e4752e6e6e5e" />

