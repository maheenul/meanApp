const express = require('express');

const app = express();

app.use((req,res,next)=>{
  console.log('1st middleware');
  next();
});

app.use('/api/posts',(req,res,next)=>{
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
