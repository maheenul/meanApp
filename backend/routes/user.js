const express = require('express');

const User = require("../models/user");

const jwt = require("jsonwebtoken");

// Below is a 3rd party package for encrypting password
const bcrypt = require("bcrypt");

const router = express.Router();
//sds
router.post("/signup",(req,res,next)=>{
  encryptedPassword = bcrypt.hash(req.body.password, 10)
  .then(hash=>{
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
      .then(result=>{
        res.status(201).json({
          message:'User created!',
          result:result
        })
      })
      .catch(err=>{
        res.status(500).json({
          error:err
        })
      });

  });

});



router.post("/login",(req,res,next)=>{
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user=>{
    console.log(user)
    if(!user){
      console.log('No email match')
      return res.status(401).json({
        message:"Auth failed"
      });
    }
    fetchedUser=user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    console.log("runs")
    if(!result){
      console.log('No password match')
      return res.status(401).json({
        message:"Auth failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      "secret_this_should_be_longer",
      { expiresIn: "1h" }
      );
      res.status(200).json({
        token:token,
        expiresIn:3600
      });
  })
  .catch(err=>{
    console.log(err);
    return res.status(401).json({
      message:"Auth failed"
    })
  })
});




module.exports = router;
