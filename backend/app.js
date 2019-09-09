const express = require('express');
const  bodyParser = require('body-parser');

const Post = require('./models/post');
const mongoose = require('mongoose');

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
  "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//iiidXxJXH0E0Spze
app.post("/api/posts",(req,res,next)=>{
  const post = new Post({
    title: req.body.title,
    post: req.body.post
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.use((req,res,next)=>{
  //console.log('1st middleware');
  next();
});

app.get('/api/posts',(req,res,next)=>{
  Post.find().then(documents=>{
    //res should be inside as Post.find is an ansynchronous task
    // It takes time for Post.find to complete, if res is not inside
    // res will be executed before Post.find is completed
      res.status(200).json({
        message: "Posts fetched",
        posts:documents
    });
  });
});



app.delete("/api/posts/:id",(req,res,next)=>{
  Post.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message: 'Post deleted!'});
  });
});

// for exporting to server.js
module.exports = app;
