const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
const secret = 'my-secret-key';

const isValid = (username)=>{ //returns boolean
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, secret, { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).json({message:"User successfully logged in",accessToken:accessToken});
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const searchIsbn = req.params.isbn;
  const new_review = req.query.review;
  // Search for a book with a matching ISBN
  const matchingBook = Object.values(books).find((book) => book.isbn === searchIsbn);
  matchingBook.reviews[3] = new_review;
  //Write your code here
  return res.status(200).json(matchingBook);
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
  const searchIsbn = req.params.isbn;
  return res.status(200).send("Reviews for the ISBN "+(searchIsbn)+" posted by User admin deleted");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
