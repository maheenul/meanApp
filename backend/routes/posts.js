const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const multer =  require("multer");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];

    let error = new Error("Invalid mime type");
    if (isValid){
      error=null;
    }
    cb(error,"backend/images");  //file location relative to server.js file

  },
  filename: (req,file,cb)=>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null,name+'-'+Date.now()+'.'+ext);
  }
});

router.post("",multer({storage:storage}).single("image"),
(req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    post: req.body.post,
    imagePath: url + "/images/"+req.file.filename
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        id: createdPost._id,
        title: createdPost.title,
        post: createdPost.post,
        imagePath: createdPost.imagePath
      }
    });
  });
});

router.put("/:id",multer({storage:storage}).single("image"),
(req,res,next)=>{
  let imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/"+req.file.filename
  }else{
    imagePath = req.body.imagePath;
  }
  const post = new Post({
    _id:req.body.id,
    title:req.body.title,
    post:req.body.post,
    imagePath:imagePath
  });

  Post.updateOne({_id: req.params.id},post).then(
    result=>{
      console.log(result);
      res.status(200).json({
        message:'Update Successful!'
      })
    }
  )

});

router.get('',(req,res,next)=>{
  const pageSize = +req.query.pagesize; // '+' added to convert string to numbers
  const currentPage = +req.query.page;
  const postQuery = Post.find();

  if(pageSize && currentPage){
    postQuery
    .skip(pageSize * (currentPage-1))
    .limit(pageSize);
  }
  postQuery.then(documents=>{
    //res should be inside as Post.find is an ansynchronous task
    // It takes time for Post.find to complete, if res is not inside
    // res will be executed before Post.find is completed
      res.status(200).json({
        message: "Posts fetched",
        posts:documents
    });
  });
});

router.get("/:id",(req,res,next)=>{
  Post.findById(req.params.id).then(post=>{
    if (post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message: 'Post not found!'});
  }
  });
})

router.delete("/:id",(req,res,next)=>{
  Post.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message: 'Post deleted!'});
  });
});


module.exports = router;
