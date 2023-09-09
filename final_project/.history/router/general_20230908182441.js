const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.param.username;
  const password = req.param.password;
  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const searchIsbn = req.params.isbn;
  // Search for a book with a matching ISBN
  const matchingBook = Object.values(books).find((book) => book.isbn === searchIsbn);

  if (matchingBook) {
    res.status(200).json(matchingBook);
  } else {
    res.status(404).json({ message: 'No book found with the specified ISBN.' });
  }
  //  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const book = findBooksByAuthor(author);
  return res.status(200).json(book);
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
});

function findBooksByAuthor(authorName) {
  const matchingBooks = [];

  for (const bookId in books) {
    if (books.hasOwnProperty(bookId)) {
      const book = books[bookId];
      if (book.author.toLowerCase().includes( authorName.toLowerCase())) {
        matchingBooks.push(book);
      }
    }
  }

  return matchingBooks;
}

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const searchTitle = req.params.title;

  // Search for books with a matching title
  const matchingBooks = [];

  for (const bookId in books) {
    if (books.hasOwnProperty(bookId)) {
      const book = books[bookId];
      if (book.title.toLowerCase() === searchTitle.toLowerCase()) {
        matchingBooks.push(book);
      }
    }
  }

  if (matchingBooks.length > 0) {
    res.status(200).json(matchingBooks);
  } else {
    res.status(404).json({ message: 'No books found with the specified title.' });
  }
  // //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const searchIsbn = req.params.isbn;
  // Search for a book with a matching ISBN
  const matchingBook = Object.values(books).find((book) => book.isbn === searchIsbn);

  if (matchingBook) {
    res.status(200).json(matchingBook.reviews);
  } else {
    res.status(404).json({ message: 'No book found with the specified ISBN.' });
  }
  //  return res.status(300).json({message: "Yet to be implemented"});
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
