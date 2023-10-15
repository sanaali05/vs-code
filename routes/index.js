const { error } = require('console');
var express = require('express');
var router = express.Router();
var fs=require('fs');

/* GET home page. */



router.get('/', function(req, res) {
  var filedup=[];
  fs.readdir("./uploads",{withFileTypes:true}, function(err,files){
    // console.log(files[2].isDirectory());
   files.forEach(function(file){

    filedup.push({name:file.name,folderhai:file.isDirectory(),})
   })
   res.render('index',{files:filedup}); 

    })
  })

  router.get('/create',function(req,res){
    fs.writeFile(`./uploads/${req.query.filename}`,"",function(err){
      if(err){
        console.log(err)
      }
      else{
        res.redirect('/')
      }
    })
  })

  
  router.get('/createfolder',function(req,res){
    fs.mkdir(`./uploads/${req.query.foldername}`,function(err){
      if(err){
        console.log(err)
      }
      else{
        res.redirect('/')
      }
    })
  })

  router.get('/file/:filename',function(req,res){
    var filedup=[];
  fs.readdir("./uploads",{withFileTypes:true}, function(err,files){
    // console.log(files[2].isDirectory());
   files.forEach(function(file){

    filedup.push({name:file.name,folderhai:file.isDirectory(),})
   })
  fs.readFile(`./uploads/${req.params.filename}`,"utf8",(err,data)=>{

    res.render('sameindex',{files:filedup,filename:req.params.filename ,Data:data}); 
  })
    })

  })

  router.get('/delete/:filename',function(req,res){
    fs.unlink(`./uploads/${req.params.filename}`,function(err){
      if(err){
        console.log(error)
      }else{
        res.redirect('/')
      }
    })
    fs.rmdir(`./uploads/${req.params.filename}`,function(err){
      if(err){
        console.log(error)
      }else{
        res.redirect('/')
      }
    })
  })

  router.post('/savefile/:filename',function(req,res){
    fs.writeFile(`./uploads/${req.params.filename}`,req.body.fileData,function(err){
      if(err)throw err;
      res.redirect('/')
    })
  })


module.exports = router;
