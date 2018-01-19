/**
 * Created by web-01 on 2017/12/11.
 */
/*
* 创建一个连接池模块---因为node中的模块 都特殊处理过，（单例模式）
*   多次require 不会出错(创建多个对象)
* */
const mysql= require("mysql");

let pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"dota2",
    port:3306,
    connectionLimit:25
});
module.exports = pool;