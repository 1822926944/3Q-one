var express = require('express');
var router = express.Router();
const production = require("../sql/admin");

//用户管理添加数据

/* GET home page. */
router.get('/', function (req, res, next) {
  // qingqou

  production.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }

    res.render("user", {
      index: 2,
      data: data
    })
  })

});

// 提交添加商品
router.post('/add',function(req,res,next){
 
  let obj = req.body;
   
  obj.stock=obj.stock-0;
  obj.discount = obj.discount-0;
  obj.score = obj.score-0;
  production.insertMany(obj,(err,data)=>{
    if(err){
      console.log(err);
    }
    console.log(data);
    res.redirect("/pro");
  })

})


router.get("/add",function(req,res,next){
  res.render("userAdd",{
    index:2
  })
})

// 提交添加商品
router.post('/addAction',function(req,res,next){
 console.log(1);
  let obj = req.body;
   
  
  production.insertMany(obj,(err,data)=>{
    if(err){
      console.log(err);
    }
    console.log(data);
    res.redirect("/user");
  })

  
})

//删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log(req.query)

  production.deleteOne({'_id':req.query._id},(err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
     res.redirect("/user");
  })
})

// 跳转修改页面
router.get('/update',function(req,res,next){

  let _id = req.query._id;
  console.log(_id);
  production.findById({"_id":_id},(err,data)=>{

    if(err){
      console.log(err);
    }
    
    res.render('userUpdate',{
            index:2,
            data:data
          })
  })
  
})

// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;
  
  console.log(obj);
  console.log('---------------------1');
  production.findByIdAndUpdate(obj._id,{$set:obj},(err,data)=>{
      if(err) {
        console.log(err)
      }
      console.log('---------------------2');
      console.log(data)
      res.redirect("/user");

  })

  
});


//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;
 
  let reg = new RegExp(obj.search);
  production.find({adminName:reg},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
       res.render("user", {
       index: 2,
       data,
    });
  })

 
});


module.exports = router;
