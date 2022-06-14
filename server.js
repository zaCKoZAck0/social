const express = require('express');
const bodyParser= require('body-parser');
const { urlencoded } = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
app.set('view engine', 'ejs')

// Connect to DB
const uri = "mongodb+srv://zackozack:zackozack@socialmedia.hyqor.mongodb.net/?retryWrites=true&w=majority";
MongoClient.connect(uri, { useUnifiedTopology: true }).then(client => {

        console.log('Connected to Database');
        const db = client.db('SocialMedia');
        app.use(urlencoded({extended: true}));
        const usersCollection = db.collection('users');
        const postsCollection = db.collection('posts');

// listen to port 4000

        app.listen(4000, () => console.log(`Express Running on PORT ${app.address} `));

//GET
//app.get(path, callback)
//app.get('/', function (request, response) {  // do something here})

        app.get('/api/users',function(request,response){
            db.collection('users').find().toArray()
            .then(results => {
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify(results));
              console.log(results); 
            })
            .catch(error => console.error(error))  
        })
        app.post('/api/users', function(request,response){
        quotesCollection.insertOne(request.body);
        console.log("post hogya");
        console.log(request.body);
        //response.end("Added Sucessfully");
        response.redirect('/')
})

})




