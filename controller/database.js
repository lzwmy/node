
var mysql = require('mysql'),  //引入mysql模块
    MySqlConfig = require('./mysql.config') //引入数据库配置模块数据


//sql操作
module.exports = {
    //传入三个参数,sql语句、sql语句参数、回调函数
    query: function(sql, params, callback){
        //创建数据库连接
        var connection = mysql.createConnection(MySqlConfig);
        connection.connect(function(err){
            if(err){
                console.log("数据库连接失败!");
                throw err;
            }
        })
        //开始数据操作 
        connection.query(sql, params, function(err, results){
            if(err){
                console.log("数据库操作失败!");
                throw err;
            }
            //将查询出来的数据返回给回调函数
            callback && callback(err, results);
            //操作数据库之后关闭连接
            connection.end(function(err){
                if(err){
                    console.log('关闭数据库连接失败！');
                    throw err;
                }else{
                    console.log('关闭数据库连接')
                }
            });
        })
    }
}
