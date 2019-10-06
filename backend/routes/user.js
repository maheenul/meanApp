const express = require('express');

const User = require("../models/user");

// Below is a 3rd party package for encrypting password
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup",(req,res,next)=>{
  encryptedPassword = bcrypt.hash(req.body.password, 10)
  .then(hash=>{
    const user = new user({
      email: req.body.email,
      password: hash
    })

  });

});

module.exports = router;
