require('dotenv/config')

const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());


// Connect to DB
try {
    // Connect to the MongoDB cluster
     mongoose.connect(process.env.DB_CONNECTION,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {console.log("**Mongoose is connected")
        // listen to port 4000
        const port = 4000;
        app.listen(port, () => console.log(`Express Running on PORT ${port} `));
    });

  } catch (e) {
    console.log("Could Not Connect to Mongoose");
  }

const usersRoute = require('./routes/users');
app.use('/api/user', usersRoute);





        





