const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

const jwt = require('jsonwebtoken');

const secret = 'my-secret-key';

app.use("/customer/auth/*", function auth(req,res,next){
  const token = req.headers['authorization'] || req.query.token;

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  // Verify the access token.
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    // If the token is valid, you can access the user's information in 'decoded'.
    // For example, you can set it on the request object for further use.
    req.user = decoded;

    // Continue to the next middleware or route handler.
    next();
  });
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
