const http = require("http");
const express = require("express");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const session  = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./pool");

//设置路由
// const routerGoods = require('./router/goods');
const routerUser = require('./router/user');
const routerHero = require('./router/hero');
const routerNews = require('./router/news');
const routerImg = require('./router/img');
const routerOther = require('./router/other');
const routerGoods = require('./router/goods');
const routerService = require('./router/service');


let app = express();
let server = http.createServer(app);
server.listen(3000);

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
  resave:false,
  saveUninitialized:true,
  secret:"07teducn"
}));
app.use(cors({
  origin:["http://127.0.0.1:8080","http://localhost:8080","http://176.211.99.7:8080","*"],
  credentials:true
}));


app.get('/',(req,res)=>{
  res.redirect('/index'); //重定向
});
const fileUrl = "C:/xampp/htdocs/group_project/node_font_admin/html/";
app.get('/index',(req,res)=>{
  res.sendFile(fileUrl+"index.html");
});
app.get('/main',(req,res)=>{
  res.sendFile(fileUrl+"main.html");
});


app.use("/news",routerNews);
app.use("/goods",routerGoods);
app.use("/user",routerUser);
app.use("/hero",routerHero);
app.use("/img",routerImg);
app.use("/other",routerOther);
app.use("/service",routerService);
app.get("*",(req,res)=>{
  res.send("你输入的地址不正确");
})




