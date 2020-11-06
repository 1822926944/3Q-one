var express = require('express');
var router = express.Router();
const production = require("../sql/admin");


router.get("/",function(req,res){

    console.log('注册页面');
    // // res.render('register')
    res.render('register')
    // res.render('/register')

})


router.post("/in", (req, res, next) => {

    console.log("注册模块......")
    let  obj = req.body;
   console.log(obj,'.....');
    
   production.findOne({"adminName":obj.adminName},(err,data)=>{
    if(err) {
        console.log(err)
    }
    console.log(data,'000000000')

    if(data) {

        res.redirect('/register')
    }else {
        production.insertMany(obj,(err,dat)=>{
            if(err){
                console.log(err);
            }
            console.log(dat);
            res.redirect('/login')
        })
    }

    })
  
   
  });

  module.exports = router;