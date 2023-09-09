const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(isbn);
  // return res.status(300).json({message: "Yet to be implemented"});
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
  const title = req.params.title;
  let obj;
  for (const bookId in books) {
    const book = books[bookId];
    if(book.title.toLowerCase().includes(title.toLowerCase()){
      obj = books[bookId];
    }
  }
  return res.status(200).json(book);
  // //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
