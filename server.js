require('dotenv/config')

const express = require('express');
const bodyParser= require('body-parser');
var cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

const app = express();

const cors = require("cors");

app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to DB
try {
    // Connect to the MongoDB cluster
     mongoose.connect(process.env.DB_CONNECTION,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {console.log("**Mongoose is connected")
        // listen to port
        const port = 4001;
        app.listen(port, () => console.log(`Express Running on PORT ${port} `));
    });

  } catch (e) {
    console.log("Could Not Connect to Mongoose");
  }

// ROUTES
const usersRoute = require('./routes/users');
app.use('/api/user', usersRoute);

const postsRoute = require('./routes/posts');
app.use('/api/post', postsRoute);

// Login / Sign-up / logout

const loginRoute = require('./routes/login');
app.use('/api/login', loginRoute);
const logoutRoute = require('./routes/logout');
app.use('/api/logout', logoutRoute);

// User Data 

const getFriendsRoute = require("./routes/my-friends");
app.use('/api/get-friends', getFriendsRoute)

const getPostsRoute = require("./routes/my-posts");
app.use('/api/get-posts', getPostsRoute)



        





