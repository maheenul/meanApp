const express = require('express');
const  bodyParser = require('body-parser');

const Post = require('./models/post');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts")

const app = express();

mongoose.connect('mongodb+srv://mahi:iiidXxJXH0E0Spze@cluster0-8gaq9.mongodb.net/node-angular?retryWrites=true&w=majority')
.then(()=>{
  console.log('Connected to database');
})
.catch(()=>{
  console.log('Connection failed');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); // not req for this project

// To prevent CORS issue
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET,PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//iiidXxJXH0E0Spze


app.use("/api/posts",postsRoutes)
// for exporting to server.js
module.exports = app;
