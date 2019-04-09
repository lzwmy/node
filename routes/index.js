var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var db = require('../controller/database'); //引入自定义模块 


app.post('/query', function(req, res, next) {
  var curentPage = req.body.curentPage?req.body.curentPage:1;
  var pageSize = req.body.pageSize?req.body.pageSize:5;
  var name = req.body.name;
    db.query("select *,(select count(0) from user where name like '%"+name+"%') as total from user where name like '%"+name+"%' limit "+ pageSize +" offset " + (curentPage-1), [] ,function(err, result){
    if(err){
      res.json({
        success:false,
        msg:err
      })
    }else{
      //总条数
      var total = result[0]?result[0].total:0;
      res.json({
        success:true,
        info:result,
        total:total
      })
    }
  })
});

app.get('/changeSex', function(req, res, next) {
  let sex = req.query.sex=='男'? '女':'男';
  db.query("update user set sex = '"+ sex +"' where id = " + req.query.id, [], function(err,result){
    if(err){
      res.json({
        success:false,
        msg:err
      })
    }else{
      res.json({
        success:true,
      })
    }
  })
})

app.post('/add', function(req, res, next) {
  db.query("insert into user(name, age, sex) VALUES(?,?,?)", [req.body.name,req.body.age,req.body.sex] ,function(err, result){
    if(err){
      res.json({
        success:false,
        msg:err
      })
    }else{
      res.json({
        success:true,
      })
    }
  })
});



app.post('/delete', function(req, res, next) {
  db.query("delete from user where id = " + req.body.id,function(err, result){
    if(err){
      res.json({
        success:false,
        msg:err
      })
    }else{
      res.json({
        success:true,
        msg:'删除成功!'
      })
    }
  })
});




module.exports = app;
