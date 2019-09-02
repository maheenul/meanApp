const express = require('express');
const  bodyParser = require('body-parser');

const app = express();

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

app.post("/api/posts",(req,res,next)=>{
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added successfully"
  }); //means everything okat and new resource created
                          //.json sends back a response data
});

app.use((req,res,next)=>{
  console.log('1st middleware');
  next();
});

app.use('/api/posts',(req,res,next)=>{    // can use app.get here instead
  const posts=[
    {id: 'sdddddddds',title:'magic',post:'rabbit disappering'},
    {id: 'sddddsdfds',title:'music',post:'stairway to ?'}
  ];
  // status:200 indicates successful transfer
  res.status(200).json({
    message: "Posts fetched",
    posts:posts
  });
});

// for exporting to server.js
module.exports = app;
