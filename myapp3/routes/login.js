var express = require('express');
var router = express.Router();
const production = require("../sql/admin");

//用户登录

/* GET home page. */
router.get('/', function (req, res, next) {
    // 
    console.log('进入login');

        res.render("login")
   
});


// 登录
router.post("/in", (req, res, next) => {
  console.log("登录模块......")
  let  obj = req.body;
 console.log(obj,'.....');
  
  // production.findOne(obj,(err,data)=>{
  //   if(err){
  //     console.log(err)
  //   }
  //   // console.log(data);
  //   if(data){
  //      res.redirect('/pro')
  //   }else{
  //       res.render('register')
  //   }
  // })

  production.findOne(obj, (err, data) => {
    if (err) {
      console.log(err);
    }
    if(data) {
           res.cookie('islogin','ok')
        //  req.session.islogin = 'ok'
         console.log('我在login  路由 /in 里面')
        
        res.redirect('/pro')
    } else {
        res.redirect('/register')
        // res.render('register')
        
    }
   
     
  });
 
});


module.exports = router;









