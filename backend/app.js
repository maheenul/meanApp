const path = require("path");
const express = require('express');
const  bodyParser = require('body-parser');

const Post = require('./models/post');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts")
const userRoutes = require("./routes/user")

const app = express();

mongoose.connect('mongodb+srv://mahi:iiidXxJXH0E0Spze@cluster0-8gaq9.mongodb.net/node-angular?retryWrites=true&w=majority')

//mongoose.connect('mongodb://localhost:27017/mean', {useNewUrlParser: true})
.then(()=>{
  console.log('Connected to database');
})
.catch(()=>{
  console.log('Connection failed');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); // not req for this project
app.use("/images",express.static(path.join("backend/images"))); //for allowing access to images and also forwarding to backend/images

// To prevent CORS issue
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET,PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//iiidXxJXH0E0Spze


app.use("/api/posts",postsRoutes)
app.use("/api/user",userRoutes)
// for exporting to server.js
module.exports = app;
