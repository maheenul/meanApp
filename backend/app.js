const express = require('express');

const app = express();

app.use((req,res,next)=>{
  console.log('middleware');
  next();
});

app.use((req,res,next)=>{
  res.send('hello');
});

// for exporting to server.js
module.exports = app;
